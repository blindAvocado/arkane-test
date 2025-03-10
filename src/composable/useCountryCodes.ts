import codes from '~/assets/data/country_dial_info.json'

interface IDialCountry {
  name: string
  flag: string
  code: string
  dial_code: string
}

export const useCountryCodes = () => {
  const list = ref<IDialCountry[]>(codes)
  const query = ref<string>('')

  const renderedList = computed(() => {
    return list.value
  })

  return {
    query,
    renderedList
  }
}
