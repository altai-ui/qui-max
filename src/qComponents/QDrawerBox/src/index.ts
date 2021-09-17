import { createApp, nextTick } from 'vue';
import type { App } from 'vue';

import { isServer } from '@/qComponents/constants/isServer';
import type { Optional, UnwrappedInstance } from '#/helpers';
import { QDrawerBoxAction } from './constants';

import { QDrawerBoxContainer } from './QDrawerContainer';
import type { QDrawerBoxContainerInstance } from './QDrawerContainer';
import type {
  QDrawerBoxHookOptions,
  QDrawerBoxContent,
  QDrawerBoxOptions,
  QDrawerBoxEvent,
  QDrawerBoxPromise,
  Drawer
} from './types';

export const createDrawer = (config?: QDrawerBoxHookOptions): Drawer => {
  const drawer = (
    content: QDrawerBoxContent,
    options?: QDrawerBoxOptions
  ): Promise<QDrawerBoxEvent> => {
    let drawerPromise: QDrawerBoxPromise;
    let app: Optional<App<Element>>;

    const handleDone = ({ action, payload }: QDrawerBoxEvent): void => {
      if (action === QDrawerBoxAction.confirm) {
        drawerPromise.resolve({ action, payload });
      } else if (
        action === QDrawerBoxAction.cancel ||
        action === QDrawerBoxAction.close
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

      app = createApp(QDrawerBoxContainer, {
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
        container as NonNullable<UnwrappedInstance<QDrawerBoxContainerInstance>>
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
