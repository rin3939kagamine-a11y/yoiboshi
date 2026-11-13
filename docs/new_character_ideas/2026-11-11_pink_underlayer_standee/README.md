# 2026-11-11 新規立ち絵仮登録

- 素材: `assets/provisional/2026-11-11_pink_underlayer_standee/full_body/pink_underlayer_black_street_v1.png`
- 由来: 2026-11-11の会話で参照写真から作成した宵星向け全身アニメ立ち絵
- 仮識別名: pink_underlayer_black_street_v1（正式キャラクター名は未設定）
- 画像仕様: PNG, 1024×1536, RGB（アルファチャンネルなし）
- 元画像 SHA-256: `edba2b78575fd1ebfb713c47729ef35aeb24b68ff4e65ccb263842cf18099e4c`
- 特徴: 茶髪＋ピンクのインナーカラー、黒いライン入りトップス、黒いカーゴパンツ
- 登録方針: 生成した画像を加工せずそのままバイナリ登録。既存キャラやゲームコードは変更しない。

## QA
- [x] 元画像のバイナリをGitHubに登録（Git blob SHA一致）
- [x] 寸法 1024×1536 を確認
- [ ] 背景透過（**未実施**: 元画像はRGBで、市松模様の背景が画像内に焼き込まれている）
- [ ] ゲーム画面での表示確認
- [ ] 正式キャラクター名・設定・実装可否の決定

**透過未完了のため正式ゲーム素材としては使用しないこと。PRはマージせず仮登録として保留する。**

## 2026-11-13 透過候補の作成と独立QA（正式採用前）

- **元画像 v1 は変更なし**。RGB／アルファなし／焼き込み市松模様であり、元画像は引き続き正式使用禁止。
- **透過候補 v2**: `assets/provisional/2026-11-11_pink_underlayer_standee/full_body/pink_underlayer_black_street_v2_transparency_CANDIDATE.png`
- 作成方法: GitHub Actions上の背景除去モデル `rembg/u2netp` で別ファイルとして生成。ゲーム実装なし。
- [x] 元PNGのSHA-256再検証: `edba2b78575fd1ebfb713c47729ef35aeb24b68ff4e65ccb263842cf18099e4c`
- [x] 元PNGのGit blob SHA再検証: `bd21d625502f298b862fa954276e04eea9551b8b`
- [x] 候補PNG: **1024×1536 / RGBA / アルファ範囲 0〜255**、四隅アルファ0、完全透明ピクセル約69.38%
- [x] GitHubから独立再取得後、候補SHA-256一致: `02977e9175e79b945ea67e08669622cd8ac08b4fc282c19dc9fe268aa4b9f175`
- [x] GitHub上の候補Git blob SHA一致: `53b5f76211945fb6dfda8d1122a6faf374d95e2d`
- [x] 一時的なQA用GitHub Actionsファイルは実行後に削除し、PR差分に残さない。
- [ ] **最優先・目視QA**: 候補PNGに焼き込み市松模様の残留がないか、髪先・指・衣装の輪郭欠損／フリンジがないか確認
- [ ] GitHubブラウザ上で正しく表示されるか目視確認
- [ ] ゲーム内の暗色・明色背景で実表示確認
- [ ] ユーザーによる正式キャラクター名、採否、正式配置先の判断

**判定: 「透過候補の自動生成／ハッシュQAまで完了」。透過品質の目視QA・ゲーム内表示・正式採用は未実施。PRはDraft維持／マージ禁止。**

実行ログ:
- 候補生成: https://github.com/rin3939kagamine-a11y/yoiboshi/actions/runs/43333606962
- GitHub独立再取得照合: https://github.com/rin3939kagamine-a11y/yoiboshi/actions/runs/43333933381
