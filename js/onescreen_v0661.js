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
