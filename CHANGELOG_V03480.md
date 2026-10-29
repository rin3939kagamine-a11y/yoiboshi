# 『宵星の契約者 RE:START』Ver.0.34.8.0｜ノエル（concept19）立ち絵6表情差し替え

- 作成日：2026年10月27日
- 適用元：正式開発基準 **Ver.0.34.7.0**
- 成果物：`Yoiboshi_RESTART_v03480_NOEL_EXPRESSIONS_DIFF.zip`
- 適用方法：Ver.0.34.7.0のゲームルートへZIP内の相対パスのまま上書き。**差分ZIP単独では起動できません。**
- 独立プレイ監査・正式採用判定：**Claude担当（未実施）**。以下は制作側のファイル・構文検査です。

## 変更内容

1. ユーザー提供の `concept19_ノエル_立ち絵6表情.zip` に含まれる `assets/ART_V2/expressions/concept19_{normal,smile,blush,pout,sad,surprise}.webp` の **6枚をバイト単位で収録**。描き直し、画像形式変換、画像の再圧縮、リサイズは行っていません。
2. `js/portrait_fit_v031.js` の設定1行を `concept19:{s:0.9,u:0.02,x:0} /* ノエル */,` に変更。`f:1` を削除しました。
3. 同ファイルの冒頭説明で、頭切れ未修正一覧から `concept19(ノエル)` を削除し、**5人→4人** としました。残る対象はミオ・ゆめ・ひより・まろんです。
4. `index.html` のブラウザタイトル、`js/game.js` のタイトル画面／サイドバー／模擬戦入口の版表記を `Ver.0.34.8.0` に変更しました。

## 既存ファイルの変更対象（9ファイル）

- `index.html`
- `js/game.js`
- `js/portrait_fit_v031.js`
- `assets/ART_V2/expressions/concept19_normal.webp`
- `assets/ART_V2/expressions/concept19_smile.webp`
- `assets/ART_V2/expressions/concept19_blush.webp`
- `assets/ART_V2/expressions/concept19_pout.webp`
- `assets/ART_V2/expressions/concept19_sad.webp`
- `assets/ART_V2/expressions/concept19_surprise.webp`

## 制作側の検査

- 提供元ZIPと完成差分ZIPのCRCを検査し、破損なし。
- WebP 6枚：すべて **720×900px・RGBA・アルファチャンネルあり**。
- 6枚のSHA-256が提供元の画像バイト列と一致。ZIPに格納したWebP画像バイトも変更なし。
- `concept18`（莉子）の表情画像／設定は未変更。ほかのキャラの設定も変更なし。
- `js/game.js` と `index.html` はVer.0.34.7.0→0.34.8.0の文字列置換のみ。
- `js/portrait_fit_v031.js` はノエル設定と冒頭説明の3か所のみ更新。
- **未実施**：実際の会話画面での6表情切替、スマホ／PC表示、実機セーブ互換性等。Claudeが独立QAで確認してください。

## 変更禁止項目

戦闘計算、報酬、セーブ形式、ガチャ設定、Q1チュートリアル、他キャラの画像と表示補正値は変更していません。差分にこれらのファイルは含めていません。
