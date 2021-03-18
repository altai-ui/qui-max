export interface QFormItemProvider {
  validateField: (trigger: string | null) => void
}