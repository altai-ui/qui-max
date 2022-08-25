import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

import type {
  QDatePickerPropModelValue,
  QDatePickerDate,
  QDatePickerPanelComponent
} from '../types';

export interface MobilePanelInstance {
  handleCloseBtnClick: () => void;
  panelComponent: ComputedRef<QDatePickerPanelComponent>;
  date: ComputedRef<Nullable<QDatePickerDate>>;
  handlePick: (val: QDatePickerPropModelValue) => void;
}
