'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? '#C4633A' : '#9CA3AF'}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  )
}

function MicIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? '#C4633A' : '#9CA3AF'}>
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
    </svg>
  )
}

function QueueIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? '#C4633A' : '#9CA3AF'}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  )
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? '#C4633A' : '#9CA3AF'}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
}

const TABS = [
  { key: 'home', labelSw: 'Nyumbani', href: '', Icon: HomeIcon },
  { key: 'record', labelSw: 'Rekodi', href: '/record', Icon: MicIcon },
  { key: 'review', labelSw: 'Kagua', href: '/review', Icon: QueueIcon },
  { key: 'profile', labelSw: 'Wasifu', href: '/profile', Icon: UserIcon },
]

export function BottomNav() {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'sw'
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="flex max-w-lg mx-auto">
        {TABS.map(({ key, labelSw, href, Icon }) => {
          const fullHref = `/${locale}${href}`
          const isActive =
            href === ''
              ? pathname === `/${locale}` || pathname === `/${locale}/`
              : pathname.startsWith(`/${locale}${href}`)

          return (
            <Link
              key={key}
              href={fullHref}
              className="flex-1 flex flex-col items-center py-2 gap-1 touch-manipulation"
            >
              <Icon active={isActive} />
              <span
                className="text-xs font-semibold"
                style={{ color: isActive ? '#C4633A' : '#9CA3AF' }}
              >
                {labelSw}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
