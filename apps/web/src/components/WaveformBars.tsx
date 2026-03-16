'use client'

interface WaveformBarsProps {
  playing: boolean
  color?: string
  size?: 'sm' | 'lg'
  count?: number
}

export function WaveformBars({
  playing,
  color = '#D4A017',
  size = 'sm',
  count = 12,
}: WaveformBarsProps) {
  const barClass = size === 'lg' ? 'waveform-bar-tall' : 'waveform-bar'
  const barWidth = size === 'lg' ? 'w-2' : 'w-1'
  const staticHeight = size === 'lg' ? 'h-2' : 'h-1'

  return (
    <div className="flex items-center gap-0.5" style={{ height: size === 'lg' ? 36 : 24 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${barWidth} ${playing ? barClass : staticHeight} rounded-sm`}
          style={{
            backgroundColor: color,
            height: playing ? undefined : size === 'lg' ? 6 : 4,
            animationPlayState: playing ? 'running' : 'paused',
          }}
        />
      ))}
    </div>
  )
}
