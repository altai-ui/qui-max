import { Ref } from 'vue';

export type QRadioGroupPropModelValue = Nullable<string | number | boolean>;
export type QRadioGroupPropDisabled = Nullable<boolean>;
export type QRadioGroupPropDirection = Nullable<'vertical' | 'horizontal'>;

export interface QRadioGroupProps {
  modelValue: QRadioGroupPropModelValue;
  disabled: QRadioGroupPropDisabled;
  tag: Nullable<string>;
  direction: QRadioGroupPropDirection;
}

export interface QRadioGroupProvider {
  modelValue: Ref<QRadioGroupPropModelValue>;
  disabled: Ref<QRadioGroupPropDisabled>;
  changeValue: (value: QRadioGroupPropModelValue) => void;
}
