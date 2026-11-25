/* 2026-11-25: 1 new q6 R heroine; reuse existing standard role effects. */
const NEW_UNIT_ROSTER_V1110=Object.freeze([{"id": "takizawa_eri_work", "person": "takizawa_eri", "title": "広報のコート姿", "rarity": "R", "role": "support", "color": "#668eaf", "gate": "q6", "s": ["えりの新作カタログ", "広報の段取り"]}]);
const NEW_UNIT_DESIGN_V1110=Object.freeze({"takizawa_eri_work": {"skills": ["v0950_mia_attack", "cecil_team_ct"], "passive": ["v0950_buff", "段取りの良さ"]}});
const NEW_UNIT_ARTWORK_V1110=Object.freeze(Object.fromEntries(NEW_UNIT_ROSTER_V1110.map(u=>[u.id,{portrait:'assets/ART_V2/full_body/'+u.person+'.png'}])));
