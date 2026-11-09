"""Real-game Chromium QA for battle scene artwork and q6 side-view direction.
No source battle rules or save files are modified by this test.
"""
import json
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "qa_artifacts" / "battle_visual"
OUT.mkdir(parents=True, exist_ok=True)
checks = []
errors = []

def check(name, passed, details=None):
    checks.append({"name": name, "passed": bool(passed), "details": details})
    if not passed:
        raise AssertionError(f"{name}: {details}")

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def positions(page):
    return page.evaluate("""() => {
      const s=document.querySelector('.q6-classic-stage');
      if(!s)return null;
      const allies=[...s.querySelectorAll(':scope > .yc-slot')];
      const enemies=[...s.querySelectorAll(':scope > .yc-enemy-slot:not(.yc-enemy-ko)')];
      const area=s.getBoundingClientRect();
      const xs=allies.map(el=>el.getBoundingClientRect());
      const es=enemies.map(el=>el.getBoundingClientRect());
      const actor=allies[0]?.querySelector('.yc-actor');
      if(actor)actor.classList.add('yc-attack');
      return {allies:allies.length,enemies:enemies.length,
        maxAllyRight:Math.max(...xs.map(r=>r.right)),
        minEnemyLeft:Math.min(...es.map(r=>r.left)),
        stageLeft:area.left,stageRight:area.right,
        stageWidth:area.width,
        attackAnimation:actor?getComputedStyle(actor).animationName:null,
        label:getComputedStyle(s,'::after').content,
        background:getComputedStyle(document.querySelector('.tb-root.yb-immersive')||s).backgroundImage,
        giant:s.querySelectorAll('.q6-giant').length,
        heading:s.getAttribute('aria-label'),
        hud:!!document.querySelector('.q6-classic-hud'),
        damageStyle:getComputedStyle(document.querySelector('.yc-enemy-number')||s).color};
    }""")

srv = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=str(ROOT)))
Thread(target=srv.serve_forever, daemon=True).start()
try:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
        page = browser.new_page(viewport={"width": 390, "height": 844})
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(f"http://127.0.0.1:{srv.server_port}/index.html", wait_until="load", timeout=120000)
        page.wait_for_function("typeof startBattle==='function' && !!window.YoiBattleBackgrounds", timeout=30000)

        resolved = page.evaluate("""() => Object.fromEntries(
          ['q1','q2','q3','q5','q6','q30'].map(id=>[id,YoiBattleBackgrounds.resolve(id)]))""")
        expected = {
            "q1": "bg_shotengai_", "q2": "bg_kissa_", "q3": "bg_ekimae_",
            "q5": "bg_kaihin_", "q6": "bg_lighthouse_night.webp", "q30": "bg_soudan_"
        }
        for qid, part in expected.items():
            check(f"{qid} resolves expected place", part in (resolved[qid] or ""), resolved[qid])

        decoded = page.evaluate("""async paths => Promise.all(paths.map(src => new Promise(resolve=>{
          const img=new Image();img.onload=()=>resolve({src,ok:img.naturalWidth>0});
          img.onerror=()=>resolve({src,ok:false});img.src=src;
        })))""", list(resolved.values()))
        check("resolved background assets load", all(a["ok"] for a in decoded), decoded)

        # Testing only: mark progression complete in an isolated fresh browser session.
        page.evaluate("""() => {
          S=fresh();S.gameStarted=true;S.onboarding.enabled=false;
          Object.keys(S.storyFlags).forEach(id=>{S.storyFlags[id]=true});
          QUESTS.forEach(q=>{S.quests[q.id]={complete:true,clues:2}});
          view='home';battle=null;storySession=null;
          startBattle('q6');
        }""")
        page.wait_for_selector(".tb-root.q6-classic .q6-classic-stage")
        for width, height in [(390,844),(667,375),(844,390)]:
            page.set_viewport_size({"width":width,"height":height})
            page.evaluate("() => tbRender()")
            p=positions(page)
            check(f"q6 {width}x{height} allies left of enemies",
                  p["allies"]==4 and p["enemies"]>0
                  and p["maxAllyRight"]<p["minEnemyLeft"]+1, p)
            check(f"q6 {width}x{height} shared rightward attack",
                  p["attackAnimation"]=="yc-attack", p["attackAnimation"])
            check(f"q6 {width}x{height} label/HUD/background intact",
                  "旧灯台・残響域" in p["label"] and p["hud"]
                  and "bg_lighthouse_night.webp" in p["background"]
                  and "左側が味方" in p["heading"], p)
            page.screenshot(path=str(OUT/f"q6_{width}x{height}.png"),full_page=True)

        # Render the real last wave to exercise giant-boss positioning as well.
        page.evaluate("""() => {
          tbClearTimer();
          battle.wave=battle.totalWaves-1;
          tbNewWave(QUEST_BY_ID.q6);tbRender();
        }""")
        p=positions(page)
        check("q6 boss on right with targetable enemy slots",
              p["giant"]==1 and p["maxAllyRight"]<p["minEnemyLeft"]+1, p)
        page.screenshot(path=str(OUT/"q6_giant_844x390.png"),full_page=True)

        page.locator(".q6-layout-switch").evaluate("(el)=>el.click()")
        page.wait_for_selector(".tb-root .yc-turn-stage.yb-location-bg")
        ordinary_q6=page.locator(".tb-root.yb-immersive").evaluate(
            "(e)=>getComputedStyle(e).backgroundImage")
        check("q6 standard mode uses location artwork", "bg_lighthouse_night.webp" in ordinary_q6, ordinary_q6)

        page.evaluate("""() => {
          tbClearTimer();battle=null;view='home';startBattle('q3');
        }""")
        page.wait_for_selector(".tb-root .yc-turn-stage.yb-location-bg")
        regular=page.locator(".tb-root .yc-turn-stage").evaluate(
            "(e)=>({background:getComputedStyle(e.closest('.tb-root.yb-immersive')||e).backgroundImage,slots:e.querySelectorAll('.yc-slot').length,enemy:e.querySelectorAll('.yc-enemy-slot').length})")
        check("ordinary turn battle shows station scenery and actors",
              "bg_ekimae_" in regular["background"] and regular["slots"]==4 and regular["enemy"]>0,regular)

        page.evaluate("""() => {
          tbClearTimer();battle=null;view='home';S.battleMode='legacy';startBattle('q5');
        }""")
        page.wait_for_selector(".v024-battle-stage .arena.overhead.yb-location-bg")
        legacy=page.locator(".v024-battle-stage .arena.overhead").evaluate(
            "(e)=>getComputedStyle(e).backgroundImage")
        check("legacy top-down battle shows seaside scenery", "bg_kaihin_" in legacy, legacy)
        check("no uncaught JavaScript exceptions", not errors, errors)
        browser.close()
finally:
    srv.shutdown()
    (OUT/"results.json").write_text(json.dumps(
        {"passed":all(c["passed"] for c in checks),"checks":checks,"errors":errors},
        ensure_ascii=False,indent=2),encoding="utf-8")
print(f"Battle visual QA: {len(checks)} checks passed")
