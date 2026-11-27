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
  +'#bf-boss-fx{position:fixed;inset:0;pointer-events:none;z-index:9998}'
  +'.bf-boss-flash{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(120,20,140,.5) 0%,rgba(190,30,60,.28) 45%,rgba(20,0,30,.45) 100%);animation:bfFlash .7s ease-out forwards}'
  +'.bf-boss-banner{position:absolute;top:36%;left:0;right:0;text-align:center;color:#fff;animation:bfBanner 1.15s ease forwards}'
  +'.bf-boss-banner small{display:block;font-size:13px;letter-spacing:.25em;text-shadow:0 1px 6px rgba(0,0,0,.7)}'
  +'.bf-boss-banner strong{display:block;font-size:32px;letter-spacing:.08em;text-shadow:0 2px 10px rgba(0,0,0,.75),0 0 26px rgba(220,40,80,.9)}'
  +'.bf-shake{animation:bfShake .5s ease-in-out}'
  +'@keyframes bfShake{0%,100%{transform:translate(0,0)}20%{transform:translate(-7px,3px)}40%{transform:translate(6px,-3px)}60%{transform:translate(-4px,-2px)}80%{transform:translate(3px,2px)}}'
  +'#bf-cutin{position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden}'
  +'.bf-cutin-band{position:absolute;left:-4%;right:-4%;top:25%;height:50%;overflow:hidden;background:#16122e;clip-path:polygon(0 10%,5% 3%,12% 8%,20% 2%,29% 7%,38% 2%,47% 8%,56% 2%,65% 7%,74% 2%,83% 8%,92% 3%,100% 9%,100% 92%,94% 98%,85% 93%,76% 99%,67% 94%,58% 99%,49% 93%,40% 99%,31% 94%,22% 99%,13% 93%,6% 98%,0 94%);animation:bfBandIn 1.2s ease forwards}'
  +'.bf-cutin.boss .bf-cutin-band{background:#2a0a1e}'
  +'.bf-cutin-art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 8%;animation:bfZoom 1.2s ease forwards}'
  +'.bf-cutin-shade{position:absolute;inset:0;background:linear-gradient(100deg,rgba(18,14,40,.16),rgba(18,14,40,0) 42%,rgba(18,14,40,.36) 82%,rgba(18,14,40,.72));pointer-events:none}'
  +'.bf-cutin.boss .bf-cutin-shade{background:linear-gradient(260deg,rgba(30,4,20,.16),rgba(30,4,20,0) 42%,rgba(30,4,20,.38) 82%,rgba(30,4,20,.75))}'
  +'.bf-cutin-lines{position:absolute;inset:0;background:repeating-linear-gradient(112deg,transparent 0 30px,rgba(255,255,255,.06) 30px 32px);animation:bfLines 1.2s linear forwards;pointer-events:none}'
  +'@keyframes bfBandIn{0%{opacity:0;transform:translateX(-56px)}14%{opacity:1;transform:translateX(0)}82%{opacity:1}100%{opacity:0;transform:translateX(22px)}}'
  +'@keyframes bfZoom{0%{transform:scale(1.04)}100%{transform:scale(1.14)}}'
  +'@keyframes bfLines{from{background-position:0 0}to{background-position:90px 0}}'
  +'.bf-cutin-text{position:absolute;left:6%;bottom:9%;color:#fff;transform:rotate(-3deg);animation:bfTextIn 1.2s ease forwards;z-index:2}'
  +'.bf-cutin.boss .bf-cutin-text{left:auto;right:6%;text-align:right;transform:rotate(3deg)}'
  +'.bf-cutin-text small{display:block;font-size:14px;letter-spacing:.24em;text-shadow:0 1px 6px rgba(0,0,0,.85);margin-bottom:5px}'
  +'.bf-cutin-text strong{display:inline-block;font-size:36px;letter-spacing:.05em;padding:3px 16px 5px;background:linear-gradient(100deg,#3a2f7d,#5a48b8);box-shadow:0 4px 16px rgba(0,0,0,.45);text-shadow:0 2px 8px rgba(0,0,0,.5)}'
  +'@keyframes bfTextIn{0%{opacity:0;translate:0 12px}16%{opacity:1;translate:0 0}82%{opacity:1}100%{opacity:0}}'
  +'.bf-cutin.boss .bf-cutin-text strong{background:linear-gradient(260deg,#57102e,#8c1d4e)}'
  +'@media (prefers-reduced-motion: reduce){.bf-ult-badge{animation:none}.bf-skill-flash{display:none}.bf-boss-flash{display:none}.bf-shake{animation:none}.bf-cutin-art{animation-duration:.4s}.bf-cutin-band{animation-duration:.4s}.bf-cutin-lines{display:none}.bf-skill-banner{animation-duration:.4s}}';
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
 function showCutin(img,name,skill,boss){
  try{
   if(document.getElementById('bf-cutin'))return;
   var el=document.createElement('div');
   el.id='bf-cutin'; el.className='bf-cutin'+(boss?' boss':'');
   el.innerHTML='<div class="bf-cutin-band">'+(img?'<img class="bf-cutin-art" src="'+img+'" alt="">':'')+'<div class="bf-cutin-shade"></div><div class="bf-cutin-lines"></div><div class="bf-cutin-text"><small>'+escHtml(name)+'</small><strong>'+escHtml(skill)+'</strong></div></div>';
   document.body.appendChild(el);
   var cimg=el.querySelector('.bf-cutin-art');
   if(cimg){ var applyCutinFace=function(){ try{
     var src=(cimg.getAttribute('src')||'').split('?')[0];
     var key=src.replace(/^assets\//,'');
     var f=0.5;
     var faces=window.PORTRAIT_FACES_V03560;
     if(faces&&faces[key])f=faces[key][1];
     else if(src.indexOf('/upper_body/')>=0)f=0.20;
     else if(src.indexOf('/full_body/')>=0)f=0.13;
     else if(src.indexOf('UNIT_ART')>=0)f=0.30;
     else if(src.indexOf('assets/enemies/zankyo/')>=0||src.indexOf('gijitai')>=0)f=0.5;
     else if(src.indexOf('assets/enemies/')>=0){ var ar=cimg.naturalHeight/Math.max(1,cimg.naturalWidth); f=ar>=1.2?0.13:(ar<=0.85?0.5:0.22); }
     var nw=cimg.naturalWidth,nh=cimg.naturalHeight,W=cimg.clientWidth,H=cimg.clientHeight;
     if(nw&&nh&&W&&H){ var sc=Math.max(W/nw,H/nh); var Rh=nh*sc;
       if(Rh>H+1){ var pp=(H/2-f*Rh)/(H-Rh); if(isFinite(pp)){ pp=Math.max(0,Math.min(1,pp)); cimg.style.objectPosition='50% '+(pp*100).toFixed(1)+'%'; } } }
   }catch(_){ } };
   if(cimg.complete&&cimg.naturalWidth)applyCutinFace(); else cimg.addEventListener('load',applyCutinFace); }
   setTimeout(function(){ if(el.parentNode)el.remove(); },1200);
  }catch(err){}
 }
 function showBossUltFx(name,skill,img){
  try{
   if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
   if(document.getElementById('bf-boss-fx'))return;
   var el=document.createElement('div');
   el.id='bf-boss-fx';
   el.innerHTML='<div class="bf-boss-flash"></div><div class="bf-boss-banner"><small>'+escHtml(name)+'</small><strong>'+escHtml(skill)+'</strong></div>';
   document.body.appendChild(el);
   var app=document.getElementById('app');
   if(app){app.classList.add('bf-shake');setTimeout(function(){app.classList.remove('bf-shake');},550);}
   setTimeout(function(){ if(el.parentNode)el.remove(); },1200);
   showCutin(img,name,skill,true);
  }catch(err){}
 }
 window.ybBossUltFx=showBossUltFx;
 window.ybEchoUltFx=function(name,skill,img){ showBossUltFx(name,skill,img); };
 if(typeof tbSkill==='function'){
  var origSkill=tbSkill;
  tbSkill=function(i,j,target){
   var r=origSkill.apply(this,arguments);
   try{
    if(r&&(j===0||j===1)){
     var b=tbCurrent(),a=b&&b.allies&&b.allies[i];
     if(a){ var u=unit(a.id); showSkillFx(person(u).name,u.s[j]);
       if(j===1){ var img=''; try{ img=characterPortrait(u.person)||''; }catch(_){ img=''; } showCutin(img,person(u).name,u.s[1],false); } }
    }
   }catch(err){}
   return r;
  };
 }
})();
