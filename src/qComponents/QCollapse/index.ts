import { withInstall } from '../helpers';

import Collapse from './src/QCollapse.vue';

export const QCollapse = withInstall(Collapse);

export type {
  QCollapseProps,
  QCollapseProvider,
  QCollapseInstance
} from './src/types';
