import type { Ref, ComputedRef, StyleValue } from 'vue';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import type { QBarInstance } from './components/QBar/types';

export interface QScrollbarProvider {
  wrap: Ref<Nullable<HTMLElement>>;
  sizeWidth: Ref<string>;
  moveXInPx: Ref<number>;
}

export type Classes = Record<string, boolean>;

export type QScrollbarPropScrollTo = Nullable<HTMLElement>;
export type QScrollbarPropTheme = 'primary' | 'secondary';
export type QScrollbarPropWrapClass = Nullable<string | Classes | Classes[]>;
export type QScrollbarPropViewClass = Nullable<string | Classes | Classes[]>;
export type QScrollbarPropViewStyle = Nullable<StyleValue>;

export interface QScrollbarProps {
  scrollTo: QScrollbarPropScrollTo;
  visible: boolean;
  theme: QScrollbarPropTheme;
  wrapClass: QScrollbarPropWrapClass;
  viewTag: string;
  viewClass: QScrollbarPropViewClass;
  viewStyle: QScrollbarPropViewStyle;
  noresize: boolean;
}

export interface QScrollbarInstance {
  root: Ref<Nullable<HTMLElement>>;
  wrap: Ref<Nullable<HTMLElement>>;
  view: Ref<Nullable<HTMLElement>>;
  ybar: Ref<UnwrappedInstance<QBarInstance>>;
  sizeWidth: Ref<string>;
  sizeHeight: Ref<string>;
  isXBarShown: ComputedRef<boolean>;
  isYBarShown: ComputedRef<boolean>;
  moveX: Ref<number>;
  moveY: Ref<number>;
  rootClasses: ComputedRef<Classes>;
  wrapClasses: ComputedRef<QScrollbarPropWrapClass[]>;
  handleScroll: () => void;
  update: () => void;
}
