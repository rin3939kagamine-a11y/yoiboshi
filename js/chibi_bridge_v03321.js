/* Ver.0.33.2.1: 7-character battle chibi visual bridge.
 * Purely presentation: no combat damage, turns, rewards or saves changed.
 * The supplied YoiChibi class and animation CSS are preserved byte for byte.
 */
(function(){
 'use strict';
 let node=null, api=null, context=null, linkedBattle=null, mountSize=0;
 const events=[];
 function current(){return typeof battle!=='undefined'&&battle&&!battle.done&&typeof view!=='undefined'&&view==='combat'?battle:null;}
 function visible(){return current()&&!(battle.grind)&&typeof YoiChibi!=='undefined';}
 function member(a){
   const u=unit(a.id),id=u.person;
   const color=typeof tbColorForUnit==='function'?({'red':'#ff656d','blue':'#67afff','green':'#7cce94','yellow':'#ffe082','white':'#f2f4ff'}[tbColorForUnit(a.id)]||u.color):u.color;
   return {id,name:person(u).name,color,fallbackSrc:characterIcon(id)};
 }
 function reset(clearEvents=true){if(api){api.destroy();}api=null;node=null;context=null;linkedBattle=null;mountSize=0;if(clearEvents)events.length=0;}
 function enqueue(event){if(visible())events.push({...event,b:current()});if(events.length>30)events.splice(0,events.length-30);}
 function actorId(ally){return ally?unit(ally.id).person:'';}
 function sync(b,isTurn){
   if(!api)return;
   const t=isTurn?b.tb:null;
   const actor=t?.queue?.[0];
   const active=actor?.side==='ally'?actorId(b.allies[actor.i]):(!isTurn&&b.selection?.kind==='ally'?actorId(b.allies[b.selection.i]):null);
   api.setActive(active||'');api.setSpeed(t?.speed||1);
   b.allies.forEach((a,i)=>{
     const id=actorId(a);
     if(a.hp<=0)api.ko(id);else api.revive(id);
     api.setLit(id,!!(isTurn&&t.lit===i));
     if(!isTurn){
       const slot=node.querySelectorAll('.yc-slot')[i];
       if(slot){
         let hud=slot.querySelector('.yc-legacy-info');
         if(!hud){
           hud=document.createElement('div');hud.className='yc-legacy-info';
           hud.innerHTML='<b></b><span class="yc-legacy-hp"><i></i></span><small></small><span class="yc-legacy-effects"></span>';
           slot.appendChild(hud);
         }
         hud.querySelector('b').textContent=person(unit(a.id)).name;
         hud.querySelector('.yc-legacy-hp i').style.width=Math.max(0,100*a.hp/Math.max(1,a.max))+'%';
         hud.querySelector('small').textContent='HP '+Math.ceil(a.hp)+'/'+a.max;
         const effects=hud.querySelector('.yc-legacy-effects');
         if(typeof statusMarkup==='function')effects.innerHTML=statusMarkup(a);
       }
     }
   });
 }

 // Boss cards and field sprites are separate; map field art by quest and role.
 function bossFieldArt(b,e){
   if(b.wave!==b.totalWaves-1)return null;
   if(b.qid==='q12'&&e.kind==='boss')
     return {src:'assets/enemies/sakuya_battle.webp',catalogueId:'sakuya_battle'};
   if((b.qid==='q17'||b.qid==='q34')&&e.kind==='boss')
     return {src:'assets/enemies/ibuki_battle.webp',catalogueId:'ibuki_battle'};
   // v0.65.2.0: ボスのちびキャラ（沙耶・黒い灯の葵・ルリ・透子・槐・常夜、第3部の朔夜）
   const BOSS_CHIBI={q173:'sakuya',q28:'saya',q35:'aoi_dark',q40:'aoi_dark',q45:'aoi_dark',q46:'ruri',q52:'touko_true',q58:'touko_true',q81:'touko_true',q89:'enju',q113:'enju',q119:'tokoyo'};
   if(BOSS_CHIBI[b.qid]&&e.kind==='boss')
     return {src:'assets/enemies/'+BOSS_CHIBI[b.qid]+'_battle.webp?v=0.65.2.0',catalogueId:BOSS_CHIBI[b.qid]+'_battle'};
   // q24: ① genuine Haruka and ② fake Haruka (the two mask shadows).
   // The existing harukaRole values are unchanged; no new enemy is created.
   if(b.qid==='q24'){
     if(e.harukaRole==='real')
       return {src:'assets/ART_V2/chibi/haruka_npc_real.png',catalogueId:'haruka_npc_real'};
     if(e.harukaRole==='shadow')
       return {src:'assets/ART_V2/chibi/haruka_npc_fake.png',catalogueId:'haruka_npc_fake'};
   }
   return null;
 }
 function enemyId(e,i){return 'enemy-'+i;}
 function paintEnemies(b,stage){
   stage.querySelectorAll('.yc-enemy-slot,.yc-intent-overview').forEach(n=>n.remove());
   if(!b.turnBattle)return;
   const speed=b.tb?.speed||1;
   // Keep up to three visible enemies in fixed, non-overlapping right-side columns.
   // This is presentation-only: enemy order, target indices and combat data are unchanged.
   const visibleEnemies=b.enemies.map((e,i)=>({e,i})).filter(({e})=>e.hp>0).slice(0,3);
   const columns={1:[78],2:[69,87],3:[60,76,92]}[visibleEnemies.length]||[];
   visibleEnemies.forEach(({e,i},slot)=>{
     const button=document.createElement('button');button.type='button';
     button.className='yc-enemy-slot'+(b.tb.targetEnemy===i?' yc-enemy-selected':'')+(typeof tbIsBroken==='function'&&tbIsBroken(e)?' yc-enemy-broken':'');
     button.dataset.enemyIndex=String(i);
     button.dataset.enemyCount=String(visibleEnemies.length);
     button.style.left=columns[slot]+'%';button.style.bottom='12%';
     button.style.setProperty('--yc-speed',speed);
     button.disabled=e.hp<=0;
     button.setAttribute('aria-label',e.name+'を狙う');
     button.onclick=()=>{if(typeof tbPickEnemy==='function')tbPickEnemy(i);};
     const shell=document.createElement('span');shell.className='yc-enemy-shell';
     // Until approved assets exist, a silhouette communicates enemy position without inventing identity.
     shell.innerHTML='<span class="yc-enemy-eye eye-l"></span><span class="yc-enemy-eye eye-r"></span>';
     // Use approved, existing battle artwork for the named final-wave bosses.
     // Leave other enemies on the normal enemy-art resolver.
     const art=bossFieldArt(b,e)||window.YoiEnemyArt?.resolve(e,{qid:b.qid,wave:b.wave,index:i});
     if(art){
       const img=document.createElement('img');img.className='yc-enemy-art';img.src=art.src;
       img.alt='';img.decoding='async';img.draggable=false;
       img.onerror=()=>{shell.classList.remove('yc-enemy-art-shell');img.remove();};
       shell.classList.add('yc-enemy-art-shell');shell.appendChild(img);
       button.dataset.catalogueId=art.catalogueId;
     }
     const info=document.createElement('span');info.className='yc-enemy-hud';
     const label=document.createElement('span');label.className='yc-enemy-label';label.textContent=e.name;
     const weak=document.createElement('span');weak.className='yc-enemy-weak';
     weak.textContent=e.weakRevealed&&typeof tbColorName==='function'?'弱点 '+tbColorName(e.weakColor):'弱点 ？';
     const hp=document.createElement('span');hp.className='yc-enemy-hp';
     const fill=document.createElement('i');fill.style.width=Math.max(0,Math.min(100,100*e.hp/Math.max(1,e.max)))+'%';hp.appendChild(fill);
     info.append(label,weak,hp);button.append(shell,info);stage.appendChild(button);
   });
   // 667×375: enemy detail cards can fall below the fold. Keep tactical intent
   // visible on the shared stage, without changing the original enemy cards.
   const overview=document.createElement('div');
   overview.className='yc-intent-overview';
   overview.setAttribute('role','status');
   overview.setAttribute('aria-label','敵の次の行動');
   const heading=document.createElement('strong');heading.textContent='敵の次の行動';
   overview.appendChild(heading);
   visibleEnemies.forEach(({e,i})=>{
     const item=document.createElement('span');
     item.className='yc-intent-chip'+(e.hp<=0?' yc-intent-downed':'')+
       (e.breakSkips>0?' yc-intent-broken':'');
     item.dataset.enemyIndex=String(i);
     const intent=(typeof tbEnemyIntentLabel==='function'?tbEnemyIntentLabel(e):'通常攻撃');
     const shortName=String(e.name||'敵'+(i+1));
     item.textContent=shortName+'：'+intent;
     item.title=shortName+'：'+intent;
     overview.appendChild(item);
   });
   stage.appendChild(overview);
 }
 function enemyImpact(stage,i,amount){
   const enemy=stage.querySelector('.yc-enemy-slot[data-enemy-index="'+i+'"]');if(!enemy)return;
   enemy.classList.remove('yc-enemy-hit');void enemy.offsetWidth;enemy.classList.add('yc-enemy-hit');
   const number=document.createElement('span');number.className='yc-enemy-number';number.textContent='-'+amount;enemy.appendChild(number);
   setTimeout(()=>number.remove(),950);
 }
 function flush(b,root){
   if(!api)return;
   for(const ev of events.splice(0)){
     if(ev.b!==b)continue;
     const id=ev.id;
     if(ev.type==='attack'){
       // Animation runs first; numbers appear at the impact (YoiChibi.attack resolves at HIT_DELAY).
       api.attack(id).then(()=>{
         if(b!==current()||!root.isConnected)return;
         (ev.hits||[]).forEach(hit=>{
           enemyImpact(root,hit.i,hit.amount);
         });
       });
     }else if(ev.type==='enemyAttack'){
       const enemy=root.querySelector('.yc-enemy-slot[data-enemy-index="'+ev.enemyIndex+'"]');
       if(enemy){enemy.classList.remove('yc-enemy-lunge');void enemy.offsetWidth;enemy.classList.add('yc-enemy-lunge');}
       setTimeout(()=>{if(b===current()&&root.isConnected){api?.hurt(ev.id);if(ev.amount>0)api?.popNumber(ev.id,'-'+ev.amount);}},200/(b.tb?.speed||1));
     }else if(ev.type==='hurt'){
       api.hurt(id);if(ev.amount>0)api.popNumber(id,'-'+ev.amount);
     }else if(ev.type==='heal'){
       if(ev.amount>0)api.popNumber(id,'+'+ev.amount,'heal');
     }else if(ev.type==='glow'){
       api.glow(id);
     }
   }
 }
 function mount(stage,isTurn){
   const b=current();
   if(!stage||!visible())return;
   const mode=isTurn?'turn':'legacy';
   // Formation is specified as stage-width percentages. Legacy arenas can be very wide
   // and only ~130px high in landscape, so scale actor size to available height.
   const size=isTurn?25:Math.min(25,Math.max(6,100*stage.clientHeight*0.48/Math.max(1,stage.clientWidth)));
   if(api&&(stage!==node||context!==mode||linkedBattle!==b||Math.abs(size-mountSize)>1.2)){reset(false);}
   if(!api){
     node=stage;context=mode;linkedBattle=b;mountSize=size;
     api=YoiChibi.mount(stage,b.allies.map(member),{
       size,speed:isTurn?b.tb?.speed||1:1,
       onSelect:id=>{
         const active=current();if(active!==b)return;
         const i=b.allies.findIndex(a=>actorId(a)===id);
         if(i<0)return;
         if(isTurn){tbPickAlly(i);}else{clickTarget('ally',i);}
       }
     });
   }
   sync(b,isTurn);if(isTurn)paintEnemies(b,stage);flush(b,stage);
 }
 // Legacy stage is intentionally separate from the arena's per-frame innerHTML replacement.
 window.ycRenderLegacy=function(){
   const b=current();if(!b||b.turnBattle||b.grind||typeof Q12C!=='undefined'&&Q12C.scene(b)){return;}
   mount(document.getElementById('ycLegacyStage'),false);
 };
 window.ycRenderTurn=function(){
   const b=current();if(!b||!b.turnBattle)return;
   mount(document.getElementById('ycTurnStage'),true);
 };
 window.ycTurnEnemyAttack=function(enemy,target,amount){
   const b=current();if(!b||!b.turnBattle||b.grind)return;const i=b.enemies.indexOf(enemy);
   if(i>=0)enqueue({type:'enemyAttack',id:actorId(target),enemyIndex:i,amount:Math.round(amount||0)});
 };
 window.ycEvent=function(type,ally,amount){
   if(type==='hurt'&&current()?.turnBattle)return;
   const b=current();if(!b||!ally||b.grind)return;
   enqueue({type,id:actorId(ally),amount:Math.round(amount||0)});
 };
 window.ycTurnSnapshot=function(){
   const b=current();return b?{enemies:b.enemies.map(e=>e.hp),allies:b.allies.map(a=>a.hp),wave:b.wave}:null;
 };
 window.ycTurnAction=function(ally,command,before){
   const b=current();if(!b||!before||b.grind)return;
   if(command==='attack'||command==='skill'){
     const hits=before.wave===b.wave?b.enemies.map((e,i)=>({i,amount:Math.max(0,Math.round(before.enemies[i]-e.hp))})).filter(v=>v.amount>0):[];
     if(hits.length){enqueue({type:'attack',id:actorId(ally),hits});}
     else if(command==='skill')enqueue({type:'glow',id:actorId(ally)});
     b.allies.forEach((a,i)=>{
       const gain=Math.round(a.hp-before.allies[i]);
       if(gain>0)enqueue({type:'heal',id:actorId(a),amount:gain});
     });
   }
 };
 window.ycBattleReset=reset;
})();
