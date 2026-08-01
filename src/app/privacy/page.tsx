import { LegalPage } from '@/components/legal-page'
import { business, formattedAddress } from '@/config/business'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'What we collect when you request a quote, what we do with it, how long we keep it, and how to ask us to delete it. We do not sell your information.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      href="/privacy"
      lastUpdated="31 July 2026"
      intro="What we collect when you contact us, what we do with it, and how to get it deleted. The short version: we use it to quote and run your move, and we do not sell it."
    >
      <h2>Who we are</h2>
      <p>
        {business.legalName}, {formattedAddress}. You can reach us at{' '}
        <a href={`mailto:${business.email.general}`}>{business.email.general}</a> or{' '}
        <a href={business.phone.href}>{business.phone.display}</a>.
      </p>

      <h2>What we collect</h2>
      <p>We collect information in three ways.</p>
      <h3>Information you give us</h3>
      <ul>
        <li>
          <strong>Quote requests:</strong> your name, phone number, email address, origin and
          destination, home size, target date, selected services, and any notes you add.
        </li>
        <li>
          <strong>Contact messages:</strong> your name, email, optional phone number, and the
          content of your message.
        </li>
        <li>
          <strong>Job applications:</strong> your name, contact details, the role applied for, your
          experience level, and whether you hold a CDL.
        </li>
        <li>
          <strong>Booked moves:</strong> service addresses, building and access details, inventory,
          and payment information collected at the time of booking.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <p>
        Standard server logs — IP address, browser type, pages requested, and timestamps — retained
        for security and diagnostics. If analytics is enabled, aggregate usage data is collected;
        the provider and its retention are listed under Third parties below.
      </p>
      <h3>Information we do not collect</h3>
      <p>
        We do not ask for social security numbers, financial account details, or government
        identifiers through this website. If you receive a message claiming to be from us and asking
        for those over email, it is not from us — call the office.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To prepare an estimate and contact you about it.</li>
        <li>To plan, staff, and carry out a move you book.</li>
        <li>To file certificates of insurance and building paperwork on your behalf.</li>
        <li>To handle billing, claims, and customer service.</li>
        <li>To meet record-keeping obligations that apply to licensed household-goods carriers.</li>
        <li>To assess job applications.</li>
      </ul>
      <p>
        We do not use quote requests to build a marketing list unless you separately ask to hear
        from us.
      </p>

      <h2>What we do not do</h2>
      <p>
        <strong>We do not sell your personal information, and we do not share it with lead
        brokers.</strong> This matters in this industry specifically: submitting a quote request to
        some moving websites means your number is resold to a dozen carriers who all call you. We
        are a carrier, not a broker, and your details stay with us.
      </p>

      <h2>Third parties</h2>
      <p>We share information only with providers who need it to deliver the service:</p>
      <ul>
        <li>
          <strong>Website hosting</strong> — serves this site and keeps server logs.
        </li>
        <li>
          <strong>Email delivery</strong> — transmits form submissions to our office inbox.
        </li>
        <li>
          <strong>Spam protection</strong> — if a challenge provider is enabled, it receives the
          data needed to score the submission.
        </li>
        <li>
          <strong>Analytics</strong> — if enabled, receives aggregate usage data.
        </li>
        <li>
          <strong>Payment processing</strong> — card details go directly to the processor; we do not
          store full card numbers.
        </li>
        <li>
          <strong>Buildings and associations</strong> — crew names and insurance certificates, where
          required for access to your building.
        </li>
      </ul>
      <p>
        We may also disclose information where required by law, or to establish or defend a legal
        claim.
      </p>

      <h2>How long we keep it</h2>
      <ul>
        <li>
          <strong>Quote requests that do not become bookings:</strong> retained while the enquiry is
          live and then deleted on request.
        </li>
        <li>
          <strong>Booked moves:</strong> retained as long as required for tax, insurance, and
          carrier record-keeping obligations.
        </li>
        <li>
          <strong>Job applications:</strong> retained for the current hiring cycle unless you ask us
          to keep them on file.
        </li>
        <li>
          <strong>Server logs:</strong> retained on a short rolling window for security purposes.
        </li>
      </ul>

      <h2>Your choices</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>Tell you what personal information we hold about you.</li>
        <li>Correct anything inaccurate.</li>
        <li>
          Delete it, subject to records we are legally required to retain for a completed move.
        </li>
        <li>Stop contacting you.</li>
      </ul>
      <p>
        Email <a href={`mailto:${business.email.general}`}>{business.email.general}</a> and we will
        respond within 30 days. Florida does not currently have a general consumer privacy statute
        granting these rights, but we honour these requests regardless of where you live.
      </p>

      <h2>Cookies</h2>
      <p>
        This site does not use advertising or cross-site tracking cookies. If analytics is enabled,
        it may set a first-party cookie to distinguish sessions; you can block it in your browser
        without affecting the site. Your browser&rsquo;s Do Not Track and Global Privacy Control
        signals are respected where a provider supports them.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS and form submissions are transmitted encrypted. No system is
        perfectly secure, and we would rather say that plainly than promise otherwise. Please do not
        send financial account details or identity documents through the contact form.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed at children under 13 and we do not knowingly collect information
        from them. If you believe a child has provided information, contact us and we will delete
        it.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes materially, we will update the date at the top of this page. Continued
        use of the site after a change means you accept the updated policy.
      </p>
    </LegalPage>
  )
}
