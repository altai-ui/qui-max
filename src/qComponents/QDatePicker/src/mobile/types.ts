import type { ComputedRef } from 'vue';

import type {
  QDatePickerPropModelValue,
  QDatePickerTransformedToDate,
  QDatePickerPanelComponent
} from '../types';

export interface MobilePanelInstance {
  handleCloseBtnClick: () => void;
  panelComponent: ComputedRef<QDatePickerPanelComponent>;
  transformedToDate: ComputedRef<QDatePickerTransformedToDate>;
  handlePick: (val: QDatePickerPropModelValue) => void;
}
