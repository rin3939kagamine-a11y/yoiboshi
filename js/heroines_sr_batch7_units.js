/* 2026-11-18: SR costume batch7 for existing v0690 heroines.
 * New SR cards only; R quest gates, existing units, calculations, rarity rates and saves unchanged.
 */
const SR_BATCH7_UNIT_IDS=Object.freeze(["sora_stream","tamaki_trench","yuna_wedding","kazusa_yukata","maya_casual","nana_jacket","roze_concierge","manatsu_aloha","ren_stage","chitose_apron"]);
const SR_BATCH7_EXISTING_R_IDS=Object.freeze(["sora_work","tamaki_work","yuna_work","kazusa_work","maya_work","nana_work","roze_work","manatsu_work","ren_work","chitose_work"]);
const NEW_UNIT_ROSTER_SR_BATCH7=Object.freeze([
  {
    "id": "sora_stream",
    "person": "sora",
    "title": "配信者のゲーミングコーデ",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "配信開始の号令",
      "チャット連携の加速"
    ]
  },
  {
    "id": "tamaki_trench",
    "person": "tamaki",
    "title": "トレンチコートの刑事",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "現場の応急処置",
      "捜査班の救護"
    ]
  },
  {
    "id": "yuna_wedding",
    "person": "yuna",
    "title": "本番のウェディングドレス",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "純白の守り",
      "誓いの防壁"
    ]
  },
  {
    "id": "kazusa_yukata",
    "person": "kazusa",
    "title": "観光PRの浴衣姿",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "観光案内の一閃",
      "祭りの連撃"
    ]
  },
  {
    "id": "maya_casual",
    "person": "maya",
    "title": "休日のスポーツカジュアル",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "トレーナーの激励",
      "チームのペース配分"
    ]
  },
  {
    "id": "nana_jacket",
    "person": "nana",
    "title": "講師のジャケットスタイル",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "わかるまで寄り添う",
      "学びの回復時間"
    ]
  },
  {
    "id": "roze_concierge",
    "person": "roze",
    "title": "洋館ホテルの支配人制服",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "支配人の護衛指示",
      "洋館の防衛線"
    ]
  },
  {
    "id": "manatsu_aloha",
    "person": "manatsu",
    "title": "海の家のアロハシャツ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "波打ち際の一撃",
      "真夏のラッシュ"
    ]
  },
  {
    "id": "ren_stage",
    "person": "ren",
    "title": "ライブステージの赤と黒",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "ベースラインの鼓舞",
      "熱狂のリズム"
    ]
  },
  {
    "id": "chitose_apron",
    "person": "chitose",
    "title": "時計工房の革エプロン",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "時計職人の手当て",
      "時を刻む癒やし"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH7=Object.freeze({
  "sora_stream": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "配信を支える連携"
    ]
  },
  "tamaki_trench": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "刑事の気配り"
    ]
  },
  "yuna_wedding": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "守り抜く誓い"
    ]
  },
  "kazusa_yukata": {
    "skills": [
      "single",
      "combo"
    ],
    "passive": [
      "combo_focus",
      "街を愛する熱意"
    ]
  },
  "maya_casual": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "鍛錬の積み重ね"
    ]
  },
  "nana_jacket": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "丁寧な指導"
    ]
  },
  "roze_concierge": {
    "skills": [
      "shield_one",
      "taunt"
    ],
    "passive": [
      "shield_low",
      "揺るがぬ品格"
    ]
  },
  "manatsu_aloha": {
    "skills": [
      "single",
      "finisher"
    ],
    "passive": [
      "attack",
      "潮風の勢い"
    ]
  },
  "ren_stage": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "バンドの結束"
    ]
  },
  "chitose_apron": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "精密な手仕事"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH7=Object.freeze({
  "sora_stream": {
    "portrait": "assets/UNIT_ART/sora_stream.webp?v=20261118-sr-batch7"
  },
  "tamaki_trench": {
    "portrait": "assets/UNIT_ART/tamaki_trench.webp?v=20261118-sr-batch7"
  },
  "yuna_wedding": {
    "portrait": "assets/UNIT_ART/yuna_wedding.webp?v=20261118-sr-batch7"
  },
  "kazusa_yukata": {
    "portrait": "assets/UNIT_ART/kazusa_yukata.webp?v=20261118-sr-batch7"
  },
  "maya_casual": {
    "portrait": "assets/UNIT_ART/maya_casual.webp?v=20261118-sr-batch7"
  },
  "nana_jacket": {
    "portrait": "assets/UNIT_ART/nana_jacket.webp?v=20261118-sr-batch7"
  },
  "roze_concierge": {
    "portrait": "assets/UNIT_ART/roze_concierge.webp?v=20261118-sr-batch7"
  },
  "manatsu_aloha": {
    "portrait": "assets/UNIT_ART/manatsu_aloha.webp?v=20261118-sr-batch7"
  },
  "ren_stage": {
    "portrait": "assets/UNIT_ART/ren_stage.webp?v=20261118-sr-batch7"
  },
  "chitose_apron": {
    "portrait": "assets/UNIT_ART/chitose_apron.webp?v=20261118-sr-batch7"
  }
});
