import {
  helpers,
  required
} from '@vuelidate/validators'

const { t } = i18n.global

export const getRuleRequired = () => helpers.withMessage(t('error.required'), required)

export const getRulePhoneFormat = (prefix: string) => {
  return helpers.withMessage(t('error.invalidFormat'), (v: string) => {
    const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`^${escapedPrefix} \\d{10}$`)

    console.log('🚀 ~ returnhelpers.withMessage ~ pattern:', pattern)
    console.log(v)

    return pattern.test(v)
  })
}
