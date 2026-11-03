from pathlib import Path
import re,json,shutil,time,os,sys
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[2]
qids=os.environ.get('QIDS','q3,q6,q9,q12,q15,q17,q18').split(',')
seeds=int(os.environ.get('SEEDS','3'))
levels=[int(x) for x in os.environ.get('LEVELS','1,7').split(',')]
mode=os.environ.get('MODE','baseline')
files=re.findall(r'src="(js/[^"?]+)',(R/'index.html').read_text())
source=json.loads((R/'qa_fresh_checkpoints/q18_save.json').read_text())
results=[]
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path=shutil.which('chromium'),args=['--no-sandbox','--disable-dev-shm-usage']);p=b.new_page(viewport={'width':390,'height':844})
 p.set_content('<!doctype html><html lang="ja"><head><meta charset="UTF-8"></head><body><div id="app"></div></body></html>')
 p.evaluate('''()=>{const db={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>db[k]??null,setItem:(k,v)=>db[k]=v,removeItem:k=>delete db[k]}})}''')
 p.add_style_tag(content=(R/'css/styles.css').read_text())
 for src in files:p.add_script_tag(content=(R/src).read_text())
 for lv in levels:
  for qid in qids:
   for seed in range(seeds):
    p.evaluate('''({raw,qid,lv,seed})=>{
      document.querySelectorAll('.bd-overlay').forEach(el=>el.click()); interruptConfirm=false; battle=null; S=migrateSave(raw); S.battleMode='turn';
      for(const id of S.party){S.owned[id].lv=lv;} S.quests[qid].complete=false;
      view='city';storySession=null;dialog=null;pendingStory=null;questStoryFlow=null;
      let state=(seed+1)*100003+Number(qid.slice(1))*101;
      Math.random=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};
      startBattle(qid);
      if(!battle||!battle.turnBattle)throw Error('battle did not start:'+qid+' '+view+' '+(storySession?.id||''));if(!battle.investigation?.weakness)throw Error('investigation bonus not loaded:'+qid);
      battle.tb.auto=true;tbClearTimer();
      window.__probe={qid,lv,seed,firstHp:battle.allies.map(a=>a.hp),peakBoss:0,enemyTurns:0,allyTurns:0,rounds:[],startWave:0};
    }''',dict(raw=source,qid=qid,lv=lv,seed=seed))
    res=p.evaluate("""()=>{
      const st=window.__probe;
      const renderOriginal=tbRender;tbRender=()=>{};
      let n=0,stop='limit';
      try{
       while(battle&&n<3000){
        if(document.querySelector('.bd-overlay')){document.querySelector('.bd-overlay').click();continue;} if(interruptConfirm){stop='interrupt';break;}
        if(battle.tb.queue[0]?.side==='ally'){st.allyTurns++;tbAutoMove(battle.tb.queue[0].i);}
        else{st.enemyTurns++;tbAdvance();}
        n++;
        if(n%100===0)tbClearTimer();
       }
       tbClearTimer();
       if(!battle)stop='finished';
       return {won:!battle&&dialog?.title==='全ウェーブ突破！',dialog:dialog?.title,remaining:battle?.allies?.map(a=>a.hp),turns:st.allyTurns,enemyTurns:st.enemyTurns,firstHp:st.firstHp,stop,n};
      }finally{tbRender=renderOriginal;}
    }""")
    overlays=0;n=res['n']
    res.update({'qid':qid,'level':lv,'seed':seed,'overlays':overlays,'n':n,'mode':mode});results.append(res)
    print(f"{mode} {qid} Lv{lv} seed{seed} won={res['won']} dialog={res['dialog']} stop={res['stop']} allyTurns={res['turns']} enemyTurns={res['enemyTurns']} overlay={overlays} steps={n}",flush=True)
 p.close();b.close()
(R/'QA_BALANCE_PROBE_RESULTS.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print('SUMMARY',json.dumps({f'{q}/Lv{lv}':sum(r['won'] for r in results if r['qid']==q and r['level']==lv) for q in qids for lv in levels}),flush=True)
