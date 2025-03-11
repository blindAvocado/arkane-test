<template>
  <div class="max-h-[250px]">
    <div
      v-if="searchMode"
      class="p-4"
    >
      <SharedInput
        id="country_search"
        v-model="query"
        :placeholder="$t('form.search')"
        input-classes="rounded-lg bg-custom-gray-400 border-none p-2.5 pl-8 text-sm"
        @focus="emit('focus')"
      >
        <SvgoSearch
          class="absolute left-2.5 top-1/2 size-5 -translate-y-1/2"
          :font-controlled="false"
          :filled="true"
        />
        <button
          type="button"
          class="absolute right-0.5 top-1/2 -translate-y-1/2 p-2"
          @click.prevent="emit('clear')"
        >
          <SvgoClear
            class="size-3.5"
            :font-controlled="false"
            :filled="true"
          />
        </button>
      </SharedInput>
    </div>
    <ul v-if="options.length">
      <li
        v-for="(item, index) in options"
        :key="index"
      >
        <button
          type="button"
          class="flex h-12 w-full px-4 py-2 hover:bg-custom-gray-400"
          @click="onSelectOption(item)"
        >
          <slot
            name="option"
            :item
          />
        </button>
      </li>
    </ul>
    <div
      v-else-if="searchMode"
      class="mx-auto py-3.5 text-center text-base text-custom-gray-800"
    >
      {{ $t('nothingFound') }}
    </div>
  </div>
</template>
<script setup lang="ts" generic="TOption">
import { SvgoClear, SvgoSearch } from '#components'

interface Props {
  options: TOption[]
  searchMode?: boolean
}

interface Emits {
  (e: 'select-option', value: TOption): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'clear'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const query = defineModel<string>({
  default: ''
})

const onSelectOption = (item: TOption) => {
  emit('select-option', item)
}
</script>
