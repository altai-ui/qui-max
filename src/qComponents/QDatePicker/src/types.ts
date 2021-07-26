import type { Instance } from '@popperjs/core';
import type { ComputedRef, Ref } from 'vue';

import type { QInputInstance } from '@/qComponents/QInput';
import type { Nullable, UnwrappedInstance } from '#/helpers';

import type DatePanel from './panel/Date/DatePanel.vue';
import type DateRangePanel from './panel/DateRange/DateRange.vue';
import type MonthRangePanel from './panel/MonthRange/MonthRange.vue';
import type YearRangePanel from './panel/YearRange/YearRange.vue';

import type { DatePanelInstance } from './panel/Date/types';

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

type HandlePickClickSecondArg = { hidePicker?: boolean };

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
    { hidePicker }?: HandlePickClickSecondArg
  ) => void;
  firstDayOfWeek: ComputedRef<number>;
  isMobileView: Ref<boolean>;
  disabledValues: Ref<QDatePickerPropDisabledValues>;
  shortcuts: Ref<Nullable<QDatePickerPropShortcuts>>;
  emitChange: (val: QDatePickerPropModelValue, intermediate: boolean) => void;
  type: Ref<QDatePickerPropType>;
}

interface QDatePickerInstance {
  state: QDatePickerState;
  root: Ref<Nullable<HTMLElement>>;
  panel: Ref<UnwrappedInstance<DatePanelInstance>>;
  reference: Ref<Nullable<UnwrappedInstance<QInputInstance> | HTMLElement>>;
  isRanged: ComputedRef<boolean>;
  isPickerDisabled: ComputedRef<boolean>;
  isValueEmpty: ComputedRef<boolean>;
  isMobileView: Ref<boolean>;
  calcFirstDayOfWeek: ComputedRef<number>;
  transformedToDate: ComputedRef<Nullable<Date | Date[]>>;
  rangeClasses: ComputedRef<Record<string, boolean>>;
  panelComponent: ComputedRef<
    | typeof DateRangePanel
    | typeof MonthRangePanel
    | typeof YearRangePanel
    | typeof DatePanel
  >;
  displayValue: ComputedRef<Nullable<string | string[]>>;
  iconClass: ComputedRef<string>;
  handleInputDateChange: () => void;
  handleKeyUp: (e: KeyboardEvent) => void;
  popperInit: () => void;
  destroyPopper: () => void;
  closePicker: () => void;
  handlePickClick: (
    val: QDatePickerPropModelValue,
    options?: {
      hidePicker?: boolean;
    }
  ) => void;
  handleFocus: () => void;
  handleInput: (arg: { target: HTMLInputElement; inputType: string }) => void;
  handleMouseEnter: () => void;
  handleRangeClick: () => void;
  handleIconClick: (event: MouseEvent) => void;
  t: (key: string) => string;
}

export {
  QDatePickerProps,
  QDatePickerPropModelValue,
  QDatePickerPropShortcuts,
  QDatePickerPropType,
  QDatePickerPropOutputFormat,
  QDatePickerPropDisabledValues,
  QDatePickerState,
  QDatePickerProvider,
  QDatePickerInstance
};
