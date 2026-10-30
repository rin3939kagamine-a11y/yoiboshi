# Ver.0.35.0.0 SR立ち絵化・Rレアリティ廃止

## 画像(ファイル名は変更なし・中身だけ差し替え)
- `assets/ART_V2/full_body/` 54枚、`full_body_dynamic/` 35枚:各キャラのSR画像(`UNIT_ART/*_work`)に差し替え。
- `assets/ART_V2/upper_body/` 54枚、`face_icons/` 54枚:SR画像から顔位置を検出し、従来と同じ構図で切り出し。
- 新規:`assets/UNIT_ART/tsubaki_work.webp`、`erika_work.webp`、`kaede_work.webp`(既存PNGのwebp版)。
- 表情差分(expressions)・ちびキャラ(chibi)・battle_spritesは未変更(SR衣装版をこれから制作)。

## R廃止(js/game.js)
- Rユニット54体は定義だけ残し、ガチャ・一覧・図鑑から除外(`RETIRED_R_TO_SR`)。
- セーブ読み込み時、所持Rを同じキャラのSRへ変換。Lv・好感度・凸は高い方、SR所持済みなら重なり+1。編成・選択中・ホーム表示も置き換え(`convertRetiredRSave`)。
- 初期所持・初期編成・リセット時編成・ヒロイン選択券・お試し募集5種をSRに変更。
- 椿・エリカ・楓のSRユニット(tsubaki_work / erika_work / kaede_work)を追加。肩書き・技名・ロールはRから仮引き継ぎ。
- カナメSRの絆物語による解放条件を撤廃(Rがなくなるため)。
- ガチャ確率は暫定でSR80/SSR15/UR5。SR10回確定は廃止。UR天井100は維持。レア度フィルタからRを削除。

## その他
- 画像・スクリプトの読み込み番号を `?v=0.35.0.0` に更新(art_v2.js / index.html)。

## 確認済み
- 新規セーブ:所持・編成がSR、R残りなし、ガチャ300回でRが出ない。
- 旧セーブ(R所持・R編成):SRへ変換、Lv12/好感度40の引き継ぎ、重なり加算、編成維持。
- ホーム・編成画面にSR立ち絵が表示。ページエラーなし。
