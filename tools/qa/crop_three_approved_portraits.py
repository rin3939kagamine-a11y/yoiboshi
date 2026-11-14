#!/usr/bin/env python3
"""Derive six conversation assets from the three exact approved full-body PNGs.

No generation, paint-over, background replacement, or source edits.
Run: python tools/qa/crop_three_approved_portraits.py [--generate|--verify]
"""
import argparse
import hashlib
import io
import json
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
SRC = {
    "sakakibara_kaho": (
        "assets/character_candidates/2026-11-12_rust_red_standee/full_body.png",
        "c87f6a6efcd54dbd4ae5e4c4cb3c1956be92793f8ba3c25713df7e3f61eb349e"
    ),
    "minase_ririka": (
        "assets/character_candidates/2026-11-12_brown_ponytail_white_lace/brown_ponytail_white_lace_full_body.png",
        "9bcb3d095fbbcf0ba53152d2b244df14056766e64ac946e01ebcb5b67f00f486"
    ),
    "tokiwa_aone": (
        "assets/provisional/2026-11-11_pink_underlayer_standee/full_body/pink_underlayer_black_street_v3_regenerated_CANDIDATE.png",
        "885a26ea2974115b7840101c17e85f84890faf19e2b364d7f726603a89183dc1"
    ),
}
# Visually examined against the exact SHA-matched originals on light + dark backgrounds.
# x0,y0,x1,y1 source coordinates. No head/eyes/face is outside either crop.
CROPS = {
    "upper_body": {"box": (212, 0, 812, 800), "size": (768, 1024)},
    "face_icons": {"box": (240, 0, 800, 560), "size": (400, 400)},
}
OUTPUT = ROOT / "qa_artifacts" / "approved_three_crops"

def sha(raw): return hashlib.sha256(raw).hexdigest()

def sprite_source(name):
    path, expected = SRC[name]
    raw = (ROOT / path).read_bytes()
    assert sha(raw) == expected, (name, "source SHA mismatch", sha(raw))
    im = Image.open(io.BytesIO(raw))
    assert im.format == "PNG" and im.mode == "RGBA" and im.size == (1024, 1536), (name, im.format, im.mode, im.size)
    assert im.getchannel("A").getextrema()[0] == 0
    return im

def crop_original(im, kind):
    spec = CROPS[kind]
    return im.crop(spec["box"]).resize(spec["size"], Image.Resampling.LANCZOS)

def destination(name, kind):
    return ROOT / "assets" / "ART_V2" / kind / (name + ".webp")

def check_crop(name, kind, expected, path):
    with Image.open(path) as art:
        assert art.format == "WEBP" and art.mode == "RGBA" and art.size == CROPS[kind]["size"], (path,art.format,art.mode,art.size)
        alpha = art.getchannel("A")
        assert alpha.getextrema()[0] == 0 and alpha.getextrema()[1] > 200, path
        assert alpha.getbbox(), path
        # A lossless WebP may clear invisible RGB: compare visible RGB/alpha against
        # the expected exact source crop. Color may differ by <= 1 at resampled edges.
        original = expected.convert("RGBA")
        derived = art.convert("RGBA")
        o = original.load()
        d = derived.load()
        width,height = original.size
        sampled = 0
        for y in range(0,height,3):
            for x in range(0,width,3):
                oa=o[x,y]; da=d[x,y]
                if oa[3] > 2:
                    assert all(abs(a-b) <= 1 for a,b in zip(oa,da)), (name,kind,x,y,oa,da)
                    sampled += 1
        assert sampled > 3000, (name,kind,sampled)
        # Head integrity at source top; no transparent checkerboard baked in.
        head_band = alpha.crop((0,0,width,min(height,round(height*.5))))
        assert head_band.getbbox(), (name,kind,"head missing")
        return {"size":list(art.size),"mode":art.mode,"alpha_range":list(alpha.getextrema()),
                "visible_pixels_sampled":sampled,"sha256":sha(path.read_bytes()),"bytes":path.stat().st_size}

def make_sheet(paths):
    # Composites are evidence only, never used as game assets.
    W,H=260,350
    out=Image.new("RGB",(6*W,2*H),(226,231,238))
    draw=ImageDraw.Draw(out)
    names=list(SRC)
    for i,name in enumerate(names):
        for j,kind in enumerate(CROPS):
            tile=i*2+j
            with Image.open(paths[(name,kind)]) as art:
                raw=art.convert("RGBA")
                raw.thumbnail((W-12,H-40))
                for row,bg in enumerate(((13,18,32,255),(233,236,242,255))):
                    x=tile*W+(W-raw.width)//2
                    y=row*H+8
                    canvas=Image.new("RGBA",raw.size,bg)
                    canvas.alpha_composite(raw)
                    out.paste(canvas.convert("RGB"),(x,y))
                    draw.text((tile*W+7,row*H+H-24),name+" "+kind,fill=((240,240,248) if row==0 else (23,27,34)))
    out.save(OUTPUT/"dark_light_contact_sheet.png")

if __name__=="__main__":
    ap=argparse.ArgumentParser()
    ap.add_argument("--generate",action="store_true")
    ap.add_argument("--verify",action="store_true")
    args=ap.parse_args()
    assert args.generate or args.verify
    OUTPUT.mkdir(parents=True,exist_ok=True)
    report={}
    files={}
    for name in SRC:
        original=sprite_source(name)
        report[name]={"original_sha256":SRC[name][1],"original_px":[1024,1536],"derived":{}}
        for kind in CROPS:
            expected=crop_original(original,kind)
            path=destination(name,kind)
            files[(name,kind)]=path
            if args.generate:
                path.parent.mkdir(parents=True,exist_ok=True)
                expected.save(path,format="WEBP",lossless=True,method=6)
            assert path.is_file(),path
            report[name]["derived"][kind]=check_crop(name,kind,expected,path)
    make_sheet(files)
    (OUTPUT/"result.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
    print("APPROVED THREE CROPS PASS",json.dumps(report,ensure_ascii=False),flush=True)
