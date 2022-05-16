import type { ComputedRef, CSSProperties } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

import type { QSliderPropModelValue, QSliderTooltipMode } from '../../types';

type CssPropertyLeft = CSSProperties['left'];
type CSSPropertyTransform = CSSProperties['transform'];
export type CSSPropertyDisplay = CSSProperties['display'];

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
  transform: CSSPropertyTransform;
  display?: CSSPropertyDisplay;
}

export interface QSliderButtonInstance {
  btnClasses: ComputedRef<BtnClasses>;
  btnStyles: ComputedRef<BtnStyles>;
  tooltipStyles: ComputedRef<TooltipStyles>;
  isTooltipVisible: ComputedRef<boolean>;
  handleBtnDown: (event: MouseEvent) => void;
}
