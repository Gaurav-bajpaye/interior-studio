import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import Icon from './Icons'
import { booking, contact, business, services } from '../data/site'
import { waHref, mailHref } from '../lib/links'

const storeTypes = ['Clothing store', 'Salon / barbershop', 'Café / bakery', 'Small retail', 'Other']
const budgets = ['Under ₹3 lakh', '₹3 – 6 lakh', '₹6 – 12 lakh', '₹12 lakh +', 'Not sure yet']

/* A form link still holding the placeholder ID is not a form. */
const isPlaceholder = (url) => !url || url.includes('REPLACE_WITH_YOUR_FORM_ID')
const formReady = booking.useEmbed && !booking.sheetEndpoint && !isPlaceholder(booking.embedUrl)
const linkReady = !booking.sheetEndpoint && !isPlaceholder(booking.viewUrl)

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

/* The enquiry form.

   On submit it posts to the Google Apps Script published from the
   enquiries spreadsheet, which appends one row. The body is sent as
   URL-encoded form data on purpose: that counts as a "simple" request,
   so the browser skips the CORS preflight that Apps Script cannot
   answer.

   With no endpoint configured the same answers are composed into an
   email instead, so the form is never a dead end. */
function EnquiryForm() {
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const toSheet = Boolean(booking.sheetEndpoint)
  const viaWhatsapp = !toSheet && contact.showWhatsapp

  const compose = (data) =>
    [
      `New enquiry from the ${business.legalName} website`,
      '',
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      data.email ? `Email: ${data.email}` : null,
      `Store type: ${data.storeType}`,
      `Location: ${data.location}`,
      data.size ? `Approx. size: ${data.size} sq ft` : null,
      `Service needed: ${data.service}`,
      `Budget: ${data.budget}`,
      data.date ? `Preferred meeting date: ${data.date}` : null,
      data.details ? `\nDetails: ${data.details}` : null,
    ]
      .filter(Boolean)
      .join('\n')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    if (!toSheet) {
      const body = compose(data)
      if (viaWhatsapp) {
        window.open(waHref(contact, body), '_blank', 'noopener')
      } else {
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
          'Consultation request — ' + business.legalName,
        )}&body=${encodeURIComponent(body)}`
      }
      setState('sent')
      return
    }

    setState('sending')
    setError('')
    try {
      const res = await fetch(booking.sheetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams(data).toString(),
        redirect: 'follow',
      })
      const out = await res.json().catch(() => ({ ok: res.ok }))
      if (!out.ok) throw new Error(out.error || 'the sheet turned it away.')
      form.reset()
      setState('sent')
    } catch (err) {
      /* A failed fetch here is almost always the network or a script
         that has not been re-deployed — neither is worth showing raw. */
      const network = err instanceof TypeError
      setError(network ? 'the connection dropped.' : String(err.message || err))
      setState('error')
    }
  }

  const field =
    'w-full rounded-lg border border-line bg-cream px-3.5 py-3 text-[.9375rem] text-ink placeholder:text-muted transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/15'
  const label = 'block text-[.75rem] font-semibold uppercase tracking-[.1em] text-muted'

  if (state === 'sent' && toSheet) {
    return (
      <div className="rounded-2xl border border-line bg-cream p-8 text-center md:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/12 text-gold-ink">
          <Icon.check className="h-7 w-7" />
        </span>
        <h3 className="mt-6 font-display text-[1.5rem] font-medium text-charcoal">
          Thank you — we have your details.
        </h3>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted">
          {booking.responseTime} If it is urgent, call{' '}
          <a href={`tel:${contact.phone}`} className="link-underline font-medium text-charcoal">
            {contact.phoneLabel}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[.9375rem] font-medium text-charcoal transition-colors hover:border-charcoal/40 hover:bg-shell"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  const sending = state === 'sending'

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
          <input id="bk-phone" name="phone" required type="tel" className={`${field} mt-2`} placeholder="+91 80506 90693" autoComplete="tel" />
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

      {/* Honeypot — hidden from people, catnip to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="bk-company">Company (leave blank)</label>
        <input id="bk-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-charcoal px-6 py-4 font-medium text-cream transition-colors duration-300 hover:bg-gold-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {sending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
            Sending…
          </>
        ) : viaWhatsapp ? (
          <>
            <Icon.whatsapp className="h-[18px] w-[18px]" />
            Send on WhatsApp
          </>
        ) : (
          <>
            <Icon.mail className="h-[18px] w-[18px]" />
            Send enquiry
          </>
        )}
      </button>

      <p className="mt-4 text-[.8125rem] leading-relaxed text-muted" aria-live="polite">
        {state === 'error' ? (
          <span className="text-gold-ink">
            We could not save that — {error} Please call{' '}
            <a href={`tel:${contact.phone}`} className="link-underline font-medium text-charcoal">
              {contact.phoneLabel}
            </a>{' '}
            or email{' '}
            <a href={mailHref(contact)} className="link-underline font-medium text-charcoal">
              {contact.email}
            </a>
            .
          </span>
        ) : state === 'sent' ? (
          <span className="flex items-center gap-1.5 text-gold-ink">
            <Icon.check className="h-4 w-4" />
            {viaWhatsapp
              ? 'WhatsApp should have opened with your details.'
              : 'Your email app should have opened with the details filled in — press send.'}
          </span>
        ) : toSheet ? (
          <>
            Your answers go straight to our enquiries sheet. We only use them to
            reply to you.
          </>
        ) : viaWhatsapp ? (
          <>This opens WhatsApp with your answers filled in — review and hit send.</>
        ) : (
          <>
            This opens your email app with the answers filled in — review and press send.
            Or write to{' '}
            <a className="link-underline font-medium text-charcoal" href={mailHref(contact)}>
              {contact.email}
            </a>
            .
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
              <span className="eyebrow text-gold-soft">Schedule a meeting</span>
              <span className="h-px w-10 bg-gold-soft/40" />
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
                  <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
                  {e}
                </div>
              ))}
            </Reveal>

            {linkReady && (
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
                <p className="text-[.75rem] text-sand/70">
                  Opens in a new tab, in case the embedded form does not load.
                </p>
              </Reveal>
            )}

            <Reveal
              delay={300}
              className={`flex flex-wrap gap-x-6 gap-y-2 text-[.875rem] text-sand/70 ${
                linkReady ? 'mt-7' : 'mt-9 border-t border-cream/12 pt-7'
              }`}
            >
              <a href={`tel:${contact.phone}`} className="link-underline -my-3 flex items-center gap-2 py-3">
                <Icon.phone className="h-4 w-4 text-gold-soft" />
                {contact.phoneLabel}
              </a>
              <span className="flex items-center gap-2">
                <Icon.clock className="h-4 w-4 text-gold-soft" />
                {contact.hours}
              </span>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={120} className="text-ink">
            {formReady ? <EmbeddedForm /> : <EnquiryForm />}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
