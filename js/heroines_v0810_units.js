/* Stage 2: two user-approved SR units, normal recruitment. Preserve all preexisting units and odds. */
const NEW_UNIT_ROSTER_V0810=Object.freeze([
 {id:'sakakibara_kaho_work',person:'sakakibara_kaho',title:'展示室の灯り',rarity:'R',role:'support',color:'#b4828c',s:['展示室の灯り','余白をつくる']},
 {id:'minase_ririka_work',person:'minase_ririka',title:'レース越しの気配り',rarity:'R',role:'healer',color:'#ac97c2',s:['やさしい衣装直し','レースをほどいて']}
]);
const NEW_UNIT_DESIGN_V0810=Object.freeze({
 sakakibara_kaho_work:{skills:['attack_up','attack_down'],passive:['attack_down_extend','空間演出の目利き']},
 minase_ririka_work:{skills:['heal_one','cleanse'],passive:['rescue','細やかな気配り']}
});
const NEW_UNIT_ARTWORK_V0810=Object.freeze({
 sakakibara_kaho_work:{portrait:'assets/character_candidates/2026-11-12_rust_red_standee/full_body.png'},
 minase_ririka_work:{portrait:'assets/character_candidates/2026-11-12_brown_ponytail_white_lace/brown_ponytail_white_lace_full_body.png'}
});
