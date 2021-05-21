import { Ref, ComputedRef } from 'vue';

export interface QCascaderInputInstance {
  value: ComputedRef<Nullable<string | number>>;
  multiple: Ref<Nullable<boolean>>;
  disabled: ComputedRef<boolean>;
  isClearBtnShown: ComputedRef<boolean>;
  arrowIconClass: ComputedRef<string>;
  handleClearBtnClick: () => void;
}
