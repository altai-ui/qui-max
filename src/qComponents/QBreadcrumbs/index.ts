import { App } from 'vue';

import QBreadcrumbs from './src/QBreadcrumbs.vue';

/* istanbul ignore next */
QBreadcrumbs.install = (app: App): void => {
  app.component(QBreadcrumbs.name, QBreadcrumbs);
};

export default QBreadcrumbs;
