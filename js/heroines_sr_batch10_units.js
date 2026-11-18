/* 2026-11-18: SR costume batch10 for existing v0690-v0750 heroines.
 * Additional costumes only. Inherit existing R unlock gates; unchanged existing units, rates, combat math and save format.
 */
const SR_BATCH10_UNIT_IDS=Object.freeze(["kanna_sommelier","ramu_sweet","noi_stage","sumika_tailor","reika_archive","hono_outdoor","nodoka_apron","aki_dance","shigure_white","mashiro_crepe"]);
const SR_BATCH10_EXISTING_R_IDS=Object.freeze(["kanna_work","ramu_work","noi_work","sumika_work","reika_work","hono_work","nodoka_work","aki_work","shigure_work","mashiro_work"]);
const NEW_UNIT_ROSTER_SR_BATCH10=Object.freeze([
  {
    "id": "kanna_sommelier",
    "person": "kanna",
    "title": "ソムリエの仕事着",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "ワインセラーの防壁",
      "熟成の守り"
    ]
  },
  {
    "id": "ramu_sweet",
    "person": "ramu",
    "title": "休日の甘ロリ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "甘い一撃",
      "フリルの連撃"
    ]
  },
  {
    "id": "noi_stage",
    "person": "noi",
    "title": "DJステージ衣装",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "ビートの号令",
      "フロアの一体感"
    ]
  },
  {
    "id": "sumika_tailor",
    "person": "sumika",
    "title": "仕立て屋風コーデ",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "仕立ての応援",
      "針仕事の連携"
    ]
  },
  {
    "id": "reika_archive",
    "person": "reika",
    "title": "資料館の仕事着",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "資料館の応急手当",
      "記録のぬくもり"
    ]
  },
  {
    "id": "hono_outdoor",
    "person": "hono",
    "title": "アウトドア店の制服",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "アウトドアの守り",
      "キャンプの防壁"
    ]
  },
  {
    "id": "nodoka_apron",
    "person": "nodoka",
    "title": "刺しゅう工房のエプロン",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "ひと針の癒やし",
      "刺しゅうの温もり"
    ]
  },
  {
    "id": "aki_dance",
    "person": "aki",
    "title": "ダンスステージ衣装",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "ステップの連撃",
      "フィニッシュ・ダンス"
    ]
  },
  {
    "id": "shigure_white",
    "person": "shigure",
    "title": "休日の白コーデ",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "白日の激励",
      "静かな連携"
    ]
  },
  {
    "id": "mashiro_crepe",
    "person": "mashiro",
    "title": "クレープ屋の制服",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "ホイップの守り",
      "甘い防衛線"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH10=Object.freeze({
  "kanna_sommelier": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "ソムリエの目利き"
    ]
  },
  "ramu_sweet": {
    "skills": [
      "single",
      "combo"
    ],
    "passive": [
      "combo_focus",
      "休日の遊び心"
    ]
  },
  "noi_stage": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "音をつなぐ感性"
    ]
  },
  "sumika_tailor": {
    "skills": [
      "attack_up",
      "shield_all"
    ],
    "passive": [
      "team_start_atk",
      "ほどけない気配り"
    ]
  },
  "reika_archive": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "丁寧な資料管理"
    ]
  },
  "hono_outdoor": {
    "skills": [
      "shield_one",
      "taunt"
    ],
    "passive": [
      "shield_low",
      "頼れる野外の知恵"
    ]
  },
  "nodoka_apron": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "糸に込める心"
    ]
  },
  "aki_dance": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "combo_focus",
      "踊りへの情熱"
    ]
  },
  "shigure_white": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "休日の優しさ"
    ]
  },
  "mashiro_crepe": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "お店の気配り"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH10=Object.freeze({
  "kanna_sommelier": {
    "portrait": "assets/UNIT_ART/kanna_sommelier.webp?v=20261118-sr-batch10"
  },
  "ramu_sweet": {
    "portrait": "assets/UNIT_ART/ramu_sweet.webp?v=20261118-sr-batch10"
  },
  "noi_stage": {
    "portrait": "assets/UNIT_ART/noi_stage.webp?v=20261118-sr-batch10"
  },
  "sumika_tailor": {
    "portrait": "assets/UNIT_ART/sumika_tailor.webp?v=20261118-sr-batch10"
  },
  "reika_archive": {
    "portrait": "assets/UNIT_ART/reika_archive.webp?v=20261118-sr-batch10"
  },
  "hono_outdoor": {
    "portrait": "assets/UNIT_ART/hono_outdoor.webp?v=20261118-sr-batch10"
  },
  "nodoka_apron": {
    "portrait": "assets/UNIT_ART/nodoka_apron.webp?v=20261118-sr-batch10"
  },
  "aki_dance": {
    "portrait": "assets/UNIT_ART/aki_dance.webp?v=20261118-sr-batch10"
  },
  "shigure_white": {
    "portrait": "assets/UNIT_ART/shigure_white.webp?v=20261118-sr-batch10"
  },
  "mashiro_crepe": {
    "portrait": "assets/UNIT_ART/mashiro_crepe.webp?v=20261118-sr-batch10"
  }
});
