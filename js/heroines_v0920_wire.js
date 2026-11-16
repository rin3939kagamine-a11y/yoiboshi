/* 2026-11-16: 20 approved standees; artwork-only wiring, no units or gacha entries. */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0920==='undefined')return;
 for(const id of NEW_HERO_IDS_V0920){
  ART_V2.full_body[id]='assets/ART_V2/full_body/'+id+'.png?v=20261116-adopted20-stage1';
  for(const slot of ['upper_body','face_icons'])if(ART_V2[slot])
   ART_V2[slot][id]='assets/ART_V2/'+slot+'/'+id+'.webp?v=20261116-adopted20-stage1';
 }
})();
