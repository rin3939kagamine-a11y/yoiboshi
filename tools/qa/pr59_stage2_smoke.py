#!/usr/bin/env python3
"""PR #59 four approved SRs — browser/live applySkill QA, q6, 166 pool, safe saves."""
import json, subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/pr59_stage2"
OUT.mkdir(parents=True,exist_ok=True)
IDS=("takamiya_sayaka_work","shirase_marika_work","miyoshi_nanami_work","hayase_rio_work")
PERSONS=("takamiya_sayaka","shirase_marika","miyoshi_nanami","hayase_rio")
NAMES=("高宮 さやか","白瀬 まりか","三好 ななみ","早瀬 りお")
BASE=((165,11,5),(148,9,5),(125,19,3),(125,19,3))
SKILLS=(("sayaka_team_attack_up","sayaka_team_defense_up"),
        ("marika_heal_all_22","marika_heal_one_65"),
        ("nanami_strike_26","nanami_attack_down"),
        ("rio_strike_self_attack","rio_aoe_18"))
PASSIVES=(("sayaka_buff",8),("marika_rescue",12),("nanami_debuff_extend",1.5),("rio_attack",6))

def source_on_main(path):
 return subprocess.check_output(["git","show",f"origin/main:{path}"],cwd=ROOT,text=True)
old=source_on_main("js/game.js")
new=(ROOT/"js/game.js").read_text(encoding="utf-8")
old_perf=source_on_main("js/performance_v016.js")
new_perf=(ROOT/"js/performance_v016.js").read_text(encoding="utf-8")
old_index=source_on_main("index.html")
new_index=(ROOT/"index.html").read_text(encoding="utf-8")
for token in ("const KEY=","const ROLES=","const RATE=","const NEW19_RATE=",
              "const GACHA_CONFIG=","const NORMAL_GACHA_POOL=",
              "const NEW19_GACHA_POOL=","function migrateSave(",
              "function drawNormalGachaUnit(","function rollNormalGachaRarity("):
 a=old.index(token);b=new.index(token)
 assert old[a:old.index("\n",a)]==new[b:new.index("\n",b)],("protected line changed",token)
a=old.index("const UNITS=[");b=new.index("const UNITS=[")
assert old[a:old.index("\n];",a)+3]==new[b:new.index("\n];",b)+3],"legacy initial UNITS table changed"
for path in ("js/heroines_v0810_units.js","js/heroines_v0830_units.js",
             "js/heroines_v0840_units.js","js/heroines_v0850_units.js",
             "js/heroines_v0860.js","js/heroines_v0860_wire.js"):
 assert (ROOT/path).read_text(encoding="utf-8")==source_on_main(path),("legacy hero file changed",path)
assert "NEW_UNIT_ROSTER_V0860" in new and "NEW_UNIT_DESIGN_V0860" in new_perf
assert old_index.count("heroines_v0860_units.js")==0
assert new_index.count("heroines_v0860_units.js")==1
assert new_index.index("heroines_v0860_units.js")<new_index.index("js/performance_v016.js")<new_index.index("js/game.js")
for id in PERSONS:
 assert (ROOT/"assets/ART_V2/full_body"/f"{id}.png").exists(),id

class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass

srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url=f"http://127.0.0.1:{srv.server_port}/index.html"
reports={}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,width,height in (("portrait",390,844),("landscape",844,390)):
   context=browser.new_context(viewport={"width":width,"height":height})
   page=context.new_page()
   errors=[]
   page.on("pageerror",lambda err:errors.append(str(err)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof S!=='undefined'&&typeof NEW_UNIT_ROSTER_V0860!=='undefined'&&typeof applySkill==='function'",timeout=55000)
   baseline=page.evaluate("""()=>{
     gachaMode='normal';
     const ids=['takamiya_sayaka_work','shirase_marika_work','miyoshi_nanami_work','hayase_rio_work'];
     const empty=fresh(),q3=fresh(),q6=fresh();q3.quests.q3={complete:true};q6.quests.q6={complete:true};
     const eligible=(save,id)=>availableNormalPool(save).some(x=>x.id===id);
     const roster=ids.map(id=>{
       const u=BYID[id];
       S=fresh();S.owned[id]={lv:1,aff:0,lb:0,copies:0};
       const level1=unitPower(id);
       S.owned[id]={lv:5,aff:0,lb:0,copies:0};
       const level5=unitPower(id);
       return {id,person:u?.person,rarity:u?.rarity,role:u?.role,
         name:PEOPLE[u?.person]?.name,
         stats:level1,lvl5:level5,
         skills:[unitSkillType(u,0),unitSkillType(u,1)],
         targets:[skillTarget(u,0),skillTarget(u,1)],
         passive:unitPassive(u),passiveValue:passiveValue(u),
         skillText:[skillDescription(u,0),skillDescription(u,1),passiveDescription(u)],
         image:unitArt(u),
         inNormal:NORMAL_GACHA_POOL.some(x=>x.id===id),
         inSpecial:NEW19_GACHA_POOL.some(x=>x.id===id),
         before:eligible(empty,id),atQ3:eligible(q3,id),atQ6:eligible(q6,id),
         gate:NEW_HERO_REVEAL_V0860[u?.person]};
     });
     const legacy=fresh();
     legacy.owned.momoka_work={lv:5,aff:18,lb:2,copies:3};
     legacy.owned.milku_work={lv:3,aff:11,lb:0,copies:1};
     legacy.party=['momoka_work','milku_work'];legacy.selected='momoka_work';
     legacy.homeFavorite='momoka';legacy.homeUnitId='momoka_work';
     legacy.gems=2345;legacy.gold=4321;legacy.pulls=17;
     legacy.gachaPity=8;legacy.gachaSrStreak=2;
     legacy.quests.q2={complete:true};legacy.storyFlags.qaLegacy=true;
     const migrated=migrateSave(JSON.parse(JSON.stringify(legacy)));
     return {
       key:SaveStore.key,
       rates:{...RATE},new19Rates:{...NEW19_RATE},
       costs:[GACHA_CONFIG.ONE_COST,GACHA_CONFIG.TEN_COST],
       srCount:NORMAL_GACHA_POOL.filter(x=>x.rarity==='SR').length,
       withoutNew:NORMAL_GACHA_POOL.filter(x=>x.rarity==='SR'&&!ids.includes(x.id)).length,
       unique:new Set(UNITS.map(x=>x.id)).size===UNITS.length,
       healerBase:ROLES.healer,supportBase:ROLES.support,attackerBase:ROLES.attacker,
       units:roster,
       legacy:{
        owned:JSON.stringify(migrated.owned.momoka_work)===JSON.stringify(legacy.owned.momoka_work)
          &&JSON.stringify(migrated.owned.milku_work)===JSON.stringify(legacy.owned.milku_work),
        party:JSON.stringify(migrated.party)===JSON.stringify(legacy.party),
        selected:migrated.selected===legacy.selected,
        home:migrated.homeFavorite===legacy.homeFavorite&&migrated.homeUnitId===legacy.homeUnitId,
        funds:migrated.gems===2345&&migrated.gold===4321&&migrated.pulls===17,
        pity:migrated.gachaPity===8&&migrated.gachaSrStreak===2,
        story:migrated.quests.q2.complete&&migrated.storyFlags.qaLegacy,
        noAutoOwned:ids.every(id=>!migrated.owned[id])
       },
       existingUnits:['momoka_work','milku_work','ginjo_cecil_work','hasegawa_honoka_work','ueda_kana_work',
                      'tokiwa_aone_work','chiyozaki_suzuha_work','sakuraba_renka_work'].map(id=>({
         id,rarity:BYID[id].rarity,skills:[unitSkillType(BYID[id],0),unitSkillType(BYID[id],1)],
         passive:unitPassive(BYID[id])}))
     };
   }""")
   assert baseline["key"]=="yoiboshi-reboot-v1",baseline
   assert baseline["rates"]=={"R":60,"SR":25,"SSR":10,"UR":5},baseline
   assert baseline["new19Rates"]=={"SR":80,"SSR":15,"UR":5},baseline
   assert baseline["costs"]==[120,1000] and baseline["srCount"]==166 and baseline["withoutNew"]==162 and baseline["unique"],baseline
   assert all(baseline["legacy"].values()),baseline
   assert (baseline["healerBase"]["hp"],baseline["healerBase"]["atk"],baseline["healerBase"]["def"])==(148,9,5),baseline
   for actual,id,person,name,role,stats,skills,passive in zip(baseline["units"],IDS,PERSONS,NAMES,
       ("support","healer","attacker","attacker"),BASE,SKILLS,PASSIVES):
    assert (actual["id"],actual["person"],actual["name"],actual["rarity"],actual["role"])==(id,person,name,"SR",role),actual
    assert (actual["stats"]["hp"],actual["stats"]["atk"],actual["stats"]["def"])==stats,actual
    assert actual["skills"]==list(skills),actual
    assert actual["targets"]==(["ally","ally"] if role in ("support","healer") else ["enemy","enemy"]),actual
    assert actual["passive"]["type"]==passive[0] and actual["passiveValue"]==passive[1],actual
    assert actual["inNormal"] and not actual["inSpecial"] and not actual["before"] and not actual["atQ3"] and actual["atQ6"] and actual["gate"]=="q6",actual
    assert f"/full_body/{person}.png" in actual["image"],actual
   a,b,c,d=baseline["units"]
   for token in ("18%","8秒"):
    assert token in a["skillText"][0] and token in a["skillText"][1],a
   assert "+8%" in a["skillText"][2],a
   assert "22" in b["skillText"][0] and "65" in b["skillText"][1] and "+12%" in b["skillText"][2],b
   assert "26" in c["skillText"][0] and "-28%" in c["skillText"][1] and "9.5秒" in c["skillText"][1] and "+1.5秒" in c["skillText"][2],c
   assert "26" in d["skillText"][0] and "15%" in d["skillText"][0] and "18" in d["skillText"][1] and "+6%" in d["skillText"][2],d
   for actual in baseline["units"]:
    response=page.request.get(url.rsplit("/",1)[0]+"/"+actual["image"],timeout=25000)
    assert response.status==200 and len(response.body())>2000,(mode,actual["id"],response.status)
   # Real live applySkill() paths rather than simulating formulas externally.
   combat=page.evaluate("""()=>{
     const origRandom=Math.random;Math.random=()=>.9;
     const mkAlly=(id,i)=>{
       const u=BYID[id],role=ROLES[u.role];
       return {id,hp:60,max:200,atk:role.atk,def:role.def,
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
         enemies:[mkEnemy('Enemy-A',600),mkEnemy('Enemy-B',600),mkEnemy('Dead',0)]};
       return battle;
     };
     const out={};
     try {
       let x=fixture('takamiya_sayaka_work');
       applySkill(0,0,'ally',1);
       out.sayakaS1={mult:x.allies.map(z=>z.rallyMult),until:x.allies.map(z=>z.rallyUntil),
         defensive:x.allies.map(z=>z.defenseBuffMult),cooldown:x.allies[0].cooldowns[0]};
       x.sim=18.01;tickTimedEffects();out.sayakaAttackExpiry=x.allies.map(z=>z.rallyMult);
       x=fixture('takamiya_sayaka_work');
       applySkill(0,1,'ally',1);
       out.sayakaS2={mult:x.allies.map(z=>z.defenseBuffMult),until:x.allies.map(z=>z.defenseBuffUntil),
         rally:x.allies.map(z=>z.rallyMult),cooldown:x.allies[0].cooldowns[1]};
       x.sim=18.01;tickTimedEffects();out.sayakaDefenseExpiry=x.allies.map(z=>z.defenseBuffMult);
       x=fixture('shirase_marika_work');
       x.allies[1].hp=130;x.allies[2].hp=0;
       out.marikaPassive={critical:passiveHealMultiplier(x.allies[0],x.allies[0]),
          healthy:passiveHealMultiplier(x.allies[0],x.allies[1])};
       applySkill(0,0,'ally',0);
       out.marikaS1={hp:x.allies.map(z=>z.hp),cooldown:x.allies[0].cooldowns[0]};
       x=fixture('shirase_marika_work');
       applySkill(0,1,'ally',1);out.marikaS2Critical={hp:x.allies.map(z=>z.hp),cooldown:x.allies[0].cooldowns[1]};
       x=fixture('shirase_marika_work');x.allies[1].hp=130;
       applySkill(0,1,'ally',1);out.marikaS2Healthy=x.allies[1].hp;
       x=fixture('miyoshi_nanami_work');
       let oldHp=x.enemies[0].hp;
       applySkill(0,0,'enemy',0);
       out.nanamiS1={damage:oldHp-x.enemies[0].hp,cooldown:x.allies[0].cooldowns[0]};
       x=fixture('miyoshi_nanami_work');
       applySkill(0,1,'enemy',0);
       out.nanamiS2={weak:x.enemies.map(z=>z.weakenMult),
         until:x.enemies.map(z=>z.weakenUntil),cooldown:x.allies[0].cooldowns[1]};
       x.sim=19.51;tickTimedEffects();out.nanamiExpiry=x.enemies.map(z=>z.weakenMult);
       x=fixture('hayase_rio_work');
       out.rioPassive=passiveAttackMultiplier(x.allies[0],x.enemies[0]);
       let startHp=x.enemies[0].hp;
       applySkill(0,0,'enemy',0);
       out.rioS1={damage:startHp-x.enemies[0].hp,rally:x.allies[0].rallyMult,
         until:x.allies[0].rallyUntil,cooldown:x.allies[0].cooldowns[0]};
       let hp=x.enemies.map(z=>z.hp);
       applySkill(0,1,'enemy',1);
       out.rioS2Buffed={damage:x.enemies.map((e,i)=>hp[i]-e.hp),
         cooldown:x.allies[0].cooldowns[1]};
       x=fixture('hayase_rio_work');
       hp=x.enemies.map(z=>z.hp);
       applySkill(0,1,'enemy',1);
       out.rioS2Bare={damage:x.enemies.map((e,i)=>hp[i]-e.hp)};
       x=fixture('hayase_rio_work');
       applySkill(0,0,'enemy',0);x.sim=16.1;tickTimedEffects();
       out.rioExpiry=x.allies[0].rallyMult;
       x=fixture('chiyozaki_suzuha_work');
       applySkill(0,0,'ally',1);out.oldSuzuha=x.allies.map(z=>z.defenseBuffMult);
       x=fixture('ginjo_cecil_work');
       applySkill(0,0,'ally',1);out.oldCecil=x.allies.map(z=>z.defenseBuffMult);
       x=fixture('ueda_kana_work');
       applySkill(0,1,'ally',1);out.oldKana=x.allies.map(z=>z.hp);
       x=fixture('tokiwa_aone_work');
       applySkill(0,0,'enemy',0);out.oldAone=x.enemies.map(z=>z.attackTimer);
       x=fixture('sakuraba_renka_work');
       applySkill(0,1,'enemy',0);out.oldRenka=x.enemies.map(z=>z.attackTimer);
       return out;
     }finally {battle=null;Math.random=origRandom;}
   }""")
   assert all(abs(v-1.1944)<1e-8 for v in combat["sayakaS1"]["mult"]),combat
   assert combat["sayakaS1"]["until"]==[18,18,18] and combat["sayakaS1"]["defensive"]==[1,1,1] and combat["sayakaS1"]["cooldown"]==19,combat
   assert combat["sayakaAttackExpiry"]==[1,1,1],combat
   assert all(abs(v-1.1944)<1e-8 for v in combat["sayakaS2"]["mult"]),combat
   assert combat["sayakaS2"]["until"]==[18,18,18] and combat["sayakaS2"]["rally"]==[1,1,1] and combat["sayakaS2"]["cooldown"]==24,combat
   assert combat["sayakaDefenseExpiry"]==[1,1,1],combat
   assert abs(combat["marikaPassive"]["critical"]-1.12)<1e-8 and combat["marikaPassive"]["healthy"]==1,combat
   assert combat["marikaS1"]["hp"]==[85,152,0] and combat["marikaS1"]["cooldown"]==19,combat
   assert combat["marikaS2Critical"]["hp"]==[60,133,60] and combat["marikaS2Critical"]["cooldown"]==24,combat
   assert combat["marikaS2Healthy"]==195,combat
   assert combat["nanamiS1"]["damage"]>0 and combat["nanamiS1"]["cooldown"]==19,combat
   assert all(abs(a-b)<1e-8 for a,b in zip(combat["nanamiS2"]["weak"],[.72,1,1])) and combat["nanamiS2"]["until"]==[19.5,0,0] and combat["nanamiS2"]["cooldown"]==24,combat
   assert combat["nanamiExpiry"]==[1,1,1],combat
   assert abs(combat["rioPassive"]-1.06)<1e-8,combat
   assert combat["rioS1"]["damage"]>0 and abs(combat["rioS1"]["rally"]-1.15)<1e-8 and combat["rioS1"]["until"]==16 and combat["rioS1"]["cooldown"]==19,combat
   assert combat["rioS2Buffed"]["cooldown"]==24 and combat["rioS2Buffed"]["damage"][2]==0 and combat["rioS2Bare"]["damage"][2]==0,combat
   assert all(x>0 for x in combat["rioS2Buffed"]["damage"][:2]) and all(x>0 for x in combat["rioS2Bare"]["damage"][:2]),combat
   assert all(x>y for x,y in zip(combat["rioS2Buffed"]["damage"][:2],combat["rioS2Bare"]["damage"][:2])),combat
   assert combat["rioExpiry"]==1,combat
   assert all(abs(x-1.2376)<1e-8 for x in combat["oldSuzuha"]),combat
   assert all(abs(x-1.1944)<1e-8 for x in combat["oldCecil"]),combat
   assert combat["oldKana"]==[87,87,87],combat
   assert abs(combat["oldAone"][0]-4.6)<1e-8,combat
   assert all(abs(x-y)<1e-8 for x,y in zip(combat["oldRenka"],[3.6,3.6,2])),combat
   for unit,person,name in zip(IDS,PERSONS,NAMES):
    page.evaluate("""id=>{
      S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
      S.quests.q6={complete:true};
      S.owned[id]={lv:1,aff:0,lb:0,copies:0};
      S.selected=id;view='unit';render();
    }""",unit)
    screen=page.evaluate("""()=>({
      text:document.body.textContent||'',
      images:[...document.querySelectorAll('img')].map(x=>x.getAttribute('src')||'')
    })""")
    assert name in screen["text"] and any(f"/full_body/{person}.png" in img for img in screen["images"]),(mode,unit,screen["images"][:25])
    page.screenshot(path=str(OUT/f"{mode}_{unit}.png"),full_page=True)
   assert not errors,(mode,errors)
   reports[mode]={"result":"PASS","baseline":baseline,"combat":combat,"js_errors":errors}
   context.close()
  browser.close()
finally:
 srv.shutdown()
(OUT/"report.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print("PR59 FOUR SR STAGE2 REAL BATTLE QA PASS",json.dumps({k:v["result"] for k,v in reports.items()},ensure_ascii=False),flush=True)
