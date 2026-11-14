#!/usr/bin/env python3
"""Chromium QA for stage-1 Aone romance (no units and no changed old saves)."""
import json,hashlib,subprocess
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from PIL import Image
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[2]
old=subprocess.check_output(['git','show','origin/main:js/game.js'],cwd=ROOT,text=True)
now=(ROOT/'js/game.js').read_text()
for term in ['const KEY=','const UNITS=[','UNITS.push(','const RATE=','const NEW19_RATE=','const GACHA_CONFIG=',
             'const NORMAL_GACHA_POOL=','const NEW19_GACHA_POOL=','function migrateSave(','function drawNormalGachaUnit(']:
    a=old.index(term);b=now.index(term)
    end='\n];' if term=='const UNITS=[' else '\n'
    assert old[a:old.index(end,a)+len(end)]==now[b:now.index(end,b)+len(end)],('protected code changed',term)
path=ROOT/'assets/provisional/2026-11-11_pink_underlayer_standee/full_body/pink_underlayer_black_street_v3_regenerated_CANDIDATE.png'
raw=path.read_bytes()
assert hashlib.sha256(raw).hexdigest()=='885a26ea2974115b7840101c17e85f84890faf19e2b364d7f726603a89183dc1'
with Image.open(path) as im:
 assert im.mode=='RGBA' and im.size==(1024,1536) and im.getchannel('A').getextrema()[0]==0
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a): pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_port}/index.html'
res={}
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
 for mode,w,h in [('portrait',390,844),('landscape',844,390)]:
  ctx=browser.new_context(viewport={'width':w,'height':h})
  page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(url,wait_until='load',timeout=90000)
  page.wait_for_function("typeof S!=='undefined' && typeof ROMANCE_V0830!=='undefined'",timeout=45000)
  data=page.evaluate("""() => {
    const id='tokiwa_aone',meeting='v0830_meet_'+id;
    const out={};
    S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
    out.key=SaveStore.key;out.rate=JSON.parse(JSON.stringify(RATE));
    out.poolInitial=NORMAL_GACHA_POOL.map(u=>u.id);
    out.noUnit=!UNITS.some(u=>u.person===id);
    out.noNormal= !NORMAL_GACHA_POOL.some(u=>u.person===id);
    out.noNew19=!NEW19_GACHA_POOL.some(u=>u.person===id);
    out.idOnce=NEW_HERO_IDS_V0830.length===1 && NEW_HERO_IDS_V0830[0]===id;
    out.name=PEOPLE[id]?.name;
    out.profile=HEROINE_PROFILES_ALL[id];
    out.bonds=Object.keys(ROMANCE_V0830[id].stories).length;
    out.depth=CHARACTER_DEPTH_V0830[id];
    out.before={talk:romanceHeroAvailable(id),meeting:storyAllowed(meeting)};
    S.quests.q6={complete:true};
    out.after={talk:romanceHeroAvailable(id),meeting:storyAllowed(meeting)};
    out.poolUnchanged=JSON.stringify(out.poolInitial)===JSON.stringify(NORMAL_GACHA_POOL.map(u=>u.id));
    out.images=[ART_V2.full_body[id],ART_V2.upper_body[id],ART_V2.face_icons[id]];
    out.meetRequires=V0830_MEET_STORIES[meeting]?.requires;
    S.love.activeHero=id;view='talk';render();
    out.screen={name:document.querySelector('.v676-talk-nameplate span')?.textContent?.trim()||'',
      episodes:document.querySelectorAll('.v676-episode').length,
      topics:document.querySelectorAll('.romance-topics button').length,
      depth:document.querySelectorAll('.character-depth').length,
      img:document.querySelector('.v676-talk-portrait img')?.getAttribute('src')||'',
      width:innerWidth,height:innerHeight};
    out.episodes=[];
    for(let i=0;i<5;i++){const entry=ROMANCE_V0830[id].stories['bond_'+id+'_'+i];out.episodes.push([entry?.threshold,entry?.person,entry?.lines?.length]);}
    setHeroAff(id,20);
    out.bondFirst=bondAvailable(id,0);
    try{openBondEpisode(id,0);out.bondOpened=storySession?.id==='bond_'+id+'_0';}catch(e){out.bondError=String(e);}
    storySession=null;view='talk';
    const gems=S.gems;
    openStory(meeting);out.meetOpened=storySession?.id===meeting&&view==='story';
    if(out.meetOpened)finishStory();
    out.meetFinished=S.storyFlags?.[meeting]===true && view==='talk';
    out.noReward=S.gems===gems;
    const saved=fresh();
    saved.owned.momoka_work={lv:3,aff:22,lb:1,copies:2};saved.owned.milku_work={lv:2,aff:10,lb:0,copies:1};
    saved.party=['momoka_work','milku_work'];saved.selected='momoka_work';saved.homeFavorite='momoka';saved.homeUnitId='momoka_work';
    saved.gems=1234;saved.gold=4321;saved.pulls=23;saved.quests.q2={complete:true};saved.storyFlags.qaLegacy=true;
    const restored=migrateSave(JSON.parse(JSON.stringify(saved)));
    out.oldSave={
      owned:JSON.stringify(restored.owned.momoka_work)===JSON.stringify(saved.owned.momoka_work)
         &&JSON.stringify(restored.owned.milku_work)===JSON.stringify(saved.owned.milku_work),
      party:JSON.stringify(restored.party)===JSON.stringify(saved.party),
      selected:restored.selected===saved.selected,
      home:restored.homeFavorite===saved.homeFavorite&&restored.homeUnitId===saved.homeUnitId,
      money:restored.gems===1234&&restored.gold===4321&&restored.pulls===23,
      quests:restored.quests.q2.complete&&restored.storyFlags.qaLegacy,
      newUnitAbsent:!Object.keys(restored.owned).some(k=>k.startsWith('tokiwa_aone'))
    };
    return out;
  }""")
  assert data['key']=='yoiboshi-reboot-v1',data
  assert data['rate']=={'R':60,'SR':25,'SSR':10,'UR':5},data
  assert data['idOnce'] and data['noUnit'] and data['noNormal'] and data['noNew19'] and data['poolUnchanged'],data
  assert data['name']=='常盤 碧音' and data['profile']['age']==25 and '音響・照明' in data['profile']['occupation'],data
  assert data['bonds']==5 and [x[0] for x in data['episodes']]==[20,40,60,80,100],data
  assert all(x[1]=='tokiwa_aone' and x[2]>=5 for x in data['episodes']),data
  assert data['before']=={'talk':False,'meeting':False} and data['after']=={'talk':True,'meeting':True},data
  assert data['meetRequires']==['q6'] and data['meetOpened'] and data['meetFinished'] and data['noReward'],data
  assert data['screen']['name']=='♡ 常盤 碧音' and data['screen']['episodes']==5 and data['screen']['topics']==8 and data['screen']['depth']==1,data
  assert 'pink_underlayer_black_street_v3_regenerated_CANDIDATE.png' in data['screen']['img'],data
  assert all('pink_underlayer_black_street_v3_regenerated_CANDIDATE.png' in s for s in data['images']),data
  assert data['bondFirst'] and data['bondOpened'],data
  assert all(data['oldSave'].values()),data
  assert not errors,errors
  output=ROOT/'qa_artifacts/tokiwa_aone';output.mkdir(parents=True,exist_ok=True)
  page.screenshot(path=str(output/f'{mode}.png'),full_page=True)
  res[mode]={'status':'PASS','data':data,'pageerrors':errors}
  ctx.close()
 browser.close()
server.shutdown()
(ROOT/'qa_artifacts/tokiwa_aone/result.json').write_text(json.dumps(res,ensure_ascii=False,indent=2))
print('TOKIWA AONE CHROMIUM QA PASS',json.dumps(res,ensure_ascii=False),flush=True)
