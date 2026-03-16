'use client'

import { useState } from 'react'
import { BottomNav } from '@/components/BottomNav'
import { WaveformBars } from '@/components/WaveformBars'

const CARDS = [
  {
    id: 1,
    term: 'Mvuto wa Uso',
    termFr: 'Tension Superficielle',
    termEn: 'Surface Tension',
    teacher: 'Mwalimu Asha',
    initials: 'MA',
    avatarColor: '#4A8A42',
    duration: '02:14',
    lang: 'SW',
    verified: true,
    analogy: 'Kama maji ya Mto Kongo...',
  },
  {
    id: 2,
    term: 'Kasi ya Mwendo',
    termFr: 'Accélération',
    termEn: 'Acceleration',
    teacher: 'Mwalimu Kofi',
    initials: 'MK',
    avatarColor: '#C4633A',
    duration: '01:47',
    lang: 'FR',
    verified: true,
    analogy: 'Kama mtu anayekimbia mbio...',
  },
  {
    id: 3,
    term: 'Nishati ya Jua',
    termFr: 'Énergie Solaire',
    termEn: 'Solar Energy',
    teacher: 'Prof. Amara',
    initials: 'PA',
    avatarColor: '#D4A017',
    duration: '03:02',
    lang: 'SW',
    verified: false,
    analogy: 'Jua kama tanuri kubwa...',
  },
  {
    id: 4,
    term: 'Photosynthèse',
    termFr: 'Photosynthèse',
    termEn: 'Photosynthesis',
    teacher: 'Mwalimu Fatima',
    initials: 'MF',
    avatarColor: '#2D5A27',
    duration: '02:38',
    lang: 'FR',
    verified: true,
    analogy: 'Mmea kama jiko la kupika...',
  },
]

type Lang = 'SW' | 'FR' | 'EN'

function VerifiedBadge() {
  return (
    <span title="Imekaguliwa / Vérifié / Verified" className="inline-flex items-center">
      {/* Talking drum + shield */}
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#D4A017">
        <path d="M10 1l2.39 4.84L18 7.27l-4 3.9.94 5.5L10 14.1l-4.94 2.57.94-5.5-4-3.9 5.61-.43L10 1z" />
      </svg>
    </span>
  )
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      <span className="text-white text-xs font-bold">{initials}</span>
    </div>
  )
}

export default function DiscoverPage() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [lang, setLang] = useState<Lang>('SW')
  const [search, setSearch] = useState('')

  const togglePlay = (id: number) => {
    setPlayingId((prev) => (prev === id ? null : id))
  }

  const filteredCards = CARDS.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.term.toLowerCase().includes(q) ||
      c.termFr.toLowerCase().includes(q) ||
      c.termEn.toLowerCase().includes(q) ||
      c.teacher.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-dvh flex flex-col bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-40" style={{ backgroundColor: '#C4633A' }}>
        <div className="max-w-lg mx-auto px-4 pt-4 pb-3">
          {/* Logo row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ntina-Icon.png" alt="Ntina" className="w-8 h-8 rounded-lg" />
              <span className="text-white text-xl font-bold tracking-wide">Ntina</span>
            </div>
            {/* Language toggle */}
            <div className="flex rounded-full overflow-hidden border border-white/30">
              {(['SW', 'FR', 'EN'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 text-xs font-bold transition-colors ${
                    lang === l ? 'bg-white text-terracotta' : 'text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
              fill="white"
              opacity={0.7}
            >
              <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tafuta · Chercher · Search"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-500 outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 pb-24 pt-4">
        {/* Top Explanations Banner */}
        <div
          className="rounded-xl px-4 py-3 mb-4 flex items-center gap-3"
          style={{ backgroundColor: '#2D5A27' }}
        >
          {/* Talking drum icon */}
          <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0" fill="none">
            <ellipse cx="16" cy="16" rx="6" ry="11" fill="#D4A017" />
            <rect x="10" y="5" width="12" height="2" rx="1" fill="#A07810" />
            <rect x="10" y="25" width="12" height="2" rx="1" fill="#A07810" />
            <line x1="10" y1="6" x2="6" y2="16" stroke="#A07810" strokeWidth="1.5" />
            <line x1="22" y1="6" x2="26" y2="16" stroke="#A07810" strokeWidth="1.5" />
            <line x1="6" y1="16" x2="10" y2="26" stroke="#A07810" strokeWidth="1.5" />
            <line x1="26" y1="16" x2="22" y2="26" stroke="#A07810" strokeWidth="1.5" />
          </svg>
          <div>
            <p className="text-white font-bold text-sm">Maelezo Bora ya Wiki</p>
            <p className="text-white/70 text-xs">Top Explanations of the Week</p>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {filteredCards.map((card) => {
            const isPlaying = playingId === card.id

            return (
              <div
                key={card.id}
                className={`rounded-2xl overflow-hidden transition-all ${
                  isPlaying ? 'ring-2 ring-gold' : ''
                }`}
                style={{ backgroundColor: '#2D5A27' }}
              >
                {/* Card header */}
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: '#D4A017', color: '#1A3A16' }}
                        >
                          {card.lang}
                        </span>
                        {card.verified && <VerifiedBadge />}
                      </div>
                      <h2 className="text-white text-xl font-extrabold leading-tight">
                        {card.term}
                      </h2>
                      <p className="text-white/60 text-xs mt-0.5">
                        {card.termFr} · {card.termEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-4 pb-4">
                  {/* Teacher + play row */}
                  <div className="flex items-center gap-3 mt-2">
                    <Avatar initials={card.initials} color={card.avatarColor} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm font-semibold truncate">
                        {card.teacher}
                      </p>
                      {/* Waveform */}
                      <div className="mt-1">
                        <WaveformBars playing={isPlaying} color={isPlaying ? '#D4A017' : 'rgba(255,255,255,0.4)'} count={12} />
                      </div>
                    </div>

                    {/* Play button */}
                    <button
                      onClick={() => togglePlay(card.id)}
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-95"
                      style={{ backgroundColor: '#D4A017' }}
                      aria-label={isPlaying ? 'Simama' : 'Cheza'}
                    >
                      {isPlaying ? (
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1A3A16">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1A3A16">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Playing state expanded */}
                  {isPlaying && (
                    <div
                      className="mt-3 rounded-xl px-3 py-2"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs">Inacheza · En cours · Playing</span>
                        <span className="text-gold text-xs font-mono font-bold">{card.duration}</span>
                      </div>
                      <p className="text-white/70 text-xs mt-1 italic">&ldquo;{card.analogy}&rdquo;</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {filteredCards.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg font-semibold">Hakuna matokeo</p>
              <p className="text-sm mt-1">Aucun résultat · No results</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
