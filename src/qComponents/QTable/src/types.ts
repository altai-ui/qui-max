import type { Ref, ComputedRef } from 'vue';

export interface StickyConfig {
  isStickable: ComputedRef<boolean>;
  isSticked: Ref<boolean>;
  position: ComputedRef<string>;
  offset: ComputedRef<number>;
}
