# Ver.0.65.1.0 — 常夜の立ち絵を追加

- 常夜(tokoyo)の会話絵を追加:assets/ART_V2/story_cast/tokoyo_talk.webp(2048×3072)
- 戦闘用の敵画像を追加:assets/enemies/tokoyo.webp(1024×1024)
- 顔アイコンを追加:assets/ART_V2/face_icons/tokoyo.webp
- js/game.js:常夜を「声だけ」の扱いから外し、会話シーンで立ち絵を表示
- js/boss_director_v03462.js:q119(市守り・常夜)のボス演出を追加
- js/battle_turn_v032.js / js/q6_classic_battle_v03540.js:q119の敵画像を常夜に
- index.html:変更ファイルの読み込みバージョンを 0.65.1.0 に

# Ver.0.65.2.0 — ボスのちびキャラを追加

- assets/enemies/ に saya_battle / aoi_dark_battle / ruri_battle / touko_true_battle / enju_battle / tokoyo_battle(.webp, 1024×1024)を追加
- js/chibi_bridge_v03321.js:戦闘画面のボスをちびキャラで表示(q28・q35・q40・q45・q46・q52・q58・q81・q89・q113・q119、第3部の朔夜 q173)
