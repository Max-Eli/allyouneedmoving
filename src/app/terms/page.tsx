import Link from 'next/link'

import { LegalPage } from '@/components/legal-page'
import { business, formattedAddress } from '@/config/business'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Terms of Service',
  description:
    'Terms covering use of this website, how estimates work, and where the actual moving contract lives. The bill of lading governs your move, not this page.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      href="/terms"
      lastUpdated="31 July 2026"
      intro="These terms cover your use of this website. The contract for an actual move is the bill of lading and the written estimate you sign — not this page."
    >
      <h2>What these terms cover</h2>
      <p>
        These terms govern your use of this website. They do not govern a move. When you book, the
        binding documents are your <strong>written estimate</strong> and the{' '}
        <strong>bill of lading</strong> you sign on the day, together with the tariff those
        documents reference. Where anything on this website conflicts with those documents, those
        documents win.
      </p>

      <h2>Estimates are not contracts</h2>
      <p>
        The estimator on this site produces a non-binding indication of crew size, truck size, time,
        and carton count. It is a planning aid. It is not a price, not an offer, and not a
        commitment of availability.
      </p>
      <p>
        A real estimate follows a walkthrough — in person or by video — and arrives in writing. Only
        that written estimate binds us, and only for the inventory and services it describes. If the
        inventory changes materially before or on move day, we re-quote before loading rather than
        after.
      </p>

      <h2>Quote requests</h2>
      <p>
        Submitting the quote form starts a conversation; it does not book a move and does not
        reserve a date. A date is reserved only when we confirm it to you in writing.
      </p>
      <p>
        You agree that the information you give us is accurate to the best of your knowledge.
        Access details specifically — stairs, long carries, elevator restrictions, gate procedures —
        change what a job costs, and an estimate built on incomplete information will not hold.
      </p>

      <h2>Contacting you</h2>
      <p>
        When you submit a form, you are asking us to contact you about that request, by phone,
        text, or email. That consent is limited to the request itself. We do not add you to a
        marketing list unless you separately ask, and you can tell us to stop at any time. See our{' '}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>What we will not transport</h2>
      <p>Federal and state rules prohibit us from carrying certain items. We will not load:</p>
      <ul>
        <li>Flammables, propane, gasoline, kerosene, lighter fluid, paint, and aerosols</li>
        <li>Ammunition, explosives, and fireworks</li>
        <li>Corrosives, pesticides, pool chemicals, and other hazardous materials</li>
        <li>Perishable food, live plants where prohibited, and live animals</li>
      </ul>
      <p>
        We also ask you to carry cash, jewellery, medication, passports, and irreplaceable documents
        yourself. Items worth more than $100 per pound must be declared in writing on a high-value
        inventory before the move or our liability for them is limited.
      </p>

      <h2>Liability for your goods</h2>
      <p>
        Our liability for loss or damage is governed by the valuation option you select and by
        federal regulation, not by this page. Released value protection is provided at no charge at
        60 cents per pound per article. Full-value protection is available at additional cost.
      </p>
      <p>
        These are valuation options, not insurance. See{' '}
        <Link href="/blog/moving-insurance-valuation-explained">
          our guide to what movers actually cover
        </Link>{' '}
        and <Link href="/moving-rights">Your rights when you move</Link>.
      </p>

      <h2>Website content</h2>
      <p>
        The text, layout, and design of this site belong to {business.legalName}. You may read,
        print, and share it for personal use. You may not republish it as your own or scrape it to
        train a service that competes with us.
      </p>
      <p>
        Guides published on this site are general information about moving, not legal or insurance
        advice. Regulations change. For anything consequential, verify against the current FMCSA and
        Florida rules or ask a professional.
      </p>

      <h2>Third-party links</h2>
      <p>
        We link to external resources — the FMCSA register, government complaint portals — because
        they are useful. We do not control them and are not responsible for their content.
      </p>

      <h2>Availability</h2>
      <p>
        We try to keep this site available and accurate, but we do not guarantee uninterrupted
        service or that every page is free of error. If a form fails, call the office; a failed form
        submission is not a submitted request.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {business.legalName} is not liable for indirect or
        consequential losses arising from your use of this website. Nothing here limits our
        liability for your goods under a signed bill of lading, or any liability that cannot be
        limited by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Florida. Interstate moves are also
        subject to federal law administered by the FMCSA, which takes precedence where it applies.
      </p>

      <h2>Contact</h2>
      <p>
        {business.legalName}, {formattedAddress}.{' '}
        <a href={`mailto:${business.email.general}`}>{business.email.general}</a> ·{' '}
        <a href={business.phone.href}>{business.phone.display}</a>
      </p>
    </LegalPage>
  )
}
