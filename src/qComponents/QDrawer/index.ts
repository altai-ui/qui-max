import { getCurrentInstance } from 'vue';

import { createDrawer } from './src';
import type { QDrawer, QDrawerHookOptions } from './src/types';

const useDrawer = (options?: QDrawerHookOptions): QDrawer => {
  const parentInstance = getCurrentInstance();

  const drawer = createDrawer({
    parentInstance,
    ...options
  });

  return drawer;
};

export { useDrawer };
export type { QDrawerContainerProvider } from './src/QDrawerContainer';
export { QDrawerContent } from './src/QDrawerContent';
export type {
  QDrawerContentProps,
  QDrawerContentInstance
} from './src/QDrawerContent';
export { QDrawerAction } from './src/constants';
export type { QDrawer, QDrawerOptions } from './src/types';
