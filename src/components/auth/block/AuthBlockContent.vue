<template>
  <div class="mx-auto mb-[30px] mt-[26px] flex h-10 max-w-[299px] items-center justify-center bg-custom-gray-400">
    <span class="text-custom-gray-700">Логотип (Высота 40px, длина до 300px)</span>
  </div>

  <div class="mb-[30px] flex flex-col gap-3.5 text-center leading-none">
    <h3 class="text-[32px] font-medium text-black">
      <slot name="title">
        {{ $t('form.enterPhone') }}
      </slot>
    </h3>
    <h6 class="text-base text-custom-gray-900">
      <slot name="subtitle">
        {{ $t('form.toLoginOrRegister') }}
      </slot>
    </h6>
  </div>

  <slot name="form" />

  <AuthBlockFooter class="mt-[70px]" />
</template>
<script setup lang="ts">
</script>
