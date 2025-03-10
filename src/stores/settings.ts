export const useSettingsStore = defineStore('settingsStore', () => {
  const { locale } = useI18n()

  const selectedLocale = computed(() => locale.value)

  return {
    selectedLocale
  }
})
