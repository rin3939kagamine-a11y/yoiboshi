#!/usr/bin/env python3
"""PR #37 seven adopted SR units: real-browser q6, real applySkill, passive and save regression."""
import json, subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/pr37_stage2"
OUT.mkdir(parents=True,exist_ok=True)
IDS=("kato_hazuki_work","yoshida_sae_work","yamazaki_wakana_work","watanabe_mizuki_work",
     "kinoshita_ami_work","sato_eri_work","nishimura_yumi_work")
PERSONS=tuple(x.removesuffix("_work") for x in IDS)
NAMES=("加藤 葉月","吉田 紗英","山崎 若菜","渡辺 美月","木下 亜美","佐藤 恵理","西村 由美")
ROLES=("support","attacker","healer","support","healer","attacker","support")
STATS=((165,11,5),(125,19,3),(148,9,5),(165,11,5),(148,9,5),(125,19,3),(165,11,5))
SKILLS=(("sayaka_team_attack_up","cecil_team_ct"),
        ("nanami_strike_26","honoka_enemy_attack_down_all"),
        ("marika_heal_one_65","marika_heal_all_22"),
        ("rena_defense_up_22","rena_cleanse_heal_all_30"),
        ("marika_heal_all_22","rino_cleanse_heal_one_57"),
        ("rio_strike_self_attack","rio_aoe_18"),
        ("sayaka_team_attack_up","kana_heal_all_25"))
PASSIVES=(("sayaka_buff",8),("rio_attack",6),("marika_rescue",12),
          ("sayaka_buff",8),("heal",8),("rio_attack",6),("sayaka_buff",8))
TARGETS=(("ally","ally"),("enemy","enemy"),("ally","ally"),("ally","ally"),
         ("ally","ally"),("enemy","enemy"),("ally","ally"))

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
 ("...NEW_UNIT_ROSTER_V0880,...NEW_UNIT_ROSTER_V0890);",
  "...NEW_UNIT_ROSTER_V0880,...NEW_UNIT_ROSTER_V0890,...NEW_UNIT_ROSTER_V0900);"),
 ("...NEW_UNIT_ARTWORK_V0880,...NEW_UNIT_ARTWORK_V0890,...MOMOKA_UNIT_ARTWORK",
  "...NEW_UNIT_ARTWORK_V0880,...NEW_UNIT_ARTWORK_V0890,...NEW_UNIT_ARTWORK_V0900,...MOMOKA_UNIT_ARTWORK"),
 ("(!NEW_HERO_IDS_V0890.includes(u.person)||heroineStoryRevealed(u.person,save))}",
  "(!NEW_HERO_IDS_V0890.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V0900.includes(u.person)||heroineStoryRevealed(u.person,save))}"),
 ("(!NEW_HERO_IDS_V0890.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V027.includes",
  "(!NEW_HERO_IDS_V0890.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V0900.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V027.includes")
)
for before,after in game_diffs:
 assert expected_game.count(before)==1,("game anchor",before)
 expected_game=expected_game.replace(before,after)
