#!/usr/bin/env python3
"""20 q6-gated, genuine R unit stage2 browser and protected-source smoke tests."""
import json
import subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/adopted20_stage2"
OUT.mkdir(parents=True,exist_ok=True)
EXPECTED=json.loads(r'''[{"id":"endo_saori_work","person":"endo_saori","name":"遠藤沙織","role":"support","skills":["sayaka_team_attack_up","kana_heal_all_25"],"passive":"sayaka_buff","val":6},{"id":"takamori_serika_work","person":"takamori_serika","name":"高森セリカ","role":"support","skills":["sayaka_team_defense_up","cecil_team_ct"],"passive":"sayaka_buff","val":6},{"id":"enomoto_tsugumi_work","person":"enomoto_tsugumi","name":"榎本つぐみ","role":"support","skills":["cecil_team_ct","sayaka_team_defense_up"],"passive":"sayaka_buff","val":6},{"id":"amase_kanata_work","person":"amase_kanata","name":"天瀬かなた","role":"support","skills":["sayaka_team_attack_up","sayaka_team_defense_up"],"passive":"sayaka_buff","val":6},{"id":"higuchi_rei_work","person":"higuchi_rei","name":"樋口れい","role":"support","skills":["rena_defense_up_22","suzuha_cleanse_heal"],"passive":"sayaka_buff","val":6},{"id":"dojima_rei_work","person":"dojima_rei","name":"堂島礼","role":"support","skills":["sayaka_team_attack_up","suzuha_cleanse_heal"],"passive":"sayaka_buff","val":6},{"id":"tsukino_moka_work","person":"tsukino_moka","name":"月野もか","role":"support","skills":["sayaka_team_defense_up","kana_heal_all_25"],"passive":"sayaka_buff","val":6},{"id":"asagiri_rara_work","person":"asagiri_rara","name":"朝霧らら","role":"support","skills":["cecil_team_ct","sayaka_team_attack_up"],"passive":"sayaka_buff","val":6},{"id":"sakaki_yura_work","person":"sakaki_yura","name":"榊ゆら","role":"attacker","skills":["honoka_strike_ct","nanami_attack_down"],"passive":"nanami_debuff_extend","val":1},{"id":"hamasaki_nagisa_work","person":"hamasaki_nagisa","name":"浜咲なぎさ","role":"attacker","skills":["rio_strike_self_attack","rio_aoe_18"],"passive":"rio_attack","val":4},{"id":"nikaido_yuki_work","person":"nikaido_yuki","name":"二階堂ゆき","role":"attacker","skills":["nanami_strike_26","honoka_enemy_attack_down_all"],"passive":"rio_attack","val":4},{"id":"himemiya_riria_work","person":"himemiya_riria","name":"姫宮リリア","role":"attacker","skills":["rio_strike_self_attack","nanami_attack_down"],"passive":"nanami_debuff_extend","val":1},{"id":"nanjo_yurara_work","person":"nanjo_yurara","name":"南条ゆらら","role":"attacker","skills":["honoka_strike_ct","honoka_enemy_attack_down_all"],"passive":"rio_attack","val":4},{"id":"wakakusa_rinne_work","person":"wakakusa_rinne","name":"若草りんね","role":"attacker","skills":["rio_strike_self_attack","rio_aoe_18"],"passive":"rio_attack","val":4},{"id":"nekomiya_rara_work","person":"nekomiya_rara","name":"猫宮らら","role":"attacker","skills":["nanami_strike_26","nanami_attack_down"],"passive":"nanami_debuff_extend","val":1},{"id":"katsura_yui_work","person":"katsura_yui","name":"桂ゆい","role":"healer","skills":["marika_heal_one_65","marika_heal_all_22"],"passive":"marika_rescue","val":9},{"id":"momose_yumeka_work","person":"momose_yumeka","name":"桃瀬ゆめか","role":"healer","skills":["kana_heal_all_25","heal_one"],"passive":"heal","val":5},{"id":"sorano_nanase_work","person":"sorano_nanase","name":"空野ななせ","role":"healer","skills":["marika_heal_all_22","marika_heal_one_65"],"passive":"marika_rescue","val":9},{"id":"komine_suzu_work","person":"komine_suzu","name":"小峰すず","role":"healer","skills":["rino_cleanse_heal_one_57","kana_heal_all_25"],"passive":"heal","val":5},{"id":"amai_momo_work","person":"amai_momo","name":"甘井もも","role":"healer","skills":["kana_heal_all_25","marika_heal_one_65"],"passive":"heal","val":5}]''')
EXPECTED_IDS=[e["id"] for e in EXPECTED]
assert len(EXPECTED)==20 and len(set(EXPECTED_IDS))==20
assert sum(x["role"]=="support" for x in EXPECTED)==8
assert sum(x["role"]=="attacker" for x in EXPECTED)==7
assert sum(x["role"]=="healer" for x in EXPECTED)==5

