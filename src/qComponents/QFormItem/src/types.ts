import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError
} from 'async-validator';
import type { Ref, ComputedRef } from 'vue';

import type { Nullable, Optional, Enumerable, ClassValue } from '#/helpers';

export interface FilteredRuleItem extends RuleItem {
  trigger?: Nullable<string>;
}

export type QFormItemPropFor = Nullable<string>;
export type QFormItemPropProp = Nullable<string>;
export type QFormItemPropLabel = Nullable<string>;
export type QFormItemPropSublabel = Nullable<string>;
export type QFormItemPropError = Nullable<string>;
export type QFormItemPropRules = Nullable<Enumerable<FilteredRuleItem>>;
export type QFormItemPropShowErrorMessage = Nullable<boolean>;
export type QFormItemPropLabelSize = Nullable<'regular' | 'small'>;

export interface QFormItemProps {
  for: QFormItemPropFor;
  prop: QFormItemPropProp;
  label: QFormItemPropLabel;
  sublabel: QFormItemPropSublabel;
  error: QFormItemPropError;
  rules: QFormItemPropRules;
  showErrorMessage: QFormItemPropShowErrorMessage;
  labelSize: QFormItemPropLabelSize;
}

export interface QFormItemContext {
  validateField: (trigger?: Nullable<string>) => Nullable<
    Promise<{
      errors?: Nullable<ValidateError[]>;
      fields?: ValidateFieldsError;
    }>
  >;
  clearValidate: () => void;
  errorMessage: Ref<Nullable<string>>;
  getFilteredRules: (trigger: Nullable<string>) => Nullable<FilteredRuleItem[]>;
  initialValue: unknown;
  isErrorSlotShown: ComputedRef<boolean>;
  isHeaderShown: ComputedRef<boolean>;
  isRequired: ComputedRef<boolean>;
  labelFor: ComputedRef<Optional<string>>;
  resetField: () => void;
  rootClasses: ComputedRef<ClassValue>;
  rules: Nullable<FilteredRuleItem | FilteredRuleItem[]>;
  showErrorMessage: Nullable<boolean>;
  for: Nullable<string>;
  prop: Nullable<string>;
  label: Nullable<string>;
  sublabel: Nullable<string>;
}

export interface QFormItemProvider {
  validateField: (trigger?: Nullable<string>) => Nullable<
    Promise<{
      errors?: Nullable<ValidateError[]>;
      fields?: ValidateFieldsError;
    }>
  >;
  resetField: () => void;
}

export interface QFormItemInstance {
  errorMessage: Ref<Nullable<string>>;
  isErrorSlotShown: ComputedRef<boolean>;
  labelFor: ComputedRef<Optional<string>>;
  isRequired: ComputedRef<boolean>;
  isHeaderShown: ComputedRef<boolean>;
  rootClasses: ComputedRef<ClassValue>;
  getFilteredRules: (trigger: Nullable<string>) => Nullable<FilteredRuleItem[]>;
  validateField: (trigger?: Nullable<string>) => Nullable<
    Promise<{
      errors?: Nullable<ValidateError[]>;
      fields?: ValidateFieldsError;
    }>
  >;
  resetField: () => void;
  labelClass: ComputedRef<ClassValue>;
}
