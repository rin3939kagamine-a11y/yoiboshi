// 気づき6番・22番: 経験値システム＋周回ダンジョン
// - クエストクリアで、編成していた4人全員に経験値が入る。
// - 経験値が「今のレベル×10」たまると自動でレベルアップし、余りは持ち越す（上限Lv30）。
// - 育成コインで上げる従来の育成はそのまま残る。
// - ダンジョン本体は game.js の DUNGEON_QUESTS_V1。報酬の上乗せと入口はここで担う。
(function(){
  'use strict';
  var DUNGEON_REWARD={
    dungeon_exp_1:{xp:150,gold:0},dungeon_exp_2:{xp:300,gold:0},dungeon_exp_3:{xp:500,gold:0},
    dungeon_gold_1:{xp:40,gold:1000},dungeon_gold_2:{xp:85,gold:2000},dungeon_gold_3:{xp:120,gold:3500}
  };
  var DUNGEON_GATE={dungeon_exp_1:'q6',dungeon_exp_2:'q12',dungeon_exp_3:'q18',
    dungeon_gold_1:'q6',dungeon_gold_2:'q12',dungeon_gold_3:'q18'};
  function isDungeon(id){return Object.prototype.hasOwnProperty.call(DUNGEON_REWARD,id);}
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
    if(dungeonGold>0)lines.push('◈ ゴールド +'+dungeonGold+'（ダンジョン報酬）');
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
          if(grindGoldTotal>0)gl.push('◈ ゴールド +'+grindGoldTotal+'（ダンジョン報酬）');
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
  var origTraining=trainingPage;
  trainingPage=function(){
    var html=origTraining.apply(this,arguments);
    try{
      var owned=UNITS.filter(function(u){return visibleUnitV026(u)&&!!data(u.id);});
      if(!owned.length)return html;
      var sel=null;
      try{sel=owned.find(function(u){return u.id===trainingSelectedUnit;});}catch(_){}
      if(!sel)sel=owned.find(function(u){return u.id===S.selected;})||owned.find(function(u){return S.party.includes(u.id);})||owned[0];
      var d=data(sel.id); if(!d)return html;
      var row;
      if(d.lv>=30){
        row='<div class="train-xp-row" style="margin-top:8px;font-size:13px">経験値 <b>MAX</b> <span>（レベル上限に到達）</span></div>';
      }else{
        var need=d.lv*10, exp=Number(d.exp)||0, pct=Math.max(0,Math.min(100,Math.round(exp/need*100)));
        row='<div class="train-xp-row" style="margin-top:8px;font-size:13px">経験値 <b>'+exp+' / '+need+'</b> <span>（あと '+(need-exp)+' で Lv.'+(d.lv+1)+'）</span>'
          +'<div style="height:6px;background:rgba(127,127,127,.35);border-radius:3px;margin-top:4px"><i style="display:block;height:100%;width:'+pct+'%;background:#30a46c;border-radius:3px"></i></div></div>';
      }
      var marker=/<div class="train-progress"[^>]*><i[^>]*><\/i><\/div>/;
      if(marker.test(html))html=html.replace(marker,function(m){return m+row;});
    }catch(_){}
    return html;
  };
  // ---- ダンジョン入口 ----
  window.startDungeon=function(id){
    if(!isDungeon(id))return;
    if(!gateOpen(id)){try{toast('解放条件のクエストを先にクリアしてください');}catch(_){} return;}
    if(!S.investigations[id])S.investigations[id]={phase:'ready',hero:null,clues:2,solved:false};
    else if(!(S.quests[id]&&S.quests[id].complete))S.investigations[id].phase='ready';
    startBattle(id);
  };
  function dungeonBtn(id,label,sub){
    var open=gateOpen(id);
    return '<button type="button" class="btn '+(open?'primary':'outline')+'" '+(open?'onclick="startDungeon(\''+id+'\')"':'disabled')+' style="flex:1;min-width:150px">'+label+'<br><small>'+sub+'</small></button>';
  }
  function dungeonPanelHtml(){
    if(!(S.quests.q6&&S.quests.q6.complete))return '';
    var mid=function(){return S.quests.q12&&S.quests.q12.complete;};
    var high=function(){return S.quests.q18&&S.quests.q18.complete;};
    return '<section id="dungeon-panel" class="card pad" style="margin:12px 0"><h3>周回ダンジョン</h3>'
      +'<p>育成専用の周回クエストです。物語の進行には影響しません。クリアすると編成全員に経験値が入ります（スキップ・オート周回でも入ります）。</p>'
      +'<p><b>経験値ダンジョン</b>（経験値が多め）</p><div style="display:flex;gap:8px;flex-wrap:wrap">'
      +dungeonBtn('dungeon_exp_1','初級','経験値 +150')
      +dungeonBtn('dungeon_exp_2','中級','経験値 +300'+(mid()?'':' ／ 第2章クリアで解放'))
      +dungeonBtn('dungeon_exp_3','上級','経験値 +500'+(high()?'':' ／ 第3章クリアで解放'))
      +'</div><p style="margin-top:10px"><b>お金ダンジョン</b>（育成コインが多め）</p><div style="display:flex;gap:8px;flex-wrap:wrap">'
      +dungeonBtn('dungeon_gold_1','初級','◈ +1,000')
      +dungeonBtn('dungeon_gold_2','中級','◈ +2,000'+(mid()?'':' ／ 第2章クリアで解放'))
      +dungeonBtn('dungeon_gold_3','上級','◈ +3,500'+(high()?'':' ／ 第3章クリアで解放'))
      +'</div></section>';
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
    new MutationObserver(function(){injectPanel();}).observe(document.body,{childList:true,subtree:true});
  }
})();
