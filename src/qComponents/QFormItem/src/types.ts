import type { Ref, ComputedRef } from 'vue';
import type { RuleItem, ErrorList, FieldErrorList } from 'async-validator';

export interface FilteredRuleItem extends RuleItem {
  trigger?: Nullable<string>;
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
    trigger?: Nullable<string>
  ) => Nullable<Promise<{ errors?: ErrorList; fields?: FieldErrorList }>>;
  clearValidate: () => void;
  errorMessage: Ref<Nullable<string>>;
  getFilteredRules: (trigger: Nullable<string>) => Nullable<FilteredRuleItem[]>;
  initialValue: unknown;
  isErrorSlotShown: ComputedRef<boolean>;
  isHeaderShown: ComputedRef<boolean>;
  isRequired: ComputedRef<boolean>;
  labelFor: ComputedRef<Nullable<string>>;
  resetField: () => void;
  rootClasses: ComputedRef<{
    [key: string]: boolean;
  }>;
  rules: Nullable<FilteredRuleItem | FilteredRuleItem[]>;
  showErrorMessage: Nullable<boolean>;
  for: Nullable<string>;
  prop: Nullable<string>;
  label: Nullable<string>;
  sublabel: Nullable<string>;
}

export interface QFormItemProvider {
  validateField: (
    trigger?: Nullable<string>
  ) => Nullable<Promise<{ errors?: ErrorList; fields?: FieldErrorList }>>;
  resetField: () => void;
}

export interface QFormItemInstance {
  errorMessage: Ref<Nullable<string>>;
  isErrorSlotShown: ComputedRef<boolean>;
  labelFor: ComputedRef<Nullable<string>>;
  isRequired: ComputedRef<boolean>;
  isHeaderShown: ComputedRef<boolean>;
  rootClasses: ComputedRef<Record<string, boolean>>;
  getFilteredRules: (trigger: Nullable<string>) => Nullable<FilteredRuleItem[]>;
}
