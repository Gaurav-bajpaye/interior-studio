import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import Icon from './Icons'
import { booking, contact, business, services } from '../data/site'
import { waHref, mailHref } from '../lib/links'

const storeTypes = ['Clothing store', 'Salon / barbershop', 'Café / bakery', 'Small retail', 'Other']
const budgets = ['Under ₹3 lakh', '₹3 – 6 lakh', '₹6 – 12 lakh', '₹12 lakh +', 'Not sure yet']

/* The Google Form iframe only mounts once it is close to the viewport,
   so it never blocks the first paint on a phone. */
function EmbeddedForm() {
  const holder = useRef(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = holder.current
    if (!el || typeof IntersectionObserver === 'undefined') return setLoad(true)
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setLoad(true), io.disconnect()),
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={holder} className="overflow-hidden rounded-2xl border border-line bg-cream">
      {load ? (
        <iframe
          src={booking.embedUrl}
          title="Consultation booking form"
          className="h-[820px] w-full"
          loading="lazy"
        >
          Loading the booking form…
        </iframe>
      ) : (
        <div className="grid h-[820px] place-items-center text-sm text-muted">
          Loading the booking form…
        </div>
      )}
    </div>
  )
}

/* No-backend fallback: composes the enquiry into a WhatsApp message
   (or an email) so nothing is lost if the Google Form is not set up. */
