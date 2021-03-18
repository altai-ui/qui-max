import { h, render } from 'vue';
import type { ComponentPublicInstance } from 'vue';

import QMessageBox from './QMessageBox.vue';
import type { QMessageBoxEvent } from './types';

let currentPromise: {
  resolve: (event: QMessageBoxEvent) => void;
  reject: (event: QMessageBoxEvent) => void;
};

const defaultCallback = ({ action, payload }: QMessageBoxEvent) => {
  if (action === 'confirm') {
    currentPromise.resolve({ action, payload });
  } else if (action === 'cancel' || action === 'close') {
    currentPromise.reject({ action });
  }
};

const Message = (config: any = {}) => {
  const container = document.createElement('div');

  const props = {
    ...config,
    'on-after-leave': () => {
      render(null, container);
    }
  };

  if (props.component && QMessageBox.components) {
    QMessageBox.components.MessageBoxContent = props.component;
  }

  delete props.component;

  const vnode = h(QMessageBox, props);
  render(vnode, container);

  if (container.firstElementChild) {
    document.body.appendChild(container.firstElementChild);
  }

  const instance = vnode.component;
  if (instance) {
    const vm = instance.proxy as ComponentPublicInstance<{
      isComponentUsed: boolean;
      isShown: boolean;
      message: string | null;
      callback: typeof defaultCallback;
    }>;

    vm.isComponentUsed = Boolean(config.component);
    vm.isShown = true;
    vm.callback = defaultCallback;
  }

  return new Promise((resolve, reject) => {
    currentPromise = {
      resolve,
      reject
    };
  });
};

export default Message;
