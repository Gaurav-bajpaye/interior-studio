import Section from './Section'
import Reveal from './Reveal'
import Icon from './Icons'
import { steps } from '../data/site'

export default function Process() {
  return (
    <Section
      id="process"
      eyebrow="How it works"
      title="Five steps, and you know the cost before the drawings are final"
      intro="No part of this is a black box. You see the estimate at step three, and nothing is ordered until you have signed off on it."
      className="bg-shell/50 py-20 md:py-28"
    >
      <div className="relative mt-14">
        {/* connecting rule */}
        <div
          aria-hidden
          className="absolute left-[19px] top-2 hidden h-[calc(100%-3rem)] w-px bg-line md:block lg:left-0 lg:top-[19px] lg:h-px lg:w-full"
        />

        <ol className="grid gap-8 md:gap-10 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 90}
              className="group relative flex gap-5 lg:block"
            >
              <div className="relative shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream font-display text-[.8125rem] font-medium text-clay transition-colors duration-500 group-hover:border-clay group-hover:bg-clay group-hover:text-cream">
                  {s.n}
                </span>
              </div>

              <div className="lg:mt-6 lg:pr-6">
                <span className="text-[.6875rem] font-semibold uppercase tracking-[.14em] text-muted">
                  {s.meta}
                </span>
                <h3 className="mt-2 text-[1.125rem] font-medium leading-snug">{s.title}</h3>
                <p className="mt-2.5 text-[.9375rem] leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal
        delay={200}
        className="mt-14 flex flex-col items-start gap-5 rounded-2xl border border-line bg-cream p-7 sm:flex-row sm:items-center sm:justify-between md:p-8"
      >
        <div>
          <h3 className="text-[1.1875rem] font-medium">Start at step one this week.</h3>
          <p className="mt-1.5 text-[.9375rem] text-muted">
            The first consultation is free, on site or on a call.
          </p>
        </div>
        <a
          href="#booking"
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-charcoal px-6 py-3.5 font-medium text-cream transition-colors duration-300 hover:bg-clay"
        >
          Book a consultation
          <Icon.arrow className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>
    </Section>
  )
}
