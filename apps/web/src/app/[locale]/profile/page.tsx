'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { BottomNav } from '@/components/BottomNav'

const RECORDINGS = [
  { id: 1, term: 'Mvuto wa Uso', lang: 'SW', duration: '02:14', verified: true, plays: 234 },
  { id: 2, term: 'Kasi ya Mwendo', lang: 'FR', duration: '01:47', verified: true, plays: 187 },
  { id: 3, term: 'Nishati ya Jua', lang: 'SW', duration: '03:02', verified: false, plays: 89 },
  { id: 4, term: 'Photosynthèse', lang: 'FR', duration: '02:38', verified: true, plays: 312 },
  { id: 5, term: 'Mfumo wa Ikolojia', lang: 'SW', duration: '02:55', verified: false, plays: 45 },
]

export default function ProfilePage() {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'sw'
  const [activeTab, setActiveTab] = useState<'recordings' | 'validations'>('recordings')

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Header / Hero */}
      <header style={{ backgroundColor: '#C4633A' }}>
        <div className="max-w-lg mx-auto px-4 pt-4 pb-6">
          {/* Top bar */}
          <div className="flex justify-end mb-4">
            <Link
              href={`/${locale}/settings`}
              className="p-2 rounded-lg"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
            </Link>
          </div>
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#2D5A27', border: '4px solid rgba(255,255,255,0.3)' }}
              >
                <span className="text-white text-3xl font-extrabold">MA</span>
              </div>
              {/* Online dot */}
              <div
                className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white"
                style={{ backgroundColor: '#4A8A42' }}
              />
            </div>
            <div className="text-center">
              <h1 className="text-white text-2xl font-extrabold">Mwalimu Asha</h1>
              <p className="text-white/70 text-sm">Mwalimu wa Sayansi · Nairobi, Kenya</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex justify-center gap-2 flex-wrap">
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: '#D4A017', color: '#1A3A16' }}
            >
              <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="#1A3A16">
                <path d="M10 1l2.39 4.84L18 7.27l-4 3.9.94 5.5L10 14.1l-4.94 2.57.94-5.5-4-3.9 5.61-.43L10 1z" />
              </svg>
              Mchangiaji Mkuu
            </span>
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            >
              ✅ Imekaguliwa
            </span>
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            >
              🎙️ Msemaji Bora
            </span>
          </div>
        </div>

        {/* Stats */}
        <div
          className="max-w-lg mx-auto grid grid-cols-3 divide-x"
          style={{ backgroundColor: '#A84F2E' }}
        >
          {[
            { label: 'Rekodi', value: '47' },
            { label: 'Ukaguzi', value: '132' },
            { label: 'Wafuasi', value: '1.2K' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center py-3 px-4">
              <span className="text-white text-xl font-extrabold">{value}</span>
              <span className="text-white/60 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full pb-24">
        {/* CTA */}
        <div className="px-4 py-4">
          <Link
            href={`/${locale}/record`}
            className="block w-full py-4 rounded-xl text-center font-extrabold text-lg transition-transform active:scale-95"
            style={{ backgroundColor: '#D4A017', color: '#1A3A16' }}
          >
            🎙️ Rekodi Maelezo Mapya
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-4">
          {(['recordings', 'validations'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-terracotta text-terracotta'
                  : 'border-transparent text-gray-400'
              }`}
            >
              {tab === 'recordings' ? '🎙️ Rekodi zangu' : '✅ Ukaguzi wangu'}
            </button>
          ))}
        </div>

        {/* Recordings list */}
        {activeTab === 'recordings' && (
          <div className="px-4 py-3 flex flex-col gap-3">
            {RECORDINGS.map((rec) => (
              <div
                key={rec.id}
                className="rounded-xl px-4 py-3 flex items-center gap-3 bg-white"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              >
                {/* Play icon */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#2D5A27' }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#D4A017">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-gray-800 text-sm truncate">{rec.term}</p>
                    {rec.verified && (
                      <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 flex-shrink-0" fill="#D4A017">
                        <path d="M10 1l2.39 4.84L18 7.27l-4 3.9.94 5.5L10 14.1l-4.94 2.57.94-5.5-4-3.9 5.61-.43L10 1z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: '#E8885A', color: 'white' }}
                    >
                      {rec.lang}
                    </span>
                    <span className="text-gray-400 text-xs">{rec.duration}</span>
                    <span className="text-gray-400 text-xs">· {rec.plays} sikilizo</span>
                  </div>
                </div>

                {!rec.verified && (
                  <span className="text-xs text-amber-600 font-semibold flex-shrink-0">Inasubiri</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Validations tab */}
        {activeTab === 'validations' && (
          <div className="px-4 py-6 flex flex-col items-center gap-4">
            {/* Progress toward Master */}
            <div
              className="w-full rounded-2xl px-6 py-5 flex flex-col items-center gap-3"
              style={{ backgroundColor: '#2D5A27' }}
            >
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#D4A017">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <p className="text-white font-extrabold text-xl">132 / 200</p>
              <p className="text-white/60 text-sm text-center">
                Ukaguzi kuelekea Mchangiaji Mkuu wa Daraja la 2
              </p>
              <div className="w-full h-3 rounded-full bg-white/20">
                <div
                  className="h-3 rounded-full"
                  style={{ width: '66%', backgroundColor: '#D4A017' }}
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Imekubaliwa', value: '89', color: '#2D5A27' },
                { label: 'Imehaririwa', value: '31', color: '#D4A017' },
                { label: 'Imefutwa', value: '12', color: '#C4633A' },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="rounded-xl py-4"
                  style={{ backgroundColor: color + '22' }}
                >
                  <p className="text-2xl font-extrabold" style={{ color }}>{value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
