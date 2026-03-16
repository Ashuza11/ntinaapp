'use client'

import { useState } from 'react'
import { BottomNav } from '@/components/BottomNav'
import { WaveformBars } from '@/components/WaveformBars'

const ITEMS = [
  {
    id: 1,
    term: 'Mvuto wa Uso',
    termFr: 'Tension Superficielle',
    termEn: 'Surface Tension',
    teacher: 'Mwalimu Asha',
    initials: 'MA',
    avatarColor: '#4A8A42',
    duration: '02:14',
    definitionFr:
      'La tension superficielle est la propriété d\'un liquide de résister à une force extérieure en raison des liaisons moléculaires à sa surface.',
    definitionEn:
      'Surface tension is the tendency of liquid surfaces to shrink into the minimum surface area possible.',
    analogy:
      'Kama mdudu wa maji (water strider) anayetembea juu ya Mto Kongo bila kuzama — ndivyo mvuto wa uso unavyofanya kazi.',
    analogyEn: 'Like a water strider walking on the Congo River surface without sinking.',
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
    definitionFr:
      'L\'accélération est la variation de la vitesse d\'un objet par rapport au temps.',
    definitionEn:
      'Acceleration is the rate of change of velocity of an object with respect to time.',
    analogy:
      'Kama mtu anayepanda boda-boda — anazidi kasi kadri anapoongeza petroli.',
    analogyEn: 'Like a boda-boda rider speeding up as more fuel is given.',
  },
]

type Verdict = 'approve' | 'edit' | 'flag' | null

