#!/usr/bin/env python3
"""Real Chromium battle test for the three newly approved stage-2 SR units.
Runs both viewport modes and checks exact effective buffs, CT, debuffs, heals, pool,
old-unit combat, save migrations and unchanged definitions. No permanent game saves.
"""
import json
import subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/redraw3_stage2"
OUT.mkdir(parents=True,exist_ok=True)
IDS=("ginjo_cecil_work","hasegawa_honoka_work","ueda_kana_work")
PERSONS=("ginjo_cecil","hasegawa_honoka","ueda_kana")
NAMES=("銀城 セシル","長谷川 ほのか","上田 かな")

def main_source(path):
 return subprocess.check_output(["git","show",f"origin/main:{path}"],cwd=ROOT,text=True)
old=main_source("js/game.js")
new=(ROOT/"js/game.js").read_text()
old_perf=main_source("js/performance_v016.js")
new_perf=(ROOT/"js/performance_v016.js").read_text()
old_index=main_source("index.html")
new_index=(ROOT/"index.html").read_text()
# Verify unchanged core, including the full legacy unit literal. Both branches share
# the exact old gacha pool definition and all earlier SR unit source files.
for token in ("const KEY=","const ROLES=","const RATE=","const NEW19_RATE=",
              "const GACHA_CONFIG=","const NORMAL_GACHA_POOL=","const NEW19_GACHA_POOL=",
              "const DISTRICT_GACHA_IDS=","function migrateSave(",
              "function drawNormalGachaUnit(","function rollNormalGachaRarity("):
 a,b=old.index(token),new.index(token)
 assert old[a:old.index("\n",a)]==new[b:new.index("\n",b)],("protected code changed",token)
a,b=old.index("const UNITS=["),new.index("const UNITS=[")
assert old[a:old.index("\n];",a)+3]==new[b:new.index("\n];",b)+3],("base UNITS changed")
for path in ("js/heroines_v0810_units.js","js/heroines_v0830_units.js","js/heroines_v0840_units.js",
             "js/heroines_v0850.js","js/heroines_v0850_wire.js"):
 assert (ROOT/path).read_text()==main_source(path),("old character/units changed",path)
assert "NEW_UNIT_ROSTER_V0850" in new and "NEW_UNIT_DESIGN_V0850" in new_perf
assert old_index.count("heroines_v0850_units.js")==0 and new_index.count("heroines_v0850_units.js")==1
assert new_index.index("heroines_v0850_units.js") < new_index.index("js/performance_v016.js") < new_index.index("js/game.js")

