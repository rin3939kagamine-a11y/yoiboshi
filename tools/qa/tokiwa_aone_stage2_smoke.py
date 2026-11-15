#!/usr/bin/env python3
"""Tokiwa Aone stage-2 SR: source-only scope and real-browser regression QA."""
import json, subprocess, threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
def main_source(path):
    return subprocess.check_output(["git","show",f"origin/main:{path}"],cwd=ROOT,text=True)
old_game=main_source("js/game.js")
new_game=(ROOT/"js/game.js").read_text()
old_perf=main_source("js/performance_v016.js")
new_perf=(ROOT/"js/performance_v016.js").read_text()
old_index=main_source("index.html")
new_index=(ROOT/"index.html").read_text()

# Regression after the Aone unit is already merged on main:
# compare immutable legacy definitions, not the historical PR #91 before/after diff.
for token in ('const KEY=','const ROLES=','const RATE=','const NEW19_RATE=',
              'const GACHA_CONFIG=','const NORMAL_GACHA_POOL=',
              'const NEW19_GACHA_POOL=','function drawNormalGachaUnit(',
              'function rollNormalGachaRarity(','function migrateSave('):
    i=old_game.index(token);j=new_game.index(token)
    assert old_game[i:old_game.index('\\n',i)]==new_game[j:new_game.index('\\n',j)],('core drift',token)
