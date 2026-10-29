# 指示文:戦闘画面の味方をちびキャラ表示にする

添付の「ちびキャラ部品」(このZIP)を、最新の完成版に組み込んでください。
戦闘のルール・数値は一切変えず、**戦闘画面の味方の見た目だけ**をちびキャラにします。

## 同梱しているもの
- `assets/ART_V2/chibi/<キャラID>_chibi.png`:ちびキャラ画像(512×512、背景透明、足元の高さはそろえてある)。今は7人(reina, akane, aoi, chinatsu, nagi, momoka, milku)。
- `js/chibi_battle.js`:表示の部品(`window.YoiChibi`)。戦闘のロジックは持たない。
- `css/chibi_battle.css`:部品の見た目と動き。
- `tools/chibi_demo.html`:部品だけを動かす確認ページ。

## 組み込み方
1. `index.html` で `css/chibi_battle.css` と `js/chibi_battle.js` を読み込む(戦闘のJSより前)。
2. 戦闘画面の味方を表示している場所に、ステージ用の要素(例:`<div id="ycStage">`、横長、`position:relative`)を置き、戦闘開始時に次を呼ぶ。
   ```js
   const chibi = YoiChibi.mount(stageEl, members, { speed: 今の倍速, onSelect: id => 味方を選んだときの処理(id) });
   // members = [{ id:'reina', name:'玲奈', color:灯火の色, fallbackSrc:今の顔アイコンの画像 }, ...] (最大5人)
   ```
3. 戦闘の処理の中で、行動に合わせて呼ぶ。
   | 場面 | 呼ぶもの |
   |---|---|
   | 味方の攻撃・スキル | `chibi.attack(id).then(() => ダメージ表示)`(当たる瞬間に解決する) |
   | 味方が被ダメージ | `chibi.hurt(id)` と `chibi.popNumber(id, '-120')` |
   | 回復 | `chibi.popNumber(id, '+80', 'heal')` |
   | 灯す | `chibi.glow(id)`、灯火の状態の間は `chibi.setLit(id, true)`、切れたら `false` |
   | 手番・選択中 | `chibi.setActive(id)` |
   | 戦闘不能・復帰 | `chibi.ko(id)` / `chibi.revive(id)` |
   | 倍速の切り替え | `chibi.setSpeed(2)` など |
   | 戦闘の終了・中断 | `chibi.destroy()` |
4. ちびキャラが無いキャラは、`fallbackSrc` の顔アイコンを丸く表示する(部品が自動で切り替える)。
   **ちびキャラを増やすときは、画像を `assets/ART_V2/chibi/` に置き、`js/chibi_battle.js` の `CHIBI_IDS` にIDを足すだけ**にする。
5. 敵の見た目は今のまま(ちびにしない)。味方の体は右向きなので、敵は画面の右側(スマホ縦なら上側でもよい)に置く。

## 変更しないもの
- 戦闘のルール・数値・行動順・報酬・セーブ形式
- ストーリー、会話画面、立ち絵、調査、ガチャ、育成、ホーム、BGM・SE
- `chibi_battle.js` / `chibi_battle.css` の中身は、原則そのまま使う(直す必要があれば、理由を報告する)
- 動きは画像(`img`)ではなく親の層(`.yc-actor`)にかけている。画像の呼吸アニメと `transform` がぶつかるので、この構造は崩さない

## QAで確認すること
1. 7人(ちびあり)と、ちびの無いキャラを混ぜた編成で戦闘を始め、全員が表示される(ちび無しは顔アイコンの丸表示)。
2. 攻撃・スキル・被ダメージ・回復・灯す・戦闘不能で、それぞれの動きが出る。攻撃のダメージ数字が、当たる瞬間に出る。
3. 倍速で、動きも速くなる。
4. 画面サイズ 390×844 と 1280×800 で、キャラが枠からはみ出さず、ボタンを押せる。凪(髪が横に広い)とみるく(ヘッドドレスが高い)が、跳ねても切れない。
5. 戦闘の中断・勝利・敗北のあと、ちびの表示が残らない。
6. `node --check` で全JSが合格し、JavaScript例外が0件。
7. 自動周回など、画面を出さない戦闘でエラーにならない(画面が無いときは部品を呼ばない)。

実装したことと、確認したこと(実ブラウザか、コードを読んだだけか)を分けて報告してください。

## 提出物
- 変更・追加したファイルだけの差分ZIP(`index.html`、変更した戦闘のJS・CSS、同梱の4種類のファイル)
- 変更内容とQAの結果を書いた `CHANGELOG_CHIBI_BATTLE.md`
