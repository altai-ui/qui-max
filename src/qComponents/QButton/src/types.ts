import type { ComputedRef } from 'vue';

import type { Nullable, Optional, ClassValue } from '#/helpers';

export type QButtonPropType = 'default' | 'icon';
export type QButtonPropTheme = 'primary' | 'secondary' | 'link';
export type QButtonPropSize = 'small' | 'medium';
export type QButtonPropIcon = Nullable<ClassValue>;
export type QButtonPropNativeType = Optional<'button' | 'submit' | 'reset'>;

export interface QButtonProps {
  type: QButtonPropType;
  theme: QButtonPropTheme;
  size: QButtonPropSize;
  icon: QButtonPropIcon;
  nativeType: QButtonPropNativeType;
  loading: boolean;
  disabled: boolean;
  autofocus: boolean;
  circle: boolean;
  fullWidth: boolean;
}

export interface QButtonInstance {
  classList: ComputedRef<ClassValue[]>;
  isDisabled: ComputedRef<boolean>;
}
