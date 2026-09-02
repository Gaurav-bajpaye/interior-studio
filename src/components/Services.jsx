import Section from './Section'
import Reveal from './Reveal'
import Icon from './Icons'
import { services } from '../data/site'

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="What we do"
      title="Everything between an empty shell and an open shop"
      intro="Take the whole thing or one piece of it. Most owners start with a layout and come back for the build."
      className="py-20 md:py-28"
    >
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Glyph = Icon[s.icon]
          return (
            <Reveal
              key={s.title}
              delay={i * 70}
              className="group relative flex flex-col bg-cream p-7 transition-colors duration-500 hover:bg-shell/70 md:p-8"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-clay transition-transform duration-500 ease-[cubic-bezier(.16,.84,.28,1)] group-hover:scale-x-100"
              />
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-shell text-clay transition-colors duration-500 group-hover:bg-clay group-hover:text-cream">
                <Glyph className="h-[22px] w-[22px]" />
              </span>

              <h3 className="mt-6 text-[1.1875rem] font-medium leading-snug">{s.title}</h3>
              <p className="mt-3 text-[.9375rem] leading-relaxed text-muted">{s.text}</p>

              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-line/80 pt-5 text-[.8125rem] text-ink/70">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-1.5">
                    <Icon.check className="h-3.5 w-3.5 text-clay/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
