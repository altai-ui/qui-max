import { getCurrentInstance } from 'vue';
import { createDrawer } from './src';

import QDrawer from './src/QDrawerContainer/QDrawer.vue';

import type { QDrawerHookOptions, DrawerPlugin } from './types';

export const useDrawer = (options?: QDrawerHookOptions): DrawerPlugin => {
  const parentInstance = getCurrentInstance();

  return createDrawer({
    parentInstance,
    ...options
  });
};

export type {
  QDrawerProps,
  QDrawerInstance
} from './src/QDrawerContainer/types';

export { QDrawer };
