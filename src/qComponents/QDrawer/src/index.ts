import { App, Component, createApp, nextTick } from 'vue';
import {
  QDrawerPromise,
  QDrawerHookOptions,
  QDrawerEvent,
  QDrawerAction,
  QDrawerOptions,
  QDrawerInstance
} from '@/qComponents/QDrawer/src/types';
import { Optional, UnwrappedInstance } from '#/helpers';
import { QDrawer } from '@/qComponents/QDrawer';

export const createDrawer =
  (config?: QDrawerHookOptions) =>
  (content: Component, options?: QDrawerOptions): Promise<QDrawerEvent> => {
    let drawerPromise: QDrawerPromise;
    let app: Optional<App<Element>>;

    const handleDone = ({ action, payload }: QDrawerEvent): void => {
      return action === QDrawerAction.done
        ? drawerPromise.resolve({ action, payload })
        : drawerPromise.reject({ action, payload });
    };

    const handleClose = (): void => {
      if (!app) return;

      app.unmount();

      options?.onUnmounted?.(app);
    };

    nextTick(() => {
      app = createApp(QDrawer, {
        ...(options ?? {}),
        content,
        onDone: handleDone,
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

      options?.onBeforeMount?.(app);

      const container = app.mount(document.createElement('div'));
      options?.onMounted?.(
        app,
        container as NonNullable<UnwrappedInstance<QDrawerInstance>>
      );
    });

    return new Promise((resolve, reject) => {
      drawerPromise = {
        resolve,
        reject
      };
    });
  };
