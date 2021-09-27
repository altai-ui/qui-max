import type { ComputedRef } from 'vue';

import type { QDialogContainerProvider } from '@/qComponents/QDialog';
import type {
  QDatePickerPropModelValue,
  QDatePickerTrasformedToDate
} from '../types';
import { QDatePickerPanelComponent } from '../types';

export interface MobilePanelInstance {
  dialog: QDialogContainerProvider;
  transformedToDate: ComputedRef<QDatePickerTrasformedToDate>;
  panelComponent: ComputedRef<QDatePickerPanelComponent>;
  handlePick: (val: QDatePickerPropModelValue) => void;
}
