import { useEffect, useRef } from 'react'
import Reveal from './Reveal'
import Img from './Img'
import Icon from './Icons'
import { about, business, studioVideo } from '../data/site'

export default function About() {
  const clip = useRef(null)

  /* Browsers pause an autoplaying video once it scrolls out of view and
     do not reliably resume it, so it can sit frozen mid-frame when the
     reader comes back. Driving play/pause off visibility fixes that and
     keeps it from burning CPU while nobody is looking. play() rejects
     when a browser refuses autoplay outright; the poster covers that. */
  useEffect(() => {
    const el = clip.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1fr)] lg:gap-16">
          {/* images */}
          <div className="relative lg:sticky lg:top-28 lg:self-start">
            {/* The clip leads, the photograph sits in as the inset. Muted is
                what makes autoplay legal in every browser, playsInline keeps
                iOS from going fullscreen, and the poster stands in entirely
                where motion is unwanted. */}
            <Reveal>
              <div className="arch relative aspect-4/5 w-full overflow-hidden bg-sand shadow-soft">
                <video
                  ref={clip}
                  src={studioVideo.src}
                  poster={studioVideo.poster}
                  aria-label={studioVideo.alt}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover motion-reduce:hidden"
                />
                <img
                  src={studioVideo.poster}
                  alt={studioVideo.alt}
                  className="hidden h-full w-full object-cover motion-reduce:block"
                />
              </div>
            </Reveal>

            <Reveal delay={140} className="absolute -bottom-6 -right-2 w-40 sm:w-48 lg:-right-8">
              <Img
                photo={about.portrait}
                alt={about.portraitAlt}
                width={500}
                ratio={1}
                sizes="190px"
                className="aspect-square rounded-2xl border-4 border-cream shadow-lift"
              />
            </Reveal>

            <Reveal delay={220} className="mt-10 max-w-xs text-[.8125rem] leading-relaxed text-muted lg:mt-8">
              {about.mediaCaption}{' '}
              <span className="text-muted/80">{about.portraitCaption}</span>
            </Reveal>
          </div>

          {/* copy */}
          <div>
            <Reveal className="flex items-center gap-3">
              <span className="eyebrow">About Miraj Spaces</span>
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
