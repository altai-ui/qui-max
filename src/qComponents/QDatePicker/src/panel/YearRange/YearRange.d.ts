import { ComputedRef, Ref } from 'vue';
import { RangePickValue, RangeState } from '../../Common';

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

interface YearRangePanelInstance {
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
  handleShortcutClick: (shortcut: Date) => void;
  handleRangePick: (val: RangePickValue, close?: boolean) => void;
  handleRangeSelecting: (value: RangeState) => void;
  navigateDropdown: (e: KeyboardEvent) => void;
}

export { YearRangePanelInstance, YearRangeState };
