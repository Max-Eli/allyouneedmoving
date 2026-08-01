/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // The static prototype used hash routes; these cover the plain-path equivalents
      // and the service names people actually type.
      { source: '/services/long-distance', destination: '/services/long-distance-moving', permanent: true },
      { source: '/services/packing', destination: '/services/packing-unpacking', permanent: true },
      { source: '/services/commercial', destination: '/services/commercial-office-moving', permanent: true },
      { source: '/services/senior-moves', destination: '/services/senior-downsizing-moves', permanent: true },
      { source: '/locations', destination: '/service-areas', permanent: true },
      { source: '/get-a-quote', destination: '/quote', permanent: true },
    ]
  },
}

export default nextConfig
