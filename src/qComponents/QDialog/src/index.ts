import { App, Component, createApp, nextTick } from 'vue';
import {
  QDialogContainerProps,
  QDialogHookOptions,
  QDialogPromise,
  QDialogProps
} from '@/qComponents/QDialog/src/types';
import { Optional } from '#/helpers';
import { QDialog } from '@/qComponents/QDialog';

export const createDialog =
  (config?: QDialogHookOptions) =>
  (content: Component, options?: QDialogProps): Promise<boolean | string> => {
    let dialogPromise: QDialogPromise;
    let app: Optional<App<Element>>;

    const handleClose = (isClosed: boolean): void => {
      if (!app) return;
      if (isClosed) {
        app.unmount();
        dialogPromise.resolve(true);
      }
    };

    nextTick(() => {
      app = createApp(QDialog, {
        ...(options || {}),
        content,
        onClosed: handleClose
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
