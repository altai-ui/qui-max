import { App } from 'vue';

import QButton from './src/QButton.vue';

/* istanbul ignore next */
QButton.install = (app: App): void => {
  app.component(QButton.name, QButton);
};

export type { QButtonProps } from './src/types';
export default QButton;
