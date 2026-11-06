"""Ver.0.50.0.1: browser regression of reversible crop+symbol conversation rendering.
Assets are a separate ZIP; this checks rendering logic, paths, motion CSS and save compatibility.
"""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'qa_artifacts'/'symbols_v0500'
OUT.mkdir(parents=True,exist_ok=True)
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
srv=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=['--no-sandbox'])
  page=browser.new_page(viewport={'width':390,'height':844},reduced_motion='no-preference')
  js_errors=[]
  page.on('pageerror',lambda err:js_errors.append(str(err)))
  page.goto(f'http://127.0.0.1:{srv.server_port}/index.html',wait_until='load',timeout=120000)
  page.wait_for_function("typeof symbolReactionEnabledV0500==='function'&&typeof expressionPortraitMarkup==='function'")
  result=page.evaluate("""() => {
   const fail=[],ids=SYMBOL_REACTION_ACTORS_V0500,existing=SYMBOL_REACTION_EXISTING_V0500,newIds=SYMBOL_REACTION_NEW_V0500;
   if(existing.length!==62||newIds.length!==19||ids.length!==81||new Set(ids).size!==81)fail.push('81 registrations');
   for(const id of ids){
    const h=expressionPortraitMarkup(id,'smile','qa:crop:'+id,{eventKey:0});
    if(!h.includes('data-expression-source="symbol"')||!h.includes('symbol-reaction-head'))fail.push(id+':missing symbol');
    const path=artV2TalkCropV0500(id);
    if(!path.endsWith(id+'.webp?v=0.50.0.1'))fail.push(id+':asset registry');
    if(existing.includes(id)&&!path.includes('upper_body_crops_v0500/'))fail.push(id+':unsafe overwrite path');
    if(newIds.includes(id)&&!path.includes('ART_V2/upper_body/'))fail.push(id+':new crop path');
   }
   const cases=[['smile','♪','hop'],['blush','♡','sway'],['surprise','！','jump'],
      ['question','？','tilt'],['confused','💦','recoil'],['angry','💢','shake'],
      ['sad','…','sink'],['kiss','💋','kiss'],['pout','💢','shake']];
   const stage=document.createElement('div');stage.className='v676-talk-portrait expression-stage';document.body.append(stage);
   const current=[];
   for(const [face,glyph,motion] of cases){
    const markup=expressionPortraitMarkup('momoka',face,'qa:react:'+face,{eventKey:0});
    stage.innerHTML=markup;
    const el=stage.querySelector('.symbol-reaction-v0500');
    const symbol=stage.querySelector('.symbol-reaction-head');
    const img=stage.querySelector('img.symbol-reaction-image');
    if(!symbol||!symbol.textContent.includes(glyph)||!el.classList.contains('symbol-motion-'+motion))fail.push(face+':mapping');
    const observed=img?getComputedStyle(img).animationName:'';
    if(img&&!observed.includes('symbolV0500'))fail.push(face+':animation missing '+observed);
    if(symbol&&!getComputedStyle(symbol).animationDuration.includes('1.2s'))fail.push(face+':duration');
    current.push([face,glyph,motion,observed]);
   }
   const serious=expressionPortraitMarkup('momoka','smile','qa:serious',{eventKey:1,sceneTag:'serious'});
   const kiss=expressionPortraitMarkup('momoka','kiss','qa:seriouskiss',{eventKey:1,sceneTag:'serious'});
   if(serious.includes('symbol-reaction-head')||!serious.includes('symbol-motion-hop'))fail.push('serious suppress');
   if(!kiss.includes('symbol-reaction-head')||!kiss.includes('💋')||!kiss.includes('<small>♡</small>'))fail.push('serious kiss');
   const before=JSON.stringify(ART_EXPRESSIONS.momoka);
   for(const id of ['momoka','milku','natsume','saeko','touko','touko_true','juri','kaori']){
    if(!expressionPortraitMarkup(id,'blush','qa:legacy:'+id).includes('data-expression-source="symbol"'))fail.push('unified route:'+id);
   }
   if(JSON.stringify(ART_EXPRESSIONS.momoka)!==before)fail.push('legacy expression table mutated');
   if(!ART_V2.upper_body.momoka)fail.push('legacy upper body removed');
   // Three chapter generations: use unmodified speaker/face cue shape and actual chapter cast renderer.
   const oldSession=storySession;
   for(const [id,who,face] of [['chapter1_open','momoka','smile'],['chapter6_open','natsume','sad'],['chapter13_open','sumire','surprise']]){
    storySession={id,step:0};
    const out=chapterStoryCast({lines:[{who,text:'QA',cue:{target:who,face}}]},0);
    if(!out.includes('data-expression-source="symbol"')||!out.includes('symbol-reaction-head'))fail.push('chapter route '+id);
   }
   storySession=oldSession;
   const noLegacyCrop=expressionPortraitMarkup('sakuya','smile','qa:npc');
   if(noLegacyCrop.includes('data-expression-source="symbol"'))fail.push('non-crop NPC altered');
   const harukaHistorical=expressionPortraitMarkup('haruka','smile','qa:historical',{legacyNpcHaruka:true});
   if(!harukaHistorical.includes('story_cast/haruka_talk.webp'))fail.push('historical haruka not protected');
   const unchangedSave=fresh();if(!unchangedSave||!unchangedSave.owned)fail.push('fresh save failed');
   return {existing:existing.length,new:newIds.length,total:ids.length,mapping:current,
     seriousWorks:!serious.includes('symbol-reaction-head'),explicitKiss:kiss.includes('💋'),oldPortraitRegistered:!!ART_V2.upper_body.momoka,fail};
  }""")
  if result['fail'] or js_errors:raise AssertionError({'result':result,'pageerrors':js_errors})
  for wh in [(390,844),(844,390),(1280,800)]:
   page.set_viewport_size({'width':wh[0],'height':wh[1]})
   report=page.evaluate("()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth})")
   if report['scrollWidth']>wh[0]+2:raise AssertionError({'viewport':wh,'report':report})
  (OUT/'summary.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
  print('PASS: 81 symbol actors, 9 cue mappings, 3 chapter generations, serious kiss, reversible legacy registration')
  print(json.dumps({k:v for k,v in result.items() if k!='mapping'},ensure_ascii=False))
  browser.close()
finally:
 srv.shutdown()
