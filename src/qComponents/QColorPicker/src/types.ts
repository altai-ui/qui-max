import { Ref } from 'vue';
import { Placement, Options } from '@popperjs/core';

export type ColorFormat = 'hex' | 'rgb';

export interface QColorAlphaSliderProps {
  color: string;
  alpha: number;
}

export interface QColorHueSliderProps {
  hue: number;
}

export type QColorPickerPropColorFormat = ColorFormat;
export type QColorPickerPropPlacement = Placement;
export type QColorPickerPropPopperOptions = Nullable<Partial<Options>>;
export type QColorPickerPropTeleportTo = Nullable<string | HTMLElement>;

export interface QColorPickerProps {
  modelValue: Nullable<string>;
  disabled: Nullable<boolean>;
  clearable: Nullable<boolean>;
  alphaShown: Nullable<boolean>;
  colorFormat: QColorPickerPropColorFormat;
  placement: QColorPickerPropPlacement;
  popperOptions: QColorPickerPropPopperOptions;
  teleportTo: QColorPickerPropTeleportTo;
}

export interface QColorSvpanelProps {
  hue: number;
  saturation: number;
  value: number;
}

export type QPickerDropdownPropColorFormat = ColorFormat;

export interface QPickerDropdownProps {
  isShown: Nullable<boolean>;
  isClearBtnShown: Nullable<boolean>;
  color: Nullable<string>;
  colorFormat: QPickerDropdownPropColorFormat;
  alphaShown: Nullable<boolean>;
}

export interface QColorPickerProvider {
  trigger: Ref<HTMLElement | null>;
}
