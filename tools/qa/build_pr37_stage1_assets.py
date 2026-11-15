#!/usr/bin/env python3
"""PR37 WebP image audit, conservative exterior residual cleanup and lossless crops.
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
BASE=ROOT/"docs/new_character_ideas/2026-11-15_pr37_adopted7"
ART=ROOT/"assets/ART_V2"
OUT=ROOT/"qa_artifacts/pr37_stage1"
OUT.mkdir(parents=True,exist_ok=True)
SOURCES={
  "kato_hazuki": [
    "02_wavy_brown_hair_cream_blouse.webp",
    "07e15d43edaffc5d34414fcb17072c120bb5e310"
  ],
  "yoshida_sae": [
    "03_white_tshirt_blue_denim.webp",
    "5e9aa93287e6eccdf107ac5d6e43a0c14151c8fc"
  ],
  "yamazaki_wakana": [
    "04_mint_tweed_double_peace.webp",
    "548403c40f5c8316a91f123e80e4fad2c7b5fb4b"
  ],
  "watanabe_mizuki": [
    "05_pink_knit_cardigan.webp",
    "2f9b97c01631654334848076af2e9e3c9f544d63"
  ],
  "kinoshita_ami": [
    "06_bob_hair_blue_cardigan.webp",
    "018a11b6789112f98cef9ca5bea57fc77b5fe168"
  ],
  "sato_eri": [
    "07_burgundy_blouse_black_skirt.webp",
    "78f4caa48b4555d081da3aab919cd6a49460bda6"
  ],
  "nishimura_yumi": [
    "08_blonde_black_offshoulder.webp",
    "0ab95550d7ae37e402353a3a5e5515cfe5e464b6"
  ]
}

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
            assert f.format=="WEBP",(id,"source must be WebP",f.format)
            original=f.convert("RGBA")
        assert original.width>=720 and original.height>=960,(id,"source dimensions too small",original.size)
        cleaned,detail=safe_clean(original)
        removed=int(detail["removed"])
        status="除去した" if removed else "原本のまま"
        base=np.asarray(original)
        newer=np.asarray(cleaned)
        assert np.array_equal(base[base[:,:,3]>=33],newer[base[:,:,3]>=33]),(id,"visible person pixels changed")
        assert np.all(newer[:,:,3]<=base[:,:,3]),(id,"new alpha introduced")
        assert np.array_equal(base[newer[:,:,3]>0],newer[newer[:,:,3]>0]),(id,"retained pixels changed")
        assert np.count_nonzero((base[:,:,3]>0)&(newer[:,:,3]==0))==removed
        dest=ART/"full_body"/(id+".png")
        dest.parent.mkdir(parents=True,exist_ok=True)
        cleaned.save(dest,format="PNG",optimize=True)
        with Image.open(dest) as f:
            assert f.format=="PNG" and f.mode=="RGBA" and f.size==original.size
            assert np.array_equal(np.asarray(f),newer),(id,"PNG roundtrip changed pixels")
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
        print(f"PR37 {id} residual={status} removed={removed} method={detail['reason']} opaque_preserved=True crops=2 PASS",flush=True)
    (OUT/"image_report.json").write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding="utf-8")
    print("PR37 IMAGE SOURCE/CROP QA PASS",flush=True)

if __name__=="__main__":
    run()
