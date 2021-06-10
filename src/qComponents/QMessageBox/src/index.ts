import { createApp, nextTick } from 'vue';
import type { App } from 'vue';

import { QMessageBoxContainer } from './QMessageBoxContainer';
import { QMessageBoxAction } from './constants';
import type {
  QMessageBoxContent,
  QMessageBoxOptions,
  QMessageBoxEvent,
  MessageBoxPromise
} from './types';

export const createMessageBox = (
  content: QMessageBoxContent,
  options?: QMessageBoxOptions
): Promise<QMessageBoxEvent> => {
  let messageBoxPromise: MessageBoxPromise;
  let app: App<Element> | undefined;

  const defaultCallback = ({ action, payload }: QMessageBoxEvent): void => {
    if (action === QMessageBoxAction.confirm) {
      messageBoxPromise.resolve({ action, payload });
    } else if (
      action === QMessageBoxAction.cancel ||
      action === QMessageBoxAction.close
    ) {
      messageBoxPromise.reject({ action, payload });
    }
  };

  nextTick(() => {
    app = createApp(QMessageBoxContainer, {
      ...(options ?? {}),
      content,
      onDone: defaultCallback,
      onRemove: () => {
        app?.unmount();
      }
    });

    app.mount(document.createElement('div'));
  });

  return new Promise((resolve, reject) => {
    messageBoxPromise = {
      resolve,
      reject
    };
  });
};
