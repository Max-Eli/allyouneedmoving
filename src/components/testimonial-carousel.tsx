'use client'

import { useState } from 'react'

import type { Testimonial } from '@/content/testimonials'

function pad2(value: number) {
  return String(value).padStart(2, '0')
}

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0)
  const current = items[index]

  if (!current) return null

  return (
    <>
      <div className="arrows">
        <button
          type="button"
          className="btn btn--icon"
          aria-label="Previous review"
          onClick={() => setIndex((value) => (value - 1 + items.length) % items.length)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="btn btn--icon"
          aria-label="Next review"
          onClick={() => setIndex((value) => (value + 1) % items.length)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <figure className="quote-card" aria-live="polite" style={{ marginTop: 36 }}>
        <div>
          <p className="quote-card__stars" aria-label={`${current.rating} out of 5 stars`}>
            <span aria-hidden="true">{'★'.repeat(current.rating)}</span>
          </p>
          <blockquote className="quote-card__text">&ldquo;{current.quote}&rdquo;</blockquote>
        </div>
        <figcaption className="quote-card__foot">
          <div>
            <p className="quote-card__name">{current.name}</p>
            <p className="quote-card__meta">{current.meta}</p>
          </div>
          <p className="quote-card__count">
            {pad2(index + 1)} / {pad2(items.length)}
          </p>
        </figcaption>
      </figure>
    </>
  )
}
