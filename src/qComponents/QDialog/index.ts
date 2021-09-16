import { getCurrentInstance } from 'vue';
import { QDialog, QDialogHookOptions } from './src/types';
import { createDialog } from './src';

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
export type { QDialog, QDialogOptions } from './src/types';
