/* 2026-11-16: Nagasawa Mayu adopted character, stage1. No existing character text changed. */
const NEW_HERO_IDS_V0940=Object.freeze([]);
const NEW_HERO_REVEAL_V0940=Object.freeze({});
const V0940_CHARACTERS=Object.freeze([]);
const ROMANCE_V0940=Object.freeze(Object.fromEntries(V0940_CHARACTERS.map(c=>[c.id,v0920Romance(c.id,c)])));
const TOMOSHIBI_V0940=Object.freeze(Object.fromEntries(V0940_CHARACTERS.map(c=>[c.id,{color:c.flame[0],thought:c.flame[1]}])));
const CHARACTER_DEPTH_V0940=Object.freeze(Object.fromEntries(V0940_CHARACTERS.map(c=>[c.id,{habit:c.depth[0],inside:c.depth[1],growth:c.depth[2],cg:c.depth[3]}])));
const V0940_MEET_STORIES=Object.freeze(Object.fromEntries(V0940_CHARACTERS.map(c=>['v0940_meet_'+c.id,{
 id:'v0940_meet_'+c.id,title:c.name+'・出会いの日',place:c.job+'の仕事場',requires:['q6'],
 lines:[{who:'narrator',text:c.meet[0]},{who:c.id,text:c.meet[1]},{who:'you',text:c.meet[2]},
  {who:c.id,text:c.meet[3]},{who:'narrator',text:c.meet[4]}]
}])));
