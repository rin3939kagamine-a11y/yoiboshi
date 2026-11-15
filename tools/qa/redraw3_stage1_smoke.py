#!/usr/bin/env python3
"""Real Chromium tests for three new stage-1 heroines: q6, dialogue, bonds, saves, rates and unchanged units."""
import hashlib
import json
import subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/redraw3_stage1"
OUT.mkdir(parents=True,exist_ok=True)
IDS=("ginjo_cecil","hasegawa_honoka","ueda_kana")
NAMES=("銀城 セシル","長谷川 ほのか","上田 かな")
AGES=(21,23,25)
BLOBS=("8ef147a8d90ed33968a11b626b4b11ce729c970d",
       "a62336a12f1c73dfc8d562b2c1f04e740865ed9f",
       "6b621dd3b8b23de1f2b34125202ce748bb76907a")
SOURCES=("02_ginjo_cecil_v2.png","20_hasegawa_honoka_v2.png","37_ueda_kana_v2.png")

old=subprocess.check_output(["git","show","origin/main:js/game.js"],cwd=ROOT,text=True)
new=(ROOT/"js/game.js").read_text()
# This PR is strictly additional. Preserve definitions affecting save, rates, existing units and combat.
for token in ("const KEY=","const ROLES=","const UNITS=[","UNITS.push(","const RATE=",
             "const NEW19_RATE=","const GACHA_CONFIG=","const NORMAL_GACHA_POOL=",
             "const NEW19_GACHA_POOL=","function migrateSave(","function drawNormalGachaUnit(",
             "function unitPower(","function applySkill("):
 a,b=old.index(token),new.index(token)
 end="\\n];" if token=="const UNITS=[" else "\\n"
 assert old[a:old.index(end,a)+len(end)]==new[b:new.index(end,b)+len(end)],("protected code changed",token)
assert "NEW_UNIT_ROSTER_V0850" not in new and "NEW_UNIT_ARTWORK_V0850" not in new
for id,name,age,blob,src in zip(IDS,NAMES,AGES,BLOBS,SOURCES):
 full=ROOT/"assets/ART_V2/full_body"/f"{id}.png"
 original=ROOT/"docs/new_character_ideas/2026-11-15_redraw3"/src
 assert full.read_bytes()==original.read_bytes(),(id,"original mismatch")
 assert subprocess.check_output(["git","hash-object",str(full)],cwd=ROOT,text=True).strip()==blob
 with Image.open(full) as im:
  assert im.format=="PNG" and im.mode=="RGBA" and im.size==(1024,1536)
  assert im.getchannel("A").getextrema()[0]==0
 for slot,size in (("upper_body",(720,960)),("face_icons",(400,400))):
  p=ROOT/"assets/ART_V2"/slot/f"{id}.webp"
  assert p.exists(),(id,slot)
  with Image.open(p) as im:
   assert im.format=="WEBP" and im.mode=="RGBA" and im.size==size
   assert im.getchannel("A").getextrema()[0]==0

class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass

