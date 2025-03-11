<template>
  <button
    :class="themeClasses"
    class="flex h-[55px] items-center justify-center rounded-[4px] bg-custom-blue px-4 font-medium"
  >
    <SvgoLoader
      v-if="loading"
      class="size-6 animate-spin"
      :font-controlled="false"
      :filled="false"
    />
    <slot v-else />
  </button>
</template>
<script setup lang="ts">
interface Props {
  theme?: 'filled' | 'hollow'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(
  defineProps<Props>(),
  {
    theme: 'filled'
  }
)

const themeClasses = computed(() => {
  const commonClasses = 'flex gap-2.5 h-[55px] items-center justify-center rounded-[4px] px-4'

  switch (props.theme) {
    case 'filled':
      return `${commonClasses} bg-custom-blue text-white`
    case 'hollow':
      return `${commonClasses} bg-white text-custom-blue`
  }
})
</script>
