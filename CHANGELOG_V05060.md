# 宵星の契約者 RE:START Ver.0.50.6.0 — 氷室沙耶戦のBGM

- `assets/audio/saya_boss.mp3` を追加（こんにーさん提供「Titan's Frozen Reign」、約2分59秒）。
- q28（氷室沙耶・第5章 旧灯台の灯室）の最終ウェーブで沙耶が現れたら、この曲を流す。それまでのウェーブは通常の戦闘曲のまま。ボス試遊のq28でも同じ。
- `js/audio.js` に `saya_boss` を追加、`js/game.js` のボス曲の判定に q28 を追加。
- 確認：q28の通常ウェーブでは判定なし、最終ウェーブで `saya_boss.mp3` が読み込まれることを確認。
