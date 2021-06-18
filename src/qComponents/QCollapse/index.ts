import type { App } from 'vue';

import type { SFCWithInstall } from '#/helpers';

import QCollapse from './src/QCollapse.vue';

/* istanbul ignore next */
QCollapse.install = (app: App): void => {
  app.component(QCollapse.name, QCollapse);
};

export type {
  QCollapseProps,
  QCollapseProvider,
  QCollapseInstance
} from './src/types';
export default QCollapse as SFCWithInstall<App, typeof QCollapse>;