export default function ReviewPage() {
  const [itemIdx, setItemIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [verdicts, setVerdicts] = useState<Record<number, Verdict>>({})
  const [validations, setValidations] = useState(8)
  const [showBadge, setShowBadge] = useState(false)

  const total = 20
  const item = ITEMS[itemIdx]

  const handleVerdict = (v: Verdict) => {
    setVerdicts((prev) => ({ ...prev, [item.id]: v }))
    if (v === 'approve') {
      setValidations((n) => Math.min(total, n + 1))
      setShowBadge(true)
      setTimeout(() => {
        setShowBadge(false)
        if (itemIdx < ITEMS.length - 1) setItemIdx((i) => i + 1)
      }, 1200)
    } else {
      if (itemIdx < ITEMS.length - 1) {
        setTimeout(() => setItemIdx((i) => i + 1), 400)
      }
    }
    setPlaying(false)
  }

  const currentVerdict = verdicts[item.id] ?? null

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Header */}
      <header className="sticky top-0 z-40" style={{ backgroundColor: '#2D5A27' }}>
        <div className="max-w-lg mx-auto px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-white text-xl font-bold">Kagua</h1>
              <p className="text-white/60 text-xs">Valider · Review</p>
            </div>
            {/* Progress badge */}
            <div
              className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{ backgroundColor: 'rgba(212,160,23,0.2)' }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#D4A017">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-gold text-xs font-bold">
                {validations} / {total} → Mkuu
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-white/20">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${(validations / total) * 100}%`, backgroundColor: '#D4A017' }}
            />
          </div>
          <p className="text-white/50 text-xs mt-1">
            Ukaguzi {validations} / {total} kuelekea Mchangiaji Mkuu
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 pb-24 pt-4 flex flex-col gap-4">
        {/* Navigation between items */}
        {ITEMS.length > 1 && (
          <div className="flex gap-2">
            {ITEMS.map((it, i) => (
              <button
                key={it.id}
                onClick={() => { setItemIdx(i); setPlaying(false) }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  i === itemIdx ? 'text-white' : 'text-gray-500 bg-gray-100'
                }`}
                style={i === itemIdx ? { backgroundColor: '#2D5A27' } : {}}
              >
                {it.term}
              </button>
            ))}
          </div>
        )}

        {/* Contributor card */}
        <div
          className="rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ backgroundColor: '#2D5A27' }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: item.avatarColor }}
          >
            <span className="text-white text-xs font-bold">{item.initials}</span>
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm">{item.teacher}</p>
            <p className="text-white/60 text-xs">{item.term} · {item.duration}</p>
          </div>
          {/* Verified star */}
          <svg viewBox="0 0 20 20" className="w-5 h-5" fill="#D4A017">
            <path d="M10 1l2.39 4.84L18 7.27l-4 3.9.94 5.5L10 14.1l-4.94 2.57.94-5.5-4-3.9 5.61-.43L10 1z" />
          </svg>
        </div>

        {/* Audio Player */}
        <div
          className="rounded-2xl px-4 py-4 flex flex-col gap-3"
          style={{ backgroundColor: '#1A3A16' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-95"
              style={{ backgroundColor: '#D4A017' }}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1A3A16">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1A3A16">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex-1">
              <WaveformBars playing={playing} color={playing ? '#D4A017' : 'rgba(255,255,255,0.3)'} size="lg" count={15} />
            </div>
            <span className="text-white/60 text-xs font-mono">{item.duration}</span>
          </div>
          {playing && (
            <p className="text-white/50 text-xs text-center">
              Inacheza · En lecture · Playing
            </p>
          )}
        </div>

        {/* Definitions */}
        <div className="flex flex-col gap-3">
          {/* French */}
          <div className="rounded-xl px-4 py-3 border-l-4" style={{ borderColor: '#C4633A', backgroundColor: '#fff' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#C4633A', color: 'white' }}
              >
                FR
              </span>
              <span className="text-gray-400 text-xs">Définition</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{item.definitionFr}</p>
          </div>

          {/* English */}
          <div className="rounded-xl px-4 py-3 border-l-4" style={{ borderColor: '#2D5A27', backgroundColor: '#fff' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#2D5A27', color: 'white' }}
              >
                EN
              </span>
              <span className="text-gray-400 text-xs">Definition</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{item.definitionEn}</p>
          </div>
        </div>

        {/* Local Analogy */}
        <div
          className="rounded-xl px-4 py-4"
          style={{ backgroundColor: '#FAF0D0', border: '1px solid #D4A017' }}
        >
          <div className="flex items-center gap-2 mb-2">
            {/* Lightbulb over Africa */}
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#D4A017">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
            </svg>
            <p className="font-bold text-sm" style={{ color: '#A07810' }}>
              Mfano wa Kiafrika · Analogie Locale
            </p>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{item.analogy}&rdquo;</p>
          <p className="text-gray-500 text-xs mt-1">{item.analogyEn}</p>
        </div>

        {/* Suggested corrections (for edit mode) */}
        {currentVerdict === 'edit' && (
          <div className="rounded-xl px-4 py-3 border border-gold/50 bg-amber-50">
            <p className="text-sm font-bold text-amber-700 mb-2">Pendekezo la Marekebisho</p>
            <textarea
              className="w-full text-sm text-gray-700 bg-transparent outline-none resize-none"
              rows={3}
              placeholder="Andika marekebisho unayopendekeza... · Suggestions de corrections..."
            />
          </div>
        )}
      </main>

      {/* Verdict buttons — sticky above bottom nav */}
      <div
        className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2 pt-3"
        style={{ backgroundColor: '#FAF7F2', borderTop: '1px solid #e5e7eb' }}
      >
        <div className="max-w-lg mx-auto flex gap-3">
          {/* Flag */}
          <button
            onClick={() => handleVerdict('flag')}
            disabled={currentVerdict !== null}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              currentVerdict === 'flag' ? 'opacity-100 ring-2 ring-terracotta' : 'opacity-80'
            } disabled:cursor-default`}
            style={{ backgroundColor: currentVerdict === 'flag' ? '#C4633A' : '#f3ebe4', color: currentVerdict === 'flag' ? 'white' : '#C4633A' }}
          >
            🚩 Ripoti
          </button>

          {/* Needs Edit */}
          <button
            onClick={() => handleVerdict('edit')}
            disabled={currentVerdict !== null}
            className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all ${
              currentVerdict === 'edit' ? 'ring-2 ring-gold' : ''
            } disabled:cursor-default`}
            style={{
              borderColor: '#D4A017',
              backgroundColor: currentVerdict === 'edit' ? '#D4A017' : 'transparent',
              color: currentVerdict === 'edit' ? '#1A3A16' : '#A07810',
            }}
          >
            ✏️ Hariri
          </button>

          {/* Approve */}
          <button
            onClick={() => handleVerdict('approve')}
            disabled={currentVerdict !== null}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              currentVerdict === 'approve' ? 'ring-2 ring-forest' : ''
            } disabled:cursor-default`}
            style={{
              backgroundColor: currentVerdict === 'approve' ? '#2D5A27' : '#2D5A27',
              color: 'white',
            }}
          >
            ✅ Kubali
          </button>
        </div>
      </div>

      {/* Approve badge animation */}
      {showBadge && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div
            className="px-8 py-6 rounded-2xl flex flex-col items-center gap-2 animate-bounce"
            style={{ backgroundColor: '#2D5A27' }}
          >
            <svg viewBox="0 0 24 24" className="w-12 h-12" fill="#D4A017">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <p className="text-white font-extrabold text-lg">+1 Ukaguzi!</p>
            <p className="text-white/60 text-xs">{validations} / {total} kuelekea Mkuu</p>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
