/* Approved three SR heroines; full body, upper crop, face crop from the original signed-off PNG only. */
(function(){
 for(const id of NEW_HERO_IDS_V0692){
  if(typeof ART_V2==='undefined')continue;
  for(const type of ['full_body','upper_body','face_icons']){
   if(ART_V2[type])ART_V2[type][id]=`assets/ART_V2/${type}/${id}.webp?v=0.69.2.0`;
  }
 }
})();
