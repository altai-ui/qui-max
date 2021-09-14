import { getCurrentInstance } from 'vue';
import QDialog from './src/QDialog.vue';
import { Dialog, QDialogHookOptions } from '@/qComponents/QDialog/src/types';
import { createDialog } from '@/qComponents/QDialog/src';

export const useDialog = (options?: QDialogHookOptions): Dialog => {
  const parentInstance = getCurrentInstance();

  return createDialog({
    parentInstance,
    ...options
  });
};

export type { QDialogProps, QDialogInstance } from './src/types';
export { QDialog };
