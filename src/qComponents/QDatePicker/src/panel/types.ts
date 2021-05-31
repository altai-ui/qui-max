import { ComputedRef, Ref } from 'vue';
import { TranslateResult, Path, Locale } from 'vue-i18n';
import { QDatePickerProvider } from '../types';

type DatePanelPropShortcuts = Record<
  string,
  Date
>[];
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
  isRanged: boolean;
  currentView: string;
  panelInFocus: Nullable<string>;
  monthCells: Nullable<NodeListOf<Element>>;
  lastFocusedCellIndex: Nullable<number>;
}

interface DateRangeState {
  minDate: Nullable<Date>;
  maxDate: Nullable<Date>;
  leftDate: Date;
  rightDate: Date;
  rangeState: RangeState;
  panelInFocus: Nullable<string>;
  dateCells: Nullable<NodeListOf<Element>>;
  monthCells: Nullable<NodeListOf<Element>>;
  yearCells: Nullable<NodeListOf<Element>>;
  lastFocusedCellIndex: Nullable<number>;
}

interface DateRangeInstance {
  state: DateRangeState;
  picker: QDatePickerProvider;
  root: Ref<HTMLElement | null>;
  leftPanel: Ref<HTMLElement | null>;
  rightPanel: Ref<HTMLElement | null>;
  transformedValue: ComputedRef<Date[]>;
  btnDisabled: ComputedRef<boolean>;
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
  handleRangePick: (val: RangePickValue, close?: boolean) => void;
  handleShortcutClick: (
    shortcut: Date
  ) => void;
  handleClear: () => void;
  handleLeftPrevYearClick: () => void;
  handleLeftNextYearClick: () => void;
  handleLeftPrevMonthClick: () => void;
  handleRightNextYearClick: () => void;
  handleRightPrevYearClick: () => void;
  handleRightNextMonthClick: () => void;
  handleLeftNextMonthClick: () => void;
  handleRightPrevMonthClick: () => void;
  handleRangeSelecting: (value: RangeState) => void;
  navigateDropdown: (e: KeyboardEvent) => void
}

interface MonthRangeInstance {
  root: Ref<HTMLElement | null>;
  leftPanel: Ref<HTMLElement | null>;
  rightPanel: Ref<HTMLElement | null>;
  state: MonthRangeState;
  leftPanelClasses: ComputedRef<Record<string, boolean>>;
  rightPanelClasses: ComputedRef<Record<string, boolean>>;
  rightYear: ComputedRef<number>;
  leftYear: ComputedRef<number>;
  leftMonth: ComputedRef<number>;
  rightMonth: ComputedRef<number>;
  enableYearArrow: ComputedRef<boolean>;
  handleLeftPrevYearClick: () => void;
  handleLeftNextYearClick: () => void;
  handleRightNextYearClick: () => void;
  handleRightPrevYearClick: () => void;
  handleRangeSelecting: (value: RangeState) => void;
  handleRangePick: (val: RangePickValue, close?: boolean) => void;
  handleClear: () => void;
  handleShortcutClick: (
    shortcut: Date
  ) => void;
  navigateDropdown: (e: KeyboardEvent) => void;
}

interface YearRangeState {
  minDate: Nullable<Date>;
  maxDate: Nullable<Date>;
  leftDate: Date;
  rightDate: Date;
  rangeState: RangeState;
  isRanged: boolean;
  currentView: string;
  panelInFocus: Nullable<string>;
  yearCells: Nullable<NodeListOf<Element>>;
  lastFocusedCellIndex: Nullable<number>;
}

interface YearRangeInterface {
  root: Ref<HTMLElement | null>;
  leftPanel: Ref<HTMLElement | null>;
  rightPanel: Ref<HTMLElement | null>;
  state: YearRangeState;
  rightYear: ComputedRef<number>;
  leftYear: ComputedRef<number>;
  leftLabel: ComputedRef<string>;
  rightLabel: ComputedRef<string>;
  enableYearArrow: ComputedRef<boolean>;
  leftPanelClasses: ComputedRef<Record<string, boolean>>;
  rightPanelClasses: ComputedRef<Record<string, boolean>>;
  handleLeftNextYearClick: () => void;
  handleLeftPrevYearClick: () => void;
  handleRightNextYearClick: () => void;
  handleRightPrevYearClick: () => void;
  handleClear: () => void;
  handleShortcutClick: (
    shortcut: Date
  ) => void;
  handleRangePick: (val: RangePickValue, close?: boolean) => void;
  handleRangeSelecting: (value: RangeState) => void;
  navigateDropdown: (e: KeyboardEvent) => void;
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
  showMonthPicker: () => void;
  showYearPicker: () => void;
  showDatePicker: () => void;
  navigateDropdown: (e: KeyboardEvent) => void;
  handlePrevMonthClick: () => void;
  handleNextMonthClick: () => void;
  handlePrevYearClick: () => void;
  handleNextYearClick: () => void;
  handleShortcutClick: (
    shortcut: Date
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
  DateRangeInstance,
  MonthRangeInstance,
  YearRangeState,
  YearRangeInterface,
  RangePickValue
};
