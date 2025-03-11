<template>
  <div class="relative flex flex-col items-center text-center">
    <button
      type="button"
      @click="emit('prev')"
    >
      <SvgoArrowBack
        class="absolute left-0 top-0 size-6 text-custom-gray-800"
        :font-controlled="false"
        :filled="false"
      />
    </button>
    <NuxtImg
      v-if="data.image_url"
      :src="data.image_url"
      width="120"
      height="120"
      class="mb-[30px] mt-[26px] block"
    />
    <div class="flex flex-col gap-[30px]">
      <h3 class="text-[32px] font-medium leading-tight text-black">
        {{ data.name }}
      </h3>
      <p
        class="text-center text-base leading-[1.15] text-custom-gray-600"
        :class="{
          'text-custom-red': error
        }"
      >
        {{ (typeof error === 'object' && error?.message) || data.description }}
      </p>
    </div>
    <div class="mb-[76px] mt-[70px] flex w-full flex-col items-center gap-2.5">
      <SharedButton
        class="w-full"
        @click="emit('auth')"
      >
        {{ $t('channel.loginWithBot') }}
      </SharedButton>
      <SharedButton
        class="w-full"
        theme="hollow"
        :loading="isCheckLoading"
        @click="emit('check-status')"
      >
        <span>
          {{ $t('channel.checkStatus') }}
        </span>
      </SharedButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IClientChannel } from '~/types/api'
import type { InputError } from '~/types/error'

interface Props {
  data: IClientChannel
  isCheckLoading?: boolean
  error?: InputError
}

interface Emits {
  (e: 'prev'): void
  (e: 'auth'): void
  (e: 'check-status'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
