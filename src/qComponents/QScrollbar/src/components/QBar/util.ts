import type { CSSProperties } from 'vue';

import type { BarMapItem } from './types';

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
