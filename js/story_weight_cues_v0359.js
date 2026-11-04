/* Ver.0.35.9.0 — ストーリーの重み付け（第1〜3章）で行を差し込んだ場面の表情指定を、新しい行番号に合わせる。 */
if(typeof EXPRESSION_CUES!=='undefined'&&EXPRESSION_CUES.stories){
 const shift=(id,fromIndex1,by)=>{const old=EXPRESSION_CUES.stories[id];if(!old)return;const out={};for(const [k,v] of Object.entries(old)){const n=Number(k);out[String(n>=fromIndex1?n+by:n)]=v}EXPRESSION_CUES.stories[id]=out};
 shift('q12',12,1);           // 朔夜の「私の名前を…」を12行目に追加
 shift('chapter2_end',9,5);   // 葵の「初めて会った日」5行を9行目から追加
 shift('chapter3_open',2,1);  // ももかの手帳の行を2行目に追加
}

/* Ver.0.35.10.0 — 第4章終幕：葵のノート（ハルカの章の行より後、最後の「続く」の直前に入れる） */
(function(){
 if(typeof CHAPTER_STORIES==='undefined'||!CHAPTER_STORIES.chapter4_end?.lines?.length)return;
 const ls=CHAPTER_STORIES.chapter4_end.lines;
 if(ls.some(l=>l.aoiNotebook))return;
 ls.splice(ls.length-1,0,
  {who:'narrator',title:'落ちたノート',aoiNotebook:true,text:'片づけの途中、葵の机から一冊のノートが床に落ちた。開いたページには、細かい字がびっしりと並んでいる。'},
  {who:'narrator',title:'書かれていたこと',text:'『{name}さん：ほうじ茶が好き』『初めて会った日：おはようございます、{name}さん。瀬名葵です』『旧灯台の地下：灯台のときも、そう言ってたな、と言われた』――どれも、あなたのことばかりだった。'},
  {who:'aoi',title:'見られたページ',text:'「……見ましたか。」',cue:{target:'aoi',face:'surprise'}},
  {who:'you',title:'問いかけ',text:'「葵、これは……」'},
  {who:'aoi',title:'解析の記録',text:'「解析の記録です。……忘れたくないことは、書いておく主義なので。」',cue:{target:'aoi',face:'normal'}},
  {who:'narrator',title:'震える指先',text:'葵はノートを胸に抱え、いつものように微笑んだ。その指先が、かすかに震えていた。'}
 );
})();

/* Ver.0.36.0.0 — 第5章の作り直し：丸ごと書き直した場面は行番号の表情指定を外し（各行の cue を使う）、
   行を差し込んだ場面は、元の行番号を新しい行番号へ読み替える。 */
(function(){
 if(typeof EXPRESSION_CUES==='undefined'||!EXPRESSION_CUES.stories||typeof CHAPTER5_REWRITE_V0360==='undefined')return;
 for(const [id,sc] of Object.entries(CHAPTER5_REWRITE_V0360)){
  const old=EXPRESSION_CUES.stories[id];if(!old)continue;
  if(sc.rewritten){delete EXPRESSION_CUES.stories[id];continue}
  if(!sc.lines.some(l=>l.ins))continue;
  const map={};let orig=0;
  sc.lines.forEach((l,i)=>{if(!l.ins){orig++;map[orig]=i+1}});
  const out={};for(const [k,v] of Object.entries(old)){const n=map[Number(k)];if(n)out[String(n)]=v}
  EXPRESSION_CUES.stories[id]=out;
 }
})();
