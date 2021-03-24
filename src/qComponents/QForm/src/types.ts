import { Ref } from '@vue/reactivity';
import {
  QFormItemContext,
  FilteredRuleItem
} from '@/qComponents/QFormItem/src/types';

type RulesOptions = {
  [key: string]: FilteredRuleItem;
};

export interface ValidateFnResult {
  isValid: boolean;
  invalidFields: {
    [key: string]: [];
  };
}

export interface QFormProvider {
  disabled: boolean;
  validate: (
    passedProps?: string[] | string
  ) => Promise<ValidateFnResult | null>;
  resetFields: (passedProps?: string[] | string) => void;
  clearValidate: (passedProps?: string[] | string) => void;
  model: {
    [key: string]: unknown;
  };
  fields: Ref<QFormItemContext[]>;
  rules: RulesOptions;
  showErrorMessage: boolean;
  hideRequiredAsterisk: boolean;
}
