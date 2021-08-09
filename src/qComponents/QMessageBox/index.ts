import { getCurrentInstance } from 'vue';

import { createMessageBox } from './src';
import { QMessageBox, QMessageBoxHookOptions } from './src/types';

const useMessageBox = (options?: QMessageBoxHookOptions): QMessageBox => {
  const parentInstance = getCurrentInstance();

  const messageBox = createMessageBox({
    parentInstance,
    ...options
  });

  return messageBox;
};

export { useMessageBox };
export { QMessageBoxContent } from './src/QMessageBoxContent';
export type {
  QMessageBoxContentPropBeforeClose,
  QMessageBoxContentProps,
  QMessageBoxContentInstance
} from './src/QMessageBoxContent';
export { QMessageBoxAction } from './src/constants';
export type { QMessageBox, QMessageBoxOptions } from './src/types';
