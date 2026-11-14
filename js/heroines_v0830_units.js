/* Stage 2 / 2026-11-15: user-approved SR unit for Tokiwa Aone.
 * Additive only: no changes to preexisting unit data, save schema or rarity rates.
 * The existing performance engine implements enemy_ct (2.6s), ct (2.3s)
 * and ct_focus (+7% at SR) without modifying any other unit behavior. */
const NEW_UNIT_ROSTER_V0830=Object.freeze([
 {id:'tokiwa_aone_work',person:'tokiwa_aone',title:'音が灯る舞台裏',rarity:'SR',role:'support',
  color:'#8b87b8',s:['ミュートの合図','次の一拍']}
]);
const NEW_UNIT_DESIGN_V0830=Object.freeze({
 tokiwa_aone_work:{skills:['enemy_ct','ct'],passive:['ct_focus','音の先読み']}
});
const NEW_UNIT_ARTWORK_V0830=Object.freeze({
 tokiwa_aone_work:{portrait:'assets/provisional/2026-11-11_pink_underlayer_standee/full_body/pink_underlayer_black_street_v3_regenerated_CANDIDATE.png'}
});
