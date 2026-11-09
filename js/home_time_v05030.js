/* 宵星の契約者 RE:START Ver.0.50.3.0 — ホーム背景（相談室）の昼・夜を、端末の時刻で切り替える。
 * 6〜17時は昼、18〜5時は夜。見た目だけで、セーブや計算は変えない。 */
(function homeTimeOfDay(){
 'use strict';
 function update(){
  var h=new Date().getHours();
  document.documentElement.dataset.yoiTime=(h>=6&&h<18)?'day':'night';
 }
 update();
 setInterval(update,5*60*1000);
})();
