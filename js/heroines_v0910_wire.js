/* 12 approved original PNGs and source-only lossless dialogue crops. */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0910==='undefined')return;
 for(const id of NEW_HERO_IDS_V0910){
  ART_V2.full_body[id]='assets/ART_V2/full_body/'+id+'.png?v=20261115-singles12-stage1';
  for(const slot of ['upper_body','face_icons'])if(ART_V2[slot])ART_V2[slot][id]='assets/ART_V2/'+slot+'/'+id+'.webp?v=20261115-singles12-stage1';
 }
})();
