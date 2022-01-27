import type { Ref, Slots, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export type QSliderPropModelValue = Nullable<string | number | boolean>;
export interface QSliderPropData {
  value: string | number | boolean;
  label: string;
  style: Record<string, Nullable<string | number>>;
  slotData: Record<string, unknown>;
}

export type RootClasses = Record<string, boolean>;

export interface QSliderProps {
  modelValue: QSliderPropModelValue;
  data: QSliderPropData[];
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
  path: Ref<Nullable<HTMLElement>>;
  state: QSliderState;
  rootClasses: ComputedRef<RootClasses>;
  isDisabled: ComputedRef<boolean>;
  handlePathClick: (event: MouseEvent) => void;
  handleBtnPositionUpdate: (value: number) => void;
  setupPathValues: () => void;
  handleCaptionChange: (value: QSliderPropModelValue) => void;
}
