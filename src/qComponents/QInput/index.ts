import { withInstall } from '../helpers';

import Input from './src/QInput.vue';

export const QInput = withInstall(Input);

export type {
  QInputProps,
  QInputInstance,
  QInputPropModelValue,
  QInputPropDisabled,
  QInputPropShowSymbolLimit,
  QInputPropValidateEvent,
  QInputPropSuffixIcon,
  QInputPropClearable,
  QInputPropPasswordSwitch,
  QInputPropRootClass
} from './src/types';
