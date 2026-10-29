// v0.34.38.0: 会話画面の環境音（波・雨・風・機械のうなり）。音声ファイルは使わず、Web Audioでその場で合成する。
// 表示中の背景（行ごとの背景切り替えを含む）から場所を判断し、BGMの音量設定・消音に従う。
const AMBIENT_BY_BG=Object.freeze({
  kaihin:{waves:1},
  'kaihin:night':{waves:.8,wind:.2},
  soko:{waves:.55,wind:.35},
  'soko:night':{rain:.8,waves:.35},
  dock:{waves:.5,hum:.25},
  chousa:{rain:1},
  hatsuden:{hum:.8,wind:.3},
  yuenchi:{wind:.6,waves:.45},
  lighthouse:{wind:.55,waves:.5},
  chika:{hum:.45},
  matsuri:{waves:.25},
  yoichi:{waves:.35,wind:.2},
  kaede:{wind:.18},
  kissa:{wind:.15}
});
const AmbientDirector=(()=>{
  let ctx=null,master=null,noise=null,layers={},current='',unlocked=false;
  const prefsOn=()=>{try{return typeof readerPrefs==='function'?readerPrefs().ambient!==false:true}catch(_){return true}};
  const level=()=>{try{const a=validAudioSettings(S.audio);return a.muted||!prefsOn()?0:(a.bgm/100)*.55}catch(_){return 0}};
  function ensure(){
    if(ctx)return true;
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;
    try{ctx=new AC();}catch(_){return false}
    master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);
    const len=ctx.sampleRate*4,buf=ctx.createBuffer(1,len,ctx.sampleRate),d=buf.getChannelData(0);
    let last=0;for(let i=0;i<len;i++){const w=Math.random()*2-1;last=(last+.02*w)/1.02;d[i]=w*.6+last*2.2;}
    noise=buf;return true;
  }
  function src(){const s=ctx.createBufferSource();s.buffer=noise;s.loop=true;s.start(0,Math.random()*3);return s;}
  function lfo(freq,depth,target){const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=freq;g.gain.value=depth;o.connect(g);g.connect(target);o.start();return o;}
  function build(kind){
    const out=ctx.createGain();out.gain.value=0;out.connect(master);const nodes=[out];
    if(kind==='waves'){const s=src(),f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=520;const g=ctx.createGain();g.gain.value=.45;s.connect(f);f.connect(g);g.connect(out);nodes.push(s,lfo(.085,.32,g.gain),lfo(.05,180,f.frequency));}
    if(kind==='rain'){const s=src(),h=ctx.createBiquadFilter(),l=ctx.createBiquadFilter();h.type='highpass';h.frequency.value=900;l.type='lowpass';l.frequency.value=7000;const g=ctx.createGain();g.gain.value=.22;s.connect(h);h.connect(l);l.connect(g);g.connect(out);nodes.push(s,lfo(.3,.03,g.gain));}
    if(kind==='wind'){const s=src(),f=ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=420;f.Q.value=.6;const g=ctx.createGain();g.gain.value=.3;s.connect(f);f.connect(g);g.connect(out);nodes.push(s,lfo(.06,.22,g.gain),lfo(.04,160,f.frequency));}
    if(kind==='hum'){const o1=ctx.createOscillator(),o2=ctx.createOscillator(),g=ctx.createGain();o1.frequency.value=55;o2.frequency.value=110;o1.type='sine';o2.type='triangle';g.gain.value=.05;o1.connect(g);o2.connect(g);g.connect(out);o1.start();o2.start();const s=src(),f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=180;const g2=ctx.createGain();g2.gain.value=.25;s.connect(f);f.connect(g2);g2.connect(out);nodes.push(o1,o2,s);}
    return {out,nodes};
  }
  function fadeTo(node,v,t=.8){try{const n=ctx.currentTime;node.gain.cancelScheduledValues(n);node.gain.setValueAtTime(node.gain.value,n);node.gain.linearRampToValueAtTime(v,n+t);}catch(_){}}
  function drop(kind){const L=layers[kind];if(!L)return;fadeTo(L.out,0,.8);delete layers[kind];setTimeout(()=>{for(const n of L.nodes){try{n.stop&&n.stop()}catch(_){}try{n.disconnect()}catch(_){}}},1000);}
  function apply(mix){
    for(const k of Object.keys(layers))if(!mix[k])drop(k);
    for(const [k,v] of Object.entries(mix)){if(!layers[k])layers[k]=build(k);fadeTo(layers[k].out,v,1.2);}
    fadeTo(master,level(),.4);
  }
  // 表示中の背景ファイル名（bg_<場所>_<時間>.webp）から場所と時間を取り出す
  function placeFor(storyId,step){
    try{
      if(typeof resolveStoryBackground==='function'){
        const file=resolveStoryBackground(storyId,Number.isInteger(step)?step:0);
        const m=/bg_([a-z]+)(?:_([a-z]+))?\.webp$/.exec(String(file||''));
        if(m)return {bg:m[1],time:m[2]||''};
      }
      if(typeof STORY_BACKGROUNDS!=='undefined'&&STORY_BACKGROUNDS[storyId])return STORY_BACKGROUNDS[storyId];
    }catch(_){}
    return null;
  }
  function mixFor(context){
    const {view,storyId,step}=context||{};
    if(view!=='story'||!storyId)return {};
    const p=placeFor(storyId,step);if(!p)return {};
    return AMBIENT_BY_BG[`${p.bg}:${p.time}`]||AMBIENT_BY_BG[p.bg]||{};
  }
  function sync(context){
    if(!unlocked)return;
    const mix=mixFor(context),key=JSON.stringify(mix);
    if(key===current){if(ctx)fadeTo(master,level(),.3);return;}
    current=key;
    if(!Object.keys(mix).length){if(ctx){for(const k of Object.keys(layers))drop(k);}return;}
    if(!ensure())return;
    try{if(ctx.state==='suspended')ctx.resume();}catch(_){}
    apply(mix);
  }
  function applySettings(){if(ctx)fadeTo(master,level(),.3);}
  function unlock(){if(unlocked)return;unlocked=true;try{if(typeof currentAudioContext==='function')sync(currentAudioContext())}catch(_){}}
  document.addEventListener('pointerdown',unlock,{capture:true});
  document.addEventListener('keydown',unlock,{capture:true});
  document.addEventListener('visibilitychange',()=>{if(!ctx)return;try{document.hidden?ctx.suspend():ctx.resume()}catch(_){}});
  return Object.freeze({sync,applySettings,unlock,mixFor,snapshot(){return {unlocked,current,layers:Object.keys(layers),level:level(),state:ctx&&ctx.state}}});
})();
