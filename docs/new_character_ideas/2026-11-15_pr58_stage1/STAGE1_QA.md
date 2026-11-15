# PR #58 採用8人・段階1（人物・交流・絆・全身絵）

- 原本: `docs/new_character_ideas/2026-11-15_pr58_adopted8/` の採用済みPNG8点。原本Git blob SHAを `tools/qa/build_pr58_stage1_assets.py` と `tools/qa/pr58_stage1_smoke.py` に固定して照合する
- ID: kawamura_shizuku, ito_ruri, okada_misaki, sasaki_sara, yamada_yuri, shimizu_kotone, fujii_kanon, kobayashi_iori
- 8人のcharacters／interactions／bondsを `js/heroines_v0890.js` に分離。すべてq6クリアで初回出会い・交流解禁。日常8話題・絆5話（親密度20／40／60／80／100）
- 表示配線: `js/heroines_v0890_wire.js`
- 全身PNG: `assets/ART_V2/full_body/{id}.png`。上半身会話切り抜き `assets/ART_V2/upper_body/{id}.webp`、顔アイコン `assets/ART_V2/face_icons/{id}.webp`、各8点（合計16点）
- 7人は原本のまま／不可逆な変更禁止。依央莉のみ安全な外部低アルファ画素除去が可能なら処理。alpha>=128の不透明・半透明画素は完全保護、alpha1..64のうち不透明主体から8ピクセル以上離れた候補だけを対象とし、危険判定では原本に戻す。正確な結果は `qa_artifacts/pr58_stage1/image_report.json` とActionsログで報告する
- 会話画像は全身PNGを切り抜き、WebP lossless。アルファと不透明部の可視RGBを画素比較し、画像生成は一切しない
- 既存の物語本文、既存のキャラ、ユニット、戦闘計算、ガチャレア排出確率、セーブ形式は変更しない。SRユニットは段階2に留保
- 回帰QA内の人物総数だけ、旧200人に8人を加算するよう更新。以前の79人の深掘り内容は維持
- QA: `tools/qa/build_pr58_stage1_assets.py`、`tools/qa/pr58_stage1_smoke.py`、`.github/workflows/qa-pr58-adopted8-stage1.yml`
