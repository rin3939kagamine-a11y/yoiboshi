#!/usr/bin/env python3
"""Stage-2 Suzuha/Renka SR QA: actual browser engine, saves, odds, gates, and legacy combat."""
import json
import subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts"/"suzuha_renka_stage2"
OUT.mkdir(parents=True,exist_ok=True)
BASE=lambda path: subprocess.check_output(["git","show",f"origin/main:{path}"],cwd=ROOT,text=True)
game_before=BASE("js/game.js")
game_now=(ROOT/"js/game.js").read_text()
perf_before=BASE("js/performance_v016.js")
perf_now=(ROOT/"js/performance_v016.js").read_text()
index_before=BASE("index.html")
index_now=(ROOT/"index.html").read_text()

# All existing roster records, save migration, base stats, gacha weights and rates are unchanged.
def compare_line(src_a,src_b,token):
    aa=src_a.index(token);bb=src_b.index(token)
    assert src_a[aa:src_a.index("\n",aa)]==src_b[bb:src_b.index("\n",bb)],("modified",token)
for k in ("const KEY=","const ROLES=","const RATE=","const NEW19_RATE=","const GACHA_CONFIG=",
          "const NORMAL_GACHA_POOL=","const NEW19_GACHA_POOL=","const DISTRICT_GACHA_IDS=",
          "function migrateSave(","function drawNormalGachaUnit(","function rollNormalGachaRarity(",
          "function unitPower("):
    compare_line(game_before,game_now,k)
start1=game_before.index("const UNITS=[");start2=game_now.index("const UNITS=[")
assert game_before[start1:game_before.index("\n];",start1)+3]==game_now[start2:game_now.index("\n];",start2)+3]
# Additions are only to unit and design registries. Existing names and skill tables retain their values.
for k in ("const SKILL_TARGET=","const SKILL_LABEL=","const PASSIVE_SCALE=","const PASSIVE_INFO=","function unitSkillType("):
    assert k in perf_before and k in perf_now
