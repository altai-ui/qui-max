import { watch } from 'vue';
import { isServer } from '@/qComponents/constants/isServer';
import type { Optional } from '#/helpers';

import { unrefElement, tryOnScopeDispose } from '@/qComponents/hooks/helpers';
import type { MaybeElementRef } from '@/qComponents/hooks/types';

import type { ResizeObserver } from './ResizeObserver';

import type {
  UseResizeObserverResult,
  ResizeObserverCallback,
  ResizeObserverOptions
} from './types';

const defaultWindow = isServer ? undefined : window;

export function useResizeObserver(
  target: MaybeElementRef,
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions = {}
): UseResizeObserverResult {
  const { window = defaultWindow, ...observerOptions } = options;
  let observer: Optional<ResizeObserver>;
  const isSupported = window && 'ResizeObserver' in window;

  const cleanup = (): void => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const stopWatch = watch(
    () => unrefElement(target),
    el => {
      cleanup();

      if (isSupported && window && el) {
        // @ts-expect-error missing type
        observer = new window.ResizeObserver(callback);
        observer?.observe(el, observerOptions);
      }
    },
    {
      immediate: true,
      flush: 'post'
    }
  );

  const stop = (): void => {
    cleanup();
    stopWatch();
  };

  tryOnScopeDispose(stop);

  return {
    isSupported,
    stop
  };
}

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>;
