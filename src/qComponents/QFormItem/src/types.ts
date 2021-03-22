import { ComputedRef, Ref } from "@vue/reactivity";
import { Rules, RuleItem } from 'async-validator'

export interface FilteredRuleItem extends RuleItem {
  trigger?: string | null
}

export interface QFormItemProvider {
  validateField: (trigger?: string | null) => Promise<any> | null
  clearValidate: () => void
  error: Ref<string | null>
  errorMessage: Ref<string | null>
  getFilteredRules: (trigger: string | null) => FilteredRuleItem[] | null
  initialValue: Ref<string | null>
  isErrorSlotShown: ComputedRef<boolean>
  isHeaderShown: ComputedRef<boolean>
  isRequired: ComputedRef<boolean>
  labelFor: ComputedRef<string>
  resetField: () => void
  rootClasses: ComputedRef<{
    [key: string]: boolean
  }>
  rules: Rules | null,
  showErrorMessage: boolean
  for: string | null
  prop: string | null
  label: string | null
  sublabel: string | null
}