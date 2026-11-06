/* Ver.0.50.0.0 / 19 heroine art registrations. No existing character art is changed. */
(function(){
 const V='?v=0.50.0.0';
 for(const id of NEW_HERO_IDS_V0500){
  if(typeof ART_V2!=='undefined'){
   if(ART_V2.full_body)ART_V2.full_body[id]=`assets/ART_V2/full_body/${id}.${['rui','kaori','suzune'].includes(id)?'png':'webp'}${V}`;
   if(ART_V2.upper_body)ART_V2.upper_body[id]=`assets/ART_V2/upper_body/${id}.webp${V}`;
   if(ART_V2.face_icons)ART_V2.face_icons[id]=`assets/ART_V2/face_icons/${id}.webp${V}`;
  }
  // No six-expression files for the 19 additions. Symbol reactions are the permanent specification.
  // Old 60 expression registrations remain intact for reversible rollback.
 }
})();