/* Fujimiya Shion: genuine R attacker; q6; existing R passive scale. */
const NEW_UNIT_ROSTER_V0930=Object.freeze([
 {id:'fujimiya_shion_work',person:'fujimiya_shion',title:'紫に灯る自信',
  rarity:'R',role:'attacker',color:'#9a78b5',gate:'q6',s:['紫の一筆','ラメの閃光']}
]);
const NEW_UNIT_DESIGN_V0930=Object.freeze({
 fujimiya_shion_work:{skills:['renka_strike_down','rio_aoe_18'],passive:['rio_attack','譲らない美意識']}
});
const NEW_UNIT_ARTWORK_V0930=Object.freeze({
 fujimiya_shion_work:{portrait:'assets/ART_V2/full_body/fujimiya_shion.png'}
});
// Only this unit uses 28% / 8 sec parameters with the existing Renka strike-down handler.
const NEW_UNIT_EFFECTS_V0930=Object.freeze({strikeBase:26,attackDownPercent:28,attackDownSeconds:8});
