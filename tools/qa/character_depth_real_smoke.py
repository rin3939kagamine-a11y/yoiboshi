"""Browser QA for the legacy 79 character-depth cards; 74 new heroines have separate QA.
No gameplay progression or persistent saves are changed.
"""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts"/"character_depth"
OUT.mkdir(parents=True,exist_ok=True)
checks=[]; errors=[]; screens=[]
def check(name,condition,details=None):
    checks.append({"name":name,"pass":bool(condition)})
    if not condition: raise AssertionError(f"{name}: {details}")
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
try:
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
        page=browser.new_page(viewport={"width":390,"height":844})
        page.on("pageerror",lambda err:errors.append(str(err)))
        page.goto(f"http://127.0.0.1:{srv.server_port}/index.html",wait_until="load",timeout=120000)
        page.wait_for_function("typeof characterDepthCard==='function' && typeof HERO_IDS!=='undefined' && typeof fresh==='function'")
        d=page.evaluate("""()=>{
           const ids=Object.keys(CHARACTER_DEPTH_V1),expected=[...new Set(HERO_IDS.filter(id=>!NEW_HERO_IDS_V0690.includes(id)&&!NEW_HERO_IDS_V0692.includes(id)))];
           const errors=[];
           for(const id of ids){
             const v=CHARACTER_DEPTH_V1[id];
             if(!v.habit||!v.inside||!v.growth||!v.cg)errors.push(id+": missing field");
             const low=characterDepthCard(id,0);
             const low39=characterDepthCard(id,39);
             const mid=characterDepthCard(id,40);
             const mid79=characterDepthCard(id,79);
             const high=characterDepthCard(id,80);
             if(!low.includes(v.habit)||low.includes(v.inside)||low.includes(v.growth))errors.push(id+": early leak");
             if(low39.includes(v.inside))errors.push(id+": level39 leak");
             if(!mid.includes(v.inside)||mid.includes(v.growth))errors.push(id+": level40 gate");
             if(mid79.includes(v.growth))errors.push(id+": level79 leak");
             if(!high.includes(v.inside)||!high.includes(v.growth))errors.push(id+": level80 gate");
             if(high.includes(v.cg))errors.push(id+": CG concept leak");
           }
           return {count:ids.length,expected:expected.length,missing:expected.filter(x=>!ids.includes(x)),
             extras:ids.filter(x=>!expected.includes(x)),errors,
             unregistered:characterDepthCard("fake_test_id",100)};
        }""")
        check("79 distinct character records",d["count"]==79,d)
        check("all live game heroine IDs covered",d["expected"]==79 and not d["missing"] and not d["extras"],d)
        check("all records complete, no spoilers, correct affinity gates",not d["errors"],d["errors"])
        check("unknown character returns no panel",d["unregistered"]=="",d["unregistered"])
        for w,h in [(390,844),(568,320),(844,390),(926,428),(1280,800)]:
            page.set_viewport_size({"width":w,"height":h})
            state=page.evaluate("""()=>{
              S=fresh();S.gameStarted=true;S.onboarding.enabled=false;
              S.love.activeHero="momoka";view="talk";dialog=null;render();
              const card=document.querySelector(".character-depth");
              if(!card)return {present:false,available:romanceHeroAvailable("momoka"),view};
              const bounds=card.getBoundingClientRect(),aside=card.closest("aside"),style=getComputedStyle(card);
              return {present:true,view,insideAside:!!aside,tabCount:document.querySelectorAll(".bottomnav button").length,
                 docWidth:document.documentElement.scrollWidth,viewport:innerWidth,
                 cardWidth:bounds.width,cardLeft:bounds.left,display:style.display,
                 title:card.querySelector("h3")?.textContent};
            }""")
            check(f"{w}x{h} character card in real romance page",state["present"],state)
            check(f"{w}x{h} card placed within existing sidebar",state["insideAside"],state)
            check(f"{w}x{h} card inside viewport width",state["docWidth"]<=w+2 and state["cardWidth"]<=w+2,state)
            check(f"{w}x{h} seven navigation actions retained",state["tabCount"]==7,state)
            page.screenshot(path=str(OUT/f"romance_{w}x{h}.png"),full_page=True)
            screens.append(f"{w}x{h}")
        check("no unexpected browser JavaScript exceptions",not errors,errors)
        browser.close()
finally:
    srv.shutdown()
    (OUT/"results.json").write_text(json.dumps({"checks":checks,"errors":errors,"screens":screens},ensure_ascii=False,indent=2),encoding="utf-8")
print(f"PASS: {len(checks)} browser assertions; 79 characters x five affinity gates; {len(screens)} screen sizes")
