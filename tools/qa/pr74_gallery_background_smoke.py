#!/usr/bin/env python3
"""PR #74 gallery WebP background registry and visual smoke QA."""
from __future__ import annotations
import difflib
import hashlib
import json
import re
import subprocess
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
DIR=ROOT/"assets/ART_V2/backgrounds"
REPORT=ROOT/"qa_artifacts/pr74_gallery"
REPORT.mkdir(parents=True,exist_ok=True)
EXPECTED_NEW_SHA256={
    "bg_gallery_stage_day.webp":"d4a2f10b0ef28422a5a8d994706be344983b8642ec09d7a87a2a661183a99f08",
    "bg_hokan_night.webp":"06f7cf598b2a1b651dc8e1eba9753b615760291f421cc3f39eacdc02725ff298"
}
FILES=[
    "bg_gallery_dusk.webp",
    "bg_gallery_night.webp",
    "bg_gallery_stage_day.webp",
    "bg_hokan_night.webp"
]
file_report={}
for name in FILES:
    p=DIR/name
    assert p.is_file(),("missing image",name)
    raw=p.read_bytes()
    sha=hashlib.sha256(raw).hexdigest()
    with Image.open(p) as image:
        image.load()
        assert image.format=="WEBP",(name,image.format)
        assert image.size==(1024,1536),(name,image.size)
        file_report[name]={"width":image.width,"height":image.height,"format":image.format,"mode":image.mode,"bytes":len(raw),"sha256":sha}
    if name in EXPECTED_NEW_SHA256:
        assert sha==EXPECTED_NEW_SHA256[name],(name,"byte mismatch",sha)
    print("ASSET",name,json.dumps(file_report[name],ensure_ascii=False),flush=True)

current=(ROOT/"js/story_backgrounds_v031.js").read_text(encoding="utf-8")
base=subprocess.check_output(["git","show","origin/main:js/story_backgrounds_v031.js"],cwd=ROOT,text=True)
allowed={"q103_intro","q105_intro","q105_pre","q105","q106_intro","q106_pre","q106","q107_intro","q107_pre","q107","q108_intro"}
def extract_map(s):
    m=re.search(r"const STORY_BACKGROUNDS = Object\.freeze\(\{([\s\S]*?)\n\}\);",s)
    assert m
    return {name:(bg,time) for name,bg,time in re.findall(r"^\s*([a-zA-Z0-9_]+): Object\.freeze\(\{bg:'([^']+)',time:'([^']+)'\}\),?",m.group(1),flags=re.M)}
bm,cm=extract_map(base),extract_map(current)
assert set(bm)==set(cm),("scene keys unexpectedly changed")
for key in bm:
    if key not in allowed:assert bm[key]==cm[key],("unrelated scene changed",key,bm[key],cm[key])
for key in allowed:
    assert bm[key]!=cm[key],("expected gallery scene not updated",key)
