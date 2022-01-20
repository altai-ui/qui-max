import { getCurrentInstance, onUnmounted } from 'vue';

import { createMessageBox } from './src';
import { QMessageBox, QMessageBoxHookOptions } from './src/types';

const useMessageBox = (options?: QMessageBoxHookOptions): QMessageBox => {
  const parentInstance = getCurrentInstance();

  const { messageBox, app } = createMessageBox({
    parentInstance,
    ...options
  });

  onUnmounted(() => {
    app.value?.unmount();
  });

  return messageBox;
};

export { useMessageBox };
export type { QMessageBoxContainerProvider } from './src/QMessageBoxContainer';
export { QMessageBoxContent } from './src/QMessageBoxContent';
export type {
  QMessageBoxContentPropBeforeClose,
  QMessageBoxContentProps,
  QMessageBoxContentInstance
} from './src/QMessageBoxContent';
export { QMessageBoxAction } from './src/constants';
export type {
  QMessageBox,
  QMessageBoxOptionWrapClass,
  QMessageBoxOptionWrapStyle,
  QMessageBoxOptions
} from './src/types';
