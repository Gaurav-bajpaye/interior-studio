/* Line icons drawn on a 24px grid, 1.5 stroke — matched to the
   weight of the logo mark so nothing looks borrowed. */
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const Icon = {
  blueprint: (p) => (
    <svg {...base} {...p}>
      <path d="M3 5.5 12 3l9 2.5v13L12 21l-9-2.5v-13Z" />
      <path d="M12 3v18M3 12h18" strokeDasharray="2 2.5" />
      <path d="M7.5 8.5h3v3h-3z" />
    </svg>
  ),
  expand: (p) => (
    <svg {...base} {...p}>
      <path d="M4 20V9l6-4v15" />
      <path d="M10 20V9l10-4v15H3" />
      <path d="M14 12h2" />
    </svg>
  ),
  layout: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M9 10v10" />
      <circle cx="6" cy="7" r=".6" fill="currentColor" />
    </svg>
  ),
  palette: (p) => (
    <svg {...base} {...p}>
      <path d="M12 21a9 9 0 1 1 9-9c0 2-1.6 2.6-3 2.6h-1.4a2 2 0 0 0-1.4 3.4c.4.5.3 1.4-.6 1.8-.8.2-1.7.2-2.6.2Z" />
      <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tag: (p) => (
    <svg {...base} {...p}>
      <path d="M20 12.6 12.6 20a2 2 0 0 1-2.8 0l-5.8-5.8a2 2 0 0 1-.6-1.5l.3-6a2 2 0 0 1 1.9-1.9l6-.3a2 2 0 0 1 1.5.6L20 9.8a2 2 0 0 1 0 2.8Z" />
      <circle cx="8.6" cy="8.6" r="1.3" />
    </svg>
  ),
  hardhat: (p) => (
    <svg {...base} {...p}>
      <path d="M3 17a9 9 0 0 1 18 0" />
      <path d="M2 17h20v2H2z" />
      <path d="M9 8.5V5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
  ),
  phone: (p) => (
    <svg {...base} {...p}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
    </svg>
  ),
  mail: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  ),
  pin: (p) => (
    <svg {...base} {...p}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  clock: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.2 2" />
    </svg>
  ),
  whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width={24} height={24} {...p}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.5 3.68 1.4 5.22L2 22l5.07-1.55a9.8 9.8 0 0 0 4.97 1.35h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.03-5.1-2.9-6.96A9.75 9.75 0 0 0 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1.95.83-3.02-.2-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.5 3.68-8.16 8.2-8.16 2.19 0 4.25.85 5.8 2.4a8.12 8.12 0 0 1 2.4 5.77c0 4.5-3.68 8.03-8.2 8.03Zm4.5-6.02c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.24-.63.79-.78.96-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-1.97-1.21 7.4 7.4 0 0 1-1.36-1.7c-.15-.24-.02-.37.1-.5.11-.1.25-.28.37-.42.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.48c-.16 0-.43.06-.65.3-.22.25-.85.84-.85 2.04 0 1.2.87 2.36.99 2.52.12.17 1.71 2.63 4.15 3.68.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  ),
  instagram: (p) => (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  pinterest: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width={24} height={24} {...p}>
      <path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-.78-.17-1.98.03-2.83.19-.78 1.2-4.96 1.2-4.96s-.3-.61-.3-1.51c0-1.42.82-2.48 1.85-2.48.87 0 1.29.66 1.29 1.44 0 .88-.56 2.2-.85 3.42-.24 1.02.51 1.86 1.52 1.86 1.83 0 3.23-1.93 3.23-4.71 0-2.46-1.77-4.18-4.3-4.18-2.93 0-4.65 2.2-4.65 4.47 0 .89.34 1.84.77 2.36a.3.3 0 0 1 .07.3c-.08.32-.25.98-.28 1.11-.05.19-.15.23-.35.14-1.3-.6-2.11-2.5-2.11-4.02 0-3.27 2.38-6.28 6.86-6.28 3.6 0 6.4 2.57 6.4 6 0 3.58-2.26 6.46-5.39 6.46-1.05 0-2.04-.55-2.38-1.2l-.65 2.47c-.23.9-.86 2.04-1.29 2.73A10 10 0 1 0 12 2Z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5V16M8 7.6v.1M12 16v-3.2a1.8 1.8 0 0 1 3.6 0V16" />
    </svg>
  ),
  arrow: (p) => (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  arrowUpRight: (p) => (
    <svg {...base} {...p}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  ),
  close: (p) => (
    <svg {...base} {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ),
  chevronLeft: (p) => (
    <svg {...base} {...p}>
      <path d="m14 6-6 6 6 6" />
    </svg>
  ),
  chevronRight: (p) => (
    <svg {...base} {...p}>
      <path d="m10 6 6 6-6 6" />
    </svg>
  ),
  check: (p) => (
    <svg {...base} {...p}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  ),
  star: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden width={24} height={24} {...p}>
      <path d="m12 3.5 2.6 5.3 5.9.85-4.25 4.14 1 5.86L12 16.9l-5.25 2.75 1-5.86L3.5 9.65l5.9-.85L12 3.5Z" />
    </svg>
  ),
  drag: (p) => (
    <svg {...base} {...p}>
      <path d="M9 7 5 12l4 5M15 7l4 5-4 5" />
    </svg>
  ),
  menu: (p) => (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  ),
}

export default Icon
