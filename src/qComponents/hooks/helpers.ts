import { getCurrentInstance, onUnmounted } from 'vue';

type Fn = () => void;

/**
 * Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 */

export const tryOnUnmounted = (fn: Fn): void => {
  if (getCurrentInstance()) onUnmounted(fn);
};
