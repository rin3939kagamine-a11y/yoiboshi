/* 2026-11-17: SR costume batch6 for existing v0690 heroines.
 * Cards only; inherited R quest gates, existing units, calculations, rates and save format are unchanged.
 */
const SR_BATCH6_UNIT_IDS=Object.freeze(["kozue_kimono","yuu_leather","tsukasa_esports","azusa_maid","rion_gothic","komachi_tweed","seira_dress","aika_uniform","moe_dress","chako_knit"]);
const SR_BATCH6_EXISTING_R_IDS=Object.freeze(["kozue_work","yuu_work","tsukasa_work","azusa_work","rion_work","komachi_work","seira_work","aika_work","moe_work","chako_work"]);
const NEW_UNIT_ROSTER_SR_BATCH6=Object.freeze([
  {
    "id": "kozue_kimono",
    "person": "kozue",
    "title": "寄席の高座の着物ドレス",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "高座の守り芸",
      "笑顔の大団円"
    ]
  },
  {
    "id": "yuu_leather",
    "person": "yuu",
    "title": "ライブステージのレザー",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "ギターリフの一閃",
      "アンコール・ブレイク"
    ]
  },
  {
    "id": "tsukasa_esports",
    "person": "tsukasa",
    "title": "eスポーツのチームジャージ",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "勝利へのコール",
      "チームの連携指示"
    ]
  },
  {
    "id": "azusa_maid",
    "person": "azusa",
    "title": "猫カフェの特別制服",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "猫カフェの癒やし",
      "特製おもてなし"
    ]
  },
  {
    "id": "rion_gothic",
    "person": "rion",
    "title": "ゴシックホラーのドレス",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "黒薔薇の防壁",
      "夜闇のかばい手"
    ]
  },
  {
    "id": "komachi_tweed",
    "person": "komachi",
    "title": "ツイードジャケットの休日コーデ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "休日の一撃",
      "おしゃれな追撃"
    ]
  },
  {
    "id": "seira_dress",
    "person": "seira",
    "title": "点灯式のイブニングドレス",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "点灯式の祝福",
      "星灯りの支援"
    ]
  },
  {
    "id": "aika_uniform",
    "person": "aika",
    "title": "郵便局の窓口制服",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "心を届ける便り",
      "窓口の安心感"
    ]
  },
  {
    "id": "moe_dress",
    "person": "moe",
    "title": "旧家のパーティードレス",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "舞踏会の守護",
      "気品ある防衛"
    ]
  },
  {
    "id": "chako_knit",
    "person": "chako",
    "title": "手編みニットの新作ワンピース",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "編み目の連撃",
      "仕上げの一針"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH6=Object.freeze({
  "kozue_kimono": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "高座の度胸"
    ]
  },
  "yuu_leather": {
    "skills": [
      "single",
      "finisher"
    ],
    "passive": [
      "attack",
      "音への情熱"
    ]
  },
  "tsukasa_esports": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "試合前の集中"
    ]
  },
  "azusa_maid": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "猫たちのぬくもり"
    ]
  },
  "rion_gothic": {
    "skills": [
      "shield_one",
      "taunt"
    ],
    "passive": [
      "shield_low",
      "恐れない心"
    ]
  },
  "komachi_tweed": {
    "skills": [
      "single",
      "combo"
    ],
    "passive": [
      "combo_focus",
      "お出かけの高揚"
    ]
  },
  "seira_dress": {
    "skills": [
      "attack_up",
      "shield_all"
    ],
    "passive": [
      "team_start_atk",
      "灯りへの願い"
    ]
  },
  "aika_uniform": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "丁寧な手紙"
    ]
  },
  "moe_dress": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "名家の矜持"
    ]
  },
  "chako_knit": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "combo_focus",
      "手仕事の集中"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH6=Object.freeze({
  "kozue_kimono": {
    "portrait": "assets/UNIT_ART/kozue_kimono.webp?v=20261117-sr-batch6"
  },
  "yuu_leather": {
    "portrait": "assets/UNIT_ART/yuu_leather.webp?v=20261117-sr-batch6"
  },
  "tsukasa_esports": {
    "portrait": "assets/UNIT_ART/tsukasa_esports.webp?v=20261117-sr-batch6"
  },
  "azusa_maid": {
    "portrait": "assets/UNIT_ART/azusa_maid.webp?v=20261117-sr-batch6"
  },
  "rion_gothic": {
    "portrait": "assets/UNIT_ART/rion_gothic.webp?v=20261117-sr-batch6"
  },
  "komachi_tweed": {
    "portrait": "assets/UNIT_ART/komachi_tweed.webp?v=20261117-sr-batch6"
  },
  "seira_dress": {
    "portrait": "assets/UNIT_ART/seira_dress.webp?v=20261117-sr-batch6"
  },
  "aika_uniform": {
    "portrait": "assets/UNIT_ART/aika_uniform.webp?v=20261117-sr-batch6"
  },
  "moe_dress": {
    "portrait": "assets/UNIT_ART/moe_dress.webp?v=20261117-sr-batch6"
  },
  "chako_knit": {
    "portrait": "assets/UNIT_ART/chako_knit.webp?v=20261117-sr-batch6"
  }
});
