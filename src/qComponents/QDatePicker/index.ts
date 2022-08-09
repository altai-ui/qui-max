import { withInstall } from '../helpers';

import DatePicker from './src/QDatePicker.vue';

export const QDatePicker = withInstall(DatePicker);

export type {
  QDatePickerProps,
  QDatePickerPropModelValue,
  QDatePickerPropType,
  QDatePickerPropFormat,
  QDatePickerPropOutputFormat,
  QDatePickerPropPlaceholder,
  QDatePickerPropStartPlaceholder,
  QDatePickerPropEndPlaceholder,
  QDatePickerPropFirstDayOfWeek,
  QDatePickerPropName,
  QDatePickerPropDisabled,
  QDatePickerPropClearable,
  QDatePickerPropEditable,
  QDatePickerPropRangeSeparator,
  QDatePickerPropShortcuts,
  QDatePickerPropDisabledValues,
  QDatePickerPropValidateEvent,
  QDatePickerPropTeleportTo
} from './src/types';
