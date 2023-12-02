import { Nullable } from '#/helpers';

export type YearPanelPropModelValue = Nullable<Date>;

export interface QDatePickerYear {
  year: number;
  isSelected?: boolean;
  isCurrent?: boolean;
}
