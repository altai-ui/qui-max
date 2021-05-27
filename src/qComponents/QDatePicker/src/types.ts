import { Instance } from '@popperjs/core';
import { Ref } from 'vue';

type QDatePickerPropModelValue = Nullable<string | Date | (string | Date)[]>;

interface QDatePickerState {
  pickerVisible: boolean;
  showCloseIcon: boolean;
  userInput: string | null;
  popper: Instance | null;
}

interface QDatePickerProvider {
  emitChange: (val: QDatePickerPropModelValue, intermediate: boolean) => void;
  type: Ref<string>;
}

export { QDatePickerPropModelValue, QDatePickerState, QDatePickerProvider };
