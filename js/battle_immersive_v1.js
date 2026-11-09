/* Immersive battle presentation: the field is one full-screen scene.
 * Actors are confined to two fixed 50%-width zones: allies on the left,
 * enemies on the right. Combat targeting, turns and damage are unchanged. */
(function(){
 'use strict';
 if(typeof tbRender!=='function')return;
 const original=tbRender;
 let observedStage=null,resizeObserver=null;
 function place(node,parent){
   if(node&&parent&&node.parentNode!==parent)parent.appendChild(node);
 }
 function syncStageArt(scene,stage){
   const computed=getComputedStyle(stage);
   for(const property of ['background-image','background-size','background-position','background-repeat','background-color']){
     scene.style.setProperty(property,computed.getPropertyValue(property),'important');
   }
 }
 function setPercent(node,property,value){
   node.style.setProperty(property,value+'%','important');
 }
 function clipToHalf(node,stage,side){
   // Extend the clip area over the full team's half of the field.
   // Attack/hit animations can move naturally inside their half, but never
   // draw across the central boundary, even during a translate/scale effect.
   const sr=stage.getBoundingClientRect();
   const r=node.getBoundingClientRect();
   const mid=sr.left+sr.width/2;
   const reach=side==='ally'?Math.max(0,mid-r.right):Math.max(0,r.left-mid);
   const clip=side==='ally'
     ?'inset(-1000px -'+reach+'px -1000px -1000px)'
     :'inset(-1000px -1000px -1000px -'+reach+'px)';
   node.style.setProperty('clip-path',clip,'important');
   node.dataset.ybZone=side;
 }
 function layoutZones(stage){
   if(!stage||!stage.isConnected)return;
   const sr=stage.getBoundingClientRect();
   const width=sr.width,height=sr.height;
   if(width<=0||height<=0)return;
   const mid=width/2;
   stage.dataset.ybZoneSplit='50';
   const narrowHeight=height<225;
   const allies=[...stage.querySelectorAll(':scope > .yc-slot')];
   allies.forEach((node,i)=>{
     let left,bottom,size;
     if(narrowHeight){
       // Four same-size allies in one row, all inside the LEFT 50%.
       size=Math.min(mid*.225,height*.80,156);
       left=mid*(.02+i*.245);
       bottom=8;
     }else{
       // Two columns and two rows, inside the LEFT 50%.
       size=Math.min(mid*.45,height*.43,224);
       left=mid*(i%2===0?.025:.525);
       bottom=i<2?56:7;
     }
     node.style.setProperty('width',size+'px','important');
     node.style.setProperty('left',left+'px','important');
     setPercent(node,'bottom',bottom);
     node.style.setProperty('z-index',i<2?'12':'18','important');
     clipToHalf(node,stage,'ally');
   });
   const battleState=typeof tbCurrent==='function'?tbCurrent():null;
   const nodes=[...stage.querySelectorAll(':scope > .yc-enemy-slot')];
   if(!battleState){
     nodes.forEach(n=>clipToHalf(n,stage,'enemy'));
     return;
   }
   const allEnemies=battleState.enemies||[];
   const bossIndex=allEnemies.findIndex(e=>e.kind==='boss');
   const hasBoss=bossIndex>=0; // Reserve original boss lane even after HP reaches zero.
   const minionIndices=allEnemies.map((e,i)=>e.kind==='boss'?-1:i).filter(i=>i>=0);
   const nonBossCount=Math.max(1,minionIndices.length);
   nodes.forEach(node=>{
     let index=Number(node.dataset.enemyIndex);
     if(!Number.isInteger(index)||index<0)index=nodes.indexOf(node);
     const e=allEnemies[index];if(!e)return;
     const boss=e.kind==='boss';
     let left,w,bottom,actorHeight;
     if(boss){
       // Stable 30% of the ENTIRE stage (=60% of the enemy half).
       // Never enlarge when a minion dies.
       left=70;w=30;bottom=1;actorHeight=94;
     }else if(hasBoss){
       const rank=Math.max(0,minionIndices.indexOf(index));
       // Every minion has a stable slot inside the 20% left of the enemy half.
       w=Math.min(9.5,19.2/nonBossCount);
       left=50.4+rank*(19.2/nonBossCount);
       bottom=10;actorHeight=66;
     }else{
       const rank=Math.max(0,minionIndices.indexOf(index));
       w=Math.min(14,46/Math.max(1,nonBossCount));
       // No boss: center the entire group within the RIGHT 50% once
       // per wave, using original enemy indices (not currently alive count).
       const stride=46/nonBossCount;
       left=52+(rank*stride)+Math.max(0,(stride-w)/2);
       bottom=9;actorHeight=76;
     }
     setPercent(node,'left',left);
     setPercent(node,'width',w);
     setPercent(node,'height',actorHeight);
     setPercent(node,'bottom',bottom);
     node.style.setProperty('transform','none','important');
     clipToHalf(node,stage,'enemy');
   });
 }
 function observe(stage){
   if(observedStage===stage)return;
   if(resizeObserver)resizeObserver.disconnect();
   observedStage=stage;
   if(typeof ResizeObserver!=='undefined'){
     resizeObserver=new ResizeObserver(()=>{
       if(stage.isConnected)layoutZones(stage);
     });
     resizeObserver.observe(stage);
   }
 }
 function integrate(){
   const scene=document.querySelector('.combat-page .tb-root.yb-battle-dashboard');
   if(!scene)return;
   const stage=scene.querySelector('#ycTurnStage');
   if(!stage)return;
   syncStageArt(scene,stage);
   scene.classList.add('yb-immersive');
   place(scene.querySelector('.tb-control-col'),scene);
   const lightRow=scene.querySelector('.yb-resource-dashboard .tb-light');
   place(scene.querySelector('.tb-flame-caption-row'),lightRow);
   place(scene.querySelector('.tb-log'),scene);
   place(scene.querySelector('.tb-q1-practice'),scene);
   place(scene.querySelector('.tb-battle-notes'),scene);
   layoutZones(stage);
   observe(stage);
 }
 tbRender=function(){
   const result=original.apply(this,arguments);
   try{integrate();}catch(e){console.error('[宵星 immersive combat UI]',e);}
   return result;
 };
})();
