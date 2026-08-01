import { business } from './business'

/** Canonical origin, no trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.allyouneedmovers.com').replace(
  /\/$/,
  '',
)

export const siteName = business.name

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export interface NavItem {
  label: string
  href: string
}

/** Header navigation. Kept short — the footer carries the long tail. */
export const primaryNav: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Services',
    items: [
      { label: 'Local moving', href: '/services/local-moving' },
      { label: 'Long-distance moving', href: '/services/long-distance-moving' },
      { label: 'Packing & unpacking', href: '/services/packing-unpacking' },
      { label: 'Storage', href: '/services/storage' },
      { label: 'Piano & specialty', href: '/services/piano-specialty-moving' },
      { label: 'Commercial & office', href: '/services/commercial-office-moving' },
      { label: 'Senior & downsizing', href: '/services/senior-downsizing-moves' },
    ],
  },
  {
    heading: 'Service areas',
    items: [
      { label: 'Fort Lauderdale', href: '/service-areas/fort-lauderdale' },
      { label: 'Miami', href: '/service-areas/miami' },
      { label: 'West Palm Beach', href: '/service-areas/west-palm-beach' },
      { label: 'Boca Raton', href: '/service-areas/boca-raton' },
      { label: 'Hollywood', href: '/service-areas/hollywood' },
      { label: 'All areas', href: '/service-areas' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About us', href: '/about' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Moving guides', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export const legalNav: NavItem[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Your rights when you move', href: '/moving-rights' },
]
