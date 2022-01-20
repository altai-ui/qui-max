import type { Ref } from 'vue';

export interface UseElementBoundingResult {
  height: Ref<number>;
  bottom: Ref<number>;
  left: Ref<number>;
  right: Ref<number>;
  top: Ref<number>;
  width: Ref<number>;
  x: Ref<number>;
  y: Ref<number>;
  update: () => void;
}
