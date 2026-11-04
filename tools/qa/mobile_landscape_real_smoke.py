"""Live-code Chromium smoke test of mobile portrait/landscape game UI.
Serves the actual repository over HTTP, not a mock HTML fixture.
Uses an isolated fresh test save. Physical iPhone Safari remains untested.
"""
import json
import re
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
        ck("version title", bool(re.search(r"RE:START Ver\.\d+\.\d+\.\d+\.\d+",page.title())),page.title())
        ck("actual landscape stylesheet loaded",page.evaluate("""()=>
          [...document.styleSheets].some(s=>(s.href||"").includes("mobile_landscape_v03560_patch.css"))"""))
        page.evaluate("""()=>{
          S=fresh();S.gameStarted=true;S.onboarding.enabled=false;S.questGuideSeen=true;
          view="home";storySession=null;dialog=null;battle=null;render();
        }""")
        page.wait_for_selector(".home-mock-v301 .mock-hero")
        # Real served assets, not mock data: validate the newly adopted Makoto artwork.
        portrait=page.evaluate("""async()=>{
          const id='concept15',faces=['normal','smile','pout','sad','surprise','blush'];
          const full=characterArt(id),upper=characterPortrait(id),icon=characterIcon(id);
          const dialogue=faces.map(face=>{
            const markup=expressionPortraitMarkup(id,face,'qa_makoto');
            const holder=document.createElement('div');holder.innerHTML=markup;
            return {face,src:holder.querySelector('img')?.getAttribute('src'),
              fallback:holder.firstElementChild?.dataset.expressionSource==='fallback',
              emotionOverlay:face==='normal'||!!holder.querySelector('.expr-fallback-wrap')};
          });
          const loaded=await Promise.all([full,upper,icon].map(async src=>{
            const img=new Image();img.src=src;
            try{await img.decode();}catch(e){return {src,loaded:false,error:String(e)};}
            const canvas=document.createElement('canvas');canvas.width=1;canvas.height=1;
            const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);
            const alpha=ctx.getImageData(0,0,1,1).data[3];
            return {src,loaded:true,width:img.naturalWidth,height:img.naturalHeight,cornerAlpha:alpha};
          }));
          return {full,upper,icon,dialogue,loaded};
        }""")
        records.append(dict(makoto_portrait=portrait))
        ck("Makoto original approved full body selected","style_candidates/makoto_v1_full.webp" in portrait["full"],portrait["full"])
        ck("Makoto approved upper body selected","style_candidates/makoto_v1_upper.webp" in portrait["upper"],portrait["upper"])
        ck("Makoto portrait icon uses matching upper image",portrait["icon"]==portrait["upper"],portrait["icon"])
        ck("Makoto all six dialogue moods use the same approved portrait",
           all(d["src"]==portrait["upper"] for d in portrait["dialogue"]),portrait["dialogue"])
        ck("Makoto old expression artwork suppressed",
           all(d["fallback"] and d["emotionOverlay"] for d in portrait["dialogue"]),portrait["dialogue"])
        ck("Makoto images load with transparent edges",
           all(x["loaded"] and x["width"]>100 and x["height"]>100 and x["cornerAlpha"]==0 for x in portrait["loaded"]),
           portrait["loaded"])
        page.evaluate("""()=>{
          // Synthetic QA-only progression: Makoto must be recruited/unlocked to appear in home.
          S.owned[R2SR('makoto_daily')]={lv:1,aff:0,lb:0,copies:0};
          S.chapter4Met=S.chapter4Met||{};S.chapter4Met.concept15=true;
          S.homeFavorite='concept15';S.homeUnitId=R2SR('makoto_daily');
          lobbySelected='concept15';view='home';render();
        }""")
        page.locator(".home-mock-v301 .mock-hero .mock-character").wait_for(timeout=10000)
        home_image=page.locator(".home-mock-v301 .mock-hero .mock-character").evaluate(
            "(el)=>({src:el.getAttribute('src'),width:el.naturalWidth,height:el.naturalHeight})")
        records.append(dict(makoto_home=home_image))
        ck("Makoto renders on actual home screen",
           ("makoto_v1_full.webp" in home_image["src"] or "makoto_v1_upper.webp" in home_image["src"]) and home_image["width"]>0,home_image)
        page.screenshot(path=str(OUT/"makoto_home_390x844.png"),full_page=True)
        # Genuine daily-life conversation on an owned Makoto, rather than the default core heroine.
        page.evaluate("""()=>{S.selected=R2SR('makoto_daily');S.love.activeHero='momoka';view='talk';render()}""")
        target='.v676-talk-portrait.expression-stage .expr-character-layer[data-person-id="concept15"]'
        page.locator(target+' img').wait_for(timeout=15000)
        stage_before=page.locator(target).evaluate("""el=>({
          face:el.dataset.expression,src:el.querySelector('img')?.getAttribute('src'),
          anim:getComputedStyle(el.querySelector('img')).animationName
        })""")
        ck("Makoto actual daily-life scene loads the accepted portrait",
           "makoto_v1_upper.webp" in stage_before["src"],stage_before)
        ck("Makoto actual daily-life scene starts neutral",stage_before["face"]=="normal",stage_before)
        ck("Makoto idle animation is character-specific",stage_before["anim"]=="ya-actor-concept15",stage_before)
        page.screenshot(path=str(OUT/"makoto_daily_real_390x844.png"),full_page=True)
        page.locator('.v676-talk-main .v676-chat-button').click(timeout=10000)
        stage_after=page.locator(target).evaluate("""el=>({
          face:el.dataset.expression,src:el.querySelector('img')?.getAttribute('src'),
          anim:getComputedStyle(el.querySelector('img')).animationName
        })""")
        ck("Makoto chat reacts with smile but never swaps character art",
           stage_after["face"]=="smile" and stage_after["src"]==stage_before["src"],stage_after)
        ck("Makoto smile plays expression motion",stage_after["anim"]=="ya-actor-smile",stage_after)
        page.screenshot(path=str(OUT/"makoto_daily_reaction_390x844.png"),full_page=True)
        # Five actors must have distinctly authored timing/motion, not identical shaking.
        pilot=page.evaluate("""()=>['momoka','milku','reina','nagi','concept15'].map(id=>{
          const stage=document.createElement('div');
          stage.className='acting-demo-stage';stage.style.cssText='position:fixed;top:-10000px;width:230px;height:300px';
          stage.innerHTML=expressionPortraitMarkup(id,'normal','pilot-test:'+id,{wrapperClass:'expr-character-layer'});
          document.body.appendChild(stage);
          const box=stage.querySelector('.expr-character-layer');
          const img=box.querySelector('img');
          const item={id,animation:getComputedStyle(img).animationName,
            duration:getComputedStyle(img).animationDuration};
          stage.remove();return item;
        })""")
        records.append(dict(character_acting_pilot=pilot))
        ck("Five cast have unique actor animations",
           len({entry["animation"] for entry in pilot})==5,pilot)
        page.emulate_media(reduced_motion="reduce")
        reduced=page.locator(target+' img').evaluate('el=>getComputedStyle(el).animationName')
        ck("Reduced motion disables cast acting",reduced=="none",reduced)
        page.emulate_media(reduced_motion="no-preference")
        page.evaluate("""()=>{S.selected='momoka_work';S.love.activeHero='momoka';view='home';render()}""")
        page.evaluate("""()=>{lobbySelected='momoka';view='home';render()}""")
        before=page.evaluate("""()=>[S.gems,S.gold,S.party.join(","),!!S.quests.q1?.complete]""")
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
                ck(f"{w}x{h} quest touch target at least 44px",q["actionHeight"]>=43.5,q)
                if w<=1024:
                    ck(f"{w}x{h} quest action visible above nav",q["actionBottom"]<=q["navTop"]+2,q)
                page.screenshot(path=str(OUT/f"quest_{w}x{h}.png"),full_page=True)
                page.locator(".qmap-close").click(timeout=10000)
                page.locator('.bottomnav button[aria-label="ホーム"]').click(timeout=10000)
                ck(f"{w}x{h} real navigation back to home",page.evaluate('view==="home"'))
        after=page.evaluate("""()=>[S.gems,S.gold,S.party.join(","),!!S.quests.q1?.complete]""")
        ck("navigation preserves player state",before==after,dict(before=before,after=after))
        ck("no uncaught JS exceptions",not errors,errors)
        browser.close()
finally:
    srv.shutdown()
    (OUT/"results.json").write_text(json.dumps(dict(checks=checks,records=records,errors=errors),ensure_ascii=False,indent=2),encoding="utf-8")
print(f"PASS: {len(checks)} checks across {len(SIZES)} viewports")