assert game_now.count("...NEW_UNIT_ROSTER_V0840")==1
assert game_now.count("...NEW_UNIT_ARTWORK_V0840")==1
assert perf_now.count("...NEW_UNIT_DESIGN_V0840")==1
assert index_before.count('heroines_v0840_units.js')==0 and index_now.count('heroines_v0840_units.js')==1

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url=f"http://127.0.0.1:{srv.server_port}/index.html"
outputs={}
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,w,h in (("portrait",390,844),("landscape",844,390)):
   context=browser.new_context(viewport={"width":w,"height":h})
   page=context.new_page()
   errors=[]
   page.on("pageerror",lambda e:errors.append(str(e)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof S!=='undefined' && typeof NEW_UNIT_ROSTER_V0840!=='undefined' && typeof applySkill==='function'",timeout=45000)
   baseline=page.evaluate("""()=>{
     const ids=['chiyozaki_suzuha_work','sakuraba_renka_work'],old=['momoka_work','tokiwa_aone_work','sakakibara_kaho_work','minase_ririka_work'];
     gachaMode='normal';
     const zero=fresh(),q3=fresh(),q6=fresh();q3.quests.q3={complete:true};q6.quests.q6={complete:true};
     const eligible=(save,id)=>availableNormalPool(save).some(x=>x.id===id);
     const snapshots=ids.map(id=>{
       const u=BYID[id];
       return {id,person:u?.person,rarity:u?.rarity,role:u?.role,title:u?.title,labels:u?.s,
         stats:u?ROLES[u.role]:null,atLv1:unitPowerForQA(id),
         skills:[unitSkillType(u,0),unitSkillType(u,1)],targets:[skillTarget(u,0),skillTarget(u,1)],
         passive:unitPassive(u),passiveValue:passiveValue(u),
         texts:[skillDescription(u,0),skillDescription(u,1),passiveDescription(u)],
         image:unitArt(u),normal:NORMAL_GACHA_POOL.some(x=>x.id===id),
         new19:NEW19_GACHA_POOL.some(x=>x.id===id),
         before:eligible(zero,id),afterQ3:eligible(q3,id),afterQ6:eligible(q6,id)};
     });
     const prior=fresh();prior.owned.momoka_work={lv:5,aff:18,lb:2,copies:3};
     prior.owned.milku_work={lv:3,aff:11,lb:0,copies:1};
     prior.party=['momoka_work','milku_work'];prior.selected='momoka_work';
     prior.homeFavorite='momoka';prior.homeUnitId='momoka_work';
     prior.gems=2345;prior.gold=4321;prior.pulls=17;prior.gachaPity=8;prior.gachaSrStreak=2;
     prior.quests.q2={complete:true};prior.storyFlags.qaPrior=true;
     const migrated=migrateSave(JSON.parse(JSON.stringify(prior)));
     const snapshotOld=old.map(id=>({id,rarity:BYID[id].rarity,
       skills:[unitSkillType(BYID[id],0),unitSkillType(BYID[id],1)],
       passive:unitPassive(BYID[id]),pvalue:passiveValue(BYID[id])}));
     return {
       key:SaveStore.key,rates:{...RATE},new19Rates:{...NEW19_RATE},
       costs:[GACHA_CONFIG.ONE_COST,GACHA_CONFIG.TEN_COST],
       normalCount:NORMAL_GACHA_POOL.length,srCount:NORMAL_GACHA_POOL.filter(x=>x.rarity==='SR').length,
       ids:snapshots,old:snapshotOld,unique:new Set(UNITS.map(x=>x.id)).size===UNITS.length,
       saved:{owned:JSON.stringify(prior.owned.momoka_work)===JSON.stringify(migrated.owned.momoka_work)
             &&JSON.stringify(prior.owned.milku_work)===JSON.stringify(migrated.owned.milku_work),
         party:JSON.stringify(prior.party)===JSON.stringify(migrated.party),
         selected:prior.selected===migrated.selected,home:prior.homeFavorite===migrated.homeFavorite&&prior.homeUnitId===migrated.homeUnitId,
         funds:migrated.gems===2345&&migrated.gold===4321&&migrated.pulls===17,
         pity:migrated.gachaPity===8&&migrated.gachaSrStreak===2,
         progress:!!migrated.quests.q2.complete&&!!migrated.storyFlags.qaPrior,
         noNew:ids.every(id=>!migrated.owned[id])}
     };
   }""".replace("unitPowerForQA(id)","ROLES[u.role]"))
   assert baseline["key"]=="yoiboshi-reboot-v1" and baseline["rates"]=={"R":60,"SR":25,"SSR":10,"UR":5},baseline
   assert baseline["new19Rates"]=={"SR":80,"SSR":15,"UR":5} and baseline["costs"]==[120,1000],baseline
   assert baseline["unique"] and baseline["srCount"]==159 and all(baseline["saved"].values()),baseline
   a,b=baseline["ids"]
   assert (a["person"],a["rarity"],a["role"])==("chiyozaki_suzuha","SR","support"),a
   assert (b["person"],b["rarity"],b["role"])==("sakuraba_renka","SR","attacker"),b
   assert (a["stats"]["hp"],a["stats"]["atk"],a["stats"]["def"])==(165,11,5),a
   assert (b["stats"]["hp"],b["stats"]["atk"],b["stats"]["def"])==(125,19,3),b
   assert a["skills"]==["suzuha_defense_up","suzuha_cleanse_heal"] and a["targets"]==["ally","ally"],a
   assert b["skills"]==["renka_strike_down","renka_enemy_ct_all"] and b["targets"]==["enemy","enemy"],b
   assert a["passive"]["type"]=="suzuha_defense_focus" and a["passiveValue"]==8,a
   assert b["passive"]["type"]=="renka_attack" and b["passiveValue"]==6,b
   assert all(x["normal"] and not x["new19"] and not x["before"] and not x["afterQ3"] and x["afterQ6"] for x in (a,b)),baseline
   assert "22%" in a["texts"][0] and "30回復" in a["texts"][1] and "+8%" in a["texts"][2],a
   assert "-18%" in b["texts"][0] and "1.6秒" in b["texts"][1] and "+6%" in b["texts"][2],b
   assert baseline["old"]==[
     {"id":"momoka_work","rarity":"SR","skills":["ct","stun"],"passive":{"type":"team_start_atk","name":"相談室の応援"},"pvalue":5},
     {"id":"tokiwa_aone_work","rarity":"SR","skills":["enemy_ct","ct"],"passive":{"type":"ct_focus","name":"音の先読み"},"pvalue":7},
     {"id":"sakakibara_kaho_work","rarity":"SR","skills":["attack_up","attack_down"],"passive":{"type":"attack_down_extend","name":"空間演出の目利き"},"pvalue":1.5},
     {"id":"minase_ririka_work","rarity":"SR","skills":["heal_one","cleanse"],"passive":{"type":"rescue","name":"細やかな気配り"},"pvalue":10}
   ],baseline["old"]
   for unit in (a,b):
    response=page.request.get(url.rsplit("/",1)[0]+"/"+unit["image"])
    assert response.status==200 and len(response.body())>1000,(mode,unit,response.status)
   # Actually call existing combat skill engine, with old and new units on the same fixture.
   combat=page.evaluate("""()=>{
     const oldRandom=Math.random;Math.random=()=>.9;
     const snapshots={};
     const mkAlly=(id,idx)=>({id,hp:55,max:100,atk:ROLES[BYID[id].role].atk,def:ROLES[BYID[id].role].def,
       shield:0,taunt:0,cooldowns:[0,0],x:16+idx*20,y:30,attackTimer:10,
       defenseBuffUntil:0,defenseBuffMult:1,healBuffUntil:0,healBuffMult:1,
       damageReduceUntil:0,damageReduceMult:1,rallyUntil:0,rallyMult:1});
     const mkEnemy=(name,hp=150)=>({name,hp,max:hp,atk:30,attackTimer:2,interval:2.1,
       x:75,y:35,damageReduction:0,weakenMult:1,weakenUntil:0});
     const fixture=(actor,target='momoka_work')=>{
       S=fresh();S.owned[actor]={lv:1,aff:0,lb:0,copies:0};S.owned[target]={lv:1,aff:0,lb:0,copies:0};
       battle={qid:'q2',sim:10,phase:'fight',done:false,log:[],popups:[],
         allies:[mkAlly(actor,0),mkAlly(target,1)],enemies:[mkEnemy('敵A'),mkEnemy('敵B'),mkEnemy('撃破済',0)]};
       return battle;
     };
     try{
       let x=fixture('chiyozaki_suzuha_work');
       applySkill(0,0,'ally',1);
       snapshots.suzuhaBuff={allies:x.allies.map(z=>({mult:z.defenseBuffMult,until:z.defenseBuffUntil})),
         other:x.enemies.map(z=>z.weakenMult),cooldown:x.allies[0].cooldowns[0]};
       x.allies[1].hp=45;
       x.allies[1].weakenUntil=18;x.allies[1].weakenMult=.6;
       x.allies[1].defenseDownUntil=18;
       applySkill(0,1,'ally',1);
       snapshots.suzuhaCleanse={hp:x.allies[1].hp,weakenUntil:x.allies[1].weakenUntil,
         weakenMult:x.allies[1].weakenMult,defenseDownUntil:x.allies[1].defenseDownUntil,
         cooldown:x.allies[0].cooldowns[1]};
       x.sim=18.1;tickTimedEffects();
       snapshots.suzuhaExpiry=x.allies.map(z=>z.defenseBuffMult);
       x=fixture('sakuraba_renka_work');
       const first=x.enemies[0],second=x.enemies[1],hp=first.hp;
       snapshots.renkaPassive=passiveAttackMultiplier(x.allies[0],first);
       applySkill(0,0,'enemy',0);
       snapshots.renkaStrike={damage:hp-first.hp,weak:first.weakenMult,until:first.weakenUntil,
         secondWeak:second.weakenMult,cooldown:x.allies[0].cooldowns[0]};
       const timers=x.enemies.map(y=>y.attackTimer);
       applySkill(0,1,'enemy',0);
       snapshots.renkaCT=x.enemies.map((e,i)=>e.attackTimer-timers[i]);
       snapshots.renkaCooldown=x.allies[0].cooldowns[1];
       x.sim=16.1;tickTimedEffects();snapshots.renkaExpiry=first.weakenMult;
       x=fixture('tokiwa_aone_work');const oldTimer=x.enemies.map(z=>z.attackTimer);
       applySkill(0,0,'enemy',0);
       snapshots.aoneCT=x.enemies.map((e,i)=>e.attackTimer-oldTimer[i]);
       x=fixture('yui_daily');applySkill(0,0,'ally',1);
       snapshots.yuiDefense=x.allies.map(a=>a.defenseBuffMult);
       x=fixture('noel_star');applySkill(0,0,'enemy',0);
       snapshots.noelDebuff={weak:x.enemies[0].weakenMult,until:x.enemies[0].weakenUntil};
       x=fixture('momoka_work');const before=x.allies.map(z=>z.cooldowns.slice());
       x.allies[0].cooldowns=[0,26];x.allies[1].cooldowns=[25,26];
       applySkill(0,0,'ally',1);snapshots.momokaCT=x.allies.map(z=>z.cooldowns);
       return snapshots;
     }finally{battle=null;Math.random=oldRandom;}
   }""")
   guard=combat["suzuhaBuff"]
   assert all(abs(v["mult"]-1.2376)<1e-8 and v["until"]==18 for v in guard["allies"]),combat
   assert guard["other"]==[1,1,1] and guard["cooldown"]==19,combat
   assert combat["suzuhaCleanse"]=={"hp":75,"weakenUntil":0,"weakenMult":1,"defenseDownUntil":0,"cooldown":24},combat
   assert combat["suzuhaExpiry"]==[1,1],combat
   strike=combat["renkaStrike"]
   assert strike["damage"]>0 and abs(strike["weak"]-.82)<1e-9 and strike["until"]==16,combat
   assert strike["secondWeak"]==1 and strike["cooldown"]==19 and abs(combat["renkaPassive"]-1.06)<1e-9,combat
   assert all(abs(v-1.6)<1e-9 for v in combat["renkaCT"][:2]) and combat["renkaCT"][2]==0,combat
   assert combat["renkaCooldown"]==24 and combat["renkaExpiry"]==1,combat
   assert abs(combat["aoneCT"][0]-2.6)<1e-9 and combat["aoneCT"][1:]==[0,0],combat
   assert combat["yuiDefense"]==[1.3,1.3] and combat["noelDebuff"]=={"weak":.72,"until":18},combat
   assert combat["momokaCT"][0]==[16.7,23.7] and combat["momokaCT"][1]==[22.7,23.7],combat
   assert not errors,(mode,errors)
   page.evaluate("""()=>{S=fresh();S.gameStarted=true;S.onboarding.enabled=false;S.quests.q6={complete:true};S.owned.chiyozaki_suzuha_work={lv:1,aff:0,lb:0,copies:0};S.selected='chiyozaki_suzuha_work';view='unit';render();}""")
   page.screenshot(path=str(OUT/f"{mode}_suzuha_unit.png"),full_page=True)
   page.evaluate("""()=>{S.owned.sakuraba_renka_work={lv:1,aff:0,lb:0,copies:0};S.selected='sakuraba_renka_work';view='unit';render();}""")
   page.screenshot(path=str(OUT/f"{mode}_renka_unit.png"),full_page=True)
   outputs[mode]={"qa":"PASS","baseline":baseline,"combat":combat,"browser_errors":errors}
   context.close()
  browser.close()
finally:
 srv.shutdown()
(OUT/"report.json").write_text(json.dumps(outputs,ensure_ascii=False,indent=2),encoding="utf-8")
print("SUZUHA RENKA STAGE-2 QA PASS",json.dumps({k:v["qa"] for k,v in outputs.items()},ensure_ascii=False),flush=True)
