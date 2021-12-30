import type { QSliderPropModelValue } from '@/qComponents/QSlider/src/types';

export interface State {
  isDragging: boolean;
}

export type BtnClasses = Record<string, boolean>

export interface BtnPositionStyles {
  bottom?: string;
  left?: string;
}
