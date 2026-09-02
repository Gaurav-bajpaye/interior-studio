# Brand artwork

The MS monogram and the MIRAJ SPACES wordmark are drawn in code
(`src/components/Logo.jsx`) rather than shipped as an image. That keeps
them crisp at every size, lets them recolour for the light header and
the dark footer, and costs nothing to download.

## Using the original artwork instead

If you'd rather use the master logo files, put them here and point at
them in `src/data/site.js`:

```js
export const brand = {
  markArtwork: '/brand/ms-monogram.svg',       // the MS mark on its own
  fullArtwork: '/brand/miraj-spaces-logo.svg', // mark + wordmark lockup
}
```

- `markArtwork` replaces just the monogram — used in the header, the
  footer lockup and anywhere the mark appears alone.
- `fullArtwork` replaces the entire header lockup. Leave it `null` to
  keep the live-text wordmark, which stays sharper on small screens.

**Prefer SVG.** A PNG works, but export it at 3× the display size
(the header mark renders at 32–40px, so 120px tall or more) and save it
with a transparent background.

You'll want two versions of the mark if you use artwork: one for light
backgrounds and one for the navy footer, since a flat image can't
recolour itself.

## Colours

| Role | Hex |
| --- | --- |
| Navy (letterforms, headings, dark sections) | `#16273F` |
| Gold (accent, the S, the window) | `#B78D4A` |
| Gold on navy | `#CBA765` |
| Ivory ground | `#FCFAF6` |

These live in `src/styles.css` under `@theme` as `--color-navy`,
`--color-gold`, `--color-gold-soft` and `--color-cream`.
