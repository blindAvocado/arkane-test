<template>
  <SharedInput
    :id
    v-model="phone"
    v-maska
    :error
    :label
    :data-maska
    type="text"
  />
</template>
<script setup lang="ts">
import type { InputError } from '~/types/error'

interface Props {
  id: string
  prefix?: string
  error?: InputError
  label?: string
}

const props = defineProps<Props>()

const phone = defineModel<string>({
  default: ''
})

const dataMaska = computed(() => {
  return `${props.prefix} ##########`
})
</script>
