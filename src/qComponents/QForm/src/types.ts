export interface QFormProvider {
  disabled: boolean,
  validate: (passedProps?: string[] | string) => void
  resetFields: (passedProps?: string[] | string) => void
  clearValidate: (passedProps?: string[] | string) => void
  model: any
  fields: {
    [key: string]: [];
  }
  showErrorMessage: boolean
  hideRequiredAsterisk: boolean
}

export interface ValidateFnResult {
  isValid: boolean,
  invalidFields: {
    [key: string]: [];
  }
}