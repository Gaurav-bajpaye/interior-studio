"""Generate the raster brand assets — the social card and the iOS
touch icon — from the same arch mark used across the site."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter

CHARCOAL = (27, 25, 23)
CREAM = (252, 249, 244)
CLAY = (201, 118, 79)
SAND = (234, 223, 207)

SERIF = "/System/Library/Fonts/Supplemental/Georgia.ttf"
SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"


def arch(draw, box, width, color, inner=True):
    """The mark: outer shell, inner arch, threshold line."""
    x, y, w, h = box
    r = w / 2
    draw.arc([x, y, x + w, y + w], 180, 360, fill=color, width=width)
    draw.line([x, y + r, x, y + h], fill=color, width=width)
    draw.line([x + w, y + r, x + w, y + h], fill=color, width=width)
    if inner:
        iw = w * 0.47
        ix = x + (w - iw) / 2
        iy = y + w * 0.22
        ir = iw / 2
        faded = tuple(int(c * 0.55 + b * 0.45) for c, b in zip(color, CHARCOAL))
        draw.arc([ix, iy, ix + iw, iy + iw], 180, 360, fill=faded, width=width)
        draw.line([ix, iy + ir, ix, y + h], fill=faded, width=width)
        draw.line([ix + iw, iy + ir, ix + iw, y + h], fill=faded, width=width)
    draw.line([x - w * 0.09, y + h, x + w * 1.09, y + h], fill=color, width=width)


def tracked(draw, xy, text, font, fill, tracking):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


# ---------------------------------------------------------------- OG card
W, H = 1200, 630
card = Image.new("RGB", (W, H), CHARCOAL)

# photograph on the right, faded into the charcoal field
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
card.paste(Image.new("RGB", (crop_w, H), CHARCOAL), (W - crop_w, 0), fade)

d = ImageDraw.Draw(card)
arch(d, (72, 78, 84, 132), 5, CLAY)

name = ImageFont.truetype(SERIF, 82)
sub = ImageFont.truetype(SANS, 21)
line = ImageFont.truetype(SERIF, 40)
small = ImageFont.truetype(SANS, 20)

tracked(d, (72, 250), "MIRAJ", name, CREAM, 15)
tracked(d, (76, 348), "SPACES  ·  BENGALURU", sub, (196, 182, 164), 6)

d.line([(72, 404), (170, 404)], fill=CLAY, width=3)
d.text((72, 436), "Retail interiors for", font=line, fill=CREAM)
d.text((72, 486), "small shops.", font=line, fill=CLAY)
d.text((72, 556), "Design · Renovation · Expansion · Execution", font=small, fill=(150, 140, 128))

card.save("public/og.jpg", quality=88, optimize=True)
print("wrote public/og.jpg")

# ------------------------------------------------------------ touch icon
S = 180 * 4
icon = Image.new("RGB", (S, S), CHARCOAL)
di = ImageDraw.Draw(icon)
arch(di, (S * 0.26, S * 0.24, S * 0.48, S * 0.52), int(S * 0.045), CLAY)
icon = icon.resize((180, 180), Image.LANCZOS).filter(ImageFilter.SHARPEN)
icon.save("public/apple-touch-icon.png")
print("wrote public/apple-touch-icon.png")
