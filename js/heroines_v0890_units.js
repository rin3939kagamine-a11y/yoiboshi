/* PR #58 eight formally adopted SR units, stage 2.
 * q6-gated additions only. Reuses approved skill handlers and role base stats;
 * no alterations to save schema, legacy units, combat mathematics or rarity rates.
 */
const NEW_UNIT_ROSTER_V0890=Object.freeze([
  {
    "id": "kawamura_shizuku_work",
    "person": "kawamura_shizuku",
    "title": "小さな変化を見守って",
    "rarity": "R",
    "role": "healer",
    "color": "#91b3bd",
    "gate": "q6",
    "s": [
      "保育園のぬくもり",
      "そっと寄り添う手"
    ]
  },
  {
    "id": "ito_ruri_work",
    "person": "ito_ruri",
    "title": "静かな物語のしおり",
    "rarity": "R",
    "role": "support",
    "color": "#a29ab8",
    "gate": "q6",
    "s": [
      "読書のひと息",
      "やわらかな色の守り"
    ]
  },
  {
    "id": "okada_misaki_work",
    "person": "okada_misaki",
    "title": "笑顔のドッグカフェ",
    "rarity": "R",
    "role": "support",
    "color": "#d3aa68",
    "gate": "q6",
    "s": [
      "元気いっぱいの応援",
      "お世話のひととき"
    ]
  },
  {
    "id": "sasaki_sara_work",
    "person": "sasaki_sara",
    "title": "舞台に咲く光",
    "rarity": "R",
    "role": "attacker",
    "color": "#d57598",
    "gate": "q6",
    "s": [
      "まばゆい一撃",
      "ステージを染める光"
    ]
  },
  {
    "id": "yamada_yuri_work",
    "person": "yamada_yuri",
    "title": "支える手のひら",
    "rarity": "R",
    "role": "healer",
    "color": "#8da8bc",
    "gate": "q6",
    "s": [
      "一人への手当て",
      "みんなの安らぎ"
    ]
  },
  {
    "id": "shimizu_kotone_work",
    "person": "shimizu_kotone",
    "title": "守りたい居場所",
    "rarity": "R",
    "role": "support",
    "color": "#7b9b95",
    "gate": "q6",
    "s": [
      "揺るがぬ守り",
      "みんなへのケア"
    ]
  },
  {
    "id": "fujii_kanon_work",
    "person": "fujii_kanon",
    "title": "静かに響く決意",
    "rarity": "R",
    "role": "attacker",
    "color": "#8276a5",
    "gate": "q6",
    "s": [
      "迷いなき一撃",
      "静寂の圧力"
    ]
  },
  {
    "id": "kobayashi_iori_work",
    "person": "kobayashi_iori",
    "title": "心にともる手当て",
    "rarity": "R",
    "role": "healer",
    "color": "#bc91ae",
    "gate": "q6",
    "s": [
      "みんなの元気",
      "あなたへの癒し"
    ]
  }
]);
const NEW_UNIT_DESIGN_V0890=Object.freeze({
  "kawamura_shizuku_work": {
    "skills": [
      "marika_heal_all_22",
      "marika_heal_one_65"
    ],
    "passive": [
      "marika_rescue",
      "見守る優しさ"
    ]
  },
  "ito_ruri_work": {
    "skills": [
      "cecil_team_ct",
      "sayaka_team_defense_up"
    ],
    "passive": [
      "sayaka_buff",
      "丁寧な気配り"
    ]
  },
  "okada_misaki_work": {
    "skills": [
      "sayaka_team_attack_up",
      "kana_heal_all_25"
    ],
    "passive": [
      "sayaka_buff",
      "笑顔のエール"
    ]
  },
  "sasaki_sara_work": {
    "skills": [
      "rio_strike_self_attack",
      "rio_aoe_18"
    ],
    "passive": [
      "rio_attack",
      "華やかな集中力"
    ]
  },
  "yamada_yuri_work": {
    "skills": [
      "rino_cleanse_heal_one_57",
      "kana_heal_all_25"
    ],
    "passive": [
      "heal",
      "気づかいの心"
    ]
  },
  "shimizu_kotone_work": {
    "skills": [
      "rena_defense_up_22",
      "rena_cleanse_heal_all_30"
    ],
    "passive": [
      "sayaka_buff",
      "頼れる支え"
    ]
  },
  "fujii_kanon_work": {
    "skills": [
      "honoka_strike_ct",
      "nanami_attack_down"
    ],
    "passive": [
      "nanami_debuff_extend",
      "余韻を残す視線"
    ]
  },
  "kobayashi_iori_work": {
    "skills": [
      "kana_heal_all_25",
      "marika_heal_one_65"
    ],
    "passive": [
      "heal",
      "心をほどく手"
    ]
  }
});
const NEW_UNIT_ARTWORK_V0890=Object.freeze({
  "kawamura_shizuku_work": {
    "portrait": "assets/ART_V2/full_body/kawamura_shizuku.png"
  },
  "ito_ruri_work": {
    "portrait": "assets/ART_V2/full_body/ito_ruri.png"
  },
  "okada_misaki_work": {
    "portrait": "assets/ART_V2/full_body/okada_misaki.png"
  },
  "sasaki_sara_work": {
    "portrait": "assets/ART_V2/full_body/sasaki_sara.png"
  },
  "yamada_yuri_work": {
    "portrait": "assets/ART_V2/full_body/yamada_yuri.png"
  },
  "shimizu_kotone_work": {
    "portrait": "assets/ART_V2/full_body/shimizu_kotone.png"
  },
  "fujii_kanon_work": {
    "portrait": "assets/ART_V2/full_body/fujii_kanon.png"
  },
  "kobayashi_iori_work": {
    "portrait": "assets/ART_V2/full_body/kobayashi_iori.png"
  }
});
