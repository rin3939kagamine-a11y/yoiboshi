// Ver.0.29.0.0 会話シーンの表情差分（Claude作成のデータパック・背景透過版）
// 54人全員の normal も背景を消した会話用の通常顔を登録
(function(){const T={
"akane": {
"blush": "assets/ART_V2/expressions/akane_blush.webp",
"normal": "assets/ART_V2/expressions/akane_normal.webp",
"pout": "assets/ART_V2/expressions/akane_pout.webp",
"sad": "assets/ART_V2/expressions/akane_sad.webp",
"smile": "assets/ART_V2/expressions/akane_smile.webp",
"surprise": "assets/ART_V2/expressions/akane_surprise.webp"
},
"anzu": {
"blush": "assets/ART_V2/expressions/anzu_blush.webp",
"normal": "assets/ART_V2/expressions/anzu_normal.webp",
"pout": "assets/ART_V2/expressions/anzu_pout.webp",
"sad": "assets/ART_V2/expressions/anzu_sad.webp",
"smile": "assets/ART_V2/expressions/anzu_smile.webp",
"surprise": "assets/ART_V2/expressions/anzu_surprise.webp"
},
"aoi": {
"blush": "assets/ART_V2/expressions/aoi_blush.webp",
"normal": "assets/ART_V2/expressions/aoi_normal.webp",
"pout": "assets/ART_V2/expressions/aoi_pout.webp",
"sad": "assets/ART_V2/expressions/aoi_sad.webp",
"smile": "assets/ART_V2/expressions/aoi_smile.webp",
"surprise": "assets/ART_V2/expressions/aoi_surprise.webp"
},
"chihiro": {
"blush": "assets/ART_V2/expressions/chihiro_blush.webp",
"normal": "assets/ART_V2/expressions/chihiro_normal.webp",
"pout": "assets/ART_V2/expressions/chihiro_pout.webp",
"sad": "assets/ART_V2/expressions/chihiro_sad.webp",
"smile": "assets/ART_V2/expressions/chihiro_smile.webp",
"surprise": "assets/ART_V2/expressions/chihiro_surprise.webp"
},
"chinatsu": {
"blush": "assets/ART_V2/expressions/chinatsu_blush.webp",
"normal": "assets/ART_V2/expressions/chinatsu_normal.webp",
"pout": "assets/ART_V2/expressions/chinatsu_pout.webp",
"sad": "assets/ART_V2/expressions/chinatsu_sad.webp",
"smile": "assets/ART_V2/expressions/chinatsu_smile.webp",
"surprise": "assets/ART_V2/expressions/chinatsu_surprise.webp"
},
"chiyo": {
"blush": "assets/ART_V2/expressions/chiyo_blush.webp",
"normal": "assets/ART_V2/expressions/chiyo_normal.webp",
"pout": "assets/ART_V2/expressions/chiyo_pout.webp",
"sad": "assets/ART_V2/expressions/chiyo_sad.webp",
"smile": "assets/ART_V2/expressions/chiyo_smile.webp",
"surprise": "assets/ART_V2/expressions/chiyo_surprise.webp"
},
"concept08": {
"blush": "assets/ART_V2/expressions/concept08_blush.webp",
"normal": "assets/ART_V2/expressions/concept08_normal.webp",
"pout": "assets/ART_V2/expressions/concept08_pout.webp",
"sad": "assets/ART_V2/expressions/concept08_sad.webp",
"smile": "assets/ART_V2/expressions/concept08_smile.webp",
"surprise": "assets/ART_V2/expressions/concept08_surprise.webp"
},
"concept09": {
"blush": "assets/ART_V2/expressions/concept09_blush.webp",
"normal": "assets/ART_V2/expressions/concept09_normal.webp",
"pout": "assets/ART_V2/expressions/concept09_pout.webp",
"sad": "assets/ART_V2/expressions/concept09_sad.webp",
"smile": "assets/ART_V2/expressions/concept09_smile.webp",
"surprise": "assets/ART_V2/expressions/concept09_surprise.webp"
},
"concept10": {
"blush": "assets/ART_V2/expressions/concept10_blush.webp",
"normal": "assets/ART_V2/expressions/concept10_normal.webp",
"pout": "assets/ART_V2/expressions/concept10_pout.webp",
"sad": "assets/ART_V2/expressions/concept10_sad.webp",
"smile": "assets/ART_V2/expressions/concept10_smile.webp",
"surprise": "assets/ART_V2/expressions/concept10_surprise.webp"
},
"concept11": {
"blush": "assets/ART_V2/expressions/concept11_blush.webp",
"normal": "assets/ART_V2/expressions/concept11_normal.webp",
"pout": "assets/ART_V2/expressions/concept11_pout.webp",
"sad": "assets/ART_V2/expressions/concept11_sad.webp",
"smile": "assets/ART_V2/expressions/concept11_smile.webp",
"surprise": "assets/ART_V2/expressions/concept11_surprise.webp"
},
"concept12": {
"blush": "assets/ART_V2/expressions/concept12_blush.webp",
"normal": "assets/ART_V2/expressions/concept12_normal.webp",
"pout": "assets/ART_V2/expressions/concept12_pout.webp",
"sad": "assets/ART_V2/expressions/concept12_sad.webp",
"smile": "assets/ART_V2/expressions/concept12_smile.webp",
"surprise": "assets/ART_V2/expressions/concept12_surprise.webp"
},
"concept13": {
"blush": "assets/ART_V2/expressions/concept13_blush.webp",
"normal": "assets/ART_V2/expressions/concept13_normal.webp",
"pout": "assets/ART_V2/expressions/concept13_pout.webp",
"sad": "assets/ART_V2/expressions/concept13_sad.webp",
"smile": "assets/ART_V2/expressions/concept13_smile.webp",
"surprise": "assets/ART_V2/expressions/concept13_surprise.webp"
},
"concept14": {
"blush": "assets/ART_V2/expressions/concept14_blush.webp",
"normal": "assets/ART_V2/expressions/concept14_normal.webp",
"pout": "assets/ART_V2/expressions/concept14_pout.webp",
"sad": "assets/ART_V2/expressions/concept14_sad.webp",
"smile": "assets/ART_V2/expressions/concept14_smile.webp",
"surprise": "assets/ART_V2/expressions/concept14_surprise.webp"
},
"concept15": {
"blush": "assets/ART_V2/expressions/concept15_blush.webp",
"normal": "assets/ART_V2/expressions/concept15_normal.webp",
"pout": "assets/ART_V2/expressions/concept15_pout.webp",
"sad": "assets/ART_V2/expressions/concept15_sad.webp",
"smile": "assets/ART_V2/expressions/concept15_smile.webp",
"surprise": "assets/ART_V2/expressions/concept15_surprise.webp"
},
"concept16": {
"blush": "assets/ART_V2/expressions/concept16_blush.webp",
"normal": "assets/ART_V2/expressions/concept16_normal.webp",
"pout": "assets/ART_V2/expressions/concept16_pout.webp",
"sad": "assets/ART_V2/expressions/concept16_sad.webp",
"smile": "assets/ART_V2/expressions/concept16_smile.webp",
"surprise": "assets/ART_V2/expressions/concept16_surprise.webp"
},
"concept17": {
"blush": "assets/ART_V2/expressions/concept17_blush.webp",
"normal": "assets/ART_V2/expressions/concept17_normal.webp",
"pout": "assets/ART_V2/expressions/concept17_pout.webp",
"sad": "assets/ART_V2/expressions/concept17_sad.webp",
"smile": "assets/ART_V2/expressions/concept17_smile.webp",
"surprise": "assets/ART_V2/expressions/concept17_surprise.webp"
},
"concept18": {
"blush": "assets/ART_V2/expressions/concept18_blush.webp",
"normal": "assets/ART_V2/expressions/concept18_normal.webp",
"pout": "assets/ART_V2/expressions/concept18_pout.webp",
"sad": "assets/ART_V2/expressions/concept18_sad.webp",
"smile": "assets/ART_V2/expressions/concept18_smile.webp",
"surprise": "assets/ART_V2/expressions/concept18_surprise.webp"
},
"concept19": {
"blush": "assets/ART_V2/expressions/concept19_blush.webp",
"normal": "assets/ART_V2/expressions/concept19_normal.webp",
"pout": "assets/ART_V2/expressions/concept19_pout.webp",
"sad": "assets/ART_V2/expressions/concept19_sad.webp",
"smile": "assets/ART_V2/expressions/concept19_smile.webp",
"surprise": "assets/ART_V2/expressions/concept19_surprise.webp"
},
"concept20": {
"blush": "assets/ART_V2/expressions/concept20_blush.webp",
"normal": "assets/ART_V2/expressions/concept20_normal.webp",
"pout": "assets/ART_V2/expressions/concept20_pout.webp",
"sad": "assets/ART_V2/expressions/concept20_sad.webp",
"smile": "assets/ART_V2/expressions/concept20_smile.webp",
"surprise": "assets/ART_V2/expressions/concept20_surprise.webp"
},
"concept21": {
"blush": "assets/ART_V2/expressions/concept21_blush.webp",
"normal": "assets/ART_V2/expressions/concept21_normal.webp",
"pout": "assets/ART_V2/expressions/concept21_pout.webp",
"sad": "assets/ART_V2/expressions/concept21_sad.webp",
"smile": "assets/ART_V2/expressions/concept21_smile.webp",
"surprise": "assets/ART_V2/expressions/concept21_surprise.webp"
},
"concept22": {
"blush": "assets/ART_V2/expressions/concept22_blush.webp",
"normal": "assets/ART_V2/expressions/concept22_normal.webp",
"pout": "assets/ART_V2/expressions/concept22_pout.webp",
"sad": "assets/ART_V2/expressions/concept22_sad.webp",
"smile": "assets/ART_V2/expressions/concept22_smile.webp",
"surprise": "assets/ART_V2/expressions/concept22_surprise.webp"
},
"concept23": {
"blush": "assets/ART_V2/expressions/concept23_blush.webp",
"normal": "assets/ART_V2/expressions/concept23_normal.webp",
"pout": "assets/ART_V2/expressions/concept23_pout.webp",
"sad": "assets/ART_V2/expressions/concept23_sad.webp",
"smile": "assets/ART_V2/expressions/concept23_smile.webp",
"surprise": "assets/ART_V2/expressions/concept23_surprise.webp"
},
"concept24": {
"blush": "assets/ART_V2/expressions/concept24_blush.webp",
"normal": "assets/ART_V2/expressions/concept24_normal.webp",
"pout": "assets/ART_V2/expressions/concept24_pout.webp",
"sad": "assets/ART_V2/expressions/concept24_sad.webp",
"smile": "assets/ART_V2/expressions/concept24_smile.webp",
"surprise": "assets/ART_V2/expressions/concept24_surprise.webp"
},
"concept25": {
"blush": "assets/ART_V2/expressions/concept25_blush.webp",
"normal": "assets/ART_V2/expressions/concept25_normal.webp",
"pout": "assets/ART_V2/expressions/concept25_pout.webp",
"sad": "assets/ART_V2/expressions/concept25_sad.webp",
"smile": "assets/ART_V2/expressions/concept25_smile.webp",
"surprise": "assets/ART_V2/expressions/concept25_surprise.webp"
},
"concept26": {
"blush": "assets/ART_V2/expressions/concept26_blush.webp",
"normal": "assets/ART_V2/expressions/concept26_normal.webp",
"pout": "assets/ART_V2/expressions/concept26_pout.webp",
"sad": "assets/ART_V2/expressions/concept26_sad.webp",
"smile": "assets/ART_V2/expressions/concept26_smile.webp",
"surprise": "assets/ART_V2/expressions/concept26_surprise.webp"
},
"concept27": {
"blush": "assets/ART_V2/expressions/concept27_blush.webp",
"normal": "assets/ART_V2/expressions/concept27_normal.webp",
"pout": "assets/ART_V2/expressions/concept27_pout.webp",
"sad": "assets/ART_V2/expressions/concept27_sad.webp",
"smile": "assets/ART_V2/expressions/concept27_smile.webp",
"surprise": "assets/ART_V2/expressions/concept27_surprise.webp"
},
"concept28": {
"blush": "assets/ART_V2/expressions/concept28_blush.webp",
"normal": "assets/ART_V2/expressions/concept28_normal.webp",
"pout": "assets/ART_V2/expressions/concept28_pout.webp",
"sad": "assets/ART_V2/expressions/concept28_sad.webp",
"smile": "assets/ART_V2/expressions/concept28_smile.webp",
"surprise": "assets/ART_V2/expressions/concept28_surprise.webp"
},
"concept29": {
"blush": "assets/ART_V2/expressions/concept29_blush.webp",
"normal": "assets/ART_V2/expressions/concept29_normal.webp",
"pout": "assets/ART_V2/expressions/concept29_pout.webp",
"sad": "assets/ART_V2/expressions/concept29_sad.webp",
"smile": "assets/ART_V2/expressions/concept29_smile.webp",
"surprise": "assets/ART_V2/expressions/concept29_surprise.webp"
},
"concept30": {
"blush": "assets/ART_V2/expressions/concept30_blush.webp",
"normal": "assets/ART_V2/expressions/concept30_normal.webp",
"pout": "assets/ART_V2/expressions/concept30_pout.webp",
"sad": "assets/ART_V2/expressions/concept30_sad.webp",
"smile": "assets/ART_V2/expressions/concept30_smile.webp",
"surprise": "assets/ART_V2/expressions/concept30_surprise.webp"
},
"concept31": {
"blush": "assets/ART_V2/expressions/concept31_blush.webp",
"normal": "assets/ART_V2/expressions/concept31_normal.webp",
"pout": "assets/ART_V2/expressions/concept31_pout.webp",
"sad": "assets/ART_V2/expressions/concept31_sad.webp",
"smile": "assets/ART_V2/expressions/concept31_smile.webp",
"surprise": "assets/ART_V2/expressions/concept31_surprise.webp"
},
"concept32": {
"blush": "assets/ART_V2/expressions/concept32_blush.webp",
"normal": "assets/ART_V2/expressions/concept32_normal.webp",
"pout": "assets/ART_V2/expressions/concept32_pout.webp",
"sad": "assets/ART_V2/expressions/concept32_sad.webp",
"smile": "assets/ART_V2/expressions/concept32_smile.webp",
"surprise": "assets/ART_V2/expressions/concept32_surprise.webp"
},
"concept33": {
"blush": "assets/ART_V2/expressions/concept33_blush.webp",
"normal": "assets/ART_V2/expressions/concept33_normal.webp",
"pout": "assets/ART_V2/expressions/concept33_pout.webp",
"sad": "assets/ART_V2/expressions/concept33_sad.webp",
"smile": "assets/ART_V2/expressions/concept33_smile.webp",
"surprise": "assets/ART_V2/expressions/concept33_surprise.webp"
},
"concept34": {
"blush": "assets/ART_V2/expressions/concept34_blush.webp",
"normal": "assets/ART_V2/expressions/concept34_normal.webp",
"pout": "assets/ART_V2/expressions/concept34_pout.webp",
"sad": "assets/ART_V2/expressions/concept34_sad.webp",
"smile": "assets/ART_V2/expressions/concept34_smile.webp",
"surprise": "assets/ART_V2/expressions/concept34_surprise.webp"
},
"concept35": {
"blush": "assets/ART_V2/expressions/concept35_blush.webp",
"normal": "assets/ART_V2/expressions/concept35_normal.webp",
"pout": "assets/ART_V2/expressions/concept35_pout.webp",
"sad": "assets/ART_V2/expressions/concept35_sad.webp",
"smile": "assets/ART_V2/expressions/concept35_smile.webp",
"surprise": "assets/ART_V2/expressions/concept35_surprise.webp"
},
"concept36": {
"blush": "assets/ART_V2/expressions/concept36_blush.webp",
"normal": "assets/ART_V2/expressions/concept36_normal.webp",
"pout": "assets/ART_V2/expressions/concept36_pout.webp",
"sad": "assets/ART_V2/expressions/concept36_sad.webp",
"smile": "assets/ART_V2/expressions/concept36_smile.webp",
"surprise": "assets/ART_V2/expressions/concept36_surprise.webp"
},
"kagari": {
"blush": "assets/ART_V2/expressions/kagari_blush.webp",
"normal": "assets/ART_V2/expressions/kagari_normal.webp",
"pout": "assets/ART_V2/expressions/kagari_pout.webp",
"sad": "assets/ART_V2/expressions/kagari_sad.webp",
"smile": "assets/ART_V2/expressions/kagari_smile.webp",
"surprise": "assets/ART_V2/expressions/kagari_surprise.webp"
},
"karen": {
"blush": "assets/ART_V2/expressions/karen_blush.webp",
"normal": "assets/ART_V2/expressions/karen_normal.webp",
"pout": "assets/ART_V2/expressions/karen_pout.webp",
"sad": "assets/ART_V2/expressions/karen_sad.webp",
"smile": "assets/ART_V2/expressions/karen_smile.webp",
"surprise": "assets/ART_V2/expressions/karen_surprise.webp"
},
"kurumi": {
"blush": "assets/ART_V2/expressions/kurumi_blush.webp",
"normal": "assets/ART_V2/expressions/kurumi_normal.webp",
"pout": "assets/ART_V2/expressions/kurumi_pout.webp",
"sad": "assets/ART_V2/expressions/kurumi_sad.webp",
"smile": "assets/ART_V2/expressions/kurumi_smile.webp",
"surprise": "assets/ART_V2/expressions/kurumi_surprise.webp"
},
"meru": {
"blush": "assets/ART_V2/expressions/meru_blush.webp",
"normal": "assets/ART_V2/expressions/meru_normal.webp",
"pout": "assets/ART_V2/expressions/meru_pout.webp",
"sad": "assets/ART_V2/expressions/meru_sad.webp",
"smile": "assets/ART_V2/expressions/meru_smile.webp",
"surprise": "assets/ART_V2/expressions/meru_surprise.webp"
},
"milku": {
"blush": "assets/ART_V2/expressions/milku_blush.webp",
"normal": "assets/ART_V2/expressions/milku_normal.webp",
"pout": "assets/ART_V2/expressions/milku_pout.webp",
"sad": "assets/ART_V2/expressions/milku_sad.webp",
"smile": "assets/ART_V2/expressions/milku_smile.webp",
"surprise": "assets/ART_V2/expressions/milku_surprise.webp"
},
"miyabi": {
"blush": "assets/ART_V2/expressions/miyabi_blush.webp",
"normal": "assets/ART_V2/expressions/miyabi_normal.webp",
"pout": "assets/ART_V2/expressions/miyabi_pout.webp",
"sad": "assets/ART_V2/expressions/miyabi_sad.webp",
"smile": "assets/ART_V2/expressions/miyabi_smile.webp",
"surprise": "assets/ART_V2/expressions/miyabi_surprise.webp"
},
"mizuki": {
"blush": "assets/ART_V2/expressions/mizuki_blush.webp",
"normal": "assets/ART_V2/expressions/mizuki_normal.webp",
"pout": "assets/ART_V2/expressions/mizuki_pout.webp",
"sad": "assets/ART_V2/expressions/mizuki_sad.webp",
"smile": "assets/ART_V2/expressions/mizuki_smile.webp",
"surprise": "assets/ART_V2/expressions/mizuki_surprise.webp"
},
"momoka": {
"blush": "assets/ART_V2/expressions/momoka_blush.webp",
"normal": "assets/ART_V2/expressions/momoka_normal.webp",
"pout": "assets/ART_V2/expressions/momoka_pout.webp",
"sad": "assets/ART_V2/expressions/momoka_sad.webp",
"smile": "assets/ART_V2/expressions/momoka_smile.webp",
"surprise": "assets/ART_V2/expressions/momoka_surprise.webp"
},
"nagi": {
"blush": "assets/ART_V2/expressions/nagi_blush.webp",
"normal": "assets/ART_V2/expressions/nagi_normal.webp",
"pout": "assets/ART_V2/expressions/nagi_pout.webp",
"sad": "assets/ART_V2/expressions/nagi_sad.webp",
"smile": "assets/ART_V2/expressions/nagi_smile.webp",
"surprise": "assets/ART_V2/expressions/nagi_surprise.webp"
},
"nazuna": {
"blush": "assets/ART_V2/expressions/nazuna_blush.webp",
"normal": "assets/ART_V2/expressions/nazuna_normal.webp",
"pout": "assets/ART_V2/expressions/nazuna_pout.webp",
"sad": "assets/ART_V2/expressions/nazuna_sad.webp",
"smile": "assets/ART_V2/expressions/nazuna_smile.webp",
"surprise": "assets/ART_V2/expressions/nazuna_surprise.webp"
},
"reiko": {
"blush": "assets/ART_V2/expressions/reiko_blush.webp",
"normal": "assets/ART_V2/expressions/reiko_normal.webp",
"pout": "assets/ART_V2/expressions/reiko_pout.webp",
"sad": "assets/ART_V2/expressions/reiko_sad.webp",
"smile": "assets/ART_V2/expressions/reiko_smile.webp",
"surprise": "assets/ART_V2/expressions/reiko_surprise.webp"
},
"reina": {
"blush": "assets/ART_V2/expressions/reina_blush.webp",
"normal": "assets/ART_V2/expressions/reina_normal.webp",
"pout": "assets/ART_V2/expressions/reina_pout.webp",
"sad": "assets/ART_V2/expressions/reina_sad.webp",
"smile": "assets/ART_V2/expressions/reina_smile.webp",
"surprise": "assets/ART_V2/expressions/reina_surprise.webp"
},
"ritsu": {
"blush": "assets/ART_V2/expressions/ritsu_blush.webp",
"normal": "assets/ART_V2/expressions/ritsu_normal.webp",
"pout": "assets/ART_V2/expressions/ritsu_pout.webp",
"sad": "assets/ART_V2/expressions/ritsu_sad.webp",
"smile": "assets/ART_V2/expressions/ritsu_smile.webp",
"surprise": "assets/ART_V2/expressions/ritsu_surprise.webp"
},
"saki": {
"blush": "assets/ART_V2/expressions/saki_blush.webp",
"normal": "assets/ART_V2/expressions/saki_normal.webp",
"pout": "assets/ART_V2/expressions/saki_pout.webp",
"sad": "assets/ART_V2/expressions/saki_sad.webp",
"smile": "assets/ART_V2/expressions/saki_smile.webp",
"surprise": "assets/ART_V2/expressions/saki_surprise.webp"
},
"sanae": {
"blush": "assets/ART_V2/expressions/sanae_blush.webp",
"normal": "assets/ART_V2/expressions/sanae_normal.webp",
"pout": "assets/ART_V2/expressions/sanae_pout.webp",
"sad": "assets/ART_V2/expressions/sanae_sad.webp",
"smile": "assets/ART_V2/expressions/sanae_smile.webp",
"surprise": "assets/ART_V2/expressions/sanae_surprise.webp"
},
"sena": {
"blush": "assets/ART_V2/expressions/sena_blush.webp",
"normal": "assets/ART_V2/expressions/sena_normal.webp",
"pout": "assets/ART_V2/expressions/sena_pout.webp",
"sad": "assets/ART_V2/expressions/sena_sad.webp",
"smile": "assets/ART_V2/expressions/sena_smile.webp",
"surprise": "assets/ART_V2/expressions/sena_surprise.webp"
},
"towa": {
"blush": "assets/ART_V2/expressions/towa_blush.webp",
"normal": "assets/ART_V2/expressions/towa_normal.webp",
"pout": "assets/ART_V2/expressions/towa_pout.webp",
"sad": "assets/ART_V2/expressions/towa_sad.webp",
"smile": "assets/ART_V2/expressions/towa_smile.webp",
"surprise": "assets/ART_V2/expressions/towa_surprise.webp"
},
"yuriko": {
"blush": "assets/ART_V2/expressions/yuriko_blush.webp",
"normal": "assets/ART_V2/expressions/yuriko_normal.webp",
"pout": "assets/ART_V2/expressions/yuriko_pout.webp",
"sad": "assets/ART_V2/expressions/yuriko_sad.webp",
"smile": "assets/ART_V2/expressions/yuriko_smile.webp",
"surprise": "assets/ART_V2/expressions/yuriko_surprise.webp"
},
"yuzu": {
"blush": "assets/ART_V2/expressions/yuzu_blush.webp",
"normal": "assets/ART_V2/expressions/yuzu_normal.webp",
"pout": "assets/ART_V2/expressions/yuzu_pout.webp",
"sad": "assets/ART_V2/expressions/yuzu_sad.webp",
"smile": "assets/ART_V2/expressions/yuzu_smile.webp",
"surprise": "assets/ART_V2/expressions/yuzu_surprise.webp"
}
};
for(const id in T){ART_EXPRESSIONS[id]=Object.assign({},ART_EXPRESSIONS[id]||{},T[id]);}
})();
