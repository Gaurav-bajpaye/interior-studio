import { useState } from 'react'
import { src as toSrc, srcSet } from '../lib/media'

/* Image with a warm placeholder tint that fades out on decode, so
   the page never flashes white gaps while photographs stream in. */
export default function Img({
  photo,
  alt,
  className = '',
  imgClassName = '',
  width = 1200,
  ratio = 0.75,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`} {...rest}>
      <img
        src={toSrc(photo, width)}
        srcSet={srcSet(photo)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={Math.round(width * ratio)}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(.16,.84,.28,1)] ${
          loaded ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
