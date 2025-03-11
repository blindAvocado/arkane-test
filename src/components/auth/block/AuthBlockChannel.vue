<template>
  <div>
    <SvgoArrowBack
      class="size-6 text-custom-gray-800"
      :font-controlled="false"
      :filled="false"
    />
    <NuxtImg
      :src="imageUrl"
      width="120"
      height="120"
    />
    <h3 class="text-[32px] font-medium leading-tight text-black">
      {{ name }}
    </h3>
    <p class="text-center text-base leading-tight text-custom-gray-800">
      {{ description }}
    </p>
    <div>
      <SharedButton>
        Авторизоваться в боте
      </SharedButton>
      <SharedButton theme="hollow">
        Проверить статус
      </SharedButton>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  name: string
  description: string
  imageUrl: string
}

defineProps<Props>()
</script>
