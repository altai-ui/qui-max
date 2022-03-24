import type { ComputedRef } from 'vue';
import type { Nullable } from '#/helpers';

export type BtnClasses = Record<string, boolean>;

export type BtnStyles = Record<string, Nullable<string | number>>;

export interface QSliderButtonProps {
  position: Nullable<string>;
  pathLeft: Nullable<number>;
  pathWidth: Nullable<number>;
  disabled: boolean;
}

export interface QSliderButtonInstance {
  btnClasses: ComputedRef<BtnClasses>;
  btnStyles: ComputedRef<BtnStyles>;
  handleBtnDown: (event: MouseEvent) => void;
}
