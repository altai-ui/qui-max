import { ComputedRef, Ref } from 'vue';
import { TranslateResult, Path, Locale } from 'vue-i18n';
import { QDatePickerPropShortcuts } from '../../QDatePicker';

type DatePanelPropShortcuts = Record<string, Date>[];
type DatePanelPropModelValue = Nullable<Date>;

interface DatePanelState {
  year: number;
  month: number;
  currentView: 'date' | 'week' | 'month' | 'year';
  isRanged: boolean;
  panelInFocus: string | null;
  lastFocusedCellIndex: number | null;
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
  t: (key: Path, locale?: Locale) => TranslateResult;
}

export {
  DatePanelInstance,
  DatePanelState,
  DatePanelProps,
  DatePanelPropShortcuts,
  DatePanelPropModelValue
};
