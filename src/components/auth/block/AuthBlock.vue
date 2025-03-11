<template>
  <AuthBlockWrapper>
    <AuthBlockContent>
      <template #title>
        <template v-if="activeStep === 'phone'">
          {{ $t('form.enterPhone') }}
        </template>
        <template v-else-if="activeStep === 'code'">
          {{ $t('form.enterCode') }}
        </template>
      </template>

      <template #subtitle>
        <template v-if="activeStep === 'phone'">
          {{ $t('form.toLoginOrRegister') }}
        </template>
        <template v-else-if="activeStep === 'code'">
          {{ $t('form.sentToNumber') }}
        </template>
      </template>

      <template #form>
        <KeepAlive>
          <AuthBlockFormPhone
            v-if="activeStep === 'phone'"
            @next="onNext"
          />
          <AuthBlockFormCode
            v-else-if="activeStep === 'code'"
            @next="onNext"
            @prev="onPrev"
          />
        </KeepAlive>
      </template>
    </AuthBlockContent>
  </AuthBlockWrapper>
</template>
<script setup lang="ts">
const authStore = useAuthStore()

const { steps, activeStepIndex } = storeToRefs(authStore)

const activeStep = computed(() => {
  return steps.value[activeStepIndex.value]?.name
})

const onNext = () => {
  activeStepIndex.value++
}

const onPrev = () => {
  activeStepIndex.value--
}
</script>
