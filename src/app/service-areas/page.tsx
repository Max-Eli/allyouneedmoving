import Link from 'next/link'

import { JsonLd } from '@/components/json-ld'
import { Photo } from '@/components/photo'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { servicePhotos } from '@/content/images'
import { ZipChecker } from '@/components/zip-checker'
import { serviceAreas } from '@/content/service-areas'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Service Areas Across South Florida',
  description:
    'Daily crews across Broward, Miami-Dade, and Palm Beach — Fort Lauderdale, Miami, West Palm Beach, Boca Raton, Hollywood, Pompano, Coral Springs, and Weston.',
  path: '/service-areas',
})

const trail = [
  { name: 'Home', href: '/' },
  { name: 'Service areas', href: '/service-areas' },
]

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="section section--sand section--pagehead">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow">Service areas</p>
        <h1 className="h1 h1--narrow">Daily crews across the three counties.</h1>
        <p className="lede lede--lg">
          Broward, Miami-Dade, and Palm Beach get same-week local service out of our Fort Lauderdale
          yard. Anywhere else in the country, we run it as a dedicated long-distance job.
        </p>
      </section>

      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">Cities</p>
            <h2 className="h2 h2--wide">Where we work every week.</h2>
          </div>
        </div>
        <div className="area-grid">
          {serviceAreas.map((area) => (
            <Link href={`/service-areas/${area.slug}`} className="area-card" key={area.slug}>
              <p className="area-card__name">{area.city}</p>
              <p className="area-card__meta">
                {area.county}
                <br />
                {area.driveTime}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <ZipChecker />

      <section className="section">
        <div className="split split--even">
          <div>
            <p className="eyebrow">Beyond South Florida</p>
            <h2 className="h2 h2--md">We hold interstate authority for all 48 states.</h2>
            <p className="lede">
              Long-distance jobs run on a dedicated truck: the crew that loads you drives it and
              unloads it, and the delivery window is one to three days in writing. No shared loads,
              no warehouse transfers, no two-week spreads.
            </p>
            <div className="hero__actions">
              <Link href="/services/long-distance-moving" className="btn btn--outline">
                How long distance works →
              </Link>
            </div>
          </div>
          <Photo
            photo={servicePhotos['long-distance-moving']!}
            variant="short"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      <CtaBand last />
    </>
  )
}
