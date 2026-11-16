#!/usr/bin/env python3
"""Convert ten approved white-background PNGs into opaque-silhouette RGBA WEBPs.

Only the border-connected near-white background is removed. All enclosed white/
pale costume pixels remain fully opaque, with no translucent internal regions.
This operates on existing artwork; it does not regenerate or recolor the source.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "docs/new_character_ideas/2026-11-17_sr_batch2"
DEST = ROOT / "assets/UNIT_ART"
REPORT = ROOT / "qa_artifacts/sr_batch2"
NAMES = {
    "urara": "urara_izakaya",
    "mizore": "mizore_cinema",
    "ayane": "ayane_market",
    "miyu": "miyu_hakama",
    "arisa": "arisa_show",
    "kotoha": "kotoha_atelier",
    "yukino": "yukino_trip",
    "nene": "nene_staff",
    "yukari": "yukari_silver",
    "ruru": "ruru_dollshop",
}
NAVY = (11, 20, 48)


def exterior_mask(rgb: np.ndarray) -> np.ndarray:
    low, high = rgb.min(axis=2), rgb.max(axis=2)
    # Border-adjacent neutral white only; never global white-key extraction.
    possible = ((low >= 232) & ((high.astype(np.int16) - low.astype(np.int16)) <= 21)).astype("uint8")
    _, labels = cv2.connectedComponents(possible, connectivity=4)
    border_labels = np.unique(np.r_[labels[0], labels[-1], labels[:, 0], labels[:, -1]])
    return (possible > 0) & np.isin(labels, border_labels[border_labels > 0])


def convert(name: str, unit_id: str) -> dict:
    source_path = SOURCE / f"{name}_sr.png"
    source_bytes = source_path.read_bytes()
    rgb = np.asarray(Image.open(source_path).convert("RGB"), dtype=np.uint8)
    height, width = rgb.shape[:2]
    corner = np.concatenate((rgb[:12, :12].reshape(-1, 3),
                             rgb[:12, -12:].reshape(-1, 3),
                             rgb[-12:, :12].reshape(-1, 3),
                             rgb[-12:, -12:].reshape(-1, 3)))
    assert (corner.min(axis=1) >= 226).mean() > 0.96, (name, "nonwhite source corners")

    exterior = exterior_mask(rgb)
    # Close one-pixel interruptions in drawn outlines, then fill enclosed
    # spaces. This retains pale cloth, lace, veils and dress interiors.
    binary = (~exterior).astype("uint8")
    closed = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    alpha = np.zeros((height, width), dtype="uint8")
    cv2.drawContours(alpha, [c for c in contours if cv2.contourArea(c) > 10], -1, 255, -1)
    # Crisp, fully opaque subject: no partially transparent internal fabric.
    assert np.all((alpha == 0) | (alpha == 255)), (name, "partial alpha")
    assert exterior.mean() > 0.10, (name, "background still present")

    ink = rgb.min(axis=2) < 195
    lost_ink = int(np.count_nonzero(ink & (alpha == 0)))
    ink_total = int(np.count_nonzero(ink))
    assert lost_ink / max(1, ink_total) < 0.001, (name, "original dark pixels lost", lost_ink)
    where = cv2.findNonZero(alpha)
    assert where is not None, (name, "subject removed")
    x, y, bw, bh = cv2.boundingRect(where)
    assert bw > width * 0.22 and bh > height * 0.55, (name, "unexpectedly small silhouette")
    assert np.mean(alpha[:9, :9] == 0) == 1, (name, "corner not transparent")

    rgba = Image.fromarray(np.dstack((rgb, alpha)), "RGBA")
    destination = DEST / f"{unit_id}.webp"
    rgba.save(destination, format="WEBP", lossless=True, method=6, exact=True)
    reopened = np.asarray(Image.open(destination).convert("RGBA"))
    assert np.array_equal(reopened[:, :, 3], alpha), (name, "WEBP alpha mismatch")
    assert np.array_equal(reopened[alpha == 255, :3], rgb[alpha == 255]), (name, "color shift")

    # Dark-background comparison. Underlying RGB is unchanged where the original
    # character is retained, and all surviving silhouette pixels are fully opaque.
    navy = np.array(NAVY, dtype=np.float32)
    composite = reopened[:, :, :3].astype(np.float32) * (reopened[:, :, 3:4] / 255.0) \
                + navy * (1.0 - reopened[:, :, 3:4] / 255.0)
    max_delta = int(np.abs(composite[alpha == 255] - rgb[alpha == 255]).max())
    assert max_delta == 0, (name, "dark composite differs from source inside silhouette")

    source_preview = Image.fromarray(rgb).resize((342, 513), Image.Resampling.LANCZOS)
    cut_preview = rgba.resize((342, 513), Image.Resampling.LANCZOS)
    dark_preview = Image.new("RGB", (342, 513), NAVY)
    dark_preview.paste(cut_preview, (0, 0), cut_preview.getchannel("A"))
    panel = Image.new("RGB", (684, 545), "#eeeeee")
    panel.paste(source_preview, (0, 0))
    panel.paste(dark_preview, (342, 0))
    ImageDraw.Draw(panel).text((12, 521), f"{name}: original / dark navy RGBA overlay", fill="black")
    panel.save(REPORT / f"{name}_before_after.jpg", format="JPEG", quality=88, optimize=True)

    data = {
        "unit_id": unit_id,
        "source": str(source_path.relative_to(ROOT)),
        "dimensions": [width, height],
        "semi_transparent": int(np.count_nonzero((alpha > 0) & (alpha < 255))),
        "opaque_pixels": int(np.count_nonzero(alpha == 255)),
        "transparent_background_pct": round(float((alpha == 0).mean() * 100), 3),
        "original_dark_pixels_lost": lost_ink,
        "dark_pixel_loss_pct": round(lost_ink / max(1, ink_total) * 100, 4),
        "interior_holes_filled": int(np.count_nonzero((closed > 0) & (alpha == 0))),
        "dark_overlay_color_delta_max": max_delta,
        "silhouette_bbox": [x, y, bw, bh],
        "source_sha256": hashlib.sha256(source_bytes).hexdigest(),
        "output_sha256": hashlib.sha256(destination.read_bytes()).hexdigest(),
    }
    print(json.dumps({name: data}, ensure_ascii=False), flush=True)
    return data


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    REPORT.mkdir(parents=True, exist_ok=True)
    result = {name: convert(name, unit) for name, unit in NAMES.items()}
    (REPORT / "art_report.json").write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print("PASS: 10 original silhouettes preserved, dark navy verified, no partial alpha")


if __name__ == "__main__":
    main()
