// Ver.0.29.0.0 会話シーンの表情差分（Claude作成のデータパック・背景透過版）
// 54人全員の normal も背景を消した会話用の通常顔を登録
(function(){const T={
"akane": {
"blush": "assets/ART_V2/expressions/akane_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/akane_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/akane_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/akane_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/akane_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/akane_surprise.webp?v=0.34.71.0"
},
"anzu": {
"blush": "assets/ART_V2/expressions/anzu_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/anzu_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/anzu_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/anzu_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/anzu_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/anzu_surprise.webp?v=0.34.71.0"
},
"aoi": {
"blush": "assets/ART_V2/expressions/aoi_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/aoi_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/aoi_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/aoi_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/aoi_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/aoi_surprise.webp?v=0.34.71.0"
},
"chihiro": {
"blush": "assets/ART_V2/expressions/chihiro_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/chihiro_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/chihiro_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/chihiro_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/chihiro_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/chihiro_surprise.webp?v=0.34.71.0"
},
"chinatsu": {
"blush": "assets/ART_V2/expressions/chinatsu_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/chinatsu_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/chinatsu_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/chinatsu_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/chinatsu_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/chinatsu_surprise.webp?v=0.34.71.0"
},
"chiyo": {
"blush": "assets/ART_V2/expressions/chiyo_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/chiyo_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/chiyo_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/chiyo_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/chiyo_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/chiyo_surprise.webp?v=0.34.71.0"
},
"yui": {
"blush": "assets/ART_V2/expressions/yui_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/yui_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/yui_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/yui_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/yui_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/yui_surprise.webp?v=0.34.71.0"
},
"shizuku": {
"blush": "assets/ART_V2/expressions/shizuku_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/shizuku_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/shizuku_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/shizuku_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/shizuku_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/shizuku_surprise.webp?v=0.34.71.0"
},
"suiran": {
"blush": "assets/ART_V2/expressions/suiran_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/suiran_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/suiran_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/suiran_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/suiran_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/suiran_surprise.webp?v=0.34.71.0"
},
"kyoko": {
"blush": "assets/ART_V2/expressions/kyoko_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/kyoko_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/kyoko_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/kyoko_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/kyoko_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/kyoko_surprise.webp?v=0.34.71.0"
},
"cocoa": {
"blush": "assets/ART_V2/expressions/cocoa_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/cocoa_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/cocoa_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/cocoa_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/cocoa_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/cocoa_surprise.webp?v=0.34.71.0"
},
"mai": {
"blush": "assets/ART_V2/expressions/mai_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/mai_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/mai_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/mai_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/mai_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/mai_surprise.webp?v=0.34.71.0"
},
"luna": {
"blush": "assets/ART_V2/expressions/luna_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/luna_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/luna_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/luna_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/luna_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/luna_surprise.webp?v=0.34.71.0"
},
"makoto": {
"blush": "assets/ART_V2/expressions/makoto_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/makoto_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/makoto_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/makoto_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/makoto_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/makoto_surprise.webp?v=0.34.71.0"
},
"fumika": {
"blush": "assets/ART_V2/expressions/fumika_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/fumika_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/fumika_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/fumika_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/fumika_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/fumika_surprise.webp?v=0.34.71.0"
},
"ena": {
"blush": "assets/ART_V2/expressions/ena_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/ena_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/ena_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/ena_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/ena_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/ena_surprise.webp?v=0.34.71.0"
},
"riko": {
"blush": "assets/ART_V2/expressions/riko_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/riko_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/riko_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/riko_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/riko_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/riko_surprise.webp?v=0.34.71.0"
},
"noel": {
"blush": "assets/ART_V2/expressions/noel_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/noel_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/noel_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/noel_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/noel_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/noel_surprise.webp?v=0.34.71.0"
},
"mio": {
"blush": "assets/ART_V2/expressions/mio_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/mio_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/mio_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/mio_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/mio_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/mio_surprise.webp?v=0.34.71.0"
},
"jun": {
"blush": "assets/ART_V2/expressions/jun_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/jun_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/jun_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/jun_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/jun_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/jun_surprise.webp?v=0.34.71.0"
},
"yume": {
"blush": "assets/ART_V2/expressions/yume_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/yume_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/yume_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/yume_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/yume_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/yume_surprise.webp?v=0.34.71.0"
},
"shino": {
"blush": "assets/ART_V2/expressions/shino_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/shino_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/shino_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/shino_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/shino_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/shino_surprise.webp?v=0.34.71.0"
},
"hiyori": {
"blush": "assets/ART_V2/expressions/hiyori_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/hiyori_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/hiyori_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/hiyori_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/hiyori_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/hiyori_surprise.webp?v=0.34.71.0"
},
"ageha": {
"blush": "assets/ART_V2/expressions/ageha_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/ageha_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/ageha_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/ageha_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/ageha_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/ageha_surprise.webp?v=0.34.71.0"
},
"kirari": {
"blush": "assets/ART_V2/expressions/kirari_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/kirari_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/kirari_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/kirari_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/kirari_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/kirari_surprise.webp?v=0.34.71.0"
},
"maron": {
"blush": "assets/ART_V2/expressions/maron_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/maron_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/maron_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/maron_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/maron_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/maron_surprise.webp?v=0.34.71.0"
},
"koharu": {
"blush": "assets/ART_V2/expressions/koharu_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/koharu_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/koharu_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/koharu_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/koharu_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/koharu_surprise.webp?v=0.34.71.0"
},
"lilith": {
"blush": "assets/ART_V2/expressions/lilith_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/lilith_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/lilith_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/lilith_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/lilith_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/lilith_surprise.webp?v=0.34.71.0"
},
"shio": {
"blush": "assets/ART_V2/expressions/shio_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/shio_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/shio_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/shio_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/shio_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/shio_surprise.webp?v=0.34.71.0"
},
"kaname": {
"blush": "assets/ART_V2/expressions/kaname_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/kaname_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/kaname_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/kaname_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/kaname_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/kaname_surprise.webp?v=0.34.71.0"
},
"koyori": {
"blush": "assets/ART_V2/expressions/koyori_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/koyori_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/koyori_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/koyori_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/koyori_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/koyori_surprise.webp?v=0.34.71.0"
},
"marin": {
"blush": "assets/ART_V2/expressions/marin_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/marin_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/marin_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/marin_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/marin_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/marin_surprise.webp?v=0.34.71.0"
},
"erika": {
"blush": "assets/ART_V2/expressions/erika_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/erika_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/erika_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/erika_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/erika_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/erika_surprise.webp?v=0.34.71.0"
},
"tsubaki": {
"blush": "assets/ART_V2/expressions/tsubaki_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/tsubaki_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/tsubaki_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/tsubaki_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/tsubaki_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/tsubaki_surprise.webp?v=0.34.71.0"
},
"kaede": {
"blush": "assets/ART_V2/expressions/kaede_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/kaede_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/kaede_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/kaede_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/kaede_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/kaede_surprise.webp?v=0.34.71.0"
},
"kagari": {
"blush": "assets/ART_V2/expressions/kagari_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/kagari_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/kagari_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/kagari_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/kagari_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/kagari_surprise.webp?v=0.34.71.0"
},
"karen": {
"blush": "assets/ART_V2/expressions/karen_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/karen_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/karen_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/karen_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/karen_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/karen_surprise.webp?v=0.34.71.0"
},
"kurumi": {
"blush": "assets/ART_V2/expressions/kurumi_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/kurumi_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/kurumi_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/kurumi_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/kurumi_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/kurumi_surprise.webp?v=0.34.71.0"
},
"meru": {
"blush": "assets/ART_V2/expressions/meru_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/meru_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/meru_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/meru_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/meru_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/meru_surprise.webp?v=0.34.71.0"
},
"milku": {
"blush": "assets/ART_V2/expressions/milku_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/milku_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/milku_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/milku_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/milku_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/milku_surprise.webp?v=0.34.71.0"
},
"miyabi": {
"blush": "assets/ART_V2/expressions/miyabi_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/miyabi_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/miyabi_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/miyabi_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/miyabi_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/miyabi_surprise.webp?v=0.34.71.0"
},
"mizuki": {
"blush": "assets/ART_V2/expressions/mizuki_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/mizuki_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/mizuki_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/mizuki_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/mizuki_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/mizuki_surprise.webp?v=0.34.71.0"
},
"momoka": {
"blush": "assets/ART_V2/expressions/momoka_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/momoka_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/momoka_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/momoka_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/momoka_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/momoka_surprise.webp?v=0.34.71.0"
},
"nagi": {
"blush": "assets/ART_V2/expressions/nagi_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/nagi_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/nagi_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/nagi_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/nagi_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/nagi_surprise.webp?v=0.34.71.0"
},
"nazuna": {
"blush": "assets/ART_V2/expressions/nazuna_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/nazuna_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/nazuna_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/nazuna_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/nazuna_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/nazuna_surprise.webp?v=0.34.71.0"
},
"reiko": {
"blush": "assets/ART_V2/expressions/reiko_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/reiko_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/reiko_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/reiko_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/reiko_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/reiko_surprise.webp?v=0.34.71.0"
},
"reina": {
"blush": "assets/ART_V2/expressions/reina_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/reina_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/reina_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/reina_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/reina_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/reina_surprise.webp?v=0.34.71.0"
},
"ritsu": {
"blush": "assets/ART_V2/expressions/ritsu_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/ritsu_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/ritsu_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/ritsu_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/ritsu_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/ritsu_surprise.webp?v=0.34.71.0"
},
"saki": {
"blush": "assets/ART_V2/expressions/saki_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/saki_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/saki_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/saki_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/saki_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/saki_surprise.webp?v=0.34.71.0"
},
"sanae": {
"blush": "assets/ART_V2/expressions/sanae_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/sanae_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/sanae_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/sanae_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/sanae_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/sanae_surprise.webp?v=0.34.71.0"
},
"sena": {
"blush": "assets/ART_V2/expressions/sena_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/sena_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/sena_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/sena_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/sena_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/sena_surprise.webp?v=0.34.71.0"
},
"towa": {
"blush": "assets/ART_V2/expressions/towa_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/towa_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/towa_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/towa_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/towa_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/towa_surprise.webp?v=0.34.71.0"
},
"yuriko": {
"blush": "assets/ART_V2/expressions/yuriko_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/yuriko_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/yuriko_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/yuriko_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/yuriko_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/yuriko_surprise.webp?v=0.34.71.0"
},
"yuzu": {
"blush": "assets/ART_V2/expressions/yuzu_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/yuzu_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/yuzu_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/yuzu_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/yuzu_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/yuzu_surprise.webp?v=0.34.71.0"
}
};
for(const id in T){ART_EXPRESSIONS[id]=Object.assign({},ART_EXPRESSIONS[id]||{},T[id]);}
})();
