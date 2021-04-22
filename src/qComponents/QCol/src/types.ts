import { ComputedRef } from 'vue';

export interface QColProps {
  tag: Nullable<string>;
  cols: Nullable<string | number>;
  offset: Nullable<string | number>;
}

export interface QColInstance {
  classes: ComputedRef<Record<string, boolean>>;
}
