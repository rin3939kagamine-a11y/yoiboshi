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
- 指定正本PNGのSHA256：rui `6805b79b826155da327c3c384936fc5e1bbd72e1a3b6fd62cd122082251edd6c`; kaori `045254d57e87f920c41351e47e578f68034dc4c6bc1ee060ef5757b20d0fecf1`; suzune `e2cc62b92c479ebb5ddfab648769d20bb75b3551ec40e9a78cc5255ae628c8ec`。元PNGを無改変で素材ZIPに同梱。
- `docs/new_character_ideas_v1` は確認時のmainに存在せず。7人案・8人案のREADMEとユーザー確定事項を優先した。

## 実施状況とテスト

| 項目 | 状態 | コメント |
|---|---|---|
| 人物データ19人 | **実装済み** | 19 profiles; moods/likes/8 topics/5 bond episodes each; legacy 60 unchanged |
| 章連動解放19人 | **実装済み** | existing quest completion qXX; recruitment and dialogue gated |
| character_depth 79人 | **実装済み** | affinity 40/80 gates preserved |
| UNIT_ART work/sky/star | **一部完了** | 57 image files in companion ZIP, not uploaded to git. Sky/star provisional same full-body art |
| full_body/upper_body/face icon | **一部完了** | 19× each in ZIP; 3 authoritative PNGs preserved byte-identically |
| expressions ×6 | **一部完了** | 6 file slots x19 prepared, neutral-face placeholder ONLY; distinct expressions NOT generated |
| sr_gallery.html 79人 | **実装済み** | original 60 entries in order, appended 19 |
| QA workflow and browser test | **テスト未実施** | workflow and count updated to 79; CI/browser results pending |
| Save compatibility | **未検証** | no KEY, save migration, data schema, battle, or RATE edits in this branch |
| mobile view QA | **未検証** | 5 viewport assertions in workflow; screenshots pending |
| concept ID rename | **依存** | based on draft PR #24 head, not merged into main |

### マージ停止条件

1. 同梱ZIPの `assets/` 235ファイルをGitHubブランチに取り込む（ツール制約でこのチャットからバイナリ直接投入できていない）。
2. `*_smile/blush/sad/pout/surprise` の本当の表情差分とSSR/UR専用構図を作画し、仮画像から差し替える。
3. PR #24の確定後、そのmain状態との競合・セーブ移行を再検証する。
4. Playwrightの全項目、ブラウザコンソール、HTTP画像読み込み、iPhone縦横・Windows表示、既存セーブ再読込の確認を実行し、このログに結果を追記する。
