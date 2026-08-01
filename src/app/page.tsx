import Link from 'next/link'

import { FaqAccordion } from '@/components/faq-accordion'
import { JsonLd } from '@/components/json-ld'
import { MoveEstimator } from '@/components/move-estimator'
import { TestimonialCarousel } from '@/components/testimonial-carousel'
import { Photo } from '@/components/photo'
import { CtaBand, Marquee, SampleContentNotice } from '@/components/ui'
import { photos } from '@/content/images'
import { ZipChecker } from '@/components/zip-checker'
import { business } from '@/config/business'
import { contentStatus } from '@/config/content-status'
import { processSteps } from '@/content/company'
import { homepageFaqs } from '@/content/faqs'
import { homeServiceCards } from '@/content/services'
import { testimonials } from '@/content/testimonials'
import { faqSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: `${business.name} — South Florida Movers, Local & Long Distance`,
  description: business.description,
  path: '/',
  absoluteTitle: true,
})

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={faqSchema(
          homepageFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
        )}
      />

      <section className="hero">
        <div className="hero__copy">
          {contentStatus.reviewAggregateVerified ? (
            <p className="pill">
              <span className="pill__stars" aria-hidden="true">
                ★★★★★
              </span>{' '}
              {business.reviews.rating} from {business.reviews.count.toLocaleString()} Florida
              families
            </p>
          ) : (
            <p className="pill">
              <span className="pill__stars" aria-hidden="true">
                ◆
              </span>{' '}
              Licensed, insured &amp; family owned since {business.founded}
            </p>
          )}

          <h1 className="hero__title">Movers who show up, wrap it right, and get it there.</h1>
          <p className="hero__lede">
            Local moves across Miami, Broward, and Palm Beach — and long-distance hauls to all 48
            states. Packing, storage, pianos, offices. One crew, one number, no surprise charges on
            moving day.
          </p>
          <div className="hero__actions">
            <Link href="/quote" className="btn btn--rust btn--lg">
              Get my free quote →
            </Link>
            <a href={business.phone.href} className="btn btn--outline btn--lg">
              Or call {business.phone.display}
            </a>
          </div>
          <ul className="hero__points">
            <li>✓&nbsp;&nbsp;Free in-home estimates</li>
            <li>✓&nbsp;&nbsp;Binding written price</li>
            <li>✓&nbsp;&nbsp;No deposit to book</li>
          </ul>
        </div>
        <figure className="hero__media">
          <Photo photo={photos.heroMovingDay} variant="tall" shadow priority />
          <figcaption className="sticker sticker--tl">FRAGILE — HANDLE WITH CARE</figcaption>
        </figure>
      </section>

      <Marquee />

      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="h2 h2--wide">Everything a move needs, under one roof.</h2>
          </div>
          <Link href="/services" className="btn btn--outline btn--sm">
            See all services →
          </Link>
        </div>
        <div className="grid grid--4">
          {homeServiceCards.map((service) => (
            <Link href={service.href} className="card" key={service.num}>
              <span className="card__num" aria-hidden="true">
                {service.num}
              </span>
              <h3 className="card__title">{service.name}</h3>
              <p className="card__body">{service.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--sand">
        <p className="eyebrow">How it works</p>
        <h2 className="h2 h2--gap">Four steps. That&rsquo;s the whole process.</h2>
        <div className="grid grid--4">
          {processSteps.map((step) => (
            <div className="step" key={step.n}>
              <span className="step__num" aria-hidden="true">
                {step.n}
              </span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__body">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <MoveEstimator />

      <ZipChecker />

      <section className="section">
        <div className="section__head section__head--tight">
          <div>
            <p className="eyebrow">Reviews</p>
            <h2 className="h2">What customers say.</h2>
          </div>
          <Link href="/reviews" className="btn btn--outline btn--sm">
            Read all reviews →
          </Link>
        </div>

        {contentStatus.testimonialsVerified ? null : (
          <div style={{ marginBottom: 28 }}>
            <SampleContentNotice what="these testimonials" />
          </div>
        )}

        <TestimonialCarousel items={testimonials} />
      </section>

      <section className="section section--sand">
        <div className="split split--faq">
          <div>
            <p className="eyebrow">Common questions</p>
            <h2 className="h2 h2--md">Straight answers.</h2>
            <p className="lede lede--sm">
              Still stuck? Call the office — a real dispatcher picks up, seven days a week.
            </p>
            <a href={business.phone.href} className="phone-link">
              {business.phone.display}
            </a>
            <p style={{ marginTop: 22 }}>
              <Link href="/faq">See all {'→'}</Link>
            </p>
          </div>
          <FaqAccordion items={homepageFaqs} />
        </div>
      </section>

      <CtaBand last />
    </>
  )
}
