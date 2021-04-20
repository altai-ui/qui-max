import { Ref } from 'vue';

export type QCheckboxGroupPropDirection = 'vertical' | 'horizontal';

export interface QCheckboxGroupProps {
  modelValue: Nullable<string[]>;
  disabled: Nullable<boolean>;
  min: Nullable<number>;
  max: Nullable<number>;
  tag: Nullable<string>;
  direction: QCheckboxGroupPropDirection;
}

export interface QCheckboxGroupProvider {
  modelValue: Ref<Nullable<string[]>>;
  min: Ref<Nullable<number>>;
  max: Ref<Nullable<number>>;
  disabled: Ref<Nullable<boolean>>;
  isLimitExceeded: Ref<boolean>;
  update: (value: string[]) => void;
}
