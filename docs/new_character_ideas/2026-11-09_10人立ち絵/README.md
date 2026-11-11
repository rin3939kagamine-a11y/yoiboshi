# 2026-11-09 宵星の契約者 RE:START 個別全身立ち絵10人

## 状態
**PNG実ファイル：GitHub未登録（0/10）／ドキュメント登録済み（manifestのみ）。PR #58はDraft継続。**

2026-11-09に作成された個別全身立ち絵10枚の登録待ちPR。
2026-11-11にユーザーがこのチャットへPNG10枚を再添付したため、同日の**添付PNGそのもの**のSHA-256・バイト数に合わせて `manifest.json` を更新した。

- 予定配置：`assets/character_candidates/2026-11-09_10_fullbody_standees/`
- 添付画像は全10件 1024×1536、RGBA PNG、透明ピクセルあり（バイナリに対して検証）
- **元の2026-11-09 manifestのSHA-256と、再添付10枚のSHA-256は全件不一致**
- 旧ハッシュ・旧バイト数は `previous_manifest_sha256` / `previous_manifest_bytes` として保存
- 当初のチャット内ZIP：`yoiboshi_10_individual_standees_github_ready.zip` は今回取得できていない
- 2026-11-11に再添付されたPNG10枚はZIPに再梱包し、ローカルでのSHA-256一致とZIP CRCを確認した（**GitHubには未転送**）
- 髪など輪郭のフチ・残留背景の目視検品と、ゲーム内表示QAは未完了
- キャラクター正式採用、命名、ゲーム実装は未実施

## 次の作業
1. 今回の再添付PNG10枚を `manifest.json` の予定パスへ**PNGバイナリのまま**コミット
2. GitHubから10枚を読み戻し、`manifest.json` の新SHA-256・バイト数と照合
3. 透過の目視QA・ゲーム内表示QA後にレビュー（それまではDraft維持、マージ禁止）

※現時点のSHA-256記録はPNGのGitHub登録を証明しない。ゲームコード・ストーリー・ユニット・セーブは変更しない。
