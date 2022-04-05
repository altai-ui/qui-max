import type { ComputedRef } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

export type QButtonPropType = 'default' | 'icon';
export type QButtonPropTheme = 'primary' | 'secondary' | 'link';
export type QButtonPropSize = 'small' | 'medium';
export type QButtonPropIcon = Nullable<ClassValue>;
export type QButtonPropNativeType = 'button' | 'submit' | 'reset';

export interface QButtonProps {
  type: QButtonPropType;
  theme: QButtonPropTheme;
  size: QButtonPropSize;
  icon: QButtonPropIcon;
  nativeType: QButtonPropNativeType;
  loading: Nullable<boolean>;
  disabled: Nullable<boolean>;
  autofocus: Nullable<boolean>;
  circle: Nullable<boolean>;
  fullWidth: Nullable<boolean>;
}

export interface QButtonInstance {
  classList: ComputedRef<ClassValue[]>;
  isDisabled: ComputedRef<boolean>;
}
