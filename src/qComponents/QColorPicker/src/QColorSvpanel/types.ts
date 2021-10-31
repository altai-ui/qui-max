import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QColorSvpanelPropHSVAModel {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
}

export interface QColorSvpanelProps {
  hsvaModel: QColorSvpanelPropHSVAModel;
  isCursorShown: boolean;
}

export interface QColorSvpanelInstance {
  root: Ref<Nullable<HTMLElement>>;
  rootStyles: ComputedRef<Record<string, string>>;
  cursorStyles: ComputedRef<Record<string, string | number>>;
  update: () => void;
}
