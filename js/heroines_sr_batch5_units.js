/* 2026-11-17: SR costume batch5 for existing v0690 heroines.
 * Add costume cards only; the original R cards, heroines, reveal quest gates,
 * save data, battle calculations and gacha rarity rates remain unchanged.
 */
const SR_BATCH5_UNIT_IDS=Object.freeze(["kanoko_scrub","nao_music","miki_salon","mao_hall","himeka_stage","misaki_chef","himari_press","risa_wine","minami_works","noriko_wagashi"]);
const SR_BATCH5_EXISTING_R_IDS=Object.freeze(["kanoko_work","nao_work","miki_work","mao_work","himeka_work","misaki_work","himari_work","risa_work","minami_work","noriko_work"]);
const NEW_UNIT_ROSTER_SR_BATCH5=Object.freeze([
  {
    "id": "kanoko_scrub",
    "person": "kanoko",
    "title": "歯科衛生士のスクラブ",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "口腔ケアの段取り",
      "診療室の連携"
    ]
  },
  {
    "id": "nao_music",
    "person": "nao",
    "title": "音楽の先生の授業スタイル",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "旋律の癒し",
      "合唱のアンコール"
    ]
  },
  {
    "id": "miki_salon",
    "person": "miki",
    "title": "美容室アシスタントの仕事着",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "サロンの頼れる盾",
      "丁寧なアシスト"
    ]
  },
  {
    "id": "mao_hall",
    "person": "mao",
    "title": "ルミエールのホール制服",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "ルミエールの速攻配膳",
      "ホールのラストオーダー"
    ]
  },
  {
    "id": "himeka_stage",
    "person": "himeka",
    "title": "センターのステージ衣装",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "センターの輝き",
      "舞台をつなぐ合図"
    ]
  },
  {
    "id": "misaki_chef",
    "person": "misaki",
    "title": "ビストロシェフの白衣",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "シェフの栄養プレート",
      "温かなビストロの一皿"
    ]
  },
  {
    "id": "himari_press",
    "person": "himari",
    "title": "タウン誌編集者の取材スタイル",
    "rarity": "SR",
    "role": "tank",
    "color": "#82a68b",
    "s": [
      "取材の最前線",
      "編集部の粘り強さ"
    ]
  },
  {
    "id": "risa_wine",
    "person": "risa",
    "title": "ワインレッドの弁護士スーツ",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "異議ありの一撃",
      "弁論の決着"
    ]
  },
  {
    "id": "minami_works",
    "person": "minami",
    "title": "船の整備士のつなぎ",
    "rarity": "SR",
    "role": "support",
    "color": "#668eaf",
    "s": [
      "機関室の整備指示",
      "船員たちの結束"
    ]
  },
  {
    "id": "noriko_wagashi",
    "person": "noriko",
    "title": "和菓子屋の若女将",
    "rarity": "SR",
    "role": "healer",
    "color": "#ba8b77",
    "s": [
      "練り切りの差し入れ",
      "若女将のおもてなし"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH5=Object.freeze({
  "kanoko_scrub": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "先回りの衛生管理"
    ]
  },
  "nao_music": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "音に寄り添う心"
    ]
  },
  "miki_salon": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "小さな気配り"
    ]
  },
  "mao_hall": {
    "skills": [
      "combo",
      "single"
    ],
    "passive": [
      "combo_focus",
      "卓を読む目"
    ]
  },
  "himeka_stage": {
    "skills": [
      "attack_up",
      "shield_all"
    ],
    "passive": [
      "team_start_atk",
      "センターの求心力"
    ]
  },
  "misaki_chef": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "料理人のまごころ"
    ]
  },
  "himari_press": {
    "skills": [
      "shield_one",
      "taunt"
    ],
    "passive": [
      "shield_low",
      "現場の胆力"
    ]
  },
  "risa_wine": {
    "skills": [
      "def_down",
      "finisher"
    ],
    "passive": [
      "attack",
      "理詰めの勝負"
    ]
  },
  "minami_works": {
    "skills": [
      "ct",
      "attack_up"
    ],
    "passive": [
      "ct_focus",
      "緻密なメンテナンス"
    ]
  },
  "noriko_wagashi": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "和菓子の優しさ"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH5=Object.freeze({
  "kanoko_scrub": {
    "portrait": "assets/UNIT_ART/kanoko_scrub.webp?v=20261117-sr-batch5"
  },
  "nao_music": {
    "portrait": "assets/UNIT_ART/nao_music.webp?v=20261117-sr-batch5"
  },
  "miki_salon": {
    "portrait": "assets/UNIT_ART/miki_salon.webp?v=20261117-sr-batch5"
  },
  "mao_hall": {
    "portrait": "assets/UNIT_ART/mao_hall.webp?v=20261117-sr-batch5"
  },
  "himeka_stage": {
    "portrait": "assets/UNIT_ART/himeka_stage.webp?v=20261117-sr-batch5"
  },
  "misaki_chef": {
    "portrait": "assets/UNIT_ART/misaki_chef.webp?v=20261117-sr-batch5"
  },
  "himari_press": {
    "portrait": "assets/UNIT_ART/himari_press.webp?v=20261117-sr-batch5"
  },
  "risa_wine": {
    "portrait": "assets/UNIT_ART/risa_wine.webp?v=20261117-sr-batch5"
  },
  "minami_works": {
    "portrait": "assets/UNIT_ART/minami_works.webp?v=20261117-sr-batch5"
  },
  "noriko_wagashi": {
    "portrait": "assets/UNIT_ART/noriko_wagashi.webp?v=20261117-sr-batch5"
  }
});
