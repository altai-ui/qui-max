import { getCurrentInstance } from 'vue';

import { createDrawer } from './src';
import type { QDrawerHookOptions, DrawerPlugin } from './src/types';

const useDrawer = (options?: QDrawerHookOptions): DrawerPlugin => {
  const parentInstance = getCurrentInstance();

  const drawer = createDrawer({
    parentInstance,
    ...options
  });

  return drawer;
};

export { useDrawer };
export { QDrawerContent } from './src/QDrawerContent';
export type {
  QDrawerContentInstance,
  QDrawerParams
} from './src/QDrawerContent';
export { QDrawerAction } from './src/constants';
export type { QDrawerOptions, DrawerPlugin } from './src/types';
