#!/usr/bin/env python3
"""Regression: prefer the same person's approved R outfit across all R unit contexts.
No artwork files or unit/character/save/gacha data are changed by this patch.
"""
import json
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/r_outfit_switch"
OUT.mkdir(parents=True,exist_ok=True)
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url="http://127.0.0.1:"+str(srv.server_port)+"/index.html"
reports={}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
  for mode,w,h in (("portrait",390,844),("landscape",844,390)):
   context=browser.new_context(viewport={"width":w,"height":h})
   page=context.new_page()
   errors=[]
   page.on("pageerror",lambda e:errors.append(str(e)))
   page.goto(url,wait_until="load",timeout=120000)
   page.wait_for_function("typeof unitArt==='function'&&typeof R_PORTRAITS_BY_PERSON!=='undefined'&&typeof UNITS!=='undefined'",timeout=60000)
   result=page.evaluate("""()=>{
     const approved=APPROVED_R_UNIT_IDS.map(id=>BYID[id]);
     const allR=UNITS.filter(u=>u.rarity==='R');
     const other=UNITS.filter(u=>u.rarity!=='R');
     const existingFallback=(u,kind='portrait')=>{
       const config=UNIT_ARTWORK[u.id]||{};
       if(kind==='scene'&&config.scene)return config.scene;
       if(u.rarity==='R'&&config.portrait)return config.portrait;
       if(u.person==='makoto')return kind==='portrait'?characterPortrait(u.person):characterArt(u.person);
       return config.portrait||(kind==='portrait'?characterPortrait(u.person):characterArt(u.person));
     };
     const mapped=allR.filter(u=>!!R_PORTRAITS_BY_PERSON[u.person]);
     const unmatched=allR.filter(u=>!R_PORTRAITS_BY_PERSON[u.person]);
     const changed=mapped.filter(u=>unitArt(u)!==existingFallback(u));
     const mismatched=mapped.filter(u=>unitArt(u)!==R_PORTRAITS_BY_PERSON[u.person]
       ||unitArt(u,'scene')!==R_PORTRAITS_BY_PERSON[u.person]
       ||unitCardArt(u)!==R_PORTRAITS_BY_PERSON[u.person]
       ||rarityCharacterPortrait(u)!==R_PORTRAITS_BY_PERSON[u.person]).map(u=>u.id);
     const brokenFallback=unmatched.filter(u=>unitArt(u)!==(UNIT_ARTWORK[u.id]?.portrait||characterPortrait(u.person))).map(u=>u.id);
     const nonRChanged=other.filter(u=>unitArt(u)!==existingFallback(u)
       ||unitArt(u,'scene')!==existingFallback(u,'scene')
       ||rarityCharacterPortrait(u)!==characterPortrait(u.person)).map(u=>u.id);
     const originals=NEW_HERO_IDS_V0950.map(person=>{
       const u=UNITS.find(x=>x.person===person&&x.rarity==='R');
       return {person,id:u?.id,art:unitArt(u),
         expected:UNIT_ARTWORK[u?.id]?.portrait,
         hasDifferentRArt:!!R_PORTRAITS_BY_PERSON[person]};
     });
     const fileRefs=[...new Set([...mapped.map(u=>unitArt(u)),...originals.map(u=>u.art)])];
     const legacyR=allR.filter(u=>u.id.endsWith('_work'));
     const unresolvedLegacy=legacyR.filter(u=>!R_PORTRAITS_BY_PERSON[u.person]);
     const old=fresh();old.owned.momoka_work={lv:5,aff:19,lb:2,copies:3};old.gems=12345;old.gold=9876;
     old.party=['momoka_work'];old.selected='momoka_work';
     const migrated=migrateSave(JSON.parse(JSON.stringify(old)));
     return {
       mappedPersons:Object.keys(R_PORTRAITS_BY_PERSON).length,
       approvedCount:approved.length,
       missingApproved:approved.filter(u=>!u||u.rarity!=='R').map(u=>u?.id||'<missing>'),
       allR:allR.length,normalR:NORMAL_GACHA_POOL.filter(u=>u.rarity==='R').length,
       totalHeroes:HERO_IDS.length,other:other.length,legacyR:legacyR.length,
       mappedR:mapped.length,redirected:changed.length,unmatchedR:unmatched.length,
       missingRArtLegacy:unresolvedLegacy.map(u=>u.id),
       mismatched,brokenFallback,nonRChanged,originals,fileRefs,
       rate:{...RATE},newRate:{...NEW19_RATE},
       migratedSave:JSON.stringify(migrated.owned.momoka_work)===JSON.stringify(old.owned.momoka_work)
         &&migrated.gems===12345&&migrated.gold===9876
         &&JSON.stringify(migrated.party)===JSON.stringify(old.party)
         &&migrated.selected===old.selected,
       representativeR:changed.slice(0,5).map(u=>({
         id:u.id,old:existingFallback(u),new:unitArt(u)}))
     };
   }""")
   assert result["mappedPersons"]==59 and result["approvedCount"]==59,result
   assert result["missingApproved"]==[],result
   assert result["allR"]==223 and result["normalR"]==180 and result["totalHeroes"]==196,result
   assert result["redirected"]>0 and result["mappedR"]>=59,result
   assert not result["mismatched"] and not result["brokenFallback"] and not result["nonRChanged"],result
   assert all(o["id"] and o["art"]==o["expected"] and not o["hasDifferentRArt"] for o in result["originals"]),result
   assert result["rate"]=={"R":60,"SR":25,"SSR":10,"UR":5},result
   assert result["newRate"]=={"R":80,"SR":0,"SSR":15,"UR":5},result
   assert result["migratedSave"] and not errors,(result,errors)
   if mode=="portrait":
    for src in result["fileRefs"]:
     response=page.request.get(url.rsplit("/",1)[0]+"/"+src,timeout=120000)
     assert response.status==200 and len(response.body())>5000,(src,response.status)
   reports[mode]={k:v for k,v in result.items() if k!="fileRefs"}
   context.close()
  browser.close()
finally:
 srv.shutdown()
(OUT/"audit.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({mode:{k:info[k] for k in ["totalHeroes","allR","normalR","mappedPersons","mappedR","redirected","unmatchedR","legacyR"]} for mode,info in reports.items()},ensure_ascii=False))
print("PASS all existing matching R outfits used, non-R art unchanged, 5 approved R source images retained, save and rarity weights unchanged")
