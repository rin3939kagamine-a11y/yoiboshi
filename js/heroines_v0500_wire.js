/* Ver.0.50.0.0 / 19 heroine art registrations. No existing character art is changed. */
(function(){
 const V='?v=0.50.0.0';
 for(const id of NEW_HERO_IDS_V0500){
  if(typeof ART_V2!=='undefined'){
   if(ART_V2.full_body)ART_V2.full_body[id]=`assets/ART_V2/full_body/${id}.${['rui','kaori','suzune'].includes(id)?'png':'webp'}${V}`;
   if(ART_V2.upper_body)ART_V2.upper_body[id]=`assets/ART_V2/upper_body/${id}.webp${V}`;
   if(ART_V2.face_icons)ART_V2.face_icons[id]=`assets/ART_V2/face_icons/${id}.webp${V}`;
  }
  if(typeof ART_EXPRESSIONS!=='undefined'){
   const e={};for(const face of ['normal','smile','blush','sad','pout','surprise'])e[face]=`assets/ART_V2/expressions/${id}_${face}.webp${V}`;
   ART_EXPRESSIONS[id]=Object.assign({},ART_EXPRESSIONS[id]||{},e);
  }
 }
})();