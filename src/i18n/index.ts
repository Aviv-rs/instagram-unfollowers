import { createI18n } from 'vue-i18n'
import { messages } from './messages'

// Log messages for debugging
console.log('Available messages:', messages)

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
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

export default i18n 