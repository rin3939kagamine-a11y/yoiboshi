/* 2026-11-18: SR alternate costumes batch12. Preserve original R units and all existing rates, save format and combat formulas. */
const SR_BATCH12_UNIT_IDS=Object.freeze(["chiaki_casual","himeno_salon","nanoka_delivery","kaname_soft","erika_mono","tsubaki_lab","kaede_library","kaho_gallery","ririka_studio","aone_backstage"]);
const SR_BATCH12_EXISTING_R_IDS=Object.freeze(["chiaki_work","himeno_work","nanoka_work","kaname_work","erika_work","tsubaki_work","kaede_work","sakakibara_kaho_work","minase_ririka_work","tokiwa_aone_work"]);
const NEW_UNIT_ROSTER_SR_BATCH12=Object.freeze([
  {
    "id": "chiaki_casual",
    "person": "chiaki",
    "title": "休日のきれいめコーデ",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "休日の異議申し立て",
      "甘味の鉄壁"
    ]
  },
  {
    "id": "himeno_salon",
    "person": "himeno",
    "title": "紅茶サロンの制服",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "香り立つお手当て",
      "ローズティーの癒やし"
    ]
  },
  {
    "id": "nanoka_delivery",
    "person": "nanoka",
    "title": "青果配達コーデ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "朝採れラッシュ",
      "配達一番乗り"
    ]
  },
  {
    "id": "kaname_soft",
    "person": "kaname",
    "title": "素顔の休日コーデ",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "素顔の激励",
      "休日の連携"
    ]
  },
  {
    "id": "erika_mono",
    "person": "erika",
    "title": "休日のモノトーン",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "モノトーンの号令",
      "休日の連携"
    ]
  },
  {
    "id": "tsubaki_lab",
    "person": "tsubaki",
    "title": "研究室の白衣",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "研究成果の一撃",
      "実験の追撃"
    ]
  },
  {
    "id": "kaede_library",
    "person": "kaede",
    "title": "司書風コーデ",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "書架の応急手当て",
      "図書室のぬくもり"
    ]
  },
  {
    "id": "kaho_gallery",
    "person": "sakakibara_kaho",
    "title": "ギャラリーの仕事着",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "展示室の激励",
      "光の導線"
    ]
  },
  {
    "id": "ririka_studio",
    "person": "minase_ririka",
    "title": "スタジオスタッフコーデ",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "衣装の応急手当て",
      "スタジオの癒やし"
    ]
  },
  {
    "id": "aone_backstage",
    "person": "tokiwa_aone",
    "title": "舞台裏のスタッフコーデ",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "舞台裏の号令",
      "次の一拍"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH12=Object.freeze({
  "chiaki_casual": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "弁護士の休息"
    ]
  },
  "himeno_salon": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "紅茶の心づかい"
    ]
  },
  "nanoka_delivery": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "attack",
      "商店街の元気"
    ]
  },
  "kaname_soft": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "柔らかな気づかい"
    ]
  },
  "erika_mono": {
    "skills": [
      "attack_up",
      "shield_all"
    ],
    "passive": [
      "team_start_atk",
      "静かな装い"
    ]
  },
  "tsubaki_lab": {
    "skills": [
      "single",
      "finisher"
    ],
    "passive": [
      "attack",
      "研究者の集中"
    ]
  },
  "kaede_library": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "読書のやすらぎ"
    ]
  },
  "kaho_gallery": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "展示の目配り"
    ]
  },
  "ririka_studio": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "細やかな衣装管理"
    ]
  },
  "aone_backstage": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "舞台裏の連携"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH12=Object.freeze({
  "chiaki_casual": {
    "portrait": "assets/UNIT_ART/chiaki_casual.webp?v=20261118-sr-batch12"
  },
  "himeno_salon": {
    "portrait": "assets/UNIT_ART/himeno_salon.webp?v=20261118-sr-batch12"
  },
  "nanoka_delivery": {
    "portrait": "assets/UNIT_ART/nanoka_delivery.webp?v=20261118-sr-batch12"
  },
  "kaname_soft": {
    "portrait": "assets/UNIT_ART/kaname_soft.webp?v=20261118-sr-batch12"
  },
  "erika_mono": {
    "portrait": "assets/UNIT_ART/erika_mono.webp?v=20261118-sr-batch12"
  },
  "tsubaki_lab": {
    "portrait": "assets/UNIT_ART/tsubaki_lab.webp?v=20261118-sr-batch12"
  },
  "kaede_library": {
    "portrait": "assets/UNIT_ART/kaede_library.webp?v=20261118-sr-batch12"
  },
  "kaho_gallery": {
    "portrait": "assets/UNIT_ART/kaho_gallery.webp?v=20261118-sr-batch12"
  },
  "ririka_studio": {
    "portrait": "assets/UNIT_ART/ririka_studio.webp?v=20261118-sr-batch12"
  },
  "aone_backstage": {
    "portrait": "assets/UNIT_ART/aone_backstage.webp?v=20261118-sr-batch12"
  }
});
