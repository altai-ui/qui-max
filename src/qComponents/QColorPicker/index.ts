import { withInstall } from '../helpers';

import ColorPicker from './src/QColorPicker.vue';

export const QColorPicker = withInstall(ColorPicker);

export type { QColorPickerProps, QColorPickerInstance } from './src/types';
