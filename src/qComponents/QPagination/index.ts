import type { App } from 'vue';

import QPagination from './src/QPagination.vue';

/* istanbul ignore next */
QPagination.install = (app: App): void => {
  app.component(QPagination.name, QPagination);
};

export type { QPaginationProps, QPaginationInstance } from './src/types';
export default QPagination as SFCWithInstall<App, typeof QPagination>;
