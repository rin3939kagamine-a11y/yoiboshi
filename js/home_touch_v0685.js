/* Ver.0.68.5.0 ホームのキャラをタッチすると、次のセリフをしゃべって、少し弾む。
   キャラ画像の上で、ボタンやリンク以外の場所をタップしたときだけ反応する。 */
(function homeTouch(){
 'use strict';
 let busy=false;
 function hitCharacter(e){
  const hero=e.target.closest&&e.target.closest('.mock-hero');
  if(!hero)return false;
  if(e.target.closest('button,a,input,select,textarea,label,[onclick],.mock-feature,.mock-dialogue,.mock-header,.mock-unit-picker'))return false;
  const img=hero.querySelector('.mock-character');if(!img)return false;
  const r=img.getBoundingClientRect();
  // 画像の外枠ではなく、人物がいる中央寄りの範囲だけを当たりにする
  const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
  return x>0.18&&x<0.82&&y>0.02&&y<0.98;
 }
 function bounce(){
  const img=document.querySelector('.mock-hero .mock-character');if(!img)return;
  img.classList.remove('is-touched');void img.offsetWidth;img.classList.add('is-touched');
  setTimeout(()=>img.classList.remove('is-touched'),520);
 }
 function sparkle(x,y){
  const s=document.createElement('span');s.className='home-touch-spark';s.textContent='♡';
  s.style.left=x+'px';s.style.top=y+'px';document.body.appendChild(s);
  setTimeout(()=>s.remove(),900);
 }
 document.addEventListener('click',e=>{
  if(busy||!hitCharacter(e)||typeof lobbyTalk!=='function')return;
  busy=true;setTimeout(()=>{busy=false;},250);
  sparkle(e.clientX,e.clientY);
  lobbyTalk();
  requestAnimationFrame(bounce);
 },false);
 // 指を置ける場所だと分かるように、キャラの上ではカーソルを指にする
 document.addEventListener('pointermove',e=>{
  const hero=e.target.closest&&e.target.closest('.mock-hero');
  if(!hero)return;hero.style.cursor=hitCharacter(e)?'pointer':'';
 },{passive:true});
})();
