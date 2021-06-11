import { createApp, nextTick } from 'vue';
import type { App, ComponentPublicInstance, UnwrapRef } from 'vue';

import { installI18n } from '@/qComponents/constants/locales';
import { QMessageBoxContainer } from './QMessageBoxContainer';
import type { QMessageBoxContainerInstance } from './QMessageBoxContainer';
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

  const handleDone = ({ action, payload }: QMessageBoxEvent): void => {
    if (action === QMessageBoxAction.confirm) {
      messageBoxPromise.resolve({ action, payload });
    } else if (
      action === QMessageBoxAction.cancel ||
      action === QMessageBoxAction.close
    ) {
      messageBoxPromise.reject({ action, payload });
    }
  };

  const handleRemove = (): void => {
    if (!app) return;

    app.unmount();
    options?.onUnmounted?.(app);
  };

  nextTick(() => {
    app = createApp(QMessageBoxContainer, {
      ...(options ?? {}),
      content,
      onDone: handleDone,
      onRemove: handleRemove
    });

    installI18n({ app, customI18nMessages: {} });

    const container = app.mount(document.createElement('div'));
    options?.onMounted?.(
      app,
      container as ComponentPublicInstance<
        UnwrapRef<QMessageBoxContainerInstance>
      >
    );
  });

  return new Promise((resolve, reject) => {
    messageBoxPromise = {
      resolve,
      reject
    };
  });
};
