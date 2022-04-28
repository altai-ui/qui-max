import { withInstall } from '../helpers';

import RadioGroup from './src/QRadioGroup.vue';

export const QRadioGroup = withInstall(RadioGroup);

export type {
  QRadioGroupProps,
  QRadioGroupProvider,
  QRadioGroupInstance
} from './src/types';
