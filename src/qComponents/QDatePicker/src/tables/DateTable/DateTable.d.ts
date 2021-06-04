import { DebouncedFunc } from 'lodash-es';
import type { ComputedRef } from 'vue';
import type { DateCellModel } from '../../Common';

interface DateTableState {
  lastRow: Nullable<number>;
  lastColumn: Nullable<number>;
  tableRows: DateCellModel[][];
}

interface DateTableInterface {
  state: DateTableState;
  offsetDay: ComputedRef<number>;
  days: ComputedRef<string[]>;
  rows: ComputedRef<DateCellModel[][]>;
  startMonthDate: ComputedRef<Date>;
  endMonthDate: ComputedRef<Date>;
  getCellClasses: (cell: DateCellModel) => string[];
  handleMouseMove: DebouncedFunc<(cell: DateCellModel) => void>;
  handleClick: (cell: DateCellModel) => void;
}

export { DateTableInterface, DateTableState };
