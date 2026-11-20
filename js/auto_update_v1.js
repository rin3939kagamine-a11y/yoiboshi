// v1.07.9.5: 新しい版の自動読み込み直し。
// 公開中の index.html を取り直し、今読み込んでいる js/css の ?v= と食い違っていたら、新しい版が出たと判断する。
// 戦闘中・会話シーン中・お知らせ表示中は待ち、手が空いたとき（またはアプリに戻ってきたとき）に読み込み直す。
(function(){
 const PAGE=location.pathname.split('/').pop()||'index.html';
 let pending=false,checking=false;
 const loaded=()=>new Set([...document.querySelectorAll('script[src],link[rel="stylesheet"][href]')]
  .map(e=>e.getAttribute('src')||e.getAttribute('href')).filter(u=>/\?v=/.test(u)));
 const busy=()=>{
  try{if(typeof battle!=='undefined'&&battle)return true;}catch(e){}
  try{if(typeof dialog!=='undefined'&&dialog)return true;}catch(e){}
  return !!document.querySelector('.vn-tool,.story-scene,.date-scene');
 };
 const reload=()=>{
  try{
   const last=+sessionStorage.getItem('yb_auto_reload_at')||0;
   if(Date.now()-last<60000)return; // 読み込み直しが続かないように
   sessionStorage.setItem('yb_auto_reload_at',String(Date.now()));
  }catch(e){}
  location.reload();
 };
 async function check(){
  if(checking)return;checking=true;
  try{
   if(!pending){
    const r=await fetch(PAGE+'?_='+Date.now(),{cache:'no-store'});
    if(!r.ok)return;
    const html=await r.text(),now=loaded();
    const urls=[...html.matchAll(/(?:src|href)="([^"]+\?v=[^"]+)"/g)].map(m=>m[1]);
    if(urls.length&&urls.some(u=>!now.has(u)))pending=true;
   }
   if(pending&&!busy())reload();
  }catch(e){}finally{checking=false;}
 }
 window.ybCheckUpdate=check;
 setTimeout(check,3000);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check();});
 window.addEventListener('pageshow',e=>{if(e.persisted)check();});
 window.addEventListener('focus',check);
 setInterval(check,5*60*1000);
 // 新しい版が見つかっていたら、戦闘や会話が終わって手が空いた時点で読み込み直す
 setInterval(()=>{if(pending&&!busy())reload();},15000);
})();
