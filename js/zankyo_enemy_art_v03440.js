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
 function resolve(e,ctx={}){
   if(!e)return null;
   if(e.kind==='boss'&&Object.prototype.hasOwnProperty.call(dedicated,String(ctx.qid||'')))return {src:'assets/enemies/'+dedicated[String(ctx.qid)]+'.webp',catalogueId:null,kind:'boss'}; // 第3〜11話ボスは専用の絵を使う
   if(e.kind==='cage')return {src:'assets/enemies/echo_cage.webp',catalogueId:null,kind:'cage'}; // 残響の檻は専用の絵を使う
   if(e.kind==='normal'||e.kind==='swift'||e.kind==='armored'){
     // 残響の絵と擬似体の絵を、クエスト・ウェーブ・位置で決まる並びで入れ替えて出す（図鑑の記録も残響の絵のときは付ける）
     const gijitai={normal:['gijitai_normal','gijitai_red','gijitai_blue','gijitai_float','gijitai_crawl'],swift:['gijitai_swift','gijitai_swift_big'],armored:['gijitai_armored','gijitai_armored_shield']}[e.kind];
     const cand=pools[e.kind].map(id=>({src:'assets/enemies/zankyo/'+id+'.webp',catalogueId:id})).concat(gijitai.map(id=>({src:'assets/enemies/zankyo/'+id+'.webp',catalogueId:null})));
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
