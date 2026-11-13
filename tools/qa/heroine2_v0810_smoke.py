#!/usr/bin/env python3
"""Draft-only QA for #81/#82, without adding units, gacha probability or changing the save key."""
import json, hashlib
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
K="sakakibara_kaho"
R="minase_ririka"
FILES={
 K:"assets/character_candidates/2026-11-12_rust_red_standee/full_body.png",
 R:"assets/character_candidates/2026-11-12_brown_ponytail_white_lace/brown_ponytail_white_lace_full_body.png"
}
for name,p in FILES.items():
    path=ROOT/p
    raw=path.read_bytes()
    with Image.open(path) as im:
        assert im.size==(1024,1536),(name,im.size)
        assert im.mode=="RGBA",(name,im.mode)
        assert im.getchannel("A").getextrema()[0]==0,(name,"not transparent")
    print("IMAGE",name,len(raw),hashlib.sha256(raw).hexdigest(),flush=True)

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url=f"http://127.0.0.1:{srv.server_port}/index.html"
results={}
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=["--no-sandbox"])
    for device,w,h in [("mobile",390,844),("landscape",844,390)]:
        ctx=browser.new_context(viewport={"width":w,"height":h})
        pg=ctx.new_page()
        errors=[]
        pg.on("pageerror",lambda e:errors.append(str(e)))
        pg.goto(url,wait_until="load",timeout=90000)
        pg.wait_for_function("typeof S!=='undefined' && typeof ROMANCE_V0810!=='undefined'",timeout=45000)
        details=pg.evaluate("""() => {
 const ids=NEW_HERO_IDS_V0810;
 const snapshot={};
 S=fresh(); S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
 const beforePool=availableNormalPool(S).map(u=>u.id);
 snapshot.names=ids.map(id=>PEOPLE[id]?.name);
 snapshot.units=UNITS.filter(u=>ids.includes(u.person)).map(u=>u.id);
 snapshot.initial=ids.map(id=>romanceHeroAvailable(id));
 snapshot.bonds=ids.map(id=>Object.keys(ROMANCE_V0810[id].stories).length);
 snapshot.profiles=ids.map(id=>HEROINE_PROFILES_ALL[id]?.age);
 snapshot.settings=ids.map(id=>CHARACTER_DEPTH_V0810[id]?.growth);
 snapshot.noKinship= !JSON.stringify(ROMANCE_V0810).includes('小春');
 S.quests.q3={complete:true};
 snapshot.afterQ3=ids.map(id=>romanceHeroAvailable(id));
 S.quests.q6={complete:true};
 snapshot.afterQ6=ids.map(id=>romanceHeroAvailable(id));
 snapshot.poolUnchanged=JSON.stringify(beforePool)===JSON.stringify(availableNormalPool(S).map(u=>u.id));
 snapshot.noRecruit=ids.every(id=>!availableNormalPool(S).some(u=>u.person===id));
 snapshot.key=SaveStore.key;
 snapshot.rate=RATE;
 snapshot.images=ids.map(id=>[ART_V2.full_body[id],ART_V2.upper_body[id],ART_V2.face_icons[id]]);
 snapshot.talk={};
 for(const id of ids){
   S.love.activeHero=id; view='talk';render();
   snapshot.talk[id]={
    nameVisible:document.querySelector('#app').textContent.includes(PEOPLE[id].name),
    noFallback:!document.querySelector('.runtime-fallback'),
    depth:document.querySelectorAll('.character-depth').length,
    topics:document.querySelectorAll('.romance-topics button').length,
    episodes:document.querySelectorAll('.v676-episode').length
   };
   setHeroAff(id,20);
   snapshot.talk[id].firstBond=bondAvailable(id,0);
   try{openBondEpisode(id,0);snapshot.talk[id].storyOpened=!!storySession&&storySession.id==='bond_'+id+'_0';}catch(e){snapshot.talk[id].storyError=String(e)}
   storySession=null;view='talk';
 }
 const saved=fresh();
 saved.owned.momoka_work={lv:3,aff:22,lb:1,copies:2};
 saved.gems=1234;saved.gold=4321;saved.party=['momoka_work','milku_work'];
 saved.quests.q1={complete:true};saved.gachaPity=27;saved.gachaSrStreak=4;
 delete saved.love.affection[ids[0]]; delete saved.love.affection[ids[1]];
 for(const id of ids){delete saved.bondRead[id];delete saved.bondLastTopic[id];}
 const migrated=migrateSave(JSON.parse(JSON.stringify(saved)));
 snapshot.migration={
   gems:migrated.gems===saved.gems,gold:migrated.gold===saved.gold,
   owned:JSON.stringify(migrated.owned)===JSON.stringify(saved.owned),
   party:JSON.stringify(migrated.party)===JSON.stringify(saved.party),
   q1:migrated.quests.q1.complete===true,
   pity:migrated.gachaPity===27, srStreak:migrated.gachaSrStreak===4,
   newKeys:ids.every(id=>Array.isArray(migrated.bondRead[id])&&Object.hasOwn(migrated.love.affection,id))
 };
 return snapshot;
}""")
        details["page_errors"]=errors
        results[device]=details
        qa=ROOT/"qa_artifacts/heroine2_v0810"
        qa.mkdir(parents=True,exist_ok=True)
        try:
            pg.evaluate("S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;S.quests.q3={complete:true};S.quests.q6={complete:true};S.love.activeHero='minase_ririka';view='talk';render()")
            pg.screenshot(path=str(qa/f"{device}_ririka_talk.png"),full_page=True)
            pg.evaluate("S.love.activeHero='sakakibara_kaho';view='talk';render()")
            pg.screenshot(path=str(qa/f"{device}_kaho_talk.png"),full_page=True)
        except Exception as e:details["screenshot_error"]=str(e)
        ctx.close()
    browser.close()

out=ROOT/"qa_artifacts/heroine2_v0810/result.json"
out.write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps(results,ensure_ascii=False,indent=2),flush=True)
for device,r in results.items():
    assert r["names"]==["榊原 夏帆","水瀬 莉々花"],(device,r.get("names"))
    assert r["units"]==[],(device,"units changed",r["units"])
    assert r["initial"]==[False,False],(device,"initial unlocked")
    assert r["afterQ3"]==[False,True],(device,"q3 gate")
    assert r["afterQ6"]==[True,True],(device,"q6 gate")
    assert r["bonds"]==[5,5],(device,"bond count")
    assert r["profiles"]==[25,23],(device,"profile")
    assert r["noKinship"],(device,"family claim")
    assert r["poolUnchanged"] and r["noRecruit"],(device,"gacha regression")
    assert r["key"]=="yoiboshi-reboot-v1",(device,"save key changed")
    assert r["rate"]=={"R":60,"SR":25,"SSR":10,"UR":5},(device,"rates changed")
    for id in [K,R]:
        t=r["talk"][id]
        assert t["nameVisible"] and t["noFallback"] and t["depth"] and t["topics"]==8 and t["episodes"]==5,(device,id,t)
        assert t["firstBond"] and t["storyOpened"],(device,id,t)
    assert all(r["migration"].values()),(device,"save migration",r["migration"])
    assert not r["page_errors"],(device,"JS errors",r["page_errors"])
print("PASS: PR81/82 dialogue-only, quest gates, image transparency, old saves and gacha invariants")
