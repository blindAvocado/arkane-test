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

      <SharedInputMaskedPhone
        id="phone"
        v-model="phone"
        :error="phoneError"
        :prefix="country?.dial_code"
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
import type { InputError } from '~/types/error'

interface Emits {
  (e: 'submit'): void
}

const emit = defineEmits<Emits>()

const authStore = useAuthStore()
const { selectedLocale } = useLocale()
const { t } = useI18n()

const { phone, country } = storeToRefs(authStore)
const { query, renderedList } = useCountryCodes()

const phoneError = ref<InputError | null>(null)

const selectedCountryPrefix = computed(() => {
  return country.value?.dial_code ?? '+7'
})

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
  if (phone.value && !phoneError.value) {
    emit('submit')
  }
}

onMounted(() => {
  const found = renderedList.value.find(c => c.value === 'RU')

  if (found) {
    country.value = found
  }
})

watch(phone, (val) => {
  const prefix = selectedCountryPrefix.value

  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`^${escapedPrefix} \\d{10}$`)

  const isValid = pattern.test(val)

  if (isValid) {
    phoneError.value = null
  } else {
    phoneError.value = { message: t('error.invalidFormat') }
  }
})
</script>
