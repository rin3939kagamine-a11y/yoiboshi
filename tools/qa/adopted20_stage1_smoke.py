#!/usr/bin/env python3
"""Stage1 adopted20: strict protected code, source pixels/crops, q6 romance & bonds in portrait/landscape."""
import hashlib,json,subprocess
from pathlib import Path
from functools import partial
from threading import Thread
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright
from build_adopted20_stage1_assets import SOURCES,WHITE_BACKGROUND_ID,NOISY_IDS

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"qa_artifacts/adopted20_stage1"
OUT.mkdir(parents=True,exist_ok=True)
IDS=["endo_saori","sakaki_yura","takamori_serika","hamasaki_nagisa","nikaido_yuki","enomoto_tsugumi","amase_kanata","katsura_yui","momose_yumeka","himemiya_riria","sorano_nanase","nanjo_yurara","komine_suzu","wakakusa_rinne","higuchi_rei","dojima_rei","amai_momo","nekomiya_rara","tsukino_moka","asagiri_rara"]
NAMES=["遠藤 沙織","榊 ゆら","高森 セリカ","浜咲 なぎさ","二階堂 ゆき","榎本 つぐみ","天瀬 かなた","桂 ゆい","桃瀬 ゆめか","姫宮 リリア","空野 ななせ","南条 ゆらら","小峰 すず","若草 りんね","樋口 れい","堂島 礼","甘井 もも","猫宮 らら","月野 もか","朝霧 らら"]
AGES=[23,22,24,21,23,20,19,20,22,21,23,20,24,20,25,27,20,21,20,22]
JOBS=["観光案内所スタッフ","コンセプトカフェ店員","ドレスショップ店員","海の家スタッフ","古着屋スタッフ","テーマパークのキャスト","地下アイドル","大学生・カフェバイト","雑貨屋スタッフ","ゴスロリブランド店員","文具店スタッフ","ダンススクール生","カフェ店員","ロリータショップ店員","アンティークショップ店員","セレクトショップ店長","コンセプトカフェ店員","テーマパークダンサー","カジノフロアスタッフ","イベントコンパニオン"]
PERSONALITIES=["明るく世話好き","クールで小悪魔","優雅で丁寧","元気なギャル","無口でクール","手先が器用で明るい","努力家で素直","内気で優しい","夢見がちで穏やか","高飛車なお嬢様","おっとり天然","スポーティで明るい","穏やかで聞き上手","小悪魔で人懐っこい","物静かで博識","クールで頼れる","甘え上手","猫系ギャル","明るく元気","ハイテンション"]
assert len(IDS)==len(NAMES)==len(AGES)==len(JOBS)==len(PERSONALITIES)==20
assert len(set(IDS))==20 and set(IDS)==set(SOURCES)

def original_file(path):
 return subprocess.check_output(["git","show",f"origin/main:{path}"],cwd=ROOT,text=True)
old=original_file("js/game.js")
new=(ROOT/"js/game.js").read_text(encoding="utf8")
# Data additions are allowed, but original character arrays, combat, saves and rates are immutable.
for token in ("const KEY=","const ROLES=","const UNITS=[","UNITS.push(","const RATE=",
              "const NEW19_RATE=","const GACHA_CONFIG=","const NORMAL_GACHA_POOL=",
              "const NEW19_GACHA_POOL=","function migrateSave(","function drawNormalGachaUnit(",
              "function unitPower("):
 a,b=old.index(token),new.index(token)
 ending="\n];" if token=="const UNITS=[" else "\n"
 assert old[a:old.index(ending,a)+len(ending)]==new[b:new.index(ending,b)+len(ending)],("protected core drift",token)
