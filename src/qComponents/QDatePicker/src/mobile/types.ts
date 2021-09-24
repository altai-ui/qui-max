import type { ComputedRef } from 'vue';
import type { QDatePickerProvider } from '../types';
import type DateRangePanel from '../panel/DateRange/DateRange.vue';
import type MonthRangePanel from '../panel/MonthRange/MonthRange.vue';
import type YearRangePanel from '../panel/YearRange/YearRange.vue';
import type DatePanel from '../panel/Date/DatePanel.vue';

export interface MobilePanelInstance {
  panelComponent: ComputedRef<
    | typeof DateRangePanel
    | typeof MonthRangePanel
    | typeof YearRangePanel
    | typeof DatePanel
  >;
  picker: QDatePickerProvider;
}
