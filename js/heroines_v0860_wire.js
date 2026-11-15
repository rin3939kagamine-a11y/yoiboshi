/* PR #59 newly accepted four standees: stage1 portraits and deterministic source crops.
 * This file only registers image paths; originals remain available in docs/.
 */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0860==='undefined')return;
 for(const id of NEW_HERO_IDS_V0860){
  ART_V2.full_body[id]='assets/ART_V2/full_body/'+id+'.png?v=20261115-pr59';
  for(const slot of ['upper_body','face_icons']){
   if(ART_V2[slot])ART_V2[slot][id]='assets/ART_V2/'+slot+'/'+id+'.webp?v=20261115-pr59';
  }
 }
})();
