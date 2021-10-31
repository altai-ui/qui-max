import type { Ref } from 'vue';

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

export interface QPickerHSVAModel {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
}

export interface QPickerDropdownProvider {
  tempColor: Ref<string>;
  hsvaModel: QPickerHSVAModel;
}

export interface QPickerDropdownInstance {
  t: (key: string) => string;
  shouldPreventCloseByClick: Ref<boolean>;
  dropdown: Ref<Nullable<HTMLElement>>;
  tempColor: Ref<string>;
  refSv: Ref<UnwrappedInstance<QColorSvpanelInstance>>;
  refHue: Ref<UnwrappedInstance<QColorHueSliderInstance>>;
  refAlpha: Ref<UnwrappedInstance<QColorAlphaSliderInstance>>;
  formatColor: () => void;
  handleMouseDown: () => void;
  handleClearBtnClick: () => void;
  handleConfirmBtnClick: () => void;
  handleChange: (newModel: QPickerHSVAModel) => void;
  handleInput: (event: InputEvent) => void;
  closeDropdown: (event: KeyboardEvent | MouseEvent) => void;
}
