import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QColorSvpanelInstance {
  root: Ref<Nullable<HTMLElement>>;
  rootStyles: ComputedRef<Record<string, string>>;
  cursorStyles: ComputedRef<Record<string, string | number>>;
  update: () => void;
}
