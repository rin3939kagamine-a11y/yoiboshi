"""Regression for fresh save q12->q13 handoff and q18 restore; no fixture mutations of quest completion."""
from pathlib import Path
import json,re,shutil
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[2];scripts=re.findall(r'src="(js/[^"?]+)',(R/'index.html').read_text())
checks=[];errors=[]
def test(label,ok):
 if not ok:raise AssertionError(label)
 checks.append(label)

def new_page(browser,save):
 page=browser.new_page(viewport={'width':390,'height':844})
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content('<!doctype html><html lang="ja"><head><meta charset="utf-8"></head><body><div id="app"></div></body></html>')
 page.evaluate('''save=>{const key='yoiboshi-reboot-v1',db={[key]:JSON.stringify(save)};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>db[k]??null,setItem:(k,v)=>{db[k]=v},removeItem:k=>delete db[k],clear:()=>{for(let k in db)delete db[k]}}})}''',save)
 page.add_style_tag(content=(R/'css/styles.css').read_text())
 for script in scripts:page.add_script_tag(content=(R/script).read_text())
 return page
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path=shutil.which('chromium'),args=['--no-sandbox','--disable-dev-shm-usage'])
 q12=json.loads((R/'qa_fresh_checkpoints/q12_save.json').read_text())
 q18=json.loads((R/'qa_fresh_checkpoints/q18_save.json').read_text())
 page=new_page(browser,q12)
 gate=page.evaluate('''()=>({next:questPreviousStory(QUEST_BY_ID.q13),kaedeAllowed:storyAllowed('kaede_meet'),endAllowed:storyAllowed('chapter2_end'),n:Object.values(S.quests).filter(q=>q.complete).length,level:S.party.map(id=>S.owned[id]?.lv),memory:S.chapterChoiceMemory.chapter1_open})''')
 test('restore authentic q12 save with 12 complete',gate['n']==12)
 test('q13 directs to Kaede encounter first',gate['next']=='kaede_meet')
 test('Kaede encounter is genuinely unlocked',gate['kaedeAllowed'] and not gate['endAllowed'])
 gate2=page.evaluate('''()=>{openStory('kaede_meet');let n=0;while(storySession&&n++<400){let sc=romanceScript(storySession.id).lines[storySession.step];if(sc?.choices&&!storySession.choice){chooseChapterStory(sc.choices[0][0]);continue}nextStory()};return {met:S.kaedeMet,guide:questPreviousStory(QUEST_BY_ID.q13),allowed:storyAllowed('chapter2_end')}}''')
 test('Kaede encounter advances to chapter2 ending',gate2['met'] and gate2['guide']=='chapter2_end' and gate2['allowed'])
 stage=page.evaluate('''()=>{openStory('chapter2_end');let n=0;while(storySession&&n++<300){let sc=romanceScript(storySession.id).lines[storySession.step];if(sc?.choices&&!storySession.choice){chooseChapterStory(sc.choices[0][0]);continue}nextStory()}return {end:S.storyFlags.chapter2_end,next:questPreviousStory(QUEST_BY_ID.q13),gems:S.gems}}''')
 test('Chapter2 ending unlocks Chapter3 opening',stage['end'] and stage['next']=='chapter3_open')
 page.close()
 # New browser execution from the exact fresh-save q18 checkpoint
 page=new_page(browser,q18)
 s=page.evaluate('''()=>({count:Object.values(S.quests).filter(x=>x.complete).length,inv:Object.values(S.investigations).filter(x=>x.solved).length,end:!!S.storyFlags.chapter3_end,can:storyAllowed('chapter3_end'),level:S.party.map(id=>S.owned[id].lv),name:S.playerName,choice:S.chapterChoiceMemory.chapter1_open,raw:SaveStore.read()!=null})''')
 test('reload preserved 18 real clear records',s['count']==18 and s['inv']==18)
 test('reload preserved fresh name and chapter choice',s['name']=='通し検証' and s['choice']=='field')
 test('reload preserved original low-level party',s['level']==[1,1,1,1])
 test('Chapter3 ending not artificially flagged',not s['end'] and s['can'] and s['raw'])
 old=page.evaluate('''()=>({gems:S.gems,gold:S.gold,flags:Object.keys(S.storyFlags).length})''')
 e=page.evaluate('''()=>{openStory('chapter3_end');let n=0;while(storySession&&n++<600){let sc=romanceScript(storySession.id).lines[storySession.step];if(sc?.choices&&!storySession.choice){chooseChapterStory(sc.choices[0][0]);continue}nextStory()}return {ended:!!S.storyFlags.chapter3_end,previous:questPreviousStory(QUEST_BY_ID.q19),canOpen:storyAllowed('chapter4_open'),count:Object.values(S.quests).filter(x=>x.complete).length,saved:SaveStore.read()}}''')
 test('original Chapter3 ending read after q18',e['ended'] and e['previous']=='chapter4_open' and e['canOpen'])
 test('Chapter3 ending did not erase prior clears',e['count']==18)
 saved=json.loads(e['saved']);page.close()
 page=new_page(browser,saved)
 now=page.evaluate('''()=>({end:!!S.storyFlags.chapter3_end,chapter4:!!S.storyFlags.chapter4_open,unlocks:questPreviousStory(QUEST_BY_ID.q19),n:Object.values(S.quests).filter(x=>x.complete).length,gems:S.gems})''')
 test('full engine reload retains Chapter3 ending',now['end'] and not now['chapter4'] and now['unlocks']=='chapter4_open' and now['n']==18)
 # Loading save preserves gems; no gratuitous increment
 test('reloading Chapter3 ending does not grant duplicate gems',now['gems']==saved['gems'])
 test('no JS runtime exceptions',not errors)
 report={'checks':len(checks),'passed':checks,'errors':errors,'q12Guide':gate,'afterKaede':gate2,'chapter2End':{k:v for k,v in stage.items()},'q18Reload':s,'chapter3End':{k:v for k,v in e.items() if k!='saved'},'finalReload':now}
 (R/'QA_FRESH_ROUTE_RESTORE.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
 print(json.dumps({'passed':len(checks),'errors':len(errors),'q13Guide':gate['next'],'q18':s['count'],'chapter3End':now['end']},ensure_ascii=False))
 page.close();browser.close()
