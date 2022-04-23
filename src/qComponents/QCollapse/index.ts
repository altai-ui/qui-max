import { withInstall } from '../helpers';

import Collapse from './src/QCollapse.vue';

export const QCollapse = /* #__PURE__ */ withInstall(Collapse);

export type {
  QCollapseProps,
  QCollapseProvider,
  QCollapseInstance
} from './src/types';
