import { Instance } from '@popperjs/core';
import { ComputedRef, Ref } from 'vue';

type QDatePickerPropModelValue = Nullable<string | Date | string[] | Date[]>;
type QDatePickerPropType =
  | 'date'
  | 'week'
  | 'month'
  | 'year'
  | 'daterange'
  | 'monthrange'
  | 'yearrange';
type QDatePickerPropShortcuts = {
  text: 'string';
  value: Date;
}[];
type QDatePickerPropDisabledValues = Nullable<{
  to?: Date;
  from?: Date;
  ranges?: {
    start: Date;
    end: Date;
  }[];
}>;

interface QDatePickerProps {
  type: QDatePickerPropType;
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
  disabledValues: QDatePickerPropDisabledValues;
  shortcuts: QDatePickerPropShortcuts;
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
  firstDayOfWeek: ComputedRef<number>;
  disabledValues: Ref<QDatePickerPropDisabledValues>;
  shortcuts: Ref<QDatePickerPropShortcuts>;
  emitChange: (val: QDatePickerPropModelValue, intermediate: boolean) => void;
  type: Ref<string>;
}

export {
  QDatePickerProps,
  QDatePickerPropModelValue,
  QDatePickerPropShortcuts,
  QDatePickerPropType,
  QDatePickerPropDisabledValues,
  QDatePickerState,
  QDatePickerProvider
};
