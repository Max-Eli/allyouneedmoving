import { ImageResponse } from 'next/og'

import { business } from '@/config/business'

export const runtime = 'nodejs'

/**
 * Social card generator. Called from `pageMeta()` as /api/og?title=…
 *
 * Deliberately typographic — no remote fonts or images, so it renders fast and
 * cannot break because an asset host is slow. Colours mirror the site palette.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const raw = searchParams.get('title') ?? business.name
  const title = raw.length > 110 ? `${raw.slice(0, 107)}…` : raw

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F7F3EC',
          padding: '72px 80px',
          border: '16px solid #1B1A17',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              background: '#B8431C',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF8EE',
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            AYN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: '#1B1A17', letterSpacing: -1 }}>
              {business.name}
            </div>
            <div style={{ fontSize: 17, color: '#6B675E', letterSpacing: 3, marginTop: 4 }}>
              SOUTH FLORIDA · NATIONWIDE
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? 62 : 78,
            fontWeight: 800,
            color: '#1B1A17',
            letterSpacing: -3,
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              background: '#F2C14A',
              border: '3px solid #1B1A17',
              borderRadius: 4,
              padding: '10px 18px',
              fontSize: 20,
              fontWeight: 700,
              color: '#1B1A17',
            }}
          >
            LICENSED &amp; INSURED
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#4E4A42', fontWeight: 600 }}>
            Local &amp; long-distance movers · {business.phone.display}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
