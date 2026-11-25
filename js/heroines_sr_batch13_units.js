/* 2026-11-18: SR costume batch13. Additional outfits only; preserve all preexisting R IDs, formulas, rates and save format. */
const SR_BATCH13_UNIT_IDS=Object.freeze(["suzuha_uniform","renka_dealer","cecil_stage","honoka_field","kana_happi","riria_salon","nekomiya_lesson","kotori_cafe","aoba_denim"]);
const SR_BATCH13_EXISTING_R_IDS=Object.freeze(["chiyozaki_suzuha_work","sakuraba_renka_work","ginjo_cecil_work","hasegawa_honoka_work","ueda_kana_work","himemiya_riria_work","nekomiya_rara_work","shiromiya_kotori_work","hayakawa_aoba_work"]);
const NEW_UNIT_ROSTER_SR_BATCH13=Object.freeze([
  {
    "id": "suzuha_uniform",
    "person": "chiyozaki_suzuha",
    "title": "パークスタッフの制服",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "パークの元気な案内",
      "みんなの笑顔を守って"
    ]
  },
  {
    "id": "renka_dealer",
    "person": "sakuraba_renka",
    "title": "フロアのディーラーコーデ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "ディーラーの一手",
      "勝負のラストカード"
    ]
  },
  {
    "id": "cecil_stage",
    "person": "ginjo_cecil",
    "title": "舞台のロングドレス",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "幕開けの号令",
      "舞台の連携"
    ]
  },
  {
    "id": "honoka_field",
    "person": "hasegawa_honoka",
    "title": "撮影のフィールドベスト",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "シャッターチャンス",
      "フィールドの決定打"
    ]
  },
  {
    "id": "kana_happi",
    "person": "ueda_kana",
    "title": "商店街の法被",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "お祭りの応急手当",
      "みんなで笑う癒やし"
    ]
  },
  {
    "id": "riria_salon",
    "person": "himemiya_riria",
    "title": "ブランド店員のエプロンドレス",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "サロンの一閃",
      "華やかなフィニッシュ"
    ]
  },
  {
    "id": "nekomiya_lesson",
    "person": "nekomiya_rara",
    "title": "ダンスレッスン着",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "レッスンの連撃",
      "ステップ・フィニッシュ"
    ]
  },
  {
    "id": "kotori_cafe",
    "person": "shiromiya_kotori",
    "title": "カフェ店員の制服",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "カフェの温かいお手当",
      "おかわりの癒やし"
    ]
  },
  {
    "id": "aoba_denim",
    "person": "hayakawa_aoba",
    "title": "休日のデニムコーデ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "デニムの軽快な一撃",
      "休日のラッシュ"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH13=Object.freeze({
  "suzuha_uniform": {
    "skills": [
      "attack_up",
      "shield_all"
    ],
    "passive": [
      "team_start_atk",
      "お客様への心づかい"
    ]
  },
  "renka_dealer": {
    "skills": [
      "single",
      "finisher"
    ],
    "passive": [
      "attack",
      "勝負勘の冴え"
    ]
  },
  "cecil_stage": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "舞台への集中"
    ]
  },
  "honoka_field": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "attack",
      "一瞬を逃さない眼"
    ]
  },
  "kana_happi": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "祭りの気づかい"
    ]
  },
  "riria_salon": {
    "skills": [
      "single",
      "finisher"
    ],
    "passive": [
      "attack",
      "洗練された身のこなし"
    ]
  },
  "nekomiya_lesson": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "combo_focus",
      "軽やかなリズム"
    ]
  },
  
  "kotori_cafe": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "お客様への優しさ"
    ]
  },
  "aoba_denim": {
    "skills": [
      "single",
      "combo"
    ],
    "passive": [
      "attack",
      "自由なステップ"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH13=Object.freeze({
  "suzuha_uniform": {
    "portrait": "assets/UNIT_ART/suzuha_uniform.webp?v=20261118-sr-batch13"
  },
  "renka_dealer": {
    "portrait": "assets/UNIT_ART/renka_dealer.webp?v=20261118-sr-batch13"
  },
  "cecil_stage": {
    "portrait": "assets/UNIT_ART/cecil_stage.webp?v=20261118-sr-batch13"
  },
  "honoka_field": {
    "portrait": "assets/UNIT_ART/honoka_field.webp?v=20261118-sr-batch13"
  },
  "kana_happi": {
    "portrait": "assets/UNIT_ART/kana_happi.webp?v=20261118-sr-batch13"
  },
  "riria_salon": {
    "portrait": "assets/UNIT_ART/riria_salon.webp?v=20261118-sr-batch13"
  },
  "nekomiya_lesson": {
    "portrait": "assets/UNIT_ART/nekomiya_lesson.webp?v=20261118-sr-batch13"
  },
  
  "kotori_cafe": {
    "portrait": "assets/UNIT_ART/kotori_cafe.webp?v=20261118-sr-batch13"
  },
  "aoba_denim": {
    "portrait": "assets/UNIT_ART/aoba_denim.webp?v=20261118-sr-batch13"
  }
});
