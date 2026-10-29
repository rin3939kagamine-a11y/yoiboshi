/* Ver.0.31.0.0 — story-scene backgrounds. UI-only; does not modify story scripts or save data. */
const STORY_BG_FILES = Object.freeze({
  'soudan:day': 'assets/ART_V2/backgrounds/bg_soudan_day.webp',
  'soudan:night': 'assets/ART_V2/backgrounds/bg_soudan_night.webp',
  'shotengai:day': 'assets/ART_V2/backgrounds/bg_shotengai_day.webp',
  'shotengai:dusk': 'assets/ART_V2/backgrounds/bg_shotengai_dusk.webp',
  'shotengai:night': 'assets/ART_V2/backgrounds/bg_shotengai_night.webp',
  'ekimae:day': 'assets/ART_V2/backgrounds/bg_ekimae_day.webp',
  'ekimae:dusk': 'assets/ART_V2/backgrounds/bg_ekimae_dusk.webp',
  'ekimae:night': 'assets/ART_V2/backgrounds/bg_ekimae_night.webp',
  'lighthouse:day': 'assets/ART_V2/backgrounds/bg_lighthouse_day.webp',
  'lighthouse:dusk': 'assets/ART_V2/backgrounds/bg_lighthouse_dusk.webp',
  'lighthouse:night': 'assets/ART_V2/backgrounds/bg_lighthouse_night.webp',
  'toushitsu': 'assets/ART_V2/backgrounds/bg_toushitsu.webp',
  'kaihin:day': 'assets/ART_V2/backgrounds/bg_kaihin_day.webp',
  'kaihin:dusk': 'assets/ART_V2/backgrounds/bg_kaihin_dusk.webp',
  'kaihin:night': 'assets/ART_V2/backgrounds/bg_kaihin_night.webp',
  'kyoushitsu:day': 'assets/ART_V2/backgrounds/bg_kyoushitsu_day.webp',
  'kyoushitsu:dusk': 'assets/ART_V2/backgrounds/bg_kyoushitsu_dusk.webp',
  'kyoushitsu:night': 'assets/ART_V2/backgrounds/bg_kyoushitsu_night.webp',
  'toshokan:day': 'assets/ART_V2/backgrounds/bg_toshokan_day.webp',
  'toshokan:dusk': 'assets/ART_V2/backgrounds/bg_toshokan_dusk.webp',
  'shoko': 'assets/ART_V2/backgrounds/bg_shoko.webp',
  'soko:night': 'assets/ART_V2/backgrounds/bg_soko_night.webp',
  'soko:dusk': 'assets/ART_V2/backgrounds/bg_soko_dusk.webp',
  'soko:dawn': 'assets/ART_V2/backgrounds/bg_soko_dawn.webp',
  'dock:pre': 'assets/ART_V2/backgrounds/bg_dock_pre.webp',
  'dock:live': 'assets/ART_V2/backgrounds/bg_dock_live.webp',
  'kissa:day': 'assets/ART_V2/backgrounds/bg_kissa_day.webp',
  'kissa:dusk': 'assets/ART_V2/backgrounds/bg_kissa_dusk.webp',
  'kissa:night': 'assets/ART_V2/backgrounds/bg_kissa_night.webp',
  'shop:day': 'assets/ART_V2/backgrounds/bg_shop_day.webp',
  'shop:dusk': 'assets/ART_V2/backgrounds/bg_shop_dusk.webp',
  'studio:day': 'assets/ART_V2/backgrounds/bg_studio_day.webp',
  'studio:night': 'assets/ART_V2/backgrounds/bg_studio_night.webp',
  'kaede:dusk': 'assets/ART_V2/backgrounds/bg_kaede_dusk.webp',
  'kaede:night': 'assets/ART_V2/backgrounds/bg_kaede_night.webp',
  'ryotei:day': 'assets/ART_V2/backgrounds/bg_ryotei_day.webp',
  'ryotei:night': 'assets/ART_V2/backgrounds/bg_ryotei_night.webp',
  'lumiere:night': 'assets/ART_V2/backgrounds/bg_lumiere_night.webp',
  'lumiere:late': 'assets/ART_V2/backgrounds/bg_lumiere_late.webp',
  'matsuri:dusk': 'assets/ART_V2/backgrounds/bg_matsuri_dusk.webp',
  'matsuri:night': 'assets/ART_V2/backgrounds/bg_matsuri_night.webp',
  'hatsuden:night': 'assets/ART_V2/backgrounds/bg_hatsuden_night.webp',
  'hatsuden:late': 'assets/ART_V2/backgrounds/bg_hatsuden_late.webp',
  'yoichi:night': 'assets/ART_V2/backgrounds/bg_yoichi_night.webp',
  'yoichi:late': 'assets/ART_V2/backgrounds/bg_yoichi_late.webp',
  'yuenchi:night': 'assets/ART_V2/backgrounds/bg_yuenchi_night.webp',
  'chika:dawn': 'assets/ART_V2/backgrounds/bg_chika_dawn.webp',
  'yume:dawn': 'assets/ART_V2/backgrounds/bg_yume_dawn.webp',
  'ruby:dusk': 'assets/ART_V2/backgrounds/bg_ruby_dusk.webp',
  'tokeiten:night': 'assets/ART_V2/backgrounds/bg_tokeiten_night.webp',
  'chousa:night': 'assets/ART_V2/backgrounds/bg_chousa_night.webp',
  'shiyakusho:night': 'assets/ART_V2/backgrounds/bg_shiyakusho_night.webp'
});

