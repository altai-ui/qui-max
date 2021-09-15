import { App, Component, createApp, nextTick } from 'vue';
import {
  QDialogEvent,
  QDialogHookOptions,
  QDialogPromise,
  QDialogProps
} from '@/qComponents/QDialog/src/types';
import { Optional } from '#/helpers';
import { QDialog } from '@/qComponents/QDialog';
import { isServer } from '@/qComponents/constants/isServer';

export const createDialog =
  (config?: QDialogHookOptions) =>
  (content: Component, options?: QDialogProps): Promise<QDialogEvent> => {
    let dialogPromise: QDialogPromise;
    let app: Optional<App<Element>>;

    const handleRemove = (): void => {
      if (!app) return;
      app.unmount();
    };

    const handleDone = ({ action, payload }: QDialogEvent): void => {
      dialogPromise.resolve({ action, payload });
    };

    nextTick(() => {
      if (isServer) return;

      app = createApp(QDialog, {
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

      app.mount(document.createElement('div'));
    });

    return new Promise((resolve, reject) => {
      dialogPromise = {
        resolve,
        reject
      };
    });
  };
