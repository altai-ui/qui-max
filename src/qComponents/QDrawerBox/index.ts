import { getCurrentInstance } from 'vue';

import { createDrawer } from './src';
import type { Drawer, QDrawerBoxHookOptions } from './src/types';

const useDrawer = (options?: QDrawerBoxHookOptions): Drawer => {
  const parentInstance = getCurrentInstance();

  const drawer = createDrawer({
    parentInstance,
    ...options
  });

  return drawer;
};

export { useDrawer };
export { QDrawerBoxAction } from './src/constants';
export type { Drawer, QDrawerBoxOptions } from './src/types';
