import { createI18n } from 'vue-i18n'
import ru from '~/locales/ru.json'
import en from '~/locales/en.json'

export default createI18n({
  locale: 'ru',
  defaultLocale: 'ru',
  messages: {
    en,
    ru
  }
})
