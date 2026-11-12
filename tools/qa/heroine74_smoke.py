#!/usr/bin/env python3
"""Verify 74 heroine image files and actual browser behavior, without modifying saves."""
import json
import os
import threading
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
manifest = json.loads((ROOT / "docs/heroine74_sources_v0690.json").read_text(encoding="utf-8"))
entries = manifest["entries"]
assert len(entries) == 74
ids = [e["id"] for e in entries]
assert len(set(ids)) == 74
assert "honjo_iroha" in ids and "iroha" not in ids

for id in ids:
    for kind, dims in [("full_body",(1024,1536)),("upper_body",(768,1024)),("face_icons",(400,400))]:
        file = ROOT / "assets" / "ART_V2" / kind / (id + ".webp")
        assert file.exists(), f"Missing art: {file}"
        with Image.open(file) as im:
            assert im.size == dims, (file, im.size)
            assert im.mode == "RGBA", (file, im.mode)
            assert im.getchannel("A").getextrema()[0] == 0, file
            assert im.getchannel("A").getbbox(), file
print("PASS: 222 WebP images and 74 unique IDs", flush=True)

os.chdir(ROOT)
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass
srv = ThreadingHTTPServer(("127.0.0.1",0), Quiet)
threading.Thread(target=srv.serve_forever, daemon=True).start()
url = "http://127.0.0.1:" + str(srv.server_address[1]) + "/"
report_dir = ROOT / "qa_artifacts" / "heroine74"
report_dir.mkdir(parents=True, exist_ok=True)
results = []
try:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, args=["--no-sandbox"])
        for orientation,w,h in [("portrait",390,844),("landscape",844,390)]:
            page = browser.new_page(viewport={"width":w,"height":h})
            errors = []
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.goto(url,wait_until="load",timeout=90000)
            page.wait_for_function("typeof NEW_HERO_IDS_V0690 !== 'undefined' && typeof NORMAL_GACHA_POOL !== 'undefined'",timeout=90000)
            metrics = page.evaluate("""() => ({
                heroineCount: NEW_HERO_IDS_V0690.length,
                uniqueHeroIDs: new Set(HERO_IDS).size === HERO_IDS.length,
                profiles: NEW_HERO_IDS_V0690.filter(id => PEOPLE[id] && ROMANCE_V0690[id] && HERO_IDS.includes(id)).length,
                srCards: NEW_UNIT_ROSTER_V0690.filter(u => u.rarity === 'SR').length,
                normalPool: NORMAL_GACHA_POOL.filter(u => NEW_HERO_IDS_V0690.includes(u.person)).length,
                completeArtPaths: NEW_HERO_IDS_V0690.filter(id => ART_V2.full_body[id] && ART_V2.upper_body[id] && ART_V2.face_icons[id]).length,
                preserveStoryNPC: STORY_ONLY_CAST.iroha === '大森 いろは',
                unchangedRates: JSON.stringify(RATE) === '{"R":60,"SR":25,"SSR":10,"UR":5}',
                viewport: window.innerWidth,
                documentWidth: document.documentElement.scrollWidth
            })""")
            for field in ["heroineCount","profiles","srCards","normalPool","completeArtPaths"]:
                assert metrics[field] == 74, (orientation,field,metrics)
            for field in ["uniqueHeroIDs","preserveStoryNPC","unchangedRates"]:
                assert metrics[field], (orientation,field,metrics)
            assert not errors, (orientation,errors)
            page.screenshot(path=str(report_dir / (orientation + ".png")),full_page=True)
            assert metrics["documentWidth"] <= metrics["viewport"] + 18, metrics
            print("PASS browser",orientation,metrics,flush=True)
            # Actual UI rendering: populate a throwaway save with all 74 SR cards.
            appearance=page.evaluate("""() => {
                S=fresh();
                S.gameStarted=true;
                if(S.onboarding) S.onboarding.enabled=false;
                for(const id of NEW_HERO_IDS_V0690)
                    S.owned[id+'_work']={lv:1,aff:0,lb:0,copies:0};
                view='roster';render();
                const cardNames=[...document.querySelectorAll('.roster-vnew-cardname')]
                    .map(node=>node.textContent.trim());
                const missingRoster=NEW_HERO_IDS_V0690.filter(id=>!cardNames.includes(PEOPLE[id].name));
                const rosterWidth=document.documentElement.scrollWidth;
                const rosterCards=document.querySelectorAll('.roster-vnew-unit').length;
                const brokenTalk=[];
                for(const id of NEW_HERO_IDS_V0690){
                    if(!romanceHeroAvailable(id)){brokenTalk.push(id+': unavailable');continue;}
                    S.love.activeHero=id;
                    S.selected=id+'_work';
                    view='talk';render();
                    const panel=document.querySelector('.v676-talk-main');
                    if(!panel||!panel.textContent.includes(PEOPLE[id].name))
                        brokenTalk.push(id+': missing talk');
                    if(!BOND_STORY_CATALOG['bond_'+id+'_0'] || !ROMANCE_V0690[id].topics?.length)
                        brokenTalk.push(id+': missing bond');
                }
                view='gacha';render();
                return {missingRoster,rosterWidth,rosterCards,brokenTalk,
                  talkImages:NEW_HERO_IDS_V0690.filter(id=>!ART_V2.upper_body[id]).length,
                  gachaCandidates:availableNormalPool(S)
                     .filter(u=>NEW_HERO_IDS_V0690.includes(u.person)).length,
                  gachaDOM:!!document.querySelector('.gacha-v030-tools')};
            }""")
            assert not appearance["missingRoster"], (orientation,"roster",appearance)
            assert not appearance["brokenTalk"], (orientation,"talk",appearance)
            assert appearance["gachaCandidates"]==74 and appearance["gachaDOM"],(orientation,"gacha",appearance)
            assert appearance["rosterWidth"]<=w+18, (orientation,"roster overflow",appearance)
            print("PASS full roster, 74 romance views and recruit UI",orientation,flush=True)

            # Save migration smoke: remove any 0.69 heroine affinity keys,
            # reload that old-shaped data, and confirm app stays operational.
            page.evaluate("""() => {
                const backup = JSON.parse(JSON.stringify(S));
                if (backup.love && backup.love.affection) {
                    for (const id of NEW_HERO_IDS_V0690) delete backup.love.affection[id];
                }
                localStorage.setItem('yoiboshi-reboot-v1',JSON.stringify(backup));
            }""")
            page.reload(wait_until="load",timeout=90000)
            page.wait_for_function("typeof S !== 'undefined' && typeof NEW_HERO_IDS_V0690 !== 'undefined'",timeout=90000)
            assert page.evaluate("() => !!S && HERO_IDS.includes('honjo_iroha')")
            assert not errors, (orientation,errors)
            results.append({"orientation":orientation,"viewport":[w,h],"metrics":metrics,"js_errors":errors})
            page.close()
        browser.close()
finally:
    srv.shutdown()
(report_dir/"report.json").write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding="utf-8")
print("PASS browser QA and old-shape save reload for both layouts")
