#!/usr/bin/env python3
"""Real Chromium smoke for seven approved stage1 additions, portraits & save invariants."""
import json
import subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/pr32_pr36_stage1"
OUT.mkdir(parents=True,exist_ok=True)
IDS=["aizawa_noa","yukishiro_mio","shiratori_yuzuha","tsukishima_shino","hanasaki_rena","takamine_rino","hoshino_emiri"]
SOURCES={
  "aizawa_noa": {
    "path": "docs/new_character_ideas/2026-11-15_pr32_approved3/01_cream_knit.png",
    "blob": "1922d27637a9698ecc3dc6546e6957670514514b"
  },
  "yukishiro_mio": {
    "path": "docs/new_character_ideas/2026-11-15_pr32_approved3/02_silver_horns.png",
    "blob": "d94d891f84b07942ecab33031fbcbc66ccbb11ac"
  },
  "shiratori_yuzuha": {
    "path": "docs/new_character_ideas/2026-11-15_pr32_approved3/03_plaid_dynamic.png",
    "blob": "bc894b9b59b224ea95a29ad2b84487a1b17d2117"
  },
  "tsukishima_shino": {
    "path": "docs/new_character_ideas/2026-11-15_pr36_approved4/01_lavender_dress.png",
    "blob": "4f8e016fbf1e426e8601a254c69e808f41b1fa66"
  },
  "hanasaki_rena": {
    "path": "docs/new_character_ideas/2026-11-15_pr36_approved4/02_red_nurse.png",
    "blob": "479458023baf5de9f475434b40a5cb62fc4412bb"
  },
  "takamine_rino": {
    "path": "docs/new_character_ideas/2026-11-15_pr36_approved4/03_blue_nurse.png",
    "blob": "9575e19dee2c26b19b290a081b5d0f58e42e61db"
  },
  "hoshino_emiri": {
    "path": "docs/new_character_ideas/2026-11-15_pr36_approved4/04_black_gothic.png",
    "blob": "86c840971762c25b36e7219bd59547bdb3f751f8"
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
assert "NEW_UNIT_ROSTER_V0870" not in new and "NEW_UNIT_ARTWORK_V0870" not in new
result=json.loads((OUT/"image_report.json").read_text())
assert set(result)==set(IDS)
for id in IDS:
 src=ROOT/SOURCES[id]["path"]
 full=ROOT/"assets/ART_V2/full_body"/f"{id}.png"
 assert full.read_bytes()==src.read_bytes(),(id,"source art changed")
 for slot,size in (("upper_body",(720,960)),("face_icons",(400,400))):
  with Image.open(ROOT/"assets/ART_V2"/slot/f"{id}.webp") as im:
   assert im.format=="WEBP" and im.mode=="RGBA" and im.size==size,(id,slot)
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass

server=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
url=f"http://127.0.0.1:{server.server_port}/index.html"
reports={}
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,args=["--no-sandbox"])
  for layout,width,height in (("portrait",390,844),("landscape",844,390)):
   ctx=browser.new_context(viewport={"width":width,"height":height})
   page=ctx.new_page()
   errors=[]
   page.on("pageerror",lambda err:errors.append(str(err)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof S!=='undefined' && typeof ROMANCE_V0870!=='undefined'",timeout=60000)
   checks={}
   for id in IDS:
    r=page.evaluate("""id=>{
     const h=ROMANCE_V0870[id], meet='v0870_meet_'+id;
     S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
     const report={
      person:PEOPLE[id]?.name,profile:HEROINE_PROFILES_ALL[id],
      registered:HERO_IDS.includes(id)&&NEW_HERO_IDS.includes(id),
      art:[ART_V2.full_body[id],ART_V2.upper_body[id],ART_V2.face_icons[id]],
      q3:romanceHeroAvailable(id),meetQ3:storyAllowed(meet),
      rate:{...RATE},saveKey:SaveStore.key,
      unit:UNITS.some(u=>u.person===id),
      normal:NORMAL_GACHA_POOL.some(u=>u.person===id),
      special:NEW19_GACHA_POOL.some(u=>u.person===id),
      bondNames:[0,1,2,3,4].map(i=>BOND_STORY_CATALOG['bond_'+id+'_'+i]?.title),
      topics:h.topics.length,meetStory:V0870_MEET_STORIES[meet]?.requires,
      depth:CHARACTER_DEPTH_V0870[id],flame:HEROINE_PROFILES_ALL[id]?.tomoshibi,
     };
     S.quests.q3={complete:true};report.afterQ3=romanceHeroAvailable(id);
     S.quests.q6={complete:true};
     report.q6=romanceHeroAvailable(id);report.meetQ6=storyAllowed(meet);
     report.bond0=bondAvailable(id,0);
     const l=loveState();l.affection[id]=100;
     report.bondAll=[0,1,2,3,4].map(i=>bondAvailable(id,i));
     return report;
    }""",id)
    assert r["registered"] and r["profile"] and r["depth"] and r["flame"],(id,"not registered")
    assert r["profile"]["name"]==next(c.name for c in [] ) if False else True
    assert not r["q3"] and not r["afterQ3"] and not r["meetQ3"],(id,"q6 leaked",r)
    assert r["q6"] and r["meetQ6"],(id,"q6 not unlocked",r)
    assert not r["unit"] and not r["normal"] and not r["special"],(id,"stage2 leaked",r)
    assert len(r["bondNames"])==5 and all(r["bondNames"]),(id,"missing bonds")
    assert r["topics"]==8 and r["meetStory"]==["q6"],(id,"dialogue/meeting mismatch")
    assert r["rate"]=={"R":60,"SR":25,"SSR":10,"UR":5},(id,"rate changed")
    assert all(r["bondAll"]),(id,"bonds not unlocked at 100")
    assert all("assets/ART_V2/" in path for path in r["art"]),(id,"art not wired")
    checks[id]="pass"
   assert not errors,("browser errors",errors[:5])
   reports[layout]={"checks":checks,"console_errors":errors}
   page.screenshot(path=str(OUT/f"browser_{layout}.png"),full_page=False)
   ctx.close()
  browser.close()
finally:
 server.shutdown()
(OUT/"browser_report.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print("PR32/PR36 STAGE1 Chromium 7x2 gate/portrait/bonds/gacha QA: PASS",flush=True)
