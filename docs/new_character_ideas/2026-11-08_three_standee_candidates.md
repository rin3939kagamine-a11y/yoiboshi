# 将来用・未実装立ち絵3点（2026-11-08）

## 状態
- ユーザーが画像を確認し「いいね」と評価した3点を**将来採用候補**として保存。
- **ゲームへの実装はしていない**。キャラクター名・設定・レアリティ・登場場所・スキル等は未決定。
- 元写真3枚から**それぞれ個別に**イラスト化。集合絵ではない。
- マスクがある元写真（3番）はマスクなしにしている。
- 保存形式はいずれも **1024×1536 / RGBA PNG / 全身 / 背景透過領域あり**。生成結果をそのまま保管し、再生成・再編集はしない。

## PNG原本（このリポジトリ内）

| ID | 仮称（ファイル管理用） | ファイル | SHA-256 |
| --- | --- | --- | --- |
| 01 | 灰髪・ピンクふわもこギャル | [01_gray_pink_gyaru.png](../../assets/provisional_standees/2026-11-08/01_gray_pink_gyaru.png) | `de307eb57a523dd50e408dcc06ddfcc575cd15b03e76670e9e86c98a6b38c16d` |
| 02 | オレンジ髪・赤白ロリータ | [02_orange_red_lolita.png](../../assets/provisional_standees/2026-11-08/02_orange_red_lolita.png) | `eca4c7030c411f4e4e0aa501d6d91197dc240bbe9a55d4326b69f4f0ad2af3e6` |
| 03 | プラチナ髪・黒緑アカデミー（マスク除去） | [03_platinum_green_academy_nomask.png](../../assets/provisional_standees/2026-11-08/03_platinum_green_academy_nomask.png) | `5feb077be0374276bcc778bfdd5b28773493882d3b0a588863b99a95f0ec6bd0` |

## Google Driveバックアップ
- [01 灰髪・ピンクふわもこギャル](https://drive.google.com/file/d/1gR_s6Y-3DT21Plr-0oCGqv16A5xg3WuG/view?usp=drivesdk)
- [02 オレンジ髪・赤白ロリータ](https://drive.google.com/file/d/13Yt7c8PCLNnq2SOaBVWUBdDIsOWzjNuG/view?usp=drivesdk)
- [03 プラチナ髪・黒緑アカデミー（マスク除去）](https://drive.google.com/file/d/1BLsD3c57VKAJDHO0gv4rqC7pEXNKFf_2/view?usp=drivesdk)

## 将来実装時の注意
- 画像は仮保存。採用を決定するまではゲームのキャラID、図鑑、ガチャ、戦闘、ストーリーへ紐付けない。
- 既存キャラクター・既存画像の上書きは禁止。
- セーブデータ互換・既存実装を維持し、実装する場合は別PRで行う。
- 元写真は本PRに追加しない。

## QA（保存時）
- [x] 3画像のサイズが1024×1536であることを確認
- [x] 3画像がRGBA PNGで透過領域を含むことを確認
- [x] GitHubのblob SHA-1が、ローカル原本のGit blob SHA-1と一致することを確認
- [x] 既存のゲームコード・データ・設定ファイルを変更しない構成
- [ ] ゲーム動作テスト（ゲーム実装の変更がなく対象外）
