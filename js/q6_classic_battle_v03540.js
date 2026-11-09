/* 宵星の契約者 RE:START: クラシックサイドビュー v0.35.4.0（q6で試作）
 * Ver.0.50.2.0 から、自動周回以外のすべてのターン制の戦闘に適用（以前はq6だけ）。
 * 計算・編成・報酬・セーブは変更しない。
 * 現行 tbRender → ycRenderTurn の完了後、表示のみを調整する。
 */
(function q6ClassicBattle(){
 'use strict';
 if(typeof tbRender!=='function'||typeof tbCurrent!=='function')return;
 var enabled=true;
 var originalRender=tbRender;
 var fallbackBoss='assets/enemies/zankyo/part1-000.webp?v=0.50.7.0';
 // battle_turn_v032.js の eventBossArt と同じ対応（敵一覧の小さな絵と、戦場の大きな絵をそろえる）
 var EVENT_BOSS_ART={q18:'assets/enemies/zankyo/part1-008.webp?v=0.50.7.0',q28:'assets/enemies/saya.webp',q34:'assets/enemies/ibuki_battle.webp',q35:'assets/enemies/aoi_dark.webp',q40:'assets/enemies/aoi_dark.webp',q45:'assets/enemies/aoi_dark.webp',q46:'assets/enemies/ruri.webp',q52:'assets/enemies/touko_true.webp',q58:'assets/enemies/touko_true.webp',q81:'assets/enemies/touko_true.webp',q89:'assets/enemies/enju.webp',q53:'assets/enemies/zankyo/part1-004.webp?v=0.50.7.0',q29:'assets/enemies/zankyo/part1-004.webp?v=0.50.7.0',q17:'assets/enemies/ibuki_battle.webp',q24:'assets/enemies/haruka.webp'};
 // 大きく描くボスの絵：q6は従来どおり。ほかは残響図鑑の割り当て、なければq6と同じ絵。
 function bossImageFor(b,e,i){
  if(b.qid==='q6')return fallbackBoss;
  // 物語のボス（透子・沙耶・イブキ・黒い灯の葵・ルリ・槐など）は、敵一覧と同じ専用の絵を使う
  if(b.qid==='q12')return 'assets/enemies/sakuya_battle.webp';
  if(EVENT_BOSS_ART[b.qid])return EVENT_BOSS_ART[b.qid];
  try{
   if(window.YoiEnemyArt){var r=window.YoiEnemyArt.resolve(e,{qid:b.qid,wave:b.wave,index:i});if(r&&r.src)return r.src;}
  }catch(_){}
  return fallbackBoss;
 }
 function placeName(b){
  try{var q=QUEST_BY_ID[b.qid];if(q&&q.location)return String(q.location).replace(/^.*・/,'');}catch(_){}
  return '';
 }
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
  // 場所名のラベル：q6は従来の「旧灯台・残響域」、ほかは依頼の場所
  var loc='';try{loc=String((QUEST_BY_ID[b.qid]||{}).location||'');}catch(_){}
  stage.classList.toggle('q6-classic-generic',b.qid!=='q6');
  stage.dataset.place=b.qid==='q6'?'旧灯台・残響域':loc;
  stage.setAttribute('aria-label',(placeName(b)?placeName(b)+'の':'')+'戦場。左側が味方、右側が敵。敵を押すと対象を選択');
  // Ally slots keep YoiChibi.FORMATION (left-hand formation), including damage popup anchors.
  var last=b.wave===b.totalWaves-1;
  // Use stable non-overlapping slots measured from the LEFT edge of each actor.
  // This renderer intentionally disables translateX(-50%) on enemy slots.
  var visibleNodes=Array.from(stage.querySelectorAll(':scope > .yc-enemy-slot'));
  var bossPresent=last&&visibleNodes.some(function(node){
    var idx=Number(node.dataset.enemyIndex);return b.enemies[idx]?.kind==='boss';
  });
  var smallCount=0;
  visibleNodes.forEach(function(node,i){
   // The display excludes defeated enemies, so DOM order may differ from
   // the original battle.enemies indices used for target identity and visuals.
   var enemyIndex=Number(node.dataset.enemyIndex);
   if(!Number.isInteger(enemyIndex)||enemyIndex<0)enemyIndex=i;
   var e=b.enemies[enemyIndex];if(!e)return;
   var giant=last&&e.kind==='boss';
   node.classList.toggle('q6-giant',giant);
   node.classList.toggle('q6-minion',!giant);
   var aura=statuses(e,b.tb.round).map(function(st){return st[0];});
   ['red','blue','green'].forEach(function(c){node.classList.toggle('q6-aura-'+c,aura.indexOf(c)>=0);});
   // The old 49%-wide boss at left 51%, plus a 22%-wide minion at
   // left 70%, overlapped on narrow phones. Reserve exclusive columns.
   var count=visibleNodes.length;
   var left,width;
   if(bossPresent){
     if(count===1){left=59;width=39;}
     else if(count===2){
       if(giant){left=66;width=32;}
       else {left=49;width=15;}
     }else if(giant){left=72;width=26;}
     else {left=48+(smallCount++)*12;width=11;}
   }else{
     var slots={1:[[67,30]],2:[[54,20],[77,20]],3:[[50,14],[66,14],[82,14]]};
     var slot=(slots[count]||slots[3])[i]||[50,14];
     left=slot[0];width=slot[1];
   }
   node.style.setProperty('left',left+'%','important');
   node.style.setProperty('width',width+'%','important');
   node.style.setProperty('bottom',(giant?1:(last?6:(i%2===0?9:5)))+'%','important');
   if(giant){
    var shell=node.querySelector('.yc-enemy-shell');
    if(shell&&!shell.querySelector('img')){
     var img=el('img','yc-enemy-art');
     img.src=bossImageFor(b,e,i);img.alt='';img.loading='eager';img.decoding='async';img.draggable=false;
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
  if(!b||!b.turnBattle||b.grind)return;
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