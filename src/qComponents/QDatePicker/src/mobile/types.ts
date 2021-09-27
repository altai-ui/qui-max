import type { QDatePickerProvider, QDatePickerPropModelValue } from '../types';
import type { QDialogContainerProvider } from '@/qComponents/QDialog';

export interface MobilePanelInstance {
  dialog: QDialogContainerProvider;
  picker: QDatePickerProvider;
  handlePick: (val: QDatePickerPropModelValue) => void;
}
