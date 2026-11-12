# 既存承認原画3人のSRヒロイン追加 — 変更履歴

元の「未実装5人」指示を2026-11-12のユーザー訂正で上書きし、**以下の3人のみ実装**。画像生成・描き直し・元デザインの変更は禁止し、実施していない。

## 出典・ID・姓名の照合表

| 追加ID / SRユニットID | 名前・新規設定 | 正本画像と出典 | 固定SHA-256 |
|---|---|---|---|
| `sumika` / `sumika_work` | 紫藤 すみか、22歳、古着店「夜想」のコーディネーター | PR #28 `docs/new_character_ideas/2026-11-08_purple_provisional.md`（`assets/provisional-purple-standee-20261108`）、Google Drive ID `1dKPQne9ACPae4ua2jtRN2GveP-D5EYxW`、ファイル名 `yoiboshi_provisional_purple_noears_nomask_smallhead_1024x1536.png` | `ad9482bcf6bbe27cd9e1d903e60f13215d77233d2350f525797792df1a44ce4d` |
| `reika` / `reika_work` | 瀬戸 玲花、29歳、市立資料館の地域資料担当 | **コミット `dda5194` 固定** `assets/ART_V2/full_body/megane_woman_20261112.png`（現在のmain上の同名ファイルとは内容が異なるためコミットを正本に固定） | `044de9af6d08cb7f6462a23be8a8c1fd9cbbe83fdba7bb1d43111cce2ce1974b` |
| `hono` / `hono_work` | 小日向 ほの、23歳、駅前アウトドア用品店の販売員 | `assets/standee-ash-brown-navy-fleece-20261112` の `assets/character_candidates/2026-11-12_ash_brown_navy_fleece/ash_brown_navy_fleece_full_body.png` | `4f9caa3856fda93c29d32ea7048aeb895e76eefbd1e1f93c552637ab923bb86b` |

JSON形式の出典記録：`docs/heroine3_sources_v0692.json`（`docs/heroine74_sources_v0690.json` のentries方式で構成）。

## 修正待ち・未実装
- **候補02** プラチナ髪×緑ローブ：配色を変更したユーザー承認版が届くまで保留。原画・元コミット・他ブランチは変更せず、PRの配布アートから除外。
- **候補37** だぼT×笑顔：「DROOPY」文字なしの承認版が届くまで保留。原画・元コミット・他ブランチは変更せず、PRの配布アートから除外。
- **候補20** 黒髪ロング×白シャツ：右手が切れているため新しい承認版が届くまで保留。PRに一切追加しない。

## 実装方式
- `js/heroines_v0692.js`：3人の完全なプロフィール（年齢・職業・性格・好きなもの・弱点）、日常会話、4つの気分、6か所の外出会話、会話選択肢・返答、話題8件、5話ずつの交流ストーリー、SRユニット定義・スキル表示名・既存ロールの効果種別、灯火メモを新設。
- `js/heroines_v0692_wire.js`：既存の`ART_V2`登録へ、3人の `full_body`・`upper_body`・`face_icons` の参照を**追加のみ**で接続。
- `js/character_depth_v0692.js`：3人の`habit/inside/growth/cg`カード（既存79人のカードには追加・上書きなし）。
- `js/game.js`：既存の`PEOPLE`・`UNITS`・`UNIT_ARTWORK`・`HERO_IDS`・`extraHero`・`TOMOSHIBI`へ追加IDのみマージ。元のキャラ・ユニット、juriの登録、既存ストーリー本文、戦闘計算、ガチャ確率定数、セーブ形式・保存キーは変更なし。
- `js/character_depth_v1.js`：旧カードの値は保持し、該当IDに旧カードがない場合だけ追加カード `CHARACTER_DEPTH_V0692` を表示。
- `index.html`：旧バージョン `0.69.1.0` の次として `0.69.2.0`。旧スクリプトを差し替えず、追加スクリプトをロード。
- `sr_gallery.html`：既存79件を保持し、新3件の全身WebPを一覧に追加。

## 既存アートの取り扱い（新規画像の生成ではない）
- 指定PNG原本のbyte列を保存（各1024×1536 / RGBA、SHA-256照合）。
- ゲーム向けの**表示形式変換・切り出しのみ**で、`assets/ART_V2/full_body/{id}.webp`（1024×1536）、`upper_body`（768×1024）、`face_icons`（400×400）を生成。意匠・色・文字・衣装を変更せず、原画はそのまま保存。
- 3人×3フォーマット＝9 WebP。保留の3人は素材の取り込みも生成も行わない。

## 新規作成部分
人物設定3人分、会話・交流ストーリー計15本、3種のSRユニット名/スキル表示名/既存ロール種別、3人のcharacter_depthカード、出典JSON、全身・上半身・顔の派生WebP、ギャラリー3件、専用QA・CI。**旧章の物語本文、juri、既存ユニット、バトル係数・ガチャ確率・セーブ形式は変更しない。**

## QA
- 原画SHA-256およびPNGデコード検証、9WebP形式・透明背景・サイズ確認
- 新ID重複なし、3人SR、通常募集に含まれること、新19専用募集に混入しないこと、ガチャ確率不変
- 旧セーブの所有レベル・好感度・選択保持→新3人所持/編成/交流/育成/再起動保持
- 実ブラウザで募集/戦闘/会話/ギャラリー確認、縦横画面と5画面幅
- 既存QA：79人character_depth、R復活、概念ID移行、モバイル戦闘、74人既存専用QAなど

PRのGitHub Actionsの最新結果に合格実績と未実施事項を逐次記録する。実機Safari未実施、mainマージはユーザー別途GOまで禁止。
