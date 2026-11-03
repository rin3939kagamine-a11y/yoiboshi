# 第3章・調査パート実操作QA（v0.9）

## 対象・目的

`tools/qa/chapter3_investigation_ui.py` は『宵星の契約者 RE:START』の **現行 `js/investigation.js`** を使い、q13〜q18の調査を画面上のボタンクリックから検証するPlaywrightスモークテストです。前回の戦闘QAが調査完了状態から開始していたため、調査データの参照と推理操作まで実際に通すために用意しました。

**基準：** GitHub `main` commit `0be697ed1875499cdf28ff62e0b634170d4d3d82`（2026-11-03 検証時）。`js/investigation.js` の blob SHA-1：`d8c9f40f2e6582e6df7528dcf3905071fdbc0fd6`。現行データは第1〜5章の30依頼分の調査ケースを登録し、`INVESTIGATION_PAIR_NOTES_V03020` により手がかりの照合ヒントが提供されます。聞き込みでは補足証拠が付く場合があり、通常は3地点で推理に必要な証拠が揃います。

## 実行

完成版リポジトリのルートで以下を実行します。Python 3 と Chromium 対応の Playwright が必要です。

```bash
python -m pip install playwright
python -m playwright install chromium
YOIBOSHI_QA_REPORT=/tmp/yoiboshi_investigation_qa.json python tools/qa/chapter3_investigation_ui.py
```

Windows PowerShell では環境変数を `$env:YOIBOSHI_QA_REPORT = 'investigation_qa.json'` で設定し、`python tools/qa/chapter3_investigation_ui.py` を実行できます。

スクリーンショットは一時フォルダ `yoiboshi_chapter3_investigation_qa` に保存します。出力先を変更する場合は `YOIBOSHI_QA_OUTPUT_DIR` を設定してください。

## 確認内容

- 現行30依頼の調査データの形式・正解・手がかりと地点の参照整合性。
- 390×844、1280×800 で第3章6依頼ずつ計12経路。導入閲覧、同行者選択、3か所の聞き込み、正解選択、残響演出のクリック、出撃ボタンの表示。
- q13で調査結果画面の**実際の出撃ボタン**をクリックし、ターン制AUTOの戦闘エンジンを通して勝利・報酬を確認。
- 誤答→再選択、初回正解ボーナス、補足証拠、葵の特技、調査途中のセーブと旧データ移行処理。
- JavaScript例外ゼロ。

## 制限事項

- 前章までクリア済み、編成は検証用に育成済みの状態をテストコードから設定します。q13だけ本スクリプトで実戦を続行し、q14〜q18は調査完了／出撃ボタン表示までの操作です。
- テストはGitHub PagesにアクセスするE2Eではなく、チェックアウトしたローカルコードをChromiumへ読み込む方式です。静的画像・音声の全ロードやiPhone Safari実機は確認対象外です。
- q17のボス演出を含む第3章12戦（従来型6戦＋ターン制AUTO6戦）の別QAは既存の `tools/qa/chapter3_integration_smoke.py` を実行してください。
- 現時点で確認された調査データは**最新版では正常**です。古いローカル `investigation.js` には第3章以降の統合やヒントが不足するため、旧ファイルを最新版に混ぜて検証しないでください。
