type TChannelType = 'telegram' | 'sms' | 'whatsapp'

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

export interface ICreateInParams {
  phone: string
}

export interface ICheckOut extends IResponseOut {
  data: {
    verify_token: string
  }
}