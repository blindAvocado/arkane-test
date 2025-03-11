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
      :auto-hide="false"
      :shown="isShown"
      theme="shared-dropdown"
    >
      <button
        class="flex items-center gap-2"
        @click="onBaseClick"
      >
        <slot name="body" />
        <MenuDown
          :size="24"
          fill-color="#9E9E9E"
        />
      </button>
      <template #popper>
        <ClientOnly>
          <SharedDropdownSimplePopper
            :options
            @select-option="onSelectOption"
          >
            <template #option="{ item }">
              <slot
                name="option"
                :item
              />
            </template>
          </SharedDropdownSimplePopper>
        </ClientOnly>
      </template>
    </VDropdown>
  </div>
</template>
<script setup lang="ts" generic="TOption">
import MenuDown from 'vue-material-design-icons/MenuDown.vue'
import type { DropdownPlacement } from '~/types/dropdown'

interface Props {
  options: TOption[]
  id?: string
  disabled?: boolean
  placement?: DropdownPlacement
  distance?: number
}

interface Emits {
  (e: 'select-option', value: TOption | null): void
  (e: 'blur'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedOption = defineModel<TOption | null>({
  default: null
})

const popperWrapperRef = ref<HTMLDivElement>()
const isShown = ref<boolean>(false)

const onBaseClick = () => {
  if (props.disabled) {
    return
  }

  setIsShown(true)
}

const setIsShown = (arg: boolean) => {
  if (!arg) {
    emit('blur')

    // Раскомментировать, когда нужно временно не закрывать Popper для отладки
    // return
  }

  isShown.value = arg
}

const onSelectOption = (item: TOption) => {
  selectedOption.value = item
  emit('select-option', item)
}
</script>
