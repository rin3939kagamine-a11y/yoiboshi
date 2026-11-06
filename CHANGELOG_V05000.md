# CHANGELOG Ver.0.50.0.0 — 新ヒロイン19人（準備ブランチ）

作成日: 2026-11-06。基準: draft PR #24 (concept canonical ID + 天音エナ) の先端から分岐。
公開判定: **保留 / draft**。画像バイナリ未投入・感情別差分未制作・QA未完了のため main へマージ不可。

## 19人と章連動の暫定解放

| ID | 名前 | 年齢 | 職業 | 解放（クエストクリア） |
|---|---|---:|---|---|
| `kaori` | 御影 歌織 | 29 | ソプラノ歌手 | `q24` |
| `rui` | 芹沢 るい | 24 | 漫画家 | `q18` |
| `suzune` | 鳳 すずね | 23 | 中国武術演舞者 | `q26` |
| `chikage` | 宗像 千景 | 31 | 保育士 | `q21` |
| `sumire` | 九条 すみれ | 24 | ハウスキーパー | `q73` |
| `wakaba` | 筒井 わかば | 25 | 放送作家 | `q97` |
| `mitsuki` | 高槻 美月 | 27 | 元CA・観光案内所職員 | `q31` |
| `komugi` | 森崎 こむぎ | 26 | 絵本作家 | `q49` |
| `haruka` | 芹沢 はるか | 28 | ウエディングプランナー | `q37` |
| `kirie` | 御堂 キリエ | 27 | 鍵師 | `q79` |
| `urara` | 赤坂 うらら | 29 | 居酒屋店主 | `q97` |
| `mizore` | 柊 みぞれ | 24 | シネコンスタッフ | `q32` |
| `ayane` | 椎名 あやね | 22 | 雑貨店員・スマホケース作家 | `q30` |
| `miyu` | 早乙女 みゆ | 21 | 若手女優 | `q38` |
| `arisa` | 一ノ瀬 アリサ | 26 | ショーレストランのパフォーマー | `q35` |
| `kotoha` | 桂木 ことは | 28 | ドレスデザイナー | `q40` |
| `yukino` | 北条 ゆきの | 25 | 旅行ライター | `q50` |
| `nene` | 小鳥遊 ねね | 22 | イベント会社新人 | `q52` |
| `yukari` | 九条 ゆかり | 24 | シルバーアクセサリー職人 | `q75` |

既存の物語本文を変更せず、対応クエストのクリアフラグによって募集と交流を解放する暫定配置。 特に既存第2部の描写に合わせ、すみれは第2部3章q73、キリエは第2部4章q79、わかばとうららは第2部7章q97。 こむぎは灯台・絵本の接点で第9章q49、ゆかりは双子のすみれ登場後のq75を設定。

## 登録と互換性

- 19人の会話はVer.0.42と同じ15分類のデータ構造で、8話題×19・絆物語5話×19=95話を追加（既存本文改変なし）。
- 新SR/SSR/URユニット計57件。配分は**仮**。既存R廃止方針を尊重して新Rは追加しない。
- 新規19人は**独立した選択式募集枠**に分離。旧NORMAL_GACHA_POOLの構成、RATE={SR:80,SSR:15,UR:5}、天井、戦闘計算には手を入れない。解放後に選択できる。
- 姉妹：芹沢はるか（姉28）／芹沢るい（妹24）。双子：九条すみれ／九条ゆかり（共に24、二卵性）。改名：柊みぞれ（旧すず）。
- アリサは私服版を基本立ち絵、ポリス衣装をUR枠に割り当て。わかばは外出着が基本、部屋着は衣装差分扱い。
- 指定正本PNGのSHA256：rui `6805b79b826155da327c3c384936fc5e1bbd72e1a3b6fd62cd122082251edd6c`; kaori `045254d57e87f920c41351e47e578f68034dc4c6bc1ee060ef5757b20d0fecf1`; suzune `e2cc62b92c479ebb5ddfab648769d20bb75b3551ec40e9a78cc5255ae628c8ec`。元PNGを無改変で素材ZIPに同梱し、実ゲームの `assets/ART_V2/full_body/{rui,kaori,suzune}.png` にもバイト同一で配置。
- `docs/new_character_ideas_v1` は確認時のmainに存在せず。7人案・8人案のREADMEとユーザー確定事項を優先した。

