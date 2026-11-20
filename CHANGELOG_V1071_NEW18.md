# Ver.1.07.1.0 — 新ヒロイン18人追加（2026-11-20）

v0970（11/17の20人）と同じ方式で、承認済みの立ち絵18人を交流ヒロイン＋Rユニットとして追加。q6クリアで出会い・募集に登場し、交流画面に「出会いの日」の物語がつく。

| ID | 名前 | 年齢 | 職業 | ロール |
|---|---|---|---|---|
| yuasa_mayu | 湯浅 まゆ | 24 | 銭湯「月の湯」の三代目見習い | healer |
| tsurumi_asahi | 鶴見 あさひ | 25 | 海辺の塗装屋「鶴見塗装」の二代目 | tank |
| aikawa_moko | 愛川 もこ | 21 | 港の商業施設のキャラクターショップ店員 | healer |
| yuki_chieri | 結城 ちえり | 21 | 駅前のプリ専門店スタッフ兼撮影モデル | support |
| kisaragi_yuno | 如月 ユノ | 22 | レトロゲーセン「ネオン堂」のスタッフ | attacker |
| taiga_temari | 大河 てまり | 23 | キッチンカー「たこ虎」の看板娘 | attacker |
| kajiwara_shiho | 梶原 志保 | 29 | 宵星市立美術館の学芸員 | support |
| nogi_sarasa | 乃木 さらさ | 26 | 旧喫茶街のカレーの店「ミーラ」店主 | healer |
| hamano_soyoka | 浜野 そよか | 23 | 遊覧船「かもめ丸」のガイド | support |
| toda_izumi | 戸田 いずみ | 26 | 東雲商店街の郵便局の窓口係 | healer |
| iwakiri_tsubasa | 岩切 ツバサ | 27 | 港の自動車整備工場の整備士 | tank |
| fushimi_chigusa | 伏見 ちぐさ | 25 | 謎解きイベントのゲームマスター | support |
| otowa_yuko | 音羽 夕子 | 31 | ホテルのラウンジのピアニスト | healer |
| shimizu_satomi | 清水 さとみ | 23 | 信用金庫「宵星しんきん」の新人行員 | support |
| chidori_hibari | 千鳥 ひばり | 24 | 渡り鳥を追う自然観察員 | tank |
| hozuki_kuroe | 鬼灯 クロエ | 21 | 遊園地のお化け屋敷のキャスト | attacker |
| oribe_niko | 織部 にこ | 21 | 手芸店「いとまき」の看板娘 | healer |
| yukishiro_mafuyu | 雪代 まふゆ | 22 | クラブ「ドック」のVJ（MAFU） | attacker |

- 新規: `js/heroines_v1080.js` / `_units.js` / `_wire.js`、`assets/ART_V2/full_body/{id}.png` 18枚
- 立ち絵は原画のまま。背景つきだった6枚（mayu・asahi・chigusa・yuko・hibari・mafuyu）だけ背景を透過に切り抜き。
- game.js などは v0970 の登録箇所に V1080 を並べて追加しただけ。既存キャラ・戦闘計算・ガチャ確率・セーブ形式は変更なし。
- QA: heroines_v0500_smoke / concept_id_migration_smoke / character_depth_real_smoke すべてPASS（ヒロイン216→234、JSエラーなし）。index・debug・trialの3ページで18人の登録を確認。
