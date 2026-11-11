from pathlib import Path
from PIL import Image,ImageDraw
import numpy as np,cv2
ROOT=Path("assets/character_candidates/2026-11-08_animal_ear_trio")
QA=ROOT/"qa_dark"
QA.mkdir(parents=True,exist_ok=True)
for kind,stem in [("leopard","01_leopard_cat_dynamic"),("pink","02_pink_bunny_dynamic")]:
    source=np.array(Image.open(ROOT/(stem+"_v2.png")).convert("RGBA"))
    h,w=source.shape[:2]
    assert (w,h)==(1024,1536)
    bg=Image.new("RGBA",(w,h),(4,5,9,255))
    bg.alpha_composite(Image.fromarray(source,"RGBA"))
    bg.convert("RGB").save(QA/(stem+"_source_v2_black.jpg"),quality=90)
    box=(260,170,455,345) if kind=="leopard" else (110,150,825,605)
    crop=bg.crop(box)
    crop=crop.resize((crop.width*3,crop.height*3),Image.Resampling.LANCZOS)
    crop.convert("RGB").save(QA/(stem+"_source_v2_hair_detail.jpg"),quality=95)
    rgb=source[:,:,:3].astype(np.float32)
    a=source[:,:,3]
    neutral=(rgb.min(2)>220)&(rgb.max(2)-rgb.min(2)<35)&(a>140)
    n,labels,stats,_=cv2.connectedComponentsWithStats(neutral.astype(np.uint8),8)
    ranked=[]
    for i in range(1,n):
        x,y,ww,hh,count=map(int,stats[i])
        if count<7:continue
        if kind=="leopard" and x<500 and y<370 and x+ww>255 and y+hh>165:
            ranked.append((count,x,y,ww,hh))
    print(kind,"alpha0",int((a==0).sum()),"alpha255",int((a==255).sum()),flush=True)
    if kind=="leopard":print("LEOPARD CANDIDATES:",sorted(ranked,reverse=True)[:50],flush=True)
