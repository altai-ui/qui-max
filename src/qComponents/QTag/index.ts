import type { App } from 'vue';

import QTag from './src/QTag.vue';

/* istanbul ignore next */
QTag.install = (app: App): void => {
  app.component(QTag.name, QTag);
};

export type { QTagProps, QTagInstance } from './src/types';
export default QTag;
