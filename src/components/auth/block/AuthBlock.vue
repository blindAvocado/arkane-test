<template>
  <AuthBlockWrapper>
    <AuthBlockChannel
      v-if="channelInfo && activeStep === 'info'"
      :data="channelInfo"
      :error="authCheckError"
      :is-check-loading="isAuthCheckLoading"
      @prev="onPrev"
      @auth="onChannelAuth"
      @check-status="onCheckAuthStatus"
    />
    <AuthBlockContent v-else>
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
            @submit="onSubmitPhone"
          />
          <AuthBlockFormCode
            v-else-if="activeStep === 'code'"
            :remaining-time
            @send="onSendCode"
            @submit="onSubmitCode"
            @prev="onPrev"
          />
        </KeepAlive>
      </template>
    </AuthBlockContent>
  </AuthBlockWrapper>
</template>
<script setup lang="ts">
import { useCountdown } from '~/composable/useCountdown'

const authStore = useAuthStore()

const {
  steps,
  activeStepIndex,
  delay,
  channelType,
  channelInfo,
  isAuthCheckLoading,
  authCheckError
} = storeToRefs(authStore)
const { remainingTime, startCountdown } = useCountdown(delay)

const activeStep = computed(() => {
  return steps.value[activeStepIndex.value]?.name
})

const onNext = () => {
  activeStepIndex.value++
}

const onPrev = () => {
  activeStepIndex.value--
}

const onSubmitPhone = async () => {
  try {
    await authStore.createSession()
    onNext()
  } catch {}
}

const onSendCode = async () => {
  if (!channelType.value) {
    return
  }

  const isActive = authStore.checkIsChannelActive(channelType.value.value)

  if (!isActive) {
    activeStepIndex.value = 2

    return
  }

  try {
    await authStore.sendCode()
    startCountdown()
  } catch {}
}

const onSubmitCode = async () => {
  try {
    await authStore.checkCode()
  } catch {}
}

const onChannelAuth = () => {
  console.log('Тут будет авторизация')
}

const onCheckAuthStatus = async () => {
  isAuthCheckLoading.value = true

  try {
    await new Promise((resolve, reject) => setTimeout(reject, 1000))
    authCheckError.value = null
  } catch {
    authCheckError.value = { message: 'Вы все еще не авторизованы в боте, пожалуйста, повторите попытку' }
  } finally {
    isAuthCheckLoading.value = false
  }
}
</script>
