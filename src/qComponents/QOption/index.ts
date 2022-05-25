import { withInstall } from '../helpers';

import Option from './src/QOption.vue';

export const QOption = withInstall(Option);

export type {
  QOptionInstance,
  QOptionPropValue,
  QOptionModel,
  QOptionProps
} from './src/types';
