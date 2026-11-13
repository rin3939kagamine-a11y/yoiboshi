/* #81/#82: quest-gated dialogue-only characters; no units are registered. */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0810==='undefined')return;
 const images={
  sakakibara_kaho:'assets/character_candidates/2026-11-12_rust_red_standee/full_body.png',
  minase_ririka:'assets/character_candidates/2026-11-12_brown_ponytail_white_lace/brown_ponytail_white_lace_full_body.png'
 };
 for(const id of NEW_HERO_IDS_V0810){
  // Reuse the exact approved PNG in all slots until reviewed crops exist.
  // This preserves image identity and avoids unapproved image generation.
  for(const slot of ['full_body','upper_body','face_icons']){
   if(ART_V2[slot])ART_V2[slot][id]=images[id]+'?v=0.81.0.0';
  }
 }
})();
