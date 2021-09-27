import { createApp, nextTick } from 'vue';
import type { App } from 'vue';

import { isServer } from '@/qComponents/constants/isServer';
import type { Nillable, Optional, UnwrappedInstance } from '#/helpers';

import { QDrawerContainer } from './QDrawerContainer';
import type { QDrawerContainerInstance } from './QDrawerContainer';
import { QDrawerAction } from './constants';
import type {
  ComponentInternalInstanceWithProvides,
  QDrawerHookOptions,
  QDrawerContent,
  QDrawerOptions,
  QDrawerEvent,
  DrawerPromise,
  QDrawer
} from './types';

export const createDrawer = (config?: QDrawerHookOptions): QDrawer => {
  const drawer = (
    content: QDrawerContent,
    options?: QDrawerOptions
  ): Promise<QDrawerEvent> => {
    let drawerPromise: DrawerPromise;
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

      app = createApp(QDrawerContainer, {
        ...(options ?? {}),
        content,
        onDone: handleDone,
        onRemove: handleRemove
      });

      const parentInstance =
        config?.parentInstance as Nillable<ComponentInternalInstanceWithProvides>;
      const parentAppContext = parentInstance?.appContext;

      const components = parentAppContext?.components ?? {};
      Object.entries(components).forEach(([key, value]) => {
        app?.component(key, value);
      });

      // Reprovide a global provides from main app instance and provides from parentInstance
      const provides =
        parentInstance?.provides ?? parentAppContext?.provides ?? {};

      const providerKeys = [
        ...Object.getOwnPropertySymbols(provides),
        ...Object.keys(provides)
      ];

      providerKeys.forEach(key => {
        const value = provides[key as unknown as string];
        if (value) app?.provide(key, value);
      });

      options?.onBeforeMount?.(app);

      const container = app.mount(document.createElement('div'));
      options?.onMounted?.(
        app,
        container as NonNullable<UnwrappedInstance<QDrawerContainerInstance>>
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
