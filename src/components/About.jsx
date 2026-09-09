import Reveal from './Reveal'
import Img from './Img'
import Icon from './Icons'
import { about, business } from '../data/site'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1fr)] lg:gap-16">
          {/* images */}
          <div className="relative lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Img
                photo={about.portrait}
                alt={about.portraitAlt}
                width={1000}
                ratio={1.2}
                sizes="(max-width: 1024px) 92vw, 42vw"
                className="arch aspect-4/5 w-full shadow-soft"
              />
            </Reveal>

            <Reveal delay={140} className="absolute -bottom-6 -right-2 w-40 sm:w-48 lg:-right-8">
              <Img
                photo="about-detail"
                alt="On site during a fit-out — running the trades ourselves"
                width={500}
                ratio={1}
                sizes="190px"
                className="aspect-square rounded-2xl border-4 border-cream shadow-lift"
              />
            </Reveal>

            <Reveal delay={220} className="mt-10 max-w-xs text-[.8125rem] text-muted lg:mt-8">
              {about.portraitCaption}
            </Reveal>
          </div>

          {/* copy */}
          <div>
            <Reveal className="flex items-center gap-3">
              <span className="eyebrow">About the studio</span>
              <span className="h-px w-10 bg-gold/40" />
            </Reveal>

            <Reveal
              as="h2"
              delay={80}
              className="mt-5 text-[clamp(1.9rem,4.2vw,2.9rem)] font-medium leading-[1.1]"
            >
              {about.heading}
            </Reveal>

            <div className="mt-6 space-y-4">
              {about.paragraphs.map((p, i) => (
                <Reveal
                  as="p"
                  key={i}
                  delay={120 + i * 70}
                  className="leading-relaxed text-muted"
                >
                  {p}
                </Reveal>
              ))}
            </div>

            {/* specialties */}
            <Reveal delay={200} className="mt-10 flex flex-wrap gap-2">
              {about.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line bg-shell/60 px-3.5 py-1.5 text-[.8125rem] text-ink/80"
                >
                  {s}
                </span>
              ))}
            </Reveal>

            <Reveal delay={280} className="mt-10">
              <a
                href="#booking"
                className="group -my-3 inline-flex items-center gap-2 py-3 text-[.9375rem] font-medium text-charcoal link-underline"
              >
                Contact us about your space
                <Icon.arrow className="h-4 w-4 text-gold-ink transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
      <span className="sr-only">{business.blurb}</span>
    </section>
  )
}
