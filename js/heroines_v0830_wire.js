/* Tokiwa Aone uses exactly the approved PR #64 v3 PNG in all portrait slots. */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0830==='undefined')return;
 const path='assets/provisional/2026-11-11_pink_underlayer_standee/full_body/pink_underlayer_black_street_v3_regenerated_CANDIDATE.png';
 for(const slot of ['full_body','upper_body','face_icons']){
  if(ART_V2[slot])ART_V2[slot].tokiwa_aone=path+'?v=20261115';
 }
})();
