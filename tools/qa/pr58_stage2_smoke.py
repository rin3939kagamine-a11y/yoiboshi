#!/usr/bin/env python3
"""PR #58 eight adopted SR units: real-browser q6, real applySkill, passive and save regression."""
import json, subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/pr58_stage2"
OUT.mkdir(parents=True,exist_ok=True)
IDS=("kawamura_shizuku_work","ito_ruri_work","okada_misaki_work","sasaki_sara_work",
     "yamada_yuri_work","shimizu_kotone_work","fujii_kanon_work","kobayashi_iori_work")
PERSONS=tuple(x.removesuffix("_work") for x in IDS)
NAMES=("川村 雫","伊藤 瑠璃","岡田 美咲","佐々木 沙羅","山田 友里","清水 琴音","藤井 華音","小林 依央莉")
ROLES=("healer","support","support","attacker","healer","support","attacker","healer")
STATS=((148,9,5),(165,11,5),(165,11,5),(125,19,3),
       (148,9,5),(165,11,5),(125,19,3),(148,9,5))
SKILLS=(("marika_heal_all_22","marika_heal_one_65"),
        ("cecil_team_ct","sayaka_team_defense_up"),
        ("sayaka_team_attack_up","kana_heal_all_25"),
        ("rio_strike_self_attack","rio_aoe_18"),
        ("rino_cleanse_heal_one_57","kana_heal_all_25"),
        ("rena_defense_up_22","rena_cleanse_heal_all_30"),
        ("honoka_strike_ct","nanami_attack_down"),
        ("kana_heal_all_25","marika_heal_one_65"))
PASSIVES=(("marika_rescue",12),("sayaka_buff",8),("sayaka_buff",8),
          ("rio_attack",6),("heal",8),("sayaka_buff",8),
          ("nanami_debuff_extend",1.5),("heal",8))
TARGETS=(("ally","ally"),("ally","ally"),("ally","ally"),("enemy","enemy"),
         ("ally","ally"),("ally","ally"),("enemy","enemy"),("ally","ally"))

def original(path):
 return subprocess.check_output(["git","show","origin/main:"+path],cwd=ROOT,text=True)

old_game=original("js/game.js")
new_game=(ROOT/"js/game.js").read_text(encoding="utf-8")
old_perf=original("js/performance_v016.js")
new_perf=(ROOT/"js/performance_v016.js").read_text(encoding="utf-8")
old_html=original("index.html")
new_html=(ROOT/"index.html").read_text(encoding="utf-8")
expected_game=old_game
game_diffs=(
 ("...NEW_UNIT_ROSTER_V0870,...NEW_UNIT_ROSTER_V0880);",
  "...NEW_UNIT_ROSTER_V0870,...NEW_UNIT_ROSTER_V0880,...NEW_UNIT_ROSTER_V0890);"),
 ("...NEW_UNIT_ARTWORK_V0870,...NEW_UNIT_ARTWORK_V0880,...MOMOKA_UNIT_ARTWORK",
  "...NEW_UNIT_ARTWORK_V0870,...NEW_UNIT_ARTWORK_V0880,...NEW_UNIT_ARTWORK_V0890,...MOMOKA_UNIT_ARTWORK"),
 ("(!NEW_HERO_IDS_V0880.includes(u.person)||heroineStoryRevealed(u.person,save))}",
  "(!NEW_HERO_IDS_V0880.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V0890.includes(u.person)||heroineStoryRevealed(u.person,save))}"),
 ("(!NEW_HERO_IDS_V0880.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V027.includes",
  "(!NEW_HERO_IDS_V0880.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V0890.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V027.includes")
)
for before,after in game_diffs:
 assert expected_game.count(before)==1,("game anchor",before)
 expected_game=expected_game.replace(before,after)
