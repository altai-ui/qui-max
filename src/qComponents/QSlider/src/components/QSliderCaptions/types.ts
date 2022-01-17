import type { VNode } from 'vue';

import type {
  QSliderPropModelValue,
  QSliderDataRow
} from '@/qComponents/QSlider/src/types';

export interface QSliderCaptionsProps {
  modelValue: QSliderPropModelValue;
  data: QSliderDataRow[];
}

export type QSliderCaptionsInstance = () => VNode;
