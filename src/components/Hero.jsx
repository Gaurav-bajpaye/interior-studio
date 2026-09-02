import Img from './Img'
import Icon from './Icons'
import { business, contact, projects } from '../data/site'
import { waHref } from '../lib/links'

const stats = [
  { v: '60+', l: 'shops delivered' },
  { v: '4–10', l: 'weeks on site' },
  { v: '94%', l: 'on schedule' },
]

export default function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-cream pt-[104px] md:pt-28">
      {/* soft warm wash behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-shell blur-3xl md:-left-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[38%] top-24 hidden h-64 w-px bg-line lg:block"
      />

      <div className="shell relative">
        <div className="grid items-center gap-12 pb-16 md:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-16">
          {/* ---------------- copy ---------------- */}
          <div className="max-w-xl">
            <div className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-cream/70 py-1.5 pl-2 pr-4">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/12">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              <span className="text-[.75rem] font-medium tracking-wide text-ink/80">
                Retail interior studio · {business.city}
              </span>
            </div>

            <h1
              className="animate-rise mt-6 text-[clamp(2.5rem,7.2vw,4.4rem)] font-medium leading-[1.02]"
              style={{ animationDelay: '90ms' }}
            >
              Transform your store into
              <span className="relative mx-2 inline-block">
                <em
                  className="not-italic text-gold-ink"
                  style={{ fontVariationSettings: '"SOFT" 20, "WONK" 1', fontStyle: 'italic' }}
                >
                  a space
                </em>
              </span>
              customers love.
            </h1>

            <p
              className="animate-rise mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-muted"
              style={{ animationDelay: '180ms' }}
            >
              We design, renovate and expand small commercial spaces — clothing stores,
              salons, cafés and neighbourhood retail. More stock, better flow, the same
              rent.
            </p>

            <div
              className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '270ms' }}
            >
              <a
                href="#booking"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-charcoal px-7 py-4 font-medium text-cream shadow-soft transition-all duration-300 hover:bg-gold hover:shadow-lift"
              >
                Schedule a meeting
                <Icon.arrow className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-charcoal/15 px-7 py-4 font-medium text-charcoal transition-colors duration-300 hover:border-charcoal/40 hover:bg-shell/60"
              >
                View our work
                <span className="font-sans text-sm text-muted">({projects.length})</span>
              </a>
            </div>

            <dl
              className="animate-rise mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7"
              style={{ animationDelay: '360ms' }}
            >
              {stats.map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-2xl font-medium text-charcoal">{s.v}</dt>
                  <dd className="mt-1 text-[.8125rem] text-muted">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------------- image ---------------- */}
          <div className="relative">
            <div
              className="relative animate-fade"
              style={{ animationDelay: '160ms', animationDuration: '1.2s' }}
            >
              <Img
                photo="hero-main"
                alt="A completed clothing store interior with warm lighting and open display racks"
                priority
                width={1200}
                ratio={1.24}
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="arch aspect-4/5 w-full shadow-lift sm:aspect-[4/4.4]"
              />
              {/* keyline echoing the arch, offset like a drawing overlay */}
              <div
                aria-hidden
                className="arch pointer-events-none absolute -bottom-4 -right-4 -top-4 left-4 border border-gold/25 md:-right-6 md:left-6"
              />
            </div>

            {/* inset second image */}
            <div className="animate-floaty absolute -bottom-8 -left-2 w-36 sm:-left-8 sm:w-48 lg:-left-14 lg:w-56">
              <Img
                photo="hero-inset"
                alt="Café interior designed by the studio"
                width={600}
                ratio={1}
                sizes="200px"
                className="aspect-square rounded-2xl border-4 border-cream shadow-lift"
              />
            </div>

            {/* floating credential chip */}
            <div className="absolute -top-3 right-2 hidden rounded-full border border-line bg-cream/90 px-4 py-2 shadow-soft backdrop-blur-sm md:block lg:-right-6">
              <span className="text-[.75rem] font-medium text-ink">
                300 – 2,000 sq ft specialists
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* running strip of what we build */}
      <div className="relative border-y border-line bg-shell/60 py-3.5">
        <div className="flex overflow-hidden" aria-hidden>
          <div className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap pr-8">
            {[...Array(2)].map((_, dup) =>
              [
                'Clothing stores',
                'Salons & barbershops',
                'Cafés & bakeries',
                'Neighbourhood retail',
                'Shopfronts & signage',
                'Store expansions',
              ].map((t) => (
                <span key={`${dup}-${t}`} className="flex items-center gap-8">
                  <span className="text-[.8125rem] font-medium tracking-wide text-ink/80">{t}</span>
                  <span className="h-1 w-1 rounded-full bg-gold/50" />
                </span>
              )),
            )}
          </div>
        </div>
        <span className="sr-only">
          We design clothing stores, salons, cafés, bakeries and neighbourhood retail.
        </span>
      </div>

      {/* quiet WhatsApp affordance for phone visitors */}
      <a
        href={waHref(contact)}
        target="_blank"
        rel="noreferrer noopener"
        className="sr-only"
      >
        Message us on WhatsApp
      </a>
    </section>
  )
}
