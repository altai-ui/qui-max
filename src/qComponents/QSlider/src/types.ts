import type { Ref, Slots, ComputedRef, StyleValue } from 'vue';

import type { Nullable, Optional, ClassValue } from '#/helpers';

type ModelValue = Nullable<string | number | boolean>;
export type QSliderPropModelValue<T extends ModelValue = ModelValue> = T;

type SlotData = Optional<Record<string | number, unknown>>;

export type QSliderPropTooltipMode = 'none' | 'hover' | 'always';

type QSliderData<T> = {
  value: T;
  label?: string;
  style?: StyleValue;
};

export type QSliderPropData<
  T extends ModelValue = ModelValue,
  S extends SlotData = undefined
> = (S extends SlotData
  ? S extends undefined
    ? QSliderData<T>
    : QSliderData<T> & { slotData: S }
  : QSliderData<T>)[];

export interface QSliderProps {
  modelValue: QSliderPropModelValue;
  data: QSliderPropData;
  tooltipMode: Nullable<QSliderPropTooltipMode>;
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
