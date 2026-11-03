# 宵星の契約者 RE:START — 第1〜3章 新規セーブ通しQA v1.0

## 対象と変更点

GitHub main `6f761dffb1524519cf55f14092b2fbbe50f91200` (Ver.0.35.6.0) を基準。
新規セーブから序章〜第3章終幕を検査。ゲーム変更は `js/game.js` の「q13の直前に楓との出会いを案内する」1か所のみ。`index.html` ではゲームJSのキャッシュキーを更新。**戦闘能力・報酬・調査データ・人物設定は変更なし。**

## 実行コマンド

ルートから実行。Python 3、`playwright`、Chromiumが必要です。

```sh
python tools/qa/chapter1_to3_fresh_smoke.py
python tools/qa/test_fresh_route_restore.py
```

長い通しテストを分割する場合は、**必ず前のチャンクから実生成されたセーブを引き継ぐこと**（q9/q12等のクリアフラグを偽造しない）。

```sh
YOIBOSHI_FRESH_START=1 YOIBOSHI_FRESH_STOP=9 python tools/qa/chapter1_to3_fresh_smoke.py
YOIBOSHI_FRESH_START=10 YOIBOSHI_FRESH_STOP=12 python tools/qa/chapter1_to3_fresh_smoke.py
YOIBOSHI_FRESH_START=13 YOIBOSHI_FRESH_STOP=18 python tools/qa/chapter1_to3_fresh_smoke.py
python tools/qa/test_fresh_route_restore.py
```

実行によりプロジェクト直下の `qa_fresh_checkpoints/` と `QA_FRESH_*.json` が作られます。正式版のセーブを上書きしない独立したヘッドレスブラウザ環境です。

## 実施済みの確認

- 新規「はじめから」→オープニング→名前入力→序章の選択→依頼q1〜q18。
- 物語の進行には本体の `nextPrologue` / `choosePrologue` / `openStory` / `chooseChapterStory` / `nextStory` を使用。長い本文は一行ずつ人手クリックしていない。
- 調査の同行者・三地点の証拠収集・正解選択・残響演出はPlaywrightで画面のボタンをクリック。
- 本来のターン制AUTOの `tbAutoMove` / `tbAdvance` をタイマー短縮して実行。戦闘数値や編成レベルの改変なし。q12とq17のボス演出はクリックで解除。
- q1〜q18の全18件の調査が解決・初回戦闘に勝利・報酬が付与される。初期4人をLv1のまま使用。
- 途中で実際に保存された q9 / q12 のセーブを `migrateSave` で復元して続行。q12→q13の案内順、q18から第3章終幕、第4章への解放案内を検証。
- 別のChromiumページでセーブを再読み込みし、クリア18件・調査18件・主人公名・選択履歴・第3章終幕の永続化と報酬の二重付与防止を確認。

## 結果

- 18/18調査解決、18/18本編戦闘勝利、章解放と終幕通過。
- QAセグメント（検証記録）: 1〜9:71チェック、10〜12:20チェック、13〜18:69チェック。加えてルート/復元テスト14チェック合格。
- 戦闘難度の要再検証事項：**初期編成のLv1でq18まで全勝**。その結果は「難度が適切」という合格判定ではない。育成・勝率ターゲットに対して独立して調整する。

## 未検証／制約

- iPhone実機、モバイルSafari、公開サイト上の全ボタン操作、音声・全画像素材のロード、章1〜3を1本の人手操作で通す検証。
- 章の長文会話は高速の内部進行関数で処理しているため、全文の表示・誤字・タップ感覚の目視レビューは対象外。
- AUTO行動とステージ演出はタイマーを短縮しているため、通常の実時間速度・実際の操作負荷は別検査が必要。
- 調査は正解ルートで進行。誤答・救済分岐は別の `chapter3_investigation_ui.py` による既存QAを参照。
