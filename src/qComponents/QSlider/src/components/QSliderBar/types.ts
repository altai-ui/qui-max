import { ComputedRef } from 'vue';
import type { Nullable } from '#/helpers';

export interface QSliderBarInstance {
  barStyle: ComputedRef<{
    width?: string,
    height?: string,
    bottom?: string,
    left?: string,
  }>;
}

export interface QSliderBarProps {
  startValue: Nullable<number | Date>;
  minValue: number;
  maxValue: number;
}
