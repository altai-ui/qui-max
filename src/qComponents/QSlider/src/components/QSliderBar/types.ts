import type { ComputedRef, CSSProperties } from 'vue';
import type { Nullable } from '#/helpers';

type CssPropertyWidth = CSSProperties['width'];

export type QSliderBarPropSize = Nullable<CssPropertyWidth>;

export interface QSliderBarProps {
  size: QSliderBarPropSize;
}

export interface BarStyle {
  width: CssPropertyWidth;
}

export interface QSliderBarInstance {
  barStyle: ComputedRef<BarStyle>;
}
