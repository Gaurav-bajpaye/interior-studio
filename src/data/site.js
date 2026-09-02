/* =================================================================
   SITE CONTENT — this is the only file you need to edit to make the
   website yours. Every string, link, price and photo lives here.

   Anything marked  // TODO  is placeholder content.
   ================================================================= */

/* --- 1. Business ------------------------------------------------ */
export const business = {
  name: 'Miraj',                         // wordmark reads MIRAJ / SPACES
  suffix: 'Spaces',
  legalName: 'Miraj Spaces',
  domain: 'mirajspaces.com',
  url: 'https://mirajspaces.com/',
  tagline: 'Design · Execute · Transform',
  city: 'Bengaluru',
  // Short description used in the footer + SEO meta
  blurb:
    'We design, renovate and expand small commercial spaces — clothing stores, salons, cafés and neighbourhood retail — so they work harder for the people who run them.',
  foundedYear: 2019,
}

/* --- 1b. Brand artwork -------------------------------------------
   The MS monogram and wordmark are drawn in code (see Logo.jsx), so
   they stay crisp at every size and recolour for light and dark
   sections. To use your original artwork files instead, drop them in
   /public/brand and set the paths below — see public/brand/README.md.

   markArtwork  replaces just the monogram (square-ish crop)
   fullArtwork  replaces the whole header lockup (mark + wordmark)   */
export const brand = {
  markArtwork: null,   // e.g. '/brand/ms-monogram.svg'
  fullArtwork: null,   // e.g. '/brand/miraj-spaces-logo.svg'
}

/* --- 2. Contact -------------------------------------------------- */
export const contact = {
  phoneLabel: '+91 80506 90693',
  phone: '+918050690693',                // digits only, with country code
  email: 'contact@mirajspaces.com',

  /* WhatsApp is wired up but switched off for now. Flip this to true
     and every WhatsApp route comes back: the header button, the
     floating chat button, the contact band, the footer link, the
     "ask about it" button on each project, and the enquiry form
     switches from email to a prefilled WhatsApp message. */
  showWhatsapp: false,
  whatsapp: '918050690693',              // country code + number, no +
  whatsappMessage:
    "Hi Miraj Spaces, I'd like to discuss the interiors for my shop.",
  addressLines: ['2nd Floor, 14 Kasturba Cross Road', 'Bengaluru 560001, Karnataka'],
  mapsUrl: 'https://maps.google.com/?q=Kasturba+Cross+Road+Bengaluru', // TODO
  hours: 'Mon – Sat · 10:00 to 7:00',
  socials: [
    { label: 'Instagram', handle: '@mirajspaces', url: 'https://instagram.com/' }, // TODO
    { label: 'Pinterest', handle: 'mirajspaces', url: 'https://pinterest.com/' },   // TODO
    { label: 'LinkedIn', handle: 'Miraj Spaces', url: 'https://linkedin.com/' },    // TODO
  ],
}

/* --- 3. Booking ---------------------------------------------------
   The page shows a button that opens a Google Form in a new tab.
   All it needs is the form's link.

   Make the form however you like at forms.google.com, then in the form
   click Responses -> the Sheets icon -> "Select existing spreadsheet"
   and pick the enquiries sheet, so answers land there:
   docs.google.com/spreadsheets/d/1ELByOma55j3O8nz1iNRtdHxGIWVopJb_WuhFJ4G2jA4

   Paste the Send -> link URL into viewUrl below. That is the whole setup.

   (Optional shortcut: scripts/create-google-form.gs builds the form and
   links the sheet in one run, if you would rather not type out ten
   questions. Nothing depends on it.)                                    */
export const booking = {
  viewUrl: '',              // TODO paste your Google Form link here
  embedUrl: '',             // optional: the same link + ?embedded=true
  useEmbed: false,          // optional: also show the form inline on the page

  /* Unused. The other route: our own form posting to an Apps Script that
     writes to the sheet. Needs a web app published to "Anyone", which the
     mirajspaces.com Workspace policy currently blocks. */
  sheetEndpoint: '',

  responseTime: 'We reply within one working day.',
  formMinutes: 'about two minutes',

  expect: [
    'A 30-minute call or shop visit, free of cost.',
    'Honest feedback on what your space can realistically become.',
    'A written scope, timeline and estimate within 5 days.',
  ],

  /* Shown beside the button so people know what to have ready. */
  asks: [
    'Your name and phone number',
    'Store type and location',
    'Roughly how many square feet',
    'What you need done',
    'A budget range',
    'A date that suits you',
  ],
}

