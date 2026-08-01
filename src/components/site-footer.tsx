import Link from 'next/link'

import { business, formattedAddress, licenseLine } from '@/config/business'
import { footerNav, legalNav } from '@/config/site'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <div className="footer-brand">
            <span className="footer-brand__mark" aria-hidden="true">
              AYN
            </span>
            <span className="footer-brand__name">{business.name}</span>
          </div>
          <p className="footer__blurb">
            Family-owned since {business.founded}. Licensed, insured, and staffed by people we
            actually employ.
          </p>
          <p className="footer__creds">{licenseLine}</p>
        </div>

        {footerNav.map((group) => (
          <div key={group.heading}>
            <p className="footer__head">{group.heading}</p>
            <ul className="footer__list">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="footer__head">Contact</p>
          <ul className="footer__list">
            <li>
              <a href={business.phone.href} className="footer__gold">
                {business.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email.general}`} className="footer__gold">
                {business.email.general}
              </a>
            </li>
            <li>
              <address>{formattedAddress}</address>
            </li>
            <li>{business.hours.display}</li>
          </ul>
        </div>
      </div>

      <div className="site-footer__legal">
        <span>
          © {year} {business.legalName}
        </span>
        <span className="footer__legal-links">
          {legalNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  )
}
