import type { DebouncedFunc } from 'lodash-es';
import type { ComputedRef } from 'vue';
import type { RangeState } from '../../Common';

interface YearCellModel {
  year: Date;
  disabled: boolean;
  inRange: boolean;
}

interface YearTableProps {
  year: number;
  value: Date;
  minDate: Nullable<Date>;
  maxDate: Nullable<Date>;
  rangeState: RangeState;
}

interface YearTableState {
  tableRows: YearCellModel[][];
}

interface YearTableInstance {
  state: YearTableState;
  startYear: ComputedRef<Date>;
  rows: ComputedRef<YearCellModel[][]>;
  getCellClasses: (cell: YearCellModel) => string[];
  handleMouseMove: DebouncedFunc<(cell: YearCellModel) => void>;
  handleYearTableClick: ({ year }: { year: Date }) => void;
}

export { YearCellModel, YearTableInstance, YearTableState, YearTableProps };
