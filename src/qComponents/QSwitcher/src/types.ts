import type { ComputedRef } from 'vue';
import type { Nullable, ClassValue } from '#/helpers';

export type QSwitcherPropModelValue = Nullable<boolean>;

export interface QSwitcherInstance {
  classes: ComputedRef<ClassValue>;
}
