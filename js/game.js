const KEY='yoiboshi-reboot-v1',OLD_KEY='yoiboshi-contract-v01';
const PEOPLE={koharu:{name:'ビジュアル候補28',note:'ベージュボブ・白ドットワンピ／設定未確定',intro:'採用立ち絵（ベージュボブ・白ドットワンピ）。名前・性格・恋愛設定・所属は未確定です。',lines:['採用済みの立ち絵をゲーム内で確認できます。','正式なプロフィールは今後決定します。']},lilith:{name:'ビジュアル候補29',note:'黒白ツインテール／設定未確定',intro:'採用立ち絵（黒白ツインテール）。名前・性格・恋愛設定・所属は未確定です。',lines:['採用済みの立ち絵をゲーム内で確認できます。','正式なプロフィールは今後決定します。']},shio:{name:'ビジュアル候補30',note:'ピンクショート・青レーシング水着／設定未確定',intro:'採用立ち絵（ピンクショート・青レーシング水着）。名前・性格・恋愛設定・所属は未確定です。',lines:['採用済みの立ち絵をゲーム内で確認できます。','正式なプロフィールは今後決定します。']},kaname:{name:'ビジュアル候補31',note:'黒髪紫メッシュ・ピンクゴシック／設定未確定',intro:'採用立ち絵（黒髪紫メッシュ・ピンクゴシック）。名前・性格・恋愛設定・所属は未確定です。',lines:['採用済みの立ち絵をゲーム内で確認できます。','正式なプロフィールは今後決定します。']},koyori:{name:'ビジュアル候補32',note:'ピンクベージュボブ・黒ジャンパースカート／設定未確定',intro:'採用立ち絵（ピンクベージュボブ・黒ジャンパースカート）。名前・性格・恋愛設定・所属は未確定です。',lines:['採用済みの立ち絵をゲーム内で確認できます。','正式なプロフィールは今後決定します。']},marin:{name:'ビジュアル候補33',note:'金髪・黄色水色ギンガム水着／設定未確定',intro:'採用立ち絵（金髪・黄色水色ギンガム水着）。名前・性格・恋愛設定・所属は未確定です。',lines:['採用済みの立ち絵をゲーム内で確認できます。','正式なプロフィールは今後決定します。']},erika:{name:'ビジュアル候補34',note:'金髪・黒服（マスクなし）／設定未確定',intro:'採用立ち絵（金髪・黒服（マスクなし））。名前・性格・恋愛設定・所属は未確定です。',lines:['採用済みの立ち絵をゲーム内で確認できます。','正式なプロフィールは今後決定します。']},tsubaki:{name:'ビジュアル候補35',note:'黒髪ロング・赤カーデ花柄ワンピ／設定未確定',intro:'採用立ち絵（黒髪ロング・赤カーデ花柄ワンピ）。名前・性格・恋愛設定・所属は未確定です。',lines:['採用済みの立ち絵をゲーム内で確認できます。','正式なプロフィールは今後決定します。']},kaede:{name:'ビジュアル候補36',note:'長黒髪・赤カーデ花柄ドレス／設定未確定',intro:'採用立ち絵（長黒髪・赤カーデ花柄ドレス）。名前・性格・恋愛設定・所属は未確定です。',lines:['採用済みの立ち絵をゲーム内で確認できます。','正式なプロフィールは今後決定します。']},riko:{name:'ビジュアル候補18',note:'黒レース長髪／人物設定未確定',intro:'黒レース長髪の新規イラスト候補。名前・職業・性格・恋愛設定は未確定です。',lines:['新しい立ち絵を確認できます。','正式なプロフィールは今後決定します。']},noel:{name:'ビジュアル候補19',note:'ブルーフリルメイド／人物設定未確定',intro:'ブルーフリルメイドの新規イラスト候補。名前・職業・性格・恋愛設定は未確定です。',lines:['新しい立ち絵を確認できます。','正式なプロフィールは今後決定します。']},mio:{name:'ビジュアル候補20',note:'青黒ツートン猫耳／人物設定未確定',intro:'青黒ツートン猫耳の新規イラスト候補。名前・職業・性格・恋愛設定は未確定です。',lines:['新しい立ち絵を確認できます。','正式なプロフィールは今後決定します。']},jun:{name:'ビジュアル候補21',note:'ネオングリーン／人物設定未確定',intro:'ネオングリーンの新規イラスト候補。名前・職業・性格・恋愛設定は未確定です。',lines:['新しい立ち絵を確認できます。','正式なプロフィールは今後決定します。']},yume:{name:'ビジュアル候補22',note:'茶髪ウェーブ花柄／人物設定未確定',intro:'茶髪ウェーブ花柄の新規イラスト候補。名前・職業・性格・恋愛設定は未確定です。',lines:['新しい立ち絵を確認できます。','正式なプロフィールは今後決定します。']},shino:{name:'ビジュアル候補23',note:'黒髪ゴシックハーネス／人物設定未確定',intro:'黒髪ゴシックハーネスの新規イラスト候補。名前・職業・性格・恋愛設定は未確定です。',lines:['新しい立ち絵を確認できます。','正式なプロフィールは今後決定します。']},hiyori:{name:'ビジュアル候補24',note:'ピンクボブ／人物設定未確定',intro:'ピンクボブの新規イラスト候補。名前・職業・性格・恋愛設定は未確定です。',lines:['新しい立ち絵を確認できます。','正式なプロフィールは今後決定します。']},ageha:{name:'ビジュアル候補25',note:'茶髪ブラックゴス／人物設定未確定',intro:'茶髪ブラックゴスの新規イラスト候補。名前・職業・性格・恋愛設定は未確定です。',lines:['新しい立ち絵を確認できます。','正式なプロフィールは今後決定します。']},kirari:{name:'ビジュアル候補26',note:'黄色アイドル／人物設定未確定',intro:'黄色アイドルの新規イラスト候補。名前・職業・性格・恋愛設定は未確定です。',lines:['新しい立ち絵を確認できます。','正式なプロフィールは今後決定します。']},maron:{name:'ビジュアル候補27',note:'ピンクサイドポニー／人物設定未確定',intro:'ピンクサイドポニーの新規イラスト候補。名前・職業・性格・恋愛設定は未確定です。',lines:['新しい立ち絵を確認できます。','正式なプロフィールは今後決定します。']},yui:{name:"ビジュアル候補08",note:'外見のみ採用／設定未決定',intro:'採用イラストを使った試遊用キャラクターです。名前・役割・所属・性格・衣装設定は未決定です。',lines:['仮の会話です。キャラクター設定はこれから決めます。','この衣装と雰囲気を、今はゲームで確認できます。','一緒に試遊してみましょう。']},shizuku:{name:"ビジュアル候補09",note:'外見のみ採用／設定未決定',intro:'採用イラストを使った試遊用キャラクターです。名前・役割・所属・性格・衣装設定は未決定です。',lines:['仮の会話です。キャラクター設定はこれから決めます。','この衣装と雰囲気を、今はゲームで確認できます。','一緒に試遊してみましょう。']},suiran:{name:"ビジュアル候補10",note:'外見のみ採用／設定未決定',intro:'採用イラストを使った試遊用キャラクターです。名前・役割・所属・性格・衣装設定は未決定です。',lines:['仮の会話です。キャラクター設定はこれから決めます。','この衣装と雰囲気を、今はゲームで確認できます。','一緒に試遊してみましょう。']},kyoko:{name:"ビジュアル候補11",note:'外見のみ採用／設定未決定',intro:'採用イラストを使った試遊用キャラクターです。名前・役割・所属・性格・衣装設定は未決定です。',lines:['仮の会話です。キャラクター設定はこれから決めます。','この衣装と雰囲気を、今はゲームで確認できます。','一緒に試遊してみましょう。']},cocoa:{name:"ビジュアル候補12",note:'外見のみ採用／設定未決定',intro:'採用イラストを使った試遊用キャラクターです。名前・役割・所属・性格・衣装設定は未決定です。',lines:['仮の会話です。キャラクター設定はこれから決めます。','この衣装と雰囲気を、今はゲームで確認できます。','一緒に試遊してみましょう。']},mai:{name:"ビジュアル候補13",note:'外見のみ採用／設定未決定',intro:'採用イラストを使った試遊用キャラクターです。名前・役割・所属・性格・衣装設定は未決定です。',lines:['仮の会話です。キャラクター設定はこれから決めます。','この衣装と雰囲気を、今はゲームで確認できます。','一緒に試遊してみましょう。']},luna:{name:"ビジュアル候補14",note:'外見のみ採用／設定未決定',intro:'採用イラストを使った試遊用キャラクターです。名前・役割・所属・性格・衣装設定は未決定です。',lines:['仮の会話です。キャラクター設定はこれから決めます。','この衣装と雰囲気を、今はゲームで確認できます。','一緒に試遊してみましょう。']},makoto:{name:"ビジュアル候補15",note:'外見のみ採用／設定未決定',intro:'採用イラストを使った試遊用キャラクターです。名前・役割・所属・性格・衣装設定は未決定です。',lines:['仮の会話です。キャラクター設定はこれから決めます。','この衣装と雰囲気を、今はゲームで確認できます。','一緒に試遊してみましょう。']},fumika:{name:"ビジュアル候補16",note:'外見のみ採用／設定未決定',intro:'採用イラストを使った試遊用キャラクターです。名前・役割・所属・性格・衣装設定は未決定です。',lines:['仮の会話です。キャラクター設定はこれから決めます。','この衣装と雰囲気を、今はゲームで確認できます。','一緒に試遊してみましょう。']},ena:{name:"ビジュアル候補17",note:'外見のみ採用／設定未決定',intro:'採用イラストを使った試遊用キャラクターです。名前・役割・所属・性格・衣装設定は未決定です。',lines:['仮の会話です。キャラクター設定はこれから決めます。','この衣装と雰囲気を、今はゲームで確認できます。','一緒に試遊してみましょう。']},akane:{name:'藤崎 朱音',note:'市役所・防災／避難支援担当',intro:'困っている人がいたら、私が守るよ！',lines:['お疲れさま！ 今日も一緒に頑張ろう！','いざというときこそ笑顔だよ。私がついてる！','みんなが安心できる街にしたいんだ。']},reina:{name:'黒瀬 玲奈',note:'宵星相談室・現場調査スタッフ',intro:'静かに見えても、負けるつもりはありません。現場は私が切り開きます。',lines:['現場の違和感、ちゃんと拾っていきます。','大丈夫です。まだ、ここから巻き返せます。','一歩ずつでも、結果で見せます。']},aoi:{name:'瀬名 葵',note:'宵星相談室・正式スタッフ',intro:'小さな変化にも、きちんと気づいていたいんです。',lines:['疲れていませんか？　少し休憩しましょう。','無理はしないでくださいね。私も一緒に考えます。','できることから、一つずつ進めましょう。']},chinatsu:{name:'篠原 千夏',note:'街の外部協力者',intro:'困ったときは頼って。ひとりで抱え込まなくていいからね。',lines:['お疲れ！ 今日も一日、よく頑張ったね。','気になることがあったら話してよ。力になるから。','大丈夫。みんなで力を合わせれば、きっと何とかなるよ！']},nagi:{name:'白峰 凪',note:'謎の外部協力者',intro:'……必要なら、力を貸す。理由は聞かないで。',lines:['……何か用？　必要なら話して。','異変の痕跡は……まだ消えていない。','あなたがいると、少しだけ静かになれる。']},momoka:{name:'桜井 ももか',note:'商店街の協力者',intro:'街のお困りごとは、いっしょに頑張ろう！',lines:['ねえ、今日の予定は？ 私も手伝うよ。','この街、楽しいことがいっぱいあるよね。','いつか一緒に、のんびりお散歩しようね。']},milku:{name:'白石 みるく',note:'カフェ勤務・外部協力者',intro:'お疲れさまです。温かい飲み物はいかがですか？',lines:['おかえりなさい。今日はどんな一日でしたか？','力になれることがあったら、言ってくださいね。','少しだけ、ふたりで休憩しませんか？']}};
// Ver.0.13.0.0 — only these four previously provisional identities become named heroines.
for(const id of ['hiyori','koyori','kirari','maron']){
 const p=ROMANCE_SHINONOME[id].profile;
 PEOPLE[id]={...PEOPLE[id],name:p.name,note:`${p.occupation}／恋愛対象（正式登録）`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:ROMANCE_SHINONOME[id].moods.normal.slice(0,3)};
}
// Ver.0.14.0.0 — only these four older visual candidates become named heroines.
for(const id of ['suiran','cocoa','ageha','lilith']){
 const p=ROMANCE_OLDCAFE[id].profile;
 PEOPLE[id]={...PEOPLE[id],name:p.name,note:`${p.occupation}／恋愛対象（正式登録）`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:ROMANCE_OLDCAFE[id].moods.normal.slice(0,3)};
}
// Ver.0.17.0.0 — six station-front candidates become named heroines; preserve their canonical art.
for(const id of ['yui','riko','koharu','luna','mio','jun']){
 const p=ROMANCE_STATION[id].profile;
 PEOPLE[id]={...PEOPLE[id],name:p.name,note:`${p.occupation}／恋愛対象（正式登録）`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:ROMANCE_STATION[id].moods.normal.slice(0,3)};
}
// Ver.0.18.0.0 five newly named heroines, original candidate portrait files untouched.
for(const id of ['fumika','kyoko','makoto','shino','shizuku']){
 const p=ROMANCE_SCHOOL[id].profile;
 PEOPLE[id]={...PEOPLE[id],name:p.name,note:`${p.occupation}／正式ヒロイン`,intro:`${p.name}（${p.age}歳）。${p.personality}`,lines:ROMANCE_SCHOOL[id].moods.normal.slice(0,3)};
}
// v0.19 seaside cast, original images and existing character records remain unchanged.
for(const id of ['ena','mai','shio','marin']){
 const p=ROMANCE_SEASIDE[id].profile;
 PEOPLE[id]={...PEOPLE[id],name:p.name,note:`${p.occupation}／正式ヒロイン`,intro:`${p.name}（${p.age}歳）。${p.personality}`,lines:ROMANCE_SEASIDE[id].moods.normal.slice(0,3)};
}
// Ver.0.20.0.0 — the last two Chapter 1 heroines retain their source portraits.
for(const id of ['noel','yume']){
 const p=ROMANCE_LIGHTHOUSE[id].profile;
 PEOPLE[id]={...PEOPLE[id],name:p.name,note:`${p.occupation}／正式ヒロイン`,intro:`${p.name}（${p.age}歳）。${p.personality}`,lines:ROMANCE_LIGHTHOUSE[id].moods.normal.slice(0,3)};
}
// All four rarities share role-based base stat tables; rarity never modifies combat power.
const ROLES={attacker:{name:'アタッカー',hp:125,atk:19,def:3,rate:1.25},tank:{name:'タンク',hp:225,atk:9,def:8,rate:1.45},healer:{name:'ヒーラー',hp:148,atk:9,def:5,rate:1.65},support:{name:'サポーター',hp:165,atk:11,def:5,rate:1.45}};
// Chapter 2 first-half heroines. Never overwrite trial IDs, which are preserved for existing saves.
for(const id of ['tsubaki','erika']){
 const p=ROMANCE_CHAPTER2[id].profile;
 PEOPLE[id]={...PEOPLE[id],name:p.name,note:`${p.occupation}／恋愛対象（正式登録）`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:ROMANCE_CHAPTER2[id].moods.normal.slice(0,3)};
}
// The first-half heroine registry remains unchanged; new heroines have separate identities from preserved trial units.
for(const id of ['kaname','kaede']){const p=ROMANCE_CHAPTER2_LATE[id].profile;PEOPLE[id]={...PEOPLE[id],name:p.name,note:`${p.occupation}／正式ヒロイン`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:ROMANCE_CHAPTER2_LATE[id].moods.normal.slice(0,3)}}
// v0.27: preregistered, unrevealed Chapter 3 heroines (no encounter event in this version).
let v027GameReady=false;
for(const id of NEW_HERO_IDS_V027){const h=ROMANCE_V027[id],p=h.profile;PEOPLE[id]={name:p.name,note:`${p.occupation}／正式ヒロイン（第3章で出会い）`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:h.moods.normal.slice(0,3),tomoshibi:TOMOSHIBI_V027[id]};}
for(const [id,flame] of Object.entries(TOMOSHIBI_V027)){if(PEOPLE[id])PEOPLE[id].tomoshibi=flame;}
// v0.28: Chapter 4 candidates remain unrevealed until a future story sets chapter4Met.
for(const id of NEW_HERO_IDS_V028){const h=ROMANCE_V028[id],p=h.profile;PEOPLE[id]={name:p.name,note:`${p.occupation}／正式ヒロイン（第4章で出会い）`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:h.moods.normal.slice(0,3),tomoshibi:TOMOSHIBI_V028[id]};}
// v0.42.0.0: 第6〜7章・第1部クリア後のヒロイン
for(const id of NEW_HERO_IDS_V0420){const h=ROMANCE_V0420[id],p=h.profile;PEOPLE[id]={name:p.name,note:`${p.occupation}／正式ヒロイン`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:h.moods.normal.slice(0,3),tomoshibi:TOMOSHIBI_V0420[id]};}
// v0.50: additional roster only. Existing PEOPLE entries remain intact.
for(const id of NEW_HERO_IDS_V0500){const h=ROMANCE_V0500[id],p=h.profile;PEOPLE[id]={name:p.name,note:`${p.occupation}／正式ヒロイン（仮レアリティ）`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:h.moods.normal.slice(0,3),tomoshibi:TOMOSHIBI_V0500[id]};}
for(const id of NEW_HERO_IDS_V0690){const h=ROMANCE_V0690[id],p=h.profile;PEOPLE[id]={name:p.name,note:`${p.occupation}／新ヒロイン`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:h.moods.normal.slice(0,3),tomoshibi:TOMOSHIBI_V0690[id]||TOMOSHIBI_V0692[id]};}
for(const id of NEW_HERO_IDS_V0692){const h=ROMANCE_V0692[id],p=h.profile;PEOPLE[id]={name:p.name,note:`${p.occupation}／新ヒロイン`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:h.moods.normal.slice(0,3),tomoshibi:TOMOSHIBI_V0692[id]};}
for(const id of NEW_HERO_IDS_V0750){const h=ROMANCE_V0750[id],p=h.profile;PEOPLE[id]={name:p.name,note:`${p.occupation}／新ヒロイン`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:h.moods.normal.slice(0,3),tomoshibi:TOMOSHIBI_V0750[id]};}
for(const id of NEW_HERO_IDS_V0760){const h=ROMANCE_V0760[id],p=h.profile;PEOPLE[id]={name:p.name,note:`${p.occupation}／新ヒロイン`,intro:`${p.name}（${p.age}歳）。${p.personality}。`,lines:h.moods.normal.slice(0,3),tomoshibi:TOMOSHIBI_V0760[id]};}
// Unrevealed identities are not available for recruitment or interaction until a future chapter explicitly marks chapter3Met[id].
function isV027HeroRevealed(id,save=S){return !!save?.chapter3Met?.[id];}
function isV028HeroRevealed(id,save=S){return save?.chapter4Met?.[id]===true;}
const UNITS=[
{id:'koharu_trial',person:'koharu',title:'採用画像試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'lilith_trial',person:'lilith',title:'採用画像試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'shio_trial',person:'shio',title:'採用画像試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'kaname_trial',person:'kaname',title:'採用画像試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'koyori_trial',person:'koyori',title:'採用画像試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'marin_trial',person:'marin',title:'採用画像試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'erika_trial',person:'erika',title:'採用画像試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'tsubaki_trial',person:'tsubaki',title:'採用画像試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'kaede_trial',person:'kaede',title:'採用画像試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'yui_trial',person:'yui',title:'イラスト先行登録',rarity:'R',role:'healer',color:'#b48c7e',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'shizuku_trial',person:'shizuku',title:'イラスト先行登録',rarity:'SR',role:'attacker',color:'#a973bb',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'suiran_trial',person:'suiran',title:'イラスト先行登録',rarity:'R',role:'support',color:'#bbc3d7',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'kyoko_trial',person:'kyoko',title:'イラスト先行登録',rarity:'SR',role:'tank',color:'#c9a269',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'cocoa_trial',person:'cocoa',title:'イラスト先行登録',rarity:'SR',role:'healer',color:'#8ca3db',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'mai_trial',person:'mai',title:'イラスト先行登録',rarity:'SSR',role:'attacker',color:'#a48bd1',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'luna_trial',person:'luna',title:'イラスト先行登録',rarity:'SR',role:'support',color:'#ae7cd0',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'makoto_trial',person:'makoto',title:'イラスト先行登録',rarity:'R',role:'tank',color:'#7c9db0',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'fumika_trial',person:'fumika',title:'イラスト先行登録',rarity:'SSR',role:'support',color:'#dfb482',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'ena_trial',person:'ena',title:'イラスト先行登録',rarity:'UR',role:'attacker',color:'#65b9a3',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'riko_trial',person:'riko',title:'新規イラスト試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'noel_trial',person:'noel',title:'新規イラスト試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'mio_trial',person:'mio',title:'新規イラスト試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'jun_trial',person:'jun',title:'新規イラスト試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'yume_trial',person:'yume',title:'新規イラスト試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'shino_trial',person:'shino',title:'新規イラスト試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'hiyori_trial',person:'hiyori',title:'新規イラスト試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'ageha_trial',person:'ageha',title:'新規イラスト試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'kirari_trial',person:'kirari',title:'新規イラスト試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},
{id:'maron_trial',person:'maron',title:'新規イラスト試遊',rarity:'R',role:'support',color:'#8c96b8',s:['仮スキルⅠ','仮スキルⅡ']},

{id:'momoka_daily',person:'momoka',title:'いつもの一日',rarity:'R',role:'attacker',color:'#fbabc6',s:['元気な一撃','みんな、がんばろ！']},
{id:'momoka_work',person:'momoka',title:'相談室のお手伝い',rarity:'SR',role:'support',color:'#d1a7f9',s:['元気をお届け','ちょっと待って！']},
{id:'momoka_sky',person:'momoka',title:'青空の約束',rarity:'SSR',role:'healer',color:'#7dcef1',s:['応急サポート','大丈夫だよ！']},
{id:'momoka_star',person:'momoka',title:'星灯のきらめき',rarity:'UR',role:'tank',color:'#ffd18c',s:['笑顔のバリア','ここは任せて！']},
{id:'milku_daily',person:'milku',title:'カフェのひととき',rarity:'R',role:'support',color:'#f6a1bb',s:['お飲み物です','ひとやすみ']},
{id:'milku_work',person:'milku',title:'いつもの帰り道',rarity:'SR',role:'healer',color:'#b5ddfb',s:['お手当てします','みんなの笑顔']},
{id:'milku_sky',person:'milku',title:'午後のティータイム',rarity:'SSR',role:'tank',color:'#daa3fb',s:['お守りします','ご心配なく']},
{id:'milku_star',person:'milku',title:'大切な約束',rarity:'UR',role:'attacker',color:'#f7c57b',s:['凛とした一撃','心を込めて']},
 {id:'nagi_dusk',person:'nagi',title:'紅の境界',rarity:'R',role:'support',color:'#cd657b',s:['星灯の結界','紅糸の封縛']},
 {id:'chinatsu_daily',person:'chinatsu',title:'街角の頼れる味方',rarity:'R',role:'support',color:'#b692dd',s:['みんな、ついてきて！','ここは任せて！']},
 {id:'aoi_daily',person:'aoi',title:'相談室のやすらぎ',rarity:'R',role:'healer',color:'#78c9b5',s:['やすらぎの灯','みんなの手当て']},
 {id:'akane_daily',person:'akane',title:'街を守るオレンジの盾',rarity:'R',role:'tank',color:'#ff964a',s:['守りのフィールド','みんなの前へ！']},
 {id:'reina_daily',person:'reina',title:'静かな闘志',rarity:'R',role:'attacker',color:'#7f93d8',s:['影踏みの一閃','現場制圧ライン']},
 {id:"hiyori_daily",person:"hiyori",title:"パティスリー桃瀬の日常",rarity:"R",role:"healer",color:"#e9a4b7",s:["焼きたてのひと息", "試作ケーキの差し入れ"]},
 {id:"koyori_daily",person:"koyori",title:"看板娘の寄り道",rarity:"R",role:"attacker",color:"#e5a1ba",s:["シャッターチャンス", "笑顔の連続ショット"]},
 {id:"kirari_daily",person:"kirari",title:"商店街PR大使",rarity:"R",role:"tank",color:"#e8c25e",s:["全力応援ガード", "最後まで走りきる！"]},
 {id:"maron_daily",person:"maron",title:"花言葉の贈りもの",rarity:"R",role:"healer",color:"#c28da9",s:["朝露の花びら", "やさしい花束"]},
 {id:"suiran_daily",person:"suiran",title:"翠月の茶房",rarity:"R",role:"support",color:"#81ada5",s:["翠月の茶香", "茶葉の示す隙"]},
 {id:"cocoa_daily",person:"cocoa",title:"星屑亭の素顔",rarity:"R",role:"attacker",color:"#8da3db",s:["営業スマイルの一手", "本気の接客コンボ"]},
 {id:"ageha_daily",person:"ageha",title:"夜色ネイル",rarity:"R",role:"attacker",color:"#b07caa",s:["見抜く視線", "夜色のフィニッシュ"]},
 {id:"lilith_daily",person:"lilith",title:"黒薔薇館のリボン",rarity:"R",role:"tank",color:"#71618e",s:["黒薔薇の守護", "リボンの結界"]},
 {id:"yui_daily",person:"yui",title:"書店員のしおり",rarity:"R",role:"support",color:"#b19b8b",s:["しおりを挟んで","ちゃんと聞いてます?"]},
 {id:"riko_daily",person:"riko",title:"恋バナ相談室",rarity:"R",role:"support",color:"#bc8da9",s:["それ、似合ってる!","恋バナタイム"]},
 {id:"koharu_daily",person:"koharu",title:"朝のフロント",rarity:"R",role:"healer",color:"#95a7b8",s:["おもてなしの心","お部屋のご用意"]},
 {id:"luna_daily",person:"luna",title:"地下から届く歌",rarity:"R",role:"attacker",color:"#8c71b6",s:["夜明けのシャウト","アンコール"]},
 {id:"mio_daily",person:"mio",title:"画面の向こうから",rarity:"R",role:"attacker",color:"#659fb4",s:["配信開始!","コメント弾幕"]},
 {id:"jun_daily",person:"jun",title:"夜明けの配達便",rarity:"R",role:"tank",color:"#78ae96",s:["割り込みブロック","エンジン全開"]},
 {id:"shizuku_daily",person:"shizuku",title:"レンズを下ろす日",rarity:"R",role:"support",color:"#8bafd0",s:["フラッシュ撮影","ベストショット"]},
 {id:"shino_daily",person:"shino",title:"借りは必ず返す",rarity:"R",role:"attacker",color:"#6f6a87",s:["脆弱性スキャン","総当たり"]},
 {id:"makoto_daily",person:"makoto",title:"数字の向こうの守り",rarity:"R",role:"tank",color:"#7f9aa8",s:["書類の壁","窓口はこちら"]},
 {id:"kyoko_daily",person:"kyoko",title:"取材の向こう側",rarity:"R",role:"attacker",color:"#bf8666",s:["スクープ激写","号外だ!"]},
 {id:"fumika_daily",person:"fumika",title:"記録の余白",rarity:"R",role:"healer",color:"#c6a17e",s:["やさしい読み聞かせ","物語の続き"]},
 {id:"rico_show",person:"ena",title:"一人の観客へ",rarity:"R",role:"attacker",color:"#eaa770",s:["ショータイム","フィナーレの花火"]},
 {id:"mai_wind",person:"mai",title:"旅の風の行方",rarity:"R",role:"support",color:"#a887c8",s:["風の舞","幻惑のステップ"]},
 {id:"shio_pool",person:"shio",title:"新しいスタート",rarity:"R",role:"tank",color:"#65a7db",s:["水しぶきガード","プールサイドの盾"]},
 {id:"shio_daily",person:"shio",title:"いつもの汐",rarity:"R",role:"tank",color:"#65a7db",s:["先輩、任せてください！","みんなの前に立ちます！"]},
 {id:"marine_cafe",person:"marin",title:"海辺の本音",rarity:"R",role:"healer",color:"#e8af65",s:["特製トロピカルドリンク","ひと休みしてきな"]},
 {id:'noel_daily',person:'noel',title:'今を選ぶ白い星',rarity:'R',role:'support',color:'#adc7df',s:['白い星の祈り','流れ星']},
 {id:'yume_tomorrow',person:'yume',title:'今を歩く灯',rarity:'R',role:'healer',color:'#c8a7bb',s:['眠りの灯','夢の続き']},
 {id:'tsubaki_daily',person:'tsubaki',title:'伝承を追う足音',rarity:'R',role:'attacker',color:'#b87183',s:['突撃調査','諦めない一歩']},
 {id:'erika_daily',person:'erika',title:'仮面の向こうの素顔',rarity:'R',role:'support',color:'#b69bbf',s:['仮面の取引','とっておきの一杯']},
 {id:'kaname_daily',person:'kaname',title:'夜明けに残る約束',rarity:'R',role:'attacker',color:'#80638f',s:['紫電の一閃','八年分の刃']},
 {id:'kaede_daily',person:'kaede',title:'帰り道のしおり',rarity:'R',role:'healer',color:'#b16d81',s:['刺繍の守り','ほどけない糸']},
 // v0.35.0.0: R廃止に伴い、第2章の3人にSRユニットを追加（Rの役割・技名を引き継ぐ）
 {id:'tsubaki_work',person:'tsubaki',title:'伝承を追う足音',rarity:'SR',role:'attacker',color:'#b87183',s:['突撃調査','諦めない一歩']},
 {id:'erika_work',person:'erika',title:'仮面の向こうの素顔',rarity:'SR',role:'support',color:'#b69bbf',s:['仮面の取引','とっておきの一杯']},
 {id:'kaede_work',person:'kaede',title:'帰り道のしおり',rarity:'SR',role:'healer',color:'#b16d81',s:['刺繍の守り','ほどけない糸']}
];
// Additional outfits remain separate units; original 42 designs are untouched.
UNITS.push(...NEW_UNIT_ROSTER_V026,...NEW_UNIT_ROSTER_V027,...NEW_UNIT_ROSTER_V028,...NEW_UNIT_ROSTER_V0420,...NEW_UNIT_ROSTER_V0500,...NEW_UNIT_ROSTER_V0690,...NEW_UNIT_ROSTER_V0692,...NEW_UNIT_ROSTER_V0750,...NEW_UNIT_ROSTER_V0760);
// Approved R portraits are provided separately; retain preexisting restored R IDs in saves.
const APPROVED_R_UNIT_IDS=Object.freeze(["ageha_daily","akane_daily","anzu_daily","aoi_daily","chihiro_daily","chinatsu_daily","chiyo_daily","cocoa_daily","rico_show","erika_daily","fumika_daily","hiyori_daily","hotaru_daily","ichika_daily","jun_daily","kaede_daily","kagari_daily","kaname_daily","karen_daily","kirari_daily","koharu_daily","koyori_daily","kurumi_daily","kyoko_daily","lilith_daily","luna_daily","mai_wind","makoto_daily","marine_cafe","maron_daily","meru_daily","milku_daily","minori_daily","mio_daily","miyabi_daily","mizuki_daily","momoka_daily","nagi_dusk","natsume_daily","nazuna_daily","noel_daily","reiko_daily","reina_daily","riko_daily","ritsu_daily","saeko_daily","saki_daily","sanae_daily","sena_daily","shino_daily","shio_daily","shizuku_daily","suiran_daily","towa_daily","tsubaki_daily","yui_daily","yume_tomorrow","yuriko_daily","yuzu_daily"]);
const RESTORED_R_UNIT_IDS=new Set([...APPROVED_R_UNIT_IDS,'shio_pool']); // Keep the previous pool outfit without newly assigned portrait.
const BYID=Object.fromEntries(UNITS.map(x=>[x.id,x]));
// Conversion remains only for excluded legacy characters, preserving their existing behavior.
const RETIRED_R_TO_SR=Object.freeze(Object.fromEntries(UNITS.filter(u=>u.rarity==='R'&&!u.id.endsWith('_trial')&&!RESTORED_R_UNIT_IDS.has(u.id)).map(u=>[u.id,(UNITS.find(v=>v.person===u.person&&v.rarity==='SR'&&!v.id.endsWith('_trial'))||{}).id]).filter(([,v])=>!!v)));
const R2SR=id=>RETIRED_R_TO_SR[id]||id;
// Ver.0.49.2.0: legacy save migration ONLY. These old concept IDs are deliberately retained
// here for backward compatibility; all live registries must use canonical IDs.
const LEGACY_CONCEPT_IDS=Object.freeze({"concept08":"yui","concept09":"shizuku","concept10":"suiran","concept11":"kyoko","concept12":"cocoa","concept13":"mai","concept14":"luna","concept15":"makoto","concept16":"fumika","concept17":"ena","concept18":"riko","concept19":"noel","concept20":"mio","concept21":"jun","concept22":"yume","concept23":"shino","concept24":"hiyori","concept25":"ageha","concept26":"kirari","concept27":"maron","concept28":"koharu","concept29":"lilith","concept30":"shio","concept31":"kaname","concept32":"koyori","concept33":"marin","concept34":"erika","concept35":"tsubaki","concept36":"kaede"});
const canonicalSaveId=s=>s.replace(/concept(?:0[8-9]|[12]\d|3[0-6])/g,id=>LEGACY_CONCEPT_IDS[id]||id);
function mergeLegacyCanonicalSaveValue(current,legacy){
  if(current===undefined||current===null)return legacy;
  if(Array.isArray(current)&&Array.isArray(legacy)){
    return Array.from({length:Math.max(current.length,legacy.length)},(_,i)=>mergeLegacyCanonicalSaveValue(current[i],legacy[i]));
  }
  if(current&&legacy&&typeof current==='object'&&typeof legacy==='object'&&!Array.isArray(current)&&!Array.isArray(legacy)){
    const merged={...legacy,...current};
    for(const k of Object.keys(legacy))if(k in current)merged[k]=mergeLegacyCanonicalSaveValue(current[k],legacy[k]);
    return merged;
  }
  if(typeof current==='boolean'&&typeof legacy==='boolean')return current||legacy;
  if(typeof current==='number'&&typeof legacy==='number')return Math.max(current,legacy);
  return current===''?legacy:current;
}
function migrateLegacyConceptSave(raw){
  const convert=value=>{
    if(typeof value==='string')return canonicalSaveId(value);
    if(Array.isArray(value))return value.map(convert);
    if(value===null||typeof value!=='object')return value;
    const result={},pairs=Object.entries(value);
    // Canonical keys take precedence. Legacy keys fill gaps, combine progress,
    // and never overwrite an existing nonempty canonical string.
    for(const [oldKey,v] of [...pairs.filter(([key])=>canonicalSaveId(key)===key),...pairs.filter(([key])=>canonicalSaveId(key)!==key)]){
      const key=canonicalSaveId(oldKey),next=convert(v);
      result[key]=Object.prototype.hasOwnProperty.call(result,key)?mergeLegacyCanonicalSaveValue(result[key],next):next;
    }
    return result;
  };
  return convert(raw);
}

const RARITIES=Object.freeze(['R','SR','SSR','UR']);
function convertRetiredRSave(raw){
 if(!raw||typeof raw!=='object'||!raw.owned||typeof raw.owned!=='object'||Array.isArray(raw.owned))return raw;
 const out={...raw},owned={};
 for(const [id,e] of Object.entries(raw.owned)){ if(!RETIRED_R_TO_SR[id])owned[id]=e; }
 for(const [id,e] of Object.entries(raw.owned)){
  const to=RETIRED_R_TO_SR[id]; if(!to||!e||typeof e!=='object')continue;
  const cur=owned[to],num=(v,d=0)=>Number.isFinite(+v)?+v:d;
  if(!cur){owned[to]={...e};continue;}
  owned[to]={...cur,lv:Math.max(num(cur.lv,1),num(e.lv,1)),aff:Math.max(num(cur.aff),num(e.aff)),lb:Math.min(7,Math.max(num(cur.lb),num(e.lb))),copies:num(cur.copies)+num(e.copies)+1};
 }
 out.owned=owned;
 if(Array.isArray(raw.party)){const seen=new Set();out.party=raw.party.map(id=>typeof id==='string'?R2SR(id):id).filter(id=>{if(seen.has(id))return false;seen.add(id);return true;});}
 for(const k of ['selected','homeUnitId'])if(typeof raw[k]==='string')out[k]=R2SR(raw[k]);
 return out;
}

const NEW_VISUAL_LABELS=Object.freeze({koharu:'ベージュボブ・白ドットワンピ',lilith:'黒白ツインテール',shio:'ピンクショート・青レーシング水着',kaname:'黒髪紫メッシュ・ピンクゴシック',koyori:'ピンクベージュボブ・黒ジャンパースカート',marin:'金髪・黄色水色ギンガム水着',erika:'金髪・黒服（マスクなし）',tsubaki:'黒髪ロング・赤カーデ花柄ワンピ',kaede:'長黒髪・赤カーデ花柄ドレス',riko:'黒レース長髪',noel:'ブルーフリルメイド',mio:'青黒ツートン猫耳',jun:'ネオングリーン',yume:'茶髪ウェーブ花柄',shino:'黒髪ゴシックハーネス',hiyori:'ピンクボブ',ageha:'茶髪ブラックゴス',kirari:'黄色アイドル',maron:'ピンクサイドポニー'});
const SHINONOME_HERO_IDS=Object.freeze(['hiyori','koyori','kirari','maron']);
const OLDCAFE_HERO_IDS=Object.freeze(['suiran','cocoa','ageha','lilith']);
const STATION_HERO_IDS=Object.freeze(['yui','riko','koharu','luna','mio','jun']);
const SCHOOL_HERO_IDS=Object.freeze(['fumika','kyoko']);
const OFFICE_HERO_IDS=Object.freeze(['makoto','shino','shizuku']);
const NEW_Q4_HERO_IDS=Object.freeze([...SCHOOL_HERO_IDS,...OFFICE_HERO_IDS]);
const SEASIDE_HERO_IDS=Object.freeze(['ena','mai','shio','marin']);
const LIGHTHOUSE_HERO_IDS=Object.freeze(['noel','yume']);
const CHAPTER2_FIRST_HERO_IDS=Object.freeze(['tsubaki','erika']);
const CHAPTER2_LATE_HERO_IDS=Object.freeze(['kaname','kaede']);
const CHAPTER2_ALL_HERO_IDS=Object.freeze([...CHAPTER2_FIRST_HERO_IDS,...CHAPTER2_LATE_HERO_IDS]);
const DISTRICT_HERO_IDS=Object.freeze([...SHINONOME_HERO_IDS,...OLDCAFE_HERO_IDS,...STATION_HERO_IDS,...NEW_Q4_HERO_IDS,...SEASIDE_HERO_IDS,...LIGHTHOUSE_HERO_IDS,...CHAPTER2_ALL_HERO_IDS]);
// 第2章の未解放人物。旧セーブの所持・編成を保持するためUNITS/BYIDからは削除しない。
const CHAPTER2_RESERVED_CONCEPTS=Object.freeze(['tsubaki','erika','kaname','kaede']);
const isChapter2ReservedTrial=u=>!!u&&CHAPTER2_RESERVED_CONCEPTS.includes(u.person)&&u.id.endsWith('_trial');
const VISUAL_CANDIDATES=UNITS.filter(u=>/^concept\d+_trial$/.test(u.id)&&!DISTRICT_HERO_IDS.includes(u.person)&&!isChapter2ReservedTrial(u));
function candidateDisplayArt(id){if(candidatePreviewPose==='mask'&&ART_V2.full_body_mask?.[id])return ART_V2.full_body_mask[id];if(candidatePreviewPose==='dynamic'&&ART_V2.full_body_dynamic?.[id])return ART_V2.full_body_dynamic[id];return characterArt(id)}

// v0.16 per-unit artworks: fill with paths to approved unit-specific assets in later releases.
// An unset path always falls back to the existing character art; no source image is modified.
const RARITY_ART_POLICY=Object.freeze({R:'普段の立ち絵・背景なし',SR:'衣装違いの立ち絵・背景なし',SSR:'背景つきの一枚絵',UR:'特別衣装・演出の動的構図一枚絵'});
// v0.34.47.0: ももかのSR・SSR・UR（2026-10-18合格分）を登録
const MOMOKA_UNIT_ARTWORK_V03447=Object.freeze({momoka_work:{portrait:'assets/UNIT_ART/momoka_work.webp'},momoka_sky:{scene:'assets/UNIT_ART/momoka_sky.webp'},momoka_star:{scene:'assets/UNIT_ART/momoka_star.webp'}});
// v0.35.0.0: 第2章3人のSR
const CHAPTER2_SR_ARTWORK_V035=Object.freeze({tsubaki_work:{portrait:'assets/UNIT_ART/tsubaki_work.webp'},erika_work:{portrait:'assets/UNIT_ART/erika_work.webp'},kaede_work:{portrait:'assets/UNIT_ART/kaede_work.webp'}});
// User-approved ordinary outfits: portrait only. Binary images are added separately.
const APPROVED_R_ARTWORK=Object.freeze(Object.fromEntries(APPROVED_R_UNIT_IDS.map(id=>[id,{portrait:'assets/UNIT_ART/'+id+'.webp'}])));
const UNIT_ARTWORK=Object.freeze({...NEW_UNIT_ARTWORK_V026,...NEW_UNIT_ARTWORK_V027,...NEW_UNIT_ARTWORK_V028,...NEW_UNIT_ARTWORK_V0420,...NEW_UNIT_ARTWORK_V0500,...NEW_UNIT_ARTWORK_V0690,...NEW_UNIT_ARTWORK_V0692,...NEW_UNIT_ARTWORK_V0750,...NEW_UNIT_ARTWORK_V0760,...MOMOKA_UNIT_ARTWORK_V03447,...CHAPTER2_SR_ARTWORK_V035,...APPROVED_R_ARTWORK});
function unitArt(u,kind='portrait'){
 const config=UNIT_ARTWORK[u.id]||{};
 // Makoto's accepted portrait takes priority over outdated generic UNIT_ART portraits.
 // Preserve actual story/rarity scene CGs, but use one consistent base image everywhere else.
 if(kind==='scene'&&config.scene)return config.scene;
 if(u.rarity==='R'&&config.portrait)return config.portrait;
 if(u.person==='makoto')return kind==='portrait'?characterPortrait(u.person):characterArt(u.person);
 return config.portrait||(kind==='portrait'?characterPortrait(u.person):characterArt(u.person));
}
// v0.34.47.0: 編成・育成・募集の小さなカード用。SSR・URは一枚絵、SR・Rは立ち絵
function unitCardArt(u){return unitHasScene(u)?unitArt(u,'scene'):unitArt(u,'portrait');}
function unitHasScene(u){return !!UNIT_ARTWORK[u.id]?.scene&&(u.rarity==='SSR'||u.rarity==='UR')}
function homeUnit(personId){
 const owned=UNITS.filter(u=>u.person===personId&&visibleUnitV026(u)&&data(u.id));
 return owned.find(u=>u.id===S.homeUnitId)||owned.find(u=>u.id===S.selected)||owned.find(u=>u.rarity==='SR')||owned[0]||null;
}
function setHomeUnit(id){const u=unit(id);if(!u||!visibleUnitV026(u)||!data(id)||u.person!==lobbySelected)return;S.homeUnitId=id;persist();render()}

const RATE=Object.freeze({R:60,SR:25,SSR:10,UR:5}); // Confirmed normal recruitment odds.
const NEW19_RATE=Object.freeze({SR:80,SSR:15,UR:5}); // Existing 19-heroine-only odds; no R units.
const GACHA_CONFIG=Object.freeze({UR_PITY:100,SR_GUARANTEE_EVERY:10,ONE_COST:120,TEN_COST:1000});
// Keep the legacy normal pool byte-for-byte equivalent in membership and weighting.
// New heroines have a separate opt-in roster (provisional rarity, unchanged RATE).
const NORMAL_GACHA_POOL=Object.freeze(UNITS.filter(u=>!NEW_HERO_IDS_V0500.includes(u.person)&&!RETIRED_R_TO_SR[u.id]&&u.id!=='shio_pool'&&!/^concept\d+_trial$/.test(u.id)&&!u.s.some(name=>name.includes('仮スキル'))));
const NEW19_GACHA_POOL=Object.freeze(UNITS.filter(u=>NEW_HERO_IDS_V0500.includes(u.person)));
const DISTRICT_GACHA_IDS=Object.freeze({shinonome:SHINONOME_HERO_IDS,oldcafe:OLDCAFE_HERO_IDS,station:STATION_HERO_IDS,school_new:NEW_Q4_HERO_IDS,seaside:SEASIDE_HERO_IDS,lighthouse:LIGHTHOUSE_HERO_IDS,tsubaki:['tsubaki'],erika:['erika'],kaname:['kaname'],kaede:['kaede'],chapter3_port:['saki','yuzu','reiko','anzu','chiyo','nazuna'],chapter4_city:NEW_HERO_IDS_V028});
const PICKUP_DAYS=7, PICKUP_WEIGHT=3;
function heroineOwned(person,save=S){return Object.keys(save.owned||{}).some(id=>BYID[id]?.person===person&&(!CHAPTER2_ALL_HERO_IDS.includes(person)||!isChapter2ReservedTrial(BYID[id])))}
function kanameSRUnlocked(save=S){return !!save?.bondRead?.kaname?.[1]}
function visibleUnitV026(u,save=S){return !!u&&heroV0690Visible(u.person,save)&&!RETIRED_R_TO_SR[u.id]&&(!NEW_HERO_IDS_V027.includes(u.person)||isV027HeroRevealed(u.person,save))&&(!NEW_HERO_IDS_V028.includes(u.person)||isV028HeroRevealed(u.person,save))&&(!NEW_HERO_IDS_V0420.includes(u.person)||isV0420Revealed(u.person,save))&&isV0420Revealed(u.id,save)&&(!NEW_HERO_IDS_V0500.includes(u.person)||isV0500Revealed(u.person,save))}
function recruitEligibleUnit(u,save=S){return visibleUnitV026(u,save)&&(!NEW_HERO_IDS_V027.includes(u.person)||isV027HeroRevealed(u.person,save))&&(u.person!=='nagi'||!!save.quests?.q6?.complete)&&(!DISTRICT_HERO_IDS.includes(u.person)||(SHINONOME_HERO_IDS.includes(u.person)?!!save.shinonomeMet:OLDCAFE_HERO_IDS.includes(u.person)?!!save.oldcafeMet:STATION_HERO_IDS.includes(u.person)?!!save.stationMet:SCHOOL_HERO_IDS.includes(u.person)?!!save.schoolMet:OFFICE_HERO_IDS.includes(u.person)?!!save.officeMet:SEASIDE_HERO_IDS.includes(u.person)?!!save.seasideMet:CHAPTER2_ALL_HERO_IDS.includes(u.person)?(u.person==='tsubaki'?!!save.tsubakiMet:u.person==='erika'?!!save.erikaMet:u.person==='kaname'?!!save.kanameMet:!!save.kaedeMet):!!save.lighthouseMet))}
function availableNormalPool(save=S){return (gachaMode==='new19'?NEW19_GACHA_POOL:NORMAL_GACHA_POOL).filter(u=>recruitEligibleUnit(u,save))}
function pickupActive(group,save=S){const start=save.pickupStartDay?.[group];return !!(DISTRICT_GACHA_IDS[group]&&Number.isSafeInteger(start)&&start>=1&&save.love?.day>=start&&save.love.day<start+PICKUP_DAYS)}
function activePickupId(save=S){return ['chapter4_city','chapter3_port','kaede','kaname','erika','tsubaki','lighthouse','seaside','school_new','station','oldcafe','shinonome'].find(group=>pickupActive(group,save))||'normal'}
function pickupUnitWeight(u,group){return group!=='normal'&&pickupActive(group)&&DISTRICT_GACHA_IDS[group]?.includes(u.person)?PICKUP_WEIGHT:1}
function setGachaMode(mode){if(mode==='new19'&&!NEW_HERO_IDS_V0500.some(id=>isV0500Revealed(id)))return;if(mode!=='normal'&&mode!=='new19'&&!pickupActive(mode))return;gachaMode=mode;render()}
function ticketEligibleUnits(save=S){return availableNormalPool(save).filter(u=>u.rarity==='SR'&&HERO_IDS.includes(u.person)&&!heroineOwned(u.person,save))}
function grantTicketHero(id){if((S.heroSelectTickets||0)<1)return toast('選択チケットがありません');const choices=ticketEligibleUnits(),u=choices.find(x=>x.id===id);if(!u)return toast('現在の募集対象で未所持のヒロインだけを選べます');S.owned[u.id]={lv:1,aff:heroAff(u.person),lb:0,copies:0};S.heroSelectTickets--;S.selected=u.id;persist();render();toast(`${PEOPLE[u.person].name}が仲間になりました。交流が解放されました`)}
function pickupStarted(group){if(!DISTRICT_GACHA_IDS[group])return;S.pickupStartDay[group]=S.love.day;gachaMode=group}

function rollNormalGachaRarity(rand=Math.random()){
 const nextPity=(S.gachaPity||0)+1,nextSR=(S.gachaSrStreak||0)+1;
 const rates=gachaMode==='new19'?NEW19_RATE:RATE;
 const chanceR=rates.R||0,value=rand*100;
 let rar=value<chanceR?'R':value<chanceR+rates.SR?'SR':value<chanceR+rates.SR+rates.SSR?'SSR':'UR';
 if(nextPity>=GACHA_CONFIG.UR_PITY)rar='UR';
 S.gachaPity=rar==='UR'?0:nextPity;
 S.gachaSrStreak=0;
 return rar;
}
function drawNormalGachaUnit(rand=Math.random()){
 const rarity=rollNormalGachaRarity(rand),pool=availableNormalPool().filter(u=>u.rarity===rarity);
 if(!pool.length)throw new Error('通常募集対象に該当レアリティがありません: '+rarity);
 const group=gachaMode==='normal'||pickupActive(gachaMode)?gachaMode:'normal';
 const weighted=pool.map(u=>({unit:u,weight:pickupUnitWeight(u,group)}));
 let mark=Math.random()*weighted.reduce((sum,item)=>sum+item.weight,0);
 for(const item of weighted){mark-=item.weight;if(mark<0)return item.unit;}
 return weighted[weighted.length-1].unit;
}
const QUESTS=[
{id:'q1',name:'商店街の時計音',location:'東雲商店街',lead:'夕暮れの商店街に、どこからともなく古い時計の音が響いている。',clues:['古い街路時計の写真を確認した。今の時刻と音の回数が合わない。','星灯で残響の位置を特定。誰かの記憶が現象を強めているようだ。'],report:'市役所に住民の避難支援を要請。相談室は残響の鎮静へ向かう。',reward:550,enemy:'残響の擬似体',waves:2,chapter:0,requires:[],baseHp:62,baseAtk:7},
{id:'q2',name:'閉店したカフェの灯り',location:'西通り・旧喫茶街',lead:'閉店したカフェの明かりが、夕方だけ点灯するという相談が届いた。',clues:['当時の写真と現在の景色を照合。過去の店内が重なって見える。','星灯に不自然な増幅波形が記録された。何者かが干渉した痕跡かもしれない。'],report:'付近の安全を確保。相談室が擬似体を鎮め、現象の記録を保管する。',reward:800,enemy:'増幅された擬似体',waves:4,chapter:0,requires:['q1'],baseHp:77,baseAtk:9},
{id:'q3',name:'消えない踏切の警報',location:'東雲駅前',lead:'廃線の踏切から警報音が続く。朱音が周辺の避難誘導を始めている。',clues:['朱音「こちらは通行止めにしたよ！ 相談室は警報の発生位置を確認して！」。使われていない遮断機が、誰もいない線路を閉ざし続けている。','星灯の解析では、警報の音が鳴るたびに波形が意図的に押し上げられていた。増幅の痕跡はカフェで見つかったものと一致する。'],report:'朱音が住民を安全な区域へ案内した。相談室は警報に引き寄せられた擬似体を鎮静する。',reward:950,enemy:'踏切の残響核',waves:3,chapter:1,requires:['q2'],baseHp:84,baseAtk:10},
{id:'q4',name:'誰もいない教室の黒板',location:'旧宵星第二小学校',lead:'夜ごとに黒板へ文字が現れる閉校舎。千夏が昔この学校に通っていたと言う。',clues:['千夏「ここ、昔通ってたんだ。廊下のにおい、まだ覚えてる」。文字は誰かを呼んでいるようで、毎晩少しずつ増えていた。','星灯に映った黒板の文字は、ある時刻と場所を示していた。監視記録の端に白峰凪に似た影が一瞬だけ映るが、すぐに消える。'],report:'文字を媒介に現れた、硬い殻を持つ擬似体が教室をふさぐ。千夏とともに避難経路を確保する。',reward:1000,enemy:'黒板を守る擬似体',waves:3,chapter:1,requires:['q3'],baseHp:96,baseAtk:11},
{id:'q5',name:'止まった観覧車',location:'宵星臨海公園',lead:'閉園した遊園地の観覧車に、一晩中明かりがともる。小学校で見つけた時刻と符合している。',clues:['動かない観覧車の下で、凪が現れた。凪「……これ以上、近づかないほうがいい」。返事を待たずに、暗い通路へ姿を消す。','星灯で電源のないゴンドラの灯りを追うと、すべての残響が港側へ向かうのが分かった。増幅の発生源は、旧灯台の方角にある。'],report:'公園内に残る擬似体を鎮め、港へ向かう調査ルートを確保する。',reward:1100,enemy:'回転する残響核',waves:4,chapter:1,requires:['q4'],baseHp:107,baseAtk:12},
{id:'q6',name:'宵の星灯台',location:'宵星港・旧灯台',lead:'港の旧灯台に、不自然な増幅波形が集まっている。相談室は最も強い擬似体との対峙を決める。',clues:['玲奈「入り口は確保します。ここから先は、足元にも気をつけてください」。葵が機材を確認し、全員の星灯を同期させた。','星灯の観測値は危険域に達した。波形の中心に、これまでとは桁違いの擬似体が形成されている。外部から干渉した痕跡は残っているが、操作者は特定できない。'],report:'朱音が港の立入制限を継続。相談室は星灯の共鳴を抑えながら、灯台の擬似体を鎮静する。',reward:1500,enemy:'灯台の巨大擬似体',waves:4,chapter:1,requires:['q5'],baseHp:124,baseAtk:13},
 {id:'q7',name:'消えた姉の部屋',location:'神楽坂家・旧住宅区',lead:'古い伝承を研究する神楽坂椿から、双子の姉・楓が3か月前に失踪したと相談が入る。部屋には楓の筆跡を模した残響が残されていた。',clues:['椿の研究ノートと楓の記録を照合。旧参道の紋様が同じ時刻に描かれている。楓の机の時計は、3か月前の失踪時刻で止まっている。','壁に現れる声は楓本人のものではなく、誰かの記憶に擬態した波形だった。葵の解析では、8年前に春野ゆめが閉じ込められた旧灯台の事件の波形と似ているが、同じ発信源とは断定できない。'],report:'椿と協力して偽りの呼び声を切り離し、楓の資料を保全する。姉の所在はまだ不明。',reward:1650,enemy:'部屋に潜む模倣擬似体',waves:4,chapter:2,requires:['q6'],baseHp:132,baseAtk:14},
 {id:'q8',name:'仮面の夜会',location:'宵星市・夜会場／ルミエール',lead:'エリカの招待状を手掛かりに、仮面姿の契約者が集まる夜会へ潜入する。「黒い星灯」の噂が囁かれている。',clues:['招待状の封蝋には、椿のノートに残された紋様と似た図形が刻まれていた。','会場の監視装置が停止した時間だけ、星灯の反応が不自然に増幅されていた。'],report:'会場で発生した擬似体を鎮静し、参加者を避難させる。黒い星灯の持ち主は特定できない。',reward:1800,enemy:'仮面に宿る影の擬似体',waves:4,chapter:2,requires:['q7'],baseHp:142,baseAtk:15},
 {id:'q9',name:'二人目の契約者',location:'宵星港・倉庫街',lead:'夜会で拾った暗号を追うと、港で別の星灯反応が現れた。マスクの契約者と接触する。',clues:['倉庫に残された星灯の回路は、通常の擬似体の痕跡とは異なる構造だった。','同じ紋様が楓の調査記録にあった。ただし失踪との因果関係は確認できない。'],report:'擬似体を鎮め、契約者・紫藤カナメと接触。楓へ続く手掛かりを得るが、黒幕の正体には届かない。',reward:1950,enemy:'契約反応に寄る異形擬似体',waves:4,chapter:2,requires:['q8'],baseHp:152,baseAtk:16},
 {id:'q10',name:'八年前の記録',location:'市役所・地下書庫',lead:'文香が保管していた八年前の旧灯台事件の資料と、春野ゆめ本人の記憶を照合する。地下書庫に擬似体が巣くっている。',clues:['文香の保管記録には、八年前の旧灯台の被害者が残響の内側で外界から隔離されたことが記されている。ゆめは「出口を探しても、同じ場所へ戻った」と証言する。','葵が楓の部屋の波形と照合した結果、三か月前の楓の失踪と八年前のゆめの事件は「人を残響の中に閉じ込める」同じ手口だと確認できた。資料の紋様を見たノエルが理由もなく頭を押さえる。'],report:'書庫の擬似体を鎮め、凪からも同じ手口の使い手を追っていると聞く。埋立地の旧発電所に残された稼働記録を調べる。',reward:2100,enemy:'書庫に巣くう擬似体',waves:4,chapter:2,requires:['q9'],baseHp:164,baseAtk:17},
 {id:'q11',name:'黒い星灯',location:'埋立地・旧発電所',lead:'旧発電所に黒い星灯の反応。先に来ていたカナメと協力して、操られた擬似体に挑む。',clues:['廃止された発電機の回路に黒い星灯による遠隔操作の痕跡。カナメは、八年前にゆめを閉じ込めた契約者を探していたと話す。','発電所の記録に「朔夜」という署名が残る。黒い星灯を持つ契約者・朔夜が二つの監禁事件の実行犯で、星灯の反応が旧灯台地下へ続くと判明。'],report:'黒い星灯に操られた擬似体を鎮める。カナメは「ゆめが戻った」と知らされ、再会のため相談室へ向かう。',reward:2250,enemy:'黒い星灯の擬似体',waves:4,chapter:2,requires:['q10'],baseHp:178,baseAtk:18},
 {id:'q12',name:'残響の檻',location:'旧灯台・地下',lead:'黒い星灯の契約者・朔夜が作った残響の檻を破り、神楽坂楓を救出する。',clues:['地下の星灯装置は人間の記憶を閉じ込めるよう組まれている。内側に楓の微弱な反応を確認した。','黒い星灯の中核に朔夜が立つ。楓を閉じ込めた術を止めるには、契約者本人を退けて核を壊さなければならない。'],report:'朔夜との決戦。黒い星灯の契約者を倒して残響の檻を崩し、楓を救出する。朔夜は「あの方」と口にしかけ、何者かの名を残さず消える。',reward:2600,enemy:'黒い星灯の契約者・朔夜',waves:5,chapter:2,requires:['q11'],baseHp:200,baseAtk:20},
{id:'q13',name:'白い星の夢',location:'旧灯台のまわり',lead:'ノエルの夢と同じ波形の残響が旧灯台に現れた。以前、星灯を届けてくれた白鷺透子と再会し、八年前の点灯記録を調べる。',clues:['透子は「その灯、大切にしてくださっているのね」と喜び、点灯記録を見せてくれた。八年前の一部に説明のつかない空白がある。','透子は星が好きなノエルに、灯台の上から見える「はくちょう座」を教えた。ノエルが喜んだ姿に、透子はやさしい目を向けた。夢と同じ波形の残響が擬似体に変わる。'],report:'ノエルとともに夢の残響を鎮め、八年前の空白を記録する。夢の正体も、ノエルの正体もまだ不明。',reward:2750,enemy:'夢からこぼれた擬似体',waves:4,chapter:3,requires:['q12'],baseHp:207,baseAtk:21},
{id:'q14',name:'夜の波止場',location:'港の倉庫街',lead:'クラブ「ドック」の前で暴れる擬似体にラッパー姉妹・黒羽サキと黒羽ユズが巻き込まれている。',clues:['ステージ帰りの二人を守ろうとすると、主人公の星灯が初めてサキの深い青の灯火「言葉で本音を届けたい」を灯す。','続いてユズの柚子の黄の灯火「姉の隣に並びたい」が灯る。二人の灯火を受けて一緒に擬似体を退ける。路面には黒い粉末が残る。'],report:'サキ・ユズの灯火と共闘して倉庫街の擬似体を鎮める。二人はドックのオーナー玲子へ知らせると言う。',reward:2900,enemy:'倉庫街の擬似体',waves:4,chapter:3,requires:['q13'],baseHp:216,baseAtk:22},
{id:'q15',name:'ドックの女主人',location:'クラブ「ドック」',lead:'お礼に招かれた店で、オーナー鷹宮玲子から黒い星灯の売買と「イブキ」という女性の売人の噂を聞く。常連の七瀬あんずが客の異変に気づいた。',clues:['客が買ったらしい黒い結晶で擬似体が暴走する。主人公の星灯が玲子の深紅の灯火「店に来る子たちを守りたい」を初めて灯す。','あんずのパールの虹白の灯火「人の小さな変化に気づいてあげたい」も初めて灯る。二人と協力して擬似体だけを鎮め、女性客は無事に保護する。'],report:'玲子・あんずと共闘し女性客を保護。イブキの正体はまだ確認できず、誰かが想いを集めているらしいという疑いだけが残った。',reward:3100,enemy:'黒い星灯に引き寄せられた擬似体',waves:4,chapter:3,requires:['q14'],baseHp:226,baseAtk:23},
{id:'q16',name:'薄れていく名前',location:'宵星大学の書庫',lead:'カナメの失われていく記憶と、最初の星灯の伝承を追う。椿となずなが古い資料を発見した。',clues:['カナメはゆめにもらったオルゴールの曲名を思い出せない。契約者は強い想いを差し出す代償に、その記憶が戦いのたび薄れていく。','帰らない人を待ち続けた想いが旧灯台に集まり、最初の星灯になったという伝承。共鳴で残響があふれ、なずなの白百合の灯火が初めて灯った。'],report:'書庫の擬似体を鎮め、伝承資料を保存。なずなと協力して研究を続けることになった。契約者の失われる記憶についても記録する。',reward:3250,enemy:'書庫の擬似体',waves:4,chapter:3,requires:['q15'],baseHp:236,baseAtk:24},
{id:'q17',name:'黒い灯の夜市',location:'埋立地の夜市',lead:'玲子とあんずの情報で売人イブキを追う。黒い星灯を買った街の人を保護しながら、夜市の残響を鎮める。',clues:['イブキは黒い星灯を売れば誰かに頼られ、名前を忘れられずにすむと考えていた。結晶は共通の増幅波形を持つ。','イブキの黒い星灯には顔を知らない「あの方」の声だけが届く。売られた結晶が購入者の周囲で残響を暴走させている。'],report:'最終ウェーブの売人イブキを退け、黒い星灯が砕ける。イブキは「あの方の灯台」を口にし、顔は知らず声だけだったと告げて逃走。購入者は無事保護する。',reward:3650,enemy:'売人イブキ',waves:5,chapter:3,requires:['q16'],baseHp:270,baseAtk:27},
{id:'q18',name:'檻の記憶',location:'ノエルの夢の中',lead:'イブキが口にした灯台と、ノエルの夢とのつながりを確かめるため、星灯で夢の最奥へ入る。',clues:['鳥かごの人影は生身の人ではなく、奪われた想いの影。かけらは檻の最奥へ集まっていた。','ノエルは閉じ込められた想いのかけらから生まれた存在だった。誰の想いかはまだ分からない。彼女は今の自分を選び、白い星の灯火が強く輝く。'],report:'檻の番人を退け、ノエルとともに夢から帰還。奪われた想いの影と誕生の仕組みは分かったが、想いの主と黒幕は不明のまま。',reward:3600,enemy:'檻の番人',waves:5,chapter:3,requires:['q17'],baseHp:264,baseAtk:27},
{id:"q19",name:"鏡の向こうの約束",location:"東雲駅前・セレクトショップ",lead:"鏡の向こうの約束の異変を調査し、住民を守りながら灯台の再点灯の安全性を確かめる。",clues:["調査と推理から残響の反応を確かめる。","街の人々が抱える想いに、主人公の星灯が応える。"],report:"原因の分からない反応は断定せず、街と準備関係者の安全を守る。",reward:3500,enemy:"古い衣装の擬似体",waves:4,chapter:4,requires:["q18"],baseHp:258,baseAtk:27},
{id:"q20",name:"夜をつなぐ声",location:"宵星FM・ダンススタジオ",lead:"夜をつなぐ声の異変を調査し、住民を守りながら灯台の再点灯の安全性を確かめる。",clues:["調査と推理から残響の反応を確かめる。","街の人々が抱える想いに、主人公の星灯が応える。"],report:"原因の分からない反応は断定せず、街と準備関係者の安全を守る。",reward:3650,enemy:"無音に宿る擬似体",waves:4,chapter:4,requires:["q19"],baseHp:266,baseAtk:28},
{id:"q21",name:"潮風に届く願い",location:"海辺・サーフショップ",lead:"潮風に届く願いの異変を調査し、住民を守りながら灯台の再点灯の安全性を確かめる。",clues:["調査と推理から残響の反応を確かめる。","街の人々が抱える想いに、主人公の星灯が応える。"],report:"原因の分からない反応は断定せず、街と準備関係者の安全を守る。",reward:3800,enemy:"潮風の擬似体",waves:4,chapter:4,requires:["q20"],baseHp:274,baseAtk:29},
{id:"q22",name:"商店街のおかわり",location:"東雲商店街",lead:"商店街のおかわりの異変を調査し、住民を守りながら灯台の再点灯の安全性を確かめる。",clues:["調査と推理から残響の反応を確かめる。","街の人々が抱える想いに、主人公の星灯が応える。"],report:"原因の分からない反応は断定せず、街と準備関係者の安全を守る。",reward:3950,enemy:"不安を映す擬似体",waves:4,chapter:4,requires:["q21"],baseHp:282,baseAtk:30},
{id:"q23",name:"灯台守の手紙",location:"旧灯台・宵星亭",lead:"灯台守の手紙の異変を調査し、住民を守りながら灯台の再点灯の安全性を確かめる。",clues:["調査と推理から残響の反応を確かめる。","街の人々が抱える想いに、主人公の星灯が応える。"],report:"原因の分からない反応は断定せず、街と準備関係者の安全を守る。",reward:4100,enemy:"灯台記録の擬似体",waves:5,chapter:4,requires:["q22"],baseHp:290,baseAtk:31},
{id:"q24",name:"灯をつなぐ日",location:"旧灯台・点灯式準備会場",lead:"灯をつなぐ日の異変を調査し、住民を守りながら灯台の再点灯の安全性を確かめる。",clues:["調査と推理から残響の反応を確かめる。","街の人々が抱える想いに、主人公の星灯が応える。"],report:"原因の分からない反応は断定せず、街と準備関係者の安全を守る。",reward:4250,enemy:"点灯試験の擬似体",waves:5,chapter:4,requires:["q23"],baseHp:298,baseAtk:32}
,{"id":"q25","name":"お変わりない方","location":"料亭・宵星亭","lead":"料亭の古い点灯記録を調べ、八年前の秘密の光を追う。","clues":["関係者に聞き込み、異常の発生時刻と安全を確認する。","星灯と記録を照合し、確かな手がかりを集める。"],"report":"相談室に記録を持ち帰り、残響の鎮静と関係者の保護を進める。","reward":2300,"enemy":"古記録の擬似体","waves":2,"chapter":5,"requires":["q24"],"baseHp":318,"baseAtk":34},{"id":"q26","name":"前夜祭","location":"宵星市・前夜祭広場","lead":"点灯式前夜の避難経路を守りながら異変を調査する。","clues":["関係者に聞き込み、異常の発生時刻と安全を確認する。","星灯と記録を照合し、確かな手がかりを集める。"],"report":"相談室に記録を持ち帰り、残響の鎮静と関係者の保護を進める。","reward":2550,"enemy":"舞台袖の小さな擬似体","waves":2,"chapter":5,"requires":["q25"],"baseHp":326,"baseAtk":35},{"id":"q27","name":"試験点灯","location":"旧灯台前の広場","lead":"公開試験点灯で現れた鳥かごと残響から、市民を守る。","clues":["関係者に聞き込み、異常の発生時刻と安全を確認する。","星灯と記録を照合し、確かな手がかりを集める。"],"report":"相談室に記録を持ち帰り、残響の鎮静と関係者の保護を進める。","reward":2800,"enemy":"灯台から降りる擬似体","waves":3,"chapter":5,"requires":["q26"],"baseHp":348,"baseAtk":37},{"id":"q28","name":"灯室の副会長","location":"旧灯台・灯室","lead":"灯室で装置を壊していた保存会副会長・氷室沙耶を止め、吸収の流れを断つ。","clues":["関係者に聞き込み、異常の発生時刻と安全を確認する。","星灯と記録を照合し、確かな手がかりを集める。"],"report":"相談室に記録を持ち帰り、残響の鎮静と関係者の保護を進める。","reward":3050,"enemy":"氷室沙耶","waves":2,"chapter":5,"requires":["q27"],"baseHp":495,"baseAtk":50},{"id":"q29","name":"葵の選択","location":"暴走する灯室","lead":"暴走する光の壁を越え、葵を灯芯の前まで届ける。","clues":["関係者に聞き込み、異常の発生時刻と安全を確認する。","星灯と記録を照合し、確かな手がかりを集める。"],"report":"相談室に記録を持ち帰り、残響の鎮静と関係者の保護を進める。","reward":3300,"enemy":"暴走する灯の壁","waves":1,"chapter":5,"requires":["q28"],"baseHp":168,"baseAtk":19},{"id":"q30","name":"灯の消えた夜","location":"宵星相談室・港","lead":"イブキの破片を調べ、葵を連れ去った黒い光の行き先を確かめる。","clues":["関係者に聞き込み、異常の発生時刻と安全を確認する。","星灯と記録を照合し、確かな手がかりを集める。"],"report":"相談室に記録を持ち帰り、残響の鎮静と関係者の保護を進める。","reward":3550,"enemy":"港に残った擬似体","waves":2,"chapter":5,"requires":["q29"],"baseHp":369,"baseAtk":38},...(typeof CHAPTER6_QUESTS!=='undefined'?CHAPTER6_QUESTS:[]),...(typeof CHAPTER7_QUESTS!=='undefined'?CHAPTER7_QUESTS:[]),...(typeof CHAPTER8_QUESTS!=='undefined'?CHAPTER8_QUESTS:[]),...(typeof CHAPTER9_QUESTS!=='undefined'?CHAPTER9_QUESTS:[]),...(typeof CHAPTER10_QUESTS!=='undefined'?CHAPTER10_QUESTS:[]),...(typeof CHAPTER11_QUESTS!=='undefined'?CHAPTER11_QUESTS:[]),...(typeof CHAPTER12_QUESTS!=='undefined'?CHAPTER12_QUESTS:[]),...(typeof CHAPTER13_QUESTS!=='undefined'?CHAPTER13_QUESTS:[]),...(typeof CHAPTER14_QUESTS!=='undefined'?CHAPTER14_QUESTS:[]),...(typeof CHAPTER15_QUESTS!=='undefined'?CHAPTER15_QUESTS:[]),...(typeof CHAPTER16_QUESTS!=='undefined'?CHAPTER16_QUESTS:[]),...(typeof CHAPTER17_QUESTS!=='undefined'?CHAPTER17_QUESTS:[]),...(typeof CHAPTER18_QUESTS!=='undefined'?CHAPTER18_QUESTS:[]),...(typeof CHAPTER19_QUESTS!=='undefined'?CHAPTER19_QUESTS:[]),...(typeof CHAPTER20_QUESTS!=='undefined'?CHAPTER20_QUESTS:[]),...(typeof CHAPTER21_QUESTS!=='undefined'?CHAPTER21_QUESTS:[]),...(typeof CHAPTER22_QUESTS!=='undefined'?CHAPTER22_QUESTS:[]),...(typeof CHAPTER23_QUESTS!=='undefined'?CHAPTER23_QUESTS:[]),...(typeof CHAPTER24_QUESTS!=='undefined'?CHAPTER24_QUESTS:[]),...(typeof CHAPTER25_QUESTS!=='undefined'?CHAPTER25_QUESTS:[]),...(typeof CHAPTER26_QUESTS!=='undefined'?CHAPTER26_QUESTS:[]),...(typeof CHAPTER27_QUESTS!=='undefined'?CHAPTER27_QUESTS:[]),...(typeof CHAPTER28_QUESTS!=='undefined'?CHAPTER28_QUESTS:[]),...(typeof CHAPTER29_QUESTS!=='undefined'?CHAPTER29_QUESTS:[]),...(typeof CHAPTER30_QUESTS!=='undefined'?CHAPTER30_QUESTS:[]),...(typeof CHAPTER31_QUESTS!=='undefined'?CHAPTER31_QUESTS:[]),...(typeof CHAPTER32_QUESTS!=='undefined'?CHAPTER32_QUESTS:[]),...(typeof CHAPTER33_QUESTS!=='undefined'?CHAPTER33_QUESTS:[]),...(typeof CHAPTER34_QUESTS!=='undefined'?CHAPTER34_QUESTS:[]),...(typeof CHAPTER35_QUESTS!=='undefined'?CHAPTER35_QUESTS:[]),...(typeof CHAPTER36_QUESTS!=='undefined'?CHAPTER36_QUESTS:[]),...(typeof CHAPTER37_QUESTS!=='undefined'?CHAPTER37_QUESTS:[])];
const CHAPTERS=Object.freeze({0:'序章・相談室の始まり',1:'第1章　増幅する残響',2:'第2章　契約者たち',3:'第3章　白い星の行方',4:'第4章　消えた灯の約束',5:'第5章　点灯式の夜'});
const CHAPTER_TITLES_ALL=Object.freeze(["序章", "第1章　増幅する残響", "第2章　契約者たち", "第3章　白い星の行方", "第4章　消えた灯の約束", "第5章　試験点灯の夜", "第6章　星を読む人", "第7章　占いの館", "第8章　偽りの黒幕", "第9章　点灯式の夜", "第10章　宵星", "第2部 第1章　宝石店の灯石", "第2部 第2章　灯という名の情報屋", "第2部 第3章　蔦の館", "第2部 第4章　迎えの灯", "第2部 第5章　灯を売る人", "第2部 第6章　ジュリの選択", "第2部 第7章　冴子の古い夢", "第2部 第8章　よぞらのパンやさん", "第2部 第9章　浜の子守歌", "第2部 第10章　灯の市", "第3部 第1章　湯ノ花の噂", "第3部 第2章　名前のない仲居", "第3部 第3章　湯けむりの残響", "第3部 第4章　灯籠職人", "第3部 第5章　常夜、ふたたび", "第3部 第6章　さっちゃんの笑顔", "第3部 第7章　曇る灯籠", "第3部 第8章　灯籠流しの夜", "第3部 第9章　朔夜", "第3部 第10章　送り火"]); // v0.66.2.0: 全31章の題（クエスト画面の章選択用）
const QUEST_BY_ID=Object.freeze(Object.fromEntries(QUESTS.map(q=>[q.id,q])));
const QUEST_MAP_META=Object.freeze({
 q1:{x:19,y:38,color:'#f3a35f',accent:'#d46b39',icon:'clock',area:'東雲商店街'},
 q2:{x:45,y:53,color:'#b88961',accent:'#7f5a35',icon:'cup',area:'旧喫茶街'},
 q3:{x:76,y:30,color:'#79b8ff',accent:'#4377d8',icon:'rail',area:'東雲駅前'},
 q4:{x:23,y:77,color:'#8bc26d',accent:'#558942',icon:'board',area:'旧第二小学校'},
 q5:{x:75,y:61,color:'#77d2e8',accent:'#3d90b0',icon:'ferris',area:'臨海公園'},
 q6:{x:79,y:87,color:'#6d83d9',accent:'#314a9f',icon:'lighthouse',area:'旧灯台'},
 q7:{x:37,y:69,color:'#9a76d5',accent:'#583c95',icon:'home',area:'神楽坂家'},
 q8:{x:58,y:40,color:'#985aa6',accent:'#633d7b',icon:'cup',area:'夜会場'},
 q9:{x:91,y:64,color:'#6a76a0',accent:'#3c4772',icon:'rail',area:'倉庫街'},
 q10:{x:22,y:53,color:'#8974b9',accent:'#4c3a7a',icon:'board',area:'市役所・地下書庫'},
 q11:{x:83,y:49,color:'#705f93',accent:'#3d2d66',icon:'rail',area:'旧発電所'},
 q12:{x:89,y:91,color:'#583b83',accent:'#28184b',icon:'lighthouse',area:'旧灯台・地下'},
 q13:{x:71,y:27,color:'#a0b7de',accent:'#6278a5',icon:'lighthouse',area:'旧灯台のまわり'},
 q14:{x:28,y:64,color:'#315c9c',accent:'#182f60',icon:'rail',area:'港の倉庫街'},
 q15:{x:75,y:67,color:'#933c60',accent:'#652442',icon:'cup',area:'クラブ「ドック」'},
 q16:{x:22,y:32,color:'#8698c1',accent:'#506384',icon:'board',area:'宵星大学の書庫'},
 q17:{x:43,y:80,color:'#ba568e',accent:'#632c57',icon:'rail',area:'埋立地の夜市'},
 q18:{x:83,y:18,color:'#cbd7f2',accent:'#6c85be',icon:'lighthouse',area:'ノエルの夢の中'},
 q19:{x:25,y:25,color:'#9ea3cc',accent:'#58688c',icon:'rail',area:'東雲駅前・セレクトショップ'},
 q20:{x:58,y:34,color:'#a69bd0',accent:'#544b8a',icon:'board',area:'宵星FM・ダンススタジオ'},
 q21:{x:82,y:71,color:'#75bfd3',accent:'#39758b',icon:'cup',area:'海辺・サーフショップ'},
 q22:{x:34,y:63,color:'#d9af73',accent:'#8a604b',icon:'home',area:'東雲商店街'},
 q23:{x:73,y:20,color:'#c4957d',accent:'#895b4b',icon:'lighthouse',area:'旧灯台・宵星亭'},
 q24:{x:85,y:50,color:'#e4bb64',accent:'#846c3a',icon:'lighthouse',area:'旧灯台・点灯式準備会場'},
 q25:{"x":20,"y":69,"color":"#a47cae","accent":"#7354a0","icon":"cup","area":"料亭・宵星亭"},q26:{"x":42,"y":70,"color":"#ca99d8","accent":"#7354a0","icon":"cup","area":"前夜祭広場"},q27:{"x":74,"y":52,"color":"#f1b862","accent":"#7354a0","icon":"lighthouse","area":"旧灯台前広場"},q28:{"x":84,"y":18,"color":"#455080","accent":"#7354a0","icon":"lighthouse","area":"灯室・氷室沙耶"},q29:{"x":48,"y":25,"color":"#a2aec9","accent":"#7354a0","icon":"lighthouse","area":"暴走する灯室"},q30:{"x":24,"y":40,"color":"#839dbc","accent":"#7354a0","icon":"lighthouse","area":"港・相談室"},q31:{"x":62,"y":78,"color":"#3f7fb0","accent":"#1f4a78","icon":"lighthouse","area":"宵星水族館"},q32:{"x":66,"y":84,"color":"#356e9e","accent":"#1f4a78","icon":"lighthouse","area":"水族館・飼育員室"},q33:{"x":36,"y":22,"color":"#5a4f9c","accent":"#30286b","icon":"board","area":"宵星プラネタリウム"},q34:{"x":14,"y":82,"color":"#8a3a6e","accent":"#55204a","icon":"cup","area":"夜市の跡"},q35:{"x":18,"y":88,"color":"#4b2a6b","accent":"#2a1440","icon":"lighthouse","area":"夜市の跡・黒い灯"},q36:{"x":30,"y":86,"color":"#5c4a7a","accent":"#30286b","icon":"lighthouse","area":"夜市の跡・出口"},q37:{"x":52,"y":36,"color":"#3d3a7a","accent":"#221f55","icon":"cup","area":"星見堂"},q38:{"x":8,"y":12,"color":"#c4566a","accent":"#7e2a3d","icon":"board","area":"いちご農園"},q39:{"x":44,"y":88,"color":"#6c7f99","accent":"#3a4a63","icon":"board","area":"みのりの仮住まい"},q40:{"x":46,"y":24,"color":"#4b2a6b","accent":"#2a1440","icon":"home","area":"相談室の裏通り"},q41:{"x":86,"y":30,"color":"#455080","accent":"#28305c","icon":"lighthouse","area":"三つの観測点"},q42:{"x":54,"y":40,"color":"#2e2a66","accent":"#1a1640","icon":"cup","area":"星見堂・告白"},q43:{"x":80,"y":40,"color":"#4a5a96","accent":"#28305c","icon":"lighthouse","area":"灯台への坂道"},q44:{"x":84,"y":28,"color":"#8a3a6e","accent":"#55204a","icon":"lighthouse","area":"灯台のふもと"},q45:{"x":86,"y":22,"color":"#4b2a6b","accent":"#2a1440","icon":"lighthouse","area":"灯台の扉"},q46:{"x":88,"y":14,"color":"#2e2a66","accent":"#1a1640","icon":"lighthouse","area":"灯室・星読み"},q47:{"x":90,"y":10,"color":"#b08a3a","accent":"#6b5020","icon":"lighthouse","area":"灯室・星の列"},q48:{"x":82,"y":34,"color":"#d9a76a","accent":"#7d5f31","icon":"lighthouse","area":"夜明けの灯台"},q49:{"x":72,"y":50,"color":"#ca99d8","accent":"#7354a0","icon":"lighthouse","area":"点灯式の広場"},q50:{"x":40,"y":30,"color":"#7c8fb0","accent":"#3a4a63","icon":"home","area":"市立病院"},q51:{"x":76,"y":46,"color":"#b08a3a","accent":"#6b5020","icon":"lighthouse","area":"灯る灯台"},q52:{"x":86,"y":16,"color":"#2b3f80","accent":"#16224d","icon":"lighthouse","area":"灯室・白鷺透子"},q53:{"x":84,"y":22,"color":"#a2aec9","accent":"#5a6688","icon":"lighthouse","area":"崩れゆく灯室"},q54:{"x":24,"y":44,"color":"#2d5f8a","accent":"#173552","icon":"lighthouse","area":"港・海の底へ"},q55:{"x":20,"y":60,"color":"#1f4f7a","accent":"#0f2a45","icon":"lighthouse","area":"海の底の道"},q56:{"x":30,"y":66,"color":"#2a3f6e","accent":"#141f3d","icon":"lighthouse","area":"鳥かごの回廊"},q57:{"x":40,"y":72,"color":"#c9b27a","accent":"#6b5a30","icon":"lighthouse","area":"ひかりの影"},q58:{"x":50,"y":78,"color":"#2b3f80","accent":"#16224d","icon":"lighthouse","area":"灯の部屋・白鷺透子"},q59:{"x":58,"y":84,"color":"#e0c27a","accent":"#7d5f31","icon":"lighthouse","area":"灯の部屋・ノエル"},q60:{"x":48,"y":92,"color":"#f0d9a0","accent":"#7d5f31","icon":"home","area":"夜明けの港"},q61:{"x":46,"y":34,"color":"#7a6a8a","accent":"#3d3450","icon":"board","area":"宝石店「西園寺」"},q62:{"x":50,"y":30,"color":"#c7569a","accent":"#6b2550","icon":"cup","area":"夜の駅前"},q63:{"x":26,"y":48,"color":"#4b5a7a","accent":"#28304a","icon":"lighthouse","area":"港の倉庫街"},q64:{"x":44,"y":36,"color":"#8a7a5a","accent":"#4a3f2a","icon":"board","area":"宝石店の裏通り"},q65:{"x":52,"y":28,"color":"#d9b34a","accent":"#7d5f20","icon":"cup","area":"ネオンの駅前"},q66:{"x":54,"y":24,"color":"#2b2b3a","accent":"#c9a24a","icon":"home","area":"宵星駅・ホーム"},q67:{"x":50,"y":30,"color":"#2b2b3a","accent":"#5a8aff","icon":"board","area":"シノの雑居ビル"},q68:{"x":30,"y":50,"color":"#4b5a7a","accent":"#28304a","icon":"home","area":"港町のアパート"},q69:{"x":48,"y":32,"color":"#3a3a5a","accent":"#5a8aff","icon":"board","area":"駅前の交差点"},q70:{"x":46,"y":34,"color":"#7a6a8a","accent":"#3d3450","icon":"board","area":"宝石店・鑑定"},q71:{"x":52,"y":30,"color":"#2b2b3a","accent":"#c9a24a","icon":"cup","area":"深夜の広場"},q72:{"x":54,"y":24,"color":"#4a5a7a","accent":"#c9a24a","icon":"home","area":"北へ向かう駅"},q73:{"x":70,"y":6,"color":"#8a9aa8","accent":"#4a5a68","icon":"home","area":"灯ヶ峰駅"},q74:{"x":74,"y":4,"color":"#5a7a5a","accent":"#2f4a2f","icon":"home","area":"蔦の館"},q75:{"x":78,"y":4,"color":"#6a6a5a","accent":"#3a3a2a","icon":"board","area":"採石場への山道"},q76:{"x":82,"y":4,"color":"#6a5a7a","accent":"#3a2a4a","icon":"lighthouse","area":"坑道の扉"},q77:{"x":86,"y":4,"color":"#2b2b3a","accent":"#c9a24a","icon":"lighthouse","area":"灯石の坑道"},q78:{"x":90,"y":4,"color":"#1f1f2a","accent":"#e0b85a","icon":"lighthouse","area":"坑道の奥"},q79:{"x":84,"y":8,"color":"#c9c9d6","accent":"#5a5a6a","icon":"board","area":"採石場の脇道"},q80:{"x":86,"y":10,"color":"#3a3a5a","accent":"#c9a24a","icon":"lighthouse","area":"灯庫"},q81:{"x":90,"y":8,"color":"#2b3f80","accent":"#16224d","icon":"lighthouse","area":"坑道の最奥・透子"},q82:{"x":92,"y":6,"color":"#c9a24a","accent":"#6b5020","icon":"lighthouse","area":"暴れる鉱脈"},q83:{"x":94,"y":8,"color":"#c9c9d6","accent":"#c9a24a","icon":"board","area":"開かない鍵"},q84:{"x":72,"y":6,"color":"#8a9aa8","accent":"#4a5a68","icon":"home","area":"帰り道"},q85:{"x":22,"y":46,"color":"#6a5a4a","accent":"#c9a24a","icon":"cup","area":"港の朝市"},q86:{"x":46,"y":24,"color":"#5a4a5a","accent":"#c9a24a","icon":"home","area":"相談室・槐の来訪"},q87:{"x":34,"y":52,"color":"#3a3040","accent":"#c9a24a","icon":"cup","area":"糸の降る商店街"},q88:{"x":80,"y":40,"color":"#4a5a96","accent":"#28305c","icon":"lighthouse","area":"返す灯"},q89:{"x":88,"y":14,"color":"#2a2030","accent":"#e0b85a","icon":"lighthouse","area":"灯室・宵宮槐"},q90:{"x":84,"y":30,"color":"#e8eef8","accent":"#8aa0c8","icon":"lighthouse","area":"白い灯"},q91:{"x":44,"y":36,"color":"#d9b34a","accent":"#7d5f20","icon":"board","area":"宝石店の裏通り"},q92:{"x":36,"y":56,"color":"#8a6a9a","accent":"#4a3a5a","icon":"cup","area":"トワの古着屋"},q93:{"x":46,"y":34,"color":"#f0d080","accent":"#7d5f20","icon":"home","area":"宝石店の二階"},q94:{"x":52,"y":30,"color":"#c7569a","accent":"#6b2550","icon":"cup","area":"夜の駅前・冴子"},q95:{"x":46,"y":36,"color":"#fff0c0","accent":"#c9a24a","icon":"board","area":"選ぶ光"},q96:{"x":44,"y":38,"color":"#e8d8a0","accent":"#7d5f20","icon":"board","area":"本物の光"},q97:{"x":44,"y":36,"color":"#c9b27a","accent":"#6b5a30","icon":"board","area":"古いスケッチ"},q98:{"x":58,"y":20,"color":"#5a8a7a","accent":"#2a4a40","icon":"board","area":"FM宵星"},q99:{"x":18,"y":50,"color":"#c9566a","accent":"#6b2a35","icon":"cup","area":"居酒屋とまり木"},q100:{"x":22,"y":44,"color":"#4b5a7a","accent":"#c9a24a","icon":"lighthouse","area":"親石"},q101:{"x":46,"y":34,"color":"#7a6a8a","accent":"#e0b85a","icon":"board","area":"冴子の台座"},q102:{"x":20,"y":48,"color":"#f0e0b0","accent":"#7d5f31","icon":"cup","area":"新しい台座"},q103:{"x":40,"y":30,"color":"#3c4a78","accent":"#e8c56a","icon":"board","area":"夜灯ギャラリー"},q104:{"x":36,"y":34,"color":"#c9a27a","accent":"#6b4a2a","icon":"cup","area":"星のパンの手紙"},q105:{"x":41,"y":28,"color":"#2e3a5e","accent":"#e0b85a","icon":"board","area":"額縁の下"},q106:{"x":43,"y":27,"color":"#4a4f66","accent":"#c9a24a","icon":"board","area":"空の瓶"},q107:{"x":39,"y":29,"color":"#f2d58a","accent":"#7d5f31","icon":"board","area":"おやすみの読み聞かせ"},q108:{"x":38,"y":31,"color":"#e8c9a0","accent":"#7d5f31","icon":"cup","area":"灯りを消すページ"},q109:{"x":48,"y":44,"color":"#f2d58a","accent":"#7d5f31","icon":"home","area":"ひだまり保育園"},q110:{"x":28,"y":40,"color":"#6a5a8a","accent":"#e0c070","icon":"board","area":"市民ホール"},q111:{"x":68,"y":58,"color":"#4a4f66","accent":"#c9a24a","icon":"home","area":"槐の部屋"},q112:{"x":82,"y":32,"color":"#3a3040","accent":"#c9a24a","icon":"lighthouse","area":"約束の取り立て"},q113:{"x":88,"y":14,"color":"#2a2030","accent":"#e0b85a","icon":"lighthouse","area":"灯室・宵宮槐"},q114:{"x":84,"y":24,"color":"#f0e0b0","accent":"#7d5f31","icon":"lighthouse","area":"おやすみの約束"},q115:{"x":54,"y":30,"color":"#8aa0c8","accent":"#3a4a6a","icon":"board","area":"消えた灯の噂"},q116:{"x":66,"y":62,"color":"#4a5a6a","accent":"#c9a24a","icon":"board","area":"灯庫の瓶"},q117:{"x":46,"y":24,"color":"#5a4a5a","accent":"#c9a24a","icon":"home","area":"追われる槐"},q118:{"x":60,"y":74,"color":"#2a2030","accent":"#e0b85a","icon":"cup","area":"新月の市"},q119:{"x":64,"y":80,"color":"#1a1420","accent":"#f0c860","icon":"cup","area":"市守り・常夜"},q120:{"x":84,"y":20,"color":"#fff0c0","accent":"#c9a24a","icon":"lighthouse","area":"灯の還る夜"},q121:{"x":10,"y":20,"color":"#c9a27a","accent":"#6b4a2a","icon":"board","area":"湯ノ花駅"},q122:{"x":14,"y":26,"color":"#e8c9a0","accent":"#7d5f31","icon":"cup","area":"湯けむり通り"},q123:{"x":18,"y":22,"color":"#f0e0b0","accent":"#7d5f31","icon":"board","area":"灯籠の短冊"},q124:{"x":22,"y":30,"color":"#6a8aa8","accent":"#e0c070","icon":"board","area":"川べりの影"},q125:{"x":16,"y":34,"color":"#5a4a5a","accent":"#e8c56a","icon":"home","area":"月見屋"},q126:{"x":8,"y":14,"color":"#3c4a78","accent":"#e8c56a","icon":"home","area":"名前のない仲居"},q127:{"x":16,"y":36,"color":"#c9a27a","accent":"#6b4a2a","icon":"home","area":"月見屋の朝"},q128:{"x":18,"y":38,"color":"#e8c9a0","accent":"#7d5f31","icon":"home","area":"仲居の仕事"},q129:{"x":14,"y":38,"color":"#3a3040","accent":"#c9a24a","icon":"home","area":"黒い欠片"},q130:{"x":20,"y":32,"color":"#3c4a78","accent":"#e8c56a","icon":"board","area":"言うか、言わないか"},q131:{"x":15,"y":40,"color":"#6a5a8a","accent":"#e0c070","icon":"home","area":"さっちゃんの頼み"},q132:{"x":19,"y":24,"color":"#f2d58a","accent":"#7d5f31","icon":"board","area":"名前のない灯籠"},q133:{"x":6,"y":8,"color":"#c9a27a","accent":"#6b4a2a","icon":"board","area":"湯小屋へ"},q134:{"x":5,"y":5,"color":"#e8c9a0","accent":"#7d5f31","icon":"home","area":"湯守の日誌"},q135:{"x":7,"y":4,"color":"#3c4a78","accent":"#e8c56a","icon":"board","area":"夜の湯守"},q136:{"x":10,"y":3,"color":"#4a4f66","accent":"#c9a24a","icon":"board","area":"湯けむりの道"},q137:{"x":4,"y":6,"color":"#f2d58a","accent":"#7d5f31","icon":"board","area":"名前を呼ぶ"},q138:{"x":12,"y":12,"color":"#6a8aa8","accent":"#e0c070","icon":"board","area":"送り湯"},q139:{"x":22,"y":28,"color":"#f2d58a","accent":"#7d5f31","icon":"board","area":"設営の新人"},q140:{"x":24,"y":24,"color":"#c9a27a","accent":"#6b4a2a","icon":"home","area":"灯籠工房"},q141:{"x":26,"y":22,"color":"#2e3a5e","accent":"#e0b85a","icon":"home","area":"金の線の和紙"},q142:{"x":21,"y":31,"color":"#e8c9a0","accent":"#7d5f31","icon":"board","area":"ねねの失敗"},q143:{"x":24,"y":33,"color":"#3c4a78","accent":"#e8c56a","icon":"board","area":"試し流し"},q144:{"x":25,"y":26,"color":"#f0e0b0","accent":"#7d5f31","icon":"home","area":"職人の灯"},q145:{"x":16,"y":37,"color":"#1a1420","accent":"#f0c860","icon":"home","area":"ごあいさつ"},q146:{"x":23,"y":29,"color":"#e8a0c0","accent":"#7d3f5f","icon":"board","area":"ロケ隊"},q147:{"x":11,"y":2,"color":"#2a2030","accent":"#e0b85a","icon":"home","area":"山の上の宿"},q148:{"x":19,"y":21,"color":"#f2b8d0","accent":"#7d3f5f","icon":"board","area":"みゆの役"},q149:{"x":17,"y":39,"color":"#1a1420","accent":"#f0c860","icon":"home","area":"申し出"},q150:{"x":15,"y":39,"color":"#3a3040","accent":"#c9a24a","icon":"home","area":"残された灯籠"},q151:{"x":14,"y":27,"color":"#f2b8d0","accent":"#7d3f5f","icon":"cup","area":"さっちゃんの休日"},q152:{"x":9,"y":21,"color":"#8aa0c8","accent":"#3a4a6a","icon":"board","area":"観光案内"},q153:{"x":23,"y":34,"color":"#6a8aa8","accent":"#e0c070","icon":"board","area":"打ち明ける"},q154:{"x":17,"y":35,"color":"#c44a4a","accent":"#f0e0b0","icon":"home","area":"楓"},q155:{"x":25,"y":25,"color":"#f0e0b0","accent":"#7d5f31","icon":"home","area":"今のわたし"},q156:{"x":22,"y":30,"color":"#f2d58a","accent":"#c9853a","icon":"board","area":"夕焼けの約束"},q157:{"x":19,"y":23,"color":"#8a8a9a","accent":"#3a3a4a","icon":"board","area":"曇る灯籠"},q158:{"x":17,"y":41,"color":"#9a9aaa","accent":"#3a3a4a","icon":"home","area":"缶詰の漫画家"},q159:{"x":13,"y":10,"color":"#4a4f66","accent":"#c9a24a","icon":"board","area":"配管をたどる"},q160:{"x":30,"y":40,"color":"#2e3a5e","accent":"#e0b85a","icon":"board","area":"灯籠受け"},q161:{"x":32,"y":42,"color":"#f2d58a","accent":"#7d5f31","icon":"board","area":"網を解く"},q162:{"x":31,"y":44,"color":"#1a1420","accent":"#f0c860","icon":"board","area":"前日の夜"},q163:{"x":14,"y":28,"color":"#f2d58a","accent":"#c9853a","icon":"cup","area":"祭りの宵"},q164:{"x":19,"y":25,"color":"#f0e0b0","accent":"#7d5f31","icon":"board","area":"灯籠を手に"},q165:{"x":23,"y":35,"color":"#3c4a78","accent":"#f2d58a","icon":"board","area":"流す"},q166:{"x":22,"y":31,"color":"#1a1420","accent":"#f0c860","icon":"board","area":"美しい灯"},q167:{"x":24,"y":36,"color":"#fff0f0","accent":"#c44a4a","icon":"board","area":"火"},q168:{"x":25,"y":37,"color":"#ffffff","accent":"#c44a4a","icon":"board","area":"名前が燃える"},q169:{"x":24,"y":38,"color":"#ffffff","accent":"#8a8aa8","icon":"board","area":"白い火柱"},q170:{"x":23,"y":39,"color":"#f0f0ff","accent":"#8a8aa8","icon":"board","area":"呼びかけ"},q171:{"x":31,"y":46,"color":"#3c4a78","accent":"#f2d58a","icon":"board","area":"海の灯籠"},q172:{"x":22,"y":40,"color":"#f0e0d0","accent":"#7d5f31","icon":"board","area":"女将の声"},q173:{"x":25,"y":41,"color":"#1a1420","accent":"#e8e8ff","icon":"board","area":"朔夜"},q174:{"x":26,"y":42,"color":"#e8e8e8","accent":"#5a5a6a","icon":"board","area":"名前"},q175:{"x":23,"y":37,"color":"#e8e8e8","accent":"#5a5a6a","icon":"board","area":"夜明けの川べり"},q176:{"x":15,"y":42,"color":"#f0e0d0","accent":"#7d5f31","icon":"home","area":"さっちゃんの部屋"},q177:{"x":11,"y":4,"color":"#4a4f66","accent":"#c9a24a","icon":"home","area":"空っぽの宿"},q178:{"x":25,"y":27,"color":"#f0e0b0","accent":"#7d5f31","icon":"home","area":"送り火の支度"},q179:{"x":24,"y":39,"color":"#3c4a78","accent":"#f2d58a","icon":"board","area":"送り火"},q180:{"x":9,"y":22,"color":"#8aa0c8","accent":"#3a4a6a","icon":"board","area":"帰り道"},q181:{"x":44,"y":38,"color":"#e8e8f0","accent":"#2a2030","icon":"cup","area":"わかばの投稿"},q182:{"x":42,"y":40,"color":"#f0f0f0","accent":"#2a2030","icon":"home","area":"外れないお面"},q183:{"x":90,"y":46,"color":"#3a2a5a","accent":"#ff6ac0","icon":"board","area":"鳴海へ"},q184:{"x":92,"y":40,"color":"#2a1a4a","accent":"#ff6ac0","icon":"cup","area":"ネオン坂"},q185:{"x":94,"y":34,"color":"#1a1030","accent":"#ffffff","icon":"board","area":"仮面の列"},q186:{"x":95,"y":30,"color":"#1a1030","accent":"#8ac0ff","icon":"board","area":"屋上の人影"},q187:{"x":93,"y":36,"color":"#e8e0f0","accent":"#2a2030","icon":"board","area":"夜明けの劇場"},q188:{"x":88,"y":50,"color":"#5a5a6a","accent":"#8ac0ff","icon":"home","area":"凪の宿"},q189:{"x":96,"y":42,"color":"#3a3a4a","accent":"#c0c0ff","icon":"home","area":"閉じたスタジオ"},q190:{"x":86,"y":56,"color":"#3c4a78","accent":"#f2d58a","icon":"board","area":"理由は聞かないで"},q191:{"x":94,"y":33,"color":"#1a1030","accent":"#ffffff","icon":"board","area":"お面の凪"},q192:{"x":93,"y":32,"color":"#1a1030","accent":"#8ac0ff","icon":"board","area":"外したお面"},q193:{"x":91,"y":41,"color":"#4a2a5a","accent":"#ff8ad0","icon":"cup","area":"バー「LUNA」"},q194:{"x":93,"y":38,"color":"#e8e8f0","accent":"#2a2030","icon":"cup","area":"露店の女主人"},q195:{"x":94,"y":35,"color":"#f0f0f0","accent":"#2a2030","icon":"board","area":"箱のお面"},q196:{"x":89,"y":38,"color":"#3a3a5a","accent":"#c0c0ff","icon":"board","area":"屋上の学生"},q197:{"x":91,"y":42,"color":"#4a2a5a","accent":"#ffd36e","icon":"cup","area":"振り付け「∞」"},q198:{"x":90,"y":42,"color":"#101010","accent":"#ffffff","icon":"cup","area":"裏返しのお面"},q199:{"x":87,"y":52,"color":"#f2b8d0","accent":"#c44a8a","icon":"board","area":"一座の舞台"},q200:{"x":86,"y":54,"color":"#e8c9a0","accent":"#7d5f31","icon":"home","area":"憧れの名前"},q201:{"x":84,"y":56,"color":"#5a5a6a","accent":"#8ac0ff","icon":"board","area":"凪と舞"},q202:{"x":86,"y":53,"color":"#f0e0c0","accent":"#2a2030","icon":"home","area":"色あせたチラシ"},q203:{"x":88,"y":51,"color":"#3a2a5a","accent":"#ffd36e","icon":"board","area":"港の踊り"},q204:{"x":85,"y":50,"color":"#101010","accent":"#ffffff","icon":"board","area":"屋上の黒いお面"},q205:{"x":94,"y":31,"color":"#3a2020","accent":"#e0b85a","icon":"board","area":"招待"},q206:{"x":95,"y":29,"color":"#101010","accent":"#ffffff","icon":"board","area":"暗い舞台"},q207:{"x":96,"y":28,"color":"#101010","accent":"#f2b8d0","icon":"board","area":"舞とSHION∞"},q208:{"x":96,"y":27,"color":"#101010","accent":"#c0c0ff","icon":"board","area":"忘れさせる理由"},q209:{"x":95,"y":26,"color":"#101010","accent":"#8ac0ff","icon":"board","area":"凪の一歩"},q210:{"x":94,"y":26,"color":"#101010","accent":"#ffd36e","icon":"board","area":"仮面の下"},q211:{"x":88,"y":49,"color":"#5a5a6a","accent":"#8ac0ff","icon":"home","area":"凪の話"},q212:{"x":87,"y":50,"color":"#3a3a4a","accent":"#c0c0ff","icon":"home","area":"最後の夜"},q213:{"x":85,"y":57,"color":"#3c4a78","accent":"#f2d58a","icon":"board","area":"忘れたかったもの"},q214:{"x":86,"y":55,"color":"#f2b8d0","accent":"#c44a8a","icon":"home","area":"舞の決意"},q215:{"x":96,"y":43,"color":"#3a3a4a","accent":"#ffd36e","icon":"home","area":"凪の膝"},q216:{"x":92,"y":39,"color":"#2a1a4a","accent":"#ff6ac0","icon":"board","area":"ふたたび零時へ"},q217:{"x":94,"y":32,"color":"#1a1420","accent":"#f0c860","icon":"board","area":"常夜の挨拶"},q218:{"x":95,"y":31,"color":"#1a1420","accent":"#e0a060","icon":"board","area":"残り火"},q219:{"x":95,"y":30,"color":"#1a1420","accent":"#c44a4a","icon":"board","area":"燃え種"},q220:{"x":96,"y":30,"color":"#1a1420","accent":"#e8e8ff","icon":"board","area":"止める方法"},q221:{"x":96,"y":28,"color":"#101010","accent":"#ffffff","icon":"board","area":"シオンに伝える"},q222:{"x":95,"y":28,"color":"#101010","accent":"#f0c860","icon":"board","area":"明日の舞台"}, home:{x:43,y:20,color:'#d9b97f',accent:'#7d5f31',icon:'home',area:'宵星相談室'}
});
const QUEST_STAGE_LABELS=Object.freeze(['聞き込み','星灯解析','安全確保']);

function questBaseUnlocked(q){return !!q&&q.requires.every(id=>!!S.quests[id]?.complete)&&(q.chapter===0||!!S.storyFlags?.chapter1_open)&&(q.chapter!==2||!!S.storyFlags?.chapter2_open)&&(q.chapter!==3||!!S.storyFlags?.chapter3_open)&&(q.chapter!==4||!!S.storyFlags?.chapter4_open)&&(q.chapter!==5||!!S.storyFlags?.chapter5_open)&&(q.chapter!==6||!!S.storyFlags?.chapter6_open)&&(q.chapter!==7||!!S.storyFlags?.chapter7_open)&&(q.chapter!==8||!!S.storyFlags?.chapter8_open)&&(q.chapter!==9||!!S.storyFlags?.chapter9_open)&&(q.chapter!==10||!!S.storyFlags?.chapter10_open)&&(q.chapter!==11||!!S.storyFlags?.chapter11_open)&&(q.chapter!==12||!!S.storyFlags?.chapter12_open)&&(q.chapter!==13||!!S.storyFlags?.chapter13_open)&&(q.chapter!==14||!!S.storyFlags?.chapter14_open)&&(q.chapter!==15||!!S.storyFlags?.chapter15_open)&&(q.chapter!==16||!!S.storyFlags?.chapter16_open)&&(q.chapter!==17||!!S.storyFlags?.chapter17_open)&&(q.chapter!==18||!!S.storyFlags?.chapter18_open)&&(q.chapter!==19||!!S.storyFlags?.chapter19_open)&&(q.chapter!==20||!!S.storyFlags?.chapter20_open)&&(q.chapter!==21||!!S.storyFlags?.chapter21_open)&&(q.chapter!==22||!!S.storyFlags?.chapter22_open)&&(q.chapter!==23||!!S.storyFlags?.chapter23_open)&&(q.chapter!==24||!!S.storyFlags?.chapter24_open)&&(q.chapter!==25||!!S.storyFlags?.chapter25_open)&&(q.chapter!==26||!!S.storyFlags?.chapter26_open)&&(q.chapter!==27||!!S.storyFlags?.chapter27_open)&&(q.chapter!==28||!!S.storyFlags?.chapter28_open)&&(q.chapter!==29||!!S.storyFlags?.chapter29_open)&&(q.chapter!==30||!!S.storyFlags?.chapter30_open)&&(q.chapter!==31||!!S.storyFlags?.chapter31_open)&&(q.chapter!==32||!!S.storyFlags?.chapter32_open)&&(q.chapter!==33||!!S.storyFlags?.chapter33_open)&&(q.chapter!==34||!!S.storyFlags?.chapter34_open)&&(q.chapter!==35||!!S.storyFlags?.chapter35_open)&&(q.chapter!==36||!!S.storyFlags?.chapter36_open)&&(q.chapter!==37||!!S.storyFlags?.chapter37_open)&&(q.id!=='q7'||!!S.lighthouseMet)&&(q.id!=='q8'||!!S.tsubakiMet)&&(q.id!=='q9'||!!S.erikaMet)&&(q.id!=='q12'||!!S.kanameMet)&&(q.id!=='q15'||!!S.chapter3Met?.saki&&!!S.chapter3Met?.yuzu)&&(q.id!=='q16'||!!S.chapter3Met?.reiko&&!!S.chapter3Met?.anzu)&&(q.id!=='q20'||!!S.chapter4Met?.sena&&!!S.chapter4Met?.towa)&&(q.id!=='q21'||!!S.chapter4Met?.mizuki&&!!S.chapter4Met?.ritsu)&&(q.id!=='q22'||!!S.chapter4Met?.karen&&!!S.chapter4Met?.meru)&&(q.id!=='q23'||!!S.chapter4Met?.chihiro&&!!S.chapter4Met?.sanae)&&(q.id!=='q24'||!!S.chapter4Met?.kagari&&!!S.chapter4Met?.miyabi)}
function questPreviousStory(q){
 const id=q?.id,n=Number(id?.slice(1));
 if(!q||S.quests?.[id]?.complete||S.investigations?.[id])return null; // Old saves already mid-quest are preserved.
 if(n===1)return S.storyFlags?.prologue?null:'prologue';
 if(!S.quests?.['q'+(n-1)]?.complete)return null; // Base unlock handles the previous quest.
 // The following chapter scenes and after-stories must be read explicitly.
 const extras={
  2:[['shinonome_meet',!!S.shinonomeMet]],
  3:[['oldcafe_meet',!!S.oldcafeMet],['chapter1_open',!!S.storyFlags?.chapter1_open]],
  4:[['station_meet',!!S.stationMet]],
  5:[['school_meet',!!S.schoolMet],['office_meet',!!S.officeMet]],
  6:[['seaside_meet',!!S.seasideMet]],
  7:[['chapter1_end',!!S.storyFlags?.chapter1_end],['lighthouse_meet',!!S.lighthouseMet],['chapter2_open',!!S.storyFlags?.chapter2_open]],
  8:[['tsubaki_meet',!!S.tsubakiMet]],
  9:[['erika_meet',!!S.erikaMet]],
  12:[['kaname_meet',!!S.kanameMet]],
  13:[['kaede_meet',!!S.kaedeMet],['chapter2_end',!!S.storyFlags?.chapter2_end],['chapter3_open',!!S.storyFlags?.chapter3_open]],
  15:[['saki_yuzu_meet',!!S.chapter3Met?.saki&&!!S.chapter3Met?.yuzu],['chiyo_meet',!!S.chapter3Met?.chiyo]],
  16:[['reiko_meet',!!S.chapter3Met?.reiko],['anzu_meet',!!S.chapter3Met?.anzu]],
  17:[['nazuna_meet',!!S.chapter3Met?.nazuna]],
  19:[['chapter3_end',!!S.storyFlags?.chapter3_end],['chapter4_open',!!S.storyFlags?.chapter4_open]],
  25:[['chapter4_end',!!S.storyFlags?.chapter4_end],['chapter5_open',!!S.storyFlags?.chapter5_open]],
  31:[['chapter5_end',!!S.storyFlags?.chapter5_end],['chapter6_open',!!S.storyFlags?.chapter6_open]],
  37:[['chapter6_end',!!S.storyFlags?.chapter6_end],['chapter7_open',!!S.storyFlags?.chapter7_open]],
  43:[['chapter7_end',!!S.storyFlags?.chapter7_end],['chapter8_open',!!S.storyFlags?.chapter8_open]],
  49:[['chapter8_end',!!S.storyFlags?.chapter8_end],['chapter9_open',!!S.storyFlags?.chapter9_open]],
  55:[['chapter9_end',!!S.storyFlags?.chapter9_end],['chapter10_open',!!S.storyFlags?.chapter10_open]],
  61:[['chapter10_end',!!S.storyFlags?.chapter10_end],['chapter11_open',!!S.storyFlags?.chapter11_open]],
  67:[['chapter11_end',!!S.storyFlags?.chapter11_end],['chapter12_open',!!S.storyFlags?.chapter12_open]],
  73:[['chapter12_end',!!S.storyFlags?.chapter12_end],['chapter13_open',!!S.storyFlags?.chapter13_open]],
  79:[['chapter13_end',!!S.storyFlags?.chapter13_end],['chapter14_open',!!S.storyFlags?.chapter14_open]],
  85:[['chapter14_end',!!S.storyFlags?.chapter14_end],['chapter15_open',!!S.storyFlags?.chapter15_open]],
  91:[['chapter15_end',!!S.storyFlags?.chapter15_end],['chapter16_open',!!S.storyFlags?.chapter16_open]],
  97:[['chapter16_end',!!S.storyFlags?.chapter16_end],['chapter17_open',!!S.storyFlags?.chapter17_open]],
  103:[['chapter17_end',!!S.storyFlags?.chapter17_end],['chapter18_open',!!S.storyFlags?.chapter18_open]],
  109:[['chapter18_end',!!S.storyFlags?.chapter18_end],['chapter19_open',!!S.storyFlags?.chapter19_open]],
  115:[['chapter19_end',!!S.storyFlags?.chapter19_end],['chapter20_open',!!S.storyFlags?.chapter20_open]],
  121:[['chapter20_end',!!S.storyFlags?.chapter20_end],['chapter21_open',!!S.storyFlags?.chapter21_open]],
  127:[['chapter21_end',!!S.storyFlags?.chapter21_end],['chapter22_open',!!S.storyFlags?.chapter22_open]],
  133:[['chapter22_end',!!S.storyFlags?.chapter22_end],['chapter23_open',!!S.storyFlags?.chapter23_open]],
  139:[['chapter23_end',!!S.storyFlags?.chapter23_end],['chapter24_open',!!S.storyFlags?.chapter24_open]],
  145:[['chapter24_end',!!S.storyFlags?.chapter24_end],['chapter25_open',!!S.storyFlags?.chapter25_open]],
  151:[['chapter25_end',!!S.storyFlags?.chapter25_end],['chapter26_open',!!S.storyFlags?.chapter26_open]],
  157:[['chapter26_end',!!S.storyFlags?.chapter26_end],['chapter27_open',!!S.storyFlags?.chapter27_open]],
  163:[['chapter27_end',!!S.storyFlags?.chapter27_end],['chapter28_open',!!S.storyFlags?.chapter28_open]],
  169:[['chapter28_end',!!S.storyFlags?.chapter28_end],['chapter29_open',!!S.storyFlags?.chapter29_open]],
  175:[['chapter29_end',!!S.storyFlags?.chapter29_end],['chapter30_open',!!S.storyFlags?.chapter30_open]],
  181:[['chapter30_end',!!S.storyFlags?.chapter30_end],['chapter31_open',!!S.storyFlags?.chapter31_open]],
  187:[['chapter31_end',!!S.storyFlags?.chapter31_end],['chapter32_open',!!S.storyFlags?.chapter32_open]],
  193:[['chapter32_end',!!S.storyFlags?.chapter32_end],['chapter33_open',!!S.storyFlags?.chapter33_open]],
  199:[['chapter33_end',!!S.storyFlags?.chapter33_end],['chapter34_open',!!S.storyFlags?.chapter34_open]],
  205:[['chapter34_end',!!S.storyFlags?.chapter34_end],['chapter35_open',!!S.storyFlags?.chapter35_open]],
  211:[['chapter35_end',!!S.storyFlags?.chapter35_end],['chapter36_open',!!S.storyFlags?.chapter36_open]],
  217:[['chapter36_end',!!S.storyFlags?.chapter36_end],['chapter37_open',!!S.storyFlags?.chapter37_open]]
 };
 // Chapters 4,5 also require the two new characters met in the previous quest.
 if(n>=20&&n<=25){
   const pair=CHAPTER4_MEET_ORDER['q'+(n-1)]||[];
   for(const hero of pair)if(!S.chapter4Met?.[hero])return hero+'_meet';
 }
 const prev='q'+(n-1);
 if(n>=4&&!S.storyFlags?.[prev])return prev;
 for(const [storyId,done] of extras[n]||[])if(!done)return storyId;
 return null;
}
function questIntroStory(q){
 if(!q)return null;
 if(typeof FLESHOUT_LEADS!=='undefined'&&FLESHOUT_LEADS[q.id+'_lead'])return q.id+'_lead';
 if(q.chapter>=3)return q.id+'_intro';
 return null;
}
function questNarrativeReady(q){
 return questBaseUnlocked(q)&&!questPreviousStory(q);
}
function questUnlocked(q){
 if(!questNarrativeReady(q))return false;
 if(S.quests?.[q.id]?.complete||S.investigations?.[q.id])return true;
 const intro=questIntroStory(q);
 return !intro||!!S.storyFlags?.[intro];
}

const fresh=()=>({version:1,hero74RevealMode:'story',hero74MeetSeen:{},storyFlags:{prologue:false,chapter1_open:false,chapter1_end:false,chapter2_open:false,q7:false,q8:false,q9:false,q10:false,q11:false,q12:false,chapter2_end:false,chapter3_open:false,q13:false,q14:false,q15:false,q16:false,q17:false,q18:false,chapter3_end:false,chapter4_open:false,q19:false,q20:false,q21:false,q22:false,q23:false,q24:false,chapter4_end:false,chapter5_open:false,q25:false,q26:false,q27:false,q28:false,q29:false,q30:false,chapter5_end:false,chapter6_open:false,q31:false,q32:false,q33:false,q34:false,q35:false,q36:false,chapter6_end:false,chapter7_open:false,q37:false,q38:false,q39:false,q40:false,q41:false,q42:false,chapter7_end:false,chapter8_open:false,q43:false,q44:false,q45:false,q46:false,q47:false,q48:false,chapter8_end:false,chapter9_open:false,q49:false,q50:false,q51:false,q52:false,q53:false,q54:false,chapter9_end:false,chapter10_open:false,q55:false,q56:false,q57:false,q58:false,q59:false,q60:false,chapter10_end:false,chapter11_open:false,q61:false,q62:false,q63:false,q64:false,q65:false,q66:false,chapter11_end:false,chapter12_open:false,q67:false,q68:false,q69:false,q70:false,q71:false,q72:false,chapter12_end:false,chapter13_open:false,q73:false,q74:false,q75:false,q76:false,q77:false,q78:false,chapter13_end:false,chapter14_open:false,q79:false,q80:false,q81:false,q82:false,q83:false,q84:false,chapter14_end:false,chapter15_open:false,q85:false,q86:false,q87:false,q88:false,q89:false,q90:false,chapter15_end:false,chapter16_open:false,q91:false,q92:false,q93:false,q94:false,q95:false,q96:false,chapter16_end:false,chapter17_open:false,q97:false,q98:false,q99:false,q100:false,q101:false,q102:false,chapter17_end:false,chapter18_open:false,q103:false,q104:false,q105:false,q106:false,q107:false,q108:false,chapter18_end:false,chapter19_open:false,q109:false,q110:false,q111:false,q112:false,q113:false,q114:false,chapter19_end:false,chapter20_open:false,q115:false,q116:false,q117:false,q118:false,q119:false,q120:false,chapter20_end:false,chapter21_open:false,q121:false,q122:false,q123:false,q124:false,q125:false,q126:false,chapter21_end:false,chapter22_open:false,q127:false,q128:false,q129:false,q130:false,q131:false,q132:false,chapter22_end:false,chapter23_open:false,q133:false,q134:false,q135:false,q136:false,q137:false,q138:false,chapter23_end:false,chapter24_open:false,q139:false,q140:false,q141:false,q142:false,q143:false,q144:false,chapter24_end:false,chapter25_open:false,q145:false,q146:false,q147:false,q148:false,q149:false,q150:false,chapter25_end:false,chapter26_open:false,q151:false,q152:false,q153:false,q154:false,q155:false,q156:false,chapter26_end:false,chapter27_open:false,q157:false,q158:false,q159:false,q160:false,q161:false,q162:false,chapter27_end:false,chapter28_open:false,q163:false,q164:false,q165:false,q166:false,q167:false,q168:false,chapter28_end:false,chapter29_open:false,q169:false,q170:false,q171:false,q172:false,q173:false,q174:false,chapter29_end:false,chapter30_open:false,q175:false,q176:false,q177:false,q178:false,q179:false,q180:false,chapter30_end:false,chapter31_open:false,q181:false,q182:false,q183:false,q184:false,q185:false,q186:false,chapter31_end:false,chapter32_open:false,q187:false,q188:false,q189:false,q190:false,q191:false,q192:false,chapter32_end:false,chapter33_open:false,q193:false,q194:false,q195:false,q196:false,q197:false,q198:false,chapter33_end:false,chapter34_open:false,q199:false,q200:false,q201:false,q202:false,q203:false,q204:false,chapter34_end:false,chapter35_open:false,q205:false,q206:false,q207:false,q208:false,q209:false,q210:false,chapter35_end:false,chapter36_open:false,q211:false,q212:false,q213:false,q214:false,q215:false,q216:false,chapter36_end:false,chapter37_open:false,q217:false,q218:false,q219:false,q220:false,q221:false,q222:false,chapter37_end:false,q3:false,q4:false,q5:false,q6:false,seaside_meet:false,lighthouse_meet:false},gems:10000,gold:1800,pulls:0,owned:{momoka_work:{lv:1,aff:0,lb:0,copies:0},milku_work:{lv:1,aff:0,lb:0,copies:0},momoka_sky:{lv:1,aff:0,lb:0,copies:0},milku_star:{lv:1,aff:0,lb:0,copies:0},akane_work:{lv:1,aff:0,lb:0,copies:0},aoi_work:{lv:1,aff:0,lb:0,copies:0}},party:['momoka_work','milku_work','akane_work','aoi_work'],quests:{},achievements:{},grindRuns:{},gachaPity:0,gachaSrStreak:0,dailyChats:{},love:initialLove(),dailySkips:{date:"",count:0},chapterChoiceMemory:{},bondRead:{momoka:[false,false,false,false,false],milku:[false,false,false,false,false],...Object.fromEntries(NEW_HERO_IDS.map(id=>[id,[false,false,false,false,false]]))},choiceMemories:{},choiceMemoryDay:{},choiceMemoryShown:{},choiceBattleShown:{},bondLastTopic:{momoka:-1,milku:-1,...Object.fromEntries(NEW_HERO_IDS.map(id=>[id,-1]))},talks:0,selected:'momoka_work',currentQuest:'q1',battleMode:'turn',battleModeOptInV03466:true,mode:'auto',homeFavorite:'momoka',homeUnitId:'momoka_work',playerName:'主人公',questGuideSeen:false,onboarding:{enabled:false,stage:'none',seen:{}},artPose:'dynamic',audio:validAudioSettings(null),gameStarted:false,investigations:{},insightRewards:{},shinonomeMet:false,oldcafeMet:false,oldcafeMeetingProgress:0,stationMet:false,stationMeetingProgress:0,schoolMet:false,schoolMeetingProgress:0,officeMet:false,officeMeetingProgress:0,seasideMet:false,seasideMeetingProgress:0,lighthouseMet:false,lighthouseMeetingProgress:0,tsubakiMet:false,erikaMet:false,kanameMet:false,kaedeMet:false,tsubakiMeetingProgress:0,erikaMeetingProgress:0,kanameMeetingProgress:0,kaedeMeetingProgress:0,sisterTalkSeen:{},chapter3Met:{saki:false,yuzu:false,anzu:false,reiko:false,chiyo:false,nazuna:false},chapter4Met:Object.fromEntries(NEW_HERO_IDS_V028.map(id=>[id,false])),heroSelectTickets:1,heroSelectTicketGranted:true,pickupStartDay:{shinonome:null,oldcafe:null,station:null,school_new:null,seaside:null,lighthouse:null,tsubaki:null,erika:null,kaname:null,kaede:null,chapter3_port:null,chapter4_city:null}});
// SaveStore deliberately reads/writes only KEY. OLD_KEY remains strictly read-only for backup.
const SaveStore=Object.freeze({
  key:KEY,
  read(){
    try {return window.localStorage.getItem(KEY)}
    catch(e){console.warn('[Yoiboshi] Browser storage unavailable:',e);return null}
  },
  readLegacy(){
    try {return window.localStorage.getItem(OLD_KEY)}
    catch(e){console.warn('[Yoiboshi] Legacy save unavailable for backup:',e);return null}
  },
  write(value){
    try {window.localStorage.setItem(KEY,JSON.stringify(value));return true}
    catch(e){console.warn('[Yoiboshi] Save was kept in memory only:',e);return false}
  }
});
const isRecord=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const integerOr=(value,fallback,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(value)&&value>=min&&value<=max?value:fallback;
const ECONOMY=Object.freeze({LEVEL_COST_PER_LV:110,FIRST_CLEAR_GOLD:650,FARM_GOLD:{q1:400,q2:470,q3:510,q4:530,q5:550,q6:600,q7:640,q8:680,q9:720,q10:750,q11:780,q12:850,q13:900,q14:950,q15:1000,q16:1040,q17:1120,q18:1160},FARM_GEMS:{q1:8,q2:12,q3:13,q4:14,q5:15,q6:18,q7:19,q8:20,q9:22,q10:24,q11:26,q12:30,q13:31,q14:32,q15:33,q16:34,q17:36,q18:36},DAILY_CHAT_MAX:3,SKIP_DAILY_MAX:10});
// RE:START Ver.0.9.2.1 — romantic day simulation (existing authored source data untouched).
const ROMANCE_RULES=Object.freeze({ACTIONS_PER_DAY:3,NEGLECT_DAYS:5,MOOD_LIMIT:2,REPLY_GAINS:[1,0,0]});
const ROMANCE_PLACES=Object.freeze([
 {id:'taiyaki',name:'東雲商店街のたい焼き屋',short:'たい焼き屋',likes:{momoka:'like',milku:'like'}},
 {id:'cafe',name:'西通りの喫茶街',short:'喫茶街',likes:{momoka:'normal',milku:'like'}},
 {id:'park',name:'宵星臨海公園',short:'臨海公園',likes:{momoka:'like',milku:'normal'}},
 {id:'arcade',name:'駅前のゲームセンター',short:'ゲームセンター',likes:{momoka:'like',milku:'dislike'}},
 {id:'library',name:'宵星市立図書館',short:'図書館',likes:{momoka:'dislike',milku:'like'}},
 {id:'horror',name:'映画館（ホラー上映）',short:'ホラー映画',likes:{momoka:'dislike',milku:'normal'}}
]);

// Ver.0.9.2.1 romance content-only extensions. Existing authored PEOPLE/ART/UNITS/BOND_STORIES stay byte-identical.
// Seven-heroine registry: old authored content remains in its original constants; new content is isolated in js/romance7.js.
const ORIGINAL_HERO_IDS=Object.freeze(['momoka','milku','reina','akane','aoi','chinatsu','nagi']);
const NEW_HERO_IDS=Object.freeze(['reina','akane','aoi','chinatsu','nagi',...SHINONOME_HERO_IDS,...OLDCAFE_HERO_IDS,...STATION_HERO_IDS,...NEW_Q4_HERO_IDS,...SEASIDE_HERO_IDS,...LIGHTHOUSE_HERO_IDS,...CHAPTER2_ALL_HERO_IDS,...NEW_HERO_IDS_V027,...NEW_HERO_IDS_V028,...NEW_HERO_IDS_V0420,...NEW_HERO_IDS_V0500,...NEW_HERO_IDS_V0690,...NEW_HERO_IDS_V0692,...NEW_HERO_IDS_V0750,...NEW_HERO_IDS_V0760]);
const HERO_IDS=Object.freeze([...ORIGINAL_HERO_IDS,...SHINONOME_HERO_IDS,...OLDCAFE_HERO_IDS,...STATION_HERO_IDS,...NEW_Q4_HERO_IDS,...SEASIDE_HERO_IDS,...LIGHTHOUSE_HERO_IDS,...CHAPTER2_ALL_HERO_IDS,...NEW_HERO_IDS_V027,...NEW_HERO_IDS_V028,...NEW_HERO_IDS_V0420,...NEW_HERO_IDS_V0500,...NEW_HERO_IDS_V0690,...NEW_HERO_IDS_V0692,...NEW_HERO_IDS_V0750,...NEW_HERO_IDS_V0760]);
const INVESTIGATION_HERO_IDS=ORIGINAL_HERO_IDS;
function extraHero(id){return ROMANCE7[id]||ROMANCE_SHINONOME[id]||ROMANCE_OLDCAFE[id]||ROMANCE_STATION[id]||ROMANCE_SCHOOL[id]||ROMANCE_SEASIDE[id]||ROMANCE_LIGHTHOUSE[id]||ROMANCE_CHAPTER2[id]||ROMANCE_CHAPTER2_LATE[id]||ROMANCE_V027[id]||ROMANCE_V028[id]||ROMANCE_V0420[id]||ROMANCE_V0500[id]||ROMANCE_V0690[id]||ROMANCE_V0692[id]||ROMANCE_V0750[id]||ROMANCE_V0760[id]||null}
function romancePlaceLike(place,id){return place.likes[id]??extraHero(id)?.likes[place.id]??'normal'}
// Story reveal comes before romance access. Owned legacy Nagi stays in the save but is locked until q6.
function heroineStoryRevealed(id,save=S){
 if(!heroV0690Visible(id,save))return false;
 if(NEW_HERO_IDS_V027.includes(id))return isV027HeroRevealed(id,save);
 if(NEW_HERO_IDS_V028.includes(id))return isV028HeroRevealed(id,save);
  if(NEW_HERO_IDS_V0420.includes(id))return isV0420Revealed(id,save);
 if(NEW_HERO_IDS_V0500.includes(id))return isV0500Revealed(id,save);
 if(id==='nagi')return !!save.quests?.q6?.complete;
 if(SHINONOME_HERO_IDS.includes(id))return !!save.shinonomeMet;
 if(OLDCAFE_HERO_IDS.includes(id))return !!save.oldcafeMet;
 if(STATION_HERO_IDS.includes(id))return !!save.stationMet;
 if(SCHOOL_HERO_IDS.includes(id))return !!save.schoolMet;
 if(OFFICE_HERO_IDS.includes(id))return !!save.officeMet;
 if(SEASIDE_HERO_IDS.includes(id))return !!save.seasideMet;
 if(LIGHTHOUSE_HERO_IDS.includes(id))return !!save.lighthouseMet;
 if(id==='tsubaki')return !!save.tsubakiMet;
 if(id==='erika')return !!save.erikaMet;
 if(id==='kaname')return !!save.kanameMet;
 if(id==='kaede')return !!save.kaedeMet;
 return true;
}
function heroineVisibleInTalk(id,save=S){return heroV0690Visible(id,save)&&(heroineStoryRevealed(id,save)||(id==='nagi'&&heroineOwned(id,save)))}
function romanceHeroAvailable(id){return HERO_IDS.includes(id)&&heroV0690Visible(id,S)&&heroineOwned(id)&&heroineStoryRevealed(id)}
// Daily speech is selected from existing affection. No new save field is required.
function romanceStageTier(id,aff){return (id==='lilith'||id==='cocoa'||id==='mio'||id==='yume')?(aff<20?'early':aff<40&&id!=='cocoa'?'mid':'late'):'late'}
function romanceStagePack(l,id){return (ROMANCE_STATION_STAGE_LINES[id]||ROMANCE_LIGHTHOUSE_STAGE_LINES[id]||ROMANCE_STAGE_LINES[id])?.[romanceStageTier(id,l.affection?.[id]||0)]||null}
function romanceMoodOptions(l,id,state){
 const base=romanceStagePack(l,id)?.moods?.[state]||ROMANCE_MOOD_VARIANTS[id][state];
 // Two small, conditional conversations; neither becomes visible before the related heroines are met.
 if(v027GameReady&&id==='luna'&&state==='normal'&&isV027HeroRevealed('saki')&&isV027HeroRevealed('yuzu'))return [...base,'いとこのサキとユズ、二人で宵波を始めたんだ。黒羽家の音楽は、離れていてもつながってる。'];
  if(v027GameReady&&id==='ageha'&&state==='normal'&&isV027HeroRevealed('anzu'))return [...base,'元弟子のあんず、あの子は人の指先を見るのが上手いの。私の手まで見抜くから、油断できないわ。'];
  // Chapter 4 links appear only once their new heroine has been met.
 if(id==='maron'&&state==='normal'&&v027GameReady&&isV028HeroRevealed('chihiro'))return [...base,'花村店長、今朝は蕾を一つずつ眺めていたの。私もあんなふうに、花を大事にしたいな。'];
 if(id==='marin'&&state==='normal'&&v027GameReady&&isV028HeroRevealed('karen'))return [...base,'隣のサーフショップのカレンさん、今日も波の話してくれたよ! 海って元気出るよね。'];
 if(id==='akane'&&state==='normal'&&v027GameReady&&isV028HeroRevealed('yuriko'))return [...base,'観光課の百合子先輩、祭りの準備で忙しいのにみんなを見てくれるんだ。私も頑張ろう!'];
 if(id==='luna'&&state==='normal'&&v027GameReady&&isV028HeroRevealed('ritsu'))return [...base,'リツの夜のラジオ、私もときどき聴くんだ。あの人、歌の前の静けさまで分かってくれる。'];
 return base;
}
function romancePlaceLinesFor(l,id,place){return romanceStagePack(l,id)?.placeLines?.[place]||ROMANCE_PLACE_LINES[id][place]}
function romanceInviteText(l,id){return romanceStagePack(l,id)?.invite||extraHero(id)?.invite||''}
function romanceTopicLines(id){const base=extraHero(id)?.topics||[],texts=romanceStagePack(loveState(),id)?.topics;return texts?base.map((t,i)=>({...t,text:texts[i]})):base}
const ROMANCE_WEATHERS=Object.freeze(['sun','cloud','rain']);
const ROMANCE_WEATHER_LABELS=Object.freeze({sun:'晴れ',cloud:'くもり',rain:'雨'});
const ROMANCE_GAIN=Object.freeze({place:Object.freeze({like:2,normal:1,dislike:0}),reply:Object.freeze({best:1,other:0,bad:0}),invitation:2});
const ROMANCE_MOOD_VARIANTS=Object.freeze({...Object.fromEntries(NEW_HERO_IDS.map(id=>[id,extraHero(id).moods])), "momoka":{"good":["えへへ、今日は歩くだけで楽しいかも。キミ、競争する？","ね、見て！　晴れてなくても、なんかいいことありそう！","たい焼きの匂いで目が覚めちゃった。寄り道しよ！","今日はぜったい笑わせるから、覚悟してね！","なんだか足が軽いな。……浮かれてないもん！"],"normal":["今日は何しよっか。決めるの、キミに任せちゃおうかな。","ねえ、遠回りして帰らない？　理由はないんだけど。","商店街って、毎日違う顔してるよね。","今日はゆっくり歩きたい気分。つきあってくれる？","さっきたい焼きの店主さんに呼び止められちゃった。"],"low":["あっ、いたいた！　ねえねえ、今日の話、聞いてよ……って、あれ？","えへへ、なんか声だけ元気すぎる？　気のせいだって！","今日はいっぱいしゃべりたいんだ。静かになると考えちゃうから。","ちょっと寝不足なだけ。だから、楽しいこと探そ！","ほら、笑顔！　……ちゃんとできてる、よね。"],"sulk":["あ、責任者さん。……もう忘れられたと思った。","たい焼きのしっぽ、ひとりで食べちゃったからね。","べつに怒ってないよ。……ほんとに、少ししか。","ねえ、今さらなんだけど。私の予定、空いてたんだよ？","今日も忙しい？　……だったら、先に言ってほしかったな。"]},"milku":{"good":["ふふ、今日は焼き菓子がきれいに膨らんだんです。","この先に新しい喫茶店があるそうです。気になりますね。","試作品、今日は全部残っていますよ。……本当です。","なんだか足取りが軽くて。こういう日もありますね。","ふふ、少しだけ自慢したいことがあるんです。"],"normal":["お帰りなさい。今日は温かいものがいいですね。","このお店のカップ、模様が素敵ですね。","今日は道を変えて帰りませんか。","新しいレシピを眺めていると、時間を忘れます。","荷物は半分持ちますね。……え、重くありませんよ。"],"low":["コーヒーはお砂糖を二つ……あれ、もう聞きましたか？","ふふ、今日は同じ説明を二度してしまいました。","……すみません、少し手順を飛ばしてしまって。","お茶を入れましょうか。あ、もう入れていましたね。","今日は新作を焼いたんです。……何を入れたか、少し曖昧で。"],"sulk":["責任者さん、お忙しかったんですね。……分かっています。","二人分のカップを用意してしまったんです。癖ですね。","ふふ、今日はひとりでお茶を飲む予定でした。","ええ、元気です。……本当に、それだけですか？","またお会いできたんですね。少し意外でした。"]}});
const ROMANCE_REPLY_CHOICES=Object.freeze({general:{"momoka":{"tease":["次の勝負も、ももかの勝ちでいいのか？","その顔、今日は俺の勝ちってことだな。"],"praise":["一緒にいると、時間の流れが違うな。","今日の景色、ももかと見ると悪くない。"],"care":["さっきの言葉、少し気になっていたんだ。","帰り道、もう少しゆっくり歩こう。"]},"milku":{"tease":["次は俺が試作品の審査員かな。","俺のほうが先に気づいたことにしておこうか。"],"praise":["今日の選び方、みるくらしいと思った。","みるくの工夫、俺には伝わっている。"],"care":["さっき、少し考え込んでいただろう。","次の予定は、みるくのペースで決めよう。"]}},byPlace:{"momoka":{"taiyaki":["しっぽ派の判定、今日は俺が引き受けよう。","焼きたてを一番に見つけたのはももかだな。","紙袋、半分持とうか。"],"cafe":["苦いコーヒー勝負なら、また挑むか？","窓際の席、ももかが見つけてくれてよかった。","砂糖、まだここに置いておくぞ。"],"park":["次は海風と追いかけっこでもするか？","海を見るときのももか、いい顔をしてるな。","風が強いな。こっちの道にしよう。"],"arcade":["その連勝記録、俺が止めてもいいか？","ゲームに夢中なももか、見ていて飽きない。","指、さっきから振っていただろう。"],"library":["静かに勝負するなら、目だけで会話するか？","本の山を崩さず戻したの、すごいな。","外に出たら、少し話そう。"],"horror":["今の音、俺より先に気づいたな。","最後まで座っていたのは立派だと思う。","明るい道、こっちだったな。"]},"milku":{"taiyaki":["味見担当なら、俺にも役目がありそうだな。","あんこの香りを当てるの、上手だな。","熱いから、包み紙をもう一枚使おう。"],"cafe":["店長なら、俺にどの席を勧める？","カップを見る目が、いつも真剣だな。","今日のメニュー、あとで一緒に書き留めよう。"],"park":["風に飛ばされたレシピ、俺が捕まえる番だな。","海の色に気づいたのは、みるくが先だ。","風が変わったな。帰りは橋の下を通ろう。"],"arcade":["機械と仲直りできたら、俺に教えてくれ。","あの難しい説明を聞き切ったのはすごい。","次は操作の少ないゲームにしようか。"],"library":["レシピ本の棚、俺より早く見つけたな。","選んだ一冊、みるくらしいな。","本が重そうだ。俺も持つよ。"],"horror":["ポップコーンの減りで、場面の怖さが分かるな。","暗い画面でも細かいところを見ていたな。","次は明るい映画にしようか。"]}}});
const ROMANCE_REPLY_ALTERNATIVES=Object.freeze({"momoka":{"good":{"tease":"えっ、そこで勝負しかける？　えへへ、受けて立つよ！","praise":"そんなこと言われると、こっちが照れるんだけど！","care":"気づかいすぎー！　でも、一緒に歩こ。"},"normal":{"tease":"今日は競争する気分じゃないの。……でも笑っちゃった。","praise":"……うん。今の言葉、覚えておくね。","care":"それなら、あと少しだけ隣にいてね。"},"low":{"tease":"ごめん、今はツッコミも出てこないや。","praise":"……嬉しいのに、ちゃんと返せないな。","care":"あ、分かった？　……ちょっとだけ聞いてくれる？"}},"milku":{"good":{"tease":"ふふ、今度の勝負は私からお誘いしますね。","praise":"……そんなふうに見てくださっていたんですね。","care":"今日は大丈夫です。……でも、お言葉は嬉しいです。"},"normal":{"tease":"あら、からかわれてしまいましたね。","praise":"ありがとうございます。少し顔が熱くなります。","care":"……気づいていただけたなら、よかったです。"},"low":{"tease":"今日は冗談を受け止める余裕がなくて……すみません。","praise":"……今は上手にお返事できません。","care":"気づかれてしまいましたね。……少しだけ、話しても？"}}});
const ROMANCE_REPLY_TYPES=Object.freeze(['tease','praise','care']);
function randomPick(list){return list[Math.floor(Math.random()*list.length)]}
function chooseDifferent(list,last){return randomPick(list.filter(x=>x!==last).length?list.filter(x=>x!==last):list)}
const EXPRESSION_BY_MOOD=Object.freeze({good:'smile',normal:'normal',low:'sad',sulk:'pout'});
let expressionFxMemory={};
function motionReduced(){return !!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)}
function moodToFace(value){return EXPRESSION_BY_MOOD[value]||'normal'}
// Expression assignment is curated in js/expression_cues.js; no keyword classification.
function inferExpressionFace(personId,text='',fallback='normal'){return normalizeExpressionFace(fallback)}
function lineFace(line,personId){return line&&line.face&&PEOPLE[personId]?normalizeExpressionFace(line.face):'normal'}
function authoredStoryCue(storyId,index){
 if(storyId==='chapter1_end'&&(heroAff('momoka')||heroAff('milku'))&&index===CHAPTER_STORIES.chapter1_end.lines.findIndex(line=>line.ch1EndHook)){
  const target=heroAff('momoka')>=heroAff('milku')?'momoka':'milku';
  return {target,face:'blush'};
 }
 return EXPRESSION_CUES.stories[storyId]?.[String(index+1)]||null;
}
function authoredStoryFaceState(storyId,lines,index){
 const state={};let lastTarget=null;
 for(let i=0;i<=index;i++){
  const cue=lines?.[i]?.cue||authoredStoryCue(storyId,i);
  if(cue&&PEOPLE[cue.target]){state[cue.target]=cue.face;lastTarget=cue.target}
 }
 return {faces:state,lastTarget};
}
function rememberExpression(sceneKey,personId,face,allowFallback){
 const key=`${sceneKey}:${personId}`;
 const token=`${personId}:${face}:${allowFallback?'fallback':'art'}`;
 const play=!motionReduced()&&allowFallback&&face!=='normal'&&expressionFxMemory[key]!==token;
 expressionFxMemory[key]=token;
 return play;
}
function expressionIconSvg(face){
 if(face==='surprise')return '<svg class="expr-emotion-icon" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="32" fill="#fff3c8" stroke="#f6b744" stroke-width="4"/><path d="M40 18v29" stroke="#e88a20" stroke-width="10" stroke-linecap="round"/><circle cx="40" cy="59" r="5" fill="#e88a20"/></svg>';
 if(face==='smile')return '<svg class="expr-emotion-icon" viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="#f6c44c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M24 14l6 10 12-2-6 10 8 8-12-1-6 11-4-12-12-1 10-8-4-10 12 4z" fill="#ffe49a" opacity=".95"/><path d="M54 10c5 4 8 9 8 15"/><path d="M60 24c4 1 7 3 10 6"/></g></svg>';
 if(face==='blush')return '<svg class="expr-emotion-icon" viewBox="0 0 88 88" aria-hidden="true"><path d="M44 73c-6-8-24-18-24-35 0-8 6-15 15-15 5 0 10 3 13 8 3-5 8-8 13-8 9 0 15 7 15 15 0 17-18 27-32 35z" fill="#ff8db0" stroke="#f26894" stroke-width="4" stroke-linejoin="round"/></svg>';
 if(face==='pout')return '<svg class="expr-emotion-icon" viewBox="0 0 80 80" aria-hidden="true"><g fill="none" stroke="#eb5d79" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12v21h-13"/><path d="M31 7v16h17"/><path d="M59 18v18h12"/><path d="M39 43v22h-16"/></g></svg>';
 if(face==='sad')return '<svg class="expr-emotion-icon" viewBox="0 0 80 80" aria-hidden="true"><defs><linearGradient id="tearG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec8ff"/><stop offset="1" stop-color="#5b8dd8"/></linearGradient></defs><path d="M51 13c8 0 14 6 14 13 0 6-3 9-6 12H41c-4-3-6-7-6-12 0-7 7-13 16-13z" fill="#b9cce7" opacity=".8"/><path d="M44 38c0 10-8 13-8 22 0 5 4 9 9 9 6 0 11-4 11-10 0-8-6-12-12-21z" fill="url(#tearG)" stroke="#5b8dd8" stroke-width="3"/></svg>';
 return '';
}
function expressionFallbackMarkup(face){
 if(face==='normal')return '';
 return `<div class="expr-fallback-wrap">${expressionIconSvg(face)}</div>`;
}
function expressionPortraitMarkup(personId,face='normal',sceneKey='default',opts={}){
 // Ver.0.50.0.1: reversible symbol mode; all legacy face art remains registered and untouched.
 if(typeof symbolReactionEnabledV0500==='function'&&symbolReactionEnabledV0500(personId)){
  return symbolReactionRenderV0500({personId,face,sceneKey,opts,esc,motionReduced});
 }
 const actual=normalizeExpressionFace(face), hasAlt=hasExpressionArt(personId,actual);
 const trueTouko=personId==='touko'&&storySession&&(TRUE_TOUKO_STORY_IDS.includes(storySession.id)||(storySession.id==='q52_intro'&&storySession.step>=(CHAPTER_STORIES.q52_intro?.lines?.findIndex(l=>l.toukoReveal)??99))); // v0.36.0.0: 正体の姿は第9章まで使わない
 // v0.34.55.0: 透子は背景を抜いた会話用の上半身（story_cast/touko_talk.webp）を使う
 const src=trueTouko?'assets/ART_V2/story_cast/touko_true_talk.webp?v=0.34.71.0':personId==='sacchan'?'assets/ART_V2/story_cast/sacchan_talk.webp?v=0.65.9.0':['touko','sakuya','ibuki','haruka','saya','natsume','hotaru','aoi_dark','ruri','ichika','minori','sumire','kirie','enju','wakaba','urara','tokoyo','iroha'].includes(personId)?`assets/ART_V2/story_cast/${personId}_talk.webp?v=0.65.6.0`:expressionArt(personId,actual);
 const play=rememberExpression(sceneKey,personId,actual,!hasAlt);
 const wrapClass=[opts.wrapperClass||'',`expr-face-${actual}`,!hasAlt&&actual!=='normal'?'expr-uses-fallback':'',play?`expr-animate-${actual}`:'',opts.stateClass||''].filter(Boolean).join(' ');
 const alt=opts.alt||`${PEOPLE[personId]?.name||personId}の立ち絵`;
 const imageMarkup=`<img class="${opts.imageClass||'expr-character-img'}" src="${src}" alt="${esc(alt)}">`;
 // The fit applies only to the chapter-story expression portrait, never to fallback/full-body art.
 // Use a nested layer so speaker transitions and expression animations on the outer stage remain intact.
 const talkCast=['touko','sakuya','ibuki','haruka','saya','natsume','hotaru','aoi_dark','ruri','ichika','minori','sumire','kirie','enju','wakaba','urara','tokoyo','iroha'].includes(personId);
 const fit=opts.chapterStoryFit&&(hasAlt||talkCast)&&typeof PORTRAIT_FIT!=='undefined'?PORTRAIT_FIT[trueTouko?'touko_true':personId]:null;
 const fittedMarkup=fit?`<div class="story-portrait-fit" style="--pf-s:${fit.s};--pf-u:${fit.u};--pf-x:${fit.x}"><div class="story-portrait-shift${fit.f?' is-top-fade':''}">${imageMarkup}</div></div>`:imageMarkup;
 return `<div class="${wrapClass}" data-person-id="${personId}" data-expression="${actual}" data-expression-source="${hasAlt?'art':'fallback'}">${fittedMarkup}${!hasAlt?expressionFallbackMarkup(actual):''}</div>`;
}
function annotateLines(lines,whoResolver){
 (lines||[]).forEach((line,index)=>{
   if(!line||line.face) return;
   const who=whoResolver?whoResolver(line,index):line.who;
   if(!who||!PEOPLE[who]) return;
   const fallback=(line.mood&&moodToFace(line.mood))||'normal';
   line.face=inferExpressionFace(who,line.text||line.question||'',fallback);
 });
}
function moodFaceForHero(id){const l=loveState();return l.sulking[id]?'pout':moodToFace(l.mood[id]);}
function nextMoodLine(l,id){const state=l.sulking[id]?'sulk':l.mood[id];const options=romanceMoodOptions(l,id,state);const next=chooseDifferent(options,l.lastMoodText[id]||'');l.lastMoodText[id]=next;l.moodLine[id]=next}
function makeRomanceInvite(day,eligible=['momoka','milku']){if(day%3!==0||!eligible.length)return null;const person=randomPick(eligible),place=randomPick(ROMANCE_PLACES).id;return {day,person,place,used:false}}
function weatherKind(place,original,weather){if(weather!=='rain')return original;const rank=['dislike','normal','like'],n=rank.indexOf(original);if(place==='park')return rank[Math.max(0,n-1)];if(['cafe','library','horror'].includes(place))return rank[Math.min(2,n+1)];return original}
function datedReplyChoices(l,id,place){const output=ROMANCE_REPLY_TYPES.map(type=>{const pool=extraHero(id)?extraHero(id).replyChoices.general[type]:[ROMANCE_REPLY_CHOICES.byPlace[id][place][ROMANCE_REPLY_TYPES.indexOf(type)],...ROMANCE_REPLY_CHOICES.general[id][type]];const key=id+':'+type;const text=chooseDifferent(pool,l.lastReplyText[key]);l.lastReplyText[key]=text;return {type,text}});let result;do {result=output.slice().sort(()=>Math.random()-.5)}while(result.map(x=>x.type).join(',')===l.lastReplyOrder[id]);l.lastReplyOrder[id]=result.map(x=>x.type).join(',');return result}
function resultReplyText(l,id,type,selectedText=null){const mood=l.mood[id],key=`${id}:${mood}:${type}`;const options=extraHero(id)?extraHero(id).replyResults[mood][type]:[ROMANCE_REPLY_RESULT[id][mood][type],ROMANCE_REPLY_ALTERNATIVES[id][mood][type]];if((ROMANCE_STATION[id]||ROMANCE_SCHOOL[id]||ROMANCE_SEASIDE[id]||ROMANCE_LIGHTHOUSE[id])&&selectedText){const i=(ROMANCE_STATION[id]||ROMANCE_SCHOOL[id]||ROMANCE_SEASIDE[id]||ROMANCE_LIGHTHOUSE[id]).replyChoices.general[type].indexOf(selectedText);if(i>=0&&options[i]){l.lastReaction[key]=options[i];return options[i]}}const result=chooseDifferent(options,l.lastReaction[key]);l.lastReaction[key]=result;return result}

const ROMANCE_MOODS=Object.freeze(['good','normal','low']);
const ROMANCE_MOOD_HINTS=Object.freeze({
 momoka:{good:'えへへ、今日は何しても楽しくなりそう！　あ、いま笑った？',normal:'今日は、のんびりおしゃべりしたい気分かも。',low:'……あ、責任者さん。うん、いつも通りだよ',sulk:'……ずいぶん忙しかったみたいだね。べつに、待ってないけど！'},
 milku:{good:'ふふ、今日は新作がうまく焼けたんです。少し自慢しても？',normal:'お疲れさまです。今日は、温かいものを飲みたいですね。',low:'……あ、すみません。少し考え事をしていました',sulk:'お仕事がお忙しいのは承知しています。……私の予定も、空けたままでしたけれど'}
});
const ROMANCE_MOOD_REPLY=Object.freeze({...Object.fromEntries(NEW_HERO_IDS.map(id=>[id,extraHero(id).replyBest])), momoka:{good:'tease',normal:'praise',low:'care'},milku:{good:'praise',normal:'care',low:'care'}});
const ROMANCE_RESPONSE_TEXT=Object.freeze({
 momoka:{tease:'今日は俺に勝てるつもりか？',praise:'ももかといると、時間が早く過ぎるな',care:'無理してないか。少し休んでいこう'},
 milku:{tease:'今日は俺のほうが味見係でいいか？',praise:'みるくが準備してくれたもの、いつも楽しみだ',care:'今日は俺がやる。みるくは座っていてくれ'}
});
const ROMANCE_REPLY_RESULT=Object.freeze({
 momoka:{good:{tease:'むっ、勝負する？　えへへ、負けないんだから！',praise:'な、なにそれ！　……ちょっと照れるでしょ！',care:'心配しすぎだもん。……でもありがと！'},normal:{tease:'今日は勝負よりおしゃべりがいいな。……だめ？',praise:'えへへ。私も、一緒だとあっという間だよ。',care:'うん、少し座ろっか。責任者さんも隣ね。'},low:{tease:'……今日はあんまり笑う元気、ないかも。',praise:'うれしいけど、今日はそんな顔できなくて。',care:'……気づいてくれたんだ。少しだけ、そばにいて。'}},
 milku:{good:{tease:'ふふ、それなら厳しい採点をお願いしますね。',praise:'……そう言っていただけると、また作りたくなります。',care:'今日は元気ですよ。……でも、少し甘えてもいいですか？'},normal:{tease:'えっ、私の分は……。ふふ、冗談ですよね？',praise:'ありがとうございます。……少し、恥ずかしいです。',care:'……私のことまで。では、一緒に休みましょう。'},low:{tease:'……ごめんなさい。今日はうまく笑えなくて。',praise:'ありがとうございます。でも少し、気持ちが追いつかなくて。',care:'……大丈夫って言おうと思っていました。よく分かりましたね。'}}
});
const ROMANCE_CLUES=Object.freeze({...Object.fromEntries(NEW_HERO_IDS.map(id=>[id,extraHero(id).clues])), 
 momoka:[{place:'taiyaki',text:'たい焼きはしっぽから！　あのお店の匂い、大好きだもん。'},{place:'horror',text:'怖い映画？　へ、平気だし！　……暗いのは、ちょっとね。'},{place:'park',text:'海風が吹く場所って、なんだかわくわくするね。'},{place:'arcade',text:'ゲームで負けたらたい焼きをおごる！　勝負しよ！'},{place:'library',text:'図書館は静かすぎて、ついそわそわしちゃうんだ。'}],
 milku:[{place:'cafe',text:'昔の喫茶街を歩くと、お店を持つ夢を思い出すんです。'},{place:'library',text:'レシピの本が並ぶ棚、つい長居してしまいます。'},{place:'arcade',text:'機械って、なぜか私の前では動かなくなるんです……。'},{place:'taiyaki',text:'甘い香りがすると、少しだけ寄り道したくなります。'},{place:'park',text:'海辺は景色がいいですね。少し風が強いですけれど。'}]
});
const ROMANCE_PLACE_LINES=Object.freeze({...Object.fromEntries(NEW_HERO_IDS.map(id=>[id,extraHero(id).placeLines])), 
 momoka:{taiyaki:['えへへ、しっぽから食べる派、大集合！　責任者さんもだよ！','今日のあんこ、いつもより多い！　半分こしよ！'],cafe:['ねえ、窓際の席に座ろ！　ここ、落ち着くね。','大人っぽいコーヒーに挑戦……に、苦い！　砂糖ちょうだい！'],park:['風が気持ちいい！　あそこまで競争しよ！','海に向かって大声出したくなるね。えへへ！'],arcade:['今日こそクレーンゲームで勝つもん！','この音！　わくわくする！　次は対戦しよ！'],library:['しーっ……あ、私が一番うるさい？　えへへ。','あの、ここって笑ったら怒られるかな……？'],horror:['こ、怖くないよ！　あの席、隣に座ってね！','あの音、映画の演出だよね!?　ね、そうだよね!?']},
 milku:{taiyaki:['焼きたての甘い匂い……ふふ、幸せですね。','あんこもいいですけど、クリームも試したくなります。'],cafe:['ここのカップ、いつか私の店にも置きたいです。','こんな照明のお店、開けたら素敵でしょうね。'],park:['風が心地いいですね。少し歩いてみましょうか。','あのベンチで、ゆっくりお茶を飲みたいです。'],arcade:['こ、このボタンは……あっ、画面が止まりました！','説明書のどこに電源って……あれ、また違いました？'],library:['このレシピ、仕上げに蜂蜜を入れるんですね。','ふふ、書き留めたいレシピがいっぱいです。'],horror:['不思議な演出ですね。少し緊張します。','ふふ……今の場面、思わず息を止めていました。']}
});
const ROMANCE_BAD_SCENES=Object.freeze({...Object.fromEntries(NEW_HERO_IDS.map(id=>[id,Object.fromEntries(Object.entries(extraHero(id).likes).filter(([,kind])=>kind==='dislike').map(([place])=>[
 place,[`${PEOPLE[id].name}は少し困ったように立ち止まった。`,`${PEOPLE[id].name}「……ここは、少し苦手かもしれません。」`,'無理に笑おうとして、ふたりで顔を見合わせる。',`${PEOPLE[id].name}「次は、別の場所にしましょうか。」`]
]))])),
 momoka:{library:['静かな館内で、ももかは椅子に座るなり足をぱたぱたさせた。','ももか「今、静かにしようと頑張ってるんだもん……！」','司書の視線に気づき、彼女はぴたりと固まった。','ももか「……そろそろ外の空気、吸いに行かない？」'],horror:['暗転したスクリーンに、不気味な足音が響いた。','ももか「へ、平気。私、平気だからね……！」','突然の物音に彼女がこちらの袖をぎゅっとつかむ。','ももか「……今のは驚いたんじゃなくて、確認しただけ！」']},
 milku:{arcade:['ゲームセンターの音に包まれ、みるくは操作パネルを見つめた。','みるく「これを押すと……え、どうして止まるんでしょう？」','店員が直すと、画面には「おめでとう」の文字。','みるく「ふふ……何もしていないのに、褒められてしまいました。」']}
});
const ROMANCE_SULK_REPAIR=Object.freeze({...Object.fromEntries(NEW_HERO_IDS.map(id=>[id,extraHero(id).repair])), 
 momoka:{choices:['商店街のたい焼きを差し出す','次の依頼を先に説明する'],correct:0,yes:'……しっぽのほう、私にくれる？　えへへ。じゃあ今回は許す！',no:'仕事の話ならあとでいい！　……別に、怒ってないけど。'},
 milku:{choices:['会えなかったことを正直に謝る','新しい機材の話を始める'],correct:0,yes:'……そうやって言ってくださるなら。ふふ、もう大丈夫です。',no:'機材ですか……。今日は、違う話がしたかったです。'}
});
const ROMANCE_MEMORIES=Object.freeze({...Object.fromEntries(NEW_HERO_IDS.map(id=>[id,extraHero(id).memories])), momoka:{1:{place:'taiyaki',label:'商店街のたい焼き屋に一緒に行ってみたい'},3:{scene:'horror',label:'映画館で怖い映画を一緒に観てみたい'}},milku:{1:{place:'cafe',label:'西通りの喫茶街を一緒に歩いてみたい'},3:{scene:'library',label:'図書館でレシピ本を一緒に読んでみたい'}}});
function initialLove(){const d={day:1,actions:ROMANCE_RULES.ACTIONS_PER_DAY,mood:{momoka:ROMANCE_MOODS[Math.floor(Math.random()*3)],milku:ROMANCE_MOODS[Math.floor(Math.random()*3)]},moodStreak:{momoka:1,milku:1},missed:{momoka:0,milku:0},sulking:{momoka:false,milku:false},met:{momoka:false,milku:false},visits:{momoka:{},milku:{}},scenes:{momoka:{},milku:{}},hints:{momoka:{},milku:{}},lastPlace:{momoka:'',milku:''},lastLine:{momoka:{},milku:{}},clueIndex:{momoka:0,milku:0},weather:randomPick(ROMANCE_WEATHERS),invitation:null,inviteHistory:[],weatherHistory:[],moodLine:{momoka:'',milku:''},lastMoodText:{momoka:'',milku:''},lastReplyText:{},lastReplyOrder:{momoka:'',milku:''},lastReaction:{},pending:null};nextMoodLine(d,'momoka');nextMoodLine(d,'milku');
 for(const id of NEW_HERO_IDS){
   d.mood[id]=randomPick(ROMANCE_MOODS);d.moodStreak[id]=1;d.missed[id]=0;d.sulking[id]=false;d.met[id]=false;
   d.visits[id]={};d.scenes[id]={};d.hints[id]={};d.lastPlace[id]='';d.lastLine[id]={};d.clueIndex[id]=0;
   d.moodLine[id]='';d.lastMoodText[id]='';d.lastReplyOrder[id]='';nextMoodLine(d,id);
 }
 d.affection=Object.fromEntries(NEW_HERO_IDS.map(id=>[id,0]));d.activeHero='momoka';return d;}
function migrateLove(raw){
 const d=initialLove(),r=isRecord(raw)?raw:{};
 d.day=integerOr(r.day,1,1,1000000);d.actions=integerOr(r.actions,3,0,3);
 for(const id of HERO_IDS){
  d.mood[id]=ROMANCE_MOODS.includes(r.mood?.[id])?r.mood[id]:d.mood[id];
  d.moodStreak[id]=integerOr(r.moodStreak?.[id],1,1,2);
  d.missed[id]=integerOr(r.missed?.[id],0,0,1000000);
  d.sulking[id]=r.sulking?.[id]===true;d.met[id]=r.met?.[id]===true;
  for(const p of ROMANCE_PLACES)d.visits[id][p.id]=integerOr(r.visits?.[id]?.[p.id],0,0,1000000);
  d.scenes[id]=isRecord(r.scenes?.[id])?{...r.scenes[id]}:{};
  d.hints[id]=isRecord(r.hints?.[id])?{...r.hints[id]}:{};
  d.lastPlace[id]=ROMANCE_PLACES.some(p=>p.id===r.lastPlace?.[id])?r.lastPlace[id]:'';
  d.lastLine[id]=isRecord(r.lastLine?.[id])?{...r.lastLine[id]}:{};
  d.clueIndex[id]=integerOr(r.clueIndex?.[id],0,0,100000);
  d.lastMoodText[id]=typeof r.lastMoodText?.[id]==='string'?r.lastMoodText[id]:'';
  d.moodLine[id]=typeof r.moodLine?.[id]==='string'?r.moodLine[id]:'';
  d.lastReplyOrder[id]=typeof r.lastReplyOrder?.[id]==='string'?r.lastReplyOrder[id]:'';
  if(!d.moodLine[id])nextMoodLine(d,id);
 }
 d.weather=ROMANCE_WEATHERS.includes(r.weather)?r.weather:d.weather;
 d.weatherHistory=Array.isArray(r.weatherHistory)?r.weatherHistory.slice(-100):[];
 d.inviteHistory=Array.isArray(r.inviteHistory)?r.inviteHistory.slice(-100):[];
 if(isRecord(r.invitation)&&HERO_IDS.includes(r.invitation.person)&&(!OLDCAFE_HERO_IDS.includes(r.invitation.person)||r.oldcafeMet===true)&&ROMANCE_PLACES.some(p=>p.id===r.invitation.place)&&r.invitation.day===d.day)d.invitation={day:d.day,person:r.invitation.person,place:r.invitation.place,used:r.invitation.used===true};
 else if(!Object.prototype.hasOwnProperty.call(r,'invitation')&&d.day%3===0)d.invitation=makeRomanceInvite(d.day,['momoka','milku']);
 d.affection=Object.fromEntries(NEW_HERO_IDS.map(id=>[id,integerOr(r.affection?.[id],0,0,100)]));
 d.activeHero=HERO_IDS.includes(r.activeHero)?r.activeHero:'momoka';
 d.lastReplyText=isRecord(r.lastReplyText)?{...r.lastReplyText}:{};
 d.lastReaction=isRecord(r.lastReaction)?{...r.lastReaction}:{};
 const a=r.pending;
 if(isRecord(a)&&HERO_IDS.includes(a.person)&&ROMANCE_PLACES.some(p=>p.id===a.place)&&['talk','scene'].includes(a.stage)){
  const choices=Array.isArray(a.choices)&&a.choices.length===3&&a.choices.every(c=>ROMANCE_REPLY_TYPES.includes(c.type)&&typeof c.text==='string')?a.choices:datedReplyChoices(d,a.person,a.place);
  d.pending={person:a.person,place:a.place,stage:a.stage,step:integerOr(a.step,0,0,4),choices,placeGain:integerOr(a.placeGain,0,0,12),kind:String(a.kind||'normal'),lines:Array.isArray(a.lines)&&a.lines.length>=3?a.lines:null};
 }
 return d;
}

function loveState(){return S.love;}
function memoryRequirement(id,i){return ROMANCE_MEMORIES[id]?.[i]||null}
function memoryUnlocked(id,i){const req=memoryRequirement(id,i);return !req||(req.place?loveState().visits[id][req.place]>0:!!loveState().scenes[id][req.scene])}
function bondMemoryHint(id,i){const req=memoryRequirement(id,i);return req&&!memoryUnlocked(id,i)?req.label:''}
function romanceAvailablePlaces(){return ROMANCE_PLACES}
function loveCanAct(){return loveState().actions>0}
function loveMoodDescription(id){const l=loveState(),state=l.sulking[id]?'sulk':l.mood[id],opts=romanceMoodOptions(l,id,state);return opts.includes(l.moodLine[id])?l.moodLine[id]:opts[0]||ROMANCE_MOOD_HINTS[id]?.[state]||''}
function selectRomancePerson(id){if(!HERO_IDS.includes(id)||!romanceHeroAvailable(id))return;S.love.activeHero=id;const u=UNITS.find(u=>u.person===id&&data(u.id));if(u)S.selected=u.id;persist();change('talk')}
function finishRomanceDay(){
 const l=loveState();if(l.pending)return toast('おでかけの会話を終えてから一日を締めくくってください');
 for(const id of HERO_IDS){
  // Unowned heroines must not suffer neglect penalties while they cannot be contacted.
  if(!romanceHeroAvailable(id))continue;
  l.missed[id]=l.met[id]?0:l.missed[id]+1;
  if(l.missed[id]>=ROMANCE_RULES.NEGLECT_DAYS&&heroAff(id)>=20)l.sulking[id]=true;
  if(heroAff(id)<20)l.sulking[id]=false;
  l.met[id]=false;
  const prior=l.mood[id],streak=l.moodStreak[id];
  const options=ROMANCE_MOODS.filter(x=>!(x===prior&&streak>=ROMANCE_RULES.MOOD_LIMIT));
  const next=randomPick(options);l.moodStreak[id]=next===prior?streak+1:1;l.mood[id]=next;
 }
 l.day++;l.actions=ROMANCE_RULES.ACTIONS_PER_DAY;
 l.weather=randomPick(ROMANCE_WEATHERS);l.weatherHistory.push({day:l.day,weather:l.weather});l.weatherHistory=l.weatherHistory.slice(-100);
 l.invitation=makeRomanceInvite(l.day,HERO_IDS.filter(id=>romanceHeroAvailable(id)));if(l.invitation){const invite=l.invitation;l.inviteHistory.push({day:l.day,person:invite.person,place:invite.place,fulfilled:false});l.inviteHistory=l.inviteHistory.slice(-100)}
 for(const id of HERO_IDS)nextMoodLine(l,id);
 persist();render();toast(`${l.day}日目になりました`);
}

// v0.35.1.0 交流画面：お知らせを1つにまとめ、今日の予定と相手の様子を見せる
function romanceMeetItems(){
 const q=n=>!!S.quests['q'+n]?.complete,f=k=>!!S.storyFlags?.[k];
 const list=[
  [q(1)&&!S.shinonomeMet,'shinonome_meet','東雲商店街で新しい出会い','時計の異変が鎮まりました。商店街の4人に会いに行きましょう。',S.shinonomeMeetingProgress],
  [q(2)&&!S.oldcafeMet,'oldcafe_meet','旧喫茶街で新しい出会い','カフェの異変が鎮まりました。店主たちに会いに行きましょう。',S.oldcafeMeetingProgress],
  [q(3)&&!S.stationMet,'station_meet','東雲駅前で新しい出会い','踏切の警報が鎮まりました。駅前の6人と出会いましょう。',S.stationMeetingProgress],
  [q(4)&&!S.schoolMet,'school_meet','旧第二小学校で新しい出会い','',S.schoolMeetingProgress],
  [q(4)&&S.schoolMet&&!S.officeMet,'office_meet','相談室に新しい顔ぶれ','',S.officeMeetingProgress],
  [q(5)&&!S.seasideMet,'seaside_meet','臨海公園で新しい出会い','観覧車の異変が鎮まりました。海辺の4人に会いに行きましょう。',S.seasideMeetingProgress],
  [q(6)&&f('chapter1_end')&&!S.lighthouseMet,'lighthouse_meet','旧灯台の目覚め','第1章の終幕を迎えました。灯台の後片付けに戻りましょう。',S.lighthouseMeetingProgress],
  [q(7)&&!S.tsubakiMet,'tsubaki_meet','神楽坂 椿との出会い','',0],
  [q(8)&&!S.erikaMet,'erika_meet','城ヶ崎 エリカとの出会い','',0],
  [q(11)&&!S.kanameMet,'kaname_meet','紫藤 カナメとの再会','',S.kanameMeetingProgress],
  [q(12)&&!S.kaedeMet,'kaede_meet','神楽坂 楓との出会い','',S.kaedeMeetingProgress],
  [q(12)&&S.kaedeMet&&!f('chapter2_end'),'chapter2_end','第2章 終幕','',0]
 ];
 return list.filter(x=>x[0]).map(([,id,title,desc,prog])=>({id,title,desc,prog:prog||0}));
}
let romanceMeetOpen=false;
function toggleRomanceMeets(){romanceMeetOpen=!romanceMeetOpen;render();}
function romanceMeetNotices(){
 const items=romanceMeetItems();if(!items.length)return '';
 const head=`<button type="button" class="romance-meet-head" onclick="toggleRomanceMeets()" aria-expanded="${romanceMeetOpen}"><span><b>✦ 新しい出会いが${items.length}件</b><small>${esc(items[0].title)}${items.length>1?` ほか${items.length-1}件`:''}</small></span><i>${romanceMeetOpen?'閉じる ▲':'見る ▼'}</i></button>`;
 const body=romanceMeetOpen?`<div class="romance-meet-list">${items.map(x=>`<div class="romance-meet-item"><div><strong>${esc(x.title)}</strong>${x.desc?`<small>${esc(x.desc)}</small>`:''}</div><button class="btn primary" onclick="openStory('${x.id}')">${x.prog>0?'続きを読む':'読む'} ▸</button></div>`).join('')}</div>`:'';
 return `<section class="card romance-meet">${head}${body}</section>`;
}
function romanceMoodShort(id){const l=loveState();if(l.sulking[id])return 'ごきげん斜め';return {happy:'ごきげん',normal:'ふつう',tired:'おつかれ',shy:'そわそわ',down:'しずか'}[l.mood[id]]||'ふつう';}
function romancePlaceHintFor(id){
 const l=loveState(),known=ROMANCE_PLACES.filter(p=>(l.visits[id]||{})[p.id]>0);
 const like=known.filter(p=>romancePlaceLike(p,id)==='like').map(p=>p.short);
 const dis=known.filter(p=>romancePlaceLike(p,id)==='dislike').map(p=>p.short);
 if(!known.length)return '行き先の好みはまだ分かりません。出かけると手帳に記録されます。';
 return `${like.length?`好き：${like.join('・')}`:''}${like.length&&dis.length?' ／ ':''}${dis.length?`苦手：${dis.join('・')}`:''}`||'好みはまだはっきりしません。';
}
// Choice memory v0.2: existing first bond episodes of seven established heroines.
// This is a deferred personal dialogue, not another daily action or a battle reward.
const CHOICE_MEMORY_LINES=Object.freeze({
 momoka:Object.freeze({
  key:'bond_momoka_0',
  hint:'ももかが、たい焼き裁判の続きを話したがっている。',
  a:'「ねえ、責任者さん！ たい焼き裁判の判決、まだ有効だからね。今日は半分こしよ！」',
  b:'「あっ、頭派の裁判官！ 今日こそしっぽ派に寝返らせちゃうから、覚悟してね！」'
 }),
 milku:Object.freeze({
  key:'bond_milku_0',
  hint:'みるくが、前に一緒に食べたタルトの話を覚えている。',
  a:'「この前の試作、味見したのをすぐ見抜かれましたね。今日は二人分、ちゃんと用意しましたよ。」',
  b:'「この前、一緒に食べてくださったのが嬉しくて。今日は最初から、お皿を二枚用意していたんです。」'
 }),
 reina:Object.freeze({
  key:'bond_reina_0',
  hint:'玲奈が、あの日の対戦台の続きを覚えている。',
  a:'「あのときの再戦、まだ終わっていませんからね。責任者さん、記録を抜かれる覚悟はできていますか？」',
  b:'「この前、互いの好手を教え合おうって言いましたよね。今日は私の切り返しも、ちゃんと見てください。」',
  face:'smile'
 }),
 akane:Object.freeze({
  key:'bond_akane_0',
  hint:'朱音が、海沿いを走った日のことを覚えている。',
  a:'「前に店まで競争したでしょ？　今日は先に準備運動しておこう！　よーし、行こっか！」',
  b:'「この前、一緒に息を整えてくれたよね。今日は私もゆっくり歩こうかな。……隣、いい？」',
  face:'smile'
 }),
 aoi:Object.freeze({
  key:'bond_aoi_0',
  hint:'葵が、図書館で選んだ過ごし方を覚えている。',
  a:'「この前と同じ席、空けてあります。比較条件をそろえるため、です。……たぶん。」',
  b:'「今日は計算をやめて、本の話をしませんか。……あの日の続き、聞きたいです。」',
  face:'blush'
 }),
 chinatsu:Object.freeze({
  key:'bond_chinatsu_0',
  hint:'千夏が、喫茶街での寄り道の約束を覚えている。',
  a:'「前に私の好きな店を選んでくれたでしょう？　今日は秘密のメニューの続きを教えてあげるね、責任者くん。」',
  b:'「この前、席を取ってくれたの、嬉しかったな。今日は私が飲み物を運ぶ番ね。……少し甘えてもいい？」',
  face:'smile'
 }),
 nagi:Object.freeze({
  key:'bond_nagi_0',
  hint:'凪が、夜の海で過ごした時間を覚えている。',
  a:'「……この前みたいに、波の音だけでもいい？　……隣は、空けてある。」',
  b:'「……この前、今日のことを話したでしょ。……また少し、聞いてほしい。」',
  face:'normal'
 })
});
function pendingChoiceMemory(id){
 const entry=CHOICE_MEMORY_LINES[id];
 if(!entry||!romanceHeroAvailable(id)||!bondSeen(id,0))return null;
 const choice=S.choiceMemories?.[entry.key],atDay=S.choiceMemoryDay?.[entry.key];
 if(!['a','b'].includes(choice)||!Number.isSafeInteger(atDay)||loveState().day<=atDay||S.choiceMemoryShown?.[entry.key])return null;
 return {entry,choice};
}
function openChoiceMemory(id){
 if(view!=='talk')return;
 const item=pendingChoiceMemory(id);
 if(!item)return;
 const {entry,choice}=item;
 S.choiceMemoryShown[entry.key]=true;
 persist();
 dialog={
  title:`${PEOPLE[id].name}が覚えていたこと`,
  message:entry[choice],
  html:`<div class="romance-result expression-result">${expressionPortraitMarkup(id,entry.face||(id==='momoka'?'smile':'blush'),`choice-memory:${id}:${choice}`,{wrapperClass:'expr-character-layer',alt:PEOPLE[id].name})}</div>`
 };
 render();
}

function romanceTodayCard(id){
 const l=loveState(),inv=l.invitation&&l.invitation.person===id&&!l.invitation.used?ROMANCE_PLACES.find(p=>p.id===l.invitation.place):null;
 const done=l.met[id];
 return `<div class="romance-today"><div class="romance-today-row"><span class="chip">${l.day}日目</span><span class="chip">${esc(ROMANCE_WEATHER_LABELS[l.weather])}</span><span class="chip">残り行動 ${l.actions}/${ROMANCE_RULES.ACTIONS_PER_DAY}</span><span class="chip ${l.sulking[id]?'is-warn':''}">${esc(romanceMoodShort(id))}</span></div>
  ${inv?`<p class="romance-today-invite">✦ 今日は<b>${esc(inv.short)}</b>に行きたいみたい。誘いに応えると親密度がよく上がります。</p>`:''}
  ${done?'<p class="romance-today-done">今日はもうお出かけしました。</p>':''}
  <p class="romance-today-hint">${esc(romancePlaceHintFor(id))}</p>
  ${pendingChoiceMemory(id)?`<div class="romance-today-memory"><p>${esc(pendingChoiceMemory(id).entry.hint)}</p><button type="button" class="btn outline" onclick="openChoiceMemory('${id}')">この前の話の続き</button></div>`:''}</div>`;
}
function openRomancePlacePicker(id){return startRomanceOuting(id);}
function startRomanceOuting(id){if(!HERO_IDS.includes(id)||!loveCanAct())return toast('今日はもう行動できません');if(!romanceHeroAvailable(id))return toast('ガチャで迎えると交流できます');if(loveState().pending)return openRomancePending();if(loveState().sulking[id]){romanceSelectionInProgress=true;const r=ROMANCE_SULK_REPAIR[id];dialog={title:`${PEOPLE[id].name}との待ち合わせ`,message:loveMoodDescription(id),html:`<div class="expression-repair">${expressionPortraitMarkup(id,'pout',`repair-entry:${id}:${loveState().day}`,{wrapperClass:'expr-character-layer',alt:PEOPLE[id].name})}</div><div class="romance-options">${r.choices.map((c,i)=>`<button class="btn outline" onclick="answerRomanceRepair('${id}',${i})">${esc(c)}</button>`).join('')}</div>`};return render()}showRomancePlaces(id,false)}
function answerRomanceRepair(id,answer){if(!HERO_IDS.includes(id)||!romanceHeroAvailable(id)||!loveCanAct())return;const r=ROMANCE_SULK_REPAIR[id],ok=answer===r.correct;if(ok){loveState().sulking[id]=false;loveState().missed[id]=0;}romanceRepairSuccess=ok;persist();dialog={title:PEOPLE[id].name+'の返事',message:ok?r.yes:r.no,html:`<div class="expression-repair">${expressionPortraitMarkup(id,EXPRESSION_CUES.repair[id]?.[ok?'yes':'no'],`repair:${id}:${loveState().day}`,{wrapperClass:'expr-character-layer',alt:PEOPLE[id].name})}</div><button class="btn primary" onclick="showRomancePlaces('${id}',${ok})">行き先を決める →</button>`};render()}
let romanceRepairSuccess=false;
function showRomancePlaces(id,repair=romanceRepairSuccess){
 if(!HERO_IDS.includes(id)||!loveCanAct()||!romanceHeroAvailable(id))return;
 romanceSelectionInProgress=true;const l=loveState();dialog={title:`${heroineDisplayName(id)}と出かける`,message:`行き先を選びましょう。残り行動 ${l.actions}回。今日の天気：${ROMANCE_WEATHER_LABELS[l.weather]}`,html:`<div class="romance-place-grid">${ROMANCE_PLACES.map(p=>{const known=(l.visits[id]||{})[p.id]>0,like=romancePlaceLike(p,id),inv=l.invitation&&l.invitation.person===id&&l.invitation.place===p.id&&!l.invitation.used,again=l.lastPlace[id]===p.id;
  return `<button type="button" class="btn outline romance-place ${inv?'is-invite':''}" onclick="chooseRomancePlace('${id}','${p.id}')"><b>${esc(p.name)}</b><small>${inv?'✦ お誘いの場所':known?(like==='like'?'♡ 好きな場所':like==='dislike'?'…苦手な場所':'ふつう'):'まだ行っていない'}${again?' ・前回と同じ':''}</small></button>`}).join('')}</div>`};romanceRepairSuccess=repair;render();
}
function chooseRomancePlace(id,placeId){
 const p=ROMANCE_PLACES.find(x=>x.id===placeId),l=loveState();if(!p||!HERO_IDS.includes(id)||!romanceHeroAvailable(id)||!loveCanAct()||l.pending)return;
 const kind=weatherKind(placeId,romancePlaceLike(p,id),l.weather);
 const repeated=l.lastPlace[id]===placeId,penalty=l.sulking[id];
 const base=ROMANCE_GAIN.place[kind];const gain=Math.floor(base*(repeated?.5:1)*(penalty?.5:1));
 const isInvite=!!(l.invitation&&l.invitation.person===id&&l.invitation.place===placeId&&!l.invitation.used);
 const bonus=isInvite?ROMANCE_GAIN.invitation:0;
 if(isInvite){l.invitation.used=true;const record=l.inviteHistory.findLast(h=>h.day===l.day&&h.person===id&&h.place===placeId);if(record)record.fulfilled=true}
 l.actions--;l.visits[id][placeId]=(l.visits[id][placeId]||0)+1;l.lastPlace[id]=placeId;l.met[id]=true;l.missed[id]=0;
 const funny=romancePlaceLike(p,id)==='dislike'&&!l.scenes[id][placeId]?ROMANCE_BAD_SCENES[id]?.[placeId]:null;
 if(funny||id==='milku'&&placeId==='library'&&!l.scenes[id][placeId])l.scenes[id][placeId]=true;
 const arr=romancePlaceLinesFor(l,id,placeId),next=(l.lastLine[id][placeId]===0?1:0);l.lastLine[id][placeId]=next;
 const line=arr[next];const label=kind==='like'?'すごく喜んでいた':kind==='normal'?'穏やかに楽しんでいた':'少し苦手そうだった';
 const clue=ROMANCE_CLUES[id][l.clueIndex[id]%ROMANCE_CLUES[id].length];l.clueIndex[id]++;l.hints[id][clue.place]=clue.text;
 const weatherNote=l.weather==='rain'?`${ROMANCE_WEATHER_LABELS[l.weather]}の日。${p.short}への反応は${label}。`:'';
 if(weatherNote)l.weatherHistory.push({day:l.day,place:placeId,person:id,kind,note:weatherNote});
 let lines=[{who:'narrator',text:`${ROMANCE_WEATHER_LABELS[l.weather]}の${p.short}。二人で歩きながら、いつもと違う景色を探す。`},{who:id,text:line.replace(/^「|」$/g,''),mood:l.sulking[id]?'sulk':l.mood[id]},
  {who:funny?'narrator':id,text:funny?funny[0]:isInvite?(extraHero(id)?romanceInviteText(l,id):id==='momoka'?'今日ここに来たかったんだ！　一緒でよかった、えへへ。':'今日はここに来てみたかったんです。ご一緒できてうれしいです。'):extraHero(id)?extraHero(id).outingThird:id==='momoka'?'ねえ、今日は何を話して帰ろっか？':'帰り道も、少しだけご一緒できますか？',mood:isInvite?'smile':(l.sulking[id]?'sulk':l.mood[id])},
  {who:funny?id:'narrator',text:funny?funny[1].replace(/^[^「]+「/, '「'):`${repeated?'前にも来た場所だと気づき、少し物足りなそうだ。':penalty?'まだ少しだけ距離があるようだ。':'帰り道、二人の歩幅が自然にそろう。'}`,mood:penalty?'sulk':l.mood[id]},
  {who:id,text:extraHero(id)?extraHero(id).outingFinal:id==='momoka'?'ねえ、帰る前にもう一つ聞いていい？':'責任者さん、ひとつ聞いてもいいですか？',mood:l.sulking[id]?'sulk':l.mood[id]}];
 // Expressions are resolved from EXPRESSION_CUES at render time; pending save data shape stays unchanged.
 l.pending={person:id,place:placeId,stage:'scene',step:0,choices:datedReplyChoices(l,id,placeId),placeGain:gain+bonus,kind,lines};
 persist();dialog=null;romanceSelectionInProgress=false;view='date';render();window.scrollTo(0,0);
}
function openRomancePending(){const p=loveState().pending;if(!p)return;if(!romanceHeroAvailable(p.person))return toast('ガチャで迎えると交流できます');dialog=null;p.stage='scene';if(!Array.isArray(p.lines))p.lines=[{who:'narrator',text:`${ROMANCE_PLACES.find(x=>x.id===p.place).short}からの帰り道。`},{who:p.person,text:loveMoodDescription(p.person)},{who:'narrator',text:'夕暮れのなか、返事を待っている。'}];p.step=Math.min(p.step||0,p.lines.length-1);persist();view='date';render();}
function authoredOutingCue(p,index){
 const id=p.person,loc=p.place,lines=p.lines||[],txt=lines[index]?.text||'';
 const mood=loveState().sulking[id]?'sulk':loveState().mood[id];
 const placeLines=romancePlaceLinesFor(loveState(),id,loc)||[];
 if(index===1){
  const reaction=placeLines.findIndex(str=>str.replace(/^「|」$/g,'')===txt);
  return {target:id,face:EXPRESSION_CUES.place_reactions[id]?.[loc]?.[Math.max(0,reaction)]||'normal'};
 }
 if(index===2){
  if(lines[index]?.who==='narrator')return null;
  if(txt.includes('今日ここに来たかったんだ！')||txt.includes('今日はここに来てみたかったんです。')||txt===romanceInviteText(loveState(),id))return {target:id,face:'smile'};
  return {target:id,face:mood==='sulk'?'pout':mood==='low'?'sad':'normal'};
 }
 if(index===3){
  if(lines[index]?.who===id)return {target:id,face:EXPRESSION_CUES.bad_scene_reactions[id]?.[loc]||'normal'};
  if(txt.startsWith('前にも来た場所'))return {target:id,face:'pout'};
  if(txt.startsWith('まだ少しだけ距離'))return {target:id,face:'sad'};
  return null;
 }
 if(index===4)return {target:id,face:mood==='sulk'?'pout':mood==='low'?'sad':mood==='good'?'smile':'normal'};
 return null;
}
function outingFaceState(p,index){let face='normal';for(let i=0;i<=index;i++){const cue=authoredOutingCue(p,i);if(cue?.target===p.person)face=cue.face;}return face}
function authoredReplyFace(id,mood,type,text){
 const lines=extraHero(id)?extraHero(id).replyResults[mood][type]:[ROMANCE_REPLY_RESULT[id][mood][type],ROMANCE_REPLY_ALTERNATIVES[id][mood][type]];
 const i=lines.indexOf(text);return EXPRESSION_CUES.reply_reactions[id]?.[mood]?.[type]?.[Math.max(0,i)]||'normal';
}
function stripOuterDailyQuotes(str){return typeof str==='string'&&str.startsWith('「')&&str.endsWith('」')?str.slice(1,-1):str}
// v0.35.2.0 おでかけの背景。既存の背景画像を行き先と天気・時間帯で割り当てる
const ROMANCE_PLACE_BG=Object.freeze({
 taiyaki:{sun:'bg_shotengai_day',cloud:'bg_shotengai_day',rain:'bg_shotengai_dusk'},
 cafe:{sun:'bg_kissa_day',cloud:'bg_kissa_day',rain:'bg_kissa_dusk'},
 park:{sun:'bg_kaihin_day',cloud:'bg_kaihin_dusk',rain:'bg_kaihin_dusk'},
 arcade:{sun:'bg_ekimae_day',cloud:'bg_ekimae_day',rain:'bg_ekimae_dusk'},
 library:{sun:'bg_toshokan_day',cloud:'bg_toshokan_day',rain:'bg_toshokan_dusk'},
 horror:{sun:'bg_ekimae_dusk',cloud:'bg_ekimae_dusk',rain:'bg_ekimae_night'}
});
function romancePlaceBg(placeId,weather,late){
 const row=ROMANCE_PLACE_BG[placeId];if(!row)return '';
 let key=row[weather]||row.sun;
 if(late){const dusk=key.replace(/_(day|dusk|night)$/,'_dusk');key=dusk;}
 return `assets/ART_V2/backgrounds/${key}.webp`;
}
function dateScenePage(){
 const p=loveState().pending;if(!p)return heroTalkPage(UNITS.find(u=>u.person==='momoka'));
 const id=p.person,idx=Math.min(p.step,p.lines.length-1),sc=p.lines[idx],final=idx===p.lines.length-1;
 const who=sc.who==='you'?playerDisplayName():sc.who==='narrator'?'ナレーション':PEOPLE[id].name;
 const face=outingFaceState(p,idx);
 const bgPath=romancePlaceBg(p.place,loveState().weather,idx>=Math.max(1,p.lines.length-2));
 const options=final?`<div class="story-choices date-choice-list">${p.choices.map(c=>`<button type="button" class="btn outline" onclick="answerRomanceTalk('${c.type}')">${esc(stripOuterDailyQuotes(c.text))}</button>`).join('')}</div>`:'';
 return `${heading('DAY / MEMORY',`${heroineDisplayName(id)}とのおでかけ`,'今日の小さな思い出。帰り道の返事を選ぼう。')}
 <div class="story-panel card chapter-story chapter-story-v071 date-scene" aria-label="おでかけの物語" onclick="dateSceneTap(event)">
 <div class="story-scene ${bgPath?'has-bg':''}">${bgPath?`<div class="story-bg" style="background-image:url('${bgPath}')" aria-hidden="true"></div>`:''}<div class="story-skyline"></div><div class="story-cast">${expressionPortraitMarkup(id,face,`date:${id}:${p.place}:day${loveState().day}`,{wrapperClass:'story-character',stateClass:'is-speaking',alt:`${PEOPLE[id].name}の立ち絵`,chapterStoryFit:true,eventKey:idx,sceneTag:sc.sceneTag||sc.tone||'',suppressSymbols:sc.suppressSymbols===true})}</div><span class="story-scene-label">${esc(ROMANCE_PLACES.find(x=>x.id===p.place).name)} · ${ROMANCE_WEATHER_LABELS[loveState().weather]}</span></div>
 <div class="story-dialogue"><div class="flex space"><span class="chip pink">${esc(who)}</span></div><p class="story-line">${esc(stripOuterDailyQuotes(sc.text))}</p>
 <div class="story-controls">${options}<button type="button" class="btn outline mini" onclick="previousRomanceLine()" ${idx===0?'disabled':''}>← 戻る</button><button type="button" class="btn primary" onclick="nextRomanceLine()" ${final?'disabled':''}>${final?'返事を選ぼう':'続きを読む →'}</button><button type="button" class="btn outline mini" onclick="skipRomanceScene()">最後へ</button><button type="button" class="btn outline mini" onclick="requestInterrupt()">中断</button></div></div></div>`;
}
function dateSceneTap(event){if(event.target.closest('button,a,input,select,textarea'))return;nextRomanceLine()}
function nextRomanceLine(){const p=loveState().pending;if(!p||!romanceHeroAvailable(p.person)||p.step>=p.lines.length-1)return;p.step++;persist();render()}
function previousRomanceLine(){const p=loveState().pending;if(!p||p.step<=0)return;p.step--;persist();render()}
function skipRomanceScene(){const p=loveState().pending;if(!p||!romanceHeroAvailable(p.person))return;p.step=p.lines.length-1;persist();render()}
function romanceReplyGain(id,mood,type){const best=ROMANCE_MOOD_REPLY[id][mood];return type===best?ROMANCE_GAIN.reply.best:0}
function sisterMomentIfNew(id){
 const story=SHINONOME_SISTER_SCENES[id]||CHAPTER2_SISTER_SCENES[id];const ok=CHAPTER2_SISTER_SCENES[id]?(S.tsubakiMet&&S.kaedeMet):S.shinonomeMet;if(!story||!ok||heroAff(id)<story.threshold||S.sisterTalkSeen?.[id])return null;
 if(!isRecord(S.sisterTalkSeen))S.sisterTalkSeen={};S.sisterTalkSeen[id]=true;
 return story;
}
function sisterMomentMarkup(story){
 if(!story)return '';
 return `<section class="shinonome-sister-talk"><strong>✦ ${esc(story.title)}</strong>${story.lines.map(line=>`<p><b>${line.who==='narrator'?'地の文':esc(PEOPLE[line.who]?.name||line.who)}</b>：${esc(line.text)}</p>`).join('')}</section>`;
}
function answerRomanceTalk(type){if(loveState().pending&&!romanceHeroAvailable(loveState().pending.person))return;
 const l=loveState(),p=l.pending;if(!p||!ROMANCE_REPLY_TYPES.includes(type)||!p.choices.some(c=>c.type===type))return;
 const id=p.person,old=heroAff(id),g=romanceReplyGain(id,l.mood[id],type),total=p.placeGain+g,reply=resultReplyText(l,id,type,p.choices.find(c=>c.type===type)?.text);
 setHeroAff(id,Math.min(100,old+total));if(romanceStageTier(id,old)!==romanceStageTier(id,heroAff(id)))nextMoodLine(l,id);const sisterMoment=sisterMomentIfNew(id);AudioDirector.sfx('affection');S.talks++;l.pending=null;const stageChange=heroStageNo(heroAff(id))>heroStageNo(old);persist();view='talk';dialog={title:stageChange?`関係が進展：${heroStage(heroAff(id))}`:`${PEOPLE[id].name}との一日`,message:`${reply}\nおでかけ +${p.placeGain}・会話 +${g}（親密度 ${heroAff(id)}/100）${bondNew(id)?'\n読める絆エピソードがあります。':''}`,html:`<div class="romance-result expression-result">${expressionPortraitMarkup(id,authoredReplyFace(id,l.mood[id],type,reply),`date-reply:${id}:${l.day}`,{wrapperClass:'expr-character-layer',alt:PEOPLE[id].name})}<span>${esc(heroStage(heroAff(id)))}</span></div>${sisterMomentMarkup(sisterMoment)}`};render();
}

// Choice memory v0.4: summarize only observed relationship events in the existing diary.
// The texts below are quoted from the currently implemented first-bond choices.
const CHOICE_DIARY_TOPICS=Object.freeze({
 momoka:Object.freeze({title:"たい焼き裁判",a:"「しっぽ派だ。判決は無罪」",b:"「頭派だ。異議あり」"}),
 milku:Object.freeze({title:"閉店後の試作タルト",a:"「おいしい。味見担当も満足そうだな」",b:"「半分こしよう。みるくも座ってくれ」"}),
 reina:Object.freeze({title:"勝負の採点表",a:"「記録を抜かれる覚悟で、もう一戦だ」",b:"「今日は互いの好手を教え合おう」"}),
 akane:Object.freeze({title:"海風のペースメーカー",a:"「俺が先に店まで走る」",b:"「息を整えてから一緒に行こう」"}),
 aoi:Object.freeze({title:"恋心の計算式",a:"「同じ席で、もう一度試そう」",b:"「数字はしまって、本の話をしよう」"}),
 chinatsu:Object.freeze({title:"お姉さんの放課後",a:"「千夏の好きな店に案内してくれ」",b:"「今日は俺が席を取っておく」"}),
 nagi:Object.freeze({title:"夜の海が聞いている",a:"「今日は波の音だけでいい」",b:"「少しだけ、今日のことを話そうか」"})
});
function choiceDiaryMarkup(id){
 const entry=CHOICE_MEMORY_LINES[id],topic=CHOICE_DIARY_TOPICS[id];
 if(!entry||!topic||!romanceHeroAvailable(id)||!bondSeen(id,0))return '';
 const key=entry.key,choice=S.choiceMemories?.[key],day=S.choiceMemoryDay?.[key];
 if(!['a','b'].includes(choice)||!Number.isSafeInteger(day)||day<1||day>1000000||day>loveState().day)return '';
 const talked=S.choiceMemoryShown?.[key]===true;
 const returned=S.choiceBattleShown?.[key]===true;
 const sections=[`<div class="romance-note"><strong>思い出：${esc(topic.title)}</strong><small>${day}日目・主人公が選んだ言葉</small><p>${esc(topic[choice])}</p></div>`];
 // Never spoil a line that has not been shown in its original scene.
 if(talked)sections.push(`<div class="romance-note"><strong>ふたりで交わした後日の会話</strong><p>${esc(entry[choice])}</p></div>`);
 if(returned)sections.push(`<div class="romance-note"><strong>共闘から帰った日のひと言</strong><p>${esc(CHOICE_BATTLE_LINES[id][choice])}</p></div>`);
 return `<div class="romance-diary-memory" aria-label="${esc(PEOPLE[id].name)}との思い出"><h3>ふたりの思い出</h3><div class="romance-notebook-list">${sections.join('')}</div></div>`;
}

function romanceNotebook(){const l=loveState();return `${heading('MEMORIES / DIARY','ヒロイン手帳','一緒に過ごして分かったことを記録しています。好みは訪問後に分かります。')}<div class="romance-notebook"><div class="flex space"><strong>${l.day}日目の記録 · 今日の天気：${ROMANCE_WEATHER_LABELS[l.weather]}</strong><button class="btn outline mini" onclick="change('talk')">交流へ戻る</button></div><section class="card pad"><h3>天気とお誘いの記録</h3><p>${l.weatherHistory.slice(-12).map(h=>esc(h.note||`${h.day}日目：${ROMANCE_WEATHER_LABELS[h.weather]||''}`)).join(' / ')||'まだ記録はありません'}</p><p>${l.inviteHistory.filter(h=>heroV0690Visible(h.person,S)).slice(-12).map(h=>`${h.day}日目：${esc(PEOPLE[h.person]?.name||'')} → ${esc(ROMANCE_PLACES.find(p=>p.id===h.place)?.short||'')}（${h.fulfilled?'一緒に行った':'お誘い'}）`).join(' / ')||'まだお誘いはありません'}</p></section>${HERO_IDS.filter(id=>romanceHeroAvailable(id)).map(id=>`<section class="card pad"><h2>${esc(PEOPLE[id].name)}</h2><p>親密度 ${heroAff(id)}/100 · ${esc(heroStage(heroAff(id)))}</p>${choiceDiaryMarkup(id)}<div class="romance-notebook-list">${ROMANCE_PLACES.map(p=>{const n=l.visits[id][p.id]||0;const hint=l.hints[id][p.id];return `<div class="romance-note"><strong>${esc(p.name)}</strong><small>${n?esc(({like:'すごく喜んでいた',normal:'穏やかに楽しんでいた',dislike:'少し苦手そうだった'})[romancePlaceLike(p,id)])+` · 訪問${n}回`:'まだ一緒に行っていない'}</small>${hint?`<p>${esc(hint)}</p>`:''}</div>`}).join('')}</div></section>`).join('')}</div>`}

function romanceHeroAvailableFromSave(id,save){return HERO_IDS.includes(id)&&heroineOwned(id,save)&&(HERO_V0690_ID_SET.has(id)||heroineStoryRevealed(id,save))}
// Ver.0.69.1: convert only the former new-heroine ID and its SR card or bond IDs.
// User-entered player names remain unchanged. Boss 霞シオン is unaffected.
function migrateShionHeroToSubaru(raw){
  const ren=s=>s==='shion'?'subaru':s==='shion_work'?'subaru_work':
    /^bond_shion_[0-4]$/.test(s)?s.replace('bond_shion_','bond_subaru_'):s;
  const visit=(value,key='')=>{
    if(typeof value==='string')return key==='playerName'?value:ren(value);
    if(Array.isArray(value))return value.map(item=>visit(item,key));
    if(!value||typeof value!=='object')return value;
    const pairs=Object.entries(value),result={};
    for(const [oldKey,v] of [...pairs.filter(([k])=>ren(k)===k),...pairs.filter(([k])=>ren(k)!==k)]){
      const id=ren(oldKey),next=visit(v,id);
      result[id]=Object.prototype.hasOwnProperty.call(result,id)
        ?mergeLegacyCanonicalSaveValue(result[id],next):next;
    }
    return result;
  };
  return visit(raw);
}
function migrateSave(raw){
  raw=migrateLegacyConceptSave(raw);
  raw=migrateShionHeroToSubaru(raw);
  raw=convertRetiredRSave(raw);
  const defaults=fresh();
  if(!isRecord(raw)||!isRecord(raw.owned))return defaults;
  const result={...defaults,...raw}; // Preserve extensions and unknown fields for forward compatibility.
  // Old saves that had 'legacy' selected before this opt-in feature start on the new default.
  // Once explicitly switched in Settings, the choice is retained on subsequent loads.
  result.battleMode=raw.battleModeOptInV03466===true&&raw.battleMode==='legacy'?'legacy':'turn';
  result.battleModeOptInV03466=true;
  result.storyFlags=isRecord(raw.storyFlags)?{...defaults.storyFlags,...raw.storyFlags}:defaults.storyFlags;
  // Old saves predate the reveal marker and immediately unlock cleared quests.
  result.hero74RevealMode=raw.hero74RevealMode==='story'?'story':'legacy';
  result.hero74MeetSeen=isRecord(raw.hero74MeetSeen)?Object.fromEntries(
    HERO74_QUEST_IDS.filter(qid=>raw.hero74MeetSeen[qid]===true).map(qid=>[qid,true])):{};
  // A completed episode alone makes its first selection eligible for restoration.
  // Legacy saves have no evidence of the original selection and remain neutral.
  result.chapterChoiceMemory={};
  for(const [episode,options] of Object.entries({prologue:['people','place'],chapter1_open:['field','record']})){
    const choice=raw.chapterChoiceMemory?.[episode];
    if(result.storyFlags[episode]===true&&options.includes(choice))result.chapterChoiceMemory[episode]=choice;
  }
  // First-read choices of known heroine episodes; malformed/old saves remain neutral.
  result.choiceMemories={};
  result.choiceMemoryDay={};
  result.choiceMemoryShown={};
  result.choiceBattleShown={};
  for(const {key:episode} of Object.values(CHOICE_MEMORY_LINES)){
    const choice=raw.choiceMemories?.[episode],day=raw.choiceMemoryDay?.[episode];
    if((choice==='a'||choice==='b')&&Number.isSafeInteger(day)&&day>=1&&day<=1000000){
      result.choiceMemories[episode]=choice;
      result.choiceMemoryDay[episode]=day;
      result.choiceMemoryShown[episode]=raw.choiceMemoryShown?.[episode]===true;
      result.choiceBattleShown[episode]=raw.choiceBattleShown?.[episode]===true;
    }
  }
  result.owned={...defaults.owned};
  for(const [id,entry] of Object.entries(raw.owned)){
    if(!isRecord(entry))continue;
    const start=isRecord(defaults.owned[id])?defaults.owned[id]:{lv:1,aff:0,lb:0,copies:0};
    result.owned[id]={...start,...entry,
      lv:integerOr(entry.lv,start.lv,1,30),aff:integerOr(entry.aff,start.aff,0,100),
      lb:integerOr(entry.lb,start.lb,0,7),copies:integerOr(entry.copies,start.copies,0)};
  }
  // Keep intentionally short teams as saved (0–4). Repair only malformed or rule-breaking teams.
  // Older default saves contained two versions each of Momoka and Milku.
  const savedParty=Array.isArray(raw.party)?raw.party:null;
  if(savedParty===null){
    result.party=defaults.party.slice();
  }else{
    const preserved=[],persons=new Set(),roles={};
    let invalid=savedParty.length>4;
    for(const id of savedParty.slice(0,4)){
      const u=typeof id==='string'?BYID[id]:null;
      if(!u||!result.owned[id]||persons.has(u.person)||(roles[u.role]||0)>=2){invalid=true;continue;}
      preserved.push(id);persons.add(u.person);roles[u.role]=(roles[u.role]||0)+1;
    }
    if(invalid){
      // For invalid legacy teams, retain valid selections and fill vacant slots using owned defaults.
      for(const id of defaults.party){
        if(preserved.length>=4)break;
        const u=BYID[id];
        if(!result.owned[id]||persons.has(u.person)||(roles[u.role]||0)>=2)continue;
        preserved.push(id);persons.add(u.person);roles[u.role]=(roles[u.role]||0)+1;
      }
    }
    result.party=preserved;
  }
  for(const key of ['quests','achievements','grindRuns','dailyChats','investigations','insightRewards'])result[key]=isRecord(raw[key])?raw[key]:{};
  // v0.6.9.0: old saves have no skip counter; do not mutate persisted saves while loading.
  result.dailySkips=isRecord(raw.dailySkips)&&typeof raw.dailySkips.date==='string'
    ?{date:raw.dailySkips.date,count:integerOr(raw.dailySkips.count,0,0,ECONOMY.SKIP_DAILY_MAX)}
    :{...defaults.dailySkips};
  result.gems=integerOr(raw.gems,defaults.gems,0);
  result.gold=integerOr(raw.gold,defaults.gold,0);
  result.pulls=integerOr(raw.pulls,defaults.pulls,0);
  result.talks=integerOr(raw.talks,defaults.talks,0);
  result.gachaPity=integerOr(raw.gachaPity,0,0,GACHA_CONFIG.UR_PITY-1);
  result.gachaSrStreak=integerOr(raw.gachaSrStreak,0,0,GACHA_CONFIG.SR_GUARANTEE_EVERY-1);
  result.currentQuest=QUESTS.some(q=>q.id===raw.currentQuest)?raw.currentQuest:defaults.currentQuest;
  result.selected=typeof raw.selected==='string'&&BYID[raw.selected]&&result.owned[raw.selected]?raw.selected:defaults.selected;
  result.homeFavorite=typeof raw.homeFavorite==='string'&&PEOPLE[raw.homeFavorite]?raw.homeFavorite:defaults.homeFavorite;
  result.homeUnitId=typeof raw.homeUnitId==='string'&&BYID[raw.homeUnitId]&&result.owned[raw.homeUnitId]&&BYID[raw.homeUnitId].person===result.homeFavorite?raw.homeUnitId:null;
  result.questGuideSeen=raw.questGuideSeen===true;
  result.artPose=raw.artPose==='neutral'?'neutral':'dynamic';
  result.audio=validAudioSettings(raw.audio);
  // Older releases never had a title screen: their existing save is always continuable.
  result.gameStarted=raw.gameStarted!==false;
  result.shinonomeMet=raw.shinonomeMet===true;
  result.oldcafeMet=raw.oldcafeMet===true;
  result.oldcafeMeetingProgress=result.oldcafeMet?0:integerOr(raw.oldcafeMeetingProgress,0,0,OLDCAFE_MEETING.lines.length-1);
  result.stationMet=raw.stationMet===true;
  result.stationMeetingProgress=result.stationMet?0:integerOr(raw.stationMeetingProgress,0,0,STATION_MEETING.lines.length-1);
  result.schoolMet=raw.schoolMet===true;
  result.officeMet=raw.officeMet===true;
  result.schoolMeetingProgress=result.schoolMet?0:integerOr(raw.schoolMeetingProgress,0,0,SCHOOL_MEETING.lines.length-1);
  result.officeMeetingProgress=result.officeMet?0:integerOr(raw.officeMeetingProgress,0,0,OFFICE_MEETING.lines.length-1);
  result.seasideMet=raw.seasideMet===true;
  result.seasideMeetingProgress=result.seasideMet?0:integerOr(raw.seasideMeetingProgress,0,0,SEASIDE_MEETING.lines.length-1);
   result.lighthouseMet=raw.lighthouseMet===true;
   result.lighthouseMeetingProgress=result.lighthouseMet?0:integerOr(raw.lighthouseMeetingProgress,0,0,LIGHTHOUSE_MEETING.lines.length-1);
   result.tsubakiMet=raw.tsubakiMet===true;result.erikaMet=raw.erikaMet===true;result.kanameMet=raw.kanameMet===true;result.kaedeMet=raw.kaedeMet===true;
   result.tsubakiMeetingProgress=result.tsubakiMet?0:integerOr(raw.tsubakiMeetingProgress,0,0,CHAPTER2_MEETINGS.tsubaki.lines.length-1);
   result.erikaMeetingProgress=result.erikaMet?0:integerOr(raw.erikaMeetingProgress,0,0,CHAPTER2_MEETINGS.erika.lines.length-1);
   result.kanameMeetingProgress=result.kanameMet?0:integerOr(raw.kanameMeetingProgress,0,0,CHAPTER2_LATE_MEETINGS.kaname.lines.length-1);
   result.kaedeMeetingProgress=result.kaedeMet?0:integerOr(raw.kaedeMeetingProgress,0,0,CHAPTER2_LATE_MEETINGS.kaede.lines.length-1);
  result.sisterTalkSeen=isRecord(raw.sisterTalkSeen)?{...raw.sisterTalkSeen}:{};
  result.chapter3Met=Object.fromEntries(NEW_HERO_IDS_V027.map(id=>[id,raw.chapter3Met?.[id]===true]));
  result.chapter4Met=Object.fromEntries(NEW_HERO_IDS_V028.map(id=>[id,raw.chapter4Met?.[id]===true]));
  // v0.15: one free selection ticket per save, including legacy saves.
  // A consumed ticket always carries heroSelectTicketGranted=true, preventing repeated grants.
  result.heroSelectTicketGranted=true;
  result.heroSelectTickets=raw.heroSelectTicketGranted===true?integerOr(raw.heroSelectTickets,0,0,1):1;
  result.pickupStartDay={shinonome:null,oldcafe:null,station:null,school_new:null,seaside:null,lighthouse:null,tsubaki:null,erika:null,kaname:null,kaede:null,chapter3_port:null,chapter4_city:null};
  for(const group of ['shinonome','oldcafe','station','school_new','seaside','lighthouse','tsubaki','erika','kaname','kaede','chapter3_port','chapter4_city']){
    const saved=raw.pickupStartDay?.[group];
    if(Number.isSafeInteger(saved)&&saved>=1)result.pickupStartDay[group]=saved;
    else if((group==='shinonome'?result.shinonomeMet:group==='oldcafe'?result.oldcafeMet:group==='station'?result.stationMet:group==='school_new'?result.officeMet:group==='seaside'?result.seasideMet:group==='lighthouse'?result.lighthouseMet:group==='tsubaki'?result.tsubakiMet:group==='erika'?result.erikaMet:group==='kaname'?result.kanameMet:result.kaedeMet)&&raw.heroSelectTicketGranted!==true){
      // Existing q1/q2-complete saves receive a one-time seven-day introductory pickup.
      result.pickupStartDay[group]=integerOr(raw.love?.day,1,1);
    }
  }
  result.love=migrateLove(raw.love);
  if(result.love.invitation&&!romanceHeroAvailableFromSave(result.love.invitation.person,result))result.love.invitation=null;
  if(!HERO_IDS.includes(raw.love?.activeHero)||!romanceHeroAvailableFromSave(raw.love?.activeHero,result)){const person=BYID[result.selected]?.person;if(HERO_IDS.includes(person)&&romanceHeroAvailableFromSave(person,result))result.love.activeHero=person;else result.love.activeHero='momoka';}
  result.bondRead={};result.bondLastTopic={};
  for(const personId of HERO_IDS){
    const saved=isRecord(raw.bondRead)?raw.bondRead[personId]:null;
    result.bondRead[personId]=Array.from({length:5},(_,i)=>Array.isArray(saved)&&saved[i]===true);
    const last=isRecord(raw.bondLastTopic)?raw.bondLastTopic[personId]:null;
    result.bondLastTopic[personId]=integerOr(last,-1,-1,11);
    const maxAff=Math.max(0,...UNITS.filter(u=>u.person===personId&&result.owned[u.id]&&(!CHAPTER2_LATE_HERO_IDS.includes(personId)||!isChapter2ReservedTrial(u))).map(u=>result.owned[u.id].aff));
    for(const u of UNITS.filter(u=>u.person===personId&&result.owned[u.id]&&(!CHAPTER2_LATE_HERO_IDS.includes(personId)||!isChapter2ReservedTrial(u))))result.owned[u.id].aff=maxAff;
  }
  for(const id of NEW_HERO_IDS){
    const maxOwned=Math.max(0,...UNITS.filter(u=>u.person===id&&result.owned[u.id]&&(!CHAPTER2_LATE_HERO_IDS.includes(id)||!isChapter2ReservedTrial(u))).map(u=>result.owned[u.id].aff||0));
    result.love.affection[id]=Math.max(result.love.affection[id],maxOwned);
  }
  for(const id of HERO_IDS){if((id==='momoka'||id==='milku')&&result.love.sulking[id]&&result.love.missed[id]<5)result.love.sulking[id]=false;}
  return result;
}
function fleshoutMigrateV03413(save){
 try{if(!save||!save.storyFlags||save.storyFlags.__fleshout_v03413)return;
  if(!save.oldcafeMet&&Number.isSafeInteger(save.oldcafeMeetingProgress)&&save.oldcafeMeetingProgress>=1)save.oldcafeMeetingProgress+=1;
  if(!save.lighthouseMet&&Number.isSafeInteger(save.lighthouseMeetingProgress)&&save.lighthouseMeetingProgress>=7)save.lighthouseMeetingProgress+=1;
  save.storyFlags.__fleshout_v03413=true;}catch(_){}
}
function load(){
  const raw=SaveStore.read();
  if(raw===null)return fresh();
  try{const migrated=migrateSave(JSON.parse(raw));fleshoutMigrateV03413(migrated);return migrated}
  catch(e){console.warn('[Yoiboshi] Corrupt save; using in-memory defaults. Original key left untouched:',e);return fresh()}
}
let gachaMode='normal';
let pendingStory=null;
// Temporary story-to-battle transition state. Never persisted.
let questStoryFlow=null;
let S=load(),view='title',dialog=null,battle=null,archiveSelected='',drawResults=[],noticeTimer=0,activeTimer=0,lastFrame=0,storySession=null,citySheetQuest='';
v027GameReady=true;
let titleConfirm=false,titleSettingsOpen=false,interruptConfirm=false,questActionInProgress=false,romanceSelectionInProgress=false,onboardingSuppressed=false,openingStep=0;
const $=id=>document.getElementById(id),person=u=>PEOPLE[u.person],unit=id=>BYID[id],data=id=>S.owned[id];
AudioDirector.configure(()=>S.audio);
AudioDirector.install();
function currentAudioContext(){
 // A boss theme starts at its appearance, not during preceding travel or waves.
 // Continue it through the short q12 victory cutscene until the battle closes.
 const bossEncounter=!!(view==='combat'&&battle&&!battle.done&&
   (battle.qid==='q12'||battle.qid==='q17'||battle.qid==='q24'||battle.qid==='q28'||['q35','q40','q45','q46'].includes(battle.qid))&&
   battle.wave===battle.totalWaves-1&&
   (battle.phase==='fight'||battle.phase==='cinematicVictory')&&
   battle.enemies.some(e=>e.kind==='boss'));
 return {view,storyId:storySession?.id,step:storySession?.step,questId:battle?.qid,bossEncounter};
}
function esc(v){return String(v).replace(/[&<>"']/g,a=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[a]))}
// v0.26.1.0 addendum: independent from legacy save migration.
// 8 Unicode code points (Japanese, symbols and emoji supported). Escaping is applied at the HTML sink.
function normalizePlayerName(raw){const trimmed=(typeof raw==='string'?raw:'').trim();return Array.from(trimmed).slice(0,8).join('')||'主人公'}
function playerDisplayName(){return normalizePlayerName(S.playerName)}
function substitutePlayerName(text){return String(text).replaceAll('{name}',playerDisplayName())}
function setPlayerName(raw){S.playerName=normalizePlayerName(raw);persist();}
function onPlayerNameInput(el){const next=Array.from(el.value).slice(0,8).join('');if(el.value!==next)el.value=next;const count=document.getElementById('player-name-count');if(count)count.textContent=`${Array.from(next).length} / 8`}
function confirmPlayerName(event){event?.preventDefault?.();if(view!=='nameEntry')return false;setPlayerName(document.getElementById('player-name-input')?.value||'');if(S.onboarding?.enabled)S.onboarding.stage='nameGreeting';view='nameGreeting';render();return false;}
function finishNameGreeting(){if(view!=='nameGreeting')return;if(S.onboarding?.enabled)S.onboarding.stage='prologue';persist();openPrologue();}
function savePlayerNameSetting(event){event?.preventDefault?.();if(view!=='records')return false;setPlayerName(document.getElementById('player-name-settings')?.value||'');render();toast('主人公の名前を変更しました');return false;}
function playerNameSettingCard(){return `<section class="card pad player-name-settings" aria-label="主人公の名前の設定"><h3>主人公の名前</h3><p class="desc">物語の主人公の話し手表示に使われます。最大8文字。空欄なら「主人公」になります。</p><form onsubmit="return savePlayerNameSetting(event)"><label for="player-name-settings">現在の名前：<strong>${esc(playerDisplayName())}</strong></label><div class="player-name-entry-row"><input id="player-name-settings" name="playerName" type="text" maxlength="16" oninput="onPlayerNameInput(this)" autocomplete="off" value="${esc(playerDisplayName())}" aria-label="主人公の名前"><button type="submit" class="btn primary">名前を変更</button></div><small id="player-name-count">${Array.from(playerDisplayName()).length} / 8</small></form></section>`}
function playerNameEntryPage(){return `<main class="onb-opening player-naming" aria-label="主人公の名前入力"><div class="onb-name-card"><div class="onb-star">✧</div><h1>宵星相談室へようこそ</h1><p>宵星相談室の新しい責任者として、あなたの名前を教えてください。</p><form onsubmit="return confirmPlayerName(event)"><label for="player-name-input">主人公の名前（最大8文字）</label><input id="player-name-input" name="playerName" type="text" maxlength="16" autocomplete="off" enterkeyhint="done" placeholder="主人公" oninput="onPlayerNameInput(this)" autofocus><div class="onb-name-actions"><small id="player-name-count">0 / 8</small><button class="btn primary" type="submit">この名前で始める　→</button></div></form><p class="onb-name-note">空欄なら「主人公」。あとから設定で変更できます。</p></div></main>`}
function playerNameGreetingPage(){return `<main class="onb-opening" aria-label="名前を呼ぶオープニング" onclick="if(!event.target.closest('button'))finishNameGreeting()"><div class="onb-night"><div class="onb-star">✧</div><p class="onb-opening-line" aria-live="polite">${esc(substitutePlayerName('葵「{name}さん、お待ちしていました。さあ、相談室へどうぞ。」'))}</p><button class="btn primary" type="button" onclick="finishNameGreeting()">序章へ進む　→</button></div></main>`}
function persist(){
  if(!SaveStore.write(S)){
    toast('保存先を利用できません。進行は一時的に保持されますが、再読み込みで消える可能性があります。');
    return false;
  }
  return true;
}
function clearToast(){clearTimeout(noticeTimer);const old=$('toast');if(old)old.remove()}
// First user action also unlocks audio through AudioDirector.install().
function continueGame(){
 if(!S.gameStarted||SaveStore.read()===null)return;
 onboardingSuppressed=true;titleConfirm=false;titleSettingsOpen=false;
 storySession=null;pendingStory=null;view='home';render();
}
function requestNewGame(){titleConfirm=!!(S.gameStarted&&SaveStore.read()!==null);if(titleConfirm)render();else startNewGame()}
function cancelNewGame(){titleConfirm=false;render()}
function startNewGame(){gachaMode='normal';const audio=validAudioSettings(S.audio);const next=fresh();next.audio=audio;next.gameStarted=true;
 next.owned.akane_daily={lv:1,aff:0,lb:0,copies:0};next.owned.aoi_daily={lv:1,aff:0,lb:0,copies:0};
 next.party=['momoka_work','milku_work','akane_work','aoi_work'];
 next.akaneTrial=true;next.aoiTrial=true;next.storyFlags.__fleshout_v03413=true;next.onboarding={enabled:true,stage:'opening',seen:{}};S=next;onboardingSuppressed=false;openingStep=0;titleConfirm=false;titleSettingsOpen=false;interruptConfirm=false;questActionInProgress=false;romanceSelectionInProgress=false;storySession=null;dialog=null;pendingStory=null;citySheetQuest='';battle=null;persist();view='opening';render()}
// v0.26.1.0: a fresh save alone enters this opening. Continue never replays it.
const OPENING_LINES=Object.freeze([
 '「おにいさん。わたしのこと、わすれないでね。」',
 '北の海へ開かれた港町、宵星市。',
 '人の胸には、記憶と想いがともす、小さな灯がある。',
 '忘れられた灯は、消えずに浜へ流れ着き、やがて「残響」と呼ばれた。',
 '港の旧灯台は、かつてその灯を、毎晩海へ送り返していたという。',
 '八年前の嵐の夜。ひとつの小さな光が、海へ消えた。',
 'そして今日。残響を鎮める光、「星灯」を手に、小さな相談室の扉が開く。'
]);
function openingPage(){const line=OPENING_LINES[Math.min(openingStep,OPENING_LINES.length-1)];return `<main class="onb-opening" aria-label="オープニング" onclick="advanceOpening(event)"><button type="button" class="onb-skip" onclick="skipOpening(event)">スキップ</button><div class="onb-night"><div class="onb-star">✧</div><p class="onb-opening-line" aria-live="polite">${esc(line)}</p><p class="onb-opening-progress">${openingStep+1} / ${OPENING_LINES.length}</p><span class="onb-opening-next">タップして進む　›</span></div></main>`}
function advanceOpening(e){if(e?.target?.closest('button'))return;openingStep++;if(openingStep>=OPENING_LINES.length){skipOpening();return}render()}
let openingReplay=false;
function replayOpening(){openingReplay=true;openingStep=0;view='opening';render();window.scrollTo(0,0)}
function skipOpening(e){e?.stopPropagation?.();if(openingReplay){openingReplay=false;openingStep=0;view='story';render();return}if(S.onboarding?.enabled)S.onboarding.stage='name';persist();view='nameEntry';render()}
// One-time non-blocking help, only for new games on this install (not on Continue).
const ONBOARD_GUIDES=Object.freeze({
 map:{title:'最初の依頼',text:'まず、光っている「商店街の時計音」のピンを押して、依頼を開いてみてくださいね。'},
 investigation:{title:'調査の進め方',text:'同行者を選び、現場を3か所聞き込みましょう。手がかりを比べて、最後に星灯で推理してくださいね。'},
 combat:{title:'戦闘の基本',text:'通常攻撃はAUTOで進みますよ。各キャラのスキルボタンを押すと技を発動します。「対象指定」で狙う敵や味方を選べますし、「対象自動」にも戻せますからね。'},
 home_gacha:{title:'ガチャ（募集）',text:'ガチャでは仲間の別ユニットを迎えられますよ。ただし、まだ出会っていないヒロインは募集に登場しませんからね。'},
 home_talk:{title:'交流',text:'迎えたヒロインと会話やデートを楽しめますよ。親密度が上がると絆エピソードが開放されます。お話も大切にしてくださいね。'},
 home_roster:{title:'キャラ・編成',text:'出撃チームは4人です。同じヒロインは1人まで、同じロールは2人までですよ。育成も、こちらからできますからね。'},
 home_city:{title:'クエスト',text:'宵星市マップから次の依頼を選んでくださいね。手がかりを集めて、仲間と力を合わせ、街の残響を鎮めましょう。'}
});
const ONBOARD_HOME_ORDER=['home_gacha','home_talk','home_roster','home_city'];
function activeOnboardGuide(){
 const ob=S.onboarding;
 if(!ob?.enabled||onboardingSuppressed||dialog||interruptConfirm)return null;
 if(view==='city'&&ob.stage==='q1'&&!ob.seen?.map&&!S.quests.q1?.complete)return 'map';
 if(view==='investigation'&&S.currentQuest==='q1'&&!ob.seen?.investigation&&!S.quests.q1?.complete)return 'investigation';
 if(view==='combat'&&battle?.qid==='q1'&&!battle.preview&&!ob.seen?.combat&&!S.quests.q1?.complete)return 'combat';
 if(view==='home'&&ob.stage==='home'&&S.quests.q1?.complete)return ONBOARD_HOME_ORDER.find(key=>!ob.seen?.[key])||null;
 return null;
}
function onboardingGuideMarkup(){const key=activeOnboardGuide(),info=key==='combat'&&battle?.turnBattle?
 {title:'ターン制戦闘の基本',text:'行動順に味方の番が来たら「こうげき」「スキル1／2」「まもる」を選びます。敵をタップして狙いを決め、同じ色の味方で弱点を攻撃すると「ほころび」が増えます。ブレイクで敵の行動を止め、ワンモアで追加行動できます。「灯す」は灯火を1個使う強化です。'}:
 key&&ONBOARD_GUIDES[key];if(!info)return '';return `<aside class="onb-guide ${key==='map'?'onb-map-guide':''}" role="region" aria-label="${esc(info.title)}"><span class="onb-kicker">透子さんのメモ · ${key.startsWith('home_')?ONBOARD_HOME_ORDER.indexOf(key)+1+'/4':'初回案内'}</span><h3>${esc(info.title)}</h3><p>${esc(info.text)}</p><button type="button" onclick="dismissOnboardGuide('${key}')">案内を閉じる</button></aside>`}
function dismissOnboardGuide(key){const ob=S.onboarding;if(!ob?.enabled||onboardingSuppressed||!ONBOARD_GUIDES[key])return;ob.seen[key]=true;
 if(key==='map')S.questGuideSeen=true;
 if(key==='home_city'){ob.stage='done';ob.enabled=false;}
 persist();render();
 // Story transitions are always selected from the dedicated Story screen.
}

function toggleTitleSettings(){titleSettingsOpen=!titleSettingsOpen;titleConfirm=false;render()}
// v0.68.0.0: タイトルの一枚絵。起動するたびにこの中から1枚を選ぶ（絵が増えたらここに足す）
const TITLE_VISUALS=Object.freeze([
 {id:'lighthouse',p:'assets/ART_V2/title/title_lighthouse_portrait.webp',l:'assets/ART_V2/title/title_lighthouse_landscape.webp'},
 {id:'momoka',p:'assets/ART_V2/title/title_momoka_portrait.webp',l:'assets/ART_V2/title/title_momoka_landscape.webp'},
 {id:'backview',p:'assets/ART_V2/title/title_backview_portrait.webp',l:'assets/ART_V2/title/title_backview_landscape.webp'}
]);
let titleVisualPick=null;
function titleVisual(){if(!titleVisualPick)titleVisualPick=TITLE_VISUALS[Math.floor(Math.random()*TITLE_VISUALS.length)];return titleVisualPick;}
function titleVersionText(){const m=String(document.title||'').match(/Ver\.[0-9.]+/);return m?m[0]:'';}
function titlePage(){
 const hasSave=!!S.gameStarted&&SaveStore.read()!==null;
 const tv=titleVisual();
 const options=titleConfirm?`<div class="title-confirm" role="alertdialog" aria-label="はじめからの確認"><strong>今のデータは消えます</strong><p>現在のセーブが上書きされます。本当にはじめから遊びますか？</p><div><button type="button" onclick="cancelNewGame()">やめる</button><button type="button" class="danger" onclick="startNewGame()">削除してはじめる</button></div></div>`:'';
 const settings=titleSettingsOpen?`<div class="title-settings-panel"><button type="button" class="title-settings-back" onclick="toggleTitleSettings()">← タイトルに戻る</button>${audioSettingsCard()}</div>`:'';
 return `<main class="title-screen title-simple has-visual" data-visual="${tv.id}" aria-label="宵星の契約者 タイトル画面"><div class="title-visual tv-p" aria-hidden="true" style="background-image:url('${tv.p}?v=0.68.0.0')"></div><div class="title-visual tv-l" aria-hidden="true" style="background-image:url('${tv.l}?v=0.68.0.0')"></div><div class="title-stars" aria-hidden="true"></div><div class="title-inner"><div class="title-masthead"><h1>宵星の契約者</h1><strong>RE:START</strong></div><div class="title-actions">${hasSave?'<button type="button" class="title-primary" onclick="continueGame()">つづきから</button>':''}<button type="button" class="title-secondary" onclick="requestNewGame()">はじめから</button><button type="button" class="title-settings-button" onclick="toggleTitleSettings()">設定　<span>音量・消音</span></button></div><p class="title-version">${titleVersionText()}</p></div>${options}${settings}</main>`;
}

function isSessionLocked(){return (view==='investigation')||(view==='combat'&&!!battle&&!battle.done)||(view==='prologue'&&!!storySession)||(view==='story'&&!!storySession)||(view==='date'&&!!S.love?.pending)||(view==='city'&&questActionInProgress)||(romanceSelectionInProgress&&!!dialog)}
function requestInterrupt(){if(!isSessionLocked())return;interruptConfirm=true;render()}
function cancelInterrupt(){interruptConfirm=false;render()}
function confirmInterrupt(){
 if(!interruptConfirm)return;interruptConfirm=false;const current=view;
 if(current==='combat'&&battle){cancelBattle(false);return}
 if(current==='investigation'){view='city';dialog=null;render();return}
 if(current==='date'){// Keep the paid action/pending dialogue in the save for explicit resumption.
   dialog=null;romanceSelectionInProgress=false;view='talk';render();return;}
 if(current==='story'||current==='prologue'){questStoryFlow=null;if(storySession?.id==='oldcafe_meet'&&!S.oldcafeMet){S.oldcafeMeetingProgress=storySession.step;persist()}if(storySession?.id==='station_meet'&&!S.stationMet){S.stationMeetingProgress=storySession.step;persist()}if(storySession?.id==='office_meet'&&!S.officeMet){S.officeMeetingProgress=storySession.step;persist()}if(storySession?.id==='school_meet'&&!S.schoolMet){S.schoolMeetingProgress=storySession.step;persist()}if(storySession?.id==='lighthouse_meet'&&!S.lighthouseMet){S.lighthouseMeetingProgress=storySession.step;persist()}const wasBond=!!(storySession&&BOND_STORY_CATALOG[storySession.id]);storySession=null;view=current==='prologue'?'home':(wasBond?'talk':'city');render();return;}
 if(current==='city'&&questActionInProgress){questActionInProgress=false;dialog=null;render();return;}
 if(romanceSelectionInProgress){romanceSelectionInProgress=false;dialog=null;render();return;}
 render();
}
function interruptMarkup(){return `<div class="interrupt-shade" role="presentation"><section class="interrupt-box" role="alertdialog" aria-modal="true" aria-label="中断しますか？"><h2>中断しますか？</h2><p>${view==='date'?'おでかけの途中経過は保存され、後から続きを再開できます。':view==='combat'?'戦闘を中断すると、この戦闘の報酬は獲得できません。':'現在の場面を中断して戻りますか？'}</p><div><button type="button" class="btn outline" onclick="cancelInterrupt()">続ける</button><button type="button" class="btn primary" onclick="confirmInterrupt()">中断して戻る</button></div></section></div>`}

function toast(text){
  // Suppress transitory notifications during a blocking result/story dialog.
  if(dialog||document.querySelector('.overlay[role="dialog"]')){clearToast();return}
  clearToast();const e=document.createElement('div');e.className='toast';e.id='toast';
  e.textContent=String(text);document.body.appendChild(e);
  noticeTimer=setTimeout(()=>{if(e.isConnected)e.remove()},3200);
}
const ROUTE_IDS=Object.freeze(['opening','nameEntry','nameGreeting','investigation','home','city','notebook','prologue','story','roster','unit','training','gacha','talk','records','archive','zankyoBook','achievementsPage','combat','date']);
const AppRouter=Object.freeze({
  get current(){return view},
  go(next){
    if(!ROUTE_IDS.includes(next)||next==='combat'&&!battle){console.warn('[Yoiboshi] Invalid screen:',next);return false}
    if(isSessionLocked()){console.warn('[Yoiboshi] Navigation blocked during an active scene:',next);return false;}
    if(next!=='combat'&&battle&&!battle.done)cancelBattle(false);
    view=next;
    if(next!=='city')citySheetQuest='';
    if(next!=='story'&&next!=='prologue')storySession=null;
    render();
    if(typeof window.scrollTo==='function')window.scrollTo(0,0);
    return true;
  }
});
// One access point for save data, ephemeral UI context and state transitions.
const GameState=Object.freeze({
  get save(){return S},
  get ui(){return {screen:view,modal:dialog,combat:battle,selectedArchive:archiveSelected}},
  update(changeFn,{redraw=true}={}){
    if(typeof changeFn!=='function')throw new TypeError('update requires a function');
    changeFn(S);
    const saved=persist();
    if(redraw)render();
    return saved;
  }
});
function change(v){return AppRouter.go(v)}
function button(v,symbol,label){const locked=isSessionLocked();return `<button type="button" class="navbtn ${view===v?'active':''} ${locked?'nav-locked':''}" aria-label="${label}" ${locked?'disabled aria-disabled="true"':''} ${view===v?'aria-current="page"':''} onclick="change('${v}')"><span class="ico" aria-hidden="true">${symbol}</span><span>${label}</span></button>`}
const nav=[['home','⌂','ホーム'],['story','▤','ストーリー'],['city','✧','クエスト'],['roster','◇','キャラ・編成'],['gacha','✦','ガチャ'],['talk','♡','交流'],['records','☷','記録・設定']];
function mainShell(content){return `<div class="app" ${view==='story'?'onclick="storyTap(event)"':''}><aside class="sidebar"><div class="logo">宵星の契約者<small>YOIBOSHI CITY · RE:START</small></div>${nav.map(v=>button(...v)).join('')}<div class="sidefoot">Ver.0.34.71.1 · RE:START ALPHA<br>旧版のセーブデータは変更しません。<br>ストーリー・排出率・戦闘演出には暫定要素あり。</div></aside><main class="main"><header class="topbar"><div class="top-name">✦ <div>${view==='home'?'宵星の契約者':'宵星相談室'}<span>${view==='home'?'YOIBOSHI NO KEIYAKUSHA':'新任責任者の活動記録'}</span></div></div><div class="currency"><span class="wallet">✧ <span id="gems">${S.gems.toLocaleString()}</span></span><span class="wallet">◈ <span id="gold">${S.gold.toLocaleString()}</span></span></div></header><div class="page ${view==='home'?'home-page':''} ${view==='combat'?'combat-page':''} ${view==='roster'?'roster-v675':''} ${view==='unit'?'unit-v675':''} ${view==='training'?'training-v700':''} ${view==='city'?'quest-v676':''} ${view==='talk'?'talk-v676':''}">${content}${view==='home'?'':`<div class="copyright">宵星の契約者 · RE:START — 試遊版 / ガチャはゲーム内の無料通貨のみ / 成人向けシーン未収録<br>新ゲームデータは旧版と別保存。バトルの詳細演出・提供キャラの詳細設定は未確定。</div>`}</div></main><nav class="bottomnav ${isSessionLocked()?'nav-locked':''}" aria-label="ゲームの画面切り替え">${nav.map(v=>{const short=v[0]==='roster'?'編成':v[0]==='records'?'設定':v[2];return `<button type="button" onclick="change('${v[0]}')" class="${view===v[0]?'active':''} ${isSessionLocked()?'nav-locked':''}" aria-label="${v[2]}" ${isSessionLocked()?'disabled aria-disabled="true"':''} ${view===v[0]?'aria-current="page"':''}><span class="ico" aria-hidden="true">${v[1]}</span><span class="nav-label">${short}</span></button>`}).join('')}</nav></div>${dialog?dialogMarkup():''}`}
function heading(en,title,sub){return `<div class="eyebrow">${en}</div><h1 class="page-title">${title}</h1><p class="desc">${sub}</p>`}
function chars(cards,buttons=true){
 const units=cards.map(id=>unit(id)).filter(u=>!!u&&heroV0690Visible(u.person,S));
 const compact=onePortraitPerPerson(units).sort((a,b)=>(a.person==='momoka'?0:a.person==='milku'?1:2)-(b.person==='momoka'?0:b.person==='milku'?1:2));
 return `<div class="chargrid">${compact.map(u=>{
 const group=COMPACT_PEOPLE.has(u.person)?units.filter(x=>x.person===u.person):null;
 const d=data(u.id);
 if(group){const all=UNITS.filter(x=>x.person===u.person),numOwned=all.filter(x=>data(x.id)).length;return `<article class="charcard compact-person-card" data-person="${u.person}"><div class="art"><img src="${characterPortrait(u.person)}" alt="${person(u).name}の正式代表イラスト"><span class="sticker chip">代表イラスト1枚</span></div><div class="inside"><h3 class="unit-name">${person(u).name}</h3><p class="compact-meta">4バージョン／所持 ${numOwned}／4</p><p class="compact-desc">外見は共通、役割・育成は別々</p><details class="compact-expand" ${buttons?'':'open'}><summary>各バージョンを${buttons?'見る':'確認する'}（${group.length}種類）</summary>${compactVariantRows(u.person,group)}</details></div></article>`;}
 return `<div class="charcard"><div class="art"><img class="${u.person==='chinatsu'?'portrait-top':''}" src="${characterPortrait(u.person)}" alt="${person(u).name}のキャラクターイラスト"><span class="rtag">${u.rarity}</span><span class="sticker chip">${ROLES[u.role].name}</span></div><div class="inside"><h3 class="unit-name">${person(u).name}</h3><div class="unit-subtitle">${u.title}</div><p class="unit-status ${d?'is-owned':'is-unowned'}">${d?'所持中 · Lv.'+d.lv+' · '+d.lb+'/7凸':'未所持'}<span class="unit-rarity">${u.rarity}</span></p>${buttons?`<button class="btn mini full unit-details" onclick="openUnit('${u.id}')">${d?'詳細・育成':'詳細を見る'}</button>`:''}</div></div>`;
 }).join('')}</div>`;
}
function quickMember(id){const u=unit(id),d=data(id);return `<div class="member"><img class="smallportrait" src="${characterIcon(u.person)}" alt=""><div style="flex:1"><strong>${person(u).name} <span class="tiny">${u.title}</span></strong><p>${ROLES[u.role].name} · ${u.rarity} · Lv.${d?.lv||1}</p></div><span class="chip">${d?.lb||0}/7凸</span></div>`}

// Interactive introductory story: creative test script, not a finalized character biography or canonical chapter.
const PROLOGUE=[
 {who:'narrator',title:'第0話　相談室、はじめました。',text:'宵星市・東雲商店街。朝の光が差し込む、小さな事務所。市の求人で「宵星」という地名を見たとき、なぜか胸が騒いだ。その理由は分からないまま、今日からあなたは、宵星相談室の責任者になる。'},
 {who:'you',title:'新しい一日',text:'机の上には、街から届いた相談の手紙が何通か。封を切ろうとした、そのとき――'},
 {who:'aoi',title:'最初の挨拶',text:'「おはようございます、{name}さん。瀬名葵です。今日からこちらの相談室で、一緒に働きます。」'},
 {who:'you',title:'頼れるスタッフ',text:'出迎えてくれた葵が、書類を揃えた机の前に案内してくれる。'},
 {who:'aoi',title:'相談室の仕事',text:'「ここでは街の小さな違和感や困りごとを受け付けます。普通の相談に見えても、残響が関わっていることがあるんです。」'},
 {who:'aoi',title:'残響について',text:'「残響は、強すぎる想いが持ち主の手を離れて、その場所に残ったものです。重なると形を真似て動き出し、私たちはそれを『擬似体』と呼んでいます。誰かを傷つける前に鎮めるのが、私たちの役目です。」'},
 {who:'narrator',title:'旧灯台からの訪問者',text:'相談室の扉を控えめにたたく音がした。入ってきたのは、落ち着いた物腰の女性だった。'},
 {who:'touko',title:'古い星灯',text:'「旧灯台の保存会の、白鷺透子です。この灯は、{name}さんに預けますね」'},
 {who:'narrator',title:'手のひらの結晶',text:'透子が差し出したのは、手のひらに乗る小さな結晶。灯台の灯を思わせる古い星灯を受け取ると、あなたの手の中で淡く明滅した。'},
 {who:'touko',title:'星灯の使い方',text:'「星灯は残響を見つけて鎮める助けになりますよ。いきなり強く照らさず、まず反応を確かめてください」'},
 {who:'narrator',title:'好きな飲み物',text:'透子は机に置かれたあなたの湯のみを見て、「ほうじ茶がお好きなんですね」と親しげに微笑んだ。'},
 {who:'touko',title:'やさしい見送り',text:'「{name}さんなら、きっと大丈夫ですよ」'},
 {who:'narrator',title:'保存会へ戻る',text:'透子は皆に丁寧に会釈し、旧灯台の保存会の仕事へ戻っていった。葵が続きを説明する。'},
 {who:'aoi',title:'灯火と灯す力',text:'「相談室の星灯は、持ち主が信頼した人の想いを「灯火（ともしび）」に変えます。想いを灯火に変えて残響の中で力を貸せるようにすることを、私たちは「灯す（ともす）」と呼びます。」'},
 {who:'aoi',title:'契約者と仲間の違い',text:'「契約者は星灯と直接契約しているので、一人でも戦えます。でも、契約者ではない人は星灯を持つ人と一緒のときだけ、灯火の力で残響の中でも戦えるんです。」'},
 {who:'narrator',title:'廊下からの足音',text:'説明が終わるころ、階段の向こうで軽やかな足音と、運搬ケースが触れ合う音がした。'},
 {who:'akane',title:'市役所からの届け物',text:'「おはよう！ 藤崎朱音、市役所の防災・避難支援担当です。調査用の観測器などの機材、ちゃんと届けに来たよ！」'},
 {who:'akane',title:'準備は万全',text:'「もし異変が起きても、住民の避難は私に任せて。危ない場所には、まず近づかせないようにするから！」'},
 {who:'aoi',title:'観測器を確認',text:'「朱音さん、ありがとうございます。調査用の観測器も揃いましたね。これなら現場の記録を取れそうです。」'},
 {who:'akane',title:'新しいチーム',text:'「{name}さん、今日から私も調査に協力するよ。市役所との連絡も、このまま私が受け持つね！」'},
 {who:'you',title:'最初の仲間',text:'二人に礼を伝えたところで、入り口のベルが鳴った。'},
 {who:'momoka',title:'思いがけない来客',text:'「こんにちはっ！ あれ、今日から新しい責任者さん？ よろしくね！」'},
 {who:'milku',title:'商店街の人たち',text:'「お邪魔します。近くのお店から、お茶をお持ちしました。……もうお客さまがいらしたんですね。」'},
 {who:'momoka',title:'最初の相談',text:'「ちょうどよかった！ 商店街で変な時計の音がするんだって。昨日から、夕方になると何回も……。」'},
 {who:'you',title:'最初の判断',text:'調査の入り口を選ぼう。どちらを選んでも、正式な調査には星灯での解析が必要だ。',choices:[['people','まず、商店街の人に話を聞く'],['place','現場の記録を見て、時計の音を確かめる']]},
 {who:'narrator',title:'小さな手がかり',text:'branch'},
 {who:'milku',title:'時計の音の痕跡',text:'「本当に昔の時計の音なら、何か痕跡が残っているかもしれませんね。」'},
 {who:'momoka',title:'一緒に、出かけよう',text:'「えへへ。さっそく最初のお仕事だね！ 私も一緒に行っていい？」'},
 {who:'aoi',title:'聞き込みの準備',text:'「まずは商店街で話を聞きましょう。音が鳴った時刻と場所を記録すると、残響の位置を絞れます。」'},
 {who:'akane',title:'安全確認',text:'「私は周辺を見てくるね。もし人が集まっていたら、安全な道へ案内するよ！」'},
 {who:'milku',title:'音の記憶',text:'「私にも手伝えることがあれば、言ってください。」'},
 {who:'you',title:'信じられる仲間',text:'あなたは二人の申し出を受け止め、心から力を貸してほしいと思った。星灯は、その想いに応えるように明るさを増す。'},
 {who:'narrator',title:'はじめて灯る想い',text:'あなたが星灯を掲げると、ももかとみるくの胸元に、小さな光が一つずつ灯った。色も温かさも、それぞれ違う。'},
 {who:'momoka',title:'ももかの灯火',text:'「わあ、ピンク色！ 商店街のみんなを笑顔にしたいって思ったら、こんな光になったよ！」'},
 {who:'milku',title:'みるくの灯火',text:'「私のは、淹れたてのお茶みたいな温かい色……。不安な人に、ほっとしてほしい気持ちが、形になったんですね。」'},
 {who:'aoi',title:'ふたりの灯火',text:'「二人の灯火が安定しました。{name}さんの星灯がそばにあれば、お二人も残響の中で戦えます。無理はしないでくださいね。」'},
 {who:'aoi',title:'出発前の役割',text:'「現場では私が記録と解析をします。透子さんから預かった星灯は、{name}さんが持っていてください。」'},
 {who:'narrator',title:'商店街へ',text:'葵、朱音、ももか、みるく、そして新しい責任者。五人は朝の相談室を出て、商店街へ向かった。'},
 {who:'narrator',title:'物語の始まり',text:'何でもない一日のはずだった。でも、あなたたちはまだ知らない。宵星市の夕暮れに、いくつもの過去が眠っていることを。'},
 {who:'narrator',title:'はじめての依頼',text:'商店街の時計音――相談室に届いた最初の依頼を、確かめに行こう。'},
];
function openPrologue(){storySession={step:0,choice:null};view='prologue';render();window.scrollTo(0,0)}
function skipPrologue(){if(view==='prologue'&&storySession)finishPrologue()}
function prologueTap(event){if(!storySession||PROLOGUE[storySession.step]?.choices||event.target.closest('button,a,input,select,textarea,[role="button"]'))return;nextPrologue()}
function nextPrologue(){if(!storySession)return;storySession.step++;if(storySession.step>=PROLOGUE.length)return finishPrologue();render()}
function choosePrologue(choice){if(!storySession||!['people','place'].includes(choice)||!PROLOGUE[storySession.step]?.choices)return;storySession.choice=choice;nextPrologue()}
function finishPrologue(){if(!S.storyFlags)S.storyFlags={};const first=!S.storyFlags.prologue;S.storyFlags.prologue=true;if(first&&['people','place'].includes(storySession?.choice))S.chapterChoiceMemory.prologue=storySession.choice;if(first)S.gems+=150;if(S.onboarding?.enabled&&S.onboarding.stage==='prologue'){S.onboarding.stage='q1';S.questGuideSeen=true;}persist();storySession=null;view='story';citySheetQuest='';render();toast(first?'序章クリア：星晶石150（初回のみ）':'序章を再読しました');window.scrollTo(0,0)}
// Narrative-only portrait cast; not a recruitable heroine and never serialized.
// 立ち絵のない、声だけで登場する人物（名前は出すが立ち絵の枠は出さない）
const STORY_VOICE_ONLY=new Set(['anokata','toyo','okinu']); // v0.65.1.0: 常夜は会話絵あり
const STORY_ONLY_CAST=Object.freeze({touko:'白鷺 透子',sakuya:'朔夜',ibuki:'イブキ',haruka:'霧島 ハルカ',saya:'氷室 沙耶',natsume:'深川 なつめ',hotaru:'遠野 ほたる',aoi_dark:'瀬名 葵',ruri:'久遠 ルリ',ichika:'甘利 いちか',minori:'桐生 みのり',sumire:'九条 すみれ',kirie:'御堂 キリエ',enju:'宵宮 槐',wakaba:'筒井 わかば',urara:'赤坂 うらら',iroha:'大森 いろは',tokoyo:'市守り・常夜',anokata:'？？？',sacchan:'さっちゃん',toyo:'湯守・とよ',okinu:'灯籠職人・おきぬ',kasumi_shion:'SHION∞'});
const TRUE_TOUKO_STORY_IDS=Object.freeze(['q52_pre','q52','q53_intro','q53_pre','chapter9_end','q58_intro','q58_pre','q58','q59_intro','q59_pre','q59','q60_intro','chapter12_end','chapter13_end','chapter15_open','q86_intro','q87_intro','q87','q88_intro','q88','q89_intro','q89_pre','q89','q90_intro','q90_pre','q90','q81_intro','q81_pre','q81','q82_intro','q82_pre','q82','q83_intro','q83_pre','q83','q84_intro','q84_pre','q84']); // v0.34.56.0: 朔夜・イブキにも会話用の立ち絵
const CHAPTER3_ONLY_VOICE=Object.freeze({ibuki:'売人イブキ'});
function prologuePage(){
 if(!storySession)storySession={step:0,choice:null};
 const i=Math.min(PROLOGUE.length-1,storySession.step),sc=PROLOGUE[i],sp=sc.who;
 const who=PEOPLE[sp]?.name||(sp==='you'?playerDisplayName():STORY_ONLY_CAST[sp]||'ナレーション');
 let line=sc.text;
 if(line==='branch')line=storySession.choice==='people'?'商店街のお店に電話すると、「夕方になると、昔の時計が七回鳴る」と教えてくれた。時計自体は何年も前に撤去されているという。':'相談室に届いた商店街の録音を確かめた。時計はもうないはずなのに、音声の最後に古いベルの音が一瞬だけ混じっていた。';
 const choices=sc.choices?`<div class="story-choices">${sc.choices.map(([id,label])=>`<button class="btn outline" onclick="choosePrologue('${id}')">${esc(label)}　↗</button>`).join('')}</div>`:`<button class="btn primary" onclick="nextPrologue()">${i===PROLOGUE.length-1?'序章を終える':'続きを読む　→'}</button>`;
 // Only characters speaking on this line are visible; narrative / player lines are cast-free.
 const currentPortrait=PEOPLE[sp]||STORY_ONLY_CAST[sp]?sp:null;
 const prologueFaces=authoredStoryFaceState('prologue',PROLOGUE,i).faces;
 const cast=currentPortrait?`<figure class="onb-person speaking">${expressionPortraitMarkup(sp,prologueFaces[sp]||'normal','prologue',{wrapperClass:'onb-expression',alt:`${PEOPLE[sp]?.name||STORY_ONLY_CAST[sp]}の立ち絵`})}</figure>`:'';
 return `<div class="story-panel card onb-prologue vn-story" aria-label="序章の会話画面" onclick="prologueTap(event)">
 <div class="story-scene has-bg"><div class="story-bg" style="background-image:url('assets/ART_V2/backgrounds/bg_soudan_day.webp')" aria-hidden="true"></div><div class="story-skyline" style="pointer-events:none"></div><div class="onb-cast">${cast}</div>
 <div class="vn-toolbar"><span class="vn-location">東雲商店街 ／ 宵星相談室 · 午前</span><div class="vn-top-actions"><button type="button" class="vn-tool" onclick="skipPrologue()">スキップ</button><button type="button" class="vn-tool" onclick="requestInterrupt()">閉じる</button></div></div>
 <div class="story-dialogue"><div class="vn-dialogue-head"><span class="vn-speaker">${sc.who==='narrator'?'':esc(who)}</span></div>
 <p class="story-line">${esc(substitutePlayerName(line))}</p>
 <div class="vn-dialogue-actions">${choices}</div></div></div></div>`;
}

// Chapter 1 script is provisional and independent from owned units.
const CHAPTER_STORIES=Object.freeze({...CHAPTER2_STORIES,...CHAPTER2_LATE_STORIES,...CHAPTER3_STORIES,...CHAPTER3_LATE_STORIES,...CHAPTER4_STORIES,...CHAPTER5_STORIES,...STORY_REWRITE_V03416,...(typeof CHAPTER5_REWRITE_V0360!=='undefined'?CHAPTER5_REWRITE_V0360:{}),...(typeof CHAPTER6_STORIES!=='undefined'?CHAPTER6_STORIES:{}),...(typeof CHAPTER7_STORIES!=='undefined'?CHAPTER7_STORIES:{}),...(typeof CHAPTER8_STORIES!=='undefined'?CHAPTER8_STORIES:{}),...(typeof CHAPTER9_STORIES!=='undefined'?CHAPTER9_STORIES:{}),...(typeof CHAPTER10_STORIES!=='undefined'?CHAPTER10_STORIES:{}),...(typeof CHAPTER11_STORIES!=='undefined'?CHAPTER11_STORIES:{}),...(typeof CHAPTER12_STORIES!=='undefined'?CHAPTER12_STORIES:{}),...(typeof CHAPTER13_STORIES!=='undefined'?CHAPTER13_STORIES:{}),...(typeof CHAPTER14_STORIES!=='undefined'?CHAPTER14_STORIES:{}),...(typeof CHAPTER15_STORIES!=='undefined'?CHAPTER15_STORIES:{}),...(typeof CHAPTER16_STORIES!=='undefined'?CHAPTER16_STORIES:{}),...(typeof CHAPTER17_STORIES!=='undefined'?CHAPTER17_STORIES:{}),...(typeof CHAPTER18_STORIES!=='undefined'?CHAPTER18_STORIES:{}),...(typeof CHAPTER19_STORIES!=='undefined'?CHAPTER19_STORIES:{}),...(typeof CHAPTER20_STORIES!=='undefined'?CHAPTER20_STORIES:{}),...(typeof CHAPTER21_STORIES!=='undefined'?CHAPTER21_STORIES:{}),...(typeof CHAPTER22_STORIES!=='undefined'?CHAPTER22_STORIES:{}),...(typeof CHAPTER23_STORIES!=='undefined'?CHAPTER23_STORIES:{}),...(typeof CHAPTER24_STORIES!=='undefined'?CHAPTER24_STORIES:{}),...(typeof CHAPTER25_STORIES!=='undefined'?CHAPTER25_STORIES:{}),...(typeof CHAPTER26_STORIES!=='undefined'?CHAPTER26_STORIES:{}),...(typeof CHAPTER27_STORIES!=='undefined'?CHAPTER27_STORIES:{}),...(typeof CHAPTER28_STORIES!=='undefined'?CHAPTER28_STORIES:{}),...(typeof CHAPTER29_STORIES!=='undefined'?CHAPTER29_STORIES:{}),...(typeof CHAPTER30_STORIES!=='undefined'?CHAPTER30_STORIES:{}),...(typeof CHAPTER31_STORIES!=='undefined'?CHAPTER31_STORIES:{}),...(typeof CHAPTER32_STORIES!=='undefined'?CHAPTER32_STORIES:{}),...(typeof CHAPTER33_STORIES!=='undefined'?CHAPTER33_STORIES:{}),...(typeof CHAPTER34_STORIES!=='undefined'?CHAPTER34_STORIES:{}),...(typeof CHAPTER35_STORIES!=='undefined'?CHAPTER35_STORIES:{}),...(typeof CHAPTER36_STORIES!=='undefined'?CHAPTER36_STORIES:{}),...(typeof CHAPTER37_STORIES!=='undefined'?CHAPTER37_STORIES:{}),
  q7_lead:{title:"消えた姉の部屋・導入",place:"神楽坂家・旧住宅区",requires:[],lines:[
   {"who":"narrator","text":"旧住宅区の坂道。古い家並みのあいだに、神楽坂家の門がある。"},
   {"who":"narrator","text":"門の前で、一人の女性が待っていた。分厚いノートを二冊、胸に抱えている。"},
   {"who":"tsubaki","text":"「宵星相談室の方ね。神楽坂椿です。連絡したのは私。」"},
   {"who":"you","text":"「お姉さんのことで相談があると聞いています。」"},
   {"who":"tsubaki","text":"「楓。双子の姉よ。三か月前、自分の部屋からいなくなった。届けも出したけど、手がかりはひとつも出てこなかった。」"},
   {"who":"aoi","text":"「この家の周辺で、個人の星灯に近い波形が観測されています。だから私たちが来ました。」"},
   {who:'aoi',chapterEcho:'chapter2_aoi'},
   {"who":"tsubaki","text":"「……星灯。やっぱり、普通の失踪じゃないのね。」"},
   {"who":"narrator","text":"椿は門を開け、二階を見上げた。一番奥の部屋だけ、カーテンが閉じたままだ。"},
   {"who":"tsubaki","text":"「夜になると、姉の部屋から声がするの。楓の声に、そっくりな。」"},
   {"who":"reina","text":"「その声を聞いたのは、椿さんだけですか？」"},
   {"who":"tsubaki","text":"「ええ。だから、私がおかしくなったのかと思った。でも、ノートに書いた時刻と星灯の記録が同じなら――」"},
   {"who":"you","text":"「確かめよう。椿の記録も、部屋も、一緒に。」"},
   {"who":"tsubaki","text":"「お願い。部屋は私が案内する。……何も片づけてないの。三か月、ずっと。」"},
   {"who":"narrator","text":"階段を上がるたび、古い床板が鳴った。楓の部屋の扉の前で、椿は一度だけ深く息を吸った。"}]},
  q8_lead:{title:"仮面の夜会・導入",place:"宵星市・夜会場",requires:[],lines:[
   {"who":"narrator","text":"港通りの外れ、看板のないビル。差出人のない招待状に書かれた住所は、ここを指していた。"},
   {"who":"reina","text":"「招待状の封蝋、椿さんのノートにあった紋様と似ています。偶然とは思えません。」"},
   {who:'reina',chapterEcho:'chapter2_reina'},
   {"who":"aoi","text":"「会場の中から、複数の星灯の反応があります。……契約者が何人も集まっているのかもしれません。」"},
   {"who":"you","text":"「全員が敵とは限らない。まずは様子を見よう。」"},
   {"who":"narrator","text":"受付で手渡された仮面をつけてホールに入ると、同じように顔を隠した人々が、グラスを手に談笑していた。"},
   {"who":"momoka","text":"「なんか、映画みたい。……みんな顔が見えないって、ちょっと怖いね。」"},
   {"who":"narrator","text":"人波の向こうで、一人の女性がこちらを見て、ゆっくりとグラスを掲げた。黒いドレスに、銀縁の仮面。"},
   {"who":"erika","text":"「ようこそ、宵星相談室の皆さん。招待状、ちゃんと届いたみたいね。城ヶ崎エリカよ。ルミエールという店をやっているわ。」"},
   {"who":"you","text":"「あなたが差出人か。」"},
   {"who":"erika","text":"「さあ、どうかしら。私はこの夜会に、いくらか貸しがあるだけよ。」"},
   {"who":"reina","text":"「なぜ私たちを呼んだんですか。」"},
   {"who":"erika","text":"「今夜ここで『黒い星灯』の話が出るかもしれないから。それを聞いて、あなたたちがどう動くのか、見てみたかったの。」"},
   {"who":"narrator","text":"エリカは仮面の奥で笑い、人波の中へ消えた。直後、ホールの照明が一瞬だけ揺らいだ。"},
   {"who":"aoi","text":"「監視装置の反応が……今、止まりました。」"}]},
  q9_lead:{title:"二人目の契約者・導入",place:"宵星港・倉庫街",requires:[],lines:[
   {"who":"narrator","text":"夜会で拾った紙片には、数字と記号が並んでいた。玲奈が一晩かけて読み解いた先は、宵星港の倉庫街だった。"},
   {"who":"reina","text":"「倉庫の番号と、満潮の時刻です。今夜、ここで何かが起きます。」"},
   {"who":"akane","text":"「この辺りは夜になると誰もいなくなるの。見回りは私がするね。倉庫の扉には勝手に触らないで！」"},
   {who:'akane',chapterEcho:'chapter2_akane'},
   {"who":"aoi","text":"「星灯の反応……擬似体とは違います。細くて、まっすぐな波形。契約者本人の反応に近いです。」"},
   {"who":"you","text":"「夜会にいた誰かか？」"},
   {"who":"aoi","text":"「分かりません。ただ、その人は、私たちより先にここへ来ています。」"},
   {"who":"narrator","text":"封鎖されているはずの倉庫の扉が、わずかに開いていた。中から、金属が擦れる音が聞こえる。"},
   {"who":"narrator","text":"隙間から覗くと、黒いコートの人物が背を向けて立っていた。顔の下半分を、黒いマスクが覆っている。"},
   {"who":"masked","text":"「……来ると思っていたわ。夜会で、あれだけ目立っていたもの。」"},
   {"who":"you","text":"「君も、夜会にいたのか。」"},
   {"who":"masked","text":"「邪魔をしないで。ここに残っているものを確かめたら、すぐに消えるから。」"},
   {"who":"narrator","text":"その言葉が終わらないうちに、倉庫の奥で黒い波形が膨らんだ。"},
   {"who":"aoi","text":"「擬似体です！ ……でも、この人を狙っているんじゃない。この場所そのものに、何かが仕掛けられています。」"}]},
  q10_lead:{title:"八年前の記録・導入",place:"市役所・地下書庫",requires:[],lines:[
   {"who":"narrator","text":"市役所の地下。古い紙の匂いがする階段の先に、ふだんは鍵のかかった書庫がある。"},
   {"who":"fumika","text":"「八年前の旧灯台事件の記録は、ここに保管してあります。……私がこの仕事に就いて、最初に担当した事件でした。」"},
   {"who":"you","text":"「文香さんが？」"},
   {"who":"fumika","text":"「ええ。当時は、ただの行方不明として処理されました。でも、どうしても納得できなくて。記録だけは、捨てずに残してきたんです。」"},
   {"who":"narrator","text":"文香の後ろで、ゆめが階段の途中に立ち止まっていた。"},
   {"who":"yume","text":"「……ここに、私のことが書いてあるんですよね。」"},
   {"who":"you","text":"「無理に来なくてもよかったんだ。」"},
   {"who":"yume","text":"「いいえ。私が覚えていることと、記録に残っていることを比べたら、楓さんの手がかりになるかもしれないから。」"},
   {"who":"yume","text":"「それに……この八年に何があったのか、私も知りたいんです。」"},
   {"who":"aoi","text":"「書庫の奥から、擬似体の反応があります。資料を守りながら進みましょう。」"},
   {"who":"fumika","text":"「書類に触れる前に、私に声をかけてください。順番を崩すと、元に戻すのが大変なので。」"},
   {"who":"narrator","text":"文香は鍵束から一本を選び、重い扉を押し開けた。冷えた空気の奥で、何かが紙をめくる音がした。"}]},
  q11_lead:{title:"黒い星灯・導入",place:"埋立地・旧発電所",requires:[],lines:[
   {"who":"narrator","text":"埋立地の外れ。止まったままの煙突の下に、旧発電所の建物が黒く沈んでいる。"},
   {"who":"fumika","text":"「地下書庫の記録にあった紋様と同じものが、ここの稼働記録にも残っていました。」"},
   {"who":"aoi","text":"「黒い星灯の反応です。強さは、夜会のときとは比べものになりません。」"},
   {"who":"akane","text":"「中は床が抜けてるところもあるみたい。入れる場所は私が先に確かめるね！」"},
   {"who":"narrator","text":"正門の錠は、すでに壊されていた。真新しい傷だった。"},
   {"who":"reina","text":"「誰かが先に入っています。」"},
   {"who":"narrator","text":"制御室へ続く通路で、黒いコートの背中が振り返った。港で会ったマスクの契約者――紫藤カナメだった。"},
   {"who":"kaname","text":"「……また、あなたたち。どうしてここが分かったの。」"},
   {"who":"you","text":"「同じものを追っているからだ。黒い星灯を。」"},
   {"who":"kaname","text":"「私は八年、一人で追ってきた。今さら誰かと組むつもりはないわ。」"},
   {"who":"aoi","text":"「でも、この先の擬似体は黒い星灯に直接操られています。一人では危険です。」"},
   {"who":"narrator","text":"カナメは何か言いかけて、口を閉じた。通路の奥で、計器の針が一斉に振り切れる。"},
   {"who":"kaname","text":"「……今夜だけよ。終わったら、それぞれの道に戻る。それでいいわね。」"},
   {"who":"you","text":"「ああ。今夜だけでいい。」"}]},
  q12_lead:{title:"残響の檻・導入",place:"旧灯台・地下",requires:[],lines:[
   {"who":"narrator","text":"旧灯台の地下へ続く階段は、思っていたよりずっと深かった。壁の明かりが、数段先で闇に吸い込まれていく。"},
   {"who":"tsubaki","text":"「この下に、お姉ちゃんがいるのね。」"},
   {"who":"you","text":"「椿、本当についてくるのか。」"},
   {"who":"tsubaki","text":"「姉の声が分かるのは、私だけよ。……ずっと待っていたけど、今日だけは待っていられない。」"},
   {"who":"aoi","text":"「楓さんの反応は微弱ですが、確かにあります。椿さんの声が届けば、檻の内側から道が見つかるかもしれません。」"},
   {"who":"aoi","text":"「{name}さん。今夜も、強く灯すときは私からにしてください。」"},
   {"who":"you","text":"「灯台のときも、そう言ってたな。」"},
   {"who":"aoi","text":"「解析は、一番近くで見るのがいちばん正確なので。……それだけです。」"},
   {"who":"reina","text":"「戦いになったら、椿さんは必ず後ろに。それだけは約束してください。」"},
   {"who":"tsubaki","text":"「約束する。」"},
   {"who":"narrator","text":"階段を下りきった先に、黒い光の膜が揺れていた。その前に、一人の女性が立っている。"},
   {"who":"sakuya","text":"「ここまで来たのね、相談室。でも、この檻は私の星灯でしか開かないわ。」"},
   {"who":"you","text":"「朔夜。楓を返してもらう。」"},
   {"who":"sakuya","text":"「返す？ この子は自分から、昔の記録に手を伸ばしたのよ。触れてはいけないものに。」"},
   {"who":"narrator","text":"背後の階段を、駆け下りてくる足音がした。息を切らしたカナメが、闇の中で黒い刃を抜く。"},
   {"who":"kaname","text":"「……やっと会えたわね、朔夜。八年分、返してもらうわよ。」"}]},
  q1_lead:{title:'商店街の時計音・導入',place:'東雲商店街',requires:[],lines:[
   {who:'narrator',text:'夕暮れの東雲商店街。いつもなら買い物客が立ち話をする時間だが、鐘の音を警戒して足早に帰る人が増えていた。'},
   {who:'akane',text:'「人通りが少なくなってるね。私は通りの安全を確認するよ！」'},
   {who:'narrator',text:'通りの一角に、シャッターの下りた時計店がある。ももかは、その前でふいに足を止めた。'},
   {who:'momoka',text:'「あ……この時計店、まだそのままなんだ。」'},
   {who:'you',text:'「知っている店なのか？」'},
   {who:'momoka',text:'「えへへ。うん、ちょっとね。……それより、早くみんなのお話を聞こう！」'},
   {who:'milku',text:'「……ももかさん？」'},
   {who:'momoka',text:'「だいじょうぶ！ ほら、行こ！」'},
   {who:'momoka',chapterEcho:'prologue_momoka'},
   {who:'aoi',text:'「そうですね。先に決めつけず、集まった記録とお話を比べてみましょう。」'},
   {who:'narrator',text:'ももかはいつもの笑顔で先を歩き出す。あなたたちも、最初の聞き込みへ向かった。'}]},
  q4_lead:{title:'誰もいない教室の黒板・導入',place:'旧宵星第二小学校',requires:[],lines:[
   {who:'narrator',text:'夜の旧宵星第二小学校。校舎の窓には明かりがなく、廊下には自分たちの足音ばかりが響いている。'},
   {who:'chinatsu',text:'「ここ、昔は走ると先生に叱られたんだよ。……今なら、誰も怒らないね。」'},
   {who:'you',text:'「静かすぎるな。」'},
   {who:'chinatsu',text:'「うん。学校って、こんなに広かったっけ。」'},
   {who:'akane',text:'「古い校舎だから、まずは通れる場所を確かめるね。教室に入るのは、そのあとで！」'},
   {who:'reina',text:'「ありがとうございます。確認できた場所から記録を取ります。」'},
   {who:'narrator',text:'教室の扉の向こうには、机が整然と並んでいた。誰もいない。それなのに、黒板の前にだけ、さっきまで誰かが立っていたような気がした。'},
   {who:'aoi',text:'「黒板に文字が現れるという報告はあります。でも、誰が何のために残したのかは、まだ分かりません。」'},
   {who:'chinatsu',text:'「……そっか。昔を知ってるからって、今のここが分かるわけじゃないよね。」'},
   {who:'you',text:'「一緒に確かめよう。」'},
   {who:'chinatsu',text:'「うん。まずはちゃんと調べよっか。……責任者くん、足元には気をつけてね。」'}]},
  q5_lead:{title:'止まった観覧車・導入',place:'宵星臨海公園',requires:[],lines:[
   {who:'narrator',text:'夜の宵星臨海公園。閉園した遊園地の入口には、かつて客の列を区切っていた柵が残っていた。'},
   {who:'narrator',text:'風に揺れる案内板の向こうで、観覧車だけに灯りがともっている。ゴンドラは一つも動いていない。'},
   {who:'momoka',text:'「ここ、昔はきっとにぎやかだったんだよね。……今は、風の音しか聞こえない。」'},
   {who:'aoi',text:'「旧校舎で見つかった時刻が、この観覧車を指していました。でも、明かりがつく理由まではまだ分かりません。」'},
   {who:'akane',text:'「使われていない設備もあるから、勝手に奥へ入らないでね。立ち入れる範囲を確認するよ。」'},
   {who:'you',text:'「まずは調べられる場所から確かめよう。」'},
   {who:'narrator',text:'人が並んでいた通路は空いたままなのに、頭上では光だけが夜を照らしていた。'}]},
  q6_ready:{title:'宵の星灯台・出撃前',place:'宵星港・旧灯台',requires:[],lines:[
   {who:'narrator',text:'灯台の奥で、残響が大きな輪郭を取り始めていた。観測器の表示は落ち着かず、足元を伝う振動が少しずつ強くなる。'},
   {who:'akane',text:'「港への立入制限は続けてるよ！ 戻るときの通路も確認した。何かあったら、すぐに知らせて！」'},
   {who:'reina',text:'「調査記録は私が保持します。朱音さん、通れる場所が変わったら、すぐに共有してください。」'},
   {who:'akane',text:'「うん！ 玲奈も、危ないと思ったら無理しないでね。」'},
   {who:'aoi',text:'「反応が強すぎます。今までと同じようには抑えられないかもしれません。」'},
   {who:'aoi',text:'「{name}さん。もし強く灯す必要があるときは……私からにしてください。解析のために、一番近くで灯火を見ておきたいので。」'},
   {who:'you',text:'「分かった。戻る道は確保したまま、みんなで食い止めよう。」'}]},
  q2_lead:{title:'閉店したカフェの灯り・導入',place:'西通り・旧喫茶街',requires:[],lines:[
   {who:'narrator',text:'西通り・旧喫茶街。夕暮れが近づくにつれ、営業中の店々に明かりがともり始めた。'},
   {who:'narrator',text:'その通りで、閉店した一軒のカフェの窓にだけ、薄い橙色の光が浮かんでいる。ガラスの向こうに人影はない。'},
   {who:'you',text:'「明かりは見えるのに、人の気配がないな。」'},
   {who:'aoi',text:'「現在は営業していないお店です。照明設備の問題なのか、それとも残響なのか……記録と証言を確かめましょう。」'},
   {who:'narrator',text:'みるくが、ふと襟元を整えた。お客を迎える前に、いつもしているような仕草だった。'},
   {who:'you',text:'「みるく？」'},
   {who:'milku',text:'「……あ、すみません。灯りを見たら、つい。お客さまをお迎えする前の癖なんです。」'},
   {who:'akane',text:'「通りの安全は私が見ておくよ。みんなは調査に集中して！」'},
   {who:'milku',text:'「はい。お話を聞く方が安心できるように、私もお手伝いしますね。」'},
   {who:'milku',chapterEcho:'prologue_milku'},
   {who:'narrator',text:'みるくはいつもと同じように微笑んだ。だが、笑い終えるまでに、ほんの少し間があった。'}]},
  q3_lead:{title:'消えない踏切の警報・導入',place:'東雲駅前',requires:[],lines:[
   {who:'narrator',text:'東雲駅前。使われていない線路を、閉じた遮断機が横切っている。誰も通らないはずの踏切で、警報だけが繰り返し鳴っていた。'},
   {who:'narrator',text:'駅前の歩道には迂回を促す案内が出ている。朱音は足を止める通行人に声をかけ、安全な道へ誘導していた。'},
   {who:'akane',text:'「相談室のみんな、来てくれたね！ 今は歩行者を遠回りの道へ案内してる。設備を調べるときは、先に私に確認して！」'},
   {who:'reina',text:'「警報が続いている間に、現場の記録を取りたいんです。後になってからでは、消えてしまう痕跡もあります。」'},
   {who:'akane',text:'「必要なのは分かる。でも、音が鳴るたびに立ち止まる人がいるんだ。まずは人の流れを落ち着かせたい。」'},
   {who:'reina',text:'「原因を特定できなければ、別の場所でも同じことが起きるかもしれません。今の記録を逃したくないんです。」'},
   {who:'akane',text:'「私だって次を防ぎたいよ！ でも、今ここにいる人を危険に近づけるわけにはいかない。」'},
   {who:'narrator',text:'二人が言葉を切った間にも、警報が鳴る。'},
   {who:'akane',chapterEcho:'chapter1_akane'},
   {who:'aoi',text:'「離れた場所から記録できるものもあります。近づく必要がある場所は、朱音さんの安全確認を待ちましょう。」'},
   {who:'you',text:'「それでいこう。安全を確認できた場所から調べる。状況が変わったら、すぐに知らせ合おう。」'},
   {who:'reina',text:'「……分かりました。現場の記録は、私が確認します。」'},
   {who:'akane',text:'「うん！ 危ない場所があれば、私が先に知らせるね！」'},
   {who:'narrator',text:'朱音は再び通行人の誘導に戻った。相談室は、安全を確認できた範囲から調査を始める。'}]},
 chapter1_open:{title:'第1章 開幕　増幅する残響',place:'宵星相談室・夕方',requires:['q2'],lines:[
  {who:'narrator',title:'不自然な記録',text:'旧喫茶街から戻った相談室。机には、星灯で記録した増幅波形が並んでいた。'},
  {who:'aoi',title:'解析結果',text:'「記録を重ねるほど、同じ周期が見えてきました。自然に強まる残響なら、ここまで揃いません。」'},
  {who:'reina',title:'残された痕跡',text:'「波形の強さが一定の間隔で変わっています。……誰かが、意図的に増幅させている可能性があります。」'},
  {who:'you',title:'責任者の判断',text:'「誰かが意図的に増幅させてるなら、放っておけないな。俺たちで次の一手を決めよう。」',choices:[['field','まず現場を見に行こう'],['record','波形の記録をもっと調べよう']]},
  {who:'aoi',title:'方針を決めて',text:'branch'},
  {who:'aoi',title:'次の調査へ',text:'branch_followup'},
  {who:'akane',title:'市役所からの連絡',text:'「相談室のみんな、聞こえる？ 同じ波形が東雲駅前と学校、それに臨海公園でも出たの。まず駅前の避難誘導を始めるね！」'},
  {who:'narrator',title:'第1章　増幅する残響',text:'ひとつだった異変は、街のあちこちにつながり始めた。答えのないまま、次の依頼が届く。'}]},
 q3:{title:'消えない踏切の警報・後日談',place:'東雲駅前',requires:['q3'],lines:[
  {who:'akane',title:'安全確認',text:'「もう警報は止まったよ！ 通行止めも、確認してから解除するね。助かったよ、みんな！」'},
   {who:'reina',title:'整えられた流れ',text:'「朱音さんが人の流れを整えてくれたおかげで、落ち着いて記録を取れました。」'},
   {who:'akane',title:'残された記録',text:'「私には原因までは分からなかった。玲奈が記録を残してくれて、よかったよ。」'},
   {who:'reina',title:'続く調査',text:'「……ええ。まだ、調べるべきことがあります。」'},
  {who:'reina',title:'同じ波形',text:'「旧喫茶街の記録と一致しました。残響の場所は違うのに、増幅のしかただけ同じです。」'},
  {who:'aoi',title:'手がかり',text:'「増幅される前の記録も探しましょう。次は閉校舎です。」'},
  {who:'reina',title:'混ざった音',text:'「……待ってください。波形を音に戻すと、最後に何か入っています。」'},
  {who:'narrator',title:'小さな鼻歌',text:'雑音の奥で、子どもの鼻歌のような音が、ほんの数秒だけ鳴って消えた。'},
  {who:'akane',title:'誰の声',text:'「今の、子どもの声……？ 踏切のまわりに、子どもなんていなかったよ。」',cue:{target:'akane',face:'sad'}},
  {who:'narrator',title:'答えのない声',text:'誰の声なのか、答えられる者はいなかった。'}]},
 q4:{title:'誰もいない教室の黒板・後日談',place:'旧宵星第二小学校',requires:['q4'],lines:[
  {who:'chinatsu',title:'小さな思い出',text:'「教室の黒板、昔は落書きでいっぱいだったな。……誰かの思い出が、ここに残ってたのかもね。」'},
  {who:'reina',title:'一瞬の影',text:'「監視記録に、人影がありました。白峰凪に似ていますが、確証はありません。」'},
  {who:'narrator',title:'文字が示す場所',text:'黒板に残された時刻を照合すると、臨海公園の観覧車が示された。'},
  {who:'chinatsu',title:'もう一行',text:'「ねえ、黒板の隅……時刻の下に、もう一行あるよ。」',cue:{target:'chinatsu',face:'normal'}},
  {who:'narrator',title:'子どもの字',text:'消えかけたチョークの跡。子どもの丸い字で、「まだ ここにいるよ」とだけ書かれていた。'}]},
 q5:{title:'止まった観覧車・後日談',place:'宵星臨海公園',requires:['q5'],lines:[
  {who:'nagi',title:'残された警告',text:'「……その星灯で、灯しすぎないで。忘れる側より、覚えている側のほうが、ずっとつらいから。」'},
   {who:'narrator',title:'視線の先',text:'凪の視線は、止まった観覧車ではなく、港の暗い方角へ向いていた。'},
  {who:'you',title:'責任者の返答',text:'「忠告は受け取っておく。でも、この街で起きてることを見過ごすわけにはいかない。」'},
  {who:'aoi',title:'星灯の道筋',text:'「観覧車から港へ、波形が集まっています。旧灯台で何かが起きているのかもしれません。」'},
  {who:'reina',title:'現場対応',text:'「状況が分からないからこそ、準備して進みます。住民の安全は朱音さんにお願いします。」'}]},
 q6:{title:'宵の星灯台・決着',place:'宵星港・旧灯台',requires:['q6'],lines:[
  {who:'narrator',title:'消えた巨大擬似体',text:'星灯の光が収まると、灯台を覆っていた残響も薄れていった。しかし、増幅の痕跡は消えていない。'},
  {who:'nagi',title:'追う者',text:'「……増幅させている者は別にいる。私は、それを追っている。」'},
  {who:'you',title:'答えの先へ',text:'「待ってくれ、凪。君は何を追ってるんだ？」'},
  {who:'reina',title:'残る疑問',text:'「あの言い方……凪さんは、別の誰かを追っているのでしょうか。」'},
  {who:'narrator',title:'名のない黒幕',text:'問いに答えることなく、凪は港の暗がりに消えた。黒幕の名前も姿も、まだ分からない。'},
  {who:'aoi',title:'落とし物',text:'「{name}さん、灯室の床に……これが。」',cue:{target:'aoi',face:'normal'}},
  {who:'narrator',title:'星形の髪留め',text:'葵の手のひらには、子ども用の小さな星形の髪留めがのっていた。古いもののはずなのに、錆ひとつない。'},
  {who:'aoi',title:'預かりもの',text:'「……解析に回します。今は、私が預かっておきますね。」'}]},
 chapter1_end:{title:'第1章 終幕　帰る場所',place:'宵星相談室・夜',requires:['q6'],lines:[
  {who:'narrator',title:'帰還',text:'夜の相談室。報告を終えたメンバーの前に、温かな飲み物が並んだ。'},
  {who:'momoka',title:'おつかれさま！',text:'「みんな、おかえり！ 大変だったよね。今日はゆっくり休もう！」'},
  {who:'milku',title:'温かな一杯',text:'「お疲れさまです。温かい飲み物をどうぞ。少しだけ、ひと息つきませんか？」'},
  {who:'akane',title:'守れた日常',text:'「街のみんなも無事だったよ！ 相談室のみんなと一緒に動けてよかった！」'},
  {who:'aoi',title:'次の手がかり',text:'「波形はまだ保管してあります。無理せず、次に備えましょう。」'},
  {who:'narrator',title:'閉じたノート',ch1EndHook:true,text:'葵だけは、少し離れた席でノートに何かを書き込んでいた。目が合うと、葵は静かにノートを閉じた。'},
  {who:'momoka',title:'おやすみ',text:'「じゃあ、今日はおつかれさま！ また明日ね、えっと……」',cue:{target:'momoka',face:'smile'}},
  {who:'momoka',title:'一瞬の空白',text:'「……{name}さん、だよね？ あはは、ごめん。なんか、ど忘れしちゃった。疲れてるのかな。」',cue:{target:'momoka',face:'sad'}},
  {who:'narrator',title:'葵の視線',text:'ももかは笑ってごまかした。葵はペンを止めたまま、ももかとあなたを、黙って見つめていた。',cue:{target:'aoi',face:'sad'}},
  {who:'narrator',title:'第一章・完',text:'街の灯りはいつも通りだった。その裏で何者かが残響を増幅させている。そして、灯した想いの奥でも、何かが少しずつ欠け始めていた――。'}]}
});
const CHAPTER_CLEAR_GEMS=1000;
const CHAPTER_SCENE_TIMES=Object.freeze({chapter4_open:'午前',chapter4_end:'夜',q19_intro:'昼',q19_pre:'夕方',q19:'夕方',q20_intro:'昼',q20_pre:'夕方',q20:'夕方',q21_intro:'昼',q21_pre:'夕方',q21:'夕方',q22_intro:'昼',q22_pre:'夕方',q22:'夕方',q23_intro:'昼',q23_pre:'夕方',q23:'夕方',q24_intro:'昼',q24_pre:'夕方',q24:'夕方',chapter2_open:'朝',q7:'夜',q8:'深夜',q9:'夜明け',q10:'午後',q11:'深夜',q12:'夜明け',kaname_meet:'朝',kaede_meet:'午後',chapter2_end:'夜',chapter3_open:'夜',q16_intro:'昼',q16:'夕方',nazuna_meet:'午後',q17_intro:'夜',q17:'深夜',q18_intro:'夜',q18:'夜明け',chapter3_end:'午後',q13:'夕暮れ',q14:'夜',q15:'翌日',saki_yuzu_meet:'夜',chiyo_meet:'夕方',reiko_meet:'午後',anzu_meet:'午後',chapter1_open:'夕方',q1_lead:'夕暮れ',q2_lead:'夕暮れ',q3_lead:'夕方',q4_lead:'夜',q5_lead:'夜',q6_ready:'夜',q7_lead:'夕方',q8_lead:'夜',q9_lead:'夜',q10_lead:'昼',q11_lead:'夜',q12_lead:'夜',q3:'夕暮れ',q4:'夜',q5:'夜',q6:'深夜',chapter1_end:'夜'});
const CHAPTER_CHOICE_REPLIES=Object.freeze({
 field:'「現場を優先しましょう。朱音さんと避難誘導の段取りを合わせます。」',
 record:'「まず波形の記録を照合します。増幅が始まった時刻を絞り込めるはずです。」'
});
// Option-specific closing line; both routes converge at Akane's next report.
const CHAPTER_CHOICE_FOLLOWUPS=Object.freeze({
 field:'「まだ仮説です。先に現場の安全を確認して、手がかりを積み重ねましょう。」',
 record:'「照合が済んだら、すぐ現場へ向かいましょう。手がかりは、きっと両方にあります。」'
});
const BOND_STORIES=Object.freeze({"bond_momoka_0":{"title":"ももか・第1話「寄り道の約束」","place":"東雲商店街・午後","person":"momoka","threshold":20,"lines":[{"who":"narrator","text":"商店街の角で、ももかがたい焼きの紙袋を掲げて待っていた。"},{"who":"momoka","text":"「責任者さん！　ちょうどいいところに！　今から重大な裁判を始めます！」"},{"who":"you","text":"「俺が裁判官か。被告は？」"},{"who":"momoka","text":"「たい焼きを頭から食べる人！　しっぽからが正義だもん。」"},{"who":"narrator","text":"彼女はしっぽを一口かじり、真剣な顔を作る。頬にはあんこが付いている。"},{"who":"momoka","text":"「ね、責任者さんはどっち派？」","choices":[["a","しっぽ派だ。判決は無罪"],["b","頭派だ。異議あり"]]},{"who":"momoka","text":"branch","choiceReplies":{"a":"「えへへ、分かってるね！　じゃあ半分こで和解しよ！」","b":"「えっ、敵だったの!?　じゃあ食べ比べ勝負だね！」"}},{"who":"narrator","text":"勝敗を決めるはずが、結局二人とも笑って食べ終えた。"},{"who":"momoka","text":"「本当はね、今日は責任者さんを誘いたかったの。……裁判は口実！」"},{"who":"you","text":"「それなら、次も堂々と誘ってくれ。」"},{"who":"momoka","text":"「うっ、そういう返しは反則！　……また寄り道しよ！」"}]},"bond_momoka_1":{"title":"ももか・第2話「時計店の窓」","place":"東雲商店街・夕方","person":"momoka","threshold":40,"lines":[{"who":"narrator","text":"閉まった時計店の前で、ももかが「通行禁止」と書いた手製の札を掲げる。"},{"who":"momoka","text":"「ここは怖い話禁止区域です！　入ったらたい焼き一匹の罰金！」"},{"who":"you","text":"「怖い話は苦手なのか。」"},{"who":"momoka","text":"「べ、別に？　暗い時計店が勝手に鳴るとか、ぜんぜん……！」"},{"who":"narrator","text":"店の奥でカタン、と音がした。彼女は勢いよくこちらの袖をつかむ。"},{"who":"momoka","text":"「……今のは風！　風ってことにしよ！」"},{"who":"narrator","text":"それでも、ももかの目はガラス越しの古い振り子を追っている。"},{"who":"momoka","text":"「この音……もう一度、ちゃんと聞きたいと思うのは変かな？」","choices":[["a","変じゃない。隣で聞こう"],["b","まず怖がり選手権を終わらせよう"]]},{"who":"momoka","text":"branch","choiceReplies":{"a":"「えへへ。祖父が巻いてくれた、あの音が好きだったんだ。」","b":"「もーっ！　優勝は責任者さんの意地悪！　……でも少し楽になった。」"}},{"who":"narrator","text":"窓の端には、かつて祖父が付けた小さな傷が残っている。"},{"who":"momoka","text":"「ここね、昔はおじいちゃんのお店だったんだ。まだ、誰にも話してなかった。」"},{"who":"narrator","text":"店の前に並ぶ二つの影が、夕暮れに長く伸びた。"}]},"bond_momoka_2":{"title":"ももか・第3話「笑顔の裏側」","place":"商店街のアーケード・雨上がり","person":"momoka","threshold":60,"lines":[{"who":"narrator","text":"雨上がりのアーケード。ももかは笑顔の形に曲がった飴を見せた。"},{"who":"momoka","text":"「見て！　笑顔味の飴！　……って、私、何やってるんだろ。」"},{"who":"narrator","text":"冗談の途中で声が止まる。靴先が水たまりをつついた。"},{"who":"momoka","text":"「ねえ。私が元気じゃなかったら、がっかりする？」","choices":[["a","がっかりしない。今日はそのままでいい"],["b","むしろ飴の笑顔が頑張りすぎだ"]]},{"who":"momoka","text":"branch","choiceReplies":{"a":"「……そっか。じゃあ、今日は少し甘えてもいい？」","b":"「あはっ、ひどい！　……でも、ちゃんと笑えた。ありがと。」"}},{"who":"you","text":"「俺は、ももかが無理をしないほうがいいと思う。」"},{"who":"momoka","text":"「みんなの前だと、笑わなきゃって思っちゃうんだ。」"},{"who":"momoka","text":"「でも、責任者さんの前なら……黙ってても、いいんだね。」"},{"who":"narrator","text":"雨粒の落ちる音の中、ももかは少しだけ肩の力を抜いた。"}]},"bond_momoka_3":{"title":"ももか・第4話「止まった時の続き」","place":"旧時計店・夜","person":"momoka","threshold":80,"lines":[{"who":"narrator","text":"ももかは祖父の店の鍵を見つめていた。最初の依頼で記録した不思議な時計音が頭をよぎる。"},{"who":"momoka","text":"「怖い話は嫌いなのに、自分から夜の時計店に来ちゃった。えへへ、矛盾してるね。」"},{"who":"you","text":"「俺もいる。無理はするな。」"},{"who":"narrator","text":"鍵が鍵穴に触れる。しかし彼女はそこで手を止めた。"},{"who":"momoka","text":"「おじいちゃんがいなくなってから、私、ここを開けられなくて。」"},{"who":"momoka","text":"「時計が鳴ったの、私の気持ちのせいだったのかな。」"},{"who":"narrator","text":"残響の原因はまだ分からない。それでも、言葉にしただけで胸が震える。"},{"who":"momoka","text":"「私、ここに戻ってきてもいいと思う？」","choices":[["a","戻っていい。ゆっくりでいいから"],["b","入る前に、たい焼きで景気づけしよう"]]},{"who":"momoka","text":"branch","choiceReplies":{"a":"「……うん。怖いけど、今日は扉に触れられた。」","b":"「こんな夜に!?　……ふふ。おじいちゃんも笑いそう。」"}},{"who":"narrator","text":"風が吹き、看板が小さく鳴った。ももかが跳ね上がる。"},{"who":"momoka","text":"「い、今のは看板！　絶対看板だから！」"},{"who":"you","text":"「分かってる。帰りは明るい道を通ろう。」"},{"who":"momoka","text":"「……ありがと。今日、ひとりじゃなくてよかった。」"}]},"bond_momoka_4":{"title":"ももか・第5話「明日の音」","place":"東雲商店街・朝","person":"momoka","threshold":100,"lines":[{"who":"narrator","text":"朝の商店街。ももかは祖父の店の窓を拭いていた。"},{"who":"momoka","text":"「しっぽ派の店主、開店準備中でーす！　……なんちゃって。」"},{"who":"narrator","text":"古い時計はまだ動かない。窓辺には新しい小さな花が飾られている。"},{"who":"you","text":"「明るくなったな、この店。」"},{"who":"momoka","text":"「えへへ。でも、私、毎日明るくしなくてもいいって分かったよ。」"},{"who":"momoka","text":"「キミが来ると、笑いたいときに笑えるんだ。……あ、今の内緒！」"},{"who":"narrator","text":"通りのたい焼き屋から、焼き上がりを知らせる声が響く。"},{"who":"momoka","text":"「今日も勝負！　今度は目をつぶってしっぽか頭か当ててみて！」"},{"who":"narrator","text":"ももかは紙袋を隠す。先ほどより、ずっと自然な笑顔だった。"},{"who":"momoka","text":"「ねえ、これからも一緒に、ここへ来てくれる？」","choices":[["a","ああ。次は窓の内側も見たい"],["b","たい焼き審判なら、何度でも引き受ける"]]},{"who":"momoka","text":"branch","choiceReplies":{"a":"「……うん。そこはまだ、キミにしか見せたくないかも。」","b":"「もー！　真面目な話なのに！　……でも、うれしい。」"}},{"who":"narrator","text":"彼女は一瞬だけ視線をそらして、こちらの袖をつまんだ。"},{"who":"momoka","text":"「次の寄り道も、私から誘っていい？　……約束だからね。」"},{"who":"narrator","text":"店の奥から朝風が吹き抜けた。ふたりは、まだ名前のない約束を交わす。"}]},"bond_milku_0":{"title":"みるく・第1話「閉店後の一杯」","place":"西通りの喫茶街・夕方","person":"milku","threshold":20,"lines":[{"who":"narrator","text":"夕方の喫茶街。みるくは小さな試食皿を二つ差し出した。"},{"who":"milku","text":"「責任者さん、試作のタルトです。よろしければ、率直なご感想を。」"},{"who":"narrator","text":"彼女の口元に、粉砂糖が付いている。皿のタルトは一切れだけ少ない。"},{"who":"you","text":"「俺の分はあるのか。」"},{"who":"milku","text":"「も、もちろんです！　これは……その、品質確認で一切れ……。」"},{"who":"milku","text":"「甘さは、これくらいで大丈夫でしょうか？」","choices":[["a","おいしい。味見担当も満足そうだな"],["b","半分こしよう。みるくも座ってくれ"]]},{"who":"milku","text":"branch","choiceReplies":{"a":"「ふふっ、見抜かれていましたか。……内緒にしてくださいね。」","b":"「……私の分まで？　では、お言葉に甘えて。少し緊張します。」"}},{"who":"milku","text":"「次はちゃんと二人分、焼いてきますね。……たぶん。」"},{"who":"narrator","text":"照れ隠しにカップを持ち上げた彼女は、こちらを見て小さく笑った。"},{"who":"narrator","text":"口元の粉砂糖を指摘するか迷ううち、夕日がカップを金色に染めた。"}]},"bond_milku_1":{"title":"みるく・第2話「消えた看板」","place":"西通り・旧喫茶街","person":"milku","threshold":40,"lines":[{"who":"narrator","text":"前に調べた閉店カフェ。みるくは店の消えた看板の跡を指でなぞった。"},{"who":"milku","text":"「ここで働いていたんです。初めてコーヒーを運んだ日、緊張で手が震えて。」"},{"who":"you","text":"「俺には、落ち着いて見えるけどな。」"},{"who":"milku","text":"「その日は、お客様の前で「ご注文の時計です」と言ってしまって。」"},{"who":"narrator","text":"二人の間に短い沈黙が落ちる。彼女は耳まで赤くなった。"},{"who":"milku","text":"「……笑っても、いいですよ。店長さんも笑って許してくれましたから。」"},{"who":"narrator","text":"店の記録にあった残響と、彼女の記憶が静かに重なる。"},{"who":"milku","text":"「私がもう一度ここに来たかったの、少し変でしょうか。」","choices":[["a","変じゃない。店長さんの話を聞かせてくれ"],["b","今度は時計を注文しないようにしよう"]]},{"who":"milku","text":"branch","choiceReplies":{"a":"「……はい。あの方のようなお店を、いつか私も持てたら。」","b":"「もうっ、忘れてください！　……でも、こうして笑えるんですね。」"}},{"who":"milku","text":"「あの灯りを、もう一度見たいんです。誰かを迎えるための灯りを。」"},{"who":"narrator","text":"彼女は扉から手を離す。今日は、閉まった店を少しだけ好きになれた。"},{"who":"narrator","text":"帰り道、みるくは「時計をご注文？」と小さく自分で言って笑った。"}]},"bond_milku_2":{"title":"みるく・第3話「上手な断り方」","place":"宵星相談室・夜","person":"milku","threshold":60,"lines":[{"who":"narrator","text":"相談室に二人だけが残った夜。みるくは何度も止まる端末と格闘していた。"},{"who":"milku","text":"「おかしいですね。さっきまで動いていたのに……あ、また固まりました。」"},{"who":"you","text":"「俺が見る。みるくは少し休んでくれ。」"},{"who":"milku","text":"「でも、まだお片付けも……。」"},{"who":"narrator","text":"画面が消え、代わりに彼女のお腹が小さく鳴った。"},{"who":"milku","text":"「……今の音は、機械の警告です。きっと。」"},{"who":"milku","text":"「私、今日は人に頼ってもいいのでしょうか？」","choices":[["a","もちろんだ。俺に任せてくれ"],["b","まずはお腹の警告を解除しよう"]]},{"who":"milku","text":"branch","choiceReplies":{"a":"「……はい。頼るのは、まだ少し怖いですけど。」","b":"「ふふっ。……そこは聞かなかったことにしてください。」"}},{"who":"narrator","text":"みるくはエプロンを外し、椅子を引いた。"},{"who":"milku","text":"「仕事をしないで座るなんて、何だか落ち着かないですね。」"},{"who":"milku","text":"「でも……ここでなら、頑張らない私でもいられそう。」"}]},"bond_milku_3":{"title":"みるく・第4話「まだ描けない店」","place":"宵星臨海公園・夕暮れ","person":"milku","threshold":80,"lines":[{"who":"narrator","text":"臨海公園のベンチ。みるくのノートから、小さな店の間取り図が落ちた。"},{"who":"milku","text":"「あ、それは……いつか自分のカフェを開くなら、という図です。」"},{"who":"narrator","text":"窓際に大きな二人席。隅には「試食席」と小さく書いてある。"},{"who":"you","text":"「ここは、みるく専用の席か。」"},{"who":"milku","text":"「ち、違います！　……半分くらいは、そうかもしれません。」"},{"who":"milku","text":"「機械も苦手で、開店の計算だって自信がなくて。私には無理だと思っていました。」"},{"who":"narrator","text":"夕暮れの海を前に、彼女はノートの端をぎゅっとつかむ。"},{"who":"milku","text":"「こんな夢を話して、笑いませんか？」","choices":[["a","笑わない。俺も最初のお客になりたい"],["b","まずはメニューの味見会から始めよう"]]},{"who":"milku","text":"branch","choiceReplies":{"a":"「……それなら、特等席を考えないといけませんね。」","b":"「ふふ。試食だけで全部なくならないように、私も頑張ります。」"}},{"who":"narrator","text":"彼女は照れくさそうに笑い、それから初めてノートを隠さず広げた。"},{"who":"milku","text":"「大きな夢はまだ怖い。でも、小さな一歩なら踏み出せる気がします。」"},{"who":"you","text":"「一歩目なら、俺も手伝える。」"},{"who":"milku","text":"「……ありがとう。あなたに見せて、よかった。」"}]},"bond_milku_4":{"title":"みるく・第5話「名前のない予約席」","place":"西通り・朝","person":"milku","threshold":100,"lines":[{"who":"narrator","text":"西通りの朝。みるくは新しいノートと、小さな焼き菓子の箱を抱えて待っていた。"},{"who":"milku","text":"「今日は試作品を持ってきました。……今回は味見で減らしていませんよ。」"},{"who":"you","text":"「俺が疑っているように見えたか。」"},{"who":"milku","text":"「ふふ。少しだけ。……いえ、嘘です。」"},{"who":"narrator","text":"箱の底には、手書きの「将来のお店・第一回試作」と書かれた札がある。"},{"who":"milku","text":"「夢を、書くだけで終わりにしたくなくて。お菓子の勉強を始めました。」"},{"who":"narrator","text":"彼女がノートを開く。窓辺に描かれた二人席は、前より少し大きくなっていた。"},{"who":"milku","text":"「ここ、まだお店の名前がないんです。だから……予約の名前も、まだ空欄で。」"},{"who":"narrator","text":"冷たい風にノートがめくれ、彼女の手がこちらの手に触れた。"},{"who":"milku","text":"「その席、あなたのために空けておいてもいいですか？」","choices":[["a","うれしい。俺の最初の予約だな"],["b","俺が先に来たら、試食係にしてくれ"]]},{"who":"milku","text":"branch","choiceReplies":{"a":"「……はい。きっと、あなたには一番おいしい一杯を。」","b":"「ふふっ。特別な味見係ですね。……食べすぎはだめですよ。」"}},{"who":"narrator","text":"みるくは慌てて顔を伏せ、すぐに小さく微笑んだ。"},{"who":"milku","text":"「あなたの席は、最初から空けておきますね。」"},{"who":"you","text":"「その日を楽しみにしている。」"},{"who":"narrator","text":"まだ店の名前も、ふたりの関係の名前もない。それでも約束は確かに残った。"}]}});
const HERO_TOPICS=Object.freeze({"momoka":[{"question":"たい焼きのしっぽ派、今日は勝つ気満々だよ！　責任者さんは？","choices":["しっぽ派で共闘しよう","頭派で勝負だ","真ん中から食べる新派閥だ"],"minAff":0,"replies":["「えへへ、最強のしっぽ同盟だね！」","「むむっ、宿敵発見！　次は目隠しで勝負だもん！」","「真ん中!?　そんな食べ方あるの!?　……ちょっと試したい！」"]},{"question":"さっき「真面目な顔選手権」に優勝してたよ！","choices":["じゃあ笑顔部門はももかに任せる","そんなに真面目に見えたか","審査員は何人いたんだ"],"minAff":0,"replies":["「えっ、そんなの褒められたら照れるよ！」","「うん。私がからかっても動じないんだもん。」","「……私ひとり！　えへへ、審査は厳正です！」"]},{"question":"傘、一本しかないときってどうする？","choices":["一緒に入って帰ろう","店で雨宿りしよう","走って帰る"],"minAff":0,"replies":["「えへへ、じゃあ肩が濡れないように寄っていい？」","「それも楽しそう。雨が止むまでお話ししよ。」","「待って、滑るから手を貸して！」"]},{"question":"お祭りの屋台、たい焼きと輪投げ、どっちから？","choices":["輪投げで勝ったらたい焼きだ","まず好きなたい焼きから行こう","輪投げの景品がたい焼きだったら？"],"minAff":0,"replies":["「望むところだもん！　負けたら泣かないでね！」","「えへへ！　責任者さん、話が分かる！」","「えっ、優勝じゃん！　絶対に取らなきゃ！」"]},{"question":"笑顔の練習って、必要かな？","choices":["今の笑顔が好きだ","無理しなくていい","よく分からない"],"minAff":0,"replies":["「……今のままでいいんだ。なんだか安心した。」","「そうだね。頑張りすぎない日もつくろう。」","「ごめん、急に変なこと聞いちゃった。」"]},{"question":"祖父の昔の写真が出てきたの。私、変な顔してるんだ。","choices":["見せてくれ。笑わない","大事な宝物だな","俺の変な顔と交換しよう"],"minAff":0,"replies":["「……笑わないって言ったね？　約束だよ！」","「うん、これだけは捨てられないんだ。」","「えっ、責任者さんにも変顔あるの!?　見たい！」"]},{"question":"一日の終わりに、何を食べたい？","choices":["ももかと半分こできるもの","甘いものかな","何でもいい"],"minAff":0,"replies":["「半分こ！　それ、すごくいいと思う！」","「私はクリームのついたやつがいいな。」","「じゃあ私が決めちゃっていい？」"]},{"question":"道に迷っちゃった。……えへへ、案内役の私が！","choices":["俺が地図を持とう","寄り道も悪くない","道に聞いてみるか"],"minAff":0,"replies":["「負けた！　今日は案内される側になっちゃう。」","「うん。迷子でも、二人だと楽しいね。」","「道さん、駅はどちらですかー！　……返事ないね！」"]},{"question":"あの時計店、覚えてる？","choices":["うん。大事な場所なんだろう","時計を直そう","もう忘れよう"],"minAff":40,"replies":["「覚えててくれたんだ……うれしい。」","「直す前に、ちょっとだけ話したいことがあるの。」","「……うん。でも、私には忘れられないんだ。」"]},{"question":"今日は少し、元気が出なくてさ。","choices":["話さなくても隣にいる","ゆっくり休もう","元気を出せよ"],"minAff":40,"replies":["「ありがと。今日は何も言わずに歩こうかな。」","「うん、休むのも大事だよね。」","「そう言われると、笑わなきゃって思っちゃう。」"]},{"question":"キミの前でだけ、静かにしててもいい？","choices":["ああ。俺もこの時間が好きだ","たい焼きの音だけ聞いていよう","静かなももかはレアだな"],"minAff":60,"replies":["「……ふふ。同じ気持ちなら安心する。」","「それ、落ち着くのかな？　……でも好き。」","「むっ、レア扱い!?　……限定だから、大事にしてよね。」"]},{"question":"今度、祖父の店の窓を開けてみたいの。","choices":["俺も一緒に行こう","晴れた日がいいな","一人でも大丈夫だろう"],"minAff":60,"replies":["「うん。鍵を開ける勇気が出そう。」","「日差しの入る午前がいいな。」","「一人でできるかも。でも、隣にいてほしい。」"]}],"milku":[{"question":"試作のプリンが一つ少ないんです。……心当たり、ありますか？","choices":["味見係の仕事ぶりは見ていた","おいしかったなら成功だな","プリンに足が生えたのかもな"],"minAff":0,"replies":["「ふふ……見つかってしまいましたね。次はあなたの分も。」","「……はい。つい、もう一口だけって。」","「えっ、足ですか!?　……ふふ、責任者さんも意地悪です。」"]},{"question":"機材の画面が固まりました……私が触ったせいでしょうか。","choices":["大丈夫。俺が見てみる","まず深呼吸しよう","端末もお茶休憩中かな"],"minAff":0,"replies":["「……助かります。何でも任せきりにはしたくないのに。」","「すう……はあ。ふふ、少し落ち着きました。」","「お茶なら私が淹れますけど……端末用はありませんよ？」"]},{"question":"雨の日はどんな席が落ち着きますか？","choices":["みるくが落ち着ける席","窓際かな","どこでもいい"],"minAff":0,"replies":["「……私の席まで。ありがとうございます。」","「窓に当たる雨を見るの、私も好きです。」","「それも正解かもしれません。どこでも落ち着けるように。」"]},{"question":"休憩用のケーキを切るとき、つい一切れ大きくしてしまって。","choices":["みるくの分だ。堂々と食べよう","みんなで分けよう","定規で切り分けるか"],"minAff":0,"replies":["「私の分……!?　あ、ありがとうございます。……ふふ。」","「はい。でも少しだけ大きいのは、あなたに。」","「定規!?　ふふ、精密なケーキですね。」"]},{"question":"お休みの日は何をされていますか？","choices":["みるくの話も聞きたい","散歩してるよ","寝てるだけだ"],"minAff":0,"replies":["「……私の話ですか？　それなら、古い喫茶店を見に。」","「散歩、すてきですね。今度おすすめを教えてください。」","「睡眠も大事ですから。お疲れなんですね。」"]},{"question":"昔のお店のメニューを覚えてるんです。","choices":["聞かせてほしい","懐かしいな","もう閉店しただろ"],"minAff":0,"replies":["「喜んで。店長さんの焼くトーストが、好きでした。」","「はい。今でもその香りを思い出すんです。」","「……そうですね。でも私には、大切な記憶です。」"]},{"question":"新しいカップ、試作の甘い飲み物に合う色が分からなくて。","choices":["みるくの好きな色がいい","淡い青はどうだ","カップに味見済みって書くか"],"minAff":0,"replies":["「……私の色、でいいんですか？　少しうれしいです。」","「ふふ、ちょうど私も考えていました。」","「やめてくださいっ、見抜かれているみたいです！」"]},{"question":"忙しくて自分のお茶を淹れ忘れてしまいました。","choices":["俺が淹れよう。座っていてくれ","一緒に五分休もう","カップだけ置いて呪文を唱えるか"],"minAff":0,"replies":["「……私のために？　あ、どうしよう。うれしいです。」","「ふふっ、それなら安心して休めます。」","「出てきませんよ、お茶は……ふふ、ちょっと笑っちゃった。」"]},{"question":"昔の店長さん、すごく優しかったんです。","choices":["その優しさを覚えてるんだな","会えたらいいな","過去の話だろ"],"minAff":40,"replies":["「……はい。あの優しさが、今の私の原点なんです。」","「いつか、お礼を伝えられたらいいですね。」","「過去ですけど、忘れたくない思い出なんです。」"]},{"question":"私の夢、まだ笑わずに聞いてくれますか？","choices":["最後まで聞くよ","もちろんだ","夢は難しいものだ"],"minAff":40,"replies":["「ええ。あなたにだけは、最後まで聞いてほしいんです。」","「ありがとうございます。少し勇気が出ました。」","「……難しいからこそ、話すのが怖かったんです。」"]},{"question":"一緒にいると、時々きちんとした敬語が出てこなくて。","choices":["気にしない。そっちも好きだ","自然でいいと思う","敬語検定を始めるか"],"minAff":60,"replies":["「……も、もう。そんなふうに言われたら、余計に困る。」","「……うん。じゃあ、少しだけ楽にするね。」","「では問題です。ふふ、あなたのせいで調子が狂います。」"]},{"question":"いつかのカフェ、一席だけ予約してもいいですか？","choices":["その席を楽しみにしてる","開店が楽しみだ","まだ早くないか"],"minAff":60,"replies":["「……はい。きっと、とびきりの一杯をご用意します。」","「楽しみにしてもらえるなら、頑張れます。」","「そうですよね。……でも、少し夢を見たくて。」"]}]});
const HERO_HOME=Object.freeze({"momoka":[["責任者さん、たい焼き裁判しよ！　私は絶対しっぽ派だもん！","えへへ、さっき寄り道してたの、見えてた？","怖い話？　へ、平気だよ！　……明るいところなら。","責任者さんが真面目な顔してると、からかいたくなるんだよね！"],["責任者さん、またおじいちゃんの時計店の前を通ったんだ。","へへ、褒められると私のほうが先に照れちゃう。","今日も怖い話はお断り！　……手、貸してくれたら聞くけど。","今日は元気じゃないかも。でも、隣にいていい？"],["キミと食べるたい焼き、しっぽの最後までおいしいね。","えへへ、時計店の窓、また一緒に拭いてくれる？","キミの前では、元気じゃない日もそのままでいられる。","今日こそキミを照れさせる！　……先に笑ったら負けだよ！"]],"milku":[["責任者さん、お茶はいかがですか？　……あ、甘いものもあります。","ふふ。試作の味見で数が減っていても、どうか秘密に。","端末がまた止まって……私、画面に嫌われているんでしょうか。","皆さんの分を用意しました。責任者さんも、無理せずに。"],["責任者さん、今日こそ自分の休憩も忘れないようにします。","ふふ。試食のつもりが、一切れ多く食べてしまいました。","昔のカフェの話を、もう少し聞いてくださいますか。","機械の修理は頼れなくても、味の相談なら私に任せてください。"],["あなたのために、甘さを少しだけ変えてみました。……内緒です。","ふふ。新しいお店のノート、一番に見せたいんです。","端末より、あなたの表情を読むほうが簡単……あっ、今のは忘れて！","今日は私が休ませてもらっても、いい？　……隣にいてくれるなら。"]]});
const HEROINE_PROFILES=Object.freeze({...Object.fromEntries(NEW_HERO_IDS.map(id=>[id,{...extraHero(id).profile,...((TOMOSHIBI_V027[id]||TOMOSHIBI_V028[id]||TOMOSHIBI_V0420[id]||TOMOSHIBI_V0500[id]||TOMOSHIBI_V0690[id]||TOMOSHIBI_V0692[id]||TOMOSHIBI_V0750[id]||TOMOSHIBI_V0760[id])?{tomoshibi:TOMOSHIBI_V027[id]||TOMOSHIBI_V028[id]||TOMOSHIBI_V0420[id]||TOMOSHIBI_V0500[id]||TOMOSHIBI_V0690[id]||TOMOSHIBI_V0692[id]||TOMOSHIBI_V0750[id]||TOMOSHIBI_V0760[id]}:{})}])), "momoka":{"name":"桜井 ももか","age":22,"occupation":"東雲商店街の店で働く社会人","catchphrases":["えへへ","〜しよ！","〜だもん"],"favorite":"商店街のたい焼き・しっぽから食べる派","weakness":"怖い話（平気なふりをする）","dynamic":"主人公をからかうが、自分が褒められると弱い","status":"人物背景・小物は仮設定"},"milku":{"name":"白石 みるく","age":24,"occupation":"カフェで働く社会人","catchphrases":["ふふ","〜ですね","焦ると敬語が崩れる"],"favorite":"甘いもの・試作スイーツの味見","weakness":"機械操作（相談室の端末を止めがち）","dynamic":"世話好きだが世話を焼かれると戸惑う","status":"人物背景・小物は仮設定"}});
// Topic expressions are stored separately in EXPRESSION_CUES.conversation; authored topic text is not mutated.
function topicCue(hero,topicIndex,replyIndex=-1){return EXPRESSION_CUES.conversation[hero]?.[topicIndex]?.[replyIndex+1]||'normal'}
// Manual cues live in EXPRESSION_CUES. Existing authored story objects are not mutated.
// Display-only metadata. Contract holders do not have a tomoshibi, and Nagi's remains concealed.
function tomoshibiLine(id){
 if(id==='kaname'||id==='erika')return '星灯の契約者';
 if(id==='nagi')return '灯火:???';
 const flame=PEOPLE[id]?.tomoshibi;
 return flame?`灯火:${flame.color} ― ${flame.thought}`:'';
}
function tomoshibiMarkup(id){const line=tomoshibiLine(id);return line?`<p class="v027-tomoshibi" aria-label="灯火">${esc(line)}</p>`:'';}
const HEROINE_PROFILES_ALL=Object.freeze(Object.fromEntries(Object.entries(HEROINE_PROFILES).map(([id,profile])=>[id,Object.freeze({...profile,...((TOMOSHIBI_V027[id]||TOMOSHIBI_V028[id]||TOMOSHIBI_V0420[id]||TOMOSHIBI_V0500[id]||TOMOSHIBI_V0690[id]||TOMOSHIBI_V0692[id]||TOMOSHIBI_V0750[id]||TOMOSHIBI_V0760[id])?{tomoshibi:TOMOSHIBI_V027[id]||TOMOSHIBI_V028[id]||TOMOSHIBI_V0420[id]||TOMOSHIBI_V0500[id]||TOMOSHIBI_V0690[id]||TOMOSHIBI_V0692[id]||TOMOSHIBI_V0750[id]||TOMOSHIBI_V0760[id]}:{})})])));
const BOND_STORY_CATALOG=Object.freeze({...BOND_STORIES,...Object.fromEntries(NEW_HERO_IDS.flatMap(id=>Object.entries(extraHero(id).stories)))});

// The name reveal is unlocked by actually reading Shino's second bond story.
function heroineDisplayName(id,save=S){return id==='shino'&&save.bondRead?.shino?.[1]?'シノ(灯)':PEOPLE[id]?.name||id}
function isHero(id){return HERO_IDS.includes(id)&&heroV0690Visible(id,S)}
function heroAff(id){return Math.max(loveState()?.affection?.[id]||0,...UNITS.filter(u=>u.person===id&&data(u.id)&&(!CHAPTER2_LATE_HERO_IDS.includes(id)||!isChapter2ReservedTrial(u))).map(u=>data(u.id).aff))}
function setHeroAff(id,value){const n=Math.max(0,Math.min(100,value));if(extraHero(id))loveState().affection[id]=n;for(const u of UNITS.filter(u=>u.person===id&&data(u.id)&&(!CHAPTER2_LATE_HERO_IDS.includes(id)||!isChapter2ReservedTrial(u))))data(u.id).aff=n}
function bondSeen(id,i){return !!S.bondRead?.[id]?.[i]}
function bondAvailable(id,i){return isHero(id)&&!!BOND_STORY_CATALOG[`bond_${id}_${i}`]&&romanceHeroAvailable(id)&&(bondSeen(id,i)||(heroAff(id)>=(i+1)*20&&memoryUnlocked(id,i)))}
function bondNew(id){return isHero(id)&&[0,1,2,3,4].some(i=>bondAvailable(id,i)&&!bondSeen(id,i))}
function bondAnyNew(){return HERO_IDS.some(bondNew)}
function heroStage(aff){return aff>=80?'特別な人':aff>=40?'気になる人':'知り合い'}
function heroStageNo(aff){return aff>=80?2:aff>=40?1:0}
function heroClose(id){return bondSeen(id,2)}
function homeWords(id){
 if(extraHero(id))return romanceMoodOptions(loveState(),id,'normal');
 const source=HERO_HOME[id]?.[heroStageNo(heroAff(id))]||PEOPLE[id].lines;
 const name=heroCall(id);
 return source.map((s,i)=>{const hint=i===3?(id==='momoka'?'えへへ、商店街でたい焼きを食べると、元気になれるんだ！':'ふふ、レシピ本を眺めていると時間を忘れますね。'):s;return hint.replaceAll('責任者さん',name).replaceAll(id==='momoka'?'キミ':'あなた',name)});
}
function heroCall(id){return heroClose(id)?id==='momoka'?'キミ':'あなた':'責任者さん'}
function romanceScript(id){
 if(id.startsWith('hero74_'))return hero74EncounterScript(id,S);
 if(id==='shinonome_meet')return SHINONOME_MEETING;
 if(id==='oldcafe_meet')return OLDCAFE_MEETING;
 if(id==='station_meet')return STATION_MEETING;
 if(id==='school_meet')return SCHOOL_MEETING;
 if(id==='office_meet')return OFFICE_MEETING;
 if(id==='seaside_meet')return SEASIDE_MEETING;
 if(id==='lighthouse_meet')return LIGHTHOUSE_MEETING;
 if(id==='tsubaki_meet')return CHAPTER2_MEETINGS.tsubaki;
 if(id==='erika_meet')return CHAPTER2_MEETINGS.erika;
 if(id==='kaname_meet')return CHAPTER2_LATE_MEETINGS.kaname;
 if(id==='kaede_meet')return CHAPTER2_LATE_MEETINGS.kaede;
 if(BOND_STORY_CATALOG[id])return BOND_STORY_CATALOG[id];
 const script=CHAPTER_STORIES[id];
 if(['q1_lead','q2_lead','q3_lead','q7_lead','q8_lead','q9_lead','q13_intro','q16_intro','q17_intro'].includes(id)&&script){
  // Old saves do not invent a first-time decision they cannot reconstruct.
  return {...script,lines:script.lines.filter(line=>!line.chapterEcho||!!chapterChoiceEcho(line))};
 }
 if(id!=='chapter1_end'||!script)return script;
 const mom=heroAff('momoka'),mil=heroAff('milku');
 if(!mom&&!mil)return script;
 const who=mom>=mil?'momoka':'milku';
 const text=who==='momoka'
   ?'「ねえ、責任者さん。帰り道、少しだけ二人で歩かない？　……今日のこと、ちゃんと覚えていたいんだ。」'
   :'「責任者さん、今日は少し休んでくださいね。……よかったら、帰り道もご一緒させてください。」';
 const hook=script.lines.findIndex(line=>line.ch1EndHook);
 const at=hook<0?script.lines.length:hook;
 return {...script,lines:[...script.lines.slice(0,at),{who,text,ch1WalkHome:true},...script.lines.slice(at)]};
}
function openBondEpisode(id,i){
 if(!bondAvailable(id,i))return toast('親密度が足りません');
 openStory(`bond_${id}_${i}`);
}
const CHAPTER4_MEET_ORDER=Object.freeze({q19:['sena','towa'],q20:['mizuki','ritsu'],q21:['karen','meru'],q22:['chihiro','sanae'],q23:['kagari','miyabi'],q24:['kurumi','yuriko']});
// v0.34.13.0〜: 第1章の肉付け（初回の調査前に読む導入）
const FLESHOUT_SOLVED_TAILS=Object.freeze({q1:['葵「時計に残された未練は、ほどけました。でも、星灯の反応がまだ消えていません。」','朱音「みんな、下がって！ 何かが出てくる！」','静まった鐘の余韻から、黒い影がゆっくりと形を成した。']});
const FLESHOUT_LEADS=Object.freeze({q1_lead:'q1',q2_lead:'q2',q3_lead:'q3',q4_lead:'q4',q5_lead:'q5',q7_lead:'q7',q8_lead:'q8',q9_lead:'q9',q10_lead:'q10',q11_lead:'q11',q12_lead:'q12'});
const FLESHOUT_PREBATTLE=Object.freeze({q6_ready:'q6'});
function storyAllowed(id){
 if(id==='hero74_backlog')return hero74PendingQuestIds(S).length>0;
 if(id.startsWith('hero74_')){
  const qid=id.slice('hero74_'.length);
  return !!HERO74_ENCOUNTERS[qid]&&!!S.quests?.[qid]?.complete;
 }
 if(FLESHOUT_LEADS[id])return questNarrativeReady(QUEST_BY_ID[FLESHOUT_LEADS[id]]);
 if(FLESHOUT_PREBATTLE[id])return investigationState(FLESHOUT_PREBATTLE[id])?.phase==='ready'||!!S.storyFlags?.[id];
 if(id==='chapter37_open')return !!S.storyFlags?.chapter36_end;
 if(id==='chapter37_end')return !!S.storyFlags?.q222;
 if(typeof CHAPTER37_STORIES!=='undefined'&&CHAPTER37_STORIES[id]){
  const hit=id.match(/^(q217|q218|q219|q220|q221|q222)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q217|q218|q219|q220|q221|q222)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter36_open')return !!S.storyFlags?.chapter35_end;
 if(id==='chapter36_end')return !!S.storyFlags?.q216;
 if(typeof CHAPTER36_STORIES!=='undefined'&&CHAPTER36_STORIES[id]){
  const hit=id.match(/^(q211|q212|q213|q214|q215|q216)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q211|q212|q213|q214|q215|q216)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter35_open')return !!S.storyFlags?.chapter34_end;
 if(id==='chapter35_end')return !!S.storyFlags?.q210;
 if(typeof CHAPTER35_STORIES!=='undefined'&&CHAPTER35_STORIES[id]){
  const hit=id.match(/^(q205|q206|q207|q208|q209|q210)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q205|q206|q207|q208|q209|q210)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter34_open')return !!S.storyFlags?.chapter33_end;
 if(id==='chapter34_end')return !!S.storyFlags?.q204;
 if(typeof CHAPTER34_STORIES!=='undefined'&&CHAPTER34_STORIES[id]){
  const hit=id.match(/^(q199|q200|q201|q202|q203|q204)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q199|q200|q201|q202|q203|q204)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter33_open')return !!S.storyFlags?.chapter32_end;
 if(id==='chapter33_end')return !!S.storyFlags?.q198;
 if(typeof CHAPTER33_STORIES!=='undefined'&&CHAPTER33_STORIES[id]){
  const hit=id.match(/^(q193|q194|q195|q196|q197|q198)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q193|q194|q195|q196|q197|q198)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter32_open')return !!S.storyFlags?.chapter31_end;
 if(id==='chapter32_end')return !!S.storyFlags?.q192;
 if(typeof CHAPTER32_STORIES!=='undefined'&&CHAPTER32_STORIES[id]){
  const hit=id.match(/^(q187|q188|q189|q190|q191|q192)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q187|q188|q189|q190|q191|q192)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter31_open')return !!S.storyFlags?.chapter30_end;
 if(id==='chapter31_end')return !!S.storyFlags?.q186;
 if(typeof CHAPTER31_STORIES!=='undefined'&&CHAPTER31_STORIES[id]){
  const hit=id.match(/^(q181|q182|q183|q184|q185|q186)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q181|q182|q183|q184|q185|q186)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter30_open')return !!S.storyFlags?.chapter29_end;
 if(id==='chapter30_end')return !!S.storyFlags?.q180;
 if(typeof CHAPTER30_STORIES!=='undefined'&&CHAPTER30_STORIES[id]){
  const hit=id.match(/^(q175|q176|q177|q178|q179|q180)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q175|q176|q177|q178|q179|q180)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter29_open')return !!S.storyFlags?.chapter28_end;
 if(id==='chapter29_end')return !!S.storyFlags?.q174;
 if(typeof CHAPTER29_STORIES!=='undefined'&&CHAPTER29_STORIES[id]){
  const hit=id.match(/^(q169|q170|q171|q172|q173|q174)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q169|q170|q171|q172|q173|q174)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter28_open')return !!S.storyFlags?.chapter27_end;
 if(id==='chapter28_end')return !!S.storyFlags?.q168;
 if(typeof CHAPTER28_STORIES!=='undefined'&&CHAPTER28_STORIES[id]){
  const hit=id.match(/^(q163|q164|q165|q166|q167|q168)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q163|q164|q165|q166|q167|q168)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter27_open')return !!S.storyFlags?.chapter26_end;
 if(id==='chapter27_end')return !!S.storyFlags?.q162;
 if(typeof CHAPTER27_STORIES!=='undefined'&&CHAPTER27_STORIES[id]){
  const hit=id.match(/^(q157|q158|q159|q160|q161|q162)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q157|q158|q159|q160|q161|q162)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter26_open')return !!S.storyFlags?.chapter25_end;
 if(id==='chapter26_end')return !!S.storyFlags?.q156;
 if(typeof CHAPTER26_STORIES!=='undefined'&&CHAPTER26_STORIES[id]){
  const hit=id.match(/^(q151|q152|q153|q154|q155|q156)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q151|q152|q153|q154|q155|q156)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter25_open')return !!S.storyFlags?.chapter24_end;
 if(id==='chapter25_end')return !!S.storyFlags?.q150;
 if(typeof CHAPTER25_STORIES!=='undefined'&&CHAPTER25_STORIES[id]){
  const hit=id.match(/^(q145|q146|q147|q148|q149|q150)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q145|q146|q147|q148|q149|q150)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter24_open')return !!S.storyFlags?.chapter23_end;
 if(id==='chapter24_end')return !!S.storyFlags?.q144;
 if(typeof CHAPTER24_STORIES!=='undefined'&&CHAPTER24_STORIES[id]){
  const hit=id.match(/^(q139|q140|q141|q142|q143|q144)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q139|q140|q141|q142|q143|q144)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter23_open')return !!S.storyFlags?.chapter22_end;
 if(id==='chapter23_end')return !!S.storyFlags?.q138;
 if(typeof CHAPTER23_STORIES!=='undefined'&&CHAPTER23_STORIES[id]){
  const hit=id.match(/^(q133|q134|q135|q136|q137|q138)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q133|q134|q135|q136|q137|q138)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter22_open')return !!S.storyFlags?.chapter21_end;
 if(id==='chapter22_end')return !!S.storyFlags?.q132;
 if(typeof CHAPTER22_STORIES!=='undefined'&&CHAPTER22_STORIES[id]){
  const hit=id.match(/^(q127|q128|q129|q130|q131|q132)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q127|q128|q129|q130|q131|q132)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter21_open')return !!S.storyFlags?.chapter20_end;
 if(id==='chapter21_end')return !!S.storyFlags?.q126;
 if(typeof CHAPTER21_STORIES!=='undefined'&&CHAPTER21_STORIES[id]){
  const hit=id.match(/^(q121|q122|q123|q124|q125|q126)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q121|q122|q123|q124|q125|q126)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter20_open')return !!S.storyFlags?.chapter19_end;
 if(id==='chapter20_end')return !!S.storyFlags?.q120;
 if(typeof CHAPTER20_STORIES!=='undefined'&&CHAPTER20_STORIES[id]){
  const hit=id.match(/^(q115|q116|q117|q118|q119|q120)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q115|q116|q117|q118|q119|q120)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter19_open')return !!S.storyFlags?.chapter18_end;
 if(id==='chapter19_end')return !!S.storyFlags?.q114;
 if(typeof CHAPTER19_STORIES!=='undefined'&&CHAPTER19_STORIES[id]){
  const hit=id.match(/^(q109|q110|q111|q112|q113|q114)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q109|q110|q111|q112|q113|q114)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter18_open')return !!S.storyFlags?.chapter17_end;
 if(id==='chapter18_end')return !!S.storyFlags?.q108;
 if(typeof CHAPTER18_STORIES!=='undefined'&&CHAPTER18_STORIES[id]){
  const hit=id.match(/^(q103|q104|q105|q106|q107|q108)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q103|q104|q105|q106|q107|q108)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter17_open')return !!S.storyFlags?.chapter16_end;
 if(id==='chapter17_end')return !!S.storyFlags?.q102;
 if(typeof CHAPTER17_STORIES!=='undefined'&&CHAPTER17_STORIES[id]){
  const hit=id.match(/^(q97|q98|q99|q100|q101|q102)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q97|q98|q99|q100|q101|q102)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter16_open')return !!S.storyFlags?.chapter15_end;
 if(id==='chapter16_end')return !!S.storyFlags?.q96;
 if(typeof CHAPTER16_STORIES!=='undefined'&&CHAPTER16_STORIES[id]){
  const hit=id.match(/^(q91|q92|q93|q94|q95|q96)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q91|q92|q93|q94|q95|q96)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter15_open')return !!S.storyFlags?.chapter14_end;
 if(id==='chapter15_end')return !!S.storyFlags?.q90;
 if(typeof CHAPTER15_STORIES!=='undefined'&&CHAPTER15_STORIES[id]){
  const hit=id.match(/^(q85|q86|q87|q88|q89|q90)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q85|q86|q87|q88|q89|q90)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter14_open')return !!S.storyFlags?.chapter13_end;
 if(id==='chapter14_end')return !!S.storyFlags?.q84;
 if(typeof CHAPTER14_STORIES!=='undefined'&&CHAPTER14_STORIES[id]){
  const hit=id.match(/^(q79|q80|q81|q82|q83|q84)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q79|q80|q81|q82|q83|q84)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter13_open')return !!S.storyFlags?.chapter12_end;
 if(id==='chapter13_end')return !!S.storyFlags?.q78;
 if(typeof CHAPTER13_STORIES!=='undefined'&&CHAPTER13_STORIES[id]){
  const hit=id.match(/^(q73|q74|q75|q76|q77|q78)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q73|q74|q75|q76|q77|q78)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter12_open')return !!S.storyFlags?.chapter11_end;
 if(id==='chapter12_end')return !!S.storyFlags?.q72;
 if(typeof CHAPTER12_STORIES!=='undefined'&&CHAPTER12_STORIES[id]){
  const hit=id.match(/^(q67|q68|q69|q70|q71|q72)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q67|q68|q69|q70|q71|q72)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter11_open')return !!S.storyFlags?.chapter10_end;
 if(id==='chapter11_end')return !!S.storyFlags?.q66;
 if(typeof CHAPTER11_STORIES!=='undefined'&&CHAPTER11_STORIES[id]){
  const hit=id.match(/^(q6[1-6])_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^q6[1-6]$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter10_open')return !!S.storyFlags?.chapter9_end;
 if(id==='chapter10_end')return !!S.storyFlags?.q60;
 if(typeof CHAPTER10_STORIES!=='undefined'&&CHAPTER10_STORIES[id]){
  const hit=id.match(/^(q5[5-9]|q60)_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q5[5-9]|q60)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter9_open')return !!S.storyFlags?.chapter8_end;
 if(id==='chapter9_end')return !!S.storyFlags?.q54;
 if(typeof CHAPTER9_STORIES!=='undefined'&&CHAPTER9_STORIES[id]){
  const hit=id.match(/^(q49|q5[0-4])_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q49|q5[0-4])$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter8_open')return !!S.storyFlags?.chapter7_end;
 if(id==='chapter8_end')return !!S.storyFlags?.q48;
 if(typeof CHAPTER8_STORIES!=='undefined'&&CHAPTER8_STORIES[id]){
  const hit=id.match(/^(q4[3-8])_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^q4[3-8]$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter7_open')return !!S.storyFlags?.chapter6_end;
 if(id==='chapter7_end')return !!S.storyFlags?.q42;
 if(typeof CHAPTER7_STORIES!=='undefined'&&CHAPTER7_STORIES[id]){
  const hit=id.match(/^(q3[7-9]|q4[0-2])_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^(q3[7-9]|q4[0-2])$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter6_open')return !!S.storyFlags?.chapter5_end;
 if(id==='chapter6_end')return !!S.storyFlags?.q36;
 if(typeof CHAPTER6_STORIES!=='undefined'&&CHAPTER6_STORIES[id]){
  const hit=id.match(/^(q3[1-6])_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^q3[1-6]$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter5_open')return !!S.storyFlags?.chapter4_end;
 if(id==='chapter5_end')return !!S.storyFlags?.q30;
 if(CHAPTER5_STORIES[id]){
  const hit=id.match(/^(q(?:2[5-9]|30))_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  if(/^q(?:2[5-9]|30)$/.test(id))return !!S.quests?.[id]?.complete;
 }
 if(id==='chapter4_open')return !!S.storyFlags?.chapter3_end;
 if(id==='chapter4_end')return !!S.storyFlags?.q24&&!!S.chapter4Met?.kurumi&&!!S.chapter4Met?.yuriko;
 if(CHAPTER4_STORIES[id]){
  const hit=id.match(/^(q(?:19|20|21|22|23|24))_(intro|pre)$/);
  if(hit)return hit[2]==='intro'?questNarrativeReady(QUEST_BY_ID[hit[1]]):S.investigations?.[hit[1]]?.phase==='ready'||!!S.storyFlags?.[id];
  const post=id.match(/^q(19|20|21|22|23|24)$/);
  if(post)return !!S.storyFlags?.chapter4_open&&!!S.quests?.[id]?.complete;
  if(id.endsWith('_meet')){const hero=id.slice(0,-5),quest=Object.entries(CHAPTER4_MEET_ORDER).find(([q,pair])=>pair.includes(hero))?.[0];return !!quest&&!!S.storyFlags?.[quest];}
 }
 if(id==='chapter3_open'&&!S.storyFlags?.chapter2_end)return false;
 if(/^q(?:1[3-8])_intro$/.test(id)&&!questNarrativeReady(QUEST_BY_ID[id.slice(0,3)]))return false;
 if(['q13','q14','q15','q16','q17','q18'].includes(id)&&!S.storyFlags?.chapter3_open)return false;
 if(id==='nazuna_meet'&&!S.quests.q16?.complete)return false;
 if(id==='chapter3_end'&&(!S.quests.q18?.complete||!S.storyFlags.q18))return false;
 if(id==='saki_yuzu_meet'&&!S.quests.q14?.complete)return false;
 if(id==='chiyo_meet'&&!S.quests.q14?.complete)return false;
 if(['reiko_meet','anzu_meet'].includes(id)&&!S.quests.q15?.complete)return false;
 if(id==='chapter2_open'&&!S.lighthouseMet)return false;
 if(id==='tsubaki_meet'&&!S.quests.q7?.complete)return false;
 if(id==='erika_meet'&&!S.quests.q8?.complete)return false;
 if(id==='kaname_meet'&&!S.quests.q11?.complete)return false;
 if(id==='kaede_meet'&&!S.quests.q12?.complete)return false;
 if(id==='chapter2_end'&&!S.kaedeMet)return false;
 if(id==='office_meet'&&!S.schoolMet)return false;
 if(id==='lighthouse_meet'&&(!S.quests.q6?.complete||!S.storyFlags.chapter1_end))return false;
 const script=romanceScript(id);
 return !!script&&(BOND_STORY_CATALOG[id]?bondAvailable(script.person,(script.threshold/20)-1):script.requires.every(q=>S.quests[q]?.complete));
}
// v0.34.42.0: 物語を開いた画面を覚えておき、出会いの物語のあとはそこへ戻す（交流へ飛ばさない）
let storyOrigin='city';
function meetReturnView(){return ['records','talk'].includes(storyOrigin)?storyOrigin:'city';}
function openStory(id){
 if(!storyAllowed(id))return toast('前の依頼を完了すると読めます');
 if(view!=='story')storyOrigin=view;
 clearToast();storySession={id,step:id==='oldcafe_meet'&&!S.oldcafeMet?Math.min(S.oldcafeMeetingProgress||0,OLDCAFE_MEETING.lines.length-1):id==='station_meet'&&!S.stationMet?Math.min(S.stationMeetingProgress||0,STATION_MEETING.lines.length-1):id==='school_meet'&&!S.schoolMet?Math.min(S.schoolMeetingProgress||0,SCHOOL_MEETING.lines.length-1):id==='office_meet'&&!S.officeMet?Math.min(S.officeMeetingProgress||0,OFFICE_MEETING.lines.length-1):id==='seaside_meet'&&!S.seasideMet?Math.min(S.seasideMeetingProgress||0,SEASIDE_MEETING.lines.length-1):id==='lighthouse_meet'&&!S.lighthouseMet?Math.min(S.lighthouseMeetingProgress||0,LIGHTHOUSE_MEETING.lines.length-1):id==='tsubaki_meet'&&!S.tsubakiMet?Math.min(S.tsubakiMeetingProgress||0,CHAPTER2_MEETINGS.tsubaki.lines.length-1):id==='erika_meet'&&!S.erikaMet?Math.min(S.erikaMeetingProgress||0,CHAPTER2_MEETINGS.erika.lines.length-1):id==='kaname_meet'&&!S.kanameMet?Math.min(S.kanameMeetingProgress||0,CHAPTER2_LATE_MEETINGS.kaname.lines.length-1):id==='kaede_meet'&&!S.kaedeMet?Math.min(S.kaedeMeetingProgress||0,CHAPTER2_LATE_MEETINGS.kaede.lines.length-1):0,choice:null};preloadStoryBackgrounds(id);view='story';render();window.scrollTo(0,0);
}
// Three small callbacks to existing Chapter-1 choices; no branching quests or spoiler lines.
const CHAPTER_CHOICE_ECHO=Object.freeze({
 prologue_momoka:Object.freeze({episode:'prologue',people:'「責任者さん、最初に商店街のみんなの話を聞こうって言ってくれたよね。……なんだか、うれしかったんだ。」',place:'「最初に時計の音を確かめてくれたでしょ。怖い音でも、きちんと調べれば分かるかもしれないって思えたよ。」'}),
 prologue_milku:Object.freeze({episode:'prologue',people:'「最初にお店の人の話を聞こうとしたこと、覚えています。ここでも、誰かの気持ちを置いていかずに調べたいですね。」',place:'「最初に時計の音を確かめたこと、覚えています。今度は、この灯りの記録を一緒に調べましょう。」'}),
 chapter1_akane:Object.freeze({episode:'chapter1_open',field:'「相談室で現場を優先しようって決めてくれたよね。今回も安全な道を確保する。記録を取る場所は、それから一緒に考えよう！」',record:'「相談室で記録を優先しようって決めてくれたよね。玲奈の調査も大切だよ。だから、安全に調べられる場所を私が確保する！」'}),
 chapter2_aoi:Object.freeze({episode:'chapter1_open',field:'「前に、まず現場を確かめようと決めましたよね。椿さんのノートの時刻と、この家の反応を現地で照らしてみましょう。」',record:'「前に、記録から確かめようと決めましたよね。椿さんのノートの時刻と星灯の波形を、一つずつ比較しましょう。」'}),
 chapter2_reina:Object.freeze({episode:'chapter1_open',field:'「前に、現場を見て確かめる方針でしたよね。今回も、会場で見たものを記録と照らし合わせたいです。」',record:'「前に、記録を見落とさない方針でしたよね。この封蝋の模様も、椿さんのノートと正確に比べておきます。」'}),
 chapter2_akane:Object.freeze({episode:'chapter1_open',field:'「前にも現場の確認を優先したよね。今回も、危ない場所は私が先に調べて、みんなに知らせる！」',record:'「前には記録を大事にしようって決めたよね。今日は私が見回るから、気づいたことは全部、玲奈たちに伝えるよ！」'}),
 chapter3_aoi_lighthouse:Object.freeze({episode:'chapter1_open',field:'「前に現場を先に確かめると決めましたよね。帳面だけでなく、灯台の海側の反応も見落とさずに調べましょう。」',record:'「前に記録から確かめると決めましたよね。点灯記録の空白と、ノエルさんの夢の波形を先に比べてみます。」'}),
 chapter3_aoi_flames:Object.freeze({episode:'chapter1_open',field:'「前に現場の反応から確かめたときのように、星灯と灯火の違いも実際の現象から調べたいです。」',record:'「前に記録を照らし合わせたときのように、星灯と灯火の違いも観測値を並べて確かめたいです。」'}),
 chapter3_aoi_market:Object.freeze({episode:'chapter1_open',field:'「前に現場から確かめると決めましたね。夜市でも、まず被害に遭った人の安全を見て、その場の手がかりを集めましょう。」',record:'「前に記録から確かめると決めましたね。被害に遭った人を守りながら、結晶に残る波形を失わないうちに記録します。」'})
});
function chapterChoiceEcho(sc){
 const entry=CHAPTER_CHOICE_ECHO[sc?.chapterEcho],choice=entry&&S.chapterChoiceMemory?.[entry.episode];
 return entry&&['people','place','field','record'].includes(choice)?entry[choice]||'':'';
}

function storyLineText(sc){
 if(sc.chapterEcho)return substitutePlayerName(chapterChoiceEcho(sc));
 if(storySession?.id==='chapter1_open'){
  if(sc.text==='branch')return CHAPTER_CHOICE_REPLIES[storySession.choice]||CHAPTER_CHOICE_REPLIES.field;
  if(sc.text==='branch_followup')return CHAPTER_CHOICE_FOLLOWUPS[storySession.choice]||CHAPTER_CHOICE_FOLLOWUPS.field;
 }
 if(sc.choiceReplies)return substitutePlayerName(sc.choiceReplies[storySession?.choice]||Object.values(sc.choiceReplies)[0]);
 return substitutePlayerName(sc.text);
}
function storyChoicesPending(){
 if(!storySession)return false;
 const sc=romanceScript(storySession.id).lines[storySession.step];
 return !!sc.choices&&!storySession.choice;
}
function chooseChapterStory(choice){
 if(!storySession)return;
 const sc=romanceScript(storySession.id).lines[storySession.step];
 if(!sc?.choices?.some(option=>option[0]===choice))return;
 storySession.choice=choice;nextStory();
}
function nextStory(){
 if(!storySession||storyChoicesPending())return;
 storyLogOpen=false;
 storySession.step++;
 if(storySession.id==='kaname_meet'&&!S.kanameMet){S.kanameMeetingProgress=storySession.step;persist()}if(storySession.id==='kaede_meet'&&!S.kaedeMet){S.kaedeMeetingProgress=storySession.step;persist()}if(storySession.id==='tsubaki_meet'&&!S.tsubakiMet){S.tsubakiMeetingProgress=storySession.step;persist()}if(storySession.id==='erika_meet'&&!S.erikaMet){S.erikaMeetingProgress=storySession.step;persist()}if(storySession.id==='oldcafe_meet'&&!S.oldcafeMet){S.oldcafeMeetingProgress=storySession.step;persist()}if(storySession.id==='station_meet'&&!S.stationMet){S.stationMeetingProgress=storySession.step;persist()}if(storySession.id==='office_meet'&&!S.officeMet){S.officeMeetingProgress=storySession.step;persist()}if(storySession.id==='school_meet'&&!S.schoolMet){S.schoolMeetingProgress=storySession.step;persist()}if(storySession.id==='seaside_meet'&&!S.seasideMet){S.seasideMeetingProgress=storySession.step;persist()}if(storySession.id==='lighthouse_meet'&&!S.lighthouseMet){S.lighthouseMeetingProgress=storySession.step;persist()}
 const script=romanceScript(storySession.id);
 if(storySession.step>=script.lines.length){finishStory();return}render();
}
function previousStory(){
 if(!storySession||storySession.step<=0)return;
 storySession.step--;if(storySession.id==='tsubaki_meet'&&!S.tsubakiMet){S.tsubakiMeetingProgress=storySession.step;persist()}if(storySession.id==='erika_meet'&&!S.erikaMet){S.erikaMeetingProgress=storySession.step;persist()}if(storySession.id==='oldcafe_meet'&&!S.oldcafeMet){S.oldcafeMeetingProgress=storySession.step;persist()}if(storySession.id==='station_meet'&&!S.stationMet){S.stationMeetingProgress=storySession.step;persist()}if(storySession.id==='office_meet'&&!S.officeMet){S.officeMeetingProgress=storySession.step;persist()}if(storySession.id==='school_meet'&&!S.schoolMet){S.schoolMeetingProgress=storySession.step;persist()}if(storySession.id==='seaside_meet'&&!S.seasideMet){S.seasideMeetingProgress=storySession.step;persist()}if(storySession.id==='lighthouse_meet'&&!S.lighthouseMet){S.lighthouseMeetingProgress=storySession.step;persist()}render();
}
function storyTap(event){
 if(!storySession||event.target.closest('button,a,input,select,textarea,[role="button"]'))return;
 nextStory();
}
function skipChapterStory(){if(storySession)finishStory()}
function finishStory(){
 if(!storySession)return;
 const id=storySession.id;
 if(id==='hero74_backlog'||(id.startsWith('hero74_')&&HERO74_ENCOUNTERS[id.slice('hero74_'.length)])){
  const qids=id==='hero74_backlog'?hero74PendingQuestIds(S):[id.slice('hero74_'.length)];
  if(!S.hero74MeetSeen||typeof S.hero74MeetSeen!=='object')S.hero74MeetSeen={};
  for(const qid of qids)S.hero74MeetSeen[qid]=true;
  persist();storySession=null;view=id==='hero74_backlog'?'home':'city';render();
  if(qids.length)toast('街で出会った人たちの記録を読み終えました。');
  return;
 }
 if(BOND_STORY_CATALOG[id]){
  const script=BOND_STORY_CATALOG[id],i=script.threshold/20-1;
  const first=!bondSeen(script.person,i);
  S.bondRead[script.person][i]=true;if(first)S.gems+=50;
  // Only the first completed read is authoritative; replay never changes memories.
  if(first&&CHOICE_MEMORY_LINES[script.person]?.key===id&&['a','b'].includes(storySession.choice)){
    S.choiceMemories[id]=storySession.choice;
    S.choiceMemoryDay[id]=loveState().day;
    S.choiceMemoryShown[id]=false;
  }
  persist();storySession=null;view='talk';render();
  if(first)toast(`${PEOPLE[script.person].name}の絆エピソード読了：星晶石50`);
  return;
 }
 if(CHAPTER4_STORIES[id]&&id.endsWith('_meet')){
  const hero=id.slice(0,-5),first=!S.chapter4Met?.[hero];
  if(!NEW_HERO_IDS_V028.includes(hero))return;
  S.chapter4Met[hero]=true;S.storyFlags[id]=true;
  if(first&&!pickupActive('chapter4_city')&&!Number.isSafeInteger(S.pickupStartDay?.chapter4_city))pickupStarted('chapter4_city');
  persist();storySession=null;view='story';render();
  if(first)toast(PEOPLE[hero].name+'と出会いました。次の物語は「ストーリー」で選んでください。');
  return;
 }
 if(['saki_yuzu_meet','chiyo_meet','reiko_meet','anzu_meet','nazuna_meet'].includes(id)){
  const ids=id==='saki_yuzu_meet'?['saki','yuzu']:id==='chiyo_meet'?['chiyo']:id==='reiko_meet'?['reiko']:id==='nazuna_meet'?['nazuna']:['anzu'];
  const first=ids.some(hero=>!S.chapter3Met?.[hero]);
  if(!S.chapter3Met)S.chapter3Met={};
  for(const hero of ids)S.chapter3Met[hero]=true;
  S.storyFlags[id]=true;if(first&&id==='saki_yuzu_meet')pickupStarted('chapter3_port');
  persist();storySession=null;view='story';render();
  if(first)toast(ids.map(h=>PEOPLE[h].name).join('・')+'と出会いました。');
  return;
 }
 const meet={
  lighthouse_meet:['lighthouseMet','lighthouse','lighthouseMeetingProgress'],
  tsubaki_meet:['tsubakiMet','tsubaki','tsubakiMeetingProgress'],
  erika_meet:['erikaMet','erika','erikaMeetingProgress'],
  kaname_meet:['kanameMet','kaname','kanameMeetingProgress'],
  kaede_meet:['kaedeMet','kaede','kaedeMeetingProgress'],
  seaside_meet:['seasideMet','seaside','seasideMeetingProgress'],
  school_meet:['schoolMet',null,'schoolMeetingProgress'],
  office_meet:['officeMet','school_new','officeMeetingProgress'],
  station_meet:['stationMet','station','stationMeetingProgress'],
  shinonome_meet:['shinonomeMet','shinonome',null],
  oldcafe_meet:['oldcafeMet','oldcafe','oldcafeMeetingProgress']
 };
 if(meet[id]){
  const [flag,pickup,progress]=meet[id],first=!S[flag];
  S[flag]=true;S.storyFlags[id]=true;
  if(progress)S[progress]=0;
  if(first&&pickup)pickupStarted(pickup);
  persist();storySession=null;view='story';render();
  if(first)toast('出会いの物語を読了しました。次の依頼はクエスト画面から開始してください。');
  return;
 }
 const first=!S.storyFlags[id];
 S.storyFlags[id]=true;
 if(first&&id==='chapter1_open'&&['field','record'].includes(storySession.choice))S.chapterChoiceMemory.chapter1_open=storySession.choice;
 if(first&&id==='chapter1_end'&&S.quests.q6?.complete)S.gems+=CHAPTER_CLEAR_GEMS;
 if(first&&id==='chapter2_end'&&S.quests.q12?.complete)S.gems+=CHAPTER_CLEAR_GEMS;
 const flow=questStoryFlow?.storyId===id?questStoryFlow:null;
 if(flow)questStoryFlow=null;
 persist();storySession=null;
 if(flow?.type==='pre'){view='city';startBattle(flow.qid);return;}
 // An independent encounter starts after the original epilogue finishes.
 if(flow?.type==='post'&&hero74PendingQuestIds(S).includes(flow.qid)){
  view='city';openStory('hero74_'+flow.qid);return;
 }
 view=flow?.type==='post'?'city':'story';render();
 if(first)toast(flow?.type==='post'?'後日談を読了しました。':'物語を読了しました。');
}

function chapterStoryCast(script,index){
 const storyId=storySession?.id||'';
 const current=script.lines[index]?.who;
 const {faces}=authoredStoryFaceState(storyId,script.lines,index);
 // Expression cues change facial expressions only; they never select who appears.
 // Keep a fixed center slot so switching speakers doesn't swap left/right places.
 let cast=(PEOPLE[current]||STORY_ONLY_CAST[current])&&!STORY_VOICE_ONLY.has(current)?[current]:[];
 // The chapter-three embrace is an explicit two-person scene.
 // Show Noel with Touko on the narrated embrace, not in unrelated lines.
 const text=script.lines[index]?.text||'';
 if(storyId==='chapter3_end'&&current==='narrator'&&/透子/.test(text)&&/ノエル/.test(text)&&/抱/.test(text))cast=['touko','noel'];
 const cueLine=script.lines[index]||{};
 const sceneTag=cueLine.sceneTag||cueLine.tone||script.sceneTag||script.tone||'';
 // Historical 霧島ハルカ is a separate story NPC sharing 'haruka' with the new heroine.
 const legacyNpcHaruka=storyId.startsWith('chapter4')||storyId.startsWith('q2')&&current==='haruka';
 return cast.map(who=>expressionPortraitMarkup(who,faces[who]||'normal',`chapter:${storyId}`,{wrapperClass:'story-character',chapterStoryFit:true,stateClass:'is-speaking',alt:`${PEOPLE[who]?.name||STORY_ONLY_CAST[who]}の立ち絵`,eventKey:index,sceneTag,suppressSymbols:cueLine.suppressSymbols===true,legacyNpcHaruka:who==='haruka'&&legacyNpcHaruka})).join('');
}
// v0.34.37.0: 読み返しログ・オート送り・文字の大きさ（読みやすさの設定は端末ごとに保存し、セーブには含めない）
const READER_KEY='yoiboshi-reader-v1';
let storyLogOpen=false,storyAutoTimer=0,readerPrefsCache=null;
function readerPrefs(){
 if(readerPrefsCache)return readerPrefsCache;
 let v={};try{v=JSON.parse(localStorage.getItem(READER_KEY)||'{}')||{}}catch(_){v={}}
 readerPrefsCache={auto:false,size:['m','l','xl'].includes(v.size)?v.size:'m',speed:['slow','normal','fast'].includes(v.speed)?v.speed:'normal',ambient:v.ambient!==false};
 return readerPrefsCache;
}
function saveReaderPrefs(){try{localStorage.setItem(READER_KEY,JSON.stringify({size:readerPrefs().size,speed:readerPrefs().speed,ambient:readerPrefs().ambient}))}catch(_){}applyReaderSize();}
function applyReaderSize(){try{const el=document.documentElement;el.classList.remove('reader-size-l','reader-size-xl');const z=readerPrefs().size;if(z!=='m')el.classList.add('reader-size-'+z)}catch(_){}}
function setReaderSize(z){readerPrefs().size=z;saveReaderPrefs();render();}
function setReaderSpeed(v){readerPrefs().speed=v;saveReaderPrefs();render();}
function setAmbientOn(on){readerPrefs().ambient=!!on;saveReaderPrefs();try{AmbientDirector.applySettings()}catch(_){}}
function speakerNameFor(whoId){const p=PEOPLE[whoId];return p?.name||STORY_ONLY_CAST[whoId]||CHAPTER3_ONLY_VOICE[whoId]||(whoId==='you'?playerDisplayName():whoId==='masked'?'マスクの契約者':whoId==='sakuya'?'朔夜':'');}
function storyLogMarkup(story,index){
 const rows=story.lines.slice(0,index+1).filter(l=>!l.choices&&(l.text||'')).map(l=>{const n=l.who==='narrator'?'':speakerNameFor(l.who);return `<div class="vn-log-row ${n?'':'is-narration'}">${n?`<b>${esc(n)}</b>`:''}<p>${esc(storyLineText(l))}</p></div>`}).join('');
 return `<div class="vn-log" role="dialog" aria-label="読み返しログ" onclick="if(event.target===this)toggleStoryLog()"><div class="vn-log-panel"><div class="vn-log-head"><b>ログ</b><button type="button" class="vn-tool" onclick="toggleStoryLog()">閉じる</button></div><div class="vn-log-body" id="vn-log-body">${rows}</div></div></div>`;
}
function toggleStoryLog(){storyLogOpen=!storyLogOpen;clearTimeout(storyAutoTimer);render();if(storyLogOpen)setTimeout(()=>{const b=document.getElementById('vn-log-body');if(b)b.scrollTop=b.scrollHeight},0);}
function toggleStoryAuto(){readerPrefs().auto=!readerPrefs().auto;clearTimeout(storyAutoTimer);render();}
function scheduleStoryAuto(id,index,total,canAdvance,text){
 clearTimeout(storyAutoTimer);
 if(!readerPrefs().auto||storyLogOpen||!canAdvance||index>=total-1)return '';
 const base={slow:2600,normal:1700,fast:1000}[readerPrefs().speed]||1700;
 const per={slow:110,normal:75,fast:45}[readerPrefs().speed]||75;
 const wait=Math.min(9000,base+String(text||'').length*per);
 storyAutoTimer=setTimeout(()=>{if(view==='story'&&storySession&&storySession.id===id&&storySession.step===index&&readerPrefs().auto&&!storyLogOpen&&!dialog)nextStory();},wait);
 return '';
}
function readerSettingsCard(){
 const r=readerPrefs();
 const opt=(name,val,label,cur,fn)=>`<label><input type="radio" name="${name}" value="${val}" ${cur===val?'checked':''} onchange="${fn}('${val}')">${label}</label>`;
 return `<section class="card pad reader-settings" aria-label="読みやすさ"><h3>読みやすさ</h3><p class="desc">会話の文字の大きさと、オート送りの速さを選べます。この設定は端末ごとに保存されます。</p><div class="reader-row"><span>文字の大きさ</span>${opt('readerSize','m','標準',r.size,'setReaderSize')}${opt('readerSize','l','大',r.size,'setReaderSize')}${opt('readerSize','xl','特大',r.size,'setReaderSize')}</div><div class="reader-row"><span>オート送り</span>${opt('readerSpeed','slow','ゆっくり',r.speed,'setReaderSpeed')}${opt('readerSpeed','normal','ふつう',r.speed,'setReaderSpeed')}${opt('readerSpeed','fast','速い',r.speed,'setReaderSpeed')}</div><p class="tiny">オート送りは、会話画面の上の「オート」で切り替えます。</p></section>`;
}
applyReaderSize();
function chapterStoryPage(){
 if(!storySession)return storyMenu();
 const story=romanceScript(storySession.id),index=storySession.step,sc=story.lines[index];
 const p=PEOPLE[sc.who],who=p?.name||STORY_ONLY_CAST[sc.who]||CHAPTER3_ONLY_VOICE[sc.who]||(sc.who==='you'?playerDisplayName():sc.who==='masked'?'マスクの契約者':sc.who==='sakuya'?'朔夜':'ナレーション');
 const isChoices=!!sc.choices,choices=isChoices?`<div class="story-choices">${sc.choices.map(([id,label])=>`<button type="button" class="btn outline" onclick="chooseChapterStory('${id}')">${esc(label)}　↗</button>`).join('')}</div>`:'';
 const canAdvance=!storyChoicesPending();
 const sceneTime=CHAPTER_SCENE_TIMES[storySession.id]||'';
 const placeTime=sceneTime&&!story.place.includes(sceneTime)?`${story.place} · ${sceneTime}`:story.place;
 const firstCaption=index===0?`<span class="story-scene-label">${esc(placeTime)}</span>`:'';
 const castMarkup=chapterStoryCast(story,index);
 const bgPath=readyStoryBackground(storySession.id,index);
 const bgMarkup=bgPath?`<div class="story-bg" style="background-image:url('${bgPath}')" aria-hidden="true"></div>`:'';
 const isChapter5Story=!!CHAPTER5_STORIES[storySession.id];
 const isChapter4Story=!!CHAPTER4_STORIES[storySession.id];
 const isChapter3Story=!!CHAPTER3_STORIES[storySession.id]||!!CHAPTER3_LATE_STORIES[storySession.id];
 const isChapter2Story=['chapter2_open','q7','q8','q9','q10','q11','q12','chapter2_end','tsubaki_meet','erika_meet','kaname_meet','kaede_meet'].includes(storySession.id)||['tsubaki','erika','kaname','kaede'].includes(BOND_STORY_CATALOG[storySession.id]?.person);
 return `<div class="story-panel card chapter-story chapter-story-v071 vn-story" aria-label="物語の再生画面">
 <div class="story-scene ${castMarkup?'':'no-cast'} ${bgPath?'has-bg':''}">${bgMarkup}<div class="story-skyline" style="pointer-events:none"></div><div class="story-cast" style="pointer-events:none">${castMarkup}</div>
 <div class="vn-toolbar"><span class="vn-location">${esc(placeTime)}</span><div class="vn-top-actions"><button type="button" class="vn-tool" onclick="toggleStoryLog()">ログ</button><button type="button" class="vn-tool ${readerPrefs().auto?'is-on':''}" aria-pressed="${readerPrefs().auto?'true':'false'}" onclick="toggleStoryAuto()">オート</button><button type="button" class="vn-tool" onclick="previousStory()" ${index===0?'disabled':''}>戻る</button><button type="button" class="vn-tool" onclick="skipChapterStory()">スキップ</button><button type="button" class="vn-tool" onclick="requestInterrupt()">閉じる</button></div></div>
 <div class="story-dialogue"><div class="vn-dialogue-head"><span class="vn-speaker">${sc.who==='narrator'?'':esc(who)}</span></div>
 <p class="story-line">${esc(storyLineText(sc))}</p>
 <div class="vn-dialogue-actions">${choices}<button type="button" class="vn-next" onclick="nextStory()" ${canAdvance?'':'disabled'}>${index===story.lines.length-1?'読み終える':'次へ　▸'}</button></div></div>${storyLogOpen?storyLogMarkup(story,index):''}</div></div>${scheduleStoryAuto(storySession.id,index,story.lines.length,canAdvance,storyLineText(sc))}`;
}
// v0.34.70.0: ストーリー画面。「次に読む話」を大きく1つ出し、章は折りたたむ。読めない話は出さない
let storyMenuOpen=null, storyPartOpen=null; // v0.66.0.0: 部→章→話のツリー
function toggleStoryChapter(i){storyMenuOpen=storyMenuOpen===i?-1:i;render();}
function toggleStoryPart(k){storyPartOpen=k||'';storyMenuOpen=-1;render();}
function openStoryChapterView(i){storyMenuOpen=i;render();}
function storyMenu(){
 const st=id=>CHAPTER_STORIES[id]||(typeof romanceScript==='function'?romanceScript(id):null);
 const item=(id,okFn,label)=>{const x=st(id);return {id,label:label||x?.title||id,ok:!!okFn(),read:!!S.storyFlags?.[id]};};
 const auto=id=>item(id,()=>storyAllowed(id));
 const q=n=>!!S.quests['q'+n]?.complete;
 const meet=(id,cond,label,flag)=>{const it=item(id,cond,label);it.read=it.read||!!S[flag];return it;};
 const chapters=[
  {title:'序章',items:[{id:'__prologue',label:'第0話　相談室、はじめました。',ok:true,read:!!S.storyFlags?.prologue},auto('q1_lead'),auto('q2_lead'),
    meet('shinonome_meet',()=>q(1),'東雲商店街の出会い','shinonomeMet'),meet('oldcafe_meet',()=>q(2),'旧喫茶街の出会い','oldcafeMet')]},
  {title:'第1章　増幅する残響',items:[auto('chapter1_open'),auto('q3_lead'),auto('q3'),meet('station_meet',()=>q(3),'東雲駅前の出会い','stationMet'),auto('q4_lead'),auto('q4'),
    meet('school_meet',()=>q(4),'旧第二小学校の出会い','schoolMet'),meet('office_meet',()=>q(4)&&S.schoolMet,'相談室の新しい顔ぶれ','officeMet'),auto('q5_lead'),auto('q5'),
    meet('seaside_meet',()=>q(5),'臨海公園の出会い','seasideMet'),auto('q6_ready'),auto('q6'),auto('chapter1_end'),meet('lighthouse_meet',()=>q(6)&&S.storyFlags.chapter1_end,'旧灯台の目覚め','lighthouseMet')]},
  {title:'第2章　契約者たち',items:[...['chapter2_open','q7_lead','q7'].map(auto),item('tsubaki_meet',()=>q(7),'椿との出会い'),...['q8_lead','q8'].map(auto),item('erika_meet',()=>q(8),'エリカとの出会い'),
    ...['q9_lead','q9','q10_lead','q10','q11_lead','q11'].map(auto),item('kaname_meet',()=>q(11),'カナメとの出会い'),...['q12_lead','q12'].map(auto),item('kaede_meet',()=>q(12),'楓との出会い'),auto('chapter2_end')]},
  {title:'第3章　白い星の行方',items:[...['chapter3_open','q13_intro','q13','q14_intro','q14','q15_intro','q15'].map(auto),
    ...[['saki_yuzu_meet','宵波の姉妹との出会い'],['chiyo_meet','恋塚ちよとの出会い'],['reiko_meet','鷹宮玲子との出会い'],['anzu_meet','七瀬あんずとの出会い']].map(([id,l])=>item(id,()=>storyAllowed(id),l)),
    ...['q16_intro','q16'].map(auto),item('nazuna_meet',()=>q(16),'月岡なずなとの出会い'),...['q17_intro','q17','q18_intro','q18','chapter3_end'].map(auto)]},
  {title:'第4章　消えた灯の約束',items:['chapter4_open',...Object.keys(CHAPTER4_MEET_ORDER).flatMap(k=>[k+'_intro',k+'_pre',k,...CHAPTER4_MEET_ORDER[k].map(h=>h+'_meet')]),'chapter4_end'].map(auto)},
  {title:'第5章　試験点灯の夜',items:['chapter5_open',...['q25','q26','q27','q28','q29','q30'].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter5_end'].filter(id=>st(id)).map(auto)},
  {title:'第6章　星を読む人',items:['chapter6_open',...['q31','q32','q33','q34','q35','q36'].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter6_end'].filter(id=>st(id)).map(auto)},
  {title:'第7章　占いの館',items:['chapter7_open',...['q37','q38','q39','q40','q41','q42'].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter7_end'].filter(id=>st(id)).map(auto)},
  {title:'第8章　偽りの黒幕',items:['chapter8_open',...['q43','q44','q45','q46','q47','q48'].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter8_end'].filter(id=>st(id)).map(auto)},
  {title:'第9章　点灯式の夜',items:['chapter9_open',...['q49','q50','q51','q52','q53','q54'].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter9_end'].filter(id=>st(id)).map(auto)},
  {title:'第10章　宵星',items:['chapter10_open',...['q55','q56','q57','q58','q59','q60'].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter10_end'].filter(id=>st(id)).map(auto)},
  {title:'第2部 第1章　宝石店の灯石',items:['chapter11_open',...['q61','q62','q63','q64','q65','q66'].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter11_end'].filter(id=>st(id)).map(auto)},
  {title:'第2部 第2章　灯という名の情報屋',items:['chapter12_open',...["q67", "q68", "q69", "q70", "q71", "q72"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter12_end'].filter(id=>st(id)).map(auto)},
  {title:'第2部 第3章　蔦の館',items:['chapter13_open',...["q73", "q74", "q75", "q76", "q77", "q78"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter13_end'].filter(id=>st(id)).map(auto)},
  {title:'第2部 第4章　迎えの灯',items:['chapter14_open',...["q79", "q80", "q81", "q82", "q83", "q84"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter14_end'].filter(id=>st(id)).map(auto)},
  {title:'第2部 第5章　灯を売る人',items:['chapter15_open',...["q85", "q86", "q87", "q88", "q89", "q90"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter15_end'].filter(id=>st(id)).map(auto)},
  {title:'第2部 第6章　ジュリの選択',items:['chapter16_open',...["q91", "q92", "q93", "q94", "q95", "q96"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter16_end'].filter(id=>st(id)).map(auto)},
  {title:'第2部 第7章　冴子の古い夢',items:['chapter17_open',...["q97", "q98", "q99", "q100", "q101", "q102"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter17_end'].filter(id=>st(id)).map(auto)},
  {title:'第2部 第8章\u3000よぞらのパンやさん',items:['chapter18_open',...["q103", "q104", "q105", "q106", "q107", "q108"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter18_end'].filter(id=>st(id)).map(auto)},
  {title:'第2部 第9章\u3000浜の子守歌',items:['chapter19_open',...["q109", "q110", "q111", "q112", "q113", "q114"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter19_end'].filter(id=>st(id)).map(auto)},
  {title:'第2部 第10章\u3000灯の市',items:['chapter20_open',...["q115", "q116", "q117", "q118", "q119", "q120"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter20_end'].filter(id=>st(id)).map(auto)},
  {title:'第3部 第1章\u3000湯ノ花の噂',items:['chapter21_open',...["q121", "q122", "q123", "q124", "q125", "q126"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter21_end'].filter(id=>st(id)).map(auto)},
  {title:'第3部 第2章\u3000名前のない仲居',items:['chapter22_open',...["q127", "q128", "q129", "q130", "q131", "q132"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter22_end'].filter(id=>st(id)).map(auto)},
  {title:'第3部 第3章\u3000湯けむりの残響',items:['chapter23_open',...["q133", "q134", "q135", "q136", "q137", "q138"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter23_end'].filter(id=>st(id)).map(auto)},
  {title:'第3部 第4章\u3000灯籠職人',items:['chapter24_open',...["q139", "q140", "q141", "q142", "q143", "q144"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter24_end'].filter(id=>st(id)).map(auto)},
  {title:'第3部 第5章\u3000常夜、ふたたび',items:['chapter25_open',...["q145", "q146", "q147", "q148", "q149", "q150"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter25_end'].filter(id=>st(id)).map(auto)},
  {title:'第3部 第6章\u3000さっちゃんの笑顔',items:['chapter26_open',...["q151", "q152", "q153", "q154", "q155", "q156"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter26_end'].filter(id=>st(id)).map(auto)},
  {title:'第3部 第7章\u3000曇る灯籠',items:['chapter27_open',...["q157", "q158", "q159", "q160", "q161", "q162"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter27_end'].filter(id=>st(id)).map(auto)},
  {title:'第3部 第8章\u3000灯籠流しの夜',items:['chapter28_open',...["q163", "q164", "q165", "q166", "q167", "q168"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter28_end'].filter(id=>st(id)).map(auto)},
  {title:'第3部 第9章\u3000朔夜',items:['chapter29_open',...["q169", "q170", "q171", "q172", "q173", "q174"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter29_end'].filter(id=>st(id)).map(auto)},
  {title:'第3部 第10章\u3000送り火',items:['chapter30_open',...["q175", "q176", "q177", "q178", "q179", "q180"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter30_end'].filter(id=>st(id)).map(auto)},
  {title:'第4部 第1章\u3000ネオン坂の噂',items:['chapter31_open',...["q181", "q182", "q183", "q184", "q185", "q186"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter31_end'].filter(id=>st(id)).map(auto)},
  {title:'第4部 第2章\u3000凪の沈黙',items:['chapter32_open',...["q187", "q188", "q189", "q190", "q191", "q192"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter32_end'].filter(id=>st(id)).map(auto)},
  {title:'第4部 第3章\u3000白いお面',items:['chapter33_open',...["q193", "q194", "q195", "q196", "q197", "q198"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter33_end'].filter(id=>st(id)).map(auto)},
  {title:'第4部 第4章\u3000舞の憧れ',items:['chapter34_open',...["q199", "q200", "q201", "q202", "q203", "q204"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter34_end'].filter(id=>st(id)).map(auto)},
  {title:'第4部 第5章\u3000SHION∞',items:['chapter35_open',...["q205", "q206", "q207", "q208", "q209", "q210"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter35_end'].filter(id=>st(id)).map(auto)},
  {title:'第4部 第6章\u3000凪とシオン',items:['chapter36_open',...["q211", "q212", "q213", "q214", "q215", "q216"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter36_end'].filter(id=>st(id)).map(auto)},
  {title:'第4部 第7章\u3000残り火',items:['chapter37_open',...["q217", "q218", "q219", "q220", "q221", "q222"].flatMap(k=>[k+'_intro',k+'_pre',k]),'chapter37_end'].filter(id=>st(id)).map(auto)}
 ];
 for(const c of chapters){c.items=c.items.filter(x=>x&&(x.id==='__prologue'||x.id==='__opening'||st(x.id)));c.open=c.items.filter(x=>x.ok);c.unread=c.open.filter(x=>!x.read).length;c.locked=c.items.length-c.open.length;}
 const visible=chapters.map((c,i)=>({...c,i})).filter(c=>c.open.length);
 let next=null,nextCh=null;for(const c of visible){const x=c.open.find(y=>!y.read);if(x){next=x;nextCh=c;break;}}
 const current=nextCh?nextCh.i:(visible.length?visible[visible.length-1].i:0);
 const openIdx=storyMenuOpen===null?current:storyMenuOpen;
 const go=x=>x.id==='__opening'?'replayOpening()':x.id==='__prologue'?'openPrologue()':`openStory('${x.id}')`;
 const nextCard=next?`<section class="card pad story-next"><small>次に読む話・${esc(nextCh.title)}</small><h2>${esc(next.label)}</h2><button type="button" class="btn primary story-next-btn" onclick="${go(next)}">読む ▸</button></section>`
  :`<section class="card pad story-next is-done"><small>未読の物語はありません</small><h2>依頼を進めると、続きの物語が解放されます</h2><button type="button" class="btn outline" onclick="change('city')">クエスト画面へ ›</button></section>`;
 const STORY_PARTS=[{key:'p1',title:'第1部',sub:'宵星',from:0,to:10},{key:'p2',title:'第2部',sub:'灯を売る人',from:11,to:20},{key:'p3',title:'第3部',sub:'灯籠流しの町',from:21,to:30}];
 const partOf=i=>(STORY_PARTS.find(p=>i>=p.from&&i<=p.to)||STORY_PARTS[0]).key;
 const openPart=storyPartOpen||'';
 const chapterLabel=t=>String(t).replace(/^第\d+部\s*/,'');
 const openingCard=`<section class="card story-part story-opening"><button type="button" class="story-part-head" onclick="replayOpening()"><span><b>オープニング</b><em>物語のはじまり</em></span><span class="story-chapter-arrow">▶</span></button></section>`;
 const badge=n=>n?`<i class="story-new">未読${n}</i>`:'';
 const part=STORY_PARTS.find(p=>p.key===openPart);
 const partChapters=p=>visible.filter(c=>c.i>=p.from&&c.i<=p.to);
 const chap=part?partChapters(part).find(c=>c.i===storyMenuOpen):null;
 let level='parts',panel='';
 if(part&&chap){
  level='episodes';
  panel=`<div class="os-level-head"><button type="button" class="os-back" onclick="toggleStoryPart('${part.key}')">‹ ${esc(part.title)}</button><b>${esc(chapterLabel(chap.title))}</b><em>${chap.open.length}話${chap.locked?`・あと${chap.locked}話`:''}</em></div>
  <ol class="os-grid os-ep-grid">${chap.open.map(x=>`<li><button type="button" class="story-ep ${x.read?'is-read':'is-unread'}" onclick="${go(x)}"><span>${esc(x.label)}</span>${x.read?'':'<b class="story-new">NEW</b>'}</button></li>`).join('')}</ol>`;
 }else if(part){
  level='chapters';
  panel=`<div class="os-level-head"><button type="button" class="os-back" onclick="toggleStoryPart('')">‹ 部の一覧</button><b>${esc(part.title)}　${esc(part.sub)}</b></div>
  <div class="os-grid os-chap-grid">${partChapters(part).map(c=>`<button type="button" class="os-chap ${c.unread?'has-unread':''}" onclick="openStoryChapterView(${c.i})"><b>${esc(chapterLabel(c.title))}</b><em>${c.open.length}話 ${badge(c.unread)}</em></button>`).join('')}</div>`;
 }else{
  panel=`<div class="os-grid os-part-grid">${STORY_PARTS.map(p=>{const cs=partChapters(p);if(!cs.length)return '';const un=cs.reduce((n,c)=>n+c.unread,0);
   return `<button type="button" class="os-part ${p.key===partOf(current)?'is-current':''}" onclick="toggleStoryPart('${p.key}')"><small>${esc(p.title)}</small><b>${esc(p.sub)}</b><em>${cs.length}章 ${badge(un)}</em><span class="story-chapter-arrow">›</span></button>`;}).join('')}</div>`;
 }
 return `<div class="os-page os-story" data-level="${level}"><div class="os-side">${heading('STORY / LIBRARY','ストーリー','')}${nextCard}${openingCard}</div><div class="os-tree">${panel}</div></div>`;
}
let lobbySelected=(typeof S.homeFavorite==='string'&&PEOPLE[S.homeFavorite]&&heroV0690Visible(S.homeFavorite,S)&&(HERO_IDS.includes(S.homeFavorite)||UNITS.some(u=>u.person===S.homeFavorite&&data(u.id))))?S.homeFavorite:'momoka',lobbyLine=0;
let candidatePreviewPose='standing';
let rosterFilter='all', rosterRoleFilter='all', rosterHighlight='';
// 編成画面だけの選択状態。保存データとは分離して管理する。
let rosterEditSlot=0, rosterRarityFilter='all', rosterPickerOpen=false, rosterCollectionOpen=false; // v0.34.69.x: 交代は押したときだけ一覧を開く
function selectRosterSlot(index){if(hiddenV0690Party())return toast('編成の保存内容を保持するため公開再開後に変更できます');if(!Number.isInteger(index)||index<0||index>3)return;rosterEditSlot=index;rosterPickerOpen=true;render();}
function closeRosterPicker(){rosterPickerOpen=false;render();}
function toggleRosterCollection(){rosterCollectionOpen=!rosterCollectionOpen;render();}
function changeRosterRarityFilter(value){if(!['all','SR','SSR','UR'].includes(value))return;rosterRarityFilter=value;render();}
function assignRosterOwnedUnit(id){if(hiddenV0690Party())return toast('元の一時非表示の編成を保持するため公開再開後に変更できます');if(!data(id)||!unit(id))return toast('未所持のユニットは編成できません');rosterPickerOpen=false;return setSlot(rosterEditSlot,id);}

const isConcept=personId=>personId.startsWith('concept')&&!DISTRICT_HERO_IDS.includes(personId);
const homeMembers=()=>Array.from(new Set([...HERO_IDS.filter(id=>romanceHeroAvailable(id)),...UNITS.filter(u=>data(u.id)&&heroV0690Visible(u.person,S)).map(u=>u.person)]));
function lobbyCycle(offset){const members=homeMembers();let current=members.indexOf(lobbySelected);lobbySwitch(members[(current+offset+members.length)%members.length]||members[0]||'momoka')}
function homeFromRoster(p){if(!homeMembers().includes(p))return; lobbySwitch(p);change('home')}
function changeRosterFilter(filter){if(!['all','owned','unowned','visual','trainable'].includes(filter))return;rosterFilter=filter;render();}
function changeRosterRoleFilter(role){if(!['all','attacker','tank','healer','support'].includes(role))return;rosterRoleFilter=role;render();}
// UI-only availability: never changes costs, owned data, or level/copy calculations.
function canTrainUnit(u){
 const d=u&&data(u.id);
 return !!(d&&((d.lv<30&&S.gold>=d.lv*ECONOMY.LEVEL_COST_PER_LV)||(d.lb<7&&d.copies>0)));
}
function setArtPose(pose){if(!['dynamic','neutral'].includes(pose))return;S.artPose=pose;persist();render();}
function poseSelector(personId){
 if(!hasDrivePose(personId))return '';
 return `<div class="art-pose-switch" role="group" aria-label="立ち絵ポーズを切り替える"><span>立ち絵</span><button class="${S.artPose==='dynamic'?'selected':''}" type="button" aria-pressed="${S.artPose==='dynamic'}" onclick="setArtPose('dynamic')">動きあり</button><button class="${S.artPose==='neutral'?'selected':''}" type="button" aria-pressed="${S.artPose==='neutral'}" onclick="setArtPose('neutral')">棒立ち</button></div>`;
}

function highlightUnit(id){if(!BYID[id])return;rosterHighlight=id;render();}

function lobbySwitch(p){if(!PEOPLE[p]||!homeMembers().includes(p))return;lobbySelected=p;lobbyLine=0;
 // Retain a hidden heroine's saved home choice while temporarily displaying others.
 if(heroV0690Visible(S.homeFavorite,S)){S.homeFavorite=p;S.homeUnitId=homeUnit(p)?.id||null;persist();}
 if(view==='home')render()}
// v0.68.6.0: ホームでキャラをタッチしたときの専用セリフ（頭をなでる／つつく／つつきすぎ）
let homeTouchLine=null,homeTouchLast={},homeTouchStage=0;
const HOME_TOUCH_LINES=Object.freeze({
 momoka:{head:['わっ、頭なでた!?　……えへへ、もう一回だけなら、いいよ。','なでなでされると、たい焼きより元気出るかも！','ちょ、ちょっと！　髪がくしゃくしゃになっちゃう〜。'],tap:['なになに？　呼んだ？','つんつんしないの！　くすぐったいってば。','ん？　今日のおすすめは、商店街のたい焼き屋さんだよ！'],many:['もー！　責任者さん、さっきからつつきすぎ！','……そんなに構ってほしいの？　しょうがないなあ。']},
 milku:{head:['あ……。撫でられるのは、少しだけ恥ずかしいです。','ふふ、子ども扱いですか？　……悪くはないですけど。','お、お茶がこぼれちゃいますから……！'],tap:['はい、なんでしょう？','ひゃっ……びっくりしました。','おかわりですか？　すぐに淹れますね。'],many:['も、もう……そんなにつつかれたら、手元が狂ってしまいます。','ふふ、今日はずいぶん甘えん坊さんですね。']},
 polite:{head:['あ……撫でられると、少し照れてしまいます。','ふふ、ありがとうございます。元気が出ました。','急にどうしたんですか？　……嫌じゃないですけど。'],tap:['はい、呼びましたか？','わっ……びっくりしました。','何かご用でしょうか？'],many:['も、もう……からかわないでください。','そんなにつつかれたら、困ってしまいます。']},
 casual:{head:['わっ、なに急に？　……まあ、悪くないけど。','えへへ、なでられるの、けっこう好きかも。','髪、くしゃくしゃになるってば〜。'],tap:['ん？　呼んだ？','わっ、びっくりした！','なになに、どうしたの？'],many:['もー、つつきすぎ！','ちょっと、さっきから何回目？　……ふふ、しょうがないなあ。']}
});
// v0.68.7.0: 胸のあたりを触ったとき。1回目は慌てる、続けると怒る、さらに続けると本気で引く（段階は10秒で元に戻る）
const HOME_TOUCH_CHEST=Object.freeze({
 momoka:[['ひゃっ!?　ど、どこ触ってるの、責任者さん！','わわっ……！　い、今のは事故だよね？　事故ってことにしてあげる！','ちょっ……!?　し、心臓に悪いから、そういうのナシ！'],['もー！　二回目は事故じゃないでしょ！　たい焼きおごりの刑だからね！','責任者さんのえっち！　……ほんとに怒るよ？'],['……責任者さん。しばらく口きいてあげない。','ねえ、玲奈さん呼んでこようか？　本気で。']],
 milku:[['きゃっ……！　あ、あの、そこは……その……。','ひゃい!?　お、お盆、落としそうになりました……！','……っ。い、今のは見なかったことにしますね。'],['あの……二度目は、さすがに怒りますよ？','もう……！　お茶、熱いのを淹れて差し上げましょうか？'],['……責任者さん。今日のおやつは、なしです。','そういうことをする方には、もうお茶は出せません。']],
 polite:[['ひゃっ……!?　ど、どこを触っているんですか！','い、今のは……手が滑っただけ、ですよね？','……っ！　急にそういうのは、困ります……！'],['二回目は、さすがに見過ごせませんよ？','怒りますよ……？　本当に。'],['……最低です。しばらく近づかないでください。','次やったら、本気で通報しますからね。']],
 casual:[['ひゃっ!?　ちょ、どこ触ってんの！','わっ……!?　い、今のはナシ！　ノーカン！','……っ、びっくりしたじゃん！　なに考えてんの！'],['ちょっと！　二回目はわざとでしょ！','いい加減にしないと、ほんとに怒るからね！'],['……最っ低。しばらく話しかけないで。','はい、次やったら絶交ね。本気で。']]
});
let homeChestCount=0,homeChestAt=0;
// v0.69.0.0: ヒロインごとのタッチ専用セリフ。h=頭をなでる, t=つつく, m=つつきすぎ, c=胸（[1回目, 続けて, さらに]）
const HOME_TOUCH_BY_ID=Object.freeze({
koharu:{h:['あ……撫でていただくなんて、恐縮です。……ご宿泊のお客様ではありませんよね？','ふふ、頭を撫でられるのは、お客様にもされたことがありません。'],t:['はい、ご用件を承ります。……あ、また接客口調に。','ひゃっ。お呼びでしょうか、責任者さん。'],m:['お、お客様……ではなくて、責任者さん。それ以上はフロントにご相談を……！'],c:[['ひゃっ!?　し、失礼ですが、そちらはサービスの対象外でございます……！','……っ！　お、お客様、困ります……あ、責任者さんでした。'],['二度目は、さすがに支配人に報告いたしますよ……？'],['……本日は、これにてチェックアウトとさせていただきます。']]},
lilith:{h:['なっ……我が髪に触れるとは。……べ、別に、嫌ではないぞ。','ふ、ふん。撫でる許可など出しておらぬが……もう少しだけなら、よい。'],t:['なんだ、我を呼んだか？','ひゃっ……!?　き、急に触れるでない、心臓が止まるかと思った……。'],m:['しつこいぞ！　黒薔薇の呪いをかけてやろうか……！'],c:[['なっ……なななっ!?　ど、どこに触れておる、無礼者っ！','ひゃああっ!?　そ、そこは結界の内側だぞ！'],['二度目だと!?　……本気で、怒るからな。……ほんとに。'],['……もう知らない。普通に、嫌。']]},
shio:{h:['わっ、先輩？　……えへへ、撫でられるの、好きかもです。','頭なでられると、泳ぎ切ったあとみたいにほっとします。'],t:['はい、先輩！　なんですか？','わっ、びっくりした！　プールサイドなら転んでますよ〜。'],m:['もー、先輩！　つつきすぎです、息継ぎさせてください！'],c:[['ひゃっ!?　せ、先輩!?　そこはダメです……！','わわっ……！　い、今のは水しぶきのせいってことに……なりませんよね!?'],['先輩、二回目はさすがにイエローカードです！'],['……先輩のこと、ちょっと見損ないました。']]},
kaname:{h:['……子ども扱い？　別に、いいけど。','撫でたって、何も出ないわよ。……少しは落ち着くけど。'],t:['何？　用があるなら言って。','……驚かせないで。反射で構えるところだった。'],m:['しつこい。マスク、つけ直すわよ。'],c:[['っ……!?　どこ触ってるの。','……今の、わざとじゃないなら黙っておくわ。'],['二度目は見逃さない。次は手を払うから。'],['……最低。しばらく私に近づかないで。']]},
koyori:{h:['えへへ、もっと撫でていいよ？　お姉ちゃんには内緒ね。','わ、なでなでだ。ケーキ一個分くらい元気出たかも！'],t:['なーに？　わたしに用？','ひゃっ、くすぐったい！　もう、責任者さんってば。'],m:['つつきすぎ〜！　ひよりお姉ちゃんに言いつけちゃうよ？'],c:[['ひゃっ!?　ちょ、ちょっと、どこ触ってるの!?','わっ……!?　い、今のはノーカンにしてあげる……今だけ！'],['二回目はダメ！　ほんとにお姉ちゃん呼ぶからね！'],['……責任者さん、さいてー。しばらく口きかない。']]},
marin:{h:['お、なになに？　頭なでるとか、ちょっと照れるんだけど。','へへ、悪くないじゃん。たまには甘やかされるのもアリかも。'],t:['んー？　呼んだ？　注文なら聞くよ〜。','わっ、びびった！　氷落とすとこだったじゃん。'],m:['ちょっと〜、つつきすぎ！　営業妨害だかんね？'],c:[['はっ!?　ちょ、どこ触ってんの！','わっ……!?　い、今のはナシ！　見なかったことにしたげる！'],['二回目はわざとっしょ！　店から叩き出すよ？'],['……マジでないわ。出禁ね、出禁。']]},
erika:{h:['あら、大胆ね。……でも、嫌いじゃないわ。','撫でるのは自由よ。その代わり、何をくれるのかしら？'],t:['なあに？　情報のご依頼？','ふふ、そんな触り方じゃ、私は驚かないわよ。'],m:['しつこい男は、情報の値段が上がるわよ？'],c:[['……あら。そこに触れる対価、払えるのかしら？','ふふ、今のは見なかったことにしてあげる。一度だけね。'],['二度目は高くつくわよ。覚悟はある？'],['……興ざめね。今日はもう店じまいよ。']]},
tsubaki:{h:['わっ、急になに？　……ふふ、撫でられるの、久しぶりかも。','楓にはよくやってたけど、される側って新鮮ね。'],t:['なに？　調査の話？　すぐ行くわよ！','ひゃっ、びっくりした！　背中つつかないでよ。'],m:['ちょっと、つつきすぎ！　足が先に出ちゃうわよ？'],c:[['ひゃっ!?　ちょ、ちょっと、どこ触ってるのよ！','わっ……!?　い、今のは事故ってことにしといてあげる！'],['二回目は事故じゃないでしょ！　本気で蹴るわよ？'],['……最低。楓にも近づかないでよね。']]},
kaede:{h:['あ……。撫でられると、少しだけ安心します。','ふふ……椿にもよくこうしてもらいました。'],t:['はい……呼びましたか？','ひゃっ……。す、すみません、驚いてしまって。'],m:['あ、あの……そんなにつつかれると、どうしたらいいか……。'],c:[['ひゃっ……!?　あ、あの、そこは……。','……っ。い、今のは、気づかなかったことにします……。'],['……二度目は、さすがに悲しいです。'],['……しばらく、ひとりにしてください。椿を呼びますね。']]},
riko:{h:['え、なにこれ、恋愛ドラマの導入？　……どきっとしたじゃん。','なでなでとか、反則でしょ。……もう一回だけね。'],t:['なになに？　恋バナ？','わっ、びっくり！　試着室ならカーテン閉めてるとこだよ。'],m:['もー、つつきすぎ！　ドラマならここで振られてるよ？'],c:[['ひゃっ!?　ちょっ、どこ触ってんの！','わっ……!?　い、今のはドラマ的にもアウトだから！'],['二回目は完全に悪役の動きだよ!?'],['……はい、最終回。打ち切りです。']]},
noel:{h:['あ……撫でられると、胸のあたりがあったかくなります。日記に書いておきますね。','ふふ、これ、好きかもしれません。……覚えておきたいです。'],t:['はい、なんでしょう？','ひゃっ……。いまのは、くすぐったいって感覚ですね。'],m:['そんなにつつかれたら、日記が「つつかれた」で埋まっちゃいます……。'],c:[['ひゃっ……!?　あ、あの……そこは、触っちゃいけないところだと思います。','……っ。い、今のは……びっくりしました。'],['二回目は、千夏さんに相談しますね……？'],['……今日の日記には、責任者さんのこと、書きません。']]},
mio:{h:['ぴゃっ……!?　あ、頭……。……い、いやじゃない、です。','な、撫でられると……配信のときより、声、出なくなります……。'],t:['……あ、は、はい。なん、でしょう……。','ひゃっ……！　き、急に触られると、心臓が……。'],m:['あ、あの……そんなにつつかれると、配信、切ります……。'],c:[['ぴゃああっ!?　ど、どど、どこ触って……!?','……っ！　い、いまの、配信してなくてよかった……。'],['に、二回目は……ブロック、します……っ。'],['……もう、オフラインです。話しかけないで……。']]},
jun:{h:['……なんだよ。ヘルメット越しじゃないと、照れるだろ。','撫でるとか、ガキ扱いか？　……まあ、別にいいけど。'],t:['なんだ。荷物か？','っ、急に触んな。反射で避けるとこだった。'],m:['しつこい。置いてくぞ。'],c:[['っ……!?　どこ触ってんだ、あんた。','……今のは見なかった。次はないからな。'],['二回目は、さすがにキレるぞ。'],['……しばらく顔見せんな。裏道で撒いてやる。']]},
yume:{h:['あら……撫でていただくなんて、子どもの頃以来です。','ふふ、こういうのは、八年経っても変わらず嬉しいものですね。'],t:['はい、なんでしょうか？','きゃっ……。驚きました、今の方は気軽に触れるのですね。'],m:['あの……今の時代では、それが普通なのでしょうか……？'],c:[['きゃっ……!?　そ、そこは……いけません……！','……っ。い、今のは、見なかったことにいたします。'],['二度目は、どの時代でもいけないことですよ……？'],['……少し、距離を置かせてください。']]},
shino:{h:['……撫でんな。値上げするぞ。','っ……。今のは、タダにしといてやる。一回だけな。'],t:['なんだ。取引の話か？','急に触るな。手、出るとこだったぞ。'],m:['しつこい。情報料、倍にすんぞ。'],c:[['っ……!?　どこ触ってんだ、てめえ。','……今のは記録に残さないでやる。借りだからな。'],['二度目はねえぞ。腕へし折る。'],['……取引は打ち切りだ。二度と来んな。']]},
hiyori:{h:['あら……撫でられるのなんて、いつぶりかしら。','ふふ、いつもこよりにしてあげる側だから……少し照れるわね。'],t:['はい、なあに？　手伝いが必要？','きゃっ。もう、クリーム絞ってたら大惨事よ？'],m:['もう、つつきすぎ。仕込みが進まないじゃない。'],c:[['きゃっ……!?　ど、どこ触ってるの……！','……っ。い、今のは、手が滑ったのよね？'],['二度目は怒るわよ。……こよりの前では絶対にやめてね。'],['……しばらく、お店に来ないで。']]},
ageha:{h:['……なに。撫でたら機嫌取れると思った？　……まあ、悪くないけど。','髪、崩れるんだけど。……五秒だけなら許す。'],t:['なに？　ネイルの予約？','っ、急に触んないでよ。手元狂うでしょ。'],m:['しつこい。指先、デコってやろうか？'],c:[['……は？　今どこ触った？','……今のは事故ってことにしといてあげる。貸しね。'],['二回目は嘘つけないでしょ。わざとね。'],['……あんた、最低。もう顔も見たくない。']]},
kirari:{h:['わっ!?　な、撫でてもらえるなんて！　が、頑張った甲斐がありました！','えへへ……全力で嬉しいです！'],t:['はいっ！　なんでしょう！','わわっ！　び、びっくりしました！'],m:['あの、あの！　つつきすぎです！　でも全力で受け止めます！'],c:[['ひゃっ!?　あ、あの、そ、そこは……！','わっ……!?　い、今のは……矢印の付け間違いみたいなものですよね!?'],['二回目は……さすがに全力で怒ります！'],['……振興会に、正式に抗議します。']]},
maron:{h:['……えへへ。今日のあなたは、かすみ草みたいにやさしいね。','撫でられると、ひなたぼっこしてる気分になるの……。'],t:['……ん？　呼んだ？','わ……びっくりした。お花、落とすとこだった。'],m:['そんなにつつくと……茎みたいに、折れちゃうよ……？'],c:[['ひゃっ……!?　あ、あの……そこは……。','……っ。いまのは……見なかったことにするね。'],['二回目は……弟切草をあげる。花言葉は「恨み」。'],['……もう、お花選んであげない。']]},
yui:{h:['……なんですか急に。撫でても、話は最後まで聞きますよ。','はいはい、撫でたいなら撫でてください。……照れますけど。'],t:['はい、なんですか？','わっ。本を落とすところでしたよ、もう。'],m:['つつきすぎです。ツッコミ待ちですか？'],c:[['ひゃっ!?　ちょ、ちょっと、どこ触ってるんですか！','……っ。今のは、さすがにツッコミじゃ済みませんよ？'],['二回目はアウトです。真剣に怒りますからね。'],['……出入り禁止です。この店にも、私にも。']]},
shizuku:{h:['お、撫でるの？　……いい画です、今の。撮っとけばよかった。','わ、これ好きかも。もう一回いいですか？'],t:['はい？　何か撮ってほしいものあります？','わっ、カメラ揺れた！　びっくりしました。'],m:['つつきすぎです。手ブレ補正でも追いつきませんよ？'],c:[['ひゃっ!?　ちょ、どこ触ってるんですか！','……っ。今のは、カメラ回ってなくてよかったです。'],['二回目は、証拠映像として残しますね。'],['……しばらく、撮影協力しません。']]},
suiran:{h:['……あら。撫でるなら、もう少し丁寧になさい。','ふふ、茶葉占いには出ていなかったわね、これは。'],t:['なに？　お茶のおかわり？','っ……驚かせないで。お湯、こぼすところだったわ。'],m:['しつこいわね。苦いお茶を淹れてあげましょうか？'],c:[['……っ!?　どこを触っているの。','……今のは、見逃してあげる。一度だけよ。'],['二度目は、その顔に熱いお茶ね。'],['……出ていって。しばらく店の敷居をまたがないで。']]},
kyoko:{h:['……何？　取材の見返りのつもり？　……まあ、受け取っておくわ。','撫でられるなんて、記事にもできないわね。'],t:['なに？　ネタ持ってきた？','っと、急に触らないで。メモ落としたでしょ。'],m:['しつこいわね。あなたのこと、記事にするわよ？'],c:[['っ……!?　どこ触ってるの。','……今のは、オフレコにしておいてあげる。'],['二度目は、一面記事にするわよ。'],['……最低。今後一切、取材協力しないから。']]},
cocoa:{h:['……お、お客様、それはオプションに含まれておりません♪　……で、でも、まあ。','撫でんなし。……べつに、嫌とは言ってないけど。'],t:['はい♪　ご注文はお決まりですか？','っ……なに。急に触んないで。'],m:['つつきすぎ。笑顔、もう営業終了だから。'],c:[['ひゃっ!?　お、お客様!?　お触りは厳禁です……！','……っ、今のは聞かなかったことにしたげる。今回だけ。'],['二回目は出禁ね。マジで。'],['……最低。もう二度とおかえりなさいって言わない。']]},
mai:{h:['あら、撫でてくれるの？　旅先で優しくされると、弱いのよね。','ふふ、悪くないわ。もう少しだけ、このままでいて。'],t:['なあに？　次の旅の相談？','ひゃっ、くすぐったい！　踊りの途中なら転んでたわよ。'],m:['もう、しつこい。そんなに構ってほしいの？'],c:[['きゃっ!?　ど、どこ触ってるの、もう！','……っ。今のは、旅の恥はかき捨てってことにしてあげる。'],['二回目は、さすがに怒るわよ？'],['……次の町に、ひとりで行こうかしら。']]},
luna:{h:['……なに。撫でるとか、柄じゃないんだけど。……もう少しなら、いい。','……ふん。悪くないメロディーね、これ。'],t:['……何。用ないなら黙ってて。','っ、急に触んないで。音外すとこだった。'],m:['しつこい。アンコールはないから。'],c:[['っ……!?　どこ触ってんの。','……今のは、なかったことにしてやる。'],['二回目は、マイクで殴る。'],['……最低。もうあんたのために歌わない。']]},
makoto:{h:['……何のつもり？　撫でても予算は増えないわよ。','……ふう。まあ、疲れていたのは事実ね。少しだけなら。'],t:['何？　報告書の件？','っ……驚かせないで。書類が散らばったじゃない。'],m:['つつく暇があるなら、報告書を出しなさい。'],c:[['……っ!?　どこを触っているの。','……今のは、記録には残さないでおくわ。'],['二度目は、正式に懲戒の手続きを取るわよ。'],['……あなたの予算、全額カットね。']]},
fumika:{h:['あら……撫でられるなんて、物語の中の出来事みたいです。','ふふ、こういう場面、昔の小説によく出てきますね。'],t:['はい、何か調べものですか？','きゃっ……。本を落とすところでした。'],m:['そんなにつつかれると、栞の場所を見失ってしまいます……。'],c:[['きゃっ……!?　そ、そこは……いけません……！','……っ。い、今のは、読み飛ばしたことにします……。'],['二度目は、物語でも許されませんよ……？'],['……しばらく、図書館には来ないでください。']]},
ena:{h:['わ、撫でてくれるの？　……拍手より、ちょっと嬉しいかも。','えへへ、ショーのあとのご褒美みたい。'],t:['はーい！　呼んだ？','わっ、びっくり！　台本飛んじゃうとこだった！'],m:['もー、つつきすぎ！　お客さん、マナーは守ってね？'],c:[['ひゃっ!?　ちょ、ちょっと、どこ触ってるの!?','わっ……!?　い、今のはアドリブってことにしとく！'],['二回目は、ショー中止です！'],['……退場。もう出禁ね。']]},
akane:{h:['わっ、頭なでた？　へへ、照れるなあ。','ありがと！　なでなでされると、もうひと頑張りできそう！'],t:['ん？　呼んだ？　何かあった!?','わっ、びっくりした！　防災訓練かと思った。'],m:['つつきすぎ！　体動かしたいなら、一緒に走る？'],c:[['ひゃっ!?　ちょ、どこ触ってるの！','わっ……!?　い、今のは事故ってことにしとく！　事故ね!?'],['二回目は事故じゃない！　本気で投げ飛ばすよ？'],['……最低。しばらく市役所にも来ないで。']]},
reina:{h:['……撫でる必要はありません。……ですが、止めはしません。','……任務の合間なら、少しだけ。'],t:['はい。調査の件ですか。','っ……背後から触れないでください。反射で構えます。'],m:['しつこいです。現場なら置いていきますよ。'],c:[['……っ!?　どこに触れているんですか。','……今のは、不問にします。一度だけです。'],['二度目は、容赦しません。'],['……軽蔑します。しばらく、任務以外で話しかけないでください。']]},
aoi:{h:['……撫でられると、心拍数が少し上がります。……観測結果です。','ふふ、これは……標準偏差の外かもしれません。'],t:['はい。何か資料が必要ですか？','ひゃっ……。い、今のは予測していませんでした。'],m:['つつく回数が有意に多いです。……理由を聞いても？'],c:[['ひゃっ……!?　ど、どこを触って……！','……っ。い、今のデータは、削除しておきます……。'],['二回目は、明確に意図的です。……怒っています。'],['……しばらく、解析の手伝いはしません。']]},
chinatsu:{h:['あら、撫でてくれるの？　ふふ、いつもと逆ね。','えらいえらいって、言われる側も悪くないわね。'],t:['なあに？　困ったことでもあった？','きゃっ。もう、びっくりさせないで。'],m:['もう、甘えん坊ね。そんなにつつかなくても話は聞くわよ。'],c:[['きゃっ……!?　こら、どこ触ってるの。','……っ。今のは、なかったことにしてあげる。'],['二回目は、さすがにお説教よ？'],['……ちょっと見損なったわ。しばらく距離を置かせて。']]},
nagi:{h:['……。……もう少し、続けて。','……撫でられるの、嫌いじゃない。'],t:['……なに。','……驚いた。気配、消さないで。'],m:['……しつこい。'],c:[['……っ!?　……どこ、触ってるの。','……今のは、聞かなかったことにする。'],['……次は、ない。'],['……もう、話さない。']]},
saki:{h:['……撫でるの？　……言葉より、伝わる。','……ユズには、内緒。'],t:['……何。','……驚いた。'],m:['……しつこい。'],c:[['っ……!?　……どこ、触ってる。','……今のは、歌詞にもしない。'],['……二度目。……許さない。'],['……あんたのための言葉は、もうない。']]},
yuzu:{h:['わっ！　なでなでされた！　お姉ちゃんにはされたことないのに！','えへへ、テンション上がる！　もう一回！'],t:['なになに？　セッションする？','わっ!?　びっくりした！　ビート飛んだじゃん！'],m:['つつきすぎ！　フロウ乱れるからやめて〜！'],c:[['ひゃっ!?　ちょ、どこ触ってんの！','わっ……!?　い、今のはノーカン！　ノーカンね!?'],['二回目はアウト！　お姉ちゃん呼ぶよ!?'],['……最低。お姉ちゃんにも全部言うから。']]},
anzu:{h:['わ、なでなで？　えへへ、疲れ取れるかも。','あんたの手、あったかいね。……ちょっと照れる。'],t:['ん？　どしたの？','わっ、びっくりした！　ネイル乾く前だったら大惨事だよ？'],m:['つつきすぎ〜！　指先固くなってるよ、あんた。'],c:[['ひゃっ!?　ちょ、どこ触ってんの！','わっ……!?　い、今のは見なかったことにしたげる！'],['二回目はダメ。あげは師匠に言いつけるよ？'],['……最低。もう手、見てあげない。']]},
reiko:{h:['あら……撫でられる側になるなんて、何年ぶりかしら。','ふふ、甘えるのは苦手なのよ。……でも、少しだけ。'],t:['なあに？　お水、持ってきましょうか？','あら、驚いた。急に触るものじゃないわよ。'],m:['もう、しつこい子ね。座ってなさい。'],c:[['……っ。あら、どこを触っているの。','……今のは、酔ってたってことにしてあげるわ。'],['二度目は、店から叩き出すわよ。'],['……出禁よ。ドックの敷居、二度とまたがないで。']]},
chiyo:{h:['あ……撫でられると、チョコが溶けるみたいにほっとします。','……ふふ、少し恥ずかしいです。'],t:['はい、なんでしょう？　試食ですか？','ひゃっ……。テンパリング中じゃなくてよかったです。'],m:['あ、あの……そんなにつつかれると、手元が……。'],c:[['ひゃっ……!?　あ、あの、そこは……！','……っ。い、今のは、見なかったことにします……。'],['二度目は……さすがに怒ります。本当です。'],['……もう、チョコは差し上げません。']]},
nazuna:{h:['あ……。撫でられるの、ちょっと嬉しいです。','……ふふ、椿先輩に見られたら、からかわれちゃいますね。'],t:['はい、なんでしょう？','ひゃっ……。びっくりしました。'],m:['そんなにつつかれると、メモが進みません……。'],c:[['ひゃっ……!?　ど、どこを触って……！','……っ。い、今のは、なかったことにします。'],['二度目は、だめです。私、決めたことは曲げませんから。'],['……しばらく、話しかけないでください。']]},
sena:{h:['お、撫でる？　髪のセット崩れるけど……まあ、許す。','ふふん、あたしに触れられるなんて光栄に思いなよ。'],t:['ん？　コーデの相談？','っと、急に触んないでよ。シルエット崩れる。'],m:['しつこい。似合わないことしないの。'],c:[['ひゃっ!?　ちょ、どこ触ってんの！','……っ、今のは撮影のアクシデントってことにしてあげる。'],['二回目はないでしょ。あたしの価値、下げないで。'],['……最低。スタイリングも、もうしてあげない。']]},
mizuki:{h:['お、撫でてくれるの？　へへ、もっと褒めてくれていいよ？','いいね、それ。リズム取りたくなる。'],t:['ん〜？　一緒に踊る？','わっ、びっくりした。ステップ踏み外すとこだったよ。'],m:['つつきすぎ。そんなに構ってほしいの？　かわいいね。'],c:[['ひゃっ!?　ちょっと、どこ触ってんの！','……っ、今のは振り付けにないんだけど!?'],['二回目は、さすがに笑えないよ？'],['……最低。もうレッスン来ないで。']]},
meru:{h:['ふぇ……なでなで、しあわせです……。','えへへ、はちみつより甘いかもです……。'],t:['はいっ、なんですか？','ひゃっ！　び、びっくりしましたぁ……。'],m:['つ、つつきすぎですぅ……配信で言いつけちゃいますよ……？'],c:[['ひゃああっ!?　ど、どこ触ってるんですかぁ！','……っ！　い、今のは……ゆ、夢だったことにします……！'],['に、二回目は……メルでも怒りますっ！'],['……もう、ハニーポットに来ないでください……。']]},
kagari:{h:['お、撫でてくれるの？　へへ、灯台磨いたご褒美ってことで。','職人の頭撫でるとか、変わってるね。……悪くないけど。'],t:['ん？　工具貸してほしいの？','わっ、びっくりした！　足場の上なら落ちてたよ。'],m:['つつきすぎ！　点検するなら灯台にしてよ。'],c:[['ひゃっ!?　ちょ、どこ触ってんの！','……っ、今のは手元が狂ったってことにしとく！'],['二回目は、レンチ持ち出すよ？'],['……最低。灯台にも近づかないで。']]},
chihiro:{h:['あら……撫でてくれるの？　ふふ、ありがとう。','咲くのを待ってもらってる蕾の気分ね。'],t:['なあに？　お花、選びましょうか？','あら、驚いた。花ばさみ持ってるから気をつけてね。'],m:['ふふ、そんなに急かしても、花は開かないわよ？'],c:[['……あら。どこを触っているのかしら。','……今のは、見なかったことにしてあげるわね。'],['二度目は、さすがに怒りますよ。'],['……まろんちゃんにも、近づかないでちょうだい。']]},
karen:{h:['お、撫でてくれるの？　ははっ、いい波来たね。','照れるじゃん。……でも、ありがと。'],t:['ん？　サーフィンやる？','わっ、びっくりした！　ボード落とすとこだった。'],m:['つつきすぎ！　乗れない波は見送るもんだよ？'],c:[['ひゃっ!?　ちょ、どこ触ってんの！','……っ、今のは波に流されたってことにしとくよ。'],['二回目は、海に投げ込むよ？'],['……最低。しばらく店に来ないで。']]},
miyabi:{h:['……まあ。殿方に髪を撫でられるなど、何年ぶりでしょう。','……今日だけですよ。……ふふ。'],t:['はい、何か御用でしょうか。','……驚きました。急に触れるのは、無作法ですよ。'],m:['いけません。そうしつこいのは、品がありませんよ。'],c:[['……っ!?　どこに触れておいでですか。','……今のは、見なかったことにいたします。一度きりですよ。'],['二度目は、宵星亭の敷居をまたがせません。'],['……お引き取りください。']]},
sanae:{h:['あらあら……撫でてもらうなんて、くすぐったいですね。','ふふ、いろはにはいつもしてあげる側なんですよ。'],t:['はい、なんでしょう？　おかわりですか？','あら、びっくりしました。お玉、落とすところでした。'],m:['もう……そんなにつつかれたら、困ってしまいます。'],c:[['きゃっ……!?　あ、あの……そこは……。','……っ。い、今のは、なかったことにしますね……。'],['二度目は……さすがに怒りますよ……？'],['……しばらく、お店に来ないでくださいね。']]},
kurumi:{h:['わっ、撫でてもらえるなんて！　キャラの気持ちが分かります！','えへへ、イベント明けの疲れが飛びました！'],t:['はい！　衣装見ます!?','ひゃっ！　縫い針持ってたら刺さってましたよ!?'],m:['つつきすぎです！　撮影はルールを守ってくださいね！'],c:[['ひゃっ!?　ど、どこ触ってるんですか！','……っ！　カメコさんでもそれはアウトです……！'],['二回目は、スタッフ呼びますよ！'],['……出禁です。イベントにも来ないでください。']]},
ritsu:{h:['……撫でるの？　……いい音がする手だね。','……ふふ。こういう沈黙も、悪くない。'],t:['……ん、何？','……驚いた。今の、ノイズみたいだった。'],m:['……しつこいね。ボリューム、絞ってくれる？'],c:[['……っ!?　どこ、触ってるの。','……今のは、オンエアしないでおく。'],['……二度目は、本気で怒るよ。'],['……もう、あなたの声は聴かない。']]},
towa:{h:['あ……撫でられると、古着みたいにほつれがほどけます。','えへへ……ちょっと、照れます。'],t:['あ、はい……何か探してます？','ひゃっ……。びっくりしました……。'],m:['あの……そんなにつつくと、話が止まらなくなりますよ……？'],c:[['ひゃっ……!?　あ、あの、そこは……。','……っ。い、今のは、見なかったことに……。'],['二回目は……セナに言いますよ……？'],['……もう、お店に来ないでください。']]},
yuriko:{h:['まあ……私を撫でるなんて、勇気がおありですのね。','……ふふ、悪い気はしませんわ。'],t:['はい、何かご用件ですの？','あら、驚きましたわ。急に触れるものではなくてよ。'],m:['しつこいですわね。朱音さんでもそこまではしませんわよ。'],c:[['……っ!?　どこに触れていらっしゃるの！','……今のは、不問にいたしますわ。一度きりですわよ。'],['二度目は、市役所の正式な手続きで処分いたしますわ。'],['……お引き取りくださいまし。']]},
natsume:{h:['……あら。撫でられるのは、生き物たちの特権だと思ってたわ。','……ふふ、静かにね。悪くないから。'],t:['なあに？　閉館後の見学？','……驚いた。水槽の前では静かにね。'],m:['しつこいと、この子たちも驚いちゃうわよ。'],c:[['……っ!?　どこを触っているの。','……今のは、見なかったことにしてあげる。'],['二度目は、水槽に放り込むわよ？'],['……出ていって。しばらく来ないでちょうだい。']]},
hotaru:{h:['あ……撫でられると、こと座のベガみたいに、ほわっとします。','ふふ……星の話じゃなくて、ごめんなさい。嬉しいです。'],t:['はい？　星座の話ですか？','ひゃっ……。暗いドームの中なら、悲鳴あげてました。'],m:['そんなにつつかれると、流れ星みたいに逃げちゃいますよ……？'],c:[['ひゃっ……!?　あ、あの、そこは……！','……っ。い、今のは、星の見間違いってことに……。'],['二回目は……さすがに怒ります。'],['……もう、プラネタリウムに来ないでください。']]},
minori:{h:['わっ、撫でてくれるの？　今の光、撮っとけばよかった！','えへへ、いいね、これ！'],t:['ん？　いい景色見つけた？','わっ、びっくりした！　シャッター押しちゃったじゃん！'],m:['つつきすぎ！　ピンボケになるってば〜！'],c:[['ひゃっ!?　ちょ、どこ触ってんの！','……っ、今のはピンボケってことにしといてあげる！'],['二回目は、カメラで殴るよ？'],['……最低。もう一緒に撮影行かない。']]},
ichika:{h:['わっ、なでなで！　えへへ、いちごも喜ぶかな？','うれしい！　もっと撫でてもいいよ？'],t:['なになに？　いちご食べる？','わっ、びっくりした！　いちご潰しちゃうとこだった！'],m:['つつきすぎ〜！　いちごだって傷んじゃうよ！'],c:[['ひゃっ!?　ちょ、ちょっと、どこ触ってるの!?','わっ……!?　い、今のは……ハウスの中が暑かったせい!?'],['二回目はダメ！　ほんとに怒るよ！'],['……もう、いちご狩りに連れていかない。']]},
juri:{h:['お、撫でんの？　へへ、あたし撫で心地いいっしょ？','悪くないじゃん。あと十秒ね。'],t:['ん〜？　なんか光るもん持ってる？','わっ、びっくりした！　ネックレス引っかけるとこだった！'],m:['つつきすぎ！　冴子おばさん呼ぶよ？'],c:[['ひゃっ!?　ちょ、どこ触ってんの！','……っ、今のは見なかったことにしたげる。貸しね。'],['二回目は冴子おばさんに言う。マジで怖いよ？'],['……最低。もう遊んであげない。']]},
saeko:{h:['あらあら、撫でてくれるの？　若い子は大胆ねえ。','ふふ、いい光の当て方ね。悪くないわ。'],t:['なあに？　指輪でも探してる？','あら、驚いた。ルーペ落とすところだったわ。'],m:['しつこいわねえ。ジュリでもそこまでしないわよ。'],c:[['……あら。どこを触っているのかしら。','……今のは、お世辞として受け取っておくわ。一度だけね。'],['二度目は、店から出ていってもらうわよ。'],['……出入り禁止ね。ジュリにも近づかないで。']]},
kaori:{h:['……あら。撫でられると、喉の力が抜けていくわ。','ふふ、本番前なら困るけど……今はいいわ。'],t:['なあに？　リハーサル、見に来たの？','っ……驚いた。声が裏返るところだったわ。'],m:['しつこいわね。静かにしていたいって言ったでしょう？'],c:[['……っ!?　どこを触っているの。','……今のは、聞かなかったことにしてあげる。'],['二度目は、許さないわよ。'],['……出ていって。楽屋にはもう入れないわ。']]},
rui:{h:['……え、なに。撫でんの？　……べ、別にいいけど。','……ふーん。悪くないじゃん。'],t:['なに？　締め切りの話はやめてね。','っ、びっくりした！　ペン入れ中だったら殺してたよ？'],m:['しつこい。はるかみたいなことしないで。'],c:[['ひゃっ!?　ちょ、どこ触ってんの！','……っ、今のは、ネームのボツってことにしといてあげる。'],['二回目はないでしょ。マジで。'],['……最低。もう原稿見せない。']]},
suzune:{h:['なっ……撫でるなんて、隙だらけだったってこと!?　……もう。','……べ、別に、嬉しくなんかないから。……少しだけよ。'],t:['なに？　稽古の相手してくれるの？','っ！　背後を取るなんて、やるじゃない。'],m:['しつこい！　型の練習台にするわよ！'],c:[['ひゃっ!?　ど、どこ触ってるのよ！','……っ、今のは、隙を見せた私が悪い……ってことにしてあげる。'],['二回目は、本気で打つわよ。'],['……最低。二度と稽古場に来ないで。']]},
chikage:{h:['あら……撫でてもらうなんて、子どもたちみたいですね。','ふふ、たまには撫でられる側もいいものですね。'],t:['はい、どうしました？','あら、びっくりしました。'],m:['もう、そんなにつつかなくても、ちゃんと聞いていますよ。'],c:[['きゃっ……!?　ど、どこを触っているんですか。','……っ。今のは、なかったことにしましょうね。'],['二度目は、先生でも怒りますよ？'],['……しばらく、反省していてください。']]},
sumire:{h:['……まあ。撫でていただけるなんて、身に余ります。','……ふふ。館では、誰もこうしてはくれませんでした。'],t:['はい、何か御用でしょうか。','……っ。驚きました。鍵束、落とすところでした。'],m:['あの……そんなにつつかれますと、お仕事に障ります。'],c:[['ひゃっ……!?　そ、そちらは……いけません……！','……っ。今のは、見なかったことにいたします。'],['二度目は、さすがにお暇をいただきます。'],['……館の扉は、もう開けません。']]},
wakaba:{h:['ひゃ……な、撫でられるの、初めてかもしれないです……。','……う、うれしい、です。……小さい声でごめんなさい。'],t:['は、はいっ……な、なんでしょう……。','ひゃっ……！　び、びっくりしました……。'],m:['あ、あの……つ、つつきすぎです……。'],c:[['ひゃああっ……!?　あ、あの、そ、そこは……！','……っ。い、今のは……投稿されなかったことに……。'],['に、二回目は……番組で、言っちゃいますよ……？'],['……もう、お便り、読んであげません……。']]},
mitsuki:{h:['あら……撫でていただけるなんて。機内では考えられなかったわ。','ふふ、少しだけ肩の力が抜けました。'],t:['はい、ご案内しましょうか？','あら、驚いたわ。スカーフが曲がるところだった。'],m:['しつこいお客様には、少し距離を置かせていただきますね。'],c:[['……っ!?　お客様、どちらに触れていらっしゃいますか。','……今のは、乱気流のせいということにしておきますね。'],['二度目は、到着後に然るべき対応をいたします。'],['……ご搭乗は、お断りいたします。']]},
komugi:{h:['ふぁ……撫でられるの、気持ちいいねぇ……眠くなってきちゃう。','えへへ、絵本のくまさんになった気分。'],t:['ん〜……？　なぁに？','わぁ、びっくりしたぁ。絵の具こぼすとこだったよぉ。'],m:['そんなにつつかれたら、お話が進まないよぉ……。'],c:[['ひゃぁっ!?　ど、どこ触ってるのぉ……！','……っ。い、今のは……夢の中のお話ってことにするね……。'],['二回目は……さすがに怒るよぉ？'],['……もう、絵本読んであげない。']]},
haruka:{h:['あら、撫でてくれるの？　いつも人の背中押してばっかりだから、嬉しいわ。','ふふ、段取りにない展開ね。悪くないわ。'],t:['なあに？　何か相談？','きゃっ。段取り表、落としちゃったじゃない。'],m:['もう、しつこいわね。るいみたいなことしないの。'],c:[['きゃっ……!?　ちょ、どこ触ってるの！','……っ。今のは、なかったことにしてあげるわ。'],['二度目は、さすがに怒るわよ？'],['……最低。結婚式にも呼んであげない。']]},
kirie:{h:['……撫でるの。……いいけど。','……鍵みたいに、ほどける。'],t:['……何。','……驚いた。'],m:['……しつこい。'],c:[['っ……!?　……どこ、触ってる。','……今のは、鍵をかけて忘れる。'],['……二度目は、ない。'],['……工房の鍵、二度と開けない。']]},
urara:{h:['おっ、撫でてくれんの？　あはは、照れるねえ！','いいねえ、たまには甘えるのも悪くない！'],t:['あいよ、何にする？','わっ、びっくりした！　だし巻き焦がすとこだったよ！'],m:['つつきすぎだよ！　とまり木から叩き出すよ？'],c:[['ひゃっ!?　ちょっと、どこ触ってんのさ！','……っ、今のは酔っ払いの手元ってことにしとくよ！'],['二回目はないよ。本気で怒るからね！'],['……出禁だよ。とまり木の暖簾、二度とくぐらせない。']]},
mizore:{h:['……なに。撫でるとか、映画なら安っぽい演出よ。……悪くないけど。','……ふん。エンドロールまでなら、いいわ。'],t:['何？　上映時間の確認？','っ、びっくりした。ポップコーンこぼすとこだった。'],m:['しつこい。上映中はお静かに。'],c:[['っ……!?　どこ触ってんの。','……今のは、カットされたシーンってことにしてあげる。'],['二回目は、劇場から叩き出す。'],['……最低。もう二度と映画の話、しないから。']]},
ayane:{h:['わ、撫でてくれるんですか？　えへへ、嬉しいです！','ちょっと照れますね……。ありがとうございます。'],t:['はい、なんですか？　ケース見ます？','ひゃっ！　パーツが散らばるところでした！'],m:['つつきすぎです〜！　ちよさんに言いつけますよ？'],c:[['ひゃっ!?　ど、どこ触ってるんですか！','……っ。い、今のは、なかったことにします……！'],['二回目は、さすがに怒りますよ！'],['……もう、ケース作ってあげません。']]},
arisa:{h:['あら、撫でてくれるの？　カーテンコールのご褒美みたいね。','ふふ、悪くないわ。もう少しだけ。'],t:['なあに？　ショーを見に来たの？','きゃっ。衣装のスパンコールが取れちゃうわよ。'],m:['しつこいわね。舞台の上ならつまみ出されてるわよ？'],c:[['きゃっ!?　ちょっと、どこ触ってるの！','……っ。今のは、演出の失敗ってことにしてあげる。'],['二度目は、ショーから降りてもらうわ。'],['……最低。もう、あなたのために踊らない。']]},
kotoha:{h:['……撫でるの？　……布を撫でるみたいに、やさしいのね。','……悪くない。'],t:['……何？　採寸？','……驚いた。針、刺さるところだった。'],m:['……しつこい。裁ちばさみ、持ってるのよ。'],c:[['っ……!?　……どこ、触ってるの。','……今のは、見なかったことにする。'],['……二度目は、裁ちばさみの出番ね。'],['……もう、あなたの服は仕立てない。']]},
yukino:{h:['わっ、撫でてくれるの？　旅先でこういうの、記事にしたくなっちゃう。','えへへ、悪くないね。メモしとこ。'],t:['ん？　何か取材ネタ？','わっ、びっくりした！　時刻表落とすとこだった！'],m:['つつきすぎ！　乗り遅れちゃうよ？'],c:[['ひゃっ!?　ちょ、どこ触ってんの！','……っ、今のは、取材メモには書かないでおくね。'],['二回目は、記事にして全国に晒すよ？'],['……最低。次の列車で帰る。']]},
nene:{h:['わわっ、撫でてもらえるなんて！　が、頑張ったご褒美ですか!?','えへへ……段取り、間違えなかった甲斐がありました！'],t:['はいっ！　何かご指示ですか!?','ひゃっ！　段取り表、落としました……！'],m:['あの、あの、つつきすぎです〜！　段取りが崩れます〜！'],c:[['ひゃああっ!?　ど、どこ触ってるんですか!?','わっ……!?　い、今のは段取りの確認ミスってことに……！'],['二回目は、百合子課長に報告します！'],['……もう、試験点灯に呼びません。']]},
miyu:{h:['え……撫でてもらえるんですか？　……役じゃない私でも、嬉しいです。','ふふ、撮影の待ち時間が、ちょっと楽しくなりました。'],t:['はい、なんでしょう？　台本の読み合わせですか？','ひゃっ……。びっくりしました、NGになっちゃいます。'],m:['あの……そんなにつつかれると、役に戻れなくなっちゃいます。']},
yukari:{h:['……撫でるの。……銀を磨くときみたい。','……悪くない。'],t:['……何。','……驚いた。'],m:['……しつこい。'],c:[['っ……!?　……どこ、触ってる。','……今のは、なかったことにする。'],['……二度目は、ない。すみれにも言う。'],['……もう、工房に来ないで。']]}
});

function homeTouchReact(zone){
 const id=lobbySelected;
 let set=HOME_TOUCH_LINES[id];
 if(!set){const ls=(isHero(id)?homeWords(id):PEOPLE[id]?.lines)||[];set=/です|ます|ません|でしょう/.test(ls.join(''))?HOME_TOUCH_LINES.polite:HOME_TOUCH_LINES.casual;}
 const own=HOME_TOUCH_BY_ID[id];
 let downgraded=false;
 if(own&&zone==='chest'&&!own.c){zone='tap';downgraded=true;} // 制服姿の役衣装のキャラは胸の反応を出さない
 if(own&&zone!=='chest'){
  const pool2=zone==='head'?own.h:zone==='many'?own.m:own.t;
  const key2=id+':'+zone;let k2=Math.floor(Math.random()*pool2.length);
  if(pool2.length>1&&k2===homeTouchLast[key2])k2=(k2+1)%pool2.length;
  homeTouchLast[key2]=k2;homeTouchLine=pool2[k2];
  if(view==='home')render();
  return downgraded?-1:0;
 }
 if(zone==='chest'){
  const now=Date.now();homeChestCount=(now-homeChestAt<10000)?homeChestCount+1:0;homeChestAt=now;
  const tone=HOME_TOUCH_CHEST[id]?id:(set===HOME_TOUCH_LINES.polite?'polite':'casual');
  const steps=own&&own.c?own.c:HOME_TOUCH_CHEST[tone],stage=Math.min(homeChestCount,steps.length-1),cpool=steps[stage];
  let cl=cpool[Math.floor(Math.random()*cpool.length)];
  if(isHero(id))cl=cl.replaceAll('責任者さん',heroCall(id));
  homeTouchLine=cl;homeTouchStage=stage;
  if(view==='home')render();
  return stage;
 }
 const pool=set[zone]||set.tap;
 const key=id+':'+zone;let k=Math.floor(Math.random()*pool.length);
 if(pool.length>1&&k===homeTouchLast[key])k=(k+1)%pool.length;
 homeTouchLast[key]=k;
 let line=pool[k];
 if(isHero(id))line=line.replaceAll('責任者さん',heroCall(id));
 homeTouchLine=line;
 if(view==='home')render();
}
function lobbyTalk(){homeTouchLine=null;const lines=isHero(lobbySelected)?homeWords(lobbySelected):PEOPLE[lobbySelected].lines;lobbyLine=(lobbyLine+1)%lines.length;if(view==='home')render()}
let homePickerOpen=false;
function toggleHomePicker(){homePickerOpen=!homePickerOpen;if(view==='home')render()}
function openHomeCharacterDetail(){const u=UNITS.find(u=>u.person===lobbySelected&&data(u.id)&&visibleUnitV026(u));if(u){S.selected=u.id;change('unit')}else change('roster')}
// Home UI read-only progression summary; does not write to the save.
function homeProgressSummary(){
 const completed=QUESTS.filter(q=>S.quests[q.id]?.complete).length;
 const next=QUESTS.find(q=>!S.quests[q.id]?.complete&&questSheetAction(q).kind!=='locked')||null;
 const owned=UNITS.filter(u=>data(u.id)&&heroV0690Visible(u.person,S));
 return {completed,total:QUESTS.length,next,owned:owned.length,trainable:owned.filter(canTrainUnit).length};
}
function homeGoToNextQuest(id){
 const q=QUEST_BY_ID[id];if(!q)return change('city');
 selectedQuestMapChapter=q.chapter;
 change('city');openQuestSheet(q.id);
}
// Ver.0.30.1.1: presentation-only home redesign based on supplied finished mockup.
// UI state intentionally lives outside S: the persistent save schema is unchanged.
let homeBannerIndex=0,homeNoticeOpen=false,homeMenuOpen=false,homeTouchX=null;
const HOME_NEWS=Object.freeze([
 {kind:'お知らせ',date:'2026/10/21',title:'ホーム画面のデザインを更新しました。'},
 {kind:'お知らせ',date:'2026/10/21',title:'編成・育成・募集の画面が新しくなりました。'},
 {kind:'メンテナンス',date:'2026/10/21',title:'BGMの重複再生を防ぐ修正を適用しました。'}
]);
function homeNoticeRead(){try{return localStorage.getItem('yoiboshi_home_news_read_v03010')==='1'}catch(_){return false}}
function showHomeNotice(){homeNoticeOpen=true;homeMenuOpen=false;try{localStorage.setItem('yoiboshi_home_news_read_v03010','1')}catch(_){}render()}
function hideHomeNotice(){homeNoticeOpen=false;render()}
function toggleHomeMenu(){homeMenuOpen=!homeMenuOpen;homeNoticeOpen=false;render()}
function homeBanners(next){
 const active=['chapter4_city','chapter3_port','kaede','kaname','erika','tsubaki','lighthouse','seaside','school_new','station','oldcafe','shinonome'].filter(group=>pickupActive(group));
 const pick=active[0];
 const remaining=pick?PICKUP_DAYS-(S.love.day-S.pickupStartDay[pick]):0;
 const cards=[];
 if(pick){cards.push({tag:'開催中',title:'期間限定ピックアップ',note:`ゲーム内あと${remaining}日`,sub:'新たな出会いへ',action:"change('gacha')",style:'pickup'});}
 cards.push({tag:'募集中',title:'星に願う、新しい出会い',note:'通常募集',sub:'仲間との契約を結ぶ',action:"change('gacha')",style:'recruit'});
 if(next)cards.push({tag:'次の依頼',title:next.name,note:next.id.toUpperCase(),sub:'宵星市の調査を続ける',action:`homeGoToNextQuest('${next.id}')`,style:'quest'});
 cards.push({tag:'交流',title:'大切な人とのひととき',note:'絆エピソード',sub:'想いを重ねる時間',action:"change('talk')",style:'bond'});
 return cards;
}
function homeBannerMove(delta){homeBannerIndex=(homeBannerIndex+delta+homeBanners(homeProgressSummary().next).length)%homeBanners(homeProgressSummary().next).length;render()}
function homeBannerSelect(index){homeBannerIndex=index;render()}
function homeBannerTouchStart(event){homeTouchX=event.touches?.[0]?.clientX??null}
function homeBannerTouchEnd(event){if(homeTouchX===null)return;const distance=(event.changedTouches?.[0]?.clientX??homeTouchX)-homeTouchX;homeTouchX=null;if(Math.abs(distance)>35)homeBannerMove(distance<0?1:-1)}
function homeNewsMarkup(){return HOME_NEWS.map(n=>`<div class="mock-news-line"><span class="mock-news-tag ${n.kind==='メンテナンス'?'maintenance':n.kind==='イベント'?'event':''}">${esc(n.kind)}</span><time datetime="${n.date.replace(/\//g,'-')}">${n.date.slice(5)}</time><span class="mock-news-title">${esc(n.title)}</span></div>`).join('')}
function home(){
 const members=homeMembers();
 if(!members.includes(lobbySelected)){lobbySelected=members.includes(S.homeFavorite)?S.homeFavorite:(members.includes('momoka')?'momoka':(members[0]||'momoka'));lobbyLine=0;}
 const who=PEOPLE[lobbySelected],temporary=isConcept(lobbySelected);
 const featured=homeUnit(lobbySelected),fullScene=!!featured&&unitHasScene(featured),homeArt=featured?unitArt(featured,'scene'):characterPortrait(lobbySelected);
 const progress=homeProgressSummary(),next=progress.next;
 const banners=homeBanners(next);homeBannerIndex=Math.min(homeBannerIndex,banners.length-1);
 const banner=banners[homeBannerIndex];
 const lines=isHero(lobbySelected)?homeWords(lobbySelected):who.lines;
 const phrase=homeTouchLine||lines[lobbyLine%lines.length]||'';
 const cardTitle=featured?.title||'ホームイラスト';
 const roman=(who.roman||who.en||who.nameEn||({momoka:'Momoka',milku:'Milku'}[lobbySelected]||lobbySelected)).toString();
 const displayName=who.name.split(/[ 　]/).pop()||who.name;
 const chapter=Number(S.storyFlags?.chapter37_open?37:S.storyFlags?.chapter36_open?36:S.storyFlags?.chapter35_open?35:S.storyFlags?.chapter34_open?34:S.storyFlags?.chapter33_open?33:S.storyFlags?.chapter32_open?32:S.storyFlags?.chapter31_open?31:S.storyFlags?.chapter30_open?30:S.storyFlags?.chapter29_open?29:S.storyFlags?.chapter28_open?28:S.storyFlags?.chapter27_open?27:S.storyFlags?.chapter26_open?26:S.storyFlags?.chapter25_open?25:S.storyFlags?.chapter24_open?24:S.storyFlags?.chapter23_open?23:S.storyFlags?.chapter22_open?22:S.storyFlags?.chapter21_open?21:S.storyFlags?.chapter20_open?20:S.storyFlags?.chapter19_open?19:S.storyFlags?.chapter18_open?18:S.storyFlags?.chapter17_open?17:S.storyFlags?.chapter16_open?16:S.storyFlags?.chapter15_open?15:S.storyFlags?.chapter14_open?14:S.storyFlags?.chapter13_open?13:S.storyFlags?.chapter12_open?12:S.storyFlags?.chapter11_open?11:S.storyFlags?.chapter10_open?10:S.storyFlags?.chapter9_open?9:S.storyFlags?.chapter8_open?8:S.storyFlags?.chapter7_open?7:S.storyFlags?.chapter6_open?6:S.storyFlags?.chapter5_open?5:S.storyFlags?.chapter4_open?4:S.storyFlags?.chapter3_open?3:S.storyFlags?.chapter2_open?2:S.storyFlags?.chapter1_open?1:0);
 const stagePct=Math.round(progress.completed/Math.max(1,progress.total)*100);
 const cards=[['story','物語','STORY','✧',"change('story')"],['quest','クエスト','QUEST','⚔',"change('city')"],['contact','交流','COMMUNICATION','♡',"change('talk')"],['summon','募集','RECRUIT','✦',"change('gacha')"]];
 const units=UNITS.filter(u=>u.person===lobbySelected&&visibleUnitV026(u)&&data(u.id));
 return `<div class="home-v067 home-v0671 home-mock-v301" aria-label="宵星の契約者 ホーム画面">
  <section class="mock-hero ${fullScene?'mock-hero-scene':''}" aria-label="${esc(who.name)}のホーム">
   <div class="mock-harbor" aria-hidden="true"><span class="mock-harbor-sun"></span><span class="mock-harbor-quay"></span><span class="mock-harbor-light"></span><span class="mock-harbor-sea"></span></div>
   <img class="mock-character" src="${homeArt}" alt="${esc(who.name)}のホーム画像">
   <div class="mock-sky-wash" aria-hidden="true"></div>
   <div class="mock-spark spark-a" aria-hidden="true">✦</div><div class="mock-spark spark-b" aria-hidden="true">✧</div>
   <header class="mock-header">
    <div class="mock-top-row">
    <div class="mock-currency-row"><button type="button" class="mock-pill" onclick="change('gacha')" aria-label="星晶石 ${S.gems}。募集へ">✧ <b>${S.gems.toLocaleString()}</b><span>＋</span></button><button type="button" class="mock-pill" onclick="change('training')" aria-label="育成コイン ${S.gold}。育成へ">◆ <b>${S.gold.toLocaleString()}</b><span>＋</span></button><button type="button" class="mock-icon-button" aria-label="お知らせ" onclick="showHomeNotice()">✉${homeNoticeRead()?'':'<i class="mock-unread"></i>'}</button><button type="button" class="mock-icon-button" aria-label="メニュー" aria-expanded="${homeMenuOpen}" onclick="toggleHomeMenu()">▦</button></div></div>
    <div class="mock-profile mock-profile-picker" role="button" tabindex="0" onclick="toggleHomePicker()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleHomePicker()}" aria-label="ホームのキャラを変更" aria-expanded="${homePickerOpen}"><img src="${characterIcon(lobbySelected)}" alt="${esc(who.name)}の顔アイコン"><div><strong>宵星相談室</strong><small>${chapter===0?'序章':`第${chapter}章`}まで到達 · 依頼 ${progress.completed}/${progress.total}</small><div class="mock-exp-track" role="progressbar" aria-valuenow="${progress.completed}" aria-valuemin="0" aria-valuemax="${progress.total}"><i style="width:${stagePct}%"></i></div></div><span class="mock-profile-hint">♡ キャラ変更</span></div>
   </header>
   
   <div class="mock-handwritten" aria-hidden="true">${esc(displayName)}と、<br>今日も一緒に ♡</div>
   <button type="button" class="mock-dialogue" onclick="lobbyTalk()" aria-label="次のセリフへ"><span class="mock-dialogue-name">${esc(who.name)}</span><span class="mock-dialogue-text">${esc(phrase)}</span><span class="mock-dialogue-next" aria-hidden="true">⌄</span></button>
  <section class="mock-feature" aria-label="イベントと募集">
   <div class="mock-feature-card ${banner.style}" ontouchstart="homeBannerTouchStart(event)" ontouchend="homeBannerTouchEnd(event)"><span class="mock-feature-tag">${esc(banner.tag)}</span><div class="mock-feature-text"><strong>${esc(banner.title)}</strong><span>${esc(banner.sub)}</span><small>${esc(banner.note)}</small></div><button type="button" onclick="${banner.action}" aria-label="${esc(banner.title)}を開く">›</button></div>
   <div class="mock-dots" role="group" aria-label="バナー切り替え"><button class="mock-banner-prev" onclick="homeBannerMove(-1)" aria-label="前のバナー">‹</button>${banners.map((b,i)=>`<button class="${i===homeBannerIndex?'on':''}" aria-label="${i+1}枚目: ${esc(b.title)}" aria-pressed="${i===homeBannerIndex}" onclick="homeBannerSelect(${i})"></button>`).join('')}<button class="mock-banner-next" onclick="homeBannerMove(1)" aria-label="次のバナー">›</button></div>
  </section>
  </section>
  ${homeMenuOpen?`<nav class="mock-drawer" aria-label="その他のメニュー"><button onclick="change('roster')">編成 ›</button><button onclick="change('training')">育成 ›</button><button onclick="change('records')">記録・設定 ›</button><button onclick="openAchievements('home')">実績・報酬 ›</button><button onclick="toggleHomePicker()">お気に入り変更 ›</button><button onclick="openHomeCharacterDetail()">キャラクター詳細 ›</button></nav>`:''}
  ${units.length>1?`<div class="mock-unit-picker" aria-label="ホームのカード絵を選択">${units.map(u=>`<button type="button" class="${featured?.id===u.id?'active':''}" onclick="setHomeUnit('${u.id}')">${u.rarity} · ${esc(u.title)}</button>`).join('')}</div>`:''}
  ${homePickerOpen?`<section class="home-chooser mock-favorite-chooser"><div class="home-chooser-head"><strong>お気に入りキャラを選択</strong><button type="button" onclick="toggleHomePicker()">× 閉じる</button></div><div class="lobby-people home-favorites-rail">${members.map(p=>`<button type="button" class="lobby-face ${lobbySelected===p?'active':''}" aria-pressed="${lobbySelected===p}" onclick="lobbySwitch('${p}')"><img src="${characterIcon(p)}" alt=""><span>${esc(PEOPLE[p].name)}</span></button>`).join('')}</div></section>`:''}

  <section class="mock-shortcuts" aria-label="メインメニュー">${cards.map(([cls,title,en,ico,click])=>`<button type="button" class="mock-menu-card ${cls} home-picture-card ${cls==='quest'?'story':cls==='contact'?'contact':cls==='summon'?'summon':'form'}" onclick="${click}" aria-label="${title}へ移動"><span class="mock-menu-icon">${ico}</span><span class="mock-menu-title">${title}<small>${en}</small></span><span class="mock-menu-arrow">›</span></button>`).join('')}</section>
  ${hero74PendingQuestIds(S).length?`<section class="card pad hero74-home-meetings" aria-label="街で出会った人"><h3>街で出会った人</h3><p>まだ読んでいない出会いの場面をまとめて見られます（${hero74PendingQuestIds(S).reduce((n,qid)=>n+HERO74_ENCOUNTERS[qid].heroes.length,0)}人）。クリア済みのクエストと所持キャラの情報はそのまま残ります。</p><button type="button" class="btn primary" onclick="openStory('hero74_backlog')">出会いの記録を読む</button></section>`:''}
  ${teamRuleError()?`<button class="mock-team-warning" onclick="change('roster')">編成の見直しが必要です。編成画面へ ›</button>`:''}
  <section class="mock-news-area"><div class="mock-news-board"><div class="mock-news-header"><h2>♧ お知らせ</h2><button type="button" onclick="showHomeNotice()">もっと見る　›</button></div>${homeNewsMarkup()}</div>${homeAchievementCard()}</section>
  ${homeNoticeOpen?`<div class="mock-notice-overlay" role="dialog" aria-modal="true" aria-label="お知らせ一覧"><div class="mock-notice-sheet"><div class="mock-news-header"><h2>お知らせ</h2><button type="button" onclick="hideHomeNotice()">× 閉じる</button></div>${homeNewsMarkup()}</div></div>`:''}
 </div>`;
}

function questStage(q){const s=S.quests[q.id]||{clues:0,complete:false};return s.complete?'解決済み':s.clues===2?'鎮静作戦へ':s.clues?'調査中':'新着依頼'}
function questMapState(q){
 const st=S.quests[q.id]||{clues:0,complete:false};
 if(st.complete)return 'done';
 if(!questUnlocked(q))return 'locked';
 if(st.clues>=2)return 'battle';
 if(st.clues>=1)return 'active';
 return 'new';
}
function questUnlockReason(q){
  if(q.id==='q217'&&S.storyFlags?.chapter36_end&&!S.storyFlags?.chapter37_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q211'&&S.storyFlags?.chapter35_end&&!S.storyFlags?.chapter36_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q205'&&S.storyFlags?.chapter34_end&&!S.storyFlags?.chapter35_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q199'&&S.storyFlags?.chapter33_end&&!S.storyFlags?.chapter34_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q193'&&S.storyFlags?.chapter32_end&&!S.storyFlags?.chapter33_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q187'&&S.storyFlags?.chapter31_end&&!S.storyFlags?.chapter32_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q181'&&S.storyFlags?.chapter30_end&&!S.storyFlags?.chapter31_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q175'&&S.storyFlags?.chapter29_end&&!S.storyFlags?.chapter30_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q169'&&S.storyFlags?.chapter28_end&&!S.storyFlags?.chapter29_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q163'&&S.storyFlags?.chapter27_end&&!S.storyFlags?.chapter28_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q157'&&S.storyFlags?.chapter26_end&&!S.storyFlags?.chapter27_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q151'&&S.storyFlags?.chapter25_end&&!S.storyFlags?.chapter26_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q145'&&S.storyFlags?.chapter24_end&&!S.storyFlags?.chapter25_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q139'&&S.storyFlags?.chapter23_end&&!S.storyFlags?.chapter24_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q133'&&S.storyFlags?.chapter22_end&&!S.storyFlags?.chapter23_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q127'&&S.storyFlags?.chapter21_end&&!S.storyFlags?.chapter22_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q121'&&S.storyFlags?.chapter20_end&&!S.storyFlags?.chapter21_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q115'&&S.storyFlags?.chapter19_end&&!S.storyFlags?.chapter20_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q109'&&S.storyFlags?.chapter18_end&&!S.storyFlags?.chapter19_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q103'&&S.storyFlags?.chapter17_end&&!S.storyFlags?.chapter18_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q97'&&S.storyFlags?.chapter16_end&&!S.storyFlags?.chapter17_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q91'&&S.storyFlags?.chapter15_end&&!S.storyFlags?.chapter16_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q85'&&S.storyFlags?.chapter14_end&&!S.storyFlags?.chapter15_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q79'&&S.storyFlags?.chapter13_end&&!S.storyFlags?.chapter14_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q73'&&S.storyFlags?.chapter12_end&&!S.storyFlags?.chapter13_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q67'&&S.storyFlags?.chapter11_end&&!S.storyFlags?.chapter12_open)return '次の章の開幕を読むと解放されます。';
  if(q.id==='q61'&&S.storyFlags?.chapter10_end&&!S.storyFlags?.chapter11_open)return '第2部の開幕を読むと解放されます。';
  if(q.id==='q55'&&S.storyFlags?.chapter9_end&&!S.storyFlags?.chapter10_open)return '第10章の開幕を読むと解放されます。';
  if(q.id==='q49'&&S.storyFlags?.chapter8_end&&!S.storyFlags?.chapter9_open)return '第9章の開幕を読むと解放されます。';
  if(q.id==='q43'&&S.storyFlags?.chapter7_end&&!S.storyFlags?.chapter8_open)return '第8章の開幕を読むと解放されます。';
  if(q.id==='q37'&&S.storyFlags?.chapter6_end&&!S.storyFlags?.chapter7_open)return '第7章の開幕を読むと解放されます。';
  if(q.id==='q31'&&S.storyFlags?.chapter5_end&&!S.storyFlags?.chapter6_open)return '第6章の開幕を読むと解放されます。';
  if(q.id==='q25'&&S.storyFlags?.chapter4_end&&!S.storyFlags?.chapter5_open)return '第5章の開幕を読むと解放されます。';
  if(q.id==='q19'&&S.storyFlags?.chapter3_end&&!S.storyFlags?.chapter4_open)return '第4章の開幕を読むと解放されます。';
  if(q.chapter===4&&S.quests?.['q'+(Number(q.id.slice(1))-1)]?.complete){const before=CHAPTER4_MEET_ORDER['q'+(Number(q.id.slice(1))-1)]||[];if(before.some(id=>!S.chapter4Met?.[id]))return '前の依頼で出会った2人の出会いイベントを読んでください。';}
  if(q.id==='q13'&&S.storyFlags?.chapter2_end&&!S.storyFlags?.chapter3_open)return '第3章の開幕を読むと解放されます。';
  if(q.id==='q15'&&S.quests.q14?.complete&&(!S.chapter3Met?.saki||!S.chapter3Met?.yuzu))return 'サキ・ユズとの出会いイベントを読むと解放されます。';
  if(q.id==='q3'&&S.quests.q2?.complete&&!S.storyFlags?.chapter1_open)return '第1章の開幕を読むと解放されます。';
  if(q.id==='q7'&&S.lighthouseMet&&!S.storyFlags?.chapter2_open)return '第2章の開幕を読むと解放されます。';
  if(q.id==='q7'&&!S.lighthouseMet)return '旧灯台の目覚めを読むと解放されます。';
  if(q.id==='q8'&&S.quests.q7?.complete&&!S.tsubakiMet)return '椿の出会いイベントを読むと解放されます。';
  if(q.id==='q9'&&S.quests.q8?.complete&&!S.erikaMet)return 'エリカの出会いイベントを読むと解放されます。';
  if(q.id==='q12'&&S.quests.q11?.complete&&!S.kanameMet)return 'カナメの出会いイベントを読むと解放されます。';
 const missing=questPreviousStory(q)||(!S.storyFlags?.[questIntroStory(q)]?questIntroStory(q):null);
 if(missing)return missing==='prologue'?'序章を「ストーリー」画面で読んでください。':`「ストーリー」画面で${esc(romanceScript(missing)?.title||missing)}を読了すると解放されます。`;
 if(q.requires.length){
  const prev=QUEST_BY_ID[q.requires[q.requires.length-1]];
  return `${prev?.name||'前の依頼'}をクリアすると解放されます。`;
 }
 return 'まだ解放されていません。';
}
let selectedQuestMapChapter=null;
function selectQuestMapChapter(chapter){const max=currentChapterStatus().maxChapter;if(!Number.isInteger(chapter)||chapter<0||chapter>max)return;selectedQuestMapChapter=chapter;citySheetQuest='';render();}
function currentChapterStatus(){
 const hasChapter1=!!S.storyFlags?.chapter1_open||QUESTS.some(q=>q.chapter===1&&(S.quests[q.id]?.complete||S.quests[q.id]?.clues));
 const maxChapter=S.storyFlags?.chapter37_open?37:S.storyFlags?.chapter36_open?36:S.storyFlags?.chapter35_open?35:S.storyFlags?.chapter34_open?34:S.storyFlags?.chapter33_open?33:S.storyFlags?.chapter32_open?32:S.storyFlags?.chapter31_open?31:S.storyFlags?.chapter30_open?30:S.storyFlags?.chapter29_open?29:S.storyFlags?.chapter28_open?28:S.storyFlags?.chapter27_open?27:S.storyFlags?.chapter26_open?26:S.storyFlags?.chapter25_open?25:S.storyFlags?.chapter24_open?24:S.storyFlags?.chapter23_open?23:S.storyFlags?.chapter22_open?22:S.storyFlags?.chapter21_open?21:S.storyFlags?.chapter20_open?20:S.storyFlags?.chapter19_open?19:S.storyFlags?.chapter18_open?18:S.storyFlags?.chapter17_open?17:S.storyFlags?.chapter16_open?16:S.storyFlags?.chapter15_open?15:S.storyFlags?.chapter14_open?14:S.storyFlags?.chapter13_open?13:S.storyFlags?.chapter12_open?12:S.storyFlags?.chapter11_open?11:S.storyFlags?.chapter10_open?10:S.storyFlags?.chapter9_open?9:S.storyFlags?.chapter8_open?8:S.storyFlags?.chapter7_open?7:S.storyFlags?.chapter6_open?6:S.storyFlags?.chapter5_open?5:S.storyFlags?.chapter4_open?4:S.storyFlags?.chapter3_open?3:S.lighthouseMet||!!S.storyFlags?.chapter2_open||QUESTS.some(q=>q.chapter===2&&(S.quests[q.id]?.complete||S.quests[q.id]?.clues))?2:hasChapter1?1:0;
 const chapter=Number.isInteger(selectedQuestMapChapter)&&selectedQuestMapChapter>=0&&selectedQuestMapChapter<=maxChapter?selectedQuestMapChapter:maxChapter;
 const quests=QUESTS.filter(q=>q.chapter===chapter);
 const done=quests.filter(q=>S.quests[q.id]?.complete).length;
 const title=CHAPTER_TITLES_ALL[chapter]||CHAPTERS[chapter]||'';
 return {chapter,title,done,total:quests.length,maxChapter};
}
function activeMapQuest(){return QUESTS.find(q=>questUnlocked(q)&&!S.quests[q.id]?.complete)||QUESTS[0]}
function questMapIcon(name){
 const icons={
  home:'<path d="M4 11.5 12 5l8 6.5"/><path d="M6.5 10.5V19h11v-8.5"/><path d="M10 19v-5h4v5"/>',
  clock:'<circle cx="12" cy="12" r="7.5"/><path d="M12 8v4.5l3 1.8"/><path d="M7 4.5 5.5 3"/><path d="M17 4.5 18.5 3"/>',
  cup:'<path d="M6 8.5h9.5v4.5A4.5 4.5 0 0 1 11 17.5h-.5A4.5 4.5 0 0 1 6 13Z"/><path d="M15.5 9.5h2a2 2 0 0 1 0 4h-1.5"/><path d="M5 19h11"/>',
  rail:'<path d="M8 5.5h8a2 2 0 0 1 2 2v5.5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7.5a2 2 0 0 1 2-2Z"/><path d="M8.5 9h7"/><path d="M9.5 16.5 8 19"/><path d="M14.5 16.5 16 19"/>',
  board:'<rect x="5" y="5" width="14" height="10" rx="1.8"/><path d="M9 19h6"/><path d="M12 15v4"/><path d="M8 9h8"/>',
  ferris:'<circle cx="12" cy="11.5" r="5.8"/><path d="M12 5.7V17.3M6.2 11.5h11.6M8 7.5l8 8M16 7.5l-8 8"/><path d="M9.2 17.5 7 20h10l-2.2-2.5"/>',
  lighthouse:'<path d="M9.5 19h5L13.5 7h-3Z"/><path d="M10.2 7h3.6V4.5h-3.6Z"/><path d="M8.5 9.5H15"/><path d="M13.8 6.3 18 4.8"/><path d="M10.2 6.3 6 4.8"/>'
 };
 return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.home}</svg>`;
}
function questPreBattleStory(qid){
 const q=QUEST_BY_ID[qid];
 if(!q||S.quests?.[qid]?.complete)return null;
 const id=(q.chapter>=4&&q.chapter<=37)?qid+'_pre':FLESHOUT_PREBATTLE[qid+'_ready']?qid+'_ready':null;
 return id&&!S.storyFlags?.[id]?id:null;
}
function questAfterStory(qid){
 return !S.storyFlags?.[qid]&&romanceScript(qid)&&storyAllowed(qid)?qid:null;
}
function questSheetAction(q){
 const st=S.quests[q.id]||{clues:0,complete:false};
 if(st.complete){
  const after=questAfterStory(q.id);
  if(after)return {label:'後日談を読む',click:`openStory('${after}')`,disabled:false,kind:'story'};
  return {label:'もう一度出撃する',click:`startBattle('${q.id}')`,disabled:false,kind:'done'};
 }
 if(!questUnlocked(q))return {label:'ストーリー画面で解放条件を読む',click:"change('story')",disabled:false,kind:'story'};
 const state=S.investigations?.[q.id];
 if(state?.phase==='ready'&&questPreBattleStory(q.id))
  return {label:'戦闘直前の物語から出撃する',click:`startBattle('${q.id}')`,disabled:false,kind:'story'};
 if(state?.phase==='ready')return {label:state.solved?'弱点を見抜いて出撃する':'現場へ出撃する',click:`startBattle('${q.id}')`,disabled:false,kind:'phase2'};
 return {label:state?'調査の続きを始める':'同行者を選んで調査する',click:`startInvestigation('${q.id}')`,disabled:false,kind:'phase0'};
}
function openQuestSheet(id,event){
 event?.stopPropagation?.();
 if(!QUEST_BY_ID[id])return;
 S.currentQuest=id;citySheetQuest=id;
 if(id==='q1'&&activeOnboardGuide()==='map'){S.onboarding.seen.map=true;S.questGuideSeen=true;}
 if(!S.questGuideSeen){S.questGuideSeen=true;persist();} else persist();
 render();
}
function closeQuestSheet(force=false){
 if(!citySheetQuest&&!force)return;citySheetQuest='';render();
}
function openMapHome(event){event?.stopPropagation?.();if(!S.questGuideSeen){S.questGuideSeen=true;persist();}change('home')}
function dismissQuestGuide(event){event?.stopPropagation?.();S.questGuideSeen=true;persist();render()}
function selectQuest(id){if(!QUEST_BY_ID[id])return;S.currentQuest=id;citySheetQuest=id;persist();render()}
function questPinMarkup(q){
 const meta0=QUEST_MAP_META[q.id],state=questMapState(q),selected=citySheetQuest===q.id;
 // v0.67.1.0: 第3部（湯ノ花）は専用の地図に、宵星市の地図で左上に寄せていた位置を全体へ広げて並べる
 const meta=q.chapter>=21&&meta0?{...meta0,x:Math.round((5+(meta0.x-3)/30*90)*10)/10,y:Math.round((5+(meta0.y-1)/46*88)*10)/10}:meta0;
 const stateLabel=state==='done'?'解決済み':state==='locked'?'未解放':'進行中';
 const badge=state==='done'?'<span class="qmap-pin-state qmap-done-mark">✓</span>':state==='locked'?'<span class="qmap-pin-state qmap-lock-mark" aria-label="未解放"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="10" width="12" height="10" rx="2"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/></svg></span>':'<span class="qmap-pin-state qmap-new-mark">NEW</span>';
 return `<button type="button" class="qmap-pin ${q.id==='q1'?'qmap-main-clock':''} ${state} ${selected?'selected':''}" style="left:${meta.x}%;top:${meta.y}%;--pin:${meta.color};--pin-accent:${meta.accent}" onclick="openQuestSheet('${q.id}',event)" aria-pressed="${selected}" aria-label="${esc(q.name)}：${stateLabel}">${badge}<span class="qmap-pin-core">${questMapIcon(meta.icon)}</span><span class="qmap-pin-name">${esc(q.id==='q1'?q.name:meta.area)}</span></button>`;
}
function mapIntroGuide(){
 if(S.questGuideSeen||S.onboarding?.enabled||onboardingSuppressed)return '';
 return `<button type="button" class="qmap-guide" onclick="dismissQuestGuide(event)" aria-label="初回ガイドを閉じる"><strong>初回案内</strong><span>光っているピンをタップして依頼を確認しよう</span><span class="qmap-guide-arrow" aria-hidden="true">↓</span></button>`;
}

// Ver.0.34.59.0: One battle system for all normal quests; no player-facing battle-mode selector.
function battleModeChoiceMarkup(qid){
 return '<p class="qmap-card-note">戦闘方式：'+(tbSelected()?'ターン制（標準）':'旧リアルタイム方式')+'。変更は「記録と設定」から行えます。</p>';
}
function questPowerRecommendation(qid){
 const value=Number.isFinite(QUEST_POWER[qid])?QUEST_POWER[qid]:null;
 return {value,text:value===null?'未設定':value.toLocaleString()};
}
function cityBottomSheet(q){
 const st=S.quests[q.id]||{clues:0,complete:false},meta=QUEST_MAP_META[q.id],state=questMapState(q),power=teamPower();
 // The recommendation may be absent in older builds or future quest data. Never throw while displaying a quest.
 const {value:recommended,text:recommendedText}=questPowerRecommendation(q.id);
 const powerOkay=recommended===null||power>=recommended,phase=st.complete?3:Math.min(st.clues||0,2),action=questSheetAction(q);
 const chapterLabel=q.chapter===0?'序章':`第${q.chapter}章`;
 const powerContext=(q.id==='q35'||q.id==='q52')?'（勝利不要のイベント戦・参考値）':q.id==='q53'?'（脱出戦・参考値）':'';
 const status=state==='done'?'解決済み':state==='locked'?'未解放':questStage(q);
 const stageRow=QUEST_STAGE_LABELS.map((name,i)=>{const kind=st.complete||phase>i?'done':phase===i&&state!=='locked'?'current':'wait';return `<div class="qmap-step ${kind}"><span class="qmap-step-dot">${st.complete||phase>i?'✓':i+1}</span><small>${esc(name)}</small></div>${i<QUEST_STAGE_LABELS.length-1?'<i class="qmap-step-line"></i>':''}`}).join('');
 const lead=state==='locked'?questUnlockReason(q):q.lead;
 const rewardText=`✧ ${q.reward.toLocaleString()} ／ ◈ ${(q.id==='q6'?1000:ECONOMY.FIRST_CLEAR_GOLD).toLocaleString()}`;
 const progressText=st.complete?'3 / 3 段階 完了':`${Math.min((st.clues||0)+1,3)} / 3 段階`;
 const extras=st.complete?`<div class="qmap-card-subactions"><button type="button" class="btn outline" onclick="startAutoRepeat('${q.id}')">オート周回 ×3</button><button type="button" class="btn outline" onclick="skipClear('${q.id}',1)">スキップ ×1</button><button type="button" class="btn outline" onclick="skipClear('${q.id}',5)">スキップ ×5</button></div><button type="button" class="btn outline mini" onclick="openInvestigationReview('${q.id}')">調査メモを見る</button><p class="qmap-card-note">本日のスキップ残り ${skipsRemaining()}回。周回報酬は既存仕様のままです。</p>`:'';
 return `<section class="qmap-sheet open" onclick="event.stopPropagation()" aria-label="${esc(q.name)}の詳細"><div class="qmap-sheet-handle"></div><div class="qmap-card-band" style="--band:${meta.color};--band-deep:${meta.accent}"><div class="qmap-card-icon">${questMapIcon(meta.icon)}</div><div><strong>${esc(q.location)}</strong></div><button type="button" class="qmap-close" onclick="closeQuestSheet(true)" aria-label="閉じる">×</button></div><div class="qmap-card-body"><div class="qmap-card-head"><div><p class="qmap-card-kicker">${q.id.toUpperCase()} · ${esc(chapterLabel)}</p><h2>${esc(q.name)}</h2><p class="qmap-card-lead">${esc(lead)}</p></div><span class="qmap-state-pill ${state}">${esc(status)}</span></div><div class="qmap-card-info"><div><small>推奨戦力${powerContext}</small><strong>${recommendedText}</strong></div><div><small>編成合計</small><strong class="${powerOkay?'ok':'warn'}">${power.toLocaleString()}</strong></div><div><small>調査進行</small><strong>${progressText}</strong></div><div><small>初回報酬</small><strong>${rewardText}</strong></div></div><div class="qmap-track" aria-label="調査の進み具合">${stageRow}</div>${!powerOkay&&state!=='locked'?'<p class="qmap-card-note warn">推奨戦力に届いていません。育成推奨です。</p>':''}${state==='locked'?`<p class="qmap-card-note">${esc(questUnlockReason(q))}</p>`:''}${st.complete?`<p class="qmap-card-note">この依頼は解決済みです。周回やスキップで素材と通貨を集められます。</p>`:''}${extras}</div><div class="qmap-sheet-footer">${(action.kind==='phase2'||action.kind==='done')?battleModeChoiceMarkup(q.id):''}<button type="button" class="btn primary full qmap-main-action" ${action.disabled?'disabled':''} ${action.disabled?'':`onclick="${action.click}"`}>${esc(action.label)}</button></div></section>`;
}
function city(){
 const chapter=currentChapterStatus();
 const current=citySheetQuest?QUEST_BY_ID[citySheetQuest]:null;
 return `<section class="qmap-view os-page os-quest"><div class="os-quest-head"><div class="qmap-topline"><div><span class="qmap-top-kicker">QUEST MAP</span><h1>${chapter.chapter>=21?'湯ノ花マップ':'宵星市マップ'}</h1></div><div class="qmap-chapter-box"><small>現在の章</small><strong>${esc(chapter.title)}</strong><span>${chapter.done} / ${chapter.total}</span></div></div><nav class="qmap-chapter-switch os-chapter-picker" aria-label="章の切り替え"><button type="button" class="btn mini outline" ${chapter.chapter<=0?'disabled':''} onclick="selectQuestMapChapter(${chapter.chapter-1})" aria-label="前の章">‹</button><select class="os-chapter-select" onchange="selectQuestMapChapter(Number(this.value))">${[['第1部',0,10],['第2部',11,20],['第3部',21,30]].map(([g,a,b])=>`<optgroup label="${g}">${Array.from({length:b-a+1},(_,k)=>a+k).filter(n=>n<=chapter.maxChapter).map(n=>`<option value="${n}" ${n===chapter.chapter?'selected':''}>${esc(String(CHAPTER_TITLES_ALL[n]||'').replace(/^第\d+部\s*/,''))}</option>`).join('')}</optgroup>`).join('')}</select><button type="button" class="btn mini outline" ${chapter.chapter>=chapter.maxChapter?'disabled':''} onclick="selectQuestMapChapter(${chapter.chapter+1})" aria-label="次の章">›</button></nav><div class="os-quest-note"><small><b class="os-progress">解決 ${chapter.done} / ${chapter.total}</b>　クエストはストーリーを読むと解放されます</small><button type="button" class="btn outline mini" onclick="change('story')">ストーリーへ</button></div></div><div class="qmap-stage" onclick="closeQuestSheet()" aria-label="宵星市のクエストマップ"><div class="qmap-scroll"><div class="qmap-map ${chapter.chapter>=21?'is-yunohana':'is-yoiboshi'}"><img class="qmap-art" src="assets/ART_V2/maps/${chapter.chapter>=21?'map_yunohana_night':'map_yoiboshi_night'}.webp?v=0.67.1.0" alt="" draggable="false"><svg class="qmap-svg" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true"><rect width="1000" height="700" rx="34" fill="#f5f9ff"/><path d="M716 0h284v700H628c20-74 17-127-7-186-27-64-22-136 9-204 34-74 58-130 86-310Z" fill="#d7effd"/><path d="M654 0h28c-18 118-49 183-73 235-25 56-22 95-2 148 23 62 27 121 11 196l-31-4c14-64 12-114-9-171-23-62-22-113 5-173 28-62 54-120 71-231Z" fill="#91cbe9" opacity=".8"/><path d="M42 99c155-45 300-54 436-26 117 24 209 21 280 1v91c-78 19-159 21-267-3C364 133 214 144 42 199Z" fill="#fff7d6" opacity=".9"/><path d="M0 250c125-36 224-21 300 42 58 48 95 60 172 58 55-2 95 9 128 47 38 43 89 59 138 51 88-14 164 9 262 76v176H0Z" fill="#e9f3df"/><path d="M0 447c124-28 224-5 299 48 67 47 137 51 218 13 64-30 122-31 183 5 61 35 132 42 300 16v171H0Z" fill="#fdf0e6" opacity=".9"/><path d="M94 182 420 224" stroke="#cfdae7" stroke-width="26" stroke-linecap="round" fill="none"/><path d="M309 116 261 586" stroke="#d6e1ee" stroke-width="20" stroke-linecap="round" fill="none"/><path d="M412 332 749 289" stroke="#cad8e6" stroke-width="24" stroke-linecap="round" fill="none"/><path d="M502 292 870 606" stroke="#ceddeb" stroke-width="18" stroke-linecap="round" stroke-dasharray="3 28" fill="none"/><path d="M118 523 563 527" stroke="#d3dfeb" stroke-width="22" stroke-linecap="round" fill="none"/><path d="M740 451 910 452" stroke="#d3dfeb" stroke-width="18" stroke-linecap="round" fill="none"/><circle cx="321" cy="140" r="34" fill="#fff" opacity=".9"/><circle cx="638" cy="493" r="44" fill="#fff" opacity=".65"/><path d="M807 552c34-23 78-64 98-119" stroke="#74afd0" stroke-width="6" stroke-dasharray="2 12" stroke-linecap="round" fill="none"/></svg>${chapter.chapter>=21?'':`<button type="button" class="qmap-home-pin" style="left:${QUEST_MAP_META.home.x}%;top:${QUEST_MAP_META.home.y}%" onclick="openMapHome(event)" aria-label="宵星相談室へ戻る"><span class="qmap-home-core">${questMapIcon('home')}</span><span class="qmap-home-label">相談室</span></button>`}${QUESTS.filter(q=>q.chapter===chapter.chapter).map(questPinMarkup).join('')}${mapIntroGuide()}</div></div>${current?cityBottomSheet(current):''}</div><p class="qmap-caption">光るピンから依頼を確認し、カード下部の大きなボタンで次の行動へ進みます。</p></section>`
}

function farmGold(q){return ECONOMY.FARM_GOLD[q.id]??Math.round(q.reward*.15/10)*10}
function farmGems(q){return ECONOMY.FARM_GEMS[q.id]??5}
function todayLocal(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function skipCountToday(){const d=S.dailySkips;return d?.date===todayLocal()?Math.max(0,Math.min(ECONOMY.SKIP_DAILY_MAX,Number(d.count)||0)):0}
function skipsRemaining(){return Math.max(0,ECONOMY.SKIP_DAILY_MAX-skipCountToday())}
function chatCountToday(id){const row=S.dailyChats?.[unit(id)?.person||id];return row&&row.date===todayLocal()?Math.max(0,Math.min(ECONOMY.DAILY_CHAT_MAX,Number(row.count)||0)):0}

// v0.33.2.0: Chapter 5 displayed benchmarks are tied to tested party power at Lv10≈1487 / Lv15≈1965,
// not extrapolated from the incompatible chapter-4 recommendations (which need a separate system-wide audit).
// q28 is victory-optional and q29 is an escape battle, so their values are informational, not difficulty guarantees.
const QUEST_POWER=Object.freeze({q1:690,q2:760,q3:870,q4:940,q5:940,q6:1060,q7:1060,q8:1120,q9:1120,q10:1240,q11:1300,q12:1300,q13:1420,q14:1420,q15:1490,q16:1600,q17:1600,q18:1670,q19:1780,q20:1780,q21:1850,q22:1850,q23:1970,q24:2030,q25:2030,q26:2150,q27:2150,q28:2150,q29:2220,q30:2220,q31:2290,q32:2290,q33:2360,q34:2430,q35:2430,q36:2430,q37:2500,q38:2500,q39:2570,q40:2640,q41:2640,q42:2710,q43:2780,q44:2780,q45:2850,q46:2920,q47:2920,q48:2990,q49:3060,q50:3060,q51:3130,q52:3130,q53:3200,q54:3200,q55:3270,q56:3270,q57:3340,q58:3410,q59:3410,q60:3480,q61:3550,q62:3550,q63:3620,q64:3620,q65:3690,q66:3760,q67:3760,q68:3830,q69:3830,q70:3900,q71:3970,q72:3970,q73:4040,q74:4040,q75:4110,q76:4110,q77:4180,q78:4180,q79:4250,q80:4250,q81:4320,q82:4320,q83:4390,q84:4390,q85:4460,q86:4460,q87:4530,q88:4530,q89:4600,q90:4600,q91:4670,q92:4670,q93:4740,q94:4740,q95:4810,q96:4810,q97:4880,q98:4880,q99:4950,q100:4950,q101:5020,q102:5020,q103:5090,q104:5090,q105:5160,q106:5160,q107:5230,q108:5230,q109:5300,q110:5300,q111:5370,q112:5370,q113:5440,q114:5440,q115:5510,q116:5510,q117:5580,q118:5580,q119:5650,q120:5650,q121:5720,q122:5720,q123:5790,q124:5790,q125:5860,q126:5860,q127:5930,q128:5930,q129:6000,q130:6000,q131:6070,q132:6070,q133:6140,q134:6140,q135:6210,q136:6210,q137:6280,q138:6280,q139:6350,q140:6350,q141:6420,q142:6420,q143:6490,q144:6490,q145:6560,q146:6560,q147:6630,q148:6630,q149:6700,q150:6700,q151:6770,q152:6770,q153:6840,q154:6840,q155:6910,q156:6910,q157:6980,q158:6980,q159:7050,q160:7050,q161:7120,q162:7120,q163:7190,q164:7190,q165:7260,q166:7260,q167:7330,q168:7330,q169:7400,q170:7400,q171:7470,q172:7470,q173:7540,q174:7540,q175:7610,q176:7610,q177:7680,q178:7680,q179:7750,q180:7750,q181:7820,q182:7820,q183:7890,q184:7890,q185:7960,q186:7960,q187:8030,q188:8030,q189:8100,q190:8100,q191:8170,q192:8170,q193:8240,q194:8240,q195:8310,q196:8310,q197:8380,q198:8380,q199:8450,q200:8450,q201:8520,q202:8520,q203:8590,q204:8590,q205:8660,q206:8660,q207:8730,q208:8730,q209:8800,q210:8800,q211:8870,q212:8870,q213:8940,q214:8940,q215:9010,q216:9010,q217:9080,q218:9080,q219:9150,q220:9150,q221:9220,q222:9220});
function skipClear(id,count=1){
  const q=QUESTS.find(x=>x.id===id),v=S.quests[id];
  if(!q||!v?.complete||battle)return toast('スキップはクリア済みの依頼のみ利用できます');
  if(![1,5].includes(count))return;
  const remaining=skipsRemaining();
  if(remaining===0)return toast('本日のスキップ上限です。翌日のローカル日付で再利用できます');
  // For the five-clear action, award only the actual remaining clears.
  const actual=Math.min(count,remaining),gold=farmGold(q)*actual,gems=farmGems(q)*actual;
  const today=todayLocal();
  S.dailySkips={date:today,count:skipCountToday()+actual};
  S.gold+=gold;S.gems+=gems;S.grindRuns[id]=(S.grindRuns[id]||0)+actual;
  persist();render();
  toast(`${q.name}を${actual}回スキップ。◈ ${gold} ＋ ✧ ${gems}を獲得（本日残り${skipsRemaining()}回）`);
}
function startAutoRepeat(id){
  if(!requireValidParty())return;
  const q=QUESTS.find(x=>x.id===id);
  if(!q||!S.quests[id]?.complete)return toast('オート周回はクリア済みの依頼のみ対応しています');
  startBattle(id,{repeatLeft:3,repeatWon:0});
}
function progressQuest(){const id=S.currentQuest;if(!id)return;startInvestigation(id)}
// Ver.0.26.1.0 — team composition rules. Never normalize saved party data on load.
const PARTY_ROLE_LIMIT=2;
/* Temporary display/battle overlay; do NOT assign to S.party. */
function hiddenV0690Party(save=S){
 return Array.isArray(save?.party)&&save.party.some(id=>BYID[id]&&!heroV0690Visible(BYID[id].person,save));
}
function visibleParty(save=S){
 return hiddenV0690Party(save)?fresh().party.slice():(Array.isArray(save?.party)?save.party:[]);
}
function partyRoleCounts(ids=visibleParty()){
 const counts=Object.fromEntries(Object.keys(ROLES).map(role=>[role,0]));
 for(const id of ids){const role=unit(id)?.role;if(Object.prototype.hasOwnProperty.call(counts,role))counts[role]++;}
 return counts;
}
function teamRuleError(ids=visibleParty()){
 if(!Array.isArray(ids)||ids.length!==4||ids.some(id=>!unit(id)||!data(id)))return '所持している4人のユニットを編成してください。';
 const persons=new Set(),roles=partyRoleCounts(ids);
 for(const id of ids){const personId=unit(id).person;if(persons.has(personId))return '同じヒロインは1人までです。重複している編成枠を変更してください。';persons.add(personId);}
 for(const [role,count] of Object.entries(roles)){if(count>PARTY_ROLE_LIMIT)return `${ROLES[role].name}は2人までです。編成を変更してください。`;}
 return '';
}
function slotRuleReason(slot,id){
 if(!Number.isInteger(slot)||slot<0||slot>=4||!data(id)||!unit(id))return '所持していないユニットです';
 const chosen=unit(id),others=visibleParty().filter((_,i)=>i!==slot).map(unit).filter(Boolean);
 if(others.some(u=>u.person===chosen.person))return '同じヒロインが編成中';
 if(others.filter(u=>u.role===chosen.role).length>=PARTY_ROLE_LIMIT)return 'このロールは2人まで';
 return '';
}
function openTeamFix(){
 dialog=null;change('roster');
 // Render completes synchronously; scroll the formation section into view after the dialog closes.
 requestAnimationFrame(()=>{const team=document.getElementById('v0241-team');if(team){team.scrollIntoView({behavior:'smooth',block:'start'});team.setAttribute('tabindex','-1');team.focus({preventScroll:true});}});
}
function requireValidParty(){
 const error=teamRuleError();if(!error)return true;
 dialog={title:'出撃チームの見直しが必要です',message:error,html:'<button type="button" class="btn primary full" onclick="openTeamFix()">編成画面へ移動する →</button>'};render();return false;
}
function roleCountMarkup(){const counts=partyRoleCounts();return `<div class="v0253-role-counts" aria-label="編成中のロール人数">${Object.keys(ROLES).map(role=>`<span class="${counts[role]>PARTY_ROLE_LIMIT?'over':''}">${ROLES[role].name} ${counts[role]}/${PARTY_ROLE_LIMIT}</span>`).join('')}</div>`}
function teamPower(){return visibleParty().reduce((sum,id)=>{if(!data(id))return sum;const st=unitPower(id);return sum+Math.round(st.hp/12+st.atk*8+st.def*12)},0)}
function unitPower(id){const u=unit(id),d=data(id),r=ROLES[u.role];let stats={hp:r.hp+Math.round((d.lv-1)*r.hp*.055),atk:r.atk+(d.lv-1)*2,def:r.def+Math.floor((d.lv-1)/2),rate:r.rate};for(let i=1;i<=d.lb;i++){if(u.role==='attacker')stats.atk+=2;else if(u.role==='tank'){stats.hp+=12;stats.def+=1}else if(u.role==='healer'){stats.hp+=6;stats.atk+=1}else{stats.hp+=8;stats.atk+=1}}return stats}
function skillRank(id){return Math.max(0,(data(id)?.lb||0)-3)}
function roster(){
 const party=visibleParty();
 const owned=UNITS.filter(u=>data(u.id)&&visibleUnitV026(u));
 const roleChoices=[['all','すべて'],['attacker','アタッカー'],['tank','タンク'],['healer','ヒーラー'],['support','サポーター']];
 const rarityChoices=['all','R','SR','SSR','UR'];
 const rarityOrder={UR:0,SSR:1,SR:2,R:3};
 const shown=owned.filter(u=>(rosterRoleFilter==='all'||u.role===rosterRoleFilter)&&(rosterRarityFilter==='all'||u.rarity===rosterRarityFilter))
   .sort((a,b)=>{const ai=party.includes(a.id)?0:1,bi=party.includes(b.id)?0:1;return ai-bi || (rarityOrder[a.rarity]??9)-(rarityOrder[b.rarity]??9) || (data(b.id)?.lv||1)-(data(a.id)?.lv||1) || person(a).name.localeCompare(person(b).name,'ja');});
 const totalPeople=new Set(owned.map(u=>u.person)).size;
 const editing=Math.max(0,Math.min(3,rosterEditSlot));
 const roleCount=roleCountMarkup();
 const warning=teamRuleError();
 const slots=[0,1,2,3].map(i=>{
   const id=party[i],u=unit(id),d=id?data(id):null;
   const name=u?person(u).name:'空き枠';
   return `<button type="button" class="roster-vnew-slot ${rosterPickerOpen&&editing===i?'is-editing':''}" onclick="selectRosterSlot(${i})" aria-pressed="${editing===i}" aria-label="${i+1}枠目 ${esc(name)} ${u?u.rarity:'空き'} を選択">
       <span class="roster-vnew-slotnum">SLOT ${i+1} ${rosterPickerOpen&&editing===i?'<b>交代中</b>':''}</span>
       ${u?`<span class="roster-vnew-portrait"><img src="${unitCardArt(u)}" class="${unitHasScene(u)?'unit-card-scene':''}" alt="${esc(name)}のイラスト" loading="lazy"></span>
       <span class="roster-vnew-name">${esc(name)} <em class="roster-vnew-rarity rarity-${u.rarity.toLowerCase()}">${u.rarity}</em></span>
       <span class="roster-vnew-meta">Lv.${d?.lv??'—'} · ${ROLES[u.role].name}</span>`:
       '<span class="roster-vnew-empty">＋<small>仲間を選ぶ</small></span>'}
       <span class="roster-vnew-slotfoot">交代する ›</span>
     </button>`;
 }).join('');
 const cards=shown.map(u=>{
   const d=data(u.id),reason=slotRuleReason(editing,u.id),inParty=party.includes(u.id),inCurrent=party[editing]===u.id;
   return `<article class="roster-vnew-unit ${inCurrent?'is-current':''}" data-unit-id="${u.id}" data-person-id="${u.person}">
     <button type="button" class="roster-vnew-pick" onclick="assignRosterOwnedUnit('${u.id}')" ${reason?'disabled':''} title="${esc(reason||'選択中の編成枠へ入れる')}" aria-label="${esc(person(u).name)} ${u.rarity} Lv.${d.lv} ${reason?'選択不可 '+reason:'を編成枠'+(editing+1)+'へ'}">
       <span class="roster-vnew-art"><img src="${unitCardArt(u)}" class="${unitHasScene(u)?'unit-card-scene':''}" alt="" loading="lazy"></span>
       <span class="roster-vnew-cardbody">
         <strong class="roster-vnew-cardname">${esc(person(u).name)}</strong>
         <span class="roster-vnew-subtitle">${esc(u.title)}</span>
         <span class="roster-vnew-info"><b class="roster-vnew-rarity rarity-${u.rarity.toLowerCase()}">${u.rarity}</b><span>Lv.${d.lv}</span><span>${ROLES[u.role].name}</span></span>
         <span class="roster-vnew-action">${inCurrent?'この枠に編成中':reason?esc(reason):inParty?'他の枠から交代':'この枠に編成する'} ›</span>
       </span>
     </button><div class="roster-vnew-cardtools"><button type="button" class="roster-vnew-detail" onclick="openUnit('${u.id}')">詳細を見る</button><button type="button" class="roster-vnew-detail" onclick="openTrainingFor('${u.id}')">育成</button></div>
   </article>`;
 }).join('');
 const filters=`<div class="roster-vnew-filters"><div class="roster-vnew-filterrow" role="group" aria-label="ロールで絞り込み">${roleChoices.map(([id,label])=>`<button type="button" class="roster-vnew-filter ${rosterRoleFilter===id?'active':''}" aria-pressed="${rosterRoleFilter===id}" onclick="changeRosterRoleFilter('${id}')">${label}</button>`).join('')}</div>
     <div class="roster-vnew-filterrow" role="group" aria-label="レアリティで絞り込み">${rarityChoices.map(id=>`<button type="button" class="roster-vnew-filter ${rosterRarityFilter===id?'active':''}" aria-pressed="${rosterRarityFilter===id}" onclick="changeRosterRarityFilter('${id}')">${id==='all'?'全レア':id}</button>`).join('')}</div></div>`;
 const browse=shown.map(u=>{const d=data(u.id);return `<article class="roster-vnew-unit roster-browse-unit"><button type="button" class="roster-vnew-pick" onclick="openUnit('${u.id}')" aria-label="${esc(person(u).name)} ${u.rarity} の詳細"><span class="roster-vnew-art"><img src="${unitCardArt(u)}" class="${unitHasScene(u)?'unit-card-scene':''}" alt="" loading="lazy"></span><span class="roster-vnew-cardbody"><strong class="roster-vnew-cardname">${esc(person(u).name)}</strong><span class="roster-vnew-subtitle">${esc(u.title)}</span><span class="roster-vnew-info"><b class="roster-vnew-rarity rarity-${u.rarity.toLowerCase()}">${u.rarity}</b><span>Lv.${d.lv}</span><span>${ROLES[u.role].name}</span></span>${party.includes(u.id)?'<span class="roster-vnew-action">出撃チームに編成中</span>':''}</span></button><div class="roster-vnew-cardtools"><button type="button" class="roster-vnew-detail" onclick="openUnit('${u.id}')">詳細を見る</button><button type="button" class="roster-vnew-detail" onclick="openTrainingFor('${u.id}')">育成</button></div></article>`;}).join('');
 const picker=rosterPickerOpen?`<div class="roster-picker-backdrop" onclick="if(event.target===this)closeRosterPicker()"><section class="roster-picker card" role="dialog" aria-modal="true" aria-label="SLOT ${editing+1}に入れる仲間を選ぶ">
     <div class="roster-picker-head"><div><small>SLOT ${editing+1}</small><h3>入れる仲間を選ぶ</h3></div><button type="button" class="btn outline roster-picker-close" onclick="closeRosterPicker()">閉じる ✕</button></div>
     ${filters}
     <div class="roster-vnew-grid roster-picker-grid">${cards}</div>
     ${shown.length?'':'<p class="notice">この条件で所持しているユニットはありません。絞り込みを変更してください。</p>'}
   </section></div>`:'';
 return `${heading('FORMATION / OWNED UNITS','出撃編成','枠の「交代する」を押すと、入れる仲間を選べます。')}
   <nav class="roster-vnew-links" aria-label="編成の関連メニュー"><button type="button" class="btn primary" onclick="change('training')">✦ 仲間の育成へ ›</button></nav>
   <section class="roster-vnew-team card" id="v0241-team" aria-label="出撃チーム">
     <div class="roster-vnew-head"><div><small>YOUR TEAM</small><h3>出撃チーム <span>${party.filter(id=>!!data(id)).length} / 4</span></h3></div><strong>編成戦力 ${teamPower().toLocaleString()}</strong></div>
     <p class="roster-vnew-rules">同じヒロインは1人まで・同じロールは2人まで</p>
     ${roleCount}
     ${warning?`<p class="v0253-team-warning" role="status">${esc(warning)}<br>枠の「交代する」から編成を変更してください。</p>`:''}
     <div class="roster-vnew-slots">${slots}</div>
     <p class="roster-vnew-hint">枠の「交代する」を押すと、所持ユニットから選べます</p>
   </section>
   <section class="roster-vnew-owned roster-collection ${rosterCollectionOpen?'is-open':''}" id="v0241-list" aria-label="所持ユニット一覧">
     <button type="button" class="roster-collection-toggle" onclick="toggleRosterCollection()" aria-expanded="${rosterCollectionOpen}"><span><small>YOUR COLLECTION</small><b>所持ユニット一覧</b><em>${owned.length}体 / ${totalPeople}人</em></span><i>${rosterCollectionOpen?'閉じる ▲':'開く ▼'}</i></button>
     ${rosterCollectionOpen?`${filters}<p class="roster-vnew-listcount">表示 ${shown.length} / 所持 ${owned.length}体</p><div class="roster-vnew-grid">${browse}</div>${shown.length?'':'<p class="notice">この条件で所持しているユニットはありません。</p>'}`:''}
   </section>${picker}`;
}
function chooseSlot(i){
 const options=UNITS.filter(u=>visibleUnitV026(u)&&data(u.id));
 const visible=onePortraitPerPerson(options);
 dialog={title:`編成枠 ${i+1} — 仲間を選ぶ`,message:'画像は人物ごとに1枚。バージョンごとの役割と育成は別々です。',html:`<div class="slot-choice-grid">${visible.map(u=>{
 if(COMPACT_PEOPLE.has(u.person)){
 const group=options.filter(x=>x.person===u.person);
 return `<div class="slot-person-group" data-person="${u.person}"><img class="slot-person-main-image" src="${characterPortrait(u.person)}" alt="${person(u).name}の代表イラスト"><strong>${person(u).name}</strong><div class="slot-person-versions">${group.map(x=>{const reason=slotRuleReason(i,x.id);return `<button type="button" ${reason?'disabled':''} title="${esc(reason)}" onclick="setSlot(${i},'${x.id}')">${x.rarity} · ${esc(x.title)} · ${ROLES[x.role].name}${reason?`（${esc(reason)}）`:''}</button>`}).join('')}</div></div>`;
 }
 const reason=slotRuleReason(i,u.id);
 return `<button type="button" class="slot-choice" ${reason?'disabled':''} title="${esc(reason)}" onclick="setSlot(${i},'${u.id}')"><img src="${characterPortrait(u.person)}" alt=""><strong>${person(u).name}</strong><span>${ROLES[u.role].name}${isConcept(u.person)?'（仮）':''}</span>${reason?`<small>${esc(reason)}</small>`:''}</button>`;
 }).join('')}</div><button class="btn outline full" onclick="setSlot(${i},'')">この枠を空ける</button>`};render();
}
function setSlot(i,id){if(hiddenV0690Party())return toast('一時非表示中の編成を保存したままにするため公開再開後に変更できます');if(!Number.isInteger(i)||i<0||i>=4)return;if(id){const reason=slotRuleReason(i,id);if(reason)return toast(reason);}S.party[i]=id;S.party=S.party.filter(Boolean);persist();dialog=null;render()}
function openUnit(id){if(!visibleUnitV026(unit(id)))return;S.selected=id;persist();view='unit';render();window.scrollTo(0,0)}
// Dedicated training menu. These filters and selection are UI-only; no save fields are added.
let trainingSelectedUnit='',trainingRoleFilter='all',trainingRarityFilter='all';
function openTrainingFor(id){
 const u=unit(id);
 if(!u||!data(id)||!visibleUnitV026(u))return toast('未所持のユニットは育成できません');
 trainingSelectedUnit=id;
 change('training');
}
function selectTrainingUnit(id){
 const u=unit(id);
 if(!u||!data(id)||!visibleUnitV026(u))return toast('未所持のユニットは選べません');
 trainingSelectedUnit=id;render();
}
function trainingSetFilter(kind,value){
 if(kind==='role'&&['all','attacker','tank','healer','support'].includes(value))trainingRoleFilter=value;
 else if(kind==='rarity'&&['all','R','SR','SSR','UR'].includes(value))trainingRarityFilter=value;
 else return;
 render();
}
function trainingPage(){
 const owned=UNITS.filter(u=>visibleUnitV026(u)&&!!data(u.id));
 const order={UR:0,SSR:1,SR:2,R:3};
 owned.sort((a,b)=>(order[a.rarity]??4)-(order[b.rarity]??4)||((data(b.id)?.lv||0)-(data(a.id)?.lv||0))||person(a).name.localeCompare(person(b).name,'ja'));
 const selected=owned.find(u=>u.id===trainingSelectedUnit)||owned.find(u=>u.id===S.selected)||owned.find(u=>S.party.includes(u.id))||owned[0];
 const roles=[['all','すべて'],['attacker','アタッカー'],['tank','タンク'],['healer','ヒーラー'],['support','サポーター']];
 const rarities=['all','R','SR','SSR','UR'];
 const filt=(kind,rows,current)=>rows.map(([key,text])=>`<button type="button" class="train-filter ${current===key?'active':''}" aria-pressed="${current===key}" onclick="trainingSetFilter('${kind}','${key}')">${text}</button>`).join('');
 const shown=owned.filter(u=>(trainingRoleFilter==='all'||u.role===trainingRoleFilter)&&(trainingRarityFilter==='all'||u.rarity===trainingRarityFilter));
 const cards=shown.map(u=>{const d=data(u.id);return `<button type="button" class="train-unit ${u.id===selected?.id?'active':''}" aria-pressed="${u.id===selected?.id}" onclick="selectTrainingUnit('${u.id}')"><span class="train-unit-art"><img src="${unitCardArt(u)}" class="${unitHasScene(u)?'unit-card-scene':''}" loading="lazy" alt=""></span><span class="train-unit-label"><b>${esc(person(u).name)}</b><span><em class="roster-vnew-rarity rarity-${u.rarity.toLowerCase()}">${u.rarity}</em> Lv.${d.lv} · ${ROLES[u.role].name}</span><small>${esc(u.title)}</small></span></button>`}).join('');
 const title=heading('UNIT TRAINING / GROWTH','仲間の育成','所持ユニットを選び、育成内容・消費コイン・スキルを確認できます。');
 if(!selected)return `${title}<div class="train-page-links"><button type="button" class="btn outline" onclick="change('roster')">‹ 編成へ戻る</button></div><div class="card pad">所持しているユニットがありません。募集で仲間を迎えると育成できます。</div>`;
 const u=selected,d=data(u.id),p=person(u),st=unitPower(u.id),rank=skillRank(u.id);
 const nextLv=Math.min(30,affordableLevel(d.lv,S.gold)),batchCost=totalLevelCost(d.lv,nextLv),cost=d.lv*ECONOMY.LEVEL_COST_PER_LV;
 const lvPossible=d.lv<30&&S.gold>=cost,lbPossible=d.lb<7&&d.copies>0;
 const levelStatus=d.lv>=30?'レベルMAX':lvPossible?'レベルアップ可能':'コイン不足';
 const unlockStatus=d.lb>=7?'限界突破MAX':d.copies>0?'限界突破可能':'重複ユニットが必要';
 return `${title}
 <div class="train-page-links"><button type="button" class="btn outline" onclick="change('roster')">‹ 編成へ戻る</button><span>育成用コイン <b>◈ ${S.gold.toLocaleString()}</b></span></div>
 <section class="train-main" aria-label="選択中のユニットの育成">
  <div class="train-hero"><span class="train-hero-tag">選択中のユニット · ${u.rarity}</span><img src="${unitArt(u,'scene')}" class="${unitHasScene(u)?'unit-card-scene':''}" alt="${esc(p.name)}のユニット画像"><div><h2>${esc(p.name)}</h2><p>${esc(u.title)}</p><small>${ROLES[u.role].name} ／ ${u.rarity}</small></div></div>
  <div class="train-info" aria-live="polite"><div class="train-info-heading"><span>LEVEL & LIMIT BREAK</span><button type="button" class="train-detail-link" onclick="openUnit('${u.id}')">キャラ詳細 ›</button></div>
   <div class="train-level"><strong>Lv.${d.lv}</strong><span>/ 30</span></div><div class="train-progress" role="progressbar" aria-label="育成レベル" aria-valuemin="1" aria-valuemax="30" aria-valuenow="${d.lv}"><i style="width:${Math.max(0,(d.lv-1)/29*100)}%"></i></div>
   <div class="train-stats"><div>HP <strong>${st.hp}</strong></div><div>攻撃 <strong>${st.atk}</strong></div><div>防御 <strong>${st.def}</strong></div></div>
   <div class="train-action-row"><div><b>レベルアップ</b><small>${levelStatus} · 次の費用 ◈ ${d.lv>=30?0:cost.toLocaleString()}</small></div><button type="button" class="btn primary" onclick="levelUp('${u.id}')" ${lvPossible?'':'disabled'}>Lv +1</button></div>
   <div class="train-action-row"><div><b>一括育成</b><small>${nextLv>d.lv?`Lv.${d.lv} → ${nextLv} · ◈ ${batchCost.toLocaleString()}`:d.lv>=30?'レベル上限に到達':'コイン不足'}</small></div><button type="button" class="btn primary" onclick="levelMax('${u.id}')" ${nextLv>d.lv?'':'disabled'}>まとめて育成</button></div>
   <div class="train-action-row"><div><b>限界突破 ${d.lb} / 7</b><small>${unlockStatus} · 重複所持 ${d.copies}</small></div><button type="button" class="btn rose" onclick="limitBreak('${u.id}')" ${lbPossible?'':'disabled'}>限界突破</button></div>
   <p class="train-explain">既存仕様：各ユニット別に最大Lv.30、限界突破7回まで。4〜7回目の限界突破でスキルが強化されます。</p>
  </div>
 </section>
 <section class="train-skills card pad"><div class="train-section-head"><h3>スキルと特性</h3><span>スキル強化 ${rank}/4</span></div><div class="train-skills-grid">${u.s.map((name,i)=>`<div class="train-skill"><b>${esc(name)}</b><p>${esc(skillDescription(u,i,rank))}</p></div>`).join('')}</div><p><b>特性：</b>${esc(unitPassive(u).name)} — ${esc(passiveDescription(u))}</p></section>
 <section class="train-collection" aria-label="所持ユニットから育成対象を選択"><div class="train-section-head"><h3>育成するユニットを選ぶ</h3><span>所持 ${owned.length}体</span></div>
  <div class="train-filterbar" role="group" aria-label="ロールで絞り込む">${filt('role',roles,trainingRoleFilter)}</div>
  <div class="train-filterbar" role="group" aria-label="レアリティで絞り込む">${filt('rarity',rarities.map(x=>[x,x==='all'?'すべて':x]),trainingRarityFilter)}</div>
  <p class="train-result-count">表示 ${shown.length} / ${owned.length}体　※未所持ユニットは表示しません</p>
  ${shown.length?`<div class="train-owned-grid">${cards}</div>`:'<p class="notice">この条件で育成できる所持ユニットはありません。</p>'}
 </section>`;
}
function unitDetail(){
 const u=(heroV0690Visible(unit(S.selected)?.person,S)?unit(S.selected):UNITS.find(x=>heroV0690Visible(x.person,S)&&data(x.id)))||UNITS[0],d=data(u.id),p=person(u),s=d?unitPower(u.id):ROLES[u.role],rank=d?skillRank(u.id):0;
 const temp=isConcept(u.person);
 const status=d?`所持中 · Lv.${d.lv}`:'未所持';
 const lv=d?.lv||1, nextCost=lv*ECONOMY.LEVEL_COST_PER_LV;
 const levelCostMissing=d&&lv<30?Math.max(0,nextCost-S.gold):0;
 const nextLevelText=!d?'仲間を迎えると育成できます':lv>=30?'レベル上限に到達':levelCostMissing?`コインが ◈ ${levelCostMissing.toLocaleString()} 不足`:`次の育成費用 ◈ ${nextCost.toLocaleString()}`;
 const lbText=!d?'未所持':d.lb>=7?'限界突破 MAX':d.copies>0?'限界突破できます':`重複ユニットが必要（所持 ${d.copies}）`;
 return `${heading('CHARACTER ARCHIVE / PROFILE','キャラクター詳細','立ち絵・能力・育成状況をひとつの画面で確認できます。')}<nav class="v0241-detail-nav" aria-label="キャラ画面内の案内"><button type="button" class="btn outline" onclick="change('roster')">‹ キャラ一覧へ</button><button type="button" class="btn primary" onclick="openTrainingFor('${u.id}')" ${d?'':'disabled'}>育成画面へ ›</button><a class="v0241-shortcut" href="#v0241-skills">スキルへ ↓</a></nav>
 <section class="v675-profile" aria-label="${esc(p.name)}のキャラクター詳細">
  <div class="v675-portrait-stage ${unitHasScene(u)?'unit-full-illustration':''} ${NEW_VISUAL_LABELS[u.person]?'new-candidate-portrait':''}">
   <img src="${unitArt(u,'scene')}" alt="${esc(p.name)}のキャラクター画像" class="v675-portrait ${unitHasScene(u)?'unit-scene-art':''} ${u.person==='chinatsu'?'portrait-top':''}">
   <span class="v675-portrait-label">YOIBOSHI · CHARACTER FILE</span>
   <span class="v675-portrait-role">${ROLES[u.role].name}${temp?'（仮）':''}</span>
  </div>
  <div class="v675-profile-body">
   <div class="v675-overline"><span class="v675-rarity v675-${u.rarity.toLowerCase()}">${u.rarity}</span><span>${status}${temp?' · 設定暫定':''}</span></div>
   <h2>${esc(p.name)}</h2><p class="v675-version-title">${esc(u.title)}</p>
   <p class="v675-intro">${esc(p.intro)}</p>${tomoshibiMarkup(u.person)}${NEW_VISUAL_LABELS[u.person]?`<div class="new-candidate-pose-switch"><button type="button" class="btn ${candidatePreviewPose==='standing'?'primary':'outline'}" onclick="candidatePoseChange('standing')">${Number(u.person.slice(7))>=28?'採用立ち絵':'棒立ち'}</button>${ART_V2.full_body_dynamic?.[u.person]?`<button type="button" class="btn ${candidatePreviewPose==='dynamic'?'primary':'outline'}" onclick="candidatePoseChange('dynamic')">動きあり</button>`:''}${ART_V2.full_body_mask?.[u.person]?`<button type="button" class="btn ${candidatePreviewPose==='mask'?'primary':'outline'}" onclick="candidatePoseChange('mask')">マスクあり旧版</button>`:''}</div>`:''}
   <div class="v675-statgrid" aria-label="基礎能力">
     <div><span>HP</span><strong>${s.hp}</strong></div>
     <div><span>攻撃</span><strong>${s.atk}</strong></div>
     <div><span>防御</span><strong>${s.def}</strong></div>
   </div>
   <div class="v675-growth"><span>親密度 <b>${d?.aff||0}</b></span><span>限界突破 <b>${d?.lb||0} / 7</b></span></div>
   <section class="v0241-training-hub" id="v0241-training" aria-label="育成状況と費用" aria-live="polite"><div class="v0241-training-head"><span class="v675-eyebrow">UNIT GROWTH</span><span class="v0241-train-state">${!d?'未所持':lv>=30?'Lv.MAX':levelCostMissing?'コイン不足':'レベルアップ可能'}</span></div><div class="v0241-level-line"><strong>Lv.${d?lv:'—'}</strong><span> / 30</span></div><div class="v0241-level-meter" role="progressbar" aria-label="レベル進行度" aria-valuemin="0" aria-valuemax="30" aria-valuenow="${d?lv:0}"><i style="width:${d?Math.max(0,Math.min(100,lv/30*100)):0}%"></i></div><div class="v0241-training-notes"><p><span>次のレベル</span><strong>${nextLevelText}</strong></p><p><span>限界突破</span><strong>${lbText}</strong></p><p><span>手持ちコイン</span><strong>◈ ${S.gold.toLocaleString()}</strong></p></div></section>
   <div class="v675-profile-actions"><button class="btn primary" ${!d?'disabled':''} onclick="openTrainingFor('${u.id}')">${d?'このユニットを育成する ›':'未所持：育成できません'}</button><button class="btn outline" onclick="change('roster')">編成に戻る</button></div>
  </div>
 </section>
 <section class="v675-skills card pad" id="v0241-skills" aria-label="キャラクタースキル"><div class="v675-section-heading"><div><span class="v675-eyebrow">BATTLE SKILLS</span><h3>戦闘スキル</h3></div><span class="chip">2つの独立スキル</span></div>
 <div class="v675-skill-grid">${u.s.map((name,i)=>`<article class="v675-skill"><span class="v675-skill-glyph">${i===0?'✧':'✦'}</span><div><span class="v675-skill-number">SKILL 0${i+1}</span><h4>${esc(name)}</h4><p>手動発動 · 独立クールタイム ${i===0?'9':'14'}秒</p><p class="v016-skill-effect">${esc(skillDescription(u,i,rank))}</p><small>スキル強化 ${d?rank:0}/4 · 4〜7凸で強化</small></div></article>`).join('')}</div></section>
 <section class="card pad v016-passive-card"><h3>特性（常時発動）</h3><p><b>${esc(unitPassive(u).name)}</b>：${esc(passiveDescription(u))}</p></section>
 <p class="notice v675-notice">基本ステータスにレアリティ補正はありません。バージョン別の能力・育成は独立管理です。新規の衣装・一枚絵は未実装時は従来の立ち絵を表示します。候補キャラの設定は暫定です。</p>`;
}
function levelUp(id){const d=data(id);if(!d||d.lv>=30)return toast('レベル上限です');const cost=d.lv*ECONOMY.LEVEL_COST_PER_LV;if(S.gold<cost)return toast('育成用コインが不足しています');S.gold-=cost;d.lv++;persist();render();toast('レベルが上がりました')}
function totalLevelCost(from,to){
  from=Math.max(1,Math.min(30,Math.floor(from)));to=Math.max(from,Math.min(30,Math.floor(to)));
  return (from+to-1)*(to-from)*ECONOMY.LEVEL_COST_PER_LV/2;
}
function affordableLevel(level,gold){
  let next=Math.max(1,Math.min(30,Math.floor(level))),remaining=Math.max(0,gold);
  while(next<30&&remaining>=next*ECONOMY.LEVEL_COST_PER_LV){remaining-=next*ECONOMY.LEVEL_COST_PER_LV;next++}
  return next;
}
function levelMax(id){
  const d=data(id);if(!d||d.lv>=30)return toast('レベル上限です');
  const before=d.lv,to=affordableLevel(before,S.gold),cost=totalLevelCost(before,to);
  if(to===before)return toast('育成用コインが不足しています');
  S.gold-=cost;d.lv=to;persist();render();toast(`Lv.${before} → Lv.${to} に一括育成（◈ ${cost}）`);
}
function limitBreak(id){const d=data(id);if(!d||d.lb>=7||d.copies<=0)return;d.copies--;d.lb++;persist();render();toast(`${d.lb}回目の限界突破！${d.lb>=4?' スキル強化解放！':''}`)}
function summonHero(){
 const mode=gachaMode==='new19'?'new19':gachaMode!=='normal'&&pickupActive(gachaMode)?gachaMode:'normal';
 const label=mode==='normal'?'通常募集':mode==='new19'?'新ヒロイン19人募集':'期間限定ピックアップ';
 const rates=mode==='new19'?NEW19_RATE:RATE;
 return `<section class="recruit-stage gacha-v030-stage" aria-label="星灯募集ステージ"><div class="gacha-v030-stage-top"><span class="mini-overline">YOIBOSHI · STELLAR RECRUIT</span><span class="gacha-v030-mode">${label}</span></div><div class="recruit-sigil" aria-hidden="true">✦</div><h2>星々の導き、仲間との出会い</h2><p>星灯の光で新しい仲間と出会おう。</p><div class="recruit-balance">所持 星晶石 ✧ <b>${S.gems.toLocaleString()}</b></div><div class="recruit-actions"><button class="btn summon-one" onclick="pull(1)">✧ 1回募集<small>星晶石 ${GACHA_CONFIG.ONE_COST.toLocaleString()}</small></button><button class="btn summon-ten" onclick="pull(10)">✦ 10回募集<small>星晶石 ${GACHA_CONFIG.TEN_COST.toLocaleString()}</small></button></div><p class="recruit-rate">${mode==='new19'?'':`R ${rates.R}% · `}SR ${rates.SR}% · SSR ${rates.SSR}% · UR ${rates.UR}%</p></section>`;
}

function ticketSelectMarkup(){
 const options=ticketEligibleUnits();
 return `<section class="ticket-select card pad" aria-label="初回限定ヒロイン選択チケット"><h3>✦ 初回限定・ヒロイン選択チケット <small>残り ${S.heroSelectTickets||0}枚</small></h3><p>今の通常募集で排出される、まだ所持していないヒロインを1人選んで迎えられます。受け取った後は交流できます。</p>${S.heroSelectTickets&&options.length?`<div class="ticket-choice-grid">${options.map(u=>`<button class="ticket-choice" onclick="grantTicketHero('${u.id}')"><img src="${characterIcon(u.person)}" alt=""><b>${esc(PEOPLE[u.person].name)}</b><small>${u.rarity} · ${esc(u.title)}</small></button>`).join('')}</div>`:S.heroSelectTickets?'<p>現時点では選べる未所持ヒロインがいません。出会いイベントや募集を確認してください。</p>':'<p>選択チケットは使用済みです。</p>'}</section>`
}
function pickupMarkup(){
 const active=['shinonome','oldcafe','station','school_new','seaside','lighthouse','tsubaki','erika','kaname','kaede','chapter3_port','chapter4_city'].filter(group=>pickupActive(group));
 const chosen=gachaMode==='new19'?'new19':gachaMode!=='normal'&&pickupActive(gachaMode)?gachaMode:'normal';
 const labels={shinonome:'東雲商店街',oldcafe:'旧喫茶街',station:'東雲駅前',school_new:'旧校舎・相談室',seaside:'臨海公園',lighthouse:'旧灯台',tsubaki:'神楽坂 椿',erika:'城ヶ崎 エリカ',kaname:'紫藤 カナメ',kaede:'神楽坂 楓',chapter3_port:'第3章・港',chapter4_city:'第4章・点灯式',new19:'新ヒロイン19人（仮）'};
 return `<section class="gacha-v030-mode-picker" aria-label="募集バナーの選択"><div class="gacha-v030-picker-heading"><b>募集バナー</b><small>出会い済みの対象のみ表示</small></div><div class="gacha-v030-mode-scroll"><button class="gacha-v030-choice ${chosen==='normal'?'selected':''}" aria-pressed="${chosen==='normal'}" onclick="setGachaMode('normal')">通常募集</button>${NEW_HERO_IDS_V0500.some(id=>isV0500Revealed(id))?`<button class="gacha-v030-choice ${chosen==='new19'?'selected':''}" aria-pressed="${chosen==='new19'}" onclick="setGachaMode('new19')">新ヒロイン19人 <small>仮配分</small></button>`:''}${active.map(group=>`<button class="gacha-v030-choice ${chosen===group?'selected':''}" aria-pressed="${chosen===group}" onclick="setGachaMode('${group}')">${labels[group]} <small>残り${PICKUP_DAYS-(S.love.day-S.pickupStartDay[group])}日</small></button>`).join('')}</div>${chosen==='normal'?'':`<p class="gacha-v030-pickup-info">${chosen==='new19'?'新ヒロイン専用の仮募集枠。従来の通常募集は変更せず、レアリティ別確率も据え置きです。':labels[chosen]+'の対象キャラは同じレアリティ内で選択重み3倍。レアリティ別確率は変わりません。'}</p>`}</section>`;
}
function recruitmentLineupMarkup(){
 const pool=availableNormalPool();
 const rarities=['UR','SSR','SR',...(gachaMode==='new19'?[]:['R'])];
 return `<details class="recruit-directory gacha-v030-directory"><summary>募集可能ユニット <small>${pool.length}体・タップして確認</small></summary><div class="directory-content"><p class="gacha-v030-small-note">現在のストーリー進行で、通常募集から排出されるユニットです。ピックアップ中もこの対象から抽選されます。</p>${rarities.map(rarity=>{const group=pool.filter(u=>u.rarity===rarity);return group.length?`<section class="gacha-v030-rarity-block"><h4>${rarity} <small>${group.length}体</small></h4><div class="gacha-v030-unit-grid">${group.map(u=>`<div class="gacha-v030-unit-item"><img loading="lazy" src="${u.rarity==='R'?unitCardArt(u):characterIcon(u.person)}" alt=""><span><b>${esc(person(u).name)}</b><small>${esc(u.title)}</small></span><em>${u.rarity}</em></div>`).join('')}</div></section>`:''}).join('')}</div></details>`;
}
function recruitmentDetailsMarkup(){
 const rates=gachaMode==='new19'?NEW19_RATE:RATE;
 const rarities=gachaMode==='new19'?RARITIES.filter(r=>r!=='R'):RARITIES;
 return `<details class="recruit-directory gacha-v030-directory"><summary>提供割合・募集ルール <small>確率・天井を確認</small></summary><div class="directory-content"><div class="gacha-v030-rate-grid">${rarities.map(r=>`<div><strong>${r}</strong><b>${rates[r]}%</b></div>`).join('')}</div><p class="gacha-v030-small-note">同じレアリティ内から対象ユニットを抽選します。URは${GACHA_CONFIG.UR_PITY}回目までに確定。${gachaMode==='new19'?'新ヒロイン募集はSR以上です。':'通常募集にはRも含まれます。'}ピックアップ時は対象キャラの選択重みが3倍になります。課金・購入機能はありません。</p><p class="gacha-v030-small-note">UR天井・消費額・出会い条件は従来と同じです。</p></div></details>`;
}

function nagiTrialBanner(){return S.quests.q6?.complete?`<div class="gachahero nagi-banner"><img src="${characterPortrait('nagi')}" alt="白峰 凪"><div class="words"><span class="chip pink">新キャラ登場・試遊版</span><h2>白峰 凪 ／ 紅の境界</h2><p>寡黙な外部協力者が、新たに募集ラインナップへ。<br>初回限定のお試し募集で、すぐに編成・交流を体験できます。</p><button class="btn nagi-trial" ${S.nagiTrial?'disabled':''} onclick="trialNagiRecruit()">${S.nagiTrial?'お試し募集済み':'凪の無料お試し募集（1回限り）'}</button></div></div>`:''}
function gacha(){
 return `${heading('RECRUITMENT / GACHA','キャラクター募集','募集ボタンと提供内容を分けて、必要な情報だけ開けるようにしました。')}${pickupMarkup()}${summonHero()}${drawResults.length?`<div class="section"><h3>直近の募集結果</h3><small>${drawResults.length}件</small></div><div class="resultgrid">${drawResults.map((r,i)=>{const u=unit(r.id);return `<div class="pullcard" style="animation-delay:${Math.min(8,i)*85}ms"><img src="${unitArt(u,'scene')}" class="${unitHasScene(u)?'unit-scene-art':''}"><b>${u.rarity}　${person(u).name}</b><small>${u.title}<br>${r.isCopy?'重複＋1':'新加入'}<br>${esc(skillDescription(u,0,skillRank(u.id)))}<br>${esc(skillDescription(u,1,skillRank(u.id)))}<br>特性：${esc(passiveDescription(u))}</small></div>`}).join('')}</div>`:''}<div class="gacha-v030-tools" aria-label="募集の詳細メニュー">${recruitmentDetailsMarkup()}${recruitmentLineupMarkup()}<details class="recruit-directory gacha-v030-directory"><summary>初回限定・ヒロイン選択チケット <small>残り ${S.heroSelectTickets||0}枚</small></summary><div class="directory-content">${ticketSelectMarkup()}</div></details>${VISUAL_CANDIDATES.length?`<details class="recruit-directory gacha-v030-directory"><summary>ビジュアル候補のお試し <small>${VISUAL_CANDIDATES.length}人</small></summary><div class="directory-content">${candidateShowcase()}</div></details>`:''}<details class="recruit-directory"><summary>既存キャラクターの個別お試し募集</summary><div class="directory-content"><div class="gachahero reina-banner"><img src="${characterPortrait('reina')}" alt="黒瀬 玲奈のネイビーショートジャケットとグレーカーゴパンツ"><div class="words"><span class="chip pink">新キャラ登場・試遊版</span><h2>黒瀬 玲奈 ／ 静かな闘志</h2><p>宵星相談室の現場調査スタッフ。<br>穏やかだが負けず嫌いなアタッカーです。</p><button class="btn reina-trial" ${S.reinaTrial?'disabled':''} onclick="trialReinaRecruit()">${S.reinaTrial?'玲奈のお試し募集済み':'玲奈の無料お試し募集（1回限り）'}</button></div></div><div class="gachahero akane-banner"><img src="${characterPortrait('akane')}" alt="藤崎 朱音のオレンジジャケットと黒カーゴパンツ"><div class="words"><span class="chip pink">新キャラ登場・試遊版</span><h2>藤崎 朱音 ／ 街を守るオレンジの盾</h2><p>市役所の防災・避難支援担当。<br>みんなの盾となるタンクです。</p><button class="btn akane-trial" ${S.akaneTrial||!!data(R2SR('akane_daily'))?'disabled':''} onclick="trialAkaneRecruit()">${S.akaneTrial||!!data(R2SR('akane_daily'))?'朱音のお試し募集済み':'朱音の無料お試し募集（1回限り）'}</button></div></div><div class="gachahero aoi-banner"><img src="${characterPortrait('aoi')}" alt="瀬名 葵の白Vネックブラウスとダークパンツ"><div class="words"><span class="chip pink">新キャラ登場・試遊版</span><h2>瀬名 葵 ／ 相談室のやすらぎ</h2><p>宵星相談室の正式スタッフ。<br>味方の救護を担うヒーラーです。</p><button class="btn aoi-trial" ${S.aoiTrial||!!data(R2SR('aoi_daily'))?'disabled':''} onclick="trialAoiRecruit()">${S.aoiTrial||!!data(R2SR('aoi_daily'))?'葵のお試し募集済み':'葵の無料お試し募集（1回限り）'}</button></div></div><div class="gachahero chinatsu-banner"><img src="${characterPortrait('chinatsu')}" alt="篠原 千夏の初期衣装"><div class="words"><span class="chip pink">新キャラ登場・試遊版</span><h2>篠原 千夏 ／ 街角の頼れる味方</h2><p>街で活躍する気さくな外部協力者。<br>サポーターとして防護・強化・妨害を試せます。</p><button class="btn chinatsu-trial" ${S.chinatsuTrial?'disabled':''} onclick="trialChinatsuRecruit()">${S.chinatsuTrial?'千夏のお試し募集済み':'千夏の無料お試し募集（1回限り）'}</button></div></div>${nagiTrialBanner()}</div></details></div>`;
}

function previewRecruit(id){
 const u=BYID[id];if(!u||!VISUAL_CANDIDATES.some(v=>v.id===id))return;
 if(!S.visualCandidateTrials||typeof S.visualCandidateTrials!=='object')S.visualCandidateTrials={};
 if(S.visualCandidateTrials[id]||data(id))return toast('この候補はすでに加入済みです');
 S.visualCandidateTrials[id]=true;
 S.owned[id]={lv:1,aff:isHero(unit(id)?.person)?heroAff(unit(id).person):0,lb:0,copies:0};
 S.selected=id;drawResults=[{id,isCopy:false}];S.pulls++;
 persist();render();toast(person(u).name+'が試遊用の仲間として加入しました');
}
function candidatePoseChange(mode){if(!['standing','dynamic','mask'].includes(mode))return;candidatePreviewPose=mode;render()}
function candidateShowcase(){
 const candidateLooks=['茶色ニット','ピースサイン','白チャイナ服','ベレー帽とコート','レースのメイド服','青と金の衣装','紫色の毛先','オフィススタイル','イルミネーション','カメラと緑の衣装'];
 return `<section class="visual-showcase" aria-label="ビジュアル候補${VISUAL_CANDIDATES.length}人">
 <div class="section"><h3>ビジュアル候補${VISUAL_CANDIDATES.length}人 ／ イラスト先行枠</h3></div>
 <p class="notice">登録キャラクターのうち、東雲商店街4人・旧喫茶街4人・東雲駅前6人を除いたイラスト先行枠です。候補29は背景透過済みです。未設定の候補は通常ガチャの対象外で、無料で試遊加入できます。恋愛対象は全${HERO_IDS.filter(id=>heroV0690Visible(id,S)).length}人です。</p>
 <div class="new-candidate-pose-switch" role="group" aria-label="立ち絵ポーズ切り替え"><button type="button" class="btn ${candidatePreviewPose==='standing'?'primary':'outline'}" onclick="candidatePoseChange('standing')">棒立ち</button><button type="button" class="btn ${candidatePreviewPose==='dynamic'?'primary':'outline'}" onclick="candidatePoseChange('dynamic')">動きあり</button><small>動きありは候補11〜27のうち対応画像がある人物のみです。今回の候補28〜36は採用静止画です</small></div>
 <div class="visual-cards">${VISUAL_CANDIDATES.map((u,i)=>{const p=person(u),has=!!data(u.id),newLabel=NEW_VISUAL_LABELS[u.person],desc=newLabel||candidateLooks[i]||'外見仮登録',poseArt=newLabel?candidateDisplayArt(u.person):characterPortrait(u.person);return `<article class="visual-card"><img src="${poseArt}" alt="${esc(p.name)}の採用キャラクター画像" loading="${newLabel?'eager':'lazy'}"><div class="visual-info"><b>${esc(p.name)}</b><span>${esc(desc)}</span><small>設定・能力は試遊用の仮登録</small><button type="button" class="btn mini full" ${has?'disabled':''} onclick="previewRecruit('${u.id}')">${has?'試遊加入済み':'無料で試遊加入'}</button><button type="button" class="btn mini full" onclick="openUnit('${u.id}')">立ち絵・詳細を見る</button></div></article>`}).join('')}</div></section>`;
}
function trialNagiRecruit(){
  if(!S.quests.q6?.complete)return toast('物語を進めると募集が解放されます');
  if(S.nagiTrial)return toast('お試し募集は完了しています');
  // Provisional, non-monetized onboarding gacha only. One new version, no rerolls.
  S.nagiTrial=true;
  const id=R2SR('nagi_dusk'),d=data(id);
  if(d){d.copies++;drawResults=[{id,isCopy:true}]}else{S.owned[id]={lv:1,aff:isHero(unit(id)?.person)?heroAff(unit(id).person):0,lb:0,copies:0};drawResults=[{id,isCopy:false}]}
  S.selected=id;S.pulls++;persist();render();toast('新しい仲間・白峰 凪が加入しました');
}
function trialReinaRecruit(){
 if(S.reinaTrial)return toast('玲奈のお試し募集は完了しています');
 S.reinaTrial=true;
 const id=R2SR('reina_daily'),d=data(id);
 if(d){d.copies++;drawResults=[{id,isCopy:true}]}
 else{S.owned[id]={lv:1,aff:isHero(unit(id)?.person)?heroAff(unit(id).person):0,lb:0,copies:0};drawResults=[{id,isCopy:false}]}
 S.selected=id;S.pulls++;persist();render();toast('新しい仲間・黒瀬 玲奈が加入しました');
}
function trialAkaneRecruit(){
 if(S.akaneTrial||data(R2SR('akane_daily')))return toast('朱音は加入済みです。お試し募集はできません');
 S.akaneTrial=true;
 const id=R2SR('akane_daily'),d=data(id);
 if(d){d.copies++;drawResults=[{id,isCopy:true}]}
 else{S.owned[id]={lv:1,aff:isHero(unit(id)?.person)?heroAff(unit(id).person):0,lb:0,copies:0};drawResults=[{id,isCopy:false}]}
 S.selected=id;S.pulls++;persist();render();toast('新しい仲間・藤崎 朱音が加入しました');
}
function trialAoiRecruit(){
 if(S.aoiTrial||data(R2SR('aoi_daily')))return toast('葵は加入済みです。お試し募集はできません');
 S.aoiTrial=true;
 const id=R2SR('aoi_daily'),d=data(id);
 if(d){d.copies++;drawResults=[{id,isCopy:true}]}
 else{S.owned[id]={lv:1,aff:isHero(unit(id)?.person)?heroAff(unit(id).person):0,lb:0,copies:0};drawResults=[{id,isCopy:false}]}
 S.selected=id;S.pulls++;persist();render();toast('新しい仲間・瀬名 葵が加入しました');
}
function trialChinatsuRecruit(){
 if(S.chinatsuTrial)return toast('千夏のお試し募集は完了しています');
 S.chinatsuTrial=true;
 const id=R2SR('chinatsu_daily'),d=data(id);
 if(d){d.copies++;drawResults=[{id,isCopy:true}]}
 else{S.owned[id]={lv:1,aff:isHero(unit(id)?.person)?heroAff(unit(id).person):0,lb:0,copies:0};drawResults=[{id,isCopy:false}]}
 S.selected=id;S.pulls++;persist();render();toast('新しい仲間・篠原 千夏が加入しました');
}
function pull(n){if(document.getElementById('recruit-reveal'))return;if(![1,10].includes(n))return;const cost=n===10?GACHA_CONFIG.TEN_COST:GACHA_CONFIG.ONE_COST;if(S.gems<cost)return toast('星晶石が足りません');AudioDirector.sfx('gacha');S.gems-=cost;drawResults=[];for(let i=0;i<n;i++){S.pulls++;const u=drawNormalGachaUnit();const d=data(u.id);if(d){d.copies++;drawResults.push({id:u.id,isCopy:true})}else{S.owned[u.id]={lv:1,aff:isHero(u.person)?heroAff(u.person):0,lb:0,copies:0};drawResults.push({id:u.id,isCopy:false})}}persist();render();openRecruitReveal(drawResults.slice());}

// Transient UI only: no write to save data here; pull() already commits its full result.
let recruitPresentation=null;
function rarityColor(r){return ({R:'#83a2b2',SR:'#619dd8',SSR:'#a274d4',UR:'#d8a953'})[r]||'#83a2b2'}
function openRecruitReveal(results){
 if(!Array.isArray(results)||!results.length)return;
 recruitPresentation={results,index:-1,done:false};
 const root=document.createElement('div');root.id='recruit-reveal';root.className='recruit-reveal';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label','募集結果');
 document.body.appendChild(root);root.addEventListener('keydown',function(e){if(e.key==='Escape'){e.preventDefault();skipRecruitReveal()}});
 root.tabIndex=-1;renderRecruitReveal();root.focus();
}
function recruitCardMarkup(result){const u=unit(result.id),p=person(u);return `<article class="recruit-stagecard v024-stagecard ${unitHasScene(u)?'unit-full-illustration':''}"><div class="v024-reveal-flare" aria-hidden="true"></div><img src="${unitArt(u,'scene')}" alt="${esc(p.name)}のイラスト"><div class="detail"><span class="recruit-rarity">${u.rarity}</span><b>${esc(p.name)}</b><small>${esc(u.title)} ｜ ${result.isCopy?'重複（限界突破素材）':'新しい仲間'}</small><p class="v016-recruit-effects">${esc(u.s[0])}：${esc(skillDescription(u,0,skillRank(u.id)))}<br>${esc(u.s[1])}：${esc(skillDescription(u,1,skillRank(u.id)))}<br>特性：${esc(passiveDescription(u))}</p></div></article>`}
function recruitSummaryMarkup(results){return `<div class="recruit-all-grid" aria-label="${results.length}件の募集結果">${results.map(r=>{const u=unit(r.id);return `<div class="recruit-mini-card" style="--mini-color:${rarityColor(u.rarity)}"><img src="${unitCardArt(u)}" class="${unitHasScene(u)?'unit-card-scene':''}" alt="${esc(person(u).name)}"><b>${u.rarity} ${esc(person(u).name)}</b><small>${r.isCopy?'重複':'新加入'}</small></div>`}).join('')}</div>`}
function renderRecruitReveal(){const state=recruitPresentation,root=$('recruit-reveal');if(!root||!state)return;const index=state.index,all=index>=state.results.length, r=!all&&index>=0?state.results[index]:null,rar=r?unit(r.id).rarity:'';root.dataset.rarity=rar;const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 root.innerHTML=`<div class="recruit-box v024-recruit-box"><div class="v024-summon-circles" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="caption">✦ YOIBOSHI CONTRACT · STELLAR RECRUIT ✦</div><h2>${all?'募集結果一覧':index<0?'星灯の契約':'新たな出会い'}</h2>${all?recruitSummaryMarkup(state.results):index<0?`<div class="recruit-spark v024-recruit-spark" aria-hidden="true"><span class="v024-spark-orbit">✦</span>✧</div><p>星灯の輝きが、あなたと仲間を結びます。</p>`:recruitCardMarkup(r)}<p class="recruit-progress" aria-live="polite">${all?`${state.results.length}件の結果を確認できます`:index<0?`募集 ${state.results.length}回・演出を省略できます`:`${index+1} / ${state.results.length}`}</p><div class="recruit-reveal-actions">${all?`<button type="button" onclick="closeRecruitReveal()">結果を閉じる</button>`:`<button type="button" onclick="nextRecruitReveal()">${index<0?'結果を見る':index===state.results.length-1?'一覧を見る':'次の仲間へ'}</button><button type="button" class="secondary" onclick="skipRecruitReveal()">演出を省略</button>`}</div></div>`;
}
function nextRecruitReveal(){if(!recruitPresentation)return;recruitPresentation.index++;renderRecruitReveal()}
function skipRecruitReveal(){if(!recruitPresentation)return;recruitPresentation.index=recruitPresentation.results.length;renderRecruitReveal()}
function closeRecruitReveal(){const root=$('recruit-reveal');if(root)root.remove();recruitPresentation=null}


function heroTalkPage(u){
 if(!romanceHeroAvailable(u.person))u={person:HERO_IDS.find(x=>romanceHeroAvailable(x))||'momoka'};
 const id=u.person,p=PEOPLE[id],aff=heroAff(id),stage=heroStage(aff),l=loveState();
 const owned=UNITS.filter(x=>data(x.id)&&heroV0690Visible(x.person,S)),members=onePortraitPerPerson(owned);
 const nextEpisodes=[0,1,2,3,4].map(i=>{
  const req=(i+1)*20,entry=BOND_STORY_CATALOG[`bond_${id}_${i}`],available=bondAvailable(id,i),read=bondSeen(id,i),missing=bondMemoryHint(id,i);
  if(!entry)return `<div class="v676-episode romance-episode"><span class="v676-episode-no">0${i+1}</span><div><strong>第${i+1}話 · 制作予定</strong><small>親密度${req}以上 · 次回追加</small></div><button disabled>準備中</button></div>`;
  return `<div class="v676-episode romance-episode"><span class="v676-episode-no">0${i+1}</span><div><strong>${esc(entry.title.replace(/^.*?・第\d+話/,`第${i+1}話`))}</strong><small>親密度${req}以上${missing?' · '+esc(missing):''}${available&&!read?' · NEW':read?' · 既読':''}</small></div><button ${available?'':'disabled'} onclick="openBondEpisode('${id}',${i})">${available?read?'再読':'NEW · 読む':'未解放'}</button></div>`;
 }).join('');
 return `${heading('BONDS / DAY BY DAY','交流・日常','誰と、どこへ出かけるか。相手の今日の様子を見て決めましょう。')}
 ${romanceMeetNotices()}<section class="romance-quick-switch"><div class="romance-quick-head"><strong>今日は誰と過ごす？</strong><small>所持しているヒロインと交流 · 1日3行動</small></div><div class="v676-companions" role="group" aria-label="交流可能なヒロインの選択">${HERO_IDS.filter(h=>heroineVisibleInTalk(h)).map(h=>`<button class="v676-companion romance-pick ${romanceHeroAvailable(h)&&h===id?'active':''} ${!romanceHeroAvailable(h)?'romance-locked':''}" aria-pressed="${h===id}" ${romanceHeroAvailable(h)?`onclick="selectRomancePerson('${h}')"`:'disabled'}><img src="${characterIcon(h)}" alt="">${romanceHeroAvailable(h)?`${l.met[h]?'<i class="romance-pick-met">今日お出かけ済み</i>':l.sulking[h]?'<i class="romance-pick-sulk">ごきげん斜め</i>':l.invitation&&l.invitation.person===h&&!l.invitation.used?'<i class="romance-pick-invite">お誘いあり</i>':''}`:''}<span>${esc(heroineDisplayName(h))}${romanceHeroAvailable(h)?`<em class="romance-pick-aff"><i style="width:${heroAff(h)}%"></i></em><small>${heroAff(h)}/100 · ${esc(romanceMoodShort(h))}</small>`:`<small>${h==='nagi'&&!S.quests.q6?.complete?'🔒 物語を進めると交流できます':'🔒 ガチャで迎えると交流できます'}</small>`}</span></button>`).join('')}</div></section>
 <p class="romance-unowned-help">未所持のヒロインはガチャで迎えると交流できます。出会いイベントは所持に関係なく進行します。</p><div class="romance-daybar"><strong>${l.day}日目 · 残り行動 ${l.actions}/${ROMANCE_RULES.ACTIONS_PER_DAY}回 · ${ROMANCE_WEATHER_LABELS[l.weather]}</strong>${l.invitation&&romanceHeroAvailable(l.invitation.person)?`<p class="romance-invite">✦ ${esc(PEOPLE[l.invitation.person].name)}からのお誘い：今日は${esc(ROMANCE_PLACES.find(p=>p.id===l.invitation.place).short)}に行きたい${l.invitation.used?'（お出かけ済み）':''}</p>`:''}<div class="romance-day-actions"><button class="btn outline" onclick="change('notebook')">ヒロイン手帳を見る</button><button class="btn primary" ${l.pending?'disabled':''} onclick="finishRomanceDay()">一日を終える →</button></div></div>
 <div class="v676-talk-shell"><section class="v676-talk-main" aria-label="${esc(heroineDisplayName(id))}と交流"><div class="v676-talk-portrait expression-stage">${expressionPortraitMarkup(id,moodFaceForHero(id),`hero-mood:${id}:${l.day}:${l.mood[id]}:${l.sulking[id]?'sulk':'calm'}`,{wrapperClass:'expr-character-layer',imageClass:'portrait',alt:`${p.name}の立ち絵`})}<span class="v676-portrait-caption">YOIBOSHI · PERSONAL BOND</span></div>
 <div class="v676-talk-dialog"><div class="v676-talk-nameplate"><span>♡ ${esc(heroineDisplayName(id))}</span><small>${esc(stage)}</small></div><p>${esc(loveMoodDescription(id))}</p></div>
 ${romanceTodayCard(id)}<div class="v676-talk-summary"><div><span class="v676-eyebrow">BOND LEVEL · ${esc(stage)}</span><h3>親密度 <b>${aff}</b> <small>/ 100</small></h3><div class="v676-affinity-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${aff}"><i style="width:${aff}%"></i></div></div>
 <button class="v676-chat-button" ${!romanceHeroAvailable(id)||l.actions<=0&&!l.pending?'disabled':''} onclick="${l.pending?'openRomancePending()':`openRomancePlacePicker('${id}')`}">${l.pending?'♡ 帰り道の会話を続ける':'♡ '+heroineDisplayName(id)+'とお出かけ'} <small>${l.pending?'会話の続きがあります':l.actions<=0?'今日の行動は終わりです':`残り${l.actions}回 ・ 行き先を選びます`}</small></button></div></section>
 <aside class="v676-talk-aside">
 ${characterDepthCard(id,aff)}
 ${extraHero(id)?`<section class="v676-talk-card romance-topics"><div class="v676-side-title"><span>DAILY TOPICS</span><h3>日常の話題 · 8話題</h3></div><div class="romance-topic-grid">${romanceTopicLines(id).map((topic,i)=>`<button type="button" class="btn outline mini" onclick="showRomanceTopic('${id}',${i})">${esc(topic.title)}</button>`).join('')}</div><small>話題は自由に読み返せます。行動回数と親密度は変わりません。</small></section>`:''}<section class="v676-talk-card v676-episode-card"><div class="v676-side-title"><span>PERSONAL STORIES</span><h3>絆エピソード · ${esc(stage)}</h3></div>${nextEpisodes}</section><p class="v676-talk-disclaimer">恋愛会話は試作用。好みは訪問後の手帳に記録されます。</p></aside></div>`;
}
function showRomanceTopic(id,index){
 if(!isHero(id)||!romanceHeroAvailable(id))return;
 const topic=romanceTopicLines(id)[index];if(!topic)return;
 dialog={title:`${heroineDisplayName(id)}：${topic.title}`,message:topic.text,html:`<div class="expression-repair">${expressionPortraitMarkup(id,romanceStagePack(loveState(),id)?.topicFaces?.[index]||EXPRESSION_CUES.conversation[id]?.[index]?.[0]||(symbolReactionEnabledV0500(id)?moodFaceForHero(id):'normal'),`topic:${id}:${index}`,{wrapperClass:'expr-character-layer',alt:PEOPLE[id].name})}</div><button type="button" class="btn primary" onclick="dialog=null;render()">交流に戻る</button>`};render();
}
function startHeroChat(id){const u=unit(id);if(u&&isHero(u.person))return startRomanceOuting(u.person)}

function chooseHeroChat(){return toast('おでかけの帰り道で返事を選んでください')}

function talk(){
 // When a previously selected V0.69 heroine is temporarily hidden, show an
 // existing owned heroine without overwriting the player's saved selection.
 if(!heroV0690Visible(loveState()?.activeHero,S)||!heroV0690Visible(unit(S.selected)?.person,S)){
   const fallback=HERO_IDS.find(id=>romanceHeroAvailable(id))||'momoka';
   return heroTalkPage({person:fallback});
 }
 const selectedHero=unit(S.selected);if(loveState()?.activeHero&&isHero(loveState().activeHero))return heroTalkPage({person:loveState().activeHero});if(selectedHero&&isHero(selectedHero.person)&&data(selectedHero.id))return heroTalkPage(selectedHero);
 const units=UNITS.filter(u=>data(u.id)&&heroV0690Visible(u.person,S));const u=heroV0690Visible(unit(S.selected)?.person,S)&&data(S.selected)?unit(S.selected):units[0],d=data(u.id),p=person(u),temp=isConcept(u.person);const people=onePortraitPerPerson(units), variants=units.filter(x=>x.person===u.person);
 const stories=['出会いの日','少しだけ近い距離','相談室の帰り道','ふたりの大切な約束'];
 return `${heading('BONDS / DAILY LIFE','交流・日常','お気に入りの仲間と会話して、親密度を深めましょう。')}
 <div class="v676-talk-shell">
 <section class="v676-talk-main" aria-label="${esc(heroineDisplayName(id))}と交流">
   <div class="v676-talk-portrait"><img src="${characterPortrait(u.person)}" alt="${esc(p.name)}の立ち絵"><span class="v676-portrait-caption">YOIBOSHI · DAILY LIFE</span></div>
   <div class="v676-talk-dialog"><div class="v676-talk-nameplate"><span>♡ ${esc(heroineDisplayName(id))}</span><small>${temp?'設定暫定':esc(p.note)}</small></div><p>${esc(p.lines[Math.min(2,Math.floor(d.aff/35))])}</p></div>
   <div class="v676-talk-summary"><div><span class="v676-eyebrow">BOND LEVEL</span><h3>親密度 <b>${d.aff}</b> <small>/ 100</small></h3><div class="v676-affinity-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${d.aff}"><i style="width:${d.aff}%"></i></div></div><button class="v676-chat-button" ${chatCountToday(u.id)>=ECONOMY.DAILY_CHAT_MAX?'disabled':''} onclick="chat('${u.id}')">♡ 会話する <small>${chatCountToday(u.id)}/${ECONOMY.DAILY_CHAT_MAX}回 · ${chatCountToday(u.id)>=ECONOMY.DAILY_CHAT_MAX?'本日上限':'+8'}</small></button></div>
 </section>
 <aside class="v676-talk-aside">
   <section class="v676-talk-card"><div class="v676-side-title"><span>YOUR COMPANIONS</span><h3>交流する相手</h3></div><div class="v676-companions" role="group" aria-label="交流相手一覧">${people.map(x=>`<button class="v676-companion ${x.person===u.person?'active':''}" aria-pressed="${x.person===u.person}" onclick="selectTalk('${x.id}')"><img src="${characterIcon(x.person)}" alt=""><span>${esc(person(x).name)}</span></button>`).join('')}</div>
   ${variants.length>1?`<div class="v676-talk-versions"><span>キャラクターバージョン</span><div>${variants.map(x=>`<button class="v676-variant ${x.id===u.id?'active':''}" aria-pressed="${x.id===u.id}" onclick="selectTalk('${x.id}')">${x.rarity} · ${esc(x.title)}</button>`).join('')}</div></div>`:''}</section>
   <section class="v676-talk-card v676-episode-card"><div class="v676-side-title"><span>PERSONAL STORIES</span><h3>個別エピソード</h3></div>${[0,30,60,100].map((req,i)=>`<div class="v676-episode"><span class="v676-episode-no">0${i+1}</span><div><strong>${esc(stories[i])}</strong><small>親密度 ${req}以上 ${i===3?'· 特別編準備中':''}</small></div><button ${d.aff<req||i===3?'disabled':''} onclick="episode('${u.id}',${i})">${d.aff>=req&&i!==3?'読む':'未解放'}</button></div>`).join('')}</section>
   <p class="v676-talk-disclaimer">会話・エピソードの一部は試作です。未決定の人物設定は正式仕様には追加していません。各バージョンの親密度は独立しています。</p>
 </aside>
 </div>`;
}

function selectTalk(id){if(isHero(unit(id)?.person)&&!romanceHeroAvailable(unit(id).person))return;S.selected=id;if(isHero(unit(id)?.person))S.love.activeHero=unit(id).person;persist();render()}
function chat(id){const d=data(id);if(!d)return;
 if(isHero(unit(id)?.person))return startHeroChat(id);
 if(chatCountToday(id)>=ECONOMY.DAILY_CHAT_MAX)return toast('このキャラは本日の会話上限（3回）です');
 d.aff=Math.min(100,d.aff+8);S.talks++;
 S.dailyChats[unit(id)?.person||id]={date:todayLocal(),count:chatCountToday(id)+1};
 persist();render();toast('親密度が上がりました ♡');}
function episode(id,i){
 if(isHero(unit(id)?.person))return openBondEpisode(unit(id).person,i);
  if(id===R2SR('reina_daily')){
    const d=data(id),req=[0,30,60][i];if(!d||i>2||d.aff<req)return;
    const parts=[
      '現場調査の資料を整理していた玲奈が、こちらに目を向ける。\n「気になる記録があります。一緒に見てもらえますか？」\n静かな声の奥に、確かな好奇心が感じられた。',
      '細い路地を抜けた夕暮れ。玲奈は調査結果を見直していた。\n「もう一度だけ、確かめたいんです」\n柔らかな笑みの奥に、負けず嫌いな一面が見えた。',
      '任務が終わった帰り道、玲奈は少しだけ歩調を緩めた。\n「今日はあなたのおかげで頑張れました。でも次は、私ももっと力になります」\nその言葉には静かな決意が宿っていた。'
    ];dialog={title:'黒瀬 玲奈・個別エピソード（試作）',message:parts[i]};render();return;
  }
  if(id===R2SR('akane_daily')){
    const d=data(id),req=[0,30,60][i];if(!d||i>2||d.aff<req)return;
    const parts=[
      '防災倉庫で、朱音が備品の点検をしていた。\n「困った人がいたら、まず自分が動かなくちゃ！」\nその声に迷いはなかった。',
      '避難訓練が終わった夕暮れ。朱音は水を一口飲んで笑う。\n「みんなが安心して帰れるのが、私のいちばんのご褒美だよ！」\n夕日がオレンジのジャケットを照らした。',
      'ある夜、調査を終えた帰り道。朱音がそっとつぶやく。\n「怖くないわけじゃないよ。でも、誰かを守りたい気持ちが勝つんだ」\n笑顔の奥に、彼女の強い覚悟が見えた。'
    ];dialog={title:'藤崎 朱音・個別エピソード（試作）',message:parts[i]};render();return;
  }

  if(id===R2SR('aoi_daily')){
    const d=data(id),req=[0,30,60][i];if(!d||i>2||d.aff<req)return;
    const parts=[
      '相談室の机に、葵が小さな救護用品を並べている。\n「困ったときは、遠慮せず声をかけてくださいね」\n丁寧な言葉に、肩の力が少し抜けた。',
      '調査を終えた夕方、葵は疲れた仲間に温かな飲み物を配っていた。\n「今日は頑張りすぎです。みんなで休みましょう」\n自分のことより人を気にかける姿が、印象に残る。',
      '相談室の窓辺で、葵は星灯の記録を静かに見返している。\n「小さな違和感を見逃したくないんです。みんなのためにも」\nその穏やかな声には、確かな意志が宿っていた。'
    ];dialog={title:'瀬名 葵・個別エピソード（試作）',message:parts[i]};render();return;
  }

  if(id===R2SR('chinatsu_daily')){
    const d=data(id),req=[0,30,60][i];if(!d||i>2||d.aff<req)return;
    const parts=[
      '調査の帰り、千夏は相談室に立ち寄った。\n「お疲れ！ 頑張ったね。何かあったら、いつでも声をかけて」\n笑顔につられて、部屋の空気が少しやわらいだ。',
      'いつもの街角で、千夏と偶然出会う。\n「一人で何でもやろうとしなくていいよ。ちゃんと頼って？」\nそう言うと、彼女はいつもの調子で笑った。',
      '調査が長引いた夜。最後まで残っていた千夏が温かい飲み物を差し出す。\n「ほら、ひと休み。明日はみんなで考えよう」\nその明るさに、何度も救われてきた気がする。'
    ];dialog={title:'篠原 千夏・個別エピソード（試作）',message:parts[i]};render();return;
  }
  if(id===R2SR('nagi_dusk')){
    const u=unit(id),d=data(id),req=[0,30,60][i];if(!d||i>2||d.aff<req)return;
    const parts=[
      '星灯の解析端末に、見覚えのない署名が記録されていた。\n「……その波形、消さないで。確認しておきたい」\n彼女は短く告げ、相談室の端で静かに画面を見つめた。',
      '現場の撤収後、凪は遅れて相談室に戻った。\n「……無事だったのね。それなら、いい」\n安堵の気配だけを残し、彼女はまた窓の外へ目を向けた。',
      '夜の相談室。灯りを落とした部屋で、彼女が小さくつぶやく。\n「……何も話さないのは、隠したいからじゃない」\n続きはまだ聞けない。彼女が自分から話せる日を待とう。'
    ];
    dialog={title:'白峰 凪・個別エピソード（試作）',message:parts[i]};render();return;
  }
const u=unit(id),p=person(u),d=data(id),req=[0,30,60][i];if(!d||d.aff<req)return;dialog={title:`${p.name}・個別エピソード`,message:[`相談室の窓から、柔らかな日差しが差し込む。\n「${p.intro}」\n初めて会った日の何気ない会話が、新しい物語のはじまりだった。`,`依頼を終えた帰り道。${p.name}はあなたの歩幅に合わせて歩く。\n「少し遠回りしても、いいですか？」\nいつもと違う景色が見えた。`,`夕暮れの宵星市。${p.name}は星灯をそっとしまう。\n「今日は仕事の話じゃなくて、あなたとお話ししたいな」\n穏やかな時間が流れた。`][i]};render()}
function archive(){
 const owned=UNITS.filter(u=>visibleUnitV026(u)&&data(u.id)&&(!NEW_HERO_IDS_V027.includes(u.person)||isV027HeroRevealed(u.person)));
 const people=Array.from(new Set(owned.map(u=>u.person)));
 const personId=people.includes(archiveSelected)?archiveSelected:people[0];
 const p=personId?PEOPLE[personId]:null;
 const variants=owned.filter(u=>u.person===personId);
 return `${heading('COLLECTION / CHARACTER LIBRARY','キャラクター図鑑','入手した仲間の立ち絵、既存の人物設定、セリフと所持バージョンを見返せます。')}
 <div class="v680-jumpbar"><button class="btn" onclick="change('roster')">キャラ・編成へ戻る</button><span class="chip">登録 ${people.length}人 / ${Object.keys(PEOPLE).filter(id=>!NEW_HERO_IDS_V027.includes(id)||isV027HeroRevealed(id)).length}人 · 所持 ${owned.length}版</span></div>
 ${p?`<section class="v680-archive-feature card"><div class="v680-archive-picture"><img src="${characterArt(personId)}" alt="${esc(p.name)}の立ち絵"></div><div class="v680-archive-copy"><span class="v675-eyebrow">COLLECTION / ${isConcept(personId)?'PROVISIONAL':'PROFILE'}</span><h2>${esc(p.name)}</h2><p>${esc(p.intro)}</p>${tomoshibiMarkup(personId)}<p class="notice">${esc(p.note)}</p><h3>所持バージョン</h3><div class="v680-archive-versions">${variants.map(u=>`<button class="btn" onclick="openUnit('${u.id}')">${esc(u.rarity)} · ${esc(u.title)}（Lv.${data(u.id).lv}）</button>`).join('')}</div><h3>セリフ・会話テキスト</h3><div class="v680-quote-list">${(p.lines||[]).map(line=>`<blockquote>「${esc(line)}」</blockquote>`).join('')}</div>${isConcept(personId)?'<small>仮設定の人物です。未決定のプロフィールは創作していません。</small>':''}</div></section>`:'<div class="card pad">まだ所持キャラクターがいません。</div>'}
 <div class="v680-archive-grid">${people.map(id=>{const x=PEOPLE[id];return `<button class="v680-archive-tile ${id===personId?'selected':''}" onclick="archiveSelect('${id}')" aria-pressed="${id===personId}"><img src="${characterIcon(id)}" alt=""><span>${esc(x.name)}</span><small>${owned.filter(u=>u.person===id).length}バージョン</small></button>`}).join('')}</div>`;
}
function archiveSelect(id){if(!heroV0690Visible(id,S))return;if(NEW_HERO_IDS_V027.includes(id)&&!isV027HeroRevealed(id))return;if(!UNITS.some(u=>u.person===id&&data(u.id)))return;archiveSelected=id;render()}
const ACHIEVEMENTS=[
 {id:'draw_1',name:'最初の出会い',detail:'累計ガチャ1回',type:'pulls',target:1,gems:100,gold:0},
 {id:'draw_10',name:'星灯の仲間',detail:'累計ガチャ10回',type:'pulls',target:10,gems:200,gold:0},
 {id:'draw_30',name:'続く縁',detail:'累計ガチャ30回',type:'pulls',target:30,gems:300,gold:0},
 {id:'levels_8',name:'初めての鍛錬',detail:'所持ユニットのレベル合計8',type:'levels',target:8,gems:0,gold:300},
 {id:'levels_20',name:'頼れる相談室',detail:'所持ユニットのレベル合計20',type:'levels',target:20,gems:150,gold:400},
 {id:'quest_q1',name:'時計音の謎',detail:'商店街の時計音をクリア',type:'q1',target:1,gems:100,gold:100},
 {id:'quest_q2',name:'残された灯り',detail:'閉店したカフェの灯りをクリア',type:'q2',target:1,gems:200,gold:150}
];
function achievementProgress(a){
 if(a.type==='pulls')return Math.max(0,S.pulls||0);
 if(a.type==='levels')return Object.values(S.owned).reduce((n,d)=>n+(Number.isFinite(d.lv)?d.lv:1),0);
 return S.quests[a.type]?.complete?1:0;
}
function claimAchievement(id){
 const a=ACHIEVEMENTS.find(x=>x.id===id);
 if(!a||S.achievements[id]||achievementProgress(a)<a.target)return toast('実績が未達成、または受取済みです');
 S.achievements[id]=true;S.gems+=a.gems;S.gold+=a.gold;persist();render();
 toast(`${a.name}の報酬を受領：${a.gems?'✧ '+a.gems+' ':''}${a.gold?'◈ '+a.gold:''}`);
}
let achievementsOrigin='records';
function openAchievements(from){achievementsOrigin=from||'records';change('achievementsPage')}
function achievementCounts(){const claimed=ACHIEVEMENTS.filter(a=>S.achievements[a.id]).length,claimable=ACHIEVEMENTS.filter(a=>!S.achievements[a.id]&&achievementProgress(a)>=a.target).length;return {claimed,claimable,total:ACHIEVEMENTS.length}}
function homeAchievementCard(){const c=achievementCounts();return `<button type="button" class="mock-side-memo mock-achievement-memo${c.claimable?' has-reward':''}" onclick="openAchievements('home')" aria-label="実績・報酬一覧を開く"><span>✦ 実績・報酬</span><strong>${c.claimable?`受け取れる報酬 ${c.claimable}件`:`受取済み ${c.claimed} / ${c.total}`}</strong><small>一覧を見る　›</small></button>`}
function achievementsPage(){
 const complete=ACHIEVEMENTS.filter(a=>S.achievements[a.id]).length;
 return `${heading('MILESTONES / REWARDS','実績と報酬','ガチャ・育成・ステージ達成で報酬を獲得できます。各報酬は一度だけ受取可能です。')}
 <div class="v680-jumpbar">${achievementsOrigin==='home'?`<button class="btn" onclick="change('home')">ホームへ戻る</button>`:`<button class="btn" onclick="change('records')">記録・設定へ戻る</button>`}<span class="chip">受取済み ${complete} / ${ACHIEVEMENTS.length}</span></div>
 <div class="v680-achievement-grid">${ACHIEVEMENTS.map(a=>{const n=achievementProgress(a),done=n>=a.target,claimed=!!S.achievements[a.id];return `<article class="card pad v680-achievement"><div class="flex space"><h3>${esc(a.name)}</h3><span class="chip">${claimed?'受取済み':done?'達成':'進行中'}</span></div><p>${esc(a.detail)}</p><div class="progress"><i style="width:${Math.min(100,n/a.target*100)}%"></i></div><div class="flex space"><small>${Math.min(n,a.target)} / ${a.target}</small><strong>報酬 ${a.gems?'✧ '+a.gems+' ':''}${a.gold?'◈ '+a.gold:''}</strong></div><button class="btn ${done&&!claimed?'primary':''}" ${!done||claimed?'disabled':''} onclick="claimAchievement('${a.id}')">${claimed?'受取済み':done?'報酬を受け取る':'達成後に受取'}</button></article>`}).join('')}</div>`;
}
function setAudioLevel(kind,value){
 if(kind!=='bgm'&&kind!=='sfx')return;
 S.audio=validAudioSettings({...S.audio,[kind]:Number(value)});
 persist();AudioDirector.applySettings();try{AmbientDirector.applySettings()}catch(_){}
 const out=$(kind+'-volume-value');if(out)out.textContent=String(S.audio[kind]);
}
function setAudioMute(checked){
 S.audio=validAudioSettings({...S.audio,muted:!!checked});
 persist();AudioDirector.applySettings();try{AmbientDirector.applySettings()}catch(_){}
}
function audioSettingsCard(){const a=validAudioSettings(S.audio);return `<section class="card pad audio-settings" aria-label="音の設定"><h3>音の設定</h3><p class="desc">音は最初の操作後に有効になります。</p><div class="audio-controls"><label for="bgm-volume">BGM音量 <output id="bgm-volume-value">${a.bgm}</output>%</label><input id="bgm-volume" type="range" min="0" max="100" step="1" value="${a.bgm}" oninput="setAudioLevel('bgm',this.value)"><label for="sfx-volume">効果音音量 <output id="sfx-volume-value">${a.sfx}</output>%</label><input id="sfx-volume" type="range" min="0" max="100" step="1" value="${a.sfx}" oninput="setAudioLevel('sfx',this.value)"><label class="audio-mute"><input id="audio-muted" type="checkbox" ${a.muted?'checked':''} onchange="setAudioMute(this.checked)">すべての音を消す</label><label class="ambient-toggle"><input type="checkbox" ${readerPrefs().ambient?'checked':''} onchange="setAmbientOn(this.checked)">会話中の環境音（波・雨・風など）を鳴らす</label></div></section>`}
function records(){const hasOld=SaveStore.readLegacy()!==null;return `${heading('RECORD / SETTINGS','記録と設定','')}<section class="card pad tb-setting"><h3>戦闘方式</h3><p>標準はターン制です。すべての本編クエストと自動周回に適用します。旧リアルタイム戦闘も残しておき、ここで切り替えられます。</p><label><input type="radio" name="battleMode" value="turn" ${tbSelected()?'checked':''} onchange="tbSetMode('turn')"> ターン制（標準・推奨）</label><label><input type="radio" name="battleMode" value="legacy" ${!tbSelected()?'checked':''} onchange="tbSetMode('legacy')"> 旧方式（リアルタイム）</label><p class="notice">選択は保存され、次の出撃から適用されます。自動周回はターン制AUTO／旧方式の自動戦闘を切り替えます。ターン制模擬戦とボス試遊は検証用のためターン制固定です。</p></section><div class="v680-jumpbar"><button class="btn primary" onclick="change('archive')">キャラクター図鑑</button><button class="btn primary" onclick="change('zankyoBook')">残響図鑑</button><button class="btn primary" onclick="openAchievements('records')">実績・報酬一覧</button></div>${playerNameSettingCard()}${audioSettingsCard()}${readerSettingsCard()}<section class="card pad tb-training-card" aria-label="灯火・共鳴の模擬戦"><div><span class="v025-demo-label">BATTLE TRAINING</span><h3>ターン制・模擬戦（1ウェーブ）</h3><p>現在の4人編成で、敵選択・弱点・ブレイク・1灯の固有灯火・2灯/3灯共鳴を練習できます。「閉店したカフェの灯り」の戦闘データを使いますが、依頼の解放条件は必要ありません。<strong>勝敗による報酬・クリア記録・セーブ変更はありません。</strong></p></div><button type="button" class="btn primary" onclick="startTurnTraining()">模擬戦を始める →</button></section>${bossTrialCard()}${saveDataCard()}<details class="card pad dev-tools"><summary>開発者向けの項目</summary><div class="dev-tools-body"><section class="card pad v025-demo-card"><div><span class="v025-demo-label">BATTLE PROTOTYPE / Ver.0.27.2.0</span><h3>「残響の檻」ボス戦を試す</h3><p>朔夜・残響の檻・行動予告・3段階のフェーズを、クエスト未解放でも体験できます。体験専用の一時的な能力補正を使用し、セーブ・クリア状況・報酬は変更しません。</p></div><button class="btn primary" type="button" onclick="startQ12Demo()">ボス戦を体験する　→</button></section><div class="grid2"><div class="card pad"><h3>データの状態</h3><div class="statline"><div class="infoitem">旧版セーブ<b>${hasOld?'保存あり':'なし'}</b></div><div class="infoitem">新版セーブ<b>別領域</b></div></div><p class="notice" style="margin:15px 0">旧版の保存キー：${OLD_KEY}<br>新版の保存キー：${KEY}<br>旧版データは読み取り確認のみで、一切書き込み・消去をしません。</p><button class="btn primary" onclick="backup()">旧版＋新版のデータを書き出す</button><button class="btn outline" onclick="downloadSpec()">実装対応表を見る</button><div class="separator"></div><h3>開発中の項目</h3><p class="desc">バトル詳細演出、最終排出率・天井、バージョン別描き下ろし、街移動、個別イベントの本編は未確定または未実装です。</p></div><div class="card pad"><h3>現在の正式仕様</h3><div class="barelist">${['現代都市＋超常ミステリー／主人公は相談室の責任者','異変は過去の痕跡・感情・人為的増幅が関係','星灯：スマホ＋アクセサリー／誰でも使用可能・行政貸与','相談室は市役所と共同運営／対応権限を分担','ガチャ：R・SR・SSR・UR／レアリティ性能差なし','同一人物の複数バージョン・育成は完全別管理','重複は同版の限界突破、最大7回','限界突破：毎回ステータス・4〜7回目にスキル強化','4人編成／同じ人物1人まで・各ロール2人まで／通常戦闘はターン制',`現在の恋愛対象${Object.keys(HEROINE_PROFILES).length}人＋試遊可能なビジュアル候補${VISUAL_CANDIDATES.length}人`,'2スキル・ターン経過による再使用待ち・対象指定'].map(t=>`<div class="bareitem">✓ ${t}</div>`).join('')}</div></div></div><section class="card pad"><h3>音声テスト</h3><button class="btn outline" type="button" onclick="AudioTrial.toggle()">音声テスト（候補A/Bを比較）</button>${AudioTrial.markup()}</section></div></details>`}
function download(name,txt){const a=document.createElement('a');const url=URL.createObjectURL(new Blob([txt],{type:'application/json;charset=utf-8'}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),700)}
// v0.34.37.0: セーブの書き出し・読み込み・保存の維持
let pendingImportSave=null,storagePersistState='unknown';
function saveDataCard(){
 const st=storagePersistState==='granted'?'このブラウザに保存の維持を許可されています。':storagePersistState==='denied'?'保存の維持は許可されませんでした。定期的に書き出しておくと安心です。':storagePersistState==='unsupported'?'このブラウザは保存の維持に対応していません。定期的に書き出しておくと安心です。':'';
 const confirm=pendingImportSave?`<div class="save-import-confirm" role="alertdialog"><p><b>このセーブを読み込みますか？</b><br>今の進行は、読み込んだセーブに置き換わります。今の進行を残したいときは、先に「セーブを書き出す」を押してください。<br>音量・消音はこの端末の設定を維持します。</p><div class="btnrow"><button class="btn primary" type="button" onclick="applyImportSave()">読み込む</button><button class="btn outline" type="button" onclick="cancelImportSave()">やめる</button></div></div>`:'';
 return `<section class="card pad save-data-card" aria-label="セーブデータ"><h3>セーブデータ</h3><p class="desc">進行はこの端末のブラウザの中に保存されています。ブラウザのデータが消えると進行も消えるため、ときどき書き出しておくと安心です。書き出したファイルは、別の端末やブラウザで読み込んで続きから遊べます。</p><div class="btnrow"><button class="btn primary" type="button" onclick="exportSaveData()">セーブを書き出す</button><button class="btn outline" type="button" onclick="openImportSave()">セーブを読み込む</button><button class="btn outline" type="button" onclick="requestStoragePersist()">保存の維持をブラウザに頼む</button></div><input id="save-import-input" type="file" accept=".json,application/json" hidden onchange="importSaveFile(this)">${st?`<p class="tiny save-persist-state">${esc(st)}</p>`:''}${confirm}</section>`;
}
function exportSaveData(){
 persist();
 const d=new Date(),pad=n=>String(n).padStart(2,'0');
 const stamp=`${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
 download(`yoiboshi-save-${stamp}.json`,JSON.stringify({app:'yoiboshi-restart',key:KEY,date:d.toISOString(),save:S},null,1));
 toast('セーブを書き出しました');
}
function openImportSave(){const el=document.getElementById('save-import-input');if(el)el.click();}
function importSaveFile(input){
 const f=input&&input.files&&input.files[0];if(input)input.value='';if(!f)return;
 if(f.size>8*1024*1024)return toast('ファイルが大きすぎます');
 const r=new FileReader();
 r.onload=()=>{try{
  const data=JSON.parse(String(r.result||''));
  const raw=data&&typeof data==='object'?(data.save||data.newSave||data):null;
  if(!raw||typeof raw!=='object'||typeof raw.owned!=='object'||!Array.isArray(raw.party))throw new Error('not a save');
  const migrated=migrateSave(JSON.parse(JSON.stringify(raw)));
  fleshoutMigrateV03413(migrated);
  pendingImportSave=migrated;render();
 }catch(e){pendingImportSave=null;render();toast('このファイルはセーブとして読み込めません');}};
 r.onerror=()=>toast('ファイルを読めませんでした');
 r.readAsText(f);
}
function cancelImportSave(){pendingImportSave=null;render();}
function applyImportSave(){
 if(!pendingImportSave)return;
 // Audio preferences belong to the current device, not the imported progression.
 // migrateSave always inserts an audio object, so `S.audio || audio` cannot
 // preserve the receiver's BGM/SFX/mute settings.
 const deviceAudio=validAudioSettings(S.audio);
 S=pendingImportSave;pendingImportSave=null;
 S.audio=deviceAudio;
 storySession=null;battle=null;dialog=null;
 if(!persist())return;
 AudioDirector.applySettings();try{AmbientDirector.applySettings()}catch(_){}
 toast('セーブを読み込みました');change('home');
}
function requestStoragePersist(){
 try{
  if(!navigator.storage||!navigator.storage.persist){storagePersistState='unsupported';render();return;}
  navigator.storage.persist().then(ok=>{storagePersistState=ok?'granted':'denied';render();}).catch(()=>{storagePersistState='denied';render();});
 }catch(_){storagePersistState='unsupported';render();}
}
try{if(navigator.storage&&navigator.storage.persisted)navigator.storage.persisted().then(ok=>{if(ok)storagePersistState='granted';}).catch(()=>{});}catch(_){}
function backup(){const raw=SaveStore.readLegacy();let old=raw;try{if(raw!==null)old=JSON.parse(raw)}catch(e){}download('yoiboshi-save-backup-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify({date:new Date().toISOString(),oldKey:OLD_KEY,oldSave:old,newKey:KEY,newSave:S},null,2));toast('バックアップファイルを作成しました')}
function downloadSpec(){dialog={title:'実装確認',message:'現在は現代都市UI、星灯調査、加入ガチャ、4レアリティ、別版独立育成、重複による7凸、4役割・4枠編成、ターン制の通常戦闘、各キャラの2スキル、弱点・ブレイク・灯火・共鳴を実装しています。\n\n特殊ボス戦と自動周回にはまだ従来戦闘エンジンを使用します。敵の細部やガチャ確率は検証用です。'};render()}
function dialogMarkup(){const d=dialog;return `<div class="overlay" role="dialog" aria-modal="true"><div class="dialog"><div class="eyebrow">YOIBOSHI CITY</div><h2>${esc(d.title)}</h2><p>${esc(d.message)}</p>${d.html||''}<div style="text-align:right;margin-top:17px"><button class="btn primary" onclick="closeDialog()">閉じる</button>${isSessionLocked()?'<button type="button" class="btn outline" onclick="requestInterrupt()">中断</button>':''}</div></div></div>`}
function closeDialog(){
 const after=pendingStory;
 dialog=null;questActionInProgress=false;romanceSelectionInProgress=false;pendingStory=null;
 if(after?.type==='post'&&!S.storyFlags?.[after.storyId]&&storyAllowed(after.storyId)){
  questStoryFlow=after;openStory(after.storyId);return;
 }
 if(S.onboarding?.enabled&&S.onboarding.stage==='home'&&!onboardingSuppressed){view='home';render();return}render()}
function syncLobbyRail(){requestAnimationFrame(()=>{const rail=document.querySelector('.lobby-people'),current=rail?.querySelector('.lobby-face.active');if(!rail||!current)return;const rr=rail.getBoundingClientRect(),cr=current.getBoundingClientRect();rail.scrollLeft+=cr.left-rr.left-(rr.width-cr.width)/2;})}
const SCREENS=Object.freeze({opening:openingPage,nameEntry:playerNameEntryPage,nameGreeting:playerNameGreetingPage,home,city,investigation:investigationPage,notebook:romanceNotebook,date:dateScenePage,prologue:prologuePage,story:()=>storySession?chapterStoryPage():storyMenu(),roster,unit:unitDetail,training:trainingPage,gacha,talk,records,archive,zankyoBook:()=>typeof zankyoBookPage==='function'?zankyoBookPage():'',achievementsPage});
function installBreathingArt(root){
 const imgs=root.querySelectorAll('.home-backdrop-char,.title-hero img,.spotlight-portrait img,.v675-portrait,.charcard .art img,.v676-talk-portrait>img,.story-character img,.story-character>.expr-character-img,.expr-character-layer img,.team-preview-item .art img,.slot-choice img');
 imgs.forEach((img,index)=>{img.classList.add('breathing-art');img.style.setProperty('--breath-delay',`${(index%11)*-.43}s`);});
}
function showRuntimeFallback(error){
  console.error('[Yoiboshi] Render failed:',error);
  const root=$('app');if(!root)return;
  root.innerHTML='<section class="runtime-fallback" role="alert"><h2>画面を表示できませんでした</h2><p>保存データは削除していません。ホームへ戻って再試行できます。</p><button type="button" onclick="recoverHome()">ホームに戻る</button></section>';
}
function recoverHome(){
  cancelAnimationFrame(activeTimer);battle=null;dialog=null;view='home';
  render();
}
function render(){
  try {
    if(view==='combat'&&battle&&!battle.done){renderCombatFrame(true);return}
    const screen=SCREENS[view]||SCREENS.home;
    const root=$('app'); if(!root)throw new Error('Missing #app root');
    root.innerHTML=view==='title'?titlePage():['opening','nameEntry','nameGreeting'].includes(view)?screen():mainShell(screen());
    if(!['opening','nameEntry','nameGreeting','title'].includes(view))root.insertAdjacentHTML('beforeend',onboardingGuideMarkup());
    if(activeOnboardGuide()==='map')root.querySelector('.qmap-pin')?.classList.add('onb-target');
    const homeGuide=activeOnboardGuide();
    const homeTabLabels={home_gacha:'ガチャ',home_talk:'交流',home_roster:'キャラ・編成',home_city:'クエスト'};
    if(homeTabLabels[homeGuide])root.querySelectorAll('.sidebar .navbtn,.bottomnav button').forEach(tab=>{if(tab.getAttribute('aria-label')===homeTabLabels[homeGuide])tab.classList.add('onb-nav-target')});
    if(interruptConfirm&&view!=='title')root.insertAdjacentHTML('beforeend',interruptMarkup());
    installBreathingArt(root);
    if(dialog)clearToast();
    if(view==='home')syncLobbyRail();
    AudioDirector.sync(currentAudioContext());
    try{AmbientDirector.sync(currentAudioContext())}catch(_){}
  }catch(error){showRuntimeFallback(error)}
}
// Provisional balance details; approved initial battle camera is 2D top-down, wave-based.
// RE:START F09–F12: combat data and simulation are independent of 2D rendering.
const STAGE_TRAVEL_TIME=2.7;
// v0.6.9.0 enemy-only balance coefficients; ally stats and combat rules are unchanged.
const ENEMY_BALANCE=Object.freeze({q1:Object.freeze({hp:1.8,atk:3.0}),q2:Object.freeze({hp:1.6,atk:1.75}),q3:Object.freeze({hp:2.076,atk:2.926}),q4:Object.freeze({hp:2.048,atk:2.432}),q5:Object.freeze({hp:1.922,atk:2.087}),q6:Object.freeze({hp:1.716,atk:2.015}),q7:Object.freeze({hp:1.768,atk:1.976}),q8:Object.freeze({hp:1.733,atk:1.957}),q9:Object.freeze({hp:1.616,atk:1.8}),q10:Object.freeze({hp:1.551,atk:1.707}),q11:Object.freeze({hp:1.633,atk:1.783}),q12:Object.freeze({hp:1.36,atk:1.46}),q13:Object.freeze({hp:1.535,atk:1.647}),q14:Object.freeze({hp:1.398,atk:1.501}),q15:Object.freeze({hp:1.464,atk:1.57}),q16:Object.freeze({hp:1.446,atk:1.55}),q17:Object.freeze({hp:1.087,atk:1.139}),q18:Object.freeze({hp:1.165,atk:1.238}),q19:Object.freeze({hp:1.318,atk:1.397}),q20:Object.freeze({hp:1.377,atk:1.455}),q21:Object.freeze({hp:1.35,atk:1.422}),q22:Object.freeze({hp:1.263,atk:1.326}),q23:Object.freeze({hp:1.114,atk:1.167}),q24:Object.freeze({hp:1.183,atk:1.236}),q25:Object.freeze({hp:1.652,atk:1.652}),q26:Object.freeze({hp:1.626,atk:1.626}),q27:Object.freeze({hp:1.26,atk:1.26}),q29:Object.freeze({hp:3.647,atk:3.647}),q30:Object.freeze({hp:1.586,atk:1.586}),q31:Object.freeze({hp:1.6,atk:1.6}),q32:Object.freeze({hp:1.62,atk:1.62}),q33:Object.freeze({hp:1.64,atk:1.64}),q34:Object.freeze({hp:1.3,atk:1.6}),q36:Object.freeze({hp:1.66,atk:1.66}),q37:Object.freeze({hp:1.66,atk:1.66}),q38:Object.freeze({hp:1.68,atk:1.68}),q39:Object.freeze({hp:1.7,atk:1.7}),q40:Object.freeze({hp:1.4,atk:1.6}),q41:Object.freeze({hp:1.66,atk:1.68}),q42:Object.freeze({hp:1.66,atk:1.7}),q43:Object.freeze({hp:1.68,atk:1.7}),q44:Object.freeze({hp:1.7,atk:1.72}),q45:Object.freeze({hp:1.4,atk:1.62}),q46:Object.freeze({hp:1.35,atk:1.66}),q47:Object.freeze({hp:1.6,atk:1.7}),q48:Object.freeze({hp:1.66,atk:1.72}),q49:Object.freeze({hp:1.68,atk:1.72}),q50:Object.freeze({hp:1.7,atk:1.74}),q51:Object.freeze({hp:1.7,atk:1.74}),q53:Object.freeze({hp:3.0,atk:2.6}),q54:Object.freeze({hp:1.72,atk:1.76}),q55:Object.freeze({hp:1.72,atk:1.76}),q56:Object.freeze({hp:1.74,atk:1.78}),q57:Object.freeze({hp:1.6,atk:1.76}),q58:Object.freeze({hp:1.35,atk:1.7}),q59:Object.freeze({hp:1.7,atk:1.78}),q60:Object.freeze({hp:1.72,atk:1.78}),q61:Object.freeze({hp:1.74,atk:1.8}),q62:Object.freeze({hp:1.75,atk:1.8}),q63:Object.freeze({hp:1.76,atk:1.82}),q64:Object.freeze({hp:1.77,atk:1.82}),q65:Object.freeze({hp:1.78,atk:1.84}),q66:Object.freeze({hp:1.8,atk:1.86}),q67:Object.freeze({hp:1.8,atk:1.86}),q68:Object.freeze({hp:1.81,atk:1.87}),q69:Object.freeze({hp:1.82,atk:1.88}),q70:Object.freeze({hp:1.83,atk:1.88}),q71:Object.freeze({hp:1.86,atk:1.9}),q72:Object.freeze({hp:1.84,atk:1.9}),q73:Object.freeze({hp:1.86,atk:1.9}),q74:Object.freeze({hp:1.87,atk:1.91}),q75:Object.freeze({hp:1.88,atk:1.92}),q76:Object.freeze({hp:1.89,atk:1.92}),q77:Object.freeze({hp:1.92,atk:1.95}),q78:Object.freeze({hp:1.9,atk:1.94}),q79:Object.freeze({hp:1.9,atk:1.94}),q80:Object.freeze({hp:1.91,atk:1.95}),q81:Object.freeze({hp:1.4,atk:1.8}),q82:Object.freeze({hp:1.93,atk:1.96}),q83:Object.freeze({hp:1.95,atk:1.98}),q84:Object.freeze({hp:1.94,atk:1.98}),q85:Object.freeze({hp:1.94,atk:1.98}),q86:Object.freeze({hp:1.95,atk:1.99}),q87:Object.freeze({hp:1.97,atk:2.0}),q88:Object.freeze({hp:1.97,atk:2.0}),q89:Object.freeze({hp:1.5,atk:1.9}),q90:Object.freeze({hp:1.98,atk:2.02}),q91:Object.freeze({hp:1.98,atk:2.02}),q92:Object.freeze({hp:1.99,atk:2.03}),q93:Object.freeze({hp:2.0,atk:2.04}),q94:Object.freeze({hp:2.01,atk:2.05}),q95:Object.freeze({hp:2.04,atk:2.07}),q96:Object.freeze({hp:2.02,atk:2.06}),q97:Object.freeze({hp:2.02,atk:2.06}),q98:Object.freeze({hp:2.03,atk:2.07}),q99:Object.freeze({hp:2.04,atk:2.08}),q100:Object.freeze({hp:2.05,atk:2.08}),q101:Object.freeze({hp:2.08,atk:2.1}),q102:Object.freeze({hp:2.06,atk:2.1}),q103:Object.freeze({hp:2.08,atk:2.11}),q104:Object.freeze({hp:2.09,atk:2.12}),q105:Object.freeze({hp:2.1,atk:2.13}),q106:Object.freeze({hp:2.11,atk:2.13}),q107:Object.freeze({hp:2.14,atk:2.16}),q108:Object.freeze({hp:2.12,atk:2.15}),q109:Object.freeze({hp:2.13,atk:2.16}),q110:Object.freeze({hp:2.14,atk:2.17}),q111:Object.freeze({hp:2.15,atk:2.18}),q112:Object.freeze({hp:2.16,atk:2.18}),q113:Object.freeze({hp:2.2,atk:2.22}),q114:Object.freeze({hp:2.17,atk:2.2}),q115:Object.freeze({hp:2.18,atk:2.21}),q116:Object.freeze({hp:2.19,atk:2.22}),q117:Object.freeze({hp:2.2,atk:2.22}),q118:Object.freeze({hp:2.22,atk:2.24}),q119:Object.freeze({hp:2.3,atk:2.3}),q120:Object.freeze({hp:2.22,atk:2.25}),q121:Object.freeze({hp:2.23,atk:2.26}),q122:Object.freeze({hp:2.24,atk:2.27}),q123:Object.freeze({hp:2.25,atk:2.28}),q124:Object.freeze({hp:2.26,atk:2.28}),q125:Object.freeze({hp:2.27,atk:2.29}),q126:Object.freeze({hp:2.3,atk:2.31}),q127:Object.freeze({hp:2.31,atk:2.32}),q128:Object.freeze({hp:2.32,atk:2.33}),q129:Object.freeze({hp:2.33,atk:2.34}),q130:Object.freeze({hp:2.34,atk:2.34}),q131:Object.freeze({hp:2.35,atk:2.35}),q132:Object.freeze({hp:2.38,atk:2.38}),q133:Object.freeze({hp:2.39,atk:2.39}),q134:Object.freeze({hp:2.4,atk:2.4}),q135:Object.freeze({hp:2.41,atk:2.41}),q136:Object.freeze({hp:2.42,atk:2.42}),q137:Object.freeze({hp:2.46,atk:2.46}),q138:Object.freeze({hp:2.43,atk:2.44}),q139:Object.freeze({hp:2.44,atk:2.45}),q140:Object.freeze({hp:2.45,atk:2.46}),q141:Object.freeze({hp:2.46,atk:2.47}),q142:Object.freeze({hp:2.47,atk:2.47}),q143:Object.freeze({hp:2.51,atk:2.51}),q144:Object.freeze({hp:2.48,atk:2.49}),q145:Object.freeze({hp:2.49,atk:2.5}),q146:Object.freeze({hp:2.5,atk:2.51}),q147:Object.freeze({hp:2.51,atk:2.52}),q148:Object.freeze({hp:2.52,atk:2.52}),q149:Object.freeze({hp:2.56,atk:2.56}),q150:Object.freeze({hp:2.53,atk:2.54}),q151:Object.freeze({hp:2.54,atk:2.55}),q152:Object.freeze({hp:2.55,atk:2.56}),q153:Object.freeze({hp:2.56,atk:2.57}),q154:Object.freeze({hp:2.57,atk:2.57}),q155:Object.freeze({hp:2.61,atk:2.61}),q156:Object.freeze({hp:2.58,atk:2.59}),q157:Object.freeze({hp:2.59,atk:2.6}),q158:Object.freeze({hp:2.6,atk:2.61}),q159:Object.freeze({hp:2.61,atk:2.62}),q160:Object.freeze({hp:2.62,atk:2.62}),q161:Object.freeze({hp:2.66,atk:2.66}),q162:Object.freeze({hp:2.63,atk:2.64}),q163:Object.freeze({hp:2.64,atk:2.65}),q164:Object.freeze({hp:2.65,atk:2.66}),q165:Object.freeze({hp:2.66,atk:2.67}),q166:Object.freeze({hp:2.67,atk:2.67}),q167:Object.freeze({hp:2.71,atk:2.71}),q168:Object.freeze({hp:2.68,atk:2.69}),q169:Object.freeze({hp:2.69,atk:2.7}),q170:Object.freeze({hp:2.7,atk:2.71}),q171:Object.freeze({hp:2.71,atk:2.72}),q172:Object.freeze({hp:2.72,atk:2.72}),q173:Object.freeze({hp:2.8,atk:2.78}),q174:Object.freeze({hp:2.73,atk:2.74}),q175:Object.freeze({hp:2.74,atk:2.75}),q176:Object.freeze({hp:2.75,atk:2.76}),q177:Object.freeze({hp:2.76,atk:2.77}),q178:Object.freeze({hp:2.77,atk:2.77}),q179:Object.freeze({hp:2.81,atk:2.81}),q180:Object.freeze({hp:2.78,atk:2.79}),q181:Object.freeze({hp:2.79,atk:2.8}),q182:Object.freeze({hp:2.8,atk:2.81}),q183:Object.freeze({hp:2.81,atk:2.82}),q184:Object.freeze({hp:2.82,atk:2.82}),q185:Object.freeze({hp:2.86,atk:2.86}),q186:Object.freeze({hp:2.83,atk:2.84}),q187:Object.freeze({hp:2.84,atk:2.85}),q188:Object.freeze({hp:2.85,atk:2.86}),q189:Object.freeze({hp:2.86,atk:2.87}),q190:Object.freeze({hp:2.87,atk:2.87}),q191:Object.freeze({hp:2.91,atk:2.91}),q192:Object.freeze({hp:2.88,atk:2.89}),q193:Object.freeze({hp:2.89,atk:2.9}),q194:Object.freeze({hp:2.9,atk:2.91}),q195:Object.freeze({hp:2.91,atk:2.92}),q196:Object.freeze({hp:2.92,atk:2.92}),q197:Object.freeze({hp:2.96,atk:2.96}),q198:Object.freeze({hp:2.93,atk:2.94}),q199:Object.freeze({hp:2.94,atk:2.95}),q200:Object.freeze({hp:2.95,atk:2.96}),q201:Object.freeze({hp:2.96,atk:2.97}),q202:Object.freeze({hp:2.97,atk:2.97}),q203:Object.freeze({hp:3.01,atk:3.01}),q204:Object.freeze({hp:2.98,atk:2.99}),q205:Object.freeze({hp:2.99,atk:3.0}),q206:Object.freeze({hp:3.0,atk:3.01}),q207:Object.freeze({hp:3.01,atk:3.02}),q208:Object.freeze({hp:3.02,atk:3.02}),q209:Object.freeze({hp:3.06,atk:3.06}),q210:Object.freeze({hp:3.03,atk:3.04}),q211:Object.freeze({hp:3.04,atk:3.05}),q212:Object.freeze({hp:3.05,atk:3.06}),q213:Object.freeze({hp:3.06,atk:3.07}),q214:Object.freeze({hp:3.07,atk:3.07}),q215:Object.freeze({hp:3.11,atk:3.11}),q216:Object.freeze({hp:3.08,atk:3.09}),q217:Object.freeze({hp:3.09,atk:3.1}),q218:Object.freeze({hp:3.1,atk:3.11}),q219:Object.freeze({hp:3.11,atk:3.12}),q220:Object.freeze({hp:3.12,atk:3.12}),q221:Object.freeze({hp:3.16,atk:3.16}),q222:Object.freeze({hp:3.13,atk:3.14})});
// Creature parameters come from QUESTS and ENEMY_BALANCE; q1/q2 formulas are unchanged.
const ENEMY_TYPES=Object.freeze({normal:{icon:'✧',hp:1,atk:1,interval:2.1,damageReduction:0},swift:{icon:'↯',hp:.67,atk:.8,interval:1.22,damageReduction:0},armored:{icon:'▣',hp:1.45,atk:1.02,interval:2.5,damageReduction:.25},boss:{icon:'◈',hp:1.8,atk:1.12,interval:2.1,damageReduction:.12}});
function enemyType(q,idx,i,elite){
 if(q.chapter===0)return 'normal';
 if(elite)return 'boss'; // v0.34.37.0: 第1章以降は、各依頼の最後の敵をボスにする
 if(Number(q.id.slice(1))>=4&&(idx+i)%3===1)return 'armored';
 return (idx+i)%2===0?'swift':'normal';
}
function makeWave(q,idx){
 if(q.id==='q52')return [{id:'touko-boss',name:'白鷺透子',max:999999999,hp:999999999,x:83,y:49,atk:28,attackTimer:2,elite:true,kind:'boss',icon:'◈',interval:2.1,damageReduction:.995,shield:0,taunt:0,regenUntil:0,regenNext:0,regenAmount:0,rallyUntil:0,rallyMult:1,healBuffUntil:0,healBuffMult:1,damageReduceUntil:0,damageReduceMult:1,defenseBuffUntil:0,defenseBuffMult:1,counterUntil:0,counterPower:0,coverUntil:0,coveredBy:-1}];
 if(q.id==='q35')return [{id:'aoi-dark-boss',name:'黒い灯の葵',max:999999999,hp:999999999,x:83,y:49,atk:26,attackTimer:2,elite:true,kind:'boss',icon:'◈',interval:2.1,damageReduction:.995,shield:0,taunt:0,regenUntil:0,regenNext:0,regenAmount:0,rallyUntil:0,rallyMult:1,healBuffUntil:0,healBuffMult:1,damageReduceUntil:0,damageReduceMult:1,defenseBuffUntil:0,defenseBuffMult:1,counterUntil:0,counterPower:0,coverUntil:0,coveredBy:-1}];

 const last=idx===q.waves-1,count=last?2:(idx%2===0?2:3),factor=ENEMY_BALANCE[q.id]||{hp:1,atk:1};
 return Array.from({length:count},(_,i)=>{
  const elite=last&&i===count-1,kind=enemyType(q,idx,i,elite),type=ENEMY_TYPES[kind];
  // For q1/q2 type multipliers are 1 and keep precisely the previous arithmetic.
  const hpBase=q.baseHp+idx*23+(elite?72:0)+i*9;
  const max=Math.round(hpBase*factor.hp*type.hp);
  const atk=(q.baseAtk+idx*2+(elite?3:0))*factor.atk*type.atk;
  const name=kind==='boss'?q.enemy:kind==='swift'?'疾走する残響':kind==='armored'?'装甲の擬似体':elite?q.enemy:i===0?'残響の影':'小さな擬似体';
  return {id:`w${idx}e${i}`,name,max,hp:max,x:74+(i%2)*15,y:26+(i/Math.max(1,count-1))*49,
    atk,attackTimer:1.1+i*.34,elite,kind,icon:type.icon,interval:type.interval,damageReduction:type.damageReduction,enraged:false};
 });
}
function enemyDamage(e,raw){return Math.max(1,Math.round(raw*(1-(e.damageReduction||0))))}
function allyAttackDamage(e,raw,options={}){
 const reduction=options.pierce?Math.max(1,Math.round(raw)):enemyDamage(e,raw);
 const damage=reduction*(e.vulnerableUntil>battle?.sim?(e.vulnerableMult||1.2):1);
 const effective=Math.max(1,Math.round(Q12HD.damage(battle,e,damage*(battle?.investigation?.weakness?1.3:1))));
 if(options.pierce)return effective;
 if((e.shield||0)>0){const absorbed=Math.min(e.shield,effective);e.shield-=absorbed;return effective-absorbed}
 return effective;
}
function investigationIncomingDamage(raw){return battle?.investigation?.safety?Math.max(0,Math.round(raw*.7)):raw;}
function bossRage(e){if(battle?.qid==='q12')return;if(e?.kind==='boss'&&!e.enraged&&e.hp>0&&e.hp<e.max*.5){e.enraged=true;e.attackTimer=Math.min(e.attackTimer,e.interval*.65);if(battle)logBattle(`${e.name}が怒り状態！ 攻撃間隔が短くなった。`)}}
function startQ12Demo(){
 if(view==='combat'||!S.gameStarted)return;
 if(!requireValidParty())return;
 startBattle('q12',null,true);
 if(!battle||!battle.preview)return;
 // Demo-only stat adjustment is transient. S.owned / S.party / save data are unchanged.
 for(const ally of battle.allies){ally.hp*=4;ally.max*=4;ally.atk*=3.8;ally.def*=2.0;ally.attackTimer=.25}
 battle.wave=battle.totalWaves-1;
 if(battle.turnBattle){tbNewWave(QUEST_BY_ID.q12);}
 else{battle.phase='advance';launchWave();}
 if(battle?.q12hd?.cage){for(const foe of battle.enemies.filter(e=>e.kind==='boss'||e.kind==='cage')){foe.max=Math.round(foe.max*3);foe.hp=foe.max}}
 if(battle){battle.log.unshift('体験モード：ボス戦から開始。編成・育成・報酬・クリア記録への反映はありません。');renderCombatFrame(true)}
}
// v03430: repeatable, reward-free turn training. No progression or save writes.
// v0.34.64.0: 設定画面の「ボス戦の試遊」。最終ウェーブ（ボス）から始め、報酬・進行・セーブは変えない
function bossTrials(){return [{qid:'q12',name:'朔夜',sub:'第2章・旧灯台地下「残響の檻」',img:'assets/ART_V2/story_cast/sakuya_talk.webp'},{qid:'q17',name:'売人イブキ',sub:'第3章・埋立地の夜市',img:'assets/ART_V2/story_cast/ibuki_talk.webp'},{qid:'q24',name:'霧島ハルカ',sub:'第4章・点灯式の準備会場',img:'assets/ART_V2/story_cast/haruka_talk.webp'},{qid:'q28',name:'氷室沙耶',sub:'第5章・旧灯台の灯室',img:'assets/ART_V2/story_cast/saya_talk.webp'},{qid:'q34',name:'売人イブキ（再戦）',sub:'第6章・夜市の跡',img:'assets/ART_V2/story_cast/ibuki_talk.webp'},{qid:'q35',name:'黒い灯の葵',sub:'第6章・勝利不要のイベント戦',img:'assets/ART_V2/story_cast/aoi_dark_talk.webp'},{qid:'q40',name:'黒い灯の葵（撃退戦）',sub:'第7章・相談室の裏通り',img:'assets/ART_V2/story_cast/aoi_dark_talk.webp'},{qid:'q45',name:'黒い灯の葵（対話）',sub:'第8章・灯台の扉',img:'assets/ART_V2/story_cast/aoi_dark_talk.webp'},{qid:'q46',name:'久遠ルリ',sub:'第8章・星読みの決戦',img:'assets/ART_V2/story_cast/ruri_talk.webp'},{qid:'q52',name:'白鷺透子',sub:'第9章・勝利不要のイベント戦',img:'assets/ART_V2/story_cast/touko_true_talk.webp'},{qid:'q58',name:'白鷺透子（最終決戦）',sub:'第10章・灯の部屋',img:'assets/ART_V2/story_cast/touko_true_talk.webp'},{qid:'q81',name:'白鷺透子（迎えの灯）',sub:'第2部第4章・坑道の最奥',img:'assets/ART_V2/story_cast/touko_true_talk.webp'},{qid:'q89',name:'宵宮槐',sub:'第2部第5章・旧灯台の灯室',img:'assets/ART_V2/story_cast/enju_talk.webp'}];}
function startBossTrial(qid){
  if(view!=='records'||!S.gameStarted)return;
  if(!bossTrials().some(t=>t.qid===qid))return;
  startBattle(qid,null,'boss-trial');
  if(!battle||!battle.preview)return;
  battle.bossTrial=true;
  if(battle.turnBattle&&typeof tbNewWave==='function'){battle.wave=battle.totalWaves-1;tbNewWave(QUEST_BY_ID[qid]);}
  render();
}
function bossTrialCard(){return `<section class="card pad boss-trial-card" aria-label="ボス戦の試遊"><div><span class="v025-demo-label">BOSS TRIAL</span><h3>ボス戦の試遊</h3><p>今の4人編成で、ボスの最終ウェーブから戦えます。登場演出・掛け合い・第2形態・必殺技・専用BGMを確認できます。依頼の解放条件は必要ありません。<strong>報酬・依頼の進行・セーブデータは変わりません。</strong></p></div><div class="boss-trial-list">${bossTrials().map(t=>`<button type="button" class="boss-trial-btn" onclick="startBossTrial('${t.qid}')"><img src="${t.img}" alt=""><span><b>${t.name}</b><small>${t.sub}</small></span></button>`).join('')}</div></section>`;}
function startTurnTraining(){
  if(view!=='records'||!S.gameStarted)return;
  // UI-only: short landscape view opens the already-available experimental two-column mode.
  if(typeof tbWidePreview!=='undefined'&&window.innerWidth>window.innerHeight&&window.innerHeight<=500)tbWidePreview=true;
  startBattle('q2',null,'turn-training');
}
function startBattle(id,grind=null,preview=false){
  const isTraining=preview==='turn-training';
  if(!requireValidParty())return;
  if(preview&&id!=='q12'&&!isTraining&&!(preview==='boss-trial'&&bossTrials().some(t=>t.qid===id)))return;
  if(isTraining&&(id!=='q2'||grind))return;
  const q=QUEST_BY_ID[id];if(!q||(!preview&&!questUnlocked(q)))return toast('前の依頼を解決すると解放されます');
  if(grind&&!S.quests[id]?.complete)return toast('未クリアの依頼は自動周回できません');
  if(!grind&&!preview&&!S.quests[id]?.complete&&S.investigations?.[id]?.phase!=='ready'){startInvestigation(id);return;}
  if(!grind&&!preview&&!S.quests[id]?.complete){
   const pre=questPreBattleStory(id);
   if(pre){questStoryFlow={type:'pre',qid:id,storyId:pre};openStory(pre);return;}
  }
  const heroes=visibleParty().map((v,i)=>{const s=unitPower(v);return {
    id:v,hp:s.hp,max:s.hp,x:18+(i%2)*22,y:30+Math.floor(i/2)*45,
    atk:s.atk,def:s.def,spd:s.rate,attackTimer:.4+i*.19,cooldowns:[0,0],shield:0,taunt:0,regenUntil:0,regenNext:0,regenAmount:0,rallyUntil:0,rallyMult:1,healBuffUntil:0,healBuffMult:1,damageReduceUntil:0,damageReduceMult:1,defenseBuffUntil:0,defenseBuffMult:1,counterUntil:0,counterPower:0,coverUntil:0,coveredBy:-1
  }});
  questActionInProgress=false;
  AudioDirector.sfx('confirm');
  if(typeof ycBattleReset==='function')ycBattleReset();
  battle={effect:null,qid:id,allies:heroes,enemies:[],phase:'advance',wave:0,totalWaves:isTraining?1:q.waves,training:isTraining,
    travel:0,progress:0,sim:0,wall:0,done:false,auto:true,selection:null,preview:!!preview,
    log:[isTraining?'模擬戦：セーブ・報酬・依頼進行に影響しません。':'住民の安全を確認。現場へ進みます。'],investigation:isTraining?null:!S.quests[id]?.complete?{weakness:!!S.investigations?.[id]?.solved,safety:!!(S.investigations?.[id]?.hero==='akane'&&S.investigations?.[id]?.skillUsed),hero:S.investigations?.[id]?.hero||null}:null,buff:0,slow:false,grind,autoSkills:!!grind,popups:[],logOpen:false};
  Q12HD.init(battle);Q12C.init(battle);applyBattleStartPassives();view='combat';lastFrame=0;cancelAnimationFrame(activeTimer);
  if(typeof tbEligible==='function'&&tbEligible(id,grind,preview)){tbInit();tbRender();window.scrollTo(0,0);return;}
  renderCombatFrame(true);activeTimer=requestAnimationFrame(tick);window.scrollTo(0,0);
}
function launchWave(){
  if(!battle||battle.done||battle.phase!=='advance')return;
  const q=QUESTS.find(x=>x.id===battle.qid);
  battle.phase='fight';battle.travel=STAGE_TRAVEL_TIME;battle.enemies=makeWave(q,battle.wave);battle.popups=[];
  battle.allies.forEach((a,i)=>{a.x=22+(i%2)*22;a.y=30+Math.floor(i/2)*45; a.attackTimer=Math.max(.18,a.attackTimer)});
  Q12HD.spawn(battle);
  logBattle(`WAVE ${battle.wave+1}/${battle.totalWaves}｜敵を確認、前進停止！`);
  renderCombatFrame(true);
}
function advanceNextWave(){
  if(!battle||battle.done)return;
  battle.wave++;
  if(battle.wave>=battle.totalWaves){finishBattle(true);return}
  battle.phase='advance';battle.travel=0;battle.enemies=[];battle.popups=[];
  battle.selection=null;battle.slow=false;
  battle.allies.forEach((a,i)=>{a.x=18+(i%2)*22;a.y=30+Math.floor(i/2)*45});
  logBattle('敵全滅。隊列を整え、自動前進を再開します。');
  renderCombatFrame(true);
}
function cancellation(){if(battle){battle.selection=null;battle.slow=false}renderCombatFrame(true)}
function rememberBattleLog(open){if(battle)battle.logOpen=!!open}
function battlePage(){
  const q=QUESTS.find(x=>x.id===battle.qid),progress=battle.wave;
  return `${battle.qid==='q12'?heading('CHAPTER 2 / FINAL BOSS','残響の檻 — 決戦',`旧灯台地下・全${battle.totalWaves}ウェーブ。朔夜と残響の檻を突破し、楓を救出せよ。`):heading('FIELD OPERATION / TOP-DOWN','星灯・現場対応',`${q.name}｜2D見下ろし・自動前進＋${battle.totalWaves}ウェーブ。敵が出現すると前進を停止します。`)}
   <div class="battle-layout wave-battle ${battle.qid==='q12'?'v025-q12':''} ${Q12C.scene(battle)?'qcin-active':''}"><div class="card pad">
    <div class="wave-header"><div><b class="wave-main">WAVE <span id="wave-now">${Math.min(battle.wave+1,battle.totalWaves)}</span> <small>/ ${battle.totalWaves}</small></b><span id="wave-phase" class="chip pink">移動中</span></div><span class="tiny" id="clock">${battle.sim.toFixed(1)}秒</span></div>
    ${Q12HD.panel(battle)}${Q12C.controls(battle)}
    ${battle.grind?`<div class="v680-loop-status" role="status">オート周回 ${battle.grind.repeatWon+1}/3 · 通常攻撃とスキルを自動実行 · 中断可能</div>`:''}
    <div class="wave-steps" aria-label="ウェーブ進行">${Array.from({length:battle.totalWaves},(_,i)=>`<span class="wave-step ${i<progress?'cleared':i===progress?'current':''}" data-wave="${i}">${i===battle.totalWaves-1?'BOSS':`${i+1}`}</span>`).join('')}</div>
    <div class="v024-battle-stage"><div class="arena overhead" id="arena" aria-label="見下ろし型戦闘フィールド"></div><div id="ycLegacyStage" class="yc-legacy-stage" aria-label="味方のちびキャラ"></div><div class="v024-wave-callout" id="v024-wave-callout" aria-live="polite" aria-atomic="true"></div></div>
    <div class="travel-bar"><div id="travel-fill"></div></div>
    <div id="battle-brief" class="hint">進行中は自動移動。敵を発見すると停止して戦闘します。</div>
    
   </div><div class="card battlehud"><div class="flex space" style="margin-bottom:8px"><b>スキル指示</b><span class="tiny">2個 × 4人</span></div>
    ${battle.qid==='q58'?'<div class="ibuki-boss-panel" id="ibuki-boss-panel" hidden><img src="assets/enemies/touko_true.webp" alt="白鷺透子"><div><strong>白鷺 透子</strong><small>灯の部屋・最終決戦</small></div></div>':battle.qid==='q52'?'<div class="ibuki-boss-panel" id="ibuki-boss-panel" hidden><img src="assets/enemies/touko_true.webp" alt="白鷺透子・正体の姿"><div><strong>白鷺 透子</strong><small>灯室の戦い・耐えるか全滅で進行</small></div></div>':battle.qid==='q46'?'<div class="ibuki-boss-panel" id="ibuki-boss-panel" hidden><img src="assets/enemies/ruri.webp" alt="久遠ルリ"><div><strong>久遠 ルリ</strong><small>星読みの決戦・灯室</small></div></div>':battle.qid==='q45'?'<div class="ibuki-boss-panel" id="ibuki-boss-panel" hidden><img src="assets/enemies/aoi_dark.webp" alt="黒い灯の葵"><div><strong>黒い灯の葵</strong><small>葵との対話・灯台の扉</small></div></div>':battle.qid==='q40'?'<div class="ibuki-boss-panel" id="ibuki-boss-panel" hidden><img src="assets/enemies/aoi_dark.webp" alt="黒い灯の葵"><div><strong>黒い灯の葵</strong><small>沙耶の警告・二度目の対峙</small></div></div>':battle.qid==='q35'?'<div class="ibuki-boss-panel" id="ibuki-boss-panel" hidden><img src="assets/enemies/aoi_dark.webp" alt="黒い灯の葵"><div><strong>黒い灯の葵</strong><small>勝利不要・耐えるか全滅で進行</small></div></div>':battle.qid==='q34'?'<div class="ibuki-boss-panel" id="ibuki-boss-panel" hidden><img src="assets/enemies/ibuki_battle.webp" alt="売人イブキ"><div><strong>売人イブキ</strong><small>裏切りの夜市・最終ウェーブ</small></div></div>':battle.qid==='q28'?'<div class="ibuki-boss-panel" id="ibuki-boss-panel" hidden><img src="assets/enemies/saya.webp" alt="氷室沙耶"><div><strong>氷室 沙耶</strong><small>灯室の副会長・銀の星灯</small></div></div>':battle.qid==='q17'?'<div class="ibuki-boss-panel" id="ibuki-boss-panel" hidden><img src="assets/enemies/ibuki_battle.webp" alt="売人イブキ"><div><strong>売人イブキ</strong><small>夜市の最終ウェーブ</small></div></div>':''}
    <div class="toggle"><button onclick="toggleTarget('auto')" class="${battle.auto?'selected':''}">対象自動</button><button onclick="toggleTarget('manual')" class="${!battle.auto?'selected':''}">対象指定</button></div>
    <div id="ally-skills" class="v688-ally-skills"></div><div id="v016-skill-help" class="v016-skill-help" role="status" aria-live="polite"></div><div class="v688-combat-actions"><button class="btn outline mini" onclick="requestInterrupt()">作戦中断</button><button id="target-cancel" class="btn outline mini" hidden onclick="cancellation()">ターゲット選択をキャンセル</button></div><details class="v688-combat-log" id="combat-log-details" ${battle.logOpen?'open':''} ontoggle="rememberBattleLog(this.open)"><summary>行動ログ <span class="tiny">開いて確認</span></summary><div id="battle-log" class="battlelog"></div></details>
   </div></div>`;
}
function battleStatuses(entity,enemy=false){
 if(!battle)return [];
 const t=battle.sim,out=[];
 if(!enemy){
  if(entity.shield>0)out.push(['shield','◇',`防護 ${Math.ceil(entity.shield)}`]);
  if(entity.regenUntil>t)out.push(['heal','✚',`継続回復 残り${Math.ceil(entity.regenUntil-t)}秒`]);
  if(entity.rallyUntil>t)out.push(['up','↑',`攻撃強化 残り${Math.ceil(entity.rallyUntil-t)}秒`]);
  if(entity.taunt>t)out.push(['taunt','◎',`挑発 残り${Math.ceil(entity.taunt-t)}秒`]);
  if(entity.healBuffUntil>t)out.push(['heal','✚',`回復量アップ 残り${Math.ceil(entity.healBuffUntil-t)}秒`]);
  if(entity.damageReduceUntil>t)out.push(['shield','◇',`被ダメージ軽減 残り${Math.ceil(entity.damageReduceUntil-t)}秒`]);
  if(entity.defenseBuffUntil>t)out.push(['shield','◇',`防御アップ 残り${Math.ceil(entity.defenseBuffUntil-t)}秒`]);
  if(entity.counterUntil>t)out.push(['up','↩',`反撃態勢 残り${Math.ceil(entity.counterUntil-t)}秒`]);
  if(entity.coverUntil>t)out.push(['shield','◇',`身代わり 残り${Math.ceil(entity.coverUntil-t)}秒`]);
 }else{
  if(entity.weakenUntil>t)out.push(['down','↓',`攻撃低下 残り${Math.ceil(entity.weakenUntil-t)}秒`]);
  if(entity.vulnerableUntil>t)out.push(['down',entity.charmedUntil>t?'♡':'▽',`${entity.charmedUntil>t?'見とれ中・':''}防御低下 残り${Math.ceil(entity.vulnerableUntil-t)}秒`]);
  if(entity.staggerUntil>t)out.push(['delay','◷',`行動遅延 残り${Math.ceil(entity.staggerUntil-t)}秒`]);
 }
 return out;
}
function statusMarkup(entity,enemy=false){const states=battleStatuses(entity,enemy);
 return states.length?`<span class="v680-statuses" aria-label="状態効果">${states.map(([cls,symbol,desc])=>`<span class="v680-status ${cls}" title="${esc(desc)}" aria-label="${esc(desc)}">${symbol}</span>`).join('')}</span>`:'';
}
function battlePopup(entity,amount,kind='enemy',critical=false){
 if(!battle||!entity||!Number.isFinite(amount)||amount<=0)return;
 if(kind==='enemy'||kind==='ally')AudioDirector.sfx('hit');
 const big=amount>=45||amount>=entity.max*.23;
 battle.popups.push({x:entity.x,y:entity.y,amount:Math.round(amount),kind,critical,big,time:battle.sim});
 if(battle.popups.length>30)battle.popups.splice(0,battle.popups.length-30);Q12C.onPopup(entity,kind);
 if(typeof ycEvent==='function'&&battle.allies.includes(entity))ycEvent(kind==='heal'?'heal':'hurt',entity,amount);
}
function popupMarkup(){
 battle.popups=battle.popups.filter(p=>battle.sim-p.time<1.05);
 return battle.popups.map(p=>{const a=Math.max(0,battle.sim-p.time),f=a/1.05;
 const dy=10-52*f-12*Math.sin(Math.PI*Math.min(1,f*2)),sc=1+.3*Math.sin(Math.PI*Math.min(1,f*1.35));
 return `<span class="v680-damage ${p.kind==='ally'?'taken':''} ${p.critical?'critical':''} ${p.big?'massive':''}" style="left:${p.x}%;top:${p.y}%;opacity:${Math.max(0,1-Math.pow(f,2)).toFixed(2)};transform:translate(-50%,${dy.toFixed(0)}px) scale(${sc.toFixed(2)})">${p.critical?'CRITICAL! ':''}${p.amount}</span>`}).join('');
}
function renderCombatFrame(full){
  if(!battle)return;
  if(battle.turnBattle){tbRender();return;}
  AudioDirector.sync(currentAudioContext());
  try{AmbientDirector.sync(currentAudioContext())}catch(_){}
  if(full||!$('arena'))$('app').innerHTML=mainShell(battlePage())+onboardingGuideMarkup();
  const arena=$('arena'),bars=$('ally-skills'),log=$('battle-log');if(!arena||!bars)return;
  const fighting=battle.phase==='fight',selected=battle.selection;
   const stage=$('v024-wave-callout');
   if(stage){
     const hasBoss=fighting&&battle.enemies.some(e=>e.hp>0&&e.kind==='boss');
     const phaseKey=`${battle.qid}-${battle.wave}-${battle.phase}-${hasBoss?'boss':'normal'}`;
     if(stage.dataset.phaseKey!==phaseKey){
       stage.dataset.phaseKey=phaseKey;
       stage.classList.remove('v024-callout-show','v024-callout-boss');
       stage.textContent=hasBoss?'BOSS ENCOUNTER':fighting?`WAVE ${battle.wave+1} · ENGAGE`:`WAVE ${Math.min(battle.wave+1,battle.totalWaves)} · APPROACH`;
       stage.classList.toggle('v024-callout-boss',hasBoss);
       // Re-trigger only on wave/phase changes, not on each combat animation frame.
       void stage.offsetWidth;
       stage.classList.add('v024-callout-show');
     }
   }
  arena.classList.toggle('marching',!fighting);arena.classList.toggle('v025-boss-arena',Q12HD.active(battle));
  arena.style.setProperty('--travel',`${Math.floor((battle.wave+battle.travel/STAGE_TRAVEL_TIME)*84)}px`);
  if(Q12C.scene(battle)){if(!arena.querySelector('.qcin-world'))arena.innerHTML=Q12C.arena(battle,selected,'',statusMarkup);Q12C.syncScene(arena,battle,selected,popupMarkup());}else arena.innerHTML=(Q12HD.active(battle)?'<div class="v025-mist"></div>':'')+`<div class="field-legend"><span>✦ 宵星市・${esc(QUEST_BY_ID[battle.qid]?.location||'宵星市')}</span><strong>${fighting?'交戦中・前進停止':'現場へ自動前進中 →'}</strong></div>`+
  battle.allies.map((a,i)=>{const u=unit(a.id);return `<button class="token ally rarity-${u.rarity.toLowerCase()} ${a.hp<=0?'dead':''} ${selected?.kind==='ally'?'targetable':''}" style="left:${a.x}%;top:${a.y}%" onclick="clickTarget('ally',${i})" aria-label="味方${person(u).name}"><div class="face"><img src="${characterIcon(u.person)}" alt=""></div><div class="health"><i style="width:${Math.max(0,a.hp/a.max*100)}%"></i></div><span class="nm">${esc(person(u).name)}</span><span class="v688-token-rarity">${u.rarity} · ${esc(u.title)}</span>${statusMarkup(a)}</button>`}).join('')+
  battle.enemies.map((e,i)=>`<button class="token enemy v024-enemy ${e.hp<=0?'dead':''} ${selected?.kind==='enemy'?'targetable':''} ${e.elite?'elite':''} ${e.kind||''} ${e.enraged?'enraged':''} ${e.charmedUntil>battle.sim?'v016-charmed':''}" style="left:${e.x}%;top:${e.y}%" onclick="clickTarget('enemy',${i})" aria-label="敵${e.name}"><div class="face">${battle.qid==='q12'?Q12HD.enemyFace(e):(battle.qid==='q17'&&e.kind==='boss'?'<img class="ibuki-token-icon" src="assets/enemies/ibuki_battle.webp" alt="売人イブキ">':(e.icon|| (e.elite?'◈':'✧')))}</div><div class="health"><i style="width:${Math.max(0,e.hp/e.max*100)}%"></i></div><span class="nm">${e.name}</span>${statusMarkup(e,true)}</button>`).join('')+
  popupMarkup()+(battle.effect&&battle.sim-battle.effect.time<.85?`<div class="battle-fx ${battle.effect.kind==='enemy'?'hit':'heal'}">${esc(battle.effect.name)} ✧</div>`:'');
  const ibukiPanel=$('ibuki-boss-panel');if(ibukiPanel)ibukiPanel.hidden=!battle.enemies.some(e=>e.kind==='boss'&&e.hp>0);
  const help=$('v016-skill-help');if(help)help.innerHTML=battle.skillInfo?`<b>${esc(battle.skillInfo.title)}</b><p>${esc(battle.skillInfo.description)}</p><button class="btn mini" onclick="showSkillHelp(-1,-1)">閉じる</button>`:'';
  const skillHtml=battle.allies.map((a,i)=>{const u=unit(a.id),left=a.cooldowns.map(t=>Math.max(0,t-battle.sim));return `<div class="unitline v688-unitline rarity-${u.rarity.toLowerCase()}"><div class="v688-unit-identity"><img class="v688-unit-face" src="${characterIcon(u.person)}" alt=""><div class="v688-unit-data"><strong>${esc(person(u).name)} <span class="v688-rarity-label">${u.rarity}</span></strong><small title="${esc(u.title)}">${esc(u.title)}</small><div class="v688-hp"><i style="width:${Math.max(0,a.hp/a.max*100)}%"></i></div><small class="v688-hp-numeric">HP ${Math.ceil(a.hp)}/${a.max}</small>${statusMarkup(a)}</div></div><div class="v688-skill-pair">${u.s.map((name,j)=>`<div class="v016-skill-cell"><button type="button" class="skillbtn v688-skillbtn" ${a.hp<=0||left[j]>0||battle.done||!fighting?'disabled':''} onclick="pressSkill(${i},${j})"><span class="v688-skill-name">${esc(name)}</span>${left[j]>0?`<span class="v688-cooldown" aria-label="残り${left[j].toFixed(1)}秒">${left[j].toFixed(1)}s</span><span class="v688-cooldown-track" style="--remain:${Math.min(100,left[j]/(j===0?9:14)*100)}%"></span>`:''}</button><button type="button" class="v016-info-button" onclick="showSkillHelp(${i},${j})" aria-label="${esc(name)}の効果を見る">ⓘ</button></div>`).join('')}</div></div>`}).join('');
  if(!Q12C.scene(battle)||full||!bars.children.length)bars.innerHTML=skillHtml;else Q12C.syncSkills(bars,battle);
  Q12HD.updateHud(battle);Q12C.refresh(battle);
  if(log){log.innerHTML=battle.log.slice(-12).map(s=>`<div>${esc(s)}</div>`).join('');if(battle.logOpen)log.scrollTop=log.scrollHeight;}
   const cancelTarget=$('target-cancel');if(cancelTarget)cancelTarget.hidden=!(selected&&!battle.auto);
  const label=$('wave-phase');if(label)label.textContent=battle.slow?'対象指定中：スローモーション':fighting?'交戦中・前進停止':'移動中・自動前進';
  const b=$('battle-brief');if(b)b.textContent=battle.slow?'スロー中：光る対象をタップするとスキル発動。キャンセル可能。':fighting?'敵を全滅させると次のウェーブへ自動前進します。':'自動前進中。次の交戦地点まで進んでいます。';
  const fill=$('travel-fill');if(fill)fill.style.width=(fighting?100:Math.min(100,battle.travel/STAGE_TRAVEL_TIME*100))+'%';
  if($('clock'))$('clock').textContent=battle.sim.toFixed(1)+'秒';
  if($('wave-now'))$('wave-now').textContent=Math.min(battle.wave+1,battle.totalWaves);
  document.querySelectorAll('.wave-step').forEach((el,i)=>{el.classList.toggle('cleared',i<battle.wave);el.classList.toggle('current',i===battle.wave)});
  if(typeof ycRenderLegacy==='function')ycRenderLegacy();
}
function logBattle(text){battle.log.push(text);if(battle.log.length>70)battle.log.shift()}
// Explicit effect targeting replaces the old role-and-slot switch.
function skillTarget(u,j){return SKILL_TARGET[unitSkillType(u,j)]||'enemy'}
function toggleTarget(mode){if(!battle)return;battle.auto=mode==='auto';if(battle.auto){battle.selection=null;battle.slow=false}renderCombatFrame(true)}
function showSkillHelp(i,j){if(!battle)return;if(i<0){battle.skillInfo=null;renderCombatFrame(true);return}const a=battle.allies[i];if(!a)return;const u=unit(a.id);battle.skillInfo={title:person(u).name+'「'+u.s[j]+'」',description:skillDescription(u,j,skillRank(a.id))+' / 特性：'+passiveDescription(u)};renderCombatFrame(true)}
function pressSkill(i,j){if(!battle||battle.done||battle.phase!=='fight')return;const a=battle.allies[i],u=unit(a.id);if(a.hp<=0||a.cooldowns[j]>battle.sim)return;const kind=skillTarget(u,j);if(!battle.auto){battle.selection={i,j,kind};battle.slow=true;renderCombatFrame(true);return}let index=skillAutoTarget(kind,i,j);if(index<0)return;applySkill(i,j,kind,index);if(battle)renderCombatFrame(true)}
function skillAutoTarget(kind,i,j){
 const type=unitSkillType(unit(battle.allies[i].id),j);
 if(type==='reset_one'||type==='cover'){
  const allies=battle.allies.map((a,n)=>({a,n})).filter(v=>v.n!==i&&v.a.hp>0);
  if(!allies.length)return -1;
  allies.sort((x,y)=>type==='reset_one'?(y.a.cooldowns.reduce((n,v)=>n+Math.max(0,v-battle.sim),0)-x.a.cooldowns.reduce((n,v)=>n+Math.max(0,v-battle.sim),0)):(x.a.hp/x.a.max-y.a.hp/y.a.max));
  return allies[0].n;
 }
 return autoTarget(kind,i);
}
function autoTarget(kind,i){if(kind==='enemy'){const pool=battle.enemies.map((e,n)=>({...e,n})).filter(e=>e.hp>0).sort((a,b)=>a.hp/a.max-b.hp/b.max);if(Q12HD.active(battle)){const want=Q12HD.choose(battle,battle.enemies.filter(e=>e.hp>0));if(want)return battle.enemies.indexOf(want)}return pool.length?pool[0].n:-1}const pool=battle.allies.map((a,n)=>({...a,n})).filter(a=>a.hp>0).sort((a,b)=>a.hp/a.max-b.hp/b.max);return pool.length?pool[0].n:-1}
function clickTarget(kind,i){const sl=battle?.selection;if(!sl||sl.kind!==kind||battle.phase!=='fight')return;if(kind==='enemy'&&(!battle.enemies[i]||battle.enemies[i].hp<=0))return;if(kind==='ally'&&(!battle.allies[i]||battle.allies[i].hp<=0))return;applySkill(sl.i,sl.j,kind,i);if(battle){battle.selection=null;battle.slow=false;renderCombatFrame(true)}}
function applyBattleStartPassives(){
 if(!battle)return;
 const allies=battle.allies;
 for(const a of allies){
  const u=unit(a.id),pass=unitPassive(u),strength=passiveValue(u);
  if(pass.type==='start_shield')a.shield+=strength;
  if(pass.type==='team_start_atk')for(const ally of allies){ally.rallyUntil=Math.max(ally.rallyUntil||0,10);ally.rallyMult=Math.max(ally.rallyMult||1,1+strength/100)};
 }
}
function passiveAttackMultiplier(a,e){
 const u=unit(a.id),p=unitPassive(u),v=passiveValue(u)/100;
 if(p.type==='attack')return 1+v;
 if(p.type==='finish'&&e.hp/e.max<=.5)return 1+v;
 if(p.type==='weaken_finish'&&e.vulnerableUntil>battle.sim)return 1+v;
 return 1;
}
function passiveHealMultiplier(a,teammate){const u=unit(a.id),p=unitPassive(u),v=passiveValue(u)/100;return 1+(p.type==='heal'?v:((p.type==='rescue'&&teammate.hp/teammate.max<=.5)?v:0))}
function passiveShieldMultiplier(a,teammate){const u=unit(a.id),p=unitPassive(u),v=passiveValue(u)/100;return 1+((p.type==='shield_low'&&teammate.hp/teammate.max<=.5)||p.type==='shield'?v:0)}
function passiveIncomingMultiplier(a){const p=unitPassive(unit(a.id));return p.type==='guard'?1-passiveValue(unit(a.id))/100:1}
function tickTimedEffects(){
 if(!battle)return;
 const t=battle.sim;
 for(const a of battle.allies){
  if(a.regenUntil>0&&a.regenNext>0){
   while(a.regenNext<=t&&a.regenNext<=a.regenUntil&&a.hp>0){const amt=Math.min(a.max-a.hp,Math.round((a.regenAmount||0)*(a.healBuffUntil>t?(a.healBuffMult||1):1)));a.hp+=amt;a.regenNext+=2;if(amt>0){battlePopup(a,amt,'heal');logBattle(`${person(unit(a.id)).name}の継続回復 +${amt}HP`)}}
   if(t>=a.regenUntil){a.regenUntil=0;a.regenNext=0;a.regenAmount=0}
  }
  if(a.rallyUntil<=t)a.rallyMult=1;
  if((a.healBuffUntil||0)<=t)a.healBuffMult=1;
  if((a.damageReduceUntil||0)<=t)a.damageReduceMult=1;
  if((a.defenseBuffUntil||0)<=t)a.defenseBuffMult=1;
  if(a.counterUntil&&a.counterUntil<=t){a.counterUntil=0;a.counterPower=0}
  if(a.coverUntil&&a.coverUntil<=t){a.coverUntil=0;a.coveredBy=-1}
 }
 for(const e of battle.enemies){
  if(e.vulnerableUntil&&t>=e.vulnerableUntil){e.vulnerableUntil=0;e.vulnerableMult=1;e.charmedUntil=0}
  if(e.weakenUntil&&t>=e.weakenUntil){e.weakenUntil=0;e.weakenMult=1}
  if(e.staggerUntil&&t>=e.staggerUntil)e.staggerUntil=0;
 }
}
function applySkill(i,j,kind,target){
 if(!battle||battle.done||battle.phase!=='fight')return;
 const a=battle.allies[i];if(!a||a.hp<=0||a.cooldowns[j]>battle.sim)return;
 const u=unit(a.id),type=unitSkillType(u,j),expected=skillTarget(u,j),rank=skillRank(a.id),boost=1+rank*.13;
 if(kind!==expected)return;
 const enemy=kind==='enemy'?battle.enemies[target]:null,teammate=kind==='ally'?battle.allies[target]:null;
 if(kind==='enemy'&&(!enemy||enemy.hp<=0)||kind==='ally'&&(!teammate||teammate.hp<=0))return;
 if((type==='cover'||type==='reset_one')&&teammate===a)return;
 if(typeof ycEvent==='function')ycEvent(kind==='enemy'?'attack':'glow',a);
 a.cooldowns[j]=battle.sim+(j===0?9:14);Q12C.onStrike(a,kind==='enemy'?enemy:{id:'ally'},'skill');
 battle.effect={kind,who:person(u).name,name:u.s[j],time:battle.sim};
 const log=(str)=>logBattle(`${person(u).name}「${u.s[j]}」 ${str}`);
 const strike=(e,base,mult=1,options={})=>{
  if(!e||e.hp<=0)return 0;
  const critical=Math.random()<.12;
  const finisher=u.id==='ageha_daily'&&j===1&&e.vulnerableUntil>battle.sim?1.35:1;
  const raw=Math.max(1,Math.round(base*(a.atk/18)*boost*(a.rallyUntil>battle.sim?a.rallyMult||1:1)*passiveAttackMultiplier(a,e)*mult*finisher*(critical?1.5:1)));
  const damage=allyAttackDamage(e,raw,options);const actual=Math.min(e.hp,damage);e.hp=Math.max(0,e.hp-damage);bossRage(e);battlePopup(e,actual,'enemy',critical);return actual;
 };
 const heal=(ally,base)=>{const n=Math.round(base*boost*passiveHealMultiplier(a,ally)*(ally.healBuffUntil>battle.sim?(ally.healBuffMult||1):1));const gain=Math.min(ally.max-ally.hp,n);ally.hp+=gain;if(gain>0)battlePopup(ally,gain,'heal');return gain};
 const shield=(ally,base)=>{const n=Math.round(base*boost*passiveShieldMultiplier(a,ally));ally.shield+=n;return n};
 switch(type){
 case 'single':log(`${enemy.name}に${strike(enemy,34)}ダメージ`);break;
 case 'drain':{const damage=strike(enemy,30),value=Math.min(a.max-a.hp,Math.round(damage*.30*(unitPassive(u).type==='drain_heal_focus'?1+passiveValue(u)/100:1)));a.hp+=value;if(value)battlePopup(a,value,'heal');log(`${enemy.name}に${damage}ダメージ／自身を${value}回復`);break}
 case 'pierce':log(`${enemy.name}に防護貫通で${strike(enemy,31,unitPassive(u).type==='pierce_focus'?1+passiveValue(u)/100:1,{pierce:true})}ダメージ`);break;
 case 'finisher':{const remaining=enemy.hp/enemy.max;const multiplier=1+.75*(1-remaining);log(`${enemy.name}にとどめ${strike(enemy,28,multiplier)}ダメージ`);break}
 case 'aoe':{let n=0,tot=0;for(const e of battle.enemies.filter(x=>x.hp>0)){tot+=strike(e,21,unitPassive(u).type==='aoe_focus'?1+passiveValue(u)/100:1);n++}log(`敵${n}体に計${tot}ダメージ`);break}
 case 'combo':{let n=0;for(let k=0;k<3;k++){if(enemy.hp<=0)break;n+=strike(enemy,16,unitPassive(u).type==='combo_focus'?1+passiveValue(u)/100:1)}log(`${enemy.name}に3連撃（計${n}ダメージ）`);break}
 case 'def_down':enemy.vulnerableMult=1+.2*boost;enemy.vulnerableUntil=Math.max(enemy.vulnerableUntil||0,battle.sim+7+(unitPassive(u).type==='scan_extend'?passiveValue(u):0));if(u.id==='cocoa_daily')enemy.charmedUntil=enemy.vulnerableUntil;log(`${enemy.name}を7秒間防御低下（被ダメージ+${Math.round(20*boost)}%）${u.id==='cocoa_daily'?'・見とれる演出':''}`);break;
 case 'heal_one':log(`${person(unit(teammate.id)).name}を${heal(teammate,57)}回復`);break;
 case 'cleanse':{for(const key of ['weakenUntil','vulnerableUntil','staggerUntil','attackDownUntil','defenseDownUntil','healDownUntil'])teammate[key]=0;teammate.weakenMult=1;teammate.vulnerableMult=1;log(`${person(unit(teammate.id)).name}の弱体を解除／${heal(teammate,20)}回復`);break}
 case 'heal_boost':{const v=.18*boost;for(const ally of battle.allies.filter(x=>x.hp>0)){ally.healBuffMult=Math.max(ally.healBuffMult||1,1+v);ally.healBuffUntil=Math.max(ally.healBuffUntil||0,battle.sim+8)}log(`味方全体の受ける回復量+${Math.round(v*100)}%／8秒`);break}
 case 'heal_shield':{const focus=unitPassive(u).type==='heal_shield_focus'?1+passiveValue(u)/100:1;const h=heal(teammate,24*focus),sh=shield(teammate,18*focus);log(`${person(unit(teammate.id)).name}を${h}回復＋防護${sh}`);break}
 case 'heal_all':{let total=0;for(const ally of battle.allies.filter(x=>x.hp>0))total+=heal(ally,27*(unitPassive(u).type==='heal_all_focus'?1+passiveValue(u)/100:1));log(`味方全員を計${total}回復`);break}
 case 'regen':{const amount=Math.round(11*boost*passiveHealMultiplier(a,teammate)*(unitPassive(u).type==='regen_focus'?1+passiveValue(u)/100:1));teammate.regenAmount=Math.max(teammate.regenAmount||0,amount);teammate.regenUntil=Math.max(teammate.regenUntil||0,battle.sim+8+(unitPassive(u).type==='regen_duration'?passiveValue(u):0));teammate.regenNext=battle.sim+2;log(`${person(unit(teammate.id)).name}に2秒ごと${amount}回復／${8+(unitPassive(u).type==='regen_duration'?passiveValue(u):0)}秒`);break}
 case 'shield_one':log(`${person(unit(teammate.id)).name}に防護${shield(teammate,56*(unitPassive(u).type==='shield_one_focus'?1+passiveValue(u)/100:1))}`);break;
 case 'shield_all':{let total=0;for(const ally of battle.allies.filter(x=>x.hp>0))total+=shield(ally,25*(unitPassive(u).type==='shield_all_focus'?1+passiveValue(u)/100:1));log(`味方全員に防護（計${total}）`);break}
 case 'counter':{a.counterUntil=Math.max(a.counterUntil||0,battle.sim+8*boost);a.counterPower=.45*boost;log(`自身に${(8*boost).toFixed(1)}秒の反撃態勢`);break}
 case 'damage_reduce':{const value=.18*boost;for(const ally of battle.allies.filter(x=>x.hp>0)){ally.damageReduceMult=Math.min(ally.damageReduceMult||1,Math.max(.4,1-value));ally.damageReduceUntil=Math.max(ally.damageReduceUntil||0,battle.sim+8)}log(`味方全体の被ダメージを${Math.round(value*100)}%軽減／8秒`);break}
 case 'cover':{teammate.coveredBy=i;teammate.coverUntil=Math.max(teammate.coverUntil||0,battle.sim+8*boost);log(`${person(unit(teammate.id)).name}の攻撃を${(8*boost).toFixed(1)}秒肩代わり`);break}
 case 'taunt':{const duration=6*boost;const n=shield(a,24);a.taunt=Math.max(a.taunt||0,battle.sim+duration);log(`自身が${duration.toFixed(1)}秒挑発、防護${n}`);break}
 case 'defense_up':{const value=.30*boost*(unitPassive(u).type==='defense_up_focus'?1+passiveValue(u)/100:1);for(const ally of battle.allies.filter(x=>x.hp>0)){ally.defenseBuffMult=Math.max(ally.defenseBuffMult||1,1+value);ally.defenseBuffUntil=Math.max(ally.defenseBuffUntil||0,battle.sim+8)}log(`味方全体の防御力+${Math.round(value*100)}%／8秒`);break}
 case 'enemy_ct':{const seconds=2.6*boost*(unitPassive(u).type==='enemy_ct_focus'?1+passiveValue(u)/100:1);enemy.attackTimer=Math.max(0,enemy.attackTimer)+seconds;log(`${enemy.name}の次回攻撃CTを${seconds.toFixed(1)}秒延長`);break}
 case 'reset_one':{teammate.cooldowns=[battle.sim,battle.sim];if(unitPassive(u).type==='reset_one_guard'){const guard=.01*passiveValue(u);teammate.defenseBuffMult=Math.max(teammate.defenseBuffMult||1,1+guard);teammate.defenseBuffUntil=Math.max(teammate.defenseBuffUntil||0,battle.sim+8);}log(`${person(unit(teammate.id)).name}のスキルCTを即時回復`);break}
 case 'attack_up':{const value=.18*boost;for(const ally of battle.allies.filter(x=>x.hp>0)){ally.rallyMult=Math.max(ally.rallyMult||1,1+value);ally.rallyUntil=Math.max(ally.rallyUntil||0,battle.sim+8)}log(`味方全員の攻撃+${Math.round(value*100)}%／8秒`);break}
 case 'ct':{const n=2.3*boost*(unitPassive(u).type==='ct_focus'?1+passiveValue(u)/100:1);for(const ally of battle.allies.filter(x=>x.hp>0))ally.cooldowns=ally.cooldowns.map(t=>Math.max(battle.sim,t-n));log(`味方全員の残りCTを${n.toFixed(1)}秒短縮`);break}
 case 'attack_down':{const value=.28*boost;enemy.weakenMult=Math.max(.5,1-value);enemy.weakenUntil=Math.max(enemy.weakenUntil||0,battle.sim+8+(unitPassive(u).type==='attack_down_extend'?passiveValue(u):0));log(`${enemy.name}の攻撃-${Math.round(value*100)}%／${8+(unitPassive(u).type==='attack_down_extend'?passiveValue(u):0)}秒`);break}
 case 'stun':{const seconds=1.8*boost;enemy.staggerUntil=Math.max(enemy.staggerUntil||0,battle.sim+seconds+(unitPassive(u).type==='stun_extend'?passiveValue(u):0));log(`${enemy.name}を${seconds.toFixed(1)}秒足止め`);break}
 default:log('スキル設定を確認してください');break;
 }
 checkBattleDone();
}

function tick(t){
  if(!battle||battle.done||view!=='combat')return;
  const frameBattle=battle;
  if(!lastFrame)lastFrame=t;const dt=Math.min(.07,(t-lastFrame)/1000);lastFrame=t;
  if(Q12C.paused(battle)){activeTimer=requestAnimationFrame(tick);return}const d=dt*(battle.slow?.15:1)*Q12C.speed(battle);battle.sim+=d;if(battle.qid==='q35'&&battle.sim>=60){finishBattle(true);return;}if(battle.qid==='q52'&&battle.sim>=75){finishBattle(true);return;}tickTimedEffects();
  if(battle.phase==='advance'){
    battle.travel+=d;
    battle.allies.forEach((a,i)=>{if(a.hp>0){a.x=Math.min(36+(i%2)*18,18+(i%2)*22+14*(battle.travel/STAGE_TRAVEL_TIME));a.y=30+Math.floor(i/2)*45;}});
    if(battle.travel>=STAGE_TRAVEL_TIME)launchWave();
  }else if(battle.phase==='fight'){
    Q12HD.update(battle);
    let enemyLive=battle.enemies.filter(e=>e.hp>0),alliesLive=battle.allies.filter(a=>a.hp>0);
    for(const a of alliesLive){
      const target=Q12HD.choose(battle,enemyLive);if(!target)break;
      // Move inside the fixed top-down arena to close distance, never advance the stage camera during fighting.
      a.x=Math.min(31+(battle.allies.indexOf(a)%2)*21,a.x+d*3.1);a.y=30+Math.floor(battle.allies.indexOf(a)/2)*45;
      a.attackTimer-=d;
      if(a.attackTimer<=0){Q12C.onStrike(a,target,'attack');const crit=Math.random()<.12,damage=allyAttackDamage(target,Math.max(1,Math.round(a.atk*.57*(a.rallyUntil>battle.sim?a.rallyMult||1.18:1)*passiveAttackMultiplier(a,target)*(crit?1.5:1))));target.hp=Math.max(0,target.hp-damage);bossRage(target);battlePopup(target,damage,'enemy',crit);if(typeof ycEvent==='function')ycEvent('attack',a);a.attackTimer=ROLES[unit(a.id).role].rate;logBattle(`${person(unit(a.id)).name}の通常攻撃 ${damage}ダメージ${crit?'（クリティカル）':''}`);enemyLive=battle.enemies.filter(e=>e.hp>0)}
    }
    for(const e of enemyLive){
      if(e.kind==='cage')continue;
      e.attackTimer-=d;
      if(e.attackTimer<=0&&alliesLive.length){if(e.staggerUntil>battle.sim)continue;if(Q12HD.specialAttack(battle,e)){alliesLive=battle.allies.filter(a=>a.hp>0);continue;}const provoker=alliesLive.find(a=>a.taunt>battle.sim);const tank=alliesLive.find(a=>unit(a.id).role==='tank');const chosen=provoker||(tank&&Math.random()<.55?tank:alliesLive[Math.floor(Math.random()*alliesLive.length)]);
        const protecting=chosen.coverUntil>battle.sim&&Number.isInteger(chosen.coveredBy)?battle.allies[chosen.coveredBy]:null;
        const target=protecting&&protecting!==chosen&&protecting.hp>0?protecting:chosen;
        const effectiveDef=target.def*(target.defenseBuffUntil>battle.sim?(target.defenseBuffMult||1):1);
        let damage=Math.max(1,Math.round(e.atk*(e.weakenUntil>battle.sim?(e.weakenMult||.7):1))-effectiveDef);
        damage=investigationIncomingDamage(damage);damage=Math.max(0,Math.round(damage*passiveIncomingMultiplier(target)*(target.damageReduceUntil>battle.sim?(target.damageReduceMult||1):1)));
        if(target.shield>0){const blocked=Math.min(target.shield,damage);target.shield-=blocked;damage-=blocked}target.hp=Math.max(0,target.hp-damage);battlePopup(target,damage,'ally');e.attackTimer=(e.interval||2.1)*(e.enraged?.65:1);logBattle(`${e.name}の攻撃 ${damage}ダメージ`);
        if(target.counterUntil>battle.sim&&e.hp>0){const base=Math.max(1,Math.round(target.atk*(target.counterPower||.45)));const counter=allyAttackDamage(e,base);const hit=Math.min(e.hp,counter);e.hp=Math.max(0,e.hp-hit);bossRage(e);battlePopup(e,hit,'enemy');logBattle(`${person(unit(target.id)).name}の反撃 ${hit}ダメージ`)}
        alliesLive=battle.allies.filter(a=>a.hp>0)}
    }
    // Repeated-clear mode drives skill targeting automatically; standard battle remains player-controlled.
    if(battle?.autoSkills&&battle.phase==='fight'&&!battle.done){
      for(let i=0;i<frameBattle.allies.length;i++){
        if(!battle||battle.done||battle.phase!=='fight')break;
        for(let j=0;j<2;j++){
          if(!battle||battle.done||battle.phase!=='fight')break;
          const a=battle.allies[i];if(a.hp<=0||a.cooldowns[j]>battle.sim)continue;
          const kind=skillTarget(unit(a.id),j),target=skillAutoTarget(kind,i,j);
          if(target>=0)applySkill(i,j,kind,target);
        }
      }
    }
    checkBattleDone();
  }
  if(battle===frameBattle&&!battle.done){if(battle.sim-battle.wall>.18){battle.wall=battle.sim;renderCombatFrame(false)}activeTimer=requestAnimationFrame(tick)}
}
function checkBattleDone(){
  if(!battle||battle.done||battle.phase!=='fight')return;
  if(battle.allies.every(a=>a.hp<=0)){finishBattle(false);return}
  if(battle.enemies.length>0&&battle.enemies.every(e=>e.hp<=0)){if(!Q12C.victory(battle))advanceNextWave();}
}
// Choice memory v0.3: only completed, real, non-repeat operation wins can produce
// a one-time callback. No fictional MVP, damage, kill or combat achievement claims.
const CHOICE_BATTLE_LINES=Object.freeze({
 momoka:Object.freeze({a:'「おかえり、責任者さん！ 無事に帰れてよかった！ ……帰りにたい焼き、半分こしよ？」',b:'「やった、無事に帰還！ ごほうびはたい焼きだね。頭派の責任者さん、今日も譲らないんでしょ？」'}),
 milku:Object.freeze({a:'「無事に帰れて安心しました。お茶と、あの試作タルトを用意しています。今度は味見、見つからないようにしますね。」',b:'「お疲れさまでした。あのとき二人で食べたように、今日は帰還のお祝いを一緒にいただきませんか？」'}),
 reina:Object.freeze({a:'「帰還しましたね、責任者さん。約束の再戦はまた今度。今日は無事に戻れたことを喜ばせてください。」',b:'「作戦成功ですね。前に話した好手の教え合い、今夜の反省会で続きを聞いてもいいですか？」'}),
 akane:Object.freeze({a:'「全員、戻れたね！ 前は競争したけど、帰還するまでが勝負だもん。今日は一緒に歩こう！」',b:'「任務完了！ あのとき一緒に息を整えたの、思い出したよ。今日はちょっと休もうか。」'}),
 aoi:Object.freeze({a:'「任務成功を確認しました。……あのときと同じ席で、帰還記録を一緒にまとめませんか。」',b:'「無事の帰還を確認しました。記録はあとにして、前に話した本の続きを少しだけ聞きたいです。」'}),
 chinatsu:Object.freeze({a:'「お疲れさま、責任者くん。無事に戻れたご褒美に、前に選んでくれたお店に寄ってみない？」',b:'「帰還、おめでとう。前は席を取ってくれたでしょう？ 今日は私が席を用意しておくね。」'}),
 nagi:Object.freeze({a:'「……おかえり。無事でよかった。……前みたいに、少しだけ波の音を聞きに行く？」',b:'「……戻ったんだね。……今日のことも、前みたいに少し聞かせて。」'})
});
function claimChoiceBattleCallback(allies,won,qid,grind,preview){
 if(!won||preview||grind||qid==='q35'||qid==='q52'||!Array.isArray(allies))return null;
 for(const ally of allies){
  // Ignore stale/removed unit references; only a currently owned participant counts.
  if(!data(ally?.id))continue;
  const id=unit(ally?.id)?.person,entry=CHOICE_MEMORY_LINES[id];
  if(!entry||!CHOICE_BATTLE_LINES[id]||!romanceHeroAvailable(id)||!bondSeen(id,0))continue;
  const choice=S.choiceMemories?.[entry.key],day=S.choiceMemoryDay?.[entry.key];
  if(!['a','b'].includes(choice)||!Number.isSafeInteger(day)||day<1||S.choiceBattleShown?.[entry.key])continue;
  if(!S.choiceBattleShown)S.choiceBattleShown={};
  S.choiceBattleShown[entry.key]=true;
  return {id,choice,text:CHOICE_BATTLE_LINES[id][choice]};
 }
 return null;
}

function finishBattle(won){
  if(!battle||battle.done)return;
  if(battle.turnBattle)tbClearTimer();
  if(typeof ycBattleReset==='function')ycBattleReset();
  if(battle.qid==='q35'||battle.qid==='q52')won=true; // v0.37.0.0: 黒い灯の葵は勝利不要のイベント戦
  AudioDirector.sfx(won?'victory':'defeat');
  battle.done=true;cancelAnimationFrame(activeTimer);
  if(battle.preview){
    const training=!!battle.training,trial=!!battle.bossTrial,trialName=trial?(bossTrials().find(t=>t.qid===battle.qid)?.name||'ボス'):'';
    battle=null;questActionInProgress=false;lastFrame=0;view='records';
    dialog=trial
      ?{title:won?`試遊・${trialName}戦 撃破！`:`試遊・${trialName}戦 終了`,message:'試遊のため、報酬・依頼の進行・セーブデータは変更していません。何度でも挑戦できます。'}
      :training
      ?{title:won?'模擬戦・突破！':'模擬戦・終了',message:won?'模擬戦を1ウェーブ突破しました。灯火・共鳴・弱点とブレイクの練習は完了です。報酬・依頼進行・セーブデータは変更していません。':'模擬戦が終了しました。報酬・依頼進行・セーブデータは変更していません。編成や戦術を見直して再挑戦できます。'}
      :{title:won?'朔夜戦・体験完了':'朔夜戦・体験終了',message:won?'ボスと残響の檻の両方を突破しました。体験モードのため報酬・クエストクリア・セーブは変更していません。':'体験モードでは報酬・セーブ・クエスト進行に影響しません。育成・編成を整えると本編の戦闘を攻略しやすくなります。'};
    render();return;
  }
  // Claim before the existing win-path persist(); preserve callback on reload.
  const callback=claimChoiceBattleCallback(battle.allies,won,battle.qid,battle.grind,battle.preview);
  const firstClear=won&&!S.quests[battle.qid]?.complete;
  if(won){const q=QUESTS.find(x=>x.id===battle.qid),st=S.quests[q.id]||{clues:2},first=!st.complete;st.complete=true;st.clues=2;S.quests[q.id]=st;
    if(first){if(q.id==='q1'&&S.onboarding?.enabled)S.onboarding.stage='home';S.gems+=q.reward;S.gold+=q.id==='q6'?1000:ECONOMY.FIRST_CLEAR_GOLD;const solved=!!S.investigations?.[q.id]?.solved;if(solved&&!S.insightRewards?.[q.id]){S.gems+=100+(S.investigations?.[q.id]?.firstTryBonus?20:0);S.insightRewards[q.id]=true;}const companion=S.investigations?.[q.id]?.hero;if(companion&&INVESTIGATION_HERO_IDS.includes(companion))setHeroAff(companion,Math.min(100,heroAff(companion)+2));for(const a of battle.allies){const d=data(a.id);d.aff=Math.min(100,d.aff+4)}}
    else{S.gold+=farmGold(q);S.gems+=farmGems(q);S.grindRuns[q.id]=(S.grindRuns[q.id]||0)+1}
    persist();
    const rewardText=first
      ? `\n初回報酬：✧ ${q.reward} ／ ◈ ${q.id==='q6'?1000:ECONOMY.FIRST_CLEAR_GOLD} ／ 親密度 +4${S.insightRewards?.[q.id]?` ／ 推理成功 +100${S.investigations?.[q.id]?.firstTryBonus?' ／ 一発正解 +20':''}`:''}${S.investigations?.[q.id]?.hero?' ／ 同行者との親密度 +2':''}`
      : `\n周回報酬：✧ ${farmGems(q)} ／ ◈ ${farmGold(q)}`;
    dialog={title:'全ウェーブ突破！',message:`${battle.totalWaves}ウェーブを突破し、異変を鎮静しました。記録を市役所へ提出済み。${rewardText}`};
  }else dialog={title:'作戦失敗',message:`WAVE ${battle.wave+1}/${battle.totalWaves}で隊の活動継続が困難になりました。育成や編成を見直して再挑戦してください。`};
  const next=won&&battle.grind&&battle.grind.repeatLeft>1?{
    repeatLeft:battle.grind.repeatLeft-1,repeatWon:battle.grind.repeatWon+1}:null;
  const totalDone=battle.grind?.repeatWon+1||0;
  const questId=battle.qid;
  if(questId==='q52')dialog={title:'灯室の戦い・終了',message:'圧倒的な光に抗った。灯室に異変が起き、物語が続きます。勝利は不要です。'};
  if(questId==='q35')dialog={title:'黒い灯の葵・終了',message:'声は届かなかった。……それでも、葵の手が一瞬だけ止まった。勝利は不要です。'};
  if(callback)dialog.message+=`\n\n【${PEOPLE[callback.id].name}／帰還後のひと言】\n${callback.text}`;
  if(won&&firstClear&&!battle.grind){
  const after=questAfterStory(questId);
  const meet=HERO74_ENCOUNTERS[questId]?'hero74_'+questId:null;
  const nextStoryId=after||meet;
  pendingStory=nextStoryId?{type:'post',qid:questId,storyId:nextStoryId}:null;
  dialog.message+=after?'\n閉じると後日談が始まります。':meet?'\n閉じると街での出会いが始まります。':'\n続きの物語は「ストーリー」画面から読めます。';
 }
  battle=null;questActionInProgress=false;view='city';lastFrame=0; // v0.34.41.0: 勝利後はホームへ飛ばさず、続きの物語→（初回案内中なら）ホームの順にする
  if(next){dialog=null;startBattle(questId,next);return}
  if(won&&totalDone){const q=QUESTS.find(x=>x.id===questId);
    dialog={title:'オート周回完了',message:`${q.name}を${totalDone}回連続クリア。周回報酬：◈ ${farmGold(q)*totalDone}＋ ✧ ${farmGems(q)*totalDone}（周回専用報酬）`};}
  render();
}
function cancelBattle(ask){if(!battle)return;const training=!!battle.training;if(typeof ycBattleReset==='function')ycBattleReset();if(battle.turnBattle)tbClearTimer();if(Q12C.victoryTimer){clearTimeout(Q12C.victoryTimer);Q12C.victoryTimer=0}cancelAnimationFrame(activeTimer);battle=null;questActionInProgress=false;lastFrame=0;view=training?'records':'city';if(ask)dialog=training?{title:'模擬戦を中断',message:'模擬戦を終了しました。クエスト・報酬・セーブに変更はありません。'}:{title:'作戦中断',message:'作戦を中断しました。報酬は獲得していません。'};render()}


// Passive fallbacks and actionable diagnostics: runtime exceptions are not swallowed.
window.addEventListener('unhandledrejection',event=>{
  console.error('[Yoiboshi] Unhandled async rejection:',event.reason);
  toast('一部の処理に失敗しました。操作を再試行してください。');
});
document.addEventListener('error',event=>{
  const img=event.target;
  if(!(img instanceof HTMLImageElement))return;
  // v0.34.5.0: Enemy artwork has its own silent fallback handler.
  // This capture listener runs BEFORE <img>.onerror, so replacing an enemy
  // image here would prevent its original silhouette/icon from returning.
  if(img.matches('.yc-enemy-art, .tb-enemy-art-thumb'))return;
  const fallback=document.createElement('div');
  fallback.className='image-fallback';fallback.setAttribute('role','img');
  fallback.setAttribute('aria-label',img.alt||'画像を読み込めませんでした');
  fallback.textContent=img.alt||'画像を表示できません';
  img.replaceWith(fallback);
},true);

/* Ver.0.13.0.0 — investigation engine. No changes to approved QUESTS/ENEMY_BALANCE. */
function openInvestigationReview(qid){if(!S.quests?.[qid]?.complete||!investigationState(qid))return;S.currentQuest=qid;view='investigation';render();}
function investigationFresh(qid){return {qid,phase:'companion',hero:null,chosen:[],clues:[],skillUsed:false,markedIrrelevant:[],removedOption:null,answer:null,solved:false,echoIndex:0,failedChoices:[],rescueUsed:false,skillMessage:'',deductionFeedback:'',firstTryBonus:false}}
function investigationState(qid){const state=S.investigations?.[qid];return state&&state.qid===qid?state:null}
function startInvestigation(qid){
 const leadId=qid+'_lead';
 const q=QUEST_BY_ID[qid];if(!q||S.quests[qid]?.complete)return;
 if(!questUnlocked(q))return toast(questUnlockReason(q));
 if(!S.investigations)S.investigations={};
 if(!investigationState(qid)||investigationState(qid).phase==='ready'){
  S.investigations[qid]=investigationFresh(qid);
  S.quests[qid]={...(S.quests[qid]||{}),clues:0,complete:false};
 }
 S.currentQuest=qid;citySheetQuest=qid;view='investigation';persist();render();
}
// Choose relevant companions from the existing seven skill-bearing investigation heroes.
// Others are not shown as disabled portraits. The two original protagonists are
// safe fallbacks if a save has none of the scene-specific companions recruited.
const INVESTIGATION_SCENE_PARTY=Object.freeze({
 q1:['momoka','milku','akane','aoi'],q2:['milku','momoka','aoi','akane'],
 q3:['reina','akane','aoi','momoka'],q4:['chinatsu','aoi','momoka','milku'],
 q5:['akane','aoi','momoka'],q6:['nagi','aoi','akane','momoka'],
 q7:['aoi','chinatsu','momoka'],q8:['aoi','akane','milku'],
 q9:['aoi','reina','akane'],q10:['aoi','chinatsu','milku'],
 q11:['aoi','akane','reina'],q12:['aoi','akane','chinatsu'],
 q13:['aoi','chinatsu','milku'],q14:['akane','aoi','momoka'],
 q15:['akane','aoi','milku'],q16:['aoi','chinatsu','milku'],
 q17:['akane','aoi','reina'],q18:['aoi','chinatsu','milku'],
 q19:['aoi','akane','momoka'],q20:['aoi','reina','milku'],
 q21:['akane','aoi','momoka'],q22:['momoka','milku','chinatsu'],
 q23:['aoi','chinatsu','akane'],q24:['akane','aoi','momoka'],
 q25:['aoi','chinatsu','milku'],q26:['akane','aoi','momoka'],
 q27:['akane','aoi','chinatsu'],q28:['aoi','akane','reina'],
 q29:['aoi','akane','chinatsu'],q30:['reina','chinatsu','momoka'],
 q31:['reina','akane','momoka'],q32:['reina','momoka','chinatsu'],q33:['reina','akane','chinatsu'],q34:['reina','akane','momoka'],q35:['reina','momoka','akane'],q36:['reina','akane','chinatsu'],
 q37:['reina','akane','momoka'],q38:['reina','momoka','chinatsu'],q39:['reina','akane','momoka'],q40:['reina','akane','momoka'],q41:['reina','akane','chinatsu'],q42:['reina','momoka','chinatsu'],
 q43:['reina','akane','chinatsu'],q44:['reina','akane','momoka'],q45:['reina','momoka','akane'],q46:['aoi','reina','momoka'],q47:['aoi','reina','akane'],q48:['aoi','reina','momoka'],
 q49:['aoi','akane','chinatsu'],q50:['aoi','reina','momoka'],q51:['aoi','akane','chinatsu'],q52:['aoi','reina','chinatsu'],q53:['aoi','chinatsu','reina'],q54:['aoi','reina','chinatsu'],
 q55:['aoi','reina','akane'],q56:['aoi','reina','momoka'],q57:['aoi','momoka','chinatsu'],q58:['aoi','reina','chinatsu'],q59:['aoi','chinatsu','momoka'],q60:['aoi','reina','akane'],
 q61:['aoi','reina','momoka'],q62:['aoi','reina','akane'],q63:['aoi','reina','akane'],q64:['aoi','reina','momoka'],q65:['aoi','reina','akane'],q66:['aoi','reina','chinatsu'],
 q67:['aoi','reina','akane'],q68:['aoi','reina','momoka'],q69:['aoi','reina','akane'],q70:['aoi','reina','momoka'],q71:['aoi','reina','akane'],q72:['aoi','reina','chinatsu'],
 q73:['aoi','reina','akane'],q74:['aoi','reina','momoka'],q75:['aoi','reina','momoka'],q76:['aoi','reina','akane'],q77:['aoi','reina','akane'],q78:['aoi','reina','chinatsu'],
 q79:['aoi','reina','akane'],q80:['aoi','reina','momoka'],q81:['aoi','reina','chinatsu'],q82:['aoi','reina','akane'],q83:['aoi','reina','akane'],q84:['aoi','reina','momoka'],
 q85:['aoi','reina','akane'],q86:['aoi','reina','momoka'],q87:['aoi','akane','momoka'],q88:['aoi','reina','akane'],q89:['aoi','reina','chinatsu'],q90:['aoi','reina','momoka'],
 q91:['aoi','reina','momoka'],q92:['aoi','akane','momoka'],q93:['aoi','reina','akane'],q94:['aoi','reina','akane'],q95:['aoi','reina','momoka'],q96:['aoi','akane','momoka'],
 q97:['aoi','reina','akane'],q98:['aoi','reina','momoka'],q99:['aoi','akane','momoka'],q100:['aoi','reina','akane'],q101:['aoi','reina','akane'],q102:['aoi','akane','momoka'],
 q103:['aoi','reina','momoka'],q104:['aoi','akane','momoka'],q105:['aoi','reina','akane'],q106:['aoi','reina','akane'],q107:['aoi','akane','momoka'],q108:['aoi','reina','momoka'],
 q109:['aoi','akane','momoka'],q110:['aoi','reina','akane'],q111:['aoi','reina','akane'],q112:['aoi','reina','momoka'],q113:['aoi','akane','momoka'],q114:['aoi','reina','momoka'],
 q115:['aoi','reina','momoka'],q116:['aoi','reina','akane'],q117:['aoi','reina','akane'],q118:['aoi','akane','momoka'],q119:['aoi','reina','akane'],q120:['aoi','reina','momoka'],
 q121:['aoi','akane','momoka'],q122:['aoi','akane','momoka'],q123:['aoi','reina','momoka'],q124:['aoi','reina','momoka'],q125:['aoi','reina','akane'],q126:['aoi','reina','akane'],
 q127:['aoi', 'akane', 'momoka'],q128:['aoi', 'reina', 'momoka'],q129:['aoi', 'akane', 'momoka'],q130:['aoi', 'reina', 'akane'],q131:['aoi', 'reina', 'akane'],q132:['aoi', 'reina', 'momoka'],
 q133:['aoi','akane','momoka'],q134:['aoi','reina','momoka'],q135:['aoi','reina','akane'],q136:['aoi','reina','akane'],q137:['aoi','akane','momoka'],q138:['aoi','reina','momoka'],
 q139:['aoi','akane','momoka'],q140:['aoi','reina','momoka'],q141:['aoi','reina','akane'],q142:['aoi','akane','momoka'],q143:['aoi','reina','akane'],q144:['aoi','reina','momoka'],
 q145:['aoi','reina','akane'],q146:['aoi','akane','momoka'],q147:['aoi','reina','akane'],q148:['aoi','akane','momoka'],q149:['aoi','reina','akane'],q150:['aoi','reina','momoka'],
 q151:['aoi','akane','momoka'],q152:['aoi','reina','akane'],q153:['aoi','akane','momoka'],q154:['aoi','reina','akane'],q155:['aoi','reina','momoka'],q156:['aoi','reina','momoka'],
 q157:['aoi','reina','momoka'],q158:['aoi','akane','momoka'],q159:['aoi','reina','akane'],q160:['aoi','reina','akane'],q161:['aoi','akane','momoka'],q162:['aoi','reina','momoka'],
 q163:['aoi','akane','momoka'],q164:['aoi','reina','momoka'],q165:['aoi','reina','akane'],q166:['aoi','reina','akane'],q167:['aoi','akane','momoka'],q168:['aoi','reina','momoka'],
 q169:['aoi','akane','momoka'],q170:['aoi','reina','akane'],q171:['aoi','reina','momoka'],q172:['aoi','reina','akane'],q173:['aoi','akane','momoka'],q174:['aoi','reina','momoka'],
 q175:['aoi','akane','momoka'],q176:['aoi','akane','momoka'],q177:['aoi','reina','akane'],q178:['aoi','reina','momoka'],q179:['aoi','reina','momoka'],q180:['aoi','reina','akane'],
 q181:['aoi','reina','akane'],q182:['aoi','akane','momoka'],q183:['aoi','reina','momoka'],q184:['aoi','reina','akane'],q185:['aoi','reina','momoka'],q186:['aoi','akane','momoka'],
 q187:['aoi','reina','akane'],q188:['aoi','reina','akane'],q189:['aoi','reina','momoka'],q190:['aoi','reina','akane'],q191:['aoi','akane','momoka'],q192:['aoi','reina','momoka'],
 q193:['aoi','reina','momoka'],q194:['aoi','akane','momoka'],q195:['aoi','reina','akane'],q196:['aoi','reina','momoka'],q197:['aoi','reina','akane'],q198:['aoi','akane','momoka'],
 q199:['aoi','akane','momoka'],q200:['aoi','reina','momoka'],q201:['aoi','reina','akane'],q202:['aoi','akane','momoka'],q203:['aoi','reina','akane'],q204:['aoi','reina','momoka'],
 q205:['aoi','reina','akane'],q206:['aoi','reina','momoka'],q207:['aoi','akane','momoka'],q208:['aoi','reina','akane'],q209:['aoi','reina','momoka'],q210:['aoi','akane','momoka'],
 q211:['aoi','reina','akane'],q212:['aoi','reina','momoka'],q213:['aoi','reina','akane'],q214:['aoi','akane','momoka'],q215:['aoi','reina','momoka'],q216:['aoi','reina','akane'],
 q217:['aoi','reina','akane'],q218:['aoi','reina','momoka'],q219:['aoi','akane','momoka'],q220:['aoi','reina','akane'],q221:['aoi','reina','momoka'],q222:['aoi','reina','akane']
});
function investigationSelectableHeroes(qid){
 const group=INVESTIGATION_SCENE_PARTY[qid]||['aoi','akane','momoka','milku'];
 const available=group.filter(id=>INVESTIGATION_HERO_IDS.includes(id)&&romanceHeroAvailable(id));
 return available.length?available:['momoka','milku'].filter(id=>romanceHeroAvailable(id));
}
function chooseInvestigationHero(id){
 const st=investigationState(S.currentQuest);if(!st||st.phase!=='companion'||!investigationSelectableHeroes(st.qid).includes(id))return;
 st.hero=id;st.phase='interview';persist();render();
}
function investigationClues(st){const q=INVESTIGATION_CASES[st.qid];return st.clues.map(id=>q.clues.find(x=>x.id===id)).filter(Boolean)}
function addInvestigationClue(st,id){if(!st.clues.includes(id))st.clues.push(id)}
function investigationInterviewLimit(st){return st.rescueUsed?(st.rescueTarget||4):3;}
function investigationRealClues(st){return investigationClues(st).filter(c=>c.real);}
function investigationStartDeductions(st){
 st.phase='deduce';
 S.quests[st.qid]={...(S.quests[st.qid]||{}),clues:1,complete:false};
}
function investigateAt(index){
 const st=investigationState(S.currentQuest),caseData=st&&INVESTIGATION_CASES[st.qid];
 if(!st||st.phase!=='interview'||st.chosen.length>=investigationInterviewLimit(st)||!caseData.sites[index]||st.chosen.includes(index))return;
 st.chosen.push(index);
 const gained=[];caseData.sites[index].clues.forEach(id=>{addInvestigationClue(st,id);gained.push(id)});
 st.lastClueId=gained[gained.length-1]||null;
 st.skillMessage=`${caseData.sites[index].name}で、手がかりを${gained.length}件見つけた。`;
 if(st.chosen.length>=investigationInterviewLimit(st))investigationStartDeductions(st);
 AudioDirector.sfx('confirm');persist();render();
}
function investigationExtraInterview(){
 const st=investigationState(S.currentQuest),q=st&&INVESTIGATION_CASES[st.qid];
 if(!st||st.phase!=='deduce'||st.rescueUsed||investigationRealClues(st).length>=2||st.chosen.length>=q.sites.length)return;
 st.rescueUsed=true;st.rescueTarget=Math.min(st.chosen.length+1,q.sites.length);st.phase='interview';st.deductionFeedback='葵「別の場所も調べて、記録を照合しましょう。」';
 AudioDirector.sfx('confirm');persist();render();
}
function finishInvestigationWithoutClues(){
 const st=investigationState(S.currentQuest);
 if(!st||st.phase!=='deduce'||investigationRealClues(st).length>=2||(!st.rescueUsed&&st.chosen.length<INVESTIGATION_CASES[st.qid].sites.length))return;
 st.solved=false;st.firstTryBonus=false;st.phase='ready';
 S.quests[st.qid]={...(S.quests[st.qid]||{}),clues:2,complete:false};
 persist();render();
}
function useInvestigationSkill(){
 const st=investigationState(S.currentQuest);if(!st||!st.hero||st.skillUsed||!['interview','deduce'].includes(st.phase))return;
 const caseData=INVESTIGATION_CASES[st.qid],id=st.hero;
 st.skillUsed=true;let msg='';
 if(id==='nagi'){
  const option=caseData.answers.find(a=>a.id!==caseData.correct&&!(st.failedChoices||[]).includes(a.id));
  st.removedOption=option?.id||null;
  msg=option?'誤った仮説を一つ除外しました。':'除外できる仮説は残っていません。';
 }else if(id==='aoi'){
  const irrelevant=investigationClues(st).find(c=>!c.real&&!st.markedIrrelevant.includes(c.id));
  if(irrelevant){st.markedIrrelevant.push(irrelevant.id);msg=`「${irrelevant.title}」は推理と関係が薄いと分かりました。`;}
  else{st.skillUsed=false;msg='現在のメモには、無関係と判定できる手がかりがありません。';}
 }else if(id==='akane')msg='現場の避難導線を確保しました。次の戦闘の被ダメージを30％軽減します。';
 else if((id==='momoka'&&['q1','q2'].includes(st.qid))||id==='milku'||id==='reina'||id==='chinatsu'){
   const missing=caseData.clues.filter(c=>c.real&&!st.clues.includes(c.id));
   const found=missing.slice(0,id==='chinatsu'&&st.qid==='q4'?2:1);
   found.forEach(clue=>addInvestigationClue(st,clue.id));
   msg=found.length?`新しい手がかりを${found.length}件見つけました。`:'未発見の手がかりはありませんでした。';
 }else msg='現場の情報を整理しました。';
 st.skillMessage=`${PEOPLE[id].name}の特技：${msg}`;
 AudioDirector.sfx('confirm');persist();render();
}
function investigationPairHint(st){
 const q=INVESTIGATION_CASES[st.qid],allReal=q.clues.filter(c=>c.real);
 const collected=allReal.filter(c=>st.clues.includes(c.id));
 if(collected.length<2)return '葵「まだ結びつけられる手がかりがありません。」';
 // Pair is based on the two most recently obtained distinct genuine leads.
 const latest=collected.slice().sort((a,b)=>st.clues.indexOf(a.id)-st.clues.indexOf(b.id)).slice(-2);
 const key=latest.map(c=>allReal.indexOf(c)).sort((a,b)=>a-b);
 const pairs=[];for(let i=0;i<allReal.length;i++)for(let j=i+1;j<allReal.length;j++)pairs.push(`${i}-${j}`);
 const note=INVESTIGATION_PAIR_NOTES_V03020[st.qid]?.[pairs.indexOf(key.join('-'))];
 return `葵「${note||'この二つは別々の記録ですが、同じ異変の輪郭を示しています。'}」`;
}
function resolveInvestigation(choice){
 const st=investigationState(S.currentQuest),q=st&&INVESTIGATION_CASES[st.qid];
 if(!st||st.phase!=='deduce'||!q||!q.answers.some(a=>a.id===choice)||choice===st.removedOption||(st.failedChoices||[]).includes(choice))return;
 if(investigationRealClues(st).length<2){st.deductionFeedback='葵「手がかりの裏付けがまだ足りません。別の場所を調べてください。」';persist();render();return;}
 st.answer=choice;
 if(choice!==q.correct){
  st.failedChoices=st.failedChoices||[];st.failedChoices.push(choice);
  const real=q.clues.filter(c=>c.real&&st.clues.includes(c.id));
  const item=real[(st.failedChoices.length-1)%real.length];
  const contextual=q.answerReactions?.[choice];
  st.deductionFeedback=`葵「その仮説は『${item.title}』と噛み合いません。${contextual?contextual+' ':''}別の可能性を考えましょう。」`;
  if(st.failedChoices.length>=3){
    st.solved=false;st.phase='ready';
    S.quests[st.qid]={...(S.quests[st.qid]||{}),clues:2,complete:false};
  }
  AudioDirector.sfx('cancel');persist();render();return;
 }
 st.solved=true;st.firstTryBonus=(st.failedChoices||[]).length===0;
 st.phase='echo';st.echoIndex=0;st.deductionFeedback='';
 S.quests[st.qid]={...(S.quests[st.qid]||{}),clues:2,complete:false};
 AudioDirector.sfx('affection');persist();render();
}

function advanceInvestigationEcho(){
 const st=investigationState(S.currentQuest);if(!st||st.phase!=='echo')return;
 st.echoIndex++;
 if(st.echoIndex>=INVESTIGATION_CASES[st.qid].release.length)st.phase='ready';
 persist();render();
}
function investigationMemo(st){
 const entries=investigationClues(st);
 return `<section class="inq-memo"><h3>調査メモ <small>${entries.length}件</small></h3>${entries.length?entries.map(c=>`<article class="inq-evidence ${st.markedIrrelevant.includes(c.id)?'irrelevant':''} ${st.lastClueId===c.id?'is-new':''}">${st.lastClueId===c.id?'<span class="inq-evidence-new">NEW</span>':''}<strong>${esc(c.title)}</strong><p>${esc(c.text)}</p>${st.markedIrrelevant.includes(c.id)?'<span>葵の見解：この推理には関係が薄い</span>':''}</article>`).join(''):'<p class="inq-empty">現場で得た手がかりが、ここに記録されます。</p>'}</section>`;
}
// v0.35.3.0 調査画面：場所の背景と同行者の立ち絵を出し、手がかりの獲得を分かりやすくする
const INVESTIGATION_BG=Object.freeze({
 shotengai:'bg_shotengai_day',kissa:'bg_kissa_day',ekimae:'bg_ekimae_day',kyoushitsu:'bg_kyoushitsu_day',
 shiyakusho:'bg_shiyakusho_night',kaihin:'bg_kaihin_day',yuenchi:'bg_yuenchi_night',lighthouse:'bg_lighthouse_day',
 chousa:'bg_chousa_night',soko:'bg_soko_dusk',dock:'bg_dock_pre',yoichi:'bg_yoichi_night',hatsuden:'bg_hatsuden_night',
 chika:'bg_chika_dawn',matsuri:'bg_matsuri_dusk',toshokan:'bg_toshokan_day',studio:'bg_studio_day',ryotei:'bg_ryotei_day',
 lumiere:'bg_lumiere_night',ruby:'bg_ruby_dusk',shop:'bg_shop_day',soudan:'bg_soudan_day',tokeiten:'bg_tokeiten_night',
 toushitsu:'bg_toushitsu',yume:'bg_yume_dawn',kaede:'bg_kaede_dusk'
});
function investigationBg(qid){
 try{
  const key=qid+'_intro';
  const b=typeof STORY_BACKGROUNDS!=='undefined'?(STORY_BACKGROUNDS[key]||STORY_BACKGROUNDS[qid]||STORY_BACKGROUNDS[qid+'_pre']):null;
  if(b&&typeof storyBackgroundFile==='function'){const f=storyBackgroundFile(b.bg,b.time);if(f)return f;}
  if(b&&INVESTIGATION_BG[b.bg])return `assets/ART_V2/backgrounds/${INVESTIGATION_BG[b.bg]}.webp`;
 }catch(_){}
 return 'assets/ART_V2/backgrounds/bg_soudan_day.webp';
}
function investigationFace(st){
 if(st.phase==='echo'||st.phase==='ready'&&st.solved)return 'smile';
 if(st.phase==='ready'&&!st.solved)return 'sad';
 if(st.deductionFeedback)return 'surprise';
 if(st.phase==='deduce')return 'normal';
 if(st.chosen&&st.chosen.length)return 'smile';
 return 'normal';
}
function investigationStageMarkup(st,q){
 if(!st.hero)return '';
 const bg=investigationBg(st.qid),face=investigationFace(st);
 const line=st.skillMessage||q.companion?.[st.hero]||'一緒に手がかりを整理します。';
 return `<div class="inq-stage"><div class="inq-stage-bg" style="background-image:url('${bg}')" aria-hidden="true"></div>
  <div class="inq-stage-cast">${expressionPortraitMarkup(st.hero,face,`inq:${st.qid}:${st.phase}:${(st.chosen||[]).length}`,{wrapperClass:'story-character',stateClass:'is-speaking',alt:`${PEOPLE[st.hero].name}の立ち絵`,chapterStoryFit:true})}</div>
  <span class="inq-stage-label">${esc(QUEST_BY_ID[st.qid]?.location||'')}</span>
  <div class="inq-stage-line"><b>${esc(PEOPLE[st.hero].name)}</b><p>${esc(line)}</p></div></div>`;
}
function investigationPage(){
 const st=investigationState(S.currentQuest),q=st&&INVESTIGATION_CASES[st.qid],quest=st&&QUEST_BY_ID[st.qid];
 if(!st||!q)return `<section class="card pad"><h2>調査が見つかりません</h2><button class="btn" onclick="confirmInterrupt()">マップに戻る</button></section>`;
 const head=`<div class="inq-header"><div><small>FIELD INVESTIGATION / ${esc(st.qid.toUpperCase())}</small><h1>${esc(quest.name)}</h1><p>${esc(quest.location)} · 未練の正体を探る</p></div><button class="btn outline mini" onclick="requestInterrupt()">中断</button></div>`;
 const stages=['同行者選択','聞き込み 3か所','星灯解析','出撃準備'];
 const at=st.phase==='companion'?0:st.phase==='interview'?1:st.phase==='deduce'?2:3;
 const stepper=`<div class="inq-steps">${stages.map((label,i)=>`<div class="${i===at?'current':i<at?'done':''}"><i>${i<at?'✓':i+1}</i><span>${esc(label)}</span></div>`).join('')}</div>`;
 const companion=st.hero?`<div class="inq-companion"><img src="${characterIcon(st.hero)}" alt=""><div><strong>${esc(PEOPLE[st.hero].name)}</strong><small>${esc(q.companion[st.hero]||'一緒に手がかりを整理します。')}</small></div></div>`:'';
 const skill=st.hero&&['interview','deduce'].includes(st.phase)?`<button class="inq-skill" ${st.skillUsed?'disabled':''} onclick="useInvestigationSkill()"><strong>特技：${esc(INVESTIGATION_HERO_SKILLS[st.hero].name)}</strong><small>${st.skillUsed?'この調査では使用済み':esc(INVESTIGATION_HERO_SKILLS[st.hero].text)}</small></button>`:'';
 const notice=st.skillMessage?`<p class="inq-skill-notice" role="status">${esc(st.skillMessage)}</p>`:'';
 let content='';
 if(st.phase==='companion')content=`<h2>誰と一緒に調査する？</h2><p class="inq-small">同行者の特技は1回だけ使えます。恋愛パートの1日3行動は消費しません。</p><div class="inq-hero-grid">${investigationSelectableHeroes(st.qid).map(id=>`<button class="inq-hero" onclick="chooseInvestigationHero('${id}')"><img src="${characterIcon(id)}" alt=""><strong>${esc(PEOPLE[id].name)}</strong><small>${esc(INVESTIGATION_HERO_SKILLS[id].name)}</small></button>`).join('')}</div>`;
 else if(st.phase==='interview'){
  const limit=investigationInterviewLimit(st),extra=st.rescueUsed;
  content=`<h2>${extra?'追加の聞き込み：残り1か所':'聞き込み先を3か所選ぶ'}</h2><p class="inq-small">${q.sites.length}か所のうち、${extra?'もう1か所だけ追加調査できます。':'3か所を選んで、証言と記録を照らし合わせましょう。'} 気になる説明を読んで選んでください。</p><div class="inq-site-grid">${q.sites.map((site,i)=>`<button class="inq-site" ${st.chosen.includes(i)||st.chosen.length>=limit?'disabled':''} onclick="investigateAt(${i})"><span>${st.chosen.includes(i)?'✓ 調査済み':`調査先 ${i+1}`}</span><strong>${esc(site.name)}</strong><small>${esc(site.line)}</small></button>`).join('')}</div><p class="inq-small">選択済み ${st.chosen.length}/${limit}</p>`;
 }
 else if(st.phase==='deduce'){
  const canRescue=investigationRealClues(st).length<2 && !st.rescueUsed && st.chosen.length<q.sites.length;
  const noClues=investigationRealClues(st).length<2;
  const hypotheses=q.answers.map((a,i)=>`<button ${a.id===st.removedOption||(st.failedChoices||[]).includes(a.id)?'disabled aria-disabled="true"':''} onclick="resolveInvestigation('${a.id}')"><span>仮説 ${i+1}${(st.failedChoices||[]).includes(a.id)?' · 再検討済み':a.id===st.removedOption?' · 除外':''}</span><strong>${esc(a.text)}</strong></button>`).join('');
  content=`<h2>星灯解析：未練を見抜く</h2><div class="inq-analysis" role="note"><strong>葵の手がかり整理</strong><p>${esc(investigationPairHint(st))}</p></div><div class="inq-mobile-memo">${investigationMemo(st)}</div><p class="inq-question">${esc(q.prompt)}</p>${st.deductionFeedback?`<p class="inq-feedback" role="status">${esc(st.deductionFeedback)}</p>`:''}<div class="inq-answers">${hypotheses}</div>${canRescue?'<button class="btn outline full inq-rescue" onclick="investigationExtraInterview()">もう一か所、聞き込みに行く（1回のみ）</button>':''}${noClues&&(st.rescueUsed||st.chosen.length>=q.sites.length)?'<button class="btn outline full inq-rescue" onclick="finishInvestigationWithoutClues()">証拠不足のまま出撃準備へ進む</button>':''}<p class="inq-small">${(st.failedChoices||[]).length}回再検討済み。間違えた仮説は選び直せません。</p>`;
 }
 else if(st.phase==='echo')content=`<div class="inq-echo"><div class="inq-echo-light">✧</div><h2>未練の響きがほどけていく</h2><p>${esc(q.release[st.echoIndex])}</p><small>${st.echoIndex+1} / ${q.release.length}</small><button class="btn primary full" onclick="advanceInvestigationEcho()">${st.echoIndex===q.release.length-1?'調査結果へ':'続きを読む　→'}</button></div>`;
 else if(st.phase==='ready')content=`<div class="inq-result ${st.solved?'success':''}"><h2>${st.solved?'弱点を見抜いた！':'手がかりを結びつけられなかった'}</h2><p>${st.solved?(tbSelected()?'未練の弱点色を解明。ターン制では敵の弱点色が戦闘開始時から表示されます。':'現場の未練を読み解いた。戦闘では味方の与ダメージが30%上昇します。'):'推理に必要な証拠が足りないか、仮説が違ったようです。弱点なしで戦闘へ進めます。'}</p>${st.solved&&FLESHOUT_SOLVED_TAILS[st.qid]?`<div class="inq-solved-tail">${FLESHOUT_SOLVED_TAILS[st.qid].map(t=>`<p>${esc(t)}</p>`).join('')}</div>`:''}${st.solved&&st.firstTryBonus?'<p>一発正解：初回クリア時に星晶石＋20</p>':''}${st.hero==='akane'&&st.skillUsed?'<p>朱音の避難誘導：味方の被ダメージ30%減少</p>':''}${battleModeChoiceMarkup(st.qid)}<button class="btn primary full" onclick="startBattle('${st.qid}')">${S.quests?.[st.qid]?.complete?'もう一度出撃する':`弱点${st.solved?'あり':'なし'}で出撃する`}</button></div>`;
 return `<section class="investigation-view">${head}${stepper}${investigationStageMarkup(st,q)}<div class="inq-body">${st.hero?'':companion}<div class="inq-main">${notice}${content}</div><aside class="inq-side">${skill}${investigationMemo(st)}</aside></div></section>`;
}

render();
