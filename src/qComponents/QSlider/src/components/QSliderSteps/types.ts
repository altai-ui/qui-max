import { ComputedRef } from "vue";

export interface GetStopStyle {
  bottom?: string;
  left?: string;
}

export interface QSliderStepsInstance {
  getStopStyle: (position: number) => GetStopStyle;
}
