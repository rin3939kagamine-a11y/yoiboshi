#!/usr/bin/env python3
"""Five user-approved source images: preserve PNG blobs (blue: edge white-to-alpha only),
create cropped lossless WEBPs; assert visible pixels identical to the relevant full-body PNG.
"""
from collections import deque
from pathlib import Path
import json,hashlib,subprocess,shutil
from PIL import Image,ImageChops

ROOT=Path(__file__).resolve().parents[2]
SOURCES={
 'shiromiya_kotori':('docs/new_character_ideas/2026-11-16_white_bunny_standee/white_bunny_standee_transparent.png','bd66a7e1d59db452890062c8dcdd382dceb26965'),
 'hayakawa_aoba':('docs/new_character_ideas/2026-11-16_blue_top_standee/blue_top_game_style_candidate.png','88034371c68ffe3a2d2c496701815484ec3b106f'),
 'suzumiya_mia':('docs/new_character_ideas/2026-11-16_catgirl_standee/01_catgirl_standee_transparent.png','0f99a19640038270a00dad407700885187e0e354'),
 'yumemiya_yua':('docs/new_character_ideas/2026-11-16_pink_angel_idol_standee/01_pink_angel_idol_candidate.png','6664106f846d278717e6ba591ab14c1af6fe048b'),
 'tsukimiya_ayaka':('docs/new_character_ideas/2026-11-16_white_lavender_idol_standee/01_white_lavender_idol_candidate.png','58625bba1fc8547ca1ae2dc4bae244e3145a31c8')
}
OUT=ROOT/'qa_artifacts/five_r_v0950'
OUT.mkdir(parents=True,exist_ok=True)
def blob(path):
 return subprocess.check_output(['git','hash-object',str(path)],cwd=ROOT,text=True).strip()
def sha256(path):
 return hashlib.sha256(path.read_bytes()).hexdigest()
def remove_connected_white(image):
 """Only alpha removal on very light near-white regions connected to the canvas boundary.
    Never change any RGB channel or pixels not connected to the background."""
 im=image.convert('RGBA')
 w,h=im.size;px=im.load()
 seeds=((x,0) for x in range(w))
 from itertools import chain
 border=chain(seeds,((x,h-1) for x in range(w)),((0,y) for y in range(h)),((w-1,y) for y in range(h)))
 def bg(x,y):
  r,g,b,a=px[x,y]
  return a>=240 and min(r,g,b)>=245 and max(r,g,b)-min(r,g,b)<=10
 todo=deque();seen=bytearray(w*h)
 for x,y in border:
  k=y*w+x
  if not seen[k] and bg(x,y):
   seen[k]=1;todo.append((x,y))
 n=0
 while todo:
  x,y=todo.popleft()
  r,g,b,_=px[x,y];px[x,y]=(r,g,b,0);n+=1
  for nx,ny in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
   if 0<=nx<w and 0<=ny<h:
    k=ny*w+nx
    if not seen[k] and bg(nx,ny):
     seen[k]=1;todo.append((nx,ny))
 return im,n
def compare_visible_crop(source,dest):
 # WEBP lossless leaves visible RGB+alpha identical; unused RGB under zero alpha is immaterial.
 original=list(source.getdata());rendered=list(dest.convert('RGBA').getdata())
 assert len(original)==len(rendered)
 for i,(a,b) in enumerate(zip(original,rendered)):
  assert a[3]==b[3],('alpha crop changed',i,a,b)
  if a[3]: assert a[:3]==b[:3],('visible crop RGB changed',i,a,b)

result={}
for cid,(rel,expected) in SOURCES.items():
 src=ROOT/rel;dst=ROOT/'assets/ART_V2/full_body'/f'{cid}.png'
 assert src.is_file() and blob(src)==expected,(cid,'source missing/modified')
 with Image.open(src) as image:
  assert image.format=='PNG',(cid,'not PNG')
  original=image.convert('RGBA')
  w,h=original.size
  assert w>=720 and h>=960,(cid,'too small',image.size)
  if cid=='hayakawa_aoba':
   # Only transform an opaque, edge-connected white background. Otherwise exact copy.
   has_alpha=original.getchannel('A').getextrema()[0]<255
   if has_alpha:
    shutil.copyfile(src,dst)
    removed=0
   else:
    cleared,removed=remove_connected_white(original)
    if removed:
     cleared.save(dst,format='PNG',compress_level=9)
    else:
     shutil.copyfile(src,dst)
  else:
   shutil.copyfile(src,dst)
   removed=0
 assert cid=='hayakawa_aoba' or dst.read_bytes()==src.read_bytes(),(cid,'original altered')
 with Image.open(dst) as image: base=image.convert('RGBA')
 assert base.size==(w,h)
 if cid=='hayakawa_aoba':
  assert ImageChops.difference(base.convert('RGB'),original.convert('RGB')).getbbox() is None,'blue RGB pixels changed'
 alpha=base.getchannel('A')
 bounds=alpha.point(lambda a:255 if a>=96 else 0).getbbox()
 assert bounds,(cid,'no nontransparent subject')
 cx=(bounds[0]+bounds[2])//2
 top=max(0,bounds[1]-12)
 specs={'upper_body':(max(0,min(w-720,cx-360)),0,720,960),
        'face_icons':(max(0,min(w-400,cx-200)),min(h-400,top),400,400)}
 r={'source':rel,'source_blob':expected,'source_sha256':sha256(src),
    'full_body_blob':blob(dst),'full_body_sha256':sha256(dst),
    'source_size':[w,h],'source_mode':original.mode,'white_pixels_alpha_removed':removed,
    'crops':{}}
 for slot,(x,y,cw,ch) in specs.items():
  part=base.crop((x,y,x+cw,y+ch))
  target=ROOT/'assets/ART_V2'/slot/f'{cid}.webp'
  target.parent.mkdir(parents=True,exist_ok=True)
  part.save(target,format='WEBP',lossless=True,method=6)
  with Image.open(target) as restored:compare_visible_crop(part,restored)
  r['crops'][slot]={'box':[x,y,x+cw,y+ch],'sha256':sha256(target),'size':[cw,ch]}
 result[cid]=r
print(json.dumps({'count':len(result),'ids':list(result),'blue_removed_pixels':result['hayakawa_aoba']['white_pixels_alpha_removed']},ensure_ascii=False))
(OUT/'image_report.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
