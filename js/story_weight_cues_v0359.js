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

/* Ver.0.36.1.0 — 物語改変「宮園やよい」：序章〜第5章に、やよいの場面を差し込む。
   挿入位置は行番号ではなく台詞のアンカーで探す。差し込んだ行には ins:true を付け、
   行がずれた物語の表情指定（EXPRESSION_CUES）は、その場で新しい行番号へ読み替える。 */
(function(){
 const I=(who,title,text)=>({who,title,text,ins:true});
 const remap=(id,fromKey,by)=>{
  if(typeof EXPRESSION_CUES==='undefined'||!EXPRESSION_CUES.stories)return;
  const old=EXPRESSION_CUES.stories[id];if(!old)return;
  const out={};for(const [k,v] of Object.entries(old)){const n=Number(k);out[String(n>=fromKey?n+by:n)]=v}
  EXPRESSION_CUES.stories[id]=out;
 };
 const insAfter=(lines,id,pred,add)=>{const i=lines.findIndex(pred);if(i<0)return;lines.splice(i+1,0,...add);remap(id,i+2,add.length)};
 const insBefore=(lines,id,pred,add)=>{const i=lines.findIndex(pred);if(i<0)return;lines.splice(i,0,...add);remap(id,i+1,add.length)};
 const T=(re)=>((l)=>re.test(l.text||''));
 const hasYayoi=(lines)=>lines.some(l=>l.who==='yayoi');

 // 序章（PROLOGUE）：挿入②（行46の前）→ 挿入①（行3の後）の順に、後ろから差し込む
 if(typeof PROLOGUE!=='undefined'&&!hasYayoi(PROLOGUE)){
  const m=PROLOGUE.find(l=>l.who==='momoka'&&l.title==='思いがけない来客');
  if(m)m.text='「こんにちはっ！ あれ、やよいさんが言ってた新しい責任者さん？ よろしくね！」';
  insBefore(PROLOGUE,'prologue',T(/五人は朝の相談室を出て、商店街へ向かった/),[
   I('yayoi','いってらっしゃい','「いってらっしゃい、責任者さん。みんなも。……おかえりなさいの準備、しておきますね。」')
  ]);
  insAfter(PROLOGUE,'prologue',T(/出迎えてくれた葵が、書類を揃えた机の前に案内してくれる/),[
   I('yayoi','窓口の人','「あら、あなたが今日からの方？ 窓口の宮園やよいです。……ふふ、葵ちゃん、朝からずっとそわそわしてたんですよ。」'),
   I('aoi','そわそわ','「……していません。書類を三回確かめただけです。」'),
   I('yayoi','三回も','「三回も。……はい、責任者さん。まずはお茶をどうぞ。ここではね、どんなに忙しくても、最初の一杯は座って飲むことになってるんですよ。」'),
   I('you','呼び名','「責任者さん……ですか。」'),
   I('yayoi','似合ってくる','「ええ。今日からこの相談室の責任者さんでしょう？ 呼んでいるうちに、ちゃんと似合ってきますよ。」'),
   I('narrator','湯のみ','やよいが机に置いた湯のみから、ほうじ茶の香りが立った。葵が小さく息をついて、説明を続ける。')
  ]);
 }

 if(typeof CHAPTER_STORIES==='undefined')return;
 const story=(id,pairs)=>{const sc=CHAPTER_STORIES[id];if(!sc||!sc.lines||hasYayoi(sc.lines))return;for(const [pred,add] of pairs)insAfter(sc.lines,id,pred,add)};

 // 第1章
 story('chapter1_open',[
  [T(/増幅波形が並んでいた/),[
   I('yayoi','ひと口','「お疲れさまです。波形とにらめっこする前に、ひと口どうぞ。」'),
   I('aoi','ありがとう','「……ありがとうございます、やよいさん。」'),
   I('yayoi','眉間','「葵ちゃん、眉間。……はい、伸ばして。考えごとをするとき、いつもここに線ができるんですよ。」'),
   I('aoi','できていません','「……できていません。」'),
   I('narrator','笑い声','玲奈が小さく吹き出し、葵は気まずそうに記録へ目を戻した。')
  ]]
 ]);
 story('chapter1_end',[
  [T(/ももかとあなたを、黙って見つめていた/),[
   I('yayoi','小さな声','「……責任者さん。葵ちゃん、最近よくノートを書いてるでしょう。あの子、大事なことほど一人で抱えちゃうんです。」'),
   I('you','見ておく','「気をつけて見ておきます。」'),
   I('yayoi','待つことしか','「ふふ。お願いしますね。わたしは、ここでお茶を淹れて待ってることしかできないから。」')
  ]],
  [T(/温かな飲み物が並んだ/),[
   I('yayoi','おかえりなさい','「おかえりなさい。……はい、全員そろってますね。よかった。」'),
   I('narrator','顔を確かめる','やよいは入り口で一人ずつ顔を確かめてから、ようやく自分の椅子に腰を下ろした。')
  ]]
 ]);
 // 第2章
 story('chapter2_open',[
  [T(/匿名の相談が入っています/),[
   I('yayoi','電話の声','「電話を受けたのはわたしです。名前は言わなかったけど、声がとても疲れていて……。『誰かに話を聞いてほしかった』って。」'),
   I('you','聞いてくれてよかった','「やよいさんが聞いてくれてよかった。」'),
   I('yayoi','窓口の仕事','「話を聞くのが、窓口の仕事ですから。……責任者さん、その人に会ったら、まず温かいものを飲ませてあげてくださいね。」')
  ]]
 ]);
 story('chapter2_end',[
  [T(/葵は小さく笑って、ノートに何かを書き足した/),[
   I('yayoi','確認ごっこ','「葵ちゃん、また確認ごっこ？ 責任者さんの好きなお茶なら、わたしがちゃんと覚えてますよ。ほうじ茶。」'),
   I('aoi','書いてあります','「……知っています。書いてありますから。」'),
   I('yayoi','書かなくても','「書かなくたって、覚えてればいいのに。……ねえ、責任者さん？」'),
   I('narrator','閉じたノート','葵は答えずにノートを閉じた。やよいはそれ以上聞かず、空いた湯のみにお茶を足した。')
  ]],
  [T(/残響の記録は封をして保管します/),[
   I('yayoi','はじめまして','「楓さん、はじめまして。窓口の宮園やよいです。……おかえりなさい。ここ、あなたを待ってた人がいっぱいいたんですよ。」'),
   I('kaede','不思議','「……はじめまして。初めて会う人に『おかえり』って言われるの、なんだか不思議ですね。」'),
   I('yayoi','言われ慣れて','「言われ慣れてください。ここでは、みんな言うんですから。」')
  ]]
 ]);
 // 第3章
 story('chapter3_open',[
  [(l)=>l.who==='momoka'&&l.title==='手帳の一ページ目',[
   I('yayoi','わたしの名前','「あら、わたしの名前もある。……『やよいさん：お茶がおいしい』？ ふふ、それ、名前の説明になってませんよ。」'),
   I('momoka','大事なとこ','「えへへ、だってそれがいちばん大事なとこだもん！」')
  ]]
 ]);
 story('q15',[
  [T(/相談室にはほうじ茶の香りが残った/),[
   I('yayoi','ちょっと悔しい','「透子さんのほうじ茶、いい葉っぱですね。……ちょっと悔しいな。わたしのより香りが立ってる。」'),
   I('you','やよいさんのも','「やよいさんのお茶も好きですよ。」'),
   I('yayoi','さらっと言わない','「まあ。責任者さん、そういうことはさらっと言わないの。……明日はもっといいの、淹れますからね。」')
  ]]
 ]);
 story('q18',[
  [T(/何を覚えているのか、葵は言わなかった/),[
   I('narrator','毛布','夜明け前。毛布を抱えたやよいが、相談室の奥から出てきた。'),
   I('yayoi','帰りなさい','「葵ちゃん、今日はもう帰りなさい。解析は明日でも逃げませんよ。」'),
   I('aoi','記録が','「でも、記録が……。」'),
   I('yayoi','わたしがつける','「記録はわたしがつけておきます。字はちょっと丸いけど、読めますから。……ね？」'),
   I('aoi','はい','「……はい。」'),
   I('narrator','長い時間','やよいの前でだけ、葵は素直にうなずく。あなたは、二人が長い時間をこの部屋で過ごしてきたことを、少しだけ知った気がした。')
  ]]
 ]);
 // 第4章
 story('chapter4_open',[
  [T(/じゃあ、一緒に調べていこう/),[
   I('yayoi','朝ごはん','「はいはい、朝ごはんの前にむずかしい話はおしまい。おにぎり、握ってきましたよ。ノエルさんは梅と鮭、どっちが好き？」'),
   I('noel','選んでも','「……えっと、選んでもいいんですか？」'),
   I('yayoi','自分で選んでいい','「もちろん。ここでは、自分で選んでいいんです。……ね、責任者さん。」')
  ]]
 ]);
 story('chapter4_end',[
  [T(/葵はノートを胸に抱え/),[
   I('narrator','足されたお茶','葵が書類を片づけに奥へ下がると、やよいがあなたの湯のみにお茶を足した。'),
   I('yayoi','見ちゃいました？','「……見ちゃいました？ あのノート。」'),
   I('you','知ってたんですか','「やよいさんは、知ってたんですか。」'),
   I('yayoi','あんな顔','「中身は知りません。でも、葵ちゃんがあんな顔で何かを書くのは、ここを始めたころ以来です。」'),
   I('yayoi','止めてあげて','「責任者さん。もし葵ちゃんが無理をしそうになったら、止めてあげてくださいね。……わたしじゃ、きっと止められないから。」')
  ]]
 ]);
 // 第5章
 story('q25',[
  [T(/点灯式はもう、明日に迫っていた/),[
   I('narrator','窓口の明かり','その夜。相談室に戻ると、窓口の明かりだけがついていた。'),
   I('yayoi','お腹がすいてる顔','「おかえりなさい。宵星亭、どうでした？ ……あ、その顔は、お腹がすいてる顔ですね。」'),
   I('you','こんな時間まで','「やよいさん、こんな時間まで。」'),
   I('yayoi','閉めたくなかった','「明日は試験点灯でしょう。みんなが戻ってくるまで、閉めたくなかったんです。」'),
   I('yayoi','約束','「わたしね、ここを始めるとき、葵ちゃんと約束したんです。依頼に来た人も、ここで働く人も、帰ってきたら『おかえり』って言ってもらえる場所にしようって。」'),
   I('yayoi','入り口に','「わたしは戦えないし、むずかしい解析もできない。でも、ここが誰かの帰る場所なら、わたしはその入り口に座っていたいんです。……それが、わたしの帰る場所でもあるから。」'),
   I('you','帰ってこられる','「やよいさんがいるから、みんな帰ってこられるんだと思います。」'),
   I('yayoi','明日も','「ふふ。じゃあ明日も、ちゃんと帰ってきてくださいね。責任者さんも、葵ちゃんも、みんなも。」'),
   I('narrator','若葉色','ポケットの星灯が、ほんのかすかに揺れた。やよいの胸の奥に、淡い若葉色の灯火がともっている。')
  ]]
 ]);
 story('q27',[
  [T(/広場は私たちが守る/),[
   I('yayoi','ちゃんと帰ってきて','「責任者さん、葵ちゃん。……いってらっしゃい。ちゃんと、帰ってきてくださいね。」'),
   I('aoi','いってきます','「……いってきます。」')
  ]],
  [T(/市役所で休憩場所を確保します/),[
   I('yayoi','毛布とお茶','「毛布とお茶、こっちにあります！ 座り込んじゃった人には、順番に声をかけますね。」')
  ]]
 ]);
})();
