import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QColorHueSliderPropHSVAModel {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
}

export interface QColorHueSliderProps {
  hsvaModel: QColorHueSliderPropHSVAModel;
}

export interface QColorHueSliderInstance {
  root: Ref<Nullable<HTMLElement>>;
  thumb: Ref<Nullable<HTMLElement>>;
  bar: Ref<Nullable<HTMLElement>>;
  thumbStyles: ComputedRef<Record<string, string>>;
  handleBarClick: (event: MouseEvent) => void;
  update: () => void;
}
