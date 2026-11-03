"""Fresh-save progression smoke test, q1..q18 (real game functions).

Start with YOIBOSHI_FRESH_START=1 (default). Optional chunked runs require the
unaltered saved state from previous segment; no quest or level flags are seeded.
The narrative is stepped by the original nextStory/nextPrologue functions for
runtime; investigation evidence/answers use actual Chromium clicks, and turns
use the original AUTO engine with timers accelerated. Does not replace manual QA.
"""
from pathlib import Path
import re, json, shutil, os, time, traceback
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[2]
START=int(os.environ.get('YOIBOSHI_FRESH_START','1'));STOP=int(os.environ.get('YOIBOSHI_FRESH_STOP','18'));CP=R/'qa_fresh_checkpoints';CP.mkdir(exist_ok=True)
scripts=re.findall(r'src="(js/[^"?]+)',(R/'index.html').read_text())
checks=[]; log=[]; errors=[]
def ck(t,yes):
 if not yes:raise AssertionError(t)
 checks.append(t)
def state(pg):
 return pg.evaluate('''()=>({view,story:storySession?.id,step:storySession?.step,dialog:dialog?.title,quest:S.currentQuest,complete:Object.keys(S.quests).filter(k=>S.quests[k].complete),party:S.party,owned:Object.fromEntries(S.party.map(k=>[k,S.owned[k]])),gold:S.gold,gems:S.gems,stage:S.onboarding?.stage,battle:battle?{qid:battle.qid,turn:battle.turnBattle,phase:battle.phase,wave:battle.wave}:null,flags:Object.keys(S.storyFlags).filter(x=>S.storyFlags[x])})''')
