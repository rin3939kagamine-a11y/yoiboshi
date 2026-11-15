# PR #38 承認済み8人・段階1人物・交流・絆と立ち絵
- 原本: `docs/new_character_ideas/2026-11-15_pr38_approved8/`。8つのGit blob SHAをコードで固定し、QAで照合
- 8名: morinaga_akari, kurosaki_kaede, komatsu_hinata, kitahara_shiho, otsuki_tsubasa, mizuhara_mayu, takasaka_tomoe, nishimura_ako
- 人物・会話・絆を `js/heroines_v0880.js`、アートwireを `js/heroines_v0880_wire.js` に分離
- 全員 q6 完了で交流・出会い解禁。日常8話題・初回出会い1話・絆5話（20/40/60/80/100）
- 原本PNGを `assets/ART_V2/full_body/` に配置。透明残存色の処理は `tools/qa/build_pr38_stage1_assets.py` が決定し、各人の status、実際に除去した画素数、ハッシュを `qa_artifacts/pr38_stage1/image_report.json` に出力する。安全に分離できない場合は原本をそのまま使用
- 不透明画素（alpha >=128）と維持した半透明画素のRGBAは一切変更禁止。除去対象はalpha1..64の輪郭の外側かつ主不透明シルエットから8px以上の離れた画素のみ。候補が多すぎる場合は原本へフォールバック
- 会話画像は配置PNGだけをクロップし、再生成禁止。上半身 `assets/ART_V2/upper_body/{id}.webp` 720x960、顔 `assets/ART_V2/face_icons/{id}.webp` 400x400。WebPロスレス、可視RGBAを画素単位で照合
- 今回はユニット・ガチャ・確率・戦闘計算・既存セーブ・既存物語は変更しない
- QA: `tools/qa/build_pr38_stage1_assets.py`、`tools/qa/pr38_stage1_smoke.py`、GitHub Actions `.github/workflows/qa-pr38-approved8-stage1.yml`
