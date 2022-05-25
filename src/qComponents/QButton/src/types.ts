import type { ComputedRef } from 'vue';

import type { Nullable, ClassValue } from '#/helpers';

type NativeType = 'button' | 'submit' | 'reset';

export type QButtonPropType = Nullable<'default' | 'icon'>;
export type QButtonPropTheme = Nullable<'primary' | 'secondary' | 'link'>;
export type QButtonPropSize = Nullable<'small' | 'medium'>;
export type QButtonPropIcon = Nullable<ClassValue>;
export type QButtonPropNativeType = Nullable<NativeType>;
export type QButtonPropLoading = Nullable<boolean>;
export type QButtonPropDisabled = Nullable<boolean>;
export type QButtonPropAutofocus = Nullable<boolean>;
export type QButtonPropCircle = Nullable<boolean>;
export type QButtonPropFullWidth = Nullable<boolean>;

export interface QButtonProps {
  type: QButtonPropType;
  theme: QButtonPropTheme;
  size: QButtonPropSize;
  icon: QButtonPropIcon;
  nativeType: QButtonPropNativeType;
  loading: QButtonPropLoading;
  disabled: QButtonPropDisabled;
  autofocus: QButtonPropAutofocus;
  circle: QButtonPropCircle;
  fullWidth: QButtonPropFullWidth;
}

export interface QButtonInstance {
  isDisabled: ComputedRef<boolean>;
  isLoading: ComputedRef<boolean>;
  classList: ComputedRef<ClassValue[]>;
}
