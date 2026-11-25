/* 2026-11-16: 20 adopted characters stage 2. Genuine R units, q6 gate.
 * Reuse existing skill implementations and ROLES; no game math or save schema changes.
 * PR #109 legacy SR-passive compatibility MUST NOT apply to these 20 IDs.
 */
const NEW_UNIT_ROSTER_V0920=Object.freeze([{"id":"nekomiya_rara_work","person":"nekomiya_rara","title":"しなやかな一撃","rarity":"R","role":"attacker","color":"#aa96ba","gate":"q6","s":["狙い澄ました一手","いたずらな威圧"]}]);
const NEW_UNIT_DESIGN_V0920=Object.freeze({"nekomiya_rara_work":{"skills":["nanami_strike_26","nanami_attack_down"],"passive":["nanami_debuff_extend","気まぐれな余韻"]}});
const NEW_UNIT_ARTWORK_V0920=Object.freeze({"nekomiya_rara_work":{"portrait":"assets/ART_V2/full_body/nekomiya_rara.png?v=1.07.9.1"}});
