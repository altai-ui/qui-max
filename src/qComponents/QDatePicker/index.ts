import { App } from 'vue';

import QDatePicker from './src/QDatePicker.vue';

/* istanbul ignore next */
QDatePicker.install = (app: App): void => {
  app.component(QDatePicker.name, QDatePicker);
};

export default QDatePicker;
