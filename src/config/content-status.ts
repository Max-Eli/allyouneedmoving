/**
 * Flags for content that came from the design mockup and has not yet been
 * replaced with real material.
 *
 * While a flag is `false`, the site renders that content with a visible
 * "sample content" notice and omits it from structured data. That keeps the
 * design reviewable without any risk of fabricated testimonials or an invented
 * review aggregate being published as fact.
 *
 * Flip each flag to `true` only once the underlying content is genuine, and
 * remove the matching entry from PLACEHOLDER_CLAIMS in src/config/business.ts.
 */
export const contentStatus = {
  /** Named customer testimonials. FTC 16 CFR Part 465 applies. */
  testimonialsVerified: false,
  /** Aggregate star rating and review count. */
  reviewAggregateVerified: false,
  /** Company performance statistics (moves completed, % at or under estimate). */
  statsVerified: false,
  /** The founder narrative on the About page. */
  companyStoryVerified: false,
} as const

/** True when any sample content is still on the site. */
export const hasUnverifiedContent = Object.values(contentStatus).some((value) => !value)
