/* Ver.0.25.1.0 — q12 cinematic arena (view-only + explicit q12 controls).
 * Rendering is separate from background art. All health/skill actions use game.js.
 * Controls and visual state never enter the persisted save object. */
const Q12C={
 victoryTimer:0,
 cleaned:new Set(["akane", "aoi", "chinatsu", "concept08", "concept09", "concept10", "concept11", "concept12", "concept13", "concept14", "concept15", "concept16", "concept17", "concept18", "concept19", "concept20", "concept21", "concept22", "concept23", "concept24", "concept25", "concept26", "concept27", "milku", "momoka", "nagi", "reina"]),
 scene(b){return !!(b&&b.qid==='q12'&&b.wave===b.totalWaves-1&&b.q12hd?.cage&&['fight','cinematicVictory'].includes(b.phase))},
 init(b){if(!b||b.qid!=='q12')return;b.q12visual={paused:false,speed:1,flash:null,attack:null,introAt:0};if(this.victoryTimer){clearTimeout(this.victoryTimer);this.victoryTimer=0}},
 state(b){if(!b.q12visual)this.init(b);return b.q12visual},
 speed(b){return this.scene(b)?this.state(b).speed:1},
 paused(b){return this.scene(b)&&this.state(b).paused},
 togglePause(){if(!this.scene(battle))return;const s=this.state(battle);s.paused=!s.paused;renderCombatFrame(false)},
 toggleSpeed(){if(!this.scene(battle))return;const s=this.state(battle);s.speed=s.speed===1?2:1;renderCombatFrame(false)},
 toggleAuto(){if(!this.scene(battle)||battle.preview&&battle.done)return;battle.autoSkills=!battle.autoSkills;if(battle.autoSkills){battle.auto=true;battle.selection=null;battle.slow=false}renderCombatFrame(false)},
 target(i){if(!this.scene(battle))return;const e=battle.enemies[i];if(!e||e.hp<=0)return;if(battle.selection?.kind==='enemy'){clickTarget('enemy',i)}else if(e.kind==='boss'||e.kind==='cage'){Q12HD.focus(e.kind)}else Q12HD.focusExtra(i)},
 party(i){if(!this.scene(battle))return;if(battle.selection?.kind==='ally')clickTarget('ally',i);else showSkillHelp(i,0)},
 onStrike(a,e,kind='attack'){if(!this.scene(battle))return;this.state(battle).attack={who:battle.allies.indexOf(a),target:e.id,at:battle.sim,kind}},
 onPopup(entity,kind){if(!this.scene(battle))return;this.state(battle).flash={target:entity.id||'ally',kind,time:battle.sim}},
 controls(b){if(!this.scene(b))return '';const s=this.state(b);return `<div class="qcin-tools" aria-label="戦闘操作"><span class="qcin-tools-name">✦ 星灯作戦室 · 決戦</span><div class="qcin-controls"><button type="button" id="qcin-auto" aria-pressed="${!!b.autoSkills}" onclick="Q12C.toggleAuto()">AUTO ${b.autoSkills?'ON':'OFF'}</button><button type="button" id="qcin-speed" onclick="Q12C.toggleSpeed()" aria-label="戦闘速度切替">×${s.speed}</button><button type="button" id="qcin-pause" aria-pressed="${s.paused}" onclick="Q12C.togglePause()">${s.paused?'▶ 再開':'Ⅱ 一時停止'}</button></div></div>`},
 arena(b,selected,popups,statusMarkup){
  const s=this.state(b),boss=b.enemies.find(e=>e.kind==='boss'),cage=b.q12hd.cage;
  const cageIdx=b.enemies.indexOf(cage),bossIdx=b.enemies.indexOf(boss);
  const additional=b.enemies.map((e,i)=>({e,i})).filter(({e})=>e!==boss&&e!==cage);
  const alive=(e)=>e&&e.hp>0;const flash=s.flash&&b.sim-s.flash.time<.46?s.flash:null;
  const attack=s.attack&&b.sim-s.attack.at<.43?s.attack:null;
  const party=b.allies.map((a,i)=>{const u=unit(a.id),pid=u.person;
   const portrait=(u.rarity==='SR'&&UNIT_ARTWORK[u.id]?.portrait)?UNIT_ARTWORK[u.id].portrait:(this.cleaned.has(pid)?`assets/battle_sprites/${pid}.webp`:(ART_V2.full_body[pid]||characterPortrait(pid)));
   const hit=flash?.target===a.id&&flash.kind==='ally';
   const healing=flash?.target===a.id&&flash.kind==='heal';
   return `<button type="button" data-qcin-ally="${i}" class="qcin-fighter qcin-fighter-${i} ${a.hp<=0?'fallen':''} ${attack?.who===i?'casting':''} ${hit?'hurt':''} ${healing?'healing':''} ${selected?.kind==='ally'?'selectable':''}" onclick="Q12C.party(${i})" aria-label="${esc(person(u).name)}${selected?.kind==='ally'?'を対象にする':''}"><img src="${portrait}" alt="" loading="eager" draggable="false"><span class="qcin-shadow"></span><span class="qcin-ward ${a.shield>0?'on':''}"></span></button>`;
  }).join('');
  const foe=(e,i,label)=>`<button type="button" data-qcin-foe="${i}" class="qcin-enemy qcin-${e.kind} ${!alive(e)?'vanished':''} ${selected?.kind==='enemy'?'selectable':''} ${b.q12hd.focus===e.kind?'focused':''} ${flash?.target===e.id?'struck':''}" onclick="Q12C.target(${i})" aria-label="${label}を攻撃対象にする"><img src="assets/enemies/${e.kind==='boss'?'sakuya':'echo_cage'}.webp" alt="${label}" draggable="false"><span class="qcin-enemy-name">${esc(label)}</span></button>`;
  const extras=additional.map(({e,i},order)=>`<button type="button" data-qcin-foe="${i}" class="qcin-enemy qcin-additional ${!alive(e)?'vanished':''} ${selected?.kind==='enemy'?'selectable':''} ${b.q12hd.focusEnemyId===e.id?'focused':''} ${flash?.target===e.id?'struck':''}" style="--extra-x:${59+order*6}%" onclick="Q12C.target(${i})" aria-label="${esc(e.name)}を攻撃対象にする"><span class="qcin-extra-symbol" aria-hidden="true">${esc(e.icon||'✧')}</span><span class="qcin-extra-hp"><i style="width:${Math.max(0,Math.min(100,e.hp/e.max*100))}%"></i></span><span class="qcin-enemy-name">${esc(e.name)}</span></button>`).join('');
  const foeX=id=>{const i=additional.findIndex(({e})=>e.id===id);return i<0?(id===cage.id?56:80):64+i*6};
  const hasWarning=b.q12hd.charge&&alive(boss);
  const warning=hasWarning?`<div class="qcin-alert" role="status"><span>⚠ DANGER · 強攻撃予告</span><strong>黒い星灯の波動</strong><small>発動まで ${Math.max(0,boss.attackTimer).toFixed(1)}秒</small></div>`:'';
  const fx=flash?`<div class="qcin-impact ${flash.kind==='heal'?'green':flash.kind==='ally'?'red':''}" style="--impact-x:${foeX(flash.target)}%;--impact-y:${flash.target==='q12_echo_cage'?'50':'48'}%"></div>`:'';
  const attackTrail=attack?`<div class="qcin-attack-trail ${attack.kind==='skill'?'skill':''}" style="--src-x:${17+(attack.who%2)*13}%;--dst-x:${foeX(attack.target)}%"></div>`:'';
  const doIntro=!s.introShown;s.introShown=true;
  return `<div class="qcin-world ${s.paused?'paused':''} phase-${b.q12hd.stage} ${b.phase==='cinematicVictory'?'ending':''}" data-qcin-phase="${b.q12hd.stage}">
   <div class="qcin-sky"></div><div class="qcin-backdepth"></div><div class="qcin-crystals" aria-hidden="true"></div><div class="qcin-fog" aria-hidden="true"></div><div class="qcin-floor"></div>
   <span class="qcin-stage-caption">旧灯台地下 · 星灯の残響</span>
   ${foe(cage,cageIdx,'残響の檻')}${foe(boss,bossIdx,'朔夜')}${extras}
   <div class="qcin-party">${party}</div><div class="qcin-frame-fx" id="qcin-frame-fx">${attackTrail}${fx}${popups}</div>
   ${warning}${doIntro?'<div class="qcin-intro">BOSS BATTLE <small>黒い星灯の契約者・朔夜</small></div>':''}
   ${s.paused?'<div class="qcin-pause-mask">PAUSED <small>再開ボタンで続行</small></div>':''}
   ${b.phase==='cinematicVictory'?'<div class="qcin-victory-mask">残響の檻、崩壊 <small>楓の救出へ</small></div>':''}
   <div class="qcin-foreground"></div></div>`;
 },
 syncSkills(bars,b){
  if(!this.scene(b))return;
  b.allies.forEach((a,i)=>{
    const line=bars.children[i];if(!line)return;
    const hp=line.querySelector('.v688-hp i');if(hp)hp.style.width=`${Math.max(0,a.hp/a.max*100)}%`;
    const numeric=line.querySelector('.v688-hp-numeric');if(numeric)numeric.textContent=`HP ${Math.ceil(a.hp)}/${a.max}`;
    const statuses=line.querySelector('.v688-unit-data .v680-statuses');if(statuses)statuses.innerHTML=statusMarkup(a);
    line.querySelectorAll('button.skillbtn').forEach((btn,j)=>{
      const cd=Math.max(0,a.cooldowns[j]-b.sim);
      btn.disabled=a.hp<=0||cd>0||b.done||b.phase!=='fight';
      let countdown=btn.querySelector('.v688-cooldown');let track=btn.querySelector('.v688-cooldown-track');
      if(cd>0){
       if(!countdown){countdown=document.createElement('span');countdown.className='v688-cooldown';btn.appendChild(countdown)}
       countdown.textContent=cd.toFixed(1)+'s';countdown.setAttribute('aria-label','残り'+cd.toFixed(1)+'秒');
       if(!track){track=document.createElement('span');track.className='v688-cooldown-track';btn.appendChild(track)}
       track.style.setProperty('--remain',Math.min(100,cd/(j===0?9:14)*100)+'%');
      }else{countdown?.remove();track?.remove()}
    });
  });
 },
 syncScene(arena,b,selected,popups){
  if(!this.scene(b))return;const s=this.state(b),world=arena.querySelector('.qcin-world');if(!world)return;
  world.classList.toggle('paused',s.paused);world.classList.toggle('ending',b.phase==='cinematicVictory');
  for(let i=1;i<=3;i++)world.classList.toggle('phase-'+i,b.q12hd.stage===i);
  const flash=s.flash&&b.sim-s.flash.time<.46?s.flash:null;
  const attack=s.attack&&b.sim-s.attack.at<.43?s.attack:null;
  b.allies.forEach((a,i)=>{const node=world.querySelector(`[data-qcin-ally="${i}"]`);if(!node)return;
   node.classList.toggle('fallen',a.hp<=0);node.classList.toggle('casting',attack?.who===i);
   node.classList.toggle('hurt',flash?.target===a.id&&flash.kind==='ally');node.classList.toggle('healing',flash?.target===a.id&&flash.kind==='heal');
   node.classList.toggle('selectable',selected?.kind==='ally');
   const ward=node.querySelector('.qcin-ward');if(ward)ward.classList.toggle('on',a.shield>0);
  });
  b.enemies.forEach((e,i)=>{const node=world.querySelector(`[data-qcin-foe="${i}"]`);if(!node)return;
   node.classList.toggle('vanished',e.hp<=0);node.classList.toggle('struck',flash?.target===e.id);
   node.classList.toggle('focused',b.q12hd.focusEnemyId===e.id||(!b.q12hd.focusEnemyId&&b.q12hd.focus===e.kind));node.classList.toggle('selectable',selected?.kind==='enemy');
   const hp=node.querySelector('.qcin-extra-hp i');if(hp)hp.style.width=Math.max(0,Math.min(100,e.hp/e.max*100))+'%';
  });
  const extraX=id=>{const n=b.enemies.filter(e=>e.kind!=='boss'&&e.kind!=='cage').findIndex(e=>e.id===id);return n<0?(id===b.q12hd.cage.id?56:80):64+n*6};
  const fx=world.querySelector('#qcin-frame-fx');if(fx){
   let contents=popups;
   if(flash){contents+=`<div class="qcin-impact ${flash.kind==='heal'?'green':flash.kind==='ally'?'red':''}" style="--impact-x:${extraX(flash.target)}%;--impact-y:48%"></div>`}
   if(attack)contents+=`<div class="qcin-attack-trail ${attack.kind==='skill'?'skill':''}" style="--src-x:${17+(attack.who%2)*13}%;--dst-x:${extraX(attack.target)}%"></div>`;
   fx.innerHTML=contents;
  }
  const oldAlert=world.querySelector('.qcin-alert'),danger=b.q12hd.charge&&Q12HD.boss(b)?.hp>0;
  if(danger){const seconds=Math.max(0,Q12HD.boss(b).attackTimer).toFixed(1);if(oldAlert){const small=oldAlert.querySelector('small');if(small)small.textContent='発動まで '+seconds+'秒'}else{const alert=document.createElement('div');alert.className='qcin-alert';alert.setAttribute('role','status');alert.innerHTML=`<span>⚠ DANGER · 強攻撃予告</span><strong>黒い星灯の波動</strong><small>発動まで ${seconds}秒</small>`;world.appendChild(alert)}}else if(oldAlert)oldAlert.remove();
  const overlay=world.querySelector('.qcin-pause-mask');if(s.paused&&!overlay){const el=document.createElement('div');el.className='qcin-pause-mask';el.innerHTML='PAUSED <small>再開ボタンで続行</small>';world.appendChild(el)}else if(!s.paused&&overlay)overlay.remove();
  const ending=world.querySelector('.qcin-victory-mask');if(b.phase==='cinematicVictory'&&!ending){const el=document.createElement('div');el.className='qcin-victory-mask';el.innerHTML='残響の檻、崩壊 <small>楓の救出へ</small>';world.appendChild(el)}
 },
 refresh(b){if(!this.scene(b))return;const s=this.state(b);
  const set=(id,text)=>{const el=document.getElementById(id);if(el)el.textContent=text};
  set('qcin-auto','AUTO '+(b.autoSkills?'ON':'OFF'));set('qcin-speed','×'+s.speed);set('qcin-pause',s.paused?'▶ 再開':'Ⅱ 一時停止');
  const a=document.getElementById('qcin-auto');if(a)a.setAttribute('aria-pressed',String(!!b.autoSkills));
  const p=document.getElementById('qcin-pause');if(p)p.setAttribute('aria-pressed',String(s.paused));
 },
 victory(b){if(!this.scene(b)||b.phase!=='fight')return false;
  b.phase='cinematicVictory';b.slow=false;this.state(b).paused=false;
  logBattle('朔夜を制圧。残響の檻が崩れ、楓の救出へ向かう。');
  renderCombatFrame(false);
  this.victoryTimer=setTimeout(()=>{this.victoryTimer=0;if(battle===b&&!b.done&&b.phase==='cinematicVictory')finishBattle(true)},1850);
  return true;
 }
};
