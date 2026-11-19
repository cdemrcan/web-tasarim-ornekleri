"""Compose portfolio cover images (desktop + mobile screenshot together).

Usage: python -I tests/covers.py <site>
Reads screenshots/<site>/ (made by tests/screenshots.mjs) and writes
screenshots/<site>/kapak-*.jpg at 2400x1500.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

COVERS = {
    "john-remy": [
        ("anasayfa", "anasayfa", (24, 24, 24)),
        ("eserler-screaming-mug", "eserler-screaming-mug", (139, 11, 0)),
        ("hakkinda", "iletisim", (24, 24, 24)),
    ],
    "restoran": [
        ("anasayfa", "anasayfa", (27, 58, 140)),
        ("menu", "menu", (244, 246, 248)),
        ("rezervasyon", "rezervasyon", (27, 58, 140)),
    ],
    "hinoki": [
        ("anasayfa", "anasayfa", (28, 26, 24)),
        ("menu", "menu", (242, 241, 238)),
        ("iletisim", "rezervasyon", (28, 26, 24)),
    ],
    "dis-klinigi": [
        ("anasayfa", "anasayfa", (30, 77, 63)),
        ("tedaviler", "tedaviler", (227, 237, 231)),
        ("randevu", "randevu", (30, 77, 63)),
    ],
}


def rounded(img: Image.Image, radius: int, border: int, border_color) -> Image.Image:
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, w - 1, h - 1], radius, fill=255)
    out = Image.new("RGBA", (w, h))
    out.paste(img, (0, 0), mask)
    if border:
        ImageDraw.Draw(out).rounded_rectangle([0, 0, w - 1, h - 1], radius, outline=border_color, width=border)
    return out


def cover(folder: Path, desktop: str, mobile: str, bg, out_name: str) -> None:
    W, H = 2400, 1500
    canvas = Image.new("RGBA", (W, H), bg + (255,))
    d = Image.open(folder / f"masaustu-{desktop}.png").convert("RGB")
    m = Image.open(folder / f"mobil-{mobile}.png").convert("RGB")
    dw = 1900
    d = d.resize((dw, round(d.height * dw / d.width)), Image.LANCZOS)
    mh = 1100
    m = m.resize((round(m.width * mh / m.height), mh), Image.LANCZOS)
    d = rounded(d, 18, 2, (40, 40, 40))
    m = rounded(m, 44, 6, (30, 30, 30))
    placements = ((d, 110, (H - d.height) // 2 - 40), (m, W - m.width - 110, H - m.height - 90))
    for img, x, y in placements:
        shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(shadow).rounded_rectangle(
            [x + 10, y + 24, x + img.width + 10, y + img.height + 24], 30, fill=(0, 0, 0, 140)
        )
        canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(28)))
        canvas.alpha_composite(img, (x, y))
    canvas.convert("RGB").save(folder / out_name, quality=92)
    print("saved", folder / out_name)


def main() -> None:
    site = sys.argv[1] if len(sys.argv) > 1 else "john-remy"
    folder = Path("screenshots") / site
    for desktop, mobile, bg in COVERS[site]:
        cover(folder, desktop, mobile, bg, f"kapak-{desktop}.jpg")


if __name__ == "__main__":
    main()
