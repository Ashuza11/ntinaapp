'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { BottomNav } from '@/components/BottomNav'

type Lang = 'sw' | 'rw' | 'fr' | 'en'
type AudioQuality = 'low' | 'medium' | 'high'
type TextSize = 'small' | 'medium' | 'large'

const LANG_OPTIONS: { value: Lang; label: string; native: string }[] = [
  { value: 'sw', label: 'Swahili', native: 'Kiswahili' },
  { value: 'rw', label: 'Kinyarwanda', native: 'Ikinyarwanda' },
  { value: 'fr', label: 'French', native: 'Français' },
  { value: 'en', label: 'English', native: 'English' },
]

export default function SettingsPage() {
  const params = useParams()
  const router = useRouter()
  const currentLocale = (params?.locale as Lang) ?? 'sw'

  const [lang, setLang] = useState<Lang>(currentLocale)
  const [lowData, setLowData] = useState(false)
  const [textSize, setTextSize] = useState<TextSize>('medium')
  const [audioQuality, setAudioQuality] = useState<AudioQuality>('medium')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      if (lang !== currentLocale) {
        router.push(`/${lang}/settings`)
      }
    }, 1200)
  }

  const fontSizeMap: Record<TextSize, string> = {
    small: '14px',
    medium: '16px',
    large: '19px',
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Header */}
      <header className="sticky top-0 z-40" style={{ backgroundColor: '#C4633A' }}>
        <div className="max-w-lg mx-auto px-4 pt-4 pb-3 flex items-center gap-3">
          <button onClick={() => router.back()}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <div>
            <h1 className="text-white text-xl font-bold">Mipangilio</h1>
            <p className="text-white/60 text-xs">Paramètres · Settings</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 pb-24 pt-4 flex flex-col gap-4">
        {/* Account section */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
            Akaunti · Compte
          </p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="px-4 py-4 flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#2D5A27' }}
              >
                <span className="text-white font-bold">MA</span>
              </div>
              <div>
                <p className="font-bold text-gray-800">Mwalimu Asha</p>
                <p className="text-gray-400 text-xs">mwalimu.asha@ntina.app</p>
              </div>
            </div>
          </div>
        </section>

        {/* Language section */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
            Lugha · Langue · Language
          </p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {LANG_OPTIONS.map((opt, i) => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className={`w-full px-4 py-3.5 flex items-center justify-between ${
                  i < LANG_OPTIONS.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="text-left">
                  <p className="font-semibold text-gray-800 text-sm">{opt.native}</p>
                  <p className="text-gray-400 text-xs">{opt.label}</p>
                </div>
                {lang === opt.value && (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#2D5A27">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Low Data Mode */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
            Matumizi ya Data · Utilisation des données
          </p>
          <div className="bg-white rounded-2xl px-4 py-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐢</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Hifadhi Data</p>
                  <p className="text-gray-400 text-xs">Mode faible consommation</p>
                </div>
              </div>
              {/* Toggle */}
              <button
                onClick={() => setLowData((v) => !v)}
                className={`w-12 h-6 rounded-full transition-colors relative ${lowData ? 'bg-forest' : 'bg-gray-300'}`}
                role="switch"
                aria-checked={lowData}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    lowData ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
            {lowData && (
              <p className="text-xs text-gray-500 mt-2 ml-11">
                Hifadhi Data imewashwa — picha zimezimwa kupunguza matumizi ya data.
                <br />
                <span className="text-gray-400">Low Data Mode saves bandwidth by disabling images.</span>
              </p>
            )}
          </div>
        </section>

        {/* Text size */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
            Ukubwa wa Maandishi · Taille du texte
          </p>
          <div className="bg-white rounded-2xl px-4 py-4" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 font-bold">A-</span>
              <div className="flex-1 flex gap-2">
                {(['small', 'medium', 'large'] as TextSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setTextSize(s)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
                      textSize === s ? 'text-white' : 'text-gray-500 bg-gray-100'
                    }`}
                    style={textSize === s ? { backgroundColor: '#C4633A' } : {}}
                  >
                    {s === 'small' ? 'Ndogo' : s === 'medium' ? 'Kawaida' : 'Kubwa'}
                  </button>
                ))}
              </div>
              <span className="text-xl text-gray-400 font-bold">A+</span>
            </div>
            <p
              className="text-center mt-3 text-gray-600"
              style={{ fontSize: fontSizeMap[textSize] }}
            >
              Mfano wa ukubwa wa maandishi
            </p>
          </div>
        </section>

        {/* Audio quality */}
        <section>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
            Ubora wa Sauti · Qualité Audio
          </p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {([
              { value: 'low', label: 'Chini — Punguza data', sub: 'Low — Saves data' },
              { value: 'medium', label: 'Wastani — Bora zaidi', sub: 'Medium — Balanced' },
              { value: 'high', label: 'Juu — Ubora wa hali ya juu', sub: 'High — Best quality' },
            ] as { value: AudioQuality; label: string; sub: string }[]).map((opt, i) => (
              <button
                key={opt.value}
                onClick={() => setAudioQuality(opt.value)}
                className={`w-full px-4 py-3.5 flex items-center justify-between ${
                  i < 2 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="text-left">
                  <p className="font-semibold text-gray-800 text-sm">{opt.label}</p>
                  <p className="text-gray-400 text-xs">{opt.sub}</p>
                </div>
                {audioQuality === opt.value && (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#2D5A27">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-xl font-extrabold text-lg transition-transform active:scale-95"
          style={{ backgroundColor: saved ? '#2D5A27' : '#D4A017', color: '#1A3A16' }}
        >
          {saved ? '✅ Imehifadhiwa!' : 'Hifadhi · Sauvegarder'}
        </button>
      </main>

      <BottomNav />
    </div>
  )
}
