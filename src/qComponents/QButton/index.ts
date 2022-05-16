import { withInstall } from '../helpers';

import Button from './src/QButton.vue';

export const QButton = withInstall(Button);

export type {
  QButtonProps,
  QButtonPropType,
  QButtonPropTheme,
  QButtonPropSize,
  QButtonPropIcon,
  QButtonPropNativeType,
  QButtonPropLoading,
  QButtonPropDisabled,
  QButtonPropAutofocus,
  QButtonPropCircle,
  QButtonPropFullWidth
} from './src/types';
