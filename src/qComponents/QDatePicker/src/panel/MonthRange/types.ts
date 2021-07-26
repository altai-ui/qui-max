import type { ComputedRef, Ref } from 'vue';

import type { Nullable } from '#/helpers';

import type { RangePickValue, RangeState } from '../../commonTypes';
import type { QDatePickerPropShortcuts } from '../../types';
import type { DatePanelRangePropModelValue } from '../DateRange/types';

interface MonthRangePanelProps {
  modelValue: DatePanelRangePropModelValue;
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
  monthCells: Nullable<NodeListOf<HTMLElement>>;
  lastFocusedCellIndex: Nullable<number>;
}

interface MonthRangePanelInstance {
  root: Ref<Nullable<HTMLElement>>;
  leftPanel: Ref<Nullable<HTMLElement>>;
  rightPanel: Ref<Nullable<HTMLElement>>;
  shortcuts: Ref<Nullable<QDatePickerPropShortcuts>>;
  isMobileView: Ref<boolean>;
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
  handleShortcutClick: (shortcut: Date) => void;
  navigateDropdown: (e: KeyboardEvent) => void;
}

export { MonthRangePanelInstance, MonthRangeState, MonthRangePanelProps };
