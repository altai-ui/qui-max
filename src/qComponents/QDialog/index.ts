import type { App } from 'vue';

import { getCurrentInstance } from 'vue';

import type { SFCWithInstall } from '#/helpers';
import QDialog from './src/QDialog.vue';
import { QDialogProps } from '@/qComponents';
import { Dialog, QDialogHookOptions } from '@/qComponents/QDialog/src/types';
import { createDialog } from '@/qComponents/QDialog/src';

/* istanbul ignore next */
QDialog.install = (app: App): void => {
  app.component(QDialog.name, QDialog);
};

export const useDialog = (options?: QDialogHookOptions): Dialog => {
  const parentInstance = getCurrentInstance();

  return createDialog({
    parentInstance,
    ...options
  });
};

export type { QDialogProps, QDialogInstance } from './src/types';
export default QDialog as SFCWithInstall<App, typeof QDialog>;
