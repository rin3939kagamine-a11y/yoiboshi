/* Ver.0.50.0.1: opt-in unified symbol reaction renderer. No save/state/schema/old art files changed.
 * Existing 62 crops live in an independent versioned directory, leaving legacy upper_body and expressions untouched.
 * ichika: user-approved dynamic full-body crop. juri: provisional pre-Aries image until replacement.
 * "haruka" is shared by a historical NPC (霧島ハルカ) and new heroine (朝倉はるか).
 * Callers can pass legacyNpcHaruka to preserve the historic NPC portrait.
 */
const SYMBOL_REACTION_EXISTING_V0500=Object.freeze(["ageha","akane","anzu","aoi","chihiro","chinatsu","chiyo","cocoa","ena","erika","fumika","hiyori","hotaru","ichika","jun","juri","kaede","kagari","kaname","karen","kirari","koharu","koyori","kurumi","kyoko","lilith","luna","mai","makoto","marin","maron","meru","milku","minori","mio","miyabi","mizuki","momoka","nagi","natsume","nazuna","noel","reiko","reina","riko","ritsu","saeko","saki","sanae","sena","shino","shio","shizuku","suiran","touko","touko_true","towa","tsubaki","yui","yume","yuriko","yuzu"]);
const SYMBOL_REACTION_NEW_V0500=Object.freeze([...NEW_HERO_IDS_V0500]);
const SYMBOL_REACTION_ACTORS_V0500=Object.freeze([...new Set([...SYMBOL_REACTION_EXISTING_V0500,...SYMBOL_REACTION_NEW_V0500])]);
const SYMBOL_REACTION_CROP_ROOT_V0500='assets/ART_V2/upper_body_crops_v0500/';
const SYMBOL_REACTION_GLYPHS_V0500=Object.freeze({
 smile:{mark:'♪',motion:'hop'},blush:{mark:'♡',motion:'sway'},
 surprise:{mark:'！',motion:'jump'},question:{mark:'？',motion:'tilt'},
 confused:{mark:'💦',motion:'recoil'},angry:{mark:'💢',motion:'shake'},
 sad:{mark:'…',motion:'sink'},kiss:{mark:'💋',motion:'kiss',secondary:'♡'}
});
function symbolReactionEnabledV0500(id){return SYMBOL_REACTION_ACTORS_V0500.includes(id);}
function symbolReactionKindV0500(cue){
 const name=String(cue?.face||cue?.emotion||cue||'normal').trim().toLowerCase();
 const kinds={smile:'smile',happy:'smile',joy:'smile',嬉しい:'smile',blush:'blush',love:'blush',heart:'blush',照れ:'blush',好意:'blush',
  surprise:'surprise',surprised:'surprise',驚き:'surprise',question:'question',questioning:'question',doubt:'question',疑問:'question',
  confused:'confused',confusion:'confused',panic:'confused',flustered:'confused',焦り:'confused',困惑:'confused',
  angry:'angry',anger:'angry',mad:'angry',pout:'angry',怒り:'angry',
  sad:'sad',悲しい:'sad',sorrow:'sad',kiss:'kiss',kissing:'kiss',キス:'kiss',normal:'normal'};
 return kinds[name]||'normal';
}
function symbolReactionAssetV0500(id,opts={}){
 if(opts.legacyNpcHaruka===true&&id==='haruka')
  return 'assets/ART_V2/story_cast/haruka_talk.webp?v=0.49.2.0';
 if(typeof artV2TalkCropV0500==='function')return artV2TalkCropV0500(id);
 const isNew=SYMBOL_REACTION_NEW_V0500.includes(id);
 return (isNew?'assets/ART_V2/upper_body/':SYMBOL_REACTION_CROP_ROOT_V0500)+id+'.webp?v=0.50.0.1';
}
function symbolReactionRenderV0500({personId,face='normal',sceneKey='default',opts={},esc=String,motionReduced=()=>false}){
 if(!symbolReactionEnabledV0500(personId))return null;
 const kind=symbolReactionKindV0500(face);
 const config=SYMBOL_REACTION_GLYPHS_V0500[kind]||null;
 const serious=opts.serious===true||opts.sceneTag==='serious'||opts.suppressSymbols===true;
 const show=!!config&&(!serious||kind==='kiss');
 const token=sceneKey+':'+personId+':'+String(opts.eventKey??'')+':'+kind;
 const previous=SYMBOL_REACTION_RENDER_MEMORY_V0500.get(sceneKey+':'+personId);
 const play=!!config&&token!==previous;
 SYMBOL_REACTION_RENDER_MEMORY_V0500.set(sceneKey+':'+personId,token);
 const alt=opts.alt||personId+'の立ち絵',safe=val=>esc(String(val));
 const classes=[opts.wrapperClass||'',opts.stateClass||'','symbol-reaction-v0500',play?'symbol-reaction-play':'',config?'symbol-motion-'+config.motion:'',serious?'symbol-serious':''].filter(Boolean).join(' ');
 const glyph=show?'<span class="symbol-reaction-head" aria-hidden="true">'+config.mark+(config.secondary?'<small>'+config.secondary+'</small>':'')+'</span>':'';
 const src=opts.assetOverride||symbolReactionAssetV0500(personId,opts);
 return '<div class="'+safe(classes)+'" data-person-id="'+safe(personId)+'" data-expression="'+safe(kind)+'" data-expression-source="symbol" data-symbol-visible="'+String(show)+'" data-symbol-motion="'+safe(config?.motion||'none')+'" data-symbol-cue="'+safe(String(face))+'"><img class="'+safe(opts.imageClass||'expr-character-img')+' symbol-reaction-image" src="'+safe(src)+'" alt="'+safe(alt)+'">'+glyph+'</div>';
}
const SYMBOL_REACTION_RENDER_MEMORY_V0500=new Map();
