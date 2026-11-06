/* 宵星の契約者 RE:START: q6 クラシックサイドビュー試作 v0.35.4.0
 * q6のターン制だけに適用。計算・編成・報酬・セーブは変更しない。
 * 現行 tbRender → ycRenderTurn の完了後、表示のみを調整する。
 */
(function q6ClassicBattle(){
 'use strict';
 if(typeof tbRender!=='function'||typeof tbCurrent!=='function')return;
 var enabled=true;
 var originalRender=tbRender;
 var bossImage='assets/enemies/zankyo/part1-000.webp';
 function el(tag,cls,label){
  var node=document.createElement(tag);
  if(cls)node.className=cls;
  if(label!==undefined)node.textContent=String(label);
  return node;
 }
 function pct(hp,max){return Math.max(0,Math.min(100,Math.round(100*hp/Math.max(1,max))));}
 function statuses(e,round){
  var result=[];
  if(e.effects&&e.effects.attack>0||e.attackUpRounds>0)result.push(['red','攻撃強化']);
  if(e.defDownRounds>0)result.push(['blue','防御低下']);
  if(e.weakenRounds>0)result.push(['blue','攻撃低下']);
  if(e.stunRounds>0)result.push(['blue','足止め']);
  if(e.breakSkips>0)result.push(['blue','ブレイク']);
  if(e.shield>0)result.push(['green','障壁']);
  if(round>0&&e.guardingUntil>=round)result.push(['green','ガード']);
  if(e.damageReduction>=.2)result.push(['green','耐性']);
  return result;
 }
 function topHud(b,field){
  var selected=b.enemies[b.tb.targetEnemy]&&b.enemies[b.tb.targetEnemy].hp>0?b.tb.targetEnemy:b.enemies.findIndex(function(e){return e.hp>0;});
  var boss=b.wave===b.totalWaves-1?b.enemies.findIndex(function(e){return e.hp>0&&e.kind==='boss';}):-1;
  var focus=boss>=0?boss:selected;
  var enemy=b.enemies[focus];
  if(!enemy)return;
  var hud=el('div','q6-classic-hud');
  var label=el('div','q6-classic-hud-top');
  label.append(el('strong','',enemy.name),el('span','q6-classic-percent',pct(enemy.hp,enemy.max)+'%'));
  var hp=el('div','q6-classic-hp'),bar=el('i');
  bar.style.width=pct(enemy.hp,enemy.max)+'%';hp.appendChild(bar);
  var state=el('div','q6-classic-status'),all=statuses(enemy,b.tb.round);
  if(!all.length)state.appendChild(el('span','q6-classic-state neutral','状態異常なし'));
  all.forEach(function(st){state.appendChild(el('span','q6-classic-state '+st[0],st[1]));});
  var targets=el('div','q6-classic-targets');
  b.enemies.forEach(function(e,i){
   if(e.hp<=0)return;
   var chosen=b.tb.targetEnemy===i;
   var btn=el('button','q6-classic-target'+(chosen?' chosen':''),e.name);
   btn.type='button';btn.title=e.name+'を攻撃対象にする';
   btn.setAttribute('aria-pressed',String(chosen));
   btn.addEventListener('click',function(){if(typeof tbPickEnemy==='function')tbPickEnemy(i);});
   targets.appendChild(btn);
  });
  hud.append(label,hp,state,targets);
  field.insertBefore(hud,field.firstChild);
 }
 function arrange(b,field){
  var stage=field.querySelector('#ycTurnStage');
  if(!stage)return;
  stage.classList.add('q6-classic-stage');
  stage.setAttribute('aria-label','旧灯台の戦場。左側が味方、右側が敵。敵を押すと対象を選択');
  // Ally slots keep YoiChibi.FORMATION (left-hand formation), including damage popup anchors.
  var last=b.wave===b.totalWaves-1;
  stage.querySelectorAll(':scope > .yc-enemy-slot').forEach(function(node,i){
   var e=b.enemies[i];if(!e)return;
   var giant=last&&e.kind==='boss';
   node.classList.toggle('q6-giant',giant);
   node.classList.toggle('q6-minion',!giant);
   var aura=statuses(e,b.tb.round).map(function(st){return st[0];});
   ['red','blue','green'].forEach(function(c){node.classList.toggle('q6-aura-'+c,aura.indexOf(c)>=0);});
   node.style.setProperty('left',(giant?51:(last?72+(i%2)*9:54+i*14))+'%','important');
   node.style.setProperty('bottom',(giant?1:(last?6:(i%2===0?9:5)))+'%','important');
   if(giant){
    var shell=node.querySelector('.yc-enemy-shell');
    if(shell&&!shell.querySelector('img')){
     var img=el('img','yc-enemy-art');
     img.src=bossImage;img.alt='';img.loading='eager';img.decoding='async';img.draggable=false;
     img.onerror=function(){img.remove();shell.classList.remove('yc-enemy-art-shell');};
     shell.classList.add('yc-enemy-art-shell');
     shell.appendChild(img);
    }
   }
  });
  stage.classList.toggle('q6-boss-wave',last);
  var detail=field.querySelector('.tb-enemies');
  if(detail){detail.classList.add('q6-detail-targets');detail.setAttribute('aria-label','敵の詳細情報');}
 }
 function switcher(top){
  var group=top&&top.querySelector('div');if(!group)return;
  var button=el('button','btn mini outline q6-layout-switch',enabled?'標準UI':'クラシックUI');
  button.type='button';
  button.setAttribute('aria-label',enabled?'標準UIへ戻す':'クラシックUIへ戻す');
  button.addEventListener('click',function(){enabled=!enabled;tbRender();});
  group.appendChild(button);
 }
 function apply(){
  var b=tbCurrent();
  if(!b||b.qid!=='q6'||!b.turnBattle||b.grind)return;
  var root=document.querySelector('.tb-root');if(!root)return;
  switcher(root.querySelector('.tb-topline'));
  if(!enabled)return;
  root.classList.add('q6-classic');
  var field=root.querySelector('.tb-fighters');
  if(!field)return;
  topHud(b,field);
  arrange(b,field);
  var attack=root.querySelector('.tb-commands button[onclick="tbAction(\'attack\')"]');
  if(attack){attack.classList.add('q6-attack-btn');attack.textContent='ATTACK';}
 }
 tbRender=function(){
  var result=originalRender.apply(this,arguments);
  try{apply();}catch(error){console.error('[宵星 q6 classic UI]',error);}
  return result;
 };
})();