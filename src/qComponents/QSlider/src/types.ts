import type { Slots } from 'vue';

import type { Nullable } from '#/helpers';

export type QSliderPropModelValue = Nullable<number | string>
export type QSliderPropFormatTooltip = Nullable<(value: number) => number | string>

export type RootClasses = Record<string, boolean>;
export type RootStyles = { height?: Nullable<string> };

export interface QSliderProps {
  modelValue: QSliderPropModelValue;
  data: string[],
}

export interface QSliderProvider {
  slots: Readonly<Slots>;
}
