import { ComputedRef, Ref } from 'vue';
import { Rules, RuleItem, ErrorList, FieldErrorList } from 'async-validator';

export interface FilteredRuleItem extends RuleItem {
  trigger?: string | null;
}

export interface QFormItemContext {
  validateField: (
    trigger?: string | null
  ) => Promise<{ errors?: ErrorList; fields?: FieldErrorList }> | null;
  clearValidate: () => void;
  errorMessage: Ref<string | null>;
  getFilteredRules: (trigger: string | null) => FilteredRuleItem[] | null;
  initialValue: Ref<string | null>;
  isErrorSlotShown: ComputedRef<boolean>;
  isHeaderShown: ComputedRef<boolean>;
  isRequired: ComputedRef<boolean>;
  labelFor: ComputedRef<string>;
  resetField: () => void;
  rootClasses: ComputedRef<{
    [key: string]: boolean;
  }>;
  rules: Rules | null;
  showErrorMessage: boolean;
  for: string | null;
  prop: string | null;
  label: string | null;
  sublabel: string | null;
}

export interface QFormItemProvider {
  validateField: (
    trigger?: string | null
  ) => Promise<{ errors?: ErrorList; fields?: FieldErrorList }> | null;
  resetField: () => void;
}
