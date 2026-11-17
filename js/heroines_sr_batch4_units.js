/* 2026-11-17: SR costume batch4 for existing v0690 heroines.
 * Add costume cards only. Existing character records, other cards, gacha rates,
 * save format, calculations and v0690 quest gates are unchanged.
 */
const SR_BATCH4_UNIT_IDS=Object.freeze(["mimi_silver","tia_staff","kanon_party","mikoto_stand","sakura_nurse","subaru_coat","mira_rose","nozomi_counter","tomoe_diy","chisato_bank"]);
const SR_BATCH4_EXISTING_R_IDS=Object.freeze(["mimi_work","tia_work","kanon_work","mikoto_work","sakura_work","subaru_work","mira_work","nozomi_work","tomoe_work","chisato_work"]);
const NEW_UNIT_ROSTER_SR_BATCH4=Object.freeze([
  {
    "id": "mimi_silver",
    "person": "mimi",
    "title": "白銀のショードレス",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "白銀のドレスガード",
      "銀光の守護"
    ]
  },
  {
    "id": "tia_staff",
    "person": "tia",
    "title": "ゲーセン店員制服",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "ゲームセンターの連撃",
      "クレーン一発勝負"
    ]
  },
  {
    "id": "kanon_party",
    "person": "kanon",
    "title": "周年パーティードレス",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "周年の乾杯",
      "祝宴の段取り"
    ]
  },
  {
    "id": "mikoto_stand",
    "person": "mikoto",
    "title": "ジューススタンドの仕事着",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "フレッシュ・チャージ",
      "果実の差し入れ"
    ]
  },
  {
    "id": "sakura_nurse",
    "person": "sakura",
    "title": "看護師の白衣",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "白衣のかばい手",
      "ナースステーションの守り"
    ]
  },
  {
    "id": "subaru_coat",
    "person": "subaru",
    "title": "薬剤師の白衣",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "白衣の調合",
      "処方箋の急所"
    ]
  },
  {
    "id": "mira_rose",
    "person": "mira",
    "title": "黒薔薇館の接客制服",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "黒薔薇のおもてなし",
      "夜館の守り唄"
    ]
  },
  {
    "id": "nozomi_counter",
    "person": "nozomi",
    "title": "美容部員の制服",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "肌をいたわる一滴",
      "カウンターの手当て"
    ]
  },
  {
    "id": "tomoe_diy",
    "person": "tomoe",
    "title": "ホームセンターの制服",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "工具箱の盾",
      "現場の安全確認"
    ]
  },
  {
    "id": "chisato_bank",
    "person": "chisato",
    "title": "宵星銀行の窓口制服",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "窓口の確かな判断",
      "決算の一撃"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH4=Object.freeze({
  "mimi_silver": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "舞台の度胸"
    ]
  },
  "tia_staff": {
    "skills": [
      "combo",
      "stun"
    ],
    "passive": [
      "combo_focus",
      "ゲームの集中力"
    ]
  },
  "kanon_party": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "特別な祝福"
    ]
  },
  "mikoto_stand": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "果実の元気"
    ]
  },
  "sakura_nurse": {
    "skills": [
      "shield_one",
      "taunt"
    ],
    "passive": [
      "shield_low",
      "誰かを守る手"
    ]
  },
  "subaru_coat": {
    "skills": [
      "def_down",
      "pierce"
    ],
    "passive": [
      "pierce_focus",
      "処方の見極め"
    ]
  },
  "mira_rose": {
    "skills": [
      "attack_up",
      "shield_all"
    ],
    "passive": [
      "team_start_atk",
      "黒薔薇館の気配り"
    ]
  },
  "nozomi_counter": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "繊細な美容の心得"
    ]
  },
  "tomoe_diy": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "安全第一"
    ]
  },
  "chisato_bank": {
    "skills": [
      "single",
      "finisher"
    ],
    "passive": [
      "attack",
      "数字を読む目"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH4=Object.freeze({
  "mimi_silver": {
    "portrait": "assets/UNIT_ART/mimi_silver.webp?v=20261117-sr-batch4"
  },
  "tia_staff": {
    "portrait": "assets/UNIT_ART/tia_staff.webp?v=20261117-sr-batch4"
  },
  "kanon_party": {
    "portrait": "assets/UNIT_ART/kanon_party.webp?v=20261117-sr-batch4"
  },
  "mikoto_stand": {
    "portrait": "assets/UNIT_ART/mikoto_stand.webp?v=20261117-sr-batch4"
  },
  "sakura_nurse": {
    "portrait": "assets/UNIT_ART/sakura_nurse.webp?v=20261117-sr-batch4"
  },
  "subaru_coat": {
    "portrait": "assets/UNIT_ART/subaru_coat.webp?v=20261117-sr-batch4"
  },
  "mira_rose": {
    "portrait": "assets/UNIT_ART/mira_rose.webp?v=20261117-sr-batch4"
  },
  "nozomi_counter": {
    "portrait": "assets/UNIT_ART/nozomi_counter.webp?v=20261117-sr-batch4"
  },
  "tomoe_diy": {
    "portrait": "assets/UNIT_ART/tomoe_diy.webp?v=20261117-sr-batch4"
  },
  "chisato_bank": {
    "portrait": "assets/UNIT_ART/chisato_bank.webp?v=20261117-sr-batch4"
  }
});
