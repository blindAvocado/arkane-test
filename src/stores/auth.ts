import type { IDialCountry } from '~/composable/useCountryCodes'
import type { TChannelType } from '~/types/api'

interface AuthState {
  steps: {
    name: string
  }[]
  activeStepIndex: number
  country: IDialCountry | null
  phone: string
  channelType: TChannelType
  code: string
}

function createInitialState(): AuthState {
  return {
    steps: [
      { name: 'phone' },
      { name: 'code' },
      { name: 'telegram' }
    ],
    activeStepIndex: 0,
    country: null,
    phone: '',
    channelType: 'whatsapp',
    code: ''
  }
}

export const useAuthStore = defineStore('authStore', () => {
  const state = reactive(createInitialState())

  const $reset = () => {
    Object.assign(state, createInitialState())
  }

  return {
    ...toRefs(state),
    $reset
  }
})
