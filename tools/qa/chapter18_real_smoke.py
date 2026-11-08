"""Chapter 18: actual Chromium game UI and turn-combat smoke test (no persistent user save).
Plays chapter 18 openings, six investigation chains, all waves of each battle,
post-battle episodes, ending and save reload. Combat uses QA-only boosted ally
stats and accelerated AUTO turns; production battle equations are unchanged.
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright
import json

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts"/"chapter18"
OUT.mkdir(parents=True,exist_ok=True)
KEY="yoiboshi-reboot-v1"

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
checks=[]
def ck(label,valid,value=None):
    checks.append({"label":label,"pass":bool(valid)})
    if not valid:raise AssertionError(f"{label}: {value}")

srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
try:
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
        page=browser.new_page(viewport={"width":390,"height":844})
        errors=[]
        page.on("pageerror",lambda e:errors.append(str(e)))
        base=f"http://127.0.0.1:{srv.server_port}"
        page.goto(base+"/index.html",wait_until="load",timeout=120000)
        page.wait_for_function("typeof CHAPTER18_STORIES!=='undefined' && typeof storyAllowed==='function' && typeof INVESTIGATION_CASES!=='undefined'",timeout=30000)

        meta=page.evaluate("""() => {
          const chapters=Object.keys(CHAPTER18_STORIES);
          const ids=Array.from({length:6},(_,i)=>'q'+(103+i));
          const qs=ids.map(id=>QUEST_BY_ID[id]);
          const cases=ids.map(id=>INVESTIGATION_CASES[id]);
          const backgrounds=[...new Set(chapters.flatMap(id=>CHAPTER18_STORIES[id].lines.map(x=>x.bg)))];
          const urls=backgrounds.map(bg=>storyBackgroundFile(...bg.split(':')));
          const markers=CHAPTER18_BATTLE_MARKERS;
          return {
            chapterSegments:chapters.length,
            chapterLines:chapters.reduce((n,id)=>n+CHAPTER18_STORIES[id].lines.length,0),
            questIds:qs.map(q=>q?.id),requirements:qs.map(q=>q?.requires),
            expected:ids.map(id=>[id+'_intro',id+'_pre',id]),
            allSegments:chapters,
            cases:cases.map(x=>x&&[x.clues.filter(c=>c.real).length,x.clues.filter(c=>!c.real).length,x.answers.length,x.sites.length]),
            backgroundCount:backgrounds.length,backgroundFiles:urls,
            missingBackgrounds:urls.filter(x=>!x),
            markerCounts:ids.map(id=>[id,markers[id]?.length||0]),
            permanentNames:CHAPTER18_STORIES.q104_intro.lines.filter(x=>x.text.startsWith('？？？')),
            removedNotes:Object.values(CHAPTER18_STORIES).some(s=>s.lines.some(l=>l.text.includes('提案メモ')||l.text.includes('残る確認事項'))),
            importantText:{
              letter:CHAPTER18_STORIES.q105_intro.lines.some(l=>l.text==='『こむぎせんせいへ　ほしのパン、わたしもつくりたいです。ひかり』'),
              cloud:CHAPTER18_STORIES.q108_intro.lines.some(l=>l.text==='曇りは、まだ残っている。'),
              paragraph:CHAPTER18_STORIES.q107.lines.some(l=>l.text==='こむぎは、原画を真ん中から引き裂いた。'),
              label:CHAPTER18_STORIES.chapter18_end.lines[0].text.startsWith('夕陽が沈み、町に一つずつ灯りがともりはじめる。')
            },
            version:document.title,oldUnit:BYID.juri_daily?.id||null
          };
        }""")
        ck("20 chapters/quest segments",meta["chapterSegments"]==20,meta)
        ck("every quest has intro, pre, post",all(all(x in meta["allSegments"] for x in triple) for triple in meta["expected"]),meta)
        ck("six new quests",meta["questIds"]==[f"q{i}" for i in range(103,109)],meta)
        ck("quest prerequisite chain",all(meta["requirements"][i]==[f"q{i+102}"] for i in range(6)),meta)
        ck("six factual investigations with three real/two irrelevant",meta["cases"]==[[3,2,3,5]]*6,meta)
        ck("all backdrops use existing files",not meta["missingBackgrounds"],meta)
        ck("four battle markers including two in q107",dict(meta["markerCounts"])=={"q103":0,"q104":1,"q105":0,"q106":1,"q107":2,"q108":0},meta)
        ck("unknown speaker identity remains hidden",len(meta["permanentNames"])==2,meta)
        ck("proposal memo absent",not meta["removedNotes"],meta)
        ck("sensitive canonical lines",all(meta["importantText"].values()),meta)

        # An old q102-cleared save must unlock the chapter without overwriting old data.
        before=page.evaluate("""() => {
          S=fresh();S.gameStarted=true;S.onboarding.enabled=false;S.questGuideSeen=true;
          S.quests.q102={clues:2,complete:true};
          S.storyFlags.chapter1_open=true; // An actual q102-completed save has cleared the first chapter's gate.
          S.storyFlags.q102=true;S.storyFlags.chapter17_end=true;
          S.storyFlags.chapter18_open=false;
          S.gems=44000;S.gold=99999;
          S.legacyExtension={keep:'untouched'};
          S.battleMode='turn';
          persist();
          return {r:!!storyAllowed('chapter18_open'),q103:questUnlocked(QUEST_BY_ID.q103),
                  content:localStorage.getItem('yoiboshi-reboot-v1')};
        }""")
        ck("q102 clear unlocks Chapter 18 opening",before["r"] and not before["q103"],before)
        page.reload(wait_until="load",timeout=120000)
        page.wait_for_function("typeof load==='function'")
        save=page.evaluate("""() => ({
          hasQ102:!!S.quests.q102.complete,old:!!S.storyFlags.chapter17_end,
          untouched:S.legacyExtension?.keep,
          before:!!S.storyFlags.chapter18_open,
          newQuest:!!S.quests.q103
        })""")
        ck("q102 clear save reloads without losing old values",save["hasQ102"] and save["old"] and save["untouched"]=="untouched" and not save["before"] and not save["newQuest"],save)

        def read_story(story_id,already_open=False):
            return page.evaluate("""([id,already])=>{
              if(!already)openStory(id);
              if(!storySession||storySession.id!==id)throw Error('failed to open '+id+' view='+view);
              const count=romanceScript(id).lines.length;
              const seen=[];
              for(let i=0;i<count;i++){
                if(storySession?.id!==id)throw Error('story closed too soon '+id+' at '+i);
                const sc=romanceScript(id).lines[storySession.step];
                seen.push(sc.text);
                const el=document.querySelector('.story-line');
                if(!el||!el.textContent?.trim())throw Error('missing VN dialogue on screen '+id+' '+i);
                nextStory();
              }
              if(storySession?.id===id)throw Error('story remains open '+id);
              return {id,steps:count,seen:seen.length,flag:!!S.storyFlags[id],view};
            }""",[story_id,already_open])

        opening=read_story("chapter18_open")
        ck("Chapter 18 opening scene fully read",opening["flag"] and opening["steps"]>=6,opening)

        results=[]
        for number in range(103,109):
            qid=f"q{number}"
            previous=f"q{number-1}"
            story=read_story(qid+"_intro")
            ck(qid+" introduction fully read",story["flag"] and story["steps"]>0,story)
            state=page.evaluate("""(id)=>{
              const q=QUEST_BY_ID[id],previous='q'+(Number(id.slice(1))-1);
              const valid=questUnlocked(q)&&!!S.quests[previous]?.complete;
              startInvestigation(id);
              return {valid,phase:S.investigations[id]?.phase,view};
            }""",qid)
            ck(qid+" prerequisite and real investigation starts",state["valid"] and state["phase"]=="companion" and state["view"]=="investigation",state)

            inv=page.evaluate("""id=>{
              const choices=investigationSelectableHeroes(id);
              if(!choices.includes('momoka'))throw Error('momoka was not selectable '+id);
              chooseInvestigationHero('momoka');
              for(let index=0;index<3;index++)investigateAt(index);
              const q=INVESTIGATION_CASES[id],st=S.investigations[id];
              if(st.phase!=='deduce')throw Error('investigation phase '+st.phase);
              resolveInvestigation(q.correct);
              if(st.phase!=='echo')throw Error('wrong deduction: '+st.phase);
              for(let k=0;k<q.release.length;k++)advanceInvestigationEcho();
              return {phase:st.phase,solved:st.solved,clues:st.clues.length,safety:!!st.skillUsed};
            }""",qid)
            ck(qid+" clue interview/deduction/echo",inv["phase"]=="ready" and inv["solved"] and inv["clues"]>=3,inv)

            pre=page.evaluate("""id=>{
              startBattle(id);
              return {storyId:storySession?.id||null,view,
                totalWaves:QUEST_BY_ID[id].waves};
            }""",qid)
            ck(qid+" prebattle story automatically opens",pre["storyId"]==qid+"_pre",pre)
            preRead=read_story(qid+"_pre",True)
            ck(qid+" all prebattle dialogue shown",preRead["flag"] and preRead["steps"]>0,preRead)
            combat=page.evaluate("""id=>{
              if(!battle||battle.qid!==id||view!=='combat'||!battle.turnBattle)
                return {error:'battle not running',view,actual:battle?.qid};
              // Test-only ally strength to make the actual turn-engine combat quick.
              // No production stat/balance formulas or persistent save data are changed.
              for(const a of battle.allies){a.atk=200000;a.max=200000;a.hp=200000;}
              const final=makeWave(QUEST_BY_ID[id],QUEST_BY_ID[id].waves-1);
              const started={qid:battle.qid,waves:battle.totalWaves,firstWave: battle.enemies.map(e=>e.name),lastEnemy:final.at(-1)?.name};
              battle.tb.auto=true;battle.tb.speed=200;
              tbAdvance();
              return started;
            }""",qid)
            ck(qid+" real turn combat started",combat.get("qid")==qid and combat["waves"]==pre["totalWaves"],combat)
            if qid=="q107":
                ck("q107 first wave shows canonical frame echoes",combat["firstWave"]==["額縁の残響","額縁の残響"],combat)
                ck("q107 final wave protects big frame",combat["lastEnemy"]=="額縁の残響（大）",combat)
            if qid=="q106":
                ck("q106 final wave includes bottle guard",combat["lastEnemy"]=="瓶番の残響",combat)
            # The authentic turn engine resolves each enemy hit and successive waves.
            page.wait_for_function("""id=>!battle&&S.quests[id]?.complete===true""",arg=qid,timeout=120000)
            outcome=page.evaluate("""id=>({
              questCompleted:!!S.quests[id]?.complete,
              postQueued:pendingStory?.storyId===id,
              dialog:dialog?.title||'',
              reward:QUEST_BY_ID[id].reward
            })""",qid)
            ck(qid+" combat completed and rewards credited",outcome["questCompleted"] and outcome["postQueued"],outcome)
            page.evaluate("closeDialog()")
            post=read_story(qid,True)
            ck(qid+" postbattle canonical story read",post["flag"] and post["steps"]>0,post)
            results.append({"id":qid,"intro":story["steps"],"investigation":inv,"combat":combat,
                            "post":post["steps"],"reward":outcome["reward"]})

        finish=read_story("chapter18_end")
        ck("chapter ending read after q108",finish["flag"] and finish["steps"]==1,finish)
        saved=page.evaluate("""()=>({
          quests:Array.from({length:6},(_,i)=>!!S.quests['q'+(103+i)]?.complete),
          flags:Array.from({length:6},(_,i)=>!!S.storyFlags['q'+(103+i)]),
          done:!!S.storyFlags.chapter18_end,prior:!!S.quests.q102?.complete,
          juri:BYID.juri_daily?.id||null,extra:S.legacyExtension?.keep,
          saved:localStorage.getItem('yoiboshi-reboot-v1')
        })""")
        ck("all quests and post-stories completed",all(saved["quests"]) and all(saved["flags"]) and saved["done"] and saved["prior"],saved)
        ck("old extension preserved",saved["extra"]=="untouched",saved)
        page.reload(wait_until="load",timeout=120000)
        page.wait_for_function("typeof load==='function'")
        after=page.evaluate("""()=>({
          done:!!S.storyFlags.chapter18_end,
          q102:!!S.quests.q102?.complete,
          quests:Array.from({length:6},(_,i)=>!!S.quests['q'+(103+i)]?.complete),
          extension:S.legacyExtension?.keep
        })""")
        ck("save reload preserves chapter18 and prior q102",after["done"] and after["q102"] and all(after["quests"]) and after["extension"]=="untouched",after)

        mobile=[]
        for w,h in [(390,844),(568,320),(844,390),(926,428),(1280,800)]:
            page.set_viewport_size({"width":w,"height":h})
            metrics=page.evaluate("""() => {
              S.gameStarted=true;S.onboarding.enabled=false;
              view='story';openStory('q107');
              const width=document.documentElement.scrollWidth;
              return {width,viewport:window.innerWidth,
                      story:document.querySelector('.chapter-story')!==null,
                      content:document.querySelector('.story-line')?.textContent?.length||0};
            }""")
            ck(f"mobile {w}x{h} story no overflow",metrics["width"]<=w+2 and metrics["story"] and metrics["content"]>0,metrics)
            mobile.append({"size":[w,h],**metrics})
            if (w,h) in [(390,844),(844,390)]:
                page.screenshot(path=str(OUT/f"q107_story_{w}x{h}.png"),full_page=True)
        ck("no JavaScript exceptions",not errors,errors)
        report={"result":"PASS","checks":len(checks),"metadata":meta,
                "quests":results,"ending":finish,"saved":after,"mobile":mobile,"js_errors":errors}
        (OUT/"result.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
        print(json.dumps({"result":"PASS","checks":len(checks),"questIds":[x["id"] for x in results],
                          "allBattlesCompleted":len(results),"storyLines":meta["chapterLines"],
                          "lastBattle":results[-2]["combat"],"mobile":mobile},
                         ensure_ascii=False))
        browser.close()
finally:
    srv.shutdown()
