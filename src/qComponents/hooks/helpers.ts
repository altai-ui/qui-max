import {
  getCurrentInstance,
  getCurrentScope,
  onScopeDispose,
  onUnmounted,
  unref
} from 'vue';
import { Fn, MaybeElementRef, VueInstance } from './types';

/**
 * Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 */
export const tryOnUnmounted = (fn: Fn): void => {
  if (getCurrentInstance()) onUnmounted(fn);
};

export function unrefElement(
  elRef: MaybeElementRef
): HTMLElement | SVGElement | undefined {
  const plain = unref(elRef);
  return (plain as VueInstance)?.$el ?? plain;
}

export const tryOnScopeDispose = (fn: Fn): boolean => {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }

  return false;
};
