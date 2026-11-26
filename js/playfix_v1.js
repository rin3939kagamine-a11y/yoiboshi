// 気づき27・28番: クエストシートの報酬表記を実態に合わせる／周回で戦闘速度が戻らないようにする。
(function(){
 'use strict';
 // 27番: クリア済みクエストの詳細シートは「初回報酬」ではなく、実際に得られる周回報酬を表示する。
 if(typeof cityBottomSheet==='function'){
  var origSheet=cityBottomSheet;
  cityBottomSheet=function(q){
   var html=origSheet(q);
   try{
    var st=(typeof S!=='undefined'&&S.quests)?S.quests[q.id]:null;
    if(st&&st.complete&&typeof farmGold==='function'&&typeof farmGems==='function'){
     var xp=Math.max(10,Math.round(farmGold(q)/10));
     html=html.replace(/<small>初回報酬<\/small><strong>[^<]*<\/strong>/,'<small>周回報酬</small><strong>✧ '+farmGems(q).toLocaleString()+' ／ ◈ '+farmGold(q).toLocaleString()+' ／ 経験値 +'+xp+'</strong>');
    }
   }catch(e){}
   return html;
  };
 }
 // 28番: 戦闘速度（×1/×2）の選択を保存し、次の戦闘でも引き継ぐ。周回で等倍に戻らないようにする。
 var SPEED_KEY='yoiboshi.tbSpeed';
 function savedSpeed(){ try{ return Number(localStorage.getItem(SPEED_KEY))===2?2:1; }catch(e){ return 1; } }
 if(typeof tbToggleSpeed==='function'){
  var origToggle=tbToggleSpeed;
  tbToggleSpeed=function(){
   origToggle();
   try{ var b=(typeof tbCurrent==='function')?tbCurrent():null; if(b&&b.tb) localStorage.setItem(SPEED_KEY,String(b.tb.speed)); }catch(e){}
  };
 }
 if(typeof tbInit==='function'){
  var origInit=tbInit;
  tbInit=function(){
   origInit();
   try{ if(typeof battle!=='undefined'&&battle&&battle.tb) battle.tb.speed=savedSpeed(); }catch(e){}
  };
 }
})();
