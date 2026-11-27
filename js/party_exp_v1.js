// 気づき6番・22番: 経験値システム＋周回ダンジョン
// - クエストクリアで、編成していた4人全員に経験値が入る。
// - 経験値が「今のレベル×10」たまると自動でレベルアップし、余りは持ち越す（上限Lv30）。
// - 育成コインで上げる従来の育成はそのまま残る。
// - ダンジョン本体は game.js の DUNGEON_QUESTS_V1。報酬の上乗せと入口はここで担う。
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
  var grindXpTotal=0, grindUps=[], grindGoldTotal=0;
  var origFinish=finishBattle;
  finishBattle=function(won){
    var b=null; try{b=battle;}catch(_){b=null;}
    var qid=b?b.qid:null;
    var allyIds=b&&b.allies?b.allies.map(function(a){return a.id;}):[];
    var excluded=!b||!!b.preview||!!b.training||!!b.bossTrial;
    var isGrind=!!(b&&b.grind);
    if(!isGrind){grindXpTotal=0;grindUps=[];grindGoldTotal=0;}
    origFinish.apply(this,arguments);
    if(!won||!qid||excluded)return;
    var q=null; try{q=QUEST_BY_ID[qid];}catch(_){q=null;}
    var dg=isDungeon(qid)?DUNGEON_REWARD[qid]:null;
    var xp=dg?dg.xp:normalQuestXp(q);
    if(dg&&isExpDungeon(qid)){
      if(expLeftToday()>0){addExpClears(1);}
      else xp=0;
    }
    var ups=grantPartyXp(allyIds,xp);
    var dgGold=dg?dg.gold:0;
    if(dgGold>0)S.gold+=dgGold;
    if(xp>0||dgGold>0){try{persist();}catch(_){}}
    if(isGrind){
      grindXpTotal+=xp; grindGoldTotal+=dgGold; grindUps=grindUps.concat(ups);
      try{
        if(dialog&&dialog.title==='オート周回完了'){
          var gl=[];
          if(grindXpTotal>0)gl.push('経験値 +'+grindXpTotal+'（編成全員）');
          if(grindGoldTotal>0)gl.push('◈ 育成コイン +'+grindGoldTotal+'（ダンジョン報酬）');
          for(var j=0;j<grindUps.length;j++)gl.push(grindUps[j].name+' が Lv.'+grindUps[j].lv+' にアップ！');
          if(gl.length){dialog.message+='\n'+gl.join('\n'); render();}
          grindXpTotal=0;grindUps=[];grindGoldTotal=0;
        }
      }catch(_){}
      return;
    }
    var lines=rewardLines(xp,ups,dgGold);
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
    if(dg&&isExpDungeon(id)){var eff=Math.min(actual,expLeftToday()); if(eff>0)addExpClears(eff); actual=eff;}
    var xp=(dg?dg.xp:normalQuestXp(q))*actual;
    var party=[]; try{party=visibleParty();}catch(_){party=[];}
    var ups=grantPartyXp(party,xp);
    if(dg&&dg.gold>0)S.gold+=dg.gold*actual;
    try{persist();}catch(_){}
    if(ups.length){
      var msg=ups.map(function(u){return u.name+' が Lv.'+u.lv+' にアップ！';}).join('\n');
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
  // ---- ダンジョン入口 ----
  window.startDungeon=function(id){
    if(!isDungeon(id))return;
    if(!gateOpen(id)){try{toast('解放条件のクエストを先にクリアしてください');}catch(_){} return;}
    if(isExpDungeon(id)&&expLeftToday()<=0){try{toast('経験値ダンジョンは1日5回までです。また明日挑戦できます');}catch(_){} return;}
    if(!S.investigations[id])S.investigations[id]={phase:'ready',hero:null,clues:2,solved:false};
    else if(!(S.quests[id]&&S.quests[id].complete))S.investigations[id].phase='ready';
    startBattle(id);
  };
  function dungeonBtn(id,label,sub){
    var open=gateOpen(id)&&( !isExpDungeon(id)||expLeftToday()>0 );
    return '<button type="button" class="btn '+(open?'primary':'outline')+'" '+(open?'onclick="startDungeon(\''+id+'\')"':'disabled')+' style="flex:1;padding:5px 4px;font-size:12.5px;line-height:1.3;white-space:nowrap">'+label+' '+sub+'</button>';
  }
  function dungeonPanelHtml(){
    if(!(S.quests.q6&&S.quests.q6.complete))return '';
    var mid=function(){return S.quests.q12&&S.quests.q12.complete;};
    var high=function(){return S.quests.q18&&S.quests.q18.complete;};
    return '<section id="dungeon-panel" class="card" style="margin:8px 0;padding:8px 10px"><div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><b style="font-size:12.5px;white-space:nowrap">経験値</b>'
      +dungeonBtn('dungeon_exp_1','初級','+60')
      +dungeonBtn('dungeon_exp_2','中級','+120'+(mid()?'':' 🔒第2章'))
      +dungeonBtn('dungeon_exp_3','上級','+200'+(high()?'':' 🔒第3章'))
      +'</div><div style="display:flex;align-items:center;gap:6px"><b style="font-size:12.5px;white-space:nowrap">お金</b>'
      +dungeonBtn('dungeon_gold_1','初級','◈1,000')
      +dungeonBtn('dungeon_gold_2','中級','◈2,000'+(mid()?'':' 🔒第2章'))
      +dungeonBtn('dungeon_gold_3','上級','◈3,500'+(high()?'':' 🔒第3章'))
      +'</div><small style="opacity:.7">周回ダンジョン（物語に影響なし・編成全員に経験値）／経験値ダンジョンは1日5回まで（本日あと'+expLeftToday()+'回）</small></section>';
  }
  function injectPanel(){
    try{
      var view=document.querySelector('.qmap-view');
      if(!view||document.getElementById('dungeon-panel'))return;
      var html=dungeonPanelHtml(); if(!html)return;
      var tmp=document.createElement('div'); tmp.innerHTML=html;
      if(tmp.firstElementChild)view.appendChild(tmp.firstElementChild);
    }catch(_){}
  }
  if(typeof MutationObserver!=='undefined'&&document.body){
    new MutationObserver(function(){injectPanel();ensureXpRow();}).observe(document.body,{childList:true,subtree:true});
  }
})();
