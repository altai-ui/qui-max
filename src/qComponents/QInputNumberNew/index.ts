import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QInputNumberNew from './src/QInputNumberNew.vue';

/* istanbul ignore next */
QInputNumberNew.install = (app: App): void => {
  app.component(QInputNumberNew.name, QInputNumberNew);
};

export type {
  QInputNumberNewProps,
  QInputNumberNewInstance
} from './src/types';
export default QInputNumberNew as SFCWithInstall<App, typeof QInputNumberNew>;
