#!/usr/bin/env python3
"""Deterministic, lossless portraits from PR #60-approved PNGs (source untouched)."""
from pathlib import Path
import hashlib
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SOURCES = {
    "chiyozaki_suzuha": {
        "sha256": "d16fe4f76da2c553a17e9500ac05e10e1f20eeed58faef0980d2eb1e9ad9f02f",
        "upper": (145, 0, 865, 960),
        "face": (315, 15, 715, 415),
    },
    "sakuraba_renka": {
        "sha256": "32d0177cc3f1c7a5f3a0469b93031a82d835e1343a84f67e4417f605f37b00fd",
        "upper": (165, 20, 885, 980),
        "face": (350, 80, 750, 480),
    },
}

def run():
    for hero, spec in SOURCES.items():
        src = ROOT / "assets" / "ART_V2" / "full_body" / f"{hero}.png"
        digest = hashlib.sha256(src.read_bytes()).hexdigest()
        assert digest == spec["sha256"], (hero, "approved PNG source mismatch", digest)
        with Image.open(src) as image:
            assert image.format == "PNG" and image.mode == "RGBA" and image.size == (1024, 1536)
            assert image.getchannel("A").getextrema()[0] == 0
            for slot, box in (("upper_body", spec["upper"]), ("face_icons", spec["face"])):
                crop = image.crop(box)
                assert crop.getchannel("A").getextrema()[0] == 0
                target = ROOT / "assets" / "ART_V2" / slot / f"{hero}.webp"
                target.parent.mkdir(parents=True, exist_ok=True)
                crop.save(target, "WEBP", lossless=True, method=6)
                with Image.open(target) as verify:
                    assert verify.mode == "RGBA" and verify.size == crop.size
                    assert verify.getchannel("A").tobytes() == crop.getchannel("A").tobytes(), (hero, slot, "alpha altered")
                    # WEBP may canonicalize hidden RGB under fully transparent pixels.
                    assert all(a[:3] == b[:3] for a, b in zip(crop.getdata(), verify.getdata()) if a[3] > 0), (hero, slot, "visible RGB altered")
                print(f"{hero} {slot} {crop.size} SHA-256 {hashlib.sha256(target.read_bytes()).hexdigest()}")
    print("SUZUHA RENKA ART CROP PASS")

if __name__ == "__main__":
    run()
