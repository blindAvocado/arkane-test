<template>
  <div
    ref="popperWrapperRef"
    class="relative"
  >
    <VDropdown
      :id
      :aria-id="id"
      :distance
      :placement
      :container="popperWrapperRef"
      :no-auto-focus="true"
      :triggers="[]"
      :auto-hide="onBlur"
      :shown="isShown"
      theme="shared-dropdown"
      popper-class="w-full"
    >
      <button
        class="block h-[55px] w-full cursor-pointer rounded-[4px]
        border border-custom-gray-500 p-4 text-base text-black"
        type="button"
        @click.prevent="onBaseClick"
      >
        <slot />
        <div
          class="-z-1 pointer-events-none absolute left-[18px] top-0 -translate-y-2 bg-white px-1
        text-xs leading-tight text-custom-gray-800 transition"
        >
          {{ label }}
        </div>
        <SvgoChevronDown
          class="absolute right-4 top-1/2 size-6 -translate-y-1/2 text-custom-gray-800"
          :font-controlled="false"
          :filled="false"
        />
      </button>
      <template #popper>
        <ClientOnly>
          <SharedDropdownFieldPopper
            v-model="query"
            :search-mode
            :options
            @select-option="onSelectOption"
            @focus="setIsShown(true)"
            @clear="emit('clear')"
          >
            <template #option="{ item }">
              <slot
                name="option"
                :item
              />
            </template>
          </SharedDropdownFieldPopper>
        </ClientOnly>
      </template>
    </VDropdown>
  </div>
</template>
<script setup lang="ts" generic="TOption">
import { SvgoChevronDown } from '#components'
import type { DropdownPlacement } from '~/types/dropdown'

interface Props {
  options: TOption[]
  id?: string
  label?: string
  disabled?: boolean
  placement?: DropdownPlacement
  distance?: number
  searchMode?: boolean
}

interface Emits {
  (e: 'select-option', value: TOption | null): void
  (e: 'blur'): void
  (e: 'clear'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedOption = defineModel<TOption | null>('selectedOption', {
  default: null
})

const query = defineModel<string>('query', {
  default: ''
})

const popperWrapperRef = ref<HTMLDivElement>()
const isShown = ref<boolean>(false)

const setIsShown = (arg: boolean) => {
  if (!arg) {
    emit('blur')

    // Раскомментировать, когда нужно временно не закрывать Popper для отладки
    // return
  }

  isShown.value = arg
}

const onBaseClick = () => {
  if (props.disabled) {
    return
  }

  setIsShown(true)
}

const onSelectOption = (item: TOption) => {
  selectedOption.value = item
  emit('select-option', item)
  setIsShown(false)
}

const onBlur = (e: MouseEvent) => {
  if (popperWrapperRef.value && !popperWrapperRef.value.contains(e.target as Node)) {
    setIsShown(false)
  }
}
</script>
