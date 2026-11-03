"""UI-based Chapter 3 investigation regression.
Run from repository root: python tools/qa/chapter3_investigation_ui.py
Optionally YOIBOSHI_QA_REPORT=path for JSON output.
Uses bundled/installed Chromium and real scripts & CSS, with prior chapter completion seeded.
"""
from pathlib import Path
import json, os, re, shutil, tempfile
from playwright.sync_api import sync_playwright

R=Path(__file__).resolve().parents[2]
OUT=Path(os.environ.get('YOIBOSHI_QA_OUTPUT_DIR',str(Path(tempfile.gettempdir())/'yoiboshi_chapter3_investigation_qa')))
OUT.mkdir(parents=True,exist_ok=True)
ASSETS=R/'index.html'
scripts=re.findall(r'src="(js/[^"?]+)',ASSETS.read_text(encoding='utf-8'))
checks=[]; problems=[]; scenes=[]
def ok(name, test):
    if not test: raise AssertionError(f'{name}: {test}')
    checks.append(name)

with sync_playwright() as pw:
    chromium=shutil.which('chromium') or shutil.which('chromium-browser')
    kw=dict(headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
    if chromium: kw['executable_path']=chromium
    browser=pw.chromium.launch(**kw)
    page=browser.new_page(viewport={'width':390,'height':844})
    page.on('pageerror',lambda e:problems.append(str(e)))
    page.set_content('<!doctype html><html lang="ja"><head><meta charset="UTF-8"></head><body><div id="app"></div></body></html>')
    page.evaluate('''()=>{const db={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>db[k]??null,setItem:(k,v)=>db[k]=v,removeItem:k=>delete db[k],clear:()=>{for(const k in db)delete db[k]}}})}''')
    page.add_style_tag(content=(R/'css/styles.css').read_text(encoding='utf-8'))
    for src in scripts:
        path=R/src
        if not path.is_file(): raise FileNotFoundError(str(path))
        page.add_script_tag(content=path.read_text(encoding='utf-8'))
    # Validate actual registered canonical data, without substituting fixture cases.
    shape=page.evaluate('''()=>{
      const keys=Object.keys(INVESTIGATION_CASES).filter(k=>/^q\\d+$/.test(k));
      return {keys,all:keys.map(id=>{let q=INVESTIGATION_CASES[id];return {id,clueCount:q.clues?.length,siteCount:q.sites?.length,answerCount:q.answers?.length,correct:q.correct,answerExists:q.answers?.some(a=>a.id===q.correct),real:q.clues?.filter(c=>c.real).length,sitesValid:q.sites?.every(s=>s.clues.every(k=>q.clues.some(c=>c.id===k))),releaseCount:q.release?.length,companion:typeof q.companion}})}
    }''')
    ok('30 quest investigation cases registered',len(shape['keys'])==30)
    for q in shape['all']:
        ok(q['id']+' complete canonical case',q['clueCount']>=3 and q['siteCount']>=4 and q['answerCount']>=3 and q['answerExists'] and q['real']>=2 and q['sitesValid'] and q['releaseCount']>=1 and q['companion']=='object')
    def seed(mode='turn',last=12):
        return page.evaluate('''({mode,last})=>{
          S=fresh();S.gameStarted=true;S.onboarding.enabled=false;S.battleMode=mode;
          for(const s of ['prologue','chapter1_open','chapter1_end','chapter2_open','chapter2_end','chapter3_open'])S.storyFlags[s]=true;
          S.chapterChoiceMemory.chapter1_open='record';
          S.party=['momoka_work','milku_work','akane_work','aoi_work'];for(const id of S.party){S.owned[id]={lv:75,aff:90,lb:2,copies:0}}
          for(let n=1;n<=last;n++){S.quests['q'+n]={complete:true,clues:2};S.storyFlags['q'+n]=true;}
          S.lighthouseMet=S.tsubakiMet=S.erikaMet=S.kanameMet=S.kaedeMet=true;
          if(last>=14){S.storyFlags.saki_yuzu_meet=true;S.storyFlags.chiyo_meet=true;S.chapter3Met.saki=S.chapter3Met.yuzu=S.chapter3Met.chiyo=true}
          if(last>=15){S.storyFlags.reiko_meet=true;S.storyFlags.anzu_meet=true;S.chapter3Met.reiko=S.chapter3Met.anzu=true}
          if(last>=16){S.storyFlags.nazuna_meet=true;S.chapter3Met.nazuna=true}
          view='city';dialog=null;pendingStory=null;questStoryFlow=null;
          window.requestAnimationFrame=()=>0;window.cancelAnimationFrame=()=>{};
          render();persist();return {complete:last,view};
        }''',{'mode':mode,'last':last})
    def scene_intro(qid):
        return page.evaluate('''id=>{
          let intro=id+'_intro';if(!storyAllowed(intro))return {ok:false,id:intro,why:'story lock'};
          openStory(intro);let n=0;
          while(storySession&&n++<300){const line=romanceScript(storySession.id).lines[storySession.step];
            if(line?.choices&&!storySession.choice){chooseChapterStory(line.choices[0][0]);continue}nextStory();}
          view='city';render();return {ok:!storySession&&!!S.storyFlags[intro],n}
        }''',qid)
    def start(qid, direct=False):
        if direct:page.evaluate('(id)=>startInvestigation(id)',qid)
        else:
            # The first quest uses the actual city map marker -> open sheet -> action button.
            q=page.evaluate('(id)=>QUEST_BY_ID[id]',qid)
            button=page.locator('button').filter(has_text=q['location'])
            if button.count():
                button.first.click()
                ok('q13 quest sheet visible',page.locator('.qmap-sheet').count()>0)
                page.locator('.qmap-main-action').click()
            else:raise AssertionError("Expected q13 city map location pin not found; location="+str(q.get("location"))+"; buttons="+str(page.locator("button").all_text_contents()[:25]))
        ok(qid+' investigation page appears',page.locator('.investigation-view').count()==1)
        ok(qid+' starts with companion',page.evaluate('(id)=>S.investigations[id]?.phase',qid)=='companion')
    def choose_companion(id,hero='aoi'):
        options=page.evaluate('(q)=>investigationSelectableHeroes(q)',id)
        ok(id+' companion allowed',hero in options)
        page.locator(f'.inq-hero[onclick="chooseInvestigationHero(\'{hero}\')"]').click()
        ok(id+' progressed to interview',page.evaluate('(id)=>S.investigations[id]?.phase',id)=='interview')
    def pick_sites(qid,site_indices):
        for index in site_indices:
            ok(qid+f' site {index} enabled',page.locator(f'.inq-site[onclick="investigateAt({index})"]').is_enabled())
            page.locator(f'.inq-site[onclick="investigateAt({index})"]').click()
            ok(qid+f' site {index} recorded',index in page.evaluate('(id)=>S.investigations[id]?.chosen',qid))
        ok(qid+' interview done',page.evaluate('(id)=>S.investigations[id]?.phase',qid)=='deduce')
    def choose_answer(qid,choice):
        page.locator(f'.inq-answers button[onclick="resolveInvestigation(\'{choice}\')"]').click()
        return page.evaluate('(id)=>({phase:S.investigations[id]?.phase,solved:S.investigations[id]?.solved,failed:S.investigations[id]?.failedChoices,bonus:S.investigations[id]?.firstTryBonus})',qid)
    def echo(qid):
        count=page.evaluate('(id)=>INVESTIGATION_CASES[id].release.length',qid)
        for n in range(count):
            ok(qid+f' echo {n} displayed',page.locator('.inq-echo').count()==1)
            page.locator('.inq-echo button').click()
        state=page.evaluate('(id)=>S.investigations[id]',qid)
        ok(qid+' completed real echo',state['phase']=='ready' and state['solved'] is True)
        ok(qid+' launch button visible',page.locator('.inq-result button[onclick^="startBattle"]').count()==1)
        return state
    # All 6 core investigations, each with real button presses. Two mobile/desktop viewports.
    for width,height in [(390,844),(1280,800)]:
        page.set_viewport_size({'width':width,'height':height})
        for n in range(13,19):
            qid=f'q{n}';seed(last=n-1)
            ok(f'{width} {qid} intro read',scene_intro(qid)['ok'])
            start(qid,direct=not(width==390 and n==13))
            choose_companion(qid,hero='aoi')
            # Sites 0/1 deliver at least two real clues in canonical Chapter3 cases.
            pick_sites(qid,[0,1,2])
            correct=page.evaluate('(id)=>INVESTIGATION_CASES[id].correct',qid)
            a=choose_answer(qid,correct)
            ok(qid+' correct answer to echo',a['phase']=='echo' and a['solved'] is True and a['bonus'] is True)
            after=echo(qid)
            ok(qid+' quest flag clues=2',page.evaluate('(id)=>S.quests[id].clues',qid)==2)
            ok(qid+' original correct answer saved',after['answer']==correct)
            if width==390 and n==13:
                page.screenshot(path=str(OUT/'INVESTIGATION_READY_390.png'),full_page=True)
                # UI integration: click the ready-state launch button from the actual investigation.
                before=page.evaluate('''()=>({gems:S.gems,gold:S.gold})''')
                page.locator('.inq-result button[onclick^="startBattle"]').click()
                ok('q13 starts real turn battle from solved investigation',page.evaluate("!!battle && battle.qid==='q13' && !!battle.turnBattle"))
                page.evaluate('''()=>{battle.tb.auto=true;tbClearTimer()}''')
                turnSteps=0
                while page.evaluate('!!battle') and turnSteps<4000:
                    if page.locator('.bd-overlay').count():page.locator('.bd-overlay').click(force=True)
                    count=page.evaluate('''()=>{let n=0;while(battle&&n<200){if(document.querySelector('.bd-overlay'))break;if(battle.tb.queue[0]?.side==='ally')tbAutoMove(battle.tb.queue[0].i);else tbAdvance();n++;}return n}''')
                    turnSteps+=count
                    if not count and not page.locator('.bd-overlay').count():page.wait_for_timeout(50)
                outcome=page.evaluate('''before=>{tbClearTimer();return {battleEnded:!battle,complete:!!S.quests.q13?.complete,solved:S.investigations.q13.solved,gems:S.gems-before.gems,gold:S.gold-before.gold,title:dialog?.title}}''',before)
                ok('q13 real engine cleared from on-screen investigation',outcome['battleEnded'] and outcome['complete'] and outcome['solved'])
                ok('q13 solved investigation reward paid once on first victory',outcome['gems']>0 and outcome['gold']>0 and outcome['title']=='全ウェーブ突破！')
                page.screenshot(path=str(OUT/'INVESTIGATION_TO_BATTLE_Q13_390.png'),full_page=True)
            scenes.append({'viewport':width,'quest':qid,'answer':correct,'realClues':len([c for c in after['clues'] if c in [x['id'] for x in page.evaluate('(id)=>INVESTIGATION_CASES[id].clues.filter(c=>c.real)',qid)]])})
    # Wrong first, then correct -> no one-try bonus, failure feedback visible.
    page.set_viewport_size({'width':390,'height':844});seed();ok('failure case intro',scene_intro('q13')['ok']);start('q13',direct=True);choose_companion('q13');pick_sites('q13',[0,1,2])
    wrong=page.evaluate("()=>INVESTIGATION_CASES.q13.answers.find(a=>a.id!==INVESTIGATION_CASES.q13.correct).id")
    a=choose_answer('q13',wrong)
    ok('wrong hypothesis stays in deduce',a['phase']=='deduce' and len(a['failed'])==1)
    ok('wrong hypothesis feedback visible',page.locator('.inq-feedback').count()==1)
    ok('failed answer disabled',not page.locator(f'.inq-answers button[onclick="resolveInvestigation(\'{wrong}\')"]').is_enabled())
    a=choose_answer('q13','a');ok('retry correct without first-try bonus',a['phase']=='echo' and a['bonus'] is False)
    echo('q13')
    # Current published script supplements distractor-only sites with cross-check evidence.
    # Three normally selected sites therefore provide enough real clues; a rescue step is not required.
    seed();ok('cross-check intro',scene_intro('q13')['ok']);start('q13',direct=True);choose_companion('q13');pick_sites('q13',[0,2,3]);
    ok('distractor route automatically acquires two real clues',page.evaluate("investigationRealClues(S.investigations.q13).length >= 2"))
    ok('distractor route advances without rescue',page.locator('.inq-rescue').count()==0)
    a=choose_answer('q13','a');ok('cross-check hypothesis succeeds',a['solved'] is True)
    echo('q13')
    # Skill removes irrelevant clue, usable once.
    seed();ok('skill intro',scene_intro('q13')['ok']);start('q13',direct=True);choose_companion('q13');page.locator('.inq-site[onclick="investigateAt(2)"]').click()
    page.locator('.inq-skill').click()
    ok('Aoi skill tags irrelevant clue',page.evaluate("S.investigations.q13.markedIrrelevant.includes('q13x')"))
    ok('Aoi skill disabled after use',not page.locator('.inq-skill').is_enabled())
    # Save+restore mid-investigation, using the game's own migration path.
    stored=page.evaluate('''()=>{persist();let saved=localStorage.getItem(KEY);return {saved,sha:saved?.length,phase:S.investigations.q13.phase}}''')
    ok('save persisted',bool(stored['saved']) and stored['phase']=='interview')
    restored=page.evaluate('''raw=>{let x=migrateSave(JSON.parse(raw));return {phase:x.investigations.q13.phase,marked:x.investigations.q13.markedIrrelevant,hero:x.investigations.q13.hero}}''',stored['saved'])
    ok('save migration retains investigation',restored['phase']=='interview' and 'q13x' in restored['marked'] and restored['hero']=='aoi')
    ok('no JS exceptions',not problems)
    browser.close()
report={'passed':len(checks),'problems':problems,'cases':shape['keys'],'scenes':scenes,'scope':'Chapter 3 q13-q18 real UI clicks with main-branch investigation records, cross-check evidence, wrong hypothesis, companion skill, and save migration. Earlier chapters seeded; no iPhone physical device.'}
out=os.getenv('YOIBOSHI_QA_REPORT')
if out:Path(out).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'passed':len(checks),'scenes':len(scenes),'errors':len(problems),'cases':len(shape['keys'])},ensure_ascii=False))
