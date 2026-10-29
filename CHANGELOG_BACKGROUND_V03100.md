# 『宵星の契約者 RE:START』Ver.0.31.0.0 会話背景実装

**基準**: `Yoiboshi_RESTART_v03020_local_FULL.zip`（Ver.0.30.2.0）。他の旧版は使用していません。

## 差分ZIP内容

- `index.html`：新規JSを `js/investigation.js` より後・`js/game.js` より前で読み込み、タイトルをVer.0.31.0.0へ更新。
- `js/story_backgrounds_v031.js`（新規）：12枚のファイル辞書、26話の背景辞書、`resolveStoryBackground(storyId, lineIndex)`、行別上書き準備、非同期画像先読みと常駐キャッシュ／失敗時の従来表示。
- `js/game.js`：`openStory()` で先読み、`chapterStoryPage()` のみに背景レイヤー・`has-bg` を挿入。画面内バージョン表示2か所更新。
- `css/styles.css`：背景・下部グラデーション・立ち絵・ツールバー・セリフ欄の階層化。背景付き章会話に限りスマホの既存ページ左右余白を取り除き、画面全幅を確保。
- `CHANGELOG_BACKGROUND_V03100.md`：この資料。

**背景画像は本差分ZIPに含めていません。** 別添の `Yoiboshi_BACKGROUNDS_v1_12_webp.zip` を展開し、12ファイルを元のまま `assets/ART_V2/backgrounds/` に配置してください。WebPの変換・再圧縮はしていません。

## 話ID別 背景対応表（26件）

| 話ID | 表示ファイル | ブラウザ確認 |
|---|---|---|
| `chapter1_open` | `assets/ART_V2/backgrounds/bg_soudan_day.webp` | OK |
| `chapter2_open` | `assets/ART_V2/backgrounds/bg_soudan_day.webp` | OK |
| `chapter3_end` | `assets/ART_V2/backgrounds/bg_soudan_day.webp` | OK |
| `chapter4_open` | `assets/ART_V2/backgrounds/bg_soudan_day.webp` | OK |
| `chapter5_open` | `assets/ART_V2/backgrounds/bg_soudan_day.webp` | OK |
| `q15` | `assets/ART_V2/backgrounds/bg_soudan_day.webp` | OK |
| `chapter1_end` | `assets/ART_V2/backgrounds/bg_soudan_night.webp` | OK |
| `chapter2_end` | `assets/ART_V2/backgrounds/bg_soudan_night.webp` | OK |
| `chapter3_open` | `assets/ART_V2/backgrounds/bg_soudan_night.webp` | OK |
| `chapter4_end` | `assets/ART_V2/backgrounds/bg_soudan_night.webp` | OK |
| `q30_intro` | `assets/ART_V2/backgrounds/bg_soudan_night.webp` | OK |
| `q22_intro` | `assets/ART_V2/backgrounds/bg_shotengai_day.webp` | OK |
| `q22_pre` | `assets/ART_V2/backgrounds/bg_shotengai_dusk.webp` | OK |
| `q22` | `assets/ART_V2/backgrounds/bg_shotengai_dusk.webp` | OK |
| `chihiro_meet` | `assets/ART_V2/backgrounds/bg_shotengai_day.webp` | OK |
| `sanae_meet` | `assets/ART_V2/backgrounds/bg_shotengai_day.webp` | OK |
| `q3` | `assets/ART_V2/backgrounds/bg_ekimae_dusk.webp` | OK |
| `q6` | `assets/ART_V2/backgrounds/bg_lighthouse_night.webp` | OK |
| `q13_intro` | `assets/ART_V2/backgrounds/bg_lighthouse_dusk.webp` | OK |
| `q13` | `assets/ART_V2/backgrounds/bg_lighthouse_dusk.webp` | OK |
| `q27_intro` | `assets/ART_V2/backgrounds/bg_lighthouse_day.webp` | OK |
| `q27_pre` | `assets/ART_V2/backgrounds/bg_lighthouse_dusk.webp` | OK |
| `q27` | `assets/ART_V2/backgrounds/bg_lighthouse_night.webp` | OK |
| `q28_intro` | `assets/ART_V2/backgrounds/bg_toushitsu.webp` | OK |
| `q28_pre` | `assets/ART_V2/backgrounds/bg_toushitsu.webp` | OK |
| `q28` | `assets/ART_V2/backgrounds/bg_toushitsu.webp` | OK |

