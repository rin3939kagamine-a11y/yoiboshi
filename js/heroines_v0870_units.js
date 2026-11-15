/* PR #32/#36 approved 7 SR units, stage 2.
 * Reuse prior approved skill implementations when numeric effects match.
 * Only the three new effects are separately implemented in applySkill.
 * Role base stats, save schema, old units, gacha rates remain unchanged.
 */
const NEW_UNIT_ROSTER_V0870=Object.freeze([
 {id:'aizawa_noa_work',person:'aizawa_noa',title:'心ほどけるカフェ',rarity:'SR',role:'support',color:'#d6c4ac',gate:'q6',s:['朝のエール','ほっとひと息']},
 {id:'yukishiro_mio_work',person:'yukishiro_mio',title:'銀月のまなざし',rarity:'SR',role:'attacker',color:'#7d7b9b',gate:'q6',s:['銀月の一閃','静寂の帳']},
 {id:'shiratori_yuzuha_work',person:'shiratori_yuzuha',title:'明日へのステップ',rarity:'SR',role:'support',color:'#d67eae',gate:'q6',s:['リズムに乗って','ステージを守る光']},
 {id:'tsukishima_shino_work',person:'tsukishima_shino',title:'小さな気配り',rarity:'SR',role:'healer',color:'#a38fc4',gate:'q6',s:['あなたに一杯','みんなでひと休み']},
 {id:'hanasaki_rena_work',person:'hanasaki_rena',title:'頼れるナース',rarity:'SR',role:'support',color:'#d96774',gate:'q6',s:['ナースの指揮','みんなのケア']},
 {id:'takamine_rino_work',person:'takamine_rino',title:'やさしい手当て',rarity:'SR',role:'healer',color:'#7faed6',gate:'q6',s:['みんなに手当て','あなただけのケア']},
 {id:'hoshino_emiri_work',person:'hoshino_emiri',title:'黒薔薇の約束',rarity:'SR',role:'attacker',color:'#74536f',gate:'q6',s:['黒薔薇の鼓動','夜の微笑み']}
]);
const NEW_UNIT_DESIGN_V0870=Object.freeze({
 aizawa_noa_work:{skills:['sayaka_team_attack_up','kana_heal_all_25'],passive:['sayaka_buff','あたたかな声かけ']},
 yukishiro_mio_work:{skills:['honoka_strike_ct','honoka_enemy_attack_down_all'],passive:['rio_attack','冷静な集中力']},
 shiratori_yuzuha_work:{skills:['cecil_team_ct','sayaka_team_defense_up'],passive:['sayaka_buff','ステージの気配り']},
 tsukishima_shino_work:{skills:['marika_heal_one_65','marika_heal_all_22'],passive:['marika_rescue','そっと支える手']},
 hanasaki_rena_work:{skills:['rena_defense_up_22','rena_cleanse_heal_all_30'],passive:['sayaka_buff','頼れるリーダー']},
 takamine_rino_work:{skills:['kana_heal_all_25','rino_cleanse_heal_one_57'],passive:['heal','やさしいケア']},
 hoshino_emiri_work:{skills:['rio_strike_self_attack','nanami_attack_down'],passive:['nanami_debuff_extend','黒薔薇の余韻']}
});
const NEW_UNIT_ARTWORK_V0870=Object.freeze(Object.fromEntries(NEW_UNIT_ROSTER_V0870.map(u=>[
 u.id,{portrait:'assets/ART_V2/full_body/'+u.person+'.png'}
])));
const NEW_UNIT_EFFECTS_V0870=Object.freeze({renaDefensePercent:22,renaDefenseSeconds:8,renaHealAll:30,rinoCleanseHealOne:57});
