import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QCascaderInputInstance {
  value: ComputedRef<Nullable<string | number>>;
  multiple: Ref<Nullable<boolean>>;
  disabled: ComputedRef<boolean>;
  placeholder: ComputedRef<Nullable<string>>;
  isClearBtnShown: ComputedRef<boolean>;
  arrowIconClass: ComputedRef<string>;
  clearValue: () => void;
}
