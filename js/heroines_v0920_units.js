/* 2026-11-16: 20 adopted characters stage 2. Genuine R units, q6 gate.
 * Reuse existing skill implementations and ROLES; no game math or save schema changes.
 * PR #109 legacy SR-passive compatibility MUST NOT apply to these 20 IDs.
 */
const NEW_UNIT_ROSTER_V0920=Object.freeze([
  {
    "id": "endo_saori_work",
    "person": "endo_saori",
    "title": "観光案内のぬくもり",
    "rarity": "R",
    "role": "support",
    "color": "#c68b83",
    "gate": "q6",
    "s": [
      "元気を届けて",
      "旅先の手当て"
    ]
  },
  {
    "id": "takamori_serika_work",
    "person": "takamori_serika",
    "title": "優しさを守る灯",
    "rarity": "R",
    "role": "support",
    "color": "#9583b6",
    "gate": "q6",
    "s": [
      "みんなの守り",
      "息を合わせて"
    ]
  },
  {
    "id": "enomoto_tsugumi_work",
    "person": "enomoto_tsugumi",
    "title": "確かな手助け",
    "rarity": "R",
    "role": "support",
    "color": "#739aaf",
    "gate": "q6",
    "s": [
      "歩調を整えて",
      "守りの輪"
    ]
  },
  {
    "id": "amase_kanata_work",
    "person": "amase_kanata",
    "title": "ふたりで見上げる空",
    "rarity": "R",
    "role": "support",
    "color": "#9389c4",
    "gate": "q6",
    "s": [
      "背中を押す光",
      "みんなを守る光"
    ]
  },
  {
    "id": "higuchi_rei_work",
    "person": "higuchi_rei",
    "title": "揺るがない優しさ",
    "rarity": "R",
    "role": "support",
    "color": "#ca9ab3",
    "gate": "q6",
    "s": [
      "揺るがぬ守り",
      "不安をほどく手"
    ]
  },
  {
    "id": "dojima_rei_work",
    "person": "dojima_rei",
    "title": "心をつなぐ勇気",
    "rarity": "R",
    "role": "support",
    "color": "#8ca8b9",
    "gate": "q6",
    "s": [
      "力を合わせて",
      "痛みを癒して"
    ]
  },
  {
    "id": "tsukino_moka_work",
    "person": "tsukino_moka",
    "title": "月明かりの心配り",
    "rarity": "R",
    "role": "support",
    "color": "#d6a8bc",
    "gate": "q6",
    "s": [
      "月光の守り",
      "みんなでひと休み"
    ]
  },
  {
    "id": "asagiri_rara_work",
    "person": "asagiri_rara",
    "title": "明日を待つ朝霧",
    "rarity": "R",
    "role": "support",
    "color": "#9e9bbb",
    "gate": "q6",
    "s": [
      "時を合わせて",
      "一歩を後押し"
    ]
  },
  {
    "id": "sakaki_yura_work",
    "person": "sakaki_yura",
    "title": "静かに踏み出す一歩",
    "rarity": "R",
    "role": "attacker",
    "color": "#b27eaa",
    "gate": "q6",
    "s": [
      "決意の一撃",
      "静かな威圧"
    ]
  },
  {
    "id": "hamasaki_nagisa_work",
    "person": "hamasaki_nagisa",
    "title": "潮風の決意",
    "rarity": "R",
    "role": "attacker",
    "color": "#7daabd",
    "gate": "q6",
    "s": [
      "波音の一撃",
      "広がる波紋"
    ]
  },
  {
    "id": "nikaido_yuki_work",
    "person": "nikaido_yuki",
    "title": "静寂に宿る力",
    "rarity": "R",
    "role": "attacker",
    "color": "#9d91bb",
    "gate": "q6",
    "s": [
      "揺るぎなき一閃",
      "戦意を挫く声"
    ]
  },
  {
    "id": "himemiya_riria_work",
    "person": "himemiya_riria",
    "title": "秘めたる決意",
    "rarity": "R",
    "role": "attacker",
    "color": "#e4a4c4",
    "gate": "q6",
    "s": [
      "華やぐ一撃",
      "一瞬の威圧"
    ]
  },
  {
    "id": "nanjo_yurara_work",
    "person": "nanjo_yurara",
    "title": "明日を信じる強さ",
    "rarity": "R",
    "role": "attacker",
    "color": "#c28dab",
    "gate": "q6",
    "s": [
      "揺らがぬ一撃",
      "戦意をほどいて"
    ]
  },
  {
    "id": "wakakusa_rinne_work",
    "person": "wakakusa_rinne",
    "title": "芽吹きの力",
    "rarity": "R",
    "role": "attacker",
    "color": "#89b08c",
    "gate": "q6",
    "s": [
      "芽吹きの一閃",
      "青葉の連撃"
    ]
  },
  {
    "id": "nekomiya_rara_work",
    "person": "nekomiya_rara",
    "title": "しなやかな一撃",
    "rarity": "R",
    "role": "attacker",
    "color": "#aa96ba",
    "gate": "q6",
    "s": [
      "狙い澄ました一手",
      "いたずらな威圧"
    ]
  },
  {
    "id": "katsura_yui_work",
    "person": "katsura_yui",
    "title": "優しさを結ぶ手",
    "rarity": "R",
    "role": "healer",
    "color": "#c4a0bc",
    "gate": "q6",
    "s": [
      "あなただけに",
      "みんなに安らぎを"
    ]
  },
  {
    "id": "momose_yumeka_work",
    "person": "momose_yumeka",
    "title": "夢色のひと休み",
    "rarity": "R",
    "role": "healer",
    "color": "#e1b0c3",
    "gate": "q6",
    "s": [
      "みんなにぬくもりを",
      "そっと手当て"
    ]
  },
  {
    "id": "sorano_nanase_work",
    "person": "sorano_nanase",
    "title": "空色のやすらぎ",
    "rarity": "R",
    "role": "healer",
    "color": "#8eabd1",
    "gate": "q6",
    "s": [
      "空のぬくもり",
      "あなたを包む光"
    ]
  },
  {
    "id": "komine_suzu_work",
    "person": "komine_suzu",
    "title": "鈴の音の手当て",
    "rarity": "R",
    "role": "healer",
    "color": "#c6b09f",
    "gate": "q6",
    "s": [
      "不安を解く手",
      "みんなのぬくもり"
    ]
  },
  {
    "id": "amai_momo_work",
    "person": "amai_momo",
    "title": "甘い笑顔の約束",
    "rarity": "R",
    "role": "healer",
    "color": "#e5a5aa",
    "gate": "q6",
    "s": [
      "笑顔のおすそ分け",
      "あなただけの癒し"
    ]
  }
]);
const NEW_UNIT_DESIGN_V0920=Object.freeze({
  "endo_saori_work": {
    "skills": [
      "sayaka_team_attack_up",
      "kana_heal_all_25"
    ],
    "passive": [
      "sayaka_buff",
      "気配りの力"
    ]
  },
  "takamori_serika_work": {
    "skills": [
      "sayaka_team_defense_up",
      "cecil_team_ct"
    ],
    "passive": [
      "sayaka_buff",
      "柔らかな支え"
    ]
  },
  "enomoto_tsugumi_work": {
    "skills": [
      "cecil_team_ct",
      "sayaka_team_defense_up"
    ],
    "passive": [
      "sayaka_buff",
      "見守る余裕"
    ]
  },
  "amase_kanata_work": {
    "skills": [
      "sayaka_team_attack_up",
      "sayaka_team_defense_up"
    ],
    "passive": [
      "sayaka_buff",
      "空へ届く声"
    ]
  },
  "higuchi_rei_work": {
    "skills": [
      "rena_defense_up_22",
      "suzuha_cleanse_heal"
    ],
    "passive": [
      "sayaka_buff",
      "頼りになる判断"
    ]
  },
  "dojima_rei_work": {
    "skills": [
      "sayaka_team_attack_up",
      "suzuha_cleanse_heal"
    ],
    "passive": [
      "sayaka_buff",
      "支える覚悟"
    ]
  },
  "tsukino_moka_work": {
    "skills": [
      "sayaka_team_defense_up",
      "kana_heal_all_25"
    ],
    "passive": [
      "sayaka_buff",
      "静かな気配り"
    ]
  },
  "asagiri_rara_work": {
    "skills": [
      "cecil_team_ct",
      "sayaka_team_attack_up"
    ],
    "passive": [
      "sayaka_buff",
      "ひたむきな応援"
    ]
  },
  "sakaki_yura_work": {
    "skills": [
      "honoka_strike_ct",
      "nanami_attack_down"
    ],
    "passive": [
      "nanami_debuff_extend",
      "残る余韻"
    ]
  },
  "hamasaki_nagisa_work": {
    "skills": [
      "rio_strike_self_attack",
      "rio_aoe_18"
    ],
    "passive": [
      "rio_attack",
      "波間の集中"
    ]
  },
  "nikaido_yuki_work": {
    "skills": [
      "nanami_strike_26",
      "honoka_enemy_attack_down_all"
    ],
    "passive": [
      "rio_attack",
      "迷いなき心"
    ]
  },
  "himemiya_riria_work": {
    "skills": [
      "rio_strike_self_attack",
      "nanami_attack_down"
    ],
    "passive": [
      "nanami_debuff_extend",
      "気高い眼差し"
    ]
  },
  "nanjo_yurara_work": {
    "skills": [
      "honoka_strike_ct",
      "honoka_enemy_attack_down_all"
    ],
    "passive": [
      "rio_attack",
      "真っ直ぐな信念"
    ]
  },
  "wakakusa_rinne_work": {
    "skills": [
      "rio_strike_self_attack",
      "rio_aoe_18"
    ],
    "passive": [
      "rio_attack",
      "成長の息吹"
    ]
  },
  "nekomiya_rara_work": {
    "skills": [
      "nanami_strike_26",
      "nanami_attack_down"
    ],
    "passive": [
      "nanami_debuff_extend",
      "気まぐれな余韻"
    ]
  },
  "katsura_yui_work": {
    "skills": [
      "marika_heal_one_65",
      "marika_heal_all_22"
    ],
    "passive": [
      "marika_rescue",
      "小さな変化への気づき"
    ]
  },
  "momose_yumeka_work": {
    "skills": [
      "kana_heal_all_25",
      "heal_one"
    ],
    "passive": [
      "heal",
      "優しい夢心地"
    ]
  },
  "sorano_nanase_work": {
    "skills": [
      "marika_heal_all_22",
      "marika_heal_one_65"
    ],
    "passive": [
      "marika_rescue",
      "そっと寄り添って"
    ]
  },
  "komine_suzu_work": {
    "skills": [
      "rino_cleanse_heal_one_57",
      "kana_heal_all_25"
    ],
    "passive": [
      "heal",
      "見守る手"
    ]
  },
  "amai_momo_work": {
    "skills": [
      "kana_heal_all_25",
      "marika_heal_one_65"
    ],
    "passive": [
      "heal",
      "まごころの一杯"
    ]
  }
});
const NEW_UNIT_ARTWORK_V0920=Object.freeze({
  "endo_saori_work": {
    "portrait": "assets/ART_V2/full_body/endo_saori.png"
  },
  "takamori_serika_work": {
    "portrait": "assets/ART_V2/full_body/takamori_serika.png"
  },
  "enomoto_tsugumi_work": {
    "portrait": "assets/ART_V2/full_body/enomoto_tsugumi.png"
  },
  "amase_kanata_work": {
    "portrait": "assets/ART_V2/full_body/amase_kanata.png"
  },
  "higuchi_rei_work": {
    "portrait": "assets/ART_V2/full_body/higuchi_rei.png"
  },
  "dojima_rei_work": {
    "portrait": "assets/ART_V2/full_body/dojima_rei.png"
  },
  "tsukino_moka_work": {
    "portrait": "assets/ART_V2/full_body/tsukino_moka.png"
  },
  "asagiri_rara_work": {
    "portrait": "assets/ART_V2/full_body/asagiri_rara.png"
  },
  "sakaki_yura_work": {
    "portrait": "assets/ART_V2/full_body/sakaki_yura.png"
  },
  "hamasaki_nagisa_work": {
    "portrait": "assets/ART_V2/full_body/hamasaki_nagisa.png"
  },
  "nikaido_yuki_work": {
    "portrait": "assets/ART_V2/full_body/nikaido_yuki.png"
  },
  "himemiya_riria_work": {
    "portrait": "assets/ART_V2/full_body/himemiya_riria.png"
  },
  "nanjo_yurara_work": {
    "portrait": "assets/ART_V2/full_body/nanjo_yurara.png"
  },
  "wakakusa_rinne_work": {
    "portrait": "assets/ART_V2/full_body/wakakusa_rinne.png"
  },
  "nekomiya_rara_work": {
    "portrait": "assets/ART_V2/full_body/nekomiya_rara.png"
  },
  "katsura_yui_work": {
    "portrait": "assets/ART_V2/full_body/katsura_yui.png"
  },
  "momose_yumeka_work": {
    "portrait": "assets/ART_V2/full_body/momose_yumeka.png"
  },
  "sorano_nanase_work": {
    "portrait": "assets/ART_V2/full_body/sorano_nanase.png"
  },
  "komine_suzu_work": {
    "portrait": "assets/ART_V2/full_body/komine_suzu.png"
  },
  "amai_momo_work": {
    "portrait": "assets/ART_V2/full_body/amai_momo.png"
  }
});
