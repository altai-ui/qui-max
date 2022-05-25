import { withInstall } from '../helpers';

import CheckboxGroup from './src/QCheckboxGroup.vue';

export const QCheckboxGroup = withInstall(CheckboxGroup);

export type {
  QCheckboxGroupProps,
  QCheckboxGroupProvider,
  QCheckboxGroupInstance
} from './src/types';
