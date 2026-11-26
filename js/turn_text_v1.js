// 気づき29番: 戦闘方式がターン制のとき、スキル説明をターン表記に切り替える（旧方式では秒表記のまま）
// ターン制の実測値: バフ・デバフ類は3ラウンド、足止めは1ラウンド、継続回復は3ラウンド（毎ラウンド最大HPの9%）、CT短縮は1ラウンド分、スキルCTは2/3ラウンド
(function(){
 'use strict';
 function turnMode(){
  try{ return typeof tbSelected==='function' ? tbSelected() : (typeof S!=='undefined' && S.battleMode!=='legacy'); }
  catch(e){ return false; }
 }
 function toTurnText(t){
  if(typeof t!=='string')return t;
  t=t.replace(/味方単体HP\d+を2秒毎に回復／8秒/g,'味方単体を3ラウンド継続回復（毎ラウンド最大HPの9%）');
  t=t.replace(/生存中の敵全体の次回攻撃CTを[0-9.]+秒延長/g,'生存中の敵全体を1ラウンド足止め');
  t=t.replace(/その敵の次回攻撃CTを[0-9.]+秒延長/g,'その敵を1ラウンド足止め');
  t=t.replace(/敵単体の次回攻撃CTを[0-9.]+秒延長/g,'敵単体を1ラウンド足止め');
  t=t.replace(/残りスキルCTを[0-9.]+秒短縮/g,'残りスキルCTを1ラウンド短縮');
  t=t.replace(/残りスキルCT-[0-9.]+秒/g,'残りスキルCT-1ラウンド');
  t=t.replace(/残りCTを[0-9.]+秒短縮/g,'残りCTを1ラウンド短縮');
  t=t.replace(/を[0-9.]+秒足止め/g,'を1ラウンド足止め');
  t=t.replace(/自身に[0-9.]+秒の反撃態勢/g,'自身に3ラウンドの反撃態勢');
  t=t.replace(/攻撃を[0-9.]+秒肩代わり/g,'攻撃を3ラウンド肩代わり');
  t=t.replace(/[0-9.]+秒挑発/g,'3ラウンド挑発');
  t=t.replace(/／[0-9.]+秒/g,'／3ラウンド');
  return t;
 }
 if(typeof skillDescription==='function'){
  var origSD=skillDescription;
  skillDescription=function(u,j,rank){
   var t=origSD.apply(this,arguments);
   return turnMode()?toTurnText(t):t;
  };
 }
 // 戦闘開始の攻撃アップ特性: ターン制では開始から約3ラウンド効く（10秒÷1ラウンド3秒換算）
 if(typeof passiveDescription==='function'){
  var origPD2=passiveDescription;
  passiveDescription=function(u){
   var t=origPD2.apply(this,arguments);
   try{
    if(turnMode()&&u&&unitPassive(u).type==='team_start_atk'){
     t=t.replace('戦闘開始から10秒間','戦闘開始から3ラウンド');
    }
   }catch(e){}
   return t;
  };
 }
 // 持続を延ばす特性はターン制では効かないため、その旨を添える（旧方式でのみ有効）
 var EXTEND_TYPES=['scan_extend','stun_extend','attack_down_extend','regen_duration','nanami_debuff_extend'];
 if(typeof passiveDescription==='function'){
  var origPD=passiveDescription;
  passiveDescription=function(u){
   var t=origPD.apply(this,arguments);
   try{
    if(turnMode()&&u&&EXTEND_TYPES.includes(unitPassive(u).type)){
     var needle='+'+passiveValue(u)+'秒';
     if(t.includes(needle))t=t.replace(needle,needle+'（旧方式のみ有効）');
    }
   }catch(e){}
   return t;
  };
 }
 // キャラ詳細のスキルCT表記（手動発動 · 独立クールタイム N秒）をターン制ではラウンドに直す
 function fixCtLines(){
  if(!turnMode())return;
  document.querySelectorAll('p').forEach(function(p){
   var t=p.textContent||'';
   if(!t.includes('独立クールタイム'))return;
   var next=t.replace(/独立クールタイム 9秒/,'独立クールタイム 2ラウンド').replace(/独立クールタイム 14秒/,'独立クールタイム 3ラウンド');
   if(next!==t)p.textContent=next;
  });
 }
 if(typeof MutationObserver!=='undefined'&&document.body){
  var pending=false;
  var mo=new MutationObserver(function(){
   if(pending)return; pending=true;
   setTimeout(function(){ pending=false; try{fixCtLines();}catch(e){} },60);
  });
  mo.observe(document.body,{childList:true,subtree:true});
 }
})();
