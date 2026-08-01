import Link from 'next/link'

import { JsonLd } from '@/components/json-ld'
import { Breadcrumbs, CtaBand } from '@/components/ui'
import { business } from '@/config/business'
import { breadcrumbSchema, pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Your Rights and Responsibilities When You Move',
  description:
    'Federal law gives you specific rights on an interstate move. What your mover must give you, what the estimate types mean, how valuation works, and where to complain.',
  path: '/moving-rights',
})

const trail = [
  { name: 'Home', href: '/' },
  { name: 'Your rights when you move', href: '/moving-rights' },
]

export default function MovingRightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="section section--sand section--pagehead">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow">Consumer information</p>
        <h1 className="h1 h1--narrow">Your rights and responsibilities when you move.</h1>
        <p className="lede lede--lg">
          Federal law gives you specific, enforceable rights on an interstate move — and requires
          your mover to hand you a booklet explaining them. This page summarises what matters and
          points you at the originals.
        </p>
      </section>

      <section className="section">
        <div className="split split--aside">
          <div className="prose">
            <h2>The booklets your mover must give you</h2>
            <p>
              Before an interstate move, federal regulation (49 CFR Part 375) requires a carrier to
              provide you with two documents:
            </p>
            <ul>
              <li>
                <strong>Your Rights and Responsibilities When You Move</strong> — the FMCSA consumer
                booklet.
              </li>
              <li>
                <strong>Ready to Move?</strong> — a shorter brochure on avoiding moving fraud.
              </li>
            </ul>
            <p>
              A mover who does not give you these is not following the rules that govern their
              licence. That is a signal worth acting on.
            </p>
            <p>
              You can read both directly at{' '}
              <a href="https://www.fmcsa.dot.gov/protect-your-move" target="_blank" rel="noreferrer noopener">
                fmcsa.dot.gov/protect-your-move
              </a>
              .
            </p>

            <h2>Your right to an accurate estimate</h2>
            <p>
              You are entitled to a written estimate, and you are entitled to know which of three
              kinds it is:
            </p>
            <ul>
              <li>
                <strong>Binding</strong> — a fixed price for the inventory and services listed.
              </li>
              <li>
                <strong>Binding not-to-exceed</strong> — the price can fall if the shipment weighs
                less than estimated, but cannot rise.
              </li>
              <li>
                <strong>Non-binding</strong> — an estimate only. The final charge is based on actual
                weight and services and may be higher.
              </li>
            </ul>
            <p>
              On a non-binding estimate, a carrier may not require you to pay more than{' '}
              <strong>110% of the estimated charges</strong> at delivery. The balance is billed
              afterwards, and you have at least 30 days to pay it. This is the &ldquo;110%
              rule&rdquo; and it exists precisely to stop a truck being held over a disputed
              figure.
            </p>

            <h2>Your right to be present at the weighing</h2>
            <p>
              On a weight-based interstate move, you may observe both weighings, and you may request
              a re-weigh before the shipment is unloaded. If the re-weigh comes in lower, charges are
              recalculated on the lower weight.
            </p>

            <h2>Valuation: what your goods are covered for</h2>
            <p>Two options apply by federal rule.</p>
            <p>
              <strong>Released value protection</strong> is free and automatic if you choose nothing
              else. It covers 60 cents per pound, per article. A 40-pound television is covered for
              $24.
            </p>
            <p>
              <strong>Full-value protection</strong> costs extra. The carrier must repair, replace,
              or pay the current market value of a lost or damaged item.
            </p>
            <p>
              Neither is insurance. Items worth more than $100 per pound must be listed in writing
              on a high-value inventory before the move. We go through this in more detail in{' '}
              <Link href="/blog/moving-insurance-valuation-explained">
                our guide to valuation
              </Link>
              .
            </p>

            <h2>The bill of lading</h2>
            <p>
              The bill of lading is the contract. The carrier must give you one, and you should
              read it before signing.
            </p>
            <p>
              <strong>Never sign a blank or incomplete bill of lading.</strong> Whatever is written
              in afterwards becomes what you agreed to. Keep your copy until the move is complete
              and any claim is resolved.
            </p>

            <h2>Delivery and payment</h2>
            <p>
              The carrier must deliver within the agreed delivery window and must notify you of any
              delay. Payment is normally due at delivery, before unloading, by the methods disclosed
              in advance.
            </p>
            <p>
              A carrier <strong>may not hold your goods hostage</strong> over charges beyond what
              the rules permit. If that happens, it is a violation, not a negotiation.
            </p>

            <h2>Filing a claim</h2>
            <p>
              You have <strong>nine months from delivery</strong> to file a written claim for loss
              or damage on an interstate move. The carrier must acknowledge it within 30 days and
              resolve or explain within 120 days.
            </p>
            <p>
              Note damage on the delivery receipt <em>before</em> you sign it. A signed clean receipt
              makes a later claim considerably harder.
            </p>

            <h2>Your responsibilities</h2>
            <ul>
              <li>Give an accurate inventory, including the garage, attic, and shed.</li>
              <li>Be available, or send someone authorised, at pickup and delivery.</li>
              <li>Read the paperwork before signing it.</li>
              <li>Declare high-value items in writing.</li>
              <li>Do not ship prohibited items — flammables, explosives, corrosives, perishables.</li>
              <li>Pay the agreed charges at delivery.</li>
            </ul>

            <h2>Where to complain</h2>
            <ul>
              <li>
                <strong>Interstate moves:</strong> FMCSA National Consumer Complaint Database —{' '}
                <a href="https://nccdb.fmcsa.dot.gov" target="_blank" rel="noreferrer noopener">
                  nccdb.fmcsa.dot.gov
                </a>{' '}
                or 1-888-368-7238.
              </li>
              <li>
                <strong>Moves within Florida:</strong> Florida Department of Agriculture and Consumer
                Services —{' '}
                <a href="https://www.fdacs.gov" target="_blank" rel="noreferrer noopener">
                  fdacs.gov
                </a>{' '}
                or 1-800-HELP-FLA.
              </li>
              <li>
                <strong>Check any mover&rsquo;s licence:</strong>{' '}
                <a href="https://safer.fmcsa.dot.gov" target="_blank" rel="noreferrer noopener">
                  safer.fmcsa.dot.gov
                </a>
                .
              </li>
            </ul>

            <h2>A note on why this page exists</h2>
            <p>
              Publishing this is mildly against our commercial interest — it tells you exactly how
              to hold a moving company to account, including us. We think a customer who knows the
              rules is a customer who has a better move, and the companies that would rather you did
              not read this are the ones the rules were written for.
            </p>
          </div>

          <aside>
            <div className="notice">
              <p className="notice__title">Our operating authority</p>
              <p className="notice__body">
                USDOT {business.licenses.usdot}
                <br />
                {business.licenses.mc}
                <br />
                FL {business.licenses.floridaIntrastate}
                <br />
                <br />
                Look us up — and anyone else you are considering — on the public register before you
                book.
              </p>
            </div>

            <div className="notice notice--quiet" style={{ marginTop: 24 }}>
              <p className="notice__title">Official sources</p>
              <p className="notice__body">
                <a href="https://www.fmcsa.dot.gov/protect-your-move" target="_blank" rel="noreferrer noopener">
                  FMCSA — Protect Your Move
                </a>
                <br />
                <a href="https://safer.fmcsa.dot.gov" target="_blank" rel="noreferrer noopener">
                  SAFER carrier lookup
                </a>
                <br />
                <a href="https://nccdb.fmcsa.dot.gov" target="_blank" rel="noreferrer noopener">
                  National Consumer Complaint Database
                </a>
                <br />
                <a href="https://www.fdacs.gov" target="_blank" rel="noreferrer noopener">
                  Florida Dept. of Agriculture &amp; Consumer Services
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        eyebrow="Now you know what to ask"
        title="Ask us all of it."
        body="Get a written binding estimate from a carrier that hands you the booklet without being asked."
        last
      />
    </>
  )
}
