/* Outbound link builders — one place, so a number changes once. */

export const waHref = (c, message) =>
  `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(message || c.whatsappMessage)}`

export const telHref = (c) => `tel:${c.phone}`

/* Email is the awkward one. A plain mailto: only works if the visitor
   has a mail client wired up, and on desktop it very often does nothing
   at all — the click just dies. So `emailProvider` decides:

     'gmail'   open Gmail's compose window in a new tab (the default,
               since the studio is on Google Workspace and Gmail is what
               most of its customers use)
     'outlook' the Outlook web equivalent
     'mailto'  hand off to the visitor's own mail client

   `mailProps` returns href/target/rel together so a webmail link always
   opens in a new tab and never navigates the site away. The address is
   always visible as the link text, so nobody is stuck if their setup is
   unusual. */
const composers = {
  gmail: (c, subject, body) =>
    'https://mail.google.com/mail/?view=cm&fs=1' +
    `&to=${encodeURIComponent(c.email)}` +
    `&su=${encodeURIComponent(subject)}` +
    (body ? `&body=${encodeURIComponent(body)}` : ''),

  outlook: (c, subject, body) =>
    'https://outlook.live.com/mail/0/deeplink/compose' +
    `?to=${encodeURIComponent(c.email)}` +
    `&subject=${encodeURIComponent(subject)}` +
    (body ? `&body=${encodeURIComponent(body)}` : ''),

  mailto: (c, subject, body) =>
    `mailto:${c.email}?subject=${encodeURIComponent(subject)}` +
    (body ? `&body=${encodeURIComponent(body)}` : ''),
}

const DEFAULT_SUBJECT = 'Shop interior enquiry'

export const mailHref = (c, subject = DEFAULT_SUBJECT, body) =>
  (composers[c.emailProvider] || composers.gmail)(c, subject, body)

/** Spread onto an <a> so webmail opens in a new tab, mailto does not. */
export const mailProps = (c, subject = DEFAULT_SUBJECT, body) => {
  const href = mailHref(c, subject, body)
  return href.startsWith('mailto:')
    ? { href }
    : { href, target: '_blank', rel: 'noreferrer noopener' }
}
