import Reveal from './Reveal'

/* Consistent section chrome: anchor id, generous rhythm, and a
   heading block with the studio's eyebrow + rule treatment. */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  align = 'left',
  className = '',
  headClassName = '',
  children,
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="shell">
        {(eyebrow || title) && (
          <div
            className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${headClassName}`}
          >
            {eyebrow && (
              <Reveal className="flex items-center gap-3" style={{ justifyContent: align === 'center' ? 'center' : undefined }}>
                <span className="eyebrow">{eyebrow}</span>
                <span className="h-px w-10 origin-left bg-gold/40" />
              </Reveal>
            )}
            {title && (
              <Reveal
                as="h2"
                delay={80}
                className="mt-5 text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.08]"
              >
                {title}
              </Reveal>
            )}
            {intro && (
              <Reveal as="p" delay={160} className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                {intro}
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
