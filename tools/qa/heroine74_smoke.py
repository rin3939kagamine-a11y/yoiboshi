#!/usr/bin/env python3
"""Verify 74 heroine image files and actual browser behavior, without modifying saves."""
import json
import os
import threading
from pathlib import Path
import re
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


# 0.69.1 static regression: search the complete repository, including text,
# CSS, documentation and tests. The old heroine ID is allowed ONLY in
# migration logic and this regression test; the existing boss is not renamed.
old_names=[
    re.compile("九条"+r"\s*"+"ゆかり"),
    re.compile("芹沢"+r"\s*"+"はるか"),
    re.compile("沖田"+r"\s*"+"シオン"),
]
text_extensions={".js",".json",".html",".md",".txt",".py",".yml",".yaml",".css",".csv"}
violations=[]
legacy_references=[]
for path in ROOT.rglob("*"):
    if not path.is_file() or path.suffix.lower() not in text_extensions:
        continue
    rel=path.relative_to(ROOT).as_posix()
    if any(part in {".git","node_modules","qa_artifacts",".venv","venv"} for part in path.parts):
        continue
    if path.stat().st_size>12_000_000:continue
    try:
        contents=path.read_text(encoding="utf-8")
    except (UnicodeError,OSError):
        continue
    for pattern in old_names:
        for match in pattern.finditer(contents):
            violations.append({"path":rel,"term":match.group(0)})
    if "shion" in contents:
        legacy_references.append(rel)
        if rel not in {"js/game.js","tools/qa/heroine74_smoke.py"}:
            violations.append({"path":rel,"term":"old heroine ID reference"})
for kind in ("full_body","upper_body","face_icons"):
    assert not (ROOT/"assets"/"ART_V2"/kind/("shion"+".webp")).exists()
assert "subaru" in ids and "shion" not in ids,(len(ids),ids)
assert not violations,violations
print("PASS: repository-wide legacy surname/name/heroine-ID search", sorted(set(legacy_references)),flush=True)

# Dark-background proofs use the committed generated WebPs, not the original
# chat previews. Keep the original PNGs as the exact alpha source of truth.
dark_out=ROOT/"qa_artifacts"/"heroine74"/"dark_background"
dark_out.mkdir(parents=True,exist_ok=True)
for heroine in ("ramu","noi"):
    src=ROOT/"assets"/"ART_V2"/"source_originals"/(heroine+"_full_body_transparent.png")
    assert src.exists(),src
    with Image.open(src) as im:
        assert im.mode=="RGBA" and im.getchannel("A").getextrema()[0]==0,src
    for kind in ("full_body","upper_body","face_icons"):
        file=ROOT/"assets"/"ART_V2"/kind/(heroine+".webp")
        with Image.open(file) as raw:
            portrait=raw.convert("RGBA")
            assert portrait.getchannel("A").getextrema()[0]==0,file
            dark=Image.new("RGBA",portrait.size,(12,20,39,255))
            dark.alpha_composite(portrait)
            dark.convert("RGB").save(dark_out/(heroine+"_"+kind+".png"))
print("PASS: six transparent sprites composited on dark navy for visual QA",flush=True)

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
            legacy = page.evaluate("""() => {
                const original=fresh();
                original.playerName='shion';
                original.owned.shion_work={lv:12,aff:68,lb:2,copies:1};
                original.selected='shion_work';
                original.homeFavorite='shion';
                original.homeUnitId='shion_work';
                original.party=['shion_work'];
                original.bondRead.shion=[true,true,false,false,false];
                original.bondLastTopic.shion=3;
                original.love.affection.shion=68;
                original.love.activeHero='shion';
                const upgraded=migrateSave(original);
                const repeated=migrateSave(upgraded);
                return {
                   fullName:PEOPLE.subaru?.name,
                   noOldHero:!HERO_IDS.includes('shion')&&HERO_IDS.includes('subaru'),
                   srCard:NEW_UNIT_ROSTER_V0690.some(u=>u.id==='subaru_work'&&u.person==='subaru'&&u.rarity==='SR'),
                   gacha:NORMAL_GACHA_POOL.some(u=>u.id==='subaru_work'),
                   selected:upgraded.selected,
                   favorite:upgraded.homeFavorite,
                   homeUnit:upgraded.homeUnitId,
                   party:upgraded.party,
                   owned:upgraded.owned.subaru_work,
                   staleOwned:!!upgraded.owned.shion_work,
                   affection:upgraded.love.affection.subaru,
                   bond:upgraded.bondRead.subaru,
                   bondTopic:upgraded.bondLastTopic.subaru,
                   playerName:upgraded.playerName,
                   activeHero:upgraded.love.activeHero,
                   idempotent:!!repeated.owned.subaru_work&&!repeated.owned.shion_work
                };
            }""")
            assert legacy["fullName"]=="沖田 すばる",legacy
            assert legacy["noOldHero"] and legacy["srCard"] and legacy["gacha"],legacy
            assert legacy["selected"]=="subaru_work",legacy
            assert legacy["favorite"]=="subaru" and legacy["homeUnit"]=="subaru_work",legacy
            assert legacy["party"]==["subaru_work"] and not legacy["staleOwned"],legacy
            assert legacy["owned"]["lv"]==12 and legacy["owned"]["aff"]==68,legacy
            assert legacy["affection"]==68 and legacy["bond"][:2]==[True,True],legacy
            assert legacy["bondTopic"]==3 and legacy["playerName"]=="shion",legacy
            assert legacy["activeHero"]=="subaru" and legacy["idempotent"],legacy
            print("PASS: subaru recruitment, ownership and old-save migration",orientation,flush=True)
            # Actual UI rendering: populate a throwaway save with all 74 SR cards.
            appearance=page.evaluate("""() => {
                S=fresh();
                S.gameStarted=true;
                if(S.onboarding) S.onboarding.enabled=false;
                for(const id of NEW_HERO_IDS_V0690)
                    S.owned[id+'_work']={lv:1,aff:0,lb:0,copies:0};
                rosterCollectionOpen=true;
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
