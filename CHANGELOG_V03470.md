# 『宵星の契約者 RE:START』Ver.0.34.7.0｜莉子（concept18）立ち絵6表情差し替え

- 作成日：2026年10月27日
- 適用元：正式開発基準 **Ver.0.34.6.0**
- 成果物：`Yoiboshi_RESTART_v03470_RIKO_EXPRESSIONS_DIFF.zip`
- 適用方法：Ver.0.34.6.0のゲームルートフォルダへZIP内の相対パスのまま上書きしてください。**差分単体では起動できません。**
- **正式採用はClaudeの独立監査後に判定**します。これは開発側の内部検証結果です。

## 変更内容

1. 添付 `concept18_莉子_立ち絵6表情.zip` のWebP 6ファイルを**バイト単位でそのまま収録**（再生成・再圧縮・リサイズなし）。対象：`assets/ART_V2/expressions/concept18_{normal,smile,blush,pout,sad,surprise}.webp`。
2. `js/portrait_fit_v031.js`：莉子のみ `concept18:{s:0.9,u:0.02,x:0} /* 莉子 */,` へ変更。頭切れ補正 `f:1` を削除。
3. 同ファイルの冒頭説明から「画像の作り直し待ち」の莉子を削除し、残る人数を6人から5人へ修正。ほかの人物の設定は変更なし。
4. `index.html`：ブラウザタイトルの版表記を `Ver.0.34.7.0` に変更。
5. `js/game.js`：タイトル画面・サイドバー・模擬戦入口の版表記3か所を `Ver.0.34.7.0` に変更。

## 変更ファイル（既存9件）

- `index.html`
- `js/game.js`
- `js/portrait_fit_v031.js`
- `assets/ART_V2/expressions/concept18_normal.webp`
- `assets/ART_V2/expressions/concept18_smile.webp`
- `assets/ART_V2/expressions/concept18_blush.webp`
- `assets/ART_V2/expressions/concept18_pout.webp`
- `assets/ART_V2/expressions/concept18_sad.webp`
- `assets/ART_V2/expressions/concept18_surprise.webp`

## 内部検証

- ユーザー提供ZIPのCRC検査合格、WebP6枚とも **720×900px / RGBA / 透過あり** を確認。画像6枚のSHA-256は元ZIP内のバイト列と一致。
- 元版との照合で、画像6点と上記の3コードファイルのみ変更。莉子以外の立ち絵・フィット値、戦闘計算、ガチャ、報酬、セーブ形式、Q1チュートリアルを含むその他のファイルは変更しません。
- JS構文、差分ZIP CRC、差分収録物の厳密一致を検査。
- **未実施：実ブラウザでの表示確認、他表情への切替、実機検査。** 独立QAはClaude担当。

## 補足

添付ZIPには別途の説明書ファイルは含まれていませんでした。補正値 `concept18:{s:0.9,u:0.02,x:0}` は、ご依頼本文に明示された値を採用しています。
