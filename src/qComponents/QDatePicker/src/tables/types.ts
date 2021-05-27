import { DebouncedFunc } from 'lodash-es';
import { ComputedRef } from 'vue';

type RangeState = {
  hoveredDate: Nullable<Date>;
  pickedDate: Nullable<Date>;
  selecting: boolean;
};

interface DateCellModel {
  row: number;
  column: number;
  type: string;
  inRange: boolean;
  start: boolean;
  end: boolean;
  text: number | string;
  date: Nullable<Date>;
  disabled: boolean;
}

interface MonthCellModel {
  row: number;
  column: number;
  type: string;
  inRange: boolean;
  start: boolean;
  end: boolean;
  text: number;
  disabled: boolean;
  month: null | Date;
}

interface YearCellModel {
  year: Date;
  disabled: boolean;
  inRange: boolean;
}

interface DateTableState {
  lastRow: Nullable<number>;
  lastColumn: Nullable<number>;
  tableRows: [][];
}

interface DateTableInterface {
  state: DateTableState;
  offsetDay: ComputedRef<number>;
  days: ComputedRef<any[]>;
  rows: ComputedRef<DateCellModel[][]>;
  startMonthDate: ComputedRef<Date>;
  endMonthDate: ComputedRef<Date>;
  getCellClasses: (cell: DateCellModel) => string[];
  handleMouseMove: DebouncedFunc<(cell: DateCellModel) => void>;
  handleClick: (cell: DateCellModel) => void;
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

export {
  DateCellModel,
  RangeState,
  DateTableState,
  DateTableInterface,
  MonthCellModel,
  MonthTableState,
  MonthTableInstance,
  YearCellModel,
  YearTableState,
  YearTableInstance
};
