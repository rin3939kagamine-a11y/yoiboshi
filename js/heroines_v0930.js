/* Adopted Fujimiya Shion: independent one-character stage 1. */
const NEW_HERO_IDS_V0930=Object.freeze([]);
const NEW_HERO_REVEAL_V0930=Object.freeze({});
const V0930_CHARACTERS=Object.freeze([]);
const ROMANCE_V0930=Object.freeze(Object.fromEntries(V0930_CHARACTERS.map(c=>[c.id,v0920Romance(c.id,c)])));
const TOMOSHIBI_V0930=Object.freeze(Object.fromEntries(V0930_CHARACTERS.map(c=>[c.id,{color:c.flame[0],thought:c.flame[1]}])));
const CHARACTER_DEPTH_V0930=Object.freeze(Object.fromEntries(V0930_CHARACTERS.map(c=>[c.id,{habit:c.depth[0],inside:c.depth[1],growth:c.depth[2],cg:c.depth[3]}])));
const V0930_MEET_STORIES=Object.freeze(Object.fromEntries(V0930_CHARACTERS.map(c=>['v0930_meet_'+c.id,{
 id:'v0930_meet_'+c.id,title:c.name+'・出会いの日',place:c.job+'の仕事場',requires:['q6'],
 lines:[{who:'narrator',text:c.meet[0]},{who:c.id,text:c.meet[1]},{who:'you',text:c.meet[2]},
  {who:c.id,text:c.meet[3]},{who:'narrator',text:c.meet[4]}]
}])));
