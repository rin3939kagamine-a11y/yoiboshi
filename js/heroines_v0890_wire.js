/* Approved PR58 eight standees; original art or safety-checked Iori variant. */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0890==='undefined')return;
 for(const id of NEW_HERO_IDS_V0890){
  ART_V2.full_body[id]='assets/ART_V2/full_body/'+id+'.png?v=20261115-pr58-stage1';
  for(const slot of ['upper_body','face_icons'])if(ART_V2[slot])ART_V2[slot][id]='assets/ART_V2/'+slot+'/'+id+'.webp?v=20261115-pr58-stage1';
 }
})();
