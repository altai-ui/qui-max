import type { VNode } from 'vue';
import type { Nullable } from '#/helpers';

import type { QSliderPropModelValue, QSliderPropData } from '../../types';

export interface QSliderCaptionsProps {
  modelValue: QSliderPropModelValue;
  data: QSliderPropData[];
  disabled: boolean;
}

export interface PreparedData {
  value: string | number | boolean;
  label?: string;
  style?: Record<string, Nullable<string | number>>;
  slot?: VNode[];
}

export type QSliderCaptionsInstance = () => VNode;
