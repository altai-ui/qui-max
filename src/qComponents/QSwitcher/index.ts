import { withInstall } from '../helpers';

import Switcher from './src/QSwitcher.vue';

export const QSwitcher = /* #__PURE__ */ withInstall(Switcher);

export type {
  QSwitcherPropModelValue,
  QSwitcherPropActiveValue,
  QSwitcherPropInactiveValue,
  QSwitcherProps,
  QSwitcherInstance
} from './src/types';
