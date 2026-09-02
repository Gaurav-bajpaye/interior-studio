import { business, brand } from '../data/site'

/* -----------------------------------------------------------------
   The MS monogram.

   The letterforms are real Didot outlines — a high-contrast didone,
   the same family the studio's identity is drawn from — with the S
   set behind the M so the two share a stem, and a four-pane window
   in gold sitting under the M's apex. The M's shoulders read as a
   roofline; the window is what makes it a building rather than two
   letters.

   Colours come in through props so one mark serves the light header,
   the dark footer and the favicon without a second file.
   ----------------------------------------------------------------- */
export function LogoMark({
  className = 'h-10',
  letter = 'currentColor',
  accent = 'var(--color-gold)',
  detail = true,
  title,
}) {
  /* If real artwork has been dropped into /public/brand, use it. */
  if (brand.markArtwork) {
    return (
      <img
        src={brand.markArtwork}
        alt={title || ''}
        aria-hidden={title ? undefined : true}
        className={`${className} w-auto object-contain`}
      />
    )
  }

  return (
    <svg
      viewBox="0 0 150.2 116.0"
      className={`${className} w-auto`}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d="M75 215H86Q97 161 114.5 124.0Q132 87 153.0 63.0Q174 39 197.0 26.0Q220 13 243.5 7.0Q267 1 288.5 0.0Q310 -1 329 -1Q382 -1 416.0 15.0Q450 31 470.0 55.5Q490 80 498.0 108.5Q506 137 506 161Q506 196 493.0 221.0Q480 246 460.0 263.5Q440 281 416.5 292.0Q393 303 372 309L257 344Q176 369 134.5 410.0Q93 451 93 520Q93 565 109.0 603.5Q125 642 154.0 670.0Q183 698 223.5 714.0Q264 730 312 730Q347 730 370.5 724.0Q394 718 411.0 710.5Q428 703 441.5 697.0Q455 691 469 691Q482 691 486.5 694.5Q491 698 499 712H513V531H501Q495 567 480.5 600.5Q466 634 443.0 659.5Q420 685 387.5 700.5Q355 716 312 716Q288 716 259.0 709.5Q230 703 205.0 687.0Q180 671 163.5 645.0Q147 619 147 579Q147 547 160.0 524.5Q173 502 193.5 486.5Q214 471 239.5 460.5Q265 450 291 442L412 404Q431 398 460.0 388.0Q489 378 516.5 358.0Q544 338 563.5 305.0Q583 272 583 221Q583 174 565.5 131.5Q548 89 515.0 56.5Q482 24 435.0 4.5Q388 -15 329 -15Q308 -15 292.0 -14.5Q276 -14 262.0 -12.0Q248 -10 234.0 -7.5Q220 -5 203 0Q183 6 160.0 14.0Q137 22 120 22Q105 22 99.5 16.0Q94 10 90 0H75Z" transform="translate(59.45 113.66) scale(0.15570 -0.15570)" fill={accent} />
      <path d="M26 14H137V698H26V712H251L436 174H438L623 712H844V698H733V14H844V0H522V14H633V692H631L392 -1L154 685H152V14H263V0H26Z" transform="translate(-3.65 107.86) scale(0.14025 -0.14025)" fill={letter} />
      {detail && (
        <g fill={accent}>
        <rect x="50.52" y="74.66" width="5.8" height="5.8" />
        <rect x="50.52" y="82.54" width="5.8" height="5.8" />
        <rect x="58.41" y="74.66" width="5.8" height="5.8" />
        <rect x="58.41" y="82.54" width="5.8" height="5.8" />
        </g>
      )}
    </svg>
  )
}

/* -----------------------------------------------------------------
   Wordmark: MIRAJ in the ink colour, SPACES in gold, both wide-tracked
   so the pair reads as one line rather than two words. Set as live
   text — it stays crisp at every size, scales with the user's font
   settings and is selectable.
   ----------------------------------------------------------------- */
function Wordmark({ size = 1, ink = 'text-navy', gold = 'text-gold' }) {
  return (
    <span
      className="font-display font-medium leading-none whitespace-nowrap"
      style={{ fontSize: `${size}rem`, letterSpacing: '.15em', fontVariationSettings: '"SOFT" 6, "WONK" 0' }}
    >
      <span className={ink}>{business.name.toUpperCase()}</span>
      <span className={gold}> {business.suffix.toUpperCase()}</span>
    </span>
  )
}

/* Header / general-purpose lockup. */
export default function Logo({ className = '', compact = false }) {
  if (brand.fullArtwork) {
    return (
      <img
        src={brand.fullArtwork}
        alt={`${business.name} ${business.suffix}`}
        className={`${compact ? 'h-9' : 'h-11'} w-auto object-contain ${className}`}
      />
    )
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* The four-pane window is a large-size detail — under about
          40px it reads as a smudge at the M's apex, so it drops out. */}
      <LogoMark className={compact ? 'h-8' : 'h-10'} letter="var(--color-navy)" detail={!compact} />
      <Wordmark size={compact ? 0.9375 : 1.0625} />
    </span>
  )
}

/* The identity at full voice — used once, in the footer. Stacks the
   mark over the wordmark and closes with the rule-flanked tagline. */
export function LogoLockup({ className = '' }) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <LogoMark className="h-16" letter="var(--color-cream)" accent="var(--color-gold-soft)" title={`${business.name} ${business.suffix}`} />

      <div className="mt-6">
        <div
          className="font-display text-[clamp(1.75rem,5.2vw,2.5rem)] font-medium leading-none whitespace-nowrap"
          style={{ letterSpacing: '.15em', fontVariationSettings: '"SOFT" 6, "WONK" 0' }}
        >
          <span className="text-cream">{business.name.toUpperCase()}</span>
          <span className="text-gold-soft"> {business.suffix.toUpperCase()}</span>
        </div>

        <div className="mt-4 flex max-w-[21rem] items-center gap-3">
          <span className="h-px w-5 bg-cream/30 sm:w-8" />
          <span
            className="font-sans text-[.5625rem] font-semibold text-sand/70 sm:text-[.625rem]"
            style={{ letterSpacing: '.24em' }}
          >
            {business.tagline.toUpperCase()}
          </span>
          <span className="h-px flex-1 bg-cream/30" />
        </div>
      </div>
    </div>
  )
}
