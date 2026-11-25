/* 2026-11-16: 20 accepted characters, stage 1 only. No units or rarity. */
const NEW_HERO_IDS_V0920=Object.freeze(["nekomiya_rara"]);
const NEW_HERO_REVEAL_V0920=Object.freeze(Object.fromEntries(NEW_HERO_IDS_V0920.map(id=>[id,'q6'])));
const V0920_CHARACTERS=Object.freeze([{"id":"nekomiya_rara","name":"猫宮 らら","age":21,"job":"テーマパークダンサー","person":"猫系ギャル","favorite":"豹柄のアクセサリーとダンスステージ","weak":"元気にふるまって失敗を隠す","phrases":["にゃはっ！　ららのダンス見てて！","今日はいつもより本気なんだよ？"],"favoritePlace":"arcade","likes":["normal","normal","normal","like","normal","normal"],"mood":[["にゃはっ！　ららのダンス見てて！","今日はテーマパークダンサーの仕事で、ちょっと嬉しいことがあったよ。","また一緒に、ゆっくり話せたらいいな。"],["にゃはっ！　ららのダンス見てて！","ショー前に靴ひもを二回結び直すのが私の日課なんだ。","今日はいつもより本気なんだよ？"],["今日は少しだけ聞いてほしくて。","ステージの振りを間違えたことを言い出せなかった","よかったら、相談に乗ってくれる？"],["約束してたから待ってたよ。","今度は一言連絡してね。","また予定を決めよう。"]],"places":[["甘いお菓子の匂いにほっとするね。","ここで少しだけ寄り道しよう。"],["ゆっくりお茶を飲めるの、いいね。","今日はいつもより本気なんだよ？"],["風が気持ちいいね。","また散歩に誘って。"],["一緒に何か遊んでみる？","こんな時間も楽しいね。"],["静かなところは落ち着くね。","おすすめの本があったら教えて。"],["ちょっと怖いけど、最後まで一緒にいてね。","また一つ思い出が増えたね。"]],"topics":[["仕事のこと","テーマパークダンサーとして、毎日少しずつ工夫してるんだ。"],["いつもの習慣","ショー前に靴ひもを二回結び直す"],["お気に入り","豹柄のアクセサリーとダンスステージ"],["苦手なこと","元気にふるまって失敗を隠す"],["仕事の道具","ダンスシューズは私の大切な道具なんだ。"],["休日の過ごし方","お休みの日は豹柄のアクセサリーとダンスステージを楽しみたい。"],["言えなかった本音","失敗が仲間に知られるのがこわい"],["これからのこと","失敗を共有してもっといいショーにする"]],"bonds":[["出会った日の続き","テーマパークの舞台裏","ステージの振りを間違えたことを言い出せなかった","次のリハーサルで一緒に確かめよう","……話してよかった。もう少し自分で考えてみる。"],["いつもの工夫","テーマパークの舞台裏","ショー前に靴ひもを二回結び直す","その工夫が続いている理由を教えて。","見てくれてたんだ。少し照れるね。"],["心にしまったこと","テーマパークの舞台裏","失敗が仲間に知られるのがこわい","話してくれてありがとう。急がなくていいよ。","これ、他の人には言えなかったんだ。"],["自分で決める一歩","テーマパークの舞台裏","失敗を共有してもっといいショーにする","大丈夫。選んだことを応援してる。","うん。次は自分でやってみるね。"],["次の約束","テーマパークの舞台裏","ライトの消えた舞台で一人のステップを見せる","また一緒に、この時間を過ごそう。","約束。忘れないでね。"]],"meet":["テーマパークの舞台裏から相談室へ、テーマパークダンサーに関する相談が届いた。","猫宮 ららです。ステージの振りを間違えたことを言い出せなかった","次のリハーサルで一緒に確かめよう","ありがとう。今度は私からも話せる気がする。","猫宮 ららは少し肩の力を抜いて帰っていった。"],"repair":["遅れたことを謝って次の約束を相談する","冗談で話をそらす","ちゃんと聞いてくれてありがとう","次は連絡をくれるとうれしいな"],"flame":["猫宮 ららの胸に灯る小さな光","失敗を共有してもっといいショーにする"],"depth":["ショー前に靴ひもを二回結び直す","失敗が仲間に知られるのがこわい","失敗を共有してもっといいショーにする","ライトの消えた舞台で一人のステップを見せる"],"color":"#d3aa8c"}]);
const V0920_PLACE_IDS=Object.freeze(['taiyaki','cafe','park','arcade','library','horror']);
function v0920Romance(id,c){
 const moodKeys=['good','normal','low','sulk'];
 const moods=Object.fromEntries(moodKeys.map((k,i)=>[k,c.mood[i]]));
 const placeLines=Object.fromEntries(V0920_PLACE_IDS.map((k,i)=>[k,c.places[i]]));
 const stories=Object.fromEntries(c.bonds.map(([title,place,first,answer,last],i)=>['bond_'+id+'_'+i,{
  title:c.name+'・第'+(i+1)+'話「'+title+'」',place,person:id,requires:[],threshold:(i+1)*20,
  lines:[{who:'narrator',text:place+'で、'+c.name+'と少し特別な時間を過ごした。'},
   {who:id,text:first},{who:'you',text:answer},{who:id,text:last},
   {who:'narrator',text:'言葉を交わした二人は、また会う約束をした。'}]}]));
 const replyResults={
  good:{tease:['ふふ、そういうところもあるかも','ちょっと照れちゃうね'],praise:['ありがとう。うれしい','そう言ってもらえると力になる'],care:['気にかけてくれてありがとう','じゃあ、少しだけ頼ろうかな']},
  normal:{tease:['そう見える？','まあ、そうかもね'],praise:['見ていてくれたんだね','ありがとう、覚えておく'],care:['ありがとう','少し気が楽になった']},
  low:{tease:['今日は冗談を返す余裕がなくて','また今度話そう'],praise:['……ありがとう','その言葉、うれしい'],care:['話を聞いてくれる？','そばにいてくれるだけで助かる']}
 };
 return Object.freeze({
  profile:{name:c.name,age:c.age,occupation:c.job,role:c.job+'／相談室の外部協力者',
   personality:c.person,favorite:c.favorite,weakness:c.weak,catchphrases:c.phrases,favoritePlace:c.favoritePlace},
  likes:Object.fromEntries(V0920_PLACE_IDS.map((p,i)=>[p,c.likes[i]])),
  moods,placeLines,
  clues:[c.favoritePlace,'park','cafe'].filter((v,i,a)=>a.indexOf(v)===i).map(place=>({place,text:placeLines[place][0]})),
  replyChoices:{general:{tease:['今日はいつもと違うね','そういう一面もあるんだ'],praise:['頑張っているのを見ていたよ','今日の工夫、よかったと思う'],care:['無理してない？','話だけでも聞くよ']}},
  replyResults,replyBest:{good:'praise',normal:'praise',low:'care'},
  repair:{choices:c.repair.slice(0,2),correct:0,yes:c.repair[2],no:c.repair[3]},
  topics:c.topics.map(([title,text])=>({title,text})),
  invite:c.mood[0][2],outingThird:'今まで見せなかった本音を打ち明ける',
  outingFinal:'ふたりで次の約束を選ぶ',memories:[],stories
 });
}
const ROMANCE_V0920=Object.freeze(Object.fromEntries(V0920_CHARACTERS.map(c=>[c.id,v0920Romance(c.id,c)])));
const TOMOSHIBI_V0920=Object.freeze(Object.fromEntries(V0920_CHARACTERS.map(c=>[c.id,{color:c.flame[0],thought:c.flame[1]}])));
const CHARACTER_DEPTH_V0920=Object.freeze(Object.fromEntries(V0920_CHARACTERS.map(c=>[c.id,{habit:c.depth[0],inside:c.depth[1],growth:c.depth[2],cg:c.depth[3]}])));
const V0920_MEET_STORIES=Object.freeze(Object.fromEntries(V0920_CHARACTERS.map(c=>['v0920_meet_'+c.id,{
 id:'v0920_meet_'+c.id,title:c.name+'・出会いの日',place:c.job+'の仕事場',requires:['q6'],
 lines:[{who:'narrator',text:c.meet[0]},{who:c.id,text:c.meet[1]},{who:'you',text:c.meet[2]},
  {who:c.id,text:c.meet[3]},{who:'narrator',text:c.meet[4]}]
}])));
