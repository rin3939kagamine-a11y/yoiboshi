from pathlib import Path
import re, json, shutil
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[2];O=Path(__file__).resolve().parent
scripts=re.findall(r'src="(js/[^"?]+)',(R/'index.html').read_text())
checks=[];results=[];errors=[]
def ck(name,v):
 if not v:raise AssertionError(name)
 checks.append(name)
with sync_playwright() as pw:
 chromium_exe=shutil.which('chromium') or shutil.which('chromium-browser')
 launch_args={'headless':True,'args':['--no-sandbox','--disable-dev-shm-usage']}
 if chromium_exe: launch_args['executable_path']=chromium_exe
 browser=pw.chromium.launch(**launch_args)
 page=browser.new_page(viewport={'width':390,'height':844})
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content('<!doctype html><html lang="ja"><head><meta charset="UTF-8"></head><body><div id="app"></div></body></html>')
 page.evaluate('''()=>{const db={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>db[k]??null,setItem:(k,v)=>db[k]=v,removeItem:k=>delete db[k]}})}''')
 page.add_style_tag(content=(R/'css/styles.css').read_text(encoding='utf-8'))
 for script in scripts:
  path=R/script
  if not path.is_file():raise FileNotFoundError(path)
  page.add_script_tag(content=path.read_text(encoding='utf-8'))
 # Visual integrity on current stylesheet, not a stale test stylesheet.
 for width,height in [(320,568),(375,667),(390,844),(430,932),(1280,800)]:
  page.set_viewport_size({'width':width,'height':height})
  ui=page.evaluate("""()=>{
   S=fresh();S.gameStarted=true;S.onboarding.enabled=false;S.storyFlags.chapter1_open=true;
   S.chapterChoiceMemory.chapter1_open='record';view='story';
   storySession={id:'q16_intro',step:romanceScript('q16_intro').lines.findIndex(x=>x.chapterEcho),choice:null};render();
   const rect=s=>document.querySelector(s)?.getBoundingClientRect();
   const s=rect('.vn-story'),loc=rect('.vn-location'),nav=rect('.vn-top-actions'),tb=rect('.vn-toolbar'),dialog=rect('.story-dialogue');
   const intersects=(a,b)=>a&&b&&Math.min(a.right,b.right)-Math.max(a.left,b.left)>0&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>0;
   const wide=document.body.scrollWidth;
   return {x:s.x,width:s.width,h:s.height,viewport:innerWidth,wide,navOverlap:intersects(loc,nav),dialogOverlap:intersects(tb,dialog),line:document.querySelector('.story-line')?.textContent,expected:CHAPTER_CHOICE_ECHO.chapter3_aoi_flames.record,buttons:[...document.querySelectorAll('.vn-top-actions button')].length}
  }""")
  ck(f'{width}x{height} VN fills viewport',abs(ui['x'])<1 and abs(ui['width']-width)<1)
  ck(f'{width}x{height} no document horizontal overflow',ui['wide']<=width)
  ck(f'{width}x{height} no title/toolbar overlap',not ui['navOverlap'])
  ck(f'{width}x{height} toolbar separate from dialogue',not ui['dialogOverlap'])
  ck(f'{width}x{height} correct Aoi memory',ui['line']==ui['expected'])
  ck(f'{width}x{height} all toolbar actions preserved',ui['buttons']==5)
  if width==390:
   # Other pages must retain their ordinary mobile padding.
   reg=page.evaluate("""()=>{storySession=null;view='city';render();return getComputedStyle(document.querySelector('.page')).paddingLeft}""")
   ck('ordinary quest page mobile padding preserved',reg!='0px')
 # Reset viewport for the quest progression checks.
 page.set_viewport_size({'width':390,'height':844})
 def finish_scene(id):
  info=page.evaluate('''id=>{if(!storyAllowed(id))return {ok:false,reason:questPreviousStory(QUEST_BY_ID.q13),story:storySession?.id};openStory(id);let n=0;while(storySession&&n++<300){const s=romanceScript(storySession.id).lines[storySession.step];if(s?.choices&&!storySession.choice){chooseChapterStory(s.choices[0][0]);continue;}nextStory();}return {ok:!storySession,read:S.storyFlags[id]||false,n,view}}''',id)
  if not (info['ok'] and info['read']):print('FAIL_SCENE',id,info, flush=True)
  ck(f'complete scene {id}',info['ok'] and info['read']);return info
 for mode in ['legacy','turn']:
  init=page.evaluate('''mode=>{
    S=fresh();S.gameStarted=true;S.onboarding.enabled=false;S.battleMode=mode;S.storyFlags.prologue=true;S.storyFlags.chapter1_open=true;S.storyFlags.chapter1_end=true;S.storyFlags.chapter2_open=true;S.storyFlags.chapter2_end=true;S.chapterChoiceMemory.chapter1_open='record';
    S.party=['momoka_work','milku_work','akane_work','aoi_work'];for(const id of S.party){S.owned[id]={lv:75,aff:90,lb:2,copies:0}}
    for(let n=1;n<=12;n++){S.quests['q'+n]={complete:true,clues:2};S.storyFlags['q'+n]=true;}
    S.lighthouseMet=S.tsubakiMet=S.erikaMet=S.kanameMet=S.kaedeMet=true;
    S.storyFlags.chapter3_open=true;view='city';dialog=null;pendingStory=null;questStoryFlow=null;render();persist();
    window.requestAnimationFrame=()=>0;window.cancelAnimationFrame=()=>{};
    return {mode,quest:questUnlocked(QUEST_BY_ID.q13),fresh13:!S.quests.q13}
  }''',mode)
  ck(mode+' chapter3 prereqs',init['fresh13']);ck(mode+' not yet unlock before intro',not init['quest'])
  for q in range(13,19):
   qid='q'+str(q)
   # read the real chapter story intro; do not fake it
   intro=qid+'_intro'
   scene=finish_scene(intro)
   state=page.evaluate('''qid=>{const q=QUEST_BY_ID[qid];return {unlocked:questUnlocked(q),previous:questPreviousStory(q),intro:S.storyFlags[qid+'_intro'],previousQuest:q.requires.map(id=>({id,complete:!!S.quests[id]?.complete}))}}''',qid)
   ck(mode+' '+qid+' unlocked',state['unlocked'])
   init=page.evaluate('''qid=>{
     S.investigations[qid]={qid,phase:'ready',solved:true,hero:'aoi'};
     view='city';dialog=null;pendingStory=null;questStoryFlow=null;persist();startBattle(qid);
     return {qid:battle?.qid,turn:!!battle?.turnBattle,view,needStory:storySession?.id,phase:battle?.phase,waves:battle?.totalWaves};
   }''',qid)
   ck(mode+' '+qid+' real battle started',init['qid']==qid and init['view']=='combat');ck(mode+' '+qid+' correct engine',init['turn']==(mode=='turn'))
   page.evaluate('qid=>{window.__currentTestQid=qid}',qid)
   if mode=='legacy':
    outcome=page.evaluate('''()=>{let elapsed=0,steps=0;const before={gems:S.gems,gold:S.gold};while(battle&&steps<7000){elapsed+=70;tick(elapsed);steps++;}return {steps,stopped:!battle,won:!!S.quests[window.__currentTestQid]?.complete,title:dialog?.title,dialog:dialog?.message,gems:S.gems-before.gems,gold:S.gold-before.gold,quest:S.currentQuest}}''')
   else:
    page.evaluate('''()=>{if(battle.turnBattle&&!battle.tb.auto){battle.tb.auto=true;tbClearTimer()}}''')
    before=page.evaluate('''()=>({gems:S.gems,gold:S.gold})''')
    turns=0; overlays=0
    while page.evaluate('!!battle') and turns<8000:
     if page.locator('.bd-overlay').count():
      page.locator('.bd-overlay').click(force=True);overlays+=1
     n=page.evaluate("""()=>{let n=0;while(battle&&n<250){if(document.querySelector('.bd-overlay'))break;const b=battle;if(b.tb.queue[0]?.side==='ally'){tbAutoMove(b.tb.queue[0].i)}else{tbAdvance()}n++;}return n}""")
     turns+=n
     if n==0 and not page.locator('.bd-overlay').count():
      page.wait_for_timeout(100)
    outcome=page.evaluate('''({turns,overlays,before,qid})=>{tbClearTimer();return {moves:turns,overlays,stopped:!battle,won:!!S.quests[qid]?.complete,title:dialog?.title,dialog:dialog?.message,gems:S.gems-before.gems,gold:S.gold-before.gold,quest:qid}}''',{'turns':turns,'overlays':overlays,'before':before,'qid':qid})
   results.append({'mode':mode,'qid':qid,'initial':init,'outcome':{k:v for k,v in outcome.items() if k!='dialog'},'narrative':str(outcome.get('dialog',''))[:250]})
   if not outcome['stopped']:raise AssertionError(f'{mode} {qid} did not settle: {outcome}')
   ck(mode+' '+qid+' battle settled',outcome['stopped'])
   ck(mode+' '+qid+' quest cleared',outcome['won'])
   ck(mode+' '+qid+' victory dialog',outcome['title']=='全ウェーブ突破！')
   ck(mode+' '+qid+' has reward',outcome['gems']>=QUEST_REWARDS[qid] if 'QUEST_REWARDS' in globals() else outcome['gems']>0)
   # follow-up story is manual at result close; finish via original scene progression
   page.evaluate('''()=>{dialog=null;pendingStory=null;view='city';render()}''')
   finish_scene(qid)
   if q==14:
    for sid in ['saki_yuzu_meet','chiyo_meet']:
     finish_scene(sid)
   if q==15:
    for sid in ['reiko_meet','anzu_meet']:
     finish_scene(sid)
   if q==16:
    finish_scene('nazuna_meet')
  finish_scene('chapter3_end')
  ck(mode+' chapter3 end read',page.evaluate('S.storyFlags.chapter3_end'))
 ck('no JS errors',not errors)
 browser.close()
report={'passed':len(checks),'errors':errors,'battles':results,'scope':'5 responsive viewports + sequential q13-q18 intro, original story-next, real 4-ally combat per quest for both engines, with seeded chapter 1-2 prerequisites and ready investigation; real stats lv75, original reward calculation','limits':'Earlier chapters are seeded. Investigation ready-state is seeded. Chapter 3 stories and real battles are completed. Headless Chromium does not equal a physical iPhone; remote production assets are not mounted.'}
import os
if os.environ.get('YOIBOSHI_QA_REPORT'):
 Path(os.environ['YOIBOSHI_QA_REPORT']).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'passed':len(checks),'battles':len(results),'failures':len(errors),'q17BossOverlays':next((x['outcome'].get('overlays',0) for x in results if x['mode']=='turn' and x['qid']=='q17'),0)},ensure_ascii=False))
