#!/usr/bin/env python3
"""Chromium validation of all 29 A-route PEOPLE names, without save mutations."""
import json,re,subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[2]
old=subprocess.check_output(['git','show','origin/main:js/game.js'],cwd=ROOT,text=True)
now=(ROOT/'js/game.js').read_text()
for term in ['const KEY=','const UNITS=[','UNITS.push(','const RATE=','const NORMAL_GACHA_POOL=','const NEW19_GACHA_POOL=','function migrateSave(']:
    a=old.index(term);b=now.index(term)
    end='\n];' if term=='const UNITS=[' else '\n'
    assert old[a:old.index(end,a)+len(end)]==now[b:now.index(end,b)+len(end)],('modified protected statement',term)
# Preserve everything except original 29 standalone PEOPLE fallback entries.
old_people=re.search(r'const PEOPLE=\{[^\n]+\};',old).group()
new_people=re.search(r'const PEOPLE=\{[^\n]+\};',now).group()
assert old.replace(old_people,'PEOPLE_BASE')==now.replace(new_people,'PEOPLE_BASE'), 'other game.js logic changed'
ids_map={'yui':'小野寺 結衣','shizuku':'相馬 しずく','suiran':'李 翠蘭','kyoko':'朝比奈 響子','cocoa':'雛森 ここあ',
'mai':'舞','luna':'黒羽 ルナ','makoto':'早瀬 真琴','fumika':'柚木 文香','ena':'天音 エナ',
'riko':'宮下 莉子','noel':'星宮 ノエル','mio':'藍沢 ミオ','jun':'鳴海 ジュン','yume':'春野 ゆめ',
'shino':'灰原 シノ','hiyori':'桃瀬 ひより','ageha':'夜野 あげは','kirari':'日向 きらり','maron':'栗原 まろん',
'koharu':'水瀬 小春','lilith':'姫宮 リリス','shio':'波多野 汐','kaname':'紫藤 カナメ','koyori':'桃瀬 こより',
'marin':'金城 マリン','erika':'城ヶ崎 エリカ','tsubaki':'神楽坂 椿','kaede':'神楽坂 楓'}
assert len(ids_map)==29
for n in range(8,37):
    assert f'ビジュアル候補{n:02d}' not in new_people and f'ビジュアル候補{n}' not in new_people, n
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
srv=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
results={}
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
 for device,w,h in [('portrait',390,844),('landscape',844,390)]:
  context=browser.new_context(viewport={'width':w,'height':h})
  pg=context.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto(f'http://127.0.0.1:{srv.server_port}/index.html',wait_until='load',timeout=90000)
  pg.wait_for_function("typeof S!=='undefined' && typeof HERO_IDS!=='undefined'",timeout=45000)
  found=pg.evaluate("""ids => {
    S=fresh();S.gameStarted=true;
    if(S.onboarding)S.onboarding.enabled=false;
    for(const flag of ['shinonomeMet','oldcafeMet','stationMet','schoolMet','officeMet','seasideMet','lighthouseMet','tsubakiMet','erikaMet','kanameMet','kaedeMet'])S[flag]=true;
    for(const q of ['q1','q2','q3','q4','q5','q6'])S.quests[q]={complete:true};
    const out=[];
    for(const [id,name] of Object.entries(ids)){
      const u=UNITS.find(x=>x.person===id&&!x.id.endsWith('_trial')&&!x.s.some(s=>s.includes('仮スキル')));
      if(u&&!S.owned[u.id])S.owned[u.id]={lv:1,aff:0,lb:0,copies:0};
      S.love.activeHero=id;view='talk';
      let exception=null,display='';
      try{render();display=document.querySelector('.v676-talk-nameplate span')?.textContent?.replace(/^♡\s*/,'').trim()||'';}
      catch(e){exception=String(e)}
      out.push({slot:Number(Object.keys(LEGACY_CONCEPT_IDS).find(k=>LEGACY_CONCEPT_IDS[k]===id)?.slice(-2)),id,expected:name,
        people:PEOPLE[id]?.name,display,available:romanceHeroAvailable(id),exception});
    }
    return out.sort((a,b)=>a.slot-b.slot);
  }""",ids_map)
  for row in found:
   assert row['people']==row['expected'] and row['display']==row['expected'] and row['available'] and not row['exception'],(device,row)
  assert not errs,(device,errs)
  results[device]={'count':len(found),'rows':found,'pageerrors':errs}
  context.close()
 browser.close()
srv.shutdown()
output=ROOT/'qa_artifacts/visual29';output.mkdir(parents=True,exist_ok=True)
(output/'result.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print('VISUAL29 CHROMIUM PASS',json.dumps(results,ensure_ascii=False),flush=True)
