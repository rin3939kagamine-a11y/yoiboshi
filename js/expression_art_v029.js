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
"concept08": {
"blush": "assets/ART_V2/expressions/concept08_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept08_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept08_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept08_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept08_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept08_surprise.webp?v=0.34.71.0"
},
"concept09": {
"blush": "assets/ART_V2/expressions/concept09_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept09_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept09_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept09_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept09_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept09_surprise.webp?v=0.34.71.0"
},
"concept10": {
"blush": "assets/ART_V2/expressions/concept10_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept10_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept10_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept10_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept10_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept10_surprise.webp?v=0.34.71.0"
},
"concept11": {
"blush": "assets/ART_V2/expressions/concept11_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept11_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept11_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept11_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept11_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept11_surprise.webp?v=0.34.71.0"
},
"concept12": {
"blush": "assets/ART_V2/expressions/concept12_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept12_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept12_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept12_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept12_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept12_surprise.webp?v=0.34.71.0"
},
"concept13": {
"blush": "assets/ART_V2/expressions/concept13_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept13_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept13_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept13_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept13_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept13_surprise.webp?v=0.34.71.0"
},
"concept14": {
"blush": "assets/ART_V2/expressions/concept14_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept14_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept14_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept14_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept14_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept14_surprise.webp?v=0.34.71.0"
},
"concept15": {
"blush": "assets/ART_V2/expressions/concept15_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept15_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept15_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept15_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept15_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept15_surprise.webp?v=0.34.71.0"
},
"concept16": {
"blush": "assets/ART_V2/expressions/concept16_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept16_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept16_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept16_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept16_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept16_surprise.webp?v=0.34.71.0"
},
"concept17": {
"blush": "assets/ART_V2/expressions/concept17_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept17_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept17_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept17_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept17_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept17_surprise.webp?v=0.34.71.0"
},
"concept18": {
"blush": "assets/ART_V2/expressions/concept18_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept18_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept18_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept18_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept18_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept18_surprise.webp?v=0.34.71.0"
},
"concept19": {
"blush": "assets/ART_V2/expressions/concept19_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept19_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept19_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept19_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept19_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept19_surprise.webp?v=0.34.71.0"
},
"concept20": {
"blush": "assets/ART_V2/expressions/concept20_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept20_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept20_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept20_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept20_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept20_surprise.webp?v=0.34.71.0"
},
"concept21": {
"blush": "assets/ART_V2/expressions/concept21_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept21_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept21_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept21_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept21_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept21_surprise.webp?v=0.34.71.0"
},
"concept22": {
"blush": "assets/ART_V2/expressions/concept22_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept22_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept22_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept22_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept22_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept22_surprise.webp?v=0.34.71.0"
},
"concept23": {
"blush": "assets/ART_V2/expressions/concept23_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept23_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept23_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept23_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept23_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept23_surprise.webp?v=0.34.71.0"
},
"concept24": {
"blush": "assets/ART_V2/expressions/concept24_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept24_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept24_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept24_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept24_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept24_surprise.webp?v=0.34.71.0"
},
"concept25": {
"blush": "assets/ART_V2/expressions/concept25_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept25_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept25_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept25_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept25_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept25_surprise.webp?v=0.34.71.0"
},
"concept26": {
"blush": "assets/ART_V2/expressions/concept26_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept26_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept26_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept26_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept26_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept26_surprise.webp?v=0.34.71.0"
},
"concept27": {
"blush": "assets/ART_V2/expressions/concept27_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept27_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept27_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept27_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept27_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept27_surprise.webp?v=0.34.71.0"
},
"concept28": {
"blush": "assets/ART_V2/expressions/concept28_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept28_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept28_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept28_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept28_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept28_surprise.webp?v=0.34.71.0"
},
"concept29": {
"blush": "assets/ART_V2/expressions/concept29_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept29_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept29_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept29_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept29_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept29_surprise.webp?v=0.34.71.0"
},
"concept30": {
"blush": "assets/ART_V2/expressions/concept30_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept30_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept30_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept30_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept30_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept30_surprise.webp?v=0.34.71.0"
},
"concept31": {
"blush": "assets/ART_V2/expressions/concept31_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept31_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept31_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept31_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept31_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept31_surprise.webp?v=0.34.71.0"
},
"concept32": {
"blush": "assets/ART_V2/expressions/concept32_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept32_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept32_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept32_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept32_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept32_surprise.webp?v=0.34.71.0"
},
"concept33": {
"blush": "assets/ART_V2/expressions/concept33_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept33_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept33_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept33_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept33_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept33_surprise.webp?v=0.34.71.0"
},
"concept34": {
"blush": "assets/ART_V2/expressions/concept34_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept34_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept34_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept34_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept34_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept34_surprise.webp?v=0.34.71.0"
},
"concept35": {
"blush": "assets/ART_V2/expressions/concept35_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept35_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept35_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept35_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept35_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept35_surprise.webp?v=0.34.71.0"
},
"concept36": {
"blush": "assets/ART_V2/expressions/concept36_blush.webp?v=0.34.71.0",
"normal": "assets/ART_V2/expressions/concept36_normal.webp?v=0.34.71.0",
"pout": "assets/ART_V2/expressions/concept36_pout.webp?v=0.34.71.0",
"sad": "assets/ART_V2/expressions/concept36_sad.webp?v=0.34.71.0",
"smile": "assets/ART_V2/expressions/concept36_smile.webp?v=0.34.71.0",
"surprise": "assets/ART_V2/expressions/concept36_surprise.webp?v=0.34.71.0"
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
