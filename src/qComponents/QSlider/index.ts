import { withInstall } from '../helpers';

import Slider from './src/QSlider.vue';

export const QSlider = withInstall(Slider);

export type {
  QSliderProps,
  QSliderPropModelValue,
  QSliderPropData
} from './src/types';
