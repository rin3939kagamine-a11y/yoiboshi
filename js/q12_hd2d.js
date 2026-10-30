/* Ver.0.25.0.0 — q12-specific tactical battle layer.
 * Only transient `battle.q12hd`: the established save key and unit systems are untouched.
 */
const Q12HD=Object.freeze({
 enabled(b){return !!b&&b.qid==='q12'},
 active(b){return this.enabled(b)&&b.wave===b.totalWaves-1&&b.phase==='fight'&&!!b.q12hd?.cage},
 init(b){if(this.enabled(b))b.q12hd={focus:'boss',focusEnemyId:null,stage:1,cage:null,attackCount:0,charge:false,nextPulse:0,introShown:false}},
 spawn(b){
  if(!this.enabled(b)||b.wave!==b.totalWaves-1)return;
  const boss=b.enemies.find(e=>e.kind==='boss');if(!boss)return;
  boss.x=83;boss.y=50;
  const cage={id:'q12_echo_cage',name:'残響の檻',kind:'cage',icon:'◇',max:Math.round(boss.max*.62),hp:Math.round(boss.max*.62),x:57,y:49,atk:0,attackTimer:Infinity,interval:Infinity,damageReduction:.18,elite:false,enraged:false};
  b.enemies.push(cage);b.q12hd={focus:'cage',focusEnemyId:null,stage:1,cage,attackCount:0,charge:false,nextPulse:b.sim+14,introShown:true};
  b.enemies.filter(e=>e!==boss&&e!==cage).forEach((e,i)=>{e.x=65+i*6;e.y=76});
  b.allies.forEach((a,i)=>{a.x=17+(i%2)*14;a.y=49+Math.floor(i/2)*28});
  if(typeof logBattle==='function')logBattle('黒い星灯の契約者・朔夜が出現！ 朔夜と残響の檻の両方を破壊せよ。');
 },
 boss(b){return b?.enemies?.find(e=>e.kind==='boss')},
 cage(b){return b?.q12hd?.cage},
 choose(b,pool){
  if(!this.active(b))return pool[0];
  const c=this.cage(b),boss=this.boss(b),focus=b.q12hd.focus;
  if(c.hp<=0&&!b.q12hd.cageBroken){b.q12hd.focus='boss';b.q12hd.focusEnemyId=null;b.q12hd.cageBroken=true;}
  const specific=b.enemies.find(e=>e.id===b.q12hd.focusEnemyId&&e.hp>0);
  if(specific)return specific;
  const target=(c.hp>0&&focus==='cage')?c:boss;
  return target&&target.hp>0?target:(pool.find(e=>e.hp>0&&e!==c)||pool.find(e=>e.hp>0));
 },
 damage(b,e,n){
  if(!this.active(b)||e.kind!=='boss'||this.cage(b)?.hp<=0)return n;
  return Math.max(1,Math.round(n*.78));
 },
 enemyFace(e){
  if(e.kind==='boss')return '<img class="v025-foe-art" src="assets/enemies/sakuya_battle.webp" alt="">';
  if(e.kind==='cage')return '<img class="v025-cage-art" src="assets/enemies/echo_cage.webp" alt="">';
  return e.icon||'✧';
 },
 update(b){
  if(!this.active(b))return;
  const st=b.q12hd,boss=this.boss(b),c=this.cage(b);
  if(c.hp<=0&&!st.cageBroken){st.focus='boss';st.focusEnemyId=null;st.cageBroken=true;if(typeof logBattle==='function')logBattle('残響の檻が崩壊。攻撃対象を朔夜へ自動変更！');}
  if(st.focusEnemyId&&!b.enemies.some(e=>e.id===st.focusEnemyId&&e.hp>0))st.focusEnemyId=null;
  if(boss&&boss.hp>0){
   const ratio=boss.hp/boss.max;
   const stage=ratio<=.35?3:ratio<=.7?2:1;
   if(stage>st.stage){
    st.stage=stage;boss.interval=Math.max(1.28,boss.interval*(stage===2?.91:.88));
    boss.atk*=stage===2?1.12:1.15;
    if(typeof logBattle==='function')logBattle(stage===2?'朔夜が黒い星灯を解放した。攻撃が激しくなる！':'残響が暴走する！ 朔夜の最終形態へ移行。');
   }
   if(c.hp>0&&b.sim>=st.nextPulse){
    st.nextPulse=b.sim+14;
    const value=Math.min(c.max-c.hp,Math.round(c.max*.075));
    if(value>0){c.hp+=value;if(typeof logBattle==='function')logBattle(`朔夜が残響の檻を補修。耐久 +${value}`)}
   }
  }
 },
 // Called in the existing enemy attack loop. true = special attack consumed the action.
 specialAttack(b,e){
  if(!this.active(b)||e.kind!=='boss')return false;
  const st=b.q12hd;
  if(st.charge){
   st.charge=false;st.attackCount=0;
   const targets=b.allies.filter(a=>a.hp>0);let total=0;
   for(const a of targets){
    const armor=a.def*(a.defenseBuffUntil>b.sim?(a.defenseBuffMult||1):1);
    let damage=Math.max(1,Math.round(e.atk*(st.stage===3?1.62:1.35)-armor));
    damage=investigationIncomingDamage(damage);
    damage=Math.max(0,Math.round(damage*passiveIncomingMultiplier(a)*(a.damageReduceUntil>b.sim?(a.damageReduceMult||1):1)));
    if(a.shield>0){const blocked=Math.min(a.shield,damage);a.shield-=blocked;damage-=blocked}
    a.hp=Math.max(0,a.hp-damage);total+=damage;
    if(damage>0)battlePopup(a,damage,'ally');
   }
   e.attackTimer=Math.max(2.1,e.interval*1.4);logBattle(`朔夜「黒い星灯の波動」！ 味方全体に計${total}ダメージ`);
   b.effect={kind:'enemy',name:'黒い星灯の波動',time:b.sim};
   return true;
  }
  st.attackCount++;
  if(st.attackCount >= (st.stage===3?1:2)){
   st.charge=true;e.attackTimer=st.stage===3?2.6:3.4;
   logBattle(`朔夜が強大な力を集中している！ あと${e.attackTimer.toFixed(1)}秒で全体攻撃。防護・回復・CT延長で備えよ。`);
   return true;
  }
  return false;
 },
 panel(b){
  if(!this.active(b))return '';
  const cage=this.cage(b),boss=this.boss(b),st=b.q12hd;
  return `<section class="v025-encounter-panel" aria-label="朔夜との決戦"><div class="v025-bars"><div class="v025-gauge"><div class="v025-gauge-label"><strong>朔夜 <small>黒い星灯の契約者</small></strong><span id="v025-boss-hp"></span></div><div class="v025-meter"><i id="v025-boss-bar" style="width:${Math.round((boss?.hp||0)/(boss?.max||1)*100)}%"></i></div></div><div class="v025-gauge cage"><div class="v025-gauge-label"><strong>残響の檻 <small>楓を解放せよ</small></strong><span id="v025-cage-hp"></span></div><div class="v025-meter"><i id="v025-cage-bar" style="width:${Math.round(cage.hp/cage.max*100)}%"></i></div></div></div><div class="v025-tactics"><div class="v025-stage" id="v025-stage">PHASE 1</div><div class="v025-target-choice" aria-label="自動攻撃の優先対象"><button id="v025-focus-cage" type="button" onclick="Q12HD.focus('cage')">檻を攻撃</button><button id="v025-focus-boss" type="button" onclick="Q12HD.focus('boss')">朔夜を攻撃</button></div></div><div class="v025-warning" id="v025-warning" role="status" aria-live="polite"></div></section>`;
 },
 focus(target){
  if(!this.active(battle)||!['cage','boss'].includes(target))return;
  battle.q12hd.focus=target;battle.q12hd.focusEnemyId=null;
  logBattle(`指示変更：${target==='cage'?'残響の檻を優先攻撃':'朔夜を優先攻撃'}`);
  renderCombatFrame(false);
 },
 focusExtra(index){
  if(!this.active(battle))return;const foe=battle.enemies[index];
  if(!foe||foe.hp<=0||foe.kind==='boss'||foe.kind==='cage')return;
  battle.q12hd.focusEnemyId=foe.id;
  if(typeof logBattle==='function')logBattle(`指示変更：${foe.name}を優先攻撃`);
  renderCombatFrame(false);
 },
 updateHud(b){
  if(!this.active(b))return;
  const cage=this.cage(b),boss=this.boss(b),st=b.q12hd;
  const setText=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v};
  const setWidth=(id,v)=>{const el=document.getElementById(id);if(el)el.style.width=`${Math.max(0,Math.min(100,v))}%`};
  setText('v025-boss-hp',boss?`${Math.ceil(boss.hp)} / ${boss.max}`:'—');
  setText('v025-cage-hp',`${Math.ceil(cage.hp)} / ${cage.max}`);
  setWidth('v025-boss-bar',boss?boss.hp/boss.max*100:0);setWidth('v025-cage-bar',cage.hp/cage.max*100);
  setText('v025-stage',`PHASE ${st.stage} / 3`);
  for(const kind of ['boss','cage']){const btn=document.getElementById(`v025-focus-${kind}`);if(btn){const disabled=kind==='boss'?boss?.hp<=0:cage.hp<=0;btn.disabled=!!disabled;btn.classList.toggle('active',!st.focusEnemyId&&st.focus===kind)}}
  const warning=document.getElementById('v025-warning');
  if(warning){const message=st.charge&&boss?.hp>0?`⚠ 黒い星灯の波動：全体攻撃まで ${Math.max(0,boss.attackTimer).toFixed(1)}秒。防護・CT延長で対処！`:boss?.hp<=0&&cage.hp>0?'朔夜は倒れた。残響の檻を破壊して楓を救出！':cage.hp<=0&&boss?.hp>0?'檻の拘束が解けた。朔夜に攻撃を集中！':cage.hp>0?'檻が残る間、朔夜が受けるダメージは低下する。':'残響の檻が崩壊した！';warning.textContent=message;warning.classList.toggle('danger',!!st.charge)}
  const arena=document.getElementById('arena');if(arena)arena.dataset.bossStage=String(st.stage);
 }
});
