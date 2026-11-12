#!/usr/bin/env python3
"""Build transparent WebP sprites for the 74 additional heroines.

Reads historical source URLs from docs/heroine74_sources_v0690.json.
Keeps the entire original figure when normalizing full-body canvases.
"""
import io
import json
import math
import os
import time
import urllib.error
import urllib.request
from collections import deque
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "docs/heroine74_sources_v0690.json"
REPORT = ROOT / "docs/heroine74_asset_qa_v0690.json"
RAW_BASE = "https://raw.githubusercontent.com/"
Image.MAX_IMAGE_PIXELS = 60_000_000


def get_source(url):
    from urllib.parse import urlparse
    u = urlparse(url)
    fields = u.path.lstrip("/").split("/")
    if u.hostname != "github.com" or len(fields) < 6 or fields[2] != "blob":
        raise ValueError(f"Invalid GitHub blob URL: {url}")
    owner, repo, _, ref = fields[:4]
    source_path = "/".join(fields[4:])
    raw_url = f"{RAW_BASE}{owner}/{repo}/{ref}/{source_path}"
    error = None
    for attempt in range(4):
        try:
            req = urllib.request.Request(raw_url, headers={"User-Agent": "yoiboshi-asset-import/1.0"})
            with urllib.request.urlopen(req, timeout=65) as response:
                contents = response.read()
            with Image.open(io.BytesIO(contents)) as img:
                return img.convert("RGBA").copy(), raw_url
        except (urllib.error.URLError, OSError) as exc:
            error = exc
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"Image download failed for {raw_url}: {error}")


def strip_solid_edge_background(im):
    """Fallback only for fully opaque source PNGs.

    Flood-fill near the corner color, only from canvas edges.
    The two source images ramu/noi were supplied with already transparent
    replacements in the conversation; if that alpha is not available to
    the repository runner, this edge extraction is provisional.
    """
    if im.getchannel("A").getextrema()[0] < 250:
        return im, "source_alpha"
    im = im.copy()
    w, h = im.size
    pix = im.load()
    corners = [pix[0, 0], pix[w-1, 0], pix[0, h-1], pix[w-1, h-1]]
    bg = tuple(sorted(p[i] for p in corners)[2] for i in range(3))
    threshold = 34
    def similar(p):
        return sum((int(p[i])-bg[i])**2 for i in range(3)) <= threshold**2
    seen = bytearray(w*h)
    queue = deque()
    for x in range(w):
        for y in (0, h-1):
            idx=y*w+x
            if not seen[idx] and similar(pix[x,y]):
                seen[idx]=1
                queue.append((x,y))
    for y in range(h):
        for x in (0,w-1):
            idx=y*w+x
            if not seen[idx] and similar(pix[x,y]):
                seen[idx]=1
                queue.append((x,y))
    count=0
    while queue:
        x,y=queue.popleft()
        p=pix[x,y]
        pix[x,y]=(p[0],p[1],p[2],0)
        count+=1
        for xx,yy in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
            if 0<=xx<w and 0<=yy<h:
                idx=yy*w+xx
                if not seen[idx] and similar(pix[xx,yy]):
                    seen[idx]=1
                    queue.append((xx,yy))
    if count < int(w*h*0.03):
        raise RuntimeError("No transparent background and edge flood fill only removed "+str(count)+" pixels")
    return im, "edge_background_extraction"


