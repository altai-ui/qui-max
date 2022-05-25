import type { Ref, ComputedRef, StyleValue } from 'vue';

import type { Nullable, UnwrappedInstance, ClassValue } from '#/helpers';

import type { QBarInstance } from './components/QBar';

export type QScrollbarPropScrollTo = Nullable<HTMLElement>;
export type QScrollbarPropVisible = Nullable<boolean>;
export type QScrollbarPropTheme = Nullable<'primary' | 'secondary'>;
export type QScrollbarPropWrapClass = Nullable<ClassValue>;
export type QScrollbarPropViewTag = Nullable<string>;
export type QScrollbarPropViewClass = Nullable<ClassValue>;
export type QScrollbarPropViewStyle = Nullable<StyleValue>;
export type QScrollbarPropNoResize = Nullable<boolean>;

export interface QScrollbarProps {
  scrollTo: QScrollbarPropScrollTo;
  visible: QScrollbarPropVisible;
  theme: QScrollbarPropTheme;
  wrapClass: QScrollbarPropWrapClass;
  viewTag: QScrollbarPropViewTag;
  viewClass: QScrollbarPropViewClass;
  viewStyle: QScrollbarPropViewStyle;
  noresize: QScrollbarPropNoResize;
}

export interface QScrollbarProvider {
  wrap: Ref<Nullable<HTMLElement>>;
  sizeWidth: Ref<string>;
  moveXInPx: Ref<number>;
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
  rootClasses: ComputedRef<ClassValue>;
  wrapClasses: ComputedRef<QScrollbarPropWrapClass[]>;
  themeValue: ComputedRef<string>;
  handleScroll: () => void;
  update: () => void;
}
