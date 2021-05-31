type RangeState = {
  hoveredDate: Nullable<Date>;
  pickedDate: Nullable<Date>;
  selecting: boolean;
};

type RangePickValue = {
  minDate: Nullable<Date>;
  maxDate: Nullable<Date>;
  rangeState: RangeState;
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

export { RangePickValue, RangeState, DateCellModel };
