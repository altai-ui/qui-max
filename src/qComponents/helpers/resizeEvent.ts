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
  element: Nullable<HTMLElement | undefined>,
  fn: (...args: unknown[]) => unknown
): void {
  const el = element as Nullable<ResizableElement | undefined>;

  if (!el) return;
  if (!el.__resizeListeners__) {
    // eslint-disable-next-line no-param-reassign
    el.__resizeListeners__ = [];
    // eslint-disable-next-line no-param-reassign
    el.__ro__ = new ResizeObserver(resizeHandler);
    el.__ro__.observe(el);
  }
  el.__resizeListeners__.push(fn);
};

/* istanbul ignore next */
export const removeResizeListener = function (
  element: Nullable<HTMLElement | undefined>,
  fn: (...args: unknown[]) => unknown
): void {
  const el = element as Nullable<ResizableElement | undefined>;

  if (!el || !el.__resizeListeners__) return;
  el.__resizeListeners__.splice(el.__resizeListeners__.indexOf(fn), 1);
  if (!el.__resizeListeners__.length) {
    el.__ro__.disconnect();
  }
};
