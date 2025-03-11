import { ofetch } from 'ofetch'
import type { ICheckInParams, ICheckOut, ICreateInParams, ICreateOut, ISendInParams, ISendOut } from '../types/api'

const baseURL = '/api/kod-mobi'

const localFetch = ofetch.create({
  baseURL
})

/** Создание сессии */
export const createSession = (params: ICreateInParams) => {
  const url = '/message/create'

  return localFetch<ICreateOut>(url, {
    method: 'GET',
    params
  })
}

/** Отправить код в канал */
export const sendCode = (params: ISendInParams) => {
  const url = '/message/send'

  return localFetch<ISendOut>(url, {
    method: 'GET',
    params
  })
}

/** Проверить код и создать верификационный токен */
export const checkCode = (params: ICheckInParams) => {
  const url = '/message/check'

  return localFetch<ICheckOut>(url, {
    method: 'GET',
    params
  })
}
