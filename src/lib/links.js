/* Outbound link builders — one place, so a number changes once. */

export const waHref = (c, message) =>
  `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(message || c.whatsappMessage)}`

export const telHref = (c) => `tel:${c.phone}`

export const mailHref = (c, subject = 'Shop interior enquiry') =>
  `mailto:${c.email}?subject=${encodeURIComponent(subject)}`
