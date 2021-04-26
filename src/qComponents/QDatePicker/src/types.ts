import { Instance } from "@popperjs/core";

export type QDatePickerPropModelValue = string | Date | (string | Date)[];

export interface QDatePickerState {
  pickerVisible: boolean,
  showClose: boolean,
  userInput: string | null,
  popper: Instance | null
}
