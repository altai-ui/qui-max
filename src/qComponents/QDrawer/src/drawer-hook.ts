import { App, createApp, getCurrentInstance, nextTick } from 'vue';
import { Optional, UnwrappedInstance } from '#/helpers';
import {
  QDrawerHookOptions,
  QDrawerPlugin,
  QDrawerInstance,
  QDrawerAction,
  QDrawerEvent,
  QDrawerPromise,
  QDrawerOptions,
  QDrawerContent
} from './types';
import { QDrawer } from '@/qComponents';

const createDrawerPlugin = (config?: QDrawerHookOptions): QDrawerPlugin => {
  const drawerPlugin = (
    content: QDrawerContent,
    options?: QDrawerOptions
  ): Promise<QDrawerEvent> => {
    let drawerPromise: QDrawerPromise;
    let app: Optional<App<Element>>;

    const handleDone = ({ action, payload }: QDrawerEvent): void => {
      if (action === QDrawerAction.done) {
        drawerPromise.resolve({ action, payload });
      } else if (action === QDrawerAction.close) {
        drawerPromise.reject({ action, payload });
      }
    };

    // wip
    nextTick(() => {
      app = createApp(QDrawer, {
        ...(options ?? {}),
        content,
        onDone: handleDone
      });

      app.mount(document.createElement('div'));
    });

    return new Promise((resolve, reject) => {
      drawerPromise = { resolve, reject };
    });
  };

  return drawerPlugin;
};

const useDrawer = (options?: QDrawerHookOptions): QDrawerPlugin => {
  const parentInstance = getCurrentInstance();

  const drawer = createDrawerPlugin({
    parentInstance,
    ...options
  });

  return drawer;
};

export { useDrawer, createDrawerPlugin };
export type {
  QDrawerHookOptions,
  QDrawerPlugin,
  QDrawerInstance,
  QDrawerAction,
  QDrawerEvent,
  QDrawerPromise,
  QDrawerOptions,
  QDrawerContent
};
