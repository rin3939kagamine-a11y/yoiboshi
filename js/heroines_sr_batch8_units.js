/* 2026-11-18: SR costume batch8 for existing v0690 heroines.
 * Adds costume cards only; inherit existing R unlock gates. Existing units, math, rates and saves remain unchanged.
 */
const SR_BATCH8_UNIT_IDS=Object.freeze(["mikan_orange","mahiru_campus","airi_uniform","shieru_silver","tsumugi_apron","mirei_delivery","ui_happi","miharu_suit","konatsu_staff","rinka_recital"]);
const SR_BATCH8_EXISTING_R_IDS=Object.freeze(["mikan_work","mahiru_work","airi_work","shieru_work","tsumugi_work","mirei_work","ui_work","miharu_work","konatsu_work","rinka_work"]);
const NEW_UNIT_ROSTER_SR_BATCH8=Object.freeze([
  {
    "id": "mikan_orange",
    "person": "mikan",
    "title": "オレンジのソロステージ",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "オレンジの防衛ライン",
      "ソロステージの守護"
    ]
  },
  {
    "id": "mahiru_campus",
    "person": "mahiru",
    "title": "春のキャンパスコーデ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "新学期の一撃",
      "春風の追撃"
    ]
  },
  {
    "id": "airi_uniform",
    "person": "airi",
    "title": "パンケーキ店の制服",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "焼きたての声援",
      "お店のチームワーク"
    ]
  },
  {
    "id": "shieru_silver",
    "person": "shieru",
    "title": "白銀のゴシックドレス",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "白銀の癒やし",
      "ゴシック・アンコール"
    ]
  },
  {
    "id": "tsumugi_apron",
    "person": "tsumugi",
    "title": "絵の具の作業エプロン",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "絵筆の守り",
      "パレットの防壁"
    ]
  },
  {
    "id": "mirei_delivery",
    "person": "mirei",
    "title": "ピザ配達の制服",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "配達のスピードアタック",
      "ラストオーダーの一撃"
    ]
  },
  {
    "id": "ui_happi",
    "person": "ui",
    "title": "商店街祭りの法被",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "お祭りの景気づけ",
      "商店街の連携"
    ]
  },
  {
    "id": "miharu_suit",
    "person": "miharu",
    "title": "式典のフォーマルスーツ",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "式典の応急手当",
      "秘書の細やかなケア"
    ]
  },
  {
    "id": "konatsu_staff",
    "person": "konatsu",
    "title": "遊園地スタッフの制服",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "遊園地の安全係",
      "パークを守る盾"
    ]
  },
  {
    "id": "rinka_recital",
    "person": "rinka",
    "title": "発表会のロングドレス",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "鍵盤の連撃",
      "フィナーレの一音"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH8=Object.freeze({
  "mikan_orange": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "ステージの度胸"
    ]
  },
  "mahiru_campus": {
    "skills": [
      "single",
      "combo"
    ],
    "passive": [
      "combo_focus",
      "学びへの情熱"
    ]
  },
  "airi_uniform": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "甘い気配り"
    ]
  },
  "shieru_silver": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "歌声のぬくもり"
    ]
  },
  "tsumugi_apron": {
    "skills": [
      "shield_one",
      "taunt"
    ],
    "passive": [
      "shield_low",
      "描き続ける集中"
    ]
  },
  "mirei_delivery": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "combo_focus",
      "街を駆ける軽やかさ"
    ]
  },
  "ui_happi": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "人をつなぐ笑顔"
    ]
  },
  "miharu_suit": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "支える心配り"
    ]
  },
  "konatsu_staff": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "安全第一の心得"
    ]
  },
  "rinka_recital": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "combo_focus",
      "練習の積み重ね"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH8=Object.freeze({
  "mikan_orange": {
    "portrait": "assets/UNIT_ART/mikan_orange.webp?v=20261118-sr-batch8"
  },
  "mahiru_campus": {
    "portrait": "assets/UNIT_ART/mahiru_campus.webp?v=20261118-sr-batch8"
  },
  "airi_uniform": {
    "portrait": "assets/UNIT_ART/airi_uniform.webp?v=20261118-sr-batch8"
  },
  "shieru_silver": {
    "portrait": "assets/UNIT_ART/shieru_silver.webp?v=20261118-sr-batch8"
  },
  "tsumugi_apron": {
    "portrait": "assets/UNIT_ART/tsumugi_apron.webp?v=20261118-sr-batch8"
  },
  "mirei_delivery": {
    "portrait": "assets/UNIT_ART/mirei_delivery.webp?v=20261118-sr-batch8"
  },
  "ui_happi": {
    "portrait": "assets/UNIT_ART/ui_happi.webp?v=20261118-sr-batch8"
  },
  "miharu_suit": {
    "portrait": "assets/UNIT_ART/miharu_suit.webp?v=20261118-sr-batch8"
  },
  "konatsu_staff": {
    "portrait": "assets/UNIT_ART/konatsu_staff.webp?v=20261118-sr-batch8"
  },
  "rinka_recital": {
    "portrait": "assets/UNIT_ART/rinka_recital.webp?v=20261118-sr-batch8"
  }
});
