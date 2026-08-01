import type { Metadata } from 'next'
import { business, formattedAddress } from '@/config/business'
import { absoluteUrl, siteName, siteUrl } from '@/config/site'

interface PageMetaInput {
  title: string
  description: string
  path: string
  /** Omit for pages that should not be indexed (thank-you pages, internal tools). */
  noindex?: boolean
  /** Skip the "| AllYouNeedMovers" suffix — for a title that already carries the brand. */
  absoluteTitle?: boolean
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

/**
 * Builds page metadata with a canonical URL and Open Graph card.
 * Every route should call this rather than hand-rolling a Metadata object,
 * so canonicals and OG images stay consistent.
 */
export function pageMeta({
  title,
  description,
  path,
  noindex = false,
  absoluteTitle = false,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  tags,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path)
  const ogImage = absoluteUrl(`/api/og?title=${encodeURIComponent(title)}`)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: ogType,
      url,
      siteName,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(tags ? { tags } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD
// ─────────────────────────────────────────────────────────────────────────────

const organizationId = `${siteUrl}/#organization`

/**
 * MovingCompany is a subtype of LocalBusiness and the correct type for a mover.
 *
 * aggregateRating is deliberately omitted while review data is unverified —
 * Google penalises schema that does not match visible on-page content, and the
 * FTC treats unsubstantiated aggregates as deceptive. Once
 * `business.reviews.sources` is populated with real data, add it back here.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    '@id': organizationId,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: siteUrl,
    telephone: business.phone.e164,
    email: business.email.general,
    foundingDate: String(business.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '19:00',
      },
    ],
    sameAs: Object.values(business.social).filter(Boolean),
    identifier: [
      { '@type': 'PropertyValue', name: 'USDOT', value: business.licenses.usdot },
      { '@type': 'PropertyValue', name: 'MC', value: business.licenses.mc },
      { '@type': 'PropertyValue', name: 'FL Intrastate Mover Registration', value: business.licenses.floridaIntrastate },
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    publisher: { '@id': organizationId },
  }
}

export function serviceSchema(input: {
  name: string
  description: string
  path: string
  areaServed: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.name,
    provider: { '@id': organizationId },
    areaServed: input.areaServed.map((name) => ({ '@type': 'City', name })),
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  }
}

export function articleSchema(input: {
  title: string
  description: string
  path: string
  published: string
  updated?: string
  author: string
  tags: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.published,
    dateModified: input.updated ?? input.published,
    author: { '@type': 'Organization', name: input.author, url: siteUrl },
    publisher: { '@id': organizationId },
    keywords: input.tags.join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(input.path) },
  }
}

export function localAreaSchema(input: {
  city: string
  path: string
  description: string
  zips: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: `${business.name} — ${input.city}`,
    description: input.description,
    url: absoluteUrl(input.path),
    telephone: business.phone.e164,
    parentOrganization: { '@id': organizationId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: {
      '@type': 'City',
      name: input.city,
      address: {
        '@type': 'PostalAddress',
        addressRegion: business.address.region,
        addressCountry: 'US',
      },
    },
  }
}

/** Used in the footer and contact page. */
export const contactSummary = {
  phone: business.phone.display,
  email: business.email.general,
  address: formattedAddress,
}
