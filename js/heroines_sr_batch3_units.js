/* 2026-11-17: SR costume batch3 for existing v0690 heroines.
 * Add cards only; do not add heroines or change R/SSR/UR, formulas, rates or saves.
 * Gate visibility is inherited from the person's existing v0690 quest rules.
 */
const SR_BATCH3_UNIT_IDS=Object.freeze(["kei_buyer","rara_classic","ryo_skate","hinako_cafe","lira_bar","nonoka_bakery","kohaku_barista","raimu_studio","yuria_light","leona_show"]);
const SR_BATCH3_EXISTING_R_IDS=Object.freeze(["kei_work","rara_work","ryo_work","hinako_work","lira_work","nonoka_work","kohaku_work","raimu_work","yuria_work","leona_work"]);
const NEW_UNIT_ROSTER_SR_BATCH3=Object.freeze([
  {
    "id": "kei_buyer",
    "person": "kei",
    "title": "バイヤーの仕入れ装い",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "目利きの仕入れ",
      "港を巡る段取り"
    ]
  },
  {
    "id": "rara_classic",
    "person": "rara",
    "title": "星屑亭の特別制服",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "星屑亭のティータイム",
      "とびきりのおもてなし"
    ]
  },
  {
    "id": "ryo_skate",
    "person": "ryo",
    "title": "スケボーショップのストリート装い",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "ストリートの受け身",
      "ランプ際の堅守"
    ]
  },
  {
    "id": "hinako_cafe",
    "person": "hinako",
    "title": "カフェ制服",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "カフェの速攻オーダー",
      "ラストオーダー・ラッシュ"
    ]
  },
  {
    "id": "lira_bar",
    "person": "lira",
    "title": "ゴシックバーのバーテンダー",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "深紅のカクテル",
      "常連たちの合図"
    ]
  },
  {
    "id": "nonoka_bakery",
    "person": "nonoka",
    "title": "パン屋の仕事着",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "焼きたての差し入れ",
      "パン工房のあたたかさ"
    ]
  },
  {
    "id": "kohaku_barista",
    "person": "kohaku",
    "title": "バリスタ制服",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "湯気のバリア",
      "バリスタの守り"
    ]
  },
  {
    "id": "raimu_studio",
    "person": "raimu",
    "title": "宅録スタジオスタイル",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "宅録の一発録り",
      "マスタリング・ブレイク"
    ]
  },
  {
    "id": "yuria_light",
    "person": "yuria",
    "title": "照明スタッフの作業着",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "スポットライト調整",
      "舞台裏の連携"
    ]
  },
  {
    "id": "leona_show",
    "person": "leona",
    "title": "本番ステージのショードレス",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "カーテンコールの手当て",
      "星明かりのアンコール"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH3=Object.freeze({
  "kei_buyer": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "買付けの先読み"
    ]
  },
  "rara_classic": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "おもてなしの心"
    ]
  },
  "ryo_skate": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "転ばぬための準備"
    ]
  },
  "hinako_cafe": {
    "skills": [
      "single",
      "combo"
    ],
    "passive": [
      "combo_focus",
      "注文を逃さない集中"
    ]
  },
  "lira_bar": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "夜の気配り"
    ]
  },
  "nonoka_bakery": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "やさしい焼きたて"
    ]
  },
  "kohaku_barista": {
    "skills": [
      "shield_one",
      "taunt"
    ],
    "passive": [
      "shield_low",
      "丁寧な一杯"
    ]
  },
  "raimu_studio": {
    "skills": [
      "single",
      "finisher"
    ],
    "passive": [
      "attack",
      "音へのこだわり"
    ]
  },
  "yuria_light": {
    "skills": [
      "ct",
      "attack_up"
    ],
    "passive": [
      "ct_focus",
      "照明の段取り"
    ]
  },
  "leona_show": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "ステージを包む微笑み"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH3=Object.freeze({
  "kei_buyer": {
    "portrait": "assets/UNIT_ART/kei_buyer.webp?v=20261117-sr-batch3"
  },
  "rara_classic": {
    "portrait": "assets/UNIT_ART/rara_classic.webp?v=20261117-sr-batch3"
  },
  "ryo_skate": {
    "portrait": "assets/UNIT_ART/ryo_skate.webp?v=20261117-sr-batch3"
  },
  "hinako_cafe": {
    "portrait": "assets/UNIT_ART/hinako_cafe.webp?v=20261117-sr-batch3"
  },
  "lira_bar": {
    "portrait": "assets/UNIT_ART/lira_bar.webp?v=20261117-sr-batch3"
  },
  "nonoka_bakery": {
    "portrait": "assets/UNIT_ART/nonoka_bakery.webp?v=20261117-sr-batch3"
  },
  "kohaku_barista": {
    "portrait": "assets/UNIT_ART/kohaku_barista.webp?v=20261117-sr-batch3"
  },
  "raimu_studio": {
    "portrait": "assets/UNIT_ART/raimu_studio.webp?v=20261117-sr-batch3"
  },
  "yuria_light": {
    "portrait": "assets/UNIT_ART/yuria_light.webp?v=20261117-sr-batch3"
  },
  "leona_show": {
    "portrait": "assets/UNIT_ART/leona_show.webp?v=20261117-sr-batch3"
  }
});
