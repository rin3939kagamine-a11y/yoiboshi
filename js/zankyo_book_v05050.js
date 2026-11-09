/* 宵星の契約者 RE:START Ver.0.50.5.0 — 残響図鑑
 * 元資料：Google ドライブ「残響図鑑 - Zankyo Collection」（part1 17体／part2 18体）。
 * 名前は元の図鑑の表記に合わせ、名前のない6体（part1-008・012・013・015・016、part2-014）は同じ調子で付けた。
 * 1) 通常の残響（ボス・エリート以外）の戦闘での名前を、割り当てられた絵の図鑑名にする。
 * 2) 戦闘で出会った残響を S.zankyoBook に記録する（初めて出会った場所・回数）。
 * 3) 「記録・設定」から開く図鑑画面（zankyoBook）。
 * ダメージ計算・行動順・報酬は変えない。セーブには S.zankyoBook を追加するだけ。
 */
const ZANKYO_BOOK=Object.freeze([
 // part1：人の背丈ほどの大きな残響
 {id:'part1-000',name:'お仕置きゲームオーバー',en:'Oshioki Game Over',text:'途中で投げ出されたゲームの続き。誰も押さないコンティニューの代わりに、「GAME OVER」だけが何度も光っている。'},
 {id:'part1-001',name:'おきわすれられた旋律',en:'Forgotten Melody',text:'練習の途中で弾かなくなった曲。最後まで聴いてほしかった音が、譜面ごと宙を漂っている。'},
 {id:'part1-002',name:'残されたぬいぐるみ',en:'Abandoned Plush',text:'大人になって押し入れにしまわれた友だち。ほつれた縫い目から、「また遊ぼうね」がこぼれ続けている。'},
 {id:'part1-003',name:'ひとりの台所',en:'Lonely Kitchen',text:'誰かのために作り続けたごはん。食べる人がいなくなっても、鍋とお玉の音だけが鳴りやまない。'},
 {id:'part1-004',name:'迷子のリュック',en:'Lost Backpack',text:'遠足の日に置いてきたリュック。中のしおりとクレヨンは、迎えに来てくれる手をずっと待っている。'},
 {id:'part1-005',name:'こぼれた約束',en:'Spilled Promise',text:'「また今度ね」と言ったきりの約束。抱えた砂時計の砂は、いつまでも落ちきらない。'},
 {id:'part1-006',name:'伏せられた声',en:'Sealed Voice',text:'言わずに飲み込んだ本音。縫い閉じられた口のまわりで、マイクだけが声を探している。'},
 {id:'part1-007',name:'偽りの王女',en:'False Princess',text:'鏡の前で演じ続けた「理想の自分」。本当の顔は、割れた手鏡のどこかに置き忘れてしまった。'},
 {id:'part1-008',name:'幕の下りた人形',en:'Maku no Orita Ningyou',text:'最後の公演のあと、片づけられずに残された人形。照明が落ちても、拍手の続きを待っている。'},
 {id:'part1-009',name:'届かなかった手紙',en:'The Letter Never Sent',text:'書いたのに出せなかった手紙の束。封蝋の数だけ、渡せなかった気持ちが重なっている。'},
 {id:'part1-010',name:'下ろした夢の楽器',en:'Abandoned Dream Instrument',text:'夢をあきらめた日に、弦を外されたギター。切れた弦の先が、まだ誰かの指を探している。'},
 {id:'part1-011',name:'こぼれたボタン',en:'Koboreta Button',text:'制服から取れて、そのままになったボタン。付け直してもらえる日を、糸を揺らして待っている。'},
 {id:'part1-012',name:'置き忘れの傘',en:'Okiwasure no Kasa',text:'雨上がりの駅に忘れられた傘。持ち主が戻らないまま、骨だけがあの日の雨を覚えている。'},
 {id:'part1-013',name:'開けられなかった封筒',en:'Akerarenakatta Fuutou',text:'届いたのに、怖くて開けられなかった封筒。中身を知られないまま、宛名の人を見つめている。'},
 {id:'part1-014',name:'落ちたヘアピン',en:'Ochita Hairpin',text:'いつの間にか落としたヘアピン。拾われないまま、髪をまとめた朝のことを思い出している。'},
 {id:'part1-015',name:'削りかすの吹きだまり',en:'Kezurikasu no Fukidamari',text:'何度も書き直した宿題の削りかす。消された答えたちが、渦になって集まっている。'},
 {id:'part1-016',name:'片方だけの靴下',en:'Katahou dake no Kutsushita',text:'洗濯のたびにはぐれた片方。もう片方とまた並べる日を、ひとつ目で探している。'},
 // part2：手のひらほどの小さな残響
 {id:'part2-000',name:'落ちたクリップ',en:'Ochita Clip',text:'書類から外れて、机の下に転がったクリップ。留めていた大事な紙のことを、まだ覚えている。'},
 {id:'part2-001',name:'忘れたおまもり',en:'Wasureta Omamori',text:'試験の日に持っていき忘れたおまもり。渡せなかった「がんばって」が、ほつれた糸から出てくる。'},
 {id:'part2-002',name:'こぼれたコイン',en:'Koboreta Coin',text:'自販機の下に転がった五円玉。ご縁を結ぶはずだったのに、と涙をこぼしている。'},
 {id:'part2-003',name:'伸びたヘアゴム',en:'Nobita Hair Gomu',text:'毎日使って伸びきったヘアゴム。捨てられないまま、手首で過ごした日々を数えている。'},
 {id:'part2-004',name:'残された鍵',en:'Nokosareta Kagi',text:'引っ越しのあと、どの扉の鍵か分からなくなった鍵。開けるはずだった部屋を、今も探している。'},
 {id:'part2-005',name:'ちぎれたレシート',en:'Chigireta Receipt',text:'ポケットの中でくしゃくしゃになったレシート。あの日の帰り道の買い物を、日付ごと覚えている。'},
 {id:'part2-006',name:'欠けた鉛筆',en:'Kaketa Pencil',text:'芯が折れたまま、筆箱の奥で眠った鉛筆。書きかけの言葉の続きを待っている。'},
 {id:'part2-007',name:'落ちた帽子',en:'Ochita Boushi',text:'風に飛ばされて、取りに戻らなかった帽子。日差しから守っていた頭の形を覚えている。'},
 {id:'part2-008',name:'絡まったイヤホン',en:'Karamatta Earphone',text:'かばんの底で絡まったイヤホン。片耳ずつ分けて聴いた曲が、ほどけずに残っている。'},
 {id:'part2-009',name:'忘れ物のランドセル',en:'Wasuremono no Randoseru',text:'卒業の日に置いていかれたランドセル。六年分の「いってきます」が、まだ肩ひもに残っている。'},
 {id:'part2-010',name:'ほこりの扇風機',en:'Hokori no Senpuuki',text:'しまい忘れて冬を越した扇風機。止まった羽根の奥で、あの夏の風を覚えている。'},
 {id:'part2-011',name:'おき忘れの弁当箱',en:'Okiwasure no Bentoubako',text:'机の中に置き忘れられた弁当箱。作ってくれた人の「いってらっしゃい」が、ふたの裏に残っている。'},
 {id:'part2-012',name:'消したはずの下書き',en:'Keshita Hazu no Shitagaki',text:'送らずに消したはずの下書き。消しゴムのあとから、言いかけた言葉がにじみ出ている。'},
 {id:'part2-013',name:'既読のまま',en:'Kidoku no Mama',text:'読んだのに返さなかったメッセージ。並んだ既読の印が、返事を待ちながら泡のようにふくらむ。'},
 {id:'part2-014',name:'言いそびれた言葉',en:'Iisobireta Kotoba',text:'言おうとして、言えなかった言葉のかけら。文字にならないまま、くるくると回り続けている。'},
 {id:'part2-015',name:'重なった嘘の群れ',en:'Kasanatta Uso no Mure',text:'その場しのぎの小さな嘘。一枚ずつは軽いのに、重なるほど目が増えていく。'},
 {id:'part2-016',name:'飲み込まれた叫び',en:'Nomikomareta Sakebi',text:'誰にも聞こえないように飲み込んだ叫び。渦の奥で、届かなかった声がまだ反響している。'},
 {id:'part2-017',name:'すれ違ったふたり',en:'Surechigatta Futari',text:'同じ場所にいたのに、すれ違ったまま離れたふたり。こぼした涙の色が、片方ずつ違う。'}
]);
const ZANKYO_BY_ID=Object.freeze(Object.fromEntries(ZANKYO_BOOK.map(z=>[z.id,z])));
let zankyoSelected='';

