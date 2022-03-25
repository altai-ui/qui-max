import type { ComputedRef, CSSProperties } from 'vue';
import type { Nullable } from '#/helpers';

type CssPropertyWidth = CSSProperties['width'];

export type QSliderBarPropWidth = Nullable<CssPropertyWidth>;

export interface QSliderBarProps {
  width: QSliderBarPropWidth;
}

export interface BarStyle {
  width: CssPropertyWidth;
}

export interface QSliderBarInstance {
  barStyle: ComputedRef<BarStyle>;
}