/* --- 4. Services ------------------------------------------------- */
export const services = [
  {
    icon: 'blueprint',
    title: 'New store interior design',
    text: 'Ground-up design for a new shop — from the empty shell to the day you open the shutter.',
    points: ['Concept & 3D views', 'Working drawings', 'Signage & shopfront'],
  },
  {
    icon: 'expand',
    title: 'Renovation & expansion',
    text: 'Refresh a tired store or take over the shop next door without shutting business for months.',
    points: ['Phased execution', 'Reuse what works', 'Minimal downtime'],
  },
  {
    icon: 'layout',
    title: 'Space planning & layout',
    text: 'Circulation, display density, billing and storage planned around how customers actually move.',
    points: ['Zoning plan', 'Fixture layout', 'Storage strategy'],
  },
  {
    icon: 'palette',
    title: 'Furniture, lighting & materials',
    text: 'Selection and detailing of every finish, fixture and light — specified to your budget, not above it.',
    points: ['Material board', 'Lighting plan', 'Vendor shortlist'],
  },
  {
    icon: 'tag',
    title: 'Branding & visual merchandising',
    text: 'Your shopfront, colours and displays working together so the store looks like one idea.',
    points: ['Shopfront identity', 'Display guides', 'Seasonal resets'],
  },
  {
    icon: 'hardhat',
    title: 'Execution & contractor coordination',
    text: 'We run the site, the vendors and the schedule, and hand you a finished store.',
    points: ['Vendor tendering', 'Site supervision', 'Snag & handover'],
  },
]

/* --- 5. Projects -------------------------------------------------
   photo / before / gallery name files in /public/images, which hold
   WebP variants at 480 / 960 / 1600 px wide. To add your own photo,
   run  npm run images  (see scripts/build-images.py), or drop a file
   in /public and reference it by path, e.g.
   photo: '/projects/maara-after.jpg'  — the code accepts both.       */
export const categories = ['All', 'Clothing', 'Salon', 'Café', 'Small Retail']

