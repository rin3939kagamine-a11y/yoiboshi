#!/usr/bin/env python3
"""PR #38 eight adopted SR units: real-browser q6, real applySkill, passive and save regression."""
import json, subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/pr38_stage2"
OUT.mkdir(parents=True,exist_ok=True)
IDS=("morinaga_akari_work","kurosaki_kaede_work","komatsu_hinata_work",
     "kitahara_shiho_work","otsuki_tsubasa_work","mizuhara_mayu_work",
     "takasaka_tomoe_work","nishimura_ako_work")
PERSONS=tuple(x.removesuffix("_work") for x in IDS)
NAMES=("森永 明里","黒崎 楓","小松 陽菜","北原 志保","大槻 翼","水原 麻友","高坂 巴","西村 亜子")
ROLES=("support","attacker","support","attacker","support","healer","attacker","healer")
STATS=((165,11,5),(125,19,3),(165,11,5),(125,19,3),
       (165,11,5),(148,9,5),(125,19,3),(148,9,5))
SKILLS=(("sayaka_team_attack_up","cecil_team_ct"),
        ("honoka_strike_ct","nanami_attack_down"),
        ("sayaka_team_defense_up","kana_heal_all_25"),
        ("nanami_strike_26","honoka_enemy_attack_down_all"),
        ("sayaka_team_attack_up","rena_cleanse_heal_all_30"),
        ("kana_heal_all_25","heal_one"),
        ("rio_strike_self_attack","rio_aoe_18"),
        ("marika_heal_one_65","marika_heal_all_22"))
PASSIVES=(("sayaka_buff",8),("nanami_debuff_extend",1.5),("sayaka_buff",8),
          ("rio_attack",6),("sayaka_buff",8),("heal",8),("rio_attack",6),
          ("marika_rescue",12))
TARGETS=(("ally","ally"),("enemy","enemy"),("ally","ally"),("enemy","enemy"),
         ("ally","ally"),("ally","ally"),("enemy","enemy"),("ally","ally"))

def original(path):
 return subprocess.check_output(["git","show","origin/main:"+path],cwd=ROOT,text=True)

old_game=original("js/game.js")
new_game=(ROOT/"js/game.js").read_text(encoding="utf-8")
old_perf=original("js/performance_v016.js")
new_perf=(ROOT/"js/performance_v016.js").read_text(encoding="utf-8")
old_html=original("index.html")
new_html=(ROOT/"index.html").read_text(encoding="utf-8")
for token in ("const KEY=","const ROLES=","const RATE=","const NEW19_RATE=",
              "const GACHA_CONFIG=","const NORMAL_GACHA_POOL=",
              "const NEW19_GACHA_POOL=","function migrateSave(",
              "function drawNormalGachaUnit(","function rollNormalGachaRarity("):
 a=old_game.index(token);b=new_game.index(token)
 assert old_game[a:old_game.index("\n",a)]==new_game[b:new_game.index("\n",b)],("protected line changed",token)
prefix="function applySkill("
assert old_game[old_game.index(prefix):]==new_game[new_game.index(prefix):],"combat engine or downstream logic modified"
a=old_game.index("const UNITS=[");b=new_game.index("const UNITS=[")
assert old_game[a:old_game.index("\n];",a)+3]==new_game[b:new_game.index("\n];",b)+3],"legacy roster changed"
assert new_perf.replace("  ...NEW_UNIT_DESIGN_V0870,\n  ...NEW_UNIT_DESIGN_V0880\n","  ...NEW_UNIT_DESIGN_V0870\n")==old_perf, "performance beyond additive mapping modified"
assert "js/heroines_v0880_units.js" in new_html and "js/heroines_v0880_units.js" not in old_html
assert new_html.index("js/heroines_v0880_units.js")<new_html.index("js/performance_v016.js")<new_html.index("js/game.js")
for path in ("js/heroines_v0880.js","js/heroines_v0880_wire.js","js/heroines_v0870_units.js",
             "js/heroines_v0860_units.js","js/heroines_v0850_units.js"):
 assert (ROOT/path).read_text(encoding="utf-8")==original(path),("old character or unit modified",path)
for person in PERSONS:
 assert (ROOT/"assets/ART_V2/full_body"/(person+".png")).is_file(),person

class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args): pass

srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url="http://127.0.0.1:"+str(srv.server_port)+"/index.html"
reports={}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,w,h in (("portrait",390,844),("landscape",844,390)):
   ctx=browser.new_context(viewport={"width":w,"height":h})
   page=ctx.new_page()
   errors=[]
   page.on("pageerror",lambda error:errors.append(str(error)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof S!=='undefined'&&typeof applySkill==='function'&&typeof NEW_UNIT_ROSTER_V0880!=='undefined'",timeout=60000)
   baseline=page.evaluate("""()=>{
      gachaMode='normal';
      const ids=NEW_UNIT_ROSTER_V0880.map(u=>u.id);
      const no=fresh(),q3=fresh(),q6=fresh();
      q3.quests.q3={complete:true};q6.quests.q6={complete:true};
      const eligible=(save,id)=>availableNormalPool(save).some(x=>x.id===id);
      const roster=ids.map(id=>{
       const u=BYID[id];S=fresh();S.owned[id]={lv:1,aff:0,lb:0,copies:0};
       const stat=unitPower(id);const skills=[unitSkillType(u,0),unitSkillType(u,1)];
       const target=[skillTarget(u,0),skillTarget(u,1)];
       return {id,person:u.person,name:PEOPLE[u.person]?.name,role:u.role,rarity:u.rarity,stats:stat,
         skills,target,passive:unitPassive(u).type,passiveVal:passiveValue(u),
         text:[skillDescription(u,0),skillDescription(u,1),passiveDescription(u)],
         art:unitArt(u),gate:u.gate,storyGate:NEW_HERO_REVEAL_V0880[u.person],
         inNormal:NORMAL_GACHA_POOL.some(x=>x.id===id),
         inSpecial:NEW19_GACHA_POOL.some(x=>x.id===id),
         before:eligible(no,id),q3:eligible(q3,id),q6:eligible(q6,id),
         visibleBefore:visibleUnitV026(u,no),visibleAfter:visibleUnitV026(u,q6)};
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
      return {ids,units:roster,normalSR:NORMAL_GACHA_POOL.filter(x=>x.rarity==='SR').length,
       priorSR:NORMAL_GACHA_POOL.filter(x=>x.rarity==='SR'&&!ids.includes(x.id)).length,
       unique:new Set(UNITS.map(x=>x.id)).size===UNITS.length,
       rate:{...RATE},new19:{...NEW19_RATE},
       cost:[GACHA_CONFIG.ONE_COST,GACHA_CONFIG.TEN_COST],
       base:{support:ROLES.support,healer:ROLES.healer,attacker:ROLES.attacker},
       saved:{
         owned:JSON.stringify(migrated.owned.momoka_work)===JSON.stringify(legacy.owned.momoka_work)
             &&JSON.stringify(migrated.owned.milku_work)===JSON.stringify(legacy.owned.milku_work),
         party:JSON.stringify(migrated.party)===JSON.stringify(legacy.party),
         selected:migrated.selected===legacy.selected,
         favorite:migrated.homeFavorite===legacy.homeFavorite,
         home:migrated.homeUnitId===legacy.homeUnitId,
         funds:migrated.gems===2345&&migrated.gold===4321&&migrated.pulls===17,
         pity:migrated.gachaPity===8&&migrated.gachaSrStreak===2,
         progress:migrated.quests.q2.complete&&migrated.storyFlags.qaLegacy,
         newNotOwned:ids.every(id=>!migrated.owned[id])}
      };
   }""")
   assert baseline["ids"]==list(IDS),baseline
   assert baseline["normalSR"]==181 and baseline["priorSR"]==173 and baseline["unique"],baseline
   assert baseline["rate"]=={"R":60,"SR":25,"SSR":10,"UR":5},baseline
   assert baseline["new19"]=={"SR":80,"SSR":15,"UR":5} and baseline["cost"]==[120,1000],baseline
   assert all(baseline["saved"].values()),baseline["saved"]
   for u,id,person,name,role,stats,skills,p,tgt in zip(baseline["units"],IDS,PERSONS,NAMES,ROLES,STATS,SKILLS,PASSIVES,TARGETS):
    assert (u["id"],u["person"],u["name"],u["rarity"],u["role"])==(id,person,name,"SR",role),u
    assert (u["stats"]["hp"],u["stats"]["atk"],u["stats"]["def"])==stats,u
    assert u["skills"]==list(skills) and u["target"]==list(tgt),u
    assert (u["passive"],u["passiveVal"])==p,u
    assert u["inNormal"] and not u["inSpecial"] and not u["before"] and not u["q3"] and u["q6"],u
    assert not u["visibleBefore"] and u["visibleAfter"],u
    assert u["gate"]=="q6" and u["storyGate"]=="q6",u
    assert "/full_body/"+person+".png" in u["art"],u
    response=page.request.get(url.rsplit("/",1)[0]+"/"+u["art"])
    assert response.status==200 and len(response.body())>2000,(mode,id,response.status)
   # Execute each actual skill handler in a real browser battle fixture.
   combat=page.evaluate("""()=>{
     const originalRandom=Math.random;Math.random=()=>.9;
     function mkAlly(id,i){
       const u=BYID[id],r=ROLES[u.role];
       return {id,hp:60,max:200,atk:r.atk,def:r.def,
         shield:0,taunt:0,cooldowns:[0,0],x:18+i*18,y:32,attackTimer:10,
         defenseBuffUntil:0,defenseBuffMult:1,healBuffUntil:0,healBuffMult:1,
         damageReduceUntil:0,damageReduceMult:1,rallyUntil:0,rallyMult:1};
     }
     function mkEnemy(name,hp){
       return {name,hp,max:hp||600,atk:30,attackTimer:2,interval:2.1,
         x:78,y:38,weakenMult:1,weakenUntil:0,damageReduction:0};
     }
     function fixture(actor){
       S=fresh();
       for(const id of [actor,'momoka_work','milku_work'])S.owned[id]={lv:1,aff:0,lb:0,copies:0};
       battle={qid:'q2',sim:10,phase:'fight',done:false,log:[],popups:[],
         allies:[mkAlly(actor,0),mkAlly('momoka_work',1),mkAlly('milku_work',2)],
         enemies:[mkEnemy('Enemy-A',600),mkEnemy('Enemy-B',600),mkEnemy('Dead',0)]};
       return battle;
     }
     function cast(actor,slot,setup){
       const x=fixture(actor);
       if(setup)setup(x);
       const u=BYID[actor],kind=skillTarget(u,slot);
       const before={hp:x.allies.map(a=>a.hp),cold:x.allies.map(a=>a.cooldowns.slice()),
         enemyHP:x.enemies.map(e=>e.hp),timers:x.enemies.map(e=>e.attackTimer)};
       applySkill(0,slot,kind,kind==='ally'?1:0);
       return {before,after:{
         hp:x.allies.map(a=>a.hp),cool:x.allies.map(a=>a.cooldowns.slice()),
         rally:x.allies.map(a=>a.rallyMult),rallyUntil:x.allies.map(a=>a.rallyUntil),
         defense:x.allies.map(a=>a.defenseBuffMult),defenseUntil:x.allies.map(a=>a.defenseBuffUntil),
         weaken:x.enemies.map(e=>e.weakenMult),weakenUntil:x.enemies.map(e=>e.weakenUntil),
         enemyHP:x.enemies.map(e=>e.hp),timers:x.enemies.map(e=>e.attackTimer),
         allyWeaken:x.allies.map(a=>a.weakenUntil||0)},kind};
     }
     const out={};
     try{
       out.akari1=cast('morinaga_akari_work',0);
       out.akari2=cast('morinaga_akari_work',1,x=>{x.allies[1].cooldowns=[15,16];x.allies[2].cooldowns=[17,18];});
       out.kaede1=cast('kurosaki_kaede_work',0);
       out.kaede2=cast('kurosaki_kaede_work',1);
       out.hinata1=cast('komatsu_hinata_work',0);
       out.hinata2=cast('komatsu_hinata_work',1);
       out.shiho1=cast('kitahara_shiho_work',0);
       out.shiho2=cast('kitahara_shiho_work',1);
       out.tsubasa1=cast('otsuki_tsubasa_work',0);
       out.tsubasa2=cast('otsuki_tsubasa_work',1,x=>{
         x.allies[0].weakenUntil=17;x.allies[1].weakenUntil=17;
         x.allies[1].weakenMult=.7;
       });
       out.mayu1=cast('mizuhara_mayu_work',0);
       out.mayu2=cast('mizuhara_mayu_work',1);
       out.tomoe1=cast('takasaka_tomoe_work',0);
       out.tomoe2=cast('takasaka_tomoe_work',1);
       out.ako1=cast('nishimura_ako_work',0);
       out.ako2=cast('nishimura_ako_work',1,x=>{x.allies[1].hp=130;});
       out.passiveHeal={
         mayu:passiveHealMultiplier({id:'mizuhara_mayu_work'}, {hp:130,max:200}),
         akoLow:passiveHealMultiplier({id:'nishimura_ako_work'}, {hp:60,max:200}),
         akoHigh:passiveHealMultiplier({id:'nishimura_ako_work'}, {hp:130,max:200})
       };
       out.passiveDamage={
         shiho:passiveDamageMultiplier({id:'kitahara_shiho_work'},mkEnemy('dummy',600)),
         tomoe:passiveDamageMultiplier({id:'takasaka_tomoe_work'},mkEnemy('dummy',600))
       };
     }finally{Math.random=originalRandom;}
     return out;
   }""")
   def close(x,y): return abs(x-y)<0.001
   assert all(close(x,1.1944) for x in combat["akari1"]["after"]["rally"]),combat["akari1"]
   assert all(close(x,18) for x in combat["akari1"]["after"]["rallyUntil"]),combat["akari1"]
   assert close(combat["akari2"]["after"]["cool"][1][0],13.2),combat["akari2"]
   assert close(combat["akari2"]["after"]["cool"][2][1],16.2),combat["akari2"]
   assert combat["kaede1"]["after"]["enemyHP"][0]<600 and close(combat["kaede1"]["after"]["timers"][0],4),combat["kaede1"]
   assert close(combat["kaede2"]["after"]["weaken"][0],.72) and close(combat["kaede2"]["after"]["weakenUntil"][0],19.5),combat["kaede2"]
   assert close(combat["kaede2"]["after"]["weaken"][1],1),combat["kaede2"]
   assert all(close(x,1.1944) for x in combat["hinata1"]["after"]["defense"]),combat["hinata1"]
   assert all(close(x,85) for x in combat["hinata2"]["after"]["hp"]),combat["hinata2"]
   assert combat["shiho1"]["after"]["enemyHP"][0]<600 and close(combat["shiho1"]["after"]["enemyHP"][1],600),combat["shiho1"]
   assert [round(x,3) for x in combat["shiho2"]["after"]["weaken"]]==[.85,.85,1],combat["shiho2"]
   assert close(combat["shiho2"]["after"]["weakenUntil"][0],16),combat["shiho2"]
   assert all(close(x,1.1944) for x in combat["tsubasa1"]["after"]["rally"]),combat["tsubasa1"]
   assert combat["tsubasa2"]["after"]["hp"]==[90,90,90] and combat["tsubasa2"]["after"]["allyWeaken"]==[0,0,0],combat["tsubasa2"]
   assert combat["mayu1"]["after"]["hp"]==[87,87,87],combat["mayu1"]
   assert combat["mayu2"]["after"]["hp"]==[60,122,60],combat["mayu2"]
   assert combat["tomoe1"]["after"]["enemyHP"][0]<600 and close(combat["tomoe1"]["after"]["rally"][0],1.15),combat["tomoe1"]
   assert close(combat["tomoe1"]["after"]["rallyUntil"][0],16),combat["tomoe1"]
   assert combat["tomoe2"]["after"]["enemyHP"][0]<600 and combat["tomoe2"]["after"]["enemyHP"][1]<600 and combat["tomoe2"]["after"]["enemyHP"][2]==0,combat["tomoe2"]
   assert combat["ako1"]["after"]["hp"]==[60,133,60],combat["ako1"]
   assert combat["ako2"]["after"]["hp"]==[85,152,85],combat["ako2"]
   assert close(combat["passiveHeal"]["mayu"],1.08) and close(combat["passiveHeal"]["akoLow"],1.12) and close(combat["passiveHeal"]["akoHigh"],1),combat["passiveHeal"]
   assert close(combat["passiveDamage"]["shiho"],1.06) and close(combat["passiveDamage"]["tomoe"],1.06),combat["passiveDamage"]
   assert not errors,(mode,errors[:12])
   reports[mode]={"base":baseline,"combat":combat,"errors":errors}
   (OUT/(mode+"_report.json")).write_text(json.dumps(reports[mode],ensure_ascii=False,indent=2),encoding="utf-8")
   print("PR38",mode,"8 SR x 2 actual skills; exact LV1 stats; q6; 181 SR; legacy saves; rates; assets PASS")
   ctx.close()
  browser.close()
finally:
 srv.shutdown()
print("PR38 STAGE2 ALL QA PASS")
