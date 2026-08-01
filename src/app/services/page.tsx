import Link from 'next/link'

import { JsonLd } from '@/components/json-ld'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { services } from '@/content/services'
import { areaServedNames } from '@/content/service-areas'
import { breadcrumbSchema, pageMeta, serviceSchema } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Moving Services in South Florida',
  description:
    'Local and long-distance moving, packing, storage, piano and specialty items, commercial relocation, and senior downsizing. One crew, start to finish.',
  path: '/services',
})

const trail = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      {services.map((service) => (
        <JsonLd
          key={service.slug}
          data={serviceSchema({
            name: service.name,
            description: service.summary,
            path: `/services/${service.slug}`,
            areaServed: areaServedNames,
          })}
        />
      ))}

      <section className="section section--sand section--pagehead">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow">Services</p>
        <h1 className="h1 h1--narrow">Seven services. One crew that owns the whole job.</h1>
        <p className="lede lede--lg">
          We don&rsquo;t subcontract. The people who pack your kitchen are the people who load the
          truck and set your bed back up.
        </p>
      </section>

      {services.map((service) => (
        <section className="svc" key={service.slug}>
          <div>
            <div className="svc__head">
              <span className="svc__num" aria-hidden="true">
                {service.num}
              </span>
              <h2 className="svc__title">
                <Link href={`/services/${service.slug}`}>{service.name}</Link>
              </h2>
            </div>
            <p className="svc__body">{service.summary}</p>
            <div className="hero__actions">
              <Link href={`/services/${service.slug}`} className="btn btn--outline btn--sm">
                Read more →
              </Link>
              <Link href="/quote" className="btn btn--rust btn--sm">
                Quote this service →
              </Link>
            </div>
          </div>
          <div className="svc__panel">
            <p className="svc__panel-head">What&rsquo;s included</p>
            <div className="svc__points">
              {service.points.map((point) => (
                <div className="svc__point" key={point}>
                  <span className="svc__tick" aria-hidden="true">
                    ✓
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBand
        eyebrow="Not sure which you need?"
        title="Not sure which of these you need? Neither are most people."
        body="Tell us about the move and we'll tell you what it actually takes — including the parts you don't need."
        cta="Tell us about the move →"
        last
      />
    </>
  )
}
