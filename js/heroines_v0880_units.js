/* PR #38: 8 approved SR units (stage 2).
 * All 16 skill effects and 5 passive types reuse existing tested handlers.
 * Only adds roster, design and art bindings; old units, battle math, save, gacha rarity weights unchanged.
 * Explicit q6 gate on every SR and matching stage-1 persons.
 */
const NEW_UNIT_ROSTER_V0880=Object.freeze([
  {
    "id": "morinaga_akari_work",
    "person": "morinaga_akari",
    "title": "届けたい歌声",
    "rarity": "SR",
    "role": "support",
    "color": "#f29eaa",
    "gate": "q6",
    "s": [
      "ステージのエール",
      "心をひとつに"
    ]
  },
  {
    "id": "kurosaki_kaede_work",
    "person": "kurosaki_kaede",
    "title": "静かな切り札",
    "rarity": "SR",
    "role": "attacker",
    "color": "#524b70",
    "gate": "q6",
    "s": [
      "静寂の一閃",
      "黒き威圧"
    ]
  },
  {
    "id": "komatsu_hinata_work",
    "person": "komatsu_hinata",
    "title": "陽だまりの支え",
    "rarity": "SR",
    "role": "support",
    "color": "#e5b667",
    "gate": "q6",
    "s": [
      "ひなたの守り",
      "笑顔の手当て"
    ]
  },
  {
    "id": "kitahara_shiho_work",
    "person": "kitahara_shiho",
    "title": "真っすぐな決意",
    "rarity": "SR",
    "role": "attacker",
    "color": "#677ba0",
    "gate": "q6",
    "s": [
      "決意の一撃",
      "揺るがぬ眼差し"
    ]
  },
  {
    "id": "otsuki_tsubasa_work",
    "person": "otsuki_tsubasa",
    "title": "明日へ羽ばたく",
    "rarity": "SR",
    "role": "support",
    "color": "#91b9c3",
    "gate": "q6",
    "s": [
      "翼を広げて",
      "みんなを照らす光"
    ]
  },
  {
    "id": "mizuhara_mayu_work",
    "person": "mizuhara_mayu",
    "title": "やさしい手のひら",
    "rarity": "SR",
    "role": "healer",
    "color": "#8db8c5",
    "gate": "q6",
    "s": [
      "みんなへ癒しを",
      "そっと寄り添って"
    ]
  },
  {
    "id": "takasaka_tomoe_work",
    "person": "takasaka_tomoe",
    "title": "燃える舞台の一歩",
    "rarity": "SR",
    "role": "attacker",
    "color": "#bd7a60",
    "gate": "q6",
    "s": [
      "不屈の一撃",
      "情熱のステージ"
    ]
  },
  {
    "id": "nishimura_ako_work",
    "person": "nishimura_ako",
    "title": "包みこむぬくもり",
    "rarity": "SR",
    "role": "healer",
    "color": "#b990af",
    "gate": "q6",
    "s": [
      "あなたを支える",
      "みんなの笑顔へ"
    ]
  }
]);
const NEW_UNIT_DESIGN_V0880=Object.freeze({
  "morinaga_akari_work": {
    "skills": [
      "sayaka_team_attack_up",
      "cecil_team_ct"
    ],
    "passive": [
      "sayaka_buff",
      "届ける勇気"
    ]
  },
  "kurosaki_kaede_work": {
    "skills": [
      "honoka_strike_ct",
      "nanami_attack_down"
    ],
    "passive": [
      "nanami_debuff_extend",
      "静かなる圧力"
    ]
  },
  "komatsu_hinata_work": {
    "skills": [
      "sayaka_team_defense_up",
      "kana_heal_all_25"
    ],
    "passive": [
      "sayaka_buff",
      "笑顔の守護"
    ]
  },
  "kitahara_shiho_work": {
    "skills": [
      "nanami_strike_26",
      "honoka_enemy_attack_down_all"
    ],
    "passive": [
      "rio_attack",
      "攻め抜く覚悟"
    ]
  },
  "otsuki_tsubasa_work": {
    "skills": [
      "sayaka_team_attack_up",
      "rena_cleanse_heal_all_30"
    ],
    "passive": [
      "sayaka_buff",
      "希望の追い風"
    ]
  },
  "mizuhara_mayu_work": {
    "skills": [
      "kana_heal_all_25",
      "heal_one"
    ],
    "passive": [
      "heal",
      "献身の心"
    ]
  },
  "takasaka_tomoe_work": {
    "skills": [
      "rio_strike_self_attack",
      "rio_aoe_18"
    ],
    "passive": [
      "rio_attack",
      "熱い闘志"
    ]
  },
  "nishimura_ako_work": {
    "skills": [
      "marika_heal_one_65",
      "marika_heal_all_22"
    ],
    "passive": [
      "marika_rescue",
      "小さな気づかい"
    ]
  }
});
const NEW_UNIT_ARTWORK_V0880=Object.freeze({
  "morinaga_akari_work": {
    "portrait": "assets/ART_V2/full_body/morinaga_akari.png"
  },
  "kurosaki_kaede_work": {
    "portrait": "assets/ART_V2/full_body/kurosaki_kaede.png"
  },
  "komatsu_hinata_work": {
    "portrait": "assets/ART_V2/full_body/komatsu_hinata.png"
  },
  "kitahara_shiho_work": {
    "portrait": "assets/ART_V2/full_body/kitahara_shiho.png"
  },
  "otsuki_tsubasa_work": {
    "portrait": "assets/ART_V2/full_body/otsuki_tsubasa.png"
  },
  "mizuhara_mayu_work": {
    "portrait": "assets/ART_V2/full_body/mizuhara_mayu.png"
  },
  "takasaka_tomoe_work": {
    "portrait": "assets/ART_V2/full_body/takasaka_tomoe.png"
  },
  "nishimura_ako_work": {
    "portrait": "assets/ART_V2/full_body/nishimura_ako.png"
  }
});