server=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
url=f"http://127.0.0.1:{server.server_port}/index.html"
reports={}
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,width,height in (("portrait",390,844),("landscape",844,390)):
   ctx=browser.new_context(viewport={"width":width,"height":height})
   page=ctx.new_page()
   errors=[]
   page.on("pageerror",lambda e:errors.append(str(e)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof S!=='undefined' && typeof ROMANCE_V0850!=='undefined'",timeout=45000)
   results={}
   for id,name,age in zip(IDS,NAMES,AGES):
    data=page.evaluate("""(id)=>{
      const meet='v0850_meet_'+id, r={};
      S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
      r.key=SaveStore.key;
      r.rates={...RATE};
      r.peopleName=PEOPLE[id]?.name;
      r.profile=HEROINE_PROFILES_ALL[id];
      r.depth=CHARACTER_DEPTH_V0850[id];
      r.flame=HEROINE_PROFILES_ALL[id]?.tomoshibi;
      r.ids=NEW_HERO_IDS_V0850;
      r.personRegistered=HERO_IDS.includes(id)&&NEW_HERO_IDS.includes(id);
      r.noUnit=!UNITS.some(u=>u.person===id);
      r.noNormal=!NORMAL_GACHA_POOL.some(u=>u.person===id);
      r.noSpecial=!NEW19_GACHA_POOL.some(u=>u.person===id);
      r.before={talk:romanceHeroAvailable(id),meeting:storyAllowed(meet)};
      S.quests.q3={complete:true};
      r.atQ3={talk:romanceHeroAvailable(id),meeting:storyAllowed(meet)};
      S.quests.q6={complete:true};
      r.after={talk:romanceHeroAvailable(id),meeting:storyAllowed(meet)};
      r.imgs=[ART_V2.full_body[id],ART_V2.upper_body[id],ART_V2.face_icons[id]];
      r.meetRequires=V0850_MEET_STORIES[meet]?.requires;
      r.bonds=Array.from({length:5},(_,i)=>{
        const story=ROMANCE_V0850[id].stories['bond_'+id+'_'+i];
        return {threshold:story?.threshold,person:story?.person,lines:story?.lines?.length};
      });
      r.topics=ROMANCE_V0850[id].topics.length;
      r.placeChoices=Object.keys(ROMANCE_V0850[id].placeLines).length;
      S.love.activeHero=id;view='talk';render();
      r.screen={
        name:document.querySelector('.v676-talk-nameplate span')?.textContent?.trim()||'',
        episodes:document.querySelectorAll('.v676-episode').length,
        topics:document.querySelectorAll('.romance-topics button').length,
        depth:document.querySelectorAll('.character-depth').length,
        image:document.querySelector('.v676-talk-portrait img')?.getAttribute('src')||''
      };
      r.depthEarly=characterDepthCard(id,0);
      r.depthMiddle=characterDepthCard(id,40);
      r.depthLate=characterDepthCard(id,80);
      setHeroAff(id,20);
      r.bondAvailable=bondAvailable(id,0);
      try {openBondEpisode(id,0);r.bondOpened=storySession?.id==='bond_'+id+'_0';}
      catch(e){r.bondError=String(e)}
      storySession=null;view='talk';
      const gems=S.gems;openStory(meet);
      r.meetOpened=storySession?.id===meet&&view==='story';
      if(r.meetOpened)finishStory();
      r.meetFinished=S.storyFlags?.[meet]===true&&view==='talk';
      r.noMeetingReward=S.gems===gems;
      const saved=fresh();
      saved.owned.momoka_work={lv:5,aff:17,lb:1,copies:2};
      saved.owned.milku_work={lv:3,aff:11,lb:0,copies:1};
      saved.party=['momoka_work','milku_work'];saved.selected='momoka_work';
      saved.homeFavorite='momoka';saved.homeUnitId='momoka_work';
      saved.gems=2345;saved.gold=3214;saved.pulls=15;
      saved.quests.q2={complete:true};saved.storyFlags.legacyQa=true;
      const old=migrateSave(JSON.parse(JSON.stringify(saved)));
      r.oldSave={
        units:JSON.stringify(old.owned.momoka_work)===JSON.stringify(saved.owned.momoka_work)
          &&JSON.stringify(old.owned.milku_work)===JSON.stringify(saved.owned.milku_work),
        party:JSON.stringify(old.party)===JSON.stringify(saved.party),
        selected:old.selected===saved.selected,
        home:old.homeFavorite===saved.homeFavorite&&old.homeUnitId===saved.homeUnitId,
        currency:old.gems===2345&&old.gold===3214&&old.pulls===15,
        progression:old.quests.q2.complete&&old.storyFlags.legacyQa,
        noAutoNew:!Object.keys(old.owned).some(k=>k.startsWith(id))
      };
      r.oldHeroes=HERO_IDS.includes('chiyozaki_suzuha')&&HERO_IDS.includes('sakuraba_renka')&&HERO_IDS.includes('minase_ririka');
      return r;
    }""",id)
    assert data["key"]=="yoiboshi-reboot-v1" and data["rates"]=={"R":60,"SR":25,"SSR":10,"UR":5},(mode,id,data)
    assert data["ids"]==list(IDS) and data["personRegistered"],(mode,id,data)
    assert data["noUnit"] and data["noNormal"] and data["noSpecial"],(mode,id,data)
    assert data["profile"]["name"]==name and data["profile"]["age"]==age and data["peopleName"]==name,(mode,id,data)
    assert data["flame"] and data["depth"] and data["oldHeroes"],(mode,id,data)
    assert data["before"]=={"talk":False,"meeting":False} and data["atQ3"]==data["before"] and data["after"]=={"talk":True,"meeting":True},(mode,id,data)
    assert data["meetRequires"]==["q6"] and data["meetOpened"] and data["meetFinished"] and data["noMeetingReward"],(mode,id,data)
    assert [v["threshold"] for v in data["bonds"]]==[20,40,60,80,100],(mode,id,data)
    assert all(v["person"]==id and v["lines"]>=5 for v in data["bonds"]),(mode,id,data)
    assert data["topics"]==8 and data["placeChoices"]==6,(mode,id,data)
    assert data["screen"]["name"]=="♡ "+name and data["screen"]["episodes"]==5 and data["screen"]["topics"]==8 and data["screen"]["depth"]==1,(mode,id,data)
    assert data["bondAvailable"] and data["bondOpened"],(mode,id,data)
    assert all(data["oldSave"].values()),(mode,id,data)
    assert data["depth"]["habit"] in data["depthEarly"] and data["depth"]["inside"] not in data["depthEarly"],(mode,id,data)
    assert data["depth"]["inside"] in data["depthMiddle"] and data["depth"]["growth"] not in data["depthMiddle"],(mode,id,data)
    assert data["depth"]["growth"] in data["depthLate"],(mode,id,data)
    assert f"/upper_body/{id}.webp" in data["screen"]["image"],(mode,id,data)
    for slot,src in zip(("full_body","upper_body","face_icons"),data["imgs"]):
     assert f"/{slot}/{id}." in src,(mode,id,src)
     res=page.request.get(url.rsplit("/",1)[0]+"/"+src,timeout=20000)
     assert res.status==200 and len(res.body())>1000,(mode,id,slot,res.status)
    page.evaluate("""id=>{S.love.activeHero=id;view='talk';render();}""",id)
    page.screenshot(path=str(OUT/f"{mode}_{id}_talk.png"),full_page=True)
    results[id]=data
   assert not errors,(mode,errors)
   reports[mode]={"status":"PASS","profiles":results,"js_errors":errors}
   ctx.close()
  browser.close()
finally:
 server.shutdown()
(OUT/"stage1_report.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print("REDRAW3 STAGE-1 CHROMIUM QA PASS",json.dumps({k:v["status"] for k,v in reports.items()}),flush=True)
