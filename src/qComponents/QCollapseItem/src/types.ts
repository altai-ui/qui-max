import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QCollapseItemProps {
  title: Nullable<string>;
  name: Nullable<string | number>;
}

export interface QCollapseItemInstance {
  isActive: ComputedRef<boolean>;
  icon: ComputedRef<'q-icon-minus' | 'q-icon-plus'>;
  handleHeaderClick: () => void;
}

export interface QCollapseTransitionInstance {
  on: {
    beforeEnter(el: HTMLElement): void;
    enter(el: HTMLElement): void;
    afterEnter(el: HTMLElement): void;
    beforeLeave(el: HTMLElement): void;
    leave(el: HTMLElement): void;
    afterLeave(el: HTMLElement): void;
  };
}
