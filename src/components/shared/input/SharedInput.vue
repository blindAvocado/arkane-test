<template>
  <SharedInputContainer>
    <input type="text" />
  </SharedInputContainer>
</template>
<script setup lang="ts">
import type { InputError } from '~/types/error'

interface Props {
  id?: string
  modelValue?: string | number
  type?: string
  placeholder?: string
  label?: string
  initialFocus?: boolean
  error?: InputError
  disabled?: boolean
}

defineProps<Props>()
</script>
