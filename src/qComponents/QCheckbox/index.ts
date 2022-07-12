import { withInstall } from '../helpers';

import Checkbox from './src/QCheckbox.vue';

export const QCheckbox = withInstall(Checkbox);

export type {
  QCheckboxProps,
  QCheckboxInstance,
  QCheckboxPropModelValue,
  QCheckboxPropLabel,
  QCheckboxPropIndeterminate,
  QCheckboxPropDisabled,
  QCheckboxPropRootTag,
  QCheckboxPropValidateEvent,
  QCheckboxPropLabelSize
} from './src/types';
