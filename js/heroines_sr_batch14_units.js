/* 2026-11-19: Final SR alternate costumes batch14. Additions only; keep existing R units, rates, save data and calculations unchanged. */
const SR_BATCH14_UNIT_IDS=Object.freeze(["mia_off","yua_room","ayaka_cool","sera_shift","hana_florist","anna_cafe","nemu_stream","miku_zakka","maki_boutique","yu_denim"]);
const SR_BATCH14_EXISTING_R_IDS=Object.freeze(["suzumiya_mia_work","yumemiya_yua_work","tsukimiya_ayaka_work","kuromiya_sera_work","haruno_hana_work","komiya_anna_work","hoshimiya_nemu_work","kumano_miku_work","ichijo_maki_work","natsukawa_yu_work"]);
const NEW_UNIT_ROSTER_SR_BATCH14=Object.freeze([
  {
    "id": "mia_off",
    "person": "suzumiya_mia",
    "title": "休日のピンクニット",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "ピンクニットのエール",
      "休日のチームワーク"
    ]
  },
  {
    "id": "yua_room",
    "person": "yumemiya_yua",
    "title": "オフの部屋着パーカー",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "オフの一撃",
      "リラックス・ラッシュ"
    ]
  },
  {
    "id": "ayaka_cool",
    "person": "tsukimiya_ayaka",
    "title": "クールなライダースコーデ",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "クールな応急手当て",
      "ライダースのぬくもり"
    ]
  },
  {
    "id": "sera_shift",
    "person": "kuromiya_sera",
    "title": "ショップ店員のシフトコーデ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "シフトの一閃",
      "ショップの決定打"
    ]
  },
  {
    "id": "hana_florist",
    "person": "haruno_hana",
    "title": "花屋のエプロン仕事着",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "花束のお手当て",
      "春風の花びら"
    ]
  },
  {
    "id": "anna_cafe",
    "person": "komiya_anna",
    "title": "カフェの制服",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "カフェの応援",
      "息ぴったりの連携"
    ]
  },
  {
    "id": "nemu_stream",
    "person": "hoshimiya_nemu",
    "title": "深夜配信のパーカー",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "深夜の一撃",
      "配信ラストスパート"
    ]
  },
  {
    "id": "miku_zakka",
    "person": "kumano_miku",
    "title": "雑貨店のエプロンコーデ",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "雑貨店のエール",
      "お店の防壁"
    ]
  },
  {
    "id": "maki_boutique",
    "person": "ichijo_maki",
    "title": "ブティック店員のコーデ",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "コーデ相談の手当て",
      "やさしい包み込み"
    ]
  },
  {
    "id": "yu_denim",
    "person": "natsukawa_yu",
    "title": "デニムショップの店員コーデ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "デニムの一閃",
      "ショップの連撃"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH14=Object.freeze({
  "mia_off": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "休日の気づかい"
    ]
  },
  "yua_room": {
    "skills": [
      "single",
      "combo"
    ],
    "passive": [
      "attack",
      "素顔の情熱"
    ]
  },
  "ayaka_cool": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "静かな優しさ"
    ]
  },
  "sera_shift": {
    "skills": [
      "single",
      "finisher"
    ],
    "passive": [
      "attack",
      "接客の集中力"
    ]
  },
  "hana_florist": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "花を届ける心"
    ]
  },
  "anna_cafe": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "あたたかなおもてなし"
    ]
  },
  "nemu_stream": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "attack",
      "眠らない集中"
    ]
  },
  "miku_zakka": {
    "skills": [
      "attack_up",
      "shield_all"
    ],
    "passive": [
      "team_start_atk",
      "ふんわりした気配り"
    ]
  },
  "maki_boutique": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "頼れる目配り"
    ]
  },
  "yu_denim": {
    "skills": [
      "single",
      "combo"
    ],
    "passive": [
      "attack",
      "まっすぐな接客"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH14=Object.freeze({
  "mia_off": {
    "portrait": "assets/UNIT_ART/mia_off.webp?v=20261119-sr-batch14"
  },
  "yua_room": {
    "portrait": "assets/UNIT_ART/yua_room.webp?v=20261119-sr-batch14"
  },
  "ayaka_cool": {
    "portrait": "assets/UNIT_ART/ayaka_cool.webp?v=20261119-sr-batch14"
  },
  "sera_shift": {
    "portrait": "assets/UNIT_ART/sera_shift.webp?v=20261119-sr-batch14"
  },
  "hana_florist": {
    "portrait": "assets/UNIT_ART/hana_florist.webp?v=20261119-sr-batch14"
  },
  "anna_cafe": {
    "portrait": "assets/UNIT_ART/anna_cafe.webp?v=20261119-sr-batch14"
  },
  "nemu_stream": {
    "portrait": "assets/UNIT_ART/nemu_stream.webp?v=20261119-sr-batch14"
  },
  "miku_zakka": {
    "portrait": "assets/UNIT_ART/miku_zakka.webp?v=20261119-sr-batch14"
  },
  "maki_boutique": {
    "portrait": "assets/UNIT_ART/maki_boutique.webp?v=20261119-sr-batch14"
  },
  "yu_denim": {
    "portrait": "assets/UNIT_ART/yu_denim.webp?v=20261119-sr-batch14"
  }
});
