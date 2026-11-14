/* Ver.0.76.0.0: artwork for the 4 heroines (full body, upper crop, face crop of the same signed-off standee). */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0760==='undefined')return;
 for(const id of NEW_HERO_IDS_V0760){
  for(const type of ['full_body','upper_body','face_icons']){
   if(ART_V2[type])ART_V2[type][id]=`assets/ART_V2/${type}/${id}.webp?v=0.76.0.0`;
  }
 }
})();
