import { ofetch } from 'ofetch'
import type { ICreateInParams, ICreateOut } from "../types/api"

const baseURL = '/api/kod-mobi'

const localFetch = ofetch.create({
  baseURL
})

/** Создание сессии */
export const createSession = (params: ICreateInParams) => {
  const url = `/message/create`

  return localFetch<ICreateOut>(url, {
    method: 'GET',
    params
  })
}

export const sendCode = () => {
  
}