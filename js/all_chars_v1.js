/* 宵星の契約者 全キャラ一覧（記録・設定から開く）
 * ゲームの今のデータ（PEOPLE / UNITS / 各ヒロインのプロフィール / 灯火 / STORY_ONLY_CAST）から毎回作るので、
 * 新しいヒロインを追加すると自動でここにも並ぶ。セーブは読むだけで書き換えない。
 */
(function(){
const ORDER={R:0,SR:1,SSR:2,UR:3};
const ROLE={attacker:'アタッカー',tank:'タンク',healer:'ヒーラー',support:'サポート',breaker:'ブレイカー',buffer:'バッファー',debuffer:'デバッファー'};
// 物語だけの人物は、会話用の立ち絵があるボス・敵役だけを並べる（ネタバレタブ）
const STORY=[['touko','白鷺 透子','旧灯台保存会。序章で星灯を預ける人'],['touko_true','白鷺 透子（本当の姿）','点灯式の夜に正体を現した透子'],['sakuya','朔夜','黒い星灯の契約者'],['sacchan','さっちゃん','湯ノ花の仲居。オーラの消えた朔夜'],['ibuki','イブキ','夜市の売人。いまは取引相手'],['haruka','霧島 ハルカ','トワの姉。ゴシック悪魔の仮装をした縫い手'],['saya','氷室 沙耶','旧灯台保存会の副会長'],['ruri','久遠 ルリ','旧喫茶街の星読み。透子の妹'],['aoi_dark','瀬名 葵（黒い灯）','灯を燃やし、敵として再会した葵'],['enju','宵宮 槐','灯を売る人。第2部の敵'],['tokoyo','市守り・常夜','灯の市の最終ボス'],['kasumi_shion','SHION∞（霞 シオン）','仮面の舞台の主。行方不明だった最強のダンサー'],['tsuzuri','仕立て屋・綴','紬ヶ丘の仕立て屋']];
const e=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let tab='h',list=[],cur=-1,H=null;
function heroes(){
 if(H)return H;
 H=Object.keys(PEOPLE).map((id,i)=>{
  let pr={};try{pr=(typeof extraHero==='function'&&extraHero(id)?.profile)||{}}catch(_){}
  let t='';try{t=typeof tomoshibiLine==='function'?tomoshibiLine(id):''}catch(_){}
  const m=/灯火[:：]\s*(.*?)\s*―\s*(.*)/.exec(t||'');
  const note=String(PEOPLE[id].note||'');
  const us=UNITS.filter(u=>u.person===id&&(u.name||u.title)!=='採用画像試遊').sort((a,b)=>(ORDER[a.rarity]??9)-(ORDER[b.rarity]??9));
  return {id,no:i+1,n:PEOPLE[id].name,a:pr.age||'',j:pr.occupation||note.split('／')[0],p:pr.personality||'',f:pr.favorite||'',w:pr.weakness||'',c:(pr.catchphrases||[])[0]||'',tc:m?m[1]:'',tw:m?m[2]:'',u:us.map(u=>[u.rarity,u.name||u.title||'',u.role||'']),rs:[...new Set(us.map(u=>u.rarity))]};
 });
 return H;
}
function img(id){return `<img loading="lazy" alt="" src="assets/ART_V2/full_body/${id}.webp" data-alt="assets/ART_V2/full_body/${id}.png|assets/UNIT_ART/${id}_work.png|assets/ART_V2/upper_body/${id}.webp" onerror="acImgFallback(this)">`}
window.acImgFallback=function(el){const r=(el.dataset.alt||'').split('|').filter(Boolean);if(!r.length){el.onerror=null;el.style.visibility='hidden';return}el.src=r.shift();el.dataset.alt=r.join('|')};
function card(x,i){
 if(tab==='s')return `<button class="ac-card" data-i="${i}"><div class="ac-ph"><img loading="lazy" alt="" src="assets/ART_V2/story_cast/${x[0]}_talk.webp" onerror="this.style.visibility='hidden'"></div><div class="ac-meta"><b>${e(x[1])}</b><span>${e(x[2])}</span></div></button>`;
 return `<button class="ac-card" data-i="${i}"><div class="ac-ph"><span class="ac-no">No.${String(x.no).padStart(3,'0')}</span><span class="ac-rs">${x.rs.filter(r=>r!=='R').sort((a,b)=>ORDER[a]-ORDER[b]).map(r=>`<i class="ac-r ${r}">${r}</i>`).join('')}</span>${img(x.id)}</div><div class="ac-meta"><b>${e(x.n)}</b><span>${x.a?x.a+'歳・':''}${e(x.j)}</span></div></button>`;
}
function render(){
 const root=document.getElementById('acRoot');if(!root)return;
 const q=root.querySelector('#acQ').value.trim().toLowerCase(),f=root.querySelector('#acF').value,o=root.querySelector('#acO').value;
 root.querySelector('#acF').disabled=root.querySelector('#acO').disabled=tab==='s';
 root.querySelector('#acWarn').hidden=tab!=='s';
 if(tab==='s'){list=STORY.filter(x=>!q||(x[1]+x[2]).toLowerCase().includes(q))}
 else{
  list=heroes().filter(x=>{if(q&&!(x.n+x.j+x.tc+x.tw+x.p+x.id).toLowerCase().includes(q))return false;if(f==='UR')return x.rs.includes('UR');if(f==='SSR')return x.rs.includes('SSR');if(f==='SR')return !x.rs.includes('SSR')&&!x.rs.includes('UR');return true});
  const by={no:(a,b)=>a.no-b.no,age:(a,b)=>(a.a||99)-(b.a||99)||a.no-b.no,ager:(a,b)=>(b.a||0)-(a.a||0)||a.no-b.no,name:(a,b)=>a.n.localeCompare(b.n,'ja')}[o];list.sort(by);
 }
 root.querySelector('#acG').innerHTML=list.map(card).join('')||'<p class="ac-empty">見つかりませんでした</p>';
 root.querySelector('#acCnt').textContent=tab==='s'?list.length+'人':list.length+' / '+heroes().length+'人';
}
function detail(i){
 cur=i;const x=list[i],box=document.getElementById('acBox');if(!x||!box)return;
 const nav=`<div class="ac-nav"><button type="button" data-m="-1">← 前の人</button><button type="button" data-m="1">次の人 →</button></div>`;
 let h;
 if(tab==='s')h=`<div class="ac-big"><img alt="" src="assets/ART_V2/story_cast/${x[0]}_talk.webp"></div><div class="ac-info"><small>物語の人物</small><h3>${e(x[1])}</h3><p>${e(x[2])}</p><p class="ac-sub">ガチャ・交流には出ない、ストーリーだけの登場人物です。</p>${nav}</div>`;
 else h=`<div class="ac-big">${img(x.id)}</div><div class="ac-info"><small>No.${String(x.no).padStart(3,'0')}　ID ${e(x.id)}</small><h3>${e(x.n)}</h3><p class="ac-sub">${x.a?x.a+'歳　':''}${e(x.j)}</p>${x.tc?`<div class="ac-tomo"><b>灯火　${e(x.tc)}</b><br>${e(x.tw)}</div>`:''}<dl>${x.p?`<dt>性格</dt><dd>${e(x.p)}</dd>`:''}${x.f?`<dt>好きなもの</dt><dd>${e(x.f)}</dd>`:''}${x.w?`<dt>苦手</dt><dd>${e(x.w)}</dd>`:''}</dl>${x.c?`<p class="ac-catch">「${e(x.c)}」</p>`:''}<h4>カード（${x.u.length}枚）</h4><ul class="ac-units">${x.u.map(u=>`<li><i class="ac-r ${u[0]}">${u[0]}</i><span>${e(u[1])}</span><em>${e(ROLE[u[2]]||u[2])}</em></li>`).join('')}</ul>${nav}</div>`;
 box.innerHTML=`<button type="button" class="ac-x" aria-label="閉じる">×</button>`+h;
 document.getElementById('acSheet').hidden=false;box.scrollTop=0;
}
function close(){const r=document.getElementById('acRoot');if(r)r.remove();document.removeEventListener('keydown',onKey)}
function onKey(ev){const sh=document.getElementById('acSheet');if(!sh)return;if(ev.key==='Escape'){if(!sh.hidden)sh.hidden=true;else close()}else if(!sh.hidden&&ev.key==='ArrowRight')detail((cur+1)%list.length);else if(!sh.hidden&&ev.key==='ArrowLeft')detail((cur-1+list.length)%list.length)}
window.openAllCharacters=function(){
 close();H=null;tab='h';
 const d=document.createElement('div');d.id='acRoot';d.className='ac-root';d.setAttribute('role','dialog');d.setAttribute('aria-label','全キャラ一覧');
 d.innerHTML=`<div class="ac-head"><div><h2>全キャラ一覧</h2><p>出会う前のキャラも含めて、ゲームに登録されている全員を見られます。</p></div><button type="button" class="ac-close">閉じる ×</button></div>
 <div class="ac-bar"><div class="ac-tabs"><button type="button" data-t="h" aria-selected="true">ヒロイン</button><button type="button" data-t="s" aria-selected="false">物語の人物</button></div>
 <input id="acQ" type="search" placeholder="名前・職業・灯火で探す" aria-label="検索"><select id="acF" aria-label="絞り込み"><option value="">すべて</option><option value="UR">URあり</option><option value="SSR">SSRあり</option><option value="SR">SRまで</option></select><select id="acO" aria-label="並び順"><option value="no">登録順</option><option value="age">年齢順</option><option value="ager">年齢が上の順</option><option value="name">名前順</option></select><span id="acCnt"></span></div>
 <p id="acWarn" class="ac-warn" hidden>物語の先の展開（ネタバレ）を含みます。</p>
 <div class="ac-grid" id="acG"></div>
 <div class="ac-sheet" id="acSheet" hidden><div class="ac-box" id="acBox"></div></div>`;
 document.body.appendChild(d);
 d.addEventListener('click',ev=>{
  const t=ev.target;
  if(t.closest('.ac-close'))return close();
  const tb=t.closest('[data-t]');if(tb){tab=tb.dataset.t;d.querySelectorAll('[data-t]').forEach(b=>b.setAttribute('aria-selected',b===tb));return render()}
  const c=t.closest('.ac-card');if(c)return detail(+c.dataset.i);
  if(t.id==='acSheet'||t.closest('.ac-x')){document.getElementById('acSheet').hidden=true;return}
  const m=t.closest('[data-m]');if(m)detail((cur+ +m.dataset.m+list.length)%list.length);
 });
 ['#acQ','#acF','#acO'].forEach(s=>d.querySelector(s).addEventListener('input',render));
 document.addEventListener('keydown',onKey);
 render();
};
const css=`.ac-root{position:fixed;inset:0;z-index:9000;overflow:auto;background:#0d1230;background-image:radial-gradient(ellipse 80% 40% at 50% 0,#2a2f78 0,transparent 70%);color:#eef0ff;font-family:inherit;padding:16px max(16px,3vw) 40px;-webkit-overflow-scrolling:touch}
.ac-root *{box-sizing:border-box;min-width:0}
.ac-head{display:flex;gap:12px;align-items:flex-start;justify-content:space-between;max-width:1240px;margin:0 auto}
.ac-head h2{margin:0;font-size:clamp(24px,4vw,36px);line-height:1.1}.ac-head p{margin:6px 0 0;color:#aab3e6;font-size:14px}
.ac-close{flex:none;min-height:44px;padding:0 16px;border-radius:12px;border:1px solid #2e3a78;background:#151c46;color:#eef0ff;cursor:pointer;font:inherit}
.ac-bar{position:sticky;top:-16px;z-index:2;display:flex;flex-wrap:wrap;gap:8px;align-items:center;max-width:1240px;margin:12px auto 0;padding:10px 0;background:#0d1230ee;border-bottom:1px solid #2e3a78}
.ac-tabs{display:flex;gap:4px;background:#151c46;border:1px solid #2e3a78;border-radius:999px;padding:4px}
.ac-tabs button{border:0;background:none;color:#aab3e6;border-radius:999px;min-height:38px;padding:0 14px;cursor:pointer;font:inherit}
.ac-tabs button[aria-selected=true]{background:#ffd27a;color:#251a05;font-weight:700}
.ac-bar input,.ac-bar select{min-height:42px;border-radius:12px;border:1px solid #2e3a78;background:#151c46;color:#eef0ff;padding:0 10px;font:inherit;font-size:16px}
.ac-bar input{flex:1 1 200px}#acCnt{color:#aab3e6;font-size:14px;white-space:nowrap}
.ac-warn{max-width:1240px;margin:10px auto 0;color:#ffb4a0;font-size:14px}
.ac-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;max-width:1240px;margin:16px auto 0}
.ac-card{all:unset;cursor:pointer;display:flex;flex-direction:column;background:#1a2254;border:1px solid #2e3a78;border-radius:14px;overflow:hidden}
.ac-card:hover,.ac-card:focus-visible{border-color:#ffd27a}
.ac-ph{position:relative;aspect-ratio:3/4;background:radial-gradient(ellipse 70% 30% at 50% 96%,#ff9f5a73,transparent 70%),linear-gradient(#232c66,#141a42)}
.ac-ph img{position:absolute;left:4px;right:4px;top:22px;bottom:0;width:calc(100% - 8px);height:calc(100% - 22px);object-fit:contain;object-position:50% 100%}
.ac-no{position:absolute;left:8px;top:5px;font-size:12px;color:#aab3e6}
.ac-rs{position:absolute;right:6px;top:6px;z-index:1;display:flex;flex-direction:column;gap:3px}
.ac-r{font-style:normal;font-size:11px;font-weight:700;line-height:1;padding:3px 5px;border-radius:5px;background:#0d1230cc;text-align:center;color:#c9cce0}
.ac-r.SR{color:#7fd0ff}.ac-r.SSR{color:#ffcf6b}.ac-r.UR{color:#ff86c8}
.ac-meta{padding:8px 10px 11px;display:flex;flex-direction:column;gap:2px}.ac-meta b{font-size:16px;line-height:1.25}
.ac-meta span{font-size:12.5px;color:#aab3e6;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.ac-empty{color:#aab3e6;text-align:center;grid-column:1/-1;padding:30px 0}
.ac-sheet{position:fixed;inset:0;z-index:9001;background:#05081acc;display:flex;align-items:center;justify-content:center;padding:16px}.ac-sheet[hidden]{display:none}
.ac-box{position:relative;background:#151c46;border:1px solid #2e3a78;border-radius:18px;width:min(900px,100%);max-height:100%;overflow:auto;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr)}
.ac-big{position:relative;min-height:400px;background:radial-gradient(ellipse 70% 25% at 50% 97%,#ff9f5a80,transparent 70%),linear-gradient(#26307a,#121738)}
.ac-big img{position:absolute;inset:14px 8px 0;width:calc(100% - 16px);height:calc(100% - 14px);object-fit:contain;object-position:50% 100%}
.ac-info{padding:22px 22px 24px}.ac-info small{color:#aab3e6}.ac-info h3{margin:4px 0;font-size:28px;line-height:1.15}
.ac-sub{color:#aab3e6;font-size:14px;margin:0}
.ac-tomo{margin:14px 0;padding:10px 12px;border-radius:12px;background:#ffd27a1f;border:1px solid #ffd27a66}.ac-tomo b{color:#ffd27a}
.ac-info dl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:5px 12px;margin:0}.ac-info dt{color:#aab3e6;font-size:14px;white-space:nowrap}.ac-info dd{margin:0}
.ac-catch{margin:14px 0 0;padding-left:10px;border-left:3px solid #ffd27a;font-size:17px}
.ac-info h4{margin:18px 0 8px;font-weight:500;color:#aab3e6;font-size:14px}
.ac-units{list-style:none;margin:0;padding:0;display:grid;gap:6px}.ac-units li{display:flex;gap:10px;align-items:center;background:#1a2254;border-radius:10px;padding:7px 10px}
.ac-units .ac-r{min-width:36px}.ac-units em{margin-left:auto;font-style:normal;font-size:13px;color:#aab3e6;white-space:nowrap}
.ac-x{position:absolute;right:10px;top:10px;z-index:2;width:44px;height:44px;border-radius:50%;border:1px solid #2e3a78;background:#0d1230;color:#eef0ff;font-size:22px;cursor:pointer}
.ac-nav{display:flex;gap:8px;margin-top:18px}.ac-nav button{flex:1;min-height:44px;border-radius:12px;border:1px solid #2e3a78;background:#1a2254;color:#eef0ff;cursor:pointer;font:inherit}
@media(max-width:640px){.ac-grid{grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:9px}.ac-box{grid-template-columns:1fr}.ac-big{min-height:320px}.ac-sheet{padding:0;align-items:flex-end}.ac-box{border-radius:18px 18px 0 0;max-height:94%}}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
})();
