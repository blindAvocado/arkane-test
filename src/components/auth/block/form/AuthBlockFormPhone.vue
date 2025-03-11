<template>
  <form class="flex flex-col">
    <div class="flex flex-col gap-10">
      <SharedDropdownField
        id="country_dropdown"
        v-model:query="query"
        :options="renderedList"
        :label="$t('form.country')"
        search-mode
        @select-option="onSelectCountry"
        @clear="query = ''"
      >
        <span class="absolute left-4 top-4 text-base text-black">
          {{ selectedCountryName }}
        </span>
        <template #option="{ item }">
          <div class="flex w-full items-center gap-2.5">
            <span>
              <CountryFlag
                :country="item.value"
              />
            </span>
            <span class="text-left">
              {{ getCountryItemName(item) }}
            </span>
            <span class="ml-auto font-bold">
              {{ item.dial_code }}
            </span>
          </div>
        </template>
      </SharedDropdownField>

      <SharedInput
        id="phone"
        v-model="phone"
        :label="$t('form.phoneNumber')"
      />
    </div>
    <SharedButton
      class="mt-[50px]"
      @click.prevent="submitPhone"
    >
      {{ $t('action.continue') }}
    </SharedButton>
  </form>
</template>
<script setup lang="ts">
import CountryFlag from 'vue-country-flag-next'
import { useCountryCodes, type IDialCountry } from '~/composable/useCountryCodes'
import { useLocale } from '~/composable/useLocale'

interface Emits {
  (e: 'submit'): void
}

const emit = defineEmits<Emits>()

const authStore = useAuthStore()
const { selectedLocale } = useLocale()

const { phone, country } = storeToRefs(authStore)
const { query, renderedList } = useCountryCodes()

const selectedCountryName = computed(() => {
  if (selectedLocale.value === 'en') {
    return country.value?.name.en
  }

  if (selectedLocale.value === 'ru') {
    return country.value?.name.ru ?? country.value?.name.en
  }
})

const onSelectCountry = (dialCountry: IDialCountry | null) => {
  country.value = dialCountry
}

const getCountryItemName = (item: IDialCountry) => {
  if (selectedLocale.value === 'en') {
    return item.name.en
  }

  if (selectedLocale.value === 'ru') {
    let str = item.name.en + ' '

    if (item.name.ru) {
      str += `(${item.name.ru})`
    }

    return str
  }
}

const submitPhone = () => {
  emit('submit')
}

onMounted(() => {
  const found = renderedList.value.find(c => c.value === 'RU')

  if (found) {
    country.value = found
  }
})
</script>
