import type { ComputedRef } from 'vue';
import type { DebouncedFunc } from 'lodash-es';

import type { Nullable } from '#/helpers';

import type { DateCellModel } from '../../commonTypes';

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
