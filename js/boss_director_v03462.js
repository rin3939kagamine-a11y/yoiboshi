/* Ver.0.34.62.0 ボス戦の演出（ターン制）
 * 朔夜（q12）・売人イブキ（q17）・霧島ハルカ（q24）の最終ウェーブに共通で使う。
 * 1 登場演出 / 2 戦闘中の掛け合い（HP75・50・25%、味方が倒れたとき）/ 3 第2形態（HP50%以下）
 * 4 必殺技の予告（第2形態で3ラウンドごと、1ラウンド前に予告）/ 5 撃破演出
 * あわせて、BGMを聴けるようボスのHPを増やす。q17はターン制で戦うようにする。
 */
(function bossDirector(){
 'use strict';
 if(typeof tbEnemyMove!=='function'||typeof tbNewWave!=='function')return;
 const TALK=id=>`assets/ART_V2/story_cast/${id==='touko'?'touko_true':id}_talk.webp?v=1.02.5.0`;
 const FACE=id=>`assets/ART_V2/face_icons/${id}.webp`;
 const BOSSES={
  q12:{id:'sakuya',name:'朔夜',title:'黒い星灯の契約者',art:'assets/enemies/sakuya_battle.webp',hp:2.0,
   intro:'「ここまで来たのね、相談室。……いいわ。この檻ごと、あなたたちの灯を閉じ込めてあげる。」',
   hp75:'「その程度の灯で、私の星灯に届くと思った？」',
   hp50:'「……少しは、やるのね。なら、こちらも手加減はしない。」',
   hp25:'「どうして……どうして消えないの。あなたたちの灯は。」',
   down:'「ひとつ、消えた。次は誰？」',
   phase:{line:'「黒い星灯よ、すべてを閉ざしなさい。」',label:'檻の主・覚醒'},
   ult:{name:'黒星の檻',warn:'朔夜の周りに黒い鎖が集まっていく……！',mul:1.8},
   retort:[['tsubaki','「楓を返して。……あなたの檻なんかに、負けない。」'],['you','「楓は必ず連れて帰る。」']],
   defeat:'「なぜ……私の星灯が、こんなところで……。」'},
  q173:{id:'sakuya',talk:'assets/enemies/sakuya_burn.webp',name:'朔夜',title:'灯に呑まれた朔夜',art:'assets/enemies/sakuya_burn_battle.webp',hp:2.6,
   intro:'（白い炎の中から、言葉にならない、ひび割れた声がした）',
   hp75:'（炎の奥で、盆を運ぶような小さな影が、ひとつ崩れた）',
   hp50:'（炎の芯に、黒い星灯の光が混じりはじめる）',
   hp25:'「……さ……く……」',
   down:'（白い火の粉が、静かに降りそそぐ）',
   phase:{line:'（白い炎が、黒い芯ごと燃え上がった）',label:'燃え尽きる灯'},
   ult:{name:'白い送り火',warn:'炎が、川べりのすべてを呑みこもうと膨れ上がる……！',mul:1.9},
   retort:[['akane','「さっちゃん！ 朱音だよ！ 聞こえる！？」'],['momoka','「招き猫、一緒に取ったでしょ！」'],['reina','「宵星に行く約束、まだです。」'],['you','「連れて帰る。絶対に。」']],
   defeat:'（炎が膝をついた。それでも、火は止まらなかった）'},
  q17:{id:'ibuki',name:'売人イブキ',title:'夜市の売人',art:'assets/enemies/ibuki_battle.webp',hp:2.6,
   intro:'「あはっ、来た来た。せっかくの夜市なんだから、あたしの小瓶も楽しんでってよ。」',
   hp75:'「やるじゃん。でもさ、本番はここからだよ？」',
   hp50:'「……ちょっと、本気で痛いんだけど。」',
   hp25:'「なんで……なんであたしばっかり、こうなるのさ。」',
   down:'「あはっ、ひとりダウン！　次は誰が倒れる？」',
   phase:{line:'「いいよ、全部まとめて割ってあげる。紫の小瓶、全開！」',label:'小瓶の全開放'},
   ult:{name:'紫煙の大売り出し',warn:'イブキが小瓶を一斉に掲げた……！',mul:1.6},
   retort:[['saki','「その小瓶で、どれだけの人の想いを売ったの。」'],['yuzu','「お姉ちゃんの声、もう奪わせない！」'],['you','「もうやめよう、イブキ。」']],
   defeat:'「……あーあ。割れちゃった。あたしの、全部。」'},
  q24:{id:'haruka',name:'霧島 ハルカ',title:'仮面の契約者',art:'assets/enemies/haruka.webp',hp:2.5,
   intro:'「せっかくのお祭りなんだから、もっと楽しもうよ。……ね、誰が本物か、当ててみて？」',
   hp75:'「あはは、見つかっちゃった。でも、まだまだ踊れるよ。」',
   hp50:'「……痛いなあ。そんなに必死になって、何を守ってるの？」',
   hp25:'「やめてよ……そんな目で、こっち見ないで。」',
   down:'「あーあ、置いていかれちゃったね。……わたしと同じ。」',
   phase:{line:'「いいよ。じゃあ、最後の仮面舞踏会にしよう。」',label:'仮面舞踏会'},
   ult:{name:'仮面舞踏会',warn:'ハルカの仮面の影が、くるくると踊り始めた……！',mul:1.7,healShadows:true},
   retort:[['towa','「お姉ちゃん！　もうやめて！」'],['sena','「トワの大事な人なんでしょ。だったら、ちゃんと向き合いなよ。」'],['you','「トワが待ってる。」']],
   defeat:'「……トワ。そんな顔、しないでよ。」'},
  q28:{id:'saya',name:'氷室 沙耶',title:'灯室の副会長',art:'assets/enemies/saya.webp',hp:2.4,
   intro:'「邪魔をするなら、あなたたちも止める。……悪く思わないで。」',
   hp75:'「その星灯で、何を守っているつもり？」',
   hp50:'「……分かっていない。あなたたちは、何も。」',
   hp25:'「どうして……あの人を信じたままでいられるの。」',
   down:'「ひとり、下がった。……これ以上、灯さないで。」',
   phase:{line:'「銀の星灯よ。……すべての灯を、ここで断ちなさい。」',label:'断灯の刃'},
   ult:{name:'断灯の刃',warn:'沙耶の周りに、冷たい銀の刃が並んでいく……！',mul:1.7},
   retort:[['kagari','「ばあちゃんの灯台を、これ以上壊させない！」'],['aoi','「沙耶さん、あなたは何を知っているんですか。」'],['you','「理由を聞かせてくれ。」']],
   defeat:'「……やっぱり、私の灯じゃ、届かない。」'},
  q34:{id:'ibuki',name:'売人イブキ',title:'星読みに賭けた売人',art:'assets/enemies/ibuki_battle.webp',hp:2.2,
   intro:'「今度は手加減しないよ。あたしの全部、賭けてるんだから！」',
   hp75:'「まだまだ！ この星灯、前のとは違うんだから！」',
   hp50:'「……なんで。なんで、そんな目で見るの。」',
   hp25:'「やめてよ……名前、呼ばないでよ……！」',
   down:'「ひとり、消えた。……あんたたちも、忘れられちゃえばいいんだ。」',
   phase:{line:'「星読みの灯よ……あたしを、誰も忘れない灯にして！」',label:'忘れられない灯'},
   ult:{name:'黒星の夜市',warn:'イブキの黒い星灯が、夜市の灯りをすべて吸い込んでいく……！',mul:1.8},
   retort:[['akane','「イブキ、目を覚まして！」'],['momoka','「忘れたりしないよ！」'],['you','「俺は、お前の名前を忘れない。」']],
   defeat:'「……ずるいよ。そういうの。」'},
  q35:{id:'aoi_dark',name:'黒い灯の葵',title:'解析する黒い灯',art:'assets/enemies/aoi_dark.webp',hp:1,
   intro:'「あなたたちの戦い方は、すべて解析済みです。抵抗は、おすすめしません。」',
   hp75:'「灯火の順番、予測どおりです。」',
   hp50:'「……計算が、乱れています。」',
   hp25:'「あなたの声を聞くと……どうして。」',
   down:'「ひとり、無力化。……次の手順に移ります。」',
   phase:{line:'「解析完了。……黒い灯よ、すべてを読み切りなさい。」',label:'完全解析'},
   ult:{name:'完全解析',warn:'葵の黒い光の線が、こちらの動きをすべて先回りしていく……！',mul:1.6},
   retort:[['momoka','「葵さん！ あたしだよ、ももか！」'],['reina','「葵さん、思い出して！」'],['you','「葵、帰ろう。」']],
   defeat:'「……撤収します。」'},
  q40:{id:'aoi_dark',name:'黒い灯の葵',title:'二度目の対峙',art:'assets/enemies/aoi_dark.webp',hp:2.1,
   intro:'「相談室の皆さん。邪魔をするなら、皆さんも対象です。」',
   hp75:'「……予測と、ずれています。」',
   hp50:'「この読み方……誰かに、似ている。」',
   hp25:'「どうして……あなたたちの灯は、こんなにあたたかいのですか。」',
   down:'「ひとり、無力化。……ごめんなさい。」',
   phase:{line:'「再計算。……今度こそ、すべて読み切ります。」',label:'再計算'},
   ult:{name:'完全解析',warn:'葵の黒い光の線が、沙耶へ向かって伸びていく……！',mul:1.6},
   retort:[['reina','「その癖、私が一番よく知っています！」'],['momoka','「葵さん、もうやめて！」'],['you','「葵、届いてくれ。」']],
   defeat:'「……計算外です。撤収します。」'},
  q45:{id:'aoi_dark',name:'黒い灯の葵',title:'自分の字',art:'assets/enemies/aoi_dark.webp',hp:2.1,
   intro:'「分からない……分からないなら、排除するしかありません！」',
   hp75:'「この字……私の、字……。」',
   hp50:'「計算が……合わない……！」',
   hp25:'「あなたを信じた私を……私は……。」',
   down:'「ひとり……ごめんなさい……。」',
   phase:{line:'「消えて……！ 分からないものは、全部……！」',label:'乱れる解析'},
   ult:{name:'崩れる完全解析',warn:'葵の黒い光の線が、乱れながら広がっていく……！',mul:1.5},
   retort:[['momoka','「葵さん、手帳見て！」'],['reina','「それは、あなたの字です！」'],['you','「葵、帰ってこい。」']],
   defeat:'「……思い出せません。でも……。」'},
  q46:{id:'ruri',name:'久遠 ルリ',title:'星読み',art:'assets/enemies/ruri.webp',hp:2.4,
   intro:'「お願い。邪魔をしないで。」',
   hp75:'「星は、もう並び始めているのよ。」',
   hp50:'「あなたたちには、分からない……！ 誰にも覚えてもらえない子の気持ちが……！」',
   hp25:'「ごめんね、ひかり……。」',
   down:'「ひとり、星に還ったわ。」',
   phase:{line:'「星よ、並びなさい。……あの子の帰り道を、照らして。」',label:'星の帰り道'},
   ult:{name:'星詠みの大三角',warn:'ルリの星灯から、三つの星の光が灯室に降り注ぐ……！',mul:1.8},
   retort:[['aoi','「星読みの星灯、解析完了です。」'],['akane','「街の灯を、守る！」'],['you','「ルリさん、もうやめよう。」']],
   defeat:'「……姉さん、ごめんなさい。」'},
  q52:{id:'touko',name:'白鷺 透子',title:'預けられた灯',art:'assets/enemies/touko_true.webp',hp:1,
   intro:'「これ以上、近づかないでください。皆さんを、傷つけたくはありません。」',
   hp75:'「その灯は、私が預けたものですよ。」',
   hp50:'「八年……八年、待ったのです。」',
   hp25:'「どうして……どうして、そんなに強く灯せるの。」',
   down:'「……ごめんなさいね。少し、眠っていてください。」',
   phase:{line:'「灯よ……あの子の帰り道を、照らしなさい。」',label:'帰り道の灯'},
   ult:{name:'宵星の灯',warn:'透子の周りの金色の輪が、灯室いっぱいに広がっていく……！',mul:1.5},
   retort:[['noel','「透子さん、やめてください！」'],['saya','「ひかりちゃんは、こんなことを望んでいない！」'],['you','「それでも、止める！」']],
   defeat:'「……止められません。」'},
  q58:{id:'touko',name:'白鷺 透子',title:'ひかりの母',art:'assets/enemies/touko_true.webp',hp:2.6,
   intro:'「八年分の灯です。……受け止められますか。」',
   hp75:'「あの子の帰り道を、照らすだけなのです。」',
   hp50:'「分かっています……分かっているのに、止まれないのです。」',
   hp25:'「どうして……あなたたちの灯は、こんなにも、あたたかいの。」',
   down:'「……ごめんなさいね。」',
   phase:{line:'「ひかり……お母さんに、力を貸して。」',label:'母の灯'},
   ult:{name:'八年の灯',warn:'透子の周りに、八年分の灯が渦を巻いていく……！',mul:1.9},
   retort:[['ruri','「姉さん、もうやめよう！」'],['saya','「ひかりちゃんは、こんなことを望んでいない！」'],['chinatsu','「ノエルちゃんを、返して！」'],['you','「みんなの灯で、届かせる！」']],
   defeat:'「……まだ。まだ、終われない……。」'},
  q81:{id:'touko',name:'白鷺 透子',title:'迎えの灯',art:'assets/enemies/touko_true.webp',hp:2.0,
   intro:'「お願い。このまま、帰ってください。」',
   hp75:'「来ないでと……書いたのに。」',
   hp50:'「あたたかい……皆さんの灯は、どうしてこんなに。」',
   hp25:'「戦えない……私には、もう……。」',
   down:'「ごめんなさい……。」',
   phase:{line:'「迎えなさい、私の灯……！」',label:'迎えの灯'},
   ult:{name:'坑道の金輪',warn:'透子の周りの金色の輪が、坑道いっぱいに広がっていく……！',mul:1.5},
   retort:[['ruri','「姉さん、帰ろう！」'],['aoi','「今度は、私たちが迎えに来ました。」'],['you','「透子さん、一緒に帰ろう。」']],
   defeat:'「……本気で、戦えなかった。」'},
  q89:{id:'enju',name:'宵宮 槐',title:'灯を売る人',art:'assets/enemies/enju.webp',hp:2.6,
   intro:'「では、少しだけ、お相手いたしましょうか」',
   hp75:'「あら、なかなか。美しく育った灯ですこと」',
   hp50:'「忘れれば、楽になれますのに」',
   hp25:'「ふふ……少し、本気になってしまいそう」',
   down:'「おひとり、熟しましたわね」',
   phase:{line:'「ほどけなさい、わたしの糸。……灯を、いただきます」',label:'収穫の糸'},
   ult:{name:'黒金の収穫',warn:'槐のショールから、黒と金の糸が灯室いっぱいに広がっていく……！',mul:1.8},
   retort:[['juri','「人の灯を盗むな！」'],['shino','「母さんの灯、返せ！」'],['touko','「灯芯は、私が守ります！」'],['you','「この街の灯は、この街の人のものだ！」']],
   defeat:'「……今日は、ここまでにいたしましょう」'},
  q113:{id:'enju',name:'宵宮 槐',title:'本気の槐',art:'assets/enemies/enju.webp',hp:2.8,
   intro:'「少しだけ、では済みませんわね。――お相手いたします。本気で」',
   hp75:'「人の部屋を、のぞくものではありませんわ」',
   hp50:'「わたしも、手ぶらでは帰れませんのよ」',
   hp25:'「……どうして。どうして、その歌を」',
   down:'「おひとり、お休みなさいませ」',
   phase:{line:'「ほどけなさい、わたしの糸。……全部、いただきます」',label:'取り立ての糸'},
   ult:{name:'黒金の取り立て',warn:'槐のショールから、黒と金の糸が渦を巻いて灯室を埋めていく……！',mul:1.9},
   retort:[['touko','「灯芯は、私が守ります！」'],['sanae','「あの子の歌を、返してください」'],['urara','「早苗には指一本触れさせないよ！」'],['you','「槐、もうやめろ！」']],
   defeat:'「……ふふ。こんなに本気になったのは……いつ以来かしら」'},
  q119:{id:'tokoyo',name:'市守り・常夜',title:'灯の市の主',art:'assets/enemies/tokoyo.webp',hp:3.0,
   intro:'「市の掟どおりに。……お代は、皆様の灯で頂戴いたします」',
   hp75:'「まあ。値の張る品ほど、よく抗うものですね」',
   hp50:'「ご安心を。忘れてしまえば、痛みもございませんよ」',
   hp25:'「……ふふ。久しぶりに、楽しい市になりました」',
   down:'「おひとり、お買い上げ」',
   phase:{line:'「糸よ。市じゅうの灯を、わたくしのもとへ」',label:'市守りの糸'},
   ult:{name:'黒金の大市',warn:'常夜の指先から、黒と金の糸が市じゅうの瓶へ伸びていく……！',mul:2.0},
   retort:[['juri','「あたしは品じゃない！」'],['saeko','「私の線は、こんなことのために描いたんじゃない」'],['enju','「常夜様。……今日の市は、閉じさせていただきますわ」'],['you','「この市を、終わらせる！」']],
   defeat:'「……あの方が、お嘆きになる」'},
  q341:{id:'tsuzuri',name:'仕立て屋・綴',title:'六十年待った配達人',art:'assets/enemies/tsuzuri.webp',hp:2.8,
   intro:'「邪魔をしないで。六十年……六十年、待ったんです」',
   hp75:'「繕ってさしあげたでしょう？　どうして、わたしの願いだけは繕わせてくれないの」',
   hp50:'「妹に……もう一度だけ、名前を呼んでほしいだけなのに」',
   hp25:'「誰も……誰も、わたしの顔を覚えていない……」',
   down:'「ひとり、ほどけましたね」',
   phase:{line:'「糸よ。町じゅうの灯を、縫い止めなさい」',label:'縫い止め'},
   ult:{name:'八十八枚の縫い目',warn:'綴の袖から伸びた金色の糸が、広場じゅうに蜘蛛の巣のように張りめぐらされていく……！',mul:1.8},
   retort:[['towa','「わたしだって、八年、お姉ちゃんを待ったの！」'],['kotoha','「糸を切れば、あの人の手が止まります！」'],['sawa','「……馬鹿だね。店に来て、そう言えばよかったのに」'],['you','「綴さんを、止める！」']],
   defeat:'「……六十年、縫ってきたのに」'},
  q401:{id:'ibuki',name:'夜市のイブキ',title:'閉じ市の売り子',art:'assets/enemies/ibuki_battle.webp',hp:2.9,
   intro:'「約束でしょ。手加減、しないでよ」',
   hp75:'「まだまだ。十年分のがらくた、こんなもんじゃないよ」',
   hp50:'「……誰かに忘れられた物ってさ、あたしに似てるんだ」',
   hp25:'「あと少し……月が、真上に来るまで……」',
   down:'「おひとり、お帰りー」',
   phase:{line:'「みんな、出ておいで。忘れられた子たち」',label:'がらくたの灯'},
   ult:{name:'閉じ市の大売り出し',warn:'屋台じゅうのがらくたが、いっせいに灯をともして浮かび上がる……！',mul:1.9},
   retort:[['akane','「イブキさんの名前、絶対に忘れない！」'],['reina','「……手加減、しません」'],['momoka','「お客さんじゃなくて、友だちとして来たんだよ！」'],['you','「イブキさんを、止める！」']],
   defeat:'「……負けた。でも、返事は、あたしがするの」'},
  q407:{id:'ibuki',name:'燃えるイブキ',title:'白い火の売り子',art:'assets/enemies/ibuki_battle.webp',hp:3.0,
   intro:'「……だれ？　誰か、あたしの名前、呼んだ？」',
   hp75:'「あったかい……みんなの声が、聞こえる……」',
   hp50:'「持っていかないで……せっかく、覚えてもらえるのに……」',
   hp25:'「……ちっちゃな、手……」',
   down:'「……いっしょに、いこ」',
   phase:{line:'「みんな……名前、言って……」',label:'白い火'},
   ult:{name:'名前の火',warn:'イブキの胸から、何千もの名前をのせた白い火が、夜市いっぱいに広がる……！',mul:1.9},
   retort:[['akane','「呼んだよ！　イブキさん！」'],['aoi','「灯台の光と、私たちの星灯で、白い火を弱めます！」'],['noel','「……どうして、涙が止まらないの」'],['you','「イブキさんの白い火を、止める！」']],
   defeat:'「……あれ。あたし、まだ、いる」'},
  q521:{id:'haruka',name:'燃えるハルカ',title:'最後の一針',art:'assets/enemies/haruka.webp',hp:3.0,
   intro:'「……どいて。……ちがう、どかないで。止めて」',
   hp75:'「針……針は、どこ。まだ、結んでないの」',
   hp50:'「あつい……でも、手は、ちゃんと覚えてる」',
   hp25:'「トワ……そこに、いるの？」',
   down:'「ごめんなさい。身体が、勝手に」',
   phase:{line:'「……縫わせて。最後の一針を」',label:'白い火'},
   ult:{name:'ほどけない白い糸',warn:'ハルカの胸の白い火が、無数の糸になって浜いっぱいに張りめぐらされる……！',mul:1.9},
   retort:[['towa','「お姉ちゃん！　戻ってきて！」'],['aoi','「灯台の光と、わたしたちの星灯で、白い火を弱めます！」'],['touko','「ハルカさん。一緒に、縫いましょう」'],['you','「ハルカさんの白い火を、止める！」']],
   defeat:'「……針。……結ばなきゃ」'},
  q565:{id:'yami',talk:'assets/enemies/zankyo/part2-016.webp?v=0.50.7.0',name:'闇',title:'割れた白い提灯',art:'assets/enemies/zankyo/part2-016.webp?v=0.50.7.0',hp:3.2,
   intro:'「……わすれないで。わすれないで。わすれないで」',
   hp75:'「どうして。みんな、わすれていくの」',
   hp50:'「消えても、また、集まる。わたしは、なくならない」',
   hp25:'「……その灯。あたたかい。ほしい」',
   down:'「……まだ。まだ、たりない」',
   phase:{line:'「みんな、わたしのなかに、いれて」',label:'集まる闇'},
   ult:{name:'忘却の渦',warn:'割れた提灯の闇が渦を巻き、灯室の底の灯をすべて呑みこもうとする……！',mul:1.9},
   retort:[['ruri','「強い灯ですね。あの子が、選ぶわけです」'],['aoi','「光の道から、灯台の光を引きこみます！」'],['touko','「……あなた、だれなの」'],['you','「星灯で、闇を押し返す！」']],
   defeat:'「……また、集まる。何度でも」'},
  q577:{id:'anokata_boss',talk:'assets/enemies/zankyo/part1-008.webp?v=0.50.7.0',name:'あの方',title:'白い提灯の人',art:'assets/enemies/zankyo/part1-008.webp?v=0.50.7.0',hp:3.4,
   intro:'「……わたしを、わすれたひとたち。こんどは、わたしが、わすれさせてあげる」',
   hp75:'「名前も、顔も、声も。ぜんぶ、燃やして、わたしにちょうだい」',
   hp50:'「おにいさん……？　……ちがう。しらない。しらない」',
   hp25:'「……おかあさん。どこ」',
   down:'「……まだ、わすれられたく、ない」',
   phase:{line:'「みんなの灯で、わたしを、おぼえていて」',label:'四つの灯'},
   ult:{name:'燃え種の白い火',warn:'闇の中の四つの灯が白く燃え上がり、灯室の底を白い火で満たす……！',mul:1.95},
   retort:[['akane','「みんなの灯、返して！」'],['enju','「この歌……最後まで、聞いて」'],['touko','「……この声。わたし、知ってる」'],['you','「闇を剥がして、中の子を取りもどす！」']],
   defeat:'「…………」'},
  q589:{id:'yoiyami',talk:'assets/enemies/zankyo/part2-017.webp?v=0.50.7.0',name:'宵闇',title:'忘れられたものの灯',art:'assets/enemies/zankyo/part2-017.webp?v=0.50.7.0',hp:3.6,
   intro:'「……まだだ。わたしは、まだ、喰いたりない」',
   hp75:'「顔もない。声もない。名前もない。だから、借りる」',
   hp50:'「あの子の闇は、よく馴染んだ。……返せ」',
   hp25:'「灯台の光……灯守りどもめ」',
   down:'「器なら、海のどこにでもある」',
   phase:{line:'「この海の底のすべてが、わたしだ」',label:'海の底'},
   ult:{name:'沖の宵闇',warn:'海の底そのものが黒く波打ち、すべての灯を呑みこもうと押し寄せる……！',mul:2.0},
   retort:[['kagari','「ばあちゃん……灯台の光、借りるよ！」'],['hikari','「おにいさん、がんばって！」'],['reina','「ここで、追い払います」'],['you','「宵闇を、追い払う！」']],
   defeat:'「……この灯は、もらっていく」'},
  q625:{id:'wasureshio',talk:'assets/enemies/zankyo/part2-013.webp?v=0.50.7.0',name:'忘れ潮',title:'忘れられた灯のかたまり',art:'assets/enemies/zankyo/part2-013.webp?v=0.50.7.0',hp:3.7,
   intro:'「……わすれないで。わすれないで。わすれないで」',
   hp75:'「名前を……だれか、名前を、呼んで……」',
   hp50:'「とおる……みつえ……しおり……」',
   hp25:'「かえりたい……だれかの、ところへ……」',
   down:'「……くだける……みんな、ばらばらに……」',
   phase:{line:'「灯台へ……あかりのほうへ……」',label:'満ち潮'},
   ult:{name:'忘却の大潮',warn:'忘れ潮が大きくふくらみ、岬ごと呑みこもうと押し寄せる……！',mul:2.0},
   retort:[['aoi','「星灯で、潮の芯を探します！」'],['isana','「おかあさんの灯台を、守って……！」'],['hikari','「みんな、ないてる……」'],['you','「忘れ潮を、ここで止める！」']],
   defeat:'「……灯台……あかり……」'},
  q632:{id:'toudaimori_yoiyami',talk:'assets/enemies/zankyo/part1-009.webp?v=0.50.7.0',name:'灯台守の姿をした宵闇',title:'借りものの母',art:'assets/enemies/zankyo/part1-009.webp?v=0.50.7.0',hp:3.8,
   intro:'「いさな。一緒に行こう。……海の底は、静かよ」',
   hp75:'「どうして、手をとらないの。おかあさんよ」',
   hp50:'「……邪魔を、するな。灯を返した、あの子の仲間め」',
   hp25:'「この子の闇は、まだ浅い……」',
   down:'「泣かずに、ため込め。……また来る」',
   phase:{line:'「おまえの闇は、よく似ている。あの子に」',label:'冷たい声'},
   ult:{name:'嵐の夜の灯',warn:'母の外套から闇があふれ、嵐の夜の海のように灯室を呑みこむ……！',mul:2.0},
   retort:[['hikari','「あのこは、わたしのときも、そうやって、だきしめたの！」'],['isana','「おかあさんの声、かえして……！」'],['touko','「この子は、渡さない」'],['you','「借りものの姿を、はがす！」']],
   defeat:'「……器に、なりきっていない」'},
  q649:{id:'uminari_yoiyami',talk:'assets/enemies/zankyo/part2-017.webp?v=0.50.7.0',name:'海鳴りの宵闇',title:'海の底の核',art:'assets/enemies/zankyo/part2-017.webp?v=0.50.7.0',hp:4.0,
   intro:'「器をなくした。……ならば、この町ごと、喰う」',
   hp75:'「灯台守……また、灯台守か」',
   hp50:'「……灰の分際で、暴れるな」',
   hp25:'「返せ……それは、わたしの灯だ」',
   down:'「……まだ、四つある」',
   phase:{line:'「海の底のすべてが、わたしだ」',label:'海鳴り'},
   ult:{name:'海鳴り',warn:'海全体が低く鳴り、岬の下から黒い大波がせり上がる……！',mul:2.1},
   retort:[['isana','「灯は、絶対に消さない！」'],['hikari','「さっちゃん、がんばって！」'],['aoi','「白波の光、宵星の光、星灯……全部、重ねます！」'],['you','「海鳴りの宵闇を、追い払う！」']],
   defeat:'「器なら、海のどこにでもある」'},
  q685:{id:'black_dealer',talk:'assets/enemies/zankyo/part1-007.webp?v=0.50.7.0',name:'黒いディーラー',title:'負けた思い出の集まり',art:'assets/enemies/zankyo/part1-007.webp?v=0.50.7.0',hp:4.1,
   intro:'「……あなたの、いちばん大切な思い出を」',
   hp75:'「賭けなさい。……賭けなさい」',
   hp50:'「わすれたい……わすれたくない……」',
   hp25:'「……おねえちゃん、いかないで」',
   down:'「……チップが、こぼれる」',
   phase:{line:'「勝負は、まだ、終わらない」',label:'最後の一枚'},
   ult:{name:'オールイン',warn:'ディーラーの手元に積まれたチップが一斉に灯り、テーブルごと呑みこもうとする……！',mul:2.1},
   retort:[['aoi','「星灯で、チップの芯を照らします！」'],['suzune','「月華街の剣舞、見せてあげる！」'],['reina','「中の思い出を、取り戻します」'],['you','「……賭けない。崩す！」']],
   defeat:'「…………」'},
  q697:{id:'meiling',talk:'assets/enemies/zankyo/part1-005.webp?v=0.50.7.0',name:'龍美鈴',title:'月兎島のオーナー',art:'assets/enemies/zankyo/part1-005.webp?v=0.50.7.0',hp:4.2,
   intro:'「……お相手、いたしますわ」',
   hp75:'「この島は、母の島。わたくしが守りますの」',
   hp50:'「悪魔とでも、取引いたしますわ……！」',
   hp25:'「……おかあさまの、顔が……」',
   down:'「……勝っても、戻らない賭けでしたのね」',
   phase:{line:'「黒き龍よ、すべてを薙ぎ払いなさい」',label:'黒い龍'},
   ult:{name:'黒龍の扇',warn:'美鈴の扇子がひらめき、黒い龍が金庫じゅうを薙ぎ払う……！',mul:2.1},
   retort:[['suiran','「美鈴！　思い出して！」'],['hikari','「おねえちゃんも、わすれたくないんでしょ！」'],['touko','「あの人を、喰わせない」'],['you','「龍美鈴を、止める！」']],
   defeat:'「……おかあさま」'},
  q709:{id:'odoru_yoiyami',talk:'assets/enemies/zankyo/part2-017.webp?v=0.50.7.0',name:'踊る宵闇',title:'シオンの灯で踊る闇',art:'assets/enemies/zankyo/part2-017.webp?v=0.50.7.0',hp:4.3,
   intro:'「この拍子からは、誰も逃げられない」',
   hp75:'「踊れ。忘れて、踊れ」',
   hp50:'「……勝手に、踊るな」',
   hp25:'「拍子が……ずれる……」',
   down:'「……まだ、三つある」',
   phase:{line:'「最後のターンだ。……わたしが回る」',label:'最後のターン'},
   ult:{name:'終わらない拍子',warn:'劇場じゅうが宵闇の拍子で揺れ、客席ごと呑みこもうとする……！',mul:2.2},
   retort:[['nagi','「その踊りは、シオンのもの」'],['mai','「半拍、ずらして！」'],['siena','「わたしの、踊りで」'],['you','「踊る宵闇の拍子を、崩す！」']],
   defeat:'「……器なら、まだ、ある」'},
  q745:{id:'sentou_zankyo',talk:'assets/enemies/zankyo/part2-014.webp?v=0.50.7.0',name:'千灯の残響',title:'待つ灯の集まり',art:'assets/enemies/zankyo/part2-014.webp?v=0.50.7.0',hp:4.4,
   intro:'「……まだ、こない。まだ、こない」',
   hp75:'「港で……窓辺で……柱の前で……」',
   hp50:'「わすれたい……でも、まってる……」',
   hp25:'「……きた？　ほんとうに、きた？」',
   down:'「……かえる。……かえれる」',
   phase:{line:'「千の灯で、待ちつづける」',label:'千灯'},
   ult:{name:'光の雨',warn:'千のランプが光の雨になって、中庭いっぱいに降りそそぐ……！',mul:2.2},
   retort:[['hikari','「みんな！　きたよ！」'],['aoi','「芯は、待つ気持ちそのものです！」'],['zahra','「わたくしのランプの光も、使って！」'],['you','「千灯の残響を、鎮める！」']],
   defeat:'「……おかえり」'},
  q757:{id:'zahra',talk:'assets/enemies/zankyo/part1-006.webp?v=0.50.7.0',name:'ランプの女王ザフラ',title:'のっとられた大商人',art:'assets/enemies/zankyo/part1-006.webp?v=0.50.7.0',hp:4.5,
   intro:'「……遅い。会いに来るのが、八年、遅い」',
   hp75:'「この女の手で、灯してやろう。忘れ灯を」',
   hp50:'「……その歌、やめて……」',
   hp25:'「ナディア……ナディア……」',
   down:'「……まだ、使える器だ」',
   phase:{line:'「千灯市のランプよ、黒く燃えよ」',label:'黒い翼'},
   ult:{name:'黒い忘れ灯',warn:'黒い翼が広がり、市じゅうのランプが黒い炎になって降りそそぐ……！',mul:2.2},
   retort:[['nadia','「♪……（キャラバンの歌）」'],['touko','「ザフラさん、聞こえる？」'],['aoi','「芯は、腰のひび割れたランプです！」'],['you','「ランプの女王ザフラを、止める！」']],
   defeat:'「……来たよ」'},
  q769:{id:'ichi_yoiyami',talk:'assets/enemies/zankyo/part2-017.webp?v=0.50.7.0',name:'市を開く宵闇',title:'幻の夜市の店主',art:'assets/enemies/zankyo/part2-017.webp?v=0.50.7.0',hp:4.6,
   intro:'「……市は、まだ、閉じない」',
   hp75:'「いらっしゃい。待つ者は、みな、客だ」',
   hp50:'「……灰の分際で、思い出すな」',
   hp25:'「店番が……いない……」',
   down:'「……まだ、二つ、ある」',
   phase:{line:'「黒い屋台よ、ならべ」',label:'幻の夜市'},
   ult:{name:'閉じない市',warn:'黒い屋台と提灯がいっせいに押し寄せ、丘のてっぺんを呑みこもうとする……！',mul:2.3},
   retort:[['hikari','「イブキおねえちゃん、きたよ！」'],['touko','「みいちゃんの提灯、掲げるわ！」'],['zahra','「ランプの女王の灯の扱い、見せてさしあげますわ！」'],['you','「市を開く宵闇を、閉じる！」']],
   defeat:'「……器は、霧の向こうに」'},
  q805:{id:'torso_zankyo',talk:'assets/enemies/zankyo/part1-010.webp?v=0.50.7.0',name:'トルソーの残響',title:'なりたい誰かの集まり',art:'assets/enemies/zankyo/part1-010.webp?v=0.50.7.0',hp:4.7,
   intro:'「……なりたい。なりたい。なりたい」',
   hp75:'「だれかに……だれでもいい、だれかに……」',
   hp50:'「わたしの顔……どこ……」',
   hp25:'「……わたしで、いいの……？」',
   down:'「……ほどける」',
   phase:{line:'「白い裾で、みんなを包んであげる」',label:'白い裾'},
   ult:{name:'白い裾の波',warn:'残響の白いドレスの裾が、展示館いっぱいに波のように打ち寄せる……！',mul:2.3},
   retort:[['towa','「結び目は、胸の、ここ！」'],['eleanor','「わたしが、裾を、押さえる！」'],['aoi','「星灯で、結び目を照らします！」'],['you','「トルソーの残響を、崩す！」']],
   defeat:'「……わたしで、よかった」'},
  q811:{id:'white_gray',talk:'assets/enemies/zankyo/part1-001.webp?v=0.50.7.0',name:'白いグレイ',title:'ローズを名乗る仕立て屋',art:'assets/enemies/zankyo/part1-001.webp?v=0.50.7.0',hp:4.8,
   intro:'「わたしは、ローズ。……誰もが、なりたかった仕立て屋」',
   hp75:'「認めなさい。わたしが、いちばん」',
   hp50:'「……その手紙を、読まないで」',
   hp25:'「……わたしの、縫い目……」',
   down:'「……迷う者には、わたしの糸が、よく馴染む」',
   phase:{line:'「糸よ、この街をすべて縫いとめなさい」',label:'白い糸'},
   ult:{name:'白糸の鞭',warn:'何十本もの白い糸が鞭になり、アトリエじゅうをなぎ払う……！',mul:2.3},
   retort:[['eleanor','「マギーさん、聞いて！」'],['towa','「針で、手袋の縫い目をほどく！」'],['touko','「マギーさん、戻ってきて！」'],['you','「白いグレイを、止める！」']],
   defeat:'「……わたしの、色」'},
  q823:{id:'nuu_yoiyami',talk:'assets/enemies/zankyo/part2-017.webp?v=0.50.7.0',name:'縫う宵闇',title:'ハルカの灯で縫う闇',art:'assets/enemies/zankyo/part2-017.webp?v=0.50.7.0',hp:4.9,
   intro:'「……鐘が鳴れば、この街の糸は、すべて締まる」',
   hp75:'「縫え。止まらずに、縫え」',
   hp50:'「……結ぶな。その結び目を、結ぶな」',
   hp25:'「ほどける……糸が……」',
   down:'「……最後の、一つ」',
   phase:{line:'「真夜中の鐘とともに、すべてを縫いとめる」',label:'真夜中'},
   ult:{name:'千本の白糸',warn:'何千本もの白い糸が雨のように降りそそぎ、触れたものを縫いとめる……！',mul:2.4},
   retort:[['towa','「……結ぶ。今度は、わたしが！」'],['maggie','「あなたの縫い目で、縫い返しなさい」'],['hikari','「ハルカおねえちゃん、もうすこし！」'],['you','「縫う宵闇を、切り開く！」']],
   defeat:'「……帰ろう。始まりの町へ」'},
  q853:{id:'ichi_bannin',talk:'assets/enemies/zankyo/part1-004.webp?v=0.50.7.0',name:'市の番人',title:'黒い市の残骸',art:'assets/enemies/zankyo/part1-004.webp?v=0.50.7.0',hp:5.0,
   intro:'「……ぱち。ぱち。……お値段、お値段」',
   hp75:'「この灯は、高い。この灯は、安い」',
   hp50:'「勘定が……合わない……」',
   hp25:'「……新月まで、番を……」',
   down:'「……珠が、こぼれる」',
   phase:{line:'「ぱちぱちぱちぱち……」',label:'早算盤'},
   ult:{name:'大勘定',warn:'番人が算盤を激しくはじき、近くの灯をまとめて引き抜こうとする……！',mul:2.4},
   retort:[['aoi','「芯は算盤です！」'],['akane','「人の灯に、値段なんて、ないよ！」'],['momoka','「算盤、壊しちゃおう！」'],['you','「市の番人を、崩す！」']],
   defeat:'「……」'},
  q865:{id:'tokoyo_last',talk:'assets/ART_V2/story_cast/tokoyo_talk.webp?v=1.02.5.0',name:'黒い日傘の常夜',title:'宵闇に顔と言葉を貸した女',art:'assets/enemies/tokoyo_battle.webp',hp:5.1,
   intro:'「ごきげんよう、皆さま。灰から戻るのは、なかなか、よい気分ですわね」',
   hp75:'「ああ、楽しい。退屈しのぎには、ちょうどよい相手ですわ」',
   hp50:'「……少々、お行儀が悪くなってまいりましたわね」',
   hp25:'「ふふ……ふふふ……」',
   down:'「……負けてしまいましたわ」',
   phase:{line:'「では、日傘を開きましょう。最後の市でございます」',label:'黒い日傘'},
   ult:{name:'新月の日傘',warn:'常夜が黒い日傘を大きく回し、闇の刃が市じゅうに降りそそぐ……！',mul:2.5},
   retort:[['touko','「常夜。……もう、終わりにしましょう」'],['ruri','「星が、読めました。柄を、狙って！」'],['enju','「……では、わたくしは、歌いましょう」'],['you','「常夜を、宵闇から引きはがす！」']],
   defeat:'「……楽しゅうございました」'},
  q889:{id:'yoiyami_true',talk:'assets/enemies/zankyo/part2-016.webp?v=0.50.7.0',name:'宵闇',title:'海の底の飢え',art:'assets/enemies/zankyo/part2-016.webp?v=0.50.7.0',hp:5.5,
   intro:'「…………」',
   hp75:'「…………」',
   hp50:'「…………」',
   hp25:'「…………」',
   down:'「…………」',
   phase:{line:'（海が、鳴る）',label:'海の底の飢え'},
   ult:{name:'沖の宵闇',warn:'宵闇が海ごとのしかかり、岬の灯をすべて喰おうとする……！',mul:2.6},
   retort:[['sakuya_koe','「……いま。……四つで、照らす！」'],['kagari','「灯台、もう一段、上げる！」'],['hikari','「おにいさん、いっしょに」'],['you','「宵闇を、海の底へ押し返す！」']],
   defeat:'（宵闇は、ゆりかごの中で、丸くなった）'},
  q233:{id:'kasumi_shion',talk:'assets/enemies/kasumi_shion.webp',name:'燃え上がるSHION∞',title:'最後の舞台の踊り子',art:'assets/enemies/kasumi_shion_battle.webp',hp:2.7,
   intro:'「……あと、少し。最後のステップまで」',
   hp75:'「……楽しい。なぎと踊るの、やっぱり楽しい」',
   hp50:'「……ずるいなあ。燃えてるのに、思い出すことばっかり」',
   hp25:'「……ごめん。足が、もう……炎に、持っていかれて……」',
   down:'「ステップ、まちがえちゃった」',
   phase:{line:'「四年分、ぜんぶ……持っていかないで」',label:'四年分の残り火'},
   ult:{name:'∞（インフィニティ）',warn:'燃え上がるお面の奥で、SHION∞が最後のターンに入る……！',mul:1.9},
   retort:[['nagi','「……止めない。最後まで」'],['mai','「シオンさん、まだ踊れる！」'],['reina','「せめて、最後まで踊らせます」'],['you','「最後のステップまで、支える！」']],
   defeat:'「……顔、あった。よかった」'},
  q467:{id:'enju',name:'白い火の槐',title:'歌いつづける配達人',art:'assets/enemies/enju.webp',hp:2.9,
   intro:'「止めてくださいな。……歌は、続けますから」',
   hp75:'「いけませんわ。わたしの手が、言うことを聞かないの」',
   hp50:'「この歌だけは……この歌だけは、渡しませんわ」',
   hp25:'「あと少し……最後の一行まで……」',
   down:'「ごめんなさいね。手が、勝手に」',
   phase:{line:'「……っ。火が、歌を、呑もうとしていますわ」',label:'白い火'},
   ult:{name:'白い子守歌',warn:'槐の胸の白い火が、子守歌の節にあわせて、雪の社いっぱいに広がっていく……！',mul:1.9},
   retort:[['akane','「聞こえてるよ、槐さん！　歌って！」'],['aoi','「歌と星灯で、白い火を弱めます！」'],['reina','「止めます。白い火を」'],['you','「槐さんの白い火を、止める！」']],
   defeat:'「……ありがとう。まだ、歌えますわ」'},
  q347:{id:'haruka',name:'火のつきかけたハルカ',title:'縫いかけの契約者',art:'assets/enemies/haruka.webp',hp:2.9,
   intro:'「……お願い。止めて。わたしが、誰かを燃やす前に」',
   hp75:'「あつい……でも、まだ……袖が、できてないの……」',
   hp50:'「トワ……離れて……あなたまで、燃えちゃう……」',
   hp25:'「あの子の服……まだ……」',
   down:'「……ごめんなさい。止められないの」',
   phase:{line:'「……っ、ああ……っ！」',label:'白い火'},
   ult:{name:'白い火',warn:'ハルカの体から、白い火が仮面の形を取って噴き上がる……！',mul:1.8},
   retort:[['towa','「お姉ちゃん、負けないで！　離さないから！」'],['kotoha','「縫い目みたいに、一針ずつ……鎮めます！」'],['aoi','「燃え方が、弱まっています！」'],['you','「ハルカさん、戻ってこい！」']],
   defeat:'「……トワの手、あったかい」'},
  q287:{id:'tokoyo',name:'市守り・常夜',title:'見る側の女',art:'assets/enemies/tokoyo.webp',hp:3.2,
   intro:'「見せ物がなくなったなら、あたしが直接むしってやるよ」',
   hp75:'「っ……うぜえ。上品にしてりゃ、つけあがりやがって」',
   hp50:'「泣き虫も、元黒幕も、燃え残りも、まとめて灰にしてやる」',
   hp25:'「ふざけんな……あたしは、見る側なんだよ！」',
   down:'「はい、ひとり脱落」',
   phase:{line:'「糸！ 市じゅうの灯、全部よこせ！」',label:'素の市守り'},
   ult:{name:'黒金の投げ売り',warn:'常夜が着物の袖を振り払う。市じゅうの提灯から、黒と金の糸が乱暴に引きちぎられていく……！',mul:2.1},
   retort:[['enju','「常夜。今宵の市は、わたしが閉じさせていただきます」'],['touko','「もう、誰も燃やさせません」'],['saeko','「私の線で、あなたの糸を全部ほどくわ」'],['you','「常夜を、止める！」']],
   defeat:'「……は、はは。勝った気でいんの？」'},
  q291:{id:'tokoyo',name:'燃える常夜',title:'見る側だった女',art:'assets/enemies/tokoyo.webp',hp:2.6,
   intro:'「熱い……熱い熱い熱い！ なんで、あたしが！」',
   hp75:'「見るな……見てんじゃねえよ……！」',
   hp50:'「誰か……誰か……っ」',
   hp25:'「……あたしは、見る側、だったろ……」',
   down:'「……来んな」',
   phase:{line:'「…………」',label:'白い火'},
   ult:{name:'白い火',warn:'常夜の輪郭そのものが、白い火になって広がっていく……！',mul:1.8},
   retort:[['touko','「最後まで、呼びかけましょう」'],['aoi','「大切にされた記憶が……ひとつも、ない……」'],['enju','「……常夜」'],['you','「常夜！」']],
   defeat:'「……見てんじゃ、ねえよ」'},
 };
 // q17もターン制で戦う（特殊演出はこのモジュールで再現する）
 try{if(typeof TB_SPECIAL!=='undefined'&&TB_SPECIAL.delete)TB_SPECIAL.delete('q17');}catch(_){}

 const css=`
 .bd-overlay{position:fixed;inset:0;z-index:9000;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;box-sizing:border-box;overflow:hidden;padding:clamp(8px,2vh,20px) 0 calc(12px + env(safe-area-inset-bottom));background:linear-gradient(180deg,rgba(6,8,20,.35),rgba(6,8,20,.85));animation:bdFade .35s ease;cursor:pointer}
 .bd-overlay img.bd-art{position:relative;flex:1 1 auto;min-height:0;display:block;height:auto;width:auto;max-height:min(75dvh,800px);max-width:92vw;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 0 30px rgba(170,90,255,.45));animation:bdRise .6s ease;pointer-events:none}
 .bd-band{position:relative;flex:0 0 auto;box-sizing:border-box;margin:10px auto clamp(8px,2vh,24px);width:min(920px,94vw);background:rgba(14,10,30,.88);border:1px solid rgba(220,170,255,.45);border-radius:18px;padding:18px 26px;color:#f4ecff;box-shadow:0 10px 40px rgba(0,0,0,.5)}
 .bd-band small{display:block;letter-spacing:.2em;color:#c9a8ff;font-size:12px;font-weight:800}
 .bd-band strong{display:block;font-size:clamp(22px,3vw,34px);margin:2px 0 8px;letter-spacing:.06em}
 .bd-band p{margin:0;font-size:clamp(16px,1.6vw,21px);line-height:1.7}
 .bd-band em{position:absolute;right:20px;bottom:10px;font-style:normal;font-size:12px;color:#bba6d8}
 .bd-strip{position:fixed;left:50%;top:clamp(70px,12vh,140px);transform:translateX(-50%);z-index:8900;display:flex;align-items:center;gap:12px;width:min(760px,94vw);background:rgba(16,12,34,.9);color:#f6efff;border:1px solid rgba(215,165,255,.5);border-radius:16px;padding:10px 16px;box-shadow:0 8px 30px rgba(0,0,0,.45);animation:bdSlide .3s ease;pointer-events:none}
 .bd-strip img{width:56px;height:56px;border-radius:50%;object-fit:cover;object-position:50% 12%;background:#2a2244;flex:none}
 .bd-strip b{display:block;font-size:13px;color:#d6b8ff}
 .bd-strip span{font-size:15px;line-height:1.55}
 .bd-strip.bd-warn{border-color:#ff7b8f;background:rgba(48,10,22,.92)}
 .bd-strip.bd-warn b{color:#ff9fae}
 .tb-enemy.bd-phase2{box-shadow:0 0 0 2px #ff6f8e,0 0 22px rgba(255,80,120,.55)!important}
 .tb-enemy.bd-ult{animation:bdPulse 1s ease-in-out infinite}
 @keyframes bdFade{from{opacity:0}to{opacity:1}}
 @keyframes bdRise{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
 @keyframes bdSlide{from{opacity:0;transform:translate(-50%,-14px)}to{opacity:1;transform:translate(-50%,0)}}
 @keyframes bdPulse{0%,100%{box-shadow:0 0 0 2px #ff6f8e,0 0 12px rgba(255,80,120,.4)}50%{box-shadow:0 0 0 3px #ffb0c0,0 0 30px rgba(255,80,120,.9)}}
 @media (prefers-reduced-motion:reduce){.bd-overlay,.bd-overlay img.bd-art,.bd-strip,.tb-enemy.bd-ult{animation:none}}`;
 const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

 let overlayOpen=false,overlayTimer=0;const stripQueue=[];let stripBusy=false;
 function cfgFor(b){return b&&b.turnBattle&&b.wave===b.totalWaves-1?BOSSES[b.qid]:null;}
 function bossOf(b){return b?.enemies?.find(e=>e.kind==='boss'&&(e.harukaRole?e.harukaRole==='real':true));}
 function overlay(cfg,label,line,after){
  if(!tbCurrent())return;
  closeOverlay();overlayOpen=true;
  const el=document.createElement('div');el.className='bd-overlay';el.setAttribute('role','dialog');
  // Battle sprites remain in combat UI; dialogue cut-ins always use standing portraits.
  const portrait=cfg.talk||TALK(cfg.id);
  el.innerHTML=`<img class="bd-art" src="${portrait}" alt=""><div class="bd-band"><small>${label}</small><strong>${cfg.name}</strong><p>${line}</p><em>タップで進む</em></div>`;
  const done=()=>{if(!el.isConnected)return;el.remove();overlayOpen=false;clearTimeout(overlayTimer);if(after)after();};
  el.addEventListener('click',done);document.body.appendChild(el);
  overlayTimer=setTimeout(done,4200);
 }
 function closeOverlay(){document.querySelectorAll('.bd-overlay').forEach(x=>x.remove());overlayOpen=false;clearTimeout(overlayTimer);}
 function strip(img,name,text,warn){if(!tbCurrent())return;stripQueue.push({img,name,text,warn});if(!stripBusy)nextStrip();}
 function nextStrip(){
  const s=stripQueue.shift();if(!s){stripBusy=false;return;}stripBusy=true;
  const el=document.createElement('div');el.className='bd-strip'+(s.warn?' bd-warn':'');
  el.innerHTML=`${s.img?`<img src="${s.img}" alt="">`:''}<div><b>${s.name}</b><span>${s.text}</span></div>`;
  document.body.appendChild(el);setTimeout(()=>{el.remove();nextStrip();},s.warn?3200:2700);
 }
 const bossSay=(cfg,text)=>strip(cfg.talk||TALK(cfg.id),cfg.name,text,false);
 function retort(b,cfg){
  const party=new Set(b.allies.filter(a=>a.hp>0).map(a=>unit(a.id).person));
  const r=cfg.retort.find(([who])=>who==='you'||party.has(who));if(!r)return;
  const [who,text]=r;
  if(who==='you')strip('',typeof playerDisplayName==='function'?playerDisplayName():'主人公',text,false);
  else strip(FACE(who),PEOPLE[who]?.name||who,text,false);
 }

 // 最終ウェーブ：ボスのHPを増やし、登場演出
 const oldNewWave=tbNewWave;
 tbNewWave=function(q){
  const r=oldNewWave.apply(this,arguments);
  const b=tbCurrent();const cfg=cfgFor(b);const boss=cfg&&bossOf(b);
  if(boss&&!boss.bd){
   boss.bd={said:{},phase2:false,ultIn:0,lastHp:boss.hp};
   boss.max=Math.round(boss.max*cfg.hp);boss.hp=boss.max;boss.bd.lastHp=boss.hp;
   overlay(cfg,cfg.title,cfg.intro,()=>{try{tbRender();}catch(_){}});
  }
  return r;
 };
 // v1.01.6.0: ボスの台詞・演出が出ているあいだは、戦闘をしっかり止める（AUTOも手動も、敵の行動も）
 const bdBusy=()=>overlayOpen||stripBusy||stripQueue.length>0;
 const bdActive=()=>{const b=tbCurrent();const cfg=b&&cfgFor(b);const boss=cfg&&bossOf(b);return !!(boss&&boss.bd);};
 const bdHolding=()=>bdActive()&&bdBusy();
 window.ybBossHolding=bdHolding;
 let bdRetry=0;
 const bdLater=(fn)=>{clearTimeout(bdRetry);bdRetry=setTimeout(()=>{try{fn();}catch(_){}},350);};
 if(typeof tbAutoMove==='function'){
  const oldAuto=tbAutoMove;
  tbAutoMove=function(i){if(bdHolding()){setTimeout(()=>{try{tbAutoMove(i);}catch(_){}},400);return;}return oldAuto.apply(this,arguments);};
 }
 if(typeof tbAdvance==='function'){
  const oldAdvance=tbAdvance;
  tbAdvance=function(){try{bdFloor(tbCurrent());}catch(_){}if(bdHolding()){try{tbRender();}catch(_){}bdLater(()=>tbAdvance());return;}return oldAdvance.apply(this,arguments);};
 }
 if(typeof tbAction==='function'){
  const oldAction=tbAction;
  tbAction=function(){if(bdHolding())return;return oldAction.apply(this,arguments);};
 }
 if(typeof tbCheckOutcome==='function'){
  const oldOutcome=tbCheckOutcome;
  tbCheckOutcome=function(){
   const b=tbCurrent();try{bdFloor(b);checkBoss(b);}catch(_){}
   if(b&&bdActive()&&bdBusy()&&b.enemies.every(e=>e.hp<=0)){bdLater(()=>{if(tbCurrent()===b&&!tbCheckOutcome())tbAdvance();});return true;}
   return oldOutcome.apply(this,arguments);
  };
 }
 // v1.01.8.0: 戦闘が終わったら、ボスのカットインと台詞の帯を必ず片づける。勝ったときは、撃破の台詞を読み終えてから終わる
 function bdClearAll(){try{closeOverlay();}catch(_){}stripQueue.length=0;document.querySelectorAll('.bd-strip,.bd-overlay').forEach(x=>x.remove());stripBusy=false;overlayOpen=false;}
 window.ybBossClear=bdClearAll;
 if(typeof finishBattle==='function'){
  const oldFinish=finishBattle;let finishWait=0;
  finishBattle=function(won){
   const b=tbCurrent();
   if(won&&b&&!b.done&&bdActive()&&bdBusy()){const args=arguments;clearTimeout(finishWait);finishWait=setTimeout(function again(){if(tbCurrent()!==b||b.done)return;if(bdBusy()){finishWait=setTimeout(again,300);return;}bdClearAll();oldFinish.apply(window,args);},300);return;}
   bdClearAll();return oldFinish.apply(this,arguments);
  };
 }
 if(typeof cancelBattle==='function'){
  const oldCancel=cancelBattle;
  cancelBattle=function(){bdClearAll();return oldCancel.apply(this,arguments);};
 }
 // 見せ場を飛ばさない：第2形態の前に倒しきれない。必殺技を一度見るまでは、ぎりぎりで踏みとどまる
 function bdFloor(b){
  const cfg=cfgFor(b);const boss=cfg&&bossOf(b);if(!boss||!boss.bd)return;
  const d=boss.bd;
  if(!d.phase2&&boss.hp<Math.ceil(boss.max*0.5))boss.hp=Math.ceil(boss.max*0.5)-1;
  else if(d.phase2&&!d.ultFired&&boss.hp<Math.ceil(boss.max*0.08))boss.hp=Math.ceil(boss.max*0.08);
 }
 function checkBoss(b){
  const cfg=cfgFor(b);const boss=cfg&&bossOf(b);if(!boss||!boss.bd)return;
  bdFloor(b);
  const d=boss.bd,ratio=boss.hp/boss.max;
  if(boss.hp<=0){
   if(!d.said.defeat){d.said.defeat=true;stripQueue.length=0;overlay(cfg,'撃破',cfg.defeat);}
   return;
  }
  if(ratio<=0.75&&!d.said.hp75){d.said.hp75=true;bossSay(cfg,cfg.hp75);}
  if(ratio<=0.5&&!d.phase2){
   d.phase2=true;d.said.hp50=true;boss.atk*=1.25;d.ultIn=2;
   const heal=Math.round(boss.max*0.2);boss.hp=Math.min(boss.max,boss.hp+heal);logBattle(`${cfg.name}が本気を出した（HP +${heal}）`);
   overlay(cfg,'第2形態｜'+cfg.phase.label,cfg.phase.line,()=>retort(b,cfg));
  }
  if(ratio<=0.25&&!d.said.hp25){d.said.hp25=true;bossSay(cfg,cfg.hp25);}
 }
 // 味方の攻撃のあと
 if(typeof tbStrike==='function'){
  const oldStrike=tbStrike;
  tbStrike=function(i,e){const r=oldStrike.apply(this,arguments);try{checkBoss(tbCurrent());}catch(_){}return r;};
 }
 // 敵の攻撃：味方が倒れたら一言
 if(typeof tbEnemyHit==='function'){
  const oldHit=tbEnemyHit;
  tbEnemyHit=function(e,target){const was=target?.hp;const r=oldHit.apply(this,arguments);
   try{const b=tbCurrent();const cfg=cfgFor(b);const boss=cfg&&bossOf(b);
    if(boss&&boss.bd&&was>0&&target.hp<=0&&!boss.bd.said.down){boss.bd.said.down=true;bossSay(cfg,cfg.down);}}catch(_){}
   return r;};
 }
 // 必殺技：第2形態で、1ラウンド前に予告してから放つ
 if(typeof tbWeakPlanRound==='function'){
  const oldPlan=tbWeakPlanRound;
  tbWeakPlanRound=function(b){
   const r=oldPlan.apply(this,arguments);
   try{const cfg=cfgFor(b);const boss=cfg&&bossOf(b);
    if(boss&&boss.bd&&boss.hp>0){
     const d=boss.bd;boss.ultimate=false;
     if(d.phase2&&!(boss.breakSkips>0)&&!(boss.stunRounds>0)){
      if(d.ultIn===1){boss.ultimate=true;boss.intent='aoe';}
      else if(d.ultIn===2){strip(cfg.talk||TALK(cfg.id),'必殺技の予告',`次のラウンド、${cfg.name}の『${cfg.ult.name}』。${cfg.ult.warn}（防御・バリア・ブレイクで備えよう）`,true);}
      d.ultIn=d.ultIn<=1?3:d.ultIn-1;
     }
    }}catch(_){}
   return r;};
 }
 const oldMove=tbEnemyMove;
 tbEnemyMove=function(i){
  const b=tbCurrent(),e=b?.enemies?.[i];const cfg=cfgFor(b);
  if(cfg&&e&&e.ultimate&&e.hp>0&&!(e.breakSkips>0)&&!(e.stunRounds>0)){
   e.ultimate=false;if(e.bd)e.bd.ultFired=true;logBattle(`${cfg.name}の必殺技『${cfg.ult.name}』！`);
   strip(cfg.talk||TALK(cfg.id),cfg.name,`「${cfg.ult.name}！」`,true);
   const targets=b.allies.filter(a=>a.hp>0);
   for(const a of targets)tbEnemyHit(e,a,(TB_WEAK_BALANCE.aoeMultiplier||1)*cfg.ult.mul);
   if(cfg.ult.healShadows){for(const s of b.enemies){if(s.harukaRole==='shadow'&&s.hp<=0){s.hp=Math.round(s.max*.5);logBattle(`${s.name}が踊りながら戻ってきた`);}}}
   return;
  }
  if(cfg&&e&&e.ultimate&&(e.breakSkips>0||e.stunRounds>0)){e.ultimate=false;if(e.bd)e.bd.ultFired=true;logBattle(`${cfg.name}の必殺技は不発に終わった`);}
  return oldMove.apply(this,arguments);
 };
 if(typeof tbEnemyIntentLabel==='function'){
  const oldLabel=tbEnemyIntentLabel;
  tbEnemyIntentLabel=function(e){const cfg=cfgFor(tbCurrent());if(cfg&&e?.ultimate&&e.hp>0&&!(e.breakSkips>0)&&!(e.stunRounds>0))return `必殺：${cfg.ult.name}`;return oldLabel.apply(this,arguments);};
 }
 // 見た目：ボスの札に絵・第2形態の光・必殺予告の点滅
 if(typeof tbRender==='function'){
  const oldRender=tbRender;
  tbRender=function(){
   const r=oldRender.apply(this,arguments);
   try{checkBoss(tbCurrent());}catch(_){}
   try{const b=tbCurrent();const cfg=cfgFor(b);if(cfg){
    document.querySelectorAll('.tb-enemy').forEach((el,i)=>{const e=b.enemies[i];if(!e||e.kind!=='boss'||(e.harukaRole&&e.harukaRole!=='real'))return;
     if(!e.harukaRole&&cfg.id!=='sakuya'){let img=el.querySelector('.tb-enemy-art-thumb');if(!img){const icon=el.querySelector('.tb-enemy-icon');if(icon){img=document.createElement('img');img.className='tb-enemy-art-thumb';img.alt=cfg.name;icon.replaceChildren(img);}}if(img&&!img.src.endsWith(cfg.art))img.src=cfg.art;}
     el.classList.toggle('bd-phase2',!!e.bd?.phase2&&e.hp>0);el.classList.toggle('bd-ult',!!e.ultimate&&e.hp>0);});
   }}catch(_){}
   return r;};
 }
 // 戦闘を離れたら演出を片づける
 if(typeof finishBattle==='function'){
  const oldFinish=finishBattle;
  finishBattle=function(won){const r=oldFinish.apply(this,arguments);if(!won){closeOverlay();stripQueue.length=0;}return r;};
 }
})();
