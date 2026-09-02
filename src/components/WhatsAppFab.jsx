import { useEffect, useState } from 'react'
import Icon from './Icons'
import { contact } from '../data/site'
import { waHref } from '../lib/links'

/* Appears once the visitor is past the hero — the single most-used
   contact route for shops that find the site through Instagram. */
export default function WhatsAppFab() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (!contact.showWhatsapp) return null

  return (
    <a
      href={waHref(contact)}
      target="_blank"
      rel="noreferrer noopener"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pl-4 pr-4 text-charcoal shadow-lift transition-all duration-500 ease-[cubic-bezier(.16,.84,.28,1)] hover:pr-5 sm:bottom-7 sm:right-7 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Icon.whatsapp className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[.875rem] font-semibold transition-all duration-500 group-hover:max-w-[9rem] sm:group-hover:max-w-[9rem]">
        Chat with us
      </span>
      <span className="sr-only">Chat with us on WhatsApp</span>
    </a>
  )
}
