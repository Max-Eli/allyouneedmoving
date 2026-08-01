import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Libre_Franklin } from 'next/font/google'

import './globals.css'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AnnounceBar } from '@/components/announce-bar'
import { JsonLd } from '@/components/json-ld'
import { business } from '@/config/business'
import { siteName, siteUrl } from '@/config/site'
import { organizationSchema, websiteSchema } from '@/lib/seo'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const body = Libre_Franklin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — South Florida Movers, Local & Long Distance`,
    template: `%s | ${siteName}`,
  },
  description: business.description,
  applicationName: siteName,
  authors: [{ name: business.legalName }],
  creator: business.legalName,
  publisher: business.legalName,
  formatDetection: { telephone: true, address: true, email: true },
  // Icons are resolved from the file conventions in src/app — icon.svg and
  // apple-icon.tsx. Declaring them here as well produced 404s for files that
  // were never created.
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': `${siteUrl}/rss.xml` },
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />

        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <AnnounceBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
