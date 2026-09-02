import { useEffect, useState } from 'react'
import Logo from './Logo'
import Icon from './Icons'
import { navLinks, contact } from '../data/site'
import { waHref, mailHref } from '../lib/links'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  /* Solidify the bar once the hero starts sliding under it */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Scroll-spy: highlight the section currently occupying the viewport */
  useEffect(() => {
    const ids = [...navLinks.map((l) => l.id), 'booking']
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  /* Lock the page behind the mobile sheet, and close it on Escape */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-b border-line/70 bg-cream/85 backdrop-blur-xl shadow-[0_1px_24px_-14px_rgba(27,25,23,.5)]'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6 md:h-20">
          <a
            href="#top"
            className="-m-2 shrink-0 rounded p-2 transition-opacity hover:opacity-70"
            aria-label={`Go to top — home`}
          >
            <Logo compact />
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-active={active === l.id}
                className="link-underline text-[.9375rem] text-ink/80 transition-colors hover:text-charcoal data-[active=true]:text-charcoal"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {contact.showWhatsapp && (
              <a
                href={waHref(contact)}
                target="_blank"
                rel="noreferrer noopener"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold hover:bg-gold hover:text-cream sm:flex"
                aria-label="Chat with us on WhatsApp"
                title="WhatsApp"
              >
                <Icon.whatsapp className="h-[18px] w-[18px]" />
              </a>
            )}

            <a
              href="#booking"
              className="group hidden items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-[.875rem] font-medium text-cream transition-all duration-300 hover:bg-gold sm:inline-flex"
            >
              Book a consultation
              <Icon.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-charcoal lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-4 w-6">
                <span
                  className={`absolute left-0 block h-[1.5px] w-6 bg-current transition-transform duration-300 ${
                    open ? 'top-[7px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-[1.5px] w-6 bg-current transition-opacity duration-200 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] bg-current transition-all duration-300 ${
                    open ? 'top-[7px] w-6 -rotate-45' : 'top-[14px] w-4'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-charcoal/25 backdrop-blur-[2px] transition-opacity duration-400 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          className={`grain absolute inset-x-0 top-0 origin-top bg-cream pb-8 pt-[84px] shadow-lift transition-[transform,opacity] duration-500 ease-[cubic-bezier(.16,.84,.28,1)] ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          aria-label="Mobile"
        >
          <div className="shell">
            <ul className="divide-y divide-line/70 border-y border-line/70">
              {navLinks.map((l, i) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: open ? `${90 + i * 45}ms` : '0ms' }}
                    className={`flex items-baseline gap-4 py-4 font-display text-2xl text-charcoal transition-[opacity,transform] duration-500 ${
                      open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}
                  >
                    <span className="font-sans text-[.625rem] font-semibold tracking-[.2em] text-gold-ink">
                      0{i + 1}
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-7 grid gap-3">
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3.5 font-medium text-cream"
              >
                Book a consultation
                <Icon.arrow className="h-4 w-4" />
              </a>
              {contact.showWhatsapp ? (
                <a
                  href={waHref(contact)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 font-medium text-charcoal"
                >
                  <Icon.whatsapp className="h-[18px] w-[18px] text-[#25D366]" />
                  WhatsApp us
                </a>
              ) : (
                <a
                  href={mailHref(contact)}
                  className="flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 font-medium text-charcoal"
                >
                  <Icon.mail className="h-[18px] w-[18px] text-gold-ink" />
                  Email us
                </a>
              )}
              <a
                href={`tel:${contact.phone}`}
                className="py-3 text-center text-sm text-muted"
              >
                or call {contact.phoneLabel}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
