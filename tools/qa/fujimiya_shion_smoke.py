#!/usr/bin/env python3
"""One-character combined stage1+2 browser acceptance, exact 26/-28%/8s combat and regressions."""
import json
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/fujimiya_shion"
OUT.mkdir(parents=True,exist_ok=True)
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url="http://127.0.0.1:"+str(srv.server_port)+"/index.html"
reports={}
try:
 with sync_playwright() as playwright:
  browser=playwright.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,w,h in (("portrait",390,844),("landscape",844,390)):
   context=browser.new_context(viewport={"width":w,"height":h})
   page=context.new_page()
   errors=[]
   page.on("pageerror",lambda e:errors.append(str(e)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof NEW_UNIT_ROSTER_V0930!=='undefined'&&typeof S!=='undefined'&&typeof applySkill==='function'",timeout=60000)
   results=page.evaluate("""()=>{
      const pid='fujimiya_shion',id='fujimiya_shion_work';
      const u=BYID[id],c=V0930_CHARACTERS[0],r=ROMANCE_V0930[pid];
      const before=fresh(),after=fresh();after.quests.q6={complete:true};
      gachaMode='normal';
      S=fresh();S.owned[id]={lv:1,aff:0,lb:0,copies:0};
      const st=unitPower(id);
      const old=fresh();
      old.owned.momoka_work={lv:5,aff:18,lb:2,copies:3};
      old.owned.milku_work={lv:3,aff:11,lb:0,copies:1};
      old.party=['momoka_work','milku_work'];old.selected='momoka_work';old.homeFavorite='momoka';
      old.homeUnitId='momoka_work';old.gems=2345;old.gold=4321;old.gachaPity=8;old.gachaSrStreak=2;
      old.quests.q2={complete:true};old.storyFlags.testOld=true;
      const migrated=migrateSave(JSON.parse(JSON.stringify(old)));
      const saved=JSON.stringify(migrated.owned.momoka_work)===JSON.stringify(old.owned.momoka_work)
        &&JSON.stringify(migrated.owned.milku_work)===JSON.stringify(old.owned.milku_work)
        &&JSON.stringify(migrated.party)===JSON.stringify(old.party)
        &&migrated.selected===old.selected&&migrated.homeFavorite===old.homeFavorite
        &&migrated.homeUnitId===old.homeUnitId&&migrated.gems===2345&&migrated.gold===4321
        &&migrated.gachaPity===8&&migrated.gachaSrStreak===2
        &&migrated.quests.q2.complete&&migrated.storyFlags.testOld&&!migrated.owned[id];
      const info={id:u?.id,role:u?.role,rarity:u?.rarity,gate:u?.gate,
        person:u?.person,name:PEOPLE[pid]?.name,age:r.profile.age,
        job:r.profile.occupation,personality:r.profile.personality,
        unitStats:[st.hp,st.atk,st.def],
        skillTypes:[unitSkillType(u,0),unitSkillType(u,1)],
        skillText:[skillDescription(u,0),skillDescription(u,1)],
        passiveType:unitPassive(u).type,passiveValue:passiveValue(u),
        rSkill:passiveValue(BYID.hayase_rio_work),
        rNew20:passiveValue(BYID.hamasaki_nagisa_work),
        revealedBefore:heroineStoryRevealed(pid,before),revealedAfter:heroineStoryRevealed(pid,after),
        visibleBefore:visibleUnitV026(u,before),visibleAfter:visibleUnitV026(u,after),
        normalBefore:availableNormalPool(before).some(x=>x.id===id),
        normalAfter:availableNormalPool(after).some(x=>x.id===id),
        normalPool:[...['R','SR','SSR','UR'].map(v=>NORMAL_GACHA_POOL.filter(x=>x.rarity===v).length)],
        allR:UNITS.filter(x=>x.rarity==='R').length,
        rate:{...RATE},new19:{...NEW19_RATE},
        newUnique:UNITS.filter(x=>x.id===id).length===1,
        heroineCount:HERO_IDS.length,
        hasHero:HERO_IDS.includes(pid)&&NEW_HERO_IDS.includes(pid),
        heroineProfile:HEROINE_PROFILES[pid]?.name,
        depth:CHARACTER_DEPTH_V0930[pid],
        intro:Object.keys(V0930_MEET_STORIES).length,
        bonds:Object.keys(r.stories).filter(k=>k.startsWith('bond_'+pid+'_')).length,
        topics:r.topics.length,places:Object.keys(r.likes).length,
        storyTitle:V0930_MEET_STORIES['v0930_meet_'+pid]?.title,
        artwork:[unitArt(u),ART_V2.full_body[pid],ART_V2.upper_body[pid],ART_V2.face_icons[pid]],
        save:saved
      };
      function ally(id,i){return {id,hp:120,max:200,atk:ROLES[BYID[id].role].atk,
        def:ROLES[BYID[id].role].def,shield:0,taunt:0,cooldowns:[0,0],
        x:18+i*18,y:32,attackTimer:10,defenseBuffUntil:0,defenseBuffMult:1,
        healBuffUntil:0,healBuffMult:1,damageReduceUntil:0,damageReduceMult:1,rallyUntil:0,rallyMult:1};}
      function foe(name){return {name,hp:600,max:600,atk:30,attackTimer:2,interval:2.1,
        x:78,y:38,weakenMult:1,weakenUntil:0,damageReduction:0};}
      function cast(actor,slot){
        S=fresh();
        for(const k of [actor,'momoka_work','milku_work'])S.owned[k]={lv:1,aff:0,lb:0,copies:0};
        battle={qid:'q2',sim:10,phase:'fight',done:false,log:[],popups:[],
          allies:[ally(actor,0),ally('momoka_work',1),ally('milku_work',2)],
          enemies:[foe('A'),foe('B')]};
        const orig=Math.random;Math.random=()=>.9;
        try{applySkill(0,slot,'enemy',0);}
        finally{Math.random=orig;}
        return {hp:battle.enemies.map(x=>x.hp),weaken:battle.enemies.map(x=>x.weakenMult),
          until:battle.enemies.map(x=>x.weakenUntil),text:battle.log.slice()};
      }
      info.attack=cast(id,0);
      info.aoe=cast(id,1);
      info.legacy=cast('sakuraba_renka_work',0);
      return info;
   }""")
   assert results["id"]=="fujimiya_shion_work",results
   assert results["name"].replace(" ","")=="藤宮紫音",results
   assert results["age"]==24 and results["job"]=="ネイルアーティスト",results
   assert results["personality"]=="自信家で面倒見がいい",results
   assert results["role"]=="attacker" and results["rarity"]=="R" and results["gate"]=="q6",results
   assert results["unitStats"]==[125,19,3],results
   assert results["skillTypes"]==["renka_strike_down","rio_aoe_18"],results
   assert "28%" in results["skillText"][0] and "8秒" in results["skillText"][0],results
   assert "18" in results["skillText"][1],results
   assert results["passiveType"]=="rio_attack" and results["passiveValue"]==4,results
   assert results["rSkill"]==6 and results["rNew20"]==4,results
   assert results["newUnique"] and results["hasHero"],results
   assert results["heroineCount"]==249,results
   assert results["normalPool"]==[233,56,56,57] and results["allR"]==276,results
   assert results["rate"]=={"R":60,"SR":25,"SSR":10,"UR":5},results
   assert results["new19"]=={"R":80,"SR":0,"SSR":15,"UR":5},results
   assert not (results["revealedBefore"] or results["visibleBefore"] or results["normalBefore"]),results
   assert results["revealedAfter"] and results["visibleAfter"] and results["normalAfter"],results
   assert results["intro"]==1 and results["bonds"]==5 and results["topics"]==8 and results["places"]==6,results
   assert all(results["depth"].get(k) for k in ("habit","inside","growth","cg")),results
   assert results["heroineProfile"]==results["name"],results
   assert results["save"],results
   assert results["attack"]["hp"][0]<600 and results["attack"]["hp"][1]==600,results
   assert abs(results["attack"]["weaken"][0]-.72)<1e-6 and results["attack"]["until"][0]==18,results
   assert results["aoe"]["hp"][0]<600 and results["aoe"]["hp"][1]<600,results
   assert abs(results["legacy"]["weaken"][0]-.82)<1e-6 and results["legacy"]["until"][0]==16,results
   for art in results["artwork"]:
    res=page.request.get(url.rsplit("/",1)[0]+"/"+art)
    assert res.status==200 and len(res.body())>2000,(art,res.status)
   assert not errors,errors
   reports[mode]={"status":"PASS","heroine_count":results["heroineCount"],
                  "normal_pool":results["normalPool"],"all_R":results["allR"],
                  "source_art":results["artwork"],"S1":results["attack"],
                  "S2":results["aoe"],"legacy_Renka":results["legacy"]}
   context.close()
  browser.close()
finally:
 srv.shutdown()
(OUT/"browser_report.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({mode:{"status":v["status"],"heroine_count":v["heroine_count"],"normal_pool":v["normal_pool"],"all_R":v["all_R"]} for mode,v in reports.items()},ensure_ascii=False))
print("PASS Fujimiya Shion one-character stage1+stage2 / 2 orientations / 2 skill casts and Renka regression / q6 / saves / art")
