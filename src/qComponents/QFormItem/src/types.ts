import { ComputedRef, Ref } from 'vue';
import { RuleItem, ErrorList, FieldErrorList } from 'async-validator';

export interface FilteredRuleItem extends RuleItem {
  trigger?: string | null;
}

export type QFormItemPropRules = Nullable<
  FilteredRuleItem | FilteredRuleItem[]
>;

export interface QFormItemProps {
  for: Nullable<string>;
  prop: Nullable<string>;
  label: Nullable<string>;
  sublabel: Nullable<string>;
  error: Nullable<string>;
  rules: QFormItemPropRules;
  showErrorMessage: Nullable<boolean>;
}

export interface QFormItemContext {
  validateField: (
    trigger?: string | null
  ) => Promise<{ errors?: ErrorList; fields?: FieldErrorList }> | null;
  clearValidate: () => void;
  errorMessage: Ref<string | null>;
  getFilteredRules: (trigger: string | null) => FilteredRuleItem[] | null;
  initialValue: unknown;
  isErrorSlotShown: ComputedRef<boolean>;
  isHeaderShown: ComputedRef<boolean>;
  isRequired: ComputedRef<boolean>;
  labelFor: ComputedRef<Nullable<string>>;
  resetField: () => void;
  rootClasses: ComputedRef<{
    [key: string]: boolean;
  }>;
  rules: FilteredRuleItem | FilteredRuleItem[] | null;
  showErrorMessage: Nullable<boolean>;
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
