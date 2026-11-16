/* 2026-11-16: five approved R units, normal pool and q6 gate.
 * Approved values are implemented by existing skill handlers or isolated v0950 cases.
 */
const NEW_UNIT_ROSTER_V0950=Object.freeze([
 {id:'shiromiya_kotori_work',person:'shiromiya_kotori',title:'しおりに宿る癒し',rarity:'R',role:'healer',color:'#d4b8dc',gate:'q6',s:['ページのぬくもり','みんなで一休み']},
 {id:'hayakawa_aoba_work',person:'hayakawa_aoba',title:'ピースで決める一撃',rarity:'R',role:'attacker',color:'#68a2df',gate:'q6',s:['ストリート・ブレイク','青空のステップ']},
 {id:'suzumiya_mia_work',person:'suzumiya_mia',title:'猫手の応援',rarity:'R',role:'support',color:'#c6a1c9',gate:'q6',s:['みあのエールにゃ♪','みんなで猫ステップ']},
 {id:'yumemiya_yua_work',person:'yumemiya_yua',title:'攻めのセンター',rarity:'R',role:'attacker',color:'#efb5d5',gate:'q6',s:['センターの一閃','アンコール・ラッシュ']},
 {id:'tsukimiya_ayaka_work',person:'tsukimiya_ayaka',title:'蝶が包む月明かり',rarity:'R',role:'healer',color:'#b3a6d6',gate:'q6',s:['蝶の癒しの輪','月下のやすらぎ']}
]);
const NEW_UNIT_DESIGN_V0950=Object.freeze({
 shiromiya_kotori_work:{skills:['v0950_kotori_heal_atk','v0950_kotori_heal_ct'],passive:['v0950_heal','本に込めた優しさ']},
 hayakawa_aoba_work:{skills:['v0950_aoba_strike_def','rio_aoe_18'],passive:['v0950_attack','自由な一歩']},
 suzumiya_mia_work:{skills:['v0950_mia_attack','cecil_team_ct'],passive:['v0950_buff','猫の気配り']},
 yumemiya_yua_work:{skills:['single','v0950_yua_strike_atk'],passive:['v0950_attack','センターの熱量']},
 tsukimiya_ayaka_work:{skills:['v0950_ayaka_heal_def','v0950_ayaka_heal_cleanse'],passive:['v0950_heal','月明かりの手当て']}
});
const NEW_UNIT_ARTWORK_V0950=Object.freeze(Object.fromEntries(NEW_UNIT_ROSTER_V0950.map(u=>[u.id,{
 portrait:'assets/ART_V2/full_body/'+u.person+'.png'
}])));
const NEW_UNIT_EFFECTS_V0950=Object.freeze({
 bigHeal:65,smallHeal:22,healAttackPercent:12,healAttackSeconds:8,teamCtSeconds:1.2,
 aobaStrike:30,aobaDefenseDownPercent:15,aobaDefenseDownSeconds:6,
 miaAttackPercent:18,miaAttackSeconds:8,
 yuaStrike:22,yuaAttackPercent:15,yuaAttackSeconds:6,
 ayakaDefensePercent:12,ayakaDefenseSeconds:8
});
