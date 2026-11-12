# 作り直し候補02・20・37：元画像の確保と修正待ち

このブランチは、ゲーム実装しない**候補画像の作り直し用**。現状、`candidate_02_preview.b64.txt` 等の3つは検証用に縮小した**元画像の参照プレビュー**であり、修正版の完成画像ではない。ソースの履歴・画像ファイルは削除・変更していない。

| 候補 | 元画像の正本 | ユーザー指定の修正 | 修正版の予定ファイル | 状態 |
|---|---|---|---|---|
| 02 | commit `0b0ed4529e29f6dca50ce81864a34c95180fba71` `assets/provisional_standees/2026-11-08/03_platinum_green_academy_nomask.png` | 髪/顔維持、緑×銀の縞ネクタイと緑裏地ローブに類似しないオリジナル学院風衣装へ再設計 | `assets/character_candidates/2026-11-12_redraw_review/02_platinum_academy_revised.png` | 修正版GitHub未登録（会話内で試作画像のみ） |
| 20 | branch `assets/8-fullbody-candidates-20261108` `assets/ART_V2/full_body/candidates_2026-11-08/01_long_dark_hair_white_shirt.webp` | 右手が画面の端で切れない、指先・靴まで全身収まる構図 | `assets/character_candidates/2026-11-12_redraw_review/20_long_dark_hair_white_shirt_fullhand.png` | 修正版未生成・未登録 |
| 37 | branch `assets/ten-individual-standees-20261109-pending` `assets/character_candidates/2026-11-09_10_fullbody_standees/02_droopy_tee_smile.png` | DROOPY文字と既存アニメ図柄を除去し無地か独自柄のTシャツへ変更 | `assets/character_candidates/2026-11-12_redraw_review/37_smile_original_plaintee.png` | 修正版未生成・未登録 |

## 進行上の約束
- 元画像、既存キャラクター、ストーリー、計算、確率、セーブ形式、juriを改変しない。
- **本ファイルと参照プレビューは作り直し画像の完成を意味しない。**
- 修正版画像を実際にGitHubへ保存できるまでは、「GitHub登録済み」と扱わない。
- ユーザーが作り直し版を承認するまでゲームに組み込まない。