## 実施状況とテスト

| 項目 | 状態 | コメント |
|---|---|---|
| 人物データ19人 | **実装済み** | 19 profiles; moods/likes/8 topics/5 bond episodes each; legacy 60 unchanged |
| 章連動解放19人 | **実装済み** | existing quest completion qXX; recruitment and dialogue gated |
| character_depth 79人 | **実装済み** | affinity 40/80 gates preserved |
| UNIT_ART work/sky/star | **一部完了** | 57 image files in companion ZIP, not uploaded to git. Sky/star provisional same full-body art |
| full_body/upper_body/face icon | **一部完了** | 19× each in ZIP; 3 authoritative PNGs preserved byte-identically |
| expressions ×6 | **正式に不採用** | 表情画像は全81人ぶんの記号・動作方式に統一。既存の表情画像は削除せず保存。 |
| sr_gallery.html 79人 | **実装済み** | original 60 entries in order, appended 19 |
| QA workflow and browser test | **実行済み：PASS** | GitHub Actions: 19人×95話×57ユニット、character-depth 79人・25 assertions・親密度5段階 |
| Save compatibility | **実行済み：PASS（既存回帰）** | Concept/エナ移行CI、旧セーブ原本不変・冪等変換・既存ユニット保持PASS。利用者の実セーブでの端末検証は未実施 |
| mobile view QA | **実行済み：PASS（自動試験）** | 5幅の新募集ビュー＋character-depth、追加で既存モバイル107 checks／9 viewports PASS。実機iPhone操作は未実施 |
| concept ID rename | **依存** | based on draft PR #24 head, not merged into main |

### マージ停止条件

1. 同梱ZIPの `assets/` 238ファイルをGitHubブランチに取り込む（ツール制約でこのチャットからバイナリ直接投入できていない）。
2. 6表情差分は新仕様で不要。別途、SSR/UR専用構図は前回保留のまま（今回の会話アート仕様と無関係）。
3. PR #24の確定後、そのmain状態との競合・セーブ移行を再検証する。
4. Playwrightの全項目、ブラウザコンソール、HTTP画像読み込み、iPhone縦横・Windows表示、既存セーブ再読込の確認を実行し、このログに結果を追記する。

## CI検証結果（2026-11-06）

