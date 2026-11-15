#!/usr/bin/env python3
"""PR32/PR36 stage2: seven approved SR units, live battle effects, gates, odds, saves."""
import json
import subprocess
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/pr32_pr36_stage2"
OUT.mkdir(parents=True,exist_ok=True)
IDS=("aizawa_noa_work","yukishiro_mio_work","shiratori_yuzuha_work",
     "tsukishima_shino_work","hanasaki_rena_work","takamine_rino_work",
     "hoshino_emiri_work")
PERSONS=tuple(x[:-5] for x in IDS)
NAMES=("相沢 乃愛","雪代 澪","白鳥 柚葉","月島 詩乃","花咲 怜奈","高嶺 梨乃","星野 エミリ")
ROLES=("support","attacker","support","healer","support","healer","attacker")
BASE=((165,11,5),(125,19,3),(165,11,5),(148,9,5),(165,11,5),(148,9,5),(125,19,3))
SKILLS=(("sayaka_team_attack_up","kana_heal_all_25"),
        ("honoka_strike_ct","honoka_enemy_attack_down_all"),
        ("cecil_team_ct","sayaka_team_defense_up"),
        ("marika_heal_one_65","marika_heal_all_22"),
        ("rena_defense_up_22","rena_cleanse_heal_all_30"),
        ("kana_heal_all_25","rino_cleanse_heal_one_57"),
        ("rio_strike_self_attack","nanami_attack_down"))
PASSIVES=(("sayaka_buff",8),("rio_attack",6),("sayaka_buff",8),
          ("marika_rescue",12),("sayaka_buff",8),("heal",8),("nanami_debuff_extend",1.5))

def old(path):
    return subprocess.check_output(["git","show","origin/main:"+path],cwd=ROOT,text=True)

game=(ROOT/"js/game.js").read_text(encoding="utf-8")
prev=old("js/game.js")
performance=(ROOT/"js/performance_v016.js").read_text(encoding="utf-8")
index=(ROOT/"index.html").read_text(encoding="utf-8")
for marker in ("const KEY=","const ROLES=","const RATE=","const NEW19_RATE=",
               "const GACHA_CONFIG=","const NORMAL_GACHA_POOL=",
               "const NEW19_GACHA_POOL=","function migrateSave(",
               "function drawNormalGachaUnit(","function rollNormalGachaRarity("):
    a=prev.index(marker);b=game.index(marker)
    assert prev[a:prev.index("\n",a)]==game[b:game.index("\n",b)],("protected code changed",marker)
a=prev.index("const UNITS=[");b=game.index("const UNITS=[")
assert prev[a:prev.index("\n];",a)+3]==game[b:game.index("\n];",b)+3],"old UNITS array modified"
# Legacy switch cases and original calculations must be byte-equal.
marker="// PR #59 formally adopted"
a=prev.index(marker);b=game.index(marker)
assert prev[a:prev.index("\n  checkBattleDone();",a)]==game[b:game.index("\n  checkBattleDone();",b)],"legacy skill switch changed"
for p in ("js/heroines_v0860_units.js","js/heroines_v0870.js","js/heroines_v0870_wire.js",
          "js/heroines_v0850_units.js"):
    assert (ROOT/p).read_text(encoding="utf-8")==old(p),("existing art/character/unit modified",p)
assert "NEW_UNIT_ROSTER_V0870" in game and "NEW_UNIT_DESIGN_V0870" in performance
assert index.count("heroines_v0870_units.js")==1
assert index.index("heroines_v0870_units.js")<index.index("js/performance_v016.js")<index.index("js/game.js")
for person in PERSONS:
    assert (ROOT/"assets/ART_V2/full_body"/(person+".png")).is_file(),person
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass

