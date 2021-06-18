import type { Ref } from 'vue';

import type { Nullable } from '#/helpers';

export interface UseResizeListenerResult {
  observedEntry: Ref<Nullable<ResizeObserverEntry>>;
  isTracking: Ref<boolean>;
  start: () => void;
  stop: () => void;
}
