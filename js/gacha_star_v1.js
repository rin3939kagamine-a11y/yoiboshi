/* ガチャ演出：流れ星（表示のみ。確率・結果・セーブには一切触れない）
   募集の出現画面に、そのキャラのレア度の色の流れ星を降らせる。
   R=小さな白 / SR=銀 / SSR=金 / UR=虹。導入画面は白のみ。 */
(function(){
  'use strict';
  if (typeof renderRecruitReveal !== 'function') return;
  var original = renderRecruitReveal;
  var styleDone = false;
  function ensureStyle(){
    if (styleDone) return; styleDone = true;
    var st = document.createElement('style');
    st.textContent = [
      '.gacha-star-layer{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:5}',
      '.gacha-star{position:absolute;top:-12%;width:3px;height:90px;border-radius:3px;opacity:0;',
      'background:linear-gradient(to bottom,rgba(255,255,255,0) 0%,var(--gs-color,#ffffff) 55%,#ffffff 100%);',
      'transform:rotate(24deg);animation:gachaStarFall var(--gs-dur,1.1s) ease-in var(--gs-delay,0s) 1 both}',
      '.gacha-star::after{content:"";position:absolute;bottom:-3px;left:50%;width:7px;height:7px;margin-left:-3.5px;border-radius:50%;',
      'background:#ffffff;box-shadow:0 0 10px 3px var(--gs-color,#ffffff)}',
      '.gacha-star.gs-small{height:52px;width:2px;opacity:0}',
      '.gacha-star.gs-rainbow{background:linear-gradient(to bottom,rgba(255,255,255,0) 0%,#ff5b5b 30%,#ffb84d 48%,#f7e353 62%,#5bd95b 76%,#5b8cff 90%,#b45bff 100%)}',
      '.gacha-star.gs-rainbow::after{box-shadow:0 0 12px 4px rgba(255,255,255,.9)}',
      '@keyframes gachaStarFall{0%{transform:translate3d(0,-10vh,0) rotate(24deg);opacity:0}',
      '12%{opacity:1}70%{opacity:1}100%{transform:translate3d(-38vw,115vh,0) rotate(24deg);opacity:0}}'
    ].join('');
    document.head.appendChild(st);
  }
  function spawn(root, rarity, isIntro){
    try{
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      ensureStyle();
      var old = root.querySelector('.gacha-star-layer');
      if (old) old.remove();
      var layer = document.createElement('div');
      layer.className = 'gacha-star-layer';
      layer.setAttribute('aria-hidden','true');
      var conf;
      if (isIntro)        conf = { n:5, color:'#ffffff', cls:'',        dur:[1.2,1.8] };
      else if (rarity==='UR')  conf = { n:10, color:'#ffffff', cls:'gs-rainbow', dur:[1.0,1.6] };
      else if (rarity==='SSR') conf = { n:8, color:'#f5c542', cls:'',        dur:[1.0,1.5] };
      else if (rarity==='SR')  conf = { n:6, color:'#c0c8d8', cls:'',        dur:[1.1,1.6] };
      else                     conf = { n:3, color:'#ffffff', cls:'gs-small', dur:[1.2,1.7] };
      for (var i=0;i<conf.n;i++){
        var s = document.createElement('i');
        s.className = 'gacha-star ' + conf.cls;
        s.style.left = (8 + Math.random()*84) + '%';
        s.style.setProperty('--gs-color', conf.color);
        s.style.setProperty('--gs-delay', (Math.random()*0.55).toFixed(2) + 's');
        s.style.setProperty('--gs-dur', (conf.dur[0] + Math.random()*(conf.dur[1]-conf.dur[0])).toFixed(2) + 's');
        layer.appendChild(s);
      }
      root.appendChild(layer);
      setTimeout(function(){ if (layer.parentNode) layer.remove(); }, 3400);
    }catch(e){ /* 演出の失敗で本編を止めない */ }
  }
  renderRecruitReveal = function(){
    var r = original.apply(this, arguments);
    try{
      var root = document.getElementById('recruit-reveal');
      if (root){
        var isCard = !!root.querySelector('.recruit-stagecard');
        var isSummary = !!root.querySelector('.recruit-all-grid');
        if (isCard) spawn(root, root.dataset.rarity || 'R', false);
        else if (!isSummary) spawn(root, '', true);
      }
    }catch(e){}
    return r;
  };
})();
