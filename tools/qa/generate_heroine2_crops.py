#!/usr/bin/env python3
"""Derive transparent upper-body and face-icon WebP crops from APPROVED original PNGs.
This is deterministic cropping/resizing only, not image generation. Never modifies sources.
"""
from pathlib import Path
from PIL import Image
import hashlib
ROOT=Path(__file__).resolve().parents[2]
ORIGINALS={
  "sakakibara_kaho":"assets/character_candidates/2026-11-12_rust_red_standee/full_body.png",
  "minase_ririka":"assets/character_candidates/2026-11-12_brown_ponytail_white_lace/brown_ponytail_white_lace_full_body.png",
}
for name,source in ORIGINALS.items():
    raw=(ROOT/source).read_bytes()
    print("APPROVED_ORIGINAL",name,len(raw),hashlib.sha256(raw).hexdigest(),flush=True)
    im=Image.open(ROOT/source).convert("RGBA")
    assert im.size==(1024,1536)
    alpha=im.getchannel("A")
    assert alpha.getextrema()[0]==0, name
    # Fixed crop windows, preserving the head and torso against approved original.
    # These derivative thumbnails are QA candidates and require visual review.
    crop_definitions={
      "upper_body":((182,0,842,990),(512,768)),
      "face_icons":((262,55,762,555),(512,512)),
    }
    for kind,(region,size) in crop_definitions.items():
        dst=ROOT/"assets"/"ART_V2"/kind/(name+".webp")
        dst.parent.mkdir(parents=True,exist_ok=True)
        thumb=im.crop(region).resize(size,Image.Resampling.LANCZOS)
        thumb.save(dst,"WEBP",lossless=True,method=6)
        check=Image.open(dst)
        assert check.size==size and check.mode=="RGBA",(name,kind,check.size,check.mode)
        assert check.getchannel("A").getextrema()[0]==0,(name,kind,"missing transparent pixels")
        content=dst.read_bytes()
        print("DERIVED_CROP",name,kind,len(content),hashlib.sha256(content).hexdigest(),flush=True)
