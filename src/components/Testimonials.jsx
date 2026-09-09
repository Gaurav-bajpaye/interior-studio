import Section from './Section'
import Reveal from './Reveal'
import Icon from './Icons'
import { testimonials } from '../data/site'

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export default function Testimonials() {
  return (
    <Section
      eyebrow="Clients"
      title="What clients say"
      className="bg-shell/50 py-20 md:py-28"
    >
      {/* horizontal snap on phones, grid from md up */}
      <div className="mt-12 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-6">
        {testimonials.map((t, i) => (
          <Reveal
            key={t.name}
            delay={i * 80}
            className="flex w-[85vw] shrink-0 snap-start flex-col rounded-2xl border border-line bg-cream p-6 sm:w-auto"
          >
            <div className="flex gap-0.5 text-gold-ink" aria-label="Five out of five">
              {[...Array(5)].map((_, s) => (
                <Icon.star key={s} className="h-3.5 w-3.5" />
              ))}
            </div>

            <blockquote className="mt-4 flex-1 text-[.9375rem] leading-relaxed text-ink">
              “{t.quote}”
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 font-display text-[.8125rem] font-medium text-gold-ink">
                {initials(t.name)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[.875rem] font-medium text-charcoal">
                  {t.name}
                </span>
                <span className="block truncate text-[.75rem] text-muted">
                  {[t.shop, t.role].filter(Boolean).join(' · ')}
                </span>
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
