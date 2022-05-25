import { withInstall } from '../helpers';

import ContextMenu from './src/QContextMenu.vue';

export const QContextMenu = withInstall(ContextMenu);

export type { QContextMenuProps, QContextMenuInstance } from './src/types';
