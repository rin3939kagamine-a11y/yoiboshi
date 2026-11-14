/* Tokiwa Aone: exact approved PR #64 v3 PNG for full body.
 * Upper body / face icons are lossless crops of that exact source (no regeneration). */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0830==='undefined')return;
 const source='assets/provisional/2026-11-11_pink_underlayer_standee/full_body/pink_underlayer_black_street_v3_regenerated_CANDIDATE.png';
 ART_V2.full_body.tokiwa_aone=source+'?v=20261115';
 for(const slot of ['upper_body','face_icons']){
  if(ART_V2[slot])ART_V2[slot].tokiwa_aone='assets/ART_V2/'+slot+'/tokiwa_aone.webp?v=20261115-crop';
 }
})();
