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

### Booking form → Google Sheet

Enquiries land in the [enquiries spreadsheet](https://docs.google.com/spreadsheets/d/1ELByOma55j3O8nz1iNRtdHxGIWVopJb_WuhFJ4G2jA4/edit)
via a Google Form. The page shows a panel that says what the form asks
and a button that opens it in a new tab — no iframe, so it works even
where embedding is blocked, and it keeps the page light.

Don't build the form by hand. This creates it with the right ten
questions and links it to the sheet:

1. Open the sheet → **Extensions → Apps Script**
2. New script file, paste in
   [`scripts/create-google-form.gs`](scripts/create-google-form.gs), Save
3. Pick **createEnquiryForm** in the function dropdown → **Run** → authorise
4. Open the execution log and copy the two URLs it prints into
   `booking.viewUrl` and `booking.embedUrl` in
   [`src/data/site.js`](src/data/site.js)

Responses appear in a new tab of the same spreadsheet. To change a
question later, edit the form in the Forms UI — re-running the script
would make a second form.

Set `useEmbed: true` to show the form inline on the page as well as
offering the button. The iframe only loads as the visitor scrolls near
it, so it never delays the first paint on a phone.

#### The alternative: our own form writing to the sheet

`booking.sheetEndpoint` keeps the site's own designed form and posts it
to a Google Apps Script that appends the row —
[`scripts/google-sheet-endpoint.gs`](scripts/google-sheet-endpoint.gs),
verified with `npm run check:sheet`. Nicer to use, but it needs a web
app published to **Anyone**, which a Google Workspace policy can block.
The Google Form route has no such requirement, which is why it is the
default. A `viewUrl` wins over `sheetEndpoint` if both are set.

**With neither set** the page falls back to its own form composing an
email to `contact.email`, so the section is never broken.

### WhatsApp

WhatsApp is built but switched off. One flag brings it all back:

```js
// src/data/site.js
export const contact = { showWhatsapp: true, whatsapp: '918050690693', ... }
```

That restores the header button, the floating chat button, the contact
band, the footer link and the per-project "ask about it" button, and
switches the enquiry form from email to a prefilled WhatsApp message.
With it off, every one of those routes becomes email or phone instead —
no dead ends.

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

Ivory ground, navy ink, gold accent — taken straight from the identity.
Tokens are defined once in [`src/styles.css`](src/styles.css) under
`@theme`, so changing them there moves the whole site.

| Token | Hex | Used for |
| --- | --- | --- |
| `navy` / `charcoal` | `#16273F` | Headings, dark sections, buttons |
| `ink` | `#2B3B52` | Body text |
| `muted` | `#5F6B7C` | Secondary text |
| `gold` | `#B78D4A` | The mark, fills, rules, icons |
| `gold-ink` | `#8A6830` | Gold **text** on the ivory ground |
| `gold-soft` | `#CBA765` | Gold on navy |
| `cream` / `shell` / `sand` | `#FCFAF6` / `#F4F0E8` / `#E7E0D3` | Grounds |

Two golds is deliberate: the brand gold only reaches 2.9:1 on ivory,
well under the 4.5:1 WCAG AA needs for text, so anything set in gold
type uses `gold-ink` while graphics keep the brand value. The logotype
itself keeps the brand gold — logos are exempt, and it should match
your printed collateral.

Display type is Fraunces, body is Inter.

The **MS monogram** is composed from Didot outlines with the S set
behind the M and a four-pane gold window under the apex, so the mark
reads as a building rather than two letters. It is drawn in code
(`Logo.jsx`) so it recolours for the light header and the navy footer
from one source — see [`public/brand/README.md`](public/brand/README.md)
to swap in your own artwork files.

Accessibility and motion: every interactive element is a real button or
link with a visible focus ring, touch targets meet 44px, the modal traps
Escape and restores body scroll, and all scroll animations collapse
under `prefers-reduced-motion`.

## Deploying

Static output, so anything that serves files will do.

- **Vercel** — import the repo; `vercel.json` is included.
- **Netlify** — import the repo; `netlify.toml` is included.
- **Anything else** — `npm run build` and upload `dist/`.
