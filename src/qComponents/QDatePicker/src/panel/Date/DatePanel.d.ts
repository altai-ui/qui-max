import { ComputedRef, Ref } from 'vue';
import { TranslateResult, Path, Locale } from 'vue-i18n';

type DatePanelPropShortcuts = Record<string, Date>[];
type DatePanelPropModelValue = null | Date;

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
  handleShortcutClick: (shortcut: Date) => void;
  handleYearPick: (year: Date) => void;
  handleMonthPick: (month: number, year: number) => void;
  handleDatePick: (value: DatePanelPropModelValue) => void;
  t: (key: Path, locale?: Locale) => TranslateResult;
}

export {
  DatePanelInterface,
  DatePanelState,
  DatePanelProps,
  DatePanelPropShortcuts,
  DatePanelPropModelValue
};
