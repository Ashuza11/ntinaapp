export const SUPPORTED_LOCALES = ['sw', 'rw', 'fr', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'sw'

export const LOCALE_LABELS: Record<Locale, { label: string; nativeLabel: string }> = {
  sw: { label: 'Swahili', nativeLabel: 'Kiswahili' },
  rw: { label: 'Kinyarwanda', nativeLabel: 'Ikinyarwanda' },
  fr: { label: 'French', nativeLabel: 'Français' },
  en: { label: 'English', nativeLabel: 'English' },
}
