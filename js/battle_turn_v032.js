/* RE:START 0.32.0.0 — independent experimental turn-based combat engine.
   Legacy battle rules, special battles, farm, and save schema remain intact. */
const TB_BALANCE = Object.freeze({
  hp:1.34, attack:0.75, normal:1.18, skill:1.48, enemyHp:1.13, enemyAtk:1.28, chapterHp:{0:1.34,1:1.2,2:0.88,3:0.65,4:0.395,5:0.67}, chapterAtk:{0:1,1:1,2:1,3:0.96,4:0.72,5:0.84},
  defenseFactor:0.78, guardReduction:0.55, litAttack:1.30, litDefense:0.80,
  safety:0.70, investigatedAttack:1.30, shieldEffect:1.0, healEffect:1.05,
  roundsSkill:[2,3], roundSeconds:3, maxLight:5, startLight:2, roundLight:1, guardLight:1,
  lightCost:1, lightCooldownReduction:1, critChance:0.12, critBoost:1.5,
  aoe:0.74, combo:0.57, pierce:1.0, drain:0.30, finisher:0.75,
  effectRounds:3, regenRounds:3, regenAmount:0.09, counterRate:0.48,
  defendBuff:0.25, attackBuff:0.20, debuff:0.24, stunRounds:1,
  swiftRate:0.75, autoDelay:280, speedFast:2, logLimit:70
});
const TB_SPECIAL = Object.freeze(new Set(['q6','q17','q18','q28','q29'])); // q12 story battle supports turn mode
function tbSelected(){return S.battleMode==='turn';}
function tbEligible(qid,grind,preview){
  return tbSelected()&&!grind&&!preview&&!TB_SPECIAL.has(qid)&&!Q12HD.active?.(battle)&&!Q12C.active?.(battle);
}
let tbAutoTimer=0, tbLongTimer=0, tbSuppressClick=false;
function tbClearTimer(){clearTimeout(tbAutoTimer);tbAutoTimer=0;clearTimeout(tbLongTimer);tbLongTimer=0;}
function tbCurrent(){return view==='combat'&&battle?.turnBattle&&!battle.done?battle:null;}
function tbSetMode(mode){S.battleMode=mode==='turn'?'turn':'legacy';persist();render();}
function tbNewWave(q){
 const b=battle; b.phase='fight';b.enemies=makeWave(q,b.wave).map(e=>{
  const max=Math.max(1,Math.round(e.max*TB_BALANCE.enemyHp*(TB_BALANCE.chapterHp[q.chapter]||1)));
  return {...e,max,hp:max,atk:e.atk*TB_BALANCE.enemyAtk*(TB_BALANCE.chapterAtk[q.chapter]||1),stunRounds:0,defDownRounds:0,weakenRounds:0,tauntRounds:0};
 });
 if(q.id==='q12'&&b.wave===b.totalWaves-1){
  Q12HD.spawn(b);
  // The cage must be broken as well as the boss; default target should be the cage.
  const cageIndex=b.enemies.indexOf(b.q12hd?.cage);
  if(cageIndex>=0){b.enemies.unshift(b.enemies.splice(cageIndex,1)[0]);}
 }
 b.tb.queue=[];b.tb.round=0;b.tb.lit=-1;b.tb.lightUsed=false;b.tb.targetEnemy=0;b.tb.targetAlly=0;
 if(typeof tbUiClear==='function')tbUiClear(b);
 tbWeakInitWave(b,q);
 logBattle(`WAVE ${b.wave+1}/${b.totalWaves}｜ターン制戦闘開始`);
 tbBeginRound();
}
function tbInit(){
 if(!battle)return;
 battle.turnBattle=true;
 battle.tb={queue:[],round:0,light:TB_BALANCE.startLight,lit:-1,lightUsed:false,targetEnemy:0,targetAlly:0,auto:false,speed:1,showHelp:-1,turnCount:0,roundsPerWave:[]};
 battle.phase='fight';battle.auto=false;battle.sim=0;
 battle.allies.forEach(a=>{a.cooldowns=[0,0];a.guarding=false;a.effects={};});
 tbNewWave(QUEST_BY_ID[battle.qid]);
}
function tbBeginRound(){
 const b=tbCurrent();if(!b)return;
 const t=b.tb;delete t.flameUiResult;t.round++;t.resonanceOpen=false;t.flameInfo=false;b.sim=t.round*TB_BALANCE.roundSeconds;t.roundsPerWave[b.wave]=t.round;t.lit=-1;t.lightUsed=false;t.light=Math.min(TB_BALANCE.maxLight,t.light+TB_BALANCE.roundLight);
 for(const a of b.allies){
  a.guarding=false;a.cooldowns=a.cooldowns.map(v=>Math.max(0,v-1));
  if(a.hp<=0)continue;
  const fx=a.effects;
  if(fx.regen>0){const value=Math.min(a.max-a.hp,Math.round(a.max*TB_BALANCE.regenAmount));a.hp+=value;if(value)logBattle(`${person(unit(a.id)).name} 継続回復 +${value}`);}
  for(const key of Object.keys(fx)){if(key!=='cover'&&typeof fx[key]==='number'&&fx[key]>0)fx[key]--;}if(!fx.coverDuration)fx.cover=0;
 }
 for(const e of b.enemies){e.defDownRounds=Math.max(0,(e.defDownRounds||0)-1);e.weakenRounds=Math.max(0,(e.weakenRounds||0)-1);}
 tbWeakPlanRound(b);
 const queue=[...b.allies.map((a,i)=>({side:'ally',i,rate:a.spd||ROLES[unit(a.id).role].rate})),
  ...b.enemies.map((e,i)=>({side:'enemy',i,rate:(e.interval||2.1)*(e.kind==='swift'?TB_BALANCE.swiftRate:1)})).filter(v=>b.enemies[v.i].kind!=='cage')];
 t.queue=queue.filter(v=>(v.side==='ally'?b.allies[v.i]:b.enemies[v.i])?.hp>0).sort((a,b)=>a.rate-b.rate|| (a.side==='ally'?-1:1)).map(v=>({side:v.side,i:v.i}));
 logBattle(`第${t.round}ラウンド｜灯火 ${t.light}/${TB_BALANCE.maxLight}`);
 tbAdvance();
}
function tbAdvance(){
 const b=tbCurrent();if(!b)return;
 if(interruptConfirm){tbClearTimer();tbRender();return;}
 const t=b.tb;
 while(t.queue.length){
  const first=t.queue[0];const actor=first.side==='ally'?b.allies[first.i]:b.enemies[first.i];
  if(!actor||actor.hp<=0){t.queue.shift();continue;}
  if(first.side==='ally'){
   if(t.auto){tbAutoTimer=setTimeout(()=>{if(tbCurrent()===b)tbAutoMove(first.i)},TB_BALANCE.autoDelay/t.speed);}
   tbRender();return;
  }
  t.queue.shift();tbEnemyMove(first.i);
  if(!tbCurrent()||tbCurrent()!==b)return;
  if(tbCheckOutcome())return;
 }
 tbBeginRound();
}
function tbTargetEnemy(){const b=battle,t=b.tb;return b.enemies[t.targetEnemy]?.hp>0?t.targetEnemy:b.enemies.findIndex(x=>x.hp>0);}
function tbTargetAlly(i){const b=battle,t=b.tb;return b.allies[t.targetAlly]?.hp>0?t.targetAlly:i;}
function tbQ12BossFactor(e){
 // The final-wave cage protects Sakuya by 22% in both turn and legacy battles.
 return battle?.turnBattle&&e.kind==='boss'&&Q12HD.active(battle)&&battle.q12hd.cage?.hp>0?.78:1;
}
function tbStrike(i,e,base,pierce=false){
 const b=battle,a=b.allies[i],u=unit(a.id),crit=Math.random()<TB_BALANCE.critChance;
 const rally=a.effects.attack>0?1+TB_BALANCE.attackBuff:1;
 const vulnerable=(e.defDownRounds||0)>0?1+TB_BALANCE.debuff:1;
 const lit=b.tb.lit===i?TB_BALANCE.litAttack:1;
 const raw=base*(a.atk/18)*TB_BALANCE.skill*rally*(a.rallyUntil>b.sim?(a.rallyMult||1):1)*lit*vulnerable*passiveAttackMultiplier(a,e)*(crit?TB_BALANCE.critBoost:1);
 const d=Math.max(1,Math.round(raw*tbWeakDamageFactor(i,e)*tbBreakDamageFactor(e)*tbGuardDamageFactor(e)*tbQ12BossFactor(e)*(pierce?1:1-(e.damageReduction||0))));
 const applied=tbQ1TrainingClamp(e,d),dealt=Math.min(e.hp,applied);e.hp=Math.max(0,e.hp-applied);logBattle(`${person(u).name} → ${e.name} ${dealt}${crit?' 会心':''}`);AudioDirector.sfx('hit');tbWeakHit(i,e,dealt);return dealt;
}
function tbHeal(i,j,base){const b=battle,a=b.allies[i],target=b.allies[j];if(!target||target.hp<=0)return 0;
 const factor=a.effects.heal>0?1+TB_BALANCE.attackBuff:1;
 const amount=Math.round(base*TB_BALANCE.healEffect*factor*passiveHealMultiplier(a,target));const gain=Math.max(0,Math.min(target.max-target.hp,amount));target.hp+=gain;logBattle(`${person(unit(target.id)).name} HP +${gain}`);return gain;
}
function tbShield(i,j,base){const a=battle.allies[i],target=battle.allies[j];if(!target||target.hp<=0)return;
 target.shield+=(Math.round(base*TB_BALANCE.shieldEffect*passiveShieldMultiplier(a,target)));}
