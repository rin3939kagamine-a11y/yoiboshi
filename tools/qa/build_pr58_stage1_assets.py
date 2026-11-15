#!/usr/bin/env python3
"""PR58 source audit, conservative fringe cleanup and lossless dialogue crops.
Source docs are never changed. Opaque subject pixels (alpha >= 128) are strictly
byte-identical before and after. Potential transparent costume details within
eight pixels of opaque regions are protected; if safety checks fail, use original.
"""
import hashlib
import json
import subprocess
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

ROOT=Path(__file__).resolve().parents[2]
BASE=ROOT/"docs/new_character_ideas/2026-11-15_pr58_adopted8"
ART=ROOT/"assets/ART_V2"
OUT=ROOT/"qa_artifacts/pr58_stage1"
OUT.mkdir(parents=True,exist_ok=True)
SOURCES={
 "kawamura_shizuku":("03_cat_apron_bob.png","4e01afca43b7af840ecb4bf8b557f1850f6d1e1d"),
 "ito_ruri":("04_cream_hoodie_longhair.png","1987348e96218fca2298fa3e0dfff38701a7da41"),
 "okada_misaki":("05_cafe_staff_with_dog.png","bcb4e952c86b60c530ef8109beb75f33eff93c78"),
 "sasaki_sara":("06_red_fur_costume_peace.png","8d8c51ba906993aee73f9c31f03fbd92452c6ae2"),
 "yamada_yuri":("07_award_envelope_peace.png","6b65c081bffe20aeb16a2814e2710cf127bfde7a"),
 "shimizu_kotone":("08_lace_houndstooth_darkhair.png","92d9744be5c395387d361574698ed54617655a93"),
 "fujii_kanon":("09_cat_knit_hat_twintails.png","996f3d544cfbc735d778a4909a6d85ed43cc669d"),
 "kobayashi_iori":("10_bunny_hood_blue_frills.png","91c75ce75cd98881125c5cba8a4063554777623b")
}

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def blob(p):return subprocess.check_output(["git","hash-object",str(p)],cwd=ROOT,text=True).strip()
def preview(im,tag):
 for name,color in (("light",(248,248,249)),("dark",(25,28,37))):
  bg=Image.new("RGBA",im.size,color+(255,))
  bg.alpha_composite(im)
  bg.convert("RGB").resize((512,768)).save(OUT/(tag+"_"+name+".jpg"),quality=92)

def conservatively_clean(original):
 before=np.asarray(original.convert("RGBA"))
 alpha=before[:,:,3]
 if alpha.min()!=0 or alpha.max()!=255:
  return original,{"removed":0,"reason":"ambiguous original alpha; preserve original"}
 # Preserve alpha>=128 and all pixels near the main opaque silhouette.
 mask=Image.fromarray((alpha>=240).astype(np.uint8)*255,"L")
 protected=np.asarray(mask.filter(ImageFilter.MaxFilter(17)))>0
 # Only very low alpha, beyond an 8-pixel protective rim: external residual halo.
 remove=(alpha>0)&(alpha<=64)&(~protected)
 count=int(np.count_nonzero(remove))
 colored=int(np.count_nonzero(alpha>0))
 if not count:
  return original,{"removed":0,"reason":"no safely separated fringe; preserve original"}
 if count>max(30000,int(colored*.05)):
  return original,{"removed":0,"candidate_pixels":count,"reason":"safety ratio exceeded; preserve original"}
 cleaned=before.copy()
 cleaned[remove]=0
 assert np.array_equal(cleaned[alpha>=128],before[alpha>=128])
 assert np.array_equal(cleaned[~remove],before[~remove])
 assert np.all(cleaned[:,:,3]<=before[:,:,3])
 return Image.fromarray(cleaned,"RGBA"),{"removed":count,"reason":"removed only alpha 1..64 outside opaque silhouette + 8-pixel safety rim"}

