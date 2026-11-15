#!/usr/bin/env python3
"""PR38 source audit, conservative fringe cleanup and lossless dialogue crops.
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
BASE=ROOT/"docs/new_character_ideas/2026-11-15_pr38_approved8"
ART=ROOT/"assets/ART_V2"
OUT=ROOT/"qa_artifacts/pr38_stage1"
OUT.mkdir(parents=True,exist_ok=True)
SOURCES={
 "morinaga_akari":("01_mint_black_idol.png","5e8902bec7f0cc2d866b7a4c451b6b43a2f70714"),
 "kurosaki_kaede":("02_white_shirt_suspenders.png","e2488fa8803fc1770452f0e80140802b65787c27"),
 "komatsu_hinata":("03_short_bob_mustard.png","53c840acbaf6cb610a3e28d7aa22a67f03cc55ee"),
 "kitahara_shiho":("04_navy_business_suit.png","5f7c758c7abc1ee51c828949931c62606e2af907"),
 "otsuki_tsubasa":("05_light_blue_workwear.png","63c30cf8ad54cbbd50c72c0f710da8dfc32249ca"),
 "mizuhara_mayu":("06_caramel_knit.png","92a78a4695c2cb830c805d48f0b6017fd962bfaf"),
 "takasaka_tomoe":("07_black_knit_plaid.png","a2a6b1c2374efa3b21148fc47b19d45d1eedadea"),
 "nishimura_ako":("08_mustard_plaid_street.png","d73588c1fc99a670ec36005368a1c95365e919d0")
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
  cleaned,detail=conservatively_clean(original)
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
  record={"source":"docs/new_character_ideas/2026-11-15_pr38_approved8/"+filename,
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
  print(f"PR38 {id} halo={status} removed_pixels={detail['removed']} opaque_preserved=True icons=2 PASS",flush=True)
 (OUT/"image_report.json").write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding="utf-8")
 print("PR38 source, halo safety and lossless crops QA PASS",flush=True)

if __name__=="__main__":run()
