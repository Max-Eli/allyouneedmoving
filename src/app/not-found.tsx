import Link from 'next/link'

import { business } from '@/config/business'
import { serviceAreas } from '@/content/service-areas'
import { services } from '@/content/services'

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <section className="notfound">
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <h1 className="h2 h2--lg" style={{ marginTop: 12 }}>
          That page has moved, and not by us.
        </h1>
        <p className="lede lede--center">
          The link is broken or the page no longer exists. Try one of these, or call{' '}
          <a href={business.phone.href}>{business.phone.display}</a> and we&rsquo;ll point you at
          the right thing.
        </p>
        <div className="hero__actions" style={{ justifyContent: 'center' }}>
          <Link href="/" className="btn btn--rust btn--lg">
            Back to the homepage
          </Link>
          <Link href="/quote" className="btn btn--outline btn--lg">
            Get a free quote →
          </Link>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Services</p>
        <h2 className="h2 h2--gap">What we do.</h2>
        <div className="grid grid--4">
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} className="card" key={service.slug}>
              <span className="card__num" aria-hidden="true">
                {service.num}
              </span>
              <h3 className="card__title">{service.shortName}</h3>
              <p className="card__body">{service.cardBlurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--sand section--last">
        <p className="eyebrow">Service areas</p>
        <h2 className="h2 h2--gap">Where we work.</h2>
        <div className="area-grid">
          {serviceAreas.map((area) => (
            <Link href={`/service-areas/${area.slug}`} className="area-card" key={area.slug}>
              <p className="area-card__name">{area.city}</p>
              <p className="area-card__meta">{area.county}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
