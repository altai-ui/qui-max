import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QColorSvpanelProps {
  hue: number;
  saturation: number;
  value: number;
  isCleared: boolean;
}

export interface QColorSvpanelInstance {
  root: Ref<Nullable<HTMLElement>>;
  rootStyles: ComputedRef<Record<string, string>>;
  cursorStyles: ComputedRef<Record<string, string>>;
  update: () => void;
}
