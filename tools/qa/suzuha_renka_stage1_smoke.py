#!/usr/bin/env python3
"""Chromium portrait + landscape smoke QA for PR #60-approved stage-1 heroines."""
import hashlib, json, subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
IDS = ("chiyozaki_suzuha", "sakuraba_renka")
NAMES = ("千代崎 鈴葉", "櫻場 蓮花")
AGES = (22, 24)
DIGESTS = ("d16fe4f76da2c553a17e9500ac05e10e1f20eeed58faef0980d2eb1e9ad9f02f",
           "32d0177cc3f1c7a5f3a0469b93031a82d835e1343a84f67e4417f605f37b00fd")

# Protected save/gacha/unit parts must remain byte-identical to main at branch point.
old = subprocess.check_output(["git", "show", "origin/main:js/game.js"], cwd=ROOT, text=True)
now = (ROOT / "js/game.js").read_text()
for term in ("const KEY=", "const UNITS=[", "UNITS.push(", "const RATE=", "const NEW19_RATE=",
             "const GACHA_CONFIG=", "const NORMAL_GACHA_POOL=", "const NEW19_GACHA_POOL=",
             "function migrateSave(", "function drawNormalGachaUnit("):
    a, b = old.index(term), now.index(term)
    end = "\n];" if term == "const UNITS=[" else "\n"
    assert old[a:old.index(end, a)+len(end)] == now[b:now.index(end, b)+len(end)], ("protected change", term)

for id, digest in zip(IDS, DIGESTS):
    original = ROOT / "assets/ART_V2/full_body" / f"{id}.png"
    assert hashlib.sha256(original.read_bytes()).hexdigest() == digest, (id, "SHA mismatch")
    with Image.open(original) as im:
        assert im.format == "PNG" and im.mode == "RGBA" and im.size == (1024, 1536)
        assert im.getchannel("A").getextrema()[0] == 0
    for slot, size in (("upper_body", (720, 960)), ("face_icons", (400, 400))):
        path = ROOT / "assets/ART_V2" / slot / f"{id}.webp"
        assert path.exists(), (id, slot, "crop missing")
        with Image.open(path) as im:
            assert im.format == "WEBP" and im.mode == "RGBA" and im.size == size
            assert im.getchannel("A").getextrema()[0] == 0

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

server = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=str(ROOT)))
Thread(target=server.serve_forever, daemon=True).start()
url = f"http://127.0.0.1:{server.server_port}/index.html"
result = {}
try:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
        for mode, w, h in (("portrait", 390, 844), ("landscape", 844, 390)):
            ctx = browser.new_context(viewport={"width": w, "height": h})
            page = ctx.new_page()
            errors = []
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.goto(url, wait_until="load", timeout=90000)
            page.wait_for_function("typeof S!=='undefined' && typeof ROMANCE_V0840!=='undefined'", timeout=45000)
            outputs = {}
            for id, name, age in zip(IDS, NAMES, AGES):
                data = page.evaluate("""(id) => {
                  const meet='v0840_meet_'+id;
                  S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
                  const r={};
                  r.key=SaveStore.key;r.rate=JSON.parse(JSON.stringify(RATE));
                  r.pool=NORMAL_GACHA_POOL.map(u=>u.id);
                  r.noUnit=!UNITS.some(u=>u.person===id);
                  r.noNormal=!NORMAL_GACHA_POOL.some(u=>u.person===id);
                  r.noNew19=!NEW19_GACHA_POOL.some(u=>u.person===id);
                  r.ids=NEW_HERO_IDS_V0840;
                  r.profile=HEROINE_PROFILES_ALL[id];r.name=PEOPLE[id]?.name;
                  r.flame=HEROINE_PROFILES_ALL[id]?.tomoshibi;
                  r.depth=CHARACTER_DEPTH_V0840[id];
                  r.bonds=Object.keys(ROMANCE_V0840[id].stories).length;
                  r.before={talk:romanceHeroAvailable(id),meeting:storyAllowed(meet)};
                  S.quests.q6={complete:true};
                  r.after={talk:romanceHeroAvailable(id),meeting:storyAllowed(meet)};
                  r.images=[ART_V2.full_body[id],ART_V2.upper_body[id],ART_V2.face_icons[id]];
                  r.meetRequires=V0840_MEET_STORIES[meet]?.requires;
                  r.episodes=Array.from({length:5},(_,i)=>{
                    const s=ROMANCE_V0840[id].stories['bond_'+id+'_'+i];
                    return [s?.threshold,s?.person,s?.lines?.length];
                  });
                  S.love.activeHero=id;view='talk';render();
                  r.screen={
                    name:document.querySelector('.v676-talk-nameplate span')?.textContent?.trim()||'',
                    episodes:document.querySelectorAll('.v676-episode').length,
                    topics:document.querySelectorAll('.romance-topics button').length,
                    depth:document.querySelectorAll('.character-depth').length,
                    img:document.querySelector('.v676-talk-portrait img')?.getAttribute('src')||''
                  };
                  setHeroAff(id,20);r.bondFirst=bondAvailable(id,0);
                  try{openBondEpisode(id,0);r.bondOpened=storySession?.id==='bond_'+id+'_0';}
                  catch(e){r.bondError=String(e)}
                  storySession=null;view='talk';
                  const gems=S.gems;
                  openStory(meet);r.meetOpened=storySession?.id===meet&&view==='story';
                  if(r.meetOpened)finishStory();
                  r.meetFinished=S.storyFlags?.[meet]===true&&view==='talk';
                  r.noMeetReward=S.gems===gems;
                  r.poolUnchanged=JSON.stringify(r.pool)===JSON.stringify(NORMAL_GACHA_POOL.map(u=>u.id));
                  const saved=fresh();
                  saved.owned.momoka_work={lv:3,aff:22,lb:1,copies:2};
                  saved.owned.milku_work={lv:2,aff:10,lb:0,copies:1};
                  saved.party=['momoka_work','milku_work'];saved.selected='momoka_work';
                  saved.homeFavorite='momoka';saved.homeUnitId='momoka_work';
                  saved.gems=1234;saved.gold=4321;saved.pulls=23;saved.quests.q2={complete:true};
                  saved.storyFlags.qaLegacy=true;
                  const restored=migrateSave(JSON.parse(JSON.stringify(saved)));
                  r.oldSave={
                    owned:JSON.stringify(restored.owned.momoka_work)===JSON.stringify(saved.owned.momoka_work)
                      &&JSON.stringify(restored.owned.milku_work)===JSON.stringify(saved.owned.milku_work),
                    party:JSON.stringify(restored.party)===JSON.stringify(saved.party),
                    selected:restored.selected===saved.selected,
                    home:restored.homeFavorite===saved.homeFavorite&&restored.homeUnitId===saved.homeUnitId,
                    money:restored.gems===1234&&restored.gold===4321&&restored.pulls===23,
                    quests:restored.quests.q2.complete&&restored.storyFlags.qaLegacy,
                    newUnitAbsent:!Object.keys(restored.owned).some(k=>k.startsWith(id))
                  };
                  return r;
                }""", id)
                assert data["key"] == "yoiboshi-reboot-v1", (mode,id,data)
                assert data["rate"] == {"R":60,"SR":25,"SSR":10,"UR":5}, (mode,id,data)
                assert data["ids"] == list(IDS) and data["noUnit"] and data["noNormal"] and data["noNew19"], (mode,id,data)
                assert data["name"] == name and data["profile"]["name"] == name and data["profile"]["age"] == age
                assert data["flame"] and data["depth"] and data["poolUnchanged"], (mode,id,data)
                assert data["before"] == {"talk":False,"meeting":False} and data["after"] == {"talk":True,"meeting":True}, (mode,id,data)
                assert data["meetRequires"] == ["q6"] and data["meetOpened"] and data["meetFinished"] and data["noMeetReward"], (mode,id,data)
                assert data["bonds"] == 5 and [a[0] for a in data["episodes"]] == [20,40,60,80,100], (mode,id,data)
                assert all(a[1] == id and a[2] >= 5 for a in data["episodes"]), (mode,id,data)
                assert data["screen"]["name"] == "♡ " + name, (mode,id,data)
                assert data["screen"]["episodes"] == 5 and data["screen"]["topics"] == 8 and data["screen"]["depth"] == 1, (mode,id,data)
                assert data["bondFirst"] and data["bondOpened"], (mode,id,data)
                assert all(data["oldSave"].values()), (mode,id,data)
                assert f"/full_body/{id}.png" in data["screen"]["img"], (mode,id,data)
                for slot, src in zip(("full_body","upper_body","face_icons"),data["images"]):
                    assert f"/{slot}/{id}." in src, (mode,id,slot,src)
                    response = page.request.get(url.rsplit("/",1)[0] + "/" + src, timeout=20000)
                    assert response.status == 200 and len(response.body()) > 1000, (mode,id,slot,response.status)
                outdir = ROOT / "qa_artifacts" / "suzuha_renka"
                outdir.mkdir(parents=True, exist_ok=True)
                page.evaluate("""id=>{S.love.activeHero=id;view='talk';render();}""", id)
                page.screenshot(path=str(outdir/f"{mode}_{id}.png"),full_page=True)
                outputs[id] = data
            assert not errors, (mode,errors)
            result[mode] = {"status":"PASS","data":outputs,"pageerrors":errors}
            ctx.close()
        browser.close()
finally:
    server.shutdown()
outdir = ROOT / "qa_artifacts" / "suzuha_renka"
outdir.mkdir(parents=True, exist_ok=True)
(outdir / "result.json").write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding="utf-8")
print("SUZUHA RENKA CHROMIUM QA PASS",json.dumps({k:v["status"] for k,v in result.items()}),flush=True)
