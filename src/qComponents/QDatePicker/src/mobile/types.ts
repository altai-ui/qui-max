import type { ComputedRef } from 'vue';

import type {
  QDatePickerPropModelValue,
  QDatePickerTrasformedToDate,
  QDatePickerPanelComponent
} from '../types';

export interface MobilePanelInstance {
  handleCloseBtnClick: () => void;
  panelComponent: ComputedRef<QDatePickerPanelComponent>;
  transformedToDate: ComputedRef<QDatePickerTrasformedToDate>;
  handlePick: (val: QDatePickerPropModelValue) => void;
}
