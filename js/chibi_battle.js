/* 宵星の契約者 ちびキャラ戦闘表示 v1.9 46人対応 (stage-safe merge)
 * 戦闘のロジックには触らない「見た目だけ」の部品。
 * 戦闘エンジン側は、行動のたびに attack / hurt / glow などを呼ぶだけでよい。
 * 層の構造: .yc-slot(位置) > .yc-actor(行動の動き) > img(待機の呼吸)
 * ※ 動きは img ではなく親の層にかける(img の呼吸アニメと transform がぶつかるため)
 */
(function(){
  'use strict';
  // ちびキャラ画像があるキャラ(追加したらここに足すだけ)
  var CHIBI_IDS = ['reina','akane','aoi','chinatsu','nagi','momoka','milku',
                   'concept24','concept32','concept26','concept27',  // ひより・こより・きらり・まろん
                   'concept10','concept12','concept25','concept29',  // 翠蘭・ここあ・あげは・リリス
                   'concept08','concept18','concept28','concept14','concept20','concept21',  // 結衣・莉子・小春・ルナ・ミオ・ジュン
                   'concept09','concept23','concept15','concept11','concept16',  // しずく・シノ・真琴・響子・文香
                   'concept17','concept13','concept30','concept33','concept19','concept22',  // リコ・舞・汐・マリン・ノエル・ゆめ
                   'concept35','concept36','concept34','concept31',  // 椿・楓・エリカ・カナメ
                   'saki','yuzu','reiko','chiyo','sena','mizuki','meru','kagari','nazuna','anzu']; // クラブ組・追加ヒロイン
  // ユニットIDで呼ばれても、キャラIDの画像を使う
  var ALIASES = { hiyori:'concept24', koyori:'concept32', kirari:'concept26', maron:'concept27',
                  suiran:'concept10', cocoa:'concept12', ageha:'concept25', lilith:'concept29',
                  yui:'concept08', riko:'concept18', koharu:'concept28', luna:'concept14', mio:'concept20', jun:'concept21',
                  shizuku:'concept09', shino:'concept23', makoto:'concept15', kyoko:'concept11', fumika:'concept16',
                  rico:'concept17', mai:'concept13', shio:'concept30', marine:'concept33', noel:'concept19', yume:'concept22',
                  tsubaki:'concept35', kaede:'concept36', erika:'concept34', kaname:'concept31' };
  function key(id){ return ALIASES[id] || id; }
  var CHIBI_DIR = 'assets/ART_V2/chibi/';
  // 並び位置(left%, bottom%)。後列3・前列2。前列ほど手前(z-indexが上)
  var FORMATION = {
    1:[[18,20]],
    2:[[8,36],[22,10]],
    3:[[4,38],[22,40],[13,8]],
    4:[[4,40],[22,42],[9,8],[27,10]],
    5:[[2,40],[18,42],[34,40],[9,8],[26,10]]
  };
  var HIT_DELAY = 230; // 攻撃の動きで、相手に当たる瞬間(ms、等速のとき)

  function has(id){ return CHIBI_IDS.indexOf(key(id)) >= 0; }
  function src(id){ return CHIBI_DIR + key(id) + '_chibi.png'; }
  function el(tag, cls){ var e=document.createElement(tag); if(cls) e.className=cls; return e; }
  function play(node, cls){
    node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls);
    node.addEventListener('animationend', function f(){ node.classList.remove(cls); node.removeEventListener('animationend', f); });
  }

  /* members: [{id, color, fallbackSrc, name}]  color=灯火の色、fallbackSrc=ちびが無いときの顔アイコン
   * options: {size:25(ステージ幅に対する%), speed:1, dir:画像フォルダ, onSelect:function(id){}} */
  function mount(stage, members, options){
    options = options || {};
    var speed = options.speed || 1;
    var size = options.size || 25;
    var dir = options.dir || CHIBI_DIR;
    stage.classList.add('yc-stage');
    var slots = {};
    var pos = FORMATION[Math.min(5, Math.max(1, members.length))];
    members.slice(0,5).forEach(function(m, i){
      var p = pos[i];
      var s = el('div','yc-slot');
      s.style.left = p[0]+'%'; s.style.bottom = p[1]+'%'; s.style.width = size+'%';
      s.style.zIndex = p[1] < 20 ? 20 : 10;
      s.style.setProperty('--yc-c', m.color || '#ffe9a8');
      var ring = el('div','yc-ring');
      var actor = el('div','yc-actor');
      var img = el('img');
      img.alt = ''; img.draggable = false;
      if(has(m.id)){ img.src = dir + key(m.id) + '_chibi.png'; }
      else { actor.classList.add('yc-fallback'); img.src = m.fallbackSrc || ''; }
      img.onerror = function(){ if(m.fallbackSrc && img.src.indexOf(m.fallbackSrc) < 0){ actor.classList.add('yc-fallback'); img.src = m.fallbackSrc; } };
      actor.appendChild(img);
      var hit = el('button','yc-hit'); hit.type='button';
      hit.setAttribute('aria-label', (m.name || m.id) + 'を選ぶ');
      hit.onclick = function(){ if(options.onSelect) options.onSelect(m.id); };
      s.appendChild(ring); s.appendChild(actor); s.appendChild(hit);
      stage.appendChild(s);
      slots[m.id] = {slot:s, actor:actor, pos:p};
    });
    stage.style.setProperty('--yc-speed', speed);

    function get(id){ return slots[id]; }
    function wait(ms){ return new Promise(function(r){ setTimeout(r, ms/speed); }); }

    var api = {
      /* 攻撃:前に跳ねる。戻り値のPromiseは「当たる瞬間」に解決する→そこでダメージ表示 */
      attack: function(id){ var o=get(id); if(!o) return Promise.resolve(); play(o.actor,'yc-attack'); return wait(HIT_DELAY); },
      /* 被ダメ:揺れて赤く光る */
      hurt: function(id){ var o=get(id); if(o) play(o.actor,'yc-hurt'); },
      /* 灯す:灯火の色で光り、光の粒が立ちのぼる */
      glow: function(id){
        var o=get(id); if(!o) return;
        play(o.actor,'yc-glow');
        for(var k=0;k<7;k++){
          var sp = el('div','yc-spark');
          sp.style.left = (25+Math.random()*45)+'%'; sp.style.bottom = (5+Math.random()*40)+'%';
          sp.style.animationDelay = (k*0.08/speed)+'s';
          o.slot.appendChild(sp);
          (function(n){ setTimeout(function(){ n.remove(); }, 1500/speed); })(sp);
        }
      },
      /* 灯火の状態のあいだ光る縁を出す(on=true/false) */
      setLit: function(id, on){ var o=get(id); if(o) o.slot.classList.toggle('yc-lit', !!on); },
      /* 手番・選択中の足元の輪 */
      setActive: function(id){ Object.keys(slots).forEach(function(k){ slots[k].slot.classList.toggle('yc-active', k===id); }); },
      /* 戦闘不能・復帰 */
      ko: function(id){ var o=get(id); if(o) o.slot.classList.add('yc-ko'); },
      revive: function(id){ var o=get(id); if(o) o.slot.classList.remove('yc-ko'); },
      /* 数字(kind: 'dmg' | 'heal') */
      popNumber: function(id, text, kind){
        var o=get(id); if(!o) return;
        var n = el('div','yc-num'+(kind==='heal'?' yc-heal':''));
        n.textContent = text;
        n.style.left = (o.pos[0] + size*0.35)+'%';
        n.style.bottom = (o.pos[1] + size*1.1)+'%';
        stage.appendChild(n);
        setTimeout(function(){ n.remove(); }, 950/speed);
      },
      setSpeed: function(x){ speed = x || 1; stage.style.setProperty('--yc-speed', speed); },
      /* 画像の枠を表示(確認用) */
      showFrames: function(on){ stage.classList.toggle('yc-frames', !!on); },
      destroy: function(){ Object.keys(slots).forEach(function(k){ slots[k].slot.remove(); }); slots = {}; }
    };
    return api;
  }

  window.YoiChibi = { ids: CHIBI_IDS, has: has, src: src, mount: mount, FORMATION: FORMATION };
})();
