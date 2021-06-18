import type { Ref } from 'vue';

export interface UseResizeListenerResult {
  observedEntry: Ref<Nullable<ResizeObserverEntry>>;
  isTracking: Ref<boolean>;
  start: () => void;
  stop: () => void;
}
