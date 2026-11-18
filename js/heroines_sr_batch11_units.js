/* 2026-11-18: SR costume batch11 for existing v0750-v0780 heroines.
 * Additional costume units only. Existing R gates, units, formulas, rarity rates and save format are unchanged.
 */
const SR_BATCH11_UNIT_IDS=Object.freeze(["yura_okami","setsuna_casual","emiri_uniform","yue_field","madoka_happi","seri_live","hatsune_apron","minto_casual","nagomi_atelier","ribon_pancake"]);
const SR_BATCH11_EXISTING_R_IDS=Object.freeze(["yura_work","setsuna_work","emiri_work","yue_work","madoka_work","seri_work","hatsune_work","minto_work","nagomi_work","ribon_work"]);
const NEW_UNIT_ROSTER_SR_BATCH11=Object.freeze([
  {
    "id": "yura_okami",
    "person": "yura",
    "title": "若女将の割烹着",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "若女将のお手当て",
      "おもてなしの温もり"
    ]
  },
  {
    "id": "setsuna_casual",
    "person": "setsuna",
    "title": "休日のカジュアル",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "休日の守り",
      "ひと休みの防壁"
    ]
  },
  {
    "id": "emiri_uniform",
    "person": "emiri",
    "title": "カラオケ店の制服",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "アンコールの一撃",
      "採点フィニッシュ"
    ]
  },
  {
    "id": "yue_field",
    "person": "yue",
    "title": "民俗調査コーデ",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "フィールド調査の合図",
      "伝承の連携"
    ]
  },
  {
    "id": "madoka_happi",
    "person": "madoka",
    "title": "射的屋の法被",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "射的の速射",
      "景品狙いの一撃"
    ]
  },
  {
    "id": "seri_live",
    "person": "seri",
    "title": "ライブステージ衣装",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "熱狂の一打",
      "クラッシュ・フィニッシュ"
    ]
  },
  {
    "id": "hatsune_apron",
    "person": "hatsune",
    "title": "大家さんのエプロン",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "大家さんの差し入れ",
      "縁側の手当て"
    ]
  },
  {
    "id": "minto_casual",
    "person": "minto",
    "title": "休日のチェックワンピース",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "休日の応援",
      "友達の連携"
    ]
  },
  {
    "id": "nagomi_atelier",
    "person": "nagomi",
    "title": "調香アトリエの仕事着",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "アロマの手当て",
      "やすらぎの香り"
    ]
  },
  {
    "id": "ribon_pancake",
    "person": "ribon",
    "title": "パンケーキ屋の制服",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "甘い激励",
      "リボンの連携"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH11=Object.freeze({
  "yura_okami": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "割烹の心づかい"
    ]
  },
  "setsuna_casual": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "静かな覚悟"
    ]
  },
  "emiri_uniform": {
    "skills": [
      "single",
      "finisher"
    ],
    "passive": [
      "attack",
      "響く歌声"
    ]
  },
  "yue_field": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "調査ノートの知恵"
    ]
  },
  "madoka_happi": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "combo_focus",
      "的を射抜く集中"
    ]
  },
  "seri_live": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "attack",
      "ライブの高揚"
    ]
  },
  "hatsune_apron": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "世話好きな心"
    ]
  },
  "minto_casual": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "小さな気づかい"
    ]
  },
  "nagomi_atelier": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "穏やかな調香"
    ]
  },
  "ribon_pancake": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "笑顔のおもてなし"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH11=Object.freeze({
  "yura_okami": {
    "portrait": "assets/UNIT_ART/yura_okami.webp?v=20261118-sr-batch11"
  },
  "setsuna_casual": {
    "portrait": "assets/UNIT_ART/setsuna_casual.webp?v=20261118-sr-batch11"
  },
  "emiri_uniform": {
    "portrait": "assets/UNIT_ART/emiri_uniform.webp?v=20261118-sr-batch11"
  },
  "yue_field": {
    "portrait": "assets/UNIT_ART/yue_field.webp?v=20261118-sr-batch11"
  },
  "madoka_happi": {
    "portrait": "assets/UNIT_ART/madoka_happi.webp?v=20261118-sr-batch11"
  },
  "seri_live": {
    "portrait": "assets/UNIT_ART/seri_live.webp?v=20261118-sr-batch11"
  },
  "hatsune_apron": {
    "portrait": "assets/UNIT_ART/hatsune_apron.webp?v=20261118-sr-batch11"
  },
  "minto_casual": {
    "portrait": "assets/UNIT_ART/minto_casual.webp?v=20261118-sr-batch11"
  },
  "nagomi_atelier": {
    "portrait": "assets/UNIT_ART/nagomi_atelier.webp?v=20261118-sr-batch11"
  },
  "ribon_pancake": {
    "portrait": "assets/UNIT_ART/ribon_pancake.webp?v=20261118-sr-batch11"
  }
});
