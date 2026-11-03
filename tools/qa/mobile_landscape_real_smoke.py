"""Live-code Chromium smoke test of mobile portrait/landscape game UI.
Serves the actual repository over HTTP, not a mock HTML fixture.
Uses an isolated fresh test save. Physical iPhone Safari remains untested.
"""
import json
from pathlib import Path
from functools import partial
from threading import Thread
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts"/"mobile_landscape"
OUT.mkdir(parents=True,exist_ok=True)
SIZES=[(390,844),(568,320),(667,375),(844,390),(874,402),(926,428),(956,440),(1024,500),(1280,800)]
checks=[]; records=[]; errors=[]
def ck(label, condition, value=None):
    checks.append(dict(name=label,passed=bool(condition),value=value))
    if not condition:
        raise AssertionError(f"{label}: {value}")

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass

srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
try:
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
        page=browser.new_page(viewport={"width":390,"height":844})
        page.on("pageerror",lambda e:errors.append(str(e)))
        page.goto(f"http://127.0.0.1:{srv.server_port}/index.html",wait_until="load",timeout=120000)
        page.wait_for_function('typeof render==="function" && typeof fresh==="function"',timeout=30000)
        ck("version title", "Ver.0.35.6.0" in page.title(),page.title())
        ck("actual landscape stylesheet loaded",page.evaluate("""()=>
          [...document.styleSheets].some(s=>(s.href||"").includes("mobile_landscape_v03560_patch.css"))"""))
        page.evaluate("""()=>{
          S=fresh();S.gameStarted=true;S.onboarding.enabled=false;S.questGuideSeen=true;
          view="home";storySession=null;dialog=null;battle=null;render();
        }""")
        page.wait_for_selector(".home-mock-v301 .mock-hero")
        before=page.evaluate("""()=>[S.gems,S.gold,S.party.join(","),!!S.quests.q1.complete]""")
        for w,h in SIZES:
            page.set_viewport_size({"width":w,"height":h})
            page.evaluate("""()=>{view="home";dialog=null;render()}""")
            m=page.evaluate("""()=>{
              const b=(el)=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom}};
              const nav=document.querySelector(".bottomnav");
              return {docWidth:document.documentElement.scrollWidth,nav:b(nav),
                navDisplay:getComputedStyle(nav).display,
                tabs:[...nav.querySelectorAll("button")].map(b),
                sidebar:getComputedStyle(document.querySelector(".sidebar")).display,
                favorite:b(document.querySelector(".mock-switch-button")),
                banner:b(document.querySelector(".mock-feature-card")),
                hero:b(document.querySelector(".mock-hero"))};
            }""")
            records.append(dict(viewport=f"{w}x{h}",home=m))
            ck(f"{w}x{h} no horizontal overflow",m["docWidth"]<=w+2,m["docWidth"])
            ck(f"{w}x{h} seven actual navigation tabs",len(m["tabs"])==7,len(m["tabs"]))
            compact=(w>=568 and w<=1024 and h<=500 and w>h)
            if compact or w<=850:
                ck(f"{w}x{h} nav displayed",m["navDisplay"]!="none",m["navDisplay"])
                ck(f"{w}x{h} nav one row",max(t["y"] for t in m["tabs"])-min(t["y"] for t in m["tabs"])<2)
                ck(f"{w}x{h} nav touch targets",min(t["h"] for t in m["tabs"])>=43.5,m["tabs"])
                ck(f"{w}x{h} nav inside viewport",m["nav"]["bottom"]<=h+2 and m["nav"]["y"]>=0,m["nav"])
            if compact:
                ck(f"{w}x{h} desktop sidebar hidden",m["sidebar"]=="none",m["sidebar"])
                a,b=m["favorite"],m["banner"]
                collision=min(a["right"],b["right"])>max(a["x"],b["x"]) and min(a["bottom"],b["bottom"])>max(a["y"],b["y"])
                ck(f"{w}x{h} favorite and banner do not overlap",not collision,dict(favorite=a,banner=b))
            if w in (390,568,844,926):
                page.screenshot(path=str(OUT/f"home_{w}x{h}.png"),full_page=True)
            if w in (390,568,844,926,1024):
                page.locator('.bottomnav button[aria-label="クエスト"]').click(timeout=10000)
                ck(f"{w}x{h} real navigation to quest map",page.evaluate('view==="city"'))
                page.evaluate("""()=>openQuestSheet("q1")""")
                page.wait_for_selector(".qmap-sheet .qmap-main-action")
                q=page.evaluate("""()=>{
                  const b=el=>el.getBoundingClientRect();
                  const n=b(document.querySelector(".bottomnav"));
                  const s=b(document.querySelector(".qmap-sheet"));
                  const a=b(document.querySelector(".qmap-main-action"));
                  return {navTop:n.top,sheetBottom:s.bottom,actionBottom:a.bottom,
                    actionHeight:a.height,sheetHeight:s.height};
                }""")
                records[-1]["quest"]=q
                ck(f"{w}x{h} quest sheet renders",q["sheetHeight"]>50,q)
                if w<=1024:
                    ck(f"{w}x{h} quest action visible above nav",q["actionBottom"]<=q["navTop"]+2,q)
                page.screenshot(path=str(OUT/f"quest_{w}x{h}.png"),full_page=True)
                page.locator(".qmap-close").click(timeout=10000)
                page.locator('.bottomnav button[aria-label="ホーム"]').click(timeout=10000)
                ck(f"{w}x{h} real navigation back to home",page.evaluate('view==="home"'))
        after=page.evaluate("""()=>[S.gems,S.gold,S.party.join(","),!!S.quests.q1.complete]""")
        ck("navigation preserves player state",before==after,dict(before=before,after=after))
        ck("no uncaught JS exceptions",not errors,errors)
        browser.close()
finally:
    srv.shutdown()
    (OUT/"results.json").write_text(json.dumps(dict(checks=checks,records=records,errors=errors),ensure_ascii=False,indent=2),encoding="utf-8")
print(f"PASS: {len(checks)} checks across {len(SIZES)} viewports")