(function zankyoBookHooks(){
 'use strict';
 if(typeof makeWave!=='function')return;
 function artFor(e,q,idx,i){
  try{return window.YoiEnemyArt?window.YoiEnemyArt.resolve(e,{qid:q.id,wave:idx,index:i}):null;}catch(_){return null;}
 }
 function record(id,q){
  if(typeof S==='undefined'||!S)return false;
  if(!S.zankyoBook||typeof S.zankyoBook!=='object'||Array.isArray(S.zankyoBook))S.zankyoBook={};
  const cur=S.zankyoBook[id];
  if(cur&&typeof cur==='object'){cur.count=(Number(cur.count)||0)+1;return false;}
  S.zankyoBook[id]={count:1,first:String(q.location||q.name||''),qid:q.id};
  return true;
 }
 const originalMakeWave=makeWave;
 makeWave=function(q,idx){
  const list=originalMakeWave.apply(this,arguments);
  try{
   let fresh=false;
   (list||[]).forEach(function(e,i){
    const art=artFor(e,q,idx,i);
    if(!art||!ZANKYO_BY_ID[art.catalogueId])return;
    // 通常の残響だけ名前を図鑑名に（ボス・エリートは依頼ごとの名前のまま）
    if(e.kind!=='boss'&&!e.elite)e.name=ZANKYO_BY_ID[art.catalogueId].name;
    e.zankyoId=art.catalogueId;
    if(record(art.catalogueId,q))fresh=true;
   });
   if(fresh&&typeof toast==='function')setTimeout(function(){toast('残響図鑑に新しい残響が登録されました');},600);
  }catch(error){console.error('[宵星 残響図鑑]',error);}
  return list;
 };
})();

