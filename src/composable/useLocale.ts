import type { Locale } from 'vue-i18n'
import type { IOption } from '~/types'

export const useLocale = () => {
  const { locales, setLocale } = useI18n()
  const settingsStore = useSettingsStore()

  const { selectedLocale } = storeToRefs(settingsStore)

  const options = computed((): IOption[] => {
    return locales.value.map(locale => ({
      label: locale.name ?? locale.code,
      value: locale.code
    }))
  })

  const changeLocale = (locale: Locale) => {
    setLocale(locale)
  }

  return {
    options,
    selectedLocale,

    changeLocale
  }
}
