import { withInstall } from '../helpers';

import Slider from './src/QSlider.vue';

export const QSlider = /* #__PURE__ */ withInstall(Slider);

export type {
  QSliderProps,
  QSliderPropModelValue,
  QSliderPropData
} from './src/types';
