#!/usr/bin/env python3
"""SINGLES12 PNG image audit, conservative exterior residual cleanup and lossless crops.
No original source or opaque/semivisible person pixels are modified. If residual
colors overlap the protected silhouette, retain the original as RGBA PNG.
"""
import hashlib
import json
import subprocess
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

ROOT=Path(__file__).resolve().parents[2]
BASE=ROOT/"docs/new_character_ideas/2026-11-15_singles_adopted12"
ART=ROOT/"assets/ART_V2"
OUT=ROOT/"qa_artifacts/singles12_stage1"
OUT.mkdir(parents=True,exist_ok=True)
SOURCES={
  "takahashi_ayano": [
    "pr29_02_orange_red_lolita.png",
    "e4a60b9af98f6ed280f3ef6304d99a91d070b307"
  ],
  "tanaka_mio": [
    "pr31_red_hoodie.png",
    "25a52a42b27cf0537ab0ec73cf7925285e3fc55e"
  ],
  "arai_shiori": [
    "pr35_bunny_maid.png",
    "93184eada478e70fe3bca558743a7d661be348ba"
  ],
  "ono_yuina": [
    "pr75_01_pink_floral_kimono.png",
    "00060805c831401973cf597244e5e871eec4796e"
  ],
  "maeda_akane": [
    "pr75_02_black_sleeveless_white_pants.png",
    "9c73fc98dca064e1edf290a0a9b18d1e74a9fcc5"
  ],
  "fujita_sui": [
    "pr75_03_cat_cap_denim_shorts.png",
    "45212fa5c3577e8f59d35b303e7268083ac23e81"
  ],
  "goto_satoko": [
    "pr75_04_white_blouse_black_tiered_skirt.png",
    "5fe79caec70404a70105d28773955618333e419a"
  ],
  "nakajima_kazumi": [
    "pr75_05_pink_blouse_white_pants.png",
    "50d46fe7578711cb40dbc66e1e28348911419d20"
  ],
  "harada_kyoko": [
    "pr75_06_lavender_floral_dress.png",
    "cc4f8d85c78dc410f0e935b6b29a63466437f174"
  ],
  "ogawa_rina": [
    "pr76_01_blonde_maid.png",
    "b2def42d7e63a41b5a74b0183eef7efd049253df"
  ],
  "ishida_yuna": [
    "pr76_02_auburn_offshoulder.png",
    "542e608540e8e857b179ff5768000fd8409068e9"
  ],
  "morita_mitsuki": [
    "pr76_03_navy_furisode.png",
    "6719cd31e7e997b962785a8f4de2a63300df7f6b"
  ]
}
HALO_IDS=frozenset(["takahashi_ayano","tanaka_mio","arai_shiori"])


def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def blob(p): return subprocess.check_output(["git","hash-object",str(p)],cwd=ROOT,text=True).strip()

def preview(im,tag):
    for name,color in (("light",(248,248,249)),("dark",(25,28,37))):
        bg=Image.new("RGBA",im.size,color+(255,))
        bg.alpha_composite(im)
        bg.convert("RGB").thumbnail((512,768))
        w,h=im.size
        ratio=min(512/w,768/h)
        bg.convert("RGB").resize((max(1,round(w*ratio)),max(1,round(h*ratio)))).save(OUT/(tag+"_"+name+".jpg"),quality=92)

def safe_clean(image):
    before=np.asarray(image.convert("RGBA"))
    alpha=before[:,:,3]
    if alpha.min()!=0 or alpha.max()!=255:
        return image,{"removed":0,"reason":"opaque or ambiguous alpha; retain converted source"}
    # Preserve all pixels with alpha>=33, and keep any exterior residue near solid body.
    protected=np.asarray(Image.fromarray((alpha>=96).astype(np.uint8)*255,"L").filter(ImageFilter.MaxFilter(41)))>0
    candidate=(alpha>0)&(alpha<=24)&(~protected)
    count=int(np.count_nonzero(candidate))
    filled=int(np.count_nonzero(alpha>0))
    if not count:
        return image,{"removed":0,"reason":"no sufficiently separated low-alpha residual"}
    # Reject broad or potentially structural edits.
    if count>min(20000,max(500,int(filled*.025))):
        return image,{"removed":0,"candidate_pixels":count,"reason":"ambiguous or broad residual; retain source"}
    edited=before.copy()
    edited[candidate]=0
    assert np.array_equal(edited[alpha>=33],before[alpha>=33])
    assert np.array_equal(edited[~candidate],before[~candidate])
    return Image.fromarray(edited,"RGBA"),{"removed":count,"reason":"removed only alpha 1..24 farther than 20 pixels from alpha>=96 silhouette"}

