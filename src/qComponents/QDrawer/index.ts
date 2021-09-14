import { App, getCurrentInstance } from 'vue';

import QDrawer from './src/QDrawer.vue';
import { createDrawerPlugin } from './src/drawer-hook';
import { QDrawerHookOptions, QDrawerPlugin } from './src/types';

/* istanbul ignore next */
QDrawer.install = (app: App): void => {
  app.component(QDrawer.name, QDrawer);
};

export const useDrawer = (options?: QDrawerHookOptions): QDrawerPlugin => {
  const parentInstance = getCurrentInstance();

  return createDrawerPlugin({
    parentInstance,
    ...options
  });
};

export type { QDrawerProps, QDrawerInstance } from './src/types';
export { QDrawer };
