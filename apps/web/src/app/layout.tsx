import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ntina — Maarifa ya STEM kwa Kiafrika',
  description: 'Audio-centric STEM knowledge base in Swahili, Kinyarwanda, French and English.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ntina',
  },
}

export const viewport: Viewport = {
  themeColor: '#C4633A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
