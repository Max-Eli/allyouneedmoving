/**
 * Single source of truth for every factual claim the site makes about the business.
 *
 * IMPORTANT: many values here are still placeholders carried over from the design
 * mockup. Every one of them is registered in `PLACEHOLDER_CLAIMS` below. Run
 * `npm run audit:claims` before any production deploy — it fails while unverified
 * claims remain, and it also detects values that were edited without being cleared
 * from the registry.
 *
 * Do not hardcode a phone number, licence number, review count, or statistic
 * anywhere else in the codebase. Import it from here.
 */

export const business = {
  name: 'AllYouNeedMovers',
  legalName: 'AllYouNeedMovers LLC',
  tagline: 'Movers who show up, wrap it right, and get it there.',
  description:
    'Family-owned South Florida movers since 2012. Local moves across Miami, Broward, and Palm Beach, plus long-distance hauls to all 48 states.',

  founded: 2012,
  founderName: 'Marco Delgado',
  founderStory: 'Hollywood, Florida',

  phone: {
    display: '(718) 757-5177',
    e164: '+17187575177',
    href: 'tel:+17187575177',
  },

  email: {
    general: 'move@allyouneedmovers.com',
    quotes: 'quotes@allyouneedmovers.com',
    careers: 'careers@allyouneedmovers.com',
  },

  address: {
    street: '2410 NW 19th St',
    city: 'Fort Lauderdale',
    region: 'FL',
    regionName: 'Florida',
    postalCode: '33311',
    country: 'US',
  },

  /** Used for LocalBusiness JSON-LD. Must match the real yard, not an approximation. */
  geo: {
    latitude: 26.1445,
    longitude: -80.1731,
  },

  hours: {
    display: 'Open 7 days, 7am–7pm',
    /** schema.org openingHours format */
    schema: ['Mo-Su 07:00-19:00'],
  },

  /**
   * Regulatory identifiers. Publishing a number that is not yours is an FMCSA
   * violation — these must be verified against the actual operating authority
   * at https://safer.fmcsa.dot.gov before launch.
   */
  licenses: {
    floridaIntrastate: 'IM#2417',
    usdot: '3891204',
    mc: 'MC 1187733',
  },

  insurance: {
    generalLiability: '$2,000,000',
    cargo: '$250,000 / load',
    workersComp: 'Full staff coverage',
  },

  /**
   * Aggregate review data. Under the FTC's Rule on Consumer Reviews and
   * Testimonials (16 CFR Part 465, effective October 2024), publishing a review
   * count or rating that does not reflect genuine reviews carries civil penalties.
   * These must come from a real, auditable source before launch.
   */
  reviews: {
    rating: 4.9,
    count: 1240,
    /** Where the aggregate is drawn from. Must be truthful and linkable. */
    sources: [] as { name: string; url: string; rating: number; count: number }[],
  },

  stats: {
    movesCompleted: '18,400',
    trucks: '11',
    yards: 'two',
    onOrUnderEstimate: '96%',
    statesAuthorized: '48',
  },

  social: {
    google: '',
    facebook: '',
    instagram: '',
    yelp: '',
    bbb: '',
  },
} as const

export type Business = typeof business

/** Where the address renders as a single line. */
export const formattedAddress = `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`

/** Licence line shown in the footer — FMCSA requires carriers to display these. */
export const licenseLine = `FL ${business.licenses.floridaIntrastate} · USDOT ${business.licenses.usdot} · ${business.licenses.mc}`

// ─────────────────────────────────────────────────────────────────────────────
// Pre-launch claim registry
// ─────────────────────────────────────────────────────────────────────────────

export type ClaimRisk = 'legal' | 'high' | 'medium'

export interface PlaceholderClaim {
  /** Dotted path into `business`, for the audit script. */
  path: string
  /** The placeholder currently in place. The audit compares against this. */
  currentValue: string
  /** What has to happen before launch. */
  action: string
  risk: ClaimRisk
  /** Why it matters, in plain terms. */
  why: string
}