def compose_contain(im, size, inset=4):
    sw,sh=size
    w,h=im.size
    f=min((sw-2*inset)/w,(sh-2*inset)/h)
    nw,nh=max(1,round(w*f)),max(1,round(h*f))
    scaled=im.resize((nw,nh),Image.Resampling.LANCZOS)
    canvas=Image.new("RGBA",size,(0,0,0,0))
    canvas.alpha_composite(scaled,((sw-nw)//2,(sh-nh)//2))
    return canvas


def crop_to_figure(im, top_fraction, canvas_size):
    alpha=im.getchannel("A")
    bounds=alpha.getbbox()
    if not bounds:
        raise ValueError("Source image is entirely transparent")
    left,top,right,bottom=bounds
    height=bottom-top
    crop_end=min(im.height,top+max(1,round(height*top_fraction)))
    crop=im.crop((0,max(0,top-12),im.width,crop_end))
    focus=crop.getchannel("A").getbbox()
    if not focus:
        raise ValueError("Upper crop has no subject")
    x0,y0,x1,y1=focus
    padding=max(24,round((x1-x0)*0.07))
    x0=max(0,x0-padding);x1=min(im.width,x1+padding)
    figure=crop.crop((x0,0,x1,crop.height))
    return compose_contain(figure,canvas_size,6)


def crop_face(im):
    bounds=im.getchannel("A").getbbox()
    if not bounds:
        raise ValueError("No visible person for face icon")
    x0,y0,x1,y1=bounds
    height=y1-y0
    head_end=min(im.height,y0+max(80,round(height*0.30)))
    head=im.crop((0,y0,im.width,head_end))
    hbox=head.getchannel("A").getbbox()
    if not hbox:
        raise ValueError("No head silhouette")
    hx0,_,hx1,_=hbox
    center=(hx0+hx1)/2
    square=max(1,round(height*0.29))
    cx0=int(round(center-square/2))
    cy0=max(0,y0-10)
    tile=Image.new("RGBA",(square,square),(0,0,0,0))
    source=im.crop((cx0,cy0,cx0+square,cy0+square))
    tile.alpha_composite(source)
    return tile.resize((400,400),Image.Resampling.LANCZOS)


def save_webp(im,path):
    path.parent.mkdir(parents=True,exist_ok=True)
    im.save(path,format="WEBP",quality=91,method=3,lossless=False)
    with Image.open(path) as check:
        assert check.size==im.size,(path,check.size,im.size)
        assert check.mode=="RGBA",(path,check.mode)
        assert check.getchannel("A").getextrema()[0]==0,(path,"no transparent margin")


def build_one(entry, i, total):
    id=entry["id"]
    original,uri=get_source(entry["source_url"])
    clean,method=strip_solid_edge_background(original)
    if not clean.getchannel("A").getbbox():
        raise ValueError("Source contains no figure")
    full=compose_contain(clean,(1024,1536),8)
    upper=crop_to_figure(clean,0.56,(768,1024))
    face=crop_face(clean)
    for typ,image in [("full_body",full),("upper_body",upper),("face_icons",face)]:
        save_webp(image,ROOT/"assets"/"ART_V2"/typ/(id+".webp"))
    print(f"{i:02d}/{total} PASS {id} {method}",flush=True)
    return dict(id=id,source=uri,source_size=list(original.size),
                alpha_method=method,output_full=[1024,1536],
                output_upper=[768,1024],output_face=[400,400],
                full_bbox=full.getchannel("A").getbbox())


def main():
    manifest=json.loads(MANIFEST.read_text(encoding="utf-8"))
    entries=manifest["entries"]
    assert len(entries)==74
    results=[]
    errors=[]
    with ThreadPoolExecutor(max_workers=5) as pool:
        pending={pool.submit(build_one,entry,i,len(entries)):entry
                 for i,entry in enumerate(entries,1)}
        for done in as_completed(pending):
            entry=pending[done]
            try:
                results.append(done.result())
            except Exception as exc:
                errors.append({"id":entry["id"],"error":str(exc)})
                print("FAIL",entry["id"],str(exc),flush=True)
    results.sort(key=lambda x: next(i for i,e in enumerate(entries) if e["id"]==x["id"]))
    REPORT.parent.mkdir(parents=True,exist_ok=True)
    REPORT.write_text(json.dumps(dict(total=len(entries),passed=len(results),
        failed=errors,results=results,
        notes=["Automated transparency/dimension QA only; browser visual QA not done",
               "Edge-extracted flat source backgrounds require visual review"]),
        ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    if errors:
        raise SystemExit(f"{len(errors)} of {len(entries)} images failed; not publishing incomplete asset set")
    print(f"PASS: {len(results)}/{len(entries)} * 3 = {len(results)*3} WebP files")


if __name__=="__main__":
    main()
