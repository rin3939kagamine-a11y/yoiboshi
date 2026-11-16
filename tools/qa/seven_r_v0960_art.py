#!/usr/bin/env python3
"""v0960 original-preserving art pipeline: 4 byte-identical PNG, 3 RGB-preserving alpha masks,
and 14 lossless image crops. Original candidate PNGs are never edited."""
from collections import Counter, deque
from pathlib import Path
import hashlib, json, shutil, subprocess
from PIL import Image, ImageChops

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'qa_artifacts/seven_r_v0960'
OUT.mkdir(parents=True,exist_ok=True)
SOURCES={
'kuromiya_sera':('docs/new_character_ideas/2026-11-16_blue_gothic_standee/a1_blue_gothic.png','0cdd3b269343265c66baf08ee04266a58683b00a','keep'),
'haruno_hana':('docs/new_character_ideas/2026-11-16_floral_denim_standee/a2_denim_jacket.png','0e51a86d5f4d9af50b16f0b112befb32bea403e9','lavender'),
'komiya_anna':('docs/new_character_ideas/2026-11-16_side_twintail_standee/a3_side_twintails.png','435cd4d2315e94622cb96d15885e8f4816f13f85','checker'),
'hoshimiya_nemu':('docs/new_character_ideas/2026-11-16_pink_hoodie_standee/a4_pink_hoodie.png','847455e1e01aa2bc06e68b4d512bda716205d687','keep'),
'kumano_miku':('docs/new_character_ideas/2026-11-16_panda_sweat_standee/a5_panda_sweat.png','5406620fea37e73f059d45a7b8ea94b102d87438','white'),
'ichijo_maki':('docs/new_character_ideas/2026-11-16_blonde_bob_coat_standee/a6_blonde_bob.png','984b9a87f65a1601cc5dc57188b610bbdf450159','white'),
'natsukawa_yu':('docs/new_character_ideas/2026-11-16_jeans_wave_standee/a7_jeans.png','51660e7c1a80e1526a4d723b265c1ca9a1b7ef17','keep')
}
def gitsha(p):
 return subprocess.check_output(['git','hash-object',str(p)],cwd=ROOT,text=True).strip()
def sha256(p):
 return hashlib.sha256(p.read_bytes()).hexdigest()
