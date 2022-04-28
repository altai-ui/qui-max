import { withInstall } from '../helpers';

import Button from './src/QButton.vue';

export const QButton = withInstall(Button);

export type { QButtonProps, QButtonInstance } from './src/types';
