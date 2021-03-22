import { Ref } from "@vue/reactivity"
import { QFormItemProvider, FilteredRuleItem } from '@/qComponents/QFormItem/src/types'

type RulesOptions = {
  [key: string]: FilteredRuleItem
}

export interface QFormProvider {
  disabled: boolean,
  validate: (passedProps?: string[] | string) => void
  resetFields: (passedProps?: string[] | string) => void
  clearValidate: (passedProps?: string[] | string) => void
  model: any
  fields: Ref<QFormItemProvider[]>,
  rules: RulesOptions,
  showErrorMessage: boolean
  hideRequiredAsterisk: boolean
}

export interface ValidateFnResult {
  isValid: boolean,
  invalidFields: {
    [key: string]: [];
  }
}