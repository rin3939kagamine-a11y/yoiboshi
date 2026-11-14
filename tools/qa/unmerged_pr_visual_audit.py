#!/usr/bin/env python3
"""Inventory unmerged PR art by immutable blob, create visual contact sheets; analysis only."""
import io, os, re, json, time, urllib.request, subprocess, math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
REPO="rin3939kagamine-a11y/yoiboshi"
ROOT=Path(__file__).resolve().parents[2]
DEST=ROOT/"audit"/"unmerged_20261114"
DEST.mkdir(parents=True,exist_ok=True)
TOKEN=os.getenv("GH_TOKEN","")
def api(path):
    req=urllib.request.Request(f"https://api.github.com/repos/{REPO}/{path}",headers={"Accept":"application/vnd.github+json","Authorization":"Bearer "+TOKEN,"User-Agent":"yoiboshi-audit"})
    with urllib.request.urlopen(req,timeout=90) as response:return json.load(response)
def git(*args,**kwargs):return subprocess.run(["git",*args],cwd=ROOT,capture_output=True,check=True,**kwargs).stdout
main_blobs={line.split(b"\t",1)[0].split(b" ")[2].decode() for line in git("ls-tree","-r","HEAD").splitlines() if b" blob " in line}
prs=[]
page=1
while True:
    batch=api(f"pulls?state=open&per_page=100&page={page}")
    prs+=batch
    if len(batch)<100:break
    page+=1
records=[];errors=[]
for pr in sorted(prs,key=lambda x:x["number"]):
    num=pr["number"]
    files=[];page=1
    while True:
        rr=api(f"pulls/{num}/files?per_page=100&page={page}")
        files+=rr
        if len(rr)<100:break
        page+=1
    pictures=[x for x in files if re.search(r"\.(png|webp|jpg|jpeg)$",x["filename"],re.I) and x["status"]!="removed" and not re.search(r"(?:qa_dark/|previews/|/preview|_detail\.|_black\.|_gray\.|_navy\.|dark_preview)",x["filename"],re.I)]
    if not pictures:continue
    # Fetch the PR's current head rather than guessing from previously read branch refs.
    try:git("fetch","--quiet","--no-tags","origin",f"+refs/pull/{num}/head:refs/remotes/pr/{num}")
    except Exception as e:errors.append({"pr":num,"error":"fetch failed "+str(e)});continue
    for f in pictures:
        path=f["filename"]
        if f["sha"] in main_blobs:
            records.append({"pr":num,"file":path,"sha":f["sha"],"in_main_by_identical_blob":True})
            continue
        try:
            raw=git("show",f"refs/remotes/pr/{num}:{path}")
            im=Image.open(io.BytesIO(raw)).convert("RGBA")
            if im.width<300 or im.height<300:continue
            thumb=im.copy();thumb.thumbnail((206,270),Image.Resampling.LANCZOS)
            rgba=Image.new("RGBA",thumb.size,(239,240,244,255));rgba.alpha_composite(thumb)
            thumb=rgba.convert("RGB")
            # 64-bit difference hash for repeat candidates only, never identification by itself.
            gray=im.convert("L").resize((9,8),Image.Resampling.LANCZOS)
            pix=list(gray.getdata())
            bits=0
            for y in range(8):
                for x in range(8):bits=(bits<<1)|(1 if pix[y*9+x]>pix[y*9+x+1] else 0)
            obj={"pr":num,"file":path,"sha":f["sha"],"in_main_by_identical_blob":False,"dimensions":list(im.size),"dhash":f"{bits:016x}"}
            records.append(obj)
            thumb.save(DEST/f"thumb_{len(records):03d}.jpg",quality=80)
            obj["thumbnail_file"]=f"thumb_{len(records):03d}.jpg"
        except Exception as e:errors.append({"pr":num,"path":path,"error":str(e)})
