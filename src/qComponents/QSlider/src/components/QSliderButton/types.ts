import type { ComputedRef, CSSProperties } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

import type { QSliderPropModelValue, QSliderTooltipMode } from '../../types';

type CssPropertyLeft = CSSProperties['left'];

export type QSliderButtonPropPosition = Nullable<CssPropertyLeft>;
export type QSliderButtonPropPathLeft = Nullable<number>;
export type QSliderButtonPropPathWidth = Nullable<number>;

export interface QSliderButtonProps {
  position: QSliderButtonPropPosition;
  pathLeft: QSliderButtonPropPathLeft;
  pathWidth: QSliderButtonPropPathWidth;
  disabled: boolean;
  tooltipMode: Nullable<QSliderTooltipMode>;
  currentValue: QSliderPropModelValue;
}

export type BtnClasses = ClassValue;

export interface BtnStyles {
  left: CssPropertyLeft;
}

export interface TooltipStyles {
  left: CssPropertyLeft;
}

export interface QSliderButtonInstance {
  btnClasses: ComputedRef<BtnClasses>;
  btnStyles: ComputedRef<BtnStyles>;
  isTooltipHidden: ComputedRef<boolean>;
  tooltipClasses: ComputedRef<ClassValue>;
  tooltipStyles: ComputedRef<TooltipStyles>;
  handleBtnDown: (event: MouseEvent) => void;
}
