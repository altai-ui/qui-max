import { Nullable } from '#/helpers';

export interface QDatePickerDay {
  date: number;
  isAdditional?: boolean;
  isSelected?: boolean;
  isToday?: boolean;
}

export type DatePanelPropModelValue = Nullable<Date>;
