/* RE:START 0.33.0.0 — experimental turn combat stage 4 only.
 * Enemy weaknesses, stagger/break/one-more, and announced intents.
 * No legacy combat code or save format changes. Hero colors are temporary
 * battle-only assignments until the canonical 54-hero data ships in stage 5.
 */
const TB_WEAK_COLORS = Object.freeze(['red','blue','yellow','green','white']);
const TB_WEAK_NAMES = Object.freeze({red:'赤',blue:'青',yellow:'黄',green:'緑',white:'白'});
const TB_WEAK_BALANCE = Object.freeze({
  weaknessMultiplier:1.50, breakMultiplier:1.30,
  staggerRequired:{normal:3,swift:3,armored:4,boss:5},
  breakRounds:1, breakSkips:1, oneMorePerBreak:1,
  weakLightGain:1, guardMultiplier:0.65,guardRounds:1,
  aoeMultiplier:0.67,heavyMultiplier:1.65,
  intentCycle:['single','single','aoe','guard','charge'],
  swiftCycle:['single','aoe','single','charge','single'],
  armoredCycle:['guard','single','charge','single','aoe']
});
function tbHash(text){let v=2166136261;for(const ch of String(text)){v=Math.imul(v^ch.charCodeAt(0),16777619)>>>0;}return v>>>0;}
function tbColorForUnit(id){
 const pid=unit(id)?.person||String(id);
 const canonicalHints={saki:'blue',yuzu:'yellow',reiko:'red'};
 // Temporary identity-to-color map, not the hero's final flame data.
 return canonicalHints[pid]||TB_WEAK_COLORS[tbHash(pid)%TB_WEAK_COLORS.length];
}
function tbColorName(id){return TB_WEAK_NAMES[id]||'?';}
function tbWeakInitWave(b,q){
 b.enemies.forEach((e,i)=>{
  // Q1 teaches the first battle's available colors; other quests keep their previous mapping.
  e.weakColor=q.id==='q1'&&b.allies.length?tbColorForUnit(b.allies[i%b.allies.length].id):TB_WEAK_COLORS[tbHash(`${q.id}/${b.wave}/${e.id}/${i}`)%TB_WEAK_COLORS.length];
  e.weakRevealed=!!b.investigation?.weakness;
  e.stagger=0;
  e.staggerMax=q.id==='q1'&&b.wave===0&&i===0?2:(TB_WEAK_BALANCE.staggerRequired[e.kind]||TB_WEAK_BALANCE.staggerRequired.normal);
  e.breakUntil=0;e.breakSkips=0;e.guardingUntil=0;e.charged=false;e.intent='single';
 });
}
function tbWeakPlanRound(b){
 const round=b.tb.round;
 for(let i=0;i<b.enemies.length;i++){
  const e=b.enemies[i];if(e.hp<=0)continue;
  // The intent is locked before allies act; it never changes within a round.
  if(e.breakSkips>0){e.intent='broken';continue;}
  if(e.stunRounds>0){e.intent='stunned';continue;}
  if(e.charged){e.intent='heavy';continue;}
  const cycle=e.kind==='swift'?TB_WEAK_BALANCE.swiftCycle:e.kind==='armored'?TB_WEAK_BALANCE.armoredCycle:TB_WEAK_BALANCE.intentCycle;
  e.intent=cycle[(round+i+b.wave+tbHash(b.qid))%cycle.length];
 }
}
function tbIsBroken(e){return !!(e?.hp>0&&e.breakUntil>=battle?.tb?.round&&e.breakUntil>0);}
function tbWeakDamageFactor(i,e){return tbColorForUnit(battle.allies[i].id)===e.weakColor?TB_WEAK_BALANCE.weaknessMultiplier:1;}
function tbBreakDamageFactor(e){return tbIsBroken(e)?TB_WEAK_BALANCE.breakMultiplier:1;}
function tbGuardDamageFactor(e){return e.guardingUntil>=battle.tb.round?TB_WEAK_BALANCE.guardMultiplier:1;}
// First Q1 encounter: a small scripted training barrier prevents accidental defeat
// before the player gets two correctly colored hits. Only experimental turn combat.
function tbQ1TrainingClamp(e,damage){
 const b=battle;
 if(!b?.turnBattle||b.qid!=='q1'||b.wave!==0||e!==b.enemies[0]||b.tb?.q1BreakSeen)return damage;
 return Math.max(0,Math.min(damage,e.hp-1));
}
function tbWeakHit(i,e,damage){
 const b=battle,t=b?.tb;const trainingContact=b?.qid==='q1'&&b.wave===0&&e===b.enemies[0]&&!t?.q1BreakSeen;
 if(!t||!e||(damage<=0&&!trainingContact))return;
 if(tbColorForUnit(b.allies[i].id)!==e.weakColor)return;
 if(!e.weakRevealed){e.weakRevealed=true;logBattle(`${e.name}の弱点を発見：${tbColorName(e.weakColor)}`);}
 t.light=Math.min(TB_BALANCE.maxLight,t.light+TB_WEAK_BALANCE.weakLightGain);
 if(e.hp<=0)return; // Killing blow needs no break or extra action.
 if(tbIsBroken(e))return; // Cannot stagger again during an active break.
 e.stagger=Math.min(e.staggerMax,e.stagger+1);
 logBattle(`${e.name}に弱点攻撃！ ほころび ${e.stagger}/${e.staggerMax}、灯火+1`);
 if(e.stagger<e.staggerMax)return;
 if(b.qid==='q1'&&b.wave===0&&e===b.enemies[0])t.q1BreakSeen=true;
 e.stagger=0;e.breakUntil=t.round+TB_WEAK_BALANCE.breakRounds;e.breakSkips=TB_WEAK_BALANCE.breakSkips;
 e.intent='broken';logBattle(`${e.name}がブレイク！ 次の行動を阻止、被ダメージ増加`);
 const active=t.queue[0];
 if(active?.side==='ally'&&b.allies[active.i]?.hp>0){
  for(let n=0;n<TB_WEAK_BALANCE.oneMorePerBreak;n++)t.queue.splice(1,0,{side:'ally',i:active.i,bonus:true});
  logBattle(`${person(unit(b.allies[active.i].id)).name}にワンモア！`);
 }
}
function tbEnemyIntentLabel(e){
 if(e.hp<=0)return '撃破';
 if(e.breakSkips>0)return 'ブレイク：行動不可';
 if(e.stunRounds>0)return '足止め：行動不可';
 return ({single:'通常攻撃',aoe:'全体攻撃',guard:'ガード',charge:'力を溜める',heavy:'強打',broken:'ブレイク：行動不可',stunned:'足止め：行動不可'})[e.intent]||'通常攻撃';
}
function tbEnemyStatusMarkup(e){
 const name=e.weakRevealed?tbColorName(e.weakColor):'?';
 const type=e.weakRevealed?`tb-color-${e.weakColor}`:'tb-unknown';
 const pct=Math.round(e.stagger/Math.max(1,e.staggerMax)*100);
 return `<div class="tb-extra"><span class="tb-weakness ${type}">弱点 ${name}</span><small class="tb-intent">予告：${tbEnemyIntentLabel(e)}</small><span class="tb-stagger-label">${tbIsBroken(e)?'BREAK!':'ほころび '+e.stagger+'/'+e.staggerMax}</span><span class="tb-stagger" role="progressbar" aria-label="ほころび" aria-valuenow="${e.stagger}" aria-valuemin="0" aria-valuemax="${e.staggerMax}"><i style="width:${pct}%"></i></span></div>`;
}
