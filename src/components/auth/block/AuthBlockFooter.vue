<template>
  <div class="flex items-center justify-between">
    <SharedDropdownSimple
      :options
      placement="bottom"
      @select-option="onChangeLocale"
    >
      <template #body>
        <span class="text-xs text-custom-gray-900">
          {{ locales.find(locale => locale.code === selectedLocale)?.name }}
        </span>
      </template>
      <template #option="{ item }">
        <span>{{ item.label }}</span>
      </template>
    </SharedDropdownSimple>
    <div class="flex gap-6 text-xs text-custom-gray-900">
      <NuxtLink to="/">
        {{ $t('form.terms') }}
      </NuxtLink>
      <NuxtLink to="/">
        {{ $t('form.privacy') }}
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Locale } from 'vue-i18n'
import type { IOption } from '~/types'
import { useLocale } from '~/composable/useLocale'

const { options, selectedLocale, changeLocale } = useLocale()

const { locales } = useI18n()

const onChangeLocale = (item: IOption | null) => {
  if (!item) {
    return
  }

  changeLocale(item.value as Locale)
}
</script>
