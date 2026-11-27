// 気づき6番・22番: 経験値システム＋周回ダンジョン
// - クエストクリアで、編成していた4人全員に経験値が入る。
// - 経験値が「今のレベル×10」たまると自動でレベルアップし、余りは持ち越す（上限Lv30）。
// - 育成コインで上げる従来の育成はそのまま残る。
// - ダンジョン本体は game.js の DUNGEON_QUESTS_V1。報酬の上乗せと入口はここで担う。
// 項目57・58: 経験値ダンジョンは1日5回まで無料、超過分は入場アイテム「ムキムキー」1個で入れる。
// - ムキムキーは購入（育成コイン50,000）と報酬（お金ダンジョン初回クリア／クエスト初回クリア10回ごと）の両方で手に入る。
// - キーはクリア時に消費する（負けても消費しない）。
// - ダンジョンの入口はホーム画面の専用ボタンから開く専用画面に移した（クエストマップ下のパネルは廃止）。
(function(){
  'use strict';
  var DUNGEON_REWARD={
    dungeon_exp_1:{xp:60,gold:0},dungeon_exp_2:{xp:120,gold:0},dungeon_exp_3:{xp:200,gold:0},
    dungeon_gold_1:{xp:40,gold:1000},dungeon_gold_2:{xp:85,gold:2000},dungeon_gold_3:{xp:120,gold:3500}
  };
  var DUNGEON_GATE={dungeon_exp_1:'q6',dungeon_exp_2:'q12',dungeon_exp_3:'q18',
    dungeon_gold_1:'q6',dungeon_gold_2:'q12',dungeon_gold_3:'q18'};
  function isDungeon(id){return Object.prototype.hasOwnProperty.call(DUNGEON_REWARD,id);}
  var EXP_DAILY_MAX=5;
  function isExpDungeon(id){return typeof id==='string'&&id.indexOf('dungeon_exp_')===0;}
  function expClearsToday(){var d=S.dailyExpDungeon;return (d&&d.date===todayLocal())?Math.max(0,Math.min(EXP_DAILY_MAX,Number(d.count)||0)):0;}
  function expLeftToday(){return EXP_DAILY_MAX-expClearsToday();}
  function addExpClears(n){S.dailyExpDungeon={date:todayLocal(),count:expClearsToday()+n};}
  function gateOpen(id){var g=DUNGEON_GATE[id];return !!(g&&S.quests[g]&&S.quests[g].complete);}
  // ---- ムキムキー（経験値ダンジョンの追加の入場券） ----
  var MUKIMUKI_PRICE=50000;
  function mukimuki(){var n=Number(S.mukimuki);return isFinite(n)&&n>0?Math.floor(n):0;}
  function addMukimuki(n){S.mukimuki=Math.max(0,mukimuki()+n);}
  function normalQuestXp(q){
    if(!q)return 0;
    var fg=0; try{fg=farmGold(q)||0;}catch(_){fg=0;}
    return Math.max(10,Math.round(fg/10));
  }
  function grantPartyXp(ids,xp){
    var ups=[];
    if(!(xp>0))return ups;
    var seen={};
    for(var k=0;k<ids.length;k++){
      var id=ids[k]; if(!id||seen[id])continue; seen[id]=1;
      var d=null; try{d=data(id);}catch(_){d=null;}
      if(!d)continue;
      if(d.lv>=30){d.exp=0;continue;}
      var exp=(Number(d.exp)||0)+xp, lv=d.lv, before=lv;
      while(lv<30&&exp>=lv*10){exp-=lv*10;lv++;}
      d.lv=lv; d.exp=lv>=30?0:exp;
      if(lv>before){
        var nm=id;
        try{var u=unit(id); if(u&&u.person&&PEOPLE[u.person])nm=PEOPLE[u.person].name;}catch(_){}
        ups.push({name:nm,lv:lv});
      }
    }
    return ups;
  }
  function rewardLines(xp,ups,dungeonGold){
    var lines=[];
    if(xp>0)lines.push('経験値 +'+xp+'（編成全員）');
    if(dungeonGold>0)lines.push('◈ 育成コイン +'+dungeonGold+'（ダンジョン報酬）');
    for(var i=0;i<ups.length;i++)lines.push(ups[i].name+' が Lv.'+ups[i].lv+' にアップ！');
    return lines;
  }
  // ---- 戦闘クリア（通常・初回・オート周回すべて finishBattle を通る） ----
  var grindXpTotal=0, grindUps=[], grindGoldTotal=0, grindKeyUsed=0;
  var origFinish=finishBattle;
  finishBattle=function(won){
    var b=null; try{b=battle;}catch(_){b=null;}
    var qid=b?b.qid:null;
    var allyIds=b&&b.allies?b.allies.map(function(a){return a.id;}):[];
    var excluded=!b||!!b.preview||!!b.training||!!b.bossTrial;
    var isGrind=!!(b&&b.grind);
    if(!isGrind){grindXpTotal=0;grindUps=[];grindGoldTotal=0;grindKeyUsed=0;}
    var wasComplete=false;
    try{wasComplete=!!(qid&&S.quests[qid]&&S.quests[qid].complete);}catch(_){wasComplete=false;}
    origFinish.apply(this,arguments);
    if(isGrind&&!won){grindXpTotal=0;grindUps=[];grindGoldTotal=0;grindKeyUsed=0;}
    if(!won||!qid||excluded)return;
    var q=null; try{q=QUEST_BY_ID[qid];}catch(_){q=null;}
    var dg=isDungeon(qid)?DUNGEON_REWARD[qid]:null;
    var xp=dg?dg.xp:normalQuestXp(q);
    var keyUsed=0;
    if(dg&&isExpDungeon(qid)){
      if(expLeftToday()>0){addExpClears(1);}
      else if(mukimuki()>0){addMukimuki(-1); keyUsed=1;}
      else xp=0;
    }
    // ムキムキーの報酬（初回クリアのみ）: お金ダンジョン各段の初回／クエスト初回クリア10回ごと
    var keyLines=[];
    if(!wasComplete){
      if(qid==='dungeon_gold_1'||qid==='dungeon_gold_2'||qid==='dungeon_gold_3'){
        addMukimuki(1); keyLines.push('ムキムキー +1（お金ダンジョン初回クリア）');
      }else if(!dg){
        var total=0;
        try{for(var kk in S.quests){if(S.quests[kk]&&S.quests[kk].complete)total++;}}catch(_){total=0;}
        if(total>0&&total%10===0){addMukimuki(1); keyLines.push('ムキムキー +1（クエスト初回クリア'+total+'回達成）');}
      }
    }
    var ups=grantPartyXp(allyIds,xp);
    var dgGold=dg?dg.gold:0;
    if(dgGold>0)S.gold+=dgGold;
    if(xp>0||dgGold>0||keyUsed>0||keyLines.length){try{persist();}catch(_){}}
    if(isGrind){
      grindXpTotal+=xp; grindGoldTotal+=dgGold; grindKeyUsed+=keyUsed; grindUps=grindUps.concat(ups);
      try{
        if(dialog&&dialog.title==='オート周回完了'){
          var gl=[];
          if(grindXpTotal>0)gl.push('経験値 +'+grindXpTotal+'（編成全員）');
          if(grindGoldTotal>0)gl.push('◈ 育成コイン +'+grindGoldTotal+'（ダンジョン報酬）');
          if(grindKeyUsed>0)gl.push('ムキムキー を'+grindKeyUsed+'個使いました');
          for(var j=0;j<grindUps.length;j++)gl.push(grindUps[j].name+' が Lv.'+grindUps[j].lv+' にアップ！');
          if(gl.length){dialog.message+='\n'+gl.join('\n'); render();}
          grindXpTotal=0;grindUps=[];grindGoldTotal=0;grindKeyUsed=0;
        }
      }catch(_){}
      return;
    }
    var lines=rewardLines(xp,ups,dgGold);
    if(keyUsed>0)lines.push('ムキムキー を1個使いました');
    for(var m=0;m<keyLines.length;m++)lines.push(keyLines[m]);
    if(!lines.length)return;
    var shown=false;
    try{
      if(typeof battleResult!=='undefined'&&battleResult&&Array.isArray(battleResult.rewards)){
        for(var i=0;i<lines.length;i++)battleResult.rewards.push(lines[i]);
        shown=true;
      }
    }catch(_){}
    if(!shown){
      try{ if(dialog&&typeof dialog.message==='string'){dialog.message+='\n'+lines.join('\n'); shown=true;} }catch(_){}
    }
    if(shown){try{render();}catch(_){}}
  };
  // ---- スキップクリア ----
  var origSkip=skipClear;
  skipClear=function(id,count){
    var runsBefore=(S.grindRuns&&S.grindRuns[id])||0;
    var goldBefore=S.gold, gemsBefore=S.gems;
    origSkip.apply(this,arguments);
    var runsAfter=(S.grindRuns&&S.grindRuns[id])||0;
    var actual=runsAfter-runsBefore;
    if(actual<=0||(S.gold===goldBefore&&S.gems===gemsBefore))return;
    var dg=isDungeon(id)?DUNGEON_REWARD[id]:null;
    var q=null; try{q=QUEST_BY_ID[id];}catch(_){q=null;}
    var keyUsed=0;
    if(dg&&isExpDungeon(id)){
      var left=expLeftToday(), keys=mukimuki();
      var eff=Math.min(actual,left+keys);
      var freeUsed=Math.min(actual,left);
      keyUsed=eff-freeUsed;
      if(keyUsed>0)addMukimuki(-keyUsed);
      if(freeUsed>0)addExpClears(freeUsed);
      actual=eff;
    }
    var xp=(dg?dg.xp:normalQuestXp(q))*actual;
    var party=[]; try{party=visibleParty();}catch(_){party=[];}
    var ups=grantPartyXp(party,xp);
    if(dg&&dg.gold>0)S.gold+=dg.gold*actual;
    try{persist();}catch(_){}
    var msgs=[];
    if(keyUsed>0)msgs.push('ムキムキー を'+keyUsed+'個使いました');
    for(var u2=0;u2<ups.length;u2++)msgs.push(ups[u2].name+' が Lv.'+ups[u2].lv+' にアップ！');
    if(msgs.length){
      var msg=msgs.join('\n');
      setTimeout(function(){try{toast(msg);}catch(_){}},700);
    }
  };
  // ---- 育成画面に経験値ゲージを出す ----
  // 画面遷移表(SCREENS)は元の trainingPage 関数を直接保持しているため、関数を差し替えても画面に届かない。
  // そのため、描画された画面のレベルゲージの直後に経験値行を差し込む方式にする。
  function xpRowHtml(id){
    var d=null; try{d=data(id);}catch(_){d=null;}
    if(!d)return '';
    if(d.lv>=30){
      return '<div class="train-xp-row" style="margin-top:8px;font-size:13px">経験値 <b>MAX</b> <span>（レベル上限に到達）</span></div>';
    }
    var need=d.lv*10, exp=Number(d.exp)||0, pct=Math.max(0,Math.min(100,Math.round(exp/need*100)));
    return '<div class="train-xp-row" style="margin-top:8px;font-size:13px">経験値 <b>'+exp+' / '+need+'</b> <span>（あと '+(need-exp)+' で Lv.'+(d.lv+1)+'）</span>'
      +'<div style="height:6px;background:rgba(127,127,127,.35);border-radius:3px;margin-top:4px"><i style="display:block;height:100%;width:'+pct+'%;background:#30a46c;border-radius:3px"></i></div></div>';
  }
  function ensureXpRow(){
    try{
      var meter=document.querySelector('.v0241-level-meter');
      if(meter&&meter.parentNode){
        if(meter.parentNode.querySelector('.train-xp-row'))return;
        var sid=null; try{sid=S.selected;}catch(_){sid=null;}
        var sok=false; try{sok=!!(sid&&data(sid));}catch(_){sok=false;}
        if(sok){
          var xhtml=xpRowHtml(sid); if(!xhtml)return;
          var xtmp=document.createElement('div'); xtmp.innerHTML=xhtml;
          if(xtmp.firstElementChild)meter.parentNode.insertBefore(xtmp.firstElementChild,meter.nextSibling);
        }
        return;
      }
      var bar=document.querySelector('.train-progress');
      if(!bar||!bar.parentNode)return;
      if(bar.parentNode.querySelector('.train-xp-row'))return;
      var id=null;
      var active=document.querySelector('.train-unit.active');
      if(active){
        var m=/(?:selectTrainingUnit|openUnit)\('([^']+)'\)/.exec(active.getAttribute('onclick')||'');
        if(m)id=m[1];
      }
      var ok=false; try{ok=!!(id&&data(id));}catch(_){ok=false;}
      if(!ok){
        var cand=null;
        try{cand=trainingSelectedUnit||S.selected||(S.party&&S.party[0]);}catch(_){cand=null;}
        var cok=false; try{cok=!!(cand&&data(cand));}catch(_){cok=false;}
        id=cok?cand:null;
      }
      if(!id)return;
      var html=xpRowHtml(id); if(!html)return;
      var tmp=document.createElement('div'); tmp.innerHTML=html;
      if(tmp.firstElementChild)bar.parentNode.insertBefore(tmp.firstElementChild,bar.nextSibling);
    }catch(_){}
  }
  window.__partyExpEnsureXpRow=ensureXpRow;
  // ---- ダンジョン入口（項目57・58: ホームの専用ボタン→専用画面） ----
  window.startDungeon=function(id){
    if(!isDungeon(id))return;
    if(!gateOpen(id)){try{toast('解放条件のクエストを先にクリアしてください');}catch(_){} return;}
    if(isExpDungeon(id)&&expLeftToday()<=0&&mukimuki()<=0){try{toast('本日の無料分（5回）は終了しています。ムキムキーを使うと入場できます');}catch(_){} return;}
    if(window.ybDungeon)window.ybDungeon.close();
    if(!S.investigations[id])S.investigations[id]={phase:'ready',hero:null,clues:2,solved:false};
    else if(!(S.quests[id]&&S.quests[id].complete))S.investigations[id].phase='ready';
    startBattle(id);
  };
  window.buyMukimuki=function(){
    if(S.gold>=MUKIMUKI_PRICE){
      S.gold-=MUKIMUKI_PRICE; addMukimuki(1);
      try{persist();}catch(_){}
      try{toast('ムキムキーを1個購入しました（所持 '+mukimuki()+'個）');}catch(_){}
      if(window.ybDungeon)window.ybDungeon.refresh();
    }else{
      try{toast('育成コインが足りません（ムキムキーは1個 ◈'+MUKIMUKI_PRICE.toLocaleString()+'）');}catch(_){}
    }
  };
  function dungeonTierBtn(id,label,reward){
    var open=gateOpen(id);
    var lockNote=id.endsWith('_2')?'🔒第2章クリアで解放':(id.endsWith('_3')?'🔒第3章クリアで解放':'');
    if(!open){
      return '<button type="button" class="btn outline" disabled style="flex:1;padding:8px 4px;font-size:12.5px;line-height:1.35">'+label+' '+reward+'<br><small>'+lockNote+'</small></button>';
    }
    if(isExpDungeon(id)&&expLeftToday()<=0&&mukimuki()<=0){
      return '<button type="button" class="btn outline" disabled style="flex:1;padding:8px 4px;font-size:12.5px;line-height:1.35">'+label+' '+reward+'<br><small>無料分終了・キーなし</small></button>';
    }
    var note=isExpDungeon(id)?(expLeftToday()>0?'無料分で入場':'ムキムキー1個で入場'):'';
    return '<button type="button" class="btn primary" onclick="ybDungeon.enter(\''+id+'\')" style="flex:1;padding:8px 4px;font-size:12.5px;line-height:1.35">'+label+' '+reward+(note?'<br><small>'+note+'</small>':'')+'</button>';
  }
  function dungeonOverlayHtml(){
    return '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px">'
      +'<b style="font-size:17px">ダンジョン</b>'
      +'<button type="button" class="btn outline" onclick="ybDungeonClose()" style="padding:4px 12px">閉じる</button></div>'
      +'<section class="card" style="padding:10px 12px;margin-bottom:10px"><div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><b style="font-size:13.5px">経験値ダンジョン</b>'
      +'<small style="opacity:.75">本日の無料分 あと'+expLeftToday()+'回 ／ ムキムキー '+mukimuki()+'個</small></div>'
      +'<div style="display:flex;gap:6px">'
      +dungeonTierBtn('dungeon_exp_1','初級','経験値 +60')
      +dungeonTierBtn('dungeon_exp_2','中級','経験値 +120')
      +dungeonTierBtn('dungeon_exp_3','上級','経験値 +200')
      +'</div><small style="opacity:.7">編成全員に経験値。無料分（1日5回）を使い切った後は、ムキムキー1個で1回入場できます（キーはクリア時に消費します）。</small></section>'
      +'<section class="card" style="padding:10px 12px;margin-bottom:10px"><div style="margin-bottom:6px"><b style="font-size:13.5px">お金ダンジョン</b></div>'
      +'<div style="display:flex;gap:6px">'
      +dungeonTierBtn('dungeon_gold_1','初級','◈ 1,000')
      +dungeonTierBtn('dungeon_gold_2','中級','◈ 2,000')
      +dungeonTierBtn('dungeon_gold_3','上級','◈ 3,500')
      +'</div><small style="opacity:.7">育成コインと経験値が手に入ります。回数制限はありません。</small></section>'
      +'<section class="card" style="padding:10px 12px"><div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><b style="font-size:13.5px">ムキムキー</b>'
      +'<small style="opacity:.75">所持 '+mukimuki()+'個 ／ 所持金 ◈ '+(Number(S.gold)||0).toLocaleString()+'</small></div>'
      +'<p style="margin:4px 0 8px;font-size:12.5px;line-height:1.5">経験値ダンジョンの追加の入場券です。入手方法：購入（1個 ◈50,000）／お金ダンジョンの初回クリア（各段1個）／クエストの初回クリア10回ごと（1個）。</p>'
      +'<button type="button" class="btn '+(S.gold>=MUKIMUKI_PRICE?'primary':'outline')+'" '+(S.gold>=MUKIMUKI_PRICE?'onclick="buyMukimuki()"':'disabled')+' style="padding:8px 14px;font-size:13px">◈ 50,000 で1個購入</button></section>';
  }
  function dungeonOverlay(){
    var ov=document.getElementById('yb-dungeon-overlay');
    if(!ov){
      ov=document.createElement('div');
      ov.id='yb-dungeon-overlay';
      ov.setAttribute('style','position:fixed;inset:0;z-index:1200;background:rgba(10,18,34,.55);overflow-y:auto;padding:18px 12px;box-sizing:border-box');
      document.body.appendChild(ov);
    }
    return ov;
  }
  function openDungeon(){
    var ov=dungeonOverlay();
    ov.innerHTML='<div class="card" style="max-width:560px;margin:0 auto;padding:14px 16px">'+dungeonOverlayHtml()+'</div>';
    ov.style.display='block';
  }
  function closeDungeon(){
    var ov=document.getElementById('yb-dungeon-overlay');
    if(ov)ov.style.display='none';
  }
  window.ybDungeon={
    open:openDungeon,
    close:closeDungeon,
    refresh:function(){var ov=document.getElementById('yb-dungeon-overlay'); if(ov&&ov.style.display!=='none')openDungeon();},
    buy:window.buyMukimuki,
    keys:mukimuki,
    enter:function(id){closeDungeon(); window.startDungeon(id);}
  };
  window.ybDungeonOpen=openDungeon;
  window.ybDungeonClose=closeDungeon;
  function injectDungeonBtn(){
    try{
      if(document.getElementById('yb-dungeon-btn'))return;
      if(!(S.quests&&S.quests.q6&&S.quests.q6.complete))return;
      var sc=document.querySelector('.mock-shortcuts');
      if(!sc)return;
      var btn=document.createElement('button');
      btn.type='button';
      btn.id='yb-dungeon-btn';
      btn.className='mock-menu-card yb-dungeon home-picture-card';
      btn.setAttribute('onclick','ybDungeonOpen()');
      btn.innerHTML='<span class="mock-menu-icon">⚑</span><span class="mock-menu-title">ダンジョン<small>DUNGEON</small></span><span class="mock-menu-arrow">›</span>';
      sc.appendChild(btn);
    }catch(_){}
  }
  if(typeof MutationObserver!=='undefined'&&document.body){
    new MutationObserver(function(){injectDungeonBtn();ensureXpRow();}).observe(document.body,{childList:true,subtree:true});
  }
})();