assert "NEW_UNIT_ROSTER_V0920" not in new and "NEW_UNIT_ARTWORK_V0920" not in new
assert (ROOT/"js/performance_v016.js").read_text()==original_file("js/performance_v016.js")
assert (ROOT/"js/heroines_v0910.js").read_text()==original_file("js/heroines_v0910.js")
assert (ROOT/"js/heroines_v0910_units.js").read_text()==original_file("js/heroines_v0910_units.js")
assert (ROOT/"js/heroines_v0910_wire.js").read_text()==original_file("js/heroines_v0910_wire.js")
report_path=OUT/"image_report.json"
assert report_path.is_file(),"No GitHub binary image build report"
images=json.loads(report_path.read_text(encoding="utf8"))
assert set(images)==set(IDS)
for id in IDS:
 path,blob=SOURCES[id]
 src=ROOT/path
 full=ROOT/"assets/ART_V2/full_body"/f"{id}.png"
 audit=images[id]
 assert audit["source"]==path and audit["git_blob_sha"]==blob,(id,"wrong original mapping")
 assert subprocess.check_output(["git","hash-object",str(src)],cwd=ROOT,text=True).strip()==blob,(id,"source Git blob mismatch")
 assert hashlib.sha256(src.read_bytes()).hexdigest()==audit["source_sha256"],id
 assert hashlib.sha256(full.read_bytes()).hexdigest()==audit["placed_sha256"],id
 assert audit["person_RGB_unchanged"],(id,"original subject not preserved")
 with Image.open(src) as s:
  oldpx=np.asarray(s.convert("RGBA"))
 with Image.open(full) as im:
  assert im.format=="PNG"
  newpx=np.asarray(im.convert("RGBA"))
 assert np.array_equal(oldpx[:,:,:3],newpx[:,:,:3]),(id,"person RGB changed")
 assert np.all(newpx[:,:,3]<=oldpx[:,:,3]),(id,"illegal alpha increase")
 if id==WHITE_BACKGROUND_ID:
  assert audit["removed_pixels"]>50000 and np.count_nonzero(newpx[:,:,3]==0)>50000,(id,"white background not removed")
 elif id in NOISY_IDS:
  assert np.array_equal(oldpx[oldpx[:,:,3]>=33],newpx[oldpx[:,:,3]>=33]),(id,"person edges altered")
 else:
  assert src.read_bytes()==full.read_bytes(),(id,"adopted full-body PNG not bitwise identical")
 for slot,size in (("upper_body",(720,960)),("face_icons",(400,400))):
  info=audit["crops"][slot]
  output=ROOT/info["path"]
  assert output.is_file() and hashlib.sha256(output.read_bytes()).hexdigest()==info["sha256"]
  with Image.open(output) as im:
   actual=np.asarray(im.convert("RGBA"))
   assert im.format=="WEBP" and im.size==size
  box=info["box"]
  with Image.open(full) as im:
   expect=np.asarray(im.convert("RGBA").crop(tuple(box)))
  assert np.array_equal(actual[:,:,3],expect[:,:,3]),(id,slot,"crop alpha differs")
  visible=expect[:,:,3]>0
  assert np.array_equal(actual[:,:,:3][visible],expect[:,:,:3][visible]),(id,slot,"visible crop RGB differs")
print("ADOPTED20 ASSET SOURCE SHA / PIXEL / CROPS PASS",flush=True)
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass

