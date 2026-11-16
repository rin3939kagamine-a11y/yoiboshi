#!/usr/bin/env python3
"""v0950 independent browser checks: 5 characters/skills, q6 gate, R pool, saves and art."""
import json
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'qa_artifacts/five_r_v0950';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
srv=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{srv.server_port}/index.html'
reports={}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=['--no-sandbox'])
  for label,w,h in [('portrait',390,844),('landscape',844,390)]:
   context=browser.new_context(viewport={'width':w,'height':h})
   page=context.new_page();errors=[]
   page.on('pageerror',lambda e:errors.append(str(e)))
   page.goto(url,wait_until='load',timeout=90000)
   page.wait_for_function("typeof NEW_UNIT_ROSTER_V0950!=='undefined'&&typeof S!=='undefined'&&typeof applySkill==='function'",timeout=60000)
   data=page.evaluate("""() => {
     const ids=['shiromiya_kotori','hayakawa_aoba','suzumiya_mia','yumemiya_yua','tsukimiya_ayaka'];
     const old=fresh(),cleared=fresh();cleared.quests.q6={complete:true};
     gachaMode='normal';
     const units=ids.map(id=>BYID[id+'_work']);
     const save=fresh();
     save.gems=2345;save.gold=4321;save.gachaPity=8;save.gachaSrStreak=2;
     save.owned.momoka_work={lv:5,aff:18,lb:2,copies:3};
     save.owned.nagasawa_mayu_work={lv:2,aff:4,lb:0,copies:1};
     save.party=['momoka_work','nagasawa_mayu_work'];save.selected='nagasawa_mayu_work';
     save.homeFavorite='nagasawa_mayu';save.homeUnitId='nagasawa_mayu_work';
     save.quests.q2={complete:true};save.storyFlags.oldEntry=true;
     const migrated=migrateSave(JSON.parse(JSON.stringify(save)));
     const saveOk=JSON.stringify(migrated.owned.momoka_work)===JSON.stringify(save.owned.momoka_work)&&
      JSON.stringify(migrated.owned.tsukasa_work)===JSON.stringify(save.owned.nagasawa_mayu_work)&&
      JSON.stringify(migrated.party)===JSON.stringify(['momoka_work','tsukasa_work'])&&
      migrated.selected==='tsukasa_work'&&migrated.homeFavorite==='tsukasa'&&
      migrated.homeUnitId==='tsukasa_work'&&migrated.gems===2345&&migrated.gold===4321&&
      migrated.gachaPity===8&&migrated.gachaSrStreak===2&&
      migrated.quests.q2.complete===true&&migrated.storyFlags.oldEntry===true&&
      ids.every(id=>!migrated.owned[id+'_work']);
     const entries=ids.map((id,i)=>{const u=units[i],r=ROMANCE_V0950[id];return {
      id,name:PEOPLE[id]?.name,age:r.profile.age,role:u?.role,rarity:u?.rarity,
      gate:u?.gate,stats:(()=>{S=fresh();S.owned[u.id]={lv:1,aff:0,lb:0,copies:0};let st=unitPower(u.id);return [st.hp,st.atk,st.def]})(),
      topics:r.topics.length,bonds:Object.keys(r.stories).length,
      freshLocked:!heroineStoryRevealed(id,old)&&!availableNormalPool(old).some(x=>x.id===u.id),
      cleared:heroineStoryRevealed(id,cleared)&&availableNormalPool(cleared).some(x=>x.id===u.id),
      skills:[unitSkillType(u,0),unitSkillType(u,1)],
      descriptions:[skillDescription(u,0),skillDescription(u,1)],
      passive:{type:unitPassive(u).type,value:passiveValue(u)},
      paths:[unitArt(u),ART_V2.full_body[id],ART_V2.upper_body[id],ART_V2.face_icons[id]],
      meet:V0950_MEET_STORIES['v0950_meet_'+id]?.requires
     }});
     function ally(id,i){
      return {id,hp:90,max:200,atk:ROLES[BYID[id].role].atk,
        def:ROLES[BYID[id].role].def,shield:0,taunt:0,cooldowns:[15,16],
        x:18+i*18,y:32,attackTimer:10,defenseBuffUntil:0,defenseBuffMult:1,
        healBuffUntil:0,healBuffMult:1,damageReduceUntil:0,damageReduceMult:1,
        rallyUntil:0,rallyMult:1};
     }
     function foe(name){
      return {name,hp:600,max:600,atk:30,attackTimer:2,interval:2.1,
       x:78,y:38,weakenMult:1,weakenUntil:0,vulnerableMult:1,vulnerableUntil:0,damageReduction:0};
     }
     function cast(id,j){
      S=fresh();for(const x of [id,'momoka_work','milku_work'])S.owned[x]={lv:1,aff:0,lb:0,copies:0};
      battle={qid:'q2',sim:10,phase:'fight',done:false,log:[],popups:[],
        allies:[ally(id,0),ally('momoka_work',1),ally('milku_work',2)],
        enemies:[foe('A'),foe('B')]};
      battle.allies[0].cooldowns=[0,0];
      battle.allies[1].weakenUntil=28; battle.allies[1].weakenMult=.75;
      const kind=skillTarget(BYID[id],j);
      applySkill(0,j,kind,kind==='enemy'?0:1);
      return {
       ally:battle.allies.map(x=>({hp:x.hp,rallyMult:x.rallyMult,rallyUntil:x.rallyUntil,
          defenseBuffMult:x.defenseBuffMult,defenseBuffUntil:x.defenseBuffUntil,
          cooldowns:x.cooldowns,weakenUntil:x.weakenUntil})),
       enemies:battle.enemies.map(x=>({hp:x.hp,vulnerableMult:x.vulnerableMult,vulnerableUntil:x.vulnerableUntil})),
       log:battle.log};
     }
     const castResults=Object.fromEntries(ids.map(id=>[id,[cast(id+'_work',0),cast(id+'_work',1)]]));
     return {heroCount:HERO_IDS.length,uniqueHeros:new Set(HERO_IDS).size,unitCount:UNITS.length,
      normalR:NORMAL_GACHA_POOL.filter(x=>x.rarity==='R').length,
      normalOther:['SR','SSR','UR'].map(r=>NORMAL_GACHA_POOL.filter(x=>x.rarity===r).length),
      normalRates:{...RATE},newRates:{...NEW19_RATE},
      entries,castResults,saveOk,existingLegacyPassive:!!BYID.tamaki_work,
      existingRecentRPassive:!!BYID.tsukasa_work};
   }""")
   assert data['heroCount']==196 and data['uniqueHeros']==196,data
   assert data['normalR']==180 and data['normalOther']==[56,56,57],data
   assert data['normalRates']=={'R':60,'SR':25,'SSR':10,'UR':5},data
   assert data['newRates']=={'R':80,'SR':0,'SSR':15,'UR':5},data
   assert data['saveOk'] and data['existingLegacyPassive'] is True and data['existingRecentRPassive'] is True,data
   expected_roles=['healer','attacker','support','attacker','healer']
   expected_stats=[[148,9,5],[125,19,3],[165,11,5],[125,19,3],[148,9,5]]
   expected_passives=[('v0950_heal',8),('v0950_attack',6),('v0950_buff',8),('v0950_attack',6),('v0950_heal',8)]
   for i,x in enumerate(data['entries']):
    assert x['rarity']=='R' and x['gate']=='q6' and x['role']==expected_roles[i],x
    assert x['stats']==expected_stats[i],x
    assert x['passive']==dict(zip(['type','value'],expected_passives[i])),x
    assert x['topics']==8 and x['bonds']==5 and x['meet']==['q6'],x
    assert x['freshLocked'] and x['cleared'],x
    assert len(x['paths'])==4,x
    for path in x['paths']:
     response=page.request.get(url.rsplit('/',1)[0]+'/'+path)
     assert response.status==200 and len(response.body())>1000,(path,response.status)
   c=data['castResults']
   assert abs(c['shiromiya_kotori'][0]['ally'][1]['rallyMult']-1.12)<1e-6,c
   assert c['shiromiya_kotori'][0]['ally'][1]['hp']>90,c
   assert abs(c['shiromiya_kotori'][1]['ally'][1]['cooldowns'][0]-13.8)<1e-6,c
   assert c['shiromiya_kotori'][1]['ally'][1]['hp']>90,c
   assert abs(c['hayakawa_aoba'][0]['enemies'][0]['vulnerableMult']-1.15)<1e-6,c
   assert c['hayakawa_aoba'][0]['enemies'][0]['vulnerableUntil']==16,c
   assert all(z['hp']<600 for z in c['hayakawa_aoba'][1]['enemies']),c
   assert all(abs(a['rallyMult']-1.1944)<1e-6 for a in c['suzumiya_mia'][0]['ally']),c
   assert abs(c['suzumiya_mia'][1]['ally'][1]['cooldowns'][0]-13.2)<1e-6,c
   assert c['yumemiya_yua'][0]['enemies'][0]['hp']<600,c
   assert abs(c['yumemiya_yua'][1]['ally'][0]['rallyMult']-1.15)<1e-6,c
   assert all(abs(a['defenseBuffMult']-1.12)<1e-6 for a in c['tsukimiya_ayaka'][0]['ally']),c
   assert c['tsukimiya_ayaka'][1]['ally'][1]['weakenUntil']==0,c
   assert c['tsukimiya_ayaka'][1]['ally'][1]['hp']>90,c
   assert not errors,errors
   reports[label]={'status':'PASS','heroCount':data['heroCount'],'normalR':data['normalR'],
     'otherRarities':data['normalOther'],'skillResults':c,'assetsChecked':20,'saveOk':data['saveOk']}
   context.close()
  browser.close()
finally:
 srv.shutdown()
(OUT/'browser_report.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:{'status':v['status'],'registered_heroes':v['heroCount'],
 'normal_R':v['normalR'],'saved':v['saveOk']} for k,v in reports.items()},ensure_ascii=False))
print('PASS five R heroines, q6, normal pool, no RATE/save changes, 10 skills, 2 orientations, 15 art assets')
