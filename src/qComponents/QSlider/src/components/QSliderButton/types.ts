import { ComputedRef } from 'vue';
import { Nullable } from '#/helpers';

export interface QSliderButtonState {
  isDragging: boolean;
}

export interface BtnStyles {
  left: Nullable<string>;
}

export interface QSliderButtonProps {
  position: Nullable<string>;
  pathLeft: Nullable<number>;
  pathWidth: Nullable<number>;
}

export interface QSliderButtonInstance {
  btnStyles: ComputedRef<BtnStyles>;
  handleBtnDown: (event: MouseEvent) => void;
}
