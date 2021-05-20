import { Ref, ComputedRef } from 'vue';

export interface QCascaderRowProps {
  uniqueId: string;
  value: string | number;
  label: string;
  hasChildren: boolean;
  disabled: Nullable<boolean>;
}

export interface QCascaderRowInstance {
  checkbox: Ref<HTMLElement | null>;
  rootClasses: ComputedRef<Record<string, boolean>>;
  isIconShown: ComputedRef<boolean>;
  iconClasses: ComputedRef<Record<string, boolean>>;
}
