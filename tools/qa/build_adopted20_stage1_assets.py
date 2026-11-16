#!/usr/bin/env python3
"""Adopted20: SHA-verified original standees, alpha-only cautious cleanup and lossless cuts.
The subject's RGB is never regenerated or edited, and source artwork remains untouched.
White-matte removal is restricted to border-connected near-white background pixels.
"""
from pathlib import Path
from PIL import Image
import numpy as np
from scipy.ndimage import binary_propagation, binary_dilation
import hashlib, json, shutil, subprocess

ROOT=Path(__file__).resolve().parents[2]
ART=ROOT/"assets/ART_V2"
OUT=ROOT/"qa_artifacts/adopted20_stage1"
OUT.mkdir(parents=True,exist_ok=True)
SOURCES={
  "endo_saori": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/2026-11-11_bowtie_burgundy_standee.png",
    "58cde317f425006729ec2dfc31844b0b1a1ff334"
  ],
  "sakaki_yura": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/01_black_pink_uniform.png",
    "feb3110c63e4fe1a5916a07e181e6447142f536c"
  ],
  "takamori_serika": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/gothic_rose_blonde_v1.png",
    "f17a24a3ddba83de45c4931699d5c117a053a6f5"
  ],
  "hamasaki_nagisa": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/beach_standee_v1.png",
    "9c99a912f96a6d001b51969fdd8a0139938aeaa9"
  ],
  "nikaido_yuki": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/standee_black_blonde_20261111.png",
    "3ac148316a84ffefc18a8aa4244a4d0ac6471e9e"
  ],
  "enomoto_tsugumi": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/brown_steampunk_beret_v1.png",
    "c6a64c1ad16967b056949427f489c229344ba54d"
  ],
  "amase_kanata": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/2026-11-11_purple_orange_idol.png",
    "764fa6b510eb1ec67c219ab83d1e59969a6c1648"
  ],
  "katsura_yui": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/cream_hoodie_wink_v1.png",
    "657fffbade5bfaf8466f3dc6da00fdce543110c1"
  ],
  "momose_yumeka": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/pink_sideponytail_smile_v1.png",
    "c438826d285896f70da7ccdcb7d6b996abba0f10"
  ],
  "himemiya_riria": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/silver_gothic_crown.png",
    "fc298defeda5147a0dc959e029641020e1f75dbd"
  ],
  "sorano_nanase": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/blue_beret_20261111.png",
    "0e7a5371aca44dae241611719d796650f3d696d5"
  ],
  "nanjo_yurara": [
    "docs/new_character_ideas/2026-11-16_pr61-73_adopted12/2026-11-11_purple_braid_standee.png",
    "dec694e1ebaf1e88fc4cb046359f59ee84637b60"
  ],
  "komine_suzu": [
    "docs/new_character_ideas/2026-11-16_pr33_adopted3/yoiboshi_01_beige_dynamic.png",
    "e4a188fa039da58f02d922882fd31d61f90bb415"
  ],
  "wakakusa_rinne": [
    "docs/new_character_ideas/2026-11-16_pr33_adopted3/yoiboshi_02_green_plaid_dynamic.png",
    "f8ba5252d69a665eacf0f2776639449a1c0a9873"
  ],
  "higuchi_rei": [
    "docs/new_character_ideas/2026-11-16_pr33_adopted3/yoiboshi_03_burgundy_dynamic.png",
    "bf156b9a78b04770a2943dd503d75d3d5f8fd2c9"
  ],
  "dojima_rei": [
    "docs/new_character_ideas/2026-11-16_pr30_adopted2/yoiboshi_gray_bob_fullbody_no_mask.png",
    "2995b823b117ad326016070ae8923eaf262744ad"
  ],
  "amai_momo": [
    "docs/new_character_ideas/2026-11-16_pr30_adopted2/yoiboshi_pink_maid_fullbody.png",
    "3ba88209756570f8fa3a3ed40760b1444e939fb0"
  ],
  "nekomiya_rara": [
    "docs/new_character_ideas/2026-11-16_pr34_adopted3/01_leopard_cat_dynamic_v2.png",
    "4f606eb727af49bd688c4bd7e825352742f255e6"
  ],
  "tsukino_moka": [
    "docs/new_character_ideas/2026-11-16_pr34_adopted3/02_pink_bunny_dynamic_v2.png",
    "48774700190b9de4a0ebd182ad7729fe724bfd05"
  ],
  "asagiri_rara": [
    "docs/new_character_ideas/2026-11-16_pr34_adopted3/03_gray_pink_dynamic_no_cat_ears.png",
    "9d065b1c245125ba1a34c22502bc56bc4db1db29"
  ]
}
WHITE_BACKGROUND_ID="sakaki_yura"
NOISY_IDS=frozenset({"nikaido_yuki","komine_suzu","wakakusa_rinne","higuchi_rei"})

