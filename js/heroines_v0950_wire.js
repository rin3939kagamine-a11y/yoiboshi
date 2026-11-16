/* v0950: approved original full-body PNGs and 2 lossless crops per portrait. */
(function(){
 if(typeof ART_V2==='undefined'||typeof NEW_HERO_IDS_V0950==='undefined')return;
 for(const id of NEW_HERO_IDS_V0950){
  ART_V2.full_body[id]='assets/ART_V2/full_body/'+id+'.png?v=20261116-v0950';
  for(const slot of ['upper_body','face_icons'])if(ART_V2[slot])
   ART_V2[slot][id]='assets/ART_V2/'+slot+'/'+id+'.webp?v=20261116-v0950';
 }
})();
