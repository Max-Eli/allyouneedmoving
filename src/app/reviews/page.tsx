import { JsonLd } from '@/components/json-ld'
import { Breadcrumbs, CtaBand, SampleContentNotice, Stars } from '@/components/ui'
import { business } from '@/config/business'
import { contentStatus } from '@/config/content-status'
import { testimonials } from '@/content/testimonials'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Customer Reviews',
  description:
    'What South Florida customers say about moving with us — local moves, long-distance relocations, storage, and commercial jobs.',
  path: '/reviews',
})

const trail = [
  { name: 'Home', href: '/' },
  { name: 'Reviews', href: '/reviews' },
]

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      {/*
        No Review or AggregateRating schema while contentStatus.reviewAggregateVerified
        is false. Marking up invented reviews would be both a Google structured-data
        violation and an FTC problem.
      */}

      <section className="section section--sand section--pagehead">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow">Reviews</p>
        <h1 className="h1 h1--narrow">What customers say.</h1>
        {contentStatus.reviewAggregateVerified ? (
          <p className="lede lede--lg">
            <Stars count={5} /> {business.reviews.rating} average across{' '}
            {business.reviews.count.toLocaleString()} reviews.
          </p>
        ) : (
          <p className="lede lede--lg">
            Reviews below are sample content from the design mockup. Genuine, linkable reviews will
            replace them before launch.
          </p>
        )}
      </section>

      <section className="section">
        {contentStatus.testimonialsVerified ? null : (
          <div style={{ marginBottom: 32 }}>
            <SampleContentNotice what="these reviews">
              None of the reviews on this page are real. They exist so the layout can be reviewed.
              Before launch, replace them with genuine reviews you can attribute and link — pulling
              from your Google Business Profile is the usual route — then set{' '}
              <code>testimonialsVerified</code> and add the aggregate to{' '}
              <code>business.reviews</code>. Publishing invented testimonials violates the FTC Rule
              on Consumer Reviews and Testimonials (16 CFR Part 465).
            </SampleContentNotice>
          </div>
        )}

        <div className="grid grid--3">
          {testimonials.map((review) => (
            <figure className="review-card" key={review.name + review.meta}>
              <Stars count={review.rating} className="review-card__stars" />
              <blockquote className="review-card__text">&ldquo;{review.quote}&rdquo;</blockquote>
              <figcaption className="review-card__foot">
                <p className="quote-card__name">{review.name}</p>
                <p className="quote-card__meta">{review.meta}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section section--sand">
        <div className="split split--even">
          <div>
            <p className="eyebrow">How to read moving reviews</p>
            <h2 className="h2 h2--md">Check the licence, not just the stars.</h2>
            <p className="lede lede--wide">
              Any moving company can buy a review page. What it cannot fake is a public operating
              record. Before you book anyone — us included — look them up on the FMCSA register and
              confirm the USDOT number on their website matches the company you are actually
              talking to.
            </p>
            <a
              className="btn btn--outline"
              href="https://safer.fmcsa.dot.gov"
              target="_blank"
              rel="noreferrer noopener"
            >
              Check a mover at safer.fmcsa.dot.gov →
            </a>
          </div>
          <div className="notice notice--quiet">
            <p className="notice__title">Three things worth checking</p>
            <p className="notice__body">
              <strong>Is it a carrier or a broker?</strong> A broker sells your job on. Brokers have
              MC numbers but no trucks.
              <br />
              <br />
              <strong>Does the estimate say binding?</strong> Non-binding estimates are legally
              allowed to grow after loading.
              <br />
              <br />
              <strong>Did they give you the booklet?</strong> Interstate movers must hand you{' '}
              <em>Your Rights and Responsibilities When You Move</em>. Not doing so is a red flag on
              its own.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Ready when you are"
        title="See whether we live up to it."
        body="Answer five questions and a coordinator calls back within one business hour with a written estimate."
        last
      />
    </>
  )
}
