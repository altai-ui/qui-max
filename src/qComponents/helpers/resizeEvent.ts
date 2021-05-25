/* eslint-disable no-underscore-dangle */
import ResizeObserver from 'resize-observer-polyfill';

export type ResizableElement = HTMLElement & {
  __resizeListeners__: Array<(...args: unknown[]) => unknown>;
  __ro__: ResizeObserver;
};

/* istanbul ignore next */
const resizeHandler = function (entries: ResizeObserverEntry[]): void {
  Object.values(entries).forEach(entry => {
    const listeners =
      (entry.target as ResizableElement).__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach(fn => {
        fn();
      });
    }
  });
};

/* istanbul ignore next */
export const addResizeListener = function (
  element: Nullable<ResizableElement>,
  fn: (...args: unknown[]) => unknown
): void {
  if (!element) return;
  if (!element.__resizeListeners__) {
    // eslint-disable-next-line no-param-reassign
    element.__resizeListeners__ = [];
    // eslint-disable-next-line no-param-reassign
    element.__ro__ = new ResizeObserver(resizeHandler);
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
export const removeResizeListener = function (
  element: Nullable<ResizableElement>,
  fn: (...args: unknown[]) => unknown
): void {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(
    element.__resizeListeners__.indexOf(fn),
    1
  );
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
};