def checksum(path):
 return hashlib.sha256(path.read_bytes()).hexdigest()

def git_blob(path):
 return subprocess.check_output(["git","hash-object",str(path)],cwd=ROOT,text=True).strip()

def conservative_exterior_alpha(original,id):
 a=np.asarray(original.convert("RGBA")).copy()
 alpha=a[:,:,3]
 solid=alpha>=96
 protected=binary_dilation(solid,iterations=20)
 candidates=(alpha>0)&(alpha<=24)&(~protected)
 count=int(np.count_nonzero(candidates))
 visible=int(np.count_nonzero(alpha>0))
 info={"candidate_pixels":count,"removed_pixels":0,
       "reason":"no separated low-alpha residue; kept source as is"}
 if not count:return original,info
 if count>min(20000,max(500,int(visible*.025))):
  info["reason"]="ambiguous large low-alpha residue; preserved source pixels"
  return original,info
 a[candidates]=0
 info.update(removed_pixels=count,reason="alpha 1..24 detached by more than 20 pixels from body")
 return Image.fromarray(a,"RGBA"),info

def remove_exterior_white(original,id):
 a=np.asarray(original.convert("RGBA")).copy()
 if np.min(a[:,:,3])!=255:
  raise AssertionError((id,"expected opaque RGB with white background",original.mode))
 rgb=a[:,:,:3].astype(np.int16)
 smallest=np.min(rgb,axis=2)
 largest=np.max(rgb,axis=2)
 mask=(smallest>=243)&((largest-smallest)<=12)
 seeds=np.zeros(mask.shape,dtype=bool)
 seeds[0,:]=mask[0,:];seeds[-1,:]=mask[-1,:]
 seeds[:,0]=mask[:,0];seeds[:,-1]=mask[:,-1]
 corners=[mask[0,0],mask[0,-1],mask[-1,0],mask[-1,-1]]
 assert sum(bool(x) for x in corners)>=3,(id,"corners not sufficiently near white")
 exterior=binary_propagation(seeds,mask=mask)
 coverage=float(exterior.mean())
 border=np.concatenate([exterior[0,:],exterior[-1,:],exterior[:,0],exterior[:,-1]])
 border_fraction=float(border.mean())
 if not (.12<=coverage<=.90 and border_fraction>=.63):
  raise AssertionError((id,"unsafe white-matte segmentation; do not use image",coverage,border_fraction))
 a[exterior,3]=0
 assert np.array_equal(a[:,:,:3],np.asarray(original.convert("RGBA"))[:,:,:3]),(id,"subject RGB altered")
 assert not np.any(a[exterior,3]),(id,"background still opaque")
 return Image.fromarray(a,"RGBA"),{
  "removed_pixels":int(np.count_nonzero(exterior)),
  "reason":"only border-connected RGB 243+ near-white mask converted to alpha zero",
  "white_coverage":round(coverage,5),"white_border_fraction":round(border_fraction,5)
 }

def preview(im,name):
 for suffix,bg in (("light",(245,245,247,255)),("dark",(29,33,45,255))):
  base=Image.new("RGBA",im.size,bg)
  base.alpha_composite(im.convert("RGBA"))
  base.thumbnail((512,768))
  base.convert("RGB").save(OUT/(name+"_"+suffix+".jpg"),quality=88)

