import { App } from 'vue';

import QTag from './src/QTag.vue';

/* istanbul ignore next */
QTag.install = (app: App): void => {
  app.component(QTag.name, QTag);
};

export default QTag;
