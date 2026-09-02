import { useMemo, useState } from 'react'
import Section from './Section'
import Reveal from './Reveal'
import Img from './Img'
import Icon from './Icons'
import ProjectModal from './ProjectModal'
import { categories, projects } from '../data/site'

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const shown = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.type === filter)),
    [filter],
  )

  const count = (c) => (c === 'All' ? projects.length : projects.filter((p) => p.type === c).length)

  return (
    <Section
      id="work"
      eyebrow="Our work"
      title="Shops we have designed, built and handed back"
      intro="Every project below was a working small business. Most stayed open while we built."
      className="py-20 md:py-28"
    >
      {/* filters */}
      <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-2">
        {categories.map((c) => {
          const on = filter === c
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={on}
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[.875rem] transition-all duration-300 ${
                on
                  ? 'border-charcoal bg-charcoal text-cream'
                  : 'border-line bg-cream text-ink/75 hover:border-charcoal/35 hover:text-charcoal'
              }`}
            >
              {c}
              <span className={`text-[.6875rem] ${on ? 'text-cream/55' : 'text-muted/70'}`}>
                {count(c)}
              </span>
            </button>
          )
        })}
      </Reveal>

      {/* grid */}
      <div className="mt-8 grid auto-rows-auto grid-flow-dense gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {shown.map((p, i) => (
          <Reveal
            key={p.id}
            delay={(i % 3) * 90}
            className={p.featured && i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(projects.indexOf(p))}
              className="group relative block h-full w-full overflow-hidden rounded-2xl bg-charcoal text-left"
              aria-label={`Open project: ${p.name}, ${p.storeType} in ${p.location}`}
            >
              <Img
                photo={p.photo}
                alt={`${p.name} — ${p.storeType} interior in ${p.location}`}
                width={p.featured && i === 0 ? 1400 : 900}
                ratio={p.featured && i === 0 ? 0.72 : 0.82}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                className={`w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.16,.84,.28,1)] group-hover:scale-[1.045] ${
                  p.featured && i === 0 ? 'aspect-4/3 lg:h-full lg:aspect-auto' : 'aspect-[4/3.4]'
                }`}
              />

              {/* legibility scrim */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="absolute left-4 top-4 rounded-full bg-cream/92 px-3 py-1 text-[.6875rem] font-semibold uppercase tracking-[.12em] text-charcoal backdrop-blur-sm">
                {p.type}
              </span>

              <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 md:inset-x-5 md:bottom-5">
                <span className="min-w-0">
                  <span className="block font-display text-[1.3125rem] font-medium leading-tight text-cream">
                    {p.name}
                  </span>
                  <span className="mt-1 block truncate text-[.8125rem] text-cream/70">
                    {p.storeType} · {p.location}
                  </span>
                  <span className="mt-2.5 hidden max-w-sm text-[.875rem] leading-relaxed text-cream/75 lg:block">
                    <span className="block max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      {p.summary}
                    </span>
                  </span>
                </span>
                <span className="flex h-10 w-10 shrink-0 translate-y-1 items-center justify-center rounded-full bg-cream/12 text-cream opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:bg-clay group-hover:opacity-100">
                  <Icon.arrowUpRight className="h-[18px] w-[18px]" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}

        <Reveal delay={120} className="min-h-[16rem]">
          <a
            href="#booking"
            className="group flex h-full flex-col justify-between rounded-2xl border border-clay/25 bg-clay/8 p-6 transition-colors duration-500 hover:border-clay/50 hover:bg-clay/12"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-clay text-cream transition-transform duration-500 group-hover:rotate-45">
              <Icon.arrowUpRight className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-[1.375rem] leading-tight text-charcoal">
                Your shop next?
              </span>
              <span className="mt-2 block text-[.875rem] leading-relaxed text-muted">
                Tell us the size, the trade and what is not working. We will tell you
                honestly what the space can become.
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[.875rem] font-medium text-clay">
                Book a consultation
                <Icon.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </span>
          </a>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <p className="text-[.9375rem] text-muted">
          Every project shows the before, the after and what changed.
        </p>
        <a
          href="#booking"
          className="group inline-flex items-center gap-2 text-[.9375rem] font-medium text-charcoal link-underline"
        >
          Talk to us about yours
          <Icon.arrow className="h-4 w-4 text-clay transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>

      <ProjectModal
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(n) => setOpenIndex((n + projects.length) % projects.length)}
      />
    </Section>
  )
}
