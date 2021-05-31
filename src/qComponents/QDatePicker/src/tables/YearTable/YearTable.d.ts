import { DebouncedFunc } from 'lodash-es';
import { ComputedRef } from 'vue';

interface YearCellModel {
  year: Date;
  disabled: boolean;
  inRange: boolean;
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

export { YearCellModel, YearTableInstance, YearTableState };