assert new_game==expected_game,"Legacy game changed outside additive PR58 roster/art/q6 wiring"
old_design="  ...NEW_UNIT_DESIGN_V0880\n"
new_design="  ...NEW_UNIT_DESIGN_V0880,\n  ...NEW_UNIT_DESIGN_V0890\n"
assert old_perf.count(old_design)==1
assert new_perf==old_perf.replace(old_design,new_design),"Legacy performance metadata modified"
old_scripts='<script defer src="js/heroines_v0880_units.js?v=20261115-pr38-stage2"></script><script defer src="js/performance_v016.js?v=20261115-pr38-stage2"></script>'
new_scripts='<script defer src="js/heroines_v0880_units.js?v=20261115-pr38-stage2"></script><script defer src="js/heroines_v0890_units.js?v=20261115-pr58-stage2"></script><script defer src="js/performance_v016.js?v=20261115-pr58-stage2"></script>'
assert old_html.count(old_scripts)==1
assert new_html==old_html.replace(old_scripts,new_scripts),"HTML changed outside v0890 script connection"
assert new_html.index("js/heroines_v0890_units.js")<new_html.index("js/performance_v016.js")<new_html.index("js/game.js")
for path in ("js/heroines_v0890.js","js/heroines_v0890_wire.js","js/heroines_v0880_units.js",
             "js/heroines_v0870_units.js","js/heroines_v0860_units.js"):
 assert (ROOT/path).read_text(encoding="utf-8")==original(path),("Existing file modified",path)
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
   page.wait_for_function("typeof S!=='undefined'&&typeof applySkill==='function'&&typeof NEW_UNIT_ROSTER_V0890!=='undefined'",timeout=60000)
   baseline=page.evaluate("""()=>{
      gachaMode='normal';
      const ids=NEW_UNIT_ROSTER_V0890.map(u=>u.id);
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
         art:unitArt(u),gate:u.gate,storyGate:NEW_HERO_REVEAL_V0890[u.person],
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
   assert baseline["normalSR"]==56 and baseline["priorSR"]==56 and baseline["unique"],baseline
   assert baseline["rate"]=={"R":60,"SR":25,"SSR":10,"UR":5},baseline
   assert baseline["new19"]=={"R":80,"SSR":15,"UR":5} and baseline["cost"]==[120,1000],baseline
   assert all(baseline["saved"].values()),baseline["saved"]
   for u,id,person,name,role,stats,skills,p,tgt in zip(baseline["units"],IDS,PERSONS,NAMES,ROLES,STATS,SKILLS,PASSIVES,TARGETS):
    assert (u["id"],u["person"],u["name"],u["rarity"],u["role"])==(id,person,name,"R",role),u
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
       const before={hp:x.allies.map(a=>a.hp),cool:x.allies.map(a=>a.cooldowns.slice()),
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
       out.shizuku1=cast('kawamura_shizuku_work',0);
       out.shizuku2=cast('kawamura_shizuku_work',1);
       out.ruri1=cast('ito_ruri_work',0,x=>{x.allies[1].cooldowns=[15,16];x.allies[2].cooldowns=[17,18];});
       out.ruri2=cast('ito_ruri_work',1);
       out.misaki1=cast('okada_misaki_work',0);
       out.misaki2=cast('okada_misaki_work',1);
       out.sara1=cast('sasaki_sara_work',0);
       out.sara2=cast('sasaki_sara_work',1);
       out.yuri1=cast('yamada_yuri_work',0,x=>{
         x.allies[1].weakenUntil=17;x.allies[1].weakenMult=.7;
       });
       out.yuri2=cast('yamada_yuri_work',1);
       out.kotone1=cast('shimizu_kotone_work',0);
       out.kotone2=cast('shimizu_kotone_work',1,x=>{
         x.allies[0].weakenUntil=17;x.allies[1].weakenUntil=17;
         x.allies[1].weakenMult=.7;
       });
       out.kanon1=cast('fujii_kanon_work',0);
       out.kanon2=cast('fujii_kanon_work',1);
       out.iori1=cast('kobayashi_iori_work',0);
       out.iori2=cast('kobayashi_iori_work',1);
       out.passiveHeal={
         shizukuLow:passiveHealMultiplier({id:'kawamura_shizuku_work'},{hp:60,max:200}),
         shizukuHigh:passiveHealMultiplier({id:'kawamura_shizuku_work'},{hp:130,max:200}),
         yuri:passiveHealMultiplier({id:'yamada_yuri_work'},{hp:130,max:200}),
         iori:passiveHealMultiplier({id:'kobayashi_iori_work'},{hp:130,max:200})
       };
       out.passiveDamage={sara:passiveAttackMultiplier({id:'sasaki_sara_work'},mkEnemy('dummy',600))};
     }finally{Math.random=originalRandom;}
     return out;
   }""")
   def close(x,y): return abs(x-y)<0.001
   assert combat["shizuku1"]["after"]["hp"]==[85,85,85],combat["shizuku1"]
   assert combat["shizuku2"]["after"]["hp"]==[60,133,60],combat["shizuku2"]
   assert close(combat["ruri1"]["after"]["cool"][1][0],13.2) and close(combat["ruri1"]["after"]["cool"][2][1],16.2),combat["ruri1"]
   assert all(close(x,1.1944) for x in combat["ruri2"]["after"]["defense"]),combat["ruri2"]
   assert all(close(x,18) for x in combat["ruri2"]["after"]["defenseUntil"]),combat["ruri2"]
   assert all(close(x,1.1944) for x in combat["misaki1"]["after"]["rally"]),combat["misaki1"]
   assert all(close(x,18) for x in combat["misaki1"]["after"]["rallyUntil"]),combat["misaki1"]
   assert combat["misaki2"]["after"]["hp"]==[85,85,85],combat["misaki2"]
   assert combat["sara1"]["after"]["enemyHP"][0]<600 and close(combat["sara1"]["after"]["rally"][0],1.15),combat["sara1"]
   assert close(combat["sara1"]["after"]["rallyUntil"][0],16),combat["sara1"]
   assert combat["sara2"]["after"]["enemyHP"][0]<600 and combat["sara2"]["after"]["enemyHP"][1]<600 and combat["sara2"]["after"]["enemyHP"][2]==0,combat["sara2"]
   assert combat["yuri1"]["after"]["hp"]==[60,122,60] and combat["yuri1"]["after"]["allyWeaken"]==[0,0,0],combat["yuri1"]
   assert combat["yuri2"]["after"]["hp"]==[87,87,87],combat["yuri2"]
   assert all(close(x,1.2376) for x in combat["kotone1"]["after"]["defense"]),combat["kotone1"]
   assert all(close(x,18) for x in combat["kotone1"]["after"]["defenseUntil"]),combat["kotone1"]
   assert combat["kotone2"]["after"]["hp"]==[90,90,90] and combat["kotone2"]["after"]["allyWeaken"]==[0,0,0],combat["kotone2"]
   assert combat["kanon1"]["after"]["enemyHP"][0]<600 and close(combat["kanon1"]["after"]["timers"][0],4),combat["kanon1"]
   assert close(combat["kanon2"]["after"]["weaken"][0],.72) and close(combat["kanon2"]["after"]["weakenUntil"][0],19.5),combat["kanon2"]
   assert close(combat["kanon2"]["after"]["weaken"][1],1),combat["kanon2"]
   assert combat["iori1"]["after"]["hp"]==[87,87,87],combat["iori1"]
   assert combat["iori2"]["after"]["hp"]==[60,130,60],combat["iori2"]
   assert close(combat["passiveHeal"]["shizukuLow"],1.12) and close(combat["passiveHeal"]["shizukuHigh"],1),combat["passiveHeal"]
   assert close(combat["passiveHeal"]["yuri"],1.08) and close(combat["passiveHeal"]["iori"],1.08),combat["passiveHeal"]
   assert close(combat["passiveDamage"]["sara"],1.06),combat["passiveDamage"]
   assert not errors,(mode,errors[:12])
   reports[mode]={"base":baseline,"combat":combat,"errors":errors}
   (OUT/(mode+"_report.json")).write_text(json.dumps(reports[mode],ensure_ascii=False,indent=2),encoding="utf-8")
   print("PR58",mode,"8 SR x 2 actual skills; exact LV1 stats; q6; 189 SR; legacy saves; rates; assets PASS")
   ctx.close()
  browser.close()
finally:
 srv.shutdown()
print("PR58 STAGE2 ALL QA PASS")
