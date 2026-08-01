import { LegalPage } from '@/components/legal-page'
import { business } from '@/config/business'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Accessibility Statement',
  description:
    'Our commitment to WCAG 2.1 AA, what we have implemented, what we know is outstanding, and how to tell us about a barrier.',
  path: '/accessibility',
})

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      href="/accessibility"
      lastUpdated="31 July 2026"
      needsReview={false}
      intro="We aim to meet WCAG 2.1 Level AA. This page says what we have done, what we know is still outstanding, and how to tell us when we have got something wrong."
    >
      <h2>Our target</h2>
      <p>
        We aim to conform to the{' '}
        <a href="https://www.w3.org/WAI/WCAG21/quickref/">
          Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
        </a>
        . That is the standard most commonly referenced under the Americans with Disabilities Act
        for public-facing websites.
      </p>

      <h2>What we have implemented</h2>
      <ul>
        <li>
          <strong>Keyboard access.</strong> Every interactive element is reachable and operable by
          keyboard, with a visible focus outline. The mobile menu traps focus while open and closes
          on Escape.
        </li>
        <li>
          <strong>Skip link.</strong> A &ldquo;Skip to main content&rdquo; link is the first
          focusable element on every page.
        </li>
        <li>
          <strong>Semantic structure.</strong> One <code>h1</code> per page, headings in order,
          landmark regions, and lists marked up as lists.
        </li>
        <li>
          <strong>Form labels and errors.</strong> Every field has a real label. Validation errors
          are associated with their field via <code>aria-describedby</code> and marked with{' '}
          <code>aria-invalid</code>, so they are announced rather than only shown in red.
        </li>
        <li>
          <strong>Multi-step form focus.</strong> Advancing a step in the quote wizard moves focus
          to the new step&rsquo;s heading, so keyboard and screen-reader users are not stranded.
        </li>
        <li>
          <strong>Toggle state.</strong> Selection buttons expose <code>aria-pressed</code>, and the
          accordion exposes <code>aria-expanded</code>, rather than relying on colour alone.
        </li>
        <li>
          <strong>Live regions.</strong> The estimator readout, the ZIP result, and form
          confirmations are announced as they update.
        </li>
        <li>
          <strong>Reduced motion.</strong> The scrolling banner and all transitions are disabled
          when your system requests reduced motion.
        </li>
        <li>
          <strong>Colour contrast.</strong> Body text and interface text are chosen to meet the AA
          contrast ratio against their backgrounds.
        </li>
        <li>
          <strong>Zoom and reflow.</strong> Layouts reflow to 320&nbsp;px without horizontal
          scrolling, and text scales without loss of content.
        </li>
      </ul>

      <h2>Known limitations</h2>
      <p>We would rather list these than pretend they are not there.</p>
      <ul>
        <li>
          <strong>Images are placeholders.</strong> The hatched blocks marked{' '}
          <code>[ PHOTO SLOT ]</code> are awaiting real photography. Descriptive alternative text
          will be written for each image when it is supplied.
        </li>
        <li>
          <strong>No formal audit yet.</strong> Conformance so far is based on our own testing, not
          an independent third-party audit.
        </li>
        <li>
          <strong>Assistive technology coverage.</strong> We have not yet tested against the full
          matrix of screen readers and browsers.
        </li>
        <li>
          <strong>The map block</strong> is a placeholder. When a real map is added it will be
          paired with a text list of covered ZIP codes, which is already published on each service
          area page.
        </li>
      </ul>

      <h2>Tell us about a barrier</h2>
      <p>
        If something on this site stops you doing what you came to do, we want to hear about it —
        and we will help you complete the task in the meantime.
      </p>
      <ul>
        <li>
          Phone: <a href={business.phone.href}>{business.phone.display}</a> —{' '}
          {business.hours.display.toLowerCase()}
        </li>
        <li>
          Email: <a href={`mailto:${business.email.general}`}>{business.email.general}</a>
        </li>
      </ul>
      <p>
        Tell us the page, what you were trying to do, and what happened. We aim to respond within
        two business days. Anything you can do on this site you can also do by phone, including
        getting a full written estimate.
      </p>

      <h2>Ongoing work</h2>
      <p>
        Accessibility is not a one-time task. We re-check keyboard paths, contrast, and form
        semantics whenever we change the site, and we will update the known limitations above as
        they are resolved.
      </p>
    </LegalPage>
  )
}