export const projects = [
  {
    id: 'maara',
    name: 'Maara Label',
    type: 'Clothing',
    storeType: 'Womenswear boutique',
    location: 'Indiranagar, Bengaluru',
    size: '480 sq ft',
    timeline: '7 weeks',
    year: '2025',
    scope: 'Full design + execution',
    photo: 'maara-after',
    before: 'maara-before',
    gallery: ['maara-2'],
    summary: 'A narrow 480 sq ft shell turned into a calm, ivory-toned boutique that holds 40% more stock than the old layout.',
    description:
      'The shop was long and dark with a single window at the front. We pulled all the storage to one wall, floated the display rails off it, and kept the centre of the room completely clear so customers can see the whole collection from the door. Lime-plaster walls, a cane-and-brass trial room and warm 3000K track lighting do the rest.',
    highlights: ['Stock capacity up 40%', 'Two trial rooms in the same footprint', 'Opened 4 days ahead of schedule'],
    featured: true,
  },
  {
    id: 'thread-co',
    name: 'Thread & Co.',
    type: 'Clothing',
    storeType: 'Streetwear store',
    location: 'HSR Layout, Bengaluru',
    size: '620 sq ft',
    timeline: '9 weeks',
    year: '2024',
    scope: 'Design + expansion into adjacent unit',
    photo: 'thread-after',
    before: 'thread-before',
    gallery: ['thread-2'],
    summary: 'Two small units merged into one store with a hard-wearing industrial palette built for weekend footfall.',
    description:
      'The owner took over the neighbouring unit and needed the two to read as a single shop. We removed the shared wall, ran one continuous ceiling grid across both bays, and used the level change as a natural split between apparel and sneakers. Everything is on castors, so the floor can be reset for a drop in under an hour.',
    highlights: ['Two units read as one shop', 'Fully movable fixtures', 'Weekend footfall up 2.1×'],
    featured: true,
  },
  {
    id: 'lumen-salon',
    name: 'Lumen Hair Studio',
    type: 'Salon',
    storeType: 'Unisex salon',
    location: 'Koramangala, Bengaluru',
    size: '540 sq ft',
    timeline: '8 weeks',
    year: '2025',
    scope: 'Full design + execution',
    photo: 'lumen-after',
    before: 'lumen-before',
    gallery: ['lumen-2', 'lumen-3'],
    summary: 'Six stations, two wash bays and a waiting nook fitted into a space that previously held four chairs.',
    description:
      'Salons live and die by their plumbing and their mirrors. We moved the wash bays to the service wall to shorten drainage runs, then lined the long wall with six stations lit from both sides so colour work reads true. Storage sits under a continuous counter, which keeps the floor clear for the cleaning staff at closing time.',
    highlights: ['+2 chairs, same rent', 'Colour-accurate station lighting', 'Wash bay drainage rerouted'],
    featured: false,
  },
  {
    id: 'fade-room',
    name: 'The Fade Room',
    type: 'Salon',
    storeType: 'Barbershop',
    location: 'Jayanagar, Bengaluru',
    size: '350 sq ft',
    timeline: '5 weeks',
    year: '2024',
    scope: 'Renovation',
    photo: 'fade-after',
    before: 'fade-before',
    gallery: ['fade-2'],
    summary: 'Exposed brick, cast-iron chairs and a queue bench that made the wait feel like part of the experience.',
    description:
      'A 350 sq ft barbershop with a permanent queue. Instead of squeezing in another chair we gave the waiting area a proper bench, a magazine ledge and its own light, which changed how long the wait felt. The brick behind the chairs was already there under three coats of paint — we just cleaned it up.',
    highlights: ['Waiting area became the identity', 'Renovated in 5 weeks', 'Shop stayed open through week 3'],
    featured: false,
  },
  {
    id: 'atlas-coffee',
    name: 'Atlas Coffee',
    type: 'Café',
    storeType: 'Specialty café',
    location: 'Sadashivanagar, Bengaluru',
    size: '700 sq ft',
    timeline: '10 weeks',
    year: '2025',
    scope: 'Full design + execution',
    photo: 'atlas-after',
    before: 'atlas-before',
    gallery: ['atlas-2', 'atlas-3'],
    summary: 'A plant-filled 24-seater with a counter designed around a two-barista workflow.',
    description:
      'The brief was 24 covers without the room feeling packed. We planned the counter first — bar, brew, pickup — so two baristas never cross paths, then arranged seating in three sizes: a window ledge for solos, four two-tops, and one long communal table. The planting is on a single irrigated shelf so one person can water the whole café in five minutes.',
    highlights: ['24 covers in 700 sq ft', 'Two-barista counter workflow', 'Average dwell time 42 min'],
    featured: true,
  },
  {
    id: 'nook-bakery',
    name: 'The Nook Bakehouse',
    type: 'Café',
    storeType: 'Bakery & takeaway',
    location: 'Malleshwaram, Bengaluru',
    size: '280 sq ft',
    timeline: '6 weeks',
    year: '2024',
    scope: 'Design + shopfront',
    photo: 'nook-after',
    before: 'nook-before',
    gallery: ['nook-2'],
    summary: 'A takeaway-first bakery where the display case does the selling from the pavement.',
    description:
      'With 280 sq ft there was no room for seating, so we made the shopfront the whole design. The display case sits at the window at eye level, the queue runs along the outside wall under an awning, and the packing station is hidden behind a half-wall. Customers order, pay and leave without ever entering the room.',
    highlights: ['Pavement-facing display', 'Queue moved outside', 'Peak-hour throughput doubled'],
    featured: false,
  },
  {
    id: 'terra-home',
    name: 'Terra Home',
    type: 'Small Retail',
    storeType: 'Homeware store',
    location: 'Whitefield, Bengaluru',
    size: '820 sq ft',
    timeline: '9 weeks',
    year: '2025',
    scope: 'Full design + execution',
    photo: 'terra-after',
    before: 'terra-before',
    gallery: ['terra-2'],
    summary: 'Room-set displays that let customers see how the products would sit in their own homes.',
    description:
      'Homeware sells better in context than on shelves. We broke the floor into four loose room-sets with real furniture, kept the perimeter for high-density shelving, and put the billing counter where it can watch both the door and the back of the store. Fixtures are modular, so the sets get rebuilt every quarter.',
    highlights: ['Four rotating room-sets', 'Modular fixture system', 'Basket size up 28%'],
    featured: false,
  },
  {
    id: 'shelf-life',
    name: 'Shelf Life',
    type: 'Small Retail',
    storeType: 'Neighbourhood grocer',
    location: 'Basavanagudi, Bengaluru',
    size: '400 sq ft',
    timeline: '4 weeks',
    year: '2024',
    scope: 'Renovation + layout',
    photo: 'shelf-after',
    before: 'shelf-before',
    gallery: [],
    summary: 'A 40-year-old provision store re-planned for self-service without losing its regulars.',
    description:
      'The owner wanted self-service aisles but was worried about losing the over-the-counter relationship his regulars come for. We kept the original teak counter at the front as the billing and conversation point, and opened the rest of the floor into three low aisles you can see over from anywhere in the shop.',
    highlights: ['Kept the original teak counter', 'Sightlines across the whole floor', 'Done in 4 weeks, shop open'],
    featured: false,
  },
]

