#!/usr/bin/env python3
"""Stage-2 SR unit regression QA; no game data modification."""
import json, re, subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
def git_main(path):
    return subprocess.check_output(['git','show',f'origin/main:{path}'],cwd=ROOT,text=True)
old=git_main('js/game.js')
now=(ROOT/'js/game.js').read_text()
for token in ['const KEY=','const RATE=','const GACHA_CONFIG=','const NORMAL_GACHA_POOL=','const NEW19_GACHA_POOL=',
              'function rollNormalGachaRarity(','function drawNormalGachaUnit(','function migrateSave(']:
    def definition(src):
        start=src.index(token)
        return src[start:src.index('\n',start)]
    assert definition(now)==definition(old),('core changed',token)
for token in ['const UNITS=[','const LEGACY_CONCEPT_IDS=']:
    start1=old.index(token); start2=now.index(token)
    end='\n];' if token=='const UNITS=[' else '\n'
    left=old[start1:old.index(end,start1)+len(end)]
    right=now[start2:now.index(end,start2)+len(end)]
    if token=='const UNITS=[':
        for id in ('tsubaki_work','erika_work','kaede_work'):
            left,n=re.subn(r"(\{id:'"+id+r"'[^{}]*?rarity:')SR(')",r"\g<1>R\g<2>",left)
            assert n==1,id
    assert left==right,('unapproved existing data changed',token)
assert "const NEW19_RATE=Object.freeze({SR:80,SSR:15,UR:5})" in old
assert "const NEW19_RATE=Object.freeze({R:80,SR:0,SSR:15,UR:5})" in now
assert "NEW_UNIT_ROSTER_V0810" in now
assert len([x for x in ['sakakibara_kaho_work','minase_ririka_work'] if x in (ROOT/'js/heroines_v0810_units.js').read_text()])==2

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_port}/index.html'
results={}
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
    pg=browser.new_page(viewport={'width':390,'height':844})
    errors=[]
    pg.on('pageerror',lambda e:errors.append(str(e)))
    pg.goto(url,wait_until='load',timeout=90000)
    pg.wait_for_function("typeof S!=='undefined' && typeof NEW_UNIT_ROSTER_V0810!=='undefined'")
    data=pg.evaluate("""() => {
      const ids=['sakakibara_kaho_work','minase_ririka_work'];
      const s=fresh(), out={};
      S=s;S.gameStarted=true;
      out.key=SaveStore.key;
      out.rates=JSON.parse(JSON.stringify(RATE));
      out.units=ids.map(id=>({id,exists:!!BYID[id],rarity:BYID[id]?.rarity,person:BYID[id]?.person,role:BYID[id]?.role,
        skills:[unitSkillType(BYID[id],0),unitSkillType(BYID[id],1)],
        labels:BYID[id]?.s,
        passive:unitPassive(BYID[id]),passiveValue:passiveValue(BYID[id]),skill0:skillDescription(BYID[id],0),skill1:skillDescription(BYID[id],1)}));
      out.duplicateIds=UNITS.length-new Set(UNITS.map(u=>u.id)).size;
      out.normalMembers=ids.map(id=>NORMAL_GACHA_POOL.some(u=>u.id===id));
      out.before=ids.map(id=>availableNormalPool(S).some(u=>u.id===id));
      S.quests.q3={complete:true};
      out.q3=ids.map(id=>availableNormalPool(S).some(u=>u.id===id));
      S.quests.q6={complete:true};
      out.q6=ids.map(id=>availableNormalPool(S).some(u=>u.id===id));
      out.specialPoolClean=ids.every(id=>!NEW19_GACHA_POOL.some(u=>u.id===id));
      const saved=fresh();
      saved.owned.momoka_work={lv:3,aff:22,lb:1,copies:2};
      saved.owned.milku_work={lv:2,aff:11,lb:0,copies:0};
      saved.party=['momoka_work','milku_work'];
      saved.selected='momoka_work';saved.homeFavorite='momoka';saved.homeUnitId='momoka_work';
      saved.gems=1234;saved.gold=4321;saved.pulls=17;
      saved.quests.q2={complete:true};saved.storyFlags={...saved.storyFlags,qaLegacyProgress:true};
      const loaded=migrateSave(JSON.parse(JSON.stringify(saved)));
      out.save={
        owned:JSON.stringify(loaded.owned.momoka_work)===JSON.stringify(saved.owned.momoka_work)&&
          JSON.stringify(loaded.owned.milku_work)===JSON.stringify(saved.owned.milku_work),
        party:JSON.stringify(loaded.party)===JSON.stringify(saved.party),
        selected:loaded.selected===saved.selected,homeFavorite:loaded.homeFavorite===saved.homeFavorite,
        homeUnitId:loaded.homeUnitId===saved.homeUnitId,
        money:loaded.gems===1234&&loaded.gold===4321&&loaded.pulls===17,
        progress:loaded.quests.q2.complete&&loaded.storyFlags.qaLegacyProgress,
        missingNew:ids.every(id=>!loaded.owned[id])
      };
      // Existing combat type/trait expectations stay unmodified.
      const oldUnit=BYID.momoka_work;
      out.oldUnit={skills:[unitSkillType(oldUnit,0),unitSkillType(oldUnit,1)],
        passive:unitPassive(oldUnit).type,rarity:oldUnit.rarity};
      return out;
    }""")
    assert data['key']=='yoiboshi-reboot-v1',data
    assert data['rates']=={'R':60,'SR':25,'SSR':10,'UR':5},data
    assert data['duplicateIds']==0,data
    assert data['normalMembers']==[True,True] and data['before']==[False,False] and data['q3']==[False,True] and data['q6']==[True,True],data
    assert data['specialPoolClean'],data
    assert all(data['save'].values()),data
    a,b=data['units']
    assert (a['rarity'],a['role'],a['skills'],a['passive']['type'],a['passiveValue'])==('R','support',['attack_up','attack_down'],'attack_down_extend',1.5),a
    assert (b['rarity'],b['role'],b['skills'],b['passive']['type'],b['passiveValue'])==('R','healer',['heal_one','cleanse'],'rescue',10),b
    assert a['labels']==['展示室の灯り','余白をつくる'] and b['labels']==['やさしい衣装直し','レースをほどいて'],data
    assert data['oldUnit']['skills']==['ct','stun'] and data['oldUnit']['rarity']=='SR',data
    assert not errors,errors
    results={'qa':'PASS','data':data,'pageerrors':errors}
    browser.close()
server.shutdown()
path=ROOT/'qa_artifacts/stage2_v0810';path.mkdir(parents=True,exist_ok=True)
(path/'result.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps(results,ensure_ascii=False,indent=2),flush=True)
