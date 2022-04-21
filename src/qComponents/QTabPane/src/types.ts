import type { ComputedRef } from 'vue';

import type { Optional, Nullable } from '#/helpers';

export interface QTabPaneProps {
  name: string;
  title: string;
  width: Nullable<string | number>;
  disabled: Nullable<boolean>;
}

export interface QTabPaneInstance {
  isDisabled: ComputedRef<boolean>;
  tabWidthStyle: ComputedRef<Record<string, Optional<string>>>;
  tabBtnClasses: ComputedRef<Record<string, boolean>>;
  handleTabClick: () => void;
}
