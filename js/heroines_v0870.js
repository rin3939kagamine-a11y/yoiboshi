/* PR #32/#36 approved seven characters — stage 1 only.
 * Character/interactions/bonds are additive. No unit, gacha, save migration, or old-story edits.
 */
const NEW_HERO_IDS_V0870=Object.freeze([]);
const NEW_HERO_REVEAL_V0870=Object.freeze(Object.fromEntries(NEW_HERO_IDS_V0870.map(id=>[id,'q6'])));
const V0870_CHARACTERS=Object.freeze([]);
const V0870_PLACE_IDS=Object.freeze(['taiyaki','cafe','park','arcade','library','horror']);
function v0870Romance(id,c){
 const moodKeys=['good','normal','low','sulk'];
 const moods=Object.fromEntries(moodKeys.map((k,i)=>[k,c.mood[i]]));
 const placeLines=Object.fromEntries(V0870_PLACE_IDS.map((k,i)=>[k,c.places[i]]));
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
  likes:Object.fromEntries(V0870_PLACE_IDS.map((p,i)=>[p,c.likes[i]])),
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
const ROMANCE_V0870=Object.freeze(Object.fromEntries(V0870_CHARACTERS.map(c=>[c.id,v0870Romance(c.id,c)])));
const TOMOSHIBI_V0870=Object.freeze(Object.fromEntries(V0870_CHARACTERS.map(c=>[c.id,{color:c.flame[0],thought:c.flame[1]}])));
const CHARACTER_DEPTH_V0870=Object.freeze(Object.fromEntries(V0870_CHARACTERS.map(c=>[c.id,{habit:c.depth[0],inside:c.depth[1],growth:c.depth[2],cg:c.depth[3]}])));
const V0870_MEET_STORIES=Object.freeze(Object.fromEntries(V0870_CHARACTERS.map(c=>['v0870_meet_'+c.id,{
 id:'v0870_meet_'+c.id,title:c.name+'・出会いの日',place:c.job+'の仕事場',requires:['q6'],
 lines:[{who:'narrator',text:c.meet[0]},{who:c.id,text:c.meet[1]},{who:'you',text:c.meet[2]},
  {who:c.id,text:c.meet[3]},{who:'narrator',text:c.meet[4]}]
}])));
