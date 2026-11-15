#!/usr/bin/env python3
"""Strict _work SR->R reclassification audit: exact source diff, save, pool, draw."""
import json,re,subprocess,sys
from pathlib import Path
from collections import Counter,defaultdict
from threading import Thread
from functools import partial
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/work_rarity_reclass"
OUT.mkdir(parents=True,exist_ok=True)
FILES={
 "js/game.js":3,"js/new_units_v026.js":1,
 "js/heroines_v027.js":0,"js/heroines_v028.js":0,"js/heroines_v0420.js":0,
 "js/heroines_v0500.js":19,"js/heroines_v0690.js":74,"js/heroines_v0692.js":3,
 "js/heroines_v0750.js":9,"js/heroines_v0760.js":4,"js/heroines_v0780.js":4,
 "js/heroines_v0810_units.js":2,"js/heroines_v0830_units.js":1,
 "js/heroines_v0840_units.js":2,"js/heroines_v0850_units.js":3,
 "js/heroines_v0860_units.js":4,"js/heroines_v0870_units.js":7,
 "js/heroines_v0880_units.js":8,"js/heroines_v0890_units.js":8,
 "js/heroines_v0900_units.js":7,"js/heroines_v0910_units.js":12,
}
assert sum(FILES.values())==171
FULL56=set("""koharu lilith shio koyori marin yui shizuku suiran kyoko cocoa mai luna
 makoto fumika ena riko noel mio jun yume shino hiyori ageha kirari maron
 momoka milku nagi chinatsu aoi akane reina saki yuzu anzu reiko chiyo nazuna
 sena mizuki meru kagari chihiro karen miyabi sanae kurumi ritsu towa yuriko
 natsume hotaru minori ichika juri saeko""".split())
assert len(FULL56)==56

def origin(path):
 return subprocess.check_output(["git","show","origin/main:"+path],cwd=ROOT,text=True)

def get_section(s,path):
 m=(re.search(r"const UNITS\s*=\s*\[",s) if path=="js/game.js" else
    re.search(r"const NEW_UNIT_ROSTER_V\d+\s*=\s*Object\.freeze\(\s*\[",s))
 assert m,("roster absent",path)
 a=s.index("[",m.start())
 depth=0;quote=None;escape=False
 for i in range(a,len(s)):
  c=s[i]
  if quote:
   if escape: escape=False
   elif c=="\\": escape=True
   elif c==quote: quote=None
  elif c in ("'",'"',chr(96)): quote=c
  elif c=="[":depth+=1
  elif c=="]":
   depth-=1
   if not depth:return a,i+1
 raise AssertionError(("unclosed array",path))

def parse_obj(obj,path):
 def field(k):
  m=re.search(r'(?:'+k+r'|"'+k+r'")\s*:\s*["\x27]([^"\x27]+)["\x27]',obj)
  assert m,(path,k,obj[:90])
  return m.group(1)
 return {"id":field("id"),"person":field("person"),"rarity":field("rarity"),"file":path}

old_items=[];new_items=[];changed={}
for path,n in FILES.items():
 b=origin(path);a=(ROOT/path).read_text(encoding="utf8")
 x,y=get_section(b,path);arr=b[x:y];ids=[]
 def rewrite(match):
  obj=match.group();u=parse_obj(obj,path)
  if not u["id"].endswith("_work") or u["person"] in FULL56 or u["rarity"]=="R":return obj
  assert u["rarity"]=="SR",u
  updated,count=re.subn(r'((?:"rarity"|rarity)\s*:\s*["\x27])SR(["\x27])',
                        lambda v:v.group(1)+"R"+v.group(2),obj)
  assert count==1,u
  ids.append(u["id"])
  return updated
 replaced=re.sub(r"\{[^{}]*\}",rewrite,arr)
 expected=b[:x]+replaced+b[y:]
 if path=="js/game.js":
  old_rate="const NEW19_RATE=Object.freeze({SR:80,SSR:15,UR:5}); // Existing 19-heroine-only odds; no R units."
  new_rate="const NEW19_RATE=Object.freeze({R:80,SSR:15,UR:5}); // Keep the same 80/15/5 per-unit weights after the 19 work units change from SR to R."
  assert expected.count(old_rate)==1
  expected=expected.replace(old_rate,new_rate)
 assert a==expected,("Non-rarity or unexpected gacha changes",path)
 assert len(ids)==n,(path,len(ids),n)
 changed[path]=ids
 old_items.extend(parse_obj(v.group(),path) for v in re.finditer(r"\{[^{}]*\}",arr))
 xx,yy=get_section(a,path)
 new_items.extend(parse_obj(v.group(),path) for v in re.finditer(r"\{[^{}]*\}",a[xx:yy]))

