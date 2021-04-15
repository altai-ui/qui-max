import { Ref } from 'vue';

export interface QScrollbarProvider {
  wrap: Ref<HTMLElement | null>;
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

export type QBarPropType = 'vertical' | 'horizontal';

export interface QBarProps {
  type: QBarPropType;
  theme: Nullable<string>;
  size: Nullable<string>;
  move: Nullable<number>;
}

type Classes = Record<string, boolean>;
export type Styles = Record<string, string | number>;

export type QScrollbarPropScrollTo = Nullable<HTMLElement>;
export type QScrollbarPropTheme = 'primary' | 'secondary';

export interface QScrollbarProps {
  scrollTo: QScrollbarPropScrollTo;
  visible: Nullable<boolean>;
  theme: QScrollbarPropTheme;
  wrapClass: Nullable<string | Classes | Classes[]>;
  viewTag: Nullable<string>;
  viewClass: Nullable<string | Classes | Classes[]>;
  viewStyle: Nullable<string | Styles | Styles[]>;
  noresize: Nullable<boolean>;
}
