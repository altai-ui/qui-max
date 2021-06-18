import type { ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QColProps {
  tag: Nullable<string>;
  cols: Nullable<string | number>;
  offset: Nullable<string | number>;
}

export interface QColInstance {
  classes: ComputedRef<Record<string, boolean>>;
}
