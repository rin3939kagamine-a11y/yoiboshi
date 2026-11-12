"""Convert ONLY the three approved original PNG images into display formats.
No generation, retouch, redrawing or recoloring; original PNG bytes remain unchanged.
Output upper_body and face_icons are display-only crops of the SAME artwork.
Run under GitHub Actions with exact source Git refs and verified Git blob IDs.
"""
from __future__ import annotations
import hashlib
import io
import subprocess
from pathlib import Path
from PIL import Image, ImageOps

REPO=Path(__file__).resolve().parents[2]
SOURCE_DIR=REPO/"assets/ART_V2/source_originals/3_approved_20261112"
ASSETS=REPO/"assets/ART_V2"
PURPLE=SOURCE_DIR/"01_purple_check_noears_nomask.png"
SOURCES=[
 ("sumika",None,str(PURPLE.relative_to(REPO)),906678,None,
  "ad9482bcf6bbe27cd9e1d903e60f13215d77233d2350f525797792df1a44ce4d","01_purple_check_noears_nomask.png"),
 ("reika","origin/main","assets/ART_V2/full_body/megane_woman_20261112.png",
  976455,"9507a8facc4bbc60401a6395d4d5057283ced6ba",None,"02_megane_woman_20261112.png"),
 ("hono","origin/assets/standee-ash-brown-navy-fleece-20261112",
  "assets/character_candidates/2026-11-12_ash_brown_navy_fleece/ash_brown_navy_fleece_full_body.png",
  1010833,"dd3ee70498d840a3f6fac79ac87dfd9a9f8495a2",None,"03_ash_brown_navy_fleece.png")
]

def retrieve():
    for _,ref,_,_,_,_,_ in SOURCES:
        if ref and ref.startswith("origin/assets/"):
            b=ref[len("origin/"):]
            subprocess.run(["git","fetch","--no-tags","origin",f"refs/heads/{b}:refs/remotes/origin/{b}"],check=True,stdout=subprocess.DEVNULL)

def crop_display(img:Image.Image,kind:str):
    w,h=img.size
    # Cropping only changes the viewport, not the appearance of any original pixel.
    if kind=="full_body":
        return img
    if kind=="upper_body":
        return img.crop((int(w*.06),0,int(w*.94),int(h*.62)))
    if kind=="face_icons":
        return img.crop((int(w*.23),int(h*.005),int(w*.77),int(h*.37)))
    raise ValueError(kind)

def main():
    retrieve()
    SOURCE_DIR.mkdir(parents=True,exist_ok=True)
    completed=[]
    for id,ref,path,size,blob,sha256,dest_name in SOURCES:
        raw=(REPO/path).read_bytes() if ref is None else subprocess.check_output(["git","show",f"{ref}:{path}"])
        assert len(raw)==size,(id,"size",len(raw),size)
        if sha256:
            actual=hashlib.sha256(raw).hexdigest()
            assert actual==sha256,(id,"SHA256",actual,sha256)
        if blob:
            actual=subprocess.check_output(["git","hash-object","--stdin"],input=raw).decode().strip()
            assert actual==blob,(id,"git blob",actual,blob)
        original=SOURCE_DIR/dest_name
        if original.exists():
            assert original.read_bytes()==raw,(id,"original differs")
        else:
            original.write_bytes(raw)
        img=Image.open(io.BytesIO(raw))
        img.verify()
        img=Image.open(io.BytesIO(raw))
        assert img.width>=512 and img.height>=800,(id,img.size)
        assert img.format=="PNG",(id,img.format)
        img=ImageOps.exif_transpose(img).convert("RGBA")
        for kind in ("full_body","upper_body","face_icons"):
            target=ASSETS/kind/f"{id}.webp"
            assert not target.exists(),(id,"destination already exists",target)
            target.parent.mkdir(parents=True,exist_ok=True)
            crop_display(img,kind).save(target,format="WEBP",lossless=True,method=6)
            with Image.open(target) as check:
                assert check.mode=="RGBA" and check.width>0 and check.height>0,(id,kind)
        completed.append(dict(id=id,source_sha256=hashlib.sha256(raw).hexdigest(),size=img.size,original=str(original.relative_to(REPO))))
        print("IMPORTED_ORIGINAL_UNCHANGED",completed[-1])
    assert len(completed)==3
    print("PASS all 3 originals, 9 WEBP renderings; no source art changes")

if __name__=="__main__":main()
