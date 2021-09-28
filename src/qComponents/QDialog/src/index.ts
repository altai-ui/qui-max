import { createApp, nextTick, Ref, ref } from 'vue';
import type { App } from 'vue';

import { isServer } from '@/qComponents/constants/isServer';
import type { UnwrappedInstance, Nullable } from '#/helpers';

import { QDialogContainer } from './QDialogContainer';
import type { QDialogContainerInstance } from './QDialogContainer';
import { QDialogAction } from './constants';
import type {
  QDialogHookOptions,
  QDialogContent,
  QDialogOptions,
  QDialogEvent,
  QDialogPromise,
  QDialog,
  ComponentInternalInstanceWithProvides
} from './types';

export const createDialog = (
  config?: QDialogHookOptions
): { dialog: QDialog; app: Ref<Nullable<App<Element>>> } => {
  const app = ref<Nullable<App<Element>>>(null);

  const dialog = (
    content: QDialogContent,
    options?: QDialogOptions
  ): Promise<QDialogEvent> => {
    let dialogPromise: QDialogPromise;

    const handleDone = ({ action, payload }: QDialogEvent): void => {
      if (action === QDialogAction.confirm) {
        dialogPromise.resolve({ action, payload });
      } else if (
        action === QDialogAction.cancel ||
        action === QDialogAction.close
      ) {
        dialogPromise.reject({ action, payload });
      }
    };

    const handleRemove = (): void => {
      if (!app.value) return;

      app.value.unmount();
      options?.onUnmounted?.(app.value);
    };

    nextTick(() => {
      if (isServer) return;

      app.value = createApp(QDialogContainer, {
        ...(options || {}),
        content,
        onDone: handleDone,
        onRemove: handleRemove
      });

      const parentAppContext = config?.parentInstance?.appContext;
      // Register a global components from main app instance
      const components = parentAppContext?.components ?? {};
      Object.entries(components).forEach(([key, value]) => {
        app.value?.component(key, value);
      });

      // Reprovide a global provides from main app instance and provides from parentInstance
      const provides =
        (config?.parentInstance as ComponentInternalInstanceWithProvides)
          ?.provides ??
        parentAppContext?.provides ??
        {};

      const providerKeys = [
        ...Object.getOwnPropertySymbols(provides),
        ...Object.keys(provides)
      ];

      providerKeys.forEach(key => {
        // TS does not allow use 'symbol' as index type, so we pretend like we don't
        const value = provides[key as string];
        if (value) app.value?.provide(key, value);
      });

      options?.onBeforeMount?.(app.value);

      const container = app.value.mount(document.createElement('div'));
      options?.onMounted?.(
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