def build():
 assert len(SOURCES)==20 and len(set(SOURCES))==20
 records={}
 for id,(path,sha) in SOURCES.items():
  src=ROOT/path
  assert src.is_file(),(id,"missing adopted original",path)
  assert git_blob(src)==sha,(id,"original blob mismatch",sha)
  with Image.open(src) as file:
   assert file.format=="PNG",(id,"not an original PNG")
   original=file.copy()
  rgba=original.convert("RGBA")
  assert rgba.width>=720 and rgba.height>=900,(id,"unexpected original dimensions",original.size)
  before=np.asarray(rgba)
  if id==WHITE_BACKGROUND_ID:
   cleaned,info=remove_exterior_white(original,id)
   treatment="white matte border transparency only"
  elif id in NOISY_IDS:
   cleaned,info=conservative_exterior_alpha(original,id)
   treatment="cautious disconnected low-alpha residue cleanup" if info["removed_pixels"] else "original preserved; unsafe/none"
  else:
   cleaned,info=original,{"removed_pixels":0,"reason":"clean adopted PNG preserved"}
   treatment="original bytes preserved"
  after=np.asarray(cleaned.convert("RGBA"))
  assert np.array_equal(before[:,:,:3],after[:,:,:3]),(id,"RGB changed")
  assert np.all(after[:,:,3]<=before[:,:,3]),(id,"alpha increased")
  if id!=WHITE_BACKGROUND_ID:
   assert np.array_equal(before[before[:,:,3]>=33],after[before[:,:,3]>=33]),(id,"person pixels changed")
  if id not in NOISY_IDS and id!=WHITE_BACKGROUND_ID:
   assert np.array_equal(before,after)
  placed=ART/"full_body"/(id+".png")
  placed.parent.mkdir(parents=True,exist_ok=True)
  if info["removed_pixels"]:
   cleaned.convert("RGBA").save(placed,format="PNG",optimize=True)
  else:
   shutil.copyfile(src,placed)
  with Image.open(placed) as loaded:
   assert loaded.format=="PNG" and np.array_equal(np.asarray(loaded.convert("RGBA")),after)
  if not info["removed_pixels"]:
   assert placed.read_bytes()==src.read_bytes(),(id,"original should be identical")
  preview(rgba,id+"_source");preview(cleaned,id+"_placed")
  ys,xs=np.nonzero(after[:,:,3]>=200)
  assert xs.size>=4000,(id,"not enough solid subject pixels")
  w,h=cleaned.size
  center=int(np.median(xs))
  top=max(0,min(h-400,int(ys.min())-12))
  cutboxes={
   "upper_body":(max(0,min(w-720,center-360)),0,720,960),
   "face_icons":(max(0,min(w-400,center-200)),top,400,400),
  }
  result={"source":path,"git_blob_sha":sha,"source_sha256":checksum(src),
          "placed":str(placed.relative_to(ROOT)),"placed_sha256":checksum(placed),
          "dimensions":[w,h],"source_mode":original.mode,
          "treatment":treatment,**info,"person_RGB_unchanged":True,"crops":{}}
  for slot,(x,y,cw,ch) in cutboxes.items():
   part=cleaned.convert("RGBA").crop((x,y,x+cw,y+ch))
   output=ART/slot/(id+".webp")
   output.parent.mkdir(parents=True,exist_ok=True)
   part.save(output,format="WEBP",lossless=True,method=6)
   with Image.open(output) as check:
    actual=np.asarray(check.convert("RGBA"))
   expected=np.asarray(part)
   assert np.array_equal(actual[:,:,3],expected[:,:,3]),(id,slot,"alpha not lossless")
   visible=expected[:,:,3]>0
   assert np.array_equal(actual[:,:,:3][visible],expected[:,:,:3][visible]),(id,slot,"visible RGB not lossless")
   assert np.count_nonzero(expected[:,:,3])>1000,(id,slot,"empty crop")
   result["crops"][slot]={"path":str(output.relative_to(ROOT)),"box":[x,y,x+cw,y+ch],
                          "sha256":checksum(output)}
  records[id]=result
  print(f"ADOPTED20 {id}: source SHA OK, placed RGB intact, cleanup={info['removed_pixels']}px, 2 lossless crops PASS",flush=True)
 (OUT/"image_report.json").write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding="utf-8")
 print("ADOPTED20 20 SOURCES + 60 DERIVATIVES PASS",flush=True)

if __name__=="__main__":
 build()