function tbSkill(i,j,target){
 const b=tbCurrent(),a=b?.allies[i];if(!a||a.hp<=0||a.cooldowns[j]>0)return false;
 const u=unit(a.id),type=unitSkillType(u,j),kind=skillTarget(u,j),rank=skillRank(a.id),boost=1+rank*.13;
 const e=kind==='enemy'?b.enemies[target]:null,friend=kind==='ally'?b.allies[target]:null;
 if(kind==='enemy'&&(!e||e.hp<=0)||kind==='ally'&&(!friend||friend.hp<=0))return false;
 if(['cover','reset_one'].includes(type)&&i===target)return false;
 a.cooldowns[j]=Math.max(0,TB_BALANCE.roundsSkill[j]-(b.tb.lit===i?TB_BALANCE.lightCooldownReduction:0));
 const strike=(base,mult=1,pierce=false,foe=e)=>tbStrike(i,foe,base*boost*mult,pierce);
 const heal=(ally,base)=>tbHeal(i,ally,base*boost);
 const shield=(ally,base)=>tbShield(i,ally,base*boost);
 const fx=(ally,key)=>{ally.effects[key]=TB_BALANCE.effectRounds;};
 switch(type){
  case 'single':strike(34);break;
  case 'drain':{const hit=strike(30);a.hp=Math.min(a.max,a.hp+Math.round(hit*TB_BALANCE.drain));break;}
  case 'pierce':strike(31,unitPassive(u).type==='pierce_focus'?1+passiveValue(u)/100:1,true);break;
  case 'finisher':strike(28,1+TB_BALANCE.finisher*(1-e.hp/e.max));break;
  case 'aoe':for(const foe of b.enemies.filter(x=>x.hp>0))strike(21,TB_BALANCE.aoe,false,foe);break;
  case 'combo':for(let k=0;k<3&&e.hp>0;k++)strike(16,TB_BALANCE.combo);break;
  case 'def_down':e.defDownRounds=TB_BALANCE.effectRounds;e.vulnerableUntil=b.sim+1;break;
  case 'heal_one':heal(target,57);break;
  case 'cleanse':friend.effects={};heal(target,20);break;
  case 'heal_boost':for(const al of b.allies.filter(x=>x.hp>0))fx(al,'heal');break;
  case 'heal_shield':heal(target,24);shield(target,18);break;
  case 'heal_all':for(let k=0;k<b.allies.length;k++)if(b.allies[k].hp>0)heal(k,27);break;
  case 'regen':fx(friend,'regen');break;
  case 'shield_one':shield(target,56);break;
  case 'shield_all':for(let k=0;k<b.allies.length;k++)if(b.allies[k].hp>0)shield(k,25);break;
  case 'counter':fx(a,'counter');break;
  case 'damage_reduce':for(const al of b.allies.filter(x=>x.hp>0))fx(al,'reduce');break;
  case 'cover':friend.effects.cover=i+1;friend.effects.coverDuration=TB_BALANCE.effectRounds;break;
  case 'taunt':fx(a,'taunt');shield(i,24);break;
  case 'defense_up':for(const al of b.allies.filter(x=>x.hp>0))fx(al,'defense');break;
  case 'enemy_ct':e.stunRounds+=TB_BALANCE.stunRounds;break;
  case 'reset_one':friend.cooldowns=[0,0];break;
  case 'attack_up':for(const al of b.allies.filter(x=>x.hp>0))fx(al,'attack');break;
  case 'ct':for(const al of b.allies.filter(x=>x.hp>0))al.cooldowns=al.cooldowns.map(x=>Math.max(0,x-1));break;
  case 'attack_down':e.weakenRounds=TB_BALANCE.effectRounds;break;
  case 'stun':e.stunRounds+=TB_BALANCE.stunRounds;break;
  default:logBattle(`未定義のスキル型 ${type}`);break;
 }
 logBattle(`${person(u).name}「${u.s[j]}」`);
 return true;
}
function tbEnemyMove(i){
 const b=battle,e=b.enemies[i];if(!e||e.hp<=0)return;
 if(e.breakSkips>0){e.breakSkips--;logBattle(`${e.name}はブレイクで行動できない`);return;}
 if(e.stunRounds>0){e.stunRounds--;logBattle(`${e.name}は足止めされている`);return;}
 const intent=e.intent||'single';
 if(intent==='guard'){e.guardingUntil=b.tb.round+TB_WEAK_BALANCE.guardRounds;logBattle(`${e.name}はガードの姿勢を取った`);return;}
 if(intent==='charge'){e.charged=true;logBattle(`${e.name}は力を溜めている`);return;}
 let targets=b.allies.map((a,j)=>({a,j})).filter(v=>v.a.hp>0);if(!targets.length)return;
 const taunter=targets.find(v=>v.a.effects.taunt>0);
 if(intent==='aoe'){
  logBattle(`${e.name}の全体攻撃！`);
  for(const {a} of targets){const target=a.effects.coverDuration>0?b.allies[a.effects.cover-1]||a:a;tbEnemyHit(e,target,TB_WEAK_BALANCE.aoeMultiplier);}
  return;
 }
 if(taunter)targets=[taunter];
 targets.sort((x,y)=>x.a.hp/x.a.max-y.a.hp/y.a.max);
 const selected=targets[0];const target=selected.a.effects.coverDuration>0?b.allies[selected.a.effects.cover-1]||selected.a:selected.a;
 tbEnemyHit(e,target,intent==='heavy'?TB_WEAK_BALANCE.heavyMultiplier:1);
 if(intent==='heavy')e.charged=false;
}
function tbEnemyHit(e,original,scale){
 const b=battle;let target=original;if(target.hp<=0)return;
 const defense=target.def*(target.effects.defense>0?1+TB_BALANCE.defendBuff:1);
 let damage=Math.max(1,Math.round((e.atk*scale)*(e.weakenRounds>0?1-TB_BALANCE.debuff:1)-defense*TB_BALANCE.defenseFactor));
 damage=Math.max(0,Math.round(damage*passiveIncomingMultiplier(target)*(target.guarding?TB_BALANCE.guardReduction:1)*(target.effects.reduce>0?1-TB_BALANCE.defendBuff:1)*(b.tb.lit===b.allies.indexOf(target)?TB_BALANCE.litDefense:1)*(b.investigation?.safety?TB_BALANCE.safety:1)));
 if(target.shield>0){const blocked=Math.min(damage,target.shield);target.shield-=blocked;damage-=blocked;}
 target.hp=Math.max(0,target.hp-damage);if(typeof ycTurnEnemyAttack==='function')ycTurnEnemyAttack(e,target,damage);AudioDirector.sfx('hit');logBattle(`${e.name} → ${person(unit(target.id)).name} ${damage}ダメージ`);if(typeof ycEvent==='function')ycEvent('hurt',target,damage);
 if(target.effects.counter>0&&target.hp>0&&e.hp>0)tbStrike(b.allies.indexOf(target),e,target.atk*TB_BALANCE.counterRate,true);
}
function tbCheckOutcome(){
 const b=tbCurrent();if(!b)return true;
 if(b.allies.every(a=>a.hp<=0)){tbClearTimer();finishBattle(false);return true;}
 if(b.enemies.every(e=>e.hp<=0)){
  if(b.wave+1>=b.totalWaves){tbClearTimer();finishBattle(true);return true;}
  b.wave++;tbNewWave(QUEST_BY_ID[b.qid]);return true;
 }
 return false;
}
function tbAction(command,j=0){
 const b=tbCurrent(),turn=b?.tb.queue[0];if(!b||interruptConfirm||!turn||turn.side!=='ally')return;
 const i=turn.i,a=b.allies[i];let acted=false;const ycPrior=typeof ycTurnSnapshot==='function'?ycTurnSnapshot():null;
 if(command==='attack'){
  const target=b.enemies[tbTargetEnemy()];if(!target)return;
  const critical=Math.random()<TB_BALANCE.critChance;
  const raw=a.atk*TB_BALANCE.normal*passiveAttackMultiplier(a,target)*(b.tb.lit===i?TB_BALANCE.litAttack:1)*(a.effects.attack>0?1+TB_BALANCE.attackBuff:1)*(a.rallyUntil>b.sim?(a.rallyMult||1):1)*(target.defDownRounds>0?1+TB_BALANCE.debuff:1)*(critical?TB_BALANCE.critBoost:1);
  const rawHit=Math.max(1,Math.round(raw*(1-(target.damageReduction||0))*tbWeakDamageFactor(i,target)*tbBreakDamageFactor(target)*tbGuardDamageFactor(target)*tbQ12BossFactor(target)));const hit=tbQ1TrainingClamp(target,rawHit);target.hp=Math.max(0,target.hp-hit);logBattle(`${person(unit(a.id)).name}のこうげき → ${target.name} ${hit}ダメージ`);AudioDirector.sfx('hit');tbWeakHit(i,target,hit);acted=true;
 }else if(command==='guard'){a.guarding=true;b.tb.light=Math.min(TB_BALANCE.maxLight,b.tb.light+TB_BALANCE.guardLight);logBattle(`${person(unit(a.id)).name}はまもる｜灯火+1`);acted=true;
 }else if(command==='skill'){
  const u=unit(a.id),kind=skillTarget(u,j);const target=kind==='enemy'?tbTargetEnemy():tbTargetAlly(i);
  acted=tbSkill(i,j,target);
 }
 if(!acted)return;
 if(typeof ycTurnAction==='function')ycTurnAction(a,command,ycPrior);
 b.tb.turnCount++;b.tb.queue.shift();
 if(tbCheckOutcome())return;
 tbAdvance();
}
function tbLight(i){
 const b=tbCurrent();if(!b)return;const t=b.tb;
 if(t.lightUsed||t.light<TB_BALANCE.lightCost||!b.allies[i]||b.allies[i].hp<=0)return;
 if(typeof tbUiSnapshot==='function')t.flameUiBefore=tbUiSnapshot(b);
 t.light-=TB_BALANCE.lightCost;t.lightUsed=true;t.lit=i;
 b.allies[i].cooldowns=b.allies[i].cooldowns.map(x=>Math.max(0,x-TB_BALANCE.lightCooldownReduction));
 if(typeof tbFlameActivate==='function')tbFlameActivate(b,i);
 if(typeof tbUiCapture==='function')tbUiCapture(b,1,i);
 logBattle(`${person(unit(b.allies[i].id)).name}の想いを灯した！（このラウンド）`);AudioDirector.sfx('confirm');if(typeof ycEvent==='function')ycEvent('glow',b.allies[i]);tbRender();
}
function tbPickEnemy(i){const b=tbCurrent();if(!b||!b.enemies[i]||b.enemies[i].hp<=0)return;b.tb.targetEnemy=i;tbRender();}
function tbPickAlly(i){const b=tbCurrent();if(!b||!b.allies[i]||b.allies[i].hp<=0)return;
 if(b.tb.pickingLight){b.tb.pickingLight=false;tbLight(i);return;}b.tb.targetAlly=i;tbRender();}
