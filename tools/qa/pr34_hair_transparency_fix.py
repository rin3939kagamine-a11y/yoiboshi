#!/usr/bin/env python3
"""PR #34: remove only baked neutral backdrops in hair pockets.
Preserve all RGB values; edit the alpha channel only. No character regeneration.
"""
from pathlib import Path
import numpy as np
import cv2
from PIL import Image, ImageDraw
from scipy.ndimage import distance_transform_edt

ROOT = Path("assets/character_candidates/2026-11-08_animal_ear_trio")
ZONES = {
    "pink": [
        [(130,365),(160,327),(220,310),(295,310),(335,350),(380,385),(374,505),(333,595),(220,600),(128,505)],
        [(335,240),(418,245),(445,310),(415,375),(337,390),(295,347)],
        [(550,160),(658,155),(797,176),(819,230),(806,369),(755,445),(650,435),(558,347)],
    ],
    "leopard": [
        [(48,184),(152,175),(256,207),(310,292),(265,410),(310,560),(237,645),(98,632),(44,482),(20,290)],
        [(566,129),(724,125),(881,147),(980,265),(986,450),(871,605),(735,746),(609,740),(603,545),(552,427)],
        [(270,315),(345,270),(440,330),(540,300),(638,384),(637,585),(550,668),(330,627),(264,474)],
        [(130,530),(290,520),(365,610),(334,770),(134,755),(105,640)],
    ],
}

def fix(path, out_path, qa_path, kind):
    original = Image.open(path).convert("RGBA")
    assert original.size == (1024, 1536), f"Unexpected size: {path}: {original.size}"
    before = np.array(original)
    after = before.copy()
    rgb = before[:, :, :3].astype(np.int16)
    prior = before[:, :, 3].astype(np.float32)
    region = Image.new("L", original.size)
    draw = ImageDraw.Draw(region)
    for polygon in ZONES[kind]:
        draw.polygon(polygon, fill=255)
    roi = np.asarray(region) > 0
    floor = rgb.min(axis=2)
    chroma = rgb.max(axis=2) - floor
    candidate = (floor >= 229) & (chroma <= 18) & roi

    count, labels, stats, _ = cv2.connectedComponentsWithStats(candidate.astype("uint8"), 8)
    core = np.zeros_like(candidate)
    for label in range(1, count):
        size = int(stats[label, cv2.CC_STAT_AREA])
        if size < 14:
            continue
        component = labels == label
        white_fraction = float(np.mean(floor[component] >= 242))
        if size >= 70 or white_fraction >= 0.55:
            core[component] = True

    dist = distance_transform_edt(~core)
    rim = (dist <= 2.3) & (floor > 200) & (chroma <= 68) & roi & (~core) & (prior > 0)
    alpha = prior.copy()
    alpha[core] = 0
    edge_opacity = np.clip((chroma.astype(np.float32)-8)/65, 0, 1)
    edge_opacity *= np.clip((dist-0.2)/2.2, 0, 1)
    alpha[rim] = np.minimum(alpha[rim], prior[rim] * edge_opacity[rim])
    after[:, :, 3] = np.clip(np.rint(alpha), 0, 255).astype(np.uint8)

    # This is a pure transparency edit: no RGB, face, costume or pose pixel is repainted.
    assert np.array_equal(before[:, :, :3], after[:, :, :3])
    changed = int(np.count_nonzero(before[:, :, 3] != after[:, :, 3]))
    assert changed >= 50, f"Suspiciously few fixed alpha pixels: {path}: {changed}"
    fixed = Image.fromarray(after, "RGBA")
    fixed.save(out_path, optimize=True)
    assert fixed.getbbox() is not None
    qa_path.parent.mkdir(exist_ok=True, parents=True)
    navy = Image.new("RGBA", fixed.size, (18,24,38,255))
    navy.alpha_composite(fixed)
    navy.convert("RGB").save(qa_path, "JPEG", quality=87, optimize=True)
    verified = np.array(Image.open(out_path).convert("RGBA"))
    assert verified.shape == (1536, 1024, 4)
    assert np.array_equal(verified[:, :, :3], before[:, :, :3])
    print(f"{kind}: changed-alpha={changed}, core-bg={int(core.sum())}; RGB unchanged, RGBA 1024x1536, QA={qa_path}", flush=True)

def main():
    qa = ROOT / "qa_dark"
    fix(ROOT/"02_pink_bunny_dynamic.png", ROOT/"02_pink_bunny_dynamic_v2.png", qa/"02_pink_bunny_dark_preview.jpg", "pink")
    fix(ROOT/"01_leopard_cat_dynamic.png", ROOT/"01_leopard_cat_dynamic_v2.png", qa/"01_leopard_cat_dark_preview.jpg", "leopard")

if __name__ == "__main__":
    main()
