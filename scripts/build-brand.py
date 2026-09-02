"""Generate the raster brand assets — the social card and the iOS
touch icon — from the same MS monogram used across the site.

The monogram is rasterised here from the same Didot letterforms that
build-mark.py turns into vectors, so the two stay in step.

Needs Pillow:  pip install pillow"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter

NAVY = (22, 39, 63)
CREAM = (252, 250, 246)
GOLD = (183, 141, 74)
GOLD_SOFT = (203, 167, 101)
SAND = (196, 186, 170)

DIDOT = "/System/Library/Fonts/Supplemental/Didot.ttc"
SERIF = "/System/Library/Fonts/Supplemental/Didot.ttc"
SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"


def monogram(size, letter_rgb, accent_rgb, supersample=4):
    """Draw the MS mark into an RGBA image `size` px tall."""
    S = size * supersample
    font = ImageFont.truetype(DIDOT, S)
    img = Image.new("RGBA", (int(S * 1.55), int(S * 1.25)), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # S behind, slightly taller; M in front, sharing its stem.
    s_font = ImageFont.truetype(DIDOT, int(S * 1.16))
    sb = d.textbbox((0, 0), "S", font=s_font)
    mb = d.textbbox((0, 0), "M", font=font)
    m_w = mb[2] - mb[0]

    s_x = int(m_w * 0.62)
    d.text((s_x - sb[0], 0 - sb[1]), "S", font=s_font, fill=accent_rgb + (255,))
    m_top = int(((sb[3] - sb[1]) - (mb[3] - mb[1])) / 2)
    d.text((0 - mb[0], m_top - mb[1]), "M", font=font, fill=letter_rgb + (255,))

    # four-pane window under the M's apex
    u = int(S * 0.058)
    gap = int(u * 0.36)
    side = u * 2 + gap
    wx = int(m_w * 0.5 - side / 2)
    wy = int(m_top + (mb[3] - mb[1]) * 0.735 - side / 2)
    for i in (0, 1):
        for j in (0, 1):
            x, y = wx + i * (u + gap), wy + j * (u + gap)
            d.rectangle([x, y, x + u, y + u], fill=accent_rgb + (255,))

    img = img.crop(img.getbbox())
    w = int(img.width * size / img.height)
    return img.resize((max(w, 1), size), Image.LANCZOS)


def tracked(draw, xy, text, font, fill, tracking):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


# ---------------------------------------------------------------- OG card
W, H = 1200, 630
card = Image.new("RGB", (W, H), NAVY)

photo = Image.open("public/images/hero-main-1600.webp").convert("RGB")
ph = H
pw = int(photo.width * (ph / photo.height))
photo = photo.resize((pw, ph), Image.LANCZOS)
crop_w = 560
photo = photo.crop(((pw - crop_w) // 2, 0, (pw - crop_w) // 2 + crop_w, ph))
card.paste(photo, (W - crop_w, 0))

fade = Image.new("L", (crop_w, H), 0)
fd = ImageDraw.Draw(fade)
for i in range(crop_w):
    fd.line([(i, 0), (i, H)], fill=int(255 * min(1, max(0, 1 - i / (crop_w * 0.55)))))
card.paste(Image.new("RGB", (crop_w, H), NAVY), (W - crop_w, 0), fade)

mark = monogram(120, CREAM, GOLD_SOFT)
card.paste(mark, (72, 66), mark)

d = ImageDraw.Draw(card)
name = ImageFont.truetype(SERIF, 74)
sub = ImageFont.truetype(SANS, 19)
line = ImageFont.truetype(SERIF, 38)
small = ImageFont.truetype(SANS, 19)

x = tracked(d, (72, 244), "MIRAJ", name, CREAM, 11)
tracked(d, (x + 18, 244), "SPACES", name, GOLD_SOFT, 11)
tracked(d, (76, 344), "DESIGN  ·  EXECUTE  ·  TRANSFORM", sub, SAND, 5)

d.line([(72, 400), (170, 400)], fill=GOLD, width=3)
d.text((72, 432), "Retail interiors for", font=line, fill=CREAM)
d.text((72, 482), "small shops.", font=line, fill=GOLD_SOFT)
d.text((72, 556), "Bengaluru  ·  mirajspaces.com", font=small, fill=(126, 138, 156))

card.save("public/og.jpg", quality=88, optimize=True)
print("wrote public/og.jpg")

# ------------------------------------------------------------ touch icon
S = 180 * 4
icon = Image.new("RGB", (S, S), NAVY)
mk = monogram(int(S * 0.46), CREAM, GOLD_SOFT)
icon.paste(mk, ((S - mk.width) // 2, (S - mk.height) // 2), mk)
icon = icon.resize((180, 180), Image.LANCZOS).filter(ImageFilter.SHARPEN)
icon.save("public/apple-touch-icon.png")
print("wrote public/apple-touch-icon.png")
