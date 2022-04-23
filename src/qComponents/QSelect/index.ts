import { withInstall } from '../helpers';

import Select from './src/QSelect.vue';

export const QSelect = /* #__PURE__ */ withInstall(Select);

export type {
  QSelectPropModelValue,
  NewOption,
  QSelectProvider,
  QSelectState,
  QSelectProps
} from './src/types';
