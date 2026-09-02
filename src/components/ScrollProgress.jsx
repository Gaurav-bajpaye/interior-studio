import { useEffect, useState } from 'react'

/* Hairline read-progress bar under the header. */
export default function ScrollProgress() {
  const [p, setP] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px" aria-hidden>
      <div
        className="h-full origin-left bg-gold/70 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  )
}