server=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
url="http://127.0.0.1:"+str(server.server_port)+"/index.html"
reports={}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,w,h in (("portrait",390,844),("landscape",844,390)):
   context=browser.new_context(viewport={"width":w,"height":h})
   page=context.new_page()
   errors=[]
   page.on("pageerror",lambda err:errors.append(str(err)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof S!=='undefined' && typeof NEW_UNIT_ROSTER_V0870!=='undefined' && typeof applySkill==='function'",timeout=60000)
   baseline=page.evaluate("""()=>{
     gachaMode='normal';
     const ids=['aizawa_noa_work','yukishiro_mio_work','shiratori_yuzuha_work',
       'tsukishima_shino_work','hanasaki_rena_work','takamine_rino_work','hoshino_emiri_work'];
     const empty=fresh(),q5=fresh(),q6=fresh();
     q5.quests.q5={complete:true};q6.quests.q6={complete:true};
     const available=(save,id)=>availableNormalPool(save).some(u=>u.id===id);
     const units=ids.map(id=>{
       const u=BYID[id];
       S=fresh();S.owned[id]={lv:1,aff:0,lb:0,copies:0};
       const level1=unitPower(id);
       S.owned[id].lv=5;const level5=unitPower(id);
       return {id,person:u?.person,gate:u?.gate,name:PEOPLE[u?.person]?.name,
        rarity:u?.rarity,role:u?.role,stats:level1,level5:level5,
        skills:[unitSkillType(u,0),unitSkillType(u,1)],
        targets:[skillTarget(u,0),skillTarget(u,1)],
        passive:unitPassive(u),passiveValue:passiveValue(u),
        descriptions:[skillDescription(u,0),skillDescription(u,1),passiveDescription(u)],
        portrait:unitArt(u),normal:NORMAL_GACHA_POOL.some(x=>x.id===id),
        special:NEW19_GACHA_POOL.some(x=>x.id===id),
        before:available(empty,id),atQ5:available(q5,id),atQ6:available(q6,id),
        visibleBefore:visibleUnitV026(u,empty),visibleQ6:visibleUnitV026(u,q6),
        reveal:NEW_HERO_REVEAL_V0870[u?.person]};
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
      key:SaveStore.key,rate:{...RATE},rate19:{...NEW19_RATE},
      costs:[GACHA_CONFIG.ONE_COST,GACHA_CONFIG.TEN_COST],
      srCount:NORMAL_GACHA_POOL.filter(u=>u.rarity==='SR').length,
      withoutSeven:NORMAL_GACHA_POOL.filter(u=>u.rarity==='SR'&&!ids.includes(u.id)).length,
      unique:new Set(UNITS.map(x=>x.id)).size===UNITS.length,
      units:units,
      legacy:{
       owned:JSON.stringify(migrated.owned.momoka_work)===JSON.stringify(legacy.owned.momoka_work)&&JSON.stringify(migrated.owned.milku_work)===JSON.stringify(legacy.owned.milku_work),
       party:JSON.stringify(migrated.party)===JSON.stringify(legacy.party),
       selected:migrated.selected===legacy.selected,
       home:migrated.homeFavorite===legacy.homeFavorite&&migrated.homeUnitId===legacy.homeUnitId,
       money:migrated.gems===2345&&migrated.gold===4321&&migrated.pulls===17,
       pity:migrated.gachaPity===8&&migrated.gachaSrStreak===2,
       progress:migrated.quests.q2.complete&&migrated.storyFlags.qaLegacy,
       noAutoOwned:ids.every(id=>!migrated.owned[id])
      }
     };
   }""")
   assert baseline["key"]=="yoiboshi-reboot-v1",baseline
   assert baseline["rate"]=={"R":60,"SR":25,"SSR":10,"UR":5},baseline
   assert baseline["rate19"]=={"SR":80,"SSR":15,"UR":5},baseline
   assert baseline["costs"]==[120,1000] and baseline["srCount"]==173 and baseline["withoutSeven"]==166 and baseline["unique"],baseline
   assert all(baseline["legacy"].values()),baseline
   for u,id,person,name,role,base,skills,passive in zip(
       baseline["units"],IDS,PERSONS,NAMES,ROLES,BASE,SKILLS,PASSIVES):
    assert (u["id"],u["person"],u["name"],u["role"],u["rarity"],u["gate"])==(id,person,name,role,"SR","q6"),u
    assert (u["stats"]["hp"],u["stats"]["atk"],u["stats"]["def"])==base,u
    assert u["skills"]==list(skills),u
    assert u["targets"]==["enemy" if z in ("honoka_strike_ct","honoka_enemy_attack_down_all","rio_strike_self_attack","nanami_attack_down") else "ally" for z in skills],u
    assert u["passive"]["type"]==passive[0] and u["passiveValue"]==passive[1],u
    assert u["normal"] and not u["special"] and not u["before"] and not u["atQ5"] and u["atQ6"],u
    assert not u["visibleBefore"] and u["visibleQ6"] and u["reveal"]=="q6",u
    assert "/full_body/"+person+".png" in u["portrait"],u
    response=page.request.get(url.rsplit("/",1)[0]+"/"+u["portrait"],timeout=25000)
    assert response.status==200 and len(response.body())>2000,(id,response.status)
   # Verify real applySkill(), including the new branches and all reused mechanisms.
   combat=page.evaluate("""()=>{
     const rnd=Math.random;Math.random=()=>.9;
     const ally=(id,i)=>{const u=BYID[id],r=ROLES[u.role];
       return {id,hp:60,max:200,atk:r.atk,def:r.def,shield:0,taunt:0,
        cooldowns:[0,0],x:18+i*18,y:32,attackTimer:10,
        defenseBuffUntil:0,defenseBuffMult:1,healBuffUntil:0,healBuffMult:1,
        damageReduceUntil:0,damageReduceMult:1,rallyUntil:0,rallyMult:1};
     };
     const enemy=(name,hp)=>({name,hp,max:hp||1,atk:30,attackTimer:2,interval:2.1,
       x:78,y:38,weakenMult:1,weakenUntil:0,damageReduction:0});
     const fixture=(actor)=>{
       S=fresh();for(const id of [actor,'momoka_work','milku_work'])S.owned[id]={lv:1,aff:0,lb:0,copies:0};
       battle={qid:'q2',sim:10,phase:'fight',done:false,log:[],popups:[],
        allies:[ally(actor,0),ally('momoka_work',1),ally('milku_work',2)],
        enemies:[enemy('Enemy-A',600),enemy('Enemy-B',600),enemy('Dead',0)]};
       return battle;
     };
     const afflict=z=>{
       for(const key of ['weakenUntil','vulnerableUntil','staggerUntil','attackDownUntil','defenseDownUntil','healDownUntil'])z[key]=20;
       z.weakenMult=.5;z.vulnerableMult=1.4;
     };
     const cleansed=z=>['weakenUntil','vulnerableUntil','staggerUntil','attackDownUntil','defenseDownUntil','healDownUntil'].every(k=>z[k]===0)&&z.weakenMult===1&&z.vulnerableMult===1;
     const out={};
     try{
       let x=fixture('aizawa_noa_work');
       applySkill(0,0,'ally',1);out.noaS1={mult:x.allies.map(z=>z.rallyMult),until:x.allies.map(z=>z.rallyUntil)};
       x=fixture('aizawa_noa_work');
       applySkill(0,1,'ally',1);out.noaS2=x.allies.map(z=>z.hp);
       x=fixture('yukishiro_mio_work');
       const before=x.enemies[0].hp;
       out.mioPassive=passiveAttackMultiplier(x.allies[0],x.enemies[0]);
       applySkill(0,0,'enemy',0);
       out.mioS1={damage:before-x.enemies[0].hp,timer:x.enemies[0].attackTimer};
       x=fixture('yukishiro_mio_work');
       applySkill(0,1,'enemy',0);out.mioS2={mult:x.enemies.map(z=>z.weakenMult),until:x.enemies.map(z=>z.weakenUntil)};
       x=fixture('shiratori_yuzuha_work');
       x.allies[1].cooldowns=[20,22];
       applySkill(0,0,'ally',1);
       out.yuzuhaS1={self:x.allies[0].cooldowns,other:x.allies[1].cooldowns};
       x=fixture('shiratori_yuzuha_work');
       applySkill(0,1,'ally',1);out.yuzuhaS2={mult:x.allies.map(z=>z.defenseBuffMult),until:x.allies.map(z=>z.defenseBuffUntil)};
       x=fixture('tsukishima_shino_work');
       out.shinoPassive={critical:passiveHealMultiplier(x.allies[0],x.allies[1])};
       applySkill(0,0,'ally',1);out.shinoS1=x.allies[1].hp;
       x=fixture('tsukishima_shino_work');
       x.allies[1].hp=130;out.shinoHealthy=passiveHealMultiplier(x.allies[0],x.allies[1]);
       applySkill(0,0,'ally',1);out.shinoS1Healthy=x.allies[1].hp;
       x=fixture('tsukishima_shino_work');
       applySkill(0,1,'ally',1);out.shinoS2=x.allies.map(z=>z.hp);
       x=fixture('hanasaki_rena_work');
       applySkill(0,0,'ally',1);out.renaS1={mult:x.allies.map(z=>z.defenseBuffMult),until:x.allies.map(z=>z.defenseBuffUntil)};
       x.sim=18.01;tickTimedEffects();out.renaExpiry=x.allies.map(z=>z.defenseBuffMult);
       x=fixture('hanasaki_rena_work');
       x.allies.forEach(afflict);
       applySkill(0,1,'ally',1);out.renaS2={hp:x.allies.map(z=>z.hp),clean:x.allies.map(cleansed)};
       x=fixture('takamine_rino_work');
       out.rinoPassive=passiveHealMultiplier(x.allies[0],x.allies[1]);
       applySkill(0,0,'ally',1);out.rinoS1=x.allies.map(z=>z.hp);
       x=fixture('takamine_rino_work');
       afflict(x.allies[1]);applySkill(0,1,'ally',1);
       out.rinoS2={hp:x.allies.map(z=>z.hp),clean:cleansed(x.allies[1])};
       x=fixture('hoshino_emiri_work');
       const oldHp=x.enemies[0].hp;
       applySkill(0,0,'enemy',0);
       out.emiriS1={damage:oldHp-x.enemies[0].hp,mult:x.allies[0].rallyMult,until:x.allies[0].rallyUntil};
       x=fixture('hoshino_emiri_work');
       applySkill(0,1,'enemy',0);out.emiriS2={mult:x.enemies.map(z=>z.weakenMult),until:x.enemies.map(z=>z.weakenUntil)};
       x.sim=19.51;tickTimedEffects();out.emiriExpiry=x.enemies.map(z=>z.weakenMult);
       x=fixture('takamiya_sayaka_work');
       applySkill(0,0,'ally',1);out.oldSayaka=x.allies.map(z=>z.rallyMult);
       x=fixture('shirase_marika_work');
       applySkill(0,0,'ally',1);out.oldMarika=x.allies.map(z=>z.hp);
       x=fixture('ginjo_cecil_work');
       applySkill(0,0,'ally',1);out.oldCecil=x.allies.map(z=>z.defenseBuffMult);
       return out;
     }finally{battle=null;Math.random=rnd}
   }""")
   def equal(actual,expected):
    assert len(actual)==len(expected) and all(abs(a-b)<1e-8 for a,b in zip(actual,expected)),(mode,actual,expected)
   equal(combat["noaS1"]["mult"],[1.1944]*3)
   assert combat["noaS1"]["until"]==[18]*3 and combat["noaS2"]==[85]*3,combat
   assert combat["mioPassive"]==1.06 and combat["mioS1"]["damage"]>0 and combat["mioS1"]["timer"]==4,combat
   equal(combat["mioS2"]["mult"],[.85,.85,1])
   assert combat["mioS2"]["until"]==[16,16,0],combat
   equal(combat["yuzuhaS1"]["self"],[17.2,10])
   equal(combat["yuzuhaS1"]["other"],[18.2,20.2])
   equal(combat["yuzuhaS2"]["mult"],[1.1944]*3)
   assert combat["yuzuhaS2"]["until"]==[18]*3,combat
   assert combat["shinoPassive"]["critical"]==1.12 and combat["shinoHealthy"]==1,combat
   assert combat["shinoS1"]==133 and combat["shinoS1Healthy"]==195 and combat["shinoS2"]==[85]*3,combat
   equal(combat["renaS1"]["mult"],[1.2376]*3)
   assert combat["renaS1"]["until"]==[18]*3 and combat["renaExpiry"]==[1]*3,combat
   assert combat["renaS2"]["hp"]==[90]*3 and all(combat["renaS2"]["clean"]),combat
   assert combat["rinoPassive"]==1.08 and combat["rinoS1"]==[87]*3,combat
   assert combat["rinoS2"]["hp"]==[60,122,60] and combat["rinoS2"]["clean"],combat
   assert combat["emiriS1"]["damage"]>0 and combat["emiriS1"]["mult"]==1.15 and combat["emiriS1"]["until"]==16,combat
   equal(combat["emiriS2"]["mult"],[.72,1,1])
   assert combat["emiriS2"]["until"]==[19.5,0,0] and combat["emiriExpiry"]==[1]*3,combat
   equal(combat["oldSayaka"],[1.1944]*3)
   assert combat["oldMarika"]==[85]*3,combat
   equal(combat["oldCecil"],[1.1944]*3)
   for id,person,name in zip(IDS,PERSONS,NAMES):
    page.evaluate("""id=>{
      S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
      S.quests.q6={complete:true};
      S.owned[id]={lv:1,aff:0,lb:0,copies:0};
      S.selected=id;view='unit';render();
    }""",id)
    view=page.evaluate("""()=>({
       text:document.body.textContent||'',
       images:[...document.querySelectorAll('img')].map(x=>x.getAttribute('src')||'')
    })""")
    assert name in view["text"] and any("/full_body/"+person+".png" in img for img in view["images"]),(mode,id,view["images"][:20])
    page.screenshot(path=str(OUT/(mode+"_"+id+".png")),full_page=True)
   assert not errors,(mode,errors)
   reports[mode]={"result":"PASS","sr_count":baseline["srCount"],"battle":combat,"js_errors":errors}
   context.close()
  browser.close()
finally:
 server.shutdown()
(OUT/"report.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print("PR32/PR36 STAGE2 7 SR LIVE BATTLE QA PASS",json.dumps({k:v["result"] for k,v in reports.items()},ensure_ascii=False),flush=True)
