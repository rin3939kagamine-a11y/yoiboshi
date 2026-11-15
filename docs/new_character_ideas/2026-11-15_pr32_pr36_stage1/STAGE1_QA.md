# PR #32/#36 approved 7 standees — stage 1 QA

- Source directories: `docs/new_character_ideas/2026-11-15_pr32_approved3/` and `docs/new_character_ideas/2026-11-15_pr36_approved4/` (untouched)
- Full body: `assets/ART_V2/full_body/{id}.png` — Git blob identical to approved originals
- Dialogue crops: `assets/ART_V2/upper_body/{id}.webp` (720×960), `assets/ART_V2/face_icons/{id}.webp` (400×400) generated **only from the original full body** in CI, WEBP lossless.
- Hoshino Emiri: halo is deliberately **not removed**. No opaque pixels, fringe pixels, or alpha values are changed; retain approved original for further manual QA.
- New character data isolated in `js/heroines_v0870.js` and image wiring in `js/heroines_v0870_wire.js`.
- Gate is quest q6 for all 7. Daily topics 8 / meeting 1 / bond episodes 5 each at affinity 20,40,60,80,100.
- Stage 1 only: **no SR units**, no gacha pool additions, no rarity change.
- Save keys/migration, legacy character data, existing story text, calculations and probability distribution must remain unchanged.
- Automated QA: `tools/qa/build_pr32_pr36_stage1_crops.py` and `tools/qa/pr32_pr36_stage1_smoke.py`; Actions uploads `qa-pr32-pr36-stage1` artifact with source hashes, image crop boxes, light/dark previews and browser results.
