import { getCurrentInstance } from 'vue';
import QDialog from './src/QDialog.vue';
import { Dialog, QDialogHookOptions } from './src/types';
import { createDialog } from './src';

export const useDialog = (options?: QDialogHookOptions): Dialog => {
  const parentInstance = getCurrentInstance();

  const dialog = createDialog({
    parentInstance,
    ...options
  });

  return dialog;
};

export type { QDialogProps, QDialogInstance } from './src/types';
export { QDialog };
