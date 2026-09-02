import { useEffect, useRef, useState } from 'react'

/* Reveals children once they scroll into view.

   Anything already inside the viewport at mount is shown synchronously
   — a deep link, a restored scroll position or a backgrounded tab (where
   IntersectionObserver callbacks are throttled) must never leave the page
   looking empty. Everything below the fold waits for the observer, which
   disconnects the moment it fires. */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  amount = 0.18,
  className = '',
  style,
  children,
  ...rest
}) {
  const node = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = node.current
    if (!el || shown) return

    const rect = el.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0
    if (inView || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [amount, shown])

  return (
    <Tag
      ref={node}
      data-shown={shown}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      className={`reveal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
