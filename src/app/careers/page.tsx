import { CareersForm } from '@/components/forms'
import { JsonLd } from '@/components/json-ld'
import { Photo } from '@/components/photo'
import { Breadcrumbs } from '@/components/ui'
import { photos } from '@/content/images'
import { business } from '@/config/business'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Careers — Movers, Drivers & Crew',
  description:
    'W-2 positions with paid training, no day labor, and real routes. Now hiring movers, packers, CDL drivers, and crew foremen across South Florida.',
  path: '/careers',
})

const trail = [
  { name: 'Home', href: '/' },
  { name: 'Careers', href: '/careers' },
]

const roles = [
  {
    title: 'Mover / helper',
    body: 'Loading, wrapping, carrying, and setting up. No experience required — we train in-house for three weeks before you touch a customer’s furniture.',
    needs: ['Able to lift 50 lbs repeatedly', 'Reliable transport to the yard', 'Clean background check'],
  },
  {
    title: 'CDL driver',
    body: 'Local routes daily and dedicated interstate runs. Interstate drivers stay with the shipment both ends rather than handing off.',
    needs: ['Valid CDL and clean MVR', 'DOT medical card', '2+ years commercial driving'],
  },
  {
    title: 'Crew foreman',
    body: 'Run the job, walk the inventory, own the paperwork, and keep the customer informed. Promoted from crew wherever possible.',
    needs: ['2+ years moving experience', 'Comfortable leading 3–5 people', 'Customer-facing judgement'],
  },
  {
    title: 'Packer',
    body: 'Dish packs, wardrobe boxes, custom crating, and labeled inventories. Detail work, indoors, less lifting than crew.',
    needs: ['Careful and methodical', 'Able to work to a schedule', 'Clean background check'],
  },
]

const benefits = [
  'W-2 employment, never 1099 day labor',
  'Paid three-week in-house training',
  'Overtime after 40 hours, paid weekly',
  'Workers’ compensation from day one',
  'Uniforms and equipment provided',
  'Promotion from crew to foreman to dispatch',
]

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="hero">
        <div className="hero__copy">
          <Breadcrumbs trail={trail} />
          <p className="eyebrow">Careers</p>
          <h1 className="h1">We employ our movers. All of them.</h1>
          <p className="hero__lede">
            Most moving companies in South Florida staff jobs with day labor because it is cheaper.
            We do not, and it is the single biggest reason our crews are good. Every mover here is a
            W-2 employee with training, workers&rsquo; comp, and a route to a foreman position.
          </p>
          <ul className="hero__points">
            <li>✓&nbsp;&nbsp;Paid training</li>
            <li>✓&nbsp;&nbsp;Weekly pay</li>
            <li>✓&nbsp;&nbsp;Promotion from within</li>
          </ul>
        </div>
        <figure className="hero__media">
          <Photo photo={photos.careersTruck} variant="mid" shadow priority />
        </figure>
      </section>

      <section className="section">
        <p className="eyebrow">Open roles</p>
        <h2 className="h2 h2--gap">Who we&rsquo;re hiring.</h2>
        <div className="grid grid--2">
          {roles.map((role) => (
            <div className="value-card" key={role.title}>
              <h3 className="value-card__title">{role.title}</h3>
              <p className="value-card__body">{role.body}</p>
              <div className="svc__points" style={{ marginTop: 18 }}>
                {role.needs.map((need) => (
                  <div className="svc__point" key={need}>
                    <span className="svc__tick" aria-hidden="true">
                      ✓
                    </span>
                    <span>{need}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--sand">
        <div className="split split--aside">
          <div>
            <p className="eyebrow">Apply</p>
            <h2 className="h2 h2--md">Tell us where you&rsquo;re at.</h2>
            <p className="lede lede--wide">
              No résumé needed. If your experience fits an open crew, someone from the yard calls you
              within a few days. Prefer to talk first? Call{' '}
              <a href={business.phone.href}>{business.phone.display}</a> and ask for hiring.
            </p>
            <CareersForm />
          </div>

          <aside>
            <div className="notice notice--quiet">
              <p className="notice__title">What you get</p>
              <div className="svc__points" style={{ marginTop: 14 }}>
                {benefits.map((benefit) => (
                  <div className="svc__point" key={benefit}>
                    <span className="svc__tick" aria-hidden="true">
                      ✓
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
