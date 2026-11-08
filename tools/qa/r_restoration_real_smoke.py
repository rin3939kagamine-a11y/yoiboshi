"""Regression for approved R restoration. Runs the actual game in isolated Chromium storage.
Approved image binaries are intentionally not shipped in the PR; only URL mappings are asserted.
"""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright
import json

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "qa_artifacts" / "r_restoration"
OUT.mkdir(parents=True, exist_ok=True)
KEY = "yoiboshi-reboot-v1"

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass

checks = []
def check(name, condition, value=None):
    checks.append({"name": name, "passed": bool(condition)})
    assert condition, f"{name}: {value}"

srv = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=str(ROOT)))
Thread(target=srv.serve_forever, daemon=True).start()
try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
        page = browser.new_page(viewport={"width": 390, "height": 844})
        errors = []
        page.on("pageerror", lambda err: errors.append(str(err)))
        base = f"http://127.0.0.1:{srv.server_port}"
        page.goto(base + "/index.html", wait_until="load", timeout=120000)
        page.wait_for_function("typeof migrateSave==='function' && typeof rollNormalGachaRarity==='function'")

        registry = page.evaluate("""() => {
          const ids=APPROVED_R_UNIT_IDS, bad=[];
          for(const id of ids){
            const u=BYID[id],a=UNIT_ARTWORK[id];
            if(!u||u.rarity!=='R'||!a||a.portrait!=='assets/UNIT_ART/'+id+'.webp'||a.scene)
              bad.push(id);
            if(u && unitArt(u,'portrait')!=='assets/UNIT_ART/'+id+'.webp')bad.push(id+':render');
          }
          return {
            total:ids.length,unique:new Set(ids).size,bad,
            noelR:BYID.noel_daily?.rarity,noelUR:BYID.noel_star?.rarity,
            noelURScene:UNIT_ARTWORK.noel_star?.scene,
            shioDaily:BYID.shio_daily?.rarity,shioPool:BYID.shio_pool?.rarity,
            shioPoolImage:UNIT_ARTWORK.shio_pool?.portrait||null,
            shioPoolInPool:NORMAL_GACHA_POOL.some(u=>u.id==='shio_pool'),
            juriRetirement:!!RETIRED_R_TO_SR.juri_daily,
            retiredRestored:ids.filter(id=>!!RETIRED_R_TO_SR[id]),
            makotoR:unitArt(BYID.makoto_daily,'portrait'),
            makotoSR:unitArt(BYID.makoto_work,'portrait'),
            rate:RATE,new19:NEW19_RATE,
            duplicateIds:UNITS.length-new Set(UNITS.map(u=>u.id)).size,
            rInPool:NORMAL_GACHA_POOL.filter(u=>u.rarity==='R').length
          };
        }""")
        check("59 unique approved R IDs", registry["total"] == registry["unique"] == 59, registry)
        check("59 R portrait paths without scenes", not registry["bad"], registry["bad"])
        check("no duplicate global unit IDs", registry["duplicateIds"] == 0, registry)
        check("Noel UR preserved and R distinct", registry["noelR"] == "R" and registry["noelUR"] == "UR" and bool(registry["noelURScene"]), registry)
        check("Shio old unit preserved without assigned portrait", registry["shioDaily"] == registry["shioPool"] == "R" and registry["shioPoolImage"] is None and not registry["shioPoolInPool"], registry)
        check("excluded character legacy conversion unchanged", registry["juriRetirement"], registry)
        check("restored R never migrated to SR", not registry["retiredRestored"], registry)
        check("Makoto R uses approved image, SR unaffected", registry["makotoR"] == "assets/UNIT_ART/makoto_daily.webp" and "makoto_daily.webp" not in registry["makotoSR"], registry)
        check("normal and new19 odds fixed", registry["rate"] == {"R":60,"SR":25,"SSR":10,"UR":5} and registry["new19"] == {"SR":80,"SSR":15,"UR":5}, registry)
        check("R represented in normal pool", registry["rInPool"] > 0, registry)

        def load_case(source_js):
            raw = page.evaluate(source_js)
            page.evaluate("(raw) => localStorage.setItem('yoiboshi-reboot-v1',JSON.stringify(raw))", raw)
            before = page.evaluate("localStorage.getItem('yoiboshi-reboot-v1')")
            page.reload(wait_until="load", timeout=120000)
            page.wait_for_function("typeof load==='function'")
            return raw, before, page.evaluate("localStorage.getItem('yoiboshi-reboot-v1')")

        # A: R still present in a pre-retirement-format save: no automatic upgrade.
        raw, before, after = load_case("""() => {
          const v=fresh();
          v.owned.akane_daily={lv:12,aff:31,lb:2,copies:3};
          v.owned.shio_pool={lv:7,aff:9,lb:1,copies:2};
          v.party=['akane_daily','shio_pool'];
          v.selected='akane_daily';v.homeFavorite='akane';v.homeUnitId='akane_daily';
          return v;
        }""")
        a = page.evaluate("""() => ({
          a:S.owned.akane_daily,shio:S.owned.shio_pool,
          party:S.party,selected:S.selected,
          favorite:S.homeFavorite,home:S.homeUnitId
        })""")
        check("A: original save bytes unchanged on load", before == after)
        check("A: R level/affinity/break/copies preserved", a["a"] == raw["owned"]["akane_daily"] and a["shio"] == raw["owned"]["shio_pool"], a)
        check("A: R party/selection/home preserved", a["party"] == ['akane_daily','shio_pool'] and a["selected"] == a["home"] == 'akane_daily' and a["favorite"] == 'akane', a)

        # B: already-upgraded save is not downgraded, duplicated, or remigrated.
        raw, before, after = load_case("""() => {
          const v=fresh();
          v.owned.akane_work={lv:15,aff:42,lb:3,copies:5};
          v.owned.mio_work={lv:9,aff:21,lb:1,copies:2};
          v.party=['akane_work','mio_work'];
          v.selected='akane_work';v.homeFavorite='akane';v.homeUnitId='akane_work';
          return v;
        }""")
        b = page.evaluate("""() => ({
          a:S.owned.akane_work,m:S.owned.mio_work,
          r:!!S.owned.akane_daily,party:S.party,
          selected:S.selected,home:S.homeUnitId
        })""")
        check("B: converted save bytes unchanged on load", before == after)
        check("B: SR values/copies unchanged and R not recreated", b["a"] == raw["owned"]["akane_work"] and b["m"] == raw["owned"]["mio_work"] and not b["r"], b)
        check("B: SR party/selection/home unchanged", b["party"] == ['akane_work','mio_work'] and b["selected"] == b["home"] == 'akane_work', b)

        # C: genuine 1-pull call with deterministic R roll, then persist and reload.
        fresh_pull = page.evaluate("""() => {
          localStorage.removeItem('yoiboshi-reboot-v1');
          S=fresh();S.gameStarted=true;S.onboarding.enabled=false;
          S.gems=GACHA_CONFIG.ONE_COST;S.gachaPity=0;
          view='gacha';gachaMode='normal';render();
          const rnd=Math.random;Math.random=()=>0.12;
          try{pull(1)}finally{Math.random=rnd}
          const id=drawResults[0]?.id,u=BYID[id];
          if(!u)return {error:'missing result'};
          S.party=[id];S.selected=id;S.homeFavorite=u.person;S.homeUnitId=id;
          persist();
          return {id,rarity:u.rarity,owned:S.owned[id],party:S.party,selected:S.selected,
            home:S.homeUnitId,art:unitCardArt(u),resultMarkup:recruitCardMarkup(drawResults[0])};
        }""")
        check("C: actual draw returns R", fresh_pull.get("rarity") == "R" and fresh_pull.get("art") == "assets/UNIT_ART/" + fresh_pull.get("id", "") + ".webp", fresh_pull)
        check("C: R appears correctly on result card", ">R</span>" in fresh_pull["resultMarkup"], fresh_pull)
        page.reload(wait_until="load", timeout=120000)
        page.wait_for_function("typeof load==='function'")
        c = page.evaluate("""() => {
          const id=S.selected,u=BYID[id];
          return {id,owned:S.owned[id],party:S.party,selected:S.selected,
            favorite:S.homeFavorite,home:S.homeUnitId,homeLookup:homeUnit(u.person)?.id};
        }""")
        check("C: owned R survives actual reload", c["id"] == fresh_pull["id"] and c["owned"] == fresh_pull["owned"], c)
        check("C: party/selected/home survive reload", c["party"] == fresh_pull["party"] and c["home"] == c["selected"] == c["homeLookup"] == fresh_pull["id"], c)

        # Deterministic large-sample distributions (pity remains active at 100).
        dist = page.evaluate("""() => {
          const rand=(()=>{let x=0x12345;return ()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296}})();
          const sample=(mode,n)=>{gachaMode=mode;S.gachaPity=0;S.gachaSrStreak=0;
            const counts={R:0,SR:0,SSR:0,UR:0};
            for(let i=0;i<n;i++)counts[rollNormalGachaRarity(rand())]++;
            return counts;};
          const normal=sample('normal',100000),new19=sample('new19',100000);
          S=fresh();S.gameStarted=true;S.onboarding.enabled=false;
          S.quests.q73={complete:true};gachaMode='new19';
          const pool=availableNormalPool(),draws=[];
          if(pool.length)for(let i=0;i<2000;i++)draws.push(drawNormalGachaUnit(rand()).rarity);
          const normalUi=(()=>{gachaMode='normal';return recruitmentDetailsMarkup()})();
          const newUi=(()=>{gachaMode='new19';return recruitmentDetailsMarkup()})();
          gachaMode='normal';
          return {normal,new19,new19Pool:pool.length,drawn:draws.length,new19R:draws.filter(x=>x==='R').length,
                  normalUiR:normalUi.includes('60%'),newUiNoR:!newUi.includes('60%')&&newUi.includes('80%')};
        }""")
        for mode, expected in [("normal", {"R":60,"SR":25,"SSR":10,"UR":5}),("new19", {"R":0,"SR":80,"SSR":15,"UR":5})]:
            check(mode + " large-sample distribution", all(abs(dist[mode][r]/1000-expected[r]) < 1.0 for r in expected), dist[mode])
        check("new19 has eligible SR/SSR/UR units and no R/throws", dist["new19Pool"] >= 3 and dist["drawn"] == 2000 and dist["new19R"] == 0, dist)
        check("displayed rate table matches selected banner", dist["normalUiR"] and dist["newUiNoR"], dist)

        # Real screen bounds, while approved art files are deliberately absent.
        mobile = []
        for w,h in [(390,844),(568,320),(844,390),(926,428),(1280,800)]:
            page.set_viewport_size({"width":w,"height":h})
            v=page.evaluate("""() => {
              S=fresh();S.gameStarted=true;S.onboarding.enabled=false;
              view='gacha';gachaMode='normal';render();
              return {width:document.documentElement.scrollWidth,viewport:innerWidth,
                      rVisible:document.querySelector('.gacha-v030-rarity-block:last-child h4')?.textContent.includes('R')||false};
            }""")
            mobile.append({"size":[w,h],**v})
            check(f"mobile {w}x{h}: no horizontal overflow", v["width"] <= w+2, v)
            check(f"mobile {w}x{h}: R lineup shown", v["rVisible"], v)
            if (w,h) in [(390,844),(844,390)]:
                page.screenshot(path=str(OUT / f"r_gacha_{w}x{h}.png"), full_page=True)
        check("no browser JavaScript exceptions", not errors, errors)
        report={"status":"PASS","checked":len(checks),"registry":registry,"migration_A":a,"migration_B":b,
                "save_C":{"id":c["id"],"owned":c["owned"],"party":c["party"]},
                "distribution":dist,"mobile":mobile,"page_errors":errors}
        (OUT / "results.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
        print(json.dumps({"status":"PASS","checks":len(checks),"normal":dist["normal"],
                          "new19":dist["new19"],"new19_draws":dist["drawn"],
                          "new19_R":dist["new19R"],"mobile":mobile},ensure_ascii=False))
        browser.close()
finally:
    srv.shutdown()
