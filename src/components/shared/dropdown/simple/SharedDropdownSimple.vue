<template>
  <div
    ref="popperWrapperRef"
    class="relative"
  >
    <VDropdown
      :distance
      :placement
      :container="popperWrapperRef"
      :no-auto-focus="true"
      :triggers="[]"
      :auto-hide="() => setIsShown(false)"
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

const popperWrapperRef = ref<HTMLDivElement>()
const isShown = ref<boolean>(false)

const selectedOption = defineModel<TOption | null>({
  default: null
})

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
