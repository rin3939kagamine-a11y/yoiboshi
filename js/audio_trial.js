// Temporary in-game audio A/B audition utility for RE:START.
// All loaded files remain in this browser tab only: no save key or network transfer.
const AudioTrial = (() => {
  const labels = Object.freeze({
    bgm: Object.freeze({home:'ホーム',daily:'日常・交流',story:'ストーリー',sad:'悲しい場面',battle:'通常戦闘',boss:'ボス戦',map:'街の探索'}),
    sfx: Object.freeze({tap:'通常タップ',confirm:'決定',cancel:'キャンセル',page:'セリフ送り',affection:'親密度上昇',gacha:'ガチャ',victory:'戦闘勝利',defeat:'戦闘敗北',hit:'攻撃命中'})
  });
  const slots = Object.create(null);
  // Bundled trial BGM is preset as candidate A. Candidate B can be loaded privately.
  const bundledNames = Object.freeze({
    bgm:{home:'静かな夜長に',daily:'人類救済部ボツ01',story:'記憶の欠片をなぞって',sad:'海辺のセレナーデ',battle:'Assault Mission',boss:'戦闘系06',map:'海辺の街'},
    sfx:{tap:'Kenney / select_002',confirm:'Kenney / confirmation_002',cancel:'Kenney / back_002',page:'Kenney / tick_001',affection:'Kenney / maximize_005',gacha:'Kenney / glass_004',victory:'Kenney / confirmation_004',defeat:'Kenney / error_003',hit:'Kenney / impactPunch_heavy_000'}
  });
  let opened = false, message = '';
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const get = (group,key) => {
    const id = group+':'+key;
    if (!slots[id]) {
      const bundled = AUDIO_ASSETS[group]?.[key] || '';
      slots[id] = {A:bundled ? {name:((bundledNames[group]||{})[key]||key)+'（同梱）',url:bundled} : null,B:null,selected:'A'};
    }
    return slots[id];
  };
  const valid = (group,key,slot) => Object.hasOwn(labels,group) && Object.hasOwn(labels[group],key) && ['A','B'].includes(slot);
  function refresh(){
    const panel = document.getElementById('audio-trial-panel');
    if(!panel)return;
    // Keep BGM/SE sections open when previewing candidates. The old
    // implementation recreated the panel and collapsed the SE list every time.
    const expanded = Array.from(panel.querySelectorAll('details'), element => element.open);
    panel.innerHTML = panelContents();
    panel.querySelectorAll('details').forEach((element,index) => {
      if(index < expanded.length)element.open = expanded[index];
    });
  }
  function row(group,key){
    const d = get(group,key);
    const input = slot => {
      const file = d[slot];
      const active = d.selected===slot;
      return `<div class="audio-trial-candidate ${active?'active':''}">
        <div class="audio-trial-candidate-head"><strong>候補${slot}</strong><span class="audio-trial-file" title="${file?escape(file.name):''}">${file?escape(file.name):'未登録'}</span></div>
        <input type="file" accept="audio/*,.mp3,.ogg,.wav,.m4a,.aac,.webm" aria-label="${escape(labels[group][key])}の候補${slot}を読み込む" onchange="AudioTrial.load('${group}','${key}','${slot}',this)">
        <button class="btn outline mini" type="button" ${file?'':'disabled'} onclick="AudioTrial.play('${group}','${key}','${slot}')">${active?'▶ 使用・試聴中':'▶ この候補を試す'}</button>
      </div>`;
    };
    return `<div class="audio-trial-row"><strong class="audio-trial-name">${escape(labels[group][key])}</strong><div class="audio-trial-options">${input('A')}${input('B')}</div></div>`;
  }
  function panelContents(){
    return `<header class="audio-trial-heading"><h4>音声テスト（候補A/B比較）</h4><button class="btn outline mini" type="button" onclick="AudioTrial.toggle()">閉じる</button></header>
      <p class="desc">BGM7曲とKenneyのCC0素材を使ったSE9種類を候補Aに登録済みです。別の音と比較する場合は候補Bに音声ファイルを読み込んでください。音量・ミュートは上の設定を使用します。</p>
      <p class="desc"><strong>テスト音源はセーブされません。</strong> ページを再読み込みすると読み込み・選択状態は消えます。ゲームのセーブには影響しません。利用権のある音源だけを指定してください。</p>
      <div class="audio-trial-actions"><button class="btn outline mini" type="button" onclick="AudioTrial.stop()">BGM停止</button><button class="btn outline mini" type="button" onclick="AudioTrial.restore()">現在のゲーム場面のBGMに戻す</button></div>
      <p role="status" class="audio-trial-message" aria-live="polite">${escape(message)}</p>
      <details open><summary>BGM（7場面）</summary><div class="audio-trial-list">${Object.keys(labels.bgm).map(k=>row('bgm',k)).join('')}</div></details>
      <details><summary>効果音（9種類）</summary><div class="audio-trial-list">${Object.keys(labels.sfx).map(k=>row('sfx',k)).join('')}</div></details>`;
  }
  function toggle(){opened=!opened; if(!opened){AudioDirector.sync(currentAudioContext());} render();}
  function load(group,key,slot,input){
    if(!valid(group,key,slot))return;
    const file = input.files && input.files[0];
    if(!file)return;
    // A conservative cap limits mistakes while allowing ordinary soundtrack files.
    if(file.size > 50*1024*1024 || !(/\.(mp3|ogg|wav|m4a|aac|webm)$/i.test(file.name) || file.type.startsWith('audio/'))){
      message='このファイルは読み込めません。音声形式（50MB以下）を選んでください。'; refresh(); return;
    }
    const d=get(group,key);
    const url=URL.createObjectURL(file);
    d[slot]={name:file.name,url};
    d.selected=slot;
    AUDIO_ASSETS[group][key]=url;
    // Keep old blob URLs alive until tab closes; fading Audio objects may still use them.
    message=`${labels[group][key]}の候補${slot}を読み込みました：${file.name}`;
    if(group==='bgm')AudioDirector.setBgm(key);
    else AudioDirector.sfx(key);
    refresh();
  }
  function play(group,key,slot){
    if(!valid(group,key,slot))return;
    const d=get(group,key),c=d[slot];
    if(!c)return;
    d.selected=slot; AUDIO_ASSETS[group][key]=c.url;
    AudioDirector.unlock();
    if(group==='bgm')AudioDirector.setBgm(key);else AudioDirector.sfx(key);
    message=`${labels[group][key]}：候補${slot}を試聴しています。`;
    refresh();
  }
  function stop(){AudioDirector.stopBgm();message='BGMを停止しました。';refresh();}
  function restore(){AudioDirector.sync(currentAudioContext());message='現在のゲーム場面のBGMに戻しました。';refresh();}
  return Object.freeze({toggle,markup:()=>opened?`<section id="audio-trial-panel" class="card pad audio-trial" aria-label="音声テスト">${panelContents()}</section>`:'',load,play,stop,restore});
})();
