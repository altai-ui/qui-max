import { getCurrentInstance } from 'vue';

import { createDialog } from './src';
import type { QDialog, QDialogHookOptions } from './src/types';

const useDialog = (options?: QDialogHookOptions): QDialog => {
  const parentInstance = getCurrentInstance();

  const dialog = createDialog({
    parentInstance,
    ...options
  });

  return dialog;
};

export { useDialog };

export { QDialogContainerProvider } from './src/QDialogContainer';
export { QDialogContent } from './src/QDialogContent';
export type {
  QDialogContentProps,
  QDialogContentInstance
} from './src/QDialogContent';
export { QDialogAction } from './src/constants';
export type { QDialog, QDialogOptions } from './src/types';
