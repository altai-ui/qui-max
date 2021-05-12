import { Instance } from '@popperjs/core';

export type QDatePickerPropModelValue = Nullable<
  string | Date | (string | Date)[]
>;

export interface QDatePickerState {
  pickerVisible: boolean;
  showClose: boolean;
  userInput: string | null;
  popper: Instance | null;
}