/* --- 6. Why choose us -------------------------------------------- */
export const benefits = [
  {
    title: 'Built for small businesses',
    text: 'We work at 300 to 2,000 sq ft. Small shops are not scaled-down showrooms — they need their own thinking.',
  },
  {
    title: 'More out of less space',
    text: 'Every project starts with a capacity question: how much more can this floor hold before it feels crowded?',
  },
  {
    title: 'Budget-honest solutions',
    text: 'You get the estimate before the drawings are finalised, with the trade-offs named. No mid-project surprises.',
  },
  {
    title: 'Timelines you can plan around',
    text: 'A dated week-by-week schedule at handover of drawings, and a phasing plan if you cannot afford to shut.',
  },
  {
    title: 'Designed to sell, not just to look good',
    text: 'Sightlines, display density and billing flow are planned around footfall, dwell time and basket size.',
  },
]

/* --- 7. Process --------------------------------------------------- */
export const steps = [
  { n: '01', title: 'Book a consultation', text: 'Fill in the form or give us a call. We reply within a working day and fix a shop visit.', meta: 'Day 1 · Free' },
  { n: '02', title: 'Share the space', text: 'Measurements, photos, your stock list and what is not working today. We survey the site ourselves if you are in the city.', meta: 'Day 2–4' },
  { n: '03', title: 'Concept & estimate', text: 'Layout options, a material board, 3D views of the key walls, and a line-item estimate with timelines.', meta: 'Day 5–12' },
  { n: '04', title: 'Approve the design', text: 'Two rounds of revisions are included. We freeze drawings only once you are happy with the numbers.', meta: 'Day 13–18' },
  { n: '05', title: 'Execution & handover', text: 'Vendors tendered, site supervised weekly, snag list closed before you get the keys back.', meta: '4–10 weeks' },
]

/* --- 8. About ----------------------------------------------------- */
export const about = {
  heading: 'We started with one 300 sq ft shop that had run out of room.',
  paragraphs: [
    `${business.legalName} began in ${business.foundedYear} with a single brief: a womenswear shop in ${business.city} that had outgrown its floor but could not afford to move. Solving that — more stock, same rent, better shop — turned out to be the problem almost every small retailer has.`,
    'Since then we have designed and delivered shops for clothing labels, salons, barbers, cafés, bakeries and neighbourhood grocers. Some were empty shells. Most were working businesses that had to stay open while we built around them.',
    'We are deliberately a small studio. The person who visits your shop is the person who draws it and the person who stands on site when the carpenter has a question.',
  ],
  philosophy: [
    { k: 'Plan before you decorate', v: 'Layout, sightlines and storage first. Finishes are the last decision, not the first.' },
    { k: 'Respect the rent', v: 'Every square foot is being paid for monthly. It should be earning.' },
    { k: 'Build what can be maintained', v: 'Materials your staff can clean and your local carpenter can repair.' },
  ],
  specialties: ['Clothing & apparel', 'Salons & barbershops', 'Cafés & bakeries', 'Neighbourhood retail'],
  /* The large About image. Swap this for a photo of you or your team —
     drop the file in /public and point at it, e.g. '/founder.jpg'.     */
  portrait: 'about-portrait',                                    // TODO founder / team photo
  portraitAlt: 'Fitted storage and a reading chair in a completed store interior',
  portraitCaption: 'Terra Home, Whitefield — fitted storage, week six.',
  detail: 'about-detail',
  founder: { name: 'A. Rao', role: `Principal designer, ${business.legalName}` }, // TODO
  stats: [
    { value: '60+', label: 'Shops delivered' },
    { value: '6', label: 'Years in retail interiors' },
    { value: '300–2,000', label: 'Sq ft, our range' },
    { value: '94%', label: 'Handed over on schedule' },
  ],
}

/* --- 9. Testimonials ---------------------------------------------- */
export const testimonials = [
  {
    quote:
      'They found space I did not know I had. The shop holds a third more stock than before and somehow feels emptier. My billing queue disappeared.',
    name: 'Meera K.',
    shop: 'Maara Label',
    role: 'Owner, womenswear boutique',
  },
  {
    quote:
      'We stayed open through the whole renovation except one week. That mattered more to me than anything else, and they planned for it from the first drawing.',
    name: 'Imran S.',
    shop: 'The Fade Room',
    role: 'Owner, barbershop',
  },
  {
    quote:
      'The estimate at the start and the final bill were within four percent of each other. Anyone who has built a café in this city will know how unusual that is.',
    name: 'Divya R.',
    shop: 'Atlas Coffee',
    role: 'Founder, specialty café',
  },
  {
    quote:
      'My father ran this store for forty years. They changed the layout completely and he still recognises his shop. That took real listening.',
    name: 'Suresh N.',
    shop: 'Shelf Life',
    role: 'Second-generation owner',
  },
]

/* --- 10. Navigation ----------------------------------------------- */
export const navLinks = [
  { id: 'work', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
