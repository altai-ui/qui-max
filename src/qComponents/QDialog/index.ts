import { getCurrentInstance } from 'vue';

import { createDialog } from './src';
import { QDialog, QDialogHookOptions } from './src/types';

const useDialog = (options?: QDialogHookOptions): QDialog => {
  const parentInstance = getCurrentInstance();

  const dialog = createDialog({
    parentInstance,
    ...options
  });

  return dialog;
};

export { useDialog };
export { QDialogAction } from './src/constants';
export type { QDialogOptions } from './src/types';
