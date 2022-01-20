import type { Optional } from '#/helpers';

export interface ConfigurableWindow {
  window?: Window;
}

export interface ResizeObserverSize {
  readonly inlineSize: number;
  readonly blockSize: number;
}

export interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize?: ReadonlyArray<ResizeObserverSize>;
  readonly contentBoxSize?: ReadonlyArray<ResizeObserverSize>;
  readonly devicePixelContentBoxSize?: ReadonlyArray<ResizeObserverSize>;
}

export type ResizeObserverCallback = (
  entries: ReadonlyArray<ResizeObserverEntry>,
  observer: ResizeObserver
) => void;

export interface ResizeObserverOptions extends ConfigurableWindow {
  box?: 'content-box' | 'border-box';
}

export interface UseResizeObserverResult {
  isSupported: Optional<boolean>;
  stop: () => void;
}
