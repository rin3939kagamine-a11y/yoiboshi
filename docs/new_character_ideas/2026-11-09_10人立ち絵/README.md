# 2026-11-09 宵星の契約者 RE:START 個別全身立ち絵10人

## 状態
**PNG実ファイル：GitHub PR #58のブランチに10/10件登録。Draft継続・未マージ。**

2026-11-11にユーザーがこのチャットへ再添付したPNG10枚を、ファイルの内容を一切変更せず、そのままGitHubに登録した。

- 配置：`assets/character_candidates/2026-11-09_10_fullbody_standees/`
- 10枚とも1024×1536、RGBA PNG、透明ピクセルあり
- 今回の添付PNGのSHA-256・バイト数・Git blob SHAを`manifest.json`に記録
- GitHubへのバイナリ転送時にGit blob SHAを元画像から算出した期待値と10件照合済み
- 当初の2026-11-09 manifestとのSHA-256不一致10件は、`previous_manifest_sha256`と`previous_manifest_bytes`として保全
- 当初のチャットZIP `yoiboshi_10_individual_standees_github_ready.zip` は取得できておらず、2026-11-11再添付画像を登録原本として採用
- 髪などの輪郭フチ・残留背景の目視検品と、ゲーム内表示QAは未実施
- キャラクターの正式採用・命名・ゲーム実装は未実施

## 登録後の確認
1. PR HEADツリーの10パスを照合してGit blob SHAとバイト数が`manifest.json`に一致するか確認
2. 透過のフチ、背景残留、体の見切れについて目視QA
3. ゲーム内表示QA

**確認が揃うまではDraft維持・マージ禁止。** ゲームコード・ストーリー・ユニット・セーブには変更しない。
