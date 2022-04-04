import type { CSSProperties } from 'vue';
import type { BarMapItem } from './types';

export const BAR_MAP: Record<'vertical' | 'horizontal', BarMapItem> = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
};

export const renderThumbStyle = (
  move: number,
  size: string,
  bar: BarMapItem
): CSSProperties => {
  const style: CSSProperties = {};

  style[bar.size] = size;

  style.transform = `translate${bar.axis}(${move}%)`;

  return style;
};
