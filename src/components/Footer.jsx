import { LogoLockup } from './Logo'
import Icon from './Icons'
import { business, contact, navLinks, services } from '../data/site'
import { waHref, telHref, mailHref } from '../lib/links'

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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/18 text-sand/80 transition-colors hover:border-clay-soft hover:bg-clay hover:text-cream"
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
              <ul className="mt-5 space-y-3 text-[.9375rem]">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`} className="link-underline transition-colors hover:text-cream">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#booking" className="link-underline transition-colors hover:text-cream">
                    Book a consultation
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <h3 className="text-[.6875rem] font-semibold uppercase tracking-[.16em] text-cream">
                Services
              </h3>
              <ul className="mt-5 space-y-3 text-[.9375rem]">
                {services.slice(0, 5).map((s) => (
                  <li key={s.title}>
                    <a href="#services" className="link-underline transition-colors hover:text-cream">
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
              <ul className="mt-5 space-y-3 text-[.9375rem]">
                <li>
                  <a href={telHref(contact)} className="link-underline transition-colors hover:text-cream">
                    {contact.phoneLabel}
                  </a>
                </li>
                <li>
                  <a href={mailHref(contact)} className="link-underline break-all transition-colors hover:text-cream">
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={waHref(contact)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline transition-colors hover:text-cream"
                  >
                    WhatsApp
                  </a>
                </li>
                <li className="pt-1 leading-relaxed text-sand/55">
                  {contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-[.8125rem] text-sand/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.legalName}. All rights reserved.
          </p>
          <p className="max-w-md leading-relaxed">
            We only use the details you send us to respond to your enquiry. Nothing is
            shared with third parties, and this site sets no tracking cookies.
          </p>
          <a href="#top" className="link-underline inline-flex items-center gap-1.5 self-start hover:text-cream">
            Back to top
            <Icon.arrow className="h-3.5 w-3.5 -rotate-90" />
          </a>
        </div>
      </div>
    </footer>
  )
}
