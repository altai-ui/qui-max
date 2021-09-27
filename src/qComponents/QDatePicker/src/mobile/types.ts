import type { ComputedRef } from 'vue';

import type {
  QDatePickerPropModelValue,
  QDatePickerTrasformedToDate
} from '../types';
import { QDatePickerPanelComponent } from '../types';

export interface MobilePanelInstance {
  handleCloseBtnClick: () => void;
  panelComponent: ComputedRef<QDatePickerPanelComponent>;
  transformedToDate: ComputedRef<QDatePickerTrasformedToDate>;
  handlePick: (val: QDatePickerPropModelValue) => void;
}
