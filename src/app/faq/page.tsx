import Link from 'next/link'

import { FaqAccordion } from '@/components/faq-accordion'
import { JsonLd } from '@/components/json-ld'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { business } from '@/config/business'
import { faqCategories, faqs } from '@/content/faqs'
import { services } from '@/content/services'
import { breadcrumbSchema, faqSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Moving FAQ',
  description:
    'Straight answers on booking, binding estimates, valuation and insurance, what movers cannot legally haul, and how long-distance delivery works.',
  path: '/faq',
})

const trail = [
  { name: 'Home', href: '/' },
  { name: 'FAQ', href: '/faq' },
]

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd
        data={faqSchema(faqs.map((faq) => ({ question: faq.question, answer: faq.answer })))}
      />

      <section className="section section--sand section--pagehead">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow">Common questions</p>
        <h1 className="h1 h1--narrow">Straight answers.</h1>
        <p className="lede lede--lg">
          The questions we get most, answered properly. If yours is not here, call{' '}
          <a href={business.phone.href}>{business.phone.display}</a> — a real dispatcher picks up
          seven days a week.
        </p>
      </section>

      {faqCategories.map((category, index) => {
        const items = faqs.filter((faq) => faq.category === category)
        return (
          <section className={`section${index % 2 === 1 ? ' section--sand' : ''}`} key={category}>
            <div className="split split--faq">
              <div>
                <p className="eyebrow">{category}</p>
                <h2 className="h2 h2--md">
                  {items.length} question{items.length === 1 ? '' : 's'}
                </h2>
              </div>
              <FaqAccordion items={items} defaultOpen={-1} white={index % 2 === 1} />
            </div>
          </section>
        )
      })}

      <section className="section">
        <p className="eyebrow">Service-specific questions</p>
        <h2 className="h2 h2--gap">Each service page answers its own.</h2>
        <div className="grid grid--4">
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} className="card" key={service.slug}>
              <span className="card__num" aria-hidden="true">
                {service.num}
              </span>
              <h3 className="card__title">{service.shortName}</h3>
              <p className="card__body">
                {service.faqs.length} question{service.faqs.length === 1 ? '' : 's'} about{' '}
                {service.shortName.toLowerCase()}.
              </p>
              <span className="card__more">Read →</span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand last />
    </>
  )
}
