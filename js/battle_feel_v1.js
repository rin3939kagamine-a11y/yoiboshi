// 気づき31・32・33・24番: 親愛度バフ／役割補正／ボス必殺技の予告強化／必殺技エフェクト
(function(){
 'use strict';
 var style=document.createElement('style');
 style.textContent=
  '.tb-enemy{position:relative}'
  +'.bf-ult-badge{position:absolute;top:-9px;right:-7px;width:26px;height:26px;border-radius:50%;background:#e8a33d;color:#fff;font-weight:900;font-size:17px;line-height:1;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 5px rgba(0,0,0,.45);animation:bfPulse 1s ease-in-out infinite;z-index:3}'
  +'.bf-ult-badge.bf-ult-now{background:#d43a2f}'
  +'@keyframes bfPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}'
  +'#bf-skill-fx{position:fixed;inset:0;pointer-events:none;z-index:9998}'
  +'.bf-skill-flash{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(255,236,170,.55) 0%,rgba(255,200,80,.18) 45%,transparent 75%);animation:bfFlash .55s ease-out forwards}'
  +'@keyframes bfFlash{from{opacity:0}25%{opacity:1}to{opacity:0}}'
  +'.bf-skill-banner{position:absolute;top:36%;left:0;right:0;text-align:center;color:#fff;animation:bfBanner 1s ease forwards}'
  +'.bf-skill-banner small{display:block;font-size:13px;letter-spacing:.25em;text-shadow:0 1px 6px rgba(0,0,0,.65)}'
  +'.bf-skill-banner strong{display:block;font-size:30px;letter-spacing:.08em;text-shadow:0 2px 10px rgba(0,0,0,.7),0 0 22px rgba(255,190,60,.8)}'
  +'@keyframes bfBanner{0%{opacity:0;transform:scale(.92)}18%{opacity:1;transform:scale(1)}78%{opacity:1}100%{opacity:0;transform:scale(1.02)}}'
  +'@media (prefers-reduced-motion: reduce){.bf-ult-badge{animation:none}.bf-skill-flash{display:none}.bf-skill-banner{animation-duration:.4s}}';
 document.head.appendChild(style);

 // 31番: 親愛度バフ。親愛度10ごとに全能力+1%（最大+10%）。素早さは対象外。
 if(typeof unitPower==='function'){
  var origUP=unitPower;
  var ATK_GROWTH={attacker:3,support:2,tank:1,healer:1};
  unitPower=function(id){
   var st=origUP.apply(this,arguments);
   try{ var u0=unit(id),d0=data(id),g=ATK_GROWTH[u0.role]; if(g!=null&&d0&&d0.lv>1)st.atk+=(g-2)*(d0.lv-1); }catch(e){}
   try{
    var d=data(id),aff=d?Number(d.aff)||0:0;
    if(aff>0){
     var m=1+aff/1000;
     st={hp:Math.round(st.hp*m),atk:Math.round(st.atk*m),def:Math.round(st.def*m),rate:st.rate};
    }
   }catch(e){}
   return st;
  };
 }

 // 32番その1: アタッカーの与ダメージ+10%（ターン制の打撃入口で補正）
 if(typeof tbStrike==='function'){
  var origStrike=tbStrike;
  tbStrike=function(i,e,base,pierce){
   try{
    var b=(typeof battle!=='undefined')?battle:null;
    var a=b&&b.allies&&b.allies[i];
    if(a&&unit(a.id).role==='attacker')base=base*1.1;
   }catch(err){}
   return origStrike.call(this,i,e,base,pierce);
  };
 }

 // 32番その2: タンクの被ダメージ-10%（被ダメージ倍率の共通入口で補正）
 if(typeof passiveIncomingMultiplier==='function'){
  var origPIM=passiveIncomingMultiplier;
  passiveIncomingMultiplier=function(a){
   var m=origPIM.apply(this,arguments);
   try{ if(a&&unit(a.id).role==='tank')m*=0.9; }catch(err){}
   return m;
  };
 }

 // 33番: ボス必殺技の予告を早める（第2形態の必殺周期に合わせ、2ラウンド前から表示）
 if(typeof tbEnemyIntentLabel==='function'){
  var origLabel=tbEnemyIntentLabel;
  tbEnemyIntentLabel=function(e){
   var label=origLabel.apply(this,arguments);
   try{
    if(e&&e.kind==='boss'&&e.hp>0&&e.bd&&e.bd.phase2&&!e.ultimate){
     if(e.bd.ultIn===2)return '！ 必殺技が近づいている';
     if(e.bd.ultIn===1)return '！ 次の行動で必殺技';
    }
   }catch(err){}
   return label;
  };
 }

 // 33番: 予告中はボスの札に「！」バッジを出す（発動ラウンドは赤）
 if(typeof tbRender==='function'){
  var origRender=tbRender;
  tbRender=function(){
   var r=origRender.apply(this,arguments);
   try{
    var b=(typeof tbCurrent==='function')?tbCurrent():null;
    if(b&&b.enemies){
     var alive=b.enemies.filter(function(e){return e.hp>0;});
     var cards=document.querySelectorAll('.tb-enemy');
     cards.forEach(function(el,i){
      var e=alive[i]; if(!e||e.kind!=='boss')return;
      var warn=e.ultimate||(e.bd&&e.bd.phase2&&e.bd.ultIn<=2&&e.hp>0);
      if(!warn||el.querySelector('.bf-ult-badge'))return;
      var badge=document.createElement('span');
      badge.className='bf-ult-badge'+(e.ultimate?' bf-ult-now':'');
      badge.textContent='！';
      el.appendChild(badge);
     });
    }
   }catch(err){}
   return r;
  };
 }

 // 戦闘開始パッシブ（開始時シールド／開始時の全体攻撃アップ）をターン制でも有効化する
 // 旧方式の開始処理（applyBattleStartPassives）がターン制の開始経路から呼ばれていなかったための手当て。
 // 攻撃アップの持続は、ターン制の時計（1ラウンド=3秒換算）で開始から約3ラウンド効く。
 if(typeof tbInit==='function'&&typeof applyBattleStartPassives==='function'){
  var origTbInit=tbInit;
  tbInit=function(){
   var r=origTbInit.apply(this,arguments);
   try{ if(typeof tbSelected!=='function'||tbSelected())applyBattleStartPassives(); }catch(err){}
   return r;
  };
 }

 // 24番: スキル2（必殺技）を使った瞬間のエフェクト（演出のみ）
 function escHtml(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 function showSkillFx(name,skill){
  try{
   if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   if(document.getElementById('bf-skill-fx'))return;
   var el=document.createElement('div');
   el.id='bf-skill-fx';
   el.innerHTML='<div class="bf-skill-flash"></div><div class="bf-skill-banner"><small>'+escHtml(name)+'</small><strong>'+escHtml(skill)+'</strong></div>';
   document.body.appendChild(el);
   setTimeout(function(){ if(el.parentNode)el.remove(); },1050);
  }catch(err){}
 }
 if(typeof tbSkill==='function'){
  var origSkill=tbSkill;
  tbSkill=function(i,j,target){
   var r=origSkill.apply(this,arguments);
   try{
    if(r&&j===1){
     var b=tbCurrent(),a=b&&b.allies&&b.allies[i];
     if(a){ var u=unit(a.id); showSkillFx(person(u).name,u.s[1]); }
    }
   }catch(err){}
   return r;
  };
 }
})();
