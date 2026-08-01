import Link from 'next/link'

import { ContactForm } from '@/components/forms'
import { JsonLd } from '@/components/json-ld'
import { Photo } from '@/components/photo'
import { Breadcrumbs } from '@/components/ui'
import { photos } from '@/content/images'
import { business, formattedAddress } from '@/config/business'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Contact Us',
  description: `Call ${business.phone.display} or send a message. A real dispatcher answers seven days a week, ${business.hours.display.toLowerCase()}.`,
  path: '/contact',
})

const trail = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="section section--sand section--pagehead">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow">Contact</p>
        <h1 className="h1 h1--narrow">A real dispatcher picks up.</h1>
        <p className="lede lede--lg">
          Seven days a week, {business.hours.display.toLowerCase()}. If you want a price rather than
          a conversation, the <Link href="/quote">quote form</Link> is faster.
        </p>
      </section>

      <section className="section">
        <div className="split split--aside">
          <div>
            <h2 className="h2 h2--md">Send us a message</h2>
            <p className="lede lede--wide">
              We reply within one business hour during opening times. For anything about a move
              already booked, include the reference from your confirmation.
            </p>
            <ContactForm />
          </div>

          <aside className="stack">
            <div className="contact-card">
              <p className="contact-card__head">Phone</p>
              <a href={business.phone.href} className="contact-card__value">
                {business.phone.display}
              </a>
              <p className="contact-card__note">{business.hours.display}</p>
            </div>

            <div className="contact-card">
              <p className="contact-card__head">Email</p>
              <a href={`mailto:${business.email.general}`} className="contact-card__value">
                {business.email.general}
              </a>
              <p className="contact-card__note">Quotes, existing moves, and claims.</p>
            </div>

            <div className="contact-card">
              <p className="contact-card__head">Yard &amp; office</p>
              <address className="contact-card__value" style={{ fontSize: 19 }}>
                {formattedAddress}
              </address>
              <p className="contact-card__note">
                Visits by appointment — the crews are usually out on jobs.
              </p>
            </div>

            <div className="contact-card">
              <p className="contact-card__head">Careers</p>
              <Link href="/careers" className="contact-card__value" style={{ fontSize: 19 }}>
                We&rsquo;re hiring movers &amp; drivers
              </Link>
              <p className="contact-card__note">W-2 positions, paid training, no day labor.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--last">
        <Photo
          photo={photos.warehouseInterior}
          variant="wide"
          sizes="(max-width: 900px) 100vw, 1480px"
        />
      </section>
    </>
  )
}
