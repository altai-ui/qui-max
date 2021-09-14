import { App, Component, createApp, nextTick } from 'vue';
import { Optional } from '#/helpers';
import {
  QDrawerHookOptions,
  QDrawerPlugin,
  QDrawerAction,
  QDrawerEvent,
  QDrawerPromise,
  QDrawerProps
} from './types';
import QDrawer from '@/qComponents';

export const createDrawerPlugin = (
  config?: QDrawerHookOptions
): QDrawerPlugin => {
  const drawerPlugin = (
    content: Component,
    options?: QDrawerProps
  ): Promise<QDrawerEvent> => {
    let drawerPromise: QDrawerPromise;
    let app: Optional<App<Element>>;

    const handleClose = ({ action, payload }: QDrawerEvent): void => {
      if (action === QDrawerAction.open) {
        drawerPromise.resolve({ action, payload });
      } else if (action === QDrawerAction.close) {
        drawerPromise.reject({ action, payload });
      }
    };

    nextTick(() => {
      app = createApp(QDrawer, {
        ...(options ?? {}),
        content,
        onClose: handleClose
      });

      const parentAppContext = config?.parentInstance?.appContext;

      const components = parentAppContext?.components ?? {};
      Object.entries(components).forEach(([key, value]) => {
        app?.component(key, value);
      });

      const provides = parentAppContext?.provides ?? {};
      const providerKeys = Object.getOwnPropertySymbols(provides);
      providerKeys.forEach(key => {
        const value = provides[key as unknown as string];
        if (value) app?.provide(key, value);
      });

      app.mount(document.createElement('div'));
    });

    return new Promise((resolve, reject) => {
      drawerPromise = { resolve, reject };
    });
  };

  return drawerPlugin;
};
