/* Ver.0.66.1.0 ストーリー・クエスト画面を、ホームと同じく1画面に収める（ページ全体はスクロールせず、一覧だけが中でスクロールする）。 */
(function oneScreen(){
 'use strict';
 function fit(){
  const el=document.querySelector('.os-page');
  document.documentElement.classList.toggle('os-on',!!el);
  if(!el)return;
  if(window.scrollY)window.scrollTo(0,0);
  const nav=document.querySelector('.bottomnav');
  let bottom=window.innerHeight;
  if(nav){const r=nav.getBoundingClientRect(),cs=getComputedStyle(nav);if(cs.display!=='none'&&(cs.position==='fixed'||cs.position==='sticky')&&r.top<window.innerHeight&&r.top>0)bottom=r.top;}
  const top=el.getBoundingClientRect().top;
  const h=Math.max(240,Math.floor(bottom-top-8));
  if(el.style.height!==h+'px')el.style.height=h+'px';
  fitQuestMap();
 }
 /* v0.67.1.0 クエストの地図画像（3:2）を枠いっぱいに敷き、はみ出した方向だけ指やマウスで動かせるようにする */
 function fitQuestMap(){
  const sc=document.querySelector('.os-quest .qmap-scroll'),map=sc&&sc.querySelector('.qmap-map');
  if(!sc||!map)return;
  const w=sc.clientWidth,h=sc.clientHeight;if(!w||!h)return;
  const R=1.5;let mw,mh;
  if(w/h<R){mh=h;mw=Math.round(h*R);}else{mw=w;mh=Math.round(w/R);}
  if(map.style.width!==mw+'px'){map.style.width=mw+'px';map.style.height=mh+'px';}
  const key=map.className+'|'+mw+'x'+mh+'|'+(document.querySelector('.os-chapter-select')||{}).value;
  if(sc.dataset.centered===key)return;
  sc.dataset.centered=key;
  const target=map.querySelector('.qmap-pin.selected')||map.querySelector('.qmap-pin:not(.done):not(.locked)')||map.querySelector('.qmap-home-pin');
  let cx=mw/2,cy=mh/2;
  if(target){cx=parseFloat(target.style.left)/100*mw;cy=parseFloat(target.style.top)/100*mh;}
  sc.scrollLeft=Math.max(0,cx-w/2);sc.scrollTop=Math.max(0,cy-h/2);
  if(!sc.dataset.drag){
   sc.dataset.drag='1';let down=null,moved=false;
   sc.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down={x:e.clientX,y:e.clientY,l:sc.scrollLeft,t:sc.scrollTop};moved=false;});
   window.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-down.x,dy=e.clientY-down.y;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;sc.scrollLeft=down.l-dx;sc.scrollTop=down.t-dy;});
   window.addEventListener('pointerup',()=>{down=null;});
   sc.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false;}},true);
  }
 }
 let queued=false;
 function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;fit();});}
 const start=()=>{
  const root=document.getElementById('app')||document.body;
  new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  window.addEventListener('resize',schedule);
  window.addEventListener('orientationchange',()=>setTimeout(fit,250));
  schedule();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
