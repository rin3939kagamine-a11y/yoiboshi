/* Quest-location backdrops for turn and legacy combat. Presentation only; no saved state. */
(function battleLocationBackgrounds(){
 'use strict';
 // Specific locations precede broad ones (e.g. lighthouse underground vs. lighthouse).
 var PLACES=[
  [/相談室/, 'soudan'],
  [/灯室/, 'toushitsu'],
  [/灯台.*地下|地下.*灯台/, 'chika'],
  [/旧灯台|灯台/, 'lighthouse'],
  [/喫茶|カフェ|珈琲/, 'kissa'],
  [/セレクトショップ|洋服店/, 'shop'],
  [/駅前|駅周辺/, 'ekimae'],
  [/海浜|海辺|海岸|臨海|浜辺|サーフ/, 'kaihin'],
  [/東雲商店街|商店街/, 'shotengai'],
  [/プラネタリウム/, 'planetarium'],
  [/水族館/, 'suizokukan'],
  [/発電所/, 'hatsuden'],
  [/倉庫街|倉庫/, 'soko'],
  [/夜市/, 'yoichi'],
  [/ルミエール/, 'lumiere'],
  [/ドック|クラブ/, 'dock'],
  [/料亭|宵星亭/, 'ryotei'],
  [/神楽坂家/, 'kaede'],
  [/市役所/, 'shiyakusho'],
  [/学校|教室/, 'kyoushitsu'],
  [/書庫/, 'shoko'],
  [/スタジオ/, 'studio'],
  [/祭り|祭会場|前夜祭/, 'matsuri'],
  [/海底|海中/, 'umisoko'],
  [/調査室/, 'chousa']
 ];
 function resolve(qid){
  if(typeof QUEST_BY_ID==='undefined'||typeof storyBackgroundFile!=='function')return null;
  var q=QUEST_BY_ID[qid];
  if(!q)return null;
  var authored=typeof STORY_BACKGROUNDS==='undefined'?null:
    (STORY_BACKGROUNDS[qid]||STORY_BACKGROUNDS[qid+'_pre']||STORY_BACKGROUNDS[qid+'_intro']);
  var location=String(q.location||''),zone=null;
  for(var i=0;i<PLACES.length;i++){
   if(PLACES[i][0].test(location)){zone=PLACES[i][1];break;}
  }
  if(!zone&&authored)zone=authored.bg;
  if(!zone)return null;
  // Keep the existing story's time of day if it depicts this same location.
  var preferred=authored&&authored.bg===zone?authored.time:null;
  var times=[preferred,'night','dusk','day','late','dawn','pre','live',''];
  for(var j=0,used={};j<times.length;j++){
   var time=times[j];
   if(time===null||time===undefined||used['t'+time])continue;
   used['t'+time]=true;
   var file=storyBackgroundFile(zone,time);
   if(file)return file;
  }
  return null; // No matching asset: preserve the existing CSS gradient.
 }
 function refresh(){
  if(typeof battle==='undefined'||!battle||battle.done||typeof view==='undefined'||view!=='combat')return;
  var stage=battle.turnBattle?
    document.querySelector('.tb-root .yc-turn-stage:not(.q6-classic-stage)'):
    document.querySelector('.v024-battle-stage .arena.overhead');
  // q6's authored lighthouse/HUD design and cinematic arenas keep their own visuals.
  if(!stage||stage.closest('.qcin-active'))return;
  var file=resolve(battle.qid);
  if(!file){
   stage.classList.remove('yb-location-bg');
   stage.style.removeProperty('--yb-battle-image');
   delete stage.dataset.ybBg;
   return;
  }
  if(stage.dataset.ybBg===file&&stage.classList.contains('yb-location-bg'))return;
  stage.style.setProperty('--yb-battle-image','url("'+file+'")');
  stage.dataset.ybBg=file;
  stage.classList.add('yb-location-bg');
 }
 // Hook only render boundaries. No changes to combat state, timers, calculations or saves.
 if(typeof tbRender==='function'){
  var originalTurn=tbRender;
  tbRender=function(){var result=originalTurn.apply(this,arguments);refresh();return result;};
 }
 if(typeof renderCombatFrame==='function'){
  var originalLegacy=renderCombatFrame;
  renderCombatFrame=function(){var result=originalLegacy.apply(this,arguments);refresh();return result;};
 }
 window.YoiBattleBackgrounds=Object.freeze({resolve:resolve,refresh:refresh});
})();