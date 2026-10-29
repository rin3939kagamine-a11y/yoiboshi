/* RE:START Ver.0.34.2.0 — PRESENTATION ONLY: compact result summary, detailed modal, common/unique lamp effects.
   Battle calculations and saved game data are never modified here. */
function tbUiClear(b){if(b?.tb){delete b.tb.flameUiBefore;delete b.tb.flameUiResult;delete b.tb.flameUiResultOpen;}}
function tbUiSnapshot(b){return {
 allies:b.allies.map(a=>({hp:a.hp,shield:a.shield||0,cd:[...a.cooldowns],fx:{...a.effects}})),
 enemies:b.enemies.map(e=>({def:e.defDownRounds||0,atk:e.weakenRounds||0}))
};}
function tbUiCapture(b,cost,actor){
 const t=b.tb,old=t.flameUiBefore;if(!old)return;
 const changed=[];
 b.allies.forEach((a,i)=>{
  const before=old.allies[i];if(!before)return;
  const items=[];const hp=a.hp-before.hp,shield=(a.shield||0)-before.shield;
  if(hp>0)items.push(`HP +${hp}`);if(shield>0)items.push(`障壁 +${shield}`);
  const ct=before.cd.map((v,j)=>v-a.cooldowns[j]).filter(n=>n>0).reduce((x,y)=>x+y,0);
  if(ct>0)items.push(`CT -${ct}`);
  if((a.effects.attack||0)>(before.fx.attack||0))items.push('攻撃強化');
  if(items.length)changed.push(`${person(unit(a.id)).name}：${items.join('・')}`);
 });
 b.enemies.forEach((e,i)=>{const before=old.enemies[i];if(!before)return;const items=[];
  if((e.defDownRounds||0)>before.def)items.push('防御低下');
  if((e.weakenRounds||0)>before.atk)items.push('攻撃低下');
  if(items.length)changed.push(`${e.name}：${items.join('・')}`);
 });
 const a=b.allies[actor],p=cost===1?tbFlameData(a.id):null;
 t.flameUiResult={cost,title:cost===1?`1灯「${p?.name||'固有灯火'}」`:`${cost}灯共鳴`,
  entries:changed.length?changed:['対象の状態に数値上の変化なし（上限・既存効果を確認）'],
  light:t.light};
 delete t.flameUiBefore;t.flameUiResultOpen=false;
}
function tbUiAvailability(b,level,acting){
 const t=b.tb;
 if(acting<0)return {allowed:false,reason:'手番外'};
 if(t.lightUsed)return {allowed:false,reason:'使用済み'};
 if(t.light<level)return {allowed:false,reason:'灯火不足'};
 if(level>1&&b.allies.filter(a=>a.hp>0).length<level)return {allowed:false,reason:'人数不足'};
 return {allowed:true,reason:'使用可能'};
}
function tbUiControls(b,acting){
 const t=b.tb,allowed=typeof tbFlameAllowed==='function'&&tbFlameAllowed(b),current=acting>=0?tbFlameData(b.allies[acting].id):null;
 const status=level=>tbUiAvailability(b,level,acting);
 const s1=status(1),s2=status(2),s3=status(3);
 const name=current?.name||'固有灯火';
 const effect=current?TB_FLAME_RULES[current.kind].detail:'手番待ち';
 const ready=(level,s)=>`<span class="tb-flame-pill ${s.allowed?'can-use':'cannot-use'}" title="${level}灯 ${esc(s.reason)}${level===1?'／共通：攻撃+30％・被ダメージ−20％・CT−1／固有：'+esc(effect):''}"><b>${level===1?'1灯｜共通＋固有':level+'灯'}</b><span>${level===1?`共通：攻↑守↑CT↓／固有：${esc(effect)}`:level===2?'2人に障壁':'全員に障壁＋小回復'}</span><em>${esc(s.reason)}</em></span>`;
 const result=t.flameUiResult;
 const resultHtml=result?`<div class="tb-flame-result" role="status" aria-live="polite"><div class="tb-flame-result-summary"><b>発動結果｜${esc(result.title)}／残${result.light}灯</b><span>${esc(result.entries[0]||'結果を確認してください')}${result.entries.length>1?` 他${result.entries.length-1}名`:''}</span></div><button type="button" class="tb-flame-result-open" onclick="tbUiToggleResult()" aria-label="発動結果の対象と数値をすべて表示">詳細</button></div>`:'';
 const menu=allowed&&t.resonanceOpen?`<div class="tb-resonance-actions" role="group" aria-label="共鳴の効果を比較"><div class="tb-resonance-menu-title">共鳴を選択（効果は暫定）</div>
 <button type="button" class="btn outline tb-resonance-choice" onclick="tbFlameResonate(2)" ${!s2.allowed?'disabled':''}><b>2灯共鳴｜消費2</b><span>対象：手番の味方＋もう1人</span><span>効果：2人に最大HPの約9％の障壁</span><em>${esc(s2.reason)}</em></button>
 <button type="button" class="btn outline tb-resonance-choice" onclick="tbFlameResonate(3)" ${!s3.allowed?'disabled':''}><b>3灯共鳴｜消費3</b><span>対象：生存している味方全員</span><span>効果：最大HPの約7％の障壁＋約4％回復</span><em>${esc(s3.reason)}</em></button></div>`:'';
 return `<div class="tb-flame-ui"><div class="tb-light"><strong>✦ 灯火 <span class="tb-flame-value" aria-label="灯火残量">${t.light} / ${TB_BALANCE.maxLight}</span></strong><div class="tb-light-track" aria-hidden="true">${Array.from({length:TB_BALANCE.maxLight},(_,i)=>`<i class="${i<t.light?'filled':''}"></i>`).join('')}</div><button type="button" class="btn tb-light-button ${t.pickingLight?'primary':''}" onclick="tbToggleLight()" ${!s1.allowed?'disabled':''}>${t.pickingLight?'対象選択中':'灯す（1灯）'}</button>${allowed?`<button type="button" class="btn outline tb-resonance-toggle" onclick="tbUiToggleCompare()" aria-expanded="${!!t.resonanceOpen}" aria-label="共鳴の効果と消費量を見る" >共鳴</button>`:''}${menu}</div>
 ${allowed&&!result?`<div class="tb-flame-guide" role="group" aria-label="灯火の使い方：効果、消費量、使用可否">${ready(1,s1)}${ready(2,s2)}${ready(3,s3)}</div>`:''}
 ${resultHtml}</div>`;
}

