import { Ref, ComputedRef } from 'vue';

export interface QScrollbarProvider {
  wrap: Ref<Nullable<HTMLElement>>;
}

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

export interface QScrollbarInstance {
  wrap: Ref<HTMLElement | null>;
  sizeWidth: Ref<string>;
  sizeHeight: Ref<string>;
  isXBarShown: ComputedRef<boolean>;
  isYBarShown: ComputedRef<boolean>;
  moveX: Ref<number>;
  moveY: Ref<number>;
  classes: ComputedRef<Record<string, boolean>>;
  wrapClasses: ComputedRef<QScrollbarPropWrapClass[]>;
  handleScroll: () => void;
  update: () => void;
}

export type QBarPropType = 'vertical' | 'horizontal';

export interface QBarProps {
  type: QBarPropType;
  theme: Nullable<string>;
  size: Nullable<string>;
  move: Nullable<number>;
}

export interface QBarInstance {
  root: Ref<Nullable<HTMLElement>>;
  bar: ComputedRef<BarMapItem>;
  thumb: Ref<Nullable<HTMLElement>>;
  classes: ComputedRef<Record<string, boolean>>;
  thumbClasses: ComputedRef<Record<string, boolean>>;
  thumbStyles: ComputedRef<Record<string, string | number>>;
  handleThumbClick: (e: MouseEvent) => void;
  handleTrackerClick: (e: MouseEvent) => void;
  scrollToPx: (px: number) => void;
}

type Classes = Record<string, boolean>;
export type Styles = Record<string, string | number>;

export type QScrollbarPropScrollTo = Nullable<HTMLElement>;
export type QScrollbarPropTheme = 'primary' | 'secondary';
export type QScrollbarPropWrapClass = Nullable<string | Classes | Classes[]>;

export interface QScrollbarProps {
  scrollTo: QScrollbarPropScrollTo;
  visible: Nullable<boolean>;
  theme: QScrollbarPropTheme;
  wrapClass: QScrollbarPropWrapClass;
  viewTag: Nullable<string>;
  viewClass: Nullable<string | Classes | Classes[]>;
  viewStyle: Nullable<string | Styles | Styles[]>;
  noresize: Nullable<boolean>;
}

export interface QScrollbarInstance {
  wrap: Ref<Nullable<HTMLElement>>;
  sizeWidth: Ref<string>;
  sizeHeight: Ref<string>;
  isXBarShown: ComputedRef<boolean>;
  isYBarShown: ComputedRef<boolean>;
  moveX: Ref<number>;
  moveY: Ref<number>;
  classes: ComputedRef<Record<string, boolean>>;
  wrapClasses: ComputedRef<QScrollbarPropWrapClass[]>;
  handleScroll: () => void;
  update: () => void;
}
