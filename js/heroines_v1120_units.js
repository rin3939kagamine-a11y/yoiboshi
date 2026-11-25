/* 2026-11-25: 1 new q6 R heroine; reuse existing standard role effects. */
const NEW_UNIT_ROSTER_V1120=Object.freeze([{"id": "takagi_amu_work", "person": "takagi_amu", "title": "ビールジョッキのキャスト", "rarity": "R", "role": "attacker", "color": "#a87ca8", "gate": "q6", "s": ["あむの乾杯コール", "ビアガーデンの盛り上げ役"]}]);
const NEW_UNIT_DESIGN_V1120=Object.freeze({"takagi_amu_work": {"skills": ["single", "rio_aoe_18"], "passive": ["v0950_attack", "底抜けの明るさ"]}});
const NEW_UNIT_ARTWORK_V1120=Object.freeze(Object.fromEntries(NEW_UNIT_ROSTER_V1120.map(u=>[u.id,{portrait:'assets/ART_V2/full_body/'+u.person+'.png'}])));
