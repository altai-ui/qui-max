import { withInstall } from '../helpers';

import Breadcrumbs from './src/QBreadcrumbs.vue';

export const QBreadcrumbs = withInstall(Breadcrumbs);

export type {
  QBreadcrumbsProps,
  QBreadcrumbsPropRoute,
  QBreadcrumbsInstance
} from './src/types';
