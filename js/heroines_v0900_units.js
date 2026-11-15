/* PR #37 seven formally adopted SR units, stage 2.
 * q6-gated additions only. Reuses approved skill handlers and role base stats;
 * no alterations to save schema, legacy units, combat mathematics or rarity rates.
 */
const NEW_UNIT_ROSTER_V0900=Object.freeze([
  {
    "id": "kato_hazuki_work",
    "person": "kato_hazuki",
    "title": "笑顔をつなぐ合図",
    "rarity": "SR",
    "role": "support",
    "color": "#b499ba",
    "gate": "q6",
    "s": [
      "葉月のエール",
      "心を合わせて"
    ]
  },
  {
    "id": "yoshida_sae_work",
    "person": "yoshida_sae",
    "title": "静けさの決意",
    "rarity": "SR",
    "role": "attacker",
    "color": "#738ba1",
    "gate": "q6",
    "s": [
      "迷いなき一撃",
      "静かな圧力"
    ]
  },
  {
    "id": "yamazaki_wakana_work",
    "person": "yamazaki_wakana",
    "title": "ぬくもりの時間",
    "rarity": "SR",
    "role": "healer",
    "color": "#8ebbb1",
    "gate": "q6",
    "s": [
      "あなたへの手当て",
      "みんなを包む光"
    ]
  },
  {
    "id": "watanabe_mizuki_work",
    "person": "watanabe_mizuki",
    "title": "信じ合う心",
    "rarity": "SR",
    "role": "support",
    "color": "#8da4c9",
    "gate": "q6",
    "s": [
      "みんなの守り",
      "頼れる手当て"
    ]
  },
  {
    "id": "kinoshita_ami_work",
    "person": "kinoshita_ami",
    "title": "やさしさの処方箋",
    "rarity": "SR",
    "role": "healer",
    "color": "#e2a3ab",
    "gate": "q6",
    "s": [
      "みんなの癒し",
      "心をほどく手"
    ]
  },
  {
    "id": "sato_eri_work",
    "person": "sato_eri",
    "title": "情熱の一瞬",
    "rarity": "SR",
    "role": "attacker",
    "color": "#c07b76",
    "gate": "q6",
    "s": [
      "燃える気持ち",
      "まっすぐな一歩"
    ]
  },
  {
    "id": "nishimura_yumi_work",
    "person": "nishimura_yumi",
    "title": "笑顔の輪を広げて",
    "rarity": "SR",
    "role": "support",
    "color": "#a9b68f",
    "gate": "q6",
    "s": [
      "みんなへの声援",
      "やさしいひと休み"
    ]
  }
]);
const NEW_UNIT_DESIGN_V0900=Object.freeze({
  "kato_hazuki_work": {
    "skills": [
      "sayaka_team_attack_up",
      "cecil_team_ct"
    ],
    "passive": [
      "sayaka_buff",
      "穏やかな心配り"
    ]
  },
  "yoshida_sae_work": {
    "skills": [
      "nanami_strike_26",
      "honoka_enemy_attack_down_all"
    ],
    "passive": [
      "rio_attack",
      "確かな一歩"
    ]
  },
  "yamazaki_wakana_work": {
    "skills": [
      "marika_heal_one_65",
      "marika_heal_all_22"
    ],
    "passive": [
      "marika_rescue",
      "寄り添う気持ち"
    ]
  },
  "watanabe_mizuki_work": {
    "skills": [
      "rena_defense_up_22",
      "rena_cleanse_heal_all_30"
    ],
    "passive": [
      "sayaka_buff",
      "頼もしい支え"
    ]
  },
  "kinoshita_ami_work": {
    "skills": [
      "marika_heal_all_22",
      "rino_cleanse_heal_one_57"
    ],
    "passive": [
      "heal",
      "優しいまなざし"
    ]
  },
  "sato_eri_work": {
    "skills": [
      "rio_strike_self_attack",
      "rio_aoe_18"
    ],
    "passive": [
      "rio_attack",
      "揺るがぬ闘志"
    ]
  },
  "nishimura_yumi_work": {
    "skills": [
      "sayaka_team_attack_up",
      "kana_heal_all_25"
    ],
    "passive": [
      "sayaka_buff",
      "支える温かさ"
    ]
  }
});
const NEW_UNIT_ARTWORK_V0900=Object.freeze({
  "kato_hazuki_work": {
    "portrait": "assets/ART_V2/full_body/kato_hazuki.png"
  },
  "yoshida_sae_work": {
    "portrait": "assets/ART_V2/full_body/yoshida_sae.png"
  },
  "yamazaki_wakana_work": {
    "portrait": "assets/ART_V2/full_body/yamazaki_wakana.png"
  },
  "watanabe_mizuki_work": {
    "portrait": "assets/ART_V2/full_body/watanabe_mizuki.png"
  },
  "kinoshita_ami_work": {
    "portrait": "assets/ART_V2/full_body/kinoshita_ami.png"
  },
  "sato_eri_work": {
    "portrait": "assets/ART_V2/full_body/sato_eri.png"
  },
  "nishimura_yumi_work": {
    "portrait": "assets/ART_V2/full_body/nishimura_yumi.png"
  }
});
