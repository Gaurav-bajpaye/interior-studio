import { useEffect, useRef, useState } from 'react'
import Img from './Img'
import Icon from './Icons'
import BeforeAfter from './BeforeAfter'
import { projects, contact } from '../data/site'
import { waHref } from '../lib/links'

export default function ProjectModal({ index, onClose, onNavigate }) {
  const open = index !== null && index !== undefined
  const project = open ? projects[index] : null
  const panel = useRef(null)
  const [shot, setShot] = useState(0)
  const [shownIndex, setShownIndex] = useState(index)

  /* Moving to another project resets the gallery to its first photo. */
  if (index !== shownIndex) {
    setShownIndex(index)
    setShot(0)
  }

  /* Keyboard: Escape closes, arrows move between projects.
     Scroll on the body is frozen while the dialog is up. */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(index + 1)
      if (e.key === 'ArrowLeft') onNavigate(index - 1)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    panel.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, index, onClose, onNavigate])

  if (!open) return null

  const shots = [project.photo, ...(project.gallery || [])]
  const meta = [
    ['Store type', project.storeType],
    ['Location', project.location],
    ['Size', project.size],
    ['Timeline', project.timeline],
    ['Scope', project.scope],
    ['Completed', project.year],
  ]

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto overscroll-contain p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — project details`}
    >
      <div
        className="animate-fade fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={panel}
        tabIndex={-1}
        className="animate-rise relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-cream shadow-lift outline-none"
        style={{ animationDuration: '.55s' }}
      >
        {/* bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-cream/92 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="min-w-0">
            <h3 className="truncate text-[1.125rem] font-medium leading-tight sm:text-[1.25rem]">
              {project.name}
            </h3>
            <p className="mt-0.5 truncate text-[.8125rem] text-muted">
              {project.storeType} · {project.location}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => onNavigate(index - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-charcoal/40 hover:bg-shell"
              aria-label="Previous project"
            >
              <Icon.chevronLeft className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(index + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-charcoal/40 hover:bg-shell"
              aria-label="Next project"
            >
              <Icon.chevronRight className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-cream transition-colors hover:bg-clay"
              aria-label="Close"
            >
              <Icon.close className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
          {/* visuals */}
          <div>
            {project.before ? (
              <>
                <BeforeAfter before={project.before} after={project.photo} alt={project.name} />
                <p className="mt-2.5 flex items-center gap-1.5 text-[.75rem] text-muted">
                  <Icon.drag className="h-3.5 w-3.5 text-clay" />
                  Drag the handle to see the space before we started.
                </p>
              </>
            ) : (
              <Img
                photo={project.photo}
                alt={`${project.name} interior`}
                width={1400}
                ratio={0.68}
                className="aspect-[3/2] w-full rounded-xl"
              />
            )}

            {shots.length > 1 && (
              <>
                <Img
                  key={shots[shot]}
                  photo={shots[shot]}
                  alt={`${project.name} — view ${shot + 1}`}
                  width={1200}
                  ratio={0.66}
                  className="mt-4 aspect-[3/2] w-full rounded-xl"
                />
                <div className="mt-3 flex gap-2.5">
                  {shots.map((s, i) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShot(i)}
                      aria-label={`View photo ${i + 1}`}
                      aria-current={shot === i}
                      className={`overflow-hidden rounded-lg border-2 transition-colors ${
                        shot === i ? 'border-clay' : 'border-transparent hover:border-line'
                      }`}
                    >
                      <Img
                        photo={s}
                        alt=""
                        width={220}
                        ratio={0.75}
                        sizes="76px"
                        className="h-14 w-[76px]"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* details */}
          <div>
            <span className="eyebrow">{project.type}</span>
            <p className="mt-4 font-display text-[1.375rem] leading-snug text-charcoal">
              {project.summary}
            </p>
            <p className="mt-4 text-[.9375rem] leading-relaxed text-muted">
              {project.description}
            </p>

            {project.highlights?.length > 0 && (
              <ul className="mt-6 space-y-2.5 rounded-xl bg-shell/70 p-5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[.9375rem] text-ink">
                    <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[.6875rem] font-semibold uppercase tracking-[.12em] text-muted">
                    {k}
                  </dt>
                  <dd className="mt-1 text-[.9375rem] text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <a
                href="#booking"
                onClick={onClose}
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3.5 text-[.9375rem] font-medium text-cream transition-colors hover:bg-clay"
              >
                Book a similar project
                <Icon.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={waHref(contact, `Hi, I saw the ${project.name} project on your website — I have a ${project.type.toLowerCase()} space and would like a quote.`)}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3.5 text-[.9375rem] font-medium text-charcoal transition-colors hover:border-charcoal/40 hover:bg-shell"
              >
                <Icon.whatsapp className="h-[18px] w-[18px] text-[#25D366]" />
                Ask about it
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
