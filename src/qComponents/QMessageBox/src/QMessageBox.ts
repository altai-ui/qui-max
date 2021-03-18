import { h, render, nextTick, defineComponent } from 'vue';
import type { ComponentPublicInstance } from 'vue';

import QMessageBox from './QMessageBox.vue';

type QMessageBoxAction = 'confirm' | 'cancel' | 'close';

// interface QMessageBoxResult {
//   action: QMessageBoxAction;
//   payload?: any;
// }

let currentPromise: any;

const defaultCallback = ({
  action,
  payload
}: {
  action: QMessageBoxAction;
  payload?: any;
}) => {
  if (action === 'confirm') {
    currentPromise.resolve({ action, payload });
  } else if (action === 'cancel' || action === 'close') {
    currentPromise.reject({ action });
  }
};

const initInstance = (config: any) => {
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

  return vnode.component;
};

const Message = (config = {}) => {
  const instance = initInstance(config);
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
