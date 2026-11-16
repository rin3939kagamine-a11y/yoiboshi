#!/usr/bin/env python3
"""Remove connected flat-white source backgrounds; preserve white garments and original pixels.

This is algorithmic alpha extraction, not image regeneration. Inputs remain unmodified.
Output: 10 RGBA lossless WEBP portraits + JPEG comparison previews for human QA.
"""
from __future__ import annotations
import hashlib
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "docs/new_character_ideas/2026-11-16_sr_batch1"
DEST = ROOT / "assets/UNIT_ART"
PREVIEW = ROOT / "docs/qa/sr_batch1_previews"
REPORT = ROOT / "qa_artifacts/sr_batch1"
NAMES = {
    "kaori": "kaori_concert",
    "rui": "rui_atelier",
    "suzune": "suzune_enbu",
    "chikage": "chikage_holiday",
    "sumire": "sumire_classic",
    "wakaba": "wakaba_midnight",
    "mitsuki": "mitsuki_ca",
    "komugi": "komugi_ehon",
    "haruka": "haruka_bride",
    "kirie": "kirie_koubou",
}

def outside_connected(rgb: np.ndarray) -> np.ndarray:
    # White surroundings are inferred ONLY by border connectivity; white clothing
    # enclosed by its painted outlines remains opaque even if pure #FFFFFF.
    lo = rgb.min(axis=2)
    hi = rgb.max(axis=2)
    possible = ((lo >= 234) & ((hi.astype(np.int16) - lo.astype(np.int16)) <= 19)).astype(np.uint8)
    count, labels = cv2.connectedComponents(possible, connectivity=4)
    edges = np.concatenate((labels[0], labels[-1], labels[:, 0], labels[:, -1]))
    edge_labels = np.unique(edges)
    edge_labels = edge_labels[edge_labels != 0]
    exterior = np.isin(labels, edge_labels) & (possible > 0)
    return exterior

def preview_image(src: Image.Image, result: Image.Image, key: str) -> None:
    sample_height = 620
    def scaled(p):
        q=p.copy()
        q.thumbnail((460, sample_height), Image.Resampling.LANCZOS)
        return q
    s = scaled(src.convert("RGB"))
    cut = scaled(result)
    checker = Image.new("RGB", (460, sample_height), (235, 235, 235))
    draw = ImageDraw.Draw(checker)
    for y in range(0, sample_height, 30):
        for x in range(0, 460, 30):
            if (x // 30 + y // 30) % 2 == 0:
                draw.rectangle((x,y,x+29,y+29),fill=(205,205,205))
    checker.paste(cut, ((460-cut.width)//2, (sample_height-cut.height)//2), cut)
    sheet=Image.new("RGB",(920,650),"#ebebeb")
    sheet.paste(s,((460-s.width)//2,(sample_height-s.height)//2))
    sheet.paste(checker,(460,0))
    ImageDraw.Draw(sheet).text((12,626),f"{key}: original (left) / alpha on checkerboard (right)",fill=(40,40,40))
    sheet.save(PREVIEW / f"{key}.jpg",format="JPEG",quality=78,optimize=True)

def process(key: str, unit: str) -> dict:
    src = SOURCE / f"{key}_sr.png"
    raw = src.read_bytes()
    with Image.open(src) as image:
        original = image.convert("RGB")
    rgb = np.asarray(original, dtype=np.uint8)
    h,w=rgb.shape[:2]
    # Background must be white at all corners; this is a flat-white-only processor.
    corners=np.concatenate([rgb[:12,:12,:].reshape(-1,3),rgb[:12,-12:,:].reshape(-1,3),
                            rgb[-12:,:12,:].reshape(-1,3),rgb[-12:,-12:,:].reshape(-1,3)])
    assert (corners.min(axis=1)>=226).mean()>=0.96,(key,"non-white source corners")
    exterior=outside_connected(rgb)
    fg=(~exterior).astype(np.uint8)
    # Soft antialiasing is applied only on the silhouette edge. No white pixels
    # within the enclosed foreground can become transparent.
    inward=cv2.distanceTransform(fg,cv2.DIST_L2,3)
    alpha=np.minimum(255,np.round(inward * 162)).astype(np.uint8)
    # Preserve all ink and garment outlines fully opaque, even on the silhouette boundary.
    alpha[(~exterior) & (rgb.min(axis=2)<225)] = 255
    # Corner pixels should be transparent; all non-white drawing must survive.
    corner_alpha=np.r_[alpha[:10,:10].ravel(),alpha[:10,-10:].ravel(),
                        alpha[-10:,:10].ravel(),alpha[-10:,-10:].ravel()]
    assert np.mean(corner_alpha==0)>.95,(key,"nontransparent corners")
    dark=(rgb.min(axis=2)<195)
    lost=np.count_nonzero(dark & (alpha<220))
    ratio=lost/max(1,np.count_nonzero(dark))
    assert ratio<0.004,(key,"dark ink removed",ratio)
    bbox=cv2.findNonZero((alpha>20).astype(np.uint8))
    assert bbox is not None,(key,"no subject")
    x,y,ww,hh=cv2.boundingRect(bbox)
    assert ww>.23*w and hh>.55*h,(key,"subject unexpectedly small",ww,hh,w,h)
    assert exterior.mean()>.08,(key,"background wasn't removed",exterior.mean())
    rgba=np.dstack((rgb,alpha))
    result=Image.fromarray(rgba,"RGBA")
    output=DEST/f"{unit}.webp"
    result.save(output,format="WEBP",lossless=True,method=6)
    with Image.open(output) as verify:
        assert verify.mode=="RGBA" and verify.size==(w,h),(key,"output invalid")
        assert np.array_equal(np.asarray(verify.convert("RGBA"))[:,:,3],alpha),(key,"alpha changed")
    preview_image(original,result,key)
    stats={"unit":unit,"source_sha256":hashlib.sha256(raw).hexdigest(),
           "source_pixels":[w,h],"format":"WEBP RGBA lossless",
           "transparent_background_pct":round(float(exterior.mean()*100),2),
           "dark_pixel_loss_pct":round(float(ratio*100),4),
           "bbox_xywh":[x,y,ww,hh],
           "output_sha256":hashlib.sha256(output.read_bytes()).hexdigest(),
           "source_size":len(raw),"output_size":output.stat().st_size}
    print(json.dumps({key:stats},ensure_ascii=False))
    return stats

def main():
    for folder in [DEST,PREVIEW,REPORT]: folder.mkdir(parents=True,exist_ok=True)
    data={key:process(key,unit) for key,unit in NAMES.items()}
    (REPORT/"art_qa.json").write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding="utf-8")
    print("PASS 10 white-background sources transformed to lossless RGBA WEBP without generating new art")
if __name__=="__main__": main()
