<template>
  <SharedInputContainer
    :error
  >
    <input
      :id
      v-model="value"
      v-bind="$attrs"
      :placeholder
      :class="twMerge(
        `peer block w-full cursor-text appearance-none rounded-[4px]
        border border-custom-gray-500 p-4 text-base text-black`,
        inputClasses,
        error && 'border-custom-red'
      )"
      type="text"
      @blur="$emit('update:blur')"
    />
    <slot />
    <label
      v-if="label"
      :for="id"
      class="-z-1 pointer-events-none absolute left-0 top-0 origin-[0] -translate-y-3 translate-x-[18px]
        scale-[0.8] bg-white px-1 text-left
        text-base leading-snug text-custom-gray-800 transition
        peer-placeholder-shown:translate-x-3 peer-placeholder-shown:translate-y-4
        peer-placeholder-shown:scale-100
        peer-focus:-translate-y-3 peer-focus:translate-x-[18px] peer-focus:scale-[0.8]
        peer-focus:px-1"
      :class="{
        'text-custom-red': error
      }"
    >
      {{ label }}
    </label>
  </SharedInputContainer>
</template>
<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { InputError } from '~/types/error'

interface Props {
  id: string
  type?: string
  placeholder?: string
  label?: string
  error?: InputError
  disabled?: boolean
  inputClasses?: string
}

interface Emits {
  (e: 'update:blur'): unknown
}

withDefaults(
  defineProps<Props>(), {
    labelShouldFloat: true,
    placeholder: ' '
  }
)
defineEmits<Emits>()

const value = defineModel<string>({
  default: ''
})
</script>