assert new_game==expected_game,"Legacy game changed outside additive PR37 roster/art/q6 wiring"
old_design="  ...NEW_UNIT_DESIGN_V0890\n"
new_design="  ...NEW_UNIT_DESIGN_V0890,\n  ...NEW_UNIT_DESIGN_V0900\n"
assert old_perf.count(old_design)==1
assert new_perf==old_perf.replace(old_design,new_design),"Legacy performance metadata modified"
old_scripts='<script defer src="js/heroines_v0890_units.js?v=20261115-pr58-stage2"></script><script defer src="js/performance_v016.js?v=20261115-pr58-stage2"></script>'
new_scripts='<script defer src="js/heroines_v0890_units.js?v=20261115-pr58-stage2"></script><script defer src="js/heroines_v0900_units.js?v=20261115-pr37-stage2"></script><script defer src="js/performance_v016.js?v=20261115-pr37-stage2"></script>'
assert old_html.count(old_scripts)==1
assert new_html==old_html.replace(old_scripts,new_scripts),"HTML changed outside v0900 script connection"
assert new_html.index("js/heroines_v0900_units.js")<new_html.index("js/performance_v016.js")<new_html.index("js/game.js")
for path in ("js/heroines_v0900.js","js/heroines_v0900_wire.js","js/heroines_v0890_units.js",
             "js/heroines_v0880_units.js","js/heroines_v0870_units.js","js/heroines_v0860_units.js"):
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
   page.wait_for_function("typeof S!=='undefined'&&typeof applySkill==='function'&&typeof NEW_UNIT_ROSTER_V0900!=='undefined'",timeout=60000)
   baseline=page.evaluate("""()=>{
      gachaMode='normal';
      const ids=NEW_UNIT_ROSTER_V0900.map(u=>u.id);
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
         art:unitArt(u),gate:u.gate,storyGate:NEW_HERO_REVEAL_V0900[u.person],
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
   assert baseline["normalSR"]==196 and baseline["priorSR"]==189 and baseline["unique"],baseline
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
         defenseBuffUntil:0,defenseBuffMult:1,healBuffUntil:1,
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
       out.hazuki1=cast('kato_hazuki_work',0);
       out.hazuki2=cast('kato_hazuki_work',1,x=>{x.allies[1].cooldowns=[15,16];x.allies[2].cooldowns=[17,18];});
       out.sae1=cast('yoshida_sae_work',0);
       out.sae2=cast('yoshida_sae_work',1);
       out.wakana1=cast('yamazaki_wakana_work',0);
       out.wakana2=cast('yamazaki_wakana_work',1);
       out.mizuki1=cast('watanabe_mizuki_work',0);
       out.mizuki2=cast('watanabe_mizuki_work',1,x=>{
         x.allies[0].weakenUntil=17;x.allies[1].weakenUntil=17;
         x.allies[1].weakenMult=.7;
       });
       out.ami1=cast('kinoshita_ami_work',0);
       out.ami2=cast('kinoshita_ami_work',1,x=>{
         x.allies[1].weakenUntil=17;x.allies[1].weakenMult=.7;
       });
       out.eri1=cast('sato_eri_work',0);
       out.eri2=cast('sato_eri_work',1);
       out.yumi1=cast('nishimura_yumi_work',0);
       out.yumi2=cast('nishimura_yumi_work',1);
       out.passiveHeal={
         wakanaLow:passiveHealMultiplier({id:'yamazaki_wakana_work'},{hp:60,max:200}),
         wakanaHigh:passiveHealMultiplier({id:'yamazaki_wakana_work'},{hp:130,max:200}),
         ami:passiveHealMultiplier({id:'kinoshita_ami_work'},{hp:130,max:200})
       };
       out.passiveDamage={
         sae:passiveAttackMultiplier({id:'yoshida_sae_work'},mkEnemy('dummy',600)),
         eri:passiveAttackMultiplier({id:'sato_eri_work'},mkEnemy('dummy',600))
       };
     }finally{Math.random=originalRandom;}
     return out;
   }""")
   def close(x,y): return abs(x-y)<0.001
   assert all(close(x,1.1944) for x in combat["hazuki1"]["after"]["rally"]),combat["hazuki1"]
   assert all(close(x,18) for x in combat["hazuki1"]["after"]["rallyUntil"]),combat["hazuki1"]
   assert close(combat["hazuki2"]["after"]["cool"][1][0],13.2) and close(combat["hazuki2"]["after"]["cool"][2][1],16.2),combat["hazuki2"]
   assert combat["sae1"]["after"]["enemyHP"][0]<600 and close(combat["sae1"]["after"]["enemyHP"][1],600),combat["sae1"]
   assert [round(x,3) for x in combat["sae2"]["after"]["weaken"]]==[.85,.85,1],combat["sae2"]
   assert close(combat["sae2"]["after"]["weakenUntil"][0],16),combat["sae2"]
   assert combat["wakana1"]["after"]["hp"]==[60,133,60],combat["wakana1"]
   assert combat["wakana2"]["after"]["hp"]==[85,85,85],combat["wakana2"]
   assert all(close(x,1.2376) for x in combat["mizuki1"]["after"]["defense"]),combat["mizuki1"]
   assert all(close(x,18) for x in combat["mizuki1"]["after"]["defenseUntil"]),combat["mizuki1"]
   assert combat["mizuki2"]["after"]["hp"]==[90,90,90] and combat["mizuki2"]["after"]["allyWeaken"]==[0,0,0],combat["mizuki2"]
   assert combat["ami1"]["after"]["hp"]==[84,84,84],combat["ami1"]
   assert combat["ami2"]["after"]["hp"]==[60,122,60] and combat["ami2"]["after"]["allyWeaken"]==[0,0,0],combat["ami2"]
   assert combat["eri1"]["after"]["enemyHP"][0]<600 and close(combat["eri1"]["after"]["rally"][0],1.15),combat["eri1"]
   assert close(combat["eri1"]["after"]["rallyUntil"][0],16),combat["eri1"]
   assert combat["eri2"]["after"]["enemyHP"][0]<600 and combat["eri2"]["after"]["enemyHP"][1]<600 and combat["eri2"]["after"]["enemyHP"][2]==0,combat["eri2"]
   assert all(close(x,1.1944) for x in combat["yumi1"]["after"]["rally"]),combat["yumi1"]
   assert combat["yumi2"]["after"]["hp"]==[85,85,85],combat["yumi2"]
   assert close(combat["passiveHeal"]["wakanaLow"],1.12) and close(combat["passiveHeal"]["wakanaHigh"],1),combat["passiveHeal"]
   assert close(combat["passiveHeal"]["ami"],1.08),combat["passiveHeal"]
   assert close(combat["passiveDamage"]["sae"],1.06) and close(combat["passiveDamage"]["eri"],1.06),combat["passiveDamage"]
   assert not errors,(mode,errors[:12])
   reports[mode]={"base":baseline,"combat":combat,"errors":errors}
   (OUT/(mode+"_report.json")).write_text(json.dumps(reports[mode],ensure_ascii=False,indent=2),encoding="utf-8")
   print("PR37",mode,"7 SR x 2 actual skills; exact LV1 stats; q6; 196 SR; legacy saves; rates; assets PASS")
   ctx.close()
  browser.close()
finally:
 srv.shutdown()
print("PR37 STAGE2 ALL QA PASS")
