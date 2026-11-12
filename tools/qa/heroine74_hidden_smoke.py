#!/usr/bin/env python3
"""V0.69 release-gate acceptance tests for both mobile orientations.

Checks the committed default (OFF) and a test-only source override (ON).
Tests use localStorage in isolated Playwright contexts, never users' saves.
"""
import json
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "qa_artifacts" / "heroine74_gate"
OUT.mkdir(parents=True, exist_ok=True)
gate_source = (ROOT / "js/heroines_v0690.js").read_text(encoding="utf-8")
toggle = "const HERO_V0690_ENABLED = false;"
assert gate_source.count(toggle) == 1, "Committed default must disable the 74 heroines"
assert gate_source.count("const HERO_V0690_UNLOCK_RULES") == 1

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
        for label, width, height in [("portrait", 390, 844), ("landscape", 844, 390)]:
            context = browser.new_context(viewport={"width":width, "height":height})
            page = context.new_page()
            errors = []
            page.on("pageerror", lambda exc: errors.append(str(exc)))
            page.goto(url, wait_until="load", timeout=90000)
            page.wait_for_function("typeof HERO_V0690_ENABLED !== 'undefined' && typeof NORMAL_GACHA_POOL !== 'undefined'", timeout=45000)
            initial = page.evaluate("""() => ({
                gate:HERO_V0690_ENABLED,
                total:NEW_HERO_IDS_V0690.length,
                cards:NEW_UNIT_ROSTER_V0690.length,
                profiles:Object.keys(ROMANCE_V0690).length,
                images:NEW_HERO_IDS_V0690.filter(id=>ART_V2.full_body[id]&&ART_V2.upper_body[id]&&ART_V2.face_icons[id]).length,
                rules:Object.keys(HERO_V0690_UNLOCK_RULES).length,
                normalPool:NORMAL_GACHA_POOL.filter(u=>NEW_HERO_IDS_V0690.includes(u.person)).length,
                offered:availableNormalPool().filter(u=>NEW_HERO_IDS_V0690.includes(u.person)).length,
                rates:RATE,
                old19:NEW19_GACHA_POOL.filter(u=>NEW_HERO_IDS_V0500.includes(u.person)).length
            })""")
            assert initial["gate"] is False and all(initial[k] == 74 for k in ["total", "cards", "profiles", "images", "rules"]), initial
            assert initial["normalPool"] == initial["offered"] == 0, initial
            assert initial["rates"] == {"R":60,"SR":25,"SSR":10,"UR":5}, initial
            assert initial["old19"] > 0, initial

            # A pre-release player who has already drawn Ramu and Subaru.
            page.evaluate("""() => {
                const save=fresh();
                save.gameStarted=true;
                save.owned.ramu_work={lv:8,aff:75,lb:1,copies:2};
                save.owned.subaru_work={lv:10,aff:50,lb:2,copies:1};
                save.party=['ramu_work','milku_work','akane_work','aoi_work'];
                save.selected='ramu_work';
                save.homeFavorite='ramu';
                save.homeUnitId='ramu_work';
                save.love.activeHero='ramu';
                save.love.affection.ramu=75;
                save.bondRead.ramu=[true,true,false,false,false];
                save.love.inviteHistory.push({day:3,person:'ramu',place:'cafe',fulfilled:true});
                window.localStorage.setItem('yoiboshi-reboot-v1',JSON.stringify(save));
            }""")
            page.reload(wait_until="load",timeout=90000)
            page.wait_for_function("typeof S !== 'undefined' && typeof HERO_V0690_ENABLED !== 'undefined'",timeout=45000)
            off = page.evaluate("""() => {
                const savedRaw=localStorage.getItem('yoiboshi-reboot-v1');
                const persisted=JSON.parse(savedRaw);
                const originalParty=JSON.stringify(S.party);
                const outputs={};
                const visibleNames=NEW_HERO_IDS_V0690.map(id=>PEOPLE[id].name);
                for(const screen of ['home','roster','training','unit','archive','gacha','talk','notebook']){
                    if(screen==='roster')rosterCollectionOpen=true;
                    view=screen;render();
                    const root=document.querySelector('#app');
                    const content=root?.textContent||'';
                    const images=[...root.querySelectorAll('img[src]')].map(img=>img.getAttribute('src'));
                    outputs[screen]={
                        badNames:visibleNames.filter(name=>content.includes(name)),
                        badImages:images.filter(src=>NEW_HERO_IDS_V0690.some(id=>
                            src.includes('/'+id+'.webp'))),
                        failed:!!root.querySelector('.runtime-fallback'),
                        overflow:document.documentElement.scrollWidth-window.innerWidth,
                        text:content.slice(0,300)
                    };
                }
                view='home';render();
                return {
                    outputs,
                    home:lobbySelected,
                    members:homeMembers().filter(id=>NEW_HERO_IDS_V0690.includes(id)),
                    overlay:visibleParty(),
                    originalParty:JSON.parse(originalParty),
                    currentParty:S.party,
                    currentFavorite:S.homeFavorite,
                    currentSelected:S.selected,
                    ownedRamu:S.owned.ramu_work,
                    ownedSubaru:S.owned.subaru_work,
                    affection:S.love.affection.ramu,
                    bondRead:S.bondRead.ramu,
                    savedUnchanged:localStorage.getItem('yoiboshi-reboot-v1')===savedRaw,
                    storedOwned:persisted.owned.ramu_work&&persisted.owned.subaru_work,
                    storedFavorite:persisted.homeFavorite,
                    storedParty:persisted.party
                };
            }""")
            for screen, data in off["outputs"].items():
                assert not data["failed"], (label,screen,"runtime failed",data)
                assert not data["badNames"], (label,screen,"hidden names",data)
                assert not data["badImages"], (label,screen,"hidden images",data)
                assert data["overflow"]<=18, (label,screen,"horizontal overflow",data)
            assert off["home"]=="momoka",off
            assert not off["members"],off
            assert off["overlay"]==["momoka_work","milku_work","akane_work","aoi_work"],off
            assert off["currentParty"]==off["storedParty"]==["ramu_work","milku_work","akane_work","aoi_work"],off
            assert off["currentFavorite"]==off["storedFavorite"]=="ramu",off
            assert off["currentSelected"]=="ramu_work",off
            assert off["ownedRamu"]["lv"]==8 and off["ownedSubaru"]["lv"]==10,off
            assert off["affection"]==75 and off["bondRead"][:2]==[True,True],off
            assert off["savedUnchanged"] and off["storedOwned"],off
            page.screenshot(path=str(OUT/(label+"_hidden_home.png")),full_page=True)

            # Re-enable via an in-memory JS response only, retaining the SAME save.
            enabled = gate_source.replace(toggle,"const HERO_V0690_ENABLED = true;")
            page.route("**/js/heroines_v0690.js*",lambda route: route.fulfill(status=200,content_type="application/javascript",body=enabled))
            page.reload(wait_until="load",timeout=90000)
            page.wait_for_function("typeof HERO_V0690_ENABLED !== 'undefined' && HERO_V0690_ENABLED === true", timeout=45000)
            on = page.evaluate("""() => {
                const initialSave=localStorage.getItem('yoiboshi-reboot-v1');
                view='home';render();
                const homeHasRamu=document.querySelector('#app')?.textContent.includes(PEOPLE.ramu.name);
                const favorite=lobbySelected;
                rosterCollectionOpen=true;view='roster';render();
                const cards=[...document.querySelectorAll('.roster-vnew-cardname')].map(x=>x.textContent.trim());
                view='talk';render();
                const talkText=document.querySelector('#app')?.textContent||'';
                const restored={
                    gate:HERO_V0690_ENABLED,
                    normalPool:NORMAL_GACHA_POOL.filter(u=>NEW_HERO_IDS_V0690.includes(u.person)).length,
                    offered:availableNormalPool().filter(u=>NEW_HERO_IDS_V0690.includes(u.person)).length,
                    homeHasRamu,
                    favorite,
                    rosterRamu:cards.includes(PEOPLE.ramu.name),
                    rosterSubaru:cards.includes(PEOPLE.subaru.name),
                    romanceRamu:talkText.includes(PEOPLE.ramu.name),
                    visibleTeam:visibleParty(),
                    selected:S.selected,
                    oldSaveUnchanged:localStorage.getItem('yoiboshi-reboot-v1')===initialSave,
                    owned:S.owned.ramu_work,
                    bond:S.bondRead.ramu
                };
                return restored;
            }""")
            assert on["gate"] is True and on["normalPool"]==74 and on["offered"]==74,on
            assert on["homeHasRamu"] and on["favorite"]=="ramu",on
            assert on["rosterRamu"] and on["rosterSubaru"] and on["romanceRamu"],on
            assert on["visibleTeam"]==["ramu_work","milku_work","akane_work","aoi_work"],on
            assert on["selected"]=="ramu_work" and on["owned"]["lv"]==8,on
            assert on["bond"][:2]==[True,True] and on["oldSaveUnchanged"],on
            assert not errors,errors
            results.append({"orientation":label,"viewport":[width,height],
                            "disabled":initial,"hidden_state":{k:v for k,v in off.items() if k!="outputs"},
                            "enabled":on,"page_errors":errors})
            print("PASS",label,"OFF hidden in 8 screens; saved party intact; ON restores ownership",flush=True)
            context.close()
        browser.close()
finally:
    server.shutdown()

(OUT/"report.json").write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding="utf-8")
print("PASS V0.69 gate both orientations; no save writes; reversible without deleting files")
