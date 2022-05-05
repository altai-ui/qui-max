import { withInstall } from '../helpers';

import Radio from './src/QRadio.vue';

export const QRadio = withInstall(Radio);

export type { QRadioProps, QRadioInstance } from './src/types';
