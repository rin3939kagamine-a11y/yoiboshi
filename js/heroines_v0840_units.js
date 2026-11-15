/* 2026-11-15: approved stage 2, SR units only.
 * Role stats are inherited from the unmodified ROLES table.
 * Exact rank-0 skill values are additive and isolated to these IDs.
 * No new save fields, gacha rates, or existing unit changes. */
const NEW_UNIT_ROSTER_V0840=Object.freeze([
 {id:'chiyozaki_suzuha_work',person:'chiyozaki_suzuha',title:'潮風を結ぶ案内',rarity:'SR',role:'support',
  color:'#89c3ad',s:['守りのリボン','お客様の笑顔を守って']},
 {id:'sakuraba_renka_work',person:'sakuraba_renka',title:'港の次の一手',rarity:'SR',role:'attacker',
  color:'#a24e79',s:['静かな勝負勘','フロアの読み合い']}
]);
const NEW_UNIT_DESIGN_V0840=Object.freeze({
 chiyozaki_suzuha_work:{skills:['suzuha_defense_up','suzuha_cleanse_heal'],passive:['suzuha_defense_focus','お守りの仕立て']},
 sakuraba_renka_work:{skills:['renka_strike_down','renka_enemy_ct_all'],passive:['renka_attack','勝負師の勘']}
});
const NEW_UNIT_ARTWORK_V0840=Object.freeze({
 chiyozaki_suzuha_work:{portrait:'assets/ART_V2/full_body/chiyozaki_suzuha.png'},
 sakuraba_renka_work:{portrait:'assets/ART_V2/full_body/sakuraba_renka.png'}
});
const NEW_UNIT_EFFECTS_V0840=Object.freeze({
 suzuhaDefensePercent:22,suzuhaDefenseSeconds:8,suzuhaCleanseHeal:30,
 renkaStrikeBase:26,renkaAttackDownPercent:18,renkaAttackDownSeconds:6,renkaEnemyCtAllSeconds:1.6
});
