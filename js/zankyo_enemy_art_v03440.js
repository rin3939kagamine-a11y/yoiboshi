/* Ver.0.34.4.0: Residual Echo catalogue art — presentation only.
 * All 35 artworks extracted from two original catalogue PDFs, no new enemy names.
 * Deterministic assignment by kind/quest/wave/slot; never rely on recycled e.id.
 * Existing scripted boss images and combat rules are not modified.
 */
(function(){
 'use strict';
 const pools=Object.freeze({
  normal:Object.freeze(['part1-011', 'part1-013', 'part1-015', 'part1-016', 'part2-001', 'part2-003', 'part2-004', 'part2-005', 'part2-006', 'part2-008', 'part2-009', 'part2-011', 'part2-012', 'part2-013', 'part2-014', 'part2-015', 'part2-016']),
  swift:Object.freeze(['part1-001', 'part1-003', 'part1-010', 'part1-014', 'part2-000', 'part2-017']),
  armored:Object.freeze(['part1-002', 'part1-005', 'part1-006', 'part1-009', 'part2-002', 'part2-007', 'part2-010']),
  boss:Object.freeze(['part1-000', 'part1-004', 'part1-007', 'part1-008', 'part1-012']),
 });
 const all=Object.freeze(Object.values(pools).flat());
 const safeIndex=(n,limit)=>((n%limit)+limit)%limit;
 const dedicated=Object.freeze({q3:'boss_q3_fumikiri',q4:'boss_q4_kokuban',q5:'boss_q5_kaiten',q6:'boss_q6_toudai',q7:'boss_q7_mohou',q8:'boss_q8_kamen',q9:'boss_q9_ikei',q10:'boss_q10_shoko',q11:'boss_q11_kuroboshi'});
 // 名前つき擬似体の専用絵（番号は対応表 MAPPING.md が正。経験の残響だけは名前が3級で同じためクエストIDで引く）
 const namedArt=Object.freeze({'金貨の擬似体':'001','糸の擬似体':'002','水槽の擬似体':'003','黒い灯の擬似体':'004','投影機の擬似体':'005','夜市に残った擬似体':'006','星のかけらの擬似体':'007','しおれた苗の擬似体':'008','暗室の擬似体':'009','灯台を這う擬似体':'010','星読みの擬似体':'011','流れ星の擬似体':'012','夜明けを嫌う擬似体':'013','舞台袖の擬似体':'014','足止めの擬似体':'015','灯台から降りる擬似体':'016','岸壁に残った擬似体':'017','ショーケースの擬似体':'018','溢れた灯の擬似体':'019','暴れる星灯の擬似体':'020','帳簿を狙う擬似体':'021','ネオンの擬似体':'022','屋上の擬似体':'023','廊下の擬似体':'024','交差点の擬似体':'025','かけらに惹かれる擬似体':'026','線路沿いの擬似体':'027','霧の擬似体':'028','温室の擬似体':'029','山道の擬似体':'030','溢れた思い出の擬似体':'031','崩落の擬似体':'032','脇道の擬似体':'033','灯庫の擬似体':'034','坑道の擬似体':'035','朝市の擬似体':'036','渦の擬似体':'037','坂道の擬似体':'038','探し回る擬似体':'039','ショーウィンドウの擬似体':'040','溢れる灯の擬似体':'041','かけらの擬似体':'042','スケッチに惹かれる擬似体':'043','電波の擬似体':'044','岸壁の擬似体':'045','探り糸の擬似体':'046','額縁の擬似体':'047','ねがいの頁の擬似体':'048'});;
 function resolve(e,ctx={}){
   if(!e)return null;
   if(e.kind==='boss'&&Object.prototype.hasOwnProperty.call(dedicated,String(ctx.qid||'')))return {src:'assets/enemies/'+dedicated[String(ctx.qid)]+'.webp',catalogueId:null,kind:'boss'}; // 第3〜11話ボスは専用の絵を使う
   if(e.kind==='cage')return {src:'assets/enemies/echo_cage.webp',catalogueId:null,kind:'cage'}; // 残響の檻は専用の絵を使う
   // 名前つき擬似体: 依頼名を持つのはエリート（最終ウェーブ最終枠）だけなので、名前引きはエリートに限る
   if(e.elite&&e.name){
     const qidStr=String(ctx.qid||'');
     if(Object.prototype.hasOwnProperty.call(namedArt,e.name))return {src:'assets/enemies/gijitai_named/'+namedArt[e.name]+'.webp',catalogueId:null,kind:e.kind};
   }
   if(e.kind==='normal'||e.kind==='swift'||e.kind==='armored'){
     // 残響の絵と擬似体の絵を、クエスト・ウェーブ・位置で決まる並びで入れ替えて出す（図鑑の記録も残響の絵のときは付ける）
     const gijitai={normal:['gijitai_normal','gijitai_red','gijitai_blue','gijitai_float','gijitai_crawl'],swift:['gijitai_swift','gijitai_swift_big'],armored:['gijitai_armored','gijitai_armored_shield']}[e.kind];
     const cand=pools[e.kind].map(id=>({src:'assets/enemies/zankyo/'+id+'_stand.webp',catalogueId:id})).concat(gijitai.map(id=>({src:'assets/enemies/zankyo/'+id+'.webp',catalogueId:null})));
     const quest=parseInt(String(ctx.qid||'').replace(/^q/,''),10)||0;
     const wave=Math.max(0,parseInt(ctx.wave,10)||0);
     const slot=Math.max(0,parseInt(ctx.index,10)||0);
     const seed=(quest*13+wave*7+slot*3+(e.elite?17:0));
     const pick=cand[safeIndex(seed,cand.length)];
     return {src:pick.src,catalogueId:pick.catalogueId,kind:e.kind};
   }
   const kind=Object.prototype.hasOwnProperty.call(pools,e.kind)?e.kind:'normal';
   // Special bosses are fought in a different visual engine: never override them.
   if(e.kind==='boss'&&['q6','q12','q17','q18','q28','q29','q34','q35','q40','q45','q46','q52','q53','q58','q81','q89'].includes(String(ctx.qid||'')))return null;
   const pool=e.kind==='boss'?pools.boss:pools.normal; // 道中の敵の絵は小さい残響の組に統一
   const quest=parseInt(String(ctx.qid||'').replace(/^q/,''),10)||0;
   const wave=Math.max(0,parseInt(ctx.wave,10)||0);
   const slot=Math.max(0,parseInt(ctx.index,10)||0);
   const seed=(quest*13+wave*7+slot*3+(e.elite?17:0));
   const asset=pool[safeIndex(seed,pool.length)];
   return {src:'assets/enemies/zankyo/'+asset+'.webp?v=0.50.7.0',catalogueId:asset,kind};
 }
 window.YoiEnemyArt=Object.freeze({resolve,groups:pools,total:all.length});
})();
