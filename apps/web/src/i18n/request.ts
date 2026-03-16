import { getRequestConfig } from 'next-intl/server'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !SUPPORTED_LOCALES.includes(locale as Locale)) {
    locale = DEFAULT_LOCALE
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
