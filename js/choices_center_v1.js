/* 会話中の選択肢を画面の真ん中に出す（表示のみ。分岐・セーブには触れない）
   セリフ欄の中にある選択肢の要素を、画面全体の中央レイヤーへ移して表示する。
   ボタンの中身とクリック動作はそのまま。選んだあとは元の流れに戻る。 */
(function(){
  'use strict';
  var overlay = null;
  function ensureOverlay(){
    if (overlay && document.body.contains(overlay)) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'choices-center-overlay';
    overlay.setAttribute('aria-hidden','false');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e){
      var btn = e.target && e.target.closest ? e.target.closest('.story-choices .btn') : null;
      if (btn){
        var stale = btn.closest('.story-choices');
        setTimeout(function(){
          if (stale && overlay.contains(stale)) stale.remove();
          scan();
        }, 90);
      }
    }, true);
    return overlay;
  }
  function scan(){
    try{
      var ov = ensureOverlay();
      var inOverlay = ov.querySelector('.story-choices');
      var outside = null;
      var all = document.querySelectorAll('.story-choices');
      for (var i=0;i<all.length;i++){
        if (!ov.contains(all[i])) { outside = all[i]; break; }
      }
      if (outside){
        if (inOverlay) inOverlay.remove();
        ov.appendChild(outside);
        ov.style.display = 'flex';
      } else if (inOverlay){
        ov.style.display = 'flex';
      } else {
        ov.style.display = 'none';
      }
    }catch(e){ /* 演出の失敗で本編を止めない */ }
  }
  function start(){
    ensureOverlay();
    scan();
    var mo = new MutationObserver(function(){ scan(); });
    mo.observe(document.body, { childList:true, subtree:true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
