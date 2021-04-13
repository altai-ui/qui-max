import { App } from 'vue';

import QInputNumber from './src/QInputNumber.vue';

/* istanbul ignore next */
QInputNumber.install = (app: App): void => {
  app.component(QInputNumber.name, QInputNumber);
};

export default QInputNumber;
