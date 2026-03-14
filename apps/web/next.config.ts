import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images for low-bandwidth
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },

  // i18n handled by next-intl middleware
  experimental: {
    typedRoutes: true,
  },
}

export default pwaConfig(nextConfig)
