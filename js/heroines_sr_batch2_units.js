/* 2026-11-17: approved SR costume batch 2. Only new cards for existing persons.
 * The nine v0500 people and ruru retain their respective reveal conditions.
 * Existing character records, R cards, icon art, rates and save schema are unchanged.
 */
const SR_BATCH2_UNIT_IDS=Object.freeze(["urara_izakaya","mizore_cinema","ayane_market","miyu_hakama","arisa_show","kotoha_atelier","yukino_trip","nene_staff","yukari_silver","ruru_dollshop"]);
const SR_BATCH2_EXISTING_R_IDS=Object.freeze(["urara_work","mizore_work","ayane_work","miyu_work","arisa_work","kotoha_work","yukino_work","nene_work","yukari_work","ruru_work"]);
const NEW_UNIT_ROSTER_SR_BATCH2=Object.freeze([
  {
    "id": "urara_izakaya",
    "person": "urara",
    "title": "とまり木の女将",
    "rarity": "SR",
    "role": "support",
    "color": "#ab8071",
    "s": [
      "常連さんにもう一杯",
      "とまり木の賑わい"
    ]
  },
  {
    "id": "mizore_cinema",
    "person": "mizore",
    "title": "スクリーンの向こう側",
    "rarity": "SR",
    "role": "attacker",
    "color": "#9b9caa",
    "s": [
      "暗転・一瞬の閃き",
      "上映終了の合図"
    ]
  },
  {
    "id": "ayane_market",
    "person": "ayane",
    "title": "手作り市の温もり",
    "rarity": "SR",
    "role": "healer",
    "color": "#c799a9",
    "s": [
      "手仕事のやさしさ",
      "みんなに小さな贈り物"
    ]
  },
  {
    "id": "miyu_hakama",
    "person": "miyu",
    "title": "矢絣に宿る意志",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a9a1bc",
    "s": [
      "矢絣の一閃",
      "袴さばきの連撃"
    ]
  },
  {
    "id": "arisa_show",
    "person": "arisa",
    "title": "紅黒のショータイム",
    "rarity": "SR",
    "role": "attacker",
    "color": "#d6a272",
    "s": [
      "スポットライト・ラッシュ",
      "紅黒のフィナーレ"
    ]
  },
  {
    "id": "kotoha_atelier",
    "person": "kotoha",
    "title": "アトリエの仕立て",
    "rarity": "SR",
    "role": "tank",
    "color": "#aaa1bb",
    "s": [
      "仕立ての補強",
      "デザイナーの守り"
    ]
  },
  {
    "id": "yukino_trip",
    "person": "yukino",
    "title": "旅先の決定的瞬間",
    "rarity": "SR",
    "role": "attacker",
    "color": "#7d899e",
    "s": [
      "シャッターチャンス",
      "旅路の見極め"
    ]
  },
  {
    "id": "nene_staff",
    "person": "nene",
    "title": "本番前の段取り",
    "rarity": "SR",
    "role": "support",
    "color": "#b2a07d",
    "s": [
      "本番前の進行調整",
      "現場の安全確認"
    ]
  },
  {
    "id": "yukari_silver",
    "person": "yukari",
    "title": "銀細工の火花",
    "rarity": "SR",
    "role": "attacker",
    "color": "#92979d",
    "s": [
      "銀の刻印",
      "磨き上げた一撃"
    ]
  },
  {
    "id": "ruru_dollshop",
    "person": "ruru",
    "title": "お人形とレースの午後",
    "rarity": "SR",
    "role": "attacker",
    "color": "#a87ca8",
    "s": [
      "ドールステップ",
      "レースの決めポーズ"
    ]
  }
]);
const NEW_UNIT_DESIGN_SR_BATCH2=Object.freeze({
  "urara_izakaya": {
    "skills": [
      "attack_up",
      "ct"
    ],
    "passive": [
      "team_start_atk",
      "女将の気配り"
    ]
  },
  "mizore_cinema": {
    "skills": [
      "single",
      "stun"
    ],
    "passive": [
      "attack",
      "映写室の集中"
    ]
  },
  "ayane_market": {
    "skills": [
      "heal_one",
      "heal_all"
    ],
    "passive": [
      "heal",
      "ひと針の真心"
    ]
  },
  "miyu_hakama": {
    "skills": [
      "pierce",
      "combo"
    ],
    "passive": [
      "pierce_focus",
      "役に入り込む集中"
    ]
  },
  "arisa_show": {
    "skills": [
      "aoe",
      "finisher"
    ],
    "passive": [
      "combo_focus",
      "舞台への覚悟"
    ]
  },
  "kotoha_atelier": {
    "skills": [
      "shield_one",
      "damage_reduce"
    ],
    "passive": [
      "shield_low",
      "着る人を守る技"
    ]
  },
  "yukino_trip": {
    "skills": [
      "def_down",
      "pierce"
    ],
    "passive": [
      "pierce_focus",
      "旅慣れた観察眼"
    ]
  },
  "nene_staff": {
    "skills": [
      "ct",
      "defense_up"
    ],
    "passive": [
      "ct_focus",
      "舞台裏の連携"
    ]
  },
  "yukari_silver": {
    "skills": [
      "pierce",
      "def_down"
    ],
    "passive": [
      "pierce_focus",
      "手元の確かさ"
    ]
  },
  "ruru_dollshop": {
    "skills": [
      "combo",
      "finisher"
    ],
    "passive": [
      "combo_focus",
      "細部までこだわる心"
    ]
  }
});
const NEW_UNIT_ARTWORK_SR_BATCH2=Object.freeze({
  "urara_izakaya": {
    "portrait": "assets/UNIT_ART/urara_izakaya.webp?v=20261117-sr-batch2"
  },
  "mizore_cinema": {
    "portrait": "assets/UNIT_ART/mizore_cinema.webp?v=20261117-sr-batch2"
  },
  "ayane_market": {
    "portrait": "assets/UNIT_ART/ayane_market.webp?v=20261117-sr-batch2"
  },
  "miyu_hakama": {
    "portrait": "assets/UNIT_ART/miyu_hakama.webp?v=20261117-sr-batch2"
  },
  "arisa_show": {
    "portrait": "assets/UNIT_ART/arisa_show.webp?v=20261117-sr-batch2"
  },
  "kotoha_atelier": {
    "portrait": "assets/UNIT_ART/kotoha_atelier.webp?v=20261117-sr-batch2"
  },
  "yukino_trip": {
    "portrait": "assets/UNIT_ART/yukino_trip.webp?v=20261117-sr-batch2"
  },
  "nene_staff": {
    "portrait": "assets/UNIT_ART/nene_staff.webp?v=20261117-sr-batch2"
  },
  "yukari_silver": {
    "portrait": "assets/UNIT_ART/yukari_silver.webp?v=20261117-sr-batch2"
  },
  "ruru_dollshop": {
    "portrait": "assets/UNIT_ART/ruru_dollshop.webp?v=20261117-sr-batch2"
  }
});
