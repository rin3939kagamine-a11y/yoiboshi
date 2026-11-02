/* 宵星の契約者 RE:START Ver.0.35.5.0 — ホームのお気に入り立ち絵の写り方をそろえる
 * 問題：SR立ち絵化（0.35.0.0）以降、ホームの立ち絵が
 *   ・全身画像の36人は頭が上の「宵星相談室」の枠に隠れて顔が見えない
 *   ・残り18人は上半身の寄り画像が使われ、顔だけ極端に大きい
 * 対処：一枚絵（mock-hero-scene）以外は全員「全身画像」を使い、画像の透明部分から
 *   頭のてっぺん・足もと・頭の中心を測って、同じ大きさ・同じ位置に表示する。
 *   計算・セーブ・他の画面は変更しない。測れなかった画像は従来の表示のまま。
 */
(function homePortraitFit(){
 'use strict';
 var FIG=1.30;      // 頭から足までの高さ＝ホーム上部の高さ×1.30（腰あたりまで見える）
 var HEAD_Y=0.205;  // 頭のてっぺんの位置（上部の高さに対する割合。プロフィール枠のすぐ下）
 var HEAD_X=0.35;   // 頭の中心の横位置（右側の名前欄にかからない位置）
 var cache=Object.create(null);

 function fullBodySrc(src){
  // 上半身の寄り画像は、同じ人物の全身画像に置き換える
  return src.replace('/ART_V2/upper_body/','/ART_V2/full_body/');
 }
 function measure(src){
  if(cache[src])return cache[src];
  cache[src]=new Promise(function(resolve){
   var img=new Image();
   img.onload=function(){
    try{
     var w=96,h=Math.max(1,Math.round(img.naturalHeight*w/img.naturalWidth));
     var c=document.createElement('canvas');c.width=w;c.height=h;
     var ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,w,h);
     var a=ctx.getImageData(0,0,w,h).data,rows=new Array(h).fill(0),x,y,solid=0;
     for(y=0;y<h;y++)for(x=0;x<w;x++){if(a[(y*w+x)*4+3]>160){rows[y]++;solid++;}}
     if(solid>w*h*0.85){resolve(null);return;} // 背景つきの絵は対象外
     var thr=Math.max(2,w*0.03),top=-1,bot=-1;
     for(y=0;y<h;y++)if(rows[y]>=thr){if(top<0)top=y;bot=y;}
     if(top<0||bot-top<h*0.4){resolve(null);return;}
     var band=Math.max(2,Math.round(h*0.06)),sx=0,sn=0;
     for(y=top;y<Math.min(h,top+band);y++)for(x=0;x<w;x++){if(a[(y*w+x)*4+3]>160){sx+=x;sn++;}}
     resolve({top:top/h,fig:(bot-top)/h,cx:sn?sx/sn/w:0.5});
    }catch(e){resolve(null);}
   };
   img.onerror=function(){resolve(null);};
   img.src=src;
  });
  return cache[src];
 }
 function apply(el){
  if(el.dataset.hpFit)return;
  var hero=el.closest('.mock-hero');
  if(!hero||hero.classList.contains('mock-hero-scene'))return;
  var src=el.getAttribute('src')||'';
  // 透過の全身・上半身・SRカード画像が対象。不透明な一枚絵は測定で除外される
  if(!/\/ART_V2\/(full_body|upper_body)\/|\/UNIT_ART\/[^/]+_work\.webp/.test(src))return;
  el.dataset.hpFit='pending';
  var full=fullBodySrc(src);
  el.classList.add('hp-pending');
  measure(full).then(function(m){
   if(!m){
    // 全身画像が測れない場合は、元の画像・元の表示に戻す
    el.dataset.hpFit='skip';el.classList.remove('hp-pending');return;
   }
   if(full!==src)el.setAttribute('src',full);
   var heightPct=FIG/m.fig*100;              // 画像全体の高さ（上部の高さに対する％）
   var topPct=(HEAD_Y-m.top/m.fig*FIG)*100;  // 画像の上端の位置
   el.style.setProperty('--hp-h',heightPct.toFixed(2)+'%');
   el.style.setProperty('--hp-top',topPct.toFixed(2)+'%');
   el.style.setProperty('--hp-left',(HEAD_X*100).toFixed(2)+'%');
   el.style.setProperty('--hp-shift',(-m.cx*100).toFixed(2)+'%');
   el.classList.add('hp-fit');el.classList.remove('hp-pending');el.dataset.hpFit='done';
  });
 }
 function scan(){
  var list=document.querySelectorAll('.home-mock-v301 .mock-character');
  for(var i=0;i<list.length;i++)apply(list[i]);
 }
 function start(){
  var app=document.getElementById('app');if(!app)return;
  new MutationObserver(scan).observe(app,{childList:true,subtree:true});
  scan();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
 window.homePortraitFitV03550={measure:measure,scan:scan};
})();
