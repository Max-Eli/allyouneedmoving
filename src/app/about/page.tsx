import Link from 'next/link'

import { JsonLd } from '@/components/json-ld'
import { Photo } from '@/components/photo'
import { Breadcrumbs, CtaBand, SampleContentNotice } from '@/components/ui'
import { photos } from '@/content/images'
import { business } from '@/config/business'
import { contentStatus } from '@/config/content-status'
import { credentials, stats, values } from '@/content/company'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'About Us',
  description: `Family-owned South Florida movers since ${business.founded}. W-2 crews, binding written estimates, and damage claims handled in-house.`,
  path: '/about',
})

const trail = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="hero hero--about">
        <div className="hero__copy">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow">About us</p>
          <h1 className="h1 h1--about">
            Started with one box truck in {business.founderStory}.
          </h1>
          {contentStatus.companyStoryVerified ? (
            <>
              <p className="prose-para">
                In {business.founded}, {business.founderName} bought a used 16-footer and started
                moving apartments around Broward on weekends. He kept two rules: quote it honestly,
                and wrap everything like it&rsquo;s going to get dropped. That is still the whole
                operating manual.
              </p>
              <p className="prose-para">
                Today we run {business.stats.trucks} trucks out of {business.stats.yards} yards,
                staff every job with W-2 employees — never day labor — and hold interstate authority
                to move you anywhere in the lower 48.
              </p>
            </>
          ) : (
            <SampleContentNotice what="the founder story and company history">
              The narrative that belongs here — who started the company, when, and how it grew — is
              still placeholder copy from the design mockup. Replace it with the real story before
              launch, then set <code>companyStoryVerified</code> in{' '}
              <code>src/config/content-status.ts</code>.
            </SampleContentNotice>
          )}
        </div>
        <figure className="hero__media">
          <Photo photo={photos.fleetTruck} variant="mid" shadow priority />
          <figcaption className="sticker sticker--br">
            EST. {business.founded} · BROWARD COUNTY
          </figcaption>
        </figure>
      </section>

      {contentStatus.statsVerified ? (
        <section className="stats">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="stat__n">{stat.n}</div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </section>
      ) : (
        <section className="section">
          <SampleContentNotice what="the company statistics">
            The performance figures designed for this band — moves completed, fleet size, and
            percentage of jobs finished at or under estimate — are invented placeholders. An
            unsubstantiated performance claim in advertising is deceptive under FTC Act §5, so the
            band stays hidden until each figure can be documented.
          </SampleContentNotice>
        </section>
      )}

      <section className="section">
        <p className="eyebrow">How we operate</p>
        <h2 className="h2 h2--gap h2--lgwrap">Four commitments we&rsquo;ll put in writing.</h2>
        <div className="grid grid--2">
          {values.map((value) => (
            <div className="value-card" key={value.title}>
              <h3 className="value-card__title">{value.title}</h3>
              <p className="value-card__body">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--sand">
        <div className="split split--aside">
          <div>
            <p className="eyebrow">Credentials</p>
            <h2 className="h2 h2--md">Licensed, bonded, and checkable.</h2>
            <p className="lede">
              Every number below is public. You can look up any interstate mover — including us — on
              the FMCSA register at{' '}
              <a href="https://safer.fmcsa.dot.gov" target="_blank" rel="noreferrer noopener">
                safer.fmcsa.dot.gov
              </a>
              . If a company will not give you a USDOT number, that tells you what you need to know.
            </p>
            <Link href="/moving-rights" className="btn btn--outline">
              Your rights when you move →
            </Link>
          </div>

          <dl className="fact-list">
            {credentials.map((item) => (
              <div className="fact-list__row" key={item.label}>
                <dt className="fact-list__k">{item.label}</dt>
                <dd className="fact-list__v">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand last />
    </>
  )
}
