<template>
  <form class="flex flex-col">
    <div class="flex flex-col gap-10">
      <SharedDropdownField
        id="country_dropdown"
        :options="socialItems"
        :label="$t('form.codeMethod')"
        @select-option="onSelectSocial"
      >
        <span class="absolute left-4 top-4 text-base text-black">
          {{ channelType?.label }}
        </span>
        <template #option="{ item }">
          <span class="flex w-full items-center gap-2.5">
            <component
              :is="item.icon"
              class="size-6 rounded-[7px]"
              :font-controlled="false"
              :filled="true"
            />
            <span class="text-base leading-none text-black">
              {{ item.label }}
            </span>
          </span>
        </template>
      </SharedDropdownField>

      <SharedInput
        id="code"
        v-model="code"
        :label="$t('form.enterCode')"
      >
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium leading-tight text-custom-blue">
          <button
            type="button"
            @click.prevent="onSend"
          >
            {{ $t('action.send') }}
          </button>
        </span>
      </SharedInput>
    </div>
    <div class="mt-[50px] flex w-full items-center justify-stretch gap-2.5">
      <SharedButton
        class="w-full"
        theme="hollow"
        @click.prevent="emit('prev')"
      >
        <SvgoArrowBack
          class="size-4"
          :font-controlled="false"
        />
        {{ $t('action.back') }}
      </SharedButton>
      <SharedButton
        class="w-full"
        @click.prevent="emit('submit')"
      >
        {{ $t('action.continue') }}
      </SharedButton>
    </div>
  </form>
</template>
<script setup lang="ts">
import { SvgoSocialWhatsapp, SvgoSocialSms, SvgoSocialTelegram, SvgoSocialViber } from '#components'
import type { ISocialItem } from '~/stores/auth'

interface Emits {
  (e: 'prev'): void
  (e: 'submit'): void
}

const emit = defineEmits<Emits>()

const authStore = useAuthStore()

const { channelType, code } = storeToRefs(authStore)

const socialItems = ref<ISocialItem[]>([
  {
    label: 'WhatsApp',
    value: 'whatsapp',
    icon: SvgoSocialWhatsapp
  },
  {
    label: 'Telegram',
    value: 'telegram',
    icon: SvgoSocialTelegram
  },
  {
    label: 'Viber',
    value: 'viber',
    icon: SvgoSocialViber
  },
  {
    label: 'SMS',
    value: 'sms',
    icon: SvgoSocialSms
  }
])

const onSelectSocial = (item: ISocialItem | null) => {
  if (item) {
    channelType.value = item
  }
}

const onSend = () => {

}

onMounted(() => {
  channelType.value = socialItems.value[0]
})
</script>
