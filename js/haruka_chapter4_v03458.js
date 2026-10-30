/* 宵星の契約者 RE:START — v0.34.58.0
 * q19 / q22 / q24: ハルカの物語、依頼情報、q24最終ウェーブ専用戦闘。
 * Ver.0.34.57.0 の game.js の後に読み込む。セーブ形式・Q12は変更しない。
 */
(function harukaChapterFour(){
 'use strict';
 if(typeof CHAPTER4_STORIES==='undefined'||typeof CHAPTER4_INVESTIGATION_CASES==='undefined'||typeof QUEST_BY_ID==='undefined')return;
 const scene=CHAPTER4_STORIES;
 const shadowArt='assets/enemies/haruka_shadow.webp';
 const bossArt='assets/enemies/haruka.webp';
 let shadowArtMissing=false;
 // 新しい分身画像が未配置なら、既存ハルカ絵を暗く加工して表示。
 function setEnemyArt(img,isShadow){
  if(!img)return;
  img.style.filter=isShadow?'brightness(.86) saturate(.9)':'none';
  img.onerror=isShadow?function(){shadowArtMissing=true;this.onerror=null;this.src=bossArt;this.style.filter='grayscale(1) brightness(.58)';}:null;
  img.src=isShadow&&!shadowArtMissing?shadowArt:bossArt;
  if(isShadow&&shadowArtMissing)img.style.filter='grayscale(1) brightness(.58)';
 }
 const line=(who,title,text)=>({who,title,text});
 // Append rather than reindex existing dialogue: existing in-progress scene cursor remains valid.
 function add(key,items){const s=scene[key];if(!s||!Array.isArray(s.lines))return;s.lines.push(...items);}
 add('q19_intro',[
  line('narrator','もう一着の衣装','調査に移ろうとしたとき、古い衣装の箱の底から、別の布包みが見つかった。白いタグは新しく、黒と赤の小さな角が縫い付けられている。'),
  line('towa','見覚えのある角','「これ、お姉ちゃんの……。昔、わたしが描いた悪魔の服を、お姉ちゃんが自分で縫ってくれたの。」'),
  line('sena','無理に聞かない','「トワ。話したくないなら、今はいいよ。衣装は私が預かっておく。」'),
  line('towa','古い衣装と新しい夢','「ううん。これは昔、着てもらった服。今描いてる新しい衣装とは違うんだ。……ちゃんと、覚えておきたい。」'),
  line('aoi','調査の境界','「この衣装と残響の関連はまだ不明です。持ち主の事情と、確認できた現象は分けて記録します。」')
 ]);
 add('towa_meet',[
  line('you','描かなくなった理由','「トワが絵を見せるのを恥ずかしがっていたのは、どうして？」'),
  line('towa','姉との約束','「……お姉ちゃんがいなくなってから、絵を誰にも見せられなくなった。次の服は、お姉ちゃんに見せたいって、ずっと思ってたから。」'),
  line('you','続きを待つ','「いつか見せられる日まで、大切に取っておこう。」'),
  line('towa','小さな決心','「うん。描くのまでやめたら、お姉ちゃんとの約束も消えちゃう気がするから。」')
 ]);
 add('q22_intro',[
  line('narrator','花飾りの屋根','聞き取りを終えた帰り道。花飾りの屋根の上に、黒い角をつけた紺色のドレスの女性が座っていた。足元では黒い星灯が、人々の「置いていかれる」という声をすくい集めている。'),
  line('haruka','遠くからの問い','「あなた、トワの知り合い？　あの子、元気にしてる？」'),
  line('you','トワのこと','「元気だよ。あなたは……トワのお姉さん？」'),
  line('haruka','答えられないこと','「……あの子が、今も絵を描いているなら、それでいい。ここで会ったことは、まだ言わないで。」'),
  line('narrator','黒い灯の残り香','女性は答えを待たず、黒い星灯のきらめきとともに消えた。人の不安が薄れたあとも、彼女が見つめていた空白だけが胸に残る。'),
  line('aoi','未確定の相手','「容姿と波形は記録します。ただ、あの女性が残響を起こしたのか、それとも集めていたのかは、まだ断定できません。」')
 ]);
 add('q24_pre',[
  line('narrator','渦の中心の舞台','残響の中心、無人となった舞台に、紺色の衣装をまとう角のある女性が立っていた。黒い星灯が指先からほどけ、彼女の左右に二つの仮面の影を形づくる。'),
  line('you','商店街の女性','「商店街で会った人だね。あなたは誰なんだ？」'),
  line('haruka','選ばれた灯','「イブキから声が消えたのは、あの方が次の契約者を選んだから。……今、その灯を預かってるのは私。」'),
  line('haruka','帰れない理由','「トワには、まだ会えない。あなたたちにも、ここから先へは行かせない。」'),
  line('aoi','本体を見分ける','「仮面の影は二体。本体だけは角飾りの赤い光と、黒い星灯の核が残っています。影は本体を回復させます。本体を攻撃すると回復が弱まるはずです！」'),
  line('you','戦い方の確認','「本体を見失わない。影に惑わされず、みんなを守って止めよう。」')
 ]);
 if(scene.q24?.lines?.[0])scene.q24.lines[0].text='仮面の影がほどけると、旧灯台を囲んでいた黒い光も弱まった。舞台の端に立つ女性だけが、まだ姿を保っている。試験設備の停止表示は変わらず、避難した人々にもけがはなかった。';
 add('q24',[
  line('narrator','舞台の端','舞台に残ったハルカは、分身がほどけていく様子を見つめていた。敵意は消えているが、黒い星灯はまだ指先で揺れている。'),
  line('towa','駆けつけた妹','「お姉ちゃん！　……やっぱり、ハルカお姉ちゃんだったんだ。」'),
  line('haruka','懐かしい声','「トワ……。来ちゃだめだって、思ってたのに。」'),
  line('narrator','新しいスケッチ','衣装を届けに来ていたトワが、抱えていたスケッチブックを開く。そこに描かれていたのは、昔の悪魔の衣装ではなく、今のトワが新しく考えた、姉が着るはずの衣装だった。'),
  line('towa','次の衣装','「あの服を縫ってくれたの、お姉ちゃんだったでしょ。今度はわたしが作りたい。まだ、着てもらってないんだよ。」'),
  line('haruka','言えなかった言葉','「……ずるいな。そんなの、帰りたくなるじゃない。」'),
  line('you','戻る道','「帰って来られる場所は、なくなっていないよ。」'),
  line('haruka','今はまだ','「……まだ戻れない。でも、あの絵は……忘れない。」'),
  line('narrator','途切れない約束','ハルカは泣きそうな顔で笑い、黒い星灯の光とともに舞台の奥へ消えた。倒されたのではない。トワの絵を見て、自分の足で去ったのだ。'),
  line('towa','持ち続ける絵','「次に会うときは、ちゃんと縫い上げておく。だから……帰ってきてね。」')
 ]);
 // Keep chapter4_end's final "next chapter" line as the last line.
 if(scene.chapter4_end?.lines?.length){
  const ls=scene.chapter4_end.lines;
  ls.splice(Math.max(0,ls.length-1),0,
   line('towa','帰ってくる場所','「今度は、お姉ちゃんが帰ってこられる場所を作っておく。あの服も、ここで待たせておくから。」'));
 }
 // Update the existing quest text and clue meaning without changing IDs, rewards or investigation answers.
 const questText={
  q19:{lead:'点灯式の衣装が揺らす鏡の異変を調べる。トワが見つけた姉の古い衣装と、裏地に残る反応は別々に確かめたい。',clues:['衣装の裏地・タグ・保管写真を照合し、鏡に反応した経路を調べる。','トワの姉の衣装は手がかりだが、持ち主が異変を起こしたとは断定しない。'],report:'鏡の残響を鎮静し、衣装と写真の来歴を記録する。'},
  q20:{lead:'宵星FMの録音に混じる無音の二秒を調べる。失踪記録と共通する周期の意味はまだ不明だ。',clues:['録音の波形・古い記事・市史を重ねる。','一致した周期を記録し、失踪の原因や関係者は断定しない。'],report:'放送設備の安全を守り、波形の比較資料を残す。'},
  q21:{lead:'海辺で待ち続ける人の想いに残響が集まっている。潮位と反応を分け、安全な避難路を確かめる。',clues:['潮の記録と残響の向きを区別する。','浜辺の避難導線を確保し、住民の不安を安全に鎮める。'],report:'避難の順路を確認し、海辺の残響を鎮静する。'},
  q22:{lead:'商店街の「置いていかれる」不安が増幅する。花飾りの屋根に現れた角の女性と黒い星灯の関係は未確定だ。',clues:['店内外の反応差・避難後の落ち着き・交差点の波形を調べる。','黒い星灯の痕跡を記録するが、角の女性を原因と断定しない。'],report:'住民を守りながら擬似体を鎮め、黒い星灯の痕跡を追跡する。'},
  q23:{lead:'灯台守の日誌と古い設計図を照合し、点灯記録の空白と未確認の配線を安全に調べる。',clues:['点灯していない時刻の光と配線痕を照合する。','宿泊記録と手紙を区別し、試験前の設備分離を確認する。'],report:'危険な旧配線を切り離し、正式点灯の判断を急がない。'},
  q24:{lead:'試験灯を安全停止しても旧灯台の残響は消えない。イブキの警告と黒い星灯を調べ、舞台の契約者と向き合う。',clues:['イブキの証言、試験前から続く異常、退避路を照合する。','黒い星灯の出現時刻を追うが、警告だけで相手の正体や原因を断定しない。'],report:'避難と設備停止を優先し、舞台での戦闘後も正式点灯の可否は保留する。'}
 };
 Object.keys(questText).forEach(id=>{
  const q=QUEST_BY_ID[id];if(!q)return;
  q.lead=questText[id].lead;q.clues=[...questText[id].clues];q.report=questText[id].report;
 });
 const cases=CHAPTER4_INVESTIGATION_CASES;
 if(cases.q19){cases.q19.clues.find(c=>c.id==='q19b').text+=' 箱の別包みには角のある古い衣装があり、トワは姉が縫ったものだと証言した。';}
 if(cases.q22){cases.q22.clues.find(c=>c.id==='q22c').text+=' 花飾りの屋根で黒い星灯が観測されたが、目撃した女性との因果関係は不明。';}
 if(cases.q24){cases.q24.clues.find(c=>c.id==='q24a').text+=' イブキは声の主を知らず、黒い星灯との接触は途絶えている。';}
 // Stage 4 final wave only. The existing enemy and battle calculations are retained for all other waves.
 if(typeof makeWave==='function'){
  const originalMakeWave=makeWave;
  makeWave=function(q,idx){
   const original=originalMakeWave(q,idx);
   if(q?.id!=='q24'||idx!==q.waves-1)return original;
   const boss=original.find(e=>e.kind==='boss')||original[original.length-1];
   if(!boss)return original;
   const real={...boss,id:'haruka-real',name:'霧島ハルカ【本体・赤い角】',harukaRole:'real',x:82,y:52,icon:'◆'};
   const sideMax=Math.max(1,Math.round(boss.max*.23));
   const sideAtk=Math.max(1,Math.round(boss.atk*.48));
   const shadow=i=>({...boss,id:'haruka-shadow-'+i,name:'仮面の影'+i,harukaRole:'shadow',kind:'normal',elite:false,icon:'◇',max:sideMax,hp:sideMax,atk:sideAtk,damageReduction:0,interval:2.8,x:i===1?66:92,y:i===1?35:74});
   if(typeof logBattle==='function'&&typeof battle!=='undefined'&&battle)logBattle('黒い星灯の契約者・ハルカ出現！ 赤く光る角が本体の目印。影は本体を回復する。');
   return [shadow(1),real,shadow(2)];
  };
 }
 // In the legacy real-time battle, a hit on Haruka weakens the shadows' following heal.
 if(typeof allyAttackDamage==='function'){
  const oldAllyAttackDamage=allyAttackDamage;
  allyAttackDamage=function(e,raw,options){const dealt=oldAllyAttackDamage(e,raw,options);const b=typeof battle!=='undefined'?battle:null;
   if(b&&b.qid==='q24'&&b.wave===b.totalWaves-1&&e?.harukaRole==='real'&&dealt>0){b.harukaLastHitAt=b.sim;}
   return dealt;
  };
 }
 // The existing enemy-art resolver is frozen in v0.34.57; do not mutate it.
 // Set Haruka's art on the rendered q24 enemy buttons instead.
 function fight(){return typeof battle!=='undefined'&&battle&&!battle.done&&battle.qid==='q24'&&battle.wave===battle.totalWaves-1?battle:null;}
 function dispel(b){if(!b||!b.enemies?.some(e=>e.harukaRole==='real'&&e.hp<=0))return;for(const e of b.enemies){if(e.harukaRole==='shadow'&&e.hp>0)e.hp=0;}}
 if(typeof tbStrike==='function'){
  const oldStrike=tbStrike;
  tbStrike=function(i,e,base,pierce){const damage=oldStrike(i,e,base,pierce);const b=fight();if(b&&e?.harukaRole==='real'){b.harukaHitRound=b.tb?.round||0;dispel(b);}return damage;};
 }
 if(typeof tbEnemyMove==='function'){
  const oldMove=tbEnemyMove;
  tbEnemyMove=function(i){
   const b=fight(),e=b?.enemies?.[i];
   if(b?.turnBattle&&e?.harukaRole==='shadow'&&e.hp>0&&!e.breakSkips&&!e.stunRounds){
    const real=b.enemies.find(x=>x.harukaRole==='real');
    if(real&&real.hp>0){
     const reduced=b.harukaHitRound===b.tb?.round;
     const gain=Math.min(real.max-real.hp,Math.max(1,Math.round(real.max*(reduced?.006:.025))));
     if(gain>0){real.hp+=gain;logBattle(`${e.name}の黒い星灯 → ハルカ HP +${gain}${reduced?'（本体への攻撃で弱体化）':''}`);}
    }
   }
   return oldMove(i);
  };
 }
 if(typeof tbRender==='function'){
  const oldRender=tbRender;
  tbRender=function(){const out=oldRender();const b=fight();if(!b?.turnBattle)return out;
   const cards=document.querySelectorAll('.tb-enemy');cards.forEach((el,i)=>{
    const e=b.enemies[i];if(e?.harukaRole==='shadow'){
     el.style.borderStyle='dashed';el.style.opacity=e.hp>0?'.78':'.42';
     let img=el.querySelector('.tb-enemy-art-thumb');if(!img){const icon=el.querySelector('.tb-enemy-icon');if(icon){img=document.createElement('img');img.className='tb-enemy-art-thumb';img.alt='仮面の影';icon.replaceChildren(img);}}if(img)setEnemyArt(img,true);
     el.title='仮面の影。赤く光る角はない。本体を回復する。';
    }else if(e?.harukaRole==='real'){
     el.style.border='2px solid #d7687f';let img=el.querySelector('.tb-enemy-art-thumb');if(!img){const icon=el.querySelector('.tb-enemy-icon');if(icon){img=document.createElement('img');img.className='tb-enemy-art-thumb';img.alt='霧島ハルカ';icon.replaceChildren(img);}}if(img)setEnemyArt(img,false);el.title='赤く光る角と黒い星灯の核。本体を攻撃すると分身の回復が弱まる。';
    }
   });return out;
  };
 }
 if(typeof renderCombatFrame==='function'){
  const oldFrame=renderCombatFrame;
  renderCombatFrame=function(full){
   const b=fight();if(b){dispel(b);
    if(!b.turnBattle&&b.phase==='fight'){
     const real=b.enemies.find(e=>e.harukaRole==='real'),shadows=b.enemies.filter(e=>e.harukaRole==='shadow'&&e.hp>0);
     if(real&&real.hp>0&&shadows.length){
      if(b.harukaNextHeal==null)b.harukaNextHeal=b.sim+6;
      if(b.sim>=b.harukaNextHeal){const reduced=b.harukaLastHitAt!=null&&b.sim-b.harukaLastHitAt<=6;const gain=Math.min(real.max-real.hp,Math.round(real.max*(reduced?.003:.012)*shadows.length));real.hp+=gain;b.harukaNextHeal=b.sim+6;if(gain)logBattle(`仮面の影の回復支援 → ハルカ HP +${gain}`);}
     }
    }
   }
   const out=oldFrame(full);
   if(b&&!b.turnBattle){
    document.querySelectorAll('#arena .token.enemy').forEach((el,i)=>{
     const e=b.enemies[i];if(!e?.harukaRole)return;
     const face=el.querySelector('.face');if(face){
      const img=document.createElement('img');img.alt=e.name;img.style.cssText='width:100%;height:100%;object-fit:contain';setEnemyArt(img,e.harukaRole==='shadow');
      face.replaceChildren(img);
     }
     el.style.border=e.harukaRole==='real'?'2px solid #d7687f':'1px dashed #8690a6';
    });
   }
   return out;
  };
 }
 if(typeof window!=='undefined')window.YoiHarukaChapter4={version:'0.34.58.0',scenes:['q19_intro','towa_meet','q22_intro','q24_pre','q24','chapter4_end'],boss:'q24:last-wave',shadowArt};
})();
