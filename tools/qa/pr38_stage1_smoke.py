#!/usr/bin/env python3
"""Real Chromium smoke for eight approved stage1 additions, portraits & save invariants."""
import json
import subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/pr38_stage1"
OUT.mkdir(parents=True,exist_ok=True)
IDS=["morinaga_akari","kurosaki_kaede","komatsu_hinata","kitahara_shiho","otsuki_tsubasa","mizuhara_mayu","takasaka_tomoe","nishimura_ako"]
SOURCES={
  "morinaga_akari": {
    "path": "docs/new_character_ideas/2026-11-15_pr38_approved8/01_mint_black_idol.png",
    "blob": "5e8902bec7f0cc2d866b7a4c451b6b43a2f70714"
  },
  "kurosaki_kaede": {
    "path": "docs/new_character_ideas/2026-11-15_pr38_approved8/02_white_shirt_suspenders.png",
    "blob": "e2488fa8803fc1770452f0e80140802b65787c27"
  },
  "komatsu_hinata": {
    "path": "docs/new_character_ideas/2026-11-15_pr38_approved8/03_short_bob_mustard.png",
    "blob": "53c840acbaf6cb610a3e28d7aa22a67f03cc55ee"
  },
  "kitahara_shiho": {
    "path": "docs/new_character_ideas/2026-11-15_pr38_approved8/04_navy_business_suit.png",
    "blob": "5f7c758c7abc1ee51c828949931c62606e2af907"
  },
  "otsuki_tsubasa": {
    "path": "docs/new_character_ideas/2026-11-15_pr38_approved8/05_light_blue_workwear.png",
    "blob": "63c30cf8ad54cbbd50c72c0f710da8dfc32249ca"
  },
  "mizuhara_mayu": {
    "path": "docs/new_character_ideas/2026-11-15_pr38_approved8/06_caramel_knit.png",
    "blob": "92a78a4695c2cb830c805d48f0b6017fd962bfaf"
  },
  "takasaka_tomoe": {
    "path": "docs/new_character_ideas/2026-11-15_pr38_approved8/07_black_knit_plaid.png",
    "blob": "a2a6b1c2374efa3b21148fc47b19d45d1eedadea"
  },
  "nishimura_ako": {
    "path": "docs/new_character_ideas/2026-11-15_pr38_approved8/08_mustard_plaid_street.png",
    "blob": "d73588c1fc99a670ec36005368a1c95365e919d0"
  }
}

old=subprocess.check_output(["git","show","origin/main:js/game.js"],cwd=ROOT,text=True)
new=(ROOT/"js/game.js").read_text()
# Protected definitions and existing battle, gacha and persistence constants must remain identical.
for token in ("const KEY=","const ROLES=","const UNITS=[","UNITS.push(","const RATE=",
              "const NEW19_RATE=","const GACHA_CONFIG=","const NORMAL_GACHA_POOL=",
              "const NEW19_GACHA_POOL=","function migrateSave(","function drawNormalGachaUnit(",
              "function unitPower("):
 a,b=old.index(token),new.index(token)
 end="\n];" if token=="const UNITS=[" else "\n"
 assert old[a:old.index(end,a)+len(end)]==new[b:new.index(end,b)+len(end)],("protected code changed",token)
assert "NEW_UNIT_ROSTER_V0880" not in new and "NEW_UNIT_ARTWORK_V0880" not in new
result=json.loads((OUT/"image_report.json").read_text())
assert set(result)==set(IDS)
for id in IDS:
 src=ROOT/SOURCES[id]["path"]
 full=ROOT/"assets/ART_V2/full_body"/f"{id}.png"
 assert result[id]["status"] in ("清掃した","原本のまま"),(id,"invalid halo audit status")
 assert result[id]["source_git_blob"]==SOURCES[id]["blob"],(id,"source Git blob not audited")
 assert result[id]["opaque_and_near_opaque_unchanged"],(id,"opaque preservation missing")
 assert subprocess.check_output(["git","hash-object",str(src)],cwd=ROOT,text=True).strip()==SOURCES[id]["blob"],(id,"original changed")
 if result[id]["status"]=="原本のまま":
  assert full.read_bytes()==src.read_bytes(),(id,"reported original does not match")
 else:
  assert result[id]["removed_pixels"]>0 and full.read_bytes()!=src.read_bytes(),(id,"cleaning was not performed")
 assert __import__("hashlib").sha256(full.read_bytes()).hexdigest()==result[id]["placed_sha256"],(id,"cleaned destination hash mismatch")
 for slot,size in (("upper_body",(720,960)),("face_icons",(400,400))):
  with Image.open(ROOT/"assets/ART_V2"/slot/f"{id}.webp") as im:
   assert im.format=="WEBP" and im.mode=="RGBA" and im.size==size,(id,slot)
NAMES=["森永 明里","黒崎 楓","小松 陽菜","北原 志保","大槻 翼","水原 麻友","高坂 巴","西村 亜子"]
AGES=[20,26,21,29,24,27,22,23]

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
   page.wait_for_function("typeof S!=='undefined' && typeof ROMANCE_V0880!=='undefined'",timeout=45000)
   results={}
   for id,name,age in zip(IDS,NAMES,AGES):
    data=page.evaluate("""(id)=>{
      const meet='v0880_meet_'+id, r={};
      S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
      r.key=SaveStore.key;
      r.rates={...RATE};
      r.peopleName=PEOPLE[id]?.name;
      r.profile=HEROINE_PROFILES_ALL[id];
      r.depth=CHARACTER_DEPTH_V0880[id];
      r.flame=HEROINE_PROFILES_ALL[id]?.tomoshibi;
      r.ids=NEW_HERO_IDS_V0880;
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
      r.meetRequires=V0880_MEET_STORIES[meet]?.requires;
      r.bonds=Array.from({length:5},(_,i)=>{
        const story=ROMANCE_V0880[id].stories['bond_'+id+'_'+i];
        return {threshold:story?.threshold,person:story?.person,lines:story?.lines?.length};
      });
      r.topics=ROMANCE_V0880[id].topics.length;
      r.placeChoices=Object.keys(ROMANCE_V0880[id].placeLines).length;
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
    page.evaluate("""src=>{
       document.getElementById('pr38-qa-mattes')?.remove();
       const wrap=document.createElement('section');wrap.id='pr38-qa-mattes';
       wrap.style.cssText='position:fixed;inset:0;z-index:999999;display:flex;gap:0;pointer-events:none;';
       for(const bg of ['#f3f3f3','#1d202c']){
         const cell=document.createElement('div');cell.style.cssText='height:100%;width:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:'+bg+';';
         const im=document.createElement('img');im.src=src;im.style.cssText='max-width:100%;max-height:100%;object-fit:contain;';
         cell.appendChild(im);wrap.appendChild(cell);
       }
       document.body.appendChild(wrap);
    }""",data["imgs"][0])
    page.screenshot(path=str(OUT/f"{mode}_{id}_light_dark_browser.png"))
    page.evaluate("""()=>document.getElementById('pr38-qa-mattes')?.remove()""")
    results[id]=data
   assert not errors,(mode,errors)
   reports[mode]={"status":"PASS","profiles":results,"js_errors":errors}
   ctx.close()
  browser.close()
finally:
 server.shutdown()
(OUT/"browser_report.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print("PR38 STAGE-1 CHROMIUM QA PASS",json.dumps({k:v["status"] for k,v in reports.items()}),flush=True)
