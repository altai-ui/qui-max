import { getCurrentInstance, onUnmounted } from 'vue';

import { createDialog } from './src';
import type { QDialog, QDialogHookOptions } from './src/types';

const useDialog = (options?: QDialogHookOptions): QDialog => {
  const parentInstance = getCurrentInstance();

  const { dialog, app } = createDialog({
    parentInstance,
    ...options
  });

  onUnmounted(() => {
    app.value?.unmount();
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
export type {
  QDialog,
  QDialogOptionsBeforeClose,
  QDialogOptionsTeleportTo,
  QDialogOptions
} from './src/types';
