import type { Ref } from 'vue';

import type { Nullable } from '#/helpers';

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

export interface QRadioGroupInstance {
  root: Ref<Nullable<HTMLElement>>;
  handleKeydown: (e: KeyboardEvent) => void;
}
