# 早瀬真琴（concept15）｜立ち絵統一候補 V1

## 状態
- **候補画像を保存済み／ゲームには未適用**
- 2026-11-04時点の正式ゲーム：Ver.0.36.0.0
- 絵柄基準：桜井ももか・白石みるく（柔らかい中間アニメ調）
- 顔・髪・服・ポーズを変えず、承認済み全身PNGと上半身切り出しPNGからWebP化
- AIによる追加画像生成なし

## 今回追加する画像
| 用途 | ファイル | 寸法 | SHA-256 |
|---|---|---|---|
| 全身候補 | `assets/ART_V2/style_candidates/makoto_v1_full.webp` | 1024×1536 | `ad6e4f1b5e983270a2226432b20d2d7c64f1f5ed71fd9010b2cbacde6a1c3f83` |
| 上半身候補 | `assets/ART_V2/style_candidates/makoto_v1_upper.webp` | 665×820 | `f0dffeaf7f2c4f370e017408e070d1a0d558cf9432fb2ab5552455ab1e9959dd` |

**現行ゲームが使用する画像はまだ置き換えない。**

- `assets/ART_V2/full_body/concept15.webp`
- `assets/ART_V2/upper_body/concept15.webp`
- `assets/ART_V2/expressions/concept15_{normal,blush,pout,sad,smile,surprise}.webp`

## 理由
会話画面は `expressionArt(personId,face)` を使っており、旧デザインの6表情が生きている。全身と上半身だけを交換すると、会話中に別人の顔や服装へ切り替わる。

## 次の受入条件
1. 既存全身／上半身／通常顔／5表情と新デザインの差を比較し、**通常顔と5表情を同じ真琴に統一**。
2. 標準姿と表情差分の髪型・衣装・顔が一致し、背景透過が正常。
3. 390×844 と 844×390 の実ゲームで表示・切れ・コントラストを確認。
4. セーブ互換・同一人物の画像参照先・404を確認後に、バージョン付きで採用。
5. 変更前の旧画像は削除せずロールバック可能にする。

## 検証
- PNG→WebPのRGBA、寸法、透過領域確認済み。
- GitHub上のblob SHA-1とローカルWebPの `git hash-object` 一致確認済み。
- 実ゲームのブラウザQAとiPhone実機確認は**未実施**。
