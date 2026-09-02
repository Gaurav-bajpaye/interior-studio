import { LogoLockup } from './Logo'
import Icon from './Icons'
import { business, contact, navLinks, services } from '../data/site'
import { waHref, telHref, mailProps } from '../lib/links'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="grain relative overflow-hidden bg-charcoal pt-16 text-sand/70 md:pt-20">
      <div className="shell relative">
        <div className="grid gap-12 border-b border-cream/12 pb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] lg:gap-20">
          <div>
            <LogoLockup />
            <p className="mt-7 max-w-sm text-[.9375rem] leading-relaxed">{business.blurb}</p>

            <div className="mt-7 flex gap-2.5">
              {contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/18 sm:h-10 sm:w-10 text-sand/80 transition-colors hover:border-gold-soft hover:bg-gold hover:text-cream"
                >
                  {(s.label === 'Instagram' && <Icon.instagram className="h-[18px] w-[18px]" />) ||
                    (s.label === 'Pinterest' && <Icon.pinterest className="h-[18px] w-[18px]" />) ||
                    (s.label === 'LinkedIn' && <Icon.linkedin className="h-[18px] w-[18px]" />) || (
                      <Icon.arrowUpRight className="h-[18px] w-[18px]" />
                    )}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-label="Footer">
              <h3 className="text-[.6875rem] font-semibold uppercase tracking-[.16em] text-cream">
                Explore
              </h3>
              <ul className="mt-5 space-y-1 text-[.9375rem] sm:space-y-3">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`} className="link-underline inline-block py-2.5 transition-colors hover:text-cream sm:py-0">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#booking" className="link-underline inline-block py-2.5 transition-colors hover:text-cream sm:py-0">
                    Book a consultation
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <h3 className="text-[.6875rem] font-semibold uppercase tracking-[.16em] text-cream">
                Services
              </h3>
              <ul className="mt-5 space-y-1 text-[.9375rem] sm:space-y-3">
                {services.slice(0, 5).map((s) => (
                  <li key={s.title}>
                    <a href="#services" className="link-underline inline-block py-2.5 transition-colors hover:text-cream sm:py-0">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[.6875rem] font-semibold uppercase tracking-[.16em] text-cream">
                Reach us
              </h3>
              <ul className="mt-5 space-y-1 text-[.9375rem] sm:space-y-3">
                <li>
                  <a href={telHref(contact)} className="link-underline inline-block py-2.5 transition-colors hover:text-cream sm:py-0">
                    {contact.phoneLabel}
                  </a>
                </li>
                <li>
                  <a {...mailProps(contact)} className="link-underline inline-block break-all py-2.5 transition-colors hover:text-cream sm:py-0">
                    {contact.email}
                  </a>
                </li>
                {contact.showWhatsapp && (
                  <li>
                    <a
                      href={waHref(contact)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline inline-block py-2.5 transition-colors hover:text-cream sm:py-0"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                <li className="pt-3 leading-relaxed text-sand/70 sm:pt-1">
                  {contact.hours}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-[.8125rem] text-sand/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.legalName}. All rights reserved.
          </p>
          <p className="max-w-md leading-relaxed">
            We only use the details you send us to respond to your enquiry. Nothing is
            shared with third parties, and this site sets no tracking cookies.
          </p>
          <a href="#top" className="link-underline -my-2.5 inline-flex items-center gap-1.5 self-start py-2.5 hover:text-cream">
            Back to top
            <Icon.arrow className="h-3.5 w-3.5 -rotate-90" />
          </a>
        </div>
      </div>
    </footer>
  )
}
