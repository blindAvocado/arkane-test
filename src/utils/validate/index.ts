import type { BaseValidation } from '@vuelidate/core'

export const getErrorMessage = (field: BaseValidation) => {
  const message = field.$errors?.[0]?.$message

  return (message && field.$dirty) ? { message } : null
}
