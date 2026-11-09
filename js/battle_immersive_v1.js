/* Immersive turn battle presentation: the battlefield itself is the screen.
 * Visual/DOM layout only. No combat-state, timing, selection or save changes. */
(function(){
 'use strict';
 if(typeof tbRender!=='function')return;
 const original=tbRender;
 function place(node,parent){
   if(node&&parent&&node.parentNode!==parent)parent.appendChild(node);
 }
 function syncStageArt(scene,stage){
   const computed=getComputedStyle(stage);
   for(const property of ['background-image','background-size','background-position','background-repeat','background-color']){
     scene.style.setProperty(property,computed.getPropertyValue(property),'important');
   }
 }
 function positionEnemies(scene,stage){
   const all=[...stage.querySelectorAll(':scope > .yc-enemy-slot')];
   const b=typeof tbCurrent==='function'?tbCurrent():null;
   if(!b)return;
   const boss=all.find(n=>b.enemies[Number(n.dataset.enemyIndex)]?.kind==='boss');
   const small=all.filter(n=>n!==boss);
   small.forEach((n,i)=>{
     // Normal enemies have ONE fixed width regardless of enemy count or HP.
     const left=boss?(small.length>1?40+i*15:50):
       (small.length===1?71:small.length===2?55+i*21:48+i*16);
     n.style.setProperty('left',left+'%','important');
     n.style.setProperty('width','14%','important');
     n.style.setProperty('height','66%','important');
     n.style.setProperty('bottom','5%','important');
   });
   if(boss){
     // The boss sprite stays the same physical size when minions die.
     boss.style.setProperty('left','69%','important');
     boss.style.setProperty('width','30%','important');
     boss.style.setProperty('height','94%','important');
     boss.style.setProperty('bottom','1%','important');
   }
 }
 function integrate(){
   const scene=document.querySelector('.combat-page .tb-root.yb-battle-dashboard');
   if(!scene)return;
   const stage=scene.querySelector('#ycTurnStage');
   if(!stage)return;
   // Read the already-resolved quest location backdrop before clearing the
   // stage's independent background. This also covers q6's special artwork.
   syncStageArt(scene,stage);
   scene.classList.add('yb-immersive');
   place(scene.querySelector('.tb-control-col'),scene);
   place(scene.querySelector('.tb-log'),scene);
   place(scene.querySelector('.tb-q1-practice'),scene);
   place(scene.querySelector('.tb-battle-notes'),scene);
   positionEnemies(scene,stage);
 }
 tbRender=function(){
   const result=original.apply(this,arguments);
   try{integrate();}catch(e){console.error('[宵星 immersive combat UI]',e);}
   return result;
 };
})();
