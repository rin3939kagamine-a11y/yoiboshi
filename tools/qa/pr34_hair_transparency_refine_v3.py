#!/usr/bin/env python3
"""Precise transparency-only PR34 pass. No image regeneration and no RGB edits."""
from pathlib import Path
import cv2
import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import distance_transform_edt

ROOT=Path("assets/character_candidates/2026-11-08_animal_ear_trio")
MASKS={
 "leopard":[
  [(18,130),(245,120),(346,164),(401,227),(404,275),(355,290),(390,375),(500,485),(500,630),(238,750),(20,575)],
  [(525,105),(782,90),(1000,145),(1010,550),(755,720),(603,695),(540,575)]
 ],
 "pink":[
  [(105,190),(335,185),(422,237),(406,340),(403,570),(130,650),(75,415)],
  [(550,120),(804,130),(853,280),(812,462),(565,450)]
 ]
}

def polygon_mask(size, regions):
    img=Image.new("L",size,0)
    drawer=ImageDraw.Draw(img)
    for vertices in regions:drawer.polygon(vertices,fill=255)
    return np.array(img)>0

def refine(label,stem):
    source=ROOT/(stem+"_v2.png")
    old=np.array(Image.open(source).convert("RGBA"))
    assert old.shape==(1536,1024,4)
    rgb=old[:,:,:3].astype(np.float32)
    alpha=old[:,:,3].astype(np.float32)
    out=alpha.copy()
    minimum=rgb.min(2)
    chroma=rgb.max(2)-minimum
    brightness=rgb.mean(2)
    hair=polygon_mask((1024,1536),MASKS[label])

    if label=="leopard":
        # Precisely identified background components, not skin, nails or highlights.
        mask=(minimum>220)&(chroma<35)&(alpha>140)
        count,comp,stats,_=cv2.connectedComponentsWithStats(mask.astype(np.uint8),8)
        specs=[(349,244,397,295,450),(394,237,411,281,110),(385,260,397,290,50)]
        white=np.zeros(alpha.shape,dtype=bool)
        for x1,y1,x2,y2,min_size in specs:
            matches=[]
            for i in range(1,count):
                x,y,w,h,n=stats[i]
                if n>=min_size and x>=x1 and y>=y1 and x+w<=x2 and y+h<=y2:
                    matches.append(i)
            print(f"background island {x1},{y1}: components={matches}",flush=True)
            for i in matches:white|=(comp==i)
        assert white.sum()>700, "Background island mismatch: avoid unintended modifications"
        out[white]=0
        distance=distance_transform_edt(~white)
        boundary=(distance>0)&(distance<=2.1)&hair&(alpha>0)
        neutral=np.clip((brightness-208)/39,0,1)*np.clip((65-chroma)/59,0,1)
        fade=np.clip((2.4-distance)/1.4,0,1)*neutral
        out[boundary]=out[boundary]*(1-fade[boundary])

    # Fine white-fringe cleanup restricted to existing transparent hair-hole edges.
    distance=distance_transform_edt(~(alpha<3))
    edge=(distance<=2.5)&hair&(alpha>=3)
    whiteness=np.clip((brightness-222)/29,0,1)*np.clip((56-chroma)/55,0,1)
    whiteness*=np.clip((3-distance)/2,0,1)
    out[edge]*=(1-whiteness[edge])
    result=old.copy()
    result[:,:,3]=np.uint8(np.clip(np.rint(out),0,255))
    assert np.array_equal(result[:,:,:3],old[:,:,:3]),"RGB colors MUST remain unchanged"
    assert np.all(result[:,:,3]<=old[:,:,3]),"Alpha must not increase"
    changed=int(np.count_nonzero(result[:,:,3]!=old[:,:,3]))
    assert changed>100
    dest=ROOT/(stem+"_v3.png")
    Image.fromarray(result,"RGBA").save(dest,optimize=True)
    assert np.array(Image.open(dest)).shape==(1536,1024,4)
    print(f"{label}: changed-alpha={changed} RGB-exact=true RGBA=1024x1536",flush=True)

    folder=ROOT/"qa_dark"
    folder.mkdir(exist_ok=True)
    for background,color in (("black",(4,5,9,255)),("navy",(17,21,33,255)),("gray",(109,114,120,255))):
        base=Image.new("RGBA",(1024,1536),color)
        base.alpha_composite(Image.fromarray(result,"RGBA"))
        base.convert("RGB").save(folder/(stem+f"_v3_{background}.jpg"),quality=91,optimize=True)
        if background=="black":
            if label=="leopard":
                crop=(245,142,495,359)
            else:
                crop=(110,158,850,602)
            detail=base.crop(crop)
            detail=detail.resize((detail.width*2,detail.height*2),Image.Resampling.LANCZOS)
            detail.convert("RGB").save(folder/(stem+"_v3_hair_detail.jpg"),quality=93,optimize=True)

if __name__=="__main__":
    refine("leopard","01_leopard_cat_dynamic")
    refine("pink","02_pink_bunny_dynamic")
