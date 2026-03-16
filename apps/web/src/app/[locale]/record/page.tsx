'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { BottomNav } from '@/components/BottomNav'
import { WaveformBars } from '@/components/WaveformBars'

const CONCEPTS = [
  {
    term: 'Mvuto wa Uso',
    termEn: 'Surface Tension',
    termFr: 'Tension Superficielle',
    facts: [
      'Maji hushikamana pamoja kwenye uso',
      'Inafanya wadudu wadogo kutembea juu ya maji',
      'Sabuni hupunguza mvuto wa uso',
    ],
  },
  {
    term: 'Kasi ya Mwendo',
    termEn: 'Acceleration',
    termFr: 'Accélération',
    facts: [
      'Mabadiliko ya kasi kwa wakati',
      'Kipimo: m/s²',
      'Nguvu husababisha mwendo wa haraka',
    ],
  },
  {
    term: 'Photosynthèse',
    termEn: 'Photosynthesis',
    termFr: 'Photosynthèse',
    facts: [
      'Mmea unatumia jua kutengeneza chakula',
      'CO₂ + H₂O → sukari + O₂',
      'Klorofili ni rangi inayokamatia mwanga',
    ],
  },
]

type RecordingState = 'idle' | 'recording' | 'locked' | 'done'

export default function RecordPage() {
  const [conceptIdx, setConceptIdx] = useState(0)
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [seconds, setSeconds] = useState(0)
  const [lowData, setLowData] = useState(false)
  const [photoAttached, setPhotoAttached] = useState(false)
  const [showDoneModal, setShowDoneModal] = useState(false)

  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tickTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const concept = CONCEPTS[conceptIdx]

  const startTimer = useCallback(() => {
    tickTimer.current = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    if (tickTimer.current) {
      clearInterval(tickTimer.current)
      tickTimer.current = null
    }
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const handlePressStart = useCallback(() => {
    if (recordingState === 'locked' || recordingState === 'done') return
    setRecordingState('recording')
    setSeconds(0)
    startTimer()
    // Lock after 1s hold
    holdTimer.current = setTimeout(() => {
      setRecordingState('locked')
    }, 1000)
  }, [recordingState, startTimer])

  const handlePressEnd = useCallback(() => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
    if (recordingState === 'recording') {
      stopTimer()
      setRecordingState('idle')
      setSeconds(0)
    }
    // If locked, stay locked until user taps stop
  }, [recordingState, stopTimer])

  const handleStop = useCallback(() => {
    stopTimer()
    setRecordingState('done')
  }, [stopTimer])

  const handleCancel = useCallback(() => {
    stopTimer()
    if (holdTimer.current) clearTimeout(holdTimer.current)
    setRecordingState('idle')
    setSeconds(0)
  }, [stopTimer])

  const handleSubmit = useCallback(() => {
    setShowDoneModal(true)
    setRecordingState('idle')
    setSeconds(0)
    setPhotoAttached(false)
  }, [])

  useEffect(() => {
    return () => {
      stopTimer()
      if (holdTimer.current) clearTimeout(holdTimer.current)
    }
  }, [stopTimer])

  const isRecording = recordingState === 'recording' || recordingState === 'locked'

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Header */}
      <header className="sticky top-0 z-40" style={{ backgroundColor: '#C4633A' }}>
        <div className="max-w-lg mx-auto px-4 pt-4 pb-3 flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold">Rekodi</h1>
            <p className="text-white/70 text-xs">Enregistrer · Record</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Low data toggle */}
            <button
              onClick={() => setLowData((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                lowData
                  ? 'bg-white text-terracotta border-white'
                  : 'border-white/50 text-white'
              }`}
            >
              {/* Turtle / low-data icon */}
              🐢 {lowData ? 'Hifadhi Data' : 'Kawaida'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 pb-28 pt-4 flex flex-col gap-4">
        {/* Concept navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setConceptIdx((i) => Math.max(0, i - 1))}
            disabled={conceptIdx === 0}
            className="p-2 rounded-lg disabled:opacity-30"
            style={{ backgroundColor: '#2D5A27' }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
            </svg>
          </button>
          <div
            className="flex-1 rounded-xl px-4 py-3"
            style={{ backgroundColor: '#2D5A27' }}
          >
            <p className="text-white/60 text-xs mb-0.5">Dhana ya leo · Concept du jour</p>
            <h2 className="text-white text-2xl font-extrabold">{concept.term}</h2>
            <p className="text-white/60 text-sm">
              {concept.termEn} · {concept.termFr}
            </p>
          </div>
          <button
            onClick={() => setConceptIdx((i) => Math.min(CONCEPTS.length - 1, i + 1))}
            disabled={conceptIdx === CONCEPTS.length - 1}
            className="p-2 rounded-lg disabled:opacity-30"
            style={{ backgroundColor: '#2D5A27' }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>

        {/* Key facts card */}
        <div
          className="rounded-xl px-4 py-4"
          style={{ backgroundColor: '#2D5A27' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#D4A017">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
            <p className="text-white font-bold text-sm">Mambo muhimu ya kutaja</p>
          </div>
          <ul className="flex flex-col gap-2">
            {concept.facts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                  style={{ backgroundColor: '#D4A017', color: '#1A3A16' }}
                >
                  {i + 1}
                </span>
                <span className="text-white/80 text-sm">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prompt microcopy */}
        <p className="text-center text-gray-500 text-sm px-4">
          Shika kitufe na uzungumze wazi katika lugha yako ya mtaa
          <br />
          <span className="text-xs text-gray-400">Hold and speak clearly in your local language</span>
        </p>

        {/* Photo attach (hidden in low-data mode) */}
        {!lowData && (
          <div
            className="rounded-xl px-4 py-3 flex items-center gap-3"
            style={{ backgroundColor: photoAttached ? '#1A3A16' : '#f0ebe4' }}
          >
            {photoAttached ? (
              <>
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#2D5A27' }}
                >
                  {/* Chalkboard thumbnail */}
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#D4A017">
                    <path d="M2 6v14h20V6H2zm18 12H4V8h16v10zM4 4h16v-2H4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">ubao_picha.jpg</p>
                  <p className="text-white/60 text-xs">Mchoro wa ubao ulioambatishwa</p>
                </div>
                <button
                  onClick={() => setPhotoAttached(false)}
                  className="text-red-400 text-xs font-semibold"
                >
                  Ondoa
                </button>
              </>
            ) : (
              <>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#2D5A27' }}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#D4A017">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm font-semibold">Ambatisha Mchoro</p>
                  <p className="text-gray-400 text-xs">Picha ya ubao · Photo tableau</p>
                </div>
                <button
                  onClick={() => setPhotoAttached(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                  style={{ backgroundColor: '#C4633A' }}
                >
                  + Ongeza
                </button>
              </>
            )}
          </div>
        )}

        {/* Recording waveform (visible while recording) */}
        {isRecording && (
          <div
            className="rounded-xl px-4 py-4 flex flex-col items-center gap-3"
            style={{ backgroundColor: '#1A3A16' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#D4A017' }} />
              <span className="text-white font-bold text-sm">
                {recordingState === 'locked' ? 'Imefungwa · Verrouillé' : 'Inarekodiwa · En cours'}
              </span>
            </div>
            <WaveformBars playing={true} color="#D4A017" size="lg" count={15} />
            <span className="text-white/80 font-mono text-2xl font-bold">{formatTime(seconds)}</span>
          </div>
        )}

        {/* Done state preview */}
        {recordingState === 'done' && (
          <div
            className="rounded-xl px-4 py-4 flex flex-col gap-3"
            style={{ backgroundColor: '#1A3A16' }}
          >
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#D4A017">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" />
              </svg>
              <span className="text-white font-bold text-sm">Rekodi tayari · Enregistrement prêt</span>
            </div>
            <WaveformBars playing={false} color="rgba(212,160,23,0.5)" size="lg" count={15} />
            <p className="text-white/60 text-xs text-center">{formatTime(seconds)} · {concept.term}</p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 py-2 rounded-xl text-sm font-bold border border-white/30 text-white"
              >
                Futa · Annuler
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2 rounded-xl text-sm font-bold text-forest"
                style={{ backgroundColor: '#D4A017' }}
              >
                Tuma · Soumettre
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Large record button */}
      {recordingState !== 'done' && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center z-40">
          <div className="relative flex items-center justify-center">
            {/* Pulse rings */}
            {isRecording && (
              <>
                <div
                  className="absolute w-28 h-28 rounded-full pulse-ring"
                  style={{ backgroundColor: 'rgba(212,160,23,0.3)' }}
                />
                <div
                  className="absolute w-36 h-36 rounded-full pulse-ring"
                  style={{ backgroundColor: 'rgba(212,160,23,0.15)', animationDelay: '0.5s' }}
                />
              </>
            )}

            {/* Lock button (when locked) */}
            {recordingState === 'locked' && (
              <button
                onClick={handleStop}
                className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#C4633A' }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-terracotta">Simama</span>
              </button>
            )}

            {/* Main hold button */}
            <button
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1 select-none touch-manipulation transition-transform active:scale-95"
              style={{
                backgroundColor: isRecording ? '#A07810' : '#D4A017',
              }}
              aria-label="Shika kurekodi"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
              </svg>
              <span className="text-white text-xs font-bold">
                {isRecording ? formatTime(seconds) : 'Shika'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Cancel button below record btn */}
      {recordingState === 'recording' && (
        <div className="fixed bottom-[72px] right-6 z-40">
          <button
            onClick={handleCancel}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#C4633A' }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      )}

      {/* Done / success modal */}
      {showDoneModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#2D5A27' }}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#D4A017">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-forest mb-1">Imetumwa!</h2>
            <p className="text-gray-500 text-sm mb-1">Enregistrement soumis · Recording submitted</p>
            <p className="text-gray-400 text-xs mb-6">
              Rekodi yako itakaguliwa na wenzako kabla ya kuchapishwa.
            </p>
            <button
              onClick={() => setShowDoneModal(false)}
              className="w-full py-3 rounded-xl font-bold text-white"
              style={{ backgroundColor: '#C4633A' }}
            >
              Sawa · OK
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
