#!/usr/bin/env python3
"""Build PR #59 stage1 conversation crops from accepted PNGs.
Source docs/ PNGs stay byte-identical. Optional red fringe correction ONLY on the
partially-transparent silhouette of 04 (not the face, clothing or opaque art).
A diagnostic on light/dark backgrounds is always written to artifacts.
"""
import hashlib
import json
import subprocess
from pathlib import Path
import numpy as np
from scipy.ndimage import distance_transform_edt
from PIL import Image

ROOT=Path(__file__).resolve().parents[2]
BASE=ROOT/"docs/new_character_ideas/2026-11-15_pr59_approved4"
ART=ROOT/"assets/ART_V2"
OUT=ROOT/"qa_artifacts/pr59_stage1"
OUT.mkdir(parents=True,exist_ok=True)
SOURCES={
 "takamiya_sayaka":("01_black_suit.png","55bc42cecef0614b58fc064da07da757aa54148e"),
 "shirase_marika":("02_white_lace.png","5afa92fdde89b3f370f9958f7a756dcae635126e"),
 "miyoshi_nanami":("03_blue_shirt.png","80a0fad521fbf29b25fa204b481b6efce8221b5a"),
 "hayase_rio":("04_floral_hoodie.png","d559652efd0968b2f0d4559ecd22a68f2b477229")
}
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
def blob(path): return subprocess.check_output(["git","hash-object",str(path)],cwd=ROOT,text=True).strip()
def dark_preview(image,tag):
 for suffix,bg in (("light",(242,242,243)),("dark",(29,32,44))):
  out=Image.new("RGBA",image.size,bg+(255,))
  out.alpha_composite(image)
  out.convert("RGB").resize((512,768)).save(OUT/f"{tag}_{suffix}.jpg",quality=91)

def red_fringe_correction(img):
 arr=np.array(img, dtype=np.uint8, copy=True)
 alpha=arr[:,:,3]
 opaque=alpha>=240
 if not opaque.any():return img,0,0,0
 dist,idx=distance_transform_edt(~opaque,return_indices=True)
 interior=arr[idx[0],idx[1],:3].astype(np.int16)
 rgb=arr[:,:,:3].astype(np.int16)
 diff=rgb-interior
 # Fix only demonstrably excessive RED at non-opaque fringe pixels within 4px.
 # All fully opaque RGB and the alpha channel are unchanged.
 risk=(alpha>0)&(alpha<225)&(dist<=4)&(diff[:,:,0]>=35)&(
     (diff[:,:,0]-diff[:,:,1])>=25)&((diff[:,:,0]-diff[:,:,2])>=25)
 risky=int(np.count_nonzero(risk))
 if risky<20:return img,0,risky,risky
 arr[:,:,:3][risk]=interior[risk].astype(np.uint8)
 red_after=np.array(arr[:,:,:3],dtype=np.int16)-interior
 after=(alpha>0)&(alpha<225)&(dist<=4)&(red_after[:,:,0]>=35)&(
     (red_after[:,:,0]-red_after[:,:,1])>=25)&((red_after[:,:,0]-red_after[:,:,2])>=25)
 assert not np.any(arr[alpha>=225,:3]!=np.array(img)[:,:,:3][alpha>=225]),"Opaque interior changed"
 assert np.array_equal(arr[:,:,3],alpha),"Alpha changed"
 assert int(np.count_nonzero(after))<risky,"Red halo did not decrease"
 return Image.fromarray(arr,"RGBA"),int(np.count_nonzero(risk)),risky,int(np.count_nonzero(after))

def build():
 report={}
 for id,(filename,expected) in SOURCES.items():
  src=BASE/filename
  dest=ART/"full_body"/f"{id}.png"
  assert blob(src)==expected,(id,"Original Git blob mismatch")
  assert src.read_bytes()==dest.read_bytes(),(id,"Initial portrait did not match source")
  with Image.open(src) as src_im:
   assert src_im.format=="PNG" and src_im.mode=="RGBA" and src_im.size==(1024,1536),id
   assert src_im.getchannel("A").getextrema()[0]==0,(id,"No transparency")
   original=src_im.copy()
  dark_preview(original,id+"_source")
  corrected=original
  pixels=before=after=0
  if id=="hayase_rio":
   corrected,pixels,before,after=red_fringe_correction(original)
   if pixels:
    corrected.save(dest,format="PNG",optimize=True)
  with Image.open(dest) as final:
   final=final.copy()
  assert final.mode=="RGBA" and final.size==(1024,1536) and final.getchannel("A").getextrema()[0]==0
  if id!="hayase_rio" or pixels==0:
   assert dest.read_bytes()==src.read_bytes(),(id,"Unapproved image edit")
  else:
   orig=np.array(original)
   mod=np.array(final)
   changed=np.any(orig!=mod,axis=2)
   assert np.count_nonzero(changed)==pixels,(id,"Unexpected changed pixels")
   assert np.array_equal(orig[:,:,3],mod[:,:,3]),(id,"Opacity changed")
   assert not np.any(changed & (orig[:,:,3]>=225)),(id,"Opaque artwork changed")
  # Adapt crop positions to source silhouette bounds; cropping creates no pixels.
  alpha=np.array(final.getchannel("A"))
  yy,xx=np.nonzero(alpha>20)
  assert len(xx)>100000,(id,"Missing foreground")
  cx=int(np.percentile(xx,50))
  x1=max(0,min(1024-720,cx-360))
  upper=(x1,0,x1+720,960)
  fx=max(0,min(1024-400,cx-200))
  face=(fx,10,fx+400,410)
  rec={"source_path":str(src.relative_to(ROOT)),"source_blob":expected,
       "source_sha256":sha(src),"final_sha256":sha(dest),"final_blob":blob(dest),
       "dimensions":[1024,1536],"mode":"RGBA",
       "defringe":{"performed":pixels>0,"corrected_pixels":pixels,"red_fringe_before":before,"red_fringe_after":after,
                   "method":"04 only: replace demonstrably red-biased edge RGB from nearest opaque inner pixel, alpha unchanged"},
       "crops":{}}
  for slot,box in (("upper_body",upper),("face_icons",face)):
   crop=final.crop(box)
   loc=ART/slot/f"{id}.webp"
   loc.parent.mkdir(parents=True,exist_ok=True)
   crop.save(loc,format="WEBP",lossless=True,method=6)
   with Image.open(loc) as check:
    assert check.format=="WEBP" and check.size==crop.size and check.mode=="RGBA"
    assert np.array_equal(np.asarray(check),np.asarray(crop)),(id,slot,"Crop pixel mismatch")
   rec["crops"][slot]={"path":str(loc.relative_to(ROOT)),"sha256":sha(loc),"box":list(box)}
  dark_preview(final,id+"_final")
  report[id]=rec
  print(f"{id}: source_blob={expected} final_sha256={rec['final_sha256']} defringe_pixels={pixels} halo={before}->{after} icon crops QA PASS",flush=True)
 (OUT/"image_report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
 print("PR59 ART / LIGHT-DARK / CROPS QA PASS",flush=True)

if __name__=="__main__":build()
