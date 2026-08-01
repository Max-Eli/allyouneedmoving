import Link from 'next/link'
import { notFound } from 'next/navigation'

import { FaqAccordion } from '@/components/faq-accordion'
import { JsonLd } from '@/components/json-ld'
import { Photo } from '@/components/photo'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { servicePhotos } from '@/content/images'
import { business } from '@/config/business'
import { areaServedNames, serviceAreas } from '@/content/service-areas'
import { getService, serviceSlugs, services } from '@/content/services'
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from '@/lib/seo'

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}

  return pageMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: service.shortName, href: `/services/${service.slug}` },
  ]

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.summary,
          path: `/services/${service.slug}`,
          areaServed: areaServedNames,
        })}
      />
      <JsonLd data={faqSchema(service.faqs)} />

      <section className="hero">
        <div className="hero__copy">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow">Service {service.num}</p>
          <h1 className="h1">{service.name}</h1>
          <p className="hero__lede">{service.summary}</p>
          <div className="hero__actions">
            <Link href="/quote" className="btn btn--rust btn--lg">
              Quote this service →
            </Link>
            <a href={business.phone.href} className="btn btn--outline btn--lg">
              Call {business.phone.display}
            </a>
          </div>
        </div>
        <div className="hero__media">
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
        </div>
      </section>

      <section className="section">
        <div className="split split--aside">
          <div className="prose">
            {service.sections.map((block) => (
              <div key={block.heading}>
                <h2>{block.heading}</h2>
                {block.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>

          <aside>
            {servicePhotos[service.slug] ? (
              <Photo
                photo={servicePhotos[service.slug]!}
                variant="short"
                shadow
                sizes="(max-width: 1180px) 100vw, 380px"
              />
            ) : null}
            <div className="notice notice--quiet" style={{ marginTop: 24 }}>
              <p className="notice__title">Where we run this</p>
              <p className="notice__body">
                {serviceAreas
                  .slice(0, 5)
                  .map((area) => area.city)
                  .join(', ')}
                , and everywhere else in South Florida.{' '}
                <Link href="/service-areas">See all service areas →</Link>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--sand">
        <div className="split split--faq">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="h2 h2--md">About {service.shortName.toLowerCase()}.</h2>
            <p className="lede lede--sm">
              Anything not covered here, ask on the phone — a real dispatcher picks up.
            </p>
            <a href={business.phone.href} className="phone-link">
              {business.phone.display}
            </a>
          </div>
          <FaqAccordion items={service.faqs} white />
        </div>
      </section>

      <section className="section">
        <h2 className="h2 h2--gap">Other services</h2>
        <div className="grid grid--3">
          {others.map((item) => (
            <Link href={`/services/${item.slug}`} className="card" key={item.slug}>
              <span className="card__num" aria-hidden="true">
                {item.num}
              </span>
              <h3 className="card__title">{item.shortName}</h3>
              <p className="card__body">{item.cardBlurb}</p>
              <span className="card__more">Read more →</span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand last />
    </>
  )
}
