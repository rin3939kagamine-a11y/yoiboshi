/* RE:START Ver.0.34.0.0 — Stage 5a: character flames + simple 2/3-flame resonance.
 * Character soul-colors/thoughts are read from PEOPLE[*].tomoshibi where authored.
 * Five weakness colors are NOT rewritten. Source has two missing canon flame entries.
 * Stage 5a features affect TURN battles except q1; never persistent save data.
 */
const TB_FLAME_RULES = Object.freeze({
 mend:{label:'小回復',detail:'負傷した味方1人を小回復'},
 pulse:{label:'全体小回復',detail:'味方全員を少量回復'},
 ward:{label:'守り',detail:'味方1人に小さな障壁'},
 rally:{label:'鼓舞',detail:'自分の攻撃を一時強化'},
 focus:{label:'集中',detail:'自分の攻撃を一時強化'},
 mark:{label:'看破',detail:'狙った敵の防御を一時低下'},
 dampen:{label:'制止',detail:'狙った敵の攻撃を一時低下'},
 quick:{label:'支援',detail:'味方1人のスキルCTを短縮'}
});
const TB_FLAME_LIBRARY=Object.freeze({
 "momoka":Object.freeze({kind:"rally",name:"笑顔の火種"}),
 "milku":Object.freeze({kind:"pulse",name:"安らぎの香り"}),
 "nagi":Object.freeze({kind:"ward",name:"紅糸の庇護"}),
 "chinatsu":Object.freeze({kind:"rally",name:"ひとりにしない灯"}),
 "aoi":Object.freeze({kind:"mend",name:"月白の手当て"}),
 "akane":Object.freeze({kind:"ward",name:"街を守る橙光"}),
 "reina":Object.freeze({kind:"focus",name:"先陣の群青"}),
 "concept24":Object.freeze({kind:"mend",name:"焼きたての休息"}),
 "concept32":Object.freeze({kind:"focus",name:"寄り道の苺光"}),
 "concept26":Object.freeze({kind:"ward",name:"全力応援の黄金"}),
 "concept27":Object.freeze({kind:"pulse",name:"花言葉の追い風"}),
 "concept10":Object.freeze({kind:"mark",name:"翠月の眼差し"}),
 "concept12":Object.freeze({kind:"focus",name:"素顔の勇気"}),
 "concept25":Object.freeze({kind:"dampen",name:"嘘を見抜く夜"}),
 "concept29":Object.freeze({kind:"ward",name:"黒薔薇の結び目"}),
 "concept08":Object.freeze({kind:"pulse",name:"栞のぬくもり"}),
 "concept18":Object.freeze({kind:"rally",name:"恋を応援する風"}),
 "concept28":Object.freeze({kind:"mend",name:"朝のもてなし"}),
 "concept14":Object.freeze({kind:"focus",name:"歌声の残光"}),
 "concept20":Object.freeze({kind:"rally",name:"虹色のつながり"}),
 "concept21":Object.freeze({kind:"ward",name:"届ける守り"}),
 "concept09":Object.freeze({kind:"mark",name:"瞬間を切り取る光"}),
 "concept23":Object.freeze({kind:"dampen",name:"借りを返す一撃"}),
 "concept15":Object.freeze({kind:"ward",name:"根拠ある防壁"}),
 "concept11":Object.freeze({kind:"mark",name:"真相の一文字"}),
 "concept16":Object.freeze({kind:"pulse",name:"頁に残る約束"}),
 "concept17":Object.freeze({kind:"focus",name:"客席への拍手"}),
 "concept13":Object.freeze({kind:"quick",name:"旅風の合図"}),
 "concept30":Object.freeze({kind:"ward",name:"水面の守護"}),
 "concept33":Object.freeze({kind:"pulse",name:"珊瑚の居場所"}),
 "concept19":Object.freeze({kind:"quick",name:"星の選択"}),
 "concept22":Object.freeze({kind:"mend",name:"灯台へ続く道"}),
 "concept35":Object.freeze({kind:"focus",name:"真相への一歩"}),
 "concept34":Object.freeze({kind:"mark",name:"静かな洞察"}),
 "concept31":Object.freeze({kind:"quick",name:"屋上の夜明け"}),
 "concept36":Object.freeze({kind:"ward",name:"藤色のまなざし"}),
 "saki":Object.freeze({kind:"focus",name:"青い本音"}),
 "yuzu":Object.freeze({kind:"rally",name:"柚子色の並走"}),
 "anzu":Object.freeze({kind:"mend",name:"虹白の気配り"}),
 "reiko":Object.freeze({kind:"ward",name:"深紅の守り"}),
 "chiyo":Object.freeze({kind:"mend",name:"甘い幸福"}),
 "nazuna":Object.freeze({kind:"ward",name:"白百合の誓い"}),
 "sena":Object.freeze({kind:"rally",name:"銀色の勇気"}),
 "mizuki":Object.freeze({kind:"quick",name:"踊る蛍光"}),
 "meru":Object.freeze({kind:"pulse",name:"蜂蜜のほほえみ"}),
 "kagari":Object.freeze({kind:"ward",name:"消えぬ銅火"}),
 "chihiro":Object.freeze({kind:"mend",name:"芽吹きを待つ光"}),
 "karen":Object.freeze({kind:"focus",name:"波をつかむ夕焼け"}),
 "miyabi":Object.freeze({kind:"pulse",name:"桜鼠のおもてなし"}),
 "sanae":Object.freeze({kind:"ward",name:"山吹の食卓"}),
 "kurumi":Object.freeze({kind:"focus",name:"好きに正直な薔薇"}),
 "ritsu":Object.freeze({kind:"rally",name:"夜を繋ぐ音"}),
 "towa":Object.freeze({kind:"quick",name:"物語の橋渡し"}),
 "yuriko":Object.freeze({kind:"ward",name:"街へのラベンダー"}),
});
function tbFlamePerson(id){return unit(id)?.person||String(id);}
function tbFlameData(id){
 const pid=tbFlamePerson(id),profile=TB_FLAME_LIBRARY[pid];
 if(!profile)return null;
 const canon=PEOPLE[pid]?.tomoshibi;
 return {...profile,person:pid,storyColor:canon?.color||null,thought:canon?.thought||null,provisional:!canon};
}
function tbFlameDesc(id){
 const p=tbFlameData(id);if(!p)return '固有灯火は未設定';
 return `${p.name}：${TB_FLAME_RULES[p.kind].detail}。想い：${p.thought||'設定待ち'}`;
}
function tbFlameAllowed(b){return !!(b?.turnBattle&&b.qid!=='q1');}
function tbFlameActivate(b,i){
 if(!tbFlameAllowed(b))return false;
 const caster=b.allies[i],p=tbFlameData(caster.id);if(!p||caster.hp<=0)return false;
 const living=b.allies.filter(a=>a.hp>0);
 const low=living.slice().sort((x,y)=>x.hp/x.max-y.hp/y.max)[0];
 const enemy=b.enemies[b.tb.targetEnemy]?.hp>0?b.enemies[b.tb.targetEnemy]:b.enemies.find(e=>e.hp>0);
 switch(p.kind){
 case 'mend': if(low)low.hp=Math.min(low.max,low.hp+Math.max(1,Math.round(low.max*.08)));break;
 case 'pulse': for(const a of living)a.hp=Math.min(a.max,a.hp+Math.max(1,Math.round(a.max*.035)));break;
 case 'ward':if(low)low.shield=(low.shield||0)+Math.max(1,Math.round(low.max*.08));break;
 case 'rally':{caster.effects.attack=Math.max(caster.effects.attack||0,1);const partner=living.find(a=>a!==caster);if(partner)partner.effects.attack=Math.max(partner.effects.attack||0,1);break;}
 case 'focus':caster.effects.attack=Math.max(caster.effects.attack||0,1);break;
 case 'mark':if(enemy)enemy.defDownRounds=Math.max(enemy.defDownRounds||0,1);break;
 case 'dampen':if(enemy)enemy.weakenRounds=Math.max(enemy.weakenRounds||0,1);break;
 case 'quick':{const target=living.slice().sort((x,y)=>Math.max(...y.cooldowns)-Math.max(...x.cooldowns))[0];if(target)target.cooldowns=target.cooldowns.map(v=>Math.max(0,v-1));break;}
 }
 logBattle(`固有灯火「${p.name}」：${TB_FLAME_RULES[p.kind].label}`);
 return true;
}
function tbToggleResonanceMenu(){const b=tbCurrent();if(!tbFlameAllowed(b)||b.tb.lightUsed)return;b.tb.resonanceOpen=!b.tb.resonanceOpen;tbRender();}
function tbFlameInfoToggle(){const b=tbCurrent();if(!tbFlameAllowed(b))return;b.tb.flameInfo=!b.tb.flameInfo;b.tb.resonanceOpen=false;b.tb.showHelp=-1;tbRender();}
function tbFlameResonate(level){
 const b=tbCurrent(),t=b?.tb;if(!tbFlameAllowed(b)||!t||interruptConfirm||t.lightUsed||t.pickingLight)return false;
 const first=t.queue[0];if(!first||first.side!=='ally')return false;
 const alive=b.allies.filter(a=>a.hp>0);
 if(![2,3].includes(level)||alive.length<level||t.light<level)return false;
 const leader=b.allies[first.i];
 const partners=alive.filter(a=>a!==leader).slice(0,level-1);
 if(partners.length!==level-1)return false;
 // One resonance per round, like 1-flame lighting. Does not consume the acting turn.
 if(typeof tbUiSnapshot==='function')t.flameUiBefore=tbUiSnapshot(b);
 t.light-=level;t.lightUsed=true;t.lit=first.i;t.resonanceOpen=false;
 // Allow standard attack bonus and CT effect on the leader, but do not double-trigger 1-flame's personal effect.
 leader.cooldowns=leader.cooldowns.map(v=>Math.max(0,v-TB_BALANCE.lightCooldownReduction));
 if(level===2){
  for(const a of [leader,...partners])a.shield=(a.shield||0)+Math.max(1,Math.round(a.max*.09));
 }else{
  for(const a of alive){a.shield=(a.shield||0)+Math.max(1,Math.round(a.max*.07));a.hp=Math.min(a.max,a.hp+Math.max(1,Math.round(a.max*.04)));}
 }
 const names=[leader,...partners].map(a=>person(unit(a.id)).name).join('・');
 if(typeof tbUiCapture==='function')tbUiCapture(b,level,first.i);
 logBattle(`${level}灯共鳴！ ${names}の想いが響く（${level===2?'二人に障壁':'全員に障壁＋小回復'}）`);
 AudioDirector.sfx('confirm');if(typeof ycEvent==='function')ycEvent('glow',leader);tbRender();return true;
}
