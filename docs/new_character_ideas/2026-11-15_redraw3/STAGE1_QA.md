# 2026-11-15 採用3人の段階1実装・QA追跡

## 確定名称・ID
- 銀城 セシル `ginjo_cecil`
- 長谷川 ほのか `hasegawa_honoka`（旧記録「まどか」は不使用。既存 `madoka` 維持）
- 上田 かな `ueda_kana`

## 仮設定（ユーザーによるキャラクター詳細の確定は別途）
候補記録で年齢・職業・性格・役職の採用済み定義が見つからなかったため、実装した設定を明記する。
- 銀城セシル：21歳、専門学院で舞台衣装・演出を学ぶ学生。慎重で礼儀正しく、仲間を守るときは大胆。役職：学院生／相談室外部協力者（演出・衣装）
- 長谷川ほのか：23歳、フリーランス写真家。自然体で好奇心旺盛、観察力が高い。役職：外部協力者（街の記録・写真）
- 上田かな：25歳、東雲商店街のイベント運営スタッフ。朗らかで世話好き、裏方で準備を欠かさない。役職：外部協力者（イベント運営・地域案内）

## 無加工の原本複製
| 元PNG | ART_V2の正式立ち絵 | Git blob SHA | SHA-256（GitHub Actions原本実測） |
|---|---|---|---|
| `02_ginjo_cecil_v2.png` | `assets/ART_V2/full_body/ginjo_cecil.png` | `8ef147a8d90ed33968a11b626b4b11ce729c970d` | `511795d3a1fb5516268b5130cc651e6ecd964a359cb019f26f6b98e241b3026f` |
| `20_hasegawa_honoka_v2.png` | `assets/ART_V2/full_body/hasegawa_honoka.png` | `a62336a12f1c73dfc8d562b2c1f04e740865ed9f` | `6ebcfac15fb1e8bb542ef43c862c4d0bac7f7001a3d582d366bdda1040348eee` |
| `37_ueda_kana_v2.png` | `assets/ART_V2/full_body/ueda_kana.png` | `6b621dd3b8b23de1f2b34125202ce748bb76907a` | `24c6ab13d936ed488fa504681ce224336a5c4fffece0dd51ce2e4c14c9671b94` |

各原本の`docs/new_character_ideas/2026-11-15_redraw3/`配下は不変。会話用に `assets/ART_V2/upper_body/` と `face_icons/` のWebPを原本から**切り抜きのみ**で作成し、visible RGB と alpha の無劣化一致を検証。PNG 1024×1536 RGBA・透過・明暗プレビュー合格。

## 段階1機能
- q6クリア後のみ出会いと交流が利用可能
- 3人とも出会い各1話、絆各5話（親密度20/40/60/80/100）、日常8話題、場所別・気分別会話、返信、人物深掘り、灯火
- ユニット・ガチャ追加なし、確率・旧セーブ・既存ストーリー・既存キャラクター設定の変更なし

## 実施したQA
- [専用GitHub Actions #43688649890](https://github.com/rin3939kagamine-a11y/yoiboshi/actions/runs/43688649890) **success**: 原本完全一致、画像切り抜き・登録、縦横Chromium、交流、絆、解放、旧セーブ、確率
- [初回PR共通QA（PR #95）](https://github.com/rin3939kagamine-a11y/yoiboshi/pull/95/checks): 既存8系統すべて **success**。その後、自動画像コミットに付随する新規PRチェックがGitHub側で `action_required` になったため、今回のGitHub手動コミット後のチェック結果も確認対象
- 段階1の範囲のみでマージ判断。ユニット・ガチャは段階2の別途判断