def cut_background(original,mode):
 """Flood-fill only colors matching exterior background palettes; preserve every RGB pixel."""
 im=original.convert('RGBA')
 w,h=im.size;px=im.load()
 edge=[]
 for x in range(w):
  edge.append(px[x,0][:3]);edge.append(px[x,h-1][:3])
 for y in range(h):
  edge.append(px[0,y][:3]);edge.append(px[w-1,y][:3])
 # The border consists of one pastel shade, white, or two checkerboard shades.
 def quant(rgb): return tuple((v//12)*12 for v in rgb)
 counts=Counter(quant(p) for p in edge)
 palette=[p for p,n in counts.most_common(10) if n>=len(edge)*.025][:6]
 if not palette: palette=[counts.most_common(1)[0][0]]
 def bg(x,y):
  r,g,b,a=px[x,y]
  if a<20:return True
  if mode=='checker' and max(r,g,b)-min(r,g,b)<=16 and min(r,g,b)>=182:return True
  if mode=='white' and min(r,g,b)>=229 and max(r,g,b)-min(r,g,b)<=18:return True
  return any(max(abs(r-pr-6),abs(g-pg-6),abs(b-pb-6))<=27 for pr,pg,pb in palette)
 todo=deque();seen=bytearray(w*h)
 for x in range(w):
  for y in (0,h-1):
   k=y*w+x
   if not seen[k] and bg(x,y):seen[k]=1;todo.append(k)
 for y in range(h):
  for x in (0,w-1):
   k=y*w+x
   if not seen[k] and bg(x,y):seen[k]=1;todo.append(k)
 removed=0
 while todo:
  k=todo.popleft();x=k%w;y=k//w
  r,g,b,a=px[x,y]
  if a: px[x,y]=(r,g,b,0);removed+=1
  for n in (k-1 if x else -1,k+1 if x<w-1 else -1,k-w if y else -1,k+w if y<h-1 else -1):
   if n>=0 and not seen[n] and bg(n%w,n//w):seen[n]=1;todo.append(n)
 # Reject partial/background-only masks instead of silently committing bad images.
 frac=removed/(w*h)
 assert frac>=.12,(mode,'insufficient background removed',frac,palette)
 assert frac<=.90,(mode,'excessive background removed',frac,palette)
 assert im.getpixel((0,0))[3]==0,(mode,'corner not transparent')
 return im,removed,[[*rgb,n] for rgb,n in counts.most_common(5)]
def compare_crop(original,restored):
 a=list(original.convert('RGBA').getdata());b=list(restored.convert('RGBA').getdata())
 assert len(a)==len(b)
 for i,(x,y) in enumerate(zip(a,b)):
  assert x[3]==y[3],('crop alpha changed',i,x,y)
  if x[3]:assert x[:3]==y[:3],('visible RGB changed',i,x,y)
reports={}
for cid,(source,expected,mode) in SOURCES.items():
 src=ROOT/source;full=ROOT/'assets/ART_V2/full_body'/f'{cid}.png'
 assert src.is_file() and gitsha(src)==expected,(cid,'source SHA changed or absent')
 with Image.open(src) as im:
  assert im.format=='PNG'
  orig=im.convert('RGBA');w,h=orig.size
  assert w>=720 and h>=960,(cid,'source image too small',im.size)
  if mode=='keep':
   full.parent.mkdir(parents=True,exist_ok=True)
   shutil.copyfile(src,full);removed=0;pal=[]
  else:
   cleaned,removed,pal=cut_background(orig,mode)
   full.parent.mkdir(parents=True,exist_ok=True)
   cleaned.save(full,format='PNG',compress_level=9)
 with Image.open(full) as im:base=im.convert('RGBA')
 assert base.size==(w,h)
 assert ImageChops.difference(orig.convert('RGB'),base.convert('RGB')).getbbox() is None,(cid,'RGB changed')
 if mode=='keep':assert src.read_bytes()==full.read_bytes(),(cid,'original altered')
 else:assert base.getchannel('A').getextrema()[0]==0,(cid,'no transparency')
 # Crop based on original alpha bounding box for transparent sprites, retain exact source pixels.
 bounds=base.getchannel('A').point(lambda a:255 if a>=100 else 0).getbbox()
 assert bounds,(cid,'no opaque character pixels')
 cx=(bounds[0]+bounds[2])//2
 top=max(0,bounds[1]-12)
 boxes={'upper_body':(max(0,min(w-720,cx-360)),0,720,960),
        'face_icons':(max(0,min(w-400,cx-200)),min(h-400,top),400,400)}
 art={}
 for slot,(x,y,cw,ch) in boxes.items():
  crop=base.crop((x,y,x+cw,y+ch))
  dest=ROOT/'assets/ART_V2'/slot/f'{cid}.webp'
  dest.parent.mkdir(parents=True,exist_ok=True)
  crop.save(dest,format='WEBP',lossless=True,method=6)
  with Image.open(dest) as restored:compare_crop(crop,restored)
  art[slot]={'sha256':sha256(dest),'size':[cw,ch],'box':[x,y,x+cw,y+ch]}
 reports[cid]={'source':source,'source_git_sha':expected,'source_sha256':sha256(src),
  'source_dimensions':[w,h],'background':mode,'removed_pixels':removed,
  'full_sha256':sha256(full),'full_git_sha':gitsha(full),'crops':art,
  'preserved_RGB':True,'original_byte_identical':mode=='keep'}
print(json.dumps({'count':len(reports),'transparent':{k:v['removed_pixels'] for k,v in reports.items() if v['background']!='keep'},
 'originals_unchanged':sum(v['original_byte_identical'] for v in reports.values())},ensure_ascii=False))
(OUT/'art_report.json').write_text(json.dumps(reports,ensure_ascii=False,indent=2),encoding='utf-8')
