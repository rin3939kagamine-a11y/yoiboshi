#!/usr/bin/env python3
"""Browser regression for seven v0960 R heroines: every skill, q6 gate, pools, save and art."""
import json
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'qa_artifacts/seven_r_v0960';OUT.mkdir(parents=True,exist_ok=True)
IDS=['kuromiya_sera','haruno_hana','komiya_anna','hoshimiya_nemu','kumano_miku','ichijo_maki','natsukawa_yu']
ROLES=['attacker','healer','support','attacker','support','healer','attacker']
STATS=[[125,19,3],[148,9,5],[165,11,5],[125,19,3],[165,11,5],[148,9,5],[125,19,3]]
PASSIVES=[('v0950_attack',6),('v0950_heal',8),('v0950_buff',8),('v0950_attack',6),('v0950_buff',8),('v0950_heal',8),('v0950_attack',6)]
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
srv=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{srv.server_port}/index.html'
reports={}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=['--no-sandbox'])
  for screen,w,h in [('portrait',390,844),('landscape',844,390)]:
   ctx=browser.new_context(viewport={'width':w,'height':h})
   page=ctx.new_page();errors=[]
   page.on('pageerror',lambda e:errors.append(str(e)))
   page.goto(url,wait_until='load',timeout=90000)
   page.wait_for_function("typeof NEW_HERO_IDS_V0960!=='undefined'&&typeof NEW_UNIT_ROSTER_V0960!=='undefined'&&typeof S!=='undefined'&&typeof applySkill==='function'",timeout=60000)
   d=page.evaluate("""(ids)=>{
    const before=fresh(),after=fresh();after.quests.q6={complete:true};
    gachaMode='normal';
    const snapshot=fresh();
    snapshot.gems=2345;snapshot.gold=4321;snapshot.gachaPity=8;snapshot.gachaSrStreak=2;
    snapshot.owned.momoka_work={lv:5,aff:18,lb:2,copies:3};
    snapshot.owned.nagasawa_mayu_work={lv:2,aff:4,lb:0,copies:1};
    snapshot.party=['momoka_work','nagasawa_mayu_work'];snapshot.selected='nagasawa_mayu_work';
    snapshot.homeFavorite='nagasawa_mayu';snapshot.homeUnitId='nagasawa_mayu_work';
    snapshot.quests.q2={complete:true};snapshot.storyFlags.oldEntry=true;
    const migrated=migrateSave(JSON.parse(JSON.stringify(snapshot)));
    const saved=JSON.stringify(migrated.owned.momoka_work)===JSON.stringify(snapshot.owned.momoka_work)&&
       JSON.stringify(migrated.owned.tsukasa_work)===JSON.stringify(snapshot.owned.nagasawa_mayu_work)&&
       JSON.stringify(migrated.party)===JSON.stringify(['momoka_work','tsukasa_work'])&&
       migrated.selected==='tsukasa_work'&&migrated.homeFavorite==='tsukasa'&&
       migrated.homeUnitId==='tsukasa_work'&&migrated.gems===2345&&migrated.gold===4321&&
       migrated.gachaPity===8&&migrated.gachaSrStreak===2&&
       migrated.quests.q2.complete&&migrated.storyFlags.oldEntry&&
       ids.every(id=>!migrated.owned[id+'_work']);
    const entries=ids.map(id=>{
      const u=BYID[id+'_work'],r=ROMANCE_V0960[id];
      S=fresh();S.owned[u.id]={lv:1,aff:0,lb:0,copies:0};
      const p=unitPower(u.id);
      return {id,name:PEOPLE[id]?.name,age:r.profile.age,job:r.profile.occupation,
       rarity:u.rarity,role:u.role,gate:u.gate,stats:[p.hp,p.atk,p.def],
       topics:r.topics.length,bonds:Object.keys(r.stories).length,
       revealedBefore:heroineStoryRevealed(id,before),revealedAfter:heroineStoryRevealed(id,after),
       poolBefore:availableNormalPool(before).some(v=>v.id===u.id),
       poolAfter:availableNormalPool(after).some(v=>v.id===u.id),
       skills:[unitSkillType(u,0),unitSkillType(u,1)],
       descriptions:[skillDescription(u,0),skillDescription(u,1)],
       passive:{type:unitPassive(u).type,value:passiveValue(u)},
       art:[unitArt(u),ART_V2.full_body[id],ART_V2.upper_body[id],ART_V2.face_icons[id]],
       meet:V0960_MEET_STORIES['v0960_meet_'+id]?.requires};
    });
    function ally(id,i){
     return {id,hp:90,max:200,atk:ROLES[BYID[id].role].atk,def:ROLES[BYID[id].role].def,
      shield:0,taunt:0,cooldowns:[15,16],x:18+i*18,y:32,attackTimer:10,
      defenseBuffUntil:0,defenseBuffMult:1,healBuffUntil:0,healBuffMult:1,
      damageReduceUntil:0,damageReduceMult:1,rallyUntil:0,rallyMult:1};
    }
    function foe(name){return {name,hp:600,max:600,atk:30,attackTimer:2,interval:2.1,
      x:78,y:38,weakenMult:1,weakenUntil:0,vulnerableMult:1,vulnerableUntil:0,damageReduction:0};}
    function cast(id,j){
      S=fresh();for(const x of [id,'momoka_work','milku_work'])S.owned[x]={lv:1,aff:0,lb:0,copies:0};
      battle={qid:'q2',sim:10,phase:'fight',done:false,log:[],popups:[],
       allies:[ally(id,0),ally('momoka_work',1),ally('milku_work',2)],enemies:[foe('A'),foe('B')]};
      battle.allies[0].cooldowns=[0,0];
      const kind=skillTarget(BYID[id],j);
      applySkill(0,j,kind,kind==='enemy'?0:1);
      return {a:battle.allies.map(x=>({hp:x.hp,rallyMult:x.rallyMult,rallyUntil:x.rallyUntil,
        defenseBuffMult:x.defenseBuffMult,defenseBuffUntil:x.defenseBuffUntil,
        cooldowns:x.cooldowns})),e:battle.enemies.map(x=>({hp:x.hp,
        vulnerableMult:x.vulnerableMult,vulnerableUntil:x.vulnerableUntil})),log:battle.log};
    }
    const casts=Object.fromEntries(ids.map(id=>[id,[cast(id+'_work',0),cast(id+'_work',1)]]));
    return {heroCount:HERO_IDS.length,unique:new Set(HERO_IDS).size,
      pool:['R','SR','SSR','UR'].map(z=>NORMAL_GACHA_POOL.filter(x=>x.rarity===z).length),
      allR:UNITS.filter(x=>x.rarity==='R').length,rates:{...RATE},newRates:{...NEW19_RATE},
      saved,entries,casts,legacyPassive:!!BYID.tamaki_work,
      lastRPassive:!!BYID.tsukasa_work};
   }""",IDS)
   assert d['heroCount']==196 and d['unique']==196,d
   assert d['pool']==[180,86,56,57] and d['allR']==223,d
   assert d['rates']=={'R':60,'SR':25,'SSR':10,'UR':5},d
   assert d['newRates']=={'R':80,'SR':0,'SSR':15,'UR':5},d
   assert d['saved'] and d['legacyPassive'] is True and d['lastRPassive'] is True,d
   for i,e in enumerate(d['entries']):
    assert e['name'] and e['age'] in range(20,27) and e['job'],e
    assert e['rarity']=='R' and e['gate']=='q6' and e['role']==ROLES[i],e
    assert e['stats']==STATS[i],e
    assert e['passive']=={'type':PASSIVES[i][0],'value':PASSIVES[i][1]},e
    assert len(e['skills'])==2 and all(e['descriptions']),e
    assert e['topics']==8 and e['bonds']==5 and e['meet']==['q6'],e
    assert not e['revealedBefore'] and e['revealedAfter'] and not e['poolBefore'] and e['poolAfter'],e
    for art in e['art']:
     resp=page.request.get(url.rsplit('/',1)[0]+'/'+art)
     assert resp.status==200 and len(resp.body())>1000,(art,resp.status)
   c=d['casts'];close=lambda a,b:abs(a-b)<1e-6
   assert c['kuromiya_sera'][0]['e'][0]['hp']<600 and all(v['hp']<600 for v in c['kuromiya_sera'][1]['e']),c
   assert c['haruno_hana'][0]['a'][1]['hp']>90 and close(c['haruno_hana'][0]['a'][1]['defenseBuffMult'],1.12),c
   assert all(v['hp']>90 for v in c['haruno_hana'][1]['a']),c
   assert all(close(v['rallyMult'],1.1944) for v in c['komiya_anna'][0]['a']),c
   assert close(c['komiya_anna'][1]['a'][1]['cooldowns'][0],13.2),c
   assert c['hoshimiya_nemu'][0]['e'][0]['hp']<600 and close(c['hoshimiya_nemu'][0]['a'][0]['rallyMult'],1.15),c
   assert c['hoshimiya_nemu'][1]['e'][0]['hp']<600 and close(c['hoshimiya_nemu'][1]['a'][0]['rallyMult'],1),c
   assert all(close(v['rallyMult'],1.1944) for v in c['kumano_miku'][0]['a']),c
   assert all(close(v['defenseBuffMult'],1.1296) for v in c['kumano_miku'][1]['a']),c
   assert all(v['hp']>90 and close(v['rallyMult'],1.12) for v in c['ichijo_maki'][0]['a']),c
   assert c['ichijo_maki'][1]['a'][1]['hp']>90,c
   assert c['natsukawa_yu'][0]['e'][0]['hp']<600 and close(c['natsukawa_yu'][0]['e'][0]['vulnerableMult'],1.15),c
   assert c['natsukawa_yu'][0]['e'][0]['vulnerableUntil']==16,c
   assert all(v['hp']<600 for v in c['natsukawa_yu'][1]['e']),c
   assert not errors,errors
   reports[screen]={'status':'PASS','registered_heroes':d['heroCount'],'normal_R':d['pool'][0],
    'all_R':d['allR'],'assets_checked':28,'skills_checked':14,'saved':d['saved']}
   ctx.close()
  browser.close()
finally:
 srv.shutdown()
(OUT/'browser_report.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(reports,ensure_ascii=False))
print('PASS v0960 seven characters, 14 skills, 7 q6 gates, full pool, original/crop URLs, save/gacha, portrait/landscape')
