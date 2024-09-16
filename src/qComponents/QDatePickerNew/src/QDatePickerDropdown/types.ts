import QDatePickerDayPanel from './QDatePickerPanel/QDatePiockerDayPanel';
import QDatePickerMonthPanel from './QDatePickerPanel/QDatePiockerMonthPanel';

export type QDatePickerPanelComponent =
  | typeof QDatePickerDayPanel
  | typeof QDatePickerMonthPanel;
