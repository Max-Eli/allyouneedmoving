import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * Generated at build time so there is no binary asset to keep in sync with the
 * brand colours. Next serves this at /apple-icon.png.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#B8431C',
          color: '#FFF8EE',
          fontSize: 58,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        AYN
      </div>
    ),
    size,
  )
}
