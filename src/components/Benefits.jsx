import Reveal from './Reveal'
import Img from './Img'
import { benefits } from '../data/site'

export default function Benefits() {
  return (
    <section className="grain relative overflow-hidden bg-charcoal py-20 text-cream md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-clay/12 blur-3xl"
      />
      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="flex items-center gap-3">
              <span className="eyebrow text-clay-soft">Why choose us</span>
              <span className="h-px w-10 bg-clay-soft/40" />
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              className="mt-5 text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.08] text-cream"
            >
              Small shops are not scaled-down showrooms.
            </Reveal>
            <Reveal as="p" delay={150} className="mt-5 max-w-md leading-relaxed text-sand/70">
              A 400 sq ft store has to do everything a large one does — display, storage,
              billing, staff, movement — with none of the slack. That constraint is the
              whole job, and it is the only kind of job we take.
            </Reveal>

            <Reveal delay={220} className="mt-10 hidden lg:block">
              <Img
                photo="terra-after"
                alt="A completed homeware store with room-set displays"
                width={800}
                ratio={0.72}
                sizes="30vw"
                className="aspect-[4/2.9] rounded-2xl"
              />
            </Reveal>
          </div>

          <ol className="relative">
            {benefits.map((b, i) => (
              <Reveal
                key={b.title}
                as="li"
                delay={i * 80}
                className="group flex gap-6 border-b border-cream/12 py-7 first:pt-0 last:border-0"
              >
                <span className="mt-1 font-display text-[.9375rem] text-clay-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-[1.25rem] font-medium text-cream transition-colors duration-300 group-hover:text-clay-soft">
                    {b.title}
                  </h3>
                  <p className="mt-2.5 max-w-lg leading-relaxed text-sand/65">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
