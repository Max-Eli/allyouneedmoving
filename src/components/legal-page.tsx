import { JsonLd } from '@/components/json-ld'
import { Breadcrumbs } from '@/components/ui'
import { breadcrumbSchema } from '@/lib/seo'

/**
 * Shared shell for policy pages. `lastUpdated` renders in the header so the
 * effective date is always visible, which several privacy regimes expect.
 */
export function LegalPage({
  title,
  intro,
  lastUpdated,
  href,
  children,
  needsReview = true,
}: {
  title: string
  intro: string
  lastUpdated: string
  href: string
  children: React.ReactNode
  needsReview?: boolean
}) {
  const trail = [
    { name: 'Home', href: '/' },
    { name: title, href },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="section section--sand section--pagehead">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow">Legal</p>
        <h1 className="h1 h1--narrow">{title}</h1>
        <p className="lede lede--lg">{intro}</p>
        <p className="label" style={{ marginTop: 20 }}>
          Last updated {lastUpdated}
        </p>
      </section>

      <section className="section section--last">
        {needsReview ? (
          <div className="notice" role="note" style={{ marginBottom: 36, maxWidth: '74ch' }}>
            <p className="notice__title">Needs review by counsel before launch</p>
            <p className="notice__body">
              This is a drafted starting point covering the obligations that apply to a Florida
              household-goods carrier. It is not legal advice and has not been reviewed by an
              attorney. Have it checked against your actual practices — particularly the data,
              retention, and claims sections — before publishing.
            </p>
          </div>
        ) : null}
        <div className="prose">{children}</div>
      </section>
    </>
  )
}
