import dialCountries from '~/assets/data/country_dial_info.json'
import ruCountries from '~/assets/data/ru-countries.json'

export interface IDialCountry {
  name: {
    en: string
    ru?: string
  }
  flag: string
  value: string
  dial_code: string
}

export const useCountryCodes = () => {
  const popularCodes = ['KZ', 'KG', 'RU', 'UZ', 'US']

  const list = ref<IDialCountry[]>(
    dialCountries.map(c => ({
      flag: c.flag,
      value: c.code,
      dial_code: c.dial_code,
      name: {
        en: c.name,
        ru: ruCountries.find(r => r.value === c.code)?.text
      }
    }))
  )
  const query = ref<string>('')

  const renderedList = computed((): IDialCountry[] => {
    if (query.value) {
      const queryLower = query.value.toLowerCase()

      return list.value.filter(country => (
        country.name.en.toLowerCase().startsWith(queryLower) || country.name.ru?.toLowerCase()?.startsWith(queryLower)
      ))
    }

    return [
      ...list.value.filter(c => popularCodes.includes(c.value)),
      ...list.value.filter(c => !popularCodes.includes(c.value))
    ]
  })

  return {
    query,
    renderedList
  }
}
