import { useCallback, useEffect, useRef, useState } from 'react'
import Img from './Img'
import Icon from './Icons'

/* Drag (or arrow-key) the handle to wipe between the two photographs.
   Pointer events cover mouse, touch and pen with one code path. */
export default function BeforeAfter({ before, after, alt }) {
  const frame = useRef(null)
  const [pos, setPos] = useState(52)
  const [dragging, setDragging] = useState(false)

  const setFromClientX = useCallback((clientX) => {
    const box = frame.current?.getBoundingClientRect()
    if (!box) return
    const next = ((clientX - box.left) / box.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }, [])

  useEffect(() => {
    if (!dragging) return
    const move = (e) => setFromClientX(e.clientX)
    const stop = () => setDragging(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', stop)
    window.addEventListener('pointercancel', stop)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('pointercancel', stop)
    }
  }, [dragging, setFromClientX])

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4))
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4))
    else return
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      ref={frame}
      onPointerDown={(e) => {
        setDragging(true)
        setFromClientX(e.clientX)
      }}
      className={`relative select-none overflow-hidden rounded-xl bg-sand ${
        dragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* after (full) */}
      <Img
        photo={after}
        alt={`${alt} — after`}
        width={1400}
        ratio={0.68}
        sizes="(max-width: 1024px) 92vw, 58vw"
        className="aspect-[3/2] w-full"
        imgClassName="pointer-events-none"
      />

      {/* before (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden
      >
        <Img
          photo={before}
          alt=""
          width={1400}
          ratio={0.68}
          sizes="(max-width: 1024px) 92vw, 58vw"
          className="h-full w-full"
          imgClassName="pointer-events-none"
        />
      </div>

      {/* labels */}
      <span
        className={`absolute left-3 top-3 rounded-full bg-charcoal/70 px-2.5 py-1 text-[.6875rem] font-semibold uppercase tracking-[.12em] text-cream backdrop-blur-sm transition-opacity duration-300 ${
          pos > 14 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Before
      </span>
      <span
        className={`absolute right-3 top-3 rounded-full bg-cream/90 px-2.5 py-1 text-[.6875rem] font-semibold uppercase tracking-[.12em] text-charcoal backdrop-blur-sm transition-opacity duration-300 ${
          pos < 86 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        After
      </span>

      {/* handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-cream/90 shadow-[0_0_0_1px_rgba(27,25,23,.12)]"
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKey}
          onPointerDown={(e) => {
            e.stopPropagation()
            setDragging(true)
          }}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-charcoal shadow-lift transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <Icon.drag className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  )
}
