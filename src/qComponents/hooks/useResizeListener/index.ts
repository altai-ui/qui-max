import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

import type { Nullable } from '#/helpers';

import type { UseResizeListenerResult } from './types';

export const useResizeListener = (
  elRef: Ref<Nullable<HTMLElement>>,
  runOnMount = true
): UseResizeListenerResult => {
  const isTracking = ref<boolean>(false);
  const observedEntry: Ref<Nullable<ResizeObserverEntry>> = ref(null);
  let observer: Nullable<ResizeObserver> = null;

  const handleObserver = (entries: ResizeObserverEntry[]): void => {
    observedEntry.value = entries[0];
  };

  const start = (): void => {
    if (!elRef.value || isTracking.value) return;

    observer = new ResizeObserver(handleObserver);
    observer.observe(elRef.value);

    isTracking.value = true;
  };

  const stop = (): void => {
    if (!isTracking.value || !observer) return;

    observer.disconnect();

    isTracking.value = false;
  };

  onMounted(() => {
    if (runOnMount) start();
  });

  onUnmounted(stop);

  return {
    observedEntry,
    isTracking,
    start,
    stop
  };
};
