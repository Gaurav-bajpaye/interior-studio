"""Build the responsive WebP variants the site serves from
public/images/.

Each entry's source is either a local file in the repo — the studio's
own photographs, which live in source-photos/ — or an Unsplash id for
anything still standing in as a placeholder. Local files win; nothing
about a real photo should depend on a network fetch.

The originals sit outside public/ on purpose: they are the masters, and
shipping 12MB of them to the host alongside the variants generated from
them is pure deploy weight."""
import io, os, sys, urllib.request
from PIL import Image

OUT = "public/images"
WIDTHS = [480, 960, 1600]
UA = {"User-Agent": "Mozilla/5.0"}

# name -> (local file under public/, or an Unsplash id, aspect ratio h/w)
# BIAS overrides where a crop sits vertically: 0 = flush to the top of the
# source, 1 = flush to the bottom. The default 0.42 sits just above centre.
ASSETS = {
    # ---- the studio's own photographs, from source-photos/ -------------
    "hero-main":        ("source-photos/1000671484.jpg",  1.25),   # bias below

    # Beauty & haircare store — pink display wall, curved counter
    "beauty-1":         ("source-photos/1000654615.jpg",  0.75),
    "beauty-2":         ("source-photos/1000654616.jpg",  0.75),

    # Office reception
    "office-1":         ("source-photos/1000655392.jpg",  0.75),

    # Apartment fit-out — bedroom, kitchen, dining, living
    "apartment-1":      ("source-photos/1000655396.jpg",  0.75),
    "apartment-2":      ("source-photos/1000655393.jpg",  0.75),
    "apartment-3":      ("source-photos/1000655394.jpg",  0.75),
    "apartment-4":      ("source-photos/1000655395.jpg",  0.75),

    # Rooftop restaurant — pendant lights over long tables
    "restaurant-1":     ("source-photos/1000671477.jpg",  0.75),
    "restaurant-2":     ("source-photos/1000671478.jpg",  0.75),
    "restaurant-3":     ("source-photos/1000671475.jpg",  0.75),
    "restaurant-4":     ("source-photos/1000671476.jpg",  0.75),

    # WHEEDL — lit corridor and the workshop floor
    "wheedl-1":         ("source-photos/1000671479.jpg",  0.75),
    "wheedl-2":         ("source-photos/1000671480.jpg",  0.75),

    # Kalpak, SNN Raj Serenity — dining, lounge nook, pooja unit
    "kalpak-1":         ("source-photos/1000671483.jpg",  0.75),
    "kalpak-2":         ("source-photos/1000671482.jpg",  0.75),
    "kalpak-3":         ("source-photos/1000671484.jpg",  0.75),

    # About: the arch portrait and the square inset
    "about-portrait":   ("source-photos/1000671483.jpg",  1.25),
    "about-detail":     ("source-photos/1000671477.jpg",  1.00),
}

# The hero's ring light sits right at the top of the frame; a centred crop
# cut it off, so this one crops from the very top.
BIAS = {"hero-main": 0.0}
DEFAULT_BIAS = 0.42

os.makedirs(OUT, exist_ok=True)
cache = {}
made = 0

def load(source):
    """A source with a dot in it is a file in the repo; otherwise it is
    an Unsplash photo id."""
    if "." in source:
        # Look in the repo root first, then public/, so photographs dropped
        # into either place are found.
        path = next(
            (c for c in (source, os.path.join("public", source)) if os.path.exists(c)),
            None,
        )
        if not path:
            sys.exit(f"missing local source: {source}")
        img = Image.open(path).convert("RGB")
        print("local  ", source, img.size)
        return img
    url = f"https://images.unsplash.com/photo-{source}?auto=format&q=85&w=2200"
    req = urllib.request.Request(url, headers=UA)
    img = Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=60).read())).convert("RGB")
    print("fetched", source, img.size)
    return img


for name, (pid, ratio) in ASSETS.items():
    if pid not in cache:
        cache[pid] = load(pid)
    master = cache[pid]

    for w in WIDTHS:
        h = round(w * ratio)
        # cover-crop to the target box, then resize
        src_ratio = master.height / master.width
        if src_ratio > ratio:                      # source taller -> crop height
            cw = master.width
            ch = round(cw * ratio)
        else:                                      # source wider -> crop width
            ch = master.height
            cw = round(ch / ratio)
        left = (master.width - cw) // 2
        top = round((master.height - ch) * BIAS.get(name, DEFAULT_BIAS))
        crop = master.crop((left, top, left + cw, top + ch)).resize((w, h), Image.LANCZOS)
        crop.save(f"{OUT}/{name}-{w}.webp", "WEBP", quality=80, method=5)
        made += 1

print("variants written:", made)
