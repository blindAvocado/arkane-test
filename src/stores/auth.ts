import { FetchError } from 'ofetch'
import * as API from '~/api/oauth'
import { useLocale } from '~/composable/useLocale'
import type { IDialCountry } from '~/composable/useCountryCodes'
import type { IClientChannel, TChannelType } from '~/types/api'
import type { InputError } from '~/types/error'

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
  code: string

  channels: Array<IClientChannel>

  channelInfo: IClientChannel | null
  isAuthCheckLoading: boolean
  authCheckError: InputError | null

  session: string
  delay: number
  codeError: InputError | null
}

function createInitialState(): AuthState {
  return {
    steps: [
      { name: 'phone' },
      { name: 'code' },
      { name: 'info' }
    ],
    activeStepIndex: 0,
    country: null,
    phone: '',
    channelType: null,
    code: '',

    channels: [],

    channelInfo: null,
    isAuthCheckLoading: false,
    authCheckError: null,

    session: '',
    delay: 30,
    codeError: null
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

  const checkIsChannelActive = (type: TChannelType) => {
    const channel = state.channels.find(c => c.type === type)

    if (channel) {
      state.channelInfo = channel

      return channel.is_active
    }

    return true
  }

  const createSession = async () => {
    try {
      const resp = await API.createSession({
        phone: convertToNumeric(state.phone),
        lang: _formatLang(selectedLocale.value)
      })

      state.session = resp.data.session_id
      state.channels = resp.data.client_channels
    } catch {}
  }

  const sendCode = async () => {
    try {
      const resp = await API.sendCode({
        session_id: state.session,
        type: state.channelType?.value,
        lang: _formatLang(selectedLocale.value)
      })
      state.delay = resp.data?.client_channel?.timeout
      state.codeError = null
    } catch (e) {
      if (e instanceof FetchError) {
        state.codeError = { message: e.data?.error }
        state.delay = e.data?.error_params?.timeout ?? 30
      }
    }
  }

  const checkCode = async () => {
    try {
      const resp = await API.checkCode({
        session_id: state.session,
        code: state.code,
        lang: _formatLang(selectedLocale.value)
      })

      state.codeError = null
      state.code = ''

      console.log('Verify token:', resp.data.verify_token)
    } catch (e) {
      if (e instanceof FetchError) {
        state.codeError = { message: e.data?.error }
      }
    }
  }

  const $reset = () => {
    Object.assign(state, createInitialState())
  }

  return {
    ...toRefs(state),
    createSession,
    sendCode,
    checkCode,
    checkIsChannelActive,
    $reset
  }
})
