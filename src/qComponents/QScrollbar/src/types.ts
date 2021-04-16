import { Ref, ComputedRef } from 'vue';

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

export interface QScrollbarInstance {
  wrap: Ref<HTMLElement | null>;
  sizeWidth: Ref<string>;
  sizeHeight: Ref<string>;
  isXBarShown: ComputedRef<boolean>;
  isYBarShown: ComputedRef<boolean>;
  moveX: Ref<number>;
  moveY: Ref<number>;
  classes: ComputedRef<(string | false)[]>;
  wrapClasses: ComputedRef<
    (
      | string
      | {
          [key: string]: boolean;
        }
    )[]
  >;
  handleScroll: () => void;
  update: () => void;
}

export interface Styles {
  [key: string]: string;
}