function tbUiToggleCompare(){const b=tbCurrent();if(!tbFlameAllowed(b))return;b.tb.resonanceOpen=!b.tb.resonanceOpen;tbRender();}

/* Ver.0.34.2.0: the detailed result is an explicit overlay only after a tap,
   keeping the battlefield / enemy HUD free of unsolicited notifications. */
function tbUiToggleResult(){
 const b=tbCurrent();if(!b?.tb?.flameUiResult)return;
 b.tb.flameUiResultOpen=!b.tb.flameUiResultOpen;
 if(b.tb.flameUiResultOpen){b.tb.flameInfo=false;b.tb.showHelp=-1;b.tb.resonanceOpen=false;}
 tbRender();
}
function tbUiResultDialog(b){
 const t=b.tb,r=t?.flameUiResult;
 if(!r||!t.flameUiResultOpen)return '';
 return `<aside class="tb-help tb-flame-result-dialog" role="dialog" aria-modal="true" aria-label="灯火の発動結果詳細"><div class="tb-help-head"><strong>発動結果｜${esc(r.title)}（残り${r.light}灯）</strong><button type="button" class="tb-help-close" onclick="tbUiToggleResult()" aria-label="発動結果を閉じる">閉じる ×</button></div><ul>${r.entries.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></aside>`;
}
function tbUiSharedFlameDesc(id){
 const flame=tbFlameData(id),detail=flame?TB_FLAME_RULES[flame.kind]?.detail:'未登録';
 return `<div class="tb-flame-info-groups"><div><b>共通効果（点灯した味方）</b><p>このラウンド、攻撃＋${Math.round((TB_BALANCE.litAttack-1)*100)}％、受けるダメージ−${Math.round((1-TB_BALANCE.litDefense)*100)}％、スキルCT−${TB_BALANCE.lightCooldownReduction}。新たに使うスキルのCTも同じだけ短縮します。</p></div><div><b>キャラ固有効果</b><p>${esc(flame?.name||'未登録')}：${esc(detail)}。</p><p>想い：${esc(flame?.thought||'設定待ち')} ／ 物語上の色：${esc(flame?.storyColor||'未設定（仮）')}</p></div></div>`;
}
