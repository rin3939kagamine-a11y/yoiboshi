#!/usr/bin/env python3
"""Build 3 approved conversation portraits directly from Git-identical PNGs; no image generation."""
from pathlib import Path
import hashlib
import json
import subprocess
from PIL import Image

ROOT=Path(__file__).resolve().parents[2]
SOURCE_ROOT=ROOT/"docs/new_character_ideas/2026-11-15_redraw3"
ART_ROOT=ROOT/"assets/ART_V2"
SOURCES={
 "ginjo_cecil":{"name":"02_ginjo_cecil_v2.png","blob":"8ef147a8d90ed33968a11b626b4b11ce729c970d","size":1737573,
               "upper":(145,0,865,960),"face":(305,10,705,410)},
 "hasegawa_honoka":{"name":"20_hasegawa_honoka_v2.png","blob":"a62336a12f1c73dfc8d562b2c1f04e740865ed9f","size":1540101,
               "upper":(145,0,865,960),"face":(310,15,710,415)},
 "ueda_kana":{"name":"37_ueda_kana_v2.png","blob":"6b621dd3b8b23de1f2b34125202ce748bb76907a","size":1591416,
               "upper":(145,0,865,960),"face":(305,10,705,410)}
}
def sha(path):
 return hashlib.sha256(path.read_bytes()).hexdigest()

def build():
 out=ROOT/"qa_artifacts/redraw3_stage1"
 out.mkdir(parents=True,exist_ok=True)
 report={}
 for id, spec in SOURCES.items():
  original=SOURCE_ROOT/spec["name"]
  full=ART_ROOT/"full_body"/f"{id}.png"
  assert original.read_bytes()==full.read_bytes(),(id,"Source PNG was altered")
  assert len(full.read_bytes())==spec["size"],(id,"unexpected PNG size")
  assert subprocess.check_output(["git","hash-object",str(full)],cwd=ROOT,text=True).strip()==spec["blob"],(id,"Git blob SHA changed")
  with Image.open(full) as im:
   assert im.format=="PNG" and im.mode=="RGBA" and im.size==(1024,1536),(id,"PNG format/dimensions")
   assert im.getchannel("A").getextrema()[0]==0,(id,"no background transparency")
   rec={"name":id,"source":str(original.relative_to(ROOT)),"source_blob":spec["blob"],"sha256":sha(full),
        "full_body":{"path":str(full.relative_to(ROOT)),"size":list(im.size),"mode":im.mode},
        "crops":{}}
   for slot,box in (("upper_body",spec["upper"]),("face_icons",spec["face"])):
    crop=im.crop(box)
    p=ART_ROOT/slot/f"{id}.webp"
    p.parent.mkdir(parents=True,exist_ok=True)
    crop.save(p,format="WEBP",lossless=True,method=6)
    with Image.open(p) as back:
     assert back.size==crop.size and back.mode=="RGBA",(id,slot,"invalid crop")
     assert back.getchannel("A").tobytes()==crop.getchannel("A").tobytes(),(id,slot,"alpha changed")
     assert all(a[:3]==b[:3] for a,b in zip(crop.getdata(),back.getdata()) if a[3]>0),(id,slot,"visible RGB modified")
    rec["crops"][slot]={"path":str(p.relative_to(ROOT)),"box":box,"sha256":sha(p),"size":list(crop.size)}
   # Inspect source on light/dark backgrounds without changing any PNG asset.
   preview=Image.new("RGB",(1024*2,1536))
   for offset,rgb in ((0,(235,235,235)),(1024,(32,35,48))):
    bg=Image.new("RGBA",im.size,rgb+(255,))
    bg.alpha_composite(im)
    preview.paste(bg.convert("RGB"),(offset,0))
   preview.thumbnail((960,720))
   preview.save(out/f"{id}_light_dark_qa.jpg",quality=90)
   report[id]=rec
   print(f"{id}: source PNG SHA256={rec['sha256']} full-body byte-identity PASS; icon crops PASS",flush=True)
 (out/"art_report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
 print("REDRAW3 PORTRAIT CROP QA PASS",flush=True)

if __name__=="__main__":
 build()
