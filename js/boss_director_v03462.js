/* Ver.0.34.62.0 ボス戦の演出（ターン制）
 * 朔夜（q12）・売人イブキ（q17）・霧島ハルカ（q24）の最終ウェーブに共通で使う。
 * 1 登場演出 / 2 戦闘中の掛け合い（HP75・50・25%、味方が倒れたとき）/ 3 第2形態（HP50%以下）
 * 4 必殺技の予告（第2形態で3ラウンドごと、1ラウンド前に予告）/ 5 撃破演出
 * あわせて、BGMを聴けるようボスのHPを増やす。q17はターン制で戦うようにする。
 */
(function bossDirector(){
 'use strict';
 if(typeof tbEnemyMove!=='function'||typeof tbNewWave!=='function')return;
 const TALK=id=>`assets/ART_V2/story_cast/${id}_talk.webp`;
 const FACE=id=>`assets/ART_V2/face_icons/${id}.webp`;
 const BOSSES={
  q12:{id:'sakuya',name:'朔夜',title:'黒い星灯の契約者',art:'assets/enemies/sakuya_battle.webp',hp:2.0,
   intro:'「ここまで来たのね、相談室。……いいわ。この檻ごと、あなたたちの灯を閉じ込めてあげる。」',
   hp75:'「その程度の灯で、私の星灯に届くと思った？」',
   hp50:'「……少しは、やるのね。なら、こちらも手加減はしない。」',
   hp25:'「どうして……どうして消えないの。あなたたちの灯は。」',
   down:'「ひとつ、消えた。次は誰？」',
   phase:{line:'「黒い星灯よ、すべてを閉ざしなさい。」',label:'檻の主・覚醒'},
   ult:{name:'黒星の檻',warn:'朔夜の周りに黒い鎖が集まっていく……！',mul:1.8},
   retort:[['concept35','「楓を返して。……あなたの檻なんかに、負けない。」'],['you','「楓は必ず連れて帰る。」']],
   defeat:'「なぜ……私の星灯が、こんなところで……。」'},
  q17:{id:'ibuki',name:'売人イブキ',title:'夜市の売人',art:'assets/enemies/ibuki_battle.webp',hp:2.6,
   intro:'「あはっ、来た来た。せっかくの夜市なんだから、あたしの小瓶も楽しんでってよ。」',
   hp75:'「やるじゃん。でもさ、本番はここからだよ？」',
   hp50:'「……ちょっと、本気で痛いんだけど。」',
   hp25:'「なんで……なんであたしばっかり、こうなるのさ。」',
   down:'「あはっ、ひとりダウン！　次は誰が倒れる？」',
   phase:{line:'「いいよ、全部まとめて割ってあげる。紫の小瓶、全開！」',label:'小瓶の全開放'},
   ult:{name:'紫煙の大売り出し',warn:'イブキが小瓶を一斉に掲げた……！',mul:1.6},
   retort:[['saki','「その小瓶で、どれだけの人の想いを売ったの。」'],['yuzu','「お姉ちゃんの声、もう奪わせない！」'],['you','「もうやめよう、イブキ。」']],
   defeat:'「……あーあ。割れちゃった。あたしの、全部。」'},
  q24:{id:'haruka',name:'霧島 ハルカ',title:'仮面の契約者',art:'assets/enemies/plague_mask_a_battle.webp',phaseArt:'assets/enemies/plague_mask_b_battle.webp',hp:2.5,
   intro:'「せっかくのお祭りなんだから、もっと楽しもうよ。……ね、誰が本物か、当ててみて？」',
   hp75:'「あはは、見つかっちゃった。でも、まだまだ踊れるよ。」',
   hp50:'「……痛いなあ。そんなに必死になって、何を守ってるの？」',
   hp25:'「やめてよ……そんな目で、こっち見ないで。」',
   down:'「あーあ、置いていかれちゃったね。……わたしと同じ。」',
   phase:{line:'「いいよ。じゃあ、最後の仮面舞踏会にしよう。」',label:'仮面舞踏会'},
   ult:{name:'仮面舞踏会',warn:'ハルカの仮面の影が、くるくると踊り始めた……！',mul:1.7,healShadows:true},
   retort:[['towa','「お姉ちゃん！　もうやめて！」'],['sena','「トワの大事な人なんでしょ。だったら、ちゃんと向き合いなよ。」'],['you','「トワが待ってる。」']],
   defeat:'「……トワ。そんな顔、しないでよ。」'}
 };
 // q17もターン制で戦う（特殊演出はこのモジュールで再現する）
 try{if(typeof TB_SPECIAL!=='undefined'&&TB_SPECIAL.delete)TB_SPECIAL.delete('q17');}catch(_){}

 const css=`
 .bd-overlay{position:fixed;inset:0;z-index:9000;display:flex;align-items:flex-end;justify-content:center;background:linear-gradient(180deg,rgba(6,8,20,.35),rgba(6,8,20,.85));animation:bdFade .35s ease;cursor:pointer}
 .bd-overlay img.bd-art{position:absolute;bottom:0;left:50%;transform:translateX(-50%);height:min(92vh,980px);max-width:96vw;object-fit:contain;filter:drop-shadow(0 0 30px rgba(170,90,255,.45));animation:bdRise .6s ease}
 .bd-band{position:relative;margin:0 0 6vh;width:min(920px,94vw);background:rgba(14,10,30,.88);border:1px solid rgba(220,170,255,.45);border-radius:18px;padding:18px 26px;color:#f4ecff;box-shadow:0 10px 40px rgba(0,0,0,.5)}
 .bd-band small{display:block;letter-spacing:.2em;color:#c9a8ff;font-size:12px;font-weight:800}
 .bd-band strong{display:block;font-size:clamp(22px,3vw,34px);margin:2px 0 8px;letter-spacing:.06em}
 .bd-band p{margin:0;font-size:clamp(16px,1.6vw,21px);line-height:1.7}
 .bd-band em{position:absolute;right:20px;bottom:10px;font-style:normal;font-size:12px;color:#bba6d8}
 .bd-strip{position:fixed;left:50%;top:clamp(70px,12vh,140px);transform:translateX(-50%);z-index:8900;display:flex;align-items:center;gap:12px;width:min(760px,94vw);background:rgba(16,12,34,.9);color:#f6efff;border:1px solid rgba(215,165,255,.5);border-radius:16px;padding:10px 16px;box-shadow:0 8px 30px rgba(0,0,0,.45);animation:bdSlide .3s ease;pointer-events:none}
 .bd-strip img{width:56px;height:56px;border-radius:50%;object-fit:cover;object-position:50% 12%;background:#2a2244;flex:none}
 .bd-strip b{display:block;font-size:13px;color:#d6b8ff}
 .bd-strip span{font-size:15px;line-height:1.55}
 .bd-strip.bd-warn{border-color:#ff7b8f;background:rgba(48,10,22,.92)}
 .bd-strip.bd-warn b{color:#ff9fae}
 .tb-enemy.bd-phase2{box-shadow:0 0 0 2px #ff6f8e,0 0 22px rgba(255,80,120,.55)!important}
 .tb-enemy.bd-ult{animation:bdPulse 1s ease-in-out infinite}
 @keyframes bdFade{from{opacity:0}to{opacity:1}}
 @keyframes bdRise{from{opacity:0;transform:translate(-50%,40px)}to{opacity:1;transform:translate(-50%,0)}}
 @keyframes bdSlide{from{opacity:0;transform:translate(-50%,-14px)}to{opacity:1;transform:translate(-50%,0)}}
 @keyframes bdPulse{0%,100%{box-shadow:0 0 0 2px #ff6f8e,0 0 12px rgba(255,80,120,.4)}50%{box-shadow:0 0 0 3px #ffb0c0,0 0 30px rgba(255,80,120,.9)}}
 @media (prefers-reduced-motion:reduce){.bd-overlay,.bd-overlay img.bd-art,.bd-strip,.tb-enemy.bd-ult{animation:none}}`;
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

 let overlayOpen=false,overlayTimer=0;const stripQueue=[];let stripBusy=false;
 function cfgFor(b){return b&&b.turnBattle&&b.wave===b.totalWaves-1?BOSSES[b.qid]:null;}
 function bossOf(b){return b?.enemies?.find(e=>e.kind==='boss'&&(e.harukaRole?e.harukaRole==='real':true));}
 function overlay(cfg,label,line,after){
  closeOverlay();overlayOpen=true;
  const el=document.createElement('div');el.className='bd-overlay';el.setAttribute('role','dialog');
  // Show battle art at full size; Haruka switches poses at the second phase.
  const portrait=label.startsWith('第2形態')&&cfg.phaseArt?cfg.phaseArt:cfg.art;
  el.innerHTML=`<img class="bd-art" src="${portrait}" alt=""><div class="bd-band"><small>${label}</small><strong>${cfg.name}</strong><p>${line}</p><em>タップで進む</em></div>`;
  const done=()=>{if(!el.isConnected)return;el.remove();overlayOpen=false;clearTimeout(overlayTimer);if(after)after();};
  el.addEventListener('click',done);document.body.appendChild(el);
  overlayTimer=setTimeout(done,4200);
 }
 function closeOverlay(){document.querySelectorAll('.bd-overlay').forEach(x=>x.remove());overlayOpen=false;clearTimeout(overlayTimer);}
 function strip(img,name,text,warn){stripQueue.push({img,name,text,warn});if(!stripBusy)nextStrip();}
 function nextStrip(){
  const s=stripQueue.shift();if(!s){stripBusy=false;return;}stripBusy=true;
  const el=document.createElement('div');el.className='bd-strip'+(s.warn?' bd-warn':'');
  el.innerHTML=`${s.img?`<img src="${s.img}" alt="">`:''}<div><b>${s.name}</b><span>${s.text}</span></div>`;
  document.body.appendChild(el);setTimeout(()=>{el.remove();nextStrip();},s.warn?3200:2700);
 }
 const bossSay=(cfg,text)=>strip(TALK(cfg.id),cfg.name,text,false);
 function retort(b,cfg){
  const party=new Set(b.allies.filter(a=>a.hp>0).map(a=>unit(a.id).person));
  const r=cfg.retort.find(([who])=>who==='you'||party.has(who));if(!r)return;
  const [who,text]=r;
  if(who==='you')strip('',typeof playerDisplayName==='function'?playerDisplayName():'主人公',text,false);
  else strip(FACE(who),PEOPLE[who]?.name||who,text,false);
 }

 // 最終ウェーブ：ボスのHPを増やし、登場演出
 const oldNewWave=tbNewWave;
 tbNewWave=function(q){
  const r=oldNewWave.apply(this,arguments);
  const b=tbCurrent();const cfg=cfgFor(b);const boss=cfg&&bossOf(b);
  if(boss&&!boss.bd){
   boss.bd={said:{},phase2:false,ultIn:0,lastHp:boss.hp};
   boss.max=Math.round(boss.max*cfg.hp);boss.hp=boss.max;boss.bd.lastHp=boss.hp;
   overlay(cfg,cfg.title,cfg.intro,()=>{try{tbRender();}catch(_){}});
  }
  return r;
 };
 // AUTOは演出中に動かない
 if(typeof tbAutoMove==='function'){
  const oldAuto=tbAutoMove;
  tbAutoMove=function(i){if(overlayOpen){setTimeout(()=>{try{tbAutoMove(i);}catch(_){}} ,600);return;}return oldAuto.apply(this,arguments);};
 }
 function checkBoss(b){
  const cfg=cfgFor(b);const boss=cfg&&bossOf(b);if(!boss||!boss.bd)return;
  const d=boss.bd,ratio=boss.hp/boss.max;
  if(boss.hp<=0){
   if(!d.said.defeat){d.said.defeat=true;stripQueue.length=0;overlay(cfg,'撃破',cfg.defeat);}
   return;
  }
  if(ratio<=0.75&&!d.said.hp75){d.said.hp75=true;bossSay(cfg,cfg.hp75);}
  if(ratio<=0.5&&!d.phase2){
   d.phase2=true;d.said.hp50=true;boss.atk*=1.25;d.ultIn=2;
   const heal=Math.round(boss.max*0.2);boss.hp=Math.min(boss.max,boss.hp+heal);logBattle(`${cfg.name}が本気を出した（HP +${heal}）`);
   overlay(cfg,'第2形態｜'+cfg.phase.label,cfg.phase.line,()=>retort(b,cfg));
  }
  if(ratio<=0.25&&!d.said.hp25){d.said.hp25=true;bossSay(cfg,cfg.hp25);}
 }
 // 味方の攻撃のあと
 if(typeof tbStrike==='function'){
  const oldStrike=tbStrike;
  tbStrike=function(i,e){const r=oldStrike.apply(this,arguments);try{checkBoss(tbCurrent());}catch(_){}return r;};
 }
 // 敵の攻撃：味方が倒れたら一言
 if(typeof tbEnemyHit==='function'){
  const oldHit=tbEnemyHit;
  tbEnemyHit=function(e,target){const was=target?.hp;const r=oldHit.apply(this,arguments);
   try{const b=tbCurrent();const cfg=cfgFor(b);const boss=cfg&&bossOf(b);
    if(boss&&boss.bd&&was>0&&target.hp<=0&&!boss.bd.said.down){boss.bd.said.down=true;bossSay(cfg,cfg.down);}}catch(_){}
   return r;};
 }
 // 必殺技：第2形態で、1ラウンド前に予告してから放つ
 if(typeof tbWeakPlanRound==='function'){
  const oldPlan=tbWeakPlanRound;
  tbWeakPlanRound=function(b){
   const r=oldPlan.apply(this,arguments);
   try{const cfg=cfgFor(b);const boss=cfg&&bossOf(b);
    if(boss&&boss.bd&&boss.hp>0){
     const d=boss.bd;boss.ultimate=false;
     if(d.phase2&&!(boss.breakSkips>0)&&!(boss.stunRounds>0)){
      if(d.ultIn===1){boss.ultimate=true;boss.intent='aoe';}
      else if(d.ultIn===2){strip(TALK(cfg.id),'必殺技の予告',`次のラウンド、${cfg.name}の『${cfg.ult.name}』。${cfg.ult.warn}（防御・バリア・ブレイクで備えよう）`,true);}
      d.ultIn=d.ultIn<=1?3:d.ultIn-1;
     }
    }}catch(_){}
   return r;};
 }
 const oldMove=tbEnemyMove;
 tbEnemyMove=function(i){
  const b=tbCurrent(),e=b?.enemies?.[i];const cfg=cfgFor(b);
  if(cfg&&e&&e.ultimate&&e.hp>0&&!(e.breakSkips>0)&&!(e.stunRounds>0)){
   e.ultimate=false;logBattle(`${cfg.name}の必殺技『${cfg.ult.name}』！`);
   strip(TALK(cfg.id),cfg.name,`「${cfg.ult.name}！」`,true);
   const targets=b.allies.filter(a=>a.hp>0);
   for(const a of targets)tbEnemyHit(e,a,(TB_WEAK_BALANCE.aoeMultiplier||1)*cfg.ult.mul);
   if(cfg.ult.healShadows){for(const s of b.enemies){if(s.harukaRole==='shadow'&&s.hp<=0){s.hp=Math.round(s.max*.5);logBattle(`${s.name}が踊りながら戻ってきた`);}}}
   return;
  }
  if(cfg&&e&&e.ultimate&&(e.breakSkips>0||e.stunRounds>0)){e.ultimate=false;logBattle(`${cfg.name}の必殺技は不発に終わった`);}
  return oldMove.apply(this,arguments);
 };
 if(typeof tbEnemyIntentLabel==='function'){
  const oldLabel=tbEnemyIntentLabel;
  tbEnemyIntentLabel=function(e){const cfg=cfgFor(tbCurrent());if(cfg&&e?.ultimate&&e.hp>0&&!(e.breakSkips>0)&&!(e.stunRounds>0))return `必殺：${cfg.ult.name}`;return oldLabel.apply(this,arguments);};
 }
 // 見た目：ボスの札に絵・第2形態の光・必殺予告の点滅
 if(typeof tbRender==='function'){
  const oldRender=tbRender;
  tbRender=function(){
   const r=oldRender.apply(this,arguments);
   try{checkBoss(tbCurrent());}catch(_){}
   try{const b=tbCurrent();const cfg=cfgFor(b);if(cfg){
    document.querySelectorAll('.tb-enemy').forEach((el,i)=>{const e=b.enemies[i];if(!e||e.kind!=='boss'||(e.harukaRole&&e.harukaRole!=='real'))return;
     if(!e.harukaRole&&cfg.id!=='sakuya'){let img=el.querySelector('.tb-enemy-art-thumb');if(!img){const icon=el.querySelector('.tb-enemy-icon');if(icon){img=document.createElement('img');img.className='tb-enemy-art-thumb';img.alt=cfg.name;icon.replaceChildren(img);}}if(img&&!img.src.endsWith(cfg.art))img.src=cfg.art;}
     el.classList.toggle('bd-phase2',!!e.bd?.phase2&&e.hp>0);el.classList.toggle('bd-ult',!!e.ultimate&&e.hp>0);});
   }}catch(_){}
   return r;};
 }
 // 戦闘を離れたら演出を片づける
 if(typeof finishBattle==='function'){
  const oldFinish=finishBattle;
  finishBattle=function(won){const r=oldFinish.apply(this,arguments);if(!won){closeOverlay();stripQueue.length=0;}return r;};
 }
})();
