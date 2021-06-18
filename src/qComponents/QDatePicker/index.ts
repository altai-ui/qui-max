import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QDatePicker from './src/QDatePicker.vue';

/* istanbul ignore next */
QDatePicker.install = (app: App): void => {
  app.component(QDatePicker.name, QDatePicker);
};

export type { QDatePickerPropModelValue, QDatePickerProps } from './src/types';
export default QDatePicker as SFCWithInstall<App, typeof QDatePicker>;