def finish(pg,id):
 info=pg.evaluate('''id=>{
  if(!storyAllowed(id))return {ok:false,why:'not allowed',flags:Object.keys(S.storyFlags).filter(x=>S.storyFlags[x]),unlocked:QUEST_BY_ID[id.replace('_intro','')]?questUnlocked(QUEST_BY_ID[id.replace('_intro','')]):null};
  openStory(id);let n=0;
  while(storySession&&n++<900){let sc=romanceScript(storySession.id).lines[storySession.step];
    if(sc?.choices&&!storySession.choice){chooseChapterStory(sc.choices[0][0]);continue}nextStory();}
  return {ok:!storySession,read:!!S.storyFlags[id],n,view}}''',id)
 if not info['ok'] or not info['read']:raise AssertionError('story '+id+' '+json.dumps(info,ensure_ascii=False))
 ck(id+' original scene finished',True)
 return info
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path=shutil.which('chromium'),args=['--no-sandbox','--disable-dev-shm-usage'])
 p=b.new_page(viewport={'width':390,'height':844});p.on('pageerror',lambda e:errors.append(str(e)))
 p.set_content('<!doctype html><html lang="ja"><head><meta charset="UTF-8"></head><body><div id="app"></div></body></html>')
 p.evaluate('''()=>{const db={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>db[k]??null,setItem:(k,v)=>db[k]=v,removeItem:k=>delete db[k],clear:()=>{for(const k in db)delete db[k]}}})}''')
 p.add_style_tag(content=(R/'css/styles.css').read_text())
 for name in scripts:p.add_script_tag(content=(R/name).read_text())
 try:
  if START>1:
   snap=json.loads((CP/f'q{START-1}_save.json').read_text(encoding='utf-8'))
   p.evaluate('''raw=>{S=migrateSave(raw);view='city';storySession=null;dialog=null;pendingStory=null;questStoryFlow=null;persist();render();}''',snap)
   ck('restored authentic previous save',len(state(p)['complete'])==START-1)
  else:
   ck('new save is pristine at title',state(p)['view']=='title' and not state(p)['complete'])
   p.locator('.title-secondary').click();ck('start from opening',state(p)['view']=='opening')
   p.locator('.onb-skip').click();ck('name entry',state(p)['view']=='nameEntry')
   p.locator('#player-name-input').fill('通し検証');p.locator('button[type="submit"]').click()
   ck('name greeting',state(p)['view']=='nameGreeting');p.get_by_text('序章へ進む').click()
   ck('prologue started',state(p)['view']=='prologue' and state(p)['step']==0)
   pr=p.evaluate('''()=>{let i=0;while(view==='prologue'&&storySession&&i++<150){let line=PROLOGUE[storySession.step];if(line?.choices){choosePrologue('people');continue;}nextPrologue();}return {view,done:S.storyFlags.prologue,choice:S.chapterChoiceMemory.prologue,steps:i}}''');ck('prologue completed by original choices',pr['done'] and pr['choice']=='people')
  print('INIT',json.dumps(state(p),ensure_ascii=False)[:1700],flush=True)
  # discover unlock for q1 and actual map action
  for q in range(START,STOP+1):
   qid='q'+str(q)
   before=state(p)
   gate=p.evaluate('''qid=>{const q=QUEST_BY_ID[qid];return {previous:questPreviousStory(q),narrative:questNarrativeReady(q),intro:questIntroStory(q),unlocked:questUnlocked(q),base:questBaseUnlocked(q),phase:S.investigations[qid]?.phase,view,story:storySession?.id}}''',qid)
   print('GATE',qid,json.dumps(gate,ensure_ascii=False),'owned lv',[x['lv'] for x in before['owned'].values()],flush=True)
   # finish required previous stories, without marking their flags by hand
   for i in range(30):
    pre=p.evaluate('''qid=>questPreviousStory(QUEST_BY_ID[qid])''',qid)
    if not pre:break
    finish(p,pre)
   intro=p.evaluate('''qid=>questIntroStory(QUEST_BY_ID[qid])''',qid)
   if intro and not p.evaluate('''id=>!!S.storyFlags[id]''',intro):finish(p,intro)
   if not p.evaluate('''qid=>questUnlocked(QUEST_BY_ID[qid])''',qid):
    print('LOCKED',qid,json.dumps(state(p),ensure_ascii=False)[:1600]);break
   p.evaluate('''qid=>startInvestigation(qid)''',qid)
   iv=state(p);ck(qid+' investigation opens',iv['view']=='investigation')
   heroes=p.evaluate('''id=>investigationSelectableHeroes(id)''',qid)
   h=heroes[0];p.locator(f'.inq-hero[onclick="chooseInvestigationHero(\'{h}\')"]').click()
   for i in [0,1,2]:p.locator(f'.inq-site[onclick="investigateAt({i})"]').click()
   correct=p.evaluate('''qid=>INVESTIGATION_CASES[qid].correct''',qid)
   p.locator(f'.inq-answers button[onclick="resolveInvestigation(\'{correct}\')"]').click()
   release=p.evaluate('''qid=>INVESTIGATION_CASES[qid].release.length''',qid)
   for i in range(release):p.locator('.inq-echo button').click()
   ck(qid+' solved original investigation',p.evaluate('''id=>S.investigations[id]?.phase==='ready'&&S.investigations[id]?.solved''',qid))
   p.locator('.inq-result button[onclick^="startBattle"]').click()
   pre=p.evaluate('''()=>storySession?.id''')
   if pre:
    ck(qid+' battle prelude opened',pre==qid+'_ready' or pre==qid+'_pre')
    info=p.evaluate('''()=>{const id=storySession.id;let steps=0;while(storySession&&steps++<300){let line=romanceScript(storySession.id).lines[storySession.step];if(line?.choices&&!storySession.choice){chooseChapterStory(line.choices[0][0]);continue;}nextStory();}return {pre:id,steps,battle:battle?.qid,view}}''')
    ck(qid+' prelude completed before battle',info['battle']==qid)
   ck(qid+' started original battle',p.evaluate('''qid=>battle?.qid===qid''',qid))
   # run original turn AUTO, without boosting units/seed or changing S.
   p.evaluate('''()=>{if(battle?.turnBattle){battle.tb.auto=true;tbClearTimer()}else{window.requestAnimationFrame=()=>0;window.cancelAnimationFrame=()=>{}}}''')
   turns=0; overlays=0
   if p.evaluate('!!battle?.turnBattle'):
    while p.evaluate('!!battle') and turns<4500:
     if p.locator('.bd-overlay').count():p.locator('.bd-overlay').click(force=True);overlays+=1
     n=p.evaluate('''()=>{let n=0;while(battle&&n<150){if(document.querySelector('.bd-overlay'))break;if(battle.tb.queue[0]?.side==='ally')tbAutoMove(battle.tb.queue[0].i);else tbAdvance();n++;}return n}''')
     turns+=n
     if n==0 and not p.locator('.bd-overlay').count():p.wait_for_timeout(30)
   else:
    p.evaluate('''()=>{let t=0,n=0;while(battle&&n++<4500){t+=70;tick(t)}}''')
   outcome=p.evaluate('''qid=>({won:!!S.quests[qid]?.complete,ended:!battle,view,dialog:dialog?.title,gold:S.gold,gems:S.gems,party:Object.fromEntries(S.party.map(id=>[id,S.owned[id]?.lv]))})''',qid)
   print('BATTLE',qid,turns,overlays,json.dumps(outcome,ensure_ascii=False),flush=True)
   log.append({'qid':qid,'gate':gate,'investigation':'solved','battle':outcome})
   ck(qid+' battle completed and awarded victory',outcome['won'] and outcome['ended'] and outcome['dialog']=='全ウェーブ突破！')
   ck(qid+' natural progression and first-clear',outcome['won'])
   p.evaluate('''()=>{dialog=null;pendingStory=null;view='city';render()}''')
   # after quest q3+ story must be read in order
   if p.evaluate('''qid=>storyAllowed(qid)''',qid) and q>=3:finish(p,qid)
   cp=p.evaluate('''()=>JSON.stringify(S)''');(CP/f'{qid}_save.json').write_text(cp,encoding='utf-8')
   ck(qid+' persisted record saved',json.loads(cp)['quests'][qid]['complete'])
   ck(qid+' no stat injection',all(j['lv']==1 for j in state(p)['owned'].values()))
   print('POST',qid,'flags',','.join(state(p)['flags'][-8:]),'checkpoint',len(cp),flush=True)
  if STOP==18:
   ck('all 18 quests complete from fresh game',len(state(p)['complete'])==18)
   ck('all 18 investigations really solved',p.evaluate('''()=>Object.values(S.investigations).filter(x=>x.solved).length''')==18)
   finish(p,'chapter3_end')
   ck('Chapter 3 original ending read',p.evaluate('''()=>!!S.storyFlags.chapter3_end'''))
   ck('Chapter 4 available to read but not auto-opened',p.evaluate('''()=>questPreviousStory(QUEST_BY_ID.q19)==='chapter4_open' && !S.storyFlags.chapter4_open'''))
  ck('no browser JS exceptions',not errors)
  print('SUMMARY',json.dumps({'checks':len(checks),'completed':len(log),'errors':errors},ensure_ascii=False),flush=True)
 except Exception as e:
  print('ERROR',type(e).__name__,str(e),flush=True);traceback.print_exc();print('STATE',json.dumps(state(p),ensure_ascii=False)[:3200],flush=True)
  raise
 finally:
  report=Path(os.environ.get('YOIBOSHI_FRESH_REPORT',str(R/f'QA_FRESH_{START}_TO_{STOP}.json')))
  report.write_text(json.dumps({'passed':len(checks),'checks':checks,'log':log,'errors':errors,'from':START,'to':STOP,'lastState':state(p),'method':'Fresh new game; actual narrative advancement functions; UI-click investigation; original battle AUTO accelerated; unmodified S except load(save) on chunk transitions'},ensure_ascii=False,indent=2))
  b.close()
