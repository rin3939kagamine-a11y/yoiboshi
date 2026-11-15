#!/usr/bin/env python3
"""single-character final batch twelve adopted SR units: real-browser q6, real applySkill, passive and save regression."""
import json, subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/singles12_stage2"
OUT.mkdir(parents=True,exist_ok=True)
IDS=("takahashi_ayano_work","tanaka_mio_work","arai_shiori_work","ono_yuina_work",
     "maeda_akane_work","fujita_sui_work","goto_satoko_work","nakajima_kazumi_work",
     "harada_kyoko_work","ogawa_rina_work","ishida_yuna_work","morita_mitsuki_work")
PERSONS=tuple(x.removesuffix("_work") for x in IDS)
NAMES=("高橋 彩乃","田中 美桜","新井 栞","大野 結菜","前田 茜","藤田 翠",
       "後藤 聡子","中島 和美","原田 京子","小川 里奈","石田 優奈","森田 光希")
ROLES=("support","healer","support","healer","attacker","support",
       "support","healer","support","attacker","healer","attacker")
STATS=((165,11,5),(148,9,5),(165,11,5),(148,9,5),(125,19,3),(165,11,5),
       (165,11,5),(148,9,5),(165,11,5),(125,19,3),(148,9,5),(125,19,3))
SKILLS=(("sayaka_team_defense_up","kana_heal_all_25"),
        ("marika_heal_one_65","marika_heal_all_22"),
        ("cecil_team_ct","sayaka_team_attack_up"),
        ("kana_heal_all_25","heal_one"),
        ("honoka_strike_ct","nanami_attack_down"),
        ("sayaka_team_attack_up","rena_cleanse_heal_all_30"),
        ("rena_defense_up_22","cecil_team_ct"),
        ("marika_heal_all_22","marika_heal_one_65"),
        ("sayaka_team_defense_up","kana_heal_all_25"),
        ("rio_strike_self_attack","rio_aoe_18"),
        ("rino_cleanse_heal_one_57","kana_heal_all_25"),
        ("nanami_strike_26","honoka_enemy_attack_down_all"))
PASSIVES=(("sayaka_buff",8),("marika_rescue",12),("sayaka_buff",8),("heal",8),
          ("nanami_debuff_extend",1.5),("sayaka_buff",8),("sayaka_buff",8),
          ("marika_rescue",12),("sayaka_buff",8),("rio_attack",6),("heal",8),
          ("rio_attack",6))
TARGETS=(("ally","ally"),("ally","ally"),("ally","ally"),("ally","ally"),
         ("enemy","enemy"),("ally","ally"),("ally","ally"),("ally","ally"),
         ("ally","ally"),("enemy","enemy"),("ally","ally"),("enemy","enemy"))

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
 ("...NEW_UNIT_ROSTER_V0890,...NEW_UNIT_ROSTER_V0900);",
  "...NEW_UNIT_ROSTER_V0890,...NEW_UNIT_ROSTER_V0900,...NEW_UNIT_ROSTER_V0910);"),
 ("...NEW_UNIT_ARTWORK_V0890,...NEW_UNIT_ARTWORK_V0900,...MOMOKA_UNIT_ARTWORK",
  "...NEW_UNIT_ARTWORK_V0890,...NEW_UNIT_ARTWORK_V0900,...NEW_UNIT_ARTWORK_V0910,...MOMOKA_UNIT_ARTWORK"),
 ("(!NEW_HERO_IDS_V0900.includes(u.person)||heroineStoryRevealed(u.person,save))}",
  "(!NEW_HERO_IDS_V0900.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V0910.includes(u.person)||heroineStoryRevealed(u.person,save))}"),
 ("(!NEW_HERO_IDS_V0900.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V027.includes",
  "(!NEW_HERO_IDS_V0900.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V0910.includes(u.person)||heroineStoryRevealed(u.person,save))&&(!NEW_HERO_IDS_V027.includes")
)
for before,after in game_diffs:
 assert expected_game.count(before)==1,("game anchor",before)
 expected_game=expected_game.replace(before,after)