all_records=[x for x in records if not x["in_main_by_identical_blob"]]
W,H=238,320;C,R=5,4
font=ImageFont.load_default()
for start in range(0,len(all_records),C*R):
    part=all_records[start:start+C*R]
    sheet=Image.new("RGB",(W*C,H*R),(244,246,250))
    dr=ImageDraw.Draw(sheet)
    for idx,rec in enumerate(part):
        x=(idx%C)*W;y=(idx//C)*H
        im=Image.open(DEST/rec["thumbnail_file"]).convert("RGB")
        sheet.paste(im,(x+(W-im.width)//2,y+2))
        lab=f'#{rec["pr"]} {len(all_records) and (start+idx+1):02d} {Path(rec["file"]).stem}'
        dr.text((x+5,y+278),lab[:35],fill=(0,0,0),font=font)
        dr.text((x+5,y+295),rec["sha"][:12],fill=(80,80,80),font=font)
    sheet.save(DEST/f"contact_{start//(C*R)+1:02d}.jpg",quality=88,optimize=True)
# pairwise perceptual repeat suggestions, not declared identical without vision review.
def dist(a,b):return (int(a,16)^int(b,16)).bit_count()
suggest=[]
for i,x in enumerate(all_records):
  for y in all_records[i+1:]:
    if x["pr"]==y["pr"]:continue
    dd=dist(x["dhash"],y["dhash"])
    if dd<=14:suggest.append({"pr_a":x["pr"],"file_a":x["file"],"pr_b":y["pr"],"file_b":y["file"],"distance":dd,"same_blob":x["sha"]==y["sha"]})
info={"created_from":"GitHub Pull API and exact PR refs","scope":"open unmerged PR images, excludes identical binary already in main and QA previews","open_prs":len(prs),"source_records":len(records),"excluded_main":len(records)-len(all_records),"unique_files":len(all_records),"image_records":records,"perceptual_suggestions":sorted(suggest,key=lambda x:x["distance"]),"errors":errors}
(DEST/"report.json").write_text(json.dumps(info,ensure_ascii=False,indent=2),encoding="utf-8")
(DEST/"README.md").write_text(f"# Unmerged PR character art visual audit\n\nOpen PRs scanned: {len(prs)}. Source image records: {len(records)}. Same binary already in main: {len(records)-len(all_records)}. Not in main: {len(all_records)}. Contact sheets: {math.ceil(len(all_records)/(C*R))}.\n\nThis is a *visual QA inventory* not proof that two different illustrations portray the same fictional person. Same blob is proven by Git SHA. Visually similar characters need human review.\n",encoding="utf-8")
print(json.dumps({k:info[k] for k in ["open_prs","source_records","excluded_main","unique_files"]},ensure_ascii=False))
print("Potential cross-PR matches:",len(suggest),"errors",errors[:8])


# Group only demonstrably identical-character revisions within the same PR:
# PR34: 01 leopard cat v1/v2/v3 and 02 pink bunny v1/v2/v3;
# PR64: the explicitly versioned same-character pink-inner standee v1/v2/v3.
# Cross-PR identity is not proven by filenames, visual similarity or dHash.
group_map={}
for row in all_records:
    n=row["pr"];p=Path(row["file"]).name
    if n==34 and p.startswith("01_leopard_cat_dynamic"):key="34:01_leopard"
    elif n==34 and p.startswith("02_pink_bunny_dynamic"):key="34:02_bunny"
    elif n==64 and p.startswith("pink_underlayer_black_street_v"):key="64:pink_underlayer"
    else:key=f'{n}:{row["file"]}'
    group_map.setdefault(key,[]).append(row)
groups=[{"group_id":f"G{i:03d}","pr_numbers":sorted(set(x["pr"] for x in values)),"files":[{"pr":x["pr"],"path":x["file"],"sha":x["sha"]} for x in values],"anchor":Path(values[-1]["file"]).stem} for i,values in enumerate(group_map.values(),1)]
assert len(groups)==len(all_records)-6,("variant reduction should be 6",len(groups),len(all_records))
(DEST/"groups_provisional.json").write_text(json.dumps({"count_groups":len(groups),"evidence_scope":"2 within-PR version series plus 1 regenerated v3 series; any further cross-PR overlap unproven","groups":groups},ensure_ascii=False,indent=2),encoding="utf-8")
md=["# 未マージPRの人物画像・重複整理（2026-11-14）","",
    "**注意：以下は画像の暫定候補グループであり、71人の独立した人物が確定したことを意味しない。**",
    "GitHubの現在OpenのPRを走査。mainとバイナリ完全一致の画像は除外。明示的なv1/v2/v3再制作と同じ衣装・容姿が認められる3系列だけを束ね、PRをまたぐ同一人物は人物設定・IDの証拠がないため未確定とした。",
    f"Open PR {len(prs)}件、対象画像 {len(all_records)}点、版違い3系列をまとめて**暫定{len(groups)}グループ**。**PR間の同一人物確定束ねは0組**。","",
    "| 仮グループ | PR | 画像パス（各行Git blob SHA） |","|---|---|---|"]
for group in groups:
    detail="<br>".join("`"+f["path"]+"` (`"+f["sha"][:12]+"`)" for f in group["files"])
    md.append(f'| {group["group_id"]} | '+", ".join("#"+str(x) for x in group["pr_numbers"])+f" | {detail} |")
md += ["","## 目視の曖昧な候補（同一人物と断定せず）",
        "- #58 `01_black_sweat_peace.png` と #64 `pink_underlayer_black_street_v3_regenerated_CANDIDATE.png`：黒いオーバーサイズトップスという衣装モチーフが似るが、髪の色分布・襟袖・ポーズが異なり、同一人物の証拠はない。",
        "- #38 `04_navy_business_suit.png` と #59 `01_black_suit.png`：短髪スーツという構成のみ共通し、同一人物とは判定不能。",
        "- #38 `05_light_blue_workwear.png` と #59 `03_blue_shirt.png`：青いトップスと短髪が共通するが、視覚同一性は未確定。",
        "- #58 `09_cat_knit_hat_twintails.png` と #75 `03_cat_cap_denim_shorts.png`：猫柄帽子の意匠が似るが衣装・髪形が異なり未確定。",
        "",
        "## 証跡",
        "連絡表 `contact_01.jpg`〜`contact_04.jpg`、全画像のGit blob・dimとdHash `report.json`、グループの正規化 `groups_provisional.json`。dHash値だけでは人物同一性を証明できない。",
        "ゲーム本体・既存キャラ・セーブ・ガチャに変更なし。"]
(DEST/"GROUPS.md").write_text("\n".join(md)+"\n",encoding="utf-8")
print("GROUPS PROVISIONAL",len(groups),"cross-PR confirmed",0,flush=True)
