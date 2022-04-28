import { withInstall } from '../helpers';

import DatePicker from './src/QDatePicker.vue';

export const QDatePicker = withInstall(DatePicker);

export type { QDatePickerPropModelValue, QDatePickerProps } from './src/types';
