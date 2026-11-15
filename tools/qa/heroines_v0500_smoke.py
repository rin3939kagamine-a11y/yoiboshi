"""Real-game smoke checks for 19 additive heroines on top of the 60 existing heroines.
No game saves are persisted or altered; browser ephemeral environment only.
"""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright
import json

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts"/"new19_v0500"
OUT.mkdir(parents=True,exist_ok=True)
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
try:
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
        page=browser.new_page(viewport={"width":390,"height":844})
        errors=[]
        page.on("pageerror",lambda err:errors.append(str(err)))
        page.goto(f"http://127.0.0.1:{srv.server_port}/index.html",wait_until="load",timeout=120000)
        page.wait_for_function("typeof NEW_HERO_IDS_V0500!=='undefined' && typeof ROMANCE_V0500!=='undefined' && typeof HERO_IDS!=='undefined' && typeof UNIT_DESIGN!=='undefined'",timeout=30000)
        result=page.evaluate("""()=> {
          const errors=[],ids=NEW_HERO_IDS_V0500,oldCount=HERO_IDS.length-ids.length;
          const unique=[...new Set(HERO_IDS)];
          // The first 79 heroines are fixed (original 60 plus this cohort of 19).
          // Later cohorts each have a stable registry; do not freeze the total at v0692.
          const additions=[NEW_HERO_IDS_V0690,NEW_HERO_IDS_V0692,NEW_HERO_IDS_V0750,
            NEW_HERO_IDS_V0760,NEW_HERO_IDS_V0780,NEW_HERO_IDS_V0810,NEW_HERO_IDS_V0830,NEW_HERO_IDS_V0840,NEW_HERO_IDS_V0850,NEW_HERO_IDS_V0860,NEW_HERO_IDS_V0870,NEW_HERO_IDS_V0880];
          const expected=79+additions.reduce((n,cohort)=>n+cohort.length,0);
          if(ids.length!==19||oldCount!==expected-19||HERO_IDS.length!==expected||unique.length!==expected)errors.push('IDs count or duplicate');
          if(Object.keys(CHARACTER_DEPTH_V1).length!==79)errors.push('depth count');
          if(Object.keys(ROMANCE_V0500).length!==19)errors.push('romance count');
          const originalSet=new Set(NORMAL_GACHA_POOL.map(u=>u.person));
          if(ids.some(id=>originalSet.has(id)))errors.push('existing normal gacha pool contaminated');
          for(const id of ids){
            const a=ROMANCE_V0500[id]; const p=a?.profile;
            if(!p||!p.name||p.age<20||a.topics?.length!==8||Object.keys(a.stories||{}).length!==5)errors.push(id+': incomplete story/character data');
            const all=UNITS.filter(u=>u.person===id);
            if(all.length!==3||all.map(u=>u.rarity).join('/')!=='SR/SSR/UR')errors.push(id+': units');
            if(all.some(u=>!UNIT_DESIGN[u.id]||!UNIT_ARTWORK[u.id]))errors.push(id+': unit metadata');
            if(!CHARACTER_DEPTH_V1[id])errors.push(id+': depth missing');
            if(!ART_V2.full_body[id]||!ART_V2.upper_body[id])errors.push(id+': art path missing');
            if(!symbolReactionEnabledV0500(id)||!artV2TalkCropV0500(id))errors.push(id+': symbol crop registration missing');
            if(!expressionPortraitMarkup(id,'smile','qa:new19:'+id).includes('data-expression-source="symbol"'))errors.push(id+': renderer not using symbol mode');
            const k=NEW_HERO_REVEAL_V0500[id][1],save=fresh();
            if(isV0500Revealed(id,save))errors.push(id+': unlocked before story');
            save.quests[k]={...(save.quests[k]||{}),complete:true};
            if(!isV0500Revealed(id,save))errors.push(id+': unavailable after story');
          }
          const save=fresh();
          gachaMode='new19';
          const initial=availableNormalPool(save);
          if(initial.length!==0)errors.push('new roster not chapter-gated');
          save.quests.q73={...(save.quests.q73||{}),complete:true};
          const after=availableNormalPool(save).filter(u=>u.person==='sumire');
          if(after.length!==3)errors.push('sumire units not recruitable after q73');
          gachaMode='normal';
          return {count:ids.length,oldCount,total:unique.length,normalPoolSize:NORMAL_GACHA_POOL.length,srPoolSize:NORMAL_GACHA_POOL.filter(u=>u.rarity==='SR').length,
                  checkedStories:ids.reduce((n,id)=>n+Object.keys(ROMANCE_V0500[id].stories).length,0),
                  checkedUnits:NEW_UNIT_ROSTER_V0500.length,errors};
        }""")
        if result["errors"]:raise AssertionError(result)
        if errors:raise AssertionError(errors)
        for w,h in [(390,844),(568,320),(844,390),(926,428),(1280,800)]:
            page.set_viewport_size({"width":w,"height":h})
            page.evaluate("""()=>{S=fresh();S.gameStarted=true;S.onboarding.enabled=false;view='gacha';render()}""")
            metrics=page.evaluate("""()=>({docWidth:document.documentElement.scrollWidth,viewport:innerWidth})""")
            if metrics["docWidth"]>w+2:raise AssertionError({"viewport":(w,h),**metrics})
            page.screenshot(path=str(OUT/f"gacha_{w}x{h}.png"),full_page=True)
        browser.close()
        (OUT/"results.json").write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding="utf-8")
        print("PASS",json.dumps(result,ensure_ascii=False))
finally:
    srv.shutdown()
