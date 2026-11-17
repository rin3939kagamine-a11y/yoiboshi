#!/usr/bin/env python3
"""Batch4 source-alpha-preserving conversion: approved RGBA PNG -> lossless RGBA WEBP.

No background removal or subject segmentation. Existing alpha below 240 stays
exactly unchanged; every alpha >= 240 becomes 255, preserving the entire
original silhouette and RGB colors. Each art is compared on dark navy.
"""
from __future__ import annotations
import hashlib
import json
from pathlib import Path
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageOps

ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/"docs/new_character_ideas/2026-11-17_sr_batch4"
DEST=ROOT/"assets/UNIT_ART"
REPORT=ROOT/"qa_artifacts/sr_batch4"
NAMES={
 "mimi":"mimi_silver",
 "tia":"tia_staff",
 "kanon":"kanon_party",
 "mikoto":"mikoto_stand",
 "sakura":"sakura_nurse",
 "subaru":"subaru_coat",
 "mira":"mira_rose",
 "nozomi":"nozomi_counter",
 "tomoe":"tomoe_diy",
 "chisato":"chisato_bank",
}
NAVY=(9,18,44)

def process(name, unit_id):
    source=SOURCE/(name+"_sr.png")
    with Image.open(source) as img:
        assert img.format=="PNG" and img.mode in ("RGBA","LA","P"),(name,"not alpha PNG",img.mode)
        assert "A" in img.getbands() or ("transparency" in img.info),(name,"no actual source alpha")
        orig=img.convert("RGBA")
    arr=np.asarray(orig).copy()
    h,w=arr.shape[:2]
    src_alpha=arr[:,:,3].copy()
    assert (src_alpha==0).mean()>0.03 and (src_alpha>=240).mean()>0.12,(name,"source transparency or subject absent")
    alpha=np.where(src_alpha>=240,255,src_alpha).astype(np.uint8)
    arr[:,:,3]=alpha
    assert np.array_equal(src_alpha>0,alpha>0),(name,"silhouette support changed")
    assert np.all(alpha[src_alpha>=240]==255),(name,"source alpha >=240 not opaque")
    assert np.array_equal(src_alpha[src_alpha<240],alpha[src_alpha<240]),(name,"source lower alpha changed")
    # Pixels isolated from the exterior are necessarily interior fabric.
    fg=(src_alpha>0).astype(np.uint8)
    interior=cv2.erode(fg,np.ones((7,7),np.uint8),iterations=1).astype(bool)
    interior_partial=int(np.count_nonzero(interior&(alpha>0)&(alpha<240)))
    # Fully opaque paint survives, including white cloth.
    opaque_unchanged=int(np.count_nonzero((src_alpha==255)&(alpha!=255)))
    assert opaque_unchanged==0,(name,"opaque garment damaged")
    # The source may have intentional low alpha; preserve it verbatim as requested.
    # Record every interior low-alpha pixel for dark-background visual review.
    output=DEST/(unit_id+".webp")
    rgba=Image.fromarray(arr,mode="RGBA")
    rgba.save(output,format="WEBP",lossless=True,method=6,exact=True)
    with Image.open(output) as test:
        assert test.format=="WEBP" and test.size==(w,h) and test.mode=="RGBA",(name,"bad WebP")
        final=np.asarray(test.convert("RGBA"))
    assert np.array_equal(final[:,:,3],alpha),(name,"encoded alpha differs")
    assert np.array_equal(final[:,:,:3][alpha>0],arr[:,:,:3][alpha>0]),(name,"source paint differs")
    # Compare exact RGB within opaque parts of source vs dark navy overlay.
    navy=np.array(NAVY,dtype=np.float32)
    comp=final[:,:,:3].astype(np.float32)*(final[:,:,3:4]/255.0) + navy*(1.0-final[:,:,3:4]/255.0)
    opaque=alpha==255
    max_diff=float(np.max(np.abs(comp[opaque]-arr[:,:,:3][opaque])))
    assert max_diff<0.001,(name,"dark background color drift")
    assert np.array_equal(alpha==0,src_alpha==0),(name,"holes/new cut-outs")
    edge=(alpha>0)&(alpha<240)
    edge_count=int(edge.sum())
    # Audit possible white halo on the source's original antialiasing pixels.
    white_edge=int(np.count_nonzero(edge & (arr[:,:,:3].min(axis=2)>245)))
    before=Image.new("RGB",(360,540),"white")
    after=Image.new("RGB",(360,540),NAVY)
    scaled=orig.copy()
    scaled.thumbnail((360,540),Image.Resampling.LANCZOS)
    before.paste(scaled,((360-scaled.width)//2,(540-scaled.height)//2),scaled.getchannel("A"))
    webp=Image.open(output).convert("RGBA")
    webp.thumbnail((360,540),Image.Resampling.LANCZOS)
    after.paste(webp,((360-webp.width)//2,(540-webp.height)//2),webp.getchannel("A"))
    preview=Image.new("RGB",(720,570),"#eeeeee")
    preview.paste(before,(0,0));preview.paste(after,(360,0))
    ImageDraw.Draw(preview).text((10,548),name+"  source RGBA on white / WebP on navy",fill="#222222")
    preview.save(REPORT/(name+"_before_after.jpg"),quality=86,optimize=True)
    qa={
      "unit_id":unit_id,
      "width":w,"height":h,"png_mode":orig.mode,
      "source_transparent":int(np.count_nonzero(src_alpha==0)),
      "output_transparent":int(np.count_nonzero(alpha==0)),
      "source_semitransparent":int(np.count_nonzero((src_alpha>0)&(src_alpha<255))),
      "output_semitransparent":int(np.count_nonzero((alpha>0)&(alpha<255))),
      "source_high_alpha_240_254":int(np.count_nonzero((src_alpha>=240)&(src_alpha<255))),
      "output_high_alpha_240_254":int(np.count_nonzero((alpha>=240)&(alpha<255))),
      "interior_low_alpha":interior_partial,
      "original_white_partial_edge":white_edge,
      "source_painted_silhouette_px":int(np.count_nonzero(src_alpha>0)),
      "output_painted_silhouette_px":int(np.count_nonzero(alpha>0)),
      "opaque_rgb_max_difference_on_navy":max_diff,
      "source_sha256":hashlib.sha256(source.read_bytes()).hexdigest(),
      "webp_sha256":hashlib.sha256(output.read_bytes()).hexdigest(),
      "qa_status":"PASS"
    }
    print(json.dumps({name:qa},ensure_ascii=False),flush=True)
    return qa

def main():
    DEST.mkdir(parents=True,exist_ok=True)
    REPORT.mkdir(parents=True,exist_ok=True)
    qa={name:process(name,unit) for name,unit in NAMES.items()}
    cols=5
    sheets=[Image.open(REPORT/(name+"_before_after.jpg")).convert("RGB") for name in NAMES]
    w,h=sheets[0].size
    contact=Image.new("RGB",(w*cols,h*2),"#f0f0f0")
    for i,im in enumerate(sheets):contact.paste(im,((i%cols)*w,(i//cols)*h))
    contact.thumbnail((1800,750),Image.Resampling.LANCZOS)
    contact.save(REPORT/"contact_sheet.jpg",quality=84,optimize=True)
    (REPORT/"art_report.json").write_text(json.dumps(qa,ensure_ascii=False,indent=2),encoding="utf-8")
    print("PASS: ten genuine-alpha PNGs encoded as lossless WEBP with >=240 opaque, original silhouette and navy QA")

if __name__=="__main__": main()
