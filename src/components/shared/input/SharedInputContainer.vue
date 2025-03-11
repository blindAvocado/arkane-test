<template>
  <div class="relative">
    <slot />
    <div
      v-if="error && typeof error === 'object'"
      class="ml-4 mt-1 text-xs leading-tight text-custom-red"
    >
      {{ error.message }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { InputError } from '~/types/error'

interface Props {
  error?: InputError
}

defineProps<Props>()
</script>
