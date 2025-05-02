import { createI18n } from 'vue-i18n'
import { messages } from './messages'

const i18n = createI18n({
  legacy: false, // Set to false to use Composition API
  locale: 'en', // Set default locale
  fallbackLocale: 'en', // Set fallback locale
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false,
  globalInjection: true,
  runtimeOnly: false
})

export default i18n 