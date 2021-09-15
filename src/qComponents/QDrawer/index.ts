import { getCurrentInstance } from 'vue';

import QDrawer from './src/QDrawerContainer/QDrawer.vue';
import { DrawerPlugin, QDrawerHookOptions } from './src/types';
import { createDrawer } from './src';

export const useDrawer = (options?: QDrawerHookOptions): DrawerPlugin => {
  const parentInstance = getCurrentInstance();

  return createDrawer({
    parentInstance,
    ...options
  });
};

export type { QDrawerProps, QDrawerInstance } from './src/types';
export { QDrawer };
