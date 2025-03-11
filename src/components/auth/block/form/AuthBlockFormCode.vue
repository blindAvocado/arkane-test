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
          <!-- {{ selectedCountryName }} -->
        </span>
        <!-- <template #option="{ item }">
          <span class="flex w-full items-center gap-2.5">
          </span>
        </template> -->
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
        @click.prevent="emit('next')"
      >
        {{ $t('action.continue') }}
      </SharedButton>
    </div>
  </form>
</template>
<script setup lang="ts">
interface Emits {
  (e: 'prev'): void
  (e: 'next'): void
}

const emit = defineEmits<Emits>()

const authStore = useAuthStore()

const { channelType, code } = storeToRefs(authStore)

const socialItems = ref([])

const onSelectSocial = () => {}

const onSend = () => {

}
</script>
