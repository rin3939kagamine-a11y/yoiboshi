/* Ver.0.34.54.0: ターン制AUTOの判断を改良（戦闘ルール・数値は変更しない）。
 * 以前のAUTOは「敵を狙うスキル」と「HP6割未満のときの回復」しか使わず、
 * 強化・防御・全体攻撃などはほぼ使われなかった。ここで tbAutoMove を置き換える。
 * 方針：その場で一番役に立つスキルに点数を付けて選ぶ。40点未満なら通常攻撃。
 */
function tbAutoMove(i){
 const b=tbCurrent();if(!b||!b.tb.auto||b.tb.queue[0]?.i!==i||b.tb.queue[0]?.side!=='ally')return;
 const a=b.allies[i],u=unit(a.id);
 const live=b.allies.map((x,k)=>({x,k})).filter(o=>o.x.hp>0);
 const foes=b.enemies.map((e,k)=>({e,k})).filter(o=>o.e.hp>0);
 if(!foes.length){tbAction('attack');return;}
 const ratio=o=>o.x.hp/Math.max(1,o.x.max);
 const low=live.filter(o=>ratio(o)<0.6).sort((p,q)=>ratio(p)-ratio(q));
 const hurt=live.filter(o=>ratio(o)<0.8);
 const dangerFoes=foes.filter(o=>['charge','heavy','aoe'].includes(o.e.intent)&&!(o.e.stunRounds>0)&&!(o.e.breakSkips>0));
 const danger=dangerFoes.length>0;
 const has=(x,key)=>(x.effects?.[key]||0)>0;
 const someHas=key=>live.some(o=>has(o.x,key));
 // 攻撃する敵：判明している弱点が合う敵 → ブレイク中 → 危険な予告 → 残りHPの割合が低い敵
 const weakColor=typeof tbColorForUnit==='function'?tbColorForUnit(a.id):null;
 const foeScore=o=>{let s=0;const e=o.e;
  if(e.weakRevealed&&weakColor&&e.weakColor===weakColor)s+=40;
  if(typeof tbIsBroken==='function'&&tbIsBroken(e))s+=30;
  if(dangerFoes.includes(o))s+=15;
  s+=(1-e.hp/Math.max(1,e.max))*20;
  if(e.kind==='cage')s+=25; // q12：檻を先に壊す
  return s;};
 const bestFoe=[...foes].sort((p,q)=>foeScore(q)-foeScore(p))[0];
 const dangerFoe=dangerFoes.sort((p,q)=>q.e.max-p.e.max)[0]||bestFoe;
 const cands=[];
 for(let j=0;j<2;j++){
  if(a.cooldowns[j]>0)continue;
  const type=unitSkillType(u,j);let s=0,ally=null,foe=bestFoe;
  switch(type){
   case 'heal_one':case 'heal_shield':if(low.length){s=90;ally=low[0];}break;
   case 'cleanse':if(low.length){s=70;ally=low[0];}break;
   case 'heal_all':if(hurt.length>=2){s=92;}else if(low.length){s=72;}break;
   case 'regen':{const t=low.find(o=>!has(o.x,'regen'))||hurt.find(o=>!has(o.x,'regen'));if(t){s=low.includes(t)?82:45;ally=t;}break;}
   case 'shield_one':{const t=low[0]||(danger?[...live].sort((p,q)=>ratio(p)-ratio(q))[0]:null);if(t){s=low.length?78:62;ally=t;}break;}
   case 'shield_all':if(danger)s=86;else if(hurt.length>=2)s=66;break;
   case 'damage_reduce':case 'defense_up':{const key=type==='damage_reduce'?'reduce':'defense';if(!someHas(key))s=danger?88:42;break;}
   case 'taunt':if(!has(a,'taunt')&&a.hp/a.max>0.45)s=danger?80:44;break;
   case 'counter':if(!has(a,'counter'))s=46;break;
   case 'cover':{const t=low.find(o=>o.k!==i);if(t&&a.hp/a.max>0.5){s=70;ally=t;}break;}
   case 'heal_boost':if(hurt.length>=2&&!someHas('heal'))s=52;break;
   case 'attack_up':if(!someHas('attack'))s=62;break;
   case 'ct':{const wait=live.filter(o=>o.k!==i).reduce((n,o)=>n+o.x.cooldowns.reduce((m,c)=>m+c,0),0);if(wait>=2)s=56;break;}
   case 'reset_one':{const t=live.filter(o=>o.k!==i).sort((p,q)=>Math.max(...q.x.cooldowns)-Math.max(...p.x.cooldowns))[0];if(t&&Math.max(...t.x.cooldowns)>=2){s=50;ally=t;}break;}
   case 'aoe':s=foes.length>=2?74:50;break;
   case 'finisher':s=50+(bestFoe.e.hp/bestFoe.e.max<0.5?20:0);break;
   case 'single':case 'pierce':case 'drain':case 'combo':s=50;break;
   case 'def_down':if(!(bestFoe.e.defDownRounds>0))s=bestFoe.e.hp/bestFoe.e.max>0.5?55:40;break;
   case 'attack_down':if(danger&&!(dangerFoe.e.weakenRounds>0)){s=66;foe=dangerFoe;}break;
   case 'stun':case 'enemy_ct':if(danger){s=78;foe=dangerFoe;}else s=44;break;
   default:s=40;
  }
  if(s>0)cands.push({j,s,ally,foe});
 }
 if(b.tb.light>=TB_BALANCE.lightCost&&!b.tb.lightUsed&&a.atk>=Math.max(...live.map(o=>o.x.atk)))tbLight(i);
 cands.sort((p,q)=>q.s-p.s);
 for(const c of cands){
  if(c.s<40)break;
  if(c.ally)b.tb.targetAlly=c.ally.k;
  if(c.foe)b.tb.targetEnemy=c.foe.k;
  const n=b.tb.turnCount;tbAction('skill',c.j);
  if(tbCurrent()!==b||b.tb.turnCount!==n)return;
 }
 b.tb.targetEnemy=bestFoe.k;
 tbAction('attack');
}
