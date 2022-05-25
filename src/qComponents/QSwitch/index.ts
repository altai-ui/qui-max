import { withInstall } from '../helpers';

import Switch from './src/QSwitch.vue';

export const QSwitch = withInstall(Switch);

export type {
  QSwitchPropModelValue,
  QSwitchPropActiveValue,
  QSwitchPropInactiveValue,
  QSwitchProps
} from './src/types';
