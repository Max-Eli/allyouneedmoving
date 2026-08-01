import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/json-ld'
import { Photo } from '@/components/photo'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { areaPhotos } from '@/content/images'
import { business } from '@/config/business'
import { getServiceArea, serviceAreaSlugs, serviceAreas } from '@/content/service-areas'
import { services } from '@/content/services'
import { breadcrumbSchema, localAreaSchema, pageMeta } from '@/lib/seo'

export function generateStaticParams() {
  return serviceAreaSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = getServiceArea(slug)
  if (!area) return {}

  return pageMeta({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/service-areas/${area.slug}`,
  })
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = getServiceArea(slug)
  if (!area) notFound()

  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Service areas', href: '/service-areas' },
    { name: area.city, href: `/service-areas/${area.slug}` },
  ]

  const nearby = serviceAreas.filter((item) => item.slug !== area.slug).slice(0, 4)

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd
        data={localAreaSchema({
          city: area.city,
          path: `/service-areas/${area.slug}`,
          description: area.metaDescription,
          zips: area.zips,
        })}
      />

      <section className="hero">
        <div className="hero__copy">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow">{area.county}</p>
          <h1 className="h1">Movers in {area.city}</h1>
          <p className="hero__lede">{area.intro}</p>
          <div className="hero__actions">
            <Link href="/quote" className="btn btn--rust btn--lg">
              Get my free quote →
            </Link>
            <a href={business.phone.href} className="btn btn--outline btn--lg">
              Call {business.phone.display}
            </a>
          </div>
        </div>
        <div className="hero__media">
          <dl className="fact-list">
            <div className="fact-list__row">
              <dt className="fact-list__k">County</dt>
              <dd className="fact-list__v">{area.county}</dd>
            </div>
            <div className="fact-list__row">
              <dt className="fact-list__k">Drive time</dt>
              <dd className="fact-list__v">{area.driveTime}</dd>
            </div>
            <div className="fact-list__row">
              <dt className="fact-list__k">Local service</dt>
              <dd className="fact-list__v">Same-week, hourly or flat rate</dd>
            </div>
            <div className="fact-list__row">
              <dt className="fact-list__k">Long distance</dt>
              <dd className="fact-list__v">Dedicated truck, all 48 states</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="split split--aside">
          <div className="prose">
            <h2>Moving in {area.city}</h2>
            {area.detail.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            <h2>What changes a {area.city} move</h2>
            {area.localNotes.map((note) => (
              <div key={note.heading}>
                <h3>{note.heading}</h3>
                <p>{note.body}</p>
              </div>
            ))}
          </div>

          <aside>
            {areaPhotos[area.slug] ? (
              <Photo
                photo={areaPhotos[area.slug]!}
                variant="short"
                shadow
                sizes="(max-width: 1180px) 100vw, 380px"
              />
            ) : null}

            <div className="notice notice--quiet" style={{ marginTop: 24 }}>
              <p className="notice__title">Neighbourhoods we run</p>
              <p className="notice__body">{area.neighborhoods.join(' · ')}</p>
            </div>

            <div style={{ marginTop: 24 }}>
              <p className="label label--block">ZIP codes covered</p>
              <div className="zip-list">
                {area.zips.map((zip) => (
                  <span className="zip-chip" key={zip}>
                    {zip}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--sand">
        <p className="eyebrow">Services</p>
        <h2 className="h2 h2--gap">What we run in {area.city}.</h2>
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

      <section className="section">
        <h2 className="h2 h2--gap">Nearby areas</h2>
        <div className="area-grid">
          {nearby.map((item) => (
            <Link href={`/service-areas/${item.slug}`} className="area-card" key={item.slug}>
              <p className="area-card__name">{item.city}</p>
              <p className="area-card__meta">{item.county}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title={`Moving in ${area.city}? Get a real number.`}
        body="Answer five questions and a coordinator calls back within one business hour with a written estimate."
        last
      />
    </>
  )
}
