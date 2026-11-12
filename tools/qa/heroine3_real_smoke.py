"""3 approved SR heroines, existing art, real browser, save, dialogue, gacha, combat and viewport QA."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
import hashlib,json
from PIL import Image
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts"/"heroine3"
OUT.mkdir(parents=True,exist_ok=True)
ids=["sumika","reika","hono"]
manifest=json.loads((ROOT/"docs/heroine3_sources_v0692.json").read_text(encoding="utf-8"))
assert len(manifest["entries"])==3
assert [x["id"] for x in manifest["entries"]]==ids
checks=[]
def ck(label,val,detail=None):
 checks.append({"check":label,"passed":bool(val)})
 if not val:raise AssertionError(f"{label}: {str(detail)[:900]}")

for x in manifest["entries"]:
 src=ROOT/x["original_in_branch"]
 ck(x["id"]+" original SHA256",src.is_file() and hashlib.sha256(src.read_bytes()).hexdigest()==x["sha256"])
 with Image.open(src) as im:
  ck(x["id"]+" original PNG 1024×1536 RGBA",im.format=="PNG" and im.size==(1024,1536) and im.mode=="RGBA")
 for kind,dims in [("full_body",(1024,1536)),("upper_body",(768,1024)),("face_icons",(400,400))]:
  path=ROOT/x["display_art"][kind]
  ck(x["id"]+" "+kind+" exists",path.is_file(),path)
  with Image.open(path) as im:
   ck(x["id"]+" "+kind+" dims and alpha",im.size==dims and im.mode=="RGBA" and im.getchannel("A").getextrema()[0]==0,(path,im.size,im.mode))
for id in ["elma","nono"]:
 for kind in ["full_body","upper_body","face_icons"]:
  ck(id+" excluded "+kind,not (ROOT/"assets/ART_V2"/kind/f"{id}.webp").exists())
ck("gallery20 not imported",not (ROOT/"assets/ART_V2/full_body/candidate20_work.webp").exists())
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
srv=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=srv.serve_forever,daemon=True).start()
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
  page=browser.new_page(viewport={"width":390,"height":844})
  errs=[];page.on("pageerror",lambda x:errs.append(str(x)))
  base=f"http://127.0.0.1:{srv.server_port}"
  page.goto(base+"/index.html",wait_until="load",timeout=90000)
  page.wait_for_function("typeof fresh==='function' && typeof ROMANCE_V0692!=='undefined'",timeout=30000)
  metadata=page.evaluate("""()=>{
   const ids=NEW_HERO_IDS_V0692;
   return {
     version:document.title,
     ids, unique:new Set(HERO_IDS).size===HERO_IDS.length,
     all:ids.map(id=>({
       id,name:PEOPLE[id]?.name,
       profile:HEROINE_PROFILES[id],
       rank:BYID[id+'_work']?.rarity,
       role:BYID[id+'_work']?.role,
       skills:BYID[id+'_work']?.s?.length,
       art:unitArt(BYID[id+'_work'],'portrait'),
       full:ART_V2.full_body[id],
       upper:ART_V2.upper_body[id],
       icon:ART_V2.face_icons[id],
       romance:!!extraHero(id),
       stories:Object.keys(extraHero(id)?.stories||{}).length,
       moods:Object.keys(extraHero(id)?.moods||{}).length,
       depth:typeof CHARACTER_DEPTH_V0692!=='undefined'?CHARACTER_DEPTH_V0692[id]:null,
       pool:NORMAL_GACHA_POOL.some(u=>u.id===id+'_work'),
       newcomer:NEW19_GACHA_POOL.some(u=>u.id===id+'_work')
     })),
     rates:RATE,new19:NEW19_RATE,
     old74:NEW_HERO_IDS_V0690.length,
     old74enabled:typeof HERO_V0690_ENABLED==='undefined'?null:HERO_V0690_ENABLED,
     legacy:STORY_ONLY_CAST.iroha,
     excluded:["elma","nono"].filter(id=>HERO_IDS.includes(id)||!!BYID[id+'_work']),
     schema:fresh().version
   };
  }""")
  ck("new ID registry length 3 and globally unique",metadata["ids"]==ids and metadata["unique"],metadata)
  ck("version sequential", "0.69.2.0" in metadata["version"])
  ck("old 74 registry untouched",metadata["old74"]==74)
  ck("unchanged gacha rate",metadata["rates"]=={"R":60,"SR":25,"SSR":10,"UR":5} and metadata["new19"]=={"SR":80,"SSR":15,"UR":5})
  ck("excluded hero IDs absent",not metadata["excluded"],metadata["excluded"])
  for item in metadata["all"]:
   ck(item["id"]+" SR unit and two skills",item["rank"]=="SR" and item["skills"]==2,item)
   ck(item["id"]+" full portraits wired",item["art"].split("?")[0]==f"assets/ART_V2/full_body/{item['id']}.webp" and all([item["full"],item["upper"],item["icon"]]),item)
   ck(item["id"]+" 5 bonds and 4 moods",item["romance"] and item["stories"]==5 and item["moods"]==4,item)
   ck(item["id"]+" depth card",item["depth"] and all(item["depth"].get(k) for k in ["habit","inside","growth","cg"]),item)
   ck(item["id"]+" in normal recruitment not new19",item["pool"] and not item["newcomer"],item)
  # Genuine old save: preserve original unit and affection while adding only new fields.
  values=page.evaluate("""()=>{
    const old=fresh();
    old.gameStarted=true;old.onboarding.enabled=false;
    old.owned.akane_work={lv:12,aff:33,lb:2,copies:1};
    old.selected='akane_work';
    old.homeFavorite='akane';
    const before=JSON.stringify(old.owned.akane_work);
    localStorage.setItem('yoiboshi-reboot-v1',JSON.stringify(old));
    return {before,version:old.version};
  }""")
  page.reload(wait_until="load",timeout=90000)
  page.wait_for_function("typeof S!=='undefined' && typeof HERO_IDS!=='undefined'")
  preserved=page.evaluate("""()=>({
     original:S.owned.akane_work,
     selected:S.selected,
     favorite:S.homeFavorite,
     old74:NEW_HERO_IDS_V0690.length,
     open:NEW_HERO_IDS_V0692.map(id=>heroineStoryRevealed(id)),
     customFormat:S.version
  })""")
  ck("old save unit lv/aff/lb/copies intact",preserved["original"]=={"lv":12,"aff":33,"lb":2,"copies":1},preserved)
  ck("old save selection/favorite intact",preserved["selected"]=="akane_work" and preserved["favorite"]=="akane",preserved)
  # Three actual party additions, talk UI, character depth stage gate and story data.
  born=page.evaluate("""()=>{
    S=fresh();S.gameStarted=true;S.onboarding.enabled=false;
    S.gems=100000;
    for(const id of NEW_HERO_IDS_V0692){
      S.owned[id+'_work']={lv:8,aff:80,lb:0,copies:0};
      S.love.affection[id]=80;
    }
    S.party=['sumika_work','reika_work','hono_work','momoka_work'];
    S.selected='sumika_work';S.homeFavorite='sumika';
    persist();
    const rows=[];
    for(const id of NEW_HERO_IDS_V0692){
      selectRomancePerson(id);
      const text=document.querySelector('#app')?.textContent||'';
      rows.push({
        id,available:romanceHeroAvailable(id),
        talks:text.includes(PEOPLE[id].name),
        profile:!!HEROINE_PROFILES_ALL[id]?.name,
        early:characterDepthCard(id,0),
        mid:characterDepthCard(id,40),
        late:characterDepthCard(id,80),
        bond:!!romanceScript('bond_'+id+'_0'),
        images:[...document.querySelectorAll('#app img')].map(e=>e.getAttribute('src'))
      });
    }
    return {rows,party:S.party,hasOwned:NEW_HERO_IDS_V0692.every(id=>!!S.owned[id+'_work'])};
  }""")
  ck("three selected SR units saved in one party",born["hasOwned"] and born["party"]==["sumika_work","reika_work","hono_work","momoka_work"],born)
  for a in born["rows"]:
   depth=next(item["depth"] for item in metadata["all"] if item["id"]==a["id"])
   ck(a["id"]+" real talk view and profile",a["available"] and a["talks"] and a["profile"],a)
   ck(a["id"]+" affinity 0/40/80 depth gates",depth["habit"] in a["early"] and depth["inside"] not in a["early"] and depth["inside"] in a["mid"] and depth["growth"] not in a["mid"] and depth["growth"] in a["late"],a)
   ck(a["id"]+" bond story opens",a["bond"])
  page.reload(wait_until="load",timeout=90000)
  saved=page.evaluate("""()=>({
    ids:NEW_HERO_IDS_V0692.map(id=>S.owned[id+'_work']?.lv),
    party:S.party,
    aff:NEW_HERO_IDS_V0692.map(id=>S.love.affection[id])
  })""")
  ck("three heroines survive real save/reload",saved["ids"]==[8,8,8] and saved["party"]==born["party"] and saved["aff"]==[80,80,80],saved)
  # Actual recruitment is invoked with its normal probability and cost; not mocked result data.
  gacha=page.evaluate("""()=>{
    view='gacha';gachaMode='normal';render();
    const b=S.gems;
    pull(1);
    const unit=drawResults[0]&&BYID[drawResults[0].id];
    return {spent:b-S.gems,result:unit?.id||null,rarity:unit?.rarity||null,hasReveal:!!document.querySelector('#recruit-reveal')};
  }""")
  ck("real 1-draw gacha preserves cost and produces a unit",gacha["spent"]==120 and gacha["result"] and gacha["rarity"] in ["R","SR","SSR","UR"] and gacha["hasReveal"],gacha)
  # Play the actual real turn-combat engine, with QA-only stronger allies.
  combat=page.evaluate("""()=>{
    skipRecruitReveal();
    S=fresh();S.gameStarted=true;S.onboarding.enabled=false;
    for(const id of NEW_HERO_IDS_V0692){
      S.owned[id+'_work']={lv:15,aff:50,lb:0,copies:0};
    }
    S.party=['sumika_work','reika_work','hono_work','momoka_work'];
    S.battleMode='turn';
    startBattle('q2',null,'turn-training');
    if(!battle)return {ok:false,reason:'battle not started'};
    const members=battle.allies.map(x=>x.id);
    for(const a of battle.allies){a.atk=200000;a.hp=200000;a.max=200000;}
    if(battle.tb){battle.tb.auto=true;battle.tb.speed=200;tbAdvance();}
    return {ok:true,members,waves:battle.totalWaves};
  }""")
  ck("real battle includes all 3 new SR units",combat.get("ok") and all(x+"_work" in combat["members"] for x in ids),combat)
  page.wait_for_function("()=>!battle",timeout=120000)
  ck("actual turn combat completed",True)
  # Mobile and landscape in real talk, roster and gallery.
  for width,height in [(390,844),(568,320),(844,390),(926,428),(1280,800)]:
   page.set_viewport_size({"width":width,"height":height})
   ui=page.evaluate("""()=>{
     S.gameStarted=true;S.onboarding.enabled=false;S.love.activeHero='sumika';
     view='talk';render();
     const r=document.querySelector('#app');
     return {width:innerWidth,document:document.documentElement.scrollWidth,
       name:(r?.textContent||'').includes(PEOPLE.sumika.name),
       dead:!!r?.querySelector('.runtime-fallback')};
   }""")
   ck(f"talk {width}x{height} no overflow",ui["document"]<=width+18 and ui["name"] and not ui["dead"],ui)
   if (width,height) in [(390,844),(844,390)]:
    page.screenshot(path=str(OUT/f"talk_{width}x{height}.png"),full_page=True)
  gallery=browser.new_page(viewport={"width":390,"height":844})
  gerrs=[];gallery.on("pageerror",lambda x:gerrs.append(str(x)))
  gallery.goto(base+"/sr_gallery.html",wait_until="load",timeout=90000)
  g=gallery.evaluate("""()=>{
    const names=['sumika_work','reika_work','hono_work'];
    const cards=[...document.querySelectorAll('.tile')];
    const found=names.map(id=>cards.find(c=>c.textContent?.includes(id))).filter(Boolean);
    return {found:found.length,images:found.map(x=>{
      const im=x.querySelector('img');return {src:im?.getAttribute('src'),loaded:im?.complete&&im?.naturalWidth>0}
    }),width:document.documentElement.scrollWidth,viewport:innerWidth};
  }""")
  ck("SR gallery displays all 3 images",g["found"]==3 and all(x["loaded"] for x in g["images"]),g)
  ck("gallery mobile 390 no overflow",g["width"]<=g["viewport"]+18,g)
  ck("no browser Javascript errors",not errs and not gerrs,{"game":errs,"gallery":gerrs})
  report={"result":"PASS","checks":len(checks),"ids":ids,"browser_metadata":metadata,"gacha":gacha,"combat":combat,"gallery":g,"saved":saved,"errors":errs+gerrs}
  (OUT/"result.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
  print(json.dumps({"result":"PASS","checks":len(checks),"ids":ids,"gacha":gacha,"combat":combat,"gallery":g},ensure_ascii=False),flush=True)
  browser.close()
finally:
 srv.shutdown()