pre={u["id"]:u for u in old_items};post={u["id"]:u for u in new_items}
assert len(pre)==len(post)==468
assert set(pre)==set(post)
assert Counter(u["rarity"] for u in old_items)=={"R":83,"SR":231,"SSR":77,"UR":77}
assert Counter(u["rarity"] for u in new_items)=={"R":254,"SR":60,"SSR":77,"UR":77}
all_changed={id for ids in changed.values() for id in ids}
assert len(all_changed)==171
assert all(pre[id]["person"] not in FULL56 for id in all_changed)
assert sum(len(ids) for path,ids in changed.items() if path=="js/heroines_v0500.js")==19
for id,u in pre.items():
 assert post[id]["person"]==u["person"] and post[id]["file"]==u["file"]
 assert post[id]["rarity"]==("R" if id in all_changed else u["rarity"])
assert sorted(u["id"] for u in new_items if u["rarity"]=="SR" and u["id"].endswith("_work"))==sorted(
 u["id"] for u in old_items if u["id"].endswith("_work") and u["person"] in FULL56)
assert sorted(u["id"] for u in new_items if u["rarity"]=="SR" and not u["id"].endswith("_work"))==[
 "cocoa_trial","kyoko_trial","luna_trial","shizuku_trial"]
all4=defaultdict(set)
for u in old_items: all4[u["person"]].add(u["rarity"])
higher=sorted(p for p,levels in all4.items() if levels.intersection({"SSR","UR"}))
full=sorted(p for p in higher if {"R","SR","SSR","UR"}.issubset(all4[p]))
missing=sorted(set(higher)-set(full))
assert len(higher)==75 and len(full)==56 and len(missing)==19
assert set(full)==FULL56,("Unexpected 4-complete character list",sorted(set(full)^FULL56))

# Protect the entire performance engine except the deliberately scoped
# compatibility rule that keeps former SR _work passive magnitudes unchanged.
old_perf=origin("js/performance_v016.js")
new_perf=(ROOT/"js/performance_v016.js").read_text(encoding="utf8")
old_passive="function passiveValue(u){const p=unitPassive(u),scale=PASSIVE_SCALE[p.type];return scale[['R','SR','SSR','UR'].indexOf(u.rarity)]}"
new_passive="// Legacy _work units newly labeled R retain their previously approved SR passive amounts.\n// This changes no skill formula, trait identity, or other character's passive tier.\nfunction passiveValue(u){const p=unitPassive(u),scale=PASSIVE_SCALE[p.type];const effectTier=(u.id.endsWith('_work')&&u.rarity==='R')?'SR':u.rarity;return scale[['R','SR','SSR','UR'].indexOf(effectTier)]}"
assert old_perf.count(old_passive)==1
assert new_perf==old_perf.replace(old_passive,new_passive),"Performance engine changed beyond passive tier preservation"

