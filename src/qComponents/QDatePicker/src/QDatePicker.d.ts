import type { Instance } from '@popperjs/core';
import type { ComputedRef, Ref } from 'vue';

type QDatePickerPropModelValue = Nullable<string | Date | string[] | Date[]>;
type QDatePickerPropOutputFormat = 'date' | 'iso';
type QDatePickerPropType =
  | 'date'
  | 'week'
  | 'month'
  | 'year'
  | 'daterange'
  | 'monthrange'
  | 'yearrange';
type QDatePickerPropShortcuts = {
  text: string;
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
  outputFormat: QDatePickerPropOutputFormat;
  placeholder: Nullable<string>;
  startPlaceholder: Nullable<string>;
  endPlaceholder: Nullable<string>;
  firstDayOfWeek: Nullable<number>;
  name: string;
  disabled: boolean;
  clearable: boolean;
  editable: boolean;
  modelValue: Nullable<QDatePickerPropModelValue>;
  rangeSeparator: string;
  validateEvent: boolean;
  disabledValues: QDatePickerPropDisabledValues;
  shortcuts: Nullable<QDatePickerPropShortcuts>;
  teleportTo: Nullable<string | HTMLElement>;
}

interface QDatePickerState {
  pickerVisible: boolean;
  showCloseIcon: boolean;
  userInput: Nullable<string>;
  popper: Nullable<Instance>;
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
  handlePickClick: (
    val: QDatePickerPropModelValue,
    {
      hidePicker
    }?: {
      hidePicker?: boolean | undefined;
    }
  ) => void;
  firstDayOfWeek: ComputedRef<number>;
  disabledValues: Ref<QDatePickerPropDisabledValues>;
  shortcuts: Ref<Nullable<QDatePickerPropShortcuts>>;
  emitChange: (val: QDatePickerPropModelValue, intermediate: boolean) => void;
  type: Ref<QDatePickerPropType>;
}

export {
  QDatePickerProps,
  QDatePickerPropModelValue,
  QDatePickerPropShortcuts,
  QDatePickerPropType,
  QDatePickerPropOutputFormat,
  QDatePickerPropDisabledValues,
  QDatePickerState,
  QDatePickerProvider
};
