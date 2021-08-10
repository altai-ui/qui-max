import { createApp, nextTick } from 'vue';
import type { App } from 'vue';

import type { Optional, UnwrappedInstance } from '#/helpers';

import { QMessageBoxContainer } from './QMessageBoxContainer';
import type { QMessageBoxContainerInstance } from './QMessageBoxContainer';
import { QMessageBoxAction } from './constants';
import type {
  QMessageBoxHookOptions,
  QMessageBoxContent,
  QMessageBoxOptions,
  QMessageBoxEvent,
  MessageBoxPromise,
  QMessageBox
} from './types';

export const createMessageBox = (
  config?: QMessageBoxHookOptions
): QMessageBox => {
  const messageBox = (
    content: QMessageBoxContent,
    options?: QMessageBoxOptions
  ): Promise<QMessageBoxEvent> => {
    let messageBoxPromise: MessageBoxPromise;
    let app: Optional<App<Element>>;

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

      const parentAppContext = config?.parentInstance?.appContext;

      // Register a global components from main app instance
      const components = parentAppContext?.components ?? {};
      Object.entries(components).forEach(([key, value]) => {
        app?.component(key, value);
      });

      // Reprovide a global provides from main app instance
      const provides = parentAppContext?.provides ?? {};
      const providerKeys = Object.getOwnPropertySymbols(provides);
      providerKeys.forEach(key => {
        // TS does not allow use 'symbol' as index type, so we pretend like we don't
        const value = provides[key as unknown as string];
        if (value) app?.provide(key, value);
      });

      options?.onBeforeMount?.(app);

      const container = app.mount(document.createElement('div'));
      options?.onMounted?.(
        app,
        container as NonNullable<
          UnwrappedInstance<QMessageBoxContainerInstance>
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

  return messageBox;
};
