import type { ComputedRef } from 'vue';
import type { Nullable } from '#/helpers';

export type BarStyle = { width: Nullable<string> };

export interface QSliderBarProps {
  size: Nullable<string>;
}

export interface QSliderBarInstance {
  barStyle: ComputedRef<BarStyle>;
}
