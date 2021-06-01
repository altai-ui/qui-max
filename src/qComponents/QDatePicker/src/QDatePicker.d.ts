import { Instance } from '@popperjs/core';
import { Ref } from 'vue';

type QDatePickerPropModelValue = Nullable<string | Date | string[] | Date[]>;

interface QDatePickerProps {
  type: string;
  format: string;
  outputFormat: string;
  placeholder: string;
  startPlaceholder: string;
  endPlaceholder: string;
  firstDayOfWeek: number;
  name: string;
  disabled: boolean;
  clearable: boolean;
  modelValue: QDatePickerPropModelValue;
  validateEvent: boolean;
}

interface QDatePickerState {
  pickerVisible: boolean;
  showCloseIcon: boolean;
  userInput: string | null;
  popper: Instance | null;
}

interface QDatePickerProvider {
  emit: (
    event:
      | 'focus'
      | 'change'
      | 'input'
      | 'update:modelValue'
      | 'intermediateChange',
    ...args: unknown[]
  ) => void;
  emitChange: (val: QDatePickerPropModelValue, intermediate: boolean) => void;
  type: Ref<string>;
}

export {
  QDatePickerProps,
  QDatePickerPropModelValue,
  QDatePickerState,
  QDatePickerProvider
};
