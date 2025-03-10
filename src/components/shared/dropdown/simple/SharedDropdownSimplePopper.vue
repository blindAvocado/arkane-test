<template>
  <div class="min-w-28">
    <ul v-if="options?.length">
      <li
        v-for="(item, index) in options"
        :key="index"
      >
        <button
          type="button"
          class="flex w-full px-4 py-2 hover:bg-custom-gray-400"
          @click="onSelectOption(item)"
        >
          <slot
            name="option"
            :item
          />
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts" generic="TOption">
interface Props {
  options: TOption[]
}

interface Emits {
  (e: 'select-option', value: TOption): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const onSelectOption = (item: TOption) => {
  emit('select-option', item)
}
</script>
