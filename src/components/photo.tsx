import Image from 'next/image'

import type { SitePhoto } from '@/content/images'

type Variant = 'tall' | 'mid' | 'short' | 'wide' | 'square'

/**
 * A framed photograph occupying one of the layout's image slots.
 *
 * Uses `fill` with a fixed aspect ratio per variant so the frame keeps its shape
 * across breakpoints and the browser reserves space before the image loads —
 * no layout shift.
 */
export function Photo({
  photo,
  variant = 'tall',
  shadow = false,
  priority = false,
  sizes = '(max-width: 900px) 100vw, 45vw',
}: {
  photo: SitePhoto
  variant?: Variant
  shadow?: boolean
  /** Set on the largest above-the-fold image only. */
  priority?: boolean
  sizes?: string
}) {
  return (
    <div className={`photo photo--${variant}${shadow ? ' photo--shadow' : ''}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="photo__img"
      />
    </div>
  )
}