- [PASS] [Character depth and new 19 smoke](https://github.com/rin3939kagamine-a11y/yoiboshi/actions/runs/42176742085): JS構文検査 PASS、新19人・旧60人で合計79人、95絆話、57ユニット、旧通常募集pool=172件を維持、27種の情報比較／エラーなし。既存character-depth：25 browser assertions、79人×親密度5階層、5画面サイズ合格。
- [PASS] [Concept ID / Ena save migration](https://github.com/rin3939kagamine-a11y/yoiboshi/actions/runs/42176742008): 29 ID変換、移行冪等性、旧セーブ原本不変、既存メンバー保持、SR gallery79件を確認。
- [PASS] [Mobile landscape](https://github.com/rin3939kagamine-a11y/yoiboshi/actions/runs/42176742113): 9ビューポートで107チェック合格。スクリーンショットはAction artifactに保存。

**合格対象はコードとブラウザ内データのみ**。現時点では新規画像バイナリがGitHubに存在せず、素材のHTTP200・ユーザー端末の実機見た目は未検証。全員の6表情画像は正式仕様として不要。Draft PRをmainへマージしない。

### 素材ZIP修正版（2026-11-06）

新ヒロイン画像素材は計238ファイル。 るい・歌織・すずねの実ゲーム用フルボディはオリジナルRGBA PNGをSHA-256一致で保持し、他16人とWork/Sky/Starの派生画像はWebP。 現時点では成果物のZIPのみ作成済みで、リポジトリ内のバイナリは未登録。

## Ver.0.50.0.1 追加指示：全81会話ベース絵・記号リアクション（2026-11-06）

### 新規19人への変更
- 指定の19枚のupper_body WebPを正式採用。パス `assets/ART_V2/upper_body/<id>.webp`。
- Ver.0.50以前の6表情プレースホルダのコード登録を削除（画像そのものの削除は行わない）。単一の正本切り取り画像を全感情の会話で使う。

### 既存60人＋透子2枚への変更
- 同梱 `yoiboshi-crops-existing62.zip` の `upper_body/<id>.webp` 全62枚を**バイト変更なし**で別ディレクトリ `assets/ART_V2/upper_body_crops_v0500/<id>.webp` に登録する方式。旧 `ART_V2.upper_body`、既存6表情画像、セーブはそのまま残す。切り替えは画像参照・表示層のみ。
- `ichika` はユーザー承認のdynamic全身由来。`juri` は現行ジュリ由来の暫定絵で、アリエス化時に差し替え前提。
- `touko` と `touko_true` はユーザー提供ファイルを採用。ただし**RGB・不透明背景**であり、他60人のRGBA透過とは異なる。原本を勝手に加工しない。
- `haruka` IDに旧ストーリーNPC「霧島ハルカ」と追加ヒロイン「芹沢はるか」の共存問題がある。旧章場面は専用 `story_cast/haruka_talk.webp` を優先する分岐を設け、台詞は変更しない。
- `sakuya`、`enju` 等、配布ZIPに含まれないストーリー専用NPCは旧描画のまま。

### 記号変換層
| キュー | 記号 | アニメーション |
|---|---|---|
| smile | ♪ | 小さな跳躍 |
| blush | ♡ | 左右の揺れ |
| surprise | ！ | 一度跳躍 |
| question | ？ | 傾く |
| confused | 💦 | 後ろに引く |
| angry/pout | 💢 | 震える |
| sad | … | 沈む |
| kiss | 💋＋小さな♡ | ゆっくり1.075倍に接近 |

- ポップアップは約1.2秒で消滅。シリアス場面は `opts.sceneTag='serious'`、`opts.suppressSymbols=true` で記号だけ抑制（動作は残る）。ただし明示 `kiss` キューは表示可能。
- 表示範囲を `SYMBOL_REACTION_ACTORS_V0500` に限定し、既存の `EXPRESSION_CUES` とストーリー本文は無変更。追加切り替えは `expressionPortraitMarkup` 冒頭の判定で行い、後続の従来表情描画は保存。
- 旧5名に指定されていた `!important` の個別キャラクター演出より新記号アニメを優先。prefers-reduced-motion を尊重。
- 現時点で外部取込ZIP **81枚** を生成済み：新19＋既存62。**画像バイナリはまだPR #25ブランチにアップロードできておらず、描画のHTTP200/実機での完成画像検証は保留。**

### 検証
- ブラウザ上の81名の参照パス、9キュー（kiss含む）、3世代の章ルート、シリアス抑制とキス例外をPlaywrightで試験。
- 既存のセーブ移行・79人depth・9画面サイズのモバイルテストも回帰検証対象。
- QAは画像実体なしでロジックを検証できる構造。画像がGitHubへ入った後にHTTP画像読み込み成功、透過表示・実機UI確認が必要。
- キュー `pout` の「怒り」解釈は仮置き。無言の拗ね・不機嫌も同じ「💢」になるため、必要なら別の感情カテゴリとして再調整する。

**PR #25はDraftのまま。main未マージ。**