server=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
url=f"http://127.0.0.1:{server.server_port}/index.html"
reports={}
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,args=["--no-sandbox"])
  for mode,width,height in (("portrait",390,844),("landscape",844,390)):
   ctx=browser.new_context(viewport={"width":width,"height":height})
   page=ctx.new_page()
   errors=[]
   page.on("pageerror",lambda e:errors.append(str(e)))
   page.goto(url,wait_until="load",timeout=90000)
   page.wait_for_function("typeof S!=='undefined' && typeof ROMANCE_V0920!=='undefined'",timeout=45000)
   results={}
   for id,name,age in zip(IDS,NAMES,AGES):
    data=page.evaluate("""(id)=>{
      const meet='v0920_meet_'+id, r={};
      S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;
      r.key=SaveStore.key;
      r.rates={...RATE};
      r.peopleName=PEOPLE[id]?.name;
      r.profile=HEROINE_PROFILES_ALL[id];
      r.depth=CHARACTER_DEPTH_V0920[id];
      r.flame=HEROINE_PROFILES_ALL[id]?.tomoshibi;
      r.ids=NEW_HERO_IDS_V0920;
      r.totalHeroes=HERO_IDS.length;
      r.cohortBefore=NEW_HERO_IDS_V0920.filter(x=>romanceHeroAvailable(x)).length;
      r.personRegistered=HERO_IDS.includes(id)&&NEW_HERO_IDS.includes(id);
      r.noUnit=!UNITS.some(u=>u.person===id);
      r.noNormal=!NORMAL_GACHA_POOL.some(u=>u.person===id);
      r.noSpecial=!NEW19_GACHA_POOL.some(u=>u.person===id);
      r.before={talk:romanceHeroAvailable(id),meeting:storyAllowed(meet)};
      S.quests.q3={complete:true};
      r.atQ3={talk:romanceHeroAvailable(id),meeting:storyAllowed(meet)};
      S.quests.q6={complete:true};
      r.after={talk:romanceHeroAvailable(id),meeting:storyAllowed(meet)};
      r.cohortAfter=NEW_HERO_IDS_V0920.filter(x=>romanceHeroAvailable(x)).length;
      r.allTalkAfter=HERO_IDS.filter(x=>romanceHeroAvailable(x)).length;
      r.imgs=[ART_V2.full_body[id],ART_V2.upper_body[id],ART_V2.face_icons[id]];
      r.meetRequires=V0920_MEET_STORIES[meet]?.requires;
      r.bonds=Array.from({length:5},(_,i)=>{
        const story=ROMANCE_V0920[id].stories['bond_'+id+'_'+i];
        return {threshold:story?.threshold,person:story?.person,lines:story?.lines?.length};
      });
      r.topics=ROMANCE_V0920[id].topics.length;
      r.placeChoices=Object.keys(ROMANCE_V0920[id].placeLines).length;
      S.love.activeHero=id;view='talk';render();
      r.screen={
        name:document.querySelector('.v676-talk-nameplate span')?.textContent?.trim()||'',
        episodes:document.querySelectorAll('.v676-episode').length,
        topics:document.querySelectorAll('.romance-topics button').length,
        depth:document.querySelectorAll('.character-depth').length,
        image:document.querySelector('.v676-talk-portrait img')?.getAttribute('src')||''
      };
      r.depthEarly=characterDepthCard(id,0);
      r.depthMiddle=characterDepthCard(id,40);
      r.depthLate=characterDepthCard(id,80);
      setHeroAff(id,20);
      r.bondAvailable=bondAvailable(id,0);
      try {openBondEpisode(id,0);r.bondOpened=storySession?.id==='bond_'+id+'_0';}
      catch(e){r.bondError=String(e)}
      storySession=null;view='talk';
      const gems=S.gems;openStory(meet);
      r.meetOpened=storySession?.id===meet&&view==='story';
      if(r.meetOpened)finishStory();
      r.meetFinished=S.storyFlags?.[meet]===true&&view==='talk';
      r.noMeetingReward=S.gems===gems;
      const saved=fresh();
      saved.owned.momoka_work={lv:5,aff:17,lb:1,copies:2};
      saved.owned.milku_work={lv:3,aff:11,lb:0,copies:1};
      saved.party=['momoka_work','milku_work'];saved.selected='momoka_work';
      saved.homeFavorite='momoka';saved.homeUnitId='momoka_work';
      saved.gems=2345;saved.gold=3214;saved.pulls=15;
      saved.quests.q2={complete:true};saved.storyFlags.legacyQa=true;
      const old=migrateSave(JSON.parse(JSON.stringify(saved)));
      r.oldSave={
        units:JSON.stringify(old.owned.momoka_work)===JSON.stringify(saved.owned.momoka_work)
          &&JSON.stringify(old.owned.milku_work)===JSON.stringify(saved.owned.milku_work),
        party:JSON.stringify(old.party)===JSON.stringify(saved.party),
        selected:old.selected===saved.selected,
        home:old.homeFavorite===saved.homeFavorite&&old.homeUnitId===saved.homeUnitId,
        currency:old.gems===2345&&old.gold===3214&&old.pulls===15,
        progression:old.quests.q2.complete&&old.storyFlags.legacyQa,
        noAutoNew:!Object.keys(old.owned).some(k=>k.startsWith(id))
      };
      r.oldHeroes=HERO_IDS.includes('chiyozaki_suzuha')&&HERO_IDS.includes('sakuraba_renka')&&HERO_IDS.includes('minase_ririka');
      return r;
    }""",id)
    assert data["key"]=="yoiboshi-reboot-v1" and data["rates"]=={"R":60,"SR":25,"SSR":10,"UR":5},(mode,id,data)
    assert data["ids"]==list(IDS) and data["personRegistered"] and data["totalHeroes"]==247,(mode,id,data)
    assert data["noUnit"] and data["noNormal"] and data["noSpecial"],(mode,id,data)
     assert data["cohortBefore"]==0 and data["cohortAfter"]==20,(mode,id,data)
    assert data["profile"]["name"]==name and data["profile"]["age"]==age and data["peopleName"]==name,(mode,id,data)
     assert data["profile"]["occupation"]==JOBS[IDS.index(id)] and data["profile"]["personality"]==PERSONALITIES[IDS.index(id)],(mode,id,data)
    assert data["flame"] and data["depth"] and data["oldHeroes"],(mode,id,data)
    assert data["before"]=={"talk":False,"meeting":False} and data["atQ3"]==data["before"] and data["after"]=={"talk":True,"meeting":True},(mode,id,data)
    assert data["meetRequires"]==["q6"] and data["meetOpened"] and data["meetFinished"] and data["noMeetingReward"],(mode,id,data)
    assert [v["threshold"] for v in data["bonds"]]==[20,40,60,80,100],(mode,id,data)
    assert all(v["person"]==id and v["lines"]>=5 for v in data["bonds"]),(mode,id,data)
    assert data["topics"]==8 and data["placeChoices"]==6,(mode,id,data)
    assert data["screen"]["name"]=="♡ "+name and data["screen"]["episodes"]==5 and data["screen"]["topics"]==8 and data["screen"]["depth"]==1,(mode,id,data)
    assert data["bondAvailable"] and data["bondOpened"],(mode,id,data)
    assert all(data["oldSave"].values()),(mode,id,data)
    assert data["depth"]["habit"] in data["depthEarly"] and data["depth"]["inside"] not in data["depthEarly"],(mode,id,data)
    assert data["depth"]["inside"] in data["depthMiddle"] and data["depth"]["growth"] not in data["depthMiddle"],(mode,id,data)
    assert data["depth"]["growth"] in data["depthLate"],(mode,id,data)
    assert f"/upper_body/{id}.webp" in data["screen"]["image"],(mode,id,data)
    for slot,src in zip(("full_body","upper_body","face_icons"),data["imgs"]):
     assert f"/{slot}/{id}." in src,(mode,id,src)
     res=page.request.get(url.rsplit("/",1)[0]+"/"+src,timeout=20000)
     assert res.status==200 and len(res.body())>1000,(mode,id,slot,res.status)
    page.evaluate("""id=>{S.love.activeHero=id;view='talk';render();}""",id)
    if id in IDS[:3] or id in IDS[-3:]:
      page.screenshot(path=str(OUT/f"{mode}_{id}_talk.png"),full_page=True)
    page.evaluate("""src=>{
       document.getElementById('adopted20-qa-mattes')?.remove();
       const wrap=document.createElement('section');wrap.id='adopted20-qa-mattes';
       wrap.style.cssText='position:fixed;inset:0;z-index:999999;display:flex;gap:0;pointer-events:none;';
       for(const bg of ['#f3f3f3','#1d202c']){
         const cell=document.createElement('div');cell.style.cssText='height:100%;width:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:'+bg+';';
         const im=document.createElement('img');im.src=src;im.style.cssText='max-width:100%;max-height:100%;object-fit:contain;';
         cell.appendChild(im);wrap.appendChild(cell);
       }
       document.body.appendChild(wrap);
    }""",data["imgs"][0])
    if id in IDS[:3] or id in IDS[-3:]:
      page.screenshot(path=str(OUT/f"{mode}_{id}_light_dark_browser.png"))
    page.evaluate("""()=>document.getElementById('adopted20-qa-mattes')?.remove()""")
    results[id]=data
   assert not errors,(mode,errors)
   reports[mode]={"status":"PASS","profiles":results,"js_errors":errors,"cohortCount":20,"totalHeroes":247,"q6AvailableTotal":results[IDS[0]]["allTalkAfter"]}
   ctx.close()
  browser.close()
finally:
 server.shutdown()
(OUT/"browser_report.json").write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding="utf-8")
print("ADOPTED20 STAGE-1 CHROMIUM QA PASS",json.dumps({k:v["status"] for k,v in reports.items()}),flush=True)
