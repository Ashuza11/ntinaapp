'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const SLIDES = [
  {
    id: 1,
    headline: 'Karibu Ntina',
    sub: 'Record, validate, and share STEM explanations in your language.',
    subSw: 'Rekodi, kagua, na shiriki maelezo ya STEM kwa lugha yako.',
    illustration: 'mic',
    cta: 'Endelea',
    ctaEn: 'Continue',
  },
  {
    id: 2,
    headline: 'Eleza kwa Lugha Yako',
    sub: 'Kiswahili, Français, English, Ikinyarwanda — sema wazi.',
    subSw: 'Fafanua dhana ngumu kwa maneno rahisi na mfano wa kienyeji.',
    illustration: 'globe',
    cta: 'Endelea',
    ctaEn: 'Continue',
  },
  {
    id: 3,
    headline: 'Kagua na Wenzako',
    sub: 'Peer validation ensures quality across every explanation.',
    subSw: 'Wenzako wanakagua rekodi zako na kukupa alama.',
    illustration: 'check',
    cta: 'Anza Kurekodi',
    ctaEn: 'Start Recording',
  },
]

function Illustration({ type }: { type: string }) {
  if (type === 'mic') {
    return (
      <div
        className="w-48 h-48 rounded-full flex items-center justify-center mx-auto"
        style={{ backgroundColor: '#2D5A27' }}
      >
        <svg viewBox="0 0 80 80" className="w-28 h-28">
          {/* Phone */}
          <rect x="22" y="8" width="36" height="60" rx="6" fill="#C4633A" />
          <rect x="26" y="14" width="28" height="42" rx="3" fill="#FAF7F2" />
          {/* Mic icon in phone screen */}
          <ellipse cx="40" cy="30" rx="7" ry="9" fill="#2D5A27" />
          <path d="M32 35 Q40 45 48 35" stroke="#2D5A27" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <line x1="40" y1="44" x2="40" y2="50" stroke="#2D5A27" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="34" y1="50" x2="46" y2="50" stroke="#2D5A27" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sound waves */}
          <path d="M54 25 Q58 30 54 35" stroke="#D4A017" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M58 21 Q64 30 58 39" stroke="#D4A017" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
          {/* Africa map silhouette simplified */}
          <path d="M8 30 Q10 20 14 22 Q16 16 20 20 Q22 15 24 18 Q26 10 28 14" stroke="#D4A017" strokeWidth="1.5" fill="none" opacity="0.4" />
        </svg>
      </div>
    )
  }

  if (type === 'globe') {
    return (
      <div
        className="w-48 h-48 rounded-full flex items-center justify-center mx-auto"
        style={{ backgroundColor: '#C4633A' }}
      >
        <svg viewBox="0 0 80 80" className="w-28 h-28">
          <circle cx="40" cy="40" r="26" fill="#2D5A27" />
          <ellipse cx="40" cy="40" rx="10" ry="26" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="14" y1="40" x2="66" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="18" y1="28" x2="62" y2="28" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="18" y1="52" x2="62" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Language pills */}
          <rect x="28" y="25" width="24" height="8" rx="4" fill="#D4A017" />
          <text x="40" y="31.5" textAnchor="middle" fontSize="5" fill="#1A3A16" fontWeight="bold">SW · FR · EN</text>
          <rect x="22" y="45" width="36" height="8" rx="4" fill="rgba(255,255,255,0.9)" />
          <text x="40" y="51.5" textAnchor="middle" fontSize="5" fill="#2D5A27" fontWeight="bold">Ikinyarwanda</text>
        </svg>
      </div>
    )
  }

  // check
  return (
    <div
      className="w-48 h-48 rounded-full flex items-center justify-center mx-auto"
      style={{ backgroundColor: '#D4A017' }}
    >
      <svg viewBox="0 0 80 80" className="w-28 h-28">
        {/* Two people */}
        <circle cx="25" cy="22" r="9" fill="#2D5A27" />
        <path d="M10 55 Q10 38 25 38 Q40 38 40 55" fill="#2D5A27" />
        <circle cx="55" cy="22" r="9" fill="#C4633A" />
        <path d="M40 55 Q40 38 55 38 Q70 38 70 55" fill="#C4633A" />
        {/* Check badge */}
        <circle cx="55" cy="52" r="12" fill="#1A3A16" />
        <path d="M49 52 L53 56 L61 47" stroke="#D4A017" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function OnboardingPage() {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'sw'
  const [slide, setSlide] = useState(0)

  const current = SLIDES[slide]
  const isLast = slide === SLIDES.length - 1

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-between px-6 py-12"
      style={{ backgroundColor: '#FAF7F2' }}
    >
      {/* Skip */}
      <div className="w-full flex justify-end">
        <Link
          href={`/${locale}`}
          className="text-gray-400 text-sm font-semibold"
        >
          Ruka · Skip
        </Link>
      </div>

      {/* Illustration */}
      <div className="flex flex-col items-center gap-8 flex-1 justify-center w-full max-w-sm">
        <Illustration type={current.illustration} />

        <div className="text-center">
          <h1
            className="text-3xl font-extrabold mb-3"
            style={{ color: '#C4633A' }}
          >
            {current.headline}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed mb-1">{current.subSw}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{current.sub}</p>
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ backgroundColor: i === slide ? '#C4633A' : '#D1C5B8' }}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {isLast ? (
          <Link
            href={`/${locale}/record`}
            className="block w-full py-4 rounded-xl text-center font-extrabold text-lg"
            style={{ backgroundColor: '#D4A017', color: '#1A3A16' }}
          >
            🎙️ {current.cta}
          </Link>
        ) : (
          <button
            onClick={() => setSlide((s) => s + 1)}
            className="w-full py-4 rounded-xl font-extrabold text-lg"
            style={{ backgroundColor: '#D4A017', color: '#1A3A16' }}
          >
            {current.cta} →
          </button>
        )}
        <Link
          href={`/${locale}`}
          className="text-center text-gray-400 text-sm"
        >
          Gundua tu · Explorer d&apos;abord
        </Link>
      </div>
    </div>
  )
}