class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args): pass

srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url="http://127.0.0.1:"+str(srv.server_port)+"/index.html"
reports={}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,w,h in [("portrait",390,844),("landscape",844,390)]:
   context=browser.new_context(viewport={"width":w,"height":h})
   page=context.new_page()
   errors=[]
   page.on("pageerror",lambda err:errors.append(str(err)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof NEW_UNIT_ROSTER_V0920!=='undefined'&&typeof S!=='undefined'&&typeof applySkill==='function'",timeout=60000)
   data=page.evaluate("""(expected)=>{
     gachaMode='normal';
     const before=fresh(),after=fresh();after.quests.q6={complete:true};
     const infos=expected.map(e=>{
       const u=BYID[e.id];if(!u)throw Error('Unit not found '+e.id);
       S=fresh();S.owned[e.id]={lv:1,aff:0,lb:0,copies:0};
       const st=unitPower(e.id);
       const texts=[skillDescription(u,0),skillDescription(u,1),passiveDescription(u)];
       return {id:u.id,person:u.person,name:PEOPLE[u.person]?.name,rarity:u.rarity,
         role:u.role,stats:[st.hp,st.atk,st.def],gate:u.gate,
         skills:[unitSkillType(u,0),unitSkillType(u,1)],
         targets:[skillTarget(u,0),skillTarget(u,1)],
         passive:unitPassive(u).type,passiveValue:passiveValue(u),
         texts,art:unitArt(u),normal:NORMAL_GACHA_POOL.some(x=>x.id===u.id),
         special:NEW19_GACHA_POOL.some(x=>x.id===u.id),
         visibleBefore:visibleUnitV026(u,before),visibleAfter:visibleUnitV026(u,after),
         availableBefore:availableNormalPool(before).some(x=>x.id===u.id),
         availableAfter:availableNormalPool(after).some(x=>x.id===u.id)};
     });
     const old=fresh();
     old.owned.momoka_work={lv:5,aff:18,lb:2,copies:3};
     old.party=['momoka_work'];old.selected='momoka_work';old.gems=2345;old.gold=4321;
     old.gachaPity=8;old.gachaSrStreak=2;old.quests.q2={complete:true};
     const m=migrateSave(JSON.parse(JSON.stringify(old)));
     return {units:infos,rate:{...RATE},new19:{...NEW19_RATE},
       pool:{R:NORMAL_GACHA_POOL.filter(x=>x.rarity==='R').length,
         SR:NORMAL_GACHA_POOL.filter(x=>x.rarity==='SR').length,
         SSR:NORMAL_GACHA_POOL.filter(x=>x.rarity==='SSR').length,
         UR:NORMAL_GACHA_POOL.filter(x=>x.rarity==='UR').length},
       rarityAll:{R:UNITS.filter(x=>x.rarity==='R').length},
       duplicate:new Set(UNITS.map(x=>x.id)).size!==UNITS.length,
       legacyPassives:{
         support:passiveValue(BYID.takamiya_sayaka_work),
         attacker:passiveValue(BYID.hayase_rio_work),
         healer:passiveValue(BYID.shirase_marika_work)},
       save:{owned:JSON.stringify(m.owned.momoka_work)===JSON.stringify(old.owned.momoka_work),
         party:JSON.stringify(m.party)===JSON.stringify(old.party),
         selected:m.selected===old.selected,gems:m.gems===2345,gold:m.gold===4321,
         pity:m.gachaPity===8&&m.gachaSrStreak===2,q2:!!m.quests.q2.complete,
         newNotOwned:expected.every(e=>!m.owned[e.id])}};
   }""", EXPECTED)
   assert not data["duplicate"],"Duplicate unit ID"
   assert data["rate"]=={"R":60,"SR":25,"SSR":10,"UR":5},data["rate"]
   assert data["new19"]=={"R":80,"SR":0,"SSR":15,"UR":5},data["new19"]
   assert data["pool"]=={"R":232,"SR":56,"SSR":56,"UR":57},data["pool"]
   assert data["rarityAll"]["R"]==275,data["rarityAll"]
   assert data["legacyPassives"]=={"support":8,"attacker":6,"healer":12},data["legacyPassives"]
   assert all(data["save"].values()),data["save"]
   for e,u in zip(EXPECTED,data["units"]):
    assert u["id"]==e["id"] and u["person"]==e["person"],u
    assert u["name"].replace(" ","")==e["name"],u
    assert u["role"]==e["role"] and u["rarity"]=="R" and u["gate"]=="q6",u
    assert u["stats"]=={"support":[165,11,5],"attacker":[125,19,3],"healer":[148,9,5]}[e["role"]],u
    assert u["skills"]==e["skills"] and u["passive"]==e["passive"],u
    assert u["passiveValue"]==e["val"],u
    assert u["targets"]==["ally" if t in {
      "sayaka_team_attack_up","sayaka_team_defense_up","cecil_team_ct",
      "rena_defense_up_22","suzuha_cleanse_heal","kana_heal_all_25",
      "marika_heal_one_65","marika_heal_all_22","heal_one",
      "rino_cleanse_heal_one_57"} else "enemy" for t in e["skills"]],u
    assert u["normal"] and not u["special"],u
    assert not u["visibleBefore"] and not u["availableBefore"],u
    assert u["visibleAfter"] and u["availableAfter"],u
    assert all(v and "undefined" not in v for v in u["texts"]),u
    assert "/full_body/"+e["person"]+".png" in u["art"],u
    res=page.request.get(url.rsplit("/",1)[0]+"/"+u["art"])
    assert res.status==200 and len(res.body())>2000,(e["id"],res.status)
   combat=page.evaluate("""(expected)=>{
     const mkAlly=(id,i)=>({id,hp:60,max:200,atk:ROLES[BYID[id].role].atk,
       def:ROLES[BYID[id].role].def,shield:0,taunt:0,cooldowns:i?[15,16]:[0,0],
       x:18+i*18,y:32,attackTimer:10,defenseBuffUntil:0,defenseBuffMult:1,
       healBuffUntil:0,healBuffMult:1,damageReduceUntil:0,damageReduceMult:1,
       rallyUntil:0,rallyMult:1});
     const mkEnemy=(name)=>({name,hp:600,max:600,atk:30,attackTimer:2,interval:2.1,
       x:78,y:38,weakenMult:1,weakenUntil:0,damageReduction:0});
     const checks=[];
     for(const e of expected)for(let j=0;j<2;j++){
       S=fresh();for(const id of [e.id,'momoka_work','milku_work'])
         S.owned[id]={lv:1,aff:0,lb:0,copies:0};
       battle={qid:'q2',sim:10,phase:'fight',done:false,log:[],popups:[],
         allies:[mkAlly(e.id,0),mkAlly('momoka_work',1),mkAlly('milku_work',2)],
         enemies:[mkEnemy('Enemy-A'),mkEnemy('Enemy-B')]};
       battle.allies[1].weakenUntil=17;battle.allies[1].weakenMult=.7;
       const skill=e.skills[j],kind=skillTarget(BYID[e.id],j);
       applySkill(0,j,kind,kind==='ally'?1:0);
       const b=battle,a=b.allies,z=b.enemies;
       let ok=false;
       if(skill==='sayaka_team_attack_up')ok=a.every(x=>x.rallyMult>1.18&&x.rallyUntil===18);
       else if(skill==='sayaka_team_defense_up')ok=a.every(x=>x.defenseBuffMult>1.18&&x.defenseBuffUntil===18);
       else if(skill==='rena_defense_up_22')ok=a.every(x=>x.defenseBuffMult>1.22&&x.defenseBuffUntil===18);
       else if(skill==='cecil_team_ct')ok=a[1].cooldowns[0]===13.2||Math.abs(a[1].cooldowns[0]-13.2)<.0001;
       else if(skill==='kana_heal_all_25'||skill==='marika_heal_all_22')ok=a.every(x=>x.hp>60);
       else if(skill==='marika_heal_one_65'||skill==='heal_one')ok=a[1].hp>60&&a[0].hp===60;
       else if(skill==='suzuha_cleanse_heal'||skill==='rino_cleanse_heal_one_57')
         ok=a[1].hp>60&&a[1].weakenUntil===0&&a[1].weakenMult===1;
       else if(skill==='honoka_strike_ct')ok=z[0].hp<600&&z[0].attackTimer===4;
       else if(skill==='nanami_strike_26')ok=z[0].hp<600;
       else if(skill==='nanami_attack_down')ok=z[0].weakenMult<1&&z[0].weakenUntil>=18;
       else if(skill==='honoka_enemy_attack_down_all')ok=z.every(x=>x.weakenMult<1);
       else if(skill==='rio_strike_self_attack')ok=z[0].hp<600&&a[0].rallyMult>1.14;
       else if(skill==='rio_aoe_18')ok=z.every(x=>x.hp<600);
       checks.push({id:e.id,slot:j+1,skill,ok});
     }
     return checks;
   }""", EXPECTED)
   failures=[c for c in combat if not c["ok"]]
   assert len(combat)==40 and not failures,failures
   assert not errors,errors[:8]
   reports[mode]={"result":"PASS","registered_units":len(data["units"]),"skill_casts":len(combat),
                  "normal_pool":data["pool"],"all_R":data["rarityAll"]["R"],
                  "legacy_passive":data["legacyPassives"],"save":data["save"]}
   context.close()
  browser.close()
finally:
 srv.shutdown()
(OUT/"report.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps(reports,ensure_ascii=False,indent=2))
print("PASS: both orientations / 20 R units / 40 actual skill casts / q6 / pools / R passives / legacy / save / artwork")