const STORY_BACKGROUNDS = Object.freeze({
  chapter1_open: Object.freeze({bg:'soudan',time:'day'}),
  chiyo_meet: Object.freeze({bg:'ruby',time:'dusk'}),
  bond_momoka_3: Object.freeze({bg:'tokeiten',time:'night'}),
  bond_reina_1: Object.freeze({bg:'chousa',time:'night'}),
  bond_akane_1: Object.freeze({bg:'shiyakusho',time:'night'}),
  q30: Object.freeze({bg:'soudan',time:'night'}),
  q5_lead: Object.freeze({bg:'yuenchi',time:'night'}),
  q12: Object.freeze({bg:'chika',time:'dawn'}),
  q18: Object.freeze({bg:'yume',time:'dawn'}),
  q11_lead: Object.freeze({bg:'hatsuden',time:'night'}),
  q11: Object.freeze({bg:'hatsuden',time:'late'}),
  q17_intro: Object.freeze({bg:'yoichi',time:'night'}),
  q17: Object.freeze({bg:'yoichi',time:'late'}),
  q8_lead: Object.freeze({bg:'lumiere',time:'night'}),
  q8: Object.freeze({bg:'lumiere',time:'late'}),
  erika_meet: Object.freeze({bg:'lumiere',time:'late'}),
  q26_intro: Object.freeze({bg:'matsuri',time:'dusk'}),
  q26_pre: Object.freeze({bg:'matsuri',time:'night'}),
  q26: Object.freeze({bg:'matsuri',time:'night'}),
  q25_intro: Object.freeze({bg:'ryotei',time:'day'}),
  q25_pre: Object.freeze({bg:'ryotei',time:'day'}),
  q25: Object.freeze({bg:'ryotei',time:'day'}),
  miyabi_meet: Object.freeze({bg:'ryotei',time:'day'}),
  q7_lead: Object.freeze({bg:'kaede',time:'dusk'}),
  q7: Object.freeze({bg:'kaede',time:'night'}),
  q20_intro: Object.freeze({bg:'studio',time:'day'}),
  q20_pre: Object.freeze({bg:'studio',time:'day'}),
  q20: Object.freeze({bg:'studio',time:'night'}),
  mizuki_meet: Object.freeze({bg:'studio',time:'night'}),
  ritsu_meet: Object.freeze({bg:'studio',time:'night'}),
  q19_intro: Object.freeze({bg:'shop',time:'day'}),
  q19_pre: Object.freeze({bg:'shop',time:'day'}),
  q19: Object.freeze({bg:'shop',time:'dusk'}),
  sena_meet: Object.freeze({bg:'shop',time:'dusk'}),
  towa_meet: Object.freeze({bg:'shop',time:'day'}),
  q2_lead: Object.freeze({bg:'kissa',time:'dusk'}),
  oldcafe_meet: Object.freeze({bg:'kissa',time:'night'}),
  bond_milku_0: Object.freeze({bg:'kissa',time:'dusk'}),
  bond_milku_1: Object.freeze({bg:'kissa',time:'day'}),
  bond_milku_4: Object.freeze({bg:'kissa',time:'day'}),
  bond_chinatsu_0: Object.freeze({bg:'kissa',time:'dusk'}),
  q23_intro: Object.freeze({bg:'lighthouse',time:'day'}),
  q23_pre: Object.freeze({bg:'lighthouse',time:'dusk'}),
  q23: Object.freeze({bg:'lighthouse',time:'dusk'}),
  kagari_meet: Object.freeze({bg:'lighthouse',time:'dusk'}),
  q24_intro: Object.freeze({bg:'lighthouse',time:'day'}),
  q24_pre: Object.freeze({bg:'lighthouse',time:'dusk'}),
  q24: Object.freeze({bg:'lighthouse',time:'dusk'}),
  kurumi_meet: Object.freeze({bg:'lighthouse',time:'dusk'}),
  yuriko_meet: Object.freeze({bg:'lighthouse',time:'dusk'}),
  lighthouse_meet: Object.freeze({bg:'lighthouse',time:'day'}),
  q29_intro: Object.freeze({bg:'toushitsu',time:''}),
  q29_pre: Object.freeze({bg:'toushitsu',time:''}),
  q29: Object.freeze({bg:'toushitsu',time:''}),
  bond_momoka_2: Object.freeze({bg:'shotengai',time:'day'}),
  bond_reina_0: Object.freeze({bg:'ekimae',time:'dusk'}),
  station_meet: Object.freeze({bg:'ekimae',time:'dusk'}),
  bond_aoi_1: Object.freeze({bg:'soudan',time:'night'}),
  q18_intro: Object.freeze({bg:'soudan',time:'night'}),
  q16_intro: Object.freeze({bg:'soudan',time:'day'}),
  tsubaki_meet: Object.freeze({bg:'soudan',time:'day'}),
  kaname_meet: Object.freeze({bg:'soudan',time:'day'}),
  kaede_meet: Object.freeze({bg:'soudan',time:'day'}),
  q15_intro: Object.freeze({bg:'dock',time:'pre'}),
  reiko_meet: Object.freeze({bg:'dock',time:'pre'}),
  anzu_meet: Object.freeze({bg:'dock',time:'pre'}),
  q9_lead: Object.freeze({bg:'soko',time:'night'}),
  q9: Object.freeze({bg:'soko',time:'dawn'}),
  q14_intro: Object.freeze({bg:'soko',time:'night'}),
  q14: Object.freeze({bg:'soko',time:'night'}),
  saki_yuzu_meet: Object.freeze({bg:'soko',time:'dusk'}),
  q30_pre: Object.freeze({bg:'soko',time:'night'}),
  chapter5_end: Object.freeze({bg:'soko',time:'night'}),
  bond_nagi_1: Object.freeze({bg:'soko',time:'dusk'}),
  q10_lead: Object.freeze({bg:'shoko',time:''}),
  q10: Object.freeze({bg:'shoko',time:''}),
  q16: Object.freeze({bg:'toshokan',time:'dusk'}),
  nazuna_meet: Object.freeze({bg:'toshokan',time:'day'}),
  bond_aoi_0: Object.freeze({bg:'toshokan',time:'day'}),
  q4_lead: Object.freeze({bg:'kyoushitsu',time:'night'}),
  q4: Object.freeze({bg:'kyoushitsu',time:'night'}),
  bond_chinatsu_1: Object.freeze({bg:'kyoushitsu',time:'dusk'}),
  school_meet: Object.freeze({bg:'kyoushitsu',time:'day'}),
  q21_intro: Object.freeze({bg:'kaihin',time:'day'}),
  q21_pre: Object.freeze({bg:'kaihin',time:'dusk'}),
  q21: Object.freeze({bg:'kaihin',time:'dusk'}),
  karen_meet: Object.freeze({bg:'kaihin',time:'day'}),
  meru_meet: Object.freeze({bg:'kaihin',time:'day'}),
  q5: Object.freeze({bg:'kaihin',time:'night'}),
  bond_milku_3: Object.freeze({bg:'kaihin',time:'dusk'}),
  bond_akane_0: Object.freeze({bg:'kaihin',time:'day'}),
  bond_nagi_0: Object.freeze({bg:'kaihin',time:'night'}),
  seaside_meet: Object.freeze({bg:'kaihin',time:'day'}),
  q1_lead: Object.freeze({bg:'shotengai',time:'dusk'}),
  q3_lead: Object.freeze({bg:'ekimae',time:'dusk'}),
  q6_ready: Object.freeze({bg:'lighthouse',time:'night'}),
  q12_lead: Object.freeze({bg:'lighthouse',time:'night'}),
  chapter2_open: Object.freeze({bg:'soudan',time:'day'}),
  chapter3_end: Object.freeze({bg:'soudan',time:'day'}),
  chapter4_open: Object.freeze({bg:'soudan',time:'day'}),
  chapter5_open: Object.freeze({bg:'soudan',time:'day'}),
  q15: Object.freeze({bg:'soudan',time:'day'}),
  chapter1_end: Object.freeze({bg:'soudan',time:'night'}),
  chapter2_end: Object.freeze({bg:'soudan',time:'night'}),
  chapter3_open: Object.freeze({bg:'soudan',time:'night'}),
  chapter4_end: Object.freeze({bg:'soudan',time:'night'}),
  q30_intro: Object.freeze({bg:'soudan',time:'night'}),
  q22_intro: Object.freeze({bg:'shotengai',time:'day'}),
  q22_pre: Object.freeze({bg:'shotengai',time:'dusk'}),
  q22: Object.freeze({bg:'shotengai',time:'dusk'}),
  chihiro_meet: Object.freeze({bg:'shotengai',time:'day'}),
  sanae_meet: Object.freeze({bg:'shotengai',time:'day'}),
  q3: Object.freeze({bg:'ekimae',time:'dusk'}),
  q6: Object.freeze({bg:'lighthouse',time:'night'}),
  q13_intro: Object.freeze({bg:'lighthouse',time:'dusk'}),
  q13: Object.freeze({bg:'lighthouse',time:'dusk'}),
  q27_intro: Object.freeze({bg:'lighthouse',time:'day'}),
  q27_pre: Object.freeze({bg:'lighthouse',time:'dusk'}),
  q27: Object.freeze({bg:'lighthouse',time:'night'}),
  q28_intro: Object.freeze({bg:'toushitsu',time:''}),
  q28_pre: Object.freeze({bg:'toushitsu',time:''}),
  q28: Object.freeze({bg:'toushitsu',time:''}),
  shinonome_meet: Object.freeze({bg:'shotengai',time:'dusk'}),
  office_meet: Object.freeze({bg:'soudan',time:'day'}),
  bond_momoka_0: Object.freeze({bg:'shotengai',time:'day'}),
  bond_momoka_1: Object.freeze({bg:'shotengai',time:'dusk'}),
  bond_momoka_4: Object.freeze({bg:'shotengai',time:'day'}),
  bond_milku_2: Object.freeze({bg:'soudan',time:'night'}),
  bond_concept26_0: Object.freeze({bg:'shotengai',time:'day'}),
  bond_concept27_0: Object.freeze({bg:'shotengai',time:'day'}),
  bond_chihiro_0: Object.freeze({bg:'shotengai',time:'day'}),
  bond_concept08_1: Object.freeze({bg:'ekimae',time:'day'}),
  bond_concept21_1: Object.freeze({bg:'ekimae',time:'day'})
});

