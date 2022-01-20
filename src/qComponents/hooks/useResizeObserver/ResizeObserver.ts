import {
  ResizeObserverCallback,
  ResizeObserverOptions
} from '@/qComponents/hooks/useResizeObserver/types';

export declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  disconnect(): void;
  observe(target: Element, options?: ResizeObserverOptions): void;
  unobserve(target: Element): void;
}
