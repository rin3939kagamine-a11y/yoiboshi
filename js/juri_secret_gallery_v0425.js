/* 宵星の契約者 — ジュリの隠しギャラリー
 * 第10章クリア後、ジュリの立ち絵を1.3秒長押しすると閲覧できる。
 * 通常UI、保存データ、編成、バトル、キャラ表示テーブルは変更しない。
 * 読み込み時は画面の要素を追加せず、解放前はギャラリーを表示しない。
 */
(function () {
  'use strict';
  const BASE = 'assets/ART_V2/hidden/juri/';
  const ITEMS = Object.freeze([
    ['pose_peace.webp', 'ピース', 'いつものジュリ'],
    ['pose_relax.webp', 'ひと休み', 'いつものジュリ'],
    ['pose_stretch.webp', 'のびのび', 'いつものジュリ'],
    ['pose_shopping.webp', 'お買い物', 'いつものジュリ'],
    ['pose_jewelry.webp', '宝石鑑定', 'いつものジュリ'],
    ['costume_dress.webp', 'イブニングドレス', '特別な衣装'],
    ['costume_knit.webp', 'ニットワンピース', '特別な衣装'],
    ['costume_winter.webp', '冬のコート', '特別な衣装'],
    ['costume_kimono.webp', '花柄の和装', '特別な衣装'],
    ['costume_street.webp', 'ストリートスタイル', '特別な衣装']
  ]);
  let overlay = null;
  let timer = null;
  let held = null;
  let openedAt = 0;
  let oldOverflow = '';
  let priorFocus = null;
  let sequence = '';

  function unlocked() {
    try {
      // 正規のジュリ解放フラグと同一の条件を利用する。
      return typeof isV0420Revealed === 'function' && !!isV0420Revealed('juri');
    } catch (_) { return false; }
  }
  function targetImage(node) {
    if (!node || typeof node.closest !== 'function') return null;
    const img = node.closest('img');
    if (!img) return null;
    const src = img.getAttribute('src') || '';
    // 既存のジュリ画像に限る。他のヒロインの立ち絵には干渉しない。
    return /(?:^|\/)juri(?:_(?:normal|smile|blush|sad|pout|surprise))?\.(?:webp|png)(?:[?#]|$)/i.test(src) ? img : null;
  }
  function stopHolding() {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    held = null;
  }
  function close() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.style.overflow = oldOverflow;
    if (priorFocus && typeof priorFocus.focus === 'function' && priorFocus.isConnected) priorFocus.focus();
  }
  function open() {
    if (!unlocked() || overlay || !document.body) return;
    stopHolding();
    priorFocus = document.activeElement;
    oldOverflow = document.body.style.overflow;
    const root = document.createElement('div');
    root.id = 'yoiboshi-juri-secret';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'ジュリの秘密のワードローブ');
    root.innerHTML = `
      <div class="yjs-backdrop"></div>
      <section class="yjs-panel">
        <header class="yjs-head"><div><small>SAIONJI JURI · SECRET COLLECTION</small><h2>ジュリの秘密のワードローブ</h2><p>ふだんは見せない、もうひとつの表情。</p></div><button class="yjs-close" type="button" aria-label="閉じる">×</button></header>
        <div class="yjs-scroll"><div class="yjs-grid">${ITEMS.map(([file, title, kind]) => `
          <figure class="yjs-card"><img src="${BASE + file}" alt="ジュリ：${title}" loading="lazy" decoding="async"><figcaption><small>${kind}</small><strong>${title}</strong></figcaption></figure>
        `).join('')}</div><p class="yjs-foot">特別な一枚絵のプレビューです。衣装は通常の立ち絵には反映されません。</p></div>
      </section>
      <style>
        #yoiboshi-juri-secret{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;color:#fff;font-family:inherit}
        #yoiboshi-juri-secret .yjs-backdrop{position:absolute;inset:0;background:rgba(10,7,25,.88);backdrop-filter:blur(10px)}
        #yoiboshi-juri-secret .yjs-panel{position:relative;display:flex;flex-direction:column;width:min(880px,96vw);max-height:min(92dvh,950px);border-radius:20px;overflow:hidden;border:1px solid #ba9dce77;box-shadow:0 28px 95px #07030dbb;background:linear-gradient(148deg,#2f2249,#111124 65%)}
        #yoiboshi-juri-secret .yjs-head{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;padding:22px 24px 15px;border-bottom:1px solid #e6bfe433}
        #yoiboshi-juri-secret .yjs-head small{color:#ddc1ed;font-size:10px;letter-spacing:.14em}
        #yoiboshi-juri-secret h2{font-size:clamp(18px,4vw,26px);margin:7px 0 4px;line-height:1.3;color:#f7d7ee}
        #yoiboshi-juri-secret .yjs-head p{margin:0;color:#e3d7ea;font-size:12px}
        #yoiboshi-juri-secret .yjs-close{border:1px solid #e6c9e977;border-radius:50%;color:white;background:#4f3b69;min-width:40px;min-height:40px;font-size:25px;cursor:pointer;line-height:1}
        #yoiboshi-juri-secret .yjs-scroll{overflow:auto;overscroll-behavior:contain;padding:18px 17px 22px}
        #yoiboshi-juri-secret .yjs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(155px,45%),1fr));gap:13px}
        #yoiboshi-juri-secret .yjs-card{background:#f9f5fd;border:1px solid #c3a9d0;border-radius:13px;overflow:hidden;margin:0;color:#312443;box-shadow:0 6px 18px #09041666}
        #yoiboshi-juri-secret .yjs-card img{width:100%;height:220px;object-fit:contain;object-position:center bottom;display:block;background:#f5f2f9}
        #yoiboshi-juri-secret figcaption{display:flex;flex-direction:column;padding:9px 10px 12px;gap:2px}
        #yoiboshi-juri-secret figcaption small{font-size:10px;color:#7b6487}
        #yoiboshi-juri-secret figcaption strong{font-size:13px}
        #yoiboshi-juri-secret .yjs-foot{font-size:10px;color:#cabbd2;text-align:center;margin:17px 4px 0}
        @media(max-width:460px){#yoiboshi-juri-secret .yjs-head{padding:17px 14px 12px}#yoiboshi-juri-secret .yjs-scroll{padding:12px 10px 16px}#yoiboshi-juri-secret .yjs-grid{gap:9px}#yoiboshi-juri-secret .yjs-card img{height:188px}}
        @media(prefers-reduced-motion:reduce){#yoiboshi-juri-secret *{scroll-behavior:auto!important}}
      </style>`;
    root.querySelector('.yjs-close').addEventListener('click', close);
    root.querySelector('.yjs-backdrop').addEventListener('click', close);
    overlay = root;
    document.body.appendChild(root);
    document.body.style.overflow = 'hidden';
    openedAt = Date.now();
    root.querySelector('.yjs-close').focus();
  }
  // iPhone/Android: 解放済みのジュリ本人の画像を長押し。
  document.addEventListener('pointerdown', function (e) {
    if (overlay || !unlocked() || (e.button !== undefined && e.button !== 0)) return;
    const img = targetImage(e.target);
    if (!img) return;
    stopHolding();
    held = { id:e.pointerId, x:e.clientX, y:e.clientY };
    timer = setTimeout(open, 1300);
  }, true);
  document.addEventListener('pointermove', function (e) {
    if (!held || held.id !== e.pointerId) return;
    if (Math.abs(e.clientX-held.x)>15 || Math.abs(e.clientY-held.y)>15) stopHolding();
  }, true);
  document.addEventListener('pointerup', stopHolding, true);
  document.addEventListener('pointercancel', stopHolding, true);
  document.addEventListener('scroll', stopHolding, true);
  // ギャラリーが開いた長押しの直後だけ、元画面のクリックを抑止する。
  document.addEventListener('click', function (e) {
    if (overlay && Date.now()-openedAt<500 && targetImage(e.target)) {
      e.preventDefault();e.stopImmediatePropagation();
    }
  }, true);
  document.addEventListener('contextmenu', function (e) {
    if (unlocked() && targetImage(e.target)) e.preventDefault();
  }, true);
  // Windows向け隠し入力。入力欄では反応させない。
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {close();sequence='';return;}
    if (overlay || !unlocked() || e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName||'') || e.target?.isContentEditable) return;
    if (e.key.length !== 1) return;
    sequence = (sequence + e.key.toLowerCase()).slice(-4);
    if (sequence === 'juri') {sequence='';open();}
  });
})();
