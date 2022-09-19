import { Nullable } from '#/helpers';

export interface QDatePickerMonth {
  month: string;
  isSelected?: boolean;
  isCurrent?: boolean;
}

export type MonthPanelPropModelValue = Nullable<Date>;