function openZankyoEntry(id){if(!ZANKYO_BY_ID[id])return;zankyoSelected=id;render();const el=document.querySelector('.zk-detail');if(el)el.scrollIntoView({block:'nearest',behavior:'smooth'});}
function zankyoBookPage(){
 const book=(typeof S!=='undefined'&&S&&S.zankyoBook&&typeof S.zankyoBook==='object')?S.zankyoBook:{};
 const seen=ZANKYO_BOOK.filter(z=>book[z.id]);
 if(!zankyoSelected||!book[zankyoSelected])zankyoSelected=seen.length?seen[0].id:'';
 const sel=zankyoSelected?ZANKYO_BY_ID[zankyoSelected]:null,rec=sel?book[sel.id]:null;
 const src=id=>`assets/enemies/zankyo/${id}.webp`;
 const section=(title,list)=>`<h3 class="zk-group-title">${title}</h3><div class="zk-grid">${list.map(z=>{const ok=!!book[z.id];return `<button type="button" class="zk-card ${ok?'':'unknown'} ${zankyoSelected===z.id?'active':''}" ${ok?`onclick="openZankyoEntry('${z.id}')" aria-label="${esc(z.name)}を見る"`:'disabled aria-label="まだ出会っていない残響"'}><span class="zk-thumb"><img src="${src(z.id)}" alt="" loading="lazy"></span><span class="zk-name">${ok?esc(z.name):'？？？'}</span></button>`}).join('')}</div>`;
 return `${heading('ZANKYO COLLECTION','残響図鑑','戦闘で出会った残響が登録されます。残響は、強すぎる想いが持ち主の手を離れて、その場所に残ったもの。')}
 <div class="v680-jumpbar"><button class="btn" onclick="change('records')">記録・設定へ戻る</button><span class="chip">登録 ${seen.length} / ${ZANKYO_BOOK.length}体</span></div>
 ${sel?`<section class="zk-detail card"><div class="zk-detail-art"><img src="${src(sel.id)}" alt="${esc(sel.name)}"></div><div class="zk-detail-copy"><small>${esc(sel.en)}</small><h2>${esc(sel.name)}</h2><p>${esc(sel.text)}</p><dl><div><dt>出会った回数</dt><dd>${Number(rec.count)||1}回</dd></div><div><dt>初めて出会った場所</dt><dd>${esc(rec.first||'不明')}</dd></div></dl></div></section>`:`<section class="zk-detail zk-empty card"><p>まだ登録された残響はいません。依頼の戦闘で残響と出会うと、ここに記録されます。</p></section>`}
 ${section('大きな残響',ZANKYO_BOOK.slice(0,17))}
 ${section('小さな残響',ZANKYO_BOOK.slice(17))}`;
}