def run():
    records={}
    for id,(filename,expected_blob) in SOURCES.items():
        source=BASE/filename
        assert source.is_file(),(id,"source missing")
        assert blob(source)==expected_blob,(id,"source Git blob mismatch")
        with Image.open(source) as f:
            assert f.format=="PNG",(id,"source must be PNG",f.format)
            original=f.convert("RGBA")
        assert original.width>=720 and original.height>=960,(id,"source dimensions too small",original.size)
        cleaned,detail=(safe_clean(original) if id in HALO_IDS else (original,{"removed":0,"reason":"approved clean cutout; preserve original PNG bytes"}))
        removed=int(detail["removed"])
        status="除去した" if removed else "原本のまま"
        base=np.asarray(original)
        newer=np.asarray(cleaned)
        assert np.array_equal(base[base[:,:,3]>=33],newer[base[:,:,3]>=33]),(id,"visible person pixels changed")
        assert np.all(newer[:,:,3]<=base[:,:,3]),(id,"new alpha introduced")
        if id not in HALO_IDS: assert np.array_equal(base,newer),(id,"clean original pixels modified")
        assert np.array_equal(base[newer[:,:,3]>0],newer[newer[:,:,3]>0]),(id,"retained pixels changed")
        assert np.count_nonzero((base[:,:,3]>0)&(newer[:,:,3]==0))==removed
        dest=ART/"full_body"/(id+".png")
        dest.parent.mkdir(parents=True,exist_ok=True)
        if removed:
            cleaned.save(dest,format="PNG",optimize=True)
        else:
            dest.write_bytes(source.read_bytes())
        if id not in HALO_IDS:
            assert status=="原本のまま" and dest.read_bytes()==source.read_bytes(),(id,"clean original modified")
        with Image.open(dest) as f:
            assert f.format=="PNG" and f.size==original.size
            assert np.array_equal(np.asarray(f.convert("RGBA")),newer),(id,"PNG roundtrip changed pixels")
        preview(original,id+"_source")
        preview(cleaned,id+"_placed")
        ys,xs=np.nonzero(newer[:,:,3]>=200)
        assert len(xs)>1000,(id,"solid subject not found")
        w,h=cleaned.size
        mid=int(np.median(xs))
        top=max(0,min(h-400,int(ys.min())-12))
        crops={"upper_body":(max(0,min(w-720,mid-360)),0,720,960),
               "face_icons":(max(0,min(w-400,mid-200)),top,400,400)}
        record={"source":str(source.relative_to(ROOT)),"source_git_blob":expected_blob,
                "source_sha256":sha(source),"placed_sha256":sha(dest),
                "status":status,"method":detail["reason"],"removed_pixels":removed,
                "dimensions":[w,h],"opaque_and_near_opaque_unchanged":True,"crops":{}}
        for slot,(x,y,cw,ch) in crops.items():
            part=cleaned.crop((x,y,x+cw,y+ch))
            path=ART/slot/(id+".webp")
            path.parent.mkdir(parents=True,exist_ok=True)
            part.save(path,format="WEBP",lossless=True,method=6)
            with Image.open(path) as f:
                assert f.format=="WEBP" and f.mode=="RGBA" and f.size==(cw,ch),(id,slot,"invalid crop")
                crop_result=np.asarray(f)
            expected=np.asarray(part)
            visible=expected[:,:,3]>0
            assert np.count_nonzero(visible)>1000,(id,slot,"blank crop")
            assert np.array_equal(crop_result[:,:,3],expected[:,:,3]),(id,slot,"alpha changed")
            assert np.array_equal(crop_result[:,:,:3][visible],expected[:,:,:3][visible]),(id,slot,"color changed")
            record["crops"][slot]={"path":str(path.relative_to(ROOT)),"crop":[x,y,x+cw,y+ch],"sha256":sha(path)}
        records[id]=record
        print(f"SINGLES12 {id} residual={status} removed={removed} method={detail['reason']} opaque_preserved=True crops=2 PASS",flush=True)
    (OUT/"image_report.json").write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding="utf-8")
    print("SINGLES12 IMAGE SOURCE/CROP QA PASS",flush=True)

if __name__=="__main__":
    run()