class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a): pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url=f"http://127.0.0.1:{srv.server_port}/index.html"
reports={}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,w,h in (("portrait",390,844),("landscape",844,390)):
   ctx=browser.new_context(viewport={"width":w,"height":h})
   page=ctx.new_page()
   errors=[]
   page.on("pageerror",lambda err:errors.append(str(err)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof S!=='undefined' && typeof NEW_UNIT_ROSTER_V0850!=='undefined' && typeof applySkill==='function'",timeout=50000)
   baseline=page.evaluate("""()=>{
     gachaMode='normal';
     const ids=['ginjo_cecil_work','hasegawa_honoka_work','ueda_kana_work'];
     const empty=fresh(),q3=fresh(),q6=fresh();q3.quests.q3={complete:true};q6.quests.q6={complete:true};
     const eligible=(save,id)=>availableNormalPool(save).some(x=>x.id===id);
     const cases=ids.map(id=>{
       const u=BYID[id];S=fresh();S.owned[id]={lv:1,aff:0,lb:0,copies:0};
       const lvl1=unitPower(id);
       S.owned[id]={lv:5,aff:0,lb:0,copies:0};
       const lvl5=unitPower(id);
       return {id,person:u?.person,rarity:u?.rarity,role:u?.role,title:u?.title,
         stats:lvl1,lvl5,labels:u?.s,
         skills:[unitSkillType(u,0),unitSkillType(u,1)],
         targets:[skillTarget(u,0),skillTarget(u,1)],
         descriptions:[skillDescription(u,0),skillDescription(u,1),passiveDescription(u)],
         passive:unitPassive(u),passiveValue:passiveValue(u),
         art:unitArt(u),normal:NORMAL_GACHA_POOL.some(x=>x.id===id),
         special:NEW19_GACHA_POOL.some(x=>x.id===id),
         before:eligible(empty,id),atQ3:eligible(q3,id),atQ6:eligible(q6,id),
         q6Access:!!NEW_HERO_REVEAL_V0850[u.person]&&NEW_HERO_REVEAL_V0850[u.person]==='q6'};
     });
     S=fresh();S.owned.momoka_work={lv:1,aff:0,lb:0,copies:0};
     S.owned.milku_work={lv:1,aff:0,lb:0,copies:0};
     const oldBase={momoka:unitPower('momoka_work'),milku:unitPower('milku_work')};
     const legacy=fresh();legacy.owned.momoka_work={lv:5,aff:18,lb:2,copies:3};
     legacy.owned.milku_work={lv:3,aff:11,lb:0,copies:1};
     legacy.party=['momoka_work','milku_work'];legacy.selected='momoka_work';
     legacy.homeFavorite='momoka';legacy.homeUnitId='momoka_work';
     legacy.gems=2345;legacy.gold=4321;legacy.pulls=17;legacy.gachaPity=8;legacy.gachaSrStreak=2;
     legacy.quests.q2={complete:true};legacy.storyFlags.qaLegacy=true;
     const migrated=migrateSave(JSON.parse(JSON.stringify(legacy)));
     const legacyCheck={
       owned:JSON.stringify(migrated.owned.momoka_work)===JSON.stringify(legacy.owned.momoka_work)
           &&JSON.stringify(migrated.owned.milku_work)===JSON.stringify(legacy.owned.milku_work),
       party:JSON.stringify(migrated.party)===JSON.stringify(legacy.party),
       selection:migrated.selected===legacy.selected,
       home:migrated.homeFavorite===legacy.homeFavorite&&migrated.homeUnitId===legacy.homeUnitId,
       funds:migrated.gems===2345&&migrated.gold===4321&&migrated.pulls===17,
       pity:migrated.gachaPity===8&&migrated.gachaSrStreak===2,
       story:migrated.quests.q2.complete&&migrated.storyFlags.qaLegacy,
       noNewOwned:ids.every(id=>!migrated.owned[id])};
     const oldIDs=['momoka_work','milku_work','tokiwa_aone_work','chiyozaki_suzuha_work','sakuraba_renka_work'];
     const oldUnitSpecs=oldIDs.map(id=>({id,rarity:BYID[id].rarity,
       skills:[unitSkillType(BYID[id],0),unitSkillType(BYID[id],1)],
       passive:unitPassive(BYID[id])}));
     return {key:SaveStore.key,rates:{...RATE},new19Rates:{...NEW19_RATE},
       costs:[GACHA_CONFIG.ONE_COST,GACHA_CONFIG.TEN_COST],
       count:NORMAL_GACHA_POOL.filter(x=>x.rarity==='SR').length,
       oldRemaining:NORMAL_GACHA_POOL.filter(x=>x.rarity==='SR'&&!ids.includes(x.id)).length,
       poolUnique:new Set(UNITS.map(x=>x.id)).size===UNITS.length,
       oldStats:oldBase,healerBaseline:ROLES.healer,
       roster:cases,legacy:legacyCheck,oldUnitSpecs};
   }""")
   assert baseline["key"]=="yoiboshi-reboot-v1" and baseline["rates"]=={"R":60,"SR":25,"SSR":10,"UR":5},baseline
   assert baseline["new19Rates"]=={"SR":80,"SSR":15,"UR":5} and baseline["costs"]==[120,1000],baseline
   assert baseline["count"]==162 and baseline["oldRemaining"]==159 and baseline["poolUnique"],baseline
   assert all(baseline["legacy"].values()),baseline
   assert (baseline["healerBaseline"]["hp"],baseline["healerBaseline"]["atk"],baseline["healerBaseline"]["def"])==(148,9,5),baseline
   assert (baseline["oldStats"]["milku"]["hp"],baseline["oldStats"]["milku"]["atk"],baseline["oldStats"]["milku"]["def"])==(148,9,5),baseline
   a,b,c=baseline["roster"]
   for obj,id,person,role,base in zip((a,b,c),IDS,PERSONS,("support","attacker","healer"),((165,11,5),(125,19,3),(165,11,5))):
    assert (obj["id"],obj["person"],obj["rarity"],obj["role"])==(id,person,"SR",role),obj
    assert (obj["stats"]["hp"],obj["stats"]["atk"],obj["stats"]["def"])==base,obj
    assert obj["normal"] and not obj["special"] and not obj["before"] and not obj["atQ3"] and obj["atQ6"] and obj["q6Access"],obj
    assert f"/full_body/{person}.png" in obj["art"],obj
   assert a["skills"]==["cecil_defense_up","cecil_team_ct"] and a["targets"]==["ally","ally"],a
   assert b["skills"]==["honoka_strike_ct","honoka_enemy_attack_down_all"] and b["targets"]==["enemy","enemy"],b
   assert c["skills"]==["heal_one","kana_heal_all_25"] and c["targets"]==["ally","ally"],c
   assert a["passive"]["type"]=="cecil_buff" and a["passiveValue"]==8,a
   assert b["passive"]["type"]=="honoka_attack" and b["passiveValue"]==6,b
   assert c["passive"]["type"]=="heal" and c["passiveValue"]==8,c
   assert "18%" in a["descriptions"][0] and "1.8秒" in a["descriptions"][1] and "+8%" in a["descriptions"][2],a
   assert "26" in b["descriptions"][0] and "2.0秒" in b["descriptions"][0] and "-15%" in b["descriptions"][1] and "+6%" in b["descriptions"][2],b
   assert "57" in c["descriptions"][0] and "25" in c["descriptions"][1] and "+8%" in c["descriptions"][2],c
   assert baseline["oldUnitSpecs"]==[
    {"id":"momoka_work","rarity":"SR","skills":["ct","stun"],"passive":{"type":"team_start_atk","name":"相談室の応援"}},
    {"id":"milku_work","rarity":"SR","skills":["heal_one","heal_boost"],"passive":{"type":"rescue","name":"帰り道の手当て"}},
    {"id":"tokiwa_aone_work","rarity":"SR","skills":["enemy_ct","ct"],"passive":{"type":"ct_focus","name":"音の先読み"}},
    {"id":"chiyozaki_suzuha_work","rarity":"SR","skills":["suzuha_defense_up","suzuha_cleanse_heal"],"passive":{"type":"suzuha_defense_focus","name":"お守りの仕立て"}},
    {"id":"sakuraba_renka_work","rarity":"SR","skills":["renka_strike_down","renka_enemy_ct_all"],"passive":{"type":"renka_attack","name":"勝負師の勘"}}
   ],baseline["oldUnitSpecs"]
   for obj in (a,b,c):
    response=page.request.get(url.rsplit("/",1)[0]+"/"+obj["art"],timeout=30000)
    assert response.status==200 and len(response.body())>2000,(mode,obj,response.status)
   # Invoke actual production battle engine (applySkill, strike, heal, tickTimedEffects).
   combat=page.evaluate("""()=>{
     const originalRandom=Math.random;Math.random=()=>.9;
     const mkAlly=(id,i)=>{
       const u=BYID[id],r=NEW_UNIT_BASE_STATS_V0850[id]||ROLES[u.role];
       return {id,hp:45,max:120,atk:r.atk,def:r.def,
         shield:0,taunt:0,cooldowns:[0,0],x:18+i*18,y:32,attackTimer:10,
         defenseBuffUntil:0,defenseBuffMult:1,healBuffUntil:0,healBuffMult:1,
         damageReduceUntil:0,damageReduceMult:1,rallyUntil:0,rallyMult:1};
     };
     const mkEnemy=(name,hp)=>({name,hp,max:hp,atk:30,attackTimer:2,interval:2.1,
       x:78,y:38,weakenMult:1,weakenUntil:0,damageReduction:0});
     const fixture=(actor)=>{
       S=fresh();
       for(const id of [actor,'momoka_work','milku_work'])S.owned[id]={lv:1,aff:0,lb:0,copies:0};
       battle={qid:'q2',sim:10,phase:'fight',done:false,log:[],popups:[],
         allies:[mkAlly(actor,0),mkAlly('momoka_work',1),mkAlly('milku_work',2)],
         enemies:[mkEnemy('Enemy-A',180),mkEnemy('Enemy-B',180),mkEnemy('Dead',0)]};
       return battle;
     };
     const out={};
     try{
       let x=fixture('ginjo_cecil_work');
       applySkill(0,0,'ally',1);
       out.cecilS1={buffs:x.allies.map(a=>[a.defenseBuffMult,a.defenseBuffUntil]),
         enemies:x.enemies.map(e=>e.weakenMult),selfCt:x.allies[0].cooldowns[0]};
       x.allies[1].cooldowns=[20,26];x.allies[2].cooldowns=[10,15];
       applySkill(0,1,'ally',1);
       out.cecilS2={cts:x.allies.map(a=>a.cooldowns.slice()),
         selfBuff:x.allies[0].defenseBuffMult};
       x.sim=18.1;tickTimedEffects();
       out.cecilExpiry=x.allies.map(a=>a.defenseBuffMult);
       x=fixture('hasegawa_honoka_work');
       out.honokaPassive=passiveAttackMultiplier(x.allies[0],x.enemies[0]);
       const beforeHP=x.enemies[0].hp,beforeCT=x.enemies.map(e=>e.attackTimer);
       applySkill(0,0,'enemy',0);
       out.honokaS1={damage:beforeHP-x.enemies[0].hp,
         ct:x.enemies.map((e,i)=>e.attackTimer-beforeCT[i]),cooldown:x.allies[0].cooldowns[0]};
       applySkill(0,1,'enemy',0);
       out.honokaS2={weak:x.enemies.map(e=>e.weakenMult),
         until:x.enemies.map(e=>e.weakenUntil),cooldown:x.allies[0].cooldowns[1]};
       x.sim=16.1;tickTimedEffects();
       out.honokaExpiry=x.enemies.map(e=>e.weakenMult);
       x=fixture('ueda_kana_work');
       out.kanaPassive=passiveHealMultiplier(x.allies[0],x.allies[1]);
       applySkill(0,0,'ally',1);
       out.kanaS1={hp:x.allies.map(a=>a.hp),cooldown:x.allies[0].cooldowns[0]};
       x=fixture('ueda_kana_work');
       applySkill(0,1,'ally',1);
       out.kanaS2={hp:x.allies.map(a=>a.hp),cooldown:x.allies[0].cooldowns[1]};
       x=fixture('tokiwa_aone_work');
       applySkill(0,0,'enemy',0);
       out.oldAoneCT=x.enemies.map(e=>e.attackTimer);
       x=fixture('yui_daily');
       applySkill(0,0,'ally',1);
       out.oldYuiBuff=x.allies.map(a=>a.defenseBuffMult);
       x=fixture('chiyozaki_suzuha_work');
       applySkill(0,0,'ally',1);
       out.oldSuzuhaBuff=x.allies.map(a=>a.defenseBuffMult);
       x=fixture('sakuraba_renka_work');
       applySkill(0,1,'enemy',0);
       out.oldRenkaCT=x.enemies.map(e=>e.attackTimer);
       x=fixture('momoka_work');
       x.allies[1].cooldowns=[20,26];
       applySkill(0,0,'ally',1);
       out.oldMomokaCt=x.allies[1].cooldowns.slice();
       x=fixture('milku_work');
       applySkill(0,0,'ally',1);
       out.oldMilkuHeal=x.allies[1].hp;
       return out;
     }finally {battle=null;Math.random=originalRandom;}
   }""")
   assert all(abs(mult-1.1944)<1e-9 and until==18 for mult,until in combat["cecilS1"]["buffs"]),combat
   assert combat["cecilS1"]["selfCt"]==19 and combat["cecilS1"]["enemies"]==[1,1,1],combat
   cts=combat["cecilS2"]["cts"]
   assert all(abs(p-q)<1e-8 for p,q in zip(cts[0],[17.2,22.2])),combat
   assert all(abs(p-q)<1e-8 for p,q in zip(cts[1],[18.2,24.2])),combat
   assert all(abs(p-q)<1e-8 for p,q in zip(cts[2],[10,13.2])),combat
   assert combat["cecilExpiry"]==[1,1,1],combat
   assert combat["honokaS1"]["damage"]>0 and combat["honokaS1"]["cooldown"]==19,combat
   assert all(abs(a-b)<1e-9 for a,b in zip(combat["honokaS1"]["ct"],[2,0,0])),combat
   assert abs(combat["honokaPassive"]-1.06)<1e-9,combat
   assert all(abs(x-.85)<1e-9 for x in combat["honokaS2"]["weak"][:2]) and combat["honokaS2"]["weak"][2]==1,combat
   assert combat["honokaS2"]["until"]==[16,16,0] and combat["honokaS2"]["cooldown"]==24,combat
   assert combat["honokaExpiry"]==[1,1,1],combat
   assert abs(combat["kanaPassive"]-1.08)<1e-9,combat
   assert combat["kanaS1"]["hp"]==[45,107,45] and combat["kanaS1"]["cooldown"]==19,combat
   assert combat["kanaS2"]["hp"]==[72,72,72] and combat["kanaS2"]["cooldown"]==24,combat
   assert abs(combat["oldAoneCT"][0]-4.6)<1e-9 and combat["oldAoneCT"][1:]==[2,2],combat
   assert combat["oldYuiBuff"]==[1.3]*3,combat
   assert all(abs(x-1.2376)<1e-9 for x in combat["oldSuzuhaBuff"]),combat
   assert all(abs(a-b)<1e-9 for a,b in zip(combat["oldRenkaCT"],[3.6,3.6,2])),combat
   assert all(abs(a-b)<1e-9 for a,b in zip(combat["oldMomokaCt"],[17.7,23.7])),combat
   assert combat["oldMilkuHeal"]==102,combat
   for obj,name in zip((a,b,c),NAMES):
    page.evaluate("""id=>{
      S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
      S.quests.q6={complete:true};S.owned[id]={lv:1,aff:0,lb:0,copies:0};
      S.selected=id;view='unit';render();
    }""",obj["id"])
    screen=page.evaluate("""()=>({
      name:document.body.textContent||'',
      imgs:[...document.querySelectorAll('img')].map(x=>x.getAttribute('src')||'')
    })""")
    assert name in screen["name"] and any(obj["art"] in u for u in screen["imgs"]),(mode,obj["id"],screen["imgs"][:30])
    page.screenshot(path=str(OUT/f"{mode}_{obj['id']}.png"),full_page=True)
   assert not errors,(mode,errors)
   reports[mode]={"status":"PASS","baseline":baseline,"combat":combat,"js_errors":errors}
   ctx.close()
  browser.close()
finally:
 srv.shutdown()
(OUT/"result.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print("REDRAW3 STAGE2 SR BROWSER QA PASS",json.dumps({k:v["status"] for k,v in reports.items()},ensure_ascii=False),flush=True)
