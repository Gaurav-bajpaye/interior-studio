"""Regenerate the MS monogram.

The mark is composed from real Didot outlines — the S set behind the M
so the pair shares a stem, plus a four-pane window under the M's apex.
This script pulls the glyph contours out of the font and writes:

  public/favicon.svg              the navy tile version
  scripts/out/mark.svg            the two-colour mark, for handoff
  scripts/out/mark-paths.json     path data + transforms for Logo.jsx

Logo.jsx carries the path data inline so the mark can recolour per
section without a second file. If you change the geometry below, run
this and paste the new values into LogoMark.

Needs fontTools:  pip install fonttools
"""
import json
import os
from fontTools.ttLib import TTCollection, TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

FONT = "/System/Library/Fonts/Supplemental/Didot.ttc"
NAVY, GOLD_SOFT, CREAM = "#16273F", "#CBA765", "#FCFAF6"
GOLD = "#B78D4A"

# --- geometry ------------------------------------------------------
M_HEIGHT = 100.0     # the M sets the scale
S_HEIGHT = 116.0     # the S runs taller, above and below the M
OVERLAP = 0.62       # where the S starts, as a fraction of the M's width
WINDOW_UNIT = 5.8    # one pane
WINDOW_Y = 0.735     # down the M, 0 = top of the M


def outlines(path):
    font = TTCollection(path).fonts[0] if path.endswith(".ttc") else TTFont(path)
    glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
    out = {}
    for ch in "MS":
        g = glyphs[cmap[ord(ch)]]
        pen, bounds = SVGPathPen(glyphs), BoundsPen(glyphs)
        g.draw(pen)
        g.draw(bounds)
        out[ch] = (pen.getCommands(), bounds.bounds)
    return out


def transform(bounds, height, x, y_top):
    """Font units are y-up; SVG is y-down. Scale to `height` and flip."""
    s = height / (bounds[3] - bounds[1])
    return f"translate({x - bounds[0]*s:.2f} {y_top + bounds[3]*s:.2f}) scale({s:.5f} {-s:.5f})"


def build():
    g = outlines(FONT)
    (mD, mB), (sD, sB) = g["M"], g["S"]

    sM = M_HEIGHT / (mB[3] - mB[1])
    sS = S_HEIGHT / (sB[3] - sB[1])
    m_w = (mB[2] - mB[0]) * sM
    s_w = (sB[2] - sB[0]) * sS

    m_top = (S_HEIGHT - M_HEIGHT) / 2
    s_x = m_w * OVERLAP
    W, H = s_x + s_w, S_HEIGHT

    u = WINDOW_UNIT
    gap = u * 0.36
    side = u * 2 + gap
    wx = m_w * 0.5 - side / 2
    wy = m_top + M_HEIGHT * WINDOW_Y - side / 2
    rects = [
        (round(wx + i * (u + gap), 2), round(wy + j * (u + gap), 2))
        for i in (0, 1)
        for j in (0, 1)
    ]

    return {
        "viewBox": f"0 0 {W:.1f} {H:.1f}",
        "mPath": mD,
        "mTransform": transform(mB, M_HEIGHT, 0, m_top),
        "sPath": sD,
        "sTransform": transform(sB, S_HEIGHT, s_x, 0),
        "rects": rects,
        "unit": round(u, 2),
        "width": round(W, 1),
        "height": round(H, 1),
    }


def panes(m, fill):
    """The four-pane window, as one gold group."""
    rects = "".join(
        f'<rect x="{x}" y="{y}" width="{m["unit"]}" height="{m["unit"]}"/>'
        for x, y in m["rects"]
    )
    return f'<g fill="{fill}">{rects}</g>' 


m = build()
os.makedirs("scripts/out", exist_ok=True)
json.dump(m, open("scripts/out/mark-paths.json", "w"), indent=1)

mark = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{m["viewBox"]}">'
    f'<path d="{m["sPath"]}" transform="{m["sTransform"]}" fill="{GOLD}"/>'
    f'<path d="{m["mPath"]}" transform="{m["mTransform"]}" fill="{NAVY}"/>'
    f'{panes(m, GOLD)}</svg>'
)
open("scripts/out/mark.svg", "w").write(mark)

# Favicon: the mark needs a tile and some air to survive 16px.
pad = 0.16
box = max(m["width"], m["height"]) * (1 + pad * 2)
ox, oy = (box - m["width"]) / 2, (box - m["height"]) / 2
favicon = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {box:.1f} {box:.1f}">
  <rect width="{box:.1f}" height="{box:.1f}" rx="{box*0.2:.1f}" fill="{NAVY}"/>
  <g transform="translate({ox:.2f} {oy:.2f})">
    <path d="{m["sPath"]}" transform="{m["sTransform"]}" fill="{GOLD_SOFT}"/>
    <path d="{m["mPath"]}" transform="{m["mTransform"]}" fill="{CREAM}"/>
    {panes(m, GOLD_SOFT)}
  </g>
</svg>'''
open("public/favicon.svg", "w").write(favicon)

print("wrote public/favicon.svg, scripts/out/mark.svg, scripts/out/mark-paths.json")
print(f'viewBox "{m["viewBox"]}"  panes {m["rects"]}')