i=old_game.index('const UNITS=[');j=new_game.index('const UNITS=[')
assert old_game[i:old_game.index('\\n];',i)+3]==new_game[j:new_game.index('\\n];',j)+3]
assert (ROOT/'js/heroines_v0830_units.js').read_text()==main_source('js/heroines_v0830_units.js')
assert '...NEW_UNIT_ROSTER_V0830' in old_game and '...NEW_UNIT_ROSTER_V0830' in new_game
assert '...NEW_UNIT_ARTWORK_V0830' in old_game and '...NEW_UNIT_ARTWORK_V0830' in new_game
assert '...NEW_UNIT_DESIGN_V0830' in old_perf and '...NEW_UNIT_DESIGN_V0830' in new_perf
assert 'js/heroines_v0830_units.js' in old_index and 'js/heroines_v0830_units.js' in new_index
assert 'js/heroines_v0840_units.js' in new_index and '...NEW_UNIT_ROSTER_V0840' in new_game

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
server=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
out=ROOT/"qa_artifacts/tokiwa_aone_stage2";out.mkdir(parents=True,exist_ok=True)
report={}
try:
 with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,args=["--no-sandbox"])
    page=browser.new_page(viewport={"width":390,"height":844})
    js_errors=[]
    page.on("pageerror",lambda err:js_errors.append(str(err)))
    page.goto(f"http://127.0.0.1:{server.server_port}/index.html",wait_until="load",timeout=90000)
    page.wait_for_function("typeof S!=='undefined' && typeof NEW_UNIT_ROSTER_V0830!=='undefined' && typeof UNIT_DESIGN!=='undefined'")
    data=page.evaluate("""() => {
      const id='tokiwa_aone_work',u=BYID[id];
      gachaMode='normal';
      const empty=fresh(),q3=fresh(),q6=fresh();
      q3.quests.q3={complete:true};
      q6.quests.q6={complete:true};
      const eligible=save=>availableNormalPool(save).some(x=>x.id===id);
      const previous=fresh();
      previous.owned.momoka_work={lv:12,aff:35,lb:2,copies:3};
      previous.owned.milku_work={lv:5,aff:15,lb:0,copies:1};
      previous.party=['momoka_work','milku_work'];
      previous.selected='momoka_work';
      previous.homeFavorite='momoka';
      previous.homeUnitId='momoka_work';
      previous.gems=1234;previous.gold=4567;previous.pulls=19;
      previous.quests.q2={complete:true};
      previous.storyFlags={...previous.storyFlags,qaOldStory:true};
      const oldJSON=JSON.stringify(previous);
      const migrated=migrateSave(JSON.parse(oldJSON));
      const stable={
        owned:['momoka_work','milku_work'].every(id=>JSON.stringify(migrated.owned[id])===JSON.stringify(previous.owned[id])),
        party:JSON.stringify(migrated.party)===JSON.stringify(previous.party),
        selected:migrated.selected===previous.selected,
        homeFavorite:migrated.homeFavorite===previous.homeFavorite,
        homeUnitId:migrated.homeUnitId===previous.homeUnitId,
        money:migrated.gems===1234&&migrated.gold===4567&&migrated.pulls===19,
        progress:migrated.quests.q2.complete===true&&migrated.storyFlags.qaOldStory===true,
        noNewOwned:!migrated.owned[id]
      };
      const rates=JSON.parse(JSON.stringify(RATE));
      const pool=NORMAL_GACHA_POOL.filter(x=>x.rarity==='SR');
      const old=BYID.momoka_work;
      const previousKaho=BYID.sakakibara_kaho_work;
      const previousRirika=BYID.minase_ririka_work;
      return {
        id,exists:!!u,title:u?.title,person:u?.person,rarity:u?.rarity,role:u?.role,
        skills:[unitSkillType(u,0),unitSkillType(u,1)],labels:u?.s,
        descriptions:[skillDescription(u,0),skillDescription(u,1)],
        passive:unitPassive(u),value:passiveValue(u),passiveDescription:passiveDescription(u),
        stats:ROLES[u.role],otherStats:[ROLES.attacker,ROLES.healer,ROLES.tank],
        portrait:UNIT_ARTWORK[id]?.portrait,
        normalRegistered:NORMAL_GACHA_POOL.some(x=>x.id===id),
        specialAbsent:!NEW19_GACHA_POOL.some(x=>x.id===id),
        unready:eligible(empty),q3:eligible(q3),q6:eligible(q6),
        srCount:pool.length,allUnique:new Set(UNITS.map(x=>x.id)).size===UNITS.length,
        rates,gachaCost:[GACHA_CONFIG.ONE_COST,GACHA_CONFIG.TEN_COST],
        key:SaveStore.key,stable,
        oldUnit:{skills:[unitSkillType(old,0),unitSkillType(old,1)],passive:unitPassive(old),rarity:old.rarity},
        existingStages:{kaho:[unitSkillType(previousKaho,0),unitSkillType(previousKaho,1)],
          ririka:[unitSkillType(previousRirika,0),unitSkillType(previousRirika,1)]}
      };
    }""")
    assert data["exists"] and data["id"]=="tokiwa_aone_work",data
    assert (data["person"],data["title"],data["rarity"],data["role"])==("tokiwa_aone","音が灯る舞台裏","SR","support"),data
    assert data["skills"]==["enemy_ct","ct"] and data["labels"]==["ミュートの合図","次の一拍"],data
    assert data["passive"]=={"type":"ct_focus","name":"音の先読み"} and data["value"]==7,data
    assert data["stats"]["hp"]==165 and data["stats"]["atk"]==11 and data["stats"]["def"]==5,data
    assert data["stats"]["atk"]<data["otherStats"][0]["atk"],data
    assert data["normalRegistered"] and data["specialAbsent"] and not data["unready"] and not data["q3"] and data["q6"],data
    assert data["rates"]=={"R":60,"SR":25,"SSR":10,"UR":5} and data["gachaCost"]==[120,1000],data
    assert data["key"]=="yoiboshi-reboot-v1",data
    assert data["allUnique"] and data["srCount"]==159,data
    assert all(data["stable"].values()),data
    assert data["oldUnit"]["skills"]==["ct","stun"] and data["oldUnit"]["rarity"]=="SR",data
    assert data["existingStages"]=={"kaho":["attack_up","attack_down"],"ririka":["heal_one","cleanse"]},data
    assert data["portrait"].endswith("pink_underlayer_black_street_v3_regenerated_CANDIDATE.png"),data
    assert "2.6" in data["descriptions"][0] and "2.3" in data["descriptions"][1],data
    # No real save persists; isolate combat using an in-memory mock battle, while
    # invoking the real existing action engine and its actual cooldown changes.
    effects=page.evaluate("""() => {
      S=fresh();S.owned.tokiwa_aone_work={lv:1,aff:0,lb:0,copies:0};
      battle={qid:'q2',sim:10,phase:'fight',done:false,wave:0,totalWaves:1,
       log:[],popups:[],allies:[
        {id:'tokiwa_aone_work',hp:90,max:100,atk:11,def:5,cooldowns:[0,0],x:15,y:30},
        {id:'momoka_work',hp:85,max:100,atk:11,def:5,cooldowns:[20,24],x:25,y:35}],
       enemies:[{name:'QA敵',hp:150,max:150,attackTimer:1,interval:2.1,x:70,y:30}]};
      const before=battle.enemies[0].attackTimer;
      applySkill(0,0,'enemy',0);
      const after=battle.enemies[0].attackTimer;
      const cooldownBefore=battle.allies[1].cooldowns.slice();
      applySkill(0,1,'ally',1);
      const cooldownAfter=battle.allies[1].cooldowns.slice();
      const selfCooldown=battle.allies[0].cooldowns.slice();
      const details={before,after,cooldownBefore,cooldownAfter,selfCooldown,log:battle.log.slice()};
      battle=null;
      return details;
    }""")
    assert abs(effects["after"]-effects["before"]-2.6)<1e-9,effects
    assert all(abs((x-y)-(2.3*1.07))<1e-9 for x,y in zip(effects["cooldownBefore"],effects["cooldownAfter"])),effects
    assert not js_errors,js_errors
    report={"status":"PASS","data":data,"combat_effects":effects,"page_errors":js_errors,"source_diff":"approved additive changes only"}
    browser.close()
finally:
 server.shutdown()
(out/"result.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print("TOKIWA AONE STAGE2 PASS",json.dumps(report,ensure_ascii=False),flush=True)
