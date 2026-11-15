/* 2026-11-15: PR #59 approved characters, stage 2. Exact approved SR base
 * values (LV1/LB0); uses existing support/healer/attacker role stats.
 * Unrelated save, pity, rarity rates, prior units and narrative remain unchanged.
 */
const NEW_UNIT_ROSTER_V0860=Object.freeze([
 {id:'takamiya_sayaka_work',person:'takamiya_sayaka',title:'灯のともるフロント',rarity:'R',role:'support',color:'#41536a',s:['旅路へのエール','夜港のエスコート']},
 {id:'shirase_marika_work',person:'shirase_marika',title:'やさしさを包んで',rarity:'R',role:'healer',color:'#d4baca',s:['みんなに焼き菓子を','あなたへのひと包み']},
 {id:'miyoshi_nanami_work',person:'miyoshi_nanami',title:'まっすぐな言葉',rarity:'R',role:'attacker',color:'#5b9ac3',s:['真実の一筆','伝える勇気']},
 {id:'hayase_rio_work',person:'hayase_rio',title:'最高の一曲',rarity:'R',role:'attacker',color:'#f087ab',s:['ビートアップ！','フルパワー・ステップ']}
]);
const NEW_UNIT_DESIGN_V0860=Object.freeze({
 takamiya_sayaka_work:{skills:['sayaka_team_attack_up','sayaka_team_defense_up'],passive:['sayaka_buff','旅先への気配り']},
 shirase_marika_work:{skills:['marika_heal_all_22','marika_heal_one_65'],passive:['marika_rescue','包むような優しさ']},
 miyoshi_nanami_work:{skills:['nanami_strike_26','nanami_attack_down'],passive:['nanami_debuff_extend','言葉の余白']},
 hayase_rio_work:{skills:['rio_strike_self_attack','rio_aoe_18'],passive:['rio_attack','熱量あふれるステップ']}
});
const NEW_UNIT_ARTWORK_V0860=Object.freeze({
 takamiya_sayaka_work:{portrait:'assets/ART_V2/full_body/takamiya_sayaka.png'},
 shirase_marika_work:{portrait:'assets/ART_V2/full_body/shirase_marika.png'},
 miyoshi_nanami_work:{portrait:'assets/ART_V2/full_body/miyoshi_nanami.png'},
 hayase_rio_work:{portrait:'assets/ART_V2/full_body/hayase_rio.png'}
});
const NEW_UNIT_EFFECTS_V0860=Object.freeze({
 sayakaAttackPercent:18,sayakaDefensePercent:18,sayakaBuffSeconds:8,
 marikaHealAll:22,marikaHealOne:65,
 nanamiStrikeBase:26,nanamiAttackDownPercent:28,nanamiAttackDownSeconds:8,
 rioStrikeBase:26,rioSelfAttackPercent:15,rioSelfAttackSeconds:6,rioAoeBase:18
});
