/* 2026-11-25: 1 approved new heroine (Takizawa Eri); profile, dialogue, depth and q6 reveal. */
const NEW_HERO_IDS_V1110=Object.freeze(["takizawa_eri"]);
const NEW_HERO_REVEAL_V1110=Object.freeze(Object.fromEntries(NEW_HERO_IDS_V1110.map(id=>[id,'q6'])));
function v1110Character(s){
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
const V1110_CHARACTERS=Object.freeze([{"id": "takizawa_eri", "name": "滝沢 えり", "age": 27, "job": "アパレルブランドの広報", "person": "赤茶のロングウェーブとクリーム色のニットワンピにロングコート。落ち着いた笑顔が印象的な広報担当", "favorite": "新作コレクションのカタログ", "weak": "頼まれた仕事の締め切りを抱え込みすぎる", "phrases": ["滝沢 えりです。よろしくお願いします。", "新作コレクションのカタログのことなら、いくらでも話せます。"], "favoritePlace": "cafe", "color": "#668eaf", "lines": ["滝沢 えりです。アパレルブランドの広報として働いています。", "新作コレクションのカタログが好きなんです。", "実は、頼まれた仕事の締め切りを抱え込みすぎるのが悩みで。", "また会えてうれしいです。"], "habit": "取材メモを色ペンで整理する", "inside": "赤茶のロングウェーブとクリーム色のニットワンピにロングコート。落ち着いた笑顔が印象的な広報担当。頼まれた仕事の締め切りを抱え込みすぎる", "work": "アパレルブランドの広報の仕事を通じて人と向き合うこと", "holiday": "休日は新作コレクションのカタログを楽しみます", "growth": "自分の気持ちも素直に伝え、誰かと歩む未来を選ぶ", "cg": "仕事帰り、新作コレクションのカタログについてふたりで語り合う", "flame": "えりの仕事への想いがともす灯火", "bonds": [["いつもの仕事", "アパレルブランドの広報", "アパレルブランドの広報の準備、もう少しで終わるんです。", "手伝えることはある？", "ありがとう。そばにいてくれるだけでも。"], ["大切にしていること", "アパレルブランドの広報", "新作コレクションのカタログには特別な思いがあるんです。", "もっと聞かせて。", "ええ、喜んで。"], ["休日のひととき", "西通りの喫茶街", "取材メモを色ペンで整理する。いつもの癖なんです。", "仕事が好きなんだね。", "ふふ、そうかもしれません。"], ["胸の内", "宵星臨海公園", "頼まれた仕事の締め切りを抱え込みすぎる。少し気にしていて。", "話してくれてありがとう。", "少し楽になりました。"], ["これから", "宵星駅前", "また、新作コレクションのカタログの話をしてもいいですか？", "もちろん、約束するよ。", "約束ですね。"]], "meet": ["アパレルブランドの広報の滝沢 えりから相談室へ連絡が届いた。", "滝沢 えり、27歳です。頼まれた仕事の締め切りを抱え込みすぎることで、相談したくて。", "話せるところから聞かせてください。", "ありがとうございます。少しずつ話せそうです。", "滝沢 えりは仕事場へ戻っていった。"]}].map(v1110Character));
const ROMANCE_V1110=Object.freeze(Object.fromEntries(V1110_CHARACTERS.map(c=>[c.id,v0920Romance(c.id,c)])));
const TOMOSHIBI_V1110=Object.freeze(Object.fromEntries(V1110_CHARACTERS.map(c=>[c.id,{color:c.flame[0],thought:c.flame[1]}])));
const CHARACTER_DEPTH_V1110=Object.freeze(Object.fromEntries(V1110_CHARACTERS.map(c=>[c.id,{habit:c.depth[0],inside:c.depth[1],growth:c.depth[2],cg:c.depth[3]}])));
const V1110_MEET_STORIES=Object.freeze(Object.fromEntries(V1110_CHARACTERS.map(c=>['v1110_meet_'+c.id,{id:'v1110_meet_'+c.id,title:c.name+'・出会いの日',place:c.job+'の仕事場',requires:['q6'],lines:[{who:'narrator',text:c.meet[0]},{who:c.id,text:c.meet[1]},{who:'you',text:c.meet[2]},{who:c.id,text:c.meet[3]},{who:'narrator',text:c.meet[4]}]}])));
