import Link from 'next/link'

import { business } from '@/config/business'
import { marqueeItems } from '@/content/company'

export function Breadcrumbs({ trail }: { trail: { name: string; href: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {trail.map((crumb, index) => {
        const isLast = index === trail.length - 1
        return (
          <span key={crumb.href}>
            {index > 0 ? (
              <span className="breadcrumbs__sep" aria-hidden="true">
                {' / '}
              </span>
            ) : null}
            {isLast ? (
              <span aria-current="page">{crumb.name}</span>
            ) : (
              <Link href={crumb.href}>{crumb.name}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

/**
 * Shown wherever mockup content is still on the page. Deliberately hard to miss —
 * its whole job is to make sure sample testimonials or invented statistics cannot
 * be mistaken for verified content during review.
 */
export function SampleContentNotice({ what, children }: { what: string; children?: React.ReactNode }) {
  return (
    <div className="notice" role="note">
      <p className="notice__title">Sample content — {what} are not yet verified</p>
      <p className="notice__body">
        {children ?? (
          <>
            This block is placeholder material from the design mockup. It is excluded from
            structured data and must be replaced with genuine, attributable content before
            launch. See <code>PLACEHOLDER_CLAIMS</code> in <code>src/config/business.ts</code>.
          </>
        )}
      </p>
    </div>
  )
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {/* Four identical sets: the -50% keyframe lands seamlessly, and two sets'
            worth of width covers ultrawide viewports without a gap. */}
        {[0, 1, 2, 3].map((pass) => (
          <span className="marquee__set" key={pass}>
            {marqueeItems.map((item) => (
              <span key={item}>
                <span>{item}</span>
                <span style={{ paddingLeft: 40 }}>◆</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

export function CtaBand({
  eyebrow = 'Ready when you are',
  title = 'Get a real quote in about two minutes.',
  body = "Answer five questions. We'll come back with a written estimate and a crew that can actually make your date.",
  cta = 'Start my free quote →',
  last = false,
}: {
  eyebrow?: string
  title?: string
  body?: string
  cta?: string
  last?: boolean
}) {
  return (
    <section className={`section section--center${last ? ' section--last' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2 h2--xl">{title}</h2>
      <p className="lede lede--center">{body}</p>
      <div className="hero__actions" style={{ justifyContent: 'center' }}>
        <Link href="/quote" className="btn btn--rust btn--lg">
          {cta}
        </Link>
        <a href={business.phone.href} className="btn btn--outline btn--lg">
          Or call {business.phone.display}
        </a>
      </div>
    </section>
  )
}

export function Stars({ count = 5, className = '' }: { count?: number; className?: string }) {
  return (
    <span className={className} aria-label={`${count} out of 5 stars`}>
      <span aria-hidden="true">{'★'.repeat(count)}</span>
    </span>
  )
}