def run():
 records={}
 for id,(filename,expected_blob) in SOURCES.items():
  source=BASE/filename
  dst=ART/"full_body"/(id+".png")
  assert source.is_file() and dst.is_file(),(id,"source or destination missing")
  assert blob(source)==expected_blob,(id,"source Git blob altered")
  with Image.open(source) as orig:
   assert orig.format=="PNG" and orig.mode=="RGBA" and orig.size==(1024,1536),(id,orig.format,orig.mode,orig.size)
   original=orig.copy()
  # Only Iori has an observed smoke halo; other 7 must be byte-identical to the originals.
  if id=="kobayashi_iori":
   cleaned,detail=conservatively_clean(original)
  else:
   cleaned,detail=original,{"removed":0,"reason":"approved clean cutout; original retained without any processing"}
  status="清掃した" if detail["removed"]>0 else "原本のまま"
  if detail["removed"]>0:
   cleaned.save(dst,format="PNG",optimize=True)
  else:
   dst.write_bytes(source.read_bytes())
  with Image.open(dst) as f:
   assert f.mode=="RGBA" and f.size==(1024,1536)
   image=f.copy()
  base=np.asarray(original)
  newer=np.asarray(image)
  alpha=base[:,:,3]
  assert np.array_equal(base[alpha>=128],newer[alpha>=128]),(id,"protected pixels changed")
  if status=="原本のまま":
   assert sha(dst)==sha(source),(id,"original not preserved")
  if id!="kobayashi_iori":
   assert status=="原本のまま" and dst.read_bytes()==source.read_bytes(),(id,"clean cutout was modified")
  else:
   assert np.all(newer[:,:,3]<=alpha),(id,"new alpha increased")
   assert np.array_equal(base[newer[:,:,3]>0],newer[newer[:,:,3]>0]),(id,"retained image pixels changed")
   assert int(np.count_nonzero((alpha>0)&(newer[:,:,3]==0)))==detail["removed"]
  # Use the solid silhouette rather than low-alpha haze to position lossless crops.
  ys,xs=np.nonzero(newer[:,:,3]>=200)
  assert len(xs)>10000,(id,"no solid subject")
  mid=int(np.median(xs))
  top=max(0,min(1136,int(ys.min())-12))
  crops={
    "upper_body":(max(0,min(304,mid-360)),0,720,960),
    "face_icons":(max(0,min(624,mid-200)),top,400,400)
  }
  preview(original,id+"_original")
  preview(image,id+"_placed")
  record={"source":"docs/new_character_ideas/2026-11-15_pr58_adopted8/"+filename,
          "source_git_blob":expected_blob,"source_sha256":sha(source),
          "placed_sha256":sha(dst),"status":status,"method":detail["reason"],
          "removed_pixels":detail["removed"],"dimensions":[1024,1536],
          "opaque_and_near_opaque_unchanged":True,"crops":{}}
  for slot,(x,y,w,h) in crops.items():
   part=image.crop((x,y,x+w,y+h))
   output=ART/slot/(id+".webp")
   output.parent.mkdir(parents=True,exist_ok=True)
   part.save(output,format="WEBP",lossless=True,method=6)
   with Image.open(output) as f:
    assert f.format=="WEBP" and f.mode=="RGBA" and f.size==(w,h),(id,slot,"bad output")
    output_pixels=np.asarray(f)
   source_pixels=np.asarray(part)
   visible=source_pixels[:,:,3]>0
   assert visible.sum()>1000,(id,slot,"blank crop")
   assert np.array_equal(source_pixels[:,:,3],output_pixels[:,:,3]),(id,slot,"alpha changed")
   assert np.array_equal(source_pixels[:,:,:3][visible],output_pixels[:,:,:3][visible]),(id,slot,"visible colors changed")
   record["crops"][slot]={"path":str(output.relative_to(ROOT)),"crop":[x,y,x+w,y+h],"sha256":sha(output)}
  records[id]=record
  print(f"PR58 {id} halo={status} removed_pixels={detail['removed']} opaque_preserved=True icons=2 PASS",flush=True)
 (OUT/"image_report.json").write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding="utf-8")
 print("PR58 source, halo safety and lossless crops QA PASS",flush=True)

if __name__=="__main__":run()
