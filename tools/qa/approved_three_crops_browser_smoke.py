#!/usr/bin/env python3
"""Chromium image loading and actual conversation rendering for three approved crops."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
import json
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts"/"approved_three_crops"
OUT.mkdir(parents=True,exist_ok=True)
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
server=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
ids=["sakakibara_kaho","minase_ririka","tokiwa_aone"]
results={}
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,w,h in [("portrait",390,844),("landscape",844,390)]:
   ctx=browser.new_context(viewport={"width":w,"height":h})
   page=ctx.new_page()
   errors=[]
   page.on("pageerror",lambda e:errors.append(str(e)))
   page.goto(f"http://127.0.0.1:{server.server_port}/index.html",wait_until="load",timeout=90000)
   page.wait_for_function("typeof S !== 'undefined' && typeof ART_V2 !== 'undefined'")
   results[mode]={}
   for id in ids:
    result=page.evaluate("""async (id)=>{
      S=fresh();
      S.gameStarted=true;
      if(S.onboarding)S.onboarding.enabled=false;
      S.quests.q3={complete:true};
      S.quests.q6={complete:true};
      S.love.activeHero=id;
      view='talk';
      render();
      const src=[characterArt(id),characterPortrait(id),characterIcon(id)];
      const loaded=await Promise.all(src.map(url=>new Promise(resolve=>{
        const img=new Image();
        img.onload=()=>resolve({ok:true,w:img.naturalWidth,h:img.naturalHeight,src:url});
        img.onerror=()=>resolve({ok:false,src:url});
        img.src=url;
      })));
      return {id,name:PEOPLE[id]?.name,available:romanceHeroAvailable(id),
        src,loaded,
        talkSrc:document.querySelector('.v676-talk-portrait img')?.getAttribute('src'),
        nameplate:document.querySelector('.v676-talk-nameplate span')?.textContent?.trim(),
        renderedCount:document.querySelectorAll('.v676-talk-portrait img').length,
        viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
        rate:RATE,key:SaveStore.key};
    }""",id)
    assert result["available"],(mode,id,result)
    assert result["renderedCount"]==1,(mode,id,result)
    assert all(img["ok"] for img in result["loaded"]),(mode,id,result)
    assert [(i["w"],i["h"]) for i in result["loaded"]]==[(1024,1536),(768,1024),(400,400)],(mode,id,result)
    assert result["talkSrc"].split("?")[0]==f"assets/ART_V2/upper_body/{id}.webp",(mode,id,result)
    assert result["src"][2].split("?")[0]==f"assets/ART_V2/face_icons/{id}.webp",(mode,id,result)
    assert result["name"] in result["nameplate"],(mode,id,result)
    assert result["key"]=="yoiboshi-reboot-v1" and result["rate"]=={"R":60,"SR":25,"SSR":10,"UR":5}
    assert result["scrollWidth"]<=w+2,(mode,id,result)
    results[mode][id]=result
    page.screenshot(path=str(OUT/f"{id}_{mode}.png"),full_page=True)
   assert not errors,(mode,errors)
   ctx.close()
  browser.close()
finally:
 server.shutdown()
(OUT/"browser.json").write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding="utf-8")
print("APPROVED THREE CROPS CHROMIUM PASS",json.dumps({m:{id:{"name":d["name"],"loaded":d["loaded"],"talkSrc":d["talkSrc"]} for id,d in rs.items()} for m,rs in results.items()},ensure_ascii=False),flush=True)
