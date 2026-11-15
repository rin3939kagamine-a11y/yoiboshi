#!/usr/bin/env python3
"""Make lossless conversation crops only from seven approved source PNGs.
The original full-body PNGs (including Emiri's halo) are never altered.
"""
import hashlib
import json
import subprocess
from pathlib import Path
import numpy as np
from PIL import Image

ROOT=Path(__file__).resolve().parents[2]
ASSET=ROOT/"assets/ART_V2"
OUT=ROOT/"qa_artifacts/pr32_pr36_stage1"
OUT.mkdir(parents=True,exist_ok=True)
SOURCES={
  "aizawa_noa": {
    "path": "docs/new_character_ideas/2026-11-15_pr32_approved3/01_cream_knit.png",
    "blob": "1922d27637a9698ecc3dc6546e6957670514514b"
  },
  "yukishiro_mio": {
    "path": "docs/new_character_ideas/2026-11-15_pr32_approved3/02_silver_horns.png",
    "blob": "d94d891f84b07942ecab33031fbcbc66ccbb11ac"
  },
  "shiratori_yuzuha": {
    "path": "docs/new_character_ideas/2026-11-15_pr32_approved3/03_plaid_dynamic.png",
    "blob": "bc894b9b59b224ea95a29ad2b84487a1b17d2117"
  },
  "tsukishima_shino": {
    "path": "docs/new_character_ideas/2026-11-15_pr36_approved4/01_lavender_dress.png",
    "blob": "4f8e016fbf1e426e8601a254c69e808f41b1fa66"
  },
  "hanasaki_rena": {
    "path": "docs/new_character_ideas/2026-11-15_pr36_approved4/02_red_nurse.png",
    "blob": "479458023baf5de9f475434b40a5cb62fc4412bb"
  },
  "takamine_rino": {
    "path": "docs/new_character_ideas/2026-11-15_pr36_approved4/03_blue_nurse.png",
    "blob": "9575e19dee2c26b19b290a081b5d0f58e42e61db"
  },
  "hoshino_emiri": {
    "path": "docs/new_character_ideas/2026-11-15_pr36_approved4/04_black_gothic.png",
    "blob": "86c840971762c25b36e7219bd59547bdb3f751f8"
  }
}

def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def gitblob(p):return subprocess.check_output(["git","hash-object",str(p)],cwd=ROOT,text=True).strip()
def preview(im,tag):
 for label,color in [("light",(245,245,247)),("dark",(25,28,36))]:
  bg=Image.new("RGBA",im.size,color+(255,))
  bg.alpha_composite(im)
  bg.convert("RGB").resize((512,768)).save(OUT/f"{tag}_{label}.jpg",quality=90)

def run():
 report={}
 for cid,rec in SOURCES.items():
  original=ROOT/rec["path"]
  dest=ASSET/"full_body"/f"{cid}.png"
  assert original.is_file() and dest.is_file(),(cid,"missing art")
  assert gitblob(original)==rec["blob"] and gitblob(dest)==rec["blob"],(cid,"Git blob differs from approved original")
  assert original.read_bytes()==dest.read_bytes(),(cid,"full-body PNG must be byte-identical to approved original")
  with Image.open(dest) as f:
   assert f.format=="PNG" and f.mode=="RGBA" and f.size==(1024,1536),(cid,f.format,f.mode,f.size)
   im=f.copy()
  a=np.asarray(im.getchannel("A"))
  ys,xs=np.nonzero(a>20)
  assert len(xs)>10000 and a.min()==0 and a.max()>240,(cid,"invalid alpha")
  cx=int(np.median(xs))
  top=max(0,min(1536-400,int(ys.min())))
  crops={
   "upper_body":(max(0,min(1024-720,cx-360)),0,720,960),
   "face_icons":(max(0,min(1024-400,cx-200)),top,400,400),
  }
  preview(im,cid+"_full")
  r={"source":rec["path"],"source_blob":rec["blob"],"original_sha256":digest(original),
     "destination_sha256":digest(dest),"image_size":[1024,1536],"mode":"RGBA",
     "halo":"unmodified (including hoshino_emiri)","crops":{}}
  for slot,(x,y,w,h) in crops.items():
   box=(x,y,x+w,y+h)
   part=im.crop(box)
   output=ASSET/slot/f"{cid}.webp"
   output.parent.mkdir(parents=True,exist_ok=True)
   part.save(output,format="WEBP",lossless=True,method=6)
   with Image.open(output) as fin:
    assert fin.format=="WEBP" and fin.mode=="RGBA" and fin.size==(w,h),(cid,slot,"invalid format")
    original_pixels=np.asarray(part)
    new_pixels=np.asarray(fin)
    visible=original_pixels[:,:,3]>0
    assert np.array_equal(original_pixels[:,:,3],new_pixels[:,:,3]),(cid,slot,"alpha differs")
    assert np.array_equal(original_pixels[:,:,:3][visible],new_pixels[:,:,:3][visible]),(cid,slot,"visible colors changed")
    assert visible.sum()>1000,(cid,slot,"empty crop")
   r["crops"][slot]={"path":str(output.relative_to(ROOT)),"box":list(box),"sha256":digest(output)}
  report[cid]=r
  print(f"{cid}: full-body Git blob preserved; 2 crops pixel-exact: PASS",flush=True)
 (OUT/"image_report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
 print("PR32/PR36 image source/crop QA: PASS",flush=True)
if __name__=="__main__":run()
