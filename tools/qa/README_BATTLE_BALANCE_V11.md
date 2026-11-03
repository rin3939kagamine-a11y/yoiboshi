# Battle balance v1.1 — RE:START

## Why
Previous v1.0 fresh-save QA won all 18 quests at Lv1 on the starting party, so training did not gate the later storyline. This version changes enemy-side TURN combat scaling only.

## Parameters
- Chapter 0: unchanged (introductory q1/q2).
- Chapter 1: enemy HP x1.20 -> x1.28, enemy ATK x1.00 -> x1.08.
- Chapter 2: HP x0.88 -> x0.95, ATK x1.00 -> x1.13.
- Chapter 3: HP x0.65 -> x0.86, ATK x0.96 -> x1.28.
- Chapters 4/5: unchanged. All ally stats, attack skills, gold/reward, boss mechanics, and save data unchanged.
- Legacy combat is unchanged; this patch applies to the default turn combat only.

## Reproduction
Run (with Playwright and Chromium installed) from repository root:

```
YOIBOSHI_FRESH_START=1 YOIBOSHI_FRESH_STOP=9 python tools/qa/chapter1_to3_fresh_smoke.py
YOIBOSHI_FRESH_START=10 YOIBOSHI_FRESH_STOP=12 python tools/qa/chapter1_to3_fresh_smoke.py
YOIBOSHI_FRESH_START=13 YOIBOSHI_FRESH_STOP=18 python tools/qa/chapter1_to3_fresh_smoke.py
python tools/qa/test_fresh_route_restore.py
```

The script uses starting Lv1 units, legitimately earned coins and actual `levelUp` calls: Lv3 before q7, Lv4 before q10, Lv7 before q12. It restores real checkpoint saves between segments and passes all 18 quests with no cheat flags.

For quick sampling, after creating `qa_fresh_checkpoints/q18_save.json`:

```
QIDS='q6,q9,q12,q15,q17,q18' SEEDS=12 LEVELS=1,4,7,10 MODE=v11 python tools/qa/battle_balance_probe.py
```

Sample results (12 RNG seeds per combination) are in `QA_BATTLE_BALANCE_V11_RESULTS.json`. In particular, q12 Lv1: 4/12, Lv7: 12/12; q17 Lv1: 5/12, Lv7: 11/12; q18 Lv1: 1/12, Lv7: 12/12. Do not mistake these small deterministic samples for true user success probabilities. The probe sets test levels and resets one quest completion state inside an isolated browser, with render suppression for speed. It does not overwrite player saves.

## Remaining limitations
- Player-facing autoplay and manual play, alternate parties and real 85-95% win-rate calibration are not verified.
- Physical iPhone/Safari and image/audio production integration are not covered.
- Stage 4/5 battle difficulty is not changed or validated by this patch.
- Prior v1.0 reports describe old balance and are historical.
