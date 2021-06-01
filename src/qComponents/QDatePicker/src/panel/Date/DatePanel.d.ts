import { ComputedRef, Ref } from 'vue';
import { TranslateResult, Path, Locale } from 'vue-i18n';
import { QDatePickerPropShortcuts } from '../../QDatePicker';

type DatePanelPropShortcuts = Record<string, Date>[];
type DatePanelPropModelValue = null | Date;

interface DatePanelState {
  year: number;
  month: number;
  currentView: 'date' | 'week' | 'month' | 'year';
  isRanged: boolean;
  panelInFocus: string | null;
  lastFocusedCellIndex: number | null;
  dateCells: Nullable<NodeListOf<Element>>;
  monthCells: Nullable<NodeListOf<Element>>;
  yearCells: Nullable<NodeListOf<Element>>;
}

interface DatePanelProps {
  modelValue: DatePanelPropModelValue;
}

interface DatePanelInstance {
  state: DatePanelState;
  root: Ref<HTMLElement | null>;
  shortcuts: Ref<QDatePickerPropShortcuts>;
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
  handleShortcutClick: (shortcut: Date) => void;
  handleYearPick: (year: Date) => void;
  handleMonthPick: (month: number, year: number) => void;
  handleDatePick: (value: DatePanelPropModelValue) => void;
  t: (key: Path, locale?: Locale) => TranslateResult;
}

export {
  DatePanelInstance,
  DatePanelState,
  DatePanelProps,
  DatePanelPropShortcuts,
  DatePanelPropModelValue
};
