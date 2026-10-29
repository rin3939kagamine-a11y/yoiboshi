// RE:START audio engine. Local trial: 9 user-provided BGM tracks + 9 Kenney CC0 sound effects.
// SFX: Kenney Interface Sounds / Impact Sounds (CC0); not Sound Effect Lab or synthetic placeholders.
// Empty/missing files are intentionally silent. Do not change ART or save keys.
const AUDIO_ASSETS = {
  bgm: {home:'assets/audio/home.mp3', daily:'assets/audio/daily.mp3', story:'assets/audio/story.mp3', sad:'assets/audio/sad.mp3', battle:'assets/audio/battle.mp3', boss:'assets/audio/boss.mp3', sakuya_boss:'assets/audio/sakuya_boss.mp3', ibuki_boss:'assets/audio/ibuki_boss.mp3', map:'assets/audio/map.mp3'},
  sfx: {tap:'assets/audio/sfx/tap.mp3', confirm:'assets/audio/sfx/confirm.mp3', cancel:'assets/audio/sfx/cancel.mp3', page:'assets/audio/sfx/page.mp3', affection:'assets/audio/sfx/affection.mp3', gacha:'assets/audio/sfx/gacha.mp3', victory:'assets/audio/sfx/victory.mp3', defeat:'assets/audio/sfx/defeat.mp3', hit:'assets/audio/sfx/hit.mp3'}
};
const AUDIO_SCENE_CUES = Object.freeze({
  prologue:{bgm:'story',changes:{2:'daily',9:'story'}},
  chapter1_open:{bgm:'story'},q3:{bgm:'story'},q4:{bgm:'sad'},q5:{bgm:'story'},q6:{bgm:'sad'},chapter1_end:{bgm:'story'},
  // Chapter 2 (q7-q12): maintain narrative tension and make rescue/reunion gentler.
  chapter2_open:{bgm:'story'},q7:{bgm:'story'},q8:{bgm:'story'},q9:{bgm:'story'},
  q10:{bgm:'story',changes:{2:'sad',9:'story'}},
  q11:{bgm:'story',changes:{5:'sad',9:'story'}},
  q12:{bgm:'story',changes:{4:'sad',8:'story'}},
  chapter2_end:{bgm:'daily',changes:{6:'story'}},
  bond_momoka_0:{bgm:'daily'},bond_momoka_1:{bgm:'daily'},bond_momoka_2:{bgm:'sad'},bond_momoka_3:{bgm:'sad'},bond_momoka_4:{bgm:'daily'},
  bond_milku_0:{bgm:'daily'},bond_milku_1:{bgm:'daily'},bond_milku_2:{bgm:'sad'},bond_milku_3:{bgm:'sad'},bond_milku_4:{bgm:'daily'},
  bond_reina_0:{bgm:'daily'},bond_reina_1:{bgm:'story',changes:{4:'sad'}},
  bond_akane_0:{bgm:'daily'},bond_akane_1:{bgm:'daily',changes:{2:'sad'}},
  bond_aoi_0:{bgm:'daily'},bond_aoi_1:{bgm:'story',changes:{2:'sad'}},
  bond_chinatsu_0:{bgm:'daily'},bond_chinatsu_1:{bgm:'daily',changes:{6:'sad'}},
  bond_nagi_0:{bgm:'daily'},bond_nagi_1:{bgm:'sad'}
});
function audioSceneBgm(sceneId,step=0){
  const cue=AUDIO_SCENE_CUES[sceneId];if(!cue)return 'story';
  let key=cue.bgm;
  for(const [at,next] of Object.entries(cue.changes||{}).sort((a,b)=>Number(a[0])-Number(b[0]))){if(step>=Number(at))key=next;}
  return key;
}
function validAudioSettings(v){const x=v&&typeof v==='object'&&!Array.isArray(v)?v:{};
  const gain=(n,def)=>Number.isFinite(n)&&n>=0&&n<=100?Math.round(n):def;
  return {bgm:gain(x.bgm,50),sfx:gain(x.sfx,60),muted:x.muted===true};
}
const AudioDirector=(()=>{
 let getSettings=()=>({bgm:50,sfx:60,muted:false}),unlocked=false,desired='',active='',activeSource='',music=null,fadeTimer=0,generation=0;
 const history=[];const brokenSources=new Set();const maxHistory=1000;let lastHit=0;
 const config=()=>validAudioSettings(getSettings());
 const source=(group,name)=>typeof AUDIO_ASSETS[group]?.[name]==='string'?AUDIO_ASSETS[group][name].trim():'';
 const trace=(kind,name,detail)=>{history.push({kind,name,detail:detail||'',time:Date.now()});if(history.length>maxHistory)history.shift();};
 const stopFade=()=>{if(fadeTimer){clearInterval(fadeTimer);fadeTimer=0;}};
 const volume=(type)=>{const s=config();return s.muted?0:(type==='bgm'?s.bgm:s.sfx)/100;};
 const safePlay=a=>{try{const p=a.play();if(p&&typeof p.catch==='function')p.catch(()=>{/* blocked, missing, unsupported: silent */});}catch(e){/* silent */}};
 // Play exactly one BGM at a time: stop/release the previous element BEFORE
 // starting the next. The former overlapping crossfade could leave an orphaned
 // track playing when a third screen transition cancelled its timer.
 const releaseMusic=track=>{
   if(!track)return;
   try{track.pause();track.removeAttribute('src');track.load();}catch(e){/* already detached */}
 };
 const fade=(from,to,seq)=>{
   stopFade();
   releaseMusic(from); // Never overlap the outgoing and incoming BGM.
   if(!to)return;
   const started=Date.now(),duration=360;
   const update=()=>{
     if(seq!==generation || to!==music){stopFade();return;}
     const t=Math.min(1,(Date.now()-started)/duration);
     to.volume=Math.max(0,Math.min(1,volume('bgm')*t));
     if(t>=1)stopFade();
   };
   fadeTimer=setInterval(update,40);update();
 };
 function setBgm(name){
   if(!Object.prototype.hasOwnProperty.call(AUDIO_ASSETS.bgm,name))return;
   desired=name;
   if(!unlocked)return;
   const path=source('bgm',name);
   if(path&&brokenSources.has(path)){stopFade();++generation;releaseMusic(music);music=null;active='';activeSource='';return;}
   if(name===active&&music&&path===activeSource)return;
   if(!path){const old=music;music=null;active='';activeSource='';++generation;fade(old,null,generation);return;}
   if(typeof Audio!=='function')return;
   let next;
   try{next=new Audio();next.preload='auto';next.loop=true;next.volume=0;next.src=path;}
   catch(e){return;}
   const old=music,seq=++generation;music=next;active=name;activeSource=path;
   next.addEventListener('error',()=>{if(music===next){stopFade();++generation;music=null;active='';activeSource='';brokenSources.add(path);releaseMusic(next);trace('unavailable','bgm:'+name);}}, {once:true});
   next.addEventListener('playing',()=>{if(music!==next||seq!==generation)releaseMusic(next);});
   fade(old,next,seq); // Synchronously pause old BGM before calling play() on new.
   safePlay(next);trace('bgm',name);
 }
 function sync(context){const {view,storyId,step,questId,bossEncounter=false}=context||{};
   let key='home';
   // Named boss themes begin only when the actual final-wave boss has appeared.
   // All other waves and battles keep their previous tracks.
   if(view==='combat')key=bossEncounter&&questId==='q12'?'sakuya_boss':
     bossEncounter&&questId==='q17'?'ibuki_boss':
     (questId==='q6'||questId==='q12')?'boss':'battle';
   else if(view==='city'||view==='investigation')key='map';
   else if(view==='talk'||view==='date'||view==='notebook')key='daily';
   else if(view==='story'||view==='prologue')key=audioSceneBgm(view==='prologue'?'prologue':storyId,Number(step)||0);
   setBgm(key);
 }
 function unlock(){if(unlocked)return;unlocked=true;if(desired)setBgm(desired);}
 function sfx(name){
   if(!Object.prototype.hasOwnProperty.call(AUDIO_ASSETS.sfx,name))return;
   if(!unlocked||volume('sfx')<=0||!source('sfx',name)||brokenSources.has(source('sfx',name)))return;
   if(name==='hit'&&Date.now()-lastHit<95)return;
   if(name==='hit')lastHit=Date.now();
   if(typeof Audio!=='function')return;
   try{const a=new Audio(source('sfx',name));a.volume=volume('sfx');a.preload='auto';a.addEventListener('error',()=>{brokenSources.add(source('sfx',name));trace('unavailable','sfx:'+name)},{once:true});safePlay(a);trace('sfx',name);}
   catch(e){/* fallback: silence */}
 }
 function applySettings(){if(music)music.volume=volume('bgm');}
 // User activation and delegated UI sounds work after every full innerHTML render.
 function install(){
   document.addEventListener('pointerdown',unlock,{capture:true});
   document.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')unlock()},{capture:true});
   document.addEventListener('click',e=>{
     if(!unlocked)unlock();
     const el=e.target.closest('button,a,[role="button"]');if(!el||el.disabled)return;
     const action=el.getAttribute('onclick')||'',label=el.textContent||'';
     // Audio-trial previews must play in isolation, not underneath a UI-tap SE.
     if(/pull\(|trial.*Recruit/i.test(action)||/AudioTrial\.(play|load|stop|restore)\(/.test(action))return;
     if(/nextStory|nextPrologue|nextRomanceLine|previousStory|previousRomanceLine|skipRomanceScene/.test(action))sfx('page');
     else if(/closeDialog|closeQuestSheet|cancelBattle|previous|中断|戻る|閉じる/.test(action+' '+label))sfx('cancel');
     else if(/choose|answer|openBond|progressQuest|startBattle|startRomanceOuting|showRomancePlaces|finishRomanceDay|selectQuest|finishStory|confirm/i.test(action))sfx('confirm');
     else sfx('tap');
   },true);
   document.addEventListener('visibilitychange',()=>{if(music){if(document.hidden)music.pause();else if(unlocked)safePlay(music)}});
 }
 function stopBgm(){stopFade();++generation;desired='';active='';activeSource='';releaseMusic(music);music=null;}
 return Object.freeze({stopBgm,configure(fn){getSettings=fn;},install,unlock,sync,setBgm,sfx,applySettings,sceneBgm:audioSceneBgm,
   snapshot(){return {unlocked,desired,active,volume:config(),events:history.slice()}}});
})();
