import type { Ref, ComputedRef } from 'vue';
import type { Placement, Options } from '@popperjs/core';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import type { QPickerDropdownInstance } from './QPickerDropdown';

export type ColorFormat = 'hex' | 'rgb';

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

export interface QColorPickerProvider {
  trigger: Ref<Nullable<HTMLElement>>;
}

export interface QColorPickerInstance {
  trigger: Ref<Nullable<HTMLElement>>;
  dropdown: Ref<UnwrappedInstance<QPickerDropdownInstance>>;
  zIndex: Ref<number>;
  iconClasses: ComputedRef<Record<string, boolean>>;
  isDisabled: ComputedRef<boolean>;
  isPickerShown: Ref<boolean>;
  handleClose: () => void;
  handleTriggerClick: () => void;
  handlePick: (value: string) => void;
  handleClear: () => void;
}
