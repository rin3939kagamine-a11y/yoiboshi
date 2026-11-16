/* Seven user-approved R units v0960. All q6, normal gacha, existing handler reuse. */
const NEW_UNIT_ROSTER_V0960=Object.freeze([
 {
  "id": "kuromiya_sera_work",
  "person": "kuromiya_sera",
  "title": "黒い青の一閃",
  "rarity": "R",
  "role": "attacker",
  "color": "#5a649e",
  "gate": "q6",
  "s": [
   "夜色の一撃",
   "蒼い嵐"
  ]
 },
 {
  "id": "haruno_hana_work",
  "person": "haruno_hana",
  "title": "春花の手当て",
  "rarity": "R",
  "role": "healer",
  "color": "#c0a0d9",
  "gate": "q6",
  "s": [
   "花束のぬくもり",
   "春風の癒し"
  ]
 },
 {
  "id": "komiya_anna_work",
  "person": "komiya_anna",
  "title": "いつものカフェで",
  "rarity": "R",
  "role": "support",
  "color": "#df99c8",
  "gate": "q6",
  "s": [
   "あんなのスマイル",
   "息ぴったりの時間"
  ]
 },
 {
  "id": "hoshimiya_nemu_work",
  "person": "hoshimiya_nemu",
  "title": "眠らぬ挑戦者",
  "rarity": "R",
  "role": "attacker",
  "color": "#e2a3cd",
  "gate": "q6",
  "s": [
   "もう一戦！",
   "夜明けの一撃"
  ]
 },
 {
  "id": "kumano_miku_work",
  "person": "kumano_miku",
  "title": "パンダの応援",
  "rarity": "R",
  "role": "support",
  "color": "#98a8b0",
  "gate": "q6",
  "s": [
   "みくの声援",
   "ふんわりガード"
  ]
 },
 {
  "id": "ichijo_maki_work",
  "person": "ichijo_maki",
  "title": "頼れるコーデ相談",
  "rarity": "R",
  "role": "healer",
  "color": "#d4b59f",
  "gate": "q6",
  "s": [
   "まきの包み込む手当て",
   "大切な一人へ"
  ]
 },
 {
  "id": "natsukawa_yu_work",
  "person": "natsukawa_yu",
  "title": "笑顔のデニム",
  "rarity": "R",
  "role": "attacker",
  "color": "#6c98b6",
  "gate": "q6",
  "s": [
   "姉御のブレイク",
   "手を振って前進！"
  ]
 }
]);
const NEW_UNIT_DESIGN_V0960=Object.freeze({
 "kuromiya_sera_work": {
  "skills": [
   "single",
   "rio_aoe_18"
  ],
  "passive": [
   "v0950_attack",
   "夜色の洞察"
  ]
 },
 "haruno_hana_work": {
  "skills": [
   "v0960_hana_heal_def",
   "marika_heal_all_22"
  ],
  "passive": [
   "v0950_heal",
   "花を届ける心"
  ]
 },
 "komiya_anna_work": {
  "skills": [
   "v0950_mia_attack",
   "cecil_team_ct"
  ],
  "passive": [
   "v0950_buff",
   "いつもの気配り"
  ]
 },
 "hoshimiya_nemu_work": {
  "skills": [
   "v0960_nemu_strike_atk",
   "v0960_single_22"
  ],
  "passive": [
   "v0950_attack",
   "諦めない気持ち"
  ]
 },
 "kumano_miku_work": {
  "skills": [
   "v0950_mia_attack",
   "v0960_miku_defense"
  ],
  "passive": [
   "v0950_buff",
   "ゆるいけど本気"
  ]
 },
 "ichijo_maki_work": {
  "skills": [
   "v0960_maki_heal_atk",
   "marika_heal_one_65"
  ],
  "passive": [
   "v0950_heal",
   "お姉さんの優しさ"
  ]
 },
 "natsukawa_yu_work": {
  "skills": [
   "v0950_aoba_strike_def",
   "rio_aoe_18"
  ],
  "passive": [
   "v0950_attack",
   "まっすぐな一歩"
  ]
 }
});
const NEW_UNIT_ARTWORK_V0960=Object.freeze(Object.fromEntries(NEW_UNIT_ROSTER_V0960.map(u=>[u.id,{portrait:'assets/ART_V2/full_body/'+u.person+'.png'}])));
const NEW_UNIT_EFFECTS_V0960=Object.freeze({healBig:65,healSmall:22,hanaDefensePercent:12,hanaDefenseSeconds:8,nemuStrike:30,nemuAttackPercent:15,nemuAttackSeconds:6,mikuDefensePercent:12,mikuDefenseSeconds:8,makiAttackPercent:12,makiAttackSeconds:8});
