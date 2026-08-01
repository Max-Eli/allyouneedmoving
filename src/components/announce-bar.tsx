import { business } from '@/config/business'

export function AnnounceBar() {
  return (
    <div className="announce">
      <span className="announce__lead">
        Family owned in South Florida since {business.founded} · Licensed &amp; insured
      </span>
      <span className="announce__right">
        <span className="announce__hours">{business.hours.display}</span>
        <a href={business.phone.href} className="announce__tel">
          {business.phone.display}
        </a>
      </span>
    </div>
  )
}
