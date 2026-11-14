/* #81/#82: approved original full-body PNGs remain unchanged. Conversation crops
 * are deterministic lossless WebP extracts from those same originals. */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0810==='undefined')return;
 const images={
  sakakibara_kaho:'assets/character_candidates/2026-11-12_rust_red_standee/full_body.png',
  minase_ririka:'assets/character_candidates/2026-11-12_brown_ponytail_white_lace/brown_ponytail_white_lace_full_body.png'
 };
 for(const id of NEW_HERO_IDS_V0810){
  ART_V2.full_body[id]=images[id]+'?v=0.81.0.0';
  for(const slot of ['upper_body','face_icons']){
   if(ART_V2[slot])ART_V2[slot][id]='assets/ART_V2/'+slot+'/'+id+'.webp?v=20261115-crop';
  }
 }
})();
