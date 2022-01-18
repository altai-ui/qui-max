import type { Ref, Slots, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export type QSliderPropModelValue = Nullable<string>;
export type QSliderDataRow = Record<string, unknown>;

export type RootClasses = Record<string, boolean>;

export interface QSliderProps {
  modelValue: QSliderPropModelValue;
  data: QSliderDataRow[];
  disabled: boolean;
}

export interface QSliderState {
  btnPosition: Nullable<string>;
  pathLeft: Nullable<number>;
  pathWidth: Nullable<number>;
}

export interface QSliderProvider {
  slots: Readonly<Slots>;
}

export interface QSliderInstance {
  state: QSliderState;
  path: Ref<Nullable<HTMLElement>>;
  rootClasses: ComputedRef<RootClasses>;
  handlePathClick: (event: MouseEvent) => void;
  handleBtnPositionUpdate: (value: number) => void;
  handleCaptionChange: (value: QSliderPropModelValue) => void;
}
