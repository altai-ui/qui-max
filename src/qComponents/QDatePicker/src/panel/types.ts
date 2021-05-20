import { ComputedRef, PropType } from 'vue';
import { TranslateResult, Path, Locale } from 'vue-i18n';
import type { QDatePickerPropModelValue } from '../types';

type DatePanelPropShortcuts = PropType<
  Record<string, (model: unknown) => void>[]
>;

interface MonthRangeState {
  minDate: Nullable<string>;
  maxDate: Nullable<string>;
  leftDate: Date;
  rightDate: Date;
  rangeState: {
    endDate: null;
    selecting: boolean;
  };
  shortcuts: string;
  isRanged: boolean;
  currentView: string;
  panelInFocus: null;
}

interface DateRangeState {
  minDate: Nullable<string>;
  maxDate: Nullable<string>;
  leftDate: Date;
  rightDate: Date;
  rangeState: {
    endDate: null;
    selecting: boolean;
  };
  isRanged: boolean;
  panelInFocus: null;
}

interface DateRangeInterface {
  state: DateRangeState;
  picker: unknown;
  transformedValue: ComputedRef<Date[]>;
  btnDisabled: ComputedRef<boolean>;
  disabledRightTimeValues: ComputedRef<Record<string, string>>;
  parsedLeftTime: ComputedRef<string | Date | Record<string, string>>;
  enableMonthArrow: ComputedRef<boolean>;
  isLeftTimeDisabled: ComputedRef<boolean>;
  parsedRightTime: ComputedRef<Date | Record<string, string>>;
  enableYearArrow: ComputedRef<boolean>;
  rightPanelClasses: ComputedRef<Record<string, boolean>>;
  leftPanelClasses: ComputedRef<Record<string, boolean>>;
  rightYear: ComputedRef<number>;
  leftMonth: ComputedRef<number>;
  rightMonth: ComputedRef<number>;
  handleRangePick: (val: any, close?: boolean) => void;
  handleLeftTimeChange: ({
    value,
    type
  }: {
    value: string;
    type: string;
  }) => void;
  handleRightTimeChange: ({
    value,
    type
  }: {
    value: string;
    type: string;
  }) => void;
  handleClear: () => void;
  handleLeftPrevMonthClick: () => void;
  handleRightNextMonthClick: () => void;
  handleLeftNextMonthClick: () => void;
  handleRightPrevMonthClick: () => void;
}

interface MonthRangeInterface {
  state: MonthRangeState;
  leftPanelClasses: ComputedRef<Record<string, boolean>>;
  rightPanelClasses: ComputedRef<Record<string, boolean>>;
  rightYear: ComputedRef<number>;
  leftYear: ComputedRef<number>;
  enableYearArrow: ComputedRef<boolean>;
  handleClear: () => void;
  handleShortcutClick: (
    shortcut: Record<string, (model: unknown) => void>
  ) => void;
}

interface YearRangeState {
  minDate: Nullable<string>;
  maxDate: Nullable<string>;
  leftDate: Date;
  rightDate: Date;
  rangeState: {
    endDate: null;
    selecting: boolean;
  };
  isRanged: boolean;
  panelInFocus: null;
}

interface YearRangeInterface {
  state: YearRangeState;
  rightYear: ComputedRef<number>;
  leftYear: ComputedRef<number>;
  enableYearArrow: ComputedRef<boolean>;
  leftPanelClasses: ComputedRef<Record<string, boolean>>;
  rightPanelClasses: ComputedRef<Record<string, boolean>>;
  leftNextYear: () => void;
  leftPrevYear: () => void;
  rightNextYear: () => void;
  rightPrevYear: () => void;
  handleClear: () => void;
}

interface DatePanelInterface {
  state: Record<string, Nullable<string | number | boolean>>;
  panelContentClasses: ComputedRef<Record<string, boolean>>;
  parsedTime: ComputedRef<Record<string, Date> | null>;
  selectionMode: ComputedRef<string>;
  currentMonth: ComputedRef<string>;
  yearLabel: ComputedRef<string | number>;
  handleTimeChange: ({ type, value }: Record<string, string>) => void;
  showMonthPicker: () => void;
  showYearPicker: () => void;
  showDatePicker: () => void;
  handlePrevMonthClick: () => void;
  handleNextMonthClick: () => void;
  handlePrevYearClick: () => void;
  handleNextYearClick: () => void;
  handleShortcutClick: (
    shortcut: Record<string, (model: unknown) => void>
  ) => void;
  handleYearPick: (year: Date) => void;
  handleMonthPick: (month: number, year: number) => void;
  handleDatePick: (value: QDatePickerPropModelValue) => void;
  t: (key: Path, locale?: Locale) => TranslateResult;
}

export {
  DatePanelInterface,
  DatePanelPropShortcuts,
  MonthRangeState,
  DateRangeState,
  DateRangeInterface,
  MonthRangeInterface,
  YearRangeState,
  YearRangeInterface
};
