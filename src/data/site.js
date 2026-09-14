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
  reach: 'Pan India',
  // Short description used in the footer + SEO meta
  blurb:
    'We design, renovate and fit out commercial and residential spaces — retail stores, salons, cafés, cloud kitchens and restaurants — across India.',
  foundedYear: 2025,
  /* Whose practice this is — used in the About section and in the
     structured data in index.html. */
  founder: 'Mohd Aquif Zia',
  founderRole: 'Founder',
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
  /* Where "email us" takes people: 'gmail', 'outlook', or 'mailto' to
     hand off to whatever mail client they have set up. A plain mailto
     silently does nothing on a machine with no mail client, which is
     why it is not the default. */
  emailProvider: 'gmail',

  /* WhatsApp is wired up but switched off for now. Flip this to true
     and every WhatsApp route comes back: the header button, the
     floating chat button, the contact band, the footer link, the
     "ask about it" button on each project, and the enquiry form
     switches from email to a prefilled WhatsApp message. */
  showWhatsapp: false,
  whatsapp: '918050690693',              // country code + number, no +
  whatsappMessage:
    "Hi Miraj Spaces, I'd like to discuss the interiors for my shop.",
  /* No studio address — the practice runs remotely and goes to the shop.
     If that changes, add addressLines + mapsUrl back and the contact
     section will show a third card for it again. */
  basedNote: 'We work across India and come to your space for the survey and site visits.',
  hours: 'Available 24 × 7',
  /* Add a row here and it appears in the contact section and the footer.
     Icons exist for Instagram, Pinterest and LinkedIn; anything else
     falls back to a generic arrow. */
  socials: [
    {
      label: 'Instagram',
      handle: '@mirajspaces',
      url: 'https://www.instagram.com/mirajspaces',
    },
    {
      label: 'LinkedIn',
      handle: 'Miraj Spaces',
      url: 'https://www.linkedin.com/in/miraj-spaces-078125433/',
    },
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
  viewUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSc1dA9ZJsPBQE0KJGz4K3xruTmeZShTCQYNOuVG6P6JsRTp2g/viewform',
  embedUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSc1dA9ZJsPBQE0KJGz4K3xruTmeZShTCQYNOuVG6P6JsRTp2g/viewform?embedded=true',
  useEmbed: false,          // optional: also show the form inline on the page

  /* Unused. The other route: our own form posting to an Apps Script that
     writes to the sheet. Needs a web app published to "Anyone", which the
     mirajspaces.com Workspace policy currently blocks. */
  sheetEndpoint: '',

  responseTime: 'We reply within one working day.',
  /* Keep this in step with the form — it is the promise the button makes. */
  formHeadline: 'Nine questions, about two minutes.',

  expect: [
    'A 30-minute call or shop visit, free of cost.',
    'Honest feedback on what your space can realistically become.',
    'A written scope, timeline and estimate within 5 days.',
  ],

  /* Shown beside the button so people know what to have ready.
     A summary of the form's questions, not a copy of them. */
  asks: [
    'Your name and phone number',
    'Where the space is',
    'What kind of space it is',
    'Roughly how big it is',
    'Your budget range',
    'When you would like to start',
  ],
}

