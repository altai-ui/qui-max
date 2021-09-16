import { getCurrentInstance } from 'vue';
import QDialog from './src/QDialogContainer/index.vue';
import { Dialog, QDialogHookOptions } from './src/types';
import { createDialog } from './src';

const useDialog = (options?: QDialogHookOptions): Dialog => {
  const parentInstance = getCurrentInstance();

  const dialog = createDialog({
    parentInstance,
    ...options
  });

  return dialog;
};

export { useDialog };

export { QDialogContainerAction } from './src/constants';
export type { Dialog, QDialogOptions } from './src/types';
export { QDialog };
