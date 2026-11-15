/* 2026-11-15: approved stage 2 for PR #95's three characters.
 * Stats and effects are exact approved values; legacy role stats and saves are untouched.
 * Kana: uniquely approved HP165 ATK11 DEF5 differs from the existing healer baseline.
 * Only ueda_kana_work overrides the role base; all other healers remain HP148 ATK9 DEF5. */
const NEW_UNIT_ROSTER_V0850=Object.freeze([
 {id:'ginjo_cecil_work',person:'ginjo_cecil',title:'幕が開くその前に',rarity:'SR',role:'support',color:'#28446c',
  s:['紺と金の守り','幕間の合図']},
 {id:'hasegawa_honoka_work',person:'hasegawa_honoka',title:'夕暮れのシャッター',rarity:'SR',role:'attacker',color:'#bf846c',
  s:['一瞬を捉えて','みんなの息遣い']},
 {id:'ueda_kana_work',person:'ueda_kana',title:'みんなで笑う祭り',rarity:'SR',role:'healer',color:'#de995e',
  s:['大丈夫のひとこと','笑顔を分け合おう']}
]);
const NEW_UNIT_DESIGN_V0850=Object.freeze({
 ginjo_cecil_work:{skills:['cecil_defense_up','cecil_team_ct'],passive:['cecil_buff','幕間の気配り']},
 hasegawa_honoka_work:{skills:['honoka_strike_ct','honoka_enemy_attack_down_all'],passive:['honoka_attack','一瞬の集中']},
 ueda_kana_work:{skills:['heal_one','kana_heal_all_25'],passive:['heal','みんなの笑顔']}
});
const NEW_UNIT_ARTWORK_V0850=Object.freeze({
 ginjo_cecil_work:{portrait:'assets/ART_V2/full_body/ginjo_cecil.png'},
 hasegawa_honoka_work:{portrait:'assets/ART_V2/full_body/hasegawa_honoka.png'},
 ueda_kana_work:{portrait:'assets/ART_V2/full_body/ueda_kana.png'}
});
const NEW_UNIT_BASE_STATS_V0850=Object.freeze({
 ueda_kana_work:Object.freeze({hp:165,atk:11,def:5,rate:1.65})
});
const NEW_UNIT_EFFECTS_V0850=Object.freeze({
 cecilDefensePercent:18,cecilDefenseSeconds:8,cecilTeamCtSeconds:1.8,
 honokaStrikeBase:26,honokaEnemyCtSeconds:2.0,honokaEnemyAttackDownPercent:15,honokaEnemyAttackDownSeconds:6,
 kanaSingleHeal:57,kanaAllHeal:25
});
