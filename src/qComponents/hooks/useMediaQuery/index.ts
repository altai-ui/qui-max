import { ref, Ref } from 'vue';

import { tryOnUnmounted } from '../helpers';

/**
 * Reactive Media Query.
 *
 * @param query
 * @param options
 */

export const useMediaQuery = (query: string): Ref<boolean> => {
  if (!window) return ref(false);

  const mediaQuery = window.matchMedia(query);
  const matches = ref(mediaQuery.matches);

  const handler = (event: MediaQueryListEvent): void => {
    matches.value = event.matches;
  };

  mediaQuery.addEventListener('change', handler);

  tryOnUnmounted(() => mediaQuery.removeEventListener('change', handler));

  return matches;
};
