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
           const ids=Object.keys(CHARACTER_DEPTH_V1),expected=[...new Set(HERO_IDS.filter(id=>!NEW_HERO_IDS_V0690.includes(id)&&!NEW_HERO_IDS_V0692.includes(id)&&!(typeof NEW_HERO_IDS_V0750!=='undefined'&&NEW_HERO_IDS_V0750.includes(id))&&!(typeof NEW_HERO_IDS_V0760!=='undefined'&&NEW_HERO_IDS_V0760.includes(id))&&!(typeof NEW_HERO_IDS_V0780!=='undefined'&&NEW_HERO_IDS_V0780.includes(id))&&!(typeof NEW_HERO_IDS_V0810!=='undefined'&&NEW_HERO_IDS_V0810.includes(id))&&!(typeof NEW_HERO_IDS_V0830!=='undefined'&&NEW_HERO_IDS_V0830.includes(id))&&!(typeof NEW_HERO_IDS_V0840!=='undefined'&&NEW_HERO_IDS_V0840.includes(id))&&!(typeof NEW_HERO_IDS_V0850!=='undefined'&&NEW_HERO_IDS_V0850.includes(id))&&!(typeof NEW_HERO_IDS_V0860!=='undefined'&&NEW_HERO_IDS_V0860.includes(id))&&!(typeof NEW_HERO_IDS_V0870!=='undefined'&&NEW_HERO_IDS_V0870.includes(id))&&!(typeof NEW_HERO_IDS_V0880!=='undefined'&&NEW_HERO_IDS_V0880.includes(id))&&!(typeof NEW_HERO_IDS_V0890!=='undefined'&&NEW_HERO_IDS_V0890.includes(id))&&!(typeof NEW_HERO_IDS_V0900!=='undefined'&&NEW_HERO_IDS_V0900.includes(id))&&!(typeof NEW_HERO_IDS_V0910!=='undefined'&&NEW_HERO_IDS_V0910.includes(id))&&!(typeof NEW_HERO_IDS_V0920!=='undefined'&&NEW_HERO_IDS_V0920.includes(id))&&!(typeof NEW_HERO_IDS_V0930!=='undefined'&&NEW_HERO_IDS_V0930.includes(id))))];
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
           const latest=NEW_HERO_IDS_V0840.map(id=>({id,record:CHARACTER_DEPTH_V0840[id],early:characterDepthCard(id,0),mid:characterDepthCard(id,40),high:characterDepthCard(id,80)}));
           return {count:ids.length,expected:expected.length,missing:expected.filter(x=>!ids.includes(x)),
             extras:ids.filter(x=>!expected.includes(x)),errors,
             latest, newest:NEW_HERO_IDS_V0850.map(id=>({id, record:CHARACTER_DEPTH_V0850[id], early:characterDepthCard(id,0), mid:characterDepthCard(id,40), high:characterDepthCard(id,80)})),pr59:NEW_HERO_IDS_V0860.map(id=>({id, record:CHARACTER_DEPTH_V0860[id], early:characterDepthCard(id,0), mid:characterDepthCard(id,40), high:characterDepthCard(id,80)})),unregistered:characterDepthCard("fake_test_id",100)};
        }""")
        check("79 distinct character records",d["count"]==79,d)
        check("all live game heroine IDs covered",d["expected"]==79 and not d["missing"] and not d["extras"],d)
        check("all records complete, no spoilers, correct affinity gates",not d["errors"],d["errors"])
        check("new two have separate complete character-depth cards",len(d["latest"])==2 and
              all(v["record"] and all(k in v["record"] for k in ("habit","inside","growth","cg"))
                  and v["record"]["habit"] in v["early"] and v["record"]["inside"] not in v["early"]
                  and v["record"]["inside"] in v["mid"] and v["record"]["growth"] not in v["mid"]
                  and v["record"]["growth"] in v["high"] for v in d["latest"]),d["latest"])
        check("new three have independent character-depth cards and gated lore",
              len(d["newest"])==3 and all(v["record"] and
                 all(k in v["record"] for k in ("habit","inside","growth","cg")) and
                 v["record"]["habit"] in v["early"] and
                 v["record"]["inside"] not in v["early"] and
                 v["record"]["inside"] in v["mid"] and
                 v["record"]["growth"] not in v["mid"] and
                 v["record"]["growth"] in v["high"] for v in d["newest"]),d["newest"])
        check("PR59 four independent character-depth cards have correct affinity gates",
              len(d["pr59"])==4 and all(v["record"] and
                 all(k in v["record"] for k in ("habit","inside","growth","cg")) and
                 v["record"]["habit"] in v["early"] and
                 v["record"]["inside"] not in v["early"] and
                 v["record"]["inside"] in v["mid"] and
                 v["record"]["growth"] not in v["mid"] and
                 v["record"]["growth"] in v["high"] for v in d["pr59"]),d["pr59"])
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
