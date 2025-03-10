<template>
  <button
    :class="themeClasses"
    class="flex h-[55px] items-center justify-center rounded-[4px] bg-custom-blue px-4"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
interface Props {
  theme?: 'filled' | 'hollow'
  disabled?: boolean
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
