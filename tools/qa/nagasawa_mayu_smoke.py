#!/usr/bin/env python3
"""Mayu stage1+2: portrait/landscape, source-only art, q6, skill effects and save compatibility."""
import json
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/nagasawa_mayu"
OUT.mkdir(parents=True,exist_ok=True)
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url="http://127.0.0.1:"+str(srv.server_port)+"/index.html"
reports={}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,w,h in (("portrait",390,844),("landscape",844,390)):
   context=browser.new_context(viewport={"width":w,"height":h})
   page=context.new_page()
   errors=[]
   page.on("pageerror",lambda e:errors.append(str(e)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof NEW_UNIT_ROSTER_V0940!=='undefined'&&typeof S!=='undefined'&&typeof applySkill==='function'",timeout=60000)
   info=page.evaluate("""()=>{
     const id='nagasawa_mayu',uid='nagasawa_mayu_work';
     const u=BYID[uid],r=ROMANCE_V0940[id];
     const old=fresh(),q6=fresh();q6.quests.q6={complete:true};
     gachaMode='normal';
     S=fresh();S.owned[uid]={lv:1,aff:0,lb:0,copies:0};
     const st=unitPower(uid);
     const save=fresh();
     save.owned.momoka_work={lv:5,aff:18,lb:2,copies:3};
     save.owned.fujimiya_shion_work={lv:3,aff:11,lb:0,copies:1};
     save.party=['momoka_work','fujimiya_shion_work'];save.selected='fujimiya_shion_work';
     save.homeFavorite='fujimiya_shion';save.homeUnitId='fujimiya_shion_work';
     save.gems=2345;save.gold=4321;save.gachaPity=8;save.gachaSrStreak=2;
     save.quests.q2={complete:true};save.storyFlags.oldEntry=true;
     const migrated=migrateSave(JSON.parse(JSON.stringify(save)));
     const saveStatus={
       momoka:JSON.stringify(save.owned.momoka_work)===JSON.stringify(migrated.owned.momoka_work),
       earlierHero:JSON.stringify(save.owned.fujimiya_shion_work)===JSON.stringify(migrated.owned.fujimiya_shion_work),
       party:JSON.stringify(save.party)===JSON.stringify(migrated.party),
       selected:save.selected===migrated.selected,
       favorite:save.homeFavorite===migrated.homeFavorite,
       homeUnit:save.homeUnitId===migrated.homeUnitId,
       gems:migrated.gems===2345,gold:migrated.gold===4321,
       pity:migrated.gachaPity===8,streak:migrated.gachaSrStreak===2,
       quest:!!migrated.quests.q2.complete,flag:!!migrated.storyFlags.oldEntry,
       notAlreadyOwned:!migrated.owned[uid]
     };
     const saveOk=Object.values(saveStatus).every(Boolean);
     const result={
       name:PEOPLE[id]?.name,age:r.profile.age,job:r.profile.occupation,
       personality:r.profile.personality,heroId:id,unitId:u?.id,unitPerson:u?.person,
       unitRole:u?.role,rarity:u?.rarity,gate:u?.gate,
       heroCount:HERO_IDS.length,uniqueHero:new Set(HERO_IDS).size===HERO_IDS.length,
       inHeroLists:HERO_IDS.includes(id)&&NEW_HERO_IDS.includes(id),
       freshLocked:!heroineStoryRevealed(id,old)&&!visibleUnitV026(u,old)&&!availableNormalPool(old).some(x=>x.id===uid),
       q6Open:heroineStoryRevealed(id,q6)&&visibleUnitV026(u,q6)&&availableNormalPool(q6).some(x=>x.id===uid),
       stats:[st.hp,st.atk,st.def],
       skills:[unitSkillType(u,0),unitSkillType(u,1)],
       targets:[skillTarget(u,0),skillTarget(u,1)],
       descriptions:[skillDescription(u,0),skillDescription(u,1)],
       passive:{type:unitPassive(u).type,val:passiveValue(u)},
       oldSupportPassive:passiveValue(BYID.takamiya_sayaka_work),
       earlierRSupportPassive:passiveValue(BYID.endo_saori_work),
       normalPool:['R','SR','SSR','UR'].map(v=>NORMAL_GACHA_POOL.filter(x=>x.rarity===v).length),
       allR:UNITS.filter(x=>x.rarity==='R').length,
       unitUnique:UNITS.filter(x=>x.id===uid).length===1,
       rates:{...RATE},newRates:{...NEW19_RATE},
       topics:r.topics.length,bonds:Object.keys(r.stories).length,
       meeting:V0940_MEET_STORIES['v0940_meet_'+id],
       depth:CHARACTER_DEPTH_V0940[id],profile:HEROINE_PROFILES[id],
       art:[unitArt(u),ART_V2.full_body[id],ART_V2.upper_body[id],ART_V2.face_icons[id]],
       saveOk,saveStatus
     };
     function ally(id,i){return {id,hp:120,max:200,atk:ROLES[BYID[id].role].atk,
       def:ROLES[BYID[id].role].def,shield:0,taunt:0,cooldowns:[15,16],
       x:18+i*18,y:32,attackTimer:10,defenseBuffUntil:0,defenseBuffMult:1,
       healBuffUntil:0,healBuffMult:1,damageReduceUntil:0,damageReduceMult:1,
       rallyUntil:0,rallyMult:1};}
     function foe(name){return {name,hp:600,max:600,atk:30,attackTimer:2,
       interval:2.1,x:78,y:38,weakenMult:1,weakenUntil:0,damageReduction:0};}
     function cast(actor,slot){
       S=fresh();for(const x of [actor,'momoka_work','milku_work'])
         S.owned[x]={lv:1,aff:0,lb:0,copies:0};
       battle={qid:'q2',sim:10,phase:'fight',done:false,log:[],popups:[],
         allies:[ally(actor,0),ally('momoka_work',1),ally('milku_work',2)],
         enemies:[foe('A'),foe('B')]};
       battle.allies[0].cooldowns=[0,0]; // The caster must be ready; other allies have outstanding CT.
       applySkill(0,slot,'ally',1);
       return {ally: battle.allies.map(x=>({
         rallyMult:x.rallyMult,rallyUntil:x.rallyUntil,cooldowns:x.cooldowns})),
         log:battle.log.slice(),enemyHP:battle.enemies.map(x=>x.hp)};
     }
     result.attack=cast(uid,0);
     result.cooldown=cast(uid,1);
     result.legacyAttack=cast('takamiya_sayaka_work',0);
     return result;
   }""")
   assert info["heroCount"]==261 and info["uniqueHero"] and info["inHeroLists"],info
   assert info["name"].replace(" ","")=="長沢まゆ" and info["age"]==21,info
   assert info["job"]=="洋服店スタッフ" and info["personality"]=="明るくカジュアル",info
   assert info["unitId"]=="nagasawa_mayu_work" and info["unitPerson"]=="nagasawa_mayu",info
   assert info["unitRole"]=="support" and info["rarity"]=="R" and info["gate"]=="q6",info
   assert info["stats"]==[165,11,5] and info["unitUnique"],info
   assert info["skills"]==["sayaka_team_attack_up","cecil_team_ct"],info
   assert info["targets"]==["ally","ally"],info
   assert "18%" in info["descriptions"][0] and "8秒" in info["descriptions"][0],info
   assert "1.8" in info["descriptions"][1],info
   assert info["passive"]=={"type":"sayaka_buff","val":6},info
   assert info["oldSupportPassive"]==8 and info["earlierRSupportPassive"]==6,info
   assert info["freshLocked"] and info["q6Open"],info
   assert info["normalPool"]==[245,56,56,57] and info["allR"]==288,info
   assert info["rates"]=={"R":60,"SR":25,"SSR":10,"UR":5},info
   assert info["newRates"]=={"R":80,"SR":0,"SSR":15,"UR":5},info
   assert info["topics"]==8 and info["bonds"]==5,info
   assert info["meeting"]["requires"]==["q6"] and len(info["meeting"]["lines"])==5,info
   assert all(info["depth"].get(k) for k in ("habit","inside","growth","cg")),info
   assert info["profile"]["name"]==info["name"] and info["saveOk"],info
   for a in info["attack"]["ally"]:
    assert abs(a["rallyMult"]-1.1908)<.00001 and a["rallyUntil"]==18,info
   assert abs(info["cooldown"]["ally"][1]["cooldowns"][0]-13.2)<.00001,info
   assert abs(info["cooldown"]["ally"][1]["cooldowns"][1]-14.2)<.00001,info
   assert all(abs(a["rallyMult"]-1.1944)<.00001 for a in info["legacyAttack"]["ally"]),info
   assert info["attack"]["enemyHP"]==[600,600] and info["cooldown"]["enemyHP"]==[600,600],info
   for art in info["art"]:
    response=page.request.get(url.rsplit("/",1)[0]+"/"+art)
    assert response.status==200 and len(response.body())>2000,(art,response.status)
   assert not errors,errors
   reports[mode]={"status":"PASS","registered_heroes":info["heroCount"],"normal_R":info["normalPool"][0],
     "all_R":info["allR"],"passive_R":info["passive"],"skill1":info["attack"],
     "skill2":info["cooldown"],"legacy":info["legacyAttack"],"art":info["art"]}
   context.close()
  browser.close()
finally:
 srv.shutdown()
(OUT/"browser_report.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({k:{"status":v["status"],"registered_heroes":v["registered_heroes"],
 "normal_R":v["normal_R"],"all_R":v["all_R"]} for k,v in reports.items()},ensure_ascii=False))
print("PASS Mayu full stage1+2, 2 orientations, 2 skills, R passive, legacy SR, 5 bonds, q6, artwork, save")
