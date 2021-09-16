import { App, createApp, nextTick } from 'vue';

import type {
  QDrawerContainerPropContent,
  QDrawerInstance
} from '@/qComponents/QDrawer/src/QDrawerContainer/types';
import type { Optional, UnwrappedInstance } from '#/helpers';
import type {
  QDrawerEvent,
  QDrawerHookOptions,
  QDrawerOptions,
  QDrawerPromise,
  DrawerPlugin
} from './types';

import { QDrawerAction } from './constants';
import { isServer } from '@/qComponents/constants/isServer';

import { QDrawer } from './QDrawerContainer';

export const createDrawer = (config?: QDrawerHookOptions): DrawerPlugin => {
  const drawer = (
    content: QDrawerContainerPropContent,
    options?: QDrawerOptions
  ): Promise<QDrawerEvent> => {
    let drawerPromise: QDrawerPromise;
    let app: Optional<App<Element>>;

    const handleDone = ({ action, payload }: QDrawerEvent): void => {
      if (action === QDrawerAction.confirm) {
        drawerPromise.resolve({ action, payload });
      } else if (
        action === QDrawerAction.cancel ||
        action === QDrawerAction.close
      ) {
        drawerPromise.reject({ action, payload });
      }
    };

    const handleRemove = (): void => {
      if (!app) return;

      app.unmount();
      options?.onUnmounted?.(app);
    };

    nextTick(() => {
      if (isServer) return;

      app = createApp(QDrawer, {
        ...(options ?? {}),
        content,
        onDone: handleDone,
        onRemove: handleRemove
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

  return drawer;
};
