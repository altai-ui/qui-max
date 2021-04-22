import { ComputedRef } from 'vue';

export interface QTabPaneProps {
  name: string;
  title: string;
  description: Nullable<string>;
  width: Nullable<string | number>;
  disabled: Nullable<boolean>;
}

export interface QTabPaneInstance {
  isDisabled: ComputedRef<boolean>;
  tabWidthStyle: ComputedRef<Record<string, string>>;
  tabBtnClasses: ComputedRef<Record<string, boolean>>;
  handleTabClick: () => void;
}
