"""Build the responsive WebP variants the site serves from
public/images/.

Each entry's source is either a local file in the repo — the studio's
own photographs, dropped into public/images-new/ — or an Unsplash id
for the placeholders still standing in for work we do not have shots
of yet. Local files win; nothing about a real photo should depend on a
network fetch."""
import io, os, sys, urllib.request
from PIL import Image

OUT = "public/images"
WIDTHS = [480, 960, 1600]
UA = {"User-Agent": "Mozilla/5.0"}

# name -> (local file under public/, or an Unsplash id, aspect ratio h/w)
ASSETS = {
    "hero-main":        ("images-new/1000671484.jpg",     1.25),

    "maara-after":      ("1558769132-cb1aea458c5e",    0.75),
    "maara-before":     ("1517581177682-a085bb7ffb15", 0.75),
    "maara-2":          ("1490481651871-ab68de25d43d", 0.75),

    "thread-after":     ("1567401893414-76b7b1e5a7a5", 0.75),
    "thread-before":    ("1497366811353-6870744d04b2", 0.75),
    "thread-2":         ("1555529669-e69e7aa0ba9a",    0.75),

    "lumen-after":      ("1560066984-138dadb4c035",    0.75),
    "lumen-before":     ("1522708323590-d24dbb6b0267", 0.75),
    "lumen-2":          ("1470259078422-826894b933aa", 0.75),
    "lumen-3":          ("1580618672591-eb180b1a973f", 0.75),

    "fade-after":       ("1585747860715-2ba37e788b70", 0.75),
    "fade-before":      ("1497366754035-f200968a6e72", 0.75),
    "fade-2":           ("1472851294608-062f824d29cc", 0.75),

    "atlas-after":      ("1600093463592-8e36ae95ef56", 0.75),
    "atlas-before":     ("1517581177682-a085bb7ffb15", 0.75),
    "atlas-2":          ("1453614512568-c4024d13c247", 0.75),
    "atlas-3":          ("1445116572660-236099ec97a0", 0.75),

    "nook-after":       ("1521017432531-fbd92d768814", 0.75),
    "nook-before":      ("1497366811353-6870744d04b2", 0.75),
    "nook-2":           ("1559925393-8be0ec4767c8",    0.75),

    "terra-after":      ("1524758631624-e2822e304c36", 0.75),
    "terra-before":     ("1497366754035-f200968a6e72", 0.75),
    "terra-2":          ("1505691938895-1758d7feb511", 0.75),

    "shelf-after":      ("1502672260266-1c1ef2d93688", 0.75),
    "shelf-before":     ("1522708323590-d24dbb6b0267", 0.75),

    "about-portrait":   ("1585128792020-803d29415281", 1.25),
    "about-detail":     ("1621905251189-08b45d6a269e", 1.00),
}

os.makedirs(OUT, exist_ok=True)
cache = {}
made = 0

def load(source):
    """A source with a dot in it is a file in the repo; otherwise it is
    an Unsplash photo id."""
    if "." in source:
        path = os.path.join("public", source)
        if not os.path.exists(path):
            sys.exit(f"missing local source: {path}")
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
        top = round((master.height - ch) * 0.42)   # bias slightly above centre
        crop = master.crop((left, top, left + cw, top + ch)).resize((w, h), Image.LANCZOS)
        crop.save(f"{OUT}/{name}-{w}.webp", "WEBP", quality=80, method=5)
        made += 1

print("variants written:", made)
