import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QInput from './src/QInput.vue';

/* istanbul ignore next */
QInput.install = (app: App): void => {
  app.component(QInput.name, QInput);
};

export type { QInputProps, QInputInstance } from './src/types';
export default QInput as SFCWithInstall<App, typeof QInput>;
