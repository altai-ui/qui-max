import type { Ref, Slots, ComputedRef, StyleValue } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

type ModelValue = Nullable<string | number | boolean>;
export type QSliderPropModelValue<T extends ModelValue = ModelValue> = T;

type SlotData = Record<string | number, unknown>;

interface QSliderData<T, S> {
  value: T;
  label?: string;
  style?: StyleValue;
  slotData?: S;
}

export type QSliderPropData<
  T extends ModelValue = ModelValue,
  S = SlotData
> = QSliderData<T, keyof S extends string | number ? S : never>[];

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

export type RootClasses = ClassValue;

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
