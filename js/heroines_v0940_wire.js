/* Mayu: accepted source image as-is + only lossless crops. */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0940==='undefined')return;
 for(const id of NEW_HERO_IDS_V0940){
  ART_V2.full_body[id]='assets/ART_V2/full_body/'+id+'.png?v=20261116-nagasawa';
  for(const slot of ['upper_body','face_icons'])if(ART_V2[slot])
   ART_V2[slot][id]='assets/ART_V2/'+slot+'/'+id+'.webp?v=20261116-nagasawa';
 }
})();