/**
 * Every value carried over from the design mockup that has not been confirmed
 * against the real business. Delete an entry once its value is verified.
 */
export const PLACEHOLDER_CLAIMS: PlaceholderClaim[] = [
  {
    path: 'licenses.usdot',
    currentValue: '3891204',
    action: 'Replace with the real USDOT number and verify it at safer.fmcsa.dot.gov.',
    risk: 'legal',
    why: 'Advertising under a USDOT number that is not yours is an FMCSA violation and can void customer claims.',
  },
  {
    path: 'licenses.mc',
    currentValue: 'MC 1187733',
    action: 'Replace with the real motor carrier number issued with your interstate authority.',
    risk: 'legal',
    why: 'Interstate moves cannot legally be advertised without valid, matching operating authority.',
  },
  {
    path: 'licenses.floridaIntrastate',
    currentValue: 'IM#2417',
    action: 'Replace with the real FDACS intrastate mover registration number.',
    risk: 'legal',
    why: 'Florida requires the IM number in all advertising for intrastate moves (F.S. 507).',
  },
  {
    path: 'reviews.rating',
    currentValue: '4.9',
    action: 'Replace with the true current aggregate, and populate reviews.sources with linkable origins.',
    risk: 'legal',
    why: 'FTC 16 CFR Part 465 prohibits fake or unsubstantiated review aggregates; penalties are per violation.',
  },
  {
    path: 'reviews.count',
    currentValue: '1240',
    action: 'Replace with the true count of genuine reviews behind the aggregate.',
    risk: 'legal',
    why: 'Same FTC rule. The count must be substantiable if challenged.',
  },
  {
    path: 'address.street',
    currentValue: '2410 NW 19th St',
    action: 'Confirm the real yard address, then update geo.latitude / geo.longitude to match.',
    risk: 'high',
    why: 'The address feeds LocalBusiness schema and must match the Google Business Profile exactly or local ranking suffers.',
  },
  {
    path: 'geo.latitude',
    currentValue: '26.1445',
    action: 'Set to the verified coordinates of the confirmed address.',
    risk: 'medium',
    why: 'Wrong coordinates put the map pin in the wrong place and weaken local SEO signals.',
  },
  {
    path: 'stats.movesCompleted',
    currentValue: '18,400',
    action: 'Replace with a real figure from dispatch records, or remove the stat.',
    risk: 'high',
    why: 'An unsubstantiated performance claim in advertising is deceptive under FTC Act §5.',
  },
  {
    path: 'stats.onOrUnderEstimate',
    currentValue: '96%',
    action: 'Replace with a measured figure you can document, or remove the stat.',
    risk: 'high',
    why: 'This is a specific, falsifiable performance claim — the hardest kind to defend without records.',
  },
  {
    path: 'stats.trucks',
    currentValue: '11',
    action: 'Confirm the current fleet count.',
    risk: 'medium',
    why: 'Capacity claims set customer expectations about availability.',
  },
  {
    path: 'insurance.generalLiability',
    currentValue: '$2,000,000',
    action: 'Confirm against the current certificate of insurance.',
    risk: 'high',
    why: 'Stating coverage you do not carry misleads customers and buildings that require a COI.',
  },
  {
    path: 'insurance.cargo',
    currentValue: '$250,000 / load',
    action: 'Confirm against the current cargo policy.',
    risk: 'high',
    why: 'Cargo limits are relied on by customers deciding whether to buy extra valuation.',
  },
  {
    path: 'founderName',
    currentValue: 'Marco Delgado',
    action: 'Confirm the real founder name and the origin story on the About page.',
    risk: 'medium',
    why: 'The About page narrative is presented as fact and is currently invented.',
  },
  {
    path: 'email.general',
    currentValue: 'move@allyouneedmovers.com',
    action: 'Confirm the inbox exists and is monitored.',
    risk: 'medium',
    why: 'An unmonitored address loses leads silently.',
  },
]
