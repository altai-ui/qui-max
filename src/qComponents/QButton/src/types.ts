import { ComputedRef } from 'vue';

export type QButtonPropType = 'default' | 'icon';
export type QButtonPropTheme = 'primary' | 'secondary' | 'link';
export type QButtonPropSize = 'small' | 'medium';

export interface QButtonProps {
  type: QButtonPropType;
  theme: QButtonPropTheme;
  size: QButtonPropSize;
  icon: Nullable<string>;
  nativeType: Nullable<string>;
  loading: Nullable<boolean>;
  disabled: Nullable<boolean>;
  autofocus: Nullable<boolean>;
  circle: Nullable<boolean>;
  fullWidth: Nullable<boolean>;
}

export interface QButtonInstance {
  classList: ComputedRef<(string | Record<string, boolean>)[]>;
  isDisabled: ComputedRef<boolean>;
}
