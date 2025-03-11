export type TChannelType = 'telegram' | 'sms' | 'whatsapp' | 'viber'

type TLang = 'ru' | 'eng'

interface IParams {
  lang?: TLang
}

interface IResponseOut {
  success: boolean
  error?: Array<string>
  status?: number
}

interface IClientChannel {
  name: string
  type: TChannelType
  is_active: boolean
  timeout: number
  description: string
  image_url: string
  link: string
  sorting: number
}

export interface ICreateOut extends IResponseOut {
  data: {
    session_id: string
    sent_to: 'telegram' | 'sms' | 'whatsapp'
    client_channels: Array<IClientChannel>
  }
}

export interface ISendOut extends IResponseOut {
  data: {
    session_id: string
    client_channels: Array<IClientChannel>
  }
}

export interface ICheckOut extends IResponseOut {
  data: {
    verify_token: string
  }
}

export interface ICreateInParams extends IParams {
  phone: string
}

export interface ISendInParams extends IParams {
  session_id: string
  type?: TChannelType
}

export interface ICheckInParams extends IParams {
  session_id: string
  code: string
}
