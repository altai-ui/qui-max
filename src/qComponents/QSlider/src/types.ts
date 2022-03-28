import type { Ref, Slots, ComputedRef, StyleValue } from 'vue';

import type { Classes } from '@/qComponents/types';
import type { Nullable } from '#/helpers';

type ModelValue = string | number | boolean;

export type QSliderPropModelValue<
  T extends Nullable<ModelValue> = Nullable<ModelValue>
> = T;

interface QSliderData {
  value: ModelValue;
  label?: string;
  style?: StyleValue;
  slotData?: Record<string, unknown>;
}

export type QSliderPropData = QSliderData[];

export interface QSliderProps {
  modelValue: QSliderPropModelValue;
  data: QSliderPropData;
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

export type RootClasses = Classes;

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
