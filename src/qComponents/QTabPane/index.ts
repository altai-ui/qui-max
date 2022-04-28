import { withInstall } from '../helpers';

import TabPane from './src/QTabPane.vue';

export const QTabPane = withInstall(TabPane);

export type { QTabPaneProps, QTabPaneInstance } from './src/types';
