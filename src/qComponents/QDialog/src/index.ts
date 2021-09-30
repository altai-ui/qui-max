import { createApp, ref, nextTick } from 'vue';
import type { App, Ref } from 'vue';

import { isServer } from '@/qComponents/constants/isServer';
import type { Nullable, Nillable, UnwrappedInstance } from '#/helpers';

import { QDialogContainer } from './QDialogContainer';
import type { QDialogContainerInstance } from './QDialogContainer';
import { QDialogAction } from './constants';
import type {
  DialogPromise,
  ComponentInternalInstanceWithProvides,
  QDialogHookOptions,
  QDialogContent,
  QDialogOptions,
  QDialogEvent,
  QDialog
} from './types';

export const createDialog = (
  config?: QDialogHookOptions
): { dialog: QDialog; app: Ref<Nullable<App<Element>>> } => {
  let dialogPromise: Nullable<DialogPromise> = null;
  const app = ref<Nullable<App<Element>>>(null);

  const dialog = (
    content: QDialogContent,
    options?: QDialogOptions
  ): Promise<QDialogEvent> => {
    const handleDone = ({ action, payload }: QDialogEvent): void => {
      if (action === QDialogAction.confirm) {
        dialogPromise?.resolve({ action, payload });
      } else if (
        action === QDialogAction.cancel ||
        action === QDialogAction.close
      ) {
        dialogPromise?.reject({ action, payload });
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

      app.value = createApp(QDialogContainer, {
        content,
        offsetTop: options?.offsetTop,
        distinguishCancelAndClose: options?.distinguishCancelAndClose,
        preventFocusAfterClosing: options?.preventFocusAfterClosing,
        customClass: options?.customClass,
        beforeClose: options?.beforeClose,
        teleportTo: options?.teleportTo,
        onDone: handleDone,
        onRemove: handleRemove
      });

      const parentInstance =
        config?.parentInstance as Nillable<ComponentInternalInstanceWithProvides>;
      const parentAppContext = parentInstance?.appContext;

      // Register a global components from main app instance
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

  return { dialog, app };
};