**割当なし（従来表示）**: `q29`、`q30_pre`、`q30`、`chapter5_end`、`q24_intro`、`q24_pre`、`q24`、`q16_intro`、`q18_intro`、`q18` その他未指定の話。これらには背景を追加していません。

**例外ルール**: `soudan:dusk` は `soudan:day` に代替、`toushitsu` は時間帯を無視します。会話の行データに `bg:'背景ID:時間帯'` がある場合はその行を優先します（既存シナリオの各行に `bg` は追記していません）。無効な指定は従来背景とします。

## QA（実行済み）

- 元のFULL ZIPと背景ZIPはZIPの整合性検査に合格。背景全12枚は1024×1536のWebPであることを検査。
- ローカル統合テスト用に元FULL ZIPと背景ZIPをそのまま展開し、差分4ファイルを上書きした環境で検証。
- `node --check`：ゲーム内JS 30ファイルすべて合格（追加JSを含む）。
- Chromium（Headless、ローカルソースをインライン読込、画像はローカルからネットワーク応答を模擬）でJavaScript例外0件。
- 会話画面で26話とも指定どおりの背景URLを取得・表示。コード上の対応表は提供された指定と一致。
- 背景12ファイルすべてがブラウザ内でロード・デコードでき、404は0件（12/12）。ただし対応表から実際に使用されるのは9種類で、`shotengai_night` / `ekimae_day` / `ekimae_night` は割当なし。
- 39行の `q30_intro` で「次へ」12回を実行し、同一背景URLが維持されることを確認。「戻る」も正常に1行戻り、画面内に戻る・スキップ・閉じるを確認。
- 390pxと1280pxの両幅で背景は画面全幅・全高を占め、`pointer-events:none`。重なり順は背景z0、下部グラデーションz1、立ち絵z2、セリフ欄z5、ツールバーz7。
- 背景未割当の12ケースでは `null` を返して従来描画。`bg` の行別上書き、夕方代替、時間帯なしの灯室、無効指定をブラウザ確認。
- 意図的に `bg_ekimae_dusk.webp` を404にした場合、例外なし・`has-bg` なし・従来スカイライン表示になることを検証。

## 未検証・留意事項

- iPhone/Android実機での描画・操作・端末固有の画像読み込み挙動は未検証。
- 上記ブラウザ検証はセーブ進行を人工的に直接セットして対象話を表示するQAであり、序章から第5章までをゲーム画面上で通しプレイした検証ではありません。
- 通常のHTTP配信・Dropboxの公開先・各種ブラウザでのネットワーク配信は未検証。ローカル提供画像をブラウザに渡すQAでは12枚すべて正常ロード。
- 「ちらつきなし」は、先読みキャッシュと12回送り時の背景URLの維持を検証。高速度撮影による画素単位のフラッシュ測定ではありません。
- プロローグ・おでかけ・戦闘・ホーム・調査・ガチャ・育成には変更を加えていません。ストーリー本文、セーブ処理も変更していませんが、旧セーブの長期利用回帰テストは未実施。

## 適用方法

1. 元のVer.0.30.2.0 FULL ZIPを展開。
2. 本差分ZIPの5ファイルを階層を保持して上書き／追加。
3. 背景ZIPの12 WebPファイルを `assets/ART_V2/backgrounds/` に配置。
4. `index.html` を開き、章会話で背景が表示されることを確認。
