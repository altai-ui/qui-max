import { ComputedRef, Ref } from 'vue';
import { TranslateResult, Path, Locale } from 'vue-i18n';
import { QDatePickerProvider } from '../types';

type DatePanelPropShortcuts = Record<string, (model: unknown) => void>[];
type DatePanelPropModelValue = null | Date;

type DatePanelRangePropModelValue = Date[] | null;

type RangeState = {
  hoveredDate: Nullable<Date>;
  pickedDate: Nullable<Date>;
  selecting: boolean;
};

type RangePickValue = {
  minDate: Nullable<Date>;
  maxDate: Nullable<Date>;
  rangeState: RangeState;
};

interface DatePanelState {
  year: number;
  month: number;
  currentView: string;
  isRanged: boolean;
  panelInFocus: string | null;
  lastFocusedCellIndex: number | null;
  dateCells: Nullable<NodeListOf<Element>>;
  monthCells: Nullable<NodeListOf<Element>>;
  yearCells: Nullable<NodeListOf<Element>>;
}

interface MonthRangeState {
  minDate: Nullable<Date>;
  maxDate: Nullable<Date>;
  leftDate: Date;
  rightDate: Date;
  rangeState: RangeState;
  shortcuts: string;
  isRanged: boolean;
  currentView: string;
  panelInFocus: null;
}

interface DateRangeState {
  minDate: Nullable<Date>;
  maxDate: Nullable<Date>;
  leftDate: Date;
  rightDate: Date;
  rangeState: RangeState;
  panelInFocus: null;
}

interface DateRangeInterface {
  state: DateRangeState;
  picker: QDatePickerProvider;
  transformedValue: ComputedRef<Date[]>;
  btnDisabled: ComputedRef<boolean>;
  disabledRightTimeValues: ComputedRef<Record<string, string>>;
  enableMonthArrow: ComputedRef<boolean>;
  isLeftTimeDisabled: ComputedRef<boolean>;
  enableYearArrow: ComputedRef<boolean>;
  rightPanelClasses: ComputedRef<Record<string, boolean>>;
  leftPanelClasses: ComputedRef<Record<string, boolean>>;
  rightYear: ComputedRef<number>;
  leftYear: ComputedRef<number>;
  leftLabel: ComputedRef<string>;
  rightLabel: ComputedRef<string>;
  leftMonth: ComputedRef<number>;
  rightMonth: ComputedRef<number>;
  handleRangePick: (
    val: {
      minDate: Date;
      maxDate: Nullable<Date>;
    },
    close?: boolean
  ) => void;
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
  rangeState: RangeState;
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

interface DatePanelProps {
  disabledValues: Record<string, Date>;
  firstDayOfWeek: number;
  modelValue: DatePanelPropModelValue;
  type: string;
  shortcuts: DatePanelPropShortcuts;
  showTime: boolean;
}

interface DatePanelInterface {
  state: DatePanelState;
  root: Ref<HTMLElement | null>;
  datePanel: Ref<HTMLElement | null>;
  timePanel: Ref<HTMLElement | null>;
  panelContentClasses: ComputedRef<Record<string, boolean>>;
  parsedTime: ComputedRef<Record<string, string> | null>;
  selectionMode: ComputedRef<string>;
  currentMonth: ComputedRef<string>;
  yearLabel: ComputedRef<string | number>;
  // handleTimeChange: ({ type, value }: Record<string, string>) => void;
  showMonthPicker: () => void;
  showYearPicker: () => void;
  showDatePicker: () => void;
  navigateDropdown: (e: KeyboardEvent) => void;
  handlePrevMonthClick: () => void;
  handleNextMonthClick: () => void;
  handlePrevYearClick: () => void;
  handleNextYearClick: () => void;
  handleShortcutClick: (
    shortcut: Record<string, (model: unknown) => void>
  ) => void;
  handleYearPick: (year: Date) => void;
  handleMonthPick: (month: number, year: number) => void;
  handleDatePick: (value: DatePanelPropModelValue) => void;
  t: (key: Path, locale?: Locale) => TranslateResult;
}

export {
  DatePanelState,
  DatePanelInterface,
  DatePanelProps,
  DatePanelPropShortcuts,
  DatePanelPropModelValue,
  DatePanelRangePropModelValue,
  MonthRangeState,
  DateRangeState,
  DateRangeInterface,
  MonthRangeInterface,
  YearRangeState,
  YearRangeInterface,
  RangePickValue
};
