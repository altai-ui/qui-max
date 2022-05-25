import { createApp, ref, nextTick } from 'vue';
import type { App, Ref } from 'vue';

import { isServer } from '@/qComponents/constants/isServer';

import type { Nullable, Nillable, UnwrappedInstance } from '#/helpers';

import { QDrawerAction } from './constants';
import { QDrawerContainer } from './QDrawerContainer';
import type { QDrawerContainerInstance } from './QDrawerContainer';
import type {
  DrawerPromise,
  ComponentInternalInstanceWithProvides,
  QDrawerHookOptions,
  QDrawerContent,
  QDrawerOptions,
  QDrawerEvent,
  QDrawer
} from './types';

export const createDrawer = (
  config?: QDrawerHookOptions
): { drawer: QDrawer; app: Ref<Nullable<App<Element>>> } => {
  let drawerPromise: Nullable<DrawerPromise> = null;
  const app = ref<Nullable<App<Element>>>(null);

  const drawer = (
    content: QDrawerContent,
    options?: QDrawerOptions
  ): Promise<QDrawerEvent> => {
    const handleDone = ({ action, payload }: QDrawerEvent): void => {
      if (action === QDrawerAction.confirm) {
        drawerPromise?.resolve({ action, payload });
      } else if (
        action === QDrawerAction.cancel ||
        action === QDrawerAction.close
      ) {
        drawerPromise?.reject({ action, payload });
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

      app.value = createApp(QDrawerContainer, {
        content,
        width: options?.width,
        closeOnClickShadow: options?.closeOnClickShadow,
        distinguishCancelAndClose: options?.distinguishCancelAndClose,
        preventFocusAfterClosing: options?.preventFocusAfterClosing,
        position: options?.position,
        customClass: options?.customClass,
        beforeClose: options?.beforeClose,
        teleportTo: options?.teleportTo,
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
      const provides = {
        ...(parentAppContext?.provides ?? {}),
        ...(parentInstance?.provides ?? {})
      };

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

  return { drawer, app };
};
