import { Ref, ComputedRef } from 'vue';

export interface QCascaderInputInstance {
  multiple: Ref<Nullable<boolean>>;
  disabled: ComputedRef<boolean>;
  isClearBtnShown: ComputedRef<boolean>;
  arrowIconClass: ComputedRef<string>;
}
