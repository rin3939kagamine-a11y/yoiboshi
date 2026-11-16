/* Ver.0.99.2.0 — 会話画面の上半身絵の切れ目を隠す。
   上半身絵の一部は、絵の下端（太ももあたり）でまっすぐ切れていて、その下が透明になっている。
   そのままだと切れ目が会話枠の上に浮いて見えるので、透明な分だけ絵を下にずらし、切れ目を会話枠の裏に隠す。
   数値は、絵の高さに対する下の透明部分の割合（パーセント）。画像から計算した値。 */
(function(){
 const GAP={"aika":18.0,"aki":11.3,"asuka":15.2,"ayu":19.0,"azusa":16.4,"chako":19.0,"chisato":19.0,"chitose":19.0,"chizuru":19.3,"emiri":15.8,"hatsune":18.9,"himari":18.9,"himeka":19.0,"himeno":15.4,"hinako":22.3,"honjo_iroha":19.0,"ichika":9.7,"ichika_pose01":9.7,"ichika_pose02":9.7,"kanna":19.0,"kanoko":19.0,"kanon":16.0,"kasumi":18.2,"kazusa":19.0,"kokoro":19.0,"komachi":17.8,"konatsu":19.1,"kozue":19.0,"leona":19.4,"lira":22.4,"madoka":19.0,"mahiru":18.5,"manatsu":18.7,"mao":19.0,"mashiro":14.6,"maya":19.0,"michiru":18.8,"miharu":17.1,"mikan":18.9,"miki":19.0,"mimi":19.5,"minami":17.9,"minto":19.0,"mira":20.6,"mirei":19.0,"misaki":18.3,"moe":19.0,"nagomi":19.0,"nana":15.7,"nanoka":10.2,"nao":19.0,"nodoka":19.0,"noriko":19.0,"nozomi":14.8,"ran":18.8,"ribon":19.0,"rinka":16.8,"rion":19.1,"risa":19.0,"roze":19.0,"ruru":18.6,"ryo":19.0,"sakura":13.8,"satsuki":19.0,"seira":17.6,"seri":19.0,"setsuna":19.0,"shieru":19.0,"shigure":17.1,"sora":19.0,"tamaki":17.2,"tia":19.0,"tomoe":19.0,"tsukasa":15.8,"tsumugi":16.6,"ui":19.2,"yue":19.0,"yuna":19.0,"yura":19.0,"yuu":17.4};
 function fix(root){
  (root||document).querySelectorAll('.story-character img, img.story-character').forEach(img=>{
   const m=(img.getAttribute('src')||'').match(/upper_body\/([a-z0-9_]+)\.webp/);
   const g=m&&GAP[m[1]];
   const want=g?'0px '+g+'%':'';
   if(img.style.translate!==want)img.style.translate=want;
  });
 }
 function start(){
  const app=document.getElementById('app')||document.body;
  fix(app);
  new MutationObserver(()=>fix(app)).observe(app,{childList:true,subtree:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
