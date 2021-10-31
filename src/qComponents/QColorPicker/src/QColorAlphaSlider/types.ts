import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QColorAlphaSliderPropHSVAModel {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
}

export interface QColorAlphaSliderProps {
  hsvaModel: QColorAlphaSliderPropHSVAModel;
}

export interface QColorAlphaSliderInstance {
  root: Ref<Nullable<HTMLElement>>;
  thumb: Ref<Nullable<HTMLElement>>;
  bar: Ref<Nullable<HTMLElement>>;
  barStyles: ComputedRef<Record<string, string>>;
  thumbStyles: ComputedRef<Record<string, string>>;
  handleBarClick: (event: MouseEvent) => void;
  update: () => void;
}
