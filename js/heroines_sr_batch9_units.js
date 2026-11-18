/* 2026-11-18: SR costume batch9 for existing v0690 heroines.
 * New costume units only. Existing R gates, other units, gacha rates, calculations and save format stay unchanged.
 */
const SR_BATCH9_UNIT_IDS=Object.freeze(["michiru_guide","ran_lab","rise_casual","satsuki_market","chizuru_dress","kokoro_library","kasumi_samue","ayu_marine","iroha_beret","asuka_camo"]);
const SR_BATCH9_EXISTING_R_IDS=Object.freeze(["michiru_work","ran_work","rise_work","satsuki_work","chizuru_work","kokoro_work","kasumi_work","ayu_work","honjo_iroha_work","asuka_work"]);
const NEW_UNIT_ROSTER_SR_BATCH9=Object.freeze([
  {
    "id": "michiru_guide",
    "person": "michiru",
    "title": "観光バスガイドの制服",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "旅路を照らす案内",
      "車内のチームワーク"
    ]
  },
  {
    "id": "ran_lab",
    "person": "ran",
    "title": "調香アトリエの白衣",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "芳香の手当て",
      "アトリエの癒やし"
    ]
  },
  {
    "id": "rise_casual",
    "person": "rise",
    "title": "休日の私服",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "休日の守り",
      "リセの受け止め"
    ]
  },
  {
    "id": "satsuki_market",
    "person": "satsuki",
    "title": "朝市の魚屋前掛け",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "朝市の威勢の一撃",
      "港の競りラッシュ"
    ]
  },
  {
    "id": "chizuru_dress",
    "person": "chizuru",
    "title": "個展の黒ドレス",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "墨色の激励",
      "個展の連携"
    ]
  },
  {
    "id": "kokoro_library",
    "person": "kokoro",
    "title": "図書館の司書コーデ",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "静かな読書の癒やし",
      "書架のやさしい手当て"
    ]
  },
  {
    "id": "kasumi_samue",
    "person": "kasumi",
    "title": "陶芸の作務衣",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "土壁の守り",
      "窯火の防壁"
    ]
  },
  {
    "id": "ayu_marine",
    "person": "ayu",
    "title": "休日のマリンルック",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "波乗りの一撃",
      "マリン・フィニッシュ"
    ]
  },
  {
    "id": "iroha_beret",
    "person": "honjo_iroha",
    "title": "ベレー帽の文学少女",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "物語の励まし",
      "読書会の連携"
    ]
  },
  {
    "id": "asuka_camo",
    "person": "asuka",
    "title": "サバゲーの迷彩装備",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "救護キットの手当て",
      "フィールドの応急処置"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH9=Object.freeze({
  "michiru_guide": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "おもてなしの道案内"
    ]
  },
  "ran_lab": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "香りの調和"
    ]
  },
  "rise_casual": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "穏やかな休日"
    ]
  },
  "satsuki_market": {
    "skills": [
      "single",
      "combo"
    ],
    "passive": [
      "combo_focus",
      "朝市の活気"
    ]
  },
  "chizuru_dress": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "筆に込めた思い"
    ]
  },
  "kokoro_library": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "知識への愛情"
    ]
  },
  "kasumi_samue": {
    "skills": [
      "shield_one",
      "taunt"
    ],
    "passive": [
      "shield_low",
      "陶工の集中"
    ]
  },
  "ayu_marine": {
    "skills": [
      "single",
      "finisher"
    ],
    "passive": [
      "attack",
      "海を知る勘"
    ]
  },
  "iroha_beret": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "言葉を紡ぐ力"
    ]
  },
  "asuka_camo": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "戦友を支える心"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH9=Object.freeze({
  "michiru_guide": {
    "portrait": "assets/UNIT_ART/michiru_guide.webp?v=20261118-sr-batch9"
  },
  "ran_lab": {
    "portrait": "assets/UNIT_ART/ran_lab.webp?v=20261118-sr-batch9"
  },
  "rise_casual": {
    "portrait": "assets/UNIT_ART/rise_casual.webp?v=20261118-sr-batch9"
  },
  "satsuki_market": {
    "portrait": "assets/UNIT_ART/satsuki_market.webp?v=20261118-sr-batch9"
  },
  "chizuru_dress": {
    "portrait": "assets/UNIT_ART/chizuru_dress.webp?v=20261118-sr-batch9"
  },
  "kokoro_library": {
    "portrait": "assets/UNIT_ART/kokoro_library.webp?v=20261118-sr-batch9"
  },
  "kasumi_samue": {
    "portrait": "assets/UNIT_ART/kasumi_samue.webp?v=20261118-sr-batch9"
  },
  "ayu_marine": {
    "portrait": "assets/UNIT_ART/ayu_marine.webp?v=20261118-sr-batch9"
  },
  "iroha_beret": {
    "portrait": "assets/UNIT_ART/iroha_beret.webp?v=20261118-sr-batch9"
  },
  "asuka_camo": {
    "portrait": "assets/UNIT_ART/asuka_camo.webp?v=20261118-sr-batch9"
  }
});
