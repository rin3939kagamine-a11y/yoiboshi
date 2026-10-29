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
 function resolve(e,ctx={}){
   if(!e)return null;
   const kind=Object.prototype.hasOwnProperty.call(pools,e.kind)?e.kind:'normal';
   // Special bosses are fought in a different visual engine: never override them.
   if(e.kind==='boss'&&['q6','q12','q17','q18','q28','q29'].includes(String(ctx.qid||'')))return null;
   const pool=pools[kind];
   const quest=parseInt(String(ctx.qid||'').replace(/^q/,''),10)||0;
   const wave=Math.max(0,parseInt(ctx.wave,10)||0);
   const slot=Math.max(0,parseInt(ctx.index,10)||0);
   const seed=(quest*13+wave*7+slot*3+(e.elite?17:0));
   const asset=pool[safeIndex(seed,pool.length)];
   return {src:'assets/enemies/zankyo/'+asset+'.webp',catalogueId:asset,kind};
 }
 window.YoiEnemyArt=Object.freeze({resolve,groups:pools,total:all.length});
})();
