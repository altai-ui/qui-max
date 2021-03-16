/* eslint-disable no-underscore-dangle */
import ResizeObserver from 'resize-observer-polyfill';

export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return function(element, event, handler) {
    if (element && event && handler) {
      element.attachEvent(`on${event}`, handler);
    }
  };
})();

/* istanbul ignore next */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return function(element, event, handler) {
    if (element && event) {
      element.detachEvent(`on${event}`, handler);
    }
  };
})();

const resizeHandler = entries => {
  Object.values(entries).forEach(entry => {
    const listeners = entry.target.__resizeListeners__ ?? [];
    if (listeners.length) {
      listeners.forEach(fn => {
        fn();
      });
    }
  });
};

export const addResizeListener = (element, fn) => {
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

export const removeResizeListener = (element, fn) => {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(
    element.__resizeListeners__.indexOf(fn),
    1
  );
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
};

export const randId = prefix =>
  Math.random()
    .toString(36)
    .replace('0.', prefix ?? '');
