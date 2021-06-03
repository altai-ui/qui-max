import type { DebouncedFunc } from 'lodash-es';
import type { ComputedRef } from 'vue';

interface PeriodCellModel {
  type: string;
  inRange: boolean;
  text: number;
  disabled: boolean;
  date: Nullable<Date>;
}

interface PeriodTableState {
  tableRows: PeriodCellModel[][];
}

interface PeriodTableInstance {
  state: PeriodTableState;
  isMonthTable: ComputedRef<boolean>;
  rows: ComputedRef<PeriodCellModel[][]>;
  getMonthName: (monthIndex: number) => string;
  handleTableClick: (cell: PeriodCellModel) => void;
  getCellClasses: (cell: PeriodCellModel) => string[];
  handleMouseMove: DebouncedFunc<(cell: PeriodCellModel) => void>;
}

export { PeriodCellModel, PeriodTableInstance, PeriodTableState };
