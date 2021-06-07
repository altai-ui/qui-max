import type { App } from 'vue';

import QBreadcrumbs from './src/QBreadcrumbs.vue';

/* istanbul ignore next */
QBreadcrumbs.install = (app: App): void => {
  app.component(QBreadcrumbs.name, QBreadcrumbs);
};

export type {
  QBreadcrumbsProps,
  QBreadcrumbsPropRoute,
  QBreadcrumbsInstance
} from './src/types';
export default QBreadcrumbs as SFCWithInstall<App, typeof QBreadcrumbs>;