assert new_game==expected_game,"Legacy game modified outside additive 12-unit roster/art/q6 wiring"
old_design="  ...NEW_UNIT_DESIGN_V0900\n"
new_design="  ...NEW_UNIT_DESIGN_V0900,\n  ...NEW_UNIT_DESIGN_V0910\n"
assert old_perf.count(old_design)==1
assert new_perf==old_perf.replace(old_design,new_design),"Legacy performance metadata modified"
old_scripts='<script defer src="js/heroines_v0900_units.js?v=20261115-pr37-stage2"></script><script defer src="js/performance_v016.js?v=20261115-pr37-stage2"></script>'
new_scripts='<script defer src="js/heroines_v0900_units.js?v=20261115-pr37-stage2"></script><script defer src="js/heroines_v0910_units.js?v=20261115-singles12-stage2"></script><script defer src="js/performance_v016.js?v=20261115-singles12-stage2"></script>'
assert old_html.count(old_scripts)==1
assert new_html==old_html.replace(old_scripts,new_scripts),"HTML changed outside v0910 script connection"
assert new_html.index("js/heroines_v0910_units.js")<new_html.index("js/performance_v016.js")<new_html.index("js/game.js")
for path in ("js/heroines_v0910.js","js/heroines_v0910_wire.js","js/heroines_v0900_units.js",
             "js/heroines_v0890_units.js","js/heroines_v0880_units.js"):
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
   page.wait_for_function("typeof S!=='undefined'&&typeof applySkill==='function'&&typeof NEW_UNIT_ROSTER_V0910!=='undefined'",timeout=60000)
   baseline=page.evaluate("""()=>{
      gachaMode='normal';
      const ids=NEW_UNIT_ROSTER_V0910.map(u=>u.id);
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
         art:unitArt(u),gate:u.gate,storyGate:NEW_HERO_REVEAL_V0910[u.person],
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
   assert baseline["new19"]=={"R":80,"SR":0,"SSR":15,"UR":5} and baseline["cost"]==[120,1000],baseline
   assert all(baseline["saved"].values()),baseline["saved"]
   for u,id,person,name,role,stats,skills,p,tgt in zip(baseline["units"],IDS,PERSONS,NAMES,ROLES,STATS,SKILLS,PASSIVES,TARGETS):
    assert (u["id"],u["person"],u["name"],u["rarity"],u["role"])==(id,person,name,"R",role),u
    assert (u["stats"]["hp"],u["stats"]["atk"],u["stats"]["def"])==stats,u
    assert u["skills"]==list(skills) and u["target"]==list(tgt),u
    assert all("undefined" not in t and t for t in u["text"]),u
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
       out.ayano1=cast('takahashi_ayano_work',0);
       out.ayano2=cast('takahashi_ayano_work',1);
       out.mio1=cast('tanaka_mio_work',0);
       out.mio2=cast('tanaka_mio_work',1);
       out.shiori1=cast('arai_shiori_work',0,x=>{x.allies[1].cooldowns=[15,16];x.allies[2].cooldowns=[17,18];});
       out.shiori2=cast('arai_shiori_work',1);
       out.yuina1=cast('ono_yuina_work',0);
       out.yuina2=cast('ono_yuina_work',1);
       out.akane1=cast('maeda_akane_work',0);
       out.akane2=cast('maeda_akane_work',1);
       out.sui1=cast('fujita_sui_work',0);
       out.sui2=cast('fujita_sui_work',1,x=>{
         x.allies[0].weakenUntil=17;x.allies[1].weakenUntil=17;
         x.allies[1].weakenMult=.7;
       });
       out.satoko1=cast('goto_satoko_work',0);
       out.satoko2=cast('goto_satoko_work',1,x=>{x.allies[1].cooldowns=[15,16];x.allies[2].cooldowns=[17,18];});
       out.kazumi1=cast('nakajima_kazumi_work',0);
       out.kazumi2=cast('nakajima_kazumi_work',1);
       out.kyoko1=cast('harada_kyoko_work',0);
       out.kyoko2=cast('harada_kyoko_work',1);
       out.rina1=cast('ogawa_rina_work',0);
       out.rina2=cast('ogawa_rina_work',1);
       out.yuna1=cast('ishida_yuna_work',0,x=>{
         x.allies[1].weakenUntil=17;x.allies[1].weakenMult=.7;
       });
       out.yuna2=cast('ishida_yuna_work',1);
       out.mitsuki1=cast('morita_mitsuki_work',0);
       out.mitsuki2=cast('morita_mitsuki_work',1);
       out.passiveHeal={
         mioLow:passiveHealMultiplier({id:'tanaka_mio_work'},{hp:60,max:200}),
         mioHigh:passiveHealMultiplier({id:'tanaka_mio_work'},{hp:130,max:200}),
         yuina:passiveHealMultiplier({id:'ono_yuina_work'},{hp:130,max:200}),
         kazumiLow:passiveHealMultiplier({id:'nakajima_kazumi_work'},{hp:60,max:200}),
         kazumiHigh:passiveHealMultiplier({id:'nakajima_kazumi_work'},{hp:130,max:200}),
         yuna:passiveHealMultiplier({id:'ishida_yuna_work'},{hp:130,max:200})
       };
       out.passiveDamage={
         rina:passiveAttackMultiplier({id:'ogawa_rina_work'},mkEnemy('dummy',600)),
         mitsuki:passiveAttackMultiplier({id:'morita_mitsuki_work'},mkEnemy('dummy',600))
       };
     }finally{Math.random=originalRandom;}
     return out;
   }""")
   def close(x,y): return abs(x-y)<0.001
   assert all(close(x,1.1944) for x in combat["ayano1"]["after"]["defense"]),combat["ayano1"]
   assert all(close(x,18) for x in combat["ayano1"]["after"]["defenseUntil"]),combat["ayano1"]
   assert combat["ayano2"]["after"]["hp"]==[85,85,85],combat["ayano2"]
   assert combat["mio1"]["after"]["hp"]==[60,133,60],combat["mio1"]
   assert combat["mio2"]["after"]["hp"]==[85,85,85],combat["mio2"]
   assert close(combat["shiori1"]["after"]["cool"][1][0],13.2) and close(combat["shiori1"]["after"]["cool"][2][1],16.2),combat["shiori1"]
   assert all(close(x,1.1944) for x in combat["shiori2"]["after"]["rally"]),combat["shiori2"]
   assert all(close(x,18) for x in combat["shiori2"]["after"]["rallyUntil"]),combat["shiori2"]
   assert combat["yuina1"]["after"]["hp"]==[87,87,87],combat["yuina1"]
   assert combat["yuina2"]["after"]["hp"]==[60,122,60],combat["yuina2"]
   assert combat["akane1"]["after"]["enemyHP"][0]<600 and close(combat["akane1"]["after"]["timers"][0],4),combat["akane1"]
   assert close(combat["akane2"]["after"]["weaken"][0],.72) and close(combat["akane2"]["after"]["weakenUntil"][0],19.5),combat["akane2"]
   assert all(close(x,1.1944) for x in combat["sui1"]["after"]["rally"]),combat["sui1"]
   assert combat["sui2"]["after"]["hp"]==[90,90,90] and combat["sui2"]["after"]["allyWeaken"]==[0,0,0],combat["sui2"]
   assert all(close(x,1.2376) for x in combat["satoko1"]["after"]["defense"]),combat["satoko1"]
   assert all(close(x,18) for x in combat["satoko1"]["after"]["defenseUntil"]),combat["satoko1"]
   assert close(combat["satoko2"]["after"]["cool"][1][0],13.2) and close(combat["satoko2"]["after"]["cool"][2][1],16.2),combat["satoko2"]
   assert combat["kazumi1"]["after"]["hp"]==[85,85,85],combat["kazumi1"]
   assert combat["kazumi2"]["after"]["hp"]==[60,133,60],combat["kazumi2"]
   assert all(close(x,1.1944) for x in combat["kyoko1"]["after"]["defense"]),combat["kyoko1"]
   assert combat["kyoko2"]["after"]["hp"]==[85,85,85],combat["kyoko2"]
   assert combat["rina1"]["after"]["enemyHP"][0]<600 and close(combat["rina1"]["after"]["rally"][0],1.15),combat["rina1"]
   assert close(combat["rina1"]["after"]["rallyUntil"][0],16),combat["rina1"]
   assert combat["rina2"]["after"]["enemyHP"][0]<600 and combat["rina2"]["after"]["enemyHP"][1]<600 and combat["rina2"]["after"]["enemyHP"][2]==0,combat["rina2"]
   assert combat["yuna1"]["after"]["hp"]==[60,122,60] and combat["yuna1"]["after"]["allyWeaken"]==[0,0,0],combat["yuna1"]
   assert combat["yuna2"]["after"]["hp"]==[87,87,87],combat["yuna2"]
   assert combat["mitsuki1"]["after"]["enemyHP"][0]<600 and close(combat["mitsuki1"]["after"]["enemyHP"][1],600),combat["mitsuki1"]
   assert [round(x,3) for x in combat["mitsuki2"]["after"]["weaken"]]==[.85,.85,1],combat["mitsuki2"]
   assert close(combat["mitsuki2"]["after"]["weakenUntil"][0],16),combat["mitsuki2"]
   assert close(combat["passiveHeal"]["mioLow"],1.12) and close(combat["passiveHeal"]["mioHigh"],1),combat["passiveHeal"]
   assert close(combat["passiveHeal"]["yuina"],1.08),combat["passiveHeal"]
   assert close(combat["passiveHeal"]["kazumiLow"],1.12) and close(combat["passiveHeal"]["kazumiHigh"],1),combat["passiveHeal"]
   assert close(combat["passiveHeal"]["yuna"],1.08),combat["passiveHeal"]
   assert close(combat["passiveDamage"]["rina"],1.06) and close(combat["passiveDamage"]["mitsuki"],1.06),combat["passiveDamage"]
   assert not errors,(mode,errors[:12])
   reports[mode]={"base":baseline,"combat":combat,"errors":errors}
   (OUT/(mode+"_report.json")).write_text(json.dumps(reports[mode],ensure_ascii=False,indent=2),encoding="utf-8")
   print("SINGLES12",mode,"12 SR x 2 actual skills; exact LV1 stats; q6; 208 SR; legacy saves; rates; assets PASS")
   ctx.close()
  browser.close()
finally:
 srv.shutdown()
print("SINGLES12 STAGE2 ALL QA PASS")
