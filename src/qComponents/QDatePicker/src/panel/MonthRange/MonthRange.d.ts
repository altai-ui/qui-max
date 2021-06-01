import { ComputedRef, Ref } from 'vue';
import { RangePickValue, RangeState } from '../../Common';

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

interface MonthRangePanelInstance {
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
  handleShortcutClick: (shortcut: Date) => void;
  navigateDropdown: (e: KeyboardEvent) => void;
}

export { MonthRangePanelInstance, MonthRangeState };
