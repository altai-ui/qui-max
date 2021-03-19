import { ComputedRef, Ref } from "@vue/reactivity";

export interface QFormItemProvider {
  validateField: (trigger: string | null) => void
  clearValidate: () => void
  error: Ref<string | null>
  errorMessage: Ref<string | null>
  for: Ref<string | null>
  getFilteredRules: (trigger: string | null) => void
  initialValue: Ref<string | null>
  isErrorSlotShown: ComputedRef<boolean>
  isHeaderShown: ComputedRef<boolean>
  isRequired: ComputedRef<boolean>
  label: Ref<string>
  labelFor: ComputedRef<string>
  prop: Ref<string>
  resetField: () => void
  rootClasses: ComputedRef<{
    [key: string]: boolean
  }>
  rules: {
    [key: string]: {} | []
  }
  showErrorMessage: Ref<boolean>
  sublabel: Ref<null>
}