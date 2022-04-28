import { withInstall } from '../helpers';

import Switch from './src/QSwitch.vue';

export const QSwitch = /* #__PURE__ */ withInstall(Switch);

export type {
  QSwitchPropModelValue,
  QSwitchPropActiveValue,
  QSwitchPropInactiveValue,
  QSwitchProps,
  QSwitchInstance
} from './src/types';