function storyBackgroundFile(bg, time){
  if(bg === 'toushitsu') return STORY_BG_FILES.toushitsu;
  if(bg === 'shoko') return STORY_BG_FILES.shoko;
  if(bg === 'soudan' && time === 'dusk') time = 'day';
  return STORY_BG_FILES[`${bg}:${time}`] || null;
}

function resolveStoryBackground(storyId, lineIndex){
  const defaults = STORY_BACKGROUNDS[storyId];
  // A single authored line may override the story-wide background; no lines are edited in v0.31.
  let lineBg;
  if(Number.isInteger(lineIndex) && lineIndex >= 0 && typeof romanceScript === 'function'){
    try { lineBg = romanceScript(storyId)?.lines?.[lineIndex]?.bg; }
    catch (_) { /* Missing story: fall through to the default or legacy view. */ }
  }
  if(typeof lineBg === 'string' && lineBg.trim()){
    const [bg, time = ''] = lineBg.trim().split(':');
    return storyBackgroundFile(bg,time);
  }
  return defaults ? storyBackgroundFile(defaults.bg,defaults.time) : null;
}

// Cache actual decoded image objects outside the re-rendered #app subtree.
// A failed image stays in error state and the existing CSS skyline remains visible.
const STORY_BG_CACHE = new Map();
function preloadStoryBackgroundFile(path){
  if(!path || typeof Image === 'undefined' || STORY_BG_CACHE.has(path)) return;
  const image = new Image();
  const record = {state:'loading',image};
  STORY_BG_CACHE.set(path,record);
  image.onload = () => {
    record.state = image.naturalWidth > 0 ? 'ready' : 'error';
    // Decode when available so the first display is not held up by a decode on the render path.
    const decoded = record.state === 'ready' && typeof image.decode === 'function'
      ? image.decode().catch(()=>{}) : Promise.resolve();
    decoded.then(()=>{
      if(typeof storySession !== 'undefined' && typeof view !== 'undefined'
         && view === 'story' && storySession
         && resolveStoryBackground(storySession.id,storySession.step) === path
         && typeof render === 'function') render();
    });
  };
  image.onerror = () => {
    record.state = 'error';
    if(typeof storySession !== 'undefined' && typeof view !== 'undefined'
       && view === 'story' && storySession
       && resolveStoryBackground(storySession.id,storySession.step) === path
       && typeof render === 'function') render();
  };
  image.src = path;
}
function preloadStoryBackgrounds(storyId){
  const paths = new Set();
  const defaultPath = resolveStoryBackground(storyId,-1);
  if(defaultPath) paths.add(defaultPath);
  try {
    const lines = typeof romanceScript === 'function' ? romanceScript(storyId)?.lines : null;
    if(Array.isArray(lines)) for(let i=0;i<lines.length;i++){
      if(typeof lines[i]?.bg === 'string' && lines[i].bg.trim()){
        const path = resolveStoryBackground(storyId,i);
        if(path) paths.add(path);
      }
    }
  }catch(_) { /* Unknown story: unchanged legacy presentation. */ }
  paths.forEach(preloadStoryBackgroundFile);
}
function readyStoryBackground(storyId,lineIndex){
  const path = resolveStoryBackground(storyId,lineIndex);
  if(!path) return null;
  if(!STORY_BG_CACHE.has(path)) preloadStoryBackgroundFile(path);
  return STORY_BG_CACHE.get(path)?.state === 'ready' ? path : null;
}
