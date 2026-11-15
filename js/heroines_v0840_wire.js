/* PR #60 approved transparent PNGs, copied byte-for-byte into ART_V2/full_body.
 * The upper-body / face-icon WebP assets are deterministic crops of these PNGs.
 * No conversion or edit is performed on the approved full-body originals. */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0840==='undefined')return;
 for(const id of NEW_HERO_IDS_V0840){
  ART_V2.full_body[id]='assets/ART_V2/full_body/'+id+'.png?v=20261115-stage1';
  for(const slot of ['upper_body','face_icons']){
   if(ART_V2[slot])ART_V2[slot][id]='assets/ART_V2/'+slot+'/'+id+'.webp?v=20261115-stage1';
  }
 }
})();
