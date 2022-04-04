import type { Ref, ComputedRef, CSSProperties } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

export interface BarMapItem {
  offset: 'offsetHeight' | 'offsetWidth';
  scroll: 'scrollTop' | 'scrollLeft';
  scrollSize: 'scrollHeight' | 'scrollWidth';
  size: 'height' | 'width';
  key: 'vertical' | 'horizontal';
  axis: 'Y' | 'X';
  client: 'clientY' | 'clientX';
  direction: 'top' | 'left';
}

export type Types = 'vertical' | 'horizontal';

export type QBarPropType = Types;
export type QBarPropTheme = Nullable<string>;
export type QBarPropMove = Nullable<number>;

export interface QBarProps {
  type: QBarPropType;
  theme: QBarPropTheme;
  size: string;
  move: QBarPropMove;
}

export interface QBarInstance {
  root: Ref<Nullable<HTMLElement>>;
  bar: ComputedRef<BarMapItem>;
  thumb: Ref<Nullable<HTMLElement>>;
  rootClasses: ComputedRef<ClassValue>;
  thumbClasses: ComputedRef<ClassValue>;
  thumbStyles: ComputedRef<CSSProperties>;
  handleThumbClick: (e: MouseEvent) => void;
  handleTrackerClick: (e: MouseEvent) => void;
  scrollToPx: (px: number) => void;
}
