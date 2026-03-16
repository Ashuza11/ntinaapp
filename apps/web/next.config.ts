import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Optimize images for low-bandwidth
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
}

export default pwaConfig(withNextIntl(nextConfig))
