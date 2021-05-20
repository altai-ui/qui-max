import { ComputedRef } from 'vue';

interface RangeStateProp {
  endDate: Nullable<Date>;
  selecting: boolean;
}

interface CellModel {
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

interface DateTableState {
  lastRow: Nullable<Record<string, unknown>>;
  lastColumn: Nullable<Record<string, unknown>>;
  tableRows: [][];
}

interface DateTableInterface {
  state: DateTableState;
  offsetDay: ComputedRef<number>;
  days: ComputedRef<any[]>;
  rows: ComputedRef<
    {
      row: number;
      column: number;
      type: string;
      inRange: boolean;
      start: boolean;
      end: boolean;
    }[][]
  >;
  startMonthDate: ComputedRef<Date>;
  endMonthDate: ComputedRef<Date>;
  getCellClasses: (cell: any) => string[];
  handleMouseMove: (event: MouseEvent) => void;
  handleClick: (cell: any) => void;
}

interface YearTableState {
  tableRows: [][];
  lastHoveredCell: Nullable<number>;
}

interface YearTableInterface {
  state: YearTableState;
  startYear: Date;
  rows: unknown;
  handleMouseMove: (event: MouseEvent) => void;
  handleYearTableClick: (event: MouseEvent) => void;
}

interface YearRow {
  year: Date;
  disabled: boolean;
  inRange: boolean;
}

export {
  RangeStateProp,
  CellModel,
  YearRow,
  DateTableState,
  DateTableInterface,
  YearTableState,
  YearTableInterface
};