assert (ROOT/"js/chapter18_v0520.js").read_bytes()==subprocess.check_output(["git","show","origin/main:js/chapter18_v0520.js"],cwd=ROOT), "Chapter 18 text changed"

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
server=ThreadingHTTPServer(("127.0.0.1",0),partial(Quiet,directory=str(ROOT)))
Thread(target=server.serve_forever,daemon=True).start()
url="http://127.0.0.1:"+str(server.server_port)+"/index.html"
expected_keys={
    "gallery:dusk":"bg_gallery_dusk.webp",
    "gallery:night":"bg_gallery_night.webp",
    "gallery_stage:day":"bg_gallery_stage_day.webp",
    "hokan:night":"bg_hokan_night.webp"
}
scenes={
    "q103_intro":"bg_gallery_dusk.webp",
    "q105_intro":"bg_gallery_night.webp",
    "q105_pre":"bg_gallery_night.webp",
    "q105":"bg_gallery_night.webp",
    "q106_intro":"bg_hokan_night.webp",
    "q106_pre":"bg_hokan_night.webp",
    "q106":"bg_hokan_night.webp",
    "q107_intro":"bg_gallery_stage_day.webp",
    "q107_pre":"bg_gallery_stage_day.webp",
    "q107":"bg_gallery_stage_day.webp",
    "q108_intro":"bg_gallery_night.webp"
}
unchanged_scenes={
    "q103_pre":"bg_shotengai_night.webp",
    "q103":"bg_shotengai_night.webp",
    "q104_intro":"bg_kissa_night.webp",
    "q108_pre":"bg_shotengai_dusk.webp",
    "q108":"bg_shotengai_dusk.webp"
}
browser_report={}
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=["--no-sandbox"])
    for device,w,h in [("mobile",390,844),("landscape",844,390)]:
        context=browser.new_context(viewport={"width":w,"height":h})
        page=context.new_page()
        errors=[]
        page.on("pageerror",lambda e:errors.append(str(e)))
        page.goto(url,wait_until="load",timeout=90000)
        page.wait_for_function("typeof S!=='undefined' && typeof STORY_BG_FILES!=='undefined' && typeof CHAPTER18_STORIES!=='undefined'",timeout=45000)
        mappings=page.evaluate("""({keys,scenes,unchanged})=>{
          const ret={registry:{},scenes:{},unchanged:{},newImages:[]};
          for(const [key,filename] of Object.entries(keys))ret.registry[key]=STORY_BG_FILES[key]?.endsWith(filename)===true;
          for(const [id,filename] of Object.entries(scenes))ret.scenes[id]=resolveStoryBackground(id,-1)?.endsWith(filename)===true;
          for(const [id,filename] of Object.entries(unchanged))ret.unchanged[id]=resolveStoryBackground(id,-1)?.endsWith(filename)===true;
          return ret;
        }""",{"keys":expected_keys,"scenes":scenes,"unchanged":unchanged_scenes})
        for group in ["registry","scenes","unchanged"]:
            assert all(mappings[group].values()),(device,group,mappings[group])
        loaded=page.evaluate("""async filenames=>{
          return await Promise.all(filenames.map(name=>new Promise(resolve=>{
            const img=new Image();
            img.onload=()=>resolve({name,ok:img.naturalWidth===1024&&img.naturalHeight===1536,width:img.naturalWidth,height:img.naturalHeight});
            img.onerror=()=>resolve({name,ok:false});
            img.src='assets/ART_V2/backgrounds/'+name;
          })));
        }""",FILES)
        assert all(x["ok"] for x in loaded),(device,"load",loaded)
        displayed={}
        for id,filename in list(scenes.items())+list(unchanged_scenes.items()):
            page.evaluate("""id=>{S=fresh();S.gameStarted=true;if(S.onboarding)S.onboarding.enabled=false;storySession={id,step:0};view='story';render();}""",id)
            page.wait_for_function("""file=>{
              const bg=document.querySelector('.story-panel .story-bg');
              return bg&&getComputedStyle(bg).backgroundImage.includes(file);
            }""",arg=filename,timeout=15000)
            displayed[id]=page.locator(".story-panel .story-bg").count()>0
            if id in {"q103_intro","q105_pre","q106_intro","q107_intro"}:
                page.screenshot(path=str(REPORT/(device+"_"+id+".png")),full_page=True)
        assert all(displayed.values()),(device,"render",displayed)
        assert not errors,(device,"browser errors",errors)
        browser_report[device]={"registry":mappings["registry"],"scenes":mappings["scenes"],"unchanged":mappings["unchanged"],"imageDecode":loaded,"displayed":displayed,"pageErrors":errors}
        context.close()
    browser.close()
report={"images":file_report,"browser":browser_report,"storyTextUnchanged":True,"unrelatedMappingsUnchanged":True}
(REPORT/"result.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
print("PASS: PR74 all four images WEBP 1024x1536; gallery scene mapping, browser display and existing background regression",flush=True)
