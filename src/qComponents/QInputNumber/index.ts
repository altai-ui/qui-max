import { withInstall } from '../helpers';

import InputNumber from './src/QInputNumber.vue';

export const QInputNumber = withInstall(InputNumber);

export type { QInputNumberProps, QInputNumberInstance } from './src/types';
