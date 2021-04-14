import { App } from 'vue';

import QCheckbox from './src/QCheckbox.vue';

/* istanbul ignore next */
QCheckbox.install = (app: App) => {
  app.component(QCheckbox.name, QCheckbox);
};

export default QCheckbox;
