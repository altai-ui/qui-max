import { withInstall } from '../helpers';

import Select from './src/QSelect.vue';

export const QSelect = withInstall(Select);

export type {
  QSelectPropModelValue,
  NewOption,
  QSelectProvider,
  QSelectState,
  QSelectProps
} from './src/types';
