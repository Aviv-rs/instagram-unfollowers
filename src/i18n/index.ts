import { createI18n } from 'vue-i18n'
import { messages } from './messages'

// Get saved language preference or default to 'en'
const savedLocale = localStorage.getItem('language') || 'he'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'he',
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  globalInjection: true,
  runtimeOnly: false,
  missing: (locale: string, key: string) => {
    console.warn(`Missing translation: ${key} for locale: ${locale}`)
    return key
  }
})

// Set initial document language and direction
document.documentElement.lang = savedLocale
document.documentElement.dir = savedLocale === 'he' ? 'rtl' : 'ltr'

export default i18n 
