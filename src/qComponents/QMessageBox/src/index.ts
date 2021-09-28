import { createApp, ref, nextTick } from 'vue';
import type { App, Ref } from 'vue';

import { isServer } from '@/qComponents/constants/isServer';
import type { Nullable, Nillable, UnwrappedInstance } from '#/helpers';

import { QMessageBoxContainer } from './QMessageBoxContainer';
import type { QMessageBoxContainerInstance } from './QMessageBoxContainer';
import { QMessageBoxAction } from './constants';
import type {
  ComponentInternalInstanceWithProvides,
  MessageBoxPromise,
  QMessageBoxHookOptions,
  QMessageBoxContent,
  QMessageBoxOptions,
  QMessageBoxEvent,
  QMessageBox
} from './types';

export const createMessageBox = (
  config?: QMessageBoxHookOptions
): { messageBox: QMessageBox; app: Ref<Nullable<App<Element>>> } => {
  let messageBoxPromise: Nullable<MessageBoxPromise> = null;
  const app = ref<Nullable<App<Element>>>(null);

  const messageBox = (
    content: QMessageBoxContent,
    options?: QMessageBoxOptions
  ): Promise<QMessageBoxEvent> => {
    const handleDone = ({ action, payload }: QMessageBoxEvent): void => {
      if (action === QMessageBoxAction.confirm) {
        messageBoxPromise?.resolve({ action, payload });
      } else if (
        action === QMessageBoxAction.cancel ||
        action === QMessageBoxAction.close
      ) {
        messageBoxPromise?.reject({ action, payload });
      }
    };

    const handleRemove = async (): Promise<void> => {
      if (!app.value) return;

      app.value.unmount();
      await options?.onUnmounted?.(app.value);
      await nextTick();
      app.value = null;
    };

    nextTick(async () => {
      if (isServer) return;

      app.value = createApp(QMessageBoxContainer, {
        content,
        closeOnClickShadow: options?.closeOnClickShadow,
        distinguishCancelAndClose: options?.distinguishCancelAndClose,
        preventFocusAfterClosing: options?.preventFocusAfterClosing,
        wrapClass: options?.wrapClass,
        wrapStyle: options?.wrapStyle,
        onDone: handleDone,
        onRemove: handleRemove
      });

      const parentInstance =
        config?.parentInstance as Nillable<ComponentInternalInstanceWithProvides>;
      const parentAppContext = parentInstance?.appContext;

      const components = parentAppContext?.components ?? {};
      Object.entries(components).forEach(([key, value]) => {
        app.value?.component(key, value);
      });

      // Reprovide a global provides from main app instance and provides from parentInstance
      const provides =
        parentInstance?.provides ?? parentAppContext?.provides ?? {};

      const providerKeys = [
        ...Object.getOwnPropertySymbols(provides),
        ...Object.keys(provides)
      ];

      providerKeys.forEach(key => {
        // TS does not allow use 'symbol' as index type, so we pretend like we don't
        const value = provides[key as string];
        if (value) app.value?.provide(key, value);
      });

      await options?.onBeforeMount?.(app.value);

      const container = app.value.mount(document.createElement('div'));
      await options?.onMounted?.(
        app.value,
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

  return { messageBox, app };
};
