/* 2026-11-16: 10 SR costume variations for existing v0500 heroines.
 * No new heroine IDs; no existing unit is replaced. Existing battle handlers and role stats.
 */
const SR_BATCH1_UNIT_IDS=Object.freeze(["kaori_concert","rui_atelier","suzune_enbu","chikage_holiday","sumire_classic","wakaba_midnight","mitsuki_ca","komugi_ehon","haruka_bride","kirie_koubou"]);
const SR_BATCH1_EXISTING_R_IDS=Object.freeze(["kaori_work","rui_work","suzune_work","chikage_work","sumire_work","wakaba_work","mitsuki_work","komugi_work","haruka_work","kirie_work"]);
const NEW_UNIT_ROSTER_SR_BATCH1=Object.freeze([
  {
    "id": "kaori_concert",
    "person": "kaori",
    "title": "星降るコンサート",
    "rarity": "SR",
    "role": "support",
    "color": "#9c82b4",
    "s": [
      "星刺繍の独唱",
      "星降るアンコール"
    ]
  },
  {
    "id": "rui_atelier",
    "person": "rui",
    "title": "ネームが走るアトリエ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#9b91bc",
    "s": [
      "アトリエのペン先",
      "締切前の集中線"
    ]
  },
  {
    "id": "suzune_enbu",
    "person": "suzune",
    "title": "紅龍の演舞",
    "rarity": "SR",
    "role": "attacker",
    "color": "#ca679c",
    "s": [
      "紅龍の一閃",
      "龍舞・千の軌跡"
    ]
  },
  {
    "id": "chikage_holiday",
    "person": "chikage",
    "title": "木漏れ日の休日",
    "rarity": "SR",
    "role": "tank",
    "color": "#a08484",
    "s": [
      "休日の木漏れ日",
      "ひだまりの傘"
    ]
  },
  {
    "id": "sumire_classic",
    "person": "sumire",
    "title": "クラシカル・メイド",
    "rarity": "SR",
    "role": "tank",
    "color": "#777b9e",
    "s": [
      "クラシカルな給仕",
      "お屋敷の鉄壁作法"
    ]
  },
  {
    "id": "wakaba_midnight",
    "person": "wakaba",
    "title": "真夜中の放送室",
    "rarity": "SR",
    "role": "attacker",
    "color": "#7d9c84",
    "s": [
      "深夜零時の電波",
      "眠らぬオンエア"
    ]
  },
  {
    "id": "mitsuki_ca",
    "person": "mitsuki",
    "title": "大空のおもてなし",
    "rarity": "SR",
    "role": "support",
    "color": "#a7a0c2",
    "s": [
      "空の安全確認",
      "搭乗前のエール"
    ]
  },
  {
    "id": "komugi_ehon",
    "person": "komugi",
    "title": "星空の読み聞かせ",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba947f",
    "s": [
      "星空のおはなし",
      "みんなにおやすみ"
    ]
  },
  {
    "id": "haruka_bride",
    "person": "haruka",
    "title": "永遠を誓う純白",
    "rarity": "SR",
    "role": "support",
    "color": "#c9a28c",
    "s": [
      "誓いのベル",
      "純白の守り歌"
    ]
  },
  {
    "id": "kirie_koubou",
    "person": "kirie",
    "title": "鍵の生まれる工房",
    "rarity": "SR",
    "role": "attacker",
    "color": "#687e91",
    "s": [
      "鍵穴の見極め",
      "錠前を穿つ一打"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH1=Object.freeze({
  "kaori_concert": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "聴衆の心をつなぐ歌"
    ]
  },
  "rui_atelier": {
    "skills": [
      "combo",
      "def_down"
    ],
    "passive": [
      "attack",
      "描き抜く執念"
    ]
  },
  "suzune_enbu": {
    "skills": [
      "pierce",
      "aoe"
    ],
    "passive": [
      "pierce_focus",
      "積み重ねた型"
    ]
  },
  "chikage_holiday": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "穏やかな見守り"
    ]
  },
  "sumire_classic": {
    "skills": [
      "defense_up",
      "taunt"
    ],
    "passive": [
      "defense_up_focus",
      "一分の隙もない所作"
    ]
  },
  "wakaba_midnight": {
    "skills": [
      "single",
      "stun"
    ],
    "passive": [
      "attack",
      "放送前の集中"
    ]
  },
  "mitsuki_ca": {
    "skills": [
      "ct",
      "attack_up"
    ],
    "passive": [
      "ct_focus",
      "機内の段取り"
    ]
  },
  "komugi_ehon": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "ページをめくる優しさ"
    ]
  },
  "haruka_bride": {
    "skills": [
      "attack_up",
      "shield_all"
    ],
    "passive": [
      "team_start_atk",
      "幸せを分け合う誓い"
    ]
  },
  "kirie_koubou": {
    "skills": [
      "pierce",
      "finisher"
    ],
    "passive": [
      "pierce_focus",
      "手の感覚で読む仕組み"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH1=Object.freeze({
  "kaori_concert": {
    "portrait": "assets/UNIT_ART/kaori_concert.webp?v=20261116-sr-batch1"
  },
  "rui_atelier": {
    "portrait": "assets/UNIT_ART/rui_atelier.webp?v=20261116-sr-batch1"
  },
  "suzune_enbu": {
    "portrait": "assets/UNIT_ART/suzune_enbu.webp?v=20261116-sr-batch1"
  },
  "chikage_holiday": {
    "portrait": "assets/UNIT_ART/chikage_holiday.webp?v=20261116-sr-batch1"
  },
  "sumire_classic": {
    "portrait": "assets/UNIT_ART/sumire_classic.webp?v=20261116-sr-batch1"
  },
  "wakaba_midnight": {
    "portrait": "assets/UNIT_ART/wakaba_midnight.webp?v=20261116-sr-batch1"
  },
  "mitsuki_ca": {
    "portrait": "assets/UNIT_ART/mitsuki_ca.webp?v=20261116-sr-batch1"
  },
  "komugi_ehon": {
    "portrait": "assets/UNIT_ART/komugi_ehon.webp?v=20261116-sr-batch1"
  },
  "haruka_bride": {
    "portrait": "assets/UNIT_ART/haruka_bride.webp?v=20261116-sr-batch1"
  },
  "kirie_koubou": {
    "portrait": "assets/UNIT_ART/kirie_koubou.webp?v=20261116-sr-batch1"
  }
});
