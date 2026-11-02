/* 宵星の契約者 RE:START Ver.0.35.6.0 — 小さい枠の立ち絵を「顔が見える」位置に合わせる
 * 編成の枠・育成の一覧・育成の上部・募集結果など、枠が小さい場所では全身が小さく入ったり、
 * 顔が枠の外に出たりしていた。js/portrait_faces_v03560.js の顔の位置を使い、
 * 顔が枠の決まった高さ・決まった大きさに来るように画像を拡大・移動する。
 * 顔の位置が分からない画像や、対象外の場所は従来の表示のまま。計算・セーブは変更しない。
 */
(function portraitFaceFrame(){
 'use strict';
 // 枠ごとの設定：faceH＝顔の高さ(枠の高さに対する割合)、faceY＝顔の中心の高さ(上からの割合)
 var TARGETS=[
  {sel:'.roster-vnew-portrait img',faceH:0.25,faceY:0.31},
  {sel:'.train-unit-art img',faceH:0.25,faceY:0.32},
  {sel:'.train-hero img',faceH:0.20,faceY:0.30},
  {sel:'.pullcard img',faceH:0.24,faceY:0.31,wrap:true}
 ];
 function face(src){
  var map=window.PORTRAIT_FACES_V03560;if(!map||!src)return null;
  var key=src.split('?')[0].replace(/^\.?\//,'').replace(/^assets\//,'');
  return map[key]||null;
 }
 function place(img,t){
  var f=face(img.getAttribute('src'));
  var box=img.parentElement;
  if(!f||!box){img.classList.remove('pf-frame');return;}
  var nw=img.naturalWidth,nh=img.naturalHeight,bw=box.clientWidth,bh=box.clientHeight;
  if(!nw||!nh||!bw||!bh)return;
  // 顔の高さを目標に合わせる倍率。ただし枠を埋めきれない縮小はしない
  var s=t.faceH*bh/(f[2]*nh);
  s=Math.max(s,bw/nw,bh/nh);
  var dw=nw*s,dh=nh*s;
  var left=bw/2-f[0]*dw,top=t.faceY*bh-f[1]*dh;
  // 枠の中に余白ができないように端をそろえる
  // 背景が透明な立ち絵は上に余白があってもよい（頭が切れないことを優先）。背景つきの絵は余白を作らない
  var clear=/\/(full_body|full_body_dynamic|upper_body)\/|_work\.webp/.test(img.getAttribute('src')||'');
  left=Math.min(0,Math.max(bw-dw,left));
  top=clear?Math.max(bh-dh,top):Math.min(0,Math.max(bh-dh,top));
  img.style.setProperty('--pf-w',dw.toFixed(1)+'px');
  img.style.setProperty('--pf-h',dh.toFixed(1)+'px');
  img.style.setProperty('--pf-x',left.toFixed(1)+'px');
  img.style.setProperty('--pf-y',top.toFixed(1)+'px');
  // 画像を浮かせると枠の高さが縮む場所があるので、最初の高さを保つ
  if(!box.__pfLocked){box.style.minHeight=bh+'px';box.__pfLocked=true;}
  box.classList.add('pf-box');img.classList.add('pf-frame');
 }
 var ro=typeof ResizeObserver==='function'?new ResizeObserver(function(es){
  es.forEach(function(e){var img=e.target.__pfImg;if(img&&img.isConnected)place(img,img.__pfT);});
 }):null;
 function wrap(img){
  // 画像と文字が同じ枠に入っている場所は、画像だけを元の大きさの箱に入れてから合わせる
  if(img.parentElement&&img.parentElement.classList.contains('pf-wrap'))return;
  var cs=getComputedStyle(img),w=img.getBoundingClientRect().width,h=img.getBoundingClientRect().height;
  if(!w||!h)return false;
  var box=document.createElement('span');box.className='pf-wrap';
  box.style.cssText='display:block;width:'+w.toFixed(1)+'px;max-width:100%;height:'+h.toFixed(1)+'px;margin:'+cs.margin+';border-radius:'+cs.borderRadius;
  img.parentNode.insertBefore(box,img);box.appendChild(img);
  return true;
 }
 function bind(img,t){
  if(img.__pfT===t&&img.__pfSrc===img.getAttribute('src'))return;
  if(t.wrap&&!(img.parentElement&&img.parentElement.classList.contains('pf-wrap'))){
   if(!(img.complete&&img.naturalWidth)){img.addEventListener('load',function(){bind(img,t);},{once:true});return;}
   if(wrap(img)===false)return;
  }
  img.__pfT=t;img.__pfSrc=img.getAttribute('src');
  var go=function(){place(img,t);};
  if(img.complete&&img.naturalWidth)go();else img.addEventListener('load',go,{once:true});
  if(ro&&img.parentElement){img.parentElement.__pfImg=img;ro.observe(img.parentElement);}
 }
 function scan(){
  for(var i=0;i<TARGETS.length;i++){
   var list=document.querySelectorAll(TARGETS[i].sel);
   for(var j=0;j<list.length;j++)bind(list[j],TARGETS[i]);
  }
 }
 function start(){
  // 募集結果など #app の外に出る画面もあるので body 全体を見る
  var app=document.body;if(!app)return;
  new MutationObserver(scan).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
  scan();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
 window.portraitFaceFrameV03560={scan:scan,face:face};
})();
