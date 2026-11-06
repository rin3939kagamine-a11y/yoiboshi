"""Real-browser migration regression for Ver.0.49.2.0. No live save is modified."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright
import json

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

srv = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory="."))
Thread(target=srv.serve_forever, daemon=True).start()
errors = []
try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
        page = browser.new_page()
        page.on("pageerror", lambda err: errors.append(str(err)))
        base = f"http://127.0.0.1:{srv.server_port}"
        page.goto(base + "/index.html", wait_until="load", timeout=120000)
        page.wait_for_function("typeof load==='function' && typeof migrateSave==='function'")
        source = page.evaluate("""() => {
            const legacy = n => 'con'+'cept'+n;
            const raw = fresh();
            raw.owned[legacy('13')+'_work'] = {lv:7,aff:26,lb:2,copies:1};
            raw.owned[legacy('17')+'_work'] = {lv:12,aff:42,lb:3,copies:2};
            raw.owned[legacy('22')+'_sky'] = {lv:4,aff:11,lb:0,copies:0};
            raw.party = [legacy('17')+'_work'];
            raw.selected = legacy('17')+'_work';
            raw.homeFavorite = legacy('17');
            raw.homeUnitId = legacy('17')+'_work';
            raw.seasideMet = true;
            raw.bondRead[legacy('17')] = [true,true,false,false,false];
            raw.bondLastTopic[legacy('17')] = 3;
            raw.love.affection[legacy('17')] = 42;
            raw.love.met[legacy('17')] = true;
            raw.love.activeHero = legacy('17');
            raw.love.visits[legacy('17')] = {park:2};
            raw.storyFlags[legacy('17')+'_reveal'] = true;
            raw.legacyFutureField = {byPerson:{[legacy('17')]:['named '+legacy('17')] }};
            return raw;
        }""")
        page.evaluate("save => localStorage.setItem('yoiboshi-reboot-v1', JSON.stringify(save))", source)
        page.reload(wait_until="load")
        page.wait_for_function("typeof load==='function'")
        check = page.evaluate("""() => {
            const legacy = n => 'con'+'cept'+n;
            const raw = JSON.parse(localStorage.getItem('yoiboshi-reboot-v1'));
            const once = migrateLegacyConceptSave(raw);
            const twice = migrateLegacyConceptSave(once);
            const m = load();
            const hero = HERO_IDS;
            const gallery = {heroes:hero.length,unique:new Set(hero).size,depth:Object.keys(CHARACTER_DEPTH_V1).length};
            const before = localStorage.getItem('yoiboshi-reboot-v1');
            const after = localStorage.getItem('yoiboshi-reboot-v1');
            return {
                gallery,
                idempotent:JSON.stringify(once)===JSON.stringify(twice),
                oldSaveUnmodified:before===after,
                oldSaveHasLegacy:Object.keys(raw.owned).includes(legacy('17')+'_work'),
                units:{
                    ena:m.owned.ena_work,mai:m.owned.mai_work,yume:m.owned.yume_sky,
                    old:!!m.owned[legacy('17')+'_work']
                },
                party:m.party,selected:m.selected,homeFavorite:m.homeFavorite,homeUnitId:m.homeUnitId,
                affection:m.love.affection.ena,visits:m.love.visits.ena,
                bondRead:m.bondRead.ena,bondLastTopic:m.bondLastTopic.ena,
                progress:m.storyFlags.ena_reveal,
                extension:m.legacyFutureField?.byPerson?.ena,
                names:{ena:PEOPLE.ena?.name,riko:PEOPLE.riko?.name},
                hasNewRegistry:!!BYID.ena_work&&BYID.ena_work.person==='ena'
            };
        }""")
        assert check["gallery"] == {"heroes":79,"unique":79,"depth":79}, check
        assert check["idempotent"] and check["oldSaveHasLegacy"] and check["oldSaveUnmodified"],check
        assert check["units"]["ena"]["lv"] == 12 and check["units"]["ena"]["aff"] == 42,check
        assert check["units"]["mai"]["lv"] == 7 and check["units"]["yume"]["lv"] == 4,check
        assert check["units"]["old"] is False and check["hasNewRegistry"],check
        assert check["party"] == ["ena_work"] and check["selected"] == "ena_work",check
        assert check["homeFavorite"] == "ena" and check["homeUnitId"] == "ena_work",check
        assert check["bondRead"][:2] == [True,True] and check["bondLastTopic"] == 3,check
        assert check["affection"] == 42 and check["visits"].get("park") == 2,check
        assert check["progress"] and check["extension"] == ["named ena"],check
        assert check["names"]["ena"] == "天音 エナ" and "莉子" in check["names"]["riko"],check
        # Gallery has its own storage key: old work-unit favorites must survive.
        page.goto(base + "/sr_gallery.html", wait_until="load")
        page.evaluate("""() => localStorage.setItem('yoiboshi-sr-gallery-favs', JSON.stringify(['con'+'cept17_work']))""")
        page.reload(wait_until="load")
        gallery = page.evaluate("""() => ({
            count:data.length,unique:new Set(data.map(x=>x.id)).size,
            ena:data.find(x=>x.id==='ena_work')?.name,
            riko:data.find(x=>x.id==='riko_work')?.name,
            favorite:favs.has('ena_work')
        })""")
        assert gallery["count"] == gallery["unique"] == 79,gallery
        assert gallery["ena"] == "エナ" and "莉子" in gallery["riko"] and gallery["favorite"],gallery
        assert not errors,errors
        print(json.dumps({"status":"PASS","save_migration":check,"sr_gallery":gallery,"js_errors":errors},ensure_ascii=False))
        browser.close()
finally:
    srv.shutdown()
