# 宵星の契約者 RE:START — Ver.0.26.0.0 実装済み新ユニット91体 性能一覧

> **データ由来：** 実行したゲーム内の `UNITS` / `UNIT_DESIGN` / `PASSIVE_SCALE` / `UNIT_ARTWORK` から書き出し。原本の設計表をそのまま転記したものではありません。

## 実装と設計表の照合結果

| チェック | 結果 |
|---|---|
| 登録ユニット数 | 91 / 91 |
| ID・ヒロイン・レアリティ・称号・ロール | 不一致0件 |
| スキル名・効果タイプ | 不一致0件 |
| 特性名・系統 | 不一致0件 |
| アートの登録 | 新ユニット91枚、みるく既存3枚／計94枚 |
| スキル効果量 | 既存 `skillDescription(..., rank=0)` から取得。ランク上昇は従来式 |
| 特性値 | 既存 `passiveValue` から取得。レアリティ別の `PASSIVE_SCALE` 適用 |

## 新ユニット91体・実データ一覧

| No. | ID | ヒロイン | レア | 称号 | ロール | スキル1 | スキル2 | 特性 | 画像 |
|---:|---|---|:---:|---|---|---|---|---|---|
| 1 | `koharu_work` | 水瀬 小春 | SR | 本日もようこそ | タンク | **お迎えの結界** (`shield_all`) — 全体防護：味方全体に防護各25 | **ご案内いたします** (`shield_one`) — 単体防護：味方単体に防護56 | **宿の気配り** (`shield_all_focus`) — 自身の全体防護スキルの防護量 +14%（SR） | `assets/UNIT_ART/koharu_work.webp` |
| 2 | `koharu_sky` | 水瀬 小春 | SSR | 休日の迷子 | アタッカー | **回り道のひと息** (`drain`) — 吸収攻撃：敵単体に威力30、実ダメージの30%で自身のHPを回復 | **見つけた帰り道** (`finisher`) — とどめ：敵単体に威力28、敵のHP残量に応じて最大+75% | **迷子の直感** (`finish`) — 残りHP50%以下の敵への与ダメージ +12%（SSR） | `assets/UNIT_ART/koharu_sky.webp` |
| 3 | `koharu_star` | 水瀬 小春 | UR | あなたの名前 | サポーター | **名前を呼ぶ声** (`reset_one`) — スキル再使用：味方1人のスキル1・2の残りCTを即時回復 | **朝日のご挨拶** (`attack_up`) — 攻撃アップ：味方全体の攻撃+18%／8秒 | **呼びかける朝** (`team_start_atk`) — 戦闘開始から10秒間の味方全員の攻撃 +9%（UR） | `assets/UNIT_ART/koharu_star.webp` |
| 4 | `lilith_work` | 姫宮 リリス | SR | 運命に導かれし休日 | アタッカー | **運命の導き** (`pierce`) — 貫通攻撃：敵単体に威力31（防護・ダメージ軽減を無視） | **我が眼に映る弱点** (`def_down`) — 防御ダウン：敵単体の被ダメージ+20%／7秒 | **黒薔薇の啓示** (`pierce_focus`) — 自身の防護貫通攻撃スキルの威力 +8%（SR） | `assets/UNIT_ART/lilith_work.webp` |
| 5 | `lilith_sky` | 姫宮 リリス | SSR | 黒薔薇館の作業台 | ヒーラー | **縫い上げのリボン** (`heal_shield`) — 癒しの盾：味方単体のHP24回復＋防護18 | **黒薔薇のほどき** (`cleanse`) — 弱体解除＋小回復：味方単体の弱体効果を解除しHP20回復 | **秘密の縫い目** (`rescue`) — 残りHP50%以下の味方への回復量 +13%（SSR） | `assets/UNIT_ART/lilith_sky.webp` |
| 6 | `lilith_star` | 姫宮 リリス | UR | ほんとうの言葉 | サポーター | **光のリボンの結界** (`defense_up`) — 防御アップ：味方全体の防御力+30%／8秒 | **素直なひと言** (`reset_one`) — スキル再使用：味方1人のスキル1・2の残りCTを即時回復 | **ほどける虚勢** (`defense_up_focus`) — 自身の防御アップスキルの効果量 +11%（UR） | `assets/UNIT_ART/lilith_star.webp` |
| 7 | `concept30_work` | 波多野 汐 | SR | はいっ、了解です! | ヒーラー | **プールサイドの手当て** (`heal_one`) — 単体大回復：味方単体HP57回復 | **クールダウン** (`cleanse`) — 弱体解除＋小回復：味方単体の弱体効果を解除しHP20回復 | **水際の救助** (`rescue`) — 残りHP50%以下の味方への回復量 +10%（SR） | `assets/UNIT_ART/concept30_work.webp` |
| 8 | `concept30_sky` | 波多野 汐 | SSR | 朝一番の水面 | サポーター | **スタートの合図** (`ct`) — CT短縮：味方全体の残りCTを2.3秒短縮 | **ペース配分** (`defense_up`) — 防御アップ：味方全体の防御力+30%／8秒 | **スタートの呼吸** (`ct_focus`) — 自身のCT短縮スキルの短縮量 +9%（SSR） | `assets/UNIT_ART/concept30_sky.webp` |
| 9 | `concept30_star` | 波多野 汐 | UR | もう一本、いけます! | アタッカー | **飛び込みの一撃** (`pierce`) — 貫通攻撃：敵単体に威力31（防護・ダメージ軽減を無視） | **ラストスパート** (`finisher`) — とどめ：敵単体に威力28、敵のHP残量に応じて最大+75% | **水面を割る勇気** (`finish`) — 残りHP50%以下の敵への与ダメージ +15%（UR） | `assets/UNIT_ART/concept30_star.webp` |
| 10 | `koyori_work` | 桃瀬 こより | SR | カフェ巡りの日 | サポーター | **ねぇねぇ、見て** (`stun`) — 足止め：敵単体を1.8秒足止め | **映えの一枚** (`reset_one`) — スキル再使用：味方1人のスキル1・2の残りCTを即時回復 | **撮れ高の魔法** (`stun_extend`) — 自身が与える足止めの持続時間追加（秒） +0.5秒（SR） | `assets/UNIT_ART/koyori_work.webp` |
| 11 | `koyori_sky` | 桃瀬 こより | SSR | ないしょの寄り道 | ヒーラー | **お姉ちゃんには内緒** (`cleanse`) — 弱体解除＋小回復：味方単体の弱体効果を解除しHP20回復 | **パフェのご褒美** (`heal_one`) — 単体大回復：味方単体HP57回復 | **内緒のご褒美** (`heal`) — 回復量 +11%（SSR） | `assets/UNIT_ART/koyori_sky.webp` |
| 12 | `koyori_star` | 桃瀬 こより | UR | きらめきシャッター | タンク | **フラッシュバースト** (`counter`) — 反撃：自身に8.0秒の反撃態勢（被弾時に攻撃力の45%相当で反撃） | **思い出を包む光** (`shield_all`) — 全体防護：味方全体に防護各25 | **閃光のアルバム** (`shield_all_focus`) — 自身の全体防護スキルの防護量 +22%（UR） | `assets/UNIT_ART/koyori_star.webp` |
| 13 | `concept33_work` | 金城 マリン | SR | いいじゃんいいじゃん! | サポーター | **いらっしゃいませ!** (`attack_up`) — 攻撃アップ：味方全体の攻撃+18%／8秒 | **ちょっと待ってて** (`enemy_ct`) — 敵のCT延長：敵単体の次回攻撃CTを2.6秒延長 | **看板店長の機転** (`enemy_ct_focus`) — 自身の敵CT延長スキルの延長量 +8%（SR） | `assets/UNIT_ART/concept33_work.webp` |
| 14 | `concept33_sky` | 金城 マリン | SSR | 新作ドリンクの研究 | アタッカー | **隠し味の見極め** (`def_down`) — 防御ダウン：敵単体の被ダメージ+20%／7秒 | **シェイク三連** (`combo`) — 3連撃：敵単体に3回×威力16（攻撃力比例） | **レシピの閃き** (`combo_focus`) — 自身の3連撃スキルの威力 +12%（SSR） | `assets/UNIT_ART/concept33_sky.webp` |
| 15 | `concept33_star` | 金城 マリン | UR | ……今のは、冗談じゃないから | タンク | **月明かりの誓い** (`cover`) — 身代わり：選択した味方への攻撃を8.0秒肩代わり | **本気のまなざし** (`damage_reduce`) — 被ダメージ軽減：味方全体の被ダメージ18%軽減／8秒 | **潮騒の決意** (`guard`) — 自身が受けるダメージの軽減 8%軽減（UR） | `assets/UNIT_ART/concept33_star.webp` |
| 16 | `riko_work` | 宮下 莉子 | SR | 今日のコーデ | ヒーラー | **似合うの見つけた** (`heal_one`) — 単体大回復：味方単体HP57回復 | **コーデ診断** (`heal_boost`) — 回復量アップ：味方全体の受ける回復量+18%／8秒 | **おしゃれの救護** (`heal`) — 回復量 +8%（SR） | `assets/UNIT_ART/riko_work.webp` |
| 17 | `riko_sky` | 宮下 莉子 | SSR | で、で? その後どうなったの? | タンク | **恋バナの続き** (`taunt`) — 挑発：自身へ防護24＋6.0秒挑発 | **言い返してあげる** (`counter`) — 反撃：自身に8.0秒の反撃態勢（被弾時に攻撃力の45%相当で反撃） | **恋を聞く勇気** (`shield`) — 防護量 +16%（SSR） | `assets/UNIT_ART/riko_sky.webp` |
| 18 | `riko_star` | 宮下 莉子 | UR | 主人公は、わたし | アタッカー | **ときめきの衝撃** (`single`) — 単体強攻撃：敵単体に威力34（攻撃力比例） | **わたしの恋** (`pierce`) — 貫通攻撃：敵単体に威力31（防護・ダメージ軽減を無視） | **主役宣言** (`pierce_focus`) — 自身の防護貫通攻撃スキルの威力 +14%（UR） | `assets/UNIT_ART/riko_star.webp` |
| 19 | `concept19_work` | 星宮 ノエル | SR | これ、初めて見ました! | アタッカー | **はじめてのときめき** (`combo`) — 3連撃：敵単体に3回×威力16（攻撃力比例） | **わくわくの充電** (`drain`) — 吸収攻撃：敵単体に威力30、実ダメージの30%で自身のHPを回復 | **未知への好奇心** (`combo_focus`) — 自身の3連撃スキルの威力 +9%（SR） | `assets/UNIT_ART/concept19_work.webp` |
| 20 | `concept19_sky` | 星宮 ノエル | SSR | 朝の日記 | ヒーラー | **朝の日記** (`heal_all`) — 全体回復：味方全体HP各27回復 | **ひだまりの食卓** (`regen`) — 継続回復：味方単体HP11を2秒毎に回復／8秒 | **日記に残る温もり** (`heal_all_focus`) — 自身の全体回復スキルの回復量 +13%（SSR） | `assets/UNIT_ART/concept19_sky.webp` |
| 21 | `concept19_star` | 星宮 ノエル | UR | ……覚えていられたら、いいな | タンク | **星降る守り** (`shield_all`) — 全体防護：味方全体に防護各25 | **差しのべる手** (`cover`) — 身代わり：選択した味方への攻撃を8.0秒肩代わり | **星が見守る場所** (`shield`) — 防護量 +20%（UR） | `assets/UNIT_ART/concept19_star.webp` |
| 22 | `mio_work` | 藍沢 ミオ | SR | 配信モード | サポーター | **みんなこんばんは〜** (`attack_up`) — 攻撃アップ：味方全体の攻撃+18%／8秒 | **配信待機中** (`enemy_ct`) — 敵のCT延長：敵単体の次回攻撃CTを2.6秒延長 | **画面の向こうの熱** (`team_start_atk`) — 戦闘開始から10秒間の味方全員の攻撃 +5%（SR） | `assets/UNIT_ART/mio_work.webp` |
| 23 | `mio_sky` | 藍沢 ミオ | SSR | 配信が終わったら | ヒーラー | **クッションでひと休み** (`heal_one`) — 単体大回復：味方単体HP57回復 | **……あ、えっと** (`heal_all`) — 全体回復：味方全体HP各27回復 | **収録後の安堵** (`heal_all_focus`) — 自身の全体回復スキルの回復量 +13%（SSR） | `assets/UNIT_ART/mio_sky.webp` |
| 24 | `mio_star` | 藍沢 ミオ | UR | はじめて、目を見て | タンク | **まっすぐな視線** (`taunt`) — 挑発：自身へ防護24＋6.0秒挑発 | **勇気の防壁** (`shield_all`) — 全体防護：味方全体に防護各25 | **素顔の決意** (`shield_all_focus`) — 自身の全体防護スキルの防護量 +22%（UR） | `assets/UNIT_ART/mio_star.webp` |
| 25 | `jun_work` | 鳴海 ジュン | SR | 配達の合間 | アタッカー | **最短ルート** (`pierce`) — 貫通攻撃：敵単体に威力31（防護・ダメージ軽減を無視） | **任せな** (`combo`) — 3連撃：敵単体に3回×威力16（攻撃力比例） | **配達人の突破力** (`pierce_focus`) — 自身の防護貫通攻撃スキルの威力 +8%（SR） | `assets/UNIT_ART/jun_work.webp` |
| 26 | `jun_sky` | 鳴海 ジュン | SSR | 夜明けの整備 | サポーター | **スパナひと締め** (`enemy_ct`) — 敵のCT延長：敵単体の次回攻撃CTを2.6秒延長 | **整備完了** (`ct`) — CT短縮：味方全体の残りCTを2.3秒短縮 | **整備士の支度** (`enemy_ct_focus`) — 自身の敵CT延長スキルの延長量 +11%（SSR） | `assets/UNIT_ART/jun_sky.webp` |
| 27 | `jun_star` | 鳴海 ジュン | UR | はじめてのスカート | ヒーラー | **か、かわいいとか言うな** (`heal_all`) — 全体回復：味方全体HP各27回復 | **桜の風** (`heal_boost`) — 回復量アップ：味方全体の受ける回復量+18%／8秒 | **言えない優しさ** (`rescue`) — 残りHP50%以下の味方への回復量 +16%（UR） | `assets/UNIT_ART/jun_star.webp` |
| 28 | `concept22_work` | 春野 ゆめ | SR | ……今のこと、もっと教えてください | サポーター | **手帳のメモ** (`enemy_ct`) — 敵のCT延長：敵単体の次回攻撃CTを2.6秒延長 | **落ち着いてください** (`attack_down`) — 敵の攻撃ダウン：敵単体の攻撃-28%／8秒 | **書き留めた約束** (`enemy_ct_focus`) — 自身の敵CT延長スキルの延長量 +8%（SR） | `assets/UNIT_ART/concept22_work.webp` |
| 29 | `concept22_sky` | 春野 ゆめ | SSR | 8年って、長いんですね | タンク | **窓辺の見守り** (`shield_one`) — 単体防護：味方単体に防護56 | **こちらへどうぞ** (`damage_reduce`) — 被ダメージ軽減：味方全体の被ダメージ18%軽減／8秒 | **窓越しのまなざし** (`shield_one_focus`) — 自身の単体防護スキルの防護量 +13%（SSR） | `assets/UNIT_ART/concept22_sky.webp` |
| 30 | `concept22_star` | 春野 ゆめ | UR | 今日の色の夕焼け | アタッカー | **夕焼けの灯** (`aoe`) — 全体攻撃：敵全体に各威力21（単体より低威力） | **今をつかむ最後の灯** (`finisher`) — とどめ：敵単体に威力28、敵のHP残量に応じて最大+75% | **今を生きる夕陽** (`aoe_focus`) — 自身の全体攻撃スキルの威力 +16%（UR） | `assets/UNIT_ART/concept22_star.webp` |
| 31 | `shino_work` | 灰原 シノ | SR | 取引の時間 | サポーター | **情報の対価** (`attack_down`) — 敵の攻撃ダウン：敵単体の攻撃-28%／8秒 | **取引成立** (`enemy_ct`) — 敵のCT延長：敵単体の次回攻撃CTを2.6秒延長 | **取引の着眼** (`attack_down_extend`) — 敵攻撃ダウンの持続時間追加（秒） +1.5秒（SR） | `assets/UNIT_ART/shino_work.webp` |
| 32 | `shino_sky` | 灰原 シノ | SSR | 深夜の回線 | ヒーラー | **借りにしとく** (`heal_boost`) — 回復量アップ：味方全体の受ける回復量+18%／8秒 | **深夜の差し入れ** (`heal_all`) — 全体回復：味方全体HP各27回復 | **夜更けの労り** (`heal`) — 回復量 +11%（SSR） | `assets/UNIT_ART/shino_sky.webp` |
| 33 | `shino_star` | 灰原 シノ | UR | 本当の名前 | タンク | **灯の守り** (`cover`) — 身代わり：選択した味方への攻撃を8.0秒肩代わり | **鎖の切り返し** (`counter`) — 反撃：自身に8.0秒の反撃態勢（被弾時に攻撃力の45%相当で反撃） | **灯が守る一歩** (`start_shield`) — 戦闘開始時の自身の防護 +20（UR） | `assets/UNIT_ART/shino_star.webp` |
| 34 | `hiyori_work` | 桃瀬 ひより | SR | パティシエの顔 | タンク | **はいはい、順番ね** (`taunt`) — 挑発：自身へ防護24＋6.0秒挑発 | **仕上げの守り** (`damage_reduce`) — 被ダメージ軽減：味方全体の被ダメージ18%軽減／8秒 | **職人の段取り** (`guard`) — 自身が受けるダメージの軽減 4%軽減（SR） | `assets/UNIT_ART/hiyori_work.webp` |
| 35 | `hiyori_sky` | 桃瀬 ひより | SSR | 閉店後の試作 | アタッカー | **試作のひと口** (`def_down`) — 防御ダウン：敵単体の被ダメージ+20%／7秒 | **ふたりの味見** (`drain`) — 吸収攻撃：敵単体に威力30、実ダメージの30%で自身のHPを回復 | **味見の勝負勘** (`drain_heal_focus`) — 吸収攻撃による自己回復量 +16%（SSR） | `assets/UNIT_ART/hiyori_sky.webp` |
| 36 | `hiyori_star` | 桃瀬 ひより | UR | わたしの願いごと | サポーター | **願いを灯すまばゆさ** (`stun`) — 足止め：敵単体を1.8秒足止め | **星祭りのお守りケーキ** (`defense_up`) — 防御アップ：味方全体の防御力+30%／8秒 | **灯した願い** (`defense_up_focus`) — 自身の防御アップスキルの効果量 +11%（UR） | `assets/UNIT_ART/hiyori_star.webp` |
| 37 | `ageha_work` | 夜野 あげは | SR | 夜の街歩き | タンク | **ふーん、そういうこと** (`counter`) — 反撃：自身に8.0秒の反撃態勢（被弾時に攻撃力の45%相当で反撃） | **夜風の守り舞** (`shield_all`) — 全体防護：味方全体に防護各25 | **夜風の駆け引き** (`shield`) — 防護量 +12%（SR） | `assets/UNIT_ART/ageha_work.webp` |
| 38 | `ageha_sky` | 夜野 あげは | SSR | 近すぎるネイルタイム | ヒーラー | **ていねいなひと塗り** (`heal_shield`) — 癒しの盾：味方単体のHP24回復＋防護18 | **近すぎる距離** (`heal_boost`) — 回復量アップ：味方全体の受ける回復量+18%／8秒 | **手元に宿る優しさ** (`heal_shield_focus`) — 癒しの盾の回復・防護量 +16%（SSR） | `assets/UNIT_ART/ageha_sky.webp` |
| 39 | `ageha_star` | 夜野 あげは | UR | 夜色のフィニッシュ | サポーター | **見抜いた** (`attack_down`) — 敵の攻撃ダウン：敵単体の攻撃-28%／8秒 | **アゲハの目くらまし** (`stun`) — 足止め：敵単体を1.8秒足止め | **見透かす翅** (`stun_extend`) — 自身が与える足止めの持続時間追加（秒） +0.9秒（UR） | `assets/UNIT_ART/ageha_star.webp` |
| 40 | `kirari_work` | 日向 きらり | SR | お休みの日も全力 | アタッカー | **全力ダッシュ** (`single`) — 単体強攻撃：敵単体に威力34（攻撃力比例） | **休日のラストスパート** (`finisher`) — とどめ：敵単体に威力28、敵のHP残量に応じて最大+75% | **全力疾走の熱** (`finish`) — 残りHP50%以下の敵への与ダメージ +9%（SR） | `assets/UNIT_ART/kirari_work.webp` |
| 41 | `kirari_sky` | 日向 きらり | SSR | ポスター貼りの朝 | ヒーラー | **まっすぐ貼ります** (`heal_all`) — 全体回復：味方全体HP各27回復 | **朝の応援シールド** (`heal_shield`) — 癒しの盾：味方単体のHP24回復＋防護18 | **朝一番の励まし** (`heal_all_focus`) — 自身の全体回復スキルの回復量 +13%（SSR） | `assets/UNIT_ART/kirari_sky.webp` |
| 42 | `kirari_star` | 日向 きらり | UR | ふたりだけの大舞台 | サポーター | **あなたに届けエール** (`attack_up`) — 攻撃アップ：味方全体の攻撃+18%／8秒 | **最後まで息を合わせて** (`ct`) — CT短縮：味方全体の残りCTを2.3秒短縮 | **大舞台の約束** (`ct_focus`) — 自身のCT短縮スキルの短縮量 +11%（UR） | `assets/UNIT_ART/kirari_star.webp` |
| 43 | `maron_work` | 栗原 まろん | SR | 花屋の朝支度 | タンク | **花ばさみの一手** (`shield_one`) — 単体防護：味方単体に防護56 | **ゆっくり守るよ** (`damage_reduce`) — 被ダメージ軽減：味方全体の被ダメージ18%軽減／8秒 | **花束の防壁** (`shield`) — 防護量 +12%（SR） | `assets/UNIT_ART/maron_work.webp` |
| 44 | `maron_sky` | 栗原 まろん | SSR | 早朝の花市場 | アタッカー | **花でいっぱいのバケツ** (`def_down`) — 防御ダウン：敵単体の被ダメージ+20%／7秒 | **市場の目利き** (`aoe`) — 全体攻撃：敵全体に各威力21（単体より低威力） | **花市を舞う花嵐** (`aoe_focus`) — 自身の全体攻撃スキルの威力 +13%（SSR） | `assets/UNIT_ART/maron_sky.webp` |
| 45 | `maron_star` | 栗原 まろん | UR | 花言葉に託して | サポーター | **花嵐の声援** (`attack_up`) — 攻撃アップ：味方全体の攻撃+18%／8秒 | **託した想い** (`defense_up`) — 防御アップ：味方全体の防御力+30%／8秒 | **想い咲く季節** (`team_start_atk`) — 戦闘開始から10秒間の味方全員の攻撃 +9%（UR） | `assets/UNIT_ART/maron_star.webp` |
| 46 | `yui_work` | 小野寺 結衣 | SR | 書店員のエプロン | ヒーラー | **おすすめの一冊** (`heal_one`) — 単体大回復：味方単体HP57回復 | **はいはい、聞いてますよ** (`heal_shield`) — 癒しの盾：味方単体のHP24回復＋防護18 | **本棚の処方箋** (`heal_shield_focus`) — 癒しの盾の回復・防護量 +12%（SR） | `assets/UNIT_ART/yui_work.webp` |
| 47 | `yui_sky` | 小野寺 結衣 | SSR | 新刊棚とポップ | タンク | **手描きのポップ** (`cover`) — 身代わり：選択した味方への攻撃を8.0秒肩代わり | **みんなを守る新刊棚** (`shield_all`) — 全体防護：味方全体に防護各25 | **新刊を守る背中** (`guard`) — 自身が受けるダメージの軽減 6%軽減（SSR） | `assets/UNIT_ART/yui_sky.webp` |
| 48 | `yui_star` | 小野寺 結衣 | UR | あなたが選んだ一冊 | アタッカー | **贈られた物語** (`single`) — 単体強攻撃：敵単体に威力34（攻撃力比例） | **主役の頁** (`drain`) — 吸収攻撃：敵単体に威力30、実ダメージの30%で自身のHPを回復 | **ページをめくる勇気** (`drain_heal_focus`) — 吸収攻撃による自己回復量 +20%（UR） | `assets/UNIT_ART/yui_star.webp` |
| 49 | `shizuku_work` | 相馬 しずく | SR | 撮影散歩 | ヒーラー | **カメラ越しの発見** (`heal_boost`) — 回復量アップ：味方全体の受ける回復量+18%／8秒 | **記録から見つける処方** (`cleanse`) — 弱体解除＋小回復：味方単体の弱体効果を解除しHP20回復 | **レンズの手当て** (`rescue`) — 残りHP50%以下の味方への回復量 +10%（SR） | `assets/UNIT_ART/shizuku_work.webp` |
| 50 | `shizuku_sky` | 相馬 しずく | SSR | あ、今の撮れました | タンク | **決定的瞬間** (`damage_reduce`) — 被ダメージ軽減：味方全体の被ダメージ18%軽減／8秒 | **もうちょっと回して** (`shield_all`) — 全体防護：味方全体に防護各25 | **シャッターの防壁** (`shield_all_focus`) — 自身の全体防護スキルの防護量 +18%（SSR） | `assets/UNIT_ART/shizuku_sky.webp` |
| 51 | `shizuku_star` | 相馬 しずく | UR | レンズ越しじゃなく | アタッカー | **まっすぐな三連写** (`combo`) — 3連撃：敵単体に3回×威力16（攻撃力比例） | **光を蓄えるフィルム** (`drain`) — 吸収攻撃：敵単体に威力30、実ダメージの30%で自身のHPを回復 | **瞬間を切り取る力** (`drain_heal_focus`) — 吸収攻撃による自己回復量 +20%（UR） | `assets/UNIT_ART/shizuku_star.webp` |
| 52 | `suiran_work` | 李 翠蘭 | SR | 茶葉の買い出し | ヒーラー | **辛口の目利き** (`cleanse`) — 弱体解除＋小回復：味方単体の弱体効果を解除しHP20回復 | **茶香の結界** (`heal_shield`) — 癒しの盾：味方単体のHP24回復＋防護18 | **茶葉の養生** (`heal`) — 回復量 +8%（SR） | `assets/UNIT_ART/suiran_work.webp` |
| 53 | `suiran_sky` | 李 翠蘭 | SSR | 雨の日の一杯 | タンク | **雨音の一杯** (`taunt`) — 挑発：自身へ防護24＋6.0秒挑発 | **湯気の守り** (`damage_reduce`) — 被ダメージ軽減：味方全体の被ダメージ18%軽減／8秒 | **茶房のぬくもり** (`shield`) — 防護量 +16%（SSR） | `assets/UNIT_ART/suiran_sky.webp` |
| 54 | `suiran_star` | 李 翠蘭 | UR | 翠月に誓う | アタッカー | **翠月の波紋** (`aoe`) — 全体攻撃：敵全体に各威力21（単体より低威力） | **手放した茶碗** (`pierce`) — 貫通攻撃：敵単体に威力31（防護・ダメージ軽減を無視） | **翠月の覚悟** (`pierce_focus`) — 自身の防護貫通攻撃スキルの威力 +14%（UR） | `assets/UNIT_ART/suiran_star.webp` |
| 55 | `kyoko_work` | 朝比奈 響子 | SR | オフレコで聞くけど | サポーター | **オフレコの突撃取材** (`stun`) — 足止め：敵単体を1.8秒足止め | **核心を突く** (`attack_down`) — 敵の攻撃ダウン：敵単体の攻撃-28%／8秒 | **取材で見抜く隙** (`attack_down_extend`) — 敵攻撃ダウンの持続時間追加（秒） +1.5秒（SR） | `assets/UNIT_ART/kyoko_work.webp` |
| 56 | `kyoko_sky` | 朝比奈 響子 | SSR | 深夜の編集部 | ヒーラー | **深夜の缶コーヒー** (`heal_one`) — 単体大回復：味方単体HP57回復 | **締め切り明けの差し入れ** (`heal_all`) — 全体回復：味方全体HP各27回復 | **眠らぬ編集部** (`rescue`) — 残りHP50%以下の味方への回復量 +13%（SSR） | `assets/UNIT_ART/kyoko_sky.webp` |
| 57 | `kyoko_star` | 朝比奈 響子 | UR | 書かない記事 | タンク | **原稿より守りたいもの** (`cover`) — 身代わり：選択した味方への攻撃を8.0秒肩代わり | **守るための選択** (`shield_one`) — 単体防護：味方単体に防護56 | **記事より大切なもの** (`shield_one_focus`) — 自身の単体防護スキルの防護量 +16%（UR） | `assets/UNIT_ART/kyoko_star.webp` |
| 58 | `cocoa_work` | 雛森 ここあ | SR | 飾らない休日 | サポーター | **気だるいひと言** (`attack_down`) — 敵の攻撃ダウン：敵単体の攻撃-28%／8秒 | **たい焼きで再始動** (`ct`) — CT短縮：味方全体の残りCTを2.3秒短縮 | **寝ぼけた駆け引き** (`attack_down_extend`) — 敵攻撃ダウンの持続時間追加（秒） +1.5秒（SR） | `assets/UNIT_ART/cocoa_work.webp` |
| 59 | `cocoa_sky` | 雛森 ここあ | SSR | 閉店後のまかない | ヒーラー | **見ないで** (`heal_shield`) — 癒しの盾：味方単体のHP24回復＋防護18 | **まかないパワー** (`regen`) — 継続回復：味方単体HP11を2秒毎に回復／8秒 | **秘密のまかない** (`heal_shield_focus`) — 癒しの盾の回復・防護量 +16%（SSR） | `assets/UNIT_ART/cocoa_sky.webp` |
| 60 | `cocoa_star` | 雛森 ここあ | UR | 星屑のおもてなし | タンク | **星屑のトレイ** (`cover`) — 身代わり：選択した味方への攻撃を8.0秒肩代わり | **本物の笑顔** (`counter`) — 反撃：自身に8.0秒の反撃態勢（被弾時に攻撃力の45%相当で反撃） | **おもてなしの本気** (`guard`) — 自身が受けるダメージの軽減 8%軽減（UR） | `assets/UNIT_ART/cocoa_star.webp` |
| 61 | `concept13_work` | 舞 | SR | 風が変わったわね | アタッカー | **鈴の旋風** (`aoe`) — 全体攻撃：敵全体に各威力21（単体より低威力） | **舞いの連なり** (`combo`) — 3連撃：敵単体に3回×威力16（攻撃力比例） | **旅風の追撃** (`aoe_focus`) — 自身の全体攻撃スキルの威力 +10%（SR） | `assets/UNIT_ART/concept13_work.webp` |
| 62 | `concept13_sky` | 舞 | SSR | 夜の焚き火 | ヒーラー | **焚き火のぬくもり** (`heal_one`) — 単体大回復：味方単体HP57回復 | **旅の子守歌** (`regen`) — 継続回復：味方単体HP11を2秒毎に回復／8秒 | **火のそばの休息** (`regen_focus`) — 自身の継続回復スキルの回復量 +18%（SSR） | `assets/UNIT_ART/concept13_sky.webp` |
| 63 | `concept13_star` | 舞 | UR | ここにいたいという旅 | タンク | **夜明けの舞** (`damage_reduce`) — 被ダメージ軽減：味方全体の被ダメージ18%軽減／8秒 | **風鈴の切り返し** (`counter`) — 反撃：自身に8.0秒の反撃態勢（被弾時に攻撃力の45%相当で反撃） | **帰る場所を守る舞** (`guard`) — 自身が受けるダメージの軽減 8%軽減（UR） | `assets/UNIT_ART/concept13_star.webp` |
| 64 | `luna_work` | 黒羽 ルナ | SR | レコード屋の帰り | タンク | **ふん、悪くないじゃん** (`taunt`) — 挑発：自身へ防護24＋6.0秒挑発 | **掘り出しの一枚** (`shield_one`) — 単体防護：味方単体に防護56 | **レコードの壁** (`shield_one_focus`) — 自身の単体防護スキルの防護量 +10%（SR） | `assets/UNIT_ART/luna_work.webp` |
| 65 | `luna_sky` | 黒羽 ルナ | SSR | 深夜の作曲 | ヒーラー | **夜更けのメロディ** (`heal_boost`) — 回復量アップ：味方全体の受ける回復量+18%／8秒 | **見るなって** (`cleanse`) — 弱体解除＋小回復：味方単体の弱体効果を解除しHP20回復 | **夜更けの音色** (`heal`) — 回復量 +11%（SSR） | `assets/UNIT_ART/luna_sky.webp` |
| 66 | `luna_star` | 黒羽 ルナ | UR | あなたに歌う | サポーター | **あなたへの歌** (`attack_up`) — 攻撃アップ：味方全体の攻撃+18%／8秒 | **静めるアンコール** (`attack_down`) — 敵の攻撃ダウン：敵単体の攻撃-28%／8秒 | **歌声で静める夜** (`attack_down_extend`) — 敵攻撃ダウンの持続時間追加（秒） +2.5秒（UR） | `assets/UNIT_ART/luna_star.webp` |
| 67 | `makoto_work` | 早瀬 真琴 | SR | それ、予算の根拠は? | アタッカー | **根拠の追及** (`single`) — 単体強攻撃：敵単体に威力34（攻撃力比例） | **差し戻し** (`def_down`) — 防御ダウン：敵単体の被ダメージ+20%／7秒 | **裏付けの一撃** (`scan_extend`) — 自身が与える防御ダウンの持続時間追加（秒） +1.5秒（SR） | `assets/UNIT_ART/makoto_work.webp` |
| 68 | `makoto_sky` | 早瀬 真琴 | SSR | 今回だけよ | サポーター | **特別承認** (`enemy_ct`) — 敵のCT延長：敵単体の次回攻撃CTを2.6秒延長 | **仕方ないわね** (`defense_up`) — 防御アップ：味方全体の防御力+30%／8秒 | **予算外の特例** (`enemy_ct_focus`) — 自身の敵CT延長スキルの延長量 +11%（SSR） | `assets/UNIT_ART/makoto_sky.webp` |
| 69 | `makoto_star` | 早瀬 真琴 | UR | 仕事抜きの本音 | ヒーラー | **本音の一杯** (`regen`) — 継続回復：味方単体HP11を2秒毎に回復／8秒 | **乾杯** (`heal_all`) — 全体回復：味方全体HP各27回復 | **計算の外の本音** (`regen_duration`) — 自身の継続回復の持続時間追加（秒） +5秒（UR） | `assets/UNIT_ART/makoto_star.webp` |
| 70 | `fumika_work` | 柚木 文香 | SR | 記録によりますと | タンク | **記録によりますと** (`shield_one`) — 単体防護：味方単体に防護56 | **郷土の知恵で引き受ける** (`taunt`) — 挑発：自身へ防護24＋6.0秒挑発 | **残された記録** (`shield`) — 防護量 +12%（SR） | `assets/UNIT_ART/fumika_work.webp` |
| 71 | `fumika_sky` | 柚木 文香 | SSR | 少し寄り道しましょうか | アタッカー | **寄り道で見つけた突破口** (`pierce`) — 貫通攻撃：敵単体に威力31（防護・ダメージ軽減を無視） | **古い紙面の発見** (`drain`) — 吸収攻撃：敵単体に威力30、実ダメージの30%で自身のHPを回復 | **紙片の謎解き** (`pierce_focus`) — 自身の防護貫通攻撃スキルの威力 +11%（SSR） | `assets/UNIT_ART/fumika_sky.webp` |
| 72 | `fumika_star` | 柚木 文香 | UR | あなたとの記録 | サポーター | **あなたとの頁** (`reset_one`) — スキル再使用：味方1人のスキル1・2の残りCTを即時回復 | **星が止めた一瞬** (`stun`) — 足止め：敵単体を1.8秒足止め | **綴られる未来** (`reset_one_guard`) — スキル再使用対象へ8秒間付与する防御力 +9%（UR） | `assets/UNIT_ART/fumika_star.webp` |
| 73 | `concept17_work` | 天音 リコ | SR | さあさあ、お立ち会い! | サポーター | **開演のアナウンス** (`enemy_ct`) — 敵のCT延長：敵単体の次回攻撃CTを2.6秒延長 | **拍手をどうぞ!** (`stun`) — 足止め：敵単体を1.8秒足止め | **開演を待たせる間** (`enemy_ct_focus`) — 自身の敵CT延長スキルの延長量 +8%（SR） | `assets/UNIT_ART/concept17_work.webp` |
| 74 | `concept17_sky` | 天音 リコ | SSR | 夕陽に透かす紙の星 | ヒーラー | **紙の星の灯り** (`regen`) — 継続回復：味方単体HP11を2秒毎に回復／8秒 | **ひと休みの幕間** (`heal_boost`) — 回復量アップ：味方全体の受ける回復量+18%／8秒 | **幕間の灯り** (`regen_duration`) — 自身の継続回復の持続時間追加（秒） +4秒（SSR） | `assets/UNIT_ART/concept17_sky.webp` |
| 75 | `concept17_star` | 天音 リコ | UR | あなただけのフィナーレ | タンク | **スポットライト** (`taunt`) — 挑発：自身へ防護24＋6.0秒挑発 | **グランドフィナーレ** (`counter`) — 反撃：自身に8.0秒の反撃態勢（被弾時に攻撃力の45%相当で反撃） | **喝采の守り** (`guard`) — 自身が受けるダメージの軽減 8%軽減（UR） | `assets/UNIT_ART/concept17_star.webp` |
| 76 | `akane_work` | 藤崎 朱音 | SR | 非番の日 | アタッカー | **非番でも全力** (`aoe`) — 全体攻撃：敵全体に各威力21（単体より低威力） | **サムズアップ** (`finisher`) — とどめ：敵単体に威力28、敵のHP残量に応じて最大+75% | **非番の突破力** (`finish`) — 残りHP50%以下の敵への与ダメージ +9%（SR） | `assets/UNIT_ART/akane_work.webp` |
| 77 | `akane_sky` | 藤崎 朱音 | SSR | 港公園のお昼休み | サポーター | **お昼休みの号令** (`ct`) — CT短縮：味方全体の残りCTを2.3秒短縮 | **ここ座りなよ** (`defense_up`) — 防御アップ：味方全体の防御力+30%／8秒 | **港公園の号令** (`defense_up_focus`) — 自身の防御アップスキルの効果量 +9%（SSR） | `assets/UNIT_ART/akane_sky.webp` |
| 78 | `akane_star` | 藤崎 朱音 | UR | 夜明けの盾 | ヒーラー | **夜明けの盾** (`heal_shield`) — 癒しの盾：味方単体のHP24回復＋防護18 | **街のみんなを守る** (`heal_all`) — 全体回復：味方全体HP各27回復 | **暁の包帯** (`heal_shield_focus`) — 癒しの盾の回復・防護量 +20%（UR） | `assets/UNIT_ART/akane_star.webp` |
| 79 | `reina_work` | 黒瀬 玲奈 | SR | 休日の静けさ | サポーター | **静かな観察** (`ct`) — CT短縮：味方全体の残りCTを2.3秒短縮 | **次の一手を封じる** (`attack_down`) — 敵の攻撃ダウン：敵単体の攻撃-28%／8秒 | **観察眼の支援** (`ct_focus`) — 自身のCT短縮スキルの短縮量 +7%（SR） | `assets/UNIT_ART/reina_work.webp` |
| 80 | `reina_sky` | 黒瀬 玲奈 | SSR | 朝の防波堤 | ヒーラー | **防波堤の構え** (`heal_one`) — 単体大回復：味方単体HP57回復 | **呼吸を整えて** (`regen`) — 継続回復：味方単体HP11を2秒毎に回復／8秒 | **波止場の静息** (`regen_duration`) — 自身の継続回復の持続時間追加（秒） +4秒（SSR） | `assets/UNIT_ART/reina_sky.webp` |
| 81 | `reina_star` | 黒瀬 玲奈 | UR | 影踏みの一閃 | タンク | **影踏みの一閃・極** (`counter`) — 反撃：自身に8.0秒の反撃態勢（被弾時に攻撃力の45%相当で反撃） | **制圧の護り** (`damage_reduce`) — 被ダメージ軽減：味方全体の被ダメージ18%軽減／8秒 | **守るための剣筋** (`start_shield`) — 戦闘開始時の自身の防護 +20（UR） | `assets/UNIT_ART/reina_star.webp` |
| 82 | `aoi_work` | 瀬名 葵 | SR | 雨上がりの街角 | タンク | **雨上がりの傘** (`shield_one`) — 単体防護：味方単体に防護56 | **そっと寄り添う** (`cover`) — 身代わり：選択した味方への攻撃を8.0秒肩代わり | **雨宿りの庇護** (`shield`) — 防護量 +12%（SR） | `assets/UNIT_ART/aoi_work.webp` |
| 83 | `aoi_sky` | 瀬名 葵 | SSR | 灯りの残る相談室 | アタッカー | **夜更けの集中** (`single`) — 単体強攻撃：敵単体に威力34（攻撃力比例） | **相談の核心** (`def_down`) — 防御ダウン：敵単体の被ダメージ+20%／7秒 | **真相への決め手** (`finish`) — 残りHP50%以下の敵への与ダメージ +12%（SSR） | `assets/UNIT_ART/aoi_sky.webp` |
| 84 | `aoi_star` | 瀬名 葵 | UR | やすらぎの灯 | サポーター | **灯の導き** (`reset_one`) — スキル再使用：味方1人のスキル1・2の残りCTを即時回復 | **安心のひととき** (`defense_up`) — 防御アップ：味方全体の防御力+30%／8秒 | **寄り添う灯** (`reset_one_guard`) — スキル再使用対象へ8秒間付与する防御力 +9%（UR） | `assets/UNIT_ART/aoi_star.webp` |
| 85 | `chinatsu_work` | 篠原 千夏 | SR | 休日の港町 | ヒーラー | **休日の差し入れ** (`regen`) — 継続回復：味方単体HP11を2秒毎に回復／8秒 | **ひと息ついて** (`heal_boost`) — 回復量アップ：味方全体の受ける回復量+18%／8秒 | **休息のひととき** (`rescue`) — 残りHP50%以下の味方への回復量 +10%（SR） | `assets/UNIT_ART/chinatsu_work.webp` |
| 86 | `chinatsu_sky` | 篠原 千夏 | SSR | 港の朝市 | タンク | **朝市の看板持ち** (`cover`) — 身代わり：選択した味方への攻撃を8.0秒肩代わり | **ここは私が** (`taunt`) — 挑発：自身へ防護24＋6.0秒挑発 | **朝市の守護者** (`guard`) — 自身が受けるダメージの軽減 6%軽減（SSR） | `assets/UNIT_ART/chinatsu_sky.webp` |
| 87 | `chinatsu_star` | 篠原 千夏 | UR | みんなの道しるべ | アタッカー | **羅針の一撃** (`single`) — 単体強攻撃：敵単体に威力34（攻撃力比例） | **道しるべの光** (`aoe`) — 全体攻撃：敵全体に各威力21（単体より低威力） | **光の羅針盤** (`aoe_focus`) — 自身の全体攻撃スキルの威力 +16%（UR） | `assets/UNIT_ART/chinatsu_star.webp` |
| 88 | `nagi_work` | 白峰 凪 | SR | 宵の散歩道 | ヒーラー | **宵風の癒やし** (`regen`) — 継続回復：味方単体HP11を2秒毎に回復／8秒 | **紅糸ほどき** (`cleanse`) — 弱体解除＋小回復：味方単体の弱体効果を解除しHP20回復 | **宵風が癒す傷** (`regen_focus`) — 自身の継続回復スキルの回復量 +14%（SR） | `assets/UNIT_ART/nagi_work.webp` |
| 89 | `nagi_sky` | 白峰 凪 | SSR | 灯台の下で | タンク | **潮風のいたわり** (`shield_all`) — 全体防護：味方全体に防護各25 | **頁をめくる手** (`shield_one`) — 単体防護：味方単体に防護56 | **灯台の番人** (`shield_low`) — 残りHP50%以下の味方への防護量 +16%（SSR） | `assets/UNIT_ART/nagi_sky.webp` |
| 90 | `nagi_star` | 白峰 凪 | UR | 紅糸の誓い | アタッカー | **紅糸の誓約** (`combo`) — 3連撃：敵単体に3回×威力16（攻撃力比例） | **星灯の決着** (`finisher`) — とどめ：敵単体に威力28、敵のHP残量に応じて最大+75% | **紅糸の断ち切り** (`finish`) — 残りHP50%以下の敵への与ダメージ +15%（UR） | `assets/UNIT_ART/nagi_star.webp` |
| 91 | `kaname_work` | 紫藤 カナメ | SR | 仮面を置いた夜明け | サポーター | **ゆめ姉のオルゴール** (`attack_up`) — 攻撃アップ：味方全体の攻撃+18%／8秒 | **素顔で踏み出す一歩** (`reset_one`) — スキル再使用：味方1人のスキル1・2の残りCTを即時回復 | **夜明けの屋上** (`reset_one_guard`) — スキル再使用対象へ8秒間付与する防御力 +5%（SR） | `assets/UNIT_ART/kaname_work.webp` |

## 追加特性の実装値

| 特性系統 | R | SR | SSR | UR | 発動内容 |
|---|---:|---:|---:|---:|---|
| `defense_up_focus` | 5% | 7% | 9% | 11% | 自身の `defense_up` による防御バフの効果量を倍率強化 |
| `reset_one_guard` | 3% | 5% | 7% | 9% | 自身の `reset_one` の対象に8秒間、防御力を上昇させる |

## 特記事項

- `kaname_work` の募集・図鑑・一覧・ピックアップ表示はカナメ絆エピソード第2話読了後のみ。
- ももかの `momoka_work` / `momoka_sky` / `momoka_star` は原画像のまま（専用アート未収録）。
- みるくの既存SR・SSR・URには今回の画像3枚を割り当てる。性能は変更しない。
- ユニットの基本HP・攻撃・防御はレアリティではなくロール別で決定。
- 効果タイプごとの実数値と計算処理は `performance_v016.js` / `game.js` により管理。
