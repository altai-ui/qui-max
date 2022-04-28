import { withInstall } from '../helpers';

import Popover from './src/QPopover.vue';

export const QPopover = withInstall(Popover);

export type { QPopoverProps, QPopoveInstance } from './src/types';
