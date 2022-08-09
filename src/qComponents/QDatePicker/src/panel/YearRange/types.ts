import type { ComputedRef, Ref } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

import type { RangePickValue, RangeState } from '../../commonTypes';
import type { QDatePickerPropShortcuts } from '../../types';
import type { DatePanelRangePropModelValue } from '../DateRange/types';

interface YearRangePanelProps {
  modelValue: DatePanelRangePropModelValue;
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
  yearCells: Nullable<NodeListOf<HTMLElement>>;
  lastFocusedCellIndex: Nullable<number>;
}

interface YearRangePanelInstance {
  root: Ref<Nullable<HTMLElement>>;
  leftPanel: Ref<Nullable<HTMLElement>>;
  rightPanel: Ref<Nullable<HTMLElement>>;
  state: YearRangeState;
  rightYear: ComputedRef<number>;
  leftYear: ComputedRef<number>;
  leftLabel: ComputedRef<string>;
  rightLabel: ComputedRef<string>;
  enableYearArrow: ComputedRef<boolean>;
  leftPanelClasses: ComputedRef<ClassValue>;
  rightPanelClasses: ComputedRef<ClassValue>;
  shortcuts: Ref<Nullable<QDatePickerPropShortcuts>>;
  isMobileView: Ref<boolean>;
  handleLeftNextYearClick: () => void;
  handleLeftPrevYearClick: () => void;
  handleRightNextYearClick: () => void;
  handleRightPrevYearClick: () => void;
  handleClear: () => void;
  handleShortcutClick: (shortcut: Date) => void;
  handleRangePick: (val: RangePickValue, close?: boolean) => void;
  handleRangeSelecting: (value: RangeState) => void;
  navigateDropdown: (e: KeyboardEvent) => void;
}

export { YearRangePanelInstance, YearRangeState, YearRangePanelProps };
