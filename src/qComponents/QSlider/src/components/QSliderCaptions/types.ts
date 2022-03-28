import type { VNode, StyleValue } from 'vue';

import type { QSliderPropModelValue, QSliderPropData } from '../../types';

export interface QSliderCaptionsProps {
  modelValue: QSliderPropModelValue;
  data: QSliderPropData;
  disabled: boolean;
}

export interface PreparedData {
  value: QSliderPropModelValue;
  label?: string;
  style?: StyleValue;
  slot?: VNode[];
}

export type QSliderCaptionsInstance = () => VNode;