/* --- 4. Services ------------------------------------------------- */
export const services = [
  {
    icon: 'blueprint',
    title: 'New space interior fit out',
    text: 'From the empty shell to the space you are looking for.',
    points: ['Concept 2D & 3D views', 'Working drawings', 'Signage & shopfront'],
  },
  {
    icon: 'expand',
    title: 'Renovation & expansion',
    text: 'Refresh a tired store or take over the shop next door without shutting business for months.',
    points: ['Phased execution', 'Reuse what works', 'Minimal downtime'],
  },
  {
    icon: 'layout',
    title: 'Space planning',
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
export const projects = [
  /* Real photographs, from the studio's own shoots. What the camera shows
     is described; what only you know — the client's name, the address,
     the size, how long it took, what the brief was — is marked TODO
     rather than guessed at. Fill those in and the cards and the project
     dialog pick them up on their own; anything left blank is simply not
     rendered. */
  {
    id: 'beauty-store',
    name: 'Beauty & haircare store',        // TODO the client's name
    type: 'Retail stores',
    storeType: 'Beauty & haircare retail',
    location: 'Inorbit Mall, Hubli',
    photo: 'beauty-1',
    gallery: ['beauty-2'],
    summary:
      'A backlit display wall, a curved service counter and a mirrored consultation station, in a pink-on-cream palette.',
    description:
      'The long wall carries the whole range at eye level on backlit shelving, with the peg display angled so stock reads as a block of colour from the door. The counter curves to keep the walkway clear, and the consultation mirror sits at the far end where the light is softest.',
    featured: true,
  },
  {
    id: 'kalpak',
    name: 'Kalpak',
    type: 'Residential renovation',
    storeType: 'Apartment renovation',
    location: 'SNN Raj Serenity, Begur, Bengaluru',
    photo: 'kalpak-1',
    gallery: ['kalpak-2', 'kalpak-3'],
    summary:
      'A teal-panelled lounge nook, a dining wall of open shelving, and a lit pooja unit built into the entrance.',
    description:
      'Storage does the work of the walls here. The pooja unit is recessed with its own lighting so it reads as joinery rather than furniture, the dining wall carries books and plants on floating shelves, and the lounge nook is panelled to give the corner a back.',
    featured: true,
  },
  {
    id: 'rooftop-restaurant',
    name: 'Rooftop restaurant',              // TODO the client's name
    type: 'Restaurants',
    storeType: 'Rooftop dining',
    location: '',                            // TODO area, city
    photo: 'restaurant-1',
    gallery: ['restaurant-2', 'restaurant-3', 'restaurant-4'],
    summary:
      'Long shared tables under a run of woven pendants, opened on two sides to the planting.',
    description:
      'Seating is arranged along the length rather than across it, which keeps the service run short and the views open on both sides. The pendants are hung low over the tables so the light pools on the wood and leaves the ceiling dark.',
    featured: false,
  },
  {
    id: 'wheedl',
    name: 'WHEEDL',
    type: 'Commercial renovation',
    storeType: 'Workshop & showroom',
    location: '',                            // TODO area, city
    photo: 'wheedl-1',
    gallery: ['wheedl-2'],
    summary:
      'A dark green workshop with a lit approach corridor and branding built into the walls.',
    description:
      'The corridor is lined with recessed linear lighting that pulls you toward the floor at the end of it. Inside, the walls are dark so the equipment and the branding read as the brightest things in the room.',
    featured: false,
  },
  {
    id: 'cloud-kitchen',
    name: 'Cloud kitchen',                   // TODO the client's name
    type: 'Cloud kitchen',
    storeType: 'Production kitchen',
    location: '',                            // TODO area, city
    photo: 'cloudkitchen-1',
    gallery: [],
    summary:
      'An open-sided production kitchen with a long service counter, an island prep table and planting beds at the threshold.',
    description:
      'Counters run the full length of two walls so the work never doubles back on itself, with the island left free for prep and plating. The roof is carried on an exposed frame lit with festoon runs, and the slatted timber screens keep the sides open for air without opening them to view.',
    featured: false,
  },
]

/* The space types we take on, in the order they appear as filter chips.
   Every one is listed whether or not a project carries it yet — the
   filters double as a statement of what the studio does — and a type
   with nothing behind it shows a short note instead of an empty grid. */
export const spaceTypes = [
  'Retail stores',
  'Cloud kitchen',
  'Restaurants',
  'Commercial renovation',
  'Residential renovation',
]

export const categories = ['All', ...spaceTypes]

/* --- 6. Why choose us -------------------------------------------- */
export const benefits = [
  {
    title: 'Built for all kinds of business',
    text: 'From small to large scale businesses, we bring your vision to life.',
  },
  {
    title: 'More out of every square foot',
    text: 'Every project starts with a capacity question: how much more can this floor hold before it feels crowded?',
  },
  {
    title: 'Budget-honest solutions',
    text: 'You get the estimate before the fit out starts. No mid-project surprises.',
  },
  {
    title: 'Timelines you can plan around',
    text: 'A dated week-by-week schedule at handover of your space.',
  },
]

/* --- 7. Process --------------------------------------------------- */
export const steps = [
  { n: '01', title: 'Book a consultation', text: 'Fill in the form or give us a call. We reply within a working day and fix a site visit.' },
  { n: '02', title: 'Share the space', text: 'Measurements, photos and what is not working today. We survey the site ourselves wherever we can.' },
  { n: '03', title: 'Concept & estimate', text: 'Layout options, a material board, 2D and 3D views of the key walls, and a line-item estimate.' },
  { n: '04', title: 'Approve the design', text: 'Two rounds of revisions are included. We freeze drawings only once you are happy with the numbers.' },
  { n: '05', title: 'Execution & handover', text: 'Vendors tendered, site supervised weekly, snag list closed before you get the keys back.' },
]

/* --- 8. About ----------------------------------------------------- */
export const about = {
  heading: 'We started with one 300 sq ft shop that had run out of room.',
  paragraphs: [
    `${business.legalName} began in ${business.foundedYear} with a single brief: a shop that had outgrown its floor but could not afford to move. Solving that — more usable space, same rent, a better room — turned out to be the problem almost every growing business has.`,
    'Since then we have designed and delivered spaces for retail stores, salons, cafés, cloud kitchens and restaurants, alongside commercial and residential renovations. Some were empty shells. Most were working businesses that had to stay open while we built around them.',
    `We are deliberately a small studio, led by ${business.founder}. The person who visits your space is the person who draws it and the person who stands on site when the carpenter has a question.`,
  ],
  specialties: [
    'Retail stores',
    'Salons & barbershops',
    'Cafés & cloud kitchens',
    'Restaurants',
    'Commercial renovation',
    'Residential renovation',
  ],
  /* Signed under the copy, so the practice has a name on it. The role
     is set in caps by the stylesheet, not here. */
  signature: {
    name: business.founder,
    role: `${business.founderRole}, ${business.legalName}`,
  },
  portrait: 'about-portrait',
  portraitAlt: `${business.founder}, ${business.founderRole.toLowerCase()} of ${business.legalName}.`,
  /* The video leads, so the caption names the space it walks through. */
  mediaCaption: 'A walk through the beauty store fit-out,',
  portraitCaption: 'Inorbit Mall, Hubli.',
}

/* A short silent loop, shown in the About section: the studio's own
   walkthrough of the beauty store fit-out, under five seconds so it
   reads as a moving still rather than a film. Autoplay only works
   muted, and it is decorative, so it carries no audio at all and holds
   on the poster frame for anyone who prefers less motion.
   Master: source-photos/market-vdo.mp4 */
export const studioVideo = {
  src: '/video/beauty-store-walkthrough.mp4',
  poster: '/video/beauty-store-poster.webp',
  alt: 'A walk through the finished beauty store — a lit display wall under a pink ceiling.',
}

/* --- 9. Testimonials ---------------------------------------------- */
export const testimonials = [
  /* ⚠ THE QUOTES BELOW ARE STILL PLACEHOLDER TEXT — I WROTE THEM, NOT
     YOUR CLIENTS. The names and projects are real; the words are not.
     Replace each `quote` with what Tanishq and Sidhant actually said
     before the site goes live, and get their nod on it. Publishing
     invented words under a real person's name is the one thing on this
     site that could genuinely embarrass you. */
  {
    quote:
      'They found space I did not know I had. The flat holds more than it did and somehow feels emptier, and the pooja unit is exactly what I had pictured.',
    name: 'Tanishq Namvyar',
    shop: 'Kalpak, SNN Raj Serenity, Begur',
    role: '',
  },
  {
    quote:
      'The estimate at the start and the final bill were within a few percent of each other. Anyone who has fitted out a store will know how unusual that is.',
    name: 'Sidhant Sourabh',
    shop: 'Kolkata store',
    role: '',
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
