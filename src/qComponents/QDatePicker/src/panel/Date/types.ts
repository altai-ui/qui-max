import type { ComputedRef, Ref } from 'vue';

import type { Nullable } from '#/helpers';

import type { QDatePickerPropShortcuts } from '../../types';

type DatePanelPropShortcuts = Record<string, Date>[];
type DatePanelPropModelValue = Nullable<Date>;

interface DatePanelState {
  year: number;
  month: number;
  currentView: 'date' | 'week' | 'month' | 'year';
  isRanged: boolean;
  panelInFocus: Nullable<string>;
  lastFocusedCellIndex: Nullable<number>;
  dateCells: Nullable<NodeListOf<HTMLElement>>;
  periodCells: Nullable<NodeListOf<HTMLElement>>;
}

interface DatePanelProps {
  modelValue: DatePanelPropModelValue;
}

interface DatePanelInstance {
  state: DatePanelState;
  root: Ref<Nullable<HTMLElement>>;
  shortcuts: Ref<Nullable<QDatePickerPropShortcuts>>;
  datePanel: Ref<Nullable<HTMLElement>>;
  panelContentClasses: ComputedRef<Record<string, boolean>>;
  isPeriodTableShown: ComputedRef<boolean>;
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
  handleShortcutClick: (shortcut: Date) => void;
  handlePeriodPick: (month: number, year: number, type: string) => void;
  handleDatePick: (value: DatePanelPropModelValue) => void;
  t: (key: string) => string;
}

export {
  DatePanelInstance,
  DatePanelState,
  DatePanelProps,
  DatePanelPropShortcuts,
  DatePanelPropModelValue
};
