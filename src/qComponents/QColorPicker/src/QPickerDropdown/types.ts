import type { Ref, ComputedRef } from 'vue';

import type { Nullable, UnwrappedInstance } from '#/helpers';

import type { ColorFormat } from '../types';
import type { QColorSvpanelInstance } from '../QColorSvpanel';
import type { QColorHueSliderInstance } from '../QColorHueSlider';
import type { QColorAlphaSliderInstance } from '../QColorAlphaSlider';

export type QPickerDropdownPropColorFormat = ColorFormat;

export interface QPickerDropdownProps {
  isShown: Nullable<boolean>;
  isClearBtnShown: Nullable<boolean>;
  color: Nullable<string>;
  colorFormat: QPickerDropdownPropColorFormat;
  alphaShown: Nullable<boolean>;
}

export interface QPickerDropdownInstance {
  t: (key: string) => string;
  shouldPreventCloseByClick: Ref<boolean>;
  dropdown: Ref<Nullable<HTMLElement>>;
  saturation: Ref<number>;
  value: Ref<number>;
  hue: Ref<number>;
  alpha: Ref<number>;
  tempColor: Ref<string>;
  isTempColorValid: ComputedRef<boolean>;
  rgbString: ComputedRef<string>;
  refSv: Ref<UnwrappedInstance<QColorSvpanelInstance>>;
  refHue: Ref<UnwrappedInstance<QColorHueSliderInstance>>;
  refAlpha: Ref<UnwrappedInstance<QColorAlphaSliderInstance>>;
  handleInputChange: () => void;
  handleMouseDown: () => void;
  handleClearBtnClick: () => void;
  handleConfirmBtnClick: () => void;
  closeDropdown: (e: KeyboardEvent | MouseEvent) => void;
}