function EnquiryForm() {
  const [sent, setSent] = useState(false)

  const compose = (form) => {
    const f = Object.fromEntries(new FormData(form).entries())
    return [
      `New enquiry from the ${business.name} ${business.suffix} website`,
      '',
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      f.email ? `Email: ${f.email}` : null,
      `Store type: ${f.storeType}`,
      `Location: ${f.location}`,
      f.size ? `Approx. size: ${f.size} sq ft` : null,
      `Service needed: ${f.service}`,
      `Budget: ${f.budget}`,
      f.date ? `Preferred meeting date: ${f.date}` : null,
      f.details ? `\nDetails: ${f.details}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const text = compose(e.currentTarget)
    window.open(waHref(contact, text), '_blank', 'noopener')
    setSent(true)
  }

  const field =
    'w-full rounded-lg border border-line bg-cream px-3.5 py-3 text-[.9375rem] text-ink placeholder:text-muted/60 transition-colors focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/15'
  const label = 'block text-[.75rem] font-semibold uppercase tracking-[.1em] text-muted'

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-cream p-6 md:p-8"
      aria-label="Consultation request"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="bk-name">Your name *</label>
          <input id="bk-name" name="name" required className={`${field} mt-2`} placeholder="Meera Krishnan" autoComplete="name" />
        </div>

        <div>
          <label className={label} htmlFor="bk-phone">Phone *</label>
          <input id="bk-phone" name="phone" required type="tel" className={`${field} mt-2`} placeholder="+91 98450 12345" autoComplete="tel" />
        </div>

        <div>
          <label className={label} htmlFor="bk-email">Email</label>
          <input id="bk-email" name="email" type="email" className={`${field} mt-2`} placeholder="you@shop.com" autoComplete="email" />
        </div>

        <div>
          <label className={label} htmlFor="bk-store">Store type *</label>
          <select id="bk-store" name="storeType" required defaultValue="" className={`${field} mt-2`}>
            <option value="" disabled>Choose one</option>
            {storeTypes.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="bk-loc">Store location *</label>
          <input id="bk-loc" name="location" required className={`${field} mt-2`} placeholder="Indiranagar, Bengaluru" />
        </div>

        <div>
          <label className={label} htmlFor="bk-size">Approx. size (sq ft)</label>
          <input id="bk-size" name="size" inputMode="numeric" className={`${field} mt-2`} placeholder="450" />
        </div>

        <div>
          <label className={label} htmlFor="bk-service">Service needed *</label>
          <select id="bk-service" name="service" required defaultValue="" className={`${field} mt-2`}>
            <option value="" disabled>Choose one</option>
            {services.map((s) => <option key={s.title}>{s.title}</option>)}
            <option>Not sure — need advice</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="bk-budget">Estimated budget *</label>
          <select id="bk-budget" name="budget" required defaultValue="" className={`${field} mt-2`}>
            <option value="" disabled>Choose one</option>
            {budgets.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="bk-date">Preferred meeting date</label>
          <input id="bk-date" name="date" type="date" className={`${field} mt-2`} />
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="bk-details">Project details</label>
          <textarea
            id="bk-details"
            name="details"
            rows={4}
            className={`${field} mt-2 resize-y`}
            placeholder="What is not working today? Are you renovating, expanding or starting new?"
          />
        </div>
      </div>

      <button
        type="submit"
        className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-charcoal px-6 py-4 font-medium text-cream transition-colors duration-300 hover:bg-clay sm:w-auto"
      >
        <Icon.whatsapp className="h-[18px] w-[18px]" />
        Send on WhatsApp
      </button>

      <p className="mt-4 text-[.8125rem] leading-relaxed text-muted">
        {sent ? (
          <span className="flex items-center gap-1.5 text-olive">
            <Icon.check className="h-4 w-4" />
            WhatsApp should have opened with your details. If it did not,{' '}
            <a className="link-underline font-medium text-charcoal" href={mailHref(contact)}>
              email us instead
            </a>
            .
          </span>
        ) : (
          <>
            This opens WhatsApp with your answers filled in — review and hit send. Prefer
            email?{' '}
            <a className="link-underline font-medium text-charcoal" href={mailHref(contact)}>
              {contact.email}
            </a>
          </>
        )}
      </p>
    </form>
  )
}

export default function Booking() {
  return (
    <section id="booking" className="scroll-mt-24 bg-charcoal py-20 text-cream md:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-16">
          {/* left rail */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="flex items-center gap-3">
              <span className="eyebrow text-clay-soft">Schedule a meeting</span>
              <span className="h-px w-10 bg-clay-soft/40" />
            </Reveal>

            <Reveal
              as="h2"
              delay={80}
              className="mt-5 text-[clamp(1.9rem,4.4vw,3rem)] font-medium leading-[1.08] text-cream"
            >
              Tell us about your shop.
            </Reveal>

            <Reveal as="p" delay={140} className="mt-5 max-w-sm leading-relaxed text-sand/70">
              The first conversation is free and there is no obligation after it.
              {' '}{booking.responseTime}
            </Reveal>

            <Reveal delay={200} className="mt-8 space-y-3.5">
              {booking.expect.map((e) => (
                <div key={e} className="flex gap-3 text-[.9375rem] text-sand/85">
                  <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-clay-soft" />
                  {e}
                </div>
              ))}
            </Reveal>

            <Reveal delay={260} className="mt-9 space-y-2.5 border-t border-cream/12 pt-7">
              <a
                href={booking.viewUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/25 px-5 py-3.5 text-[.9375rem] font-medium text-cream transition-colors hover:border-cream/60 hover:bg-cream/5 sm:w-auto"
              >
                Open booking form
                <Icon.arrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="text-[.75rem] text-sand/50">
                Opens in a new tab, in case the embedded form does not load.
              </p>
            </Reveal>

            <Reveal delay={300} className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[.875rem] text-sand/70">
              <a href={`tel:${contact.phone}`} className="link-underline -my-3 flex items-center gap-2 py-3">
                <Icon.phone className="h-4 w-4 text-clay-soft" />
                {contact.phoneLabel}
              </a>
              <span className="flex items-center gap-2">
                <Icon.clock className="h-4 w-4 text-clay-soft" />
                {contact.hours}
              </span>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={120} className="text-ink">
            {booking.useEmbed ? <EmbeddedForm /> : <EnquiryForm />}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
