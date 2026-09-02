# MirajSpaces — retail interior design website

A single-page marketing site for an interior design studio that works on small
commercial spaces: clothing stores, salons, cafés and neighbourhood retail.

React + Vite + Tailwind. No backend, no database, no admin panel — the whole
site is static, and **all photographs live in this repository** under
`public/images`, so nothing depends on an external image host.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the built site
```

---

## Making it yours

Almost everything you need to change is in **one file**: [`src/data/site.js`](src/data/site.js).
Anything still holding sample content is marked `// TODO`.

| What | Where |
| --- | --- |
| Business name, tagline, city | `business` |
| Phone, WhatsApp, email, address, socials | `contact` |
| Google Form links | `booking` |
| Service list | `services` |
| Projects, before/after photos, categories | `projects`, `categories` |
| Why-choose-us points | `benefits` |
| Process steps | `steps` |
| Story, philosophy, founder, stats | `about` |
| Client quotes | `testimonials` |

Then update the page title, meta description, canonical URL and the
`InteriorDesignBusiness` structured data in [`index.html`](index.html).

### Booking form

The booking section works in two modes:

- **`booking.useEmbed: false`** (default) — a built-in enquiry form that
  composes the answers into a WhatsApp message. Works immediately, no setup.
- **`booking.useEmbed: true`** — embeds your Google Form in an iframe that only
  loads as the visitor approaches it. Get both links from Forms → **Send** →
  `< >`: the `viewform` URL goes in `viewUrl`, the same URL with
  `?embedded=true` goes in `embedUrl`.

The **Open booking form** button is always shown, so the form is reachable even
if the iframe is blocked.

### Photographs

Images are self-hosted WebP at three widths (480 / 960 / 1600) in
`public/images`, and every `<img>` ships a `srcSet` so phones never download a
desktop-sized file.

To use your own photos you have two options:

1. **Drop a file in and point at it** — put `my-shop.jpg` in `public/` and set
   `photo: '/my-shop.jpg'`. Any ref starting with `/` or `http` is used as-is.
2. **Regenerate the set** — edit the `ASSETS` map in
   [`scripts/build-images.py`](scripts/build-images.py) and run `npm run images`.
   Point entries at local files or URLs; the script crops to the aspect ratio
   you give it and writes all three widths.

> The photographs currently in the repo are Unsplash placeholders, and a few
> "before" shots are reused across projects. Replace them with real project
> photography before launch.

`npm run brand` regenerates the social card (`public/og.jpg`) and the iOS touch
icon from the same arch mark used in the logo.

---

## Structure

```
src/
  data/site.js          all copy, contact details and project data
  lib/media.js          image src / srcSet helpers
  lib/links.js          tel:, mailto: and wa.me builders
  components/
    Logo.jsx            mark, wordmark and the large footer lockup
    Header.jsx          sticky nav, scroll-spy, mobile sheet
    Hero.jsx
    Portfolio.jsx       filterable project grid
    ProjectModal.jsx    project detail dialog
    BeforeAfter.jsx     drag-to-compare slider
    Services.jsx  Benefits.jsx  Process.jsx  About.jsx
    Testimonials.jsx  Booking.jsx  Contact.jsx  Footer.jsx
    Section.jsx  Reveal.jsx  Img.jsx  Icons.jsx
    WhatsAppFab.jsx  ScrollProgress.jsx
public/
  images/               all project photography (WebP, 3 widths each)
  favicon.svg  og.jpg  apple-touch-icon.png  site.webmanifest  robots.txt
scripts/
  build-images.py       fetch + crop + resize the photo set
  build-brand.py        social card and touch icon
```

## Design

Warm neutral ground (`cream` / `shell` / `sand`), charcoal text, a single
terracotta accent (`clay`) with olive as a quiet second. Display type is
Fraunces, body is Inter. Tokens are defined once in
[`src/styles.css`](src/styles.css) under `@theme` — change them there and the
whole site follows.

The arch — a shopfront doorway — is the recurring motif: it's the logo mark, the
frame around the hero and About photographs, and the shape of the favicon.

Accessibility and motion: every interactive element is a real button or link
with a visible focus ring, the modal traps Escape and restores body scroll, and
all scroll animations collapse under `prefers-reduced-motion`.

## Deploying

Static output, so anything that serves files will do.

- **Vercel** — import the repo; `vercel.json` is included.
- **Netlify** — import the repo; `netlify.toml` is included.
- **Anything else** — `npm run build` and upload `dist/`.