class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
url="http://127.0.0.1:"+str(srv.server_port)+"/index.html"
reports={}
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,w,h in (("portrait",390,844),("landscape",844,390)):
   ctx=browser.new_context(viewport={"width":w,"height":h})
   page=ctx.new_page()
   errors=[]
   page.on("pageerror",lambda e:errors.append(str(e)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof S!=='undefined'&&typeof drawNormalGachaUnit==='function'&&typeof NEW_UNIT_ROSTER_V0910!=='undefined'",timeout=60000)
   data=page.evaluate("""()=>{
     const freq=arr=>Object.fromEntries(['R','SR','SSR','UR'].map(k=>[k,arr.filter(u=>u.rarity===k).length]));
     const ids=['momoka_work','shio_work','kaori_work','ruru_work','sakakibara_kaho_work','kato_hazuki_work','takahashi_ayano_work'];
     const save=fresh();save.quests.q6={complete:true};
     for(const id of ids)save.owned[id]={lv:4,aff:17,lb:1,copies:2};
     save.party=['momoka_work','shio_work','kato_hazuki_work'];save.selected='momoka_work';
     save.homeFavorite='momoka';save.homeUnitId='momoka_work';
     save.gems=2345;save.gold=4321;save.pulls=17;save.gachaPity=8;save.gachaSrStreak=2;
     save.storyFlags.workRarityQA=true;
     const migrated=migrateSave(JSON.parse(JSON.stringify(save)));
     S=migrated;
     const kept=ids.map(id=>{
       const u=BYID[id];
       return {id,exists:!!u,rarity:u?.rarity,owned:JSON.stringify(S.owned[id])===JSON.stringify(save.owned[id]),
        usable:!!data(id)&&!!unitPower(id)&&!!unitSkillType(u,0)&&!!unitSkillType(u,1)&&!!unitPassive(u),
        portrait:unitArt(u),stats:unitPower(id),role:u.role,gate:u.gate};
     });
     const saveOK=JSON.stringify(S.party)===JSON.stringify(save.party)&&S.selected===save.selected&&
      S.homeFavorite===save.homeFavorite&&S.homeUnitId===save.homeUnitId&&S.gems===2345&&
      S.gold===4321&&S.pulls===17&&S.gachaPity===8&&S.gachaSrStreak===2&&S.storyFlags.workRarityQA;
     const q6=fresh();q6.quests.q6={complete:true};
     const gates=['kato_hazuki_work','takahashi_ayano_work'].map(id=>({
       id,before:recruitEligibleUnit(BYID[id],fresh()),after:recruitEligibleUnit(BYID[id],q6)}));
     const passiveMismatch=UNITS.filter(u=>{
       const tier=u.id.endsWith('_work')?'SR':u.rarity;
       const oldVal=PASSIVE_SCALE[unitPassive(u).type][['R','SR','SSR','UR'].indexOf(tier)];
       return passiveValue(u)!==oldVal;
     }).map(u=>({id:u.id,rarity:u.rarity,value:passiveValue(u)}));
     const oldSave=S,oldMode=gachaMode,draw={};
     try{
       S=q6;gachaMode='normal';
       try{const id=drawNormalGachaUnit(.72)?.id;draw.normal=id;draw.normalRarity=BYID[id]?.rarity;}
       catch(e){draw.normalError=String(e);}
       try{const id=drawNormalGachaUnit(.1)?.id;draw.normalR=id;draw.normalRRarity=BYID[id]?.rarity;}
       catch(e){draw.normalRError=String(e);}
       try{const id=drawNormalGachaUnit(.86)?.id;draw.normalSSR=id;draw.normalSSRRarity=BYID[id]?.rarity;}
       catch(e){draw.normalSSRError=String(e);}
       try{const id=drawNormalGachaUnit(.98)?.id;draw.normalUR=id;draw.normalURRarity=BYID[id]?.rarity;}
       catch(e){draw.normalURError=String(e);}
       gachaMode='new19';
       try{const id=drawNormalGachaUnit(.4)?.id;draw.special=id;draw.specialRarity=BYID[id]?.rarity;}
       catch(e){draw.specialError=String(e);}
     try{const id=drawNormalGachaUnit(.82)?.id;draw.specialSSR=id;draw.specialSSRRarity=BYID[id]?.rarity;}
       catch(e){draw.specialSSRError=String(e);}
       try{const id=drawNormalGachaUnit(.98)?.id;draw.specialUR=id;draw.specialURRarity=BYID[id]?.rarity;}
       catch(e){draw.specialURError=String(e);}
     }finally{S=oldSave;gachaMode=oldMode;}
     return {all:freq(UNITS),normal:freq(NORMAL_GACHA_POOL),special:freq(NEW19_GACHA_POOL),
       workTotal:UNITS.filter(u=>u.id.endsWith('_work')).length,
       normalWork:NORMAL_GACHA_POOL.filter(u=>u.id.endsWith('_work')).length,
       specialWork:NEW19_GACHA_POOL.filter(u=>u.id.endsWith('_work')).length,
       unique:new Set(UNITS.map(u=>u.id)).size===UNITS.length,rate:{...RATE},rate19:{...NEW19_RATE},
       kept,saveOK,gates,draw,passiveMismatch,passiveChecked:UNITS.length};
   }""")
   assert not errors,(mode,errors)
   assert data["all"]=={"R":254,"SR":60,"SSR":77,"UR":77},data
   assert data["normal"]=={"R":211,"SR":56,"SSR":56,"UR":57} and data["normalWork"]==208,data
   assert data["special"]=={"R":19,"SR":0,"SSR":19,"UR":19} and data["specialWork"]==19,data
   assert data["workTotal"]==227 and data["unique"],data
   assert data["passiveChecked"]==468 and not data["passiveMismatch"],(mode,data["passiveMismatch"])
   assert data["rate"]=={"R":60,"SR":25,"SSR":10,"UR":5},data
   assert data["rate19"]=={"R":80,"SSR":15,"UR":5},data
   assert data["saveOK"] and all(k["exists"] and k["rarity"]==("SR" if k["id"] in ("momoka_work","shio_work") else "R") and k["owned"] and k["usable"] for k in data["kept"]),data
   assert all(not g["before"] and g["after"] for g in data["gates"]),data
   reports[mode]=data
   ctx.close()
  browser.close()
finally:
 srv.shutdown()
record={"prior":dict(Counter(x["rarity"] for x in old_items)),
        "after":dict(Counter(x["rarity"] for x in new_items)),
        "ssrUrCharacters":higher,"fourCompleteBefore":full,"missingRBefore":missing,
        "changedByFile":changed,"browsers":reports}
(OUT/"inventory.json").write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding="utf8")
print("SOURCE_AND_SAVE_PASS",json.dumps({
 "files":len(FILES),"converted":len(all_changed),"all":reports["portrait"]["all"],
 "normal":reports["portrait"]["normal"],"special":reports["portrait"]["special"],
 "fourCompleteBefore":len(full),"missingRBefore":len(missing)},ensure_ascii=False),flush=True)
if "--require-gacha" in sys.argv:
 for mode,data in reports.items():
  assert "normalError" not in data["draw"],("NORMAL GACHA BLOCKER",mode,data["draw"])
  assert "specialError" not in data["draw"],("SPECIAL GACHA BLOCKER",mode,data["draw"])
  assert not any(k.endswith("Error") for k in data["draw"]),(mode,data["draw"])
  assert data["draw"]["normalRarity"]=="SR" and data["draw"]["normalRRarity"]=="R",(mode,data["draw"])
  assert data["draw"]["normalSSRRarity"]=="SSR" and data["draw"]["normalURRarity"]=="UR",(mode,data["draw"])
  assert data["draw"]["specialRarity"]=="R" and data["draw"]["specialSSRRarity"]=="SSR" and data["draw"]["specialURRarity"]=="UR",(mode,data["draw"])
 print("GACHA_HEALTH_PASS",flush=True)
else:
 print("GACHA_HEALTH_OBSERVED",json.dumps({mode:d["draw"] for mode,d in reports.items()},ensure_ascii=False),flush=True)
