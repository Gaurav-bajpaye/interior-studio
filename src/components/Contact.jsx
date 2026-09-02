import Section from './Section'
import Reveal from './Reveal'
import Icon from './Icons'
import { contact } from '../data/site'
import { waHref, telHref, mailHref } from '../lib/links'

const socialIcon = { Instagram: Icon.instagram, Pinterest: Icon.pinterest, LinkedIn: Icon.linkedin }

export default function Contact() {
  const cards = [
    {
      icon: Icon.phone,
      label: 'Call us',
      value: contact.phoneLabel,
      href: telHref(contact),
      note: contact.hours,
    },
    {
      icon: Icon.mail,
      label: 'Email',
      value: contact.email,
      href: mailHref(contact),
      note: 'Drawings and estimates come by email.',
    },
    {
      icon: Icon.pin,
      label: 'Studio',
      value: contact.addressLines[0],
      href: contact.mapsUrl,
      external: true,
      note: contact.addressLines[1],
    },
  ]

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Call, message, or come by the studio"
      intro="Send a photo of your shop with a rough size and we can usually tell you straight away whether we are the right fit."
      className="py-20 md:py-28"
    >
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 80}>
            <a
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className="group flex h-full flex-col rounded-2xl border border-line bg-cream p-6 transition-all duration-400 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-soft"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-shell text-gold-ink transition-colors duration-400 group-hover:bg-gold group-hover:text-cream">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="mt-5 text-[.6875rem] font-semibold uppercase tracking-[.14em] text-muted">
                {c.label}
              </span>
              <span className="mt-2 font-display text-[1.125rem] leading-snug text-charcoal">
                {c.value}
              </span>
              <span className="mt-2 text-[.8125rem] leading-relaxed text-muted">{c.note}</span>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Fast-route band — WhatsApp when it's on, email while it isn't */}
      <Reveal
        delay={140}
        className="mt-5 flex flex-col items-start gap-5 rounded-2xl bg-shell p-6 sm:flex-row sm:items-center sm:justify-between md:p-8"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold-ink">
            {contact.showWhatsapp ? (
              <Icon.whatsapp className="h-6 w-6" />
            ) : (
              <Icon.mail className="h-6 w-6" />
            )}
          </span>
          <div>
            <h3 className="text-[1.125rem] font-medium">
              {contact.showWhatsapp ? 'Message us on WhatsApp' : 'Send us your shop details'}
            </h3>
            <p className="mt-1 text-[.875rem] text-muted">
              {contact.showWhatsapp
                ? 'Photos, measurements, voice notes — whatever is easiest.'
                : 'Photos, rough measurements and what is not working today.'}
            </p>
          </div>
        </div>
        <a
          href={contact.showWhatsapp ? waHref(contact) : mailHref(contact)}
          {...(contact.showWhatsapp ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-charcoal px-6 py-3.5 font-medium text-cream transition-colors duration-300 hover:bg-gold-ink"
        >
          {contact.showWhatsapp ? 'Start a chat' : 'Email us'}
          <Icon.arrow className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>

      {/* socials */}
      <Reveal delay={180} className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-8">
        <span className="mr-1 text-[.875rem] text-muted">Follow the work:</span>
        {contact.socials.map((s) => {
          const Glyph = socialIcon[s.label] || Icon.arrowUpRight
          return (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2 text-[.875rem] text-ink/80 transition-colors hover:border-charcoal/40 hover:text-charcoal"
            >
              <Glyph className="h-4 w-4 text-gold-ink" />
              {s.handle}
            </a>
          )
        })}
      </Reveal>
    </Section>
  )
}