function tbToggleLight(){const b=tbCurrent();if(!b)return;b.tb.resonanceOpen=false;b.tb.pickingLight=!b.tb.pickingLight;tbRender();}
function tbToggleAuto(){const b=tbCurrent();if(!b)return;b.tb.auto=!b.tb.auto;tbClearTimer();tbAdvance();}
function tbToggleSpeed(){const b=tbCurrent();if(!b)return;b.tb.speed=b.tb.speed===1?TB_BALANCE.speedFast:1;tbRender();}
function tbHelp(i,j){const b=tbCurrent();if(!b)return;b.tb.flameInfo=false;b.tb.showHelp=b.tb.showHelp===`${i}:${j}`?-1:`${i}:${j}`;tbRender();}
function tbPressHelpStart(i,j){clearTimeout(tbLongTimer);tbSuppressClick=false;tbLongTimer=setTimeout(()=>{tbSuppressClick=true;tbHelp(i,j)},520);}
function tbPressHelpCancel(){clearTimeout(tbLongTimer);tbLongTimer=0;}
function tbPressSkill(j){if(tbSuppressClick){tbSuppressClick=false;return;}tbAction('skill',j);}
function tbAutoMove(i){
 const b=tbCurrent();if(!b||!b.tb.auto||b.tb.queue[0]?.i!==i||b.tb.queue[0]?.side!=='ally')return;
 const a=b.allies[i],u=unit(a.id);
 const healIndex=b.allies.findIndex(x=>x.hp>0&&x.hp/x.max<0.60);
 for(let j=0;j<2;j++){
  if(a.cooldowns[j]>0)continue;
  const type=unitSkillType(u,j),kind=skillTarget(u,j);
  if(kind==='ally'&&healIndex>=0&&/heal|regen|shield|cleanse/.test(type)){
   b.tb.targetAlly=healIndex;const n=b.tb.turnCount;tbAction('skill',j);if(b?.tb.turnCount!==n)return;
  }
 }
 if(b.tb.light>=TB_BALANCE.lightCost&&!b.tb.lightUsed&&a.atk>=Math.max(...b.allies.filter(x=>x.hp>0).map(x=>x.atk)))tbLight(i);
 if(a.cooldowns[0]===0&&skillTarget(u,0)==='enemy'){tbAction('skill',0);return;}
 if(a.cooldowns[1]===0&&skillTarget(u,1)==='enemy'){tbAction('skill',1);return;}
 tbAction('attack');
}
/* Ver.0.33.2.0: UI-only landscape comparison. In-memory choice, no save schema or battle-rule changes. */
let tbWidePreview=false;
function tbToggleWidePreview(){tbWidePreview=!tbWidePreview;tbRender();}
function tbRender(){
 const b=tbCurrent();if(!b)return;
 const t=b.tb,turn=t.queue[0],acting=turn?.side==='ally'?turn.i:-1;
 const percent=(v,max)=>Math.max(0,Math.min(100,Math.round(v/Math.max(1,max)*100)));
 const q=QUEST_BY_ID[b.qid];
 const enemyHtml=b.enemies.map((e,i)=>`<button type="button" class="tb-enemy ${t.targetEnemy===i?'selected':''} ${e.hp<=0?'dead':''} ${tbIsBroken(e)?'tb-broken':''}" onclick="tbPickEnemy(${i})" ${e.hp<=0?'disabled':''}><div class="tb-enemy-icon">${b.qid==='q12'&&(e.kind==='boss'||e.kind==='cage')?`<img class="tb-enemy-art-thumb" src="assets/enemies/${e.kind==='boss'?'sakuya':'echo_cage'}.webp" alt="">`:window.YoiEnemyArt?.resolve(e,{qid:b.qid,wave:b.wave,index:i})?`<img class="tb-enemy-art-thumb" src="${window.YoiEnemyArt.resolve(e,{qid:b.qid,wave:b.wave,index:i}).src}" alt="" onerror="this.replaceWith(document.createTextNode('✧'))">`:(e.icon||'✧')}</div><b>${esc(e.name)}</b><div class="tb-hp"><i style="width:${percent(e.hp,e.max)}%"></i></div><small>${Math.ceil(e.hp)}/${e.max}</small>${e.kind==='cage'?'<small class="tb-intent">結界を維持（攻撃しない）</small>':tbEnemyStatusMarkup(e)}</button>`).join('');
 const order=t.queue.slice(0,6).map(v=>{const a=v.side==='ally'?b.allies[v.i]:b.enemies[v.i],ally=v.side==='ally';return `<span class="tb-turn-token ${ally?'ally':'enemy'} ${v.bonus?'tb-one-more':''}" title="${esc(ally?person(unit(a.id)).name:a.name)}">${ally?`<img src="${characterIcon(unit(a.id).person)}" alt="">`:esc(a.icon||'✧')}</span>`}).join('');
 const allies=b.allies.map((a,i)=>{const u=unit(a.id),name=person(u).name;return `<button type="button" class="tb-party ${acting===i?'active':''} ${t.lit===i?'lit':''} ${t.targetAlly===i?'targeted':''}" onclick="tbPickAlly(${i})" ${a.hp<=0?'disabled':''}><img src="${characterIcon(u.person)}" alt=""><div><b>${esc(name)} <span class="tb-color tb-color-${tbColorForUnit(a.id)}" title="戦闘用の暫定属性。物語上の灯火色とは別">${tbColorName(tbColorForUnit(a.id))}</span></b><div class="tb-hp"><i style="width:${percent(a.hp,a.max)}%"></i></div><small>HP ${Math.ceil(a.hp)}/${a.max}　CT ${a.cooldowns.join(' / ')}</small></div></button>`}).join('');
 const user=acting>=0?unit(b.allies[acting].id):null;
 const skillBtns=user?user.s.map((name,j)=>`<div class="tb-skill-wrapper"><button type="button" class="btn tb-action" ${b.allies[acting].cooldowns[j]>0?'disabled':''} onpointerdown="tbPressHelpStart(${acting},${j})" onpointerup="tbPressHelpCancel()" onpointercancel="tbPressHelpCancel()" onpointerleave="tbPressHelpCancel()" onclick="tbPressSkill(${j})" title="長押しで効果を表示">${esc(name)}${b.allies[acting].cooldowns[j]>0?` (CT ${b.allies[acting].cooldowns[j]})`:''}</button><button type="button" class="tb-info" onclick="tbHelp(${acting},${j})" aria-label="${esc(name)}の効果を見る" title="${esc(name)}の効果を表示">ⓘ</button></div>`).join(''):'';
 const help=t.showHelp!==-1&&typeof t.showHelp==='string'?(()=>{const [i,j]=t.showHelp.split(':').map(Number);return `<aside class="tb-help" role="dialog" aria-modal="true" aria-label="スキルの説明"><div class="tb-help-head"><strong>${esc(unit(b.allies[i].id).s[j])}</strong><button type="button" class="tb-help-close" onclick="tbHelp(${i},${j})" aria-label="説明を閉じる">閉じる ×</button></div><p>${esc(skillDescription(unit(b.allies[i].id),j,skillRank(b.allies[i].id)))}</p></aside>`})():'';
 const html=`${heading(b.training?'TRAINING / NO REWARDS':'TURN BATTLE / TEST',b.training?'星灯・模擬戦':'星灯・コマンドバトル',b.training?'1ウェーブの模擬戦｜報酬・クリア記録・セーブへの反映なし':`${esc(q.name)}｜${b.totalWaves}ウェーブ`)}<section class="tb-root ${tbWidePreview?'tb-wide':''} card pad" aria-label="ターン制の戦闘">
 <div class="tb-topline"><strong>${b.training?'模擬戦｜':''}WAVE ${b.wave+1}/${b.totalWaves}　ROUND ${t.round}</strong><div><button class="btn mini tb-layout-toggle ${tbWidePreview?'primary':'outline'}" aria-pressed="${tbWidePreview}" onclick="tbToggleWidePreview()">${tbWidePreview?'横画面試作 ON':'横画面試作 OFF'}</button><button class="btn mini" onclick="tbToggleSpeed()">速度 ×${t.speed}</button><button class="btn mini ${t.auto?'primary':'outline'}" onclick="tbToggleAuto()">AUTO ${t.auto?'ON':'OFF'}</button><button class="btn mini outline" onclick="requestInterrupt()">中断</button></div></div>
 ${b.qid==='q12'&&b.wave===b.totalWaves-1?`<p class="tb-q12-hint">黒い星灯の契約者・朔夜との決戦。残響の檻が残っている間、朔夜へのダメージは22%軽減されます。檻と朔夜の両方を倒してください。</p>`:''}<p class="tb-rotate-hint" role="note">横画面比較が有効です。スマートフォンは画面の回転ロックを解除して横向きにしてください。縦表示に戻す場合は上の切替ボタンを押してください。</p><div class="tb-layout-grid"><div class="tb-field-col"><div class="tb-fighters"><div id="ycTurnStage" class="yc-turn-stage" role="group" aria-label="味方と敵の共通戦闘ステージ"></div><div class="tb-enemies">${enemyHtml}</div></div>${b.qid==='q1'&&b.wave===0?`<details class="tb-q1-practice"><summary><strong>${t.q1BreakSeen?'ブレイク成功！ ワンモアで追撃しよう':'練習：弱点 → ブレイク → ワンモア'}</strong></summary><p>${t.q1BreakSeen?'ほころびを満タンにすると、敵の行動を止めて追加で動けます。残った敵を倒しましょう。':'左側の敵はブレイクまで倒れません。弱点表示と同じ色の味方で2回攻撃するとブレイクします。敵をタップして狙いを合わせ、ほかの味方は「まもる」で手番を進めても大丈夫です。'}</p></details>`:''}<p class="tb-weak-note">弱点の色で攻撃するとほころびが増加。満タンでブレイク＋ワンモア。戦闘用の5色は仮割当てです。物語上の灯火色は別に保持しています。</p><div class="tb-order"><span>行動順</span>${order}</div><div class="tb-live-log" role="status">直近：${esc(b.log[b.log.length-1]||'戦闘開始')}</div><details class="tb-log"><summary>戦闘ログ</summary><div>${b.log.slice(-10).map(x=>`<p>${esc(x)}</p>`).join('')}</div></details></div><div class="tb-control-col">
 ${typeof tbUiControls==='function'?tbUiControls(b,acting):''}${typeof tbUiResultDialog==='function'?tbUiResultDialog(b):''}
 <div class="tb-party-grid">${allies}</div>${acting>=0&&typeof tbFlameAllowed==='function'&&tbFlameAllowed(b)?`<div class="tb-flame-caption-row"><span>固有灯火：${esc(tbFlameData(b.allies[acting].id)?.name||'準備中')}</span><button type="button" class="tb-flame-info-btn" onclick="tbFlameInfoToggle()" aria-label="固有灯火の効果を見る" title="固有灯火の説明">ⓘ</button></div>`:''}${t.flameInfo&&acting>=0?`<aside class="tb-help tb-flame-dialog" role="dialog" aria-label="固有灯火の説明"><div class="tb-help-head"><strong>${esc(tbFlameData(b.allies[acting].id)?.name||'固有灯火')}</strong><button type="button" class="tb-help-close" onclick="tbFlameInfoToggle()">閉じる ×</button></div>${typeof tbUiSharedFlameDesc==='function'?tbUiSharedFlameDesc(b.allies[acting].id):`<p>${esc(tbFlameDesc(b.allies[acting].id))}</p>`}</aside>`:''}<div class="tb-commands">${acting>=0?`<b>${esc(person(user).name)}の行動を選択${turn?.bonus?'（ワンモア）':''}</b><div class="tb-command-row"><button class="btn primary tb-action" onclick="tbAction('attack')">こうげき</button>${skillBtns}<button class="btn outline tb-action" onclick="tbAction('guard')">まもる</button></div>`:'<b>敵の行動中</b>'}${help}</div>
 </div></div></section>`;
 const root=$('app');if(root)root.innerHTML=mainShell(html)+onboardingGuideMarkup()+(interruptConfirm?interruptMarkup():'');
 if(typeof ycRenderTurn==='function')ycRenderTurn();
 if(t.showHelp!==-1){const close=root.querySelector('.tb-help-close');close?.focus({preventScroll:true});}
 AudioDirector.sync(currentAudioContext());
}
