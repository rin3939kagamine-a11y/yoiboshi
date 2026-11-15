/* Twelve approved single-character SR units: stage 2.
 * q6-gated additions; reuses existing skill handlers and standard role stats.
 * No save migration, legacy character, story, gacha-rate or battle math changes.
 */
const NEW_UNIT_ROSTER_V0910=Object.freeze([
  {
    "id": "takahashi_ayano_work",
    "person": "takahashi_ayano",
    "title": "みんなを包む気配り",
    "rarity": "R",
    "role": "support",
    "color": "#aa99bf",
    "gate": "q6",
    "s": [
      "彩乃の守り",
      "笑顔の手当て"
    ]
  },
  {
    "id": "tanaka_mio_work",
    "person": "tanaka_mio",
    "title": "そっと包む優しさ",
    "rarity": "R",
    "role": "healer",
    "color": "#e8a4ba",
    "gate": "q6",
    "s": [
      "あなただけの癒し",
      "みんなのぬくもり"
    ]
  },
  {
    "id": "arai_shiori_work",
    "person": "arai_shiori",
    "title": "心を結ぶしおり",
    "rarity": "R",
    "role": "support",
    "color": "#8aa0be",
    "gate": "q6",
    "s": [
      "みんなの歩調",
      "背中を押す言葉"
    ]
  },
  {
    "id": "ono_yuina_work",
    "person": "ono_yuina",
    "title": "一緒に笑える明日",
    "rarity": "R",
    "role": "healer",
    "color": "#dfad91",
    "gate": "q6",
    "s": [
      "元気の分かち合い",
      "あなたを癒して"
    ]
  },
  {
    "id": "maeda_akane_work",
    "person": "maeda_akane",
    "title": "一瞬に込める決意",
    "rarity": "R",
    "role": "attacker",
    "color": "#bb7c8b",
    "gate": "q6",
    "s": [
      "迷わぬ一撃",
      "静かなまなざし"
    ]
  },
  {
    "id": "fujita_sui_work",
    "person": "fujita_sui",
    "title": "翠の優しい守り",
    "rarity": "R",
    "role": "support",
    "color": "#7ba9a5",
    "gate": "q6",
    "s": [
      "みんなへの応援",
      "すっきりひと息"
    ]
  },
  {
    "id": "goto_satoko_work",
    "person": "goto_satoko",
    "title": "確かな支え",
    "rarity": "R",
    "role": "support",
    "color": "#ac9da6",
    "gate": "q6",
    "s": [
      "みんなを守る声",
      "小さなひと休み"
    ]
  },
  {
    "id": "nakajima_kazumi_work",
    "person": "nakajima_kazumi",
    "title": "思いやりの手当て",
    "rarity": "R",
    "role": "healer",
    "color": "#8eb6b5",
    "gate": "q6",
    "s": [
      "みんなへ安らぎを",
      "あなたへひとさじ"
    ]
  },
  {
    "id": "harada_kyoko_work",
    "person": "harada_kyoko",
    "title": "誰かのための笑顔",
    "rarity": "R",
    "role": "support",
    "color": "#c596a4",
    "gate": "q6",
    "s": [
      "守りの輪",
      "やさしい手当て"
    ]
  },
  {
    "id": "ogawa_rina_work",
    "person": "ogawa_rina",
    "title": "迷わない一歩",
    "rarity": "R",
    "role": "attacker",
    "color": "#cd7f98",
    "gate": "q6",
    "s": [
      "気合いの一撃",
      "勇気の波"
    ]
  },
  {
    "id": "ishida_yuna_work",
    "person": "ishida_yuna",
    "title": "心に届く優しさ",
    "rarity": "R",
    "role": "healer",
    "color": "#9ba7d4",
    "gate": "q6",
    "s": [
      "あなただけを癒す",
      "みんなでひと休み"
    ]
  },
  {
    "id": "morita_mitsuki_work",
    "person": "morita_mitsuki",
    "title": "光を切り開いて",
    "rarity": "R",
    "role": "attacker",
    "color": "#a08dba",
    "gate": "q6",
    "s": [
      "静かな一閃",
      "光の静寂"
    ]
  }
]);
const NEW_UNIT_DESIGN_V0910=Object.freeze({
  "takahashi_ayano_work": {
    "skills": [
      "sayaka_team_defense_up",
      "kana_heal_all_25"
    ],
    "passive": [
      "sayaka_buff",
      "頼れる気配り"
    ]
  },
  "tanaka_mio_work": {
    "skills": [
      "marika_heal_one_65",
      "marika_heal_all_22"
    ],
    "passive": [
      "marika_rescue",
      "小さな変化を見守って"
    ]
  },
  "arai_shiori_work": {
    "skills": [
      "cecil_team_ct",
      "sayaka_team_attack_up"
    ],
    "passive": [
      "sayaka_buff",
      "静かな支え"
    ]
  },
  "ono_yuina_work": {
    "skills": [
      "kana_heal_all_25",
      "heal_one"
    ],
    "passive": [
      "heal",
      "寄り添う温もり"
    ]
  },
  "maeda_akane_work": {
    "skills": [
      "honoka_strike_ct",
      "nanami_attack_down"
    ],
    "passive": [
      "nanami_debuff_extend",
      "余韻の眼差し"
    ]
  },
  "fujita_sui_work": {
    "skills": [
      "sayaka_team_attack_up",
      "rena_cleanse_heal_all_30"
    ],
    "passive": [
      "sayaka_buff",
      "心配りの力"
    ]
  },
  "goto_satoko_work": {
    "skills": [
      "rena_defense_up_22",
      "cecil_team_ct"
    ],
    "passive": [
      "sayaka_buff",
      "頼れる心"
    ]
  },
  "nakajima_kazumi_work": {
    "skills": [
      "marika_heal_all_22",
      "marika_heal_one_65"
    ],
    "passive": [
      "marika_rescue",
      "見守る心"
    ]
  },
  "harada_kyoko_work": {
    "skills": [
      "sayaka_team_defense_up",
      "kana_heal_all_25"
    ],
    "passive": [
      "sayaka_buff",
      "温かな声かけ"
    ]
  },
  "ogawa_rina_work": {
    "skills": [
      "rio_strike_self_attack",
      "rio_aoe_18"
    ],
    "passive": [
      "rio_attack",
      "揺るがぬ情熱"
    ]
  },
  "ishida_yuna_work": {
    "skills": [
      "rino_cleanse_heal_one_57",
      "kana_heal_all_25"
    ],
    "passive": [
      "heal",
      "気遣い上手"
    ]
  },
  "morita_mitsuki_work": {
    "skills": [
      "nanami_strike_26",
      "honoka_enemy_attack_down_all"
    ],
    "passive": [
      "rio_attack",
      "確かな眼差し"
    ]
  }
});
const NEW_UNIT_ARTWORK_V0910=Object.freeze({
  "takahashi_ayano_work": {
    "portrait": "assets/ART_V2/full_body/takahashi_ayano.png"
  },
  "tanaka_mio_work": {
    "portrait": "assets/ART_V2/full_body/tanaka_mio.png"
  },
  "arai_shiori_work": {
    "portrait": "assets/ART_V2/full_body/arai_shiori.png"
  },
  "ono_yuina_work": {
    "portrait": "assets/ART_V2/full_body/ono_yuina.png"
  },
  "maeda_akane_work": {
    "portrait": "assets/ART_V2/full_body/maeda_akane.png"
  },
  "fujita_sui_work": {
    "portrait": "assets/ART_V2/full_body/fujita_sui.png"
  },
  "goto_satoko_work": {
    "portrait": "assets/ART_V2/full_body/goto_satoko.png"
  },
  "nakajima_kazumi_work": {
    "portrait": "assets/ART_V2/full_body/nakajima_kazumi.png"
  },
  "harada_kyoko_work": {
    "portrait": "assets/ART_V2/full_body/harada_kyoko.png"
  },
  "ogawa_rina_work": {
    "portrait": "assets/ART_V2/full_body/ogawa_rina.png"
  },
  "ishida_yuna_work": {
    "portrait": "assets/ART_V2/full_body/ishida_yuna.png"
  },
  "morita_mitsuki_work": {
    "portrait": "assets/ART_V2/full_body/morita_mitsuki.png"
  }
});
