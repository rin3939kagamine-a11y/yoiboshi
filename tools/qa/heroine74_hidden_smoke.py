#!/usr/bin/env python3
"""Quest-gated V0.69 heroine visibility, legacy owned saves, and mobile regressions."""
import json
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "qa_artifacts" / "heroine74_gate"
OUT.mkdir(parents=True, exist_ok=True)

source = (ROOT / "js/heroines_v0690.js").read_text(encoding="utf-8")
assert source.count("const HERO_V0690_ENABLED = true;") == 1
assert "NEW_HERO_REVEAL_V0690" in (ROOT / "js/heroine74_encounters_v0701.js").read_text(encoding="utf-8")

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

server = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=str(ROOT)))
Thread(target=server.serve_forever, daemon=True).start()
url = "http://127.0.0.1:" + str(server.server_port) + "/index.html"
results = []

try:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, args=["--no-sandbox"])
        for label, width, height in [("portrait",390,844),("landscape",844,390)]:
            context = browser.new_context(viewport={"width":width,"height":height})
            page = context.new_page()
            errors = []
            page.on("pageerror", lambda exc: errors.append(str(exc)))
            page.goto(url,wait_until="load",timeout=90000)
            page.wait_for_function("typeof S !== 'undefined' && typeof HERO74_ENCOUNTERS !== 'undefined'",timeout=45000)
            stats = page.evaluate("""() => {
                S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
                const targets=new Set(NEW_HERO_IDS_V0690.map(id=>PEOPLE[id].name));
                const screens=['home','roster','training','unit','archive','gacha','talk','notebook'];
                const early={};
                for(const name of screens){
                    if(name==='roster')rosterCollectionOpen=true;
                    view=name;render();
                    const root=document.querySelector('#app');
                    const content=root?.textContent||'';
                    early[name]={
                       leak:[...targets].filter(person=>content.includes(person)),
                       failure:!!root?.querySelector('.runtime-fallback'),
                       overflow:document.documentElement.scrollWidth-window.innerWidth
                    };
                }
                const fromFresh=availableNormalPool(S).filter(u=>HERO_V0690_ID_SET.has(u.person)).length;
                S.quests.q1={complete:true};view='home';render();
                const preMeeting={
                   visible:NEW_HERO_IDS_V0690.filter(id=>heroV0690Visible(id,S)),
                   pool:availableNormalPool(S).filter(u=>HERO_V0690_ID_SET.has(u.person)).length,
                   homeButton:!!document.querySelector('.hero74-home-meetings button'),
                   queue:hero74PendingQuestIds(S)
                };
                S.hero74MeetSeen.q1=true;view='gacha';render();
                const afterMeeting={
                   visible:NEW_HERO_IDS_V0690.filter(id=>heroV0690Visible(id,S)),
                   pool:availableNormalPool(S).filter(u=>HERO_V0690_ID_SET.has(u.person)).length,
                   directoryText:document.querySelector('.recruit-directory')?.textContent||'',
                   queue:hero74PendingQuestIds(S)
                };
                const legacy=fresh();delete legacy.hero74RevealMode;legacy.quests.q1={complete:true};
                const restored=migrateSave(legacy);
                const previouslyOwned=fresh();
                previouslyOwned.owned.ramu_work={lv:8,aff:65,lb:2,copies:1};
                previouslyOwned.selected='ramu_work';
                previouslyOwned.homeFavorite='ramu';
                previouslyOwned.love.activeHero='ramu';
                const retained=migrateSave(previouslyOwned);
                S=retained;view='roster';render();
                const owned={available:heroV0690Visible('ramu',S),
                   card:S.owned.ramu_work,selected:S.selected,
                   stable:!!document.querySelector('#app')&&!document.querySelector('.runtime-fallback'),
                   overflow:document.documentElement.scrollWidth-window.innerWidth};
                return {early,fromFresh,preMeeting,afterMeeting,legacyVisible:heroV0690Visible('chitose',restored),
                    legacyMode:restored.hero74RevealMode,owned};
            }""")
            assert stats["fromFresh"]==0,(label,stats)
            for screen,state in stats["early"].items():
                assert not state["failure"] and not state["leak"],(label,screen,state)
                assert state["overflow"]<=18,(label,screen,state)
            before=stats["preMeeting"]
            assert not before["visible"] and before["pool"]==0,(label,before)
            assert before["homeButton"] and before["queue"]==["q1"],(label,before)
            after=stats["afterMeeting"]
            assert set(after["visible"])=={"chitose","nonoka"} and after["pool"]==2,(label,after)
            assert not after["queue"],(label,after)
            assert stats["legacyVisible"] and stats["legacyMode"]=="legacy",(label,stats)
            owned=stats["owned"]
            assert owned["available"] and owned["card"]["lv"]==8 and owned["card"]["aff"]==65,(label,owned)
            assert owned["selected"]=="ramu_work" and owned["stable"],(label,owned)
            assert owned["overflow"]<=18,(label,owned)
            assert not errors,(label,errors)
            page.screenshot(path=str(OUT/(label+"_quest_gates.png")),full_page=True)
            results.append({"orientation":label,"viewport":[width,height],"metrics":stats,"page_errors":errors})
            print("PASS",label,"fresh hidden, q1 unlock, old saves, owned cards, UI",flush=True)
            context.close()
        browser.close()
finally:
    server.shutdown()

(OUT/"report.json").write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding="utf-8")
print("PASS heroine74 quest gates and both mobile orientations")
