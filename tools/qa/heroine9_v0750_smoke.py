#!/usr/bin/env python3
"""Ver.0.75.0.0: 9 new SR heroines are hidden until their quest + meeting, then appear everywhere without errors."""
import json
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[2]
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url=f"http://127.0.0.1:{srv.server_port}/index.html"
with sync_playwright() as p:
    b=p.chromium.launch(headless=True,args=["--no-sandbox"])
    out={}
    for label,w,h in [("portrait",390,844),("landscape",844,390)]:
        pg=b.new_context(viewport={"width":w,"height":h}).new_page();errors=[]
        pg.on("pageerror",lambda e:errors.append(str(e)))
        pg.goto(url,wait_until="load",timeout=90000)
        pg.wait_for_function("typeof S!=='undefined'&&typeof NEW_HERO_IDS_V0750!=='undefined'",timeout=45000)
        r=pg.evaluate("""()=>{
          const ids=NEW_HERO_IDS_V0750,res={};
          S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
          res.people=ids.filter(id=>PEOPLE[id]&&PEOPLE[id].name);
          res.units=ids.filter(id=>UNITS.some(u=>u.id===id+'_work'));
          res.hiddenAtStart=ids.filter(id=>!heroV0690Visible(id,S));
          const qs=ids.map(id=>NEW_HERO_REVEAL_V0690[id][1]);
          for(const q of qs)S.quests[q]={complete:true};
          res.beforeMeet=ids.filter(id=>heroV0690Visible(id,S));
          res.queue=hero74PendingQuestIds(S).filter(q=>qs.includes(q));
          view='home';render();res.homeButton=!!document.querySelector('.hero74-home-meetings button');
          openStory('hero74_backlog');res.storyOpen=!!storySession;
          for(const q of qs)S.hero74MeetSeen[q]=true;
          res.afterMeet=ids.filter(id=>heroV0690Visible(id,S));
          res.pool=availableNormalPool(S).filter(u=>ids.includes(u.person)).map(u=>u.id);
          res.profiles=ids.filter(id=>HEROINE_PROFILES_ALL[id]&&HEROINE_PROFILES_ALL[id].tomoshibi);
          res.art=ids.filter(id=>ART_V2.full_body[id]&&ART_V2.upper_body[id]&&ART_V2.face_icons[id]);
          for(const id of ids)S.owned[id+'_work']={lv:1,aff:0,lb:0,copies:1};
          const screens={};
          for(const v of ['home','roster','unit','archive','gacha','talk']){view=v;try{render();screens[v]=!document.querySelector('.runtime-fallback')}catch(e){screens[v]=String(e)}}
          res.screens=screens;
          S.selected='yue_work';view='unit';render();res.unitShowsName=document.querySelector('#app').textContent.includes('篁 ゆえ');
          res.romanceAvail=ids.filter(id=>romanceHeroAvailable(id));
          return res}""")
        r["errors"]=errors;out[label]=r
    b.close()
print(json.dumps(out,ensure_ascii=False,indent=1))
for k,r in out.items():
    n=9
    assert len(r["people"])==n and len(r["units"])==n and len(r["hiddenAtStart"])==n,k
    assert r["beforeMeet"]==[] and len(r["queue"])==n and r["homeButton"] and r["storyOpen"],k
    assert len(r["afterMeet"])==n and len(r["pool"])==n and len(r["profiles"])==n and len(r["art"])==n,k
    assert all(v is True for v in r["screens"].values()),k
    assert r["unitShowsName"] and not r["errors"],k
print("OK")
