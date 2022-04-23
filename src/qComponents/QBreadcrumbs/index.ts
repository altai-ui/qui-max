import { withInstall } from '../helpers';

import Breadcrumbs from './src/QBreadcrumbs.vue';

export const QBreadcrumbs = /* #__PURE__ */ withInstall(Breadcrumbs);

export type {
  QBreadcrumbsProps,
  QBreadcrumbsPropRoute,
  QBreadcrumbsInstance
} from './src/types';
