import { h, render } from 'vue';

import QMessageBox from './QMessageBox.vue';

type QMessageBoxAction = 'confirm' | 'cancel' | 'close';

interface QMessageBoxResult {
  action: QMessageBoxAction;
  payload?: any;
}

let currentPromise: PromiseConstructor<QMessageBoxResult>;

const defaultCallback = ({ action, payload }: QMessageBoxResult) => {
  if (action === 'confirm') {
    currentPromise.resolve({ action, payload });
  } else if (action === 'cancel' || action === 'close') {
    currentPromise.reject({ action });
  }
};

const initInstance = (props: any, container: HTMLElement) => {
  const vnode = h(QMessageBox, props);

  render(vnode, container);
  if (container.firstElementChild) {
    document.body.appendChild(container.firstElementChild);
  }

  return vnode.component;
};

const Message = (config = {}) => {
  const MessageBox = Vue.extend({
    components: {
      MessageBoxContent: config.component
    },
    ...QMessageBox
  });

  const instance = new MessageBox();

  Object.entries(config).forEach(([key, value]) => {
    instance[key] = value;
  });

  if (!instance.zIndex) {
    instance.zIndex = Vue.prototype.$Q?.zIndex ?? 2000;
  }

  instance.callback = defaultCallback;

  instance.isComponentUsed = Boolean(config.component);

  if (
    config.message &&
    !instance.isComponentUsed &&
    Object.prototype.hasOwnProperty.call(config.message, 'componentOptions')
  ) {
    instance.$slots.default = [config.message];
    instance.message = null;
  } else {
    delete instance.$slots.default;
  }

  document.body.appendChild(instance.$mount().$el);

  Vue.nextTick(() => {
    instance.isShown = true;
  });

  return new Promise((resolve, reject) => {
    currentPromise = {
      resolve,
      reject
    };
  });
};

export default Message;
