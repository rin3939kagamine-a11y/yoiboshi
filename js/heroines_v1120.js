/* 2026-11-25: 1 approved new heroine (Takagi Amu); profile, dialogue, depth and q6 reveal. */
const NEW_HERO_IDS_V1120=Object.freeze(["takagi_amu"]);
const NEW_HERO_REVEAL_V1120=Object.freeze(Object.fromEntries(NEW_HERO_IDS_V1120.map(id=>[id,'q6'])));
function v1120Character(s){
 const [intro,bright,sad,late]=s.lines;
 return Object.freeze({
  id:s.id,name:s.name,age:s.age,job:s.job,person:s.person,
  favorite:s.favorite,weak:s.weak,phrases:s.phrases,favoritePlace:s.favoritePlace,
  likes:s.likes||['normal','like','like','normal','like','normal'],
  mood:[
   [intro,bright,'次はもう少し、ゆっくり話せるといいですね。'],
   [bright,s.habit,'あなたのことも聞かせてもらえますか？'],
   [sad,s.inside,'少しだけ相談してもいいですか？'],
   [late,'約束が変わるなら、先に教えてほしかったな。','次の予定はふたりで決めましょう。']
  ],
  places:[
   ['焼きたての香りがしますね。',s.favorite+'の話、また聞いてください。'],
   ['ここの席、落ち着きます。',bright],
   ['少し歩いて、気分を変えたいです。',s.habit],
   ['今日は勝負してみますか？','一緒だと時間が早く感じます。'],
   ['本棚を見ているだけでも楽しいですね。',s.inside],
   ['暗い場面はちょっと驚きますね。','最後まで隣にいてくださいね。']
  ],
  topics:[
   ['今の仕事',s.job+'として、相手が喜ぶ瞬間を大切にしています。'],
   ['小さな習慣',s.habit],
   ['お気に入り',s.favorite],
   ['苦手なこと',s.weak],
   ['仕事で大切なこと',s.work],
   ['休日の過ごし方',s.holiday],
   ['胸の内',s.inside],
   ['これからの目標',s.growth]
  ],
  bonds:s.bonds,meet:s.meet,
  repair:['遅れた理由を正直に伝え、次の約束を相談する','冗談で流して話題を変える','話してくれてうれしい。次は連絡してくださいね。','次は約束を大切にしてほしいです。'],
  flame:[s.flame,s.growth],depth:[s.habit,s.inside,s.growth,s.cg],color:s.color
 });
}
const V1120_CHARACTERS=Object.freeze([{"id": "takagi_amu", "name": "高木 あむ", "age": 20, "job": "ビアガーデンのキャスト", "person": "金髪のサイドポニーに大きな黒いリボン。ビールジョッキを両手に掲げる、底抜けに明るいキャスト", "favorite": "きめ細かい泡の生ビール", "weak": "盛り上げ上手なのに片付けは後回しにしがち", "phrases": ["高木 あむです。よろしくお願いします。", "きめ細かい泡の生ビールのことなら、いくらでも話せます。"], "favoritePlace": "park", "color": "#a87ca8", "lines": ["高木 あむです。ビアガーデンのキャストとして働いています。", "きめ細かい泡の生ビールが好きなんです。", "実は、盛り上げ上手なのに片付けは後回しにしがちのが悩みで。", "また会えてうれしいです。"], "habit": "開店前にジョッキを磨き上げる", "inside": "金髪のサイドポニーに大きな黒いリボン。ビールジョッキを両手に掲げる、底抜けに明るいキャスト。盛り上げ上手なのに片付けは後回しにしがち", "work": "ビアガーデンのキャストの仕事を通じて人と向き合うこと", "holiday": "休日はきめ細かい泡の生ビールを楽しみます", "growth": "自分の気持ちも素直に伝え、誰かと歩む未来を選ぶ", "cg": "仕事帰り、きめ細かい泡の生ビールについてふたりで語り合う", "flame": "あむの仕事への想いがともす灯火", "bonds": [["いつもの仕事", "ビアガーデンのキャスト", "ビアガーデンのキャストの準備、もう少しで終わるんです。", "手伝えることはある？", "ありがとう。そばにいてくれるだけでも。"], ["大切にしていること", "ビアガーデンのキャスト", "きめ細かい泡の生ビールには特別な思いがあるんです。", "もっと聞かせて。", "ええ、喜んで。"], ["休日のひととき", "西通りの喫茶街", "開店前にジョッキを磨き上げる。いつもの癖なんです。", "仕事が好きなんだね。", "ふふ、そうかもしれません。"], ["胸の内", "宵星臨海公園", "盛り上げ上手なのに片付けは後回しにしがち。少し気にしていて。", "話してくれてありがとう。", "少し楽になりました。"], ["これから", "宵星駅前", "また、きめ細かい泡の生ビールの話をしてもいいですか？", "もちろん、約束するよ。", "約束ですね。"]], "meet": ["ビアガーデンのキャストの高木 あむから相談室へ連絡が届いた。", "高木 あむ、20歳です。盛り上げ上手なのに片付けは後回しにしがちことで、相談したくて。", "話せるところから聞かせてください。", "ありがとうございます。少しずつ話せそうです。", "高木 あむは仕事場へ戻っていった。"]}].map(v1120Character));
const ROMANCE_V1120=Object.freeze(Object.fromEntries(V1120_CHARACTERS.map(c=>[c.id,v0920Romance(c.id,c)])));
const TOMOSHIBI_V1120=Object.freeze(Object.fromEntries(V1120_CHARACTERS.map(c=>[c.id,{color:c.flame[0],thought:c.flame[1]}])));
const CHARACTER_DEPTH_V1120=Object.freeze(Object.fromEntries(V1120_CHARACTERS.map(c=>[c.id,{habit:c.depth[0],inside:c.depth[1],growth:c.depth[2],cg:c.depth[3]}])));
const V1120_MEET_STORIES=Object.freeze(Object.fromEntries(V1120_CHARACTERS.map(c=>['v1120_meet_'+c.id,{id:'v1120_meet_'+c.id,title:c.name+'・出会いの日',place:c.job+'の仕事場',requires:['q6'],lines:[{who:'narrator',text:c.meet[0]},{who:c.id,text:c.meet[1]},{who:'you',text:c.meet[2]},{who:c.id,text:c.meet[3]},{who:'narrator',text:c.meet[4]}]}])));
