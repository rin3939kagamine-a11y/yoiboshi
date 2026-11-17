#!/usr/bin/env python3
"""Batch 2 browser QA: 10 SR outfits, existing nine v0500 gates plus ruru v0690 q103."""
import json
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/sr_batch2"
OUT.mkdir(parents=True,exist_ok=True)
IDS=["urara","mizore","ayane","miyu","arisa","kotoha","yukino","nene","yukari","ruru"]
NEW=["urara_izakaya","mizore_cinema","ayane_market","miyu_hakama","arisa_show","kotoha_atelier","yukino_trip","nene_staff","yukari_silver","ruru_dollshop"]
ROLES=["support","attacker","healer","attacker","attacker","tank","attacker","support","attacker","attacker"]
GATES=["q97","q32","q30","q38","q35","q40","q50","q52","q75","q103"]
SKILLS=[["attack_up","ct"],["single","stun"],["heal_one","heal_all"],["pierce","combo"],["aoe","finisher"],["shield_one","damage_reduce"],["def_down","pierce"],["ct","defense_up"],["pierce","def_down"],["combo","finisher"]]
STATS={"attacker":[125,19,3],"tank":[225,9,8],"healer":[148,9,5],"support":[165,11,5]}
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
server=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
url=f"http://127.0.0.1:{server.server_port}/index.html"
reports={}
try:
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True,args=["--no-sandbox"])
        for orientation,w,h in [("portrait",390,844),("landscape",844,390)]:
            ctx=browser.new_context(viewport={"width":w,"height":h})
            page=ctx.new_page();errors=[]
            page.on("pageerror",lambda e:errors.append(str(e)))
            page.goto(url,wait_until="load",timeout=120000)
            page.wait_for_function("typeof NEW_UNIT_ROSTER_SR_BATCH2!=='undefined' && typeof applySkill==='function' && typeof S!=='undefined'",timeout=90000)
            res=page.evaluate("""(args)=>{
               const {ids,unitIds,gates}=args;
               const before=fresh(),source=fresh();
               source.gems=1234;source.gold=5678;source.gachaPity=7;
               for(const id of ids)source.owned[id+'_work']={lv:5,aff:12,lb:1,copies:2};
               source.party=ids.slice(0,4).map(id=>id+'_work');
               source.selected=ids[0]+'_work';source.homeFavorite=ids[1];source.homeUnitId=ids[1]+'_work';
               const migrated=migrateSave(JSON.parse(JSON.stringify(source)));
               const saveOk=ids.every(id=>JSON.stringify(migrated.owned[id+'_work'])===JSON.stringify(source.owned[id+'_work'])) &&
                   migrated.selected===ids[0]+'_work' && migrated.homeUnitId===ids[1]+'_work' &&
                   JSON.stringify(migrated.party)===JSON.stringify(source.party) &&
                   migrated.gems===1234 && migrated.gold===5678 && migrated.gachaPity===7;
               const entries=ids.map((id,i)=>{
                 const u=BYID[unitIds[i]],old=BYID[id+'_work'];
                 const unlocked=fresh();unlocked.quests[gates[i]]={complete:true};
                 S=fresh();S.owned[u.id]={lv:1,aff:0,lb:0,copies:0};
                 const power=unitPower(u.id);
                 return {id:u.id,person:u.person,rarity:u.rarity,role:u.role,
                   existing:{id:old.id,rarity:old.rarity,role:old.role},
                   specs:[unitSkillType(u,0),unitSkillType(u,1)],
                   descriptions:[skillDescription(u,0),skillDescription(u,1)],
                   passive:{type:unitPassive(u).type,value:passiveValue(u)},
                   stats:[power.hp,power.atk,power.def],
                   title:u.title,skills:u.s,gate:(NEW_HERO_REVEAL_V0500[id]||NEW_HERO_REVEAL_V0690[id])[1],
                   beforeVisible:visibleUnitV026(u,before),oldBeforeVisible:visibleUnitV026(old,before),
                   afterVisible:visibleUnitV026(u,unlocked),oldAfterVisible:visibleUnitV026(old,unlocked),
                   oldRetired:!!RETIRED_R_TO_SR[old.id],
                   art:unitArt(u),portrait:rarityCharacterPortrait(u),
                   icon:ART_V2.face_icons[id],upper:ART_V2.upper_body[id],
                   normal: NORMAL_GACHA_POOL.some(x=>x.id===u.id),
                   oldNew19:NEW19_GACHA_POOL.some(x=>x.id===old.id),
                   newNew19:NEW19_GACHA_POOL.some(x=>x.id===u.id)};
               });
               function ally(id){return {id,hp:75,max:200,atk:ROLES[BYID[id].role].atk,def:ROLES[BYID[id].role].def,
                 shield:0,taunt:0,cooldowns:[20,20],x:20,y:25,attackTimer:2,defenseBuffUntil:0,defenseBuffMult:1,
                 damageReduceUntil:0,damageReduceMult:1,rallyUntil:0,rallyMult:1,
                 healBuffUntil:0,healBuffMult:1};}
               function foe(){return {name:'訓練標的',hp:999,max:999,atk:20,x:72,y:30,interval:2.1,
                 attackTimer:2,weakenMult:1,weakenUntil:0,vulnerableMult:1,vulnerableUntil:0};}
               function cast(uId,j){
                 S=fresh();for(const id of [uId,'momoka_work','milku_work'])S.owned[id]={lv:1,aff:0,lb:0,copies:0};
                 battle={qid:'q2',sim:10,phase:'fight',done:false,log:[],popups:[],
                   allies:[ally(uId),ally('momoka_work'),ally('milku_work')],enemies:[foe(),foe()]};
                 battle.allies[0].cooldowns=[0,0];
                 const kind=skillTarget(BYID[uId],j);
                 applySkill(0,j,kind,kind==='enemy'?0:1);
                 return {kind,cooldown:battle.allies[0].cooldowns[j],logs:battle.log,
                   damage:999-battle.enemies[0].hp,shield:battle.allies.map(x=>x.shield),
                   hp:battle.allies.map(x=>x.hp),rally:battle.allies.map(x=>x.rallyMult),
                   defense:battle.allies.map(x=>x.defenseBuffMult),reduce:battle.allies.map(x=>x.damageReduceMult)};
               }
               const casts=Object.fromEntries(unitIds.map(id=>[id,[cast(id,0),cast(id,1)]]));
               return {heroes:HERO_IDS.length,unique:new Set(HERO_IDS).size,
                 normal:['R','SR','SSR','UR'].map(x=>NORMAL_GACHA_POOL.filter(u=>u.rarity===x).length),
                 new19:['R','SR','SSR','UR'].map(x=>NEW19_GACHA_POOL.filter(u=>u.rarity===x).length),
                 allR:UNITS.filter(u=>u.rarity==='R').length,rates:{...RATE},newRates:{...NEW19_RATE},
                 saveOk,entries,casts};
            }""",{"ids":IDS,"unitIds":NEW,"gates":GATES})
            assert res["heroes"]==196 and res["unique"]==196,res
            assert res["normal"]==[180,106,56,57],res
            assert res["new19"]==[19,0,19,19] and res["allR"]==223,res
            assert res["rates"]=={"R":60,"SR":25,"SSR":10,"UR":5},res
            assert res["newRates"]=={"R":80,"SR":0,"SSR":15,"UR":5},res
            assert res["saveOk"],res
            for i,e in enumerate(res["entries"]):
                assert (e["id"],e["person"],e["rarity"],e["role"])==(NEW[i],IDS[i],"SR",ROLES[i]),e
                assert e["existing"]=={"id":IDS[i]+"_work","rarity":"R","role":ROLES[i]},e
                assert e["specs"]==SKILLS[i],e
                assert e["stats"]==STATS[ROLES[i]],e
                assert e["title"] and len(e["skills"])==2 and all(e["skills"]),e
                assert all(e["descriptions"]) and e["passive"]["value"]>0,e
                assert e["gate"]==GATES[i] and not e["oldRetired"],e
                assert not e["beforeVisible"] and not e["oldBeforeVisible"],e
                assert e["afterVisible"] and e["oldAfterVisible"],e
                assert e["normal"] and e["oldNew19"]==(i<9) and not e["newNew19"],e
                assert e["art"].startswith("assets/UNIT_ART/"+NEW[i]+".webp"),e
                for path in (e["art"],e["portrait"],e["icon"],e["upper"]):
                    response=page.request.get(url.rsplit("/",1)[0]+"/"+path)
                    assert response.status==200,(path,response.status)
                art=ROOT/"assets/UNIT_ART"/(NEW[i]+".webp")
                with Image.open(art) as image:
                    assert image.mode=="RGBA" and image.getextrema()[3][0]==0 and image.getextrema()[3][1]==255,(NEW[i],image.mode)
                for c in res["casts"][NEW[i]]:
                    assert c["logs"] and c["cooldown"]>10,(NEW[i],c)
            assert not errors,errors
            reports[orientation]={"status":"PASS","heroes":res["heroes"],"normalPool":res["normal"],
                "new19Pool":res["new19"],"newUnits":len(NEW),"skillsCast":20,"saveOk":res["saveOk"]}
            ctx.close()
        browser.close()
finally:
    server.shutdown()
(OUT/"browser_report.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps(reports,ensure_ascii=False))
print("PASS batch2: ten SR units, 20 casts, unchanged heroes/R/new19/rates/save, art + original icons, portrait/landscape")
