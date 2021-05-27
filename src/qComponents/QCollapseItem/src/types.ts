import type { ComputedRef } from 'vue';

export interface QCollapseItemProps {
  title: Nullable<string>;
  name: Nullable<string | number>;
}

export interface QCollapseItemInstance {
  isActive: ComputedRef<boolean>;
  icon: ComputedRef<'q-icon-minus' | 'q-icon-plus'>;
  handleHeaderClick: () => void;
}
