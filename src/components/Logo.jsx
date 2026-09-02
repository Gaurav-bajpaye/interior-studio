import { business } from '../data/site'

/* -----------------------------------------------------------------
   The mark: an arch — a shopfront doorway — with a second arch nested
   inside it. A space within a space: the designed store sitting inside
   the shell the owner leased, which is literally what the studio does.
   ----------------------------------------------------------------- */
export function LogoMark({ className = 'h-9 w-9', title }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* outer shell */}
      <path
        d="M4 38V16a16 16 0 0 1 32 0v22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="square"
      />
      {/* inner arch — the designed space */}
      <path
        d="M12.5 38V17.5a7.5 7.5 0 0 1 15 0V38"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="square"
        opacity=".42"
      />
      {/* threshold */}
      <path d="M2 38h36" stroke="currentColor" strokeWidth="2.1" strokeLinecap="square" />
      {/* keystone */}
      <circle cx="20" cy="14.5" r="1.9" fill="currentColor" />
    </svg>
  )
}

/* -----------------------------------------------------------------
   Wordmark: wide-tracked display serif, with the counter of the "A"
   replaced by the arch motif so the logotype and the mark share a
   letterform. Rendered as text (not paths) so it stays crisp,
   selectable and accessible at every size.
   ----------------------------------------------------------------- */
export default function Logo({ className = '', compact = false, mono = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark
        className={`${compact ? 'h-7 w-7' : 'h-9 w-9'} shrink-0 ${mono ? '' : 'text-clay'}`}
      />
      <span className="flex flex-col justify-center leading-none">
        <span
          className="font-display font-medium text-charcoal"
          style={{
            fontSize: compact ? '1.02rem' : '1.22rem',
            letterSpacing: '.19em',
            fontVariationSettings: '"SOFT" 8, "WONK" 1',
          }}
        >
          {business.name.toUpperCase()}
        </span>
        <span
          className="mt-[3px] font-sans text-muted"
          style={{ fontSize: compact ? '.5938rem' : '.625rem', letterSpacing: '.32em', fontWeight: 600 }}
        >
          {business.suffix.toUpperCase()}
        </span>
      </span>
    </span>
  )
}

/* Large lockup used once, in the footer — the identity at full voice. */
export function LogoLockup({ className = '' }) {
  return (
    <div className={`flex flex-col items-start gap-5 ${className}`}>
      <LogoMark className="h-14 w-14 text-clay-soft" title={`${business.name} ${business.suffix}`} />
      <div>
        <div
          className="font-display text-[clamp(2rem,6vw,3.25rem)] font-medium leading-[.95] text-cream"
          style={{ letterSpacing: '.11em', fontVariationSettings: '"SOFT" 10, "WONK" 1' }}
        >
          {business.name.toUpperCase()}
        </div>
        <div
          className="mt-3 font-sans text-[.625rem] font-semibold text-sand/70"
          style={{ letterSpacing: '.42em' }}
        >
          {business.suffix.toUpperCase()} · {business.city.toUpperCase()}
        </div>
      </div>
    </div>
  )
}
