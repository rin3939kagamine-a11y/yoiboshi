/* Ver.0.42.0.0 — 新ヒロイン6人の絵（全身・上半身・表情）を絵の対応表に登録する。 */
(function(){
 const V='?v=0.42.4.0';const ids=['natsume','hotaru','minori','ichika','juri','saeko'];
 if(typeof ART_V2!=='undefined'){for(const id of ids){
  if(ART_V2.full_body)ART_V2.full_body[id]=`assets/ART_V2/full_body/${id}.webp${V}`;
  if(ART_V2.upper_body)ART_V2.upper_body[id]=`assets/ART_V2/upper_body/${id}.webp${V}`;
  if(ART_V2.full_body_dynamic)ART_V2.full_body_dynamic[id]=`assets/ART_V2/full_body_dynamic/${id}.webp${V}`;
  if(ART_V2.face_icons)ART_V2.face_icons[id]=`assets/ART_V2/face_icons/${id}.webp${V}`;
 }}
 if(typeof ART_EXPRESSIONS!=='undefined'){for(const id of ids){const e={};for(const f of ['normal','smile','blush','sad','pout','surprise'])e[f]=`assets/ART_V2/expressions/${id}_${f}.webp${V}`;ART_EXPRESSIONS[id]=Object.assign({},ART_EXPRESSIONS[id]||{},e);}}
})();
