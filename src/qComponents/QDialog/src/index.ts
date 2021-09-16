import { App, createApp, nextTick } from 'vue';
import { isServer } from '@/qComponents/constants/isServer';
import { Optional, UnwrappedInstance } from '#/helpers';
import {
  Dialog,
  QDialogContent,
  QDialogEvent,
  QDialogHookOptions,
  QDialogOptions,
  QDialogPromise
} from './types';
import { QDialogContainer, QDialogContainerInstance } from './QDialogContainer';

export const createDialog = (config?: QDialogHookOptions): Dialog => {
  const dialog = (
    content: QDialogContent,
    options?: QDialogOptions
  ): Promise<QDialogEvent> => {
    let dialogPromise: QDialogPromise;
    let app: Optional<App<Element>>;

    const handleDone = ({ action, payload }: QDialogEvent): void => {
      dialogPromise.resolve({ action, payload });
    };

    const handleRemove = (): void => {
      if (!app) return;
      app.unmount();
      options?.onUnmounted?.(app);
    };

    nextTick(() => {
      if (isServer) return;

      app = createApp(QDialogContainer, {
        ...(options || {}),
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
        container as NonNullable<UnwrappedInstance<QDialogContainerInstance>>
      );
    });

    return new Promise((resolve, reject) => {
      dialogPromise = {
        resolve,
        reject
      };
    });
  };
  return dialog;
};
