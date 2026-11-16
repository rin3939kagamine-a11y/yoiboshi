/* 体験版・デバッグ版の切り替え（Ver.0.99.1.0）。
   trial.html / debug.html だけが読み込む。index.html（通常版）には入っていない。
   どちらの版も、通常版とは別の場所にセーブする（game.js の KEY が版ごとに変わる）。
   - 体験版(trial)：第1部（第10章）まで遊べる。それ以降の章・依頼は閉じる。
   - デバッグ版(debug)：全章・全依頼を最初から解放。右上の DEBUG ボタンで石・コインの追加、戦闘の即勝利ができる。 */
(function(){
 const ED=window.YOIBOSHI_EDITION;
 if(ED!=='trial'&&ED!=='debug')return;
 const TRIAL_LAST_CHAPTER=10;
 const LAST_CHAPTER=70;

 // 物語IDが何章のものかを調べる（分からないものは null）
 function storyChapter(id){
  if(typeof id!=='string')return null;
  let m=id.match(/^chapter(\d+)_/);if(m)return Number(m[1]);
  m=id.match(/^(?:hero74_)?(q\d+)(?:_intro|_pre)?$/);
  if(m&&typeof QUEST_BY_ID!=='undefined'&&QUEST_BY_ID[m[1]])return QUEST_BY_ID[m[1]].chapter;
  return null;
 }

 const origStoryAllowed=storyAllowed, origQuestUnlocked=questUnlocked, origRender=render;

 if(ED==='trial'){
  storyAllowed=function(id){
   const c=storyChapter(id);
   if(c!==null&&c>TRIAL_LAST_CHAPTER)return false;
   return origStoryAllowed.apply(this,arguments);
  };
  questUnlocked=function(q){
   if(q&&q.chapter>TRIAL_LAST_CHAPTER)return false;
   return origQuestUnlocked.apply(this,arguments);
  };
  render=function(){
   if(S?.storyFlags?.['chapter'+TRIAL_LAST_CHAPTER+'_end']&&!S.trialEndShown&&!dialog&&!storySession&&view!=='title'){
    S.trialEndShown=true;
    dialog={title:'体験版はここまで',message:'第1部「宵星」までお楽しみいただき、ありがとうございました。\nこの先の物語は製品版でお楽しみください。\n体験版では、ここまでの依頼の周回や交流、ガチャは引き続き遊べます。'};
    try{persist()}catch(_){}
   }
   return origRender.apply(this,arguments);
  };
 }

 if(ED==='debug'){
  function unlockAll(){
   if(!S)return;
   S.storyFlags=S.storyFlags||{};
   for(let n=1;n<=LAST_CHAPTER;n++)S.storyFlags['chapter'+n+'_open']=true;
   if(S.onboarding)S.onboarding.enabled=false;
  }
  storyAllowed=function(id){
   if(id==='hero74_backlog')return origStoryAllowed.apply(this,arguments);
   if(typeof id==='string'&&id.startsWith('hero74_'))return true;
   return true;
  };
  questUnlocked=function(){return true;};
  render=function(){
   if(view!=='title')unlockAll();
   const r=origRender.apply(this,arguments);
   debugButton();
   return r;
  };

  window.debugAddGems=function(){S.gems+=100000;persist();render();toast('星晶石 +100,000');};
  window.debugAddGold=function(){S.gold+=100000;persist();render();toast('コイン +100,000');};
  window.debugWin=function(){
   if(view!=='combat'||!battle||battle.done){toast('戦闘中だけ使えます');return;}
   try{if(typeof tbClearTimer==='function')tbClearTimer();}catch(_){}
   finishBattle(true);
  };
  window.debugToggle=function(){
   const p=document.getElementById('yb-debug-panel');if(p)p.hidden=!p.hidden;
  };
  function debugButton(){
   if(view==='title')return;
   let box=document.getElementById('yb-debug');
   if(!box){
    box=document.createElement('div');box.id='yb-debug';
    box.style.cssText='position:fixed;left:8px;bottom:8px;z-index:99999;font:12px sans-serif';
    box.innerHTML='<button type="button" onclick="debugToggle()" style="background:#c0392b;color:#fff;border:0;border-radius:8px;padding:6px 10px;font-weight:700">DEBUG</button>'+
     '<div id="yb-debug-panel" hidden style="margin-top:6px;background:#fff;border:1px solid #c0392b;border-radius:8px;padding:8px;display:grid;gap:6px;min-width:150px">'+
     '<button type="button" onclick="debugWin()">戦闘に即勝利</button>'+
     '<button type="button" onclick="debugAddGems()">星晶石 +100,000</button>'+
     '<button type="button" onclick="debugAddGold()">コイン +100,000</button>'+
     '<small style="color:#888">デバッグ版：全章解放・別セーブ</small></div>';
    document.body.appendChild(box);
   }
  }
 }

 // タイトル画面に版の名前を出す
 const label=ED==='trial'?'体験版':'デバッグ版';
 const origTitlePage=titlePage;
 titlePage=function(){
  return origTitlePage.apply(this,arguments).replace('RE:START','RE:START　'+label);
 };
 try{render();}catch(_){}
})();
