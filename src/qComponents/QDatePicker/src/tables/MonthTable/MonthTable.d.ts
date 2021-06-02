import type { DebouncedFunc } from 'lodash-es';
import type { ComputedRef } from 'vue';

interface MonthCellModel {
  row: number;
  column: number;
  type: string;
  inRange: boolean;
  start: boolean;
  end: boolean;
  text: number;
  disabled: boolean;
  month: Nullable<Date>;
}

interface MonthTableState {
  tableRows: MonthCellModel[][];
}

interface MonthTableInstance {
  state: MonthTableState;
  rows: ComputedRef<MonthCellModel[][]>;
  getMonthName: (monthIndex: number) => string;
  handleMonthTableClick: (cell: MonthCellModel) => void;
  getCellClasses: (cell: MonthCellModel) => string[];
  handleMouseMove: DebouncedFunc<(cell: MonthCellModel) => void>;
}

export { MonthCellModel, MonthTableInstance, MonthTableState };
