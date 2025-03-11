import * as API from '~/api/oauth'
import type { IDialCountry } from '~/composable/useCountryCodes'
import { useLocale } from '~/composable/useLocale'
import type { TChannelType } from '~/types/api'

export interface ISocialItem {
  label: string
  value: TChannelType
  icon: string
}

interface AuthState {
  steps: {
    name: string
  }[]
  activeStepIndex: number
  country: IDialCountry | null
  phone: string
  channelType: ISocialItem | null
  code: string,

  session: string
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
    channelType: null,
    code: '',

    session: ''
  }
}

export const useAuthStore = defineStore('authStore', () => {
  const state = reactive(createInitialState())

  const { selectedLocale } = useLocale()

  const _formatLang = (locale: 'ru' | 'en') => {
    switch (locale) {
      case 'en':
        return 'eng'
      default:
        return locale
    }
  }

  const createSession = () => {
    try {
      API.createSession({
        phone: state.phone,
        lang: _formatLang(selectedLocale.value)
      })
    } catch {}
  }

  const sendCode = () => {
    try {
      API.sendCode({
        session_id: state.session,
        type: state.channelType?.value,
        lang: _formatLang(selectedLocale.value)
      })
    } catch {}
  }

  const checkCode = () => {
    try {
      API.checkCode({
        session_id: state.session,
        code: state.code,
        lang: _formatLang(selectedLocale.value)
      })
    } catch {}
  }

  const $reset = () => {
    Object.assign(state, createInitialState())
  }

  return {
    ...toRefs(state),
    createSession,
    sendCode,
    checkCode,
    $reset
  }
})
