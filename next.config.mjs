/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

// 'unsafe-eval' solo en desarrollo (HMR/React Refresh). En producción,
// script-src se cierra sin eval.
const scriptSrc = isDev
  ? "'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com"
  : "'self' 'unsafe-inline' https://www.googletagmanager.com";

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://www.googletagmanager.com https://cdn.simpleicons.org",
  "frame-src 'self' https://www.googletagmanager.com https://maps.google.com https://www.google.com",
  "connect-src 'self'",
].join("; ");

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
}

export default nextConfig
