#!/usr/bin/env python3
"""Exact approved source blob; deterministic lossless crops, no new image creation."""
import hashlib,json,subprocess,shutil
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[2]
NAME="nagasawa_mayu"
SRC=ROOT/"docs/new_character_ideas/2026-11-16_pr58_adopted1/01_black_sweat_peace.png"
DST=ROOT/"assets/ART_V2/full_body/nagasawa_mayu.png"
ORIGINAL_BLOB="e2e4d668c10105caf336f7c8365e5b0a8257bb41"
OUT=ROOT/"qa_artifacts/nagasawa_mayu"
OUT.mkdir(parents=True,exist_ok=True)
def blob(p):
 return subprocess.check_output(["git","hash-object",str(p)],cwd=ROOT,text=True).strip()
def digest(p):
 return hashlib.sha256(p.read_bytes()).hexdigest()
assert SRC.is_file() and DST.is_file(),"Original/source copied image absent"
assert blob(SRC)==ORIGINAL_BLOB and blob(DST)==ORIGINAL_BLOB,"Original PNG Git blob was altered"
assert SRC.read_bytes()==DST.read_bytes(),"Original PNG bytes were not preserved"
with Image.open(SRC) as im:
 assert im.format=="PNG",("source format",im.format)
 assert im.width>=720 and im.height>=960,("approved source size cannot be cropped",im.size)
 original=im.convert("RGBA")
 alpha=original.getchannel("A")
 # Use the alpha bounding region where present; RGB/alpha values are never rewritten.
 mask=alpha.point(lambda a:255 if a>=96 else 0)
 bounds=mask.getbbox()
 assert bounds,"source PNG has no opaque subject"
 w,h=original.size
 cx=(bounds[0]+bounds[2])//2
 top=max(0,bounds[1]-12)
 cropSpecs={
   "upper_body":(max(0,min(w-720,cx-360)),0,720,960),
   "face_icons":(max(0,min(w-400,cx-200)),min(h-400,top),400,400)
 }
 info={"source":str(SRC.relative_to(ROOT)),"source_blob":ORIGINAL_BLOB,
       "full_body":str(DST.relative_to(ROOT)),"full_body_blob":blob(DST),
       "source_sha256":digest(SRC),"full_body_sha256":digest(DST),
       "source_mode":Image.open(SRC).mode,"dimensions":[w,h],
       "source_bbox":bounds,"crops":{}}
 for slot,(x,y,cw,ch) in cropSpecs.items():
  part=original.crop((x,y,x+cw,y+ch))
  out=ROOT/"assets/ART_V2"/slot/(NAME+".webp")
  out.parent.mkdir(parents=True,exist_ok=True)
  part.save(out,format="WEBP",lossless=True,method=6)
  with Image.open(out) as saved:
   result=saved.convert("RGBA")
  srcPx=part.load(); outPx=result.load()
  for yy in range(ch):
   for xx in range(cw):
    before=srcPx[xx,yy];after=outPx[xx,yy]
    assert before[3]==after[3],(slot,xx,yy,"alpha changed")
    if before[3]:assert before[:3]==after[:3],(slot,xx,yy,"visible pixel changed")
  info["crops"][slot]={"path":str(out.relative_to(ROOT)),"width":cw,"height":ch,
                      "box":[x,y,x+cw,y+ch],"sha256":digest(out)}
(OUT/"image_report.json").write_text(json.dumps(info,ensure_ascii=False,indent=2),encoding="utf-8")
print("PASS source Git blob unchanged, PNG exact bytes, 2 lossless crops")
print(json.dumps({"source_blob":ORIGINAL_BLOB,"source_sha256":info["source_sha256"],
                  "source_mode":info["source_mode"],"crops":info["crops"]},ensure_ascii=False,indent=2))
