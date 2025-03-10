import en from './src/locales/en.json'
import ru from './src/locales/ru.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  defaultLocale: 'ru',
  messages: {
    en,
    ru
  }
}))
