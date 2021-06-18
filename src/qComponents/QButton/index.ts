import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QButton from './src/QButton.vue';

/* istanbul ignore next */
QButton.install = (app: App): void => {
  app.component(QButton.name, QButton);
};

export type { QButtonProps, QButtonInstance } from './src/types';
export default QButton as SFCWithInstall<App, typeof QButton>;
